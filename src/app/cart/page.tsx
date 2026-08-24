'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);

  const subtotal = useStore((state) => state.getCartSubtotal());
  const discount = useStore((state) => state.getCartDiscount());
  const shipping = useStore((state) => state.getCartShipping());
  const total = useStore((state) => state.getCartTotal());

  const [couponInput, setCouponInput] = useState('');
  const { toast } = useToast();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      toast(res.message, { type: 'success' });
      setCouponInput('');
    } else {
      toast(res.message, { type: 'error' });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FDFBF7] flex flex-col items-center justify-center px-4 py-20 text-center border-b border-[#DCCFBD]">
        <div className="w-16 h-16 rounded-full bg-[#ECE5DC] flex items-center justify-center text-[#A99B8B] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] mb-2 font-normal">
          Tu carrito de compras está vacío
        </h1>
        <p className="text-xs sm:text-sm text-[#A99B8B] max-w-md mx-auto mb-8 font-light">
          Descubre nuestras prendas de corte impecable y añade tus piezas favoritas para comenzar.
        </p>
        <Link href="/shop" className="btn-editorial-primary inline-flex items-center gap-2">
          <span>Explorar Catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-[#DCCFBD]/70">
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
            CARRITO DE COMPRAS
          </h1>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Revisa tus prendas seleccionadas antes de proceder al pago seguro.
          </p>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="mb-8 p-4 bg-[#F7F2EA] border border-[#DCCFBD]">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs text-[#292725] mb-2">
              Agrega <strong className="text-[#B99663]">${remainingForFreeShipping.toLocaleString('es-MX')} MXN</strong> más para obtener <strong className="text-[#292725]">Envío Gratis a todo México</strong>.
            </p>
          ) : (
            <p className="text-xs text-[#B99663] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#B99663]" />
              ¡Felicidades! Tu pedido califica para Envío Gratis.
            </p>
          )}
          <div className="w-full h-1.5 bg-[#DCCFBD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B99663] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Cart Items Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#F7F2EA] border border-[#DCCFBD] gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-26 bg-[#ECE5DC] overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-editorial text-lg text-[#292725] hover:text-[#B99663] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-[#A99B8B] flex items-center gap-2">
                      <span>Talla: <strong className="text-[#292725]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-[#292725]">{item.selectedColor.name}</strong></span>
                    </div>
                    <p className="text-xs font-bold text-[#292725] sm:hidden">
                      ${item.product.price.toLocaleString('es-MX')} MXN
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#DCCFBD] bg-white">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-[#292725] hover:bg-[#ECE5DC]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#292725]">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-[#292725] hover:bg-[#ECE5DC]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal of item */}
                  <span className="text-sm font-bold text-[#292725] hidden sm:block">
                    ${(item.product.price * item.quantity).toLocaleString('es-MX')} MXN
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#A99B8B] hover:text-[#C48B71] p-1.5"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2 flex justify-between items-center text-xs">
              <Link href="/shop" className="text-[#B99663] underline uppercase tracking-wider font-semibold">
                ← Continuar Comprando
              </Link>
            </div>
          </div>

          {/* Right: Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-6 sticky top-24">
            <h3 className="font-editorial text-xl font-semibold text-[#292725] pb-3 border-b border-[#DCCFBD]">
              Resumen de Compra
            </h3>

            {/* Price lines */}
            <div className="space-y-3 text-xs text-[#292725]">
              <div className="flex justify-between">
                <span className="text-[#A99B8B]">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} prendas)</span>
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
                    <strong className="text-[#B99663] uppercase tracking-wider">GRATIS</strong>
                  ) : (
                    `$${shipping.toLocaleString('es-MX')} MXN`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#292725] pt-4 border-t border-[#DCCFBD]">
                <span>Total</span>
                <span>${total.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            {/* Coupon Box */}
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="p-3 bg-[#B99663]/15 border border-[#B99663]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#292725]">
                    <Tag className="w-3.5 h-3.5 text-[#B99663]" />
                    <span><strong>{appliedCoupon.code}</strong> aplicado</span>
                  </div>
                  <button onClick={removeCoupon} className="text-[#C48B71] underline font-bold">
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de cupón"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#DCCFBD] uppercase"
                  />
                  <button type="submit" className="btn-editorial-primary px-4 py-2 text-[11px]">
                    Aplicar
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="btn-editorial-primary w-full py-4 text-center flex items-center justify-center gap-2 text-xs"
            >
              <span>PROCEDER AL CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Security Guarantee Note */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#A99B8B] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#B99663]" />
              <span>Transacciones 100% cifradas y protegidas</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
