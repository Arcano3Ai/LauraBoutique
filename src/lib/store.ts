'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, ProductColor, ProductSize, Coupon, Order, User } from '@/types';
import { PRODUCTS_DATA, COUPONS_DATA, INITIAL_ORDERS_DATA } from '@/data/mockData';

export const FREE_SHIPPING_THRESHOLD = 1499;
export const STANDARD_SHIPPING_COST = 149;

interface StoreState {
  // Products & Admin
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize: ProductSize, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getCartShipping: () => number;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Navigation
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  
  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // User & Orders
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Products
      products: PRODUCTS_DATA,
      addProduct: (newProd) =>
        set((state) => ({ products: [newProd, ...state.products] })),
      updateProduct: (id, updated) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p))
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        })),

      // Cart
      cart: [],
      appliedCoupon: null,
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      addToCart: (product, selectedColor, selectedSize, quantity = 1) => {
        set((state) => {
          const itemKey = `${product.id}-${selectedColor.name}-${selectedSize}`;
          const existingIndex = state.cart.findIndex((item) => item.id === itemKey);

          if (existingIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += quantity;
            return { cart: updatedCart, isCartOpen: true };
          } else {
            const newItem: CartItem = {
              id: itemKey,
              product,
              selectedColor,
              selectedSize,
              quantity
            };
            return { cart: [...state.cart, newItem], isCartOpen: true };
          }
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId)
        }));
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const found = COUPONS_DATA.find((c) => c.code === cleanCode && c.active);
        if (!found) {
          return { success: false, message: 'Cupón no válido o expirado.' };
        }
        const subtotal = get().getCartSubtotal();
        if (found.minSpend && subtotal < found.minSpend) {
          return {
            success: false,
            message: `Este cupón requiere un consumo mínimo de $${found.minSpend.toLocaleString('es-MX')} MXN.`
          };
        }
        set({ appliedCoupon: found });
        return { success: true, message: `¡Cupón ${found.code} aplicado con éxito!` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      getCartSubtotal: () => {
        return get().cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      },

      getCartDiscount: () => {
        const subtotal = get().getCartSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        if (coupon.discountPercentage > 0) {
          return (subtotal * coupon.discountPercentage) / 100;
        }
        if (coupon.discountFixed) {
          return coupon.discountFixed;
        }
        return 0;
      },

      getCartShipping: () => {
        const subtotal = get().getCartSubtotal();
        const coupon = get().appliedCoupon;
        if (coupon && coupon.code === 'ENVIOGRATIS') return 0;
        if (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) return 0;
        return STANDARD_SHIPPING_COST;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().getCartDiscount();
        const shipping = get().getCartShipping();
        return Math.max(0, subtotal - discount + shipping);
      },

      getCartCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((p) => p.id !== product.id) };
          } else {
            return { wishlist: [...state.wishlist, product] };
          }
        });
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      // Modals
      isMobileMenuOpen: false,
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      isSearchOpen: false,
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false }),

      isSizeGuideOpen: false,
      openSizeGuide: () => set({ isSizeGuideOpen: true }),
      closeSizeGuide: () => set({ isSizeGuideOpen: false }),

      quickViewProduct: null,
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),

      // User & Orders
      user: {
        id: 'usr-1',
        name: 'Laura Méndez',
        email: 'laura.mendez@ejemplo.com',
        phone: '55 4321 8765',
        addresses: [
          {
            id: 'addr-1',
            alias: 'Casa',
            street: 'Campos Elíseos 204, Int. 5B',
            city: 'Ciudad de México',
            state: 'Ciudad de México',
            postalCode: '11560',
            isDefault: true
          }
        ]
      },
      login: (email, name = 'Clienta Laura Boutique') =>
        set({
          user: {
            id: `usr-${Date.now()}`,
            name,
            email,
            addresses: []
          }
        }),
      logout: () => set({ user: null }),

      orders: INITIAL_ORDERS_DATA,
      createOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ord-${Date.now()}`,
          orderNumber: `LB-${Math.floor(10000 + Math.random() * 90000)}`,
          date: new Date().toISOString().split('T')[0]
        };
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
        get().clearCart();
        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o))
        }));
      }
    }),
    {
      name: 'laura-boutique-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        appliedCoupon: state.appliedCoupon,
        orders: state.orders,
        user: state.user
      })
    }
  )
);
