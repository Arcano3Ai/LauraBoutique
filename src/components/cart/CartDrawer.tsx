'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

export const CartDrawer: React.FC = () => {
  const isOpen = useStore((state) => state.isCartOpen);
  const closeCart = useStore((state) => state.closeCart);
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);
  
  const subtotal = useStore((state) => state.getCartSubtotal());
  const discount = useStore((state) => state.getCartDiscount());
  const shipping = useStore((state) => state.getCartShipping());
  const total = useStore((state) => state.getCartTotal());

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const { toast } = useToast();

  if (!isOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      toast(res.message, { type: 'success' });
      setCouponCode('');
    } else {
      setCouponError(res.message);
      toast(res.message, { type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FDFBF7] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#DCCFBD] animate-fade-in">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#DCCFBD] bg-[#F7F2EA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#292725]" />
            <h3 className="font-editorial text-xl font-semibold text-[#292725]">
              Tu Carrito ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#292725] hover:text-[#B99663] transition-colors"
            aria-label="Cerrar Carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#F7F2EA] border-b border-[#DCCFBD]/70 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#292725] mb-2 font-medium">
              Te faltan <span className="font-bold text-[#B99663]">${remainingForFreeShipping.toLocaleString('es-MX')} MXN</span> para obtener <strong className="text-[#292725]">Envío Gratis</strong>.
            </p>
          ) : (
            <p className="text-[#B99663] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#B99663]" />
              ¡Felicidades! Tienes Envío Gratis a todo México.
            </p>
          )}

          {/* Progress Bar Track */}
          <div className="w-full h-1.5 bg-[#DCCFBD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B99663] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#ECE5DC] mx-auto flex items-center justify-center text-[#A99B8B] mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-editorial text-2xl text-[#292725] mb-2">
                Tu carrito está vacío
              </h4>
              <p className="text-xs text-[#A99B8B] max-w-xs mx-auto mb-6">
                Descubre nuestras piezas atemporales y eleva tu estilo diario.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-editorial-primary inline-flex"
              >
                Explorar Colección
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-[#F7F2EA] border border-[#DCCFBD]/60 relative group"
              >
                {/* Product Image */}
                <div className="w-20 h-24 bg-[#ECE5DC] overflow-hidden shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-editorial text-base font-medium text-[#292725] hover:text-[#B99663] transition-colors truncate"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A99B8B] hover:text-[#C48B71] transition-colors p-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#A99B8B] mt-0.5">
                      <span>Talla: <strong className="text-[#292725]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-[#292725]">{item.selectedColor.name}</strong></span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Item Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#DCCFBD] bg-[#FDFBF7]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#292725] hover:bg-[#ECE5DC] transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#292725]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#292725] hover:bg-[#ECE5DC] transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#292725]">
                      ${(item.product.price * item.quantity).toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary & Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#DCCFBD] bg-[#F7F2EA] space-y-4">
            
            {/* Coupon input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#B99663]/15 border border-[#B99663]/40 text-xs text-[#292725]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#B99663]" />
                    <span>Cupón: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#C48B71] underline font-semibold hover:text-[#292725]"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de descuento (ej. LAURA10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FDFBF7] border border-[#DCCFBD] focus:outline-hidden focus:border-[#292725] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#292725] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99663] transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-[#C48B71] mt-1">{couponError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#292725]">
              <div className="flex justify-between">
                <span className="text-[#A99B8B]">Subtotal</span>
                <span className="font-semibold">${subtotal.toLocaleString('es-MX')} MXN</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#B99663] font-semibold">
                  <span>Descuento aplicado</span>
                  <span>-${discount.toLocaleString('es-MX')} MXN</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#A99B8B]">Envío estimado</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="text-[#B99663] uppercase tracking-wider font-semibold">GRATIS</strong>
                  ) : (
                    `$${shipping.toLocaleString('es-MX')} MXN`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#292725] pt-2 border-t border-[#DCCFBD]">
                <span>TOTAL</span>
                <span>${total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-editorial-primary w-full text-center flex items-center justify-center gap-2"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center text-xs uppercase tracking-wider text-[#A99B8B] hover:text-[#292725] py-2 transition-colors font-medium"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
