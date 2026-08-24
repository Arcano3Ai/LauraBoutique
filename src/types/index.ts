export type ProductCategory = 
  | 'todos'
  | 'vestidos'
  | 'blusas'
  | 'pantalones'
  | 'faldas'
  | 'sets'
  | 'chamarras'
  | 'basicos'
  | 'accesorios';

export type ProductOccasion = 
  | 'casual'
  | 'oficina'
  | 'cena'
  | 'evento'
  | 'fin-de-semana';

export type ProductBadge = 'NUEVO' | 'BEST SELLER' | 'ÚLTIMAS PIEZAS' | 'SALE';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'ÚNICA';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryName: string;
  occasion?: ProductOccasion;
  price: number;
  originalPrice?: number;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  inStock: boolean;
  stockCount: number;
  description: string;
  composition: string;
  careInstructions: string[];
  measurements?: {
    modelHeight: string;
    modelWearingSize: string;
  };
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
  quantity: number;
}

export interface LookItem {
  name: string;
  price: number;
  productId?: string;
}

export interface LookBundle {
  id: string;
  name: string;
  tagline: string;
  image: string;
  items: LookItem[];
  totalPrice: number;
  productIds: string[];
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  discountFixed?: number;
  minSpend?: number;
  description: string;
  active: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Pendiente' | 'Pagado' | 'En preparación' | 'En camino' | 'Entregado';
  trackingNumber: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    colonia: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: 'Tarjeta' | 'Mercado Pago' | 'PayPal' | 'OXXO Pay';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Array<{
    id: string;
    alias: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
  }>;
}
