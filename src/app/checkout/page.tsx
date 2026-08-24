'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, Lock, Truck, ChevronRight, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/lib/store';
import { MEXICAN_STATES } from '@/data/mockData';
import { useToast } from '@/components/ui/ToastProvider';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const createOrder = useStore((state) => state.createOrder);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);

  const subtotal = useStore((state) => state.getCartSubtotal());
  const discount = useStore((state) => state.getCartDiscount());
  const baseShipping = useStore((state) => state.getCartShipping());

  const { toast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : '',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    colonia: '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Ciudad de México',
    postalCode: user?.addresses?.[0]?.postalCode || '',
    shippingMethod: 'standard',
    paymentMethod: 'Tarjeta' as 'Tarjeta' | 'Mercado Pago' | 'PayPal' | 'OXXO Pay',
    cardNumber: '4152 •••• •••• 9821',
    cardExpiry: '08/29',
    cardCvc: '•••',
    cardName: user?.name || 'Laura Méndez'
  });

  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-editorial text-3xl text-[#292725] mb-2">No hay prendas para pagar</h2>
        <p className="text-xs text-[#A99B8B] mb-6">Tu carrito está vacío.</p>
        <Link href="/shop" className="btn-editorial-primary">Explorar Catálogo</Link>
      </div>
    );
  }

  const shippingCost =
    formData.shippingMethod === 'express'
      ? 249
      : baseShipping;

  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      toast(res.message, { type: 'success' });
      setCouponCode('');
    } else {
      toast(res.message, { type: 'error' });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.street || !formData.email || !formData.postalCode) {
      toast('Por favor completa todos los campos de entrega obligatorios.', { type: 'error' });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        items: [...cart],
        subtotal,
        discount,
        shipping: shippingCost,
        total,
        status: 'Pagado',
        trackingNumber: `DHL-MX-${Math.floor(100000000 + Math.random() * 900000000)}`,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          colonia: formData.colonia || 'Centro',
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod
      });

      setIsProcessing(false);
      router.push(`/checkout/success?orderNumber=${newOrder.orderNumber}`);
    }, 1200);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-[#DCCFBD]/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
              Pago Seguro Cifrado
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
              FINALIZAR PEDIDO
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#A99B8B]">
            <Lock className="w-4 h-4 text-[#B99663]" />
            <span>Encriptación SSL 256-bit</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: Customer Data, Shipping, Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Contact Information */}
              <div className="bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#292725] pb-2 border-b border-[#DCCFBD]">
                  1. Datos de Contacto
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Ej. Laura"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Ej. Méndez Gómez"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Correo Electrónico (Para envío de guía) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="laura@ejemplo.com"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Teléfono Móvil (Para paquetería) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="55 1234 5678"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shipping Address in Mexico */}
              <div className="bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#292725] pb-2 border-b border-[#DCCFBD]">
                  2. Dirección de Entrega en México
                </h3>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                    Calle y Número (Exterior e Interior) *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Av. Paseo de la Reforma 222, Depto 401"
                    className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Colonia / Fraccionamiento
                    </label>
                    <input
                      type="text"
                      name="colonia"
                      value={formData.colonia}
                      onChange={handleInputChange}
                      placeholder="Juárez"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Código Postal (5 dígitos) *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      maxLength={5}
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="06600"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Ciudad / Municipio *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Cuauhtémoc"
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                      Estado *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
                    >
                      {MEXICAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Shipping Method */}
              <div className="bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#292725] pb-2 border-b border-[#DCCFBD]">
                  3. Método de Envío
                </h3>

                <div className="space-y-3">
                  <label className={`p-4 border block cursor-pointer transition-all ${formData.shippingMethod === 'standard' ? 'border-[#292725] bg-white shadow-xs' : 'border-[#DCCFBD] bg-[#F7F2EA]'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleInputChange}
                          className="accent-[#292725]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#292725]">Envío Estándar Nacional (DHL / Estafeta)</p>
                          <p className="text-[11px] text-[#A99B8B]">Entrega en 2 a 4 días hábiles</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#292725]">
                        {baseShipping === 0 ? 'GRATIS' : `$${baseShipping} MXN`}
                      </span>
                    </div>
                  </label>

                  <label className={`p-4 border block cursor-pointer transition-all ${formData.shippingMethod === 'express' ? 'border-[#292725] bg-white shadow-xs' : 'border-[#DCCFBD] bg-[#F7F2EA]'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleInputChange}
                          className="accent-[#292725]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#292725]">Envío Exprés Prioritario</p>
                          <p className="text-[11px] text-[#A99B8B]">Entrega al día siguiente hábil</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#292725]">$249 MXN</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 4: Payment Method */}
              <div className="bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#292725] pb-2 border-b border-[#DCCFBD]">
                  4. Método de Pago
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Tarjeta', 'Mercado Pago', 'PayPal', 'OXXO Pay'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method }))}
                      className={`p-3 text-center border text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.paymentMethod === method
                          ? 'border-[#292725] bg-[#292725] text-white shadow-sm'
                          : 'border-[#DCCFBD] bg-white text-[#292725] hover:border-[#292725]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'Tarjeta' && (
                  <div className="pt-3 space-y-3 animate-fade-in">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                          Vigencia (MM/AA)
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          maxLength={4}
                          className="w-full p-2.5 bg-white border border-[#DCCFBD] text-xs text-[#292725]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'OXXO Pay' && (
                  <div className="p-4 bg-white border border-[#DCCFBD] text-xs text-[#292725] space-y-1 animate-fade-in">
                    <p className="font-semibold">Pago en efectivo con código de barras en OXXO</p>
                    <p className="text-[#A99B8B]">Al hacer clic en Realizar Pedido se generará tu ficha de pago digital.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-6 sticky top-24">
              <h3 className="font-editorial text-xl font-semibold text-[#292725] pb-3 border-b border-[#DCCFBD]">
                Tu Pedido ({cart.reduce((s, i) => s + i.quantity, 0)} prendas)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#DCCFBD]/70 max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-14 object-cover bg-[#ECE5DC] border border-[#DCCFBD] shrink-0" />
                      <div className="truncate">
                        <p className="font-editorial text-sm text-[#292725] font-semibold truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#A99B8B]">Talla: {item.selectedSize} • Cant: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#292725] shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString('es-MX')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div className="pt-2 border-t border-[#DCCFBD]">
                {appliedCoupon ? (
                  <div className="p-2.5 bg-[#B99663]/15 border border-[#B99663]/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#292725]">
                      <Tag className="w-3.5 h-3.5 text-[#B99663]" />
                      <span>Cupón <strong>{appliedCoupon.code}</strong> aplicado</span>
                    </div>
                    <button type="button" onClick={removeCoupon} className="text-[#C48B71] underline font-bold">
                      Quitar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código de cupón"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#DCCFBD] uppercase"
                    />
                    <button type="button" onClick={handleApplyCoupon} className="px-3 py-2 bg-[#292725] text-white text-xs font-semibold uppercase">
                      Aplicar
                    </button>
                  </div>
                )}
              </div>

              {/* Summary Lines */}
              <div className="space-y-2 text-xs text-[#292725] pt-2 border-t border-[#DCCFBD]">
                <div className="flex justify-between">
                  <span className="text-[#A99B8B]">Subtotal</span>
                  <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#B99663] font-semibold">
                    <span>Descuento</span>
                    <span>-${discount.toLocaleString('es-MX')} MXN</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#A99B8B]">Envío</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#B99663]">GRATIS</strong> : `$${shippingCost} MXN`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#292725] pt-3 border-t border-[#DCCFBD]">
                  <span>TOTAL A PAGAR</span>
                  <span>${total.toLocaleString('es-MX')} MXN</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-editorial-primary w-full py-4 text-center text-xs tracking-widest font-bold flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>PROCESANDO PAGO SEGURO...</span>
                ) : (
                  <span>REALIZAR PEDIDO (${total.toLocaleString('es-MX')} MXN)</span>
                )}
              </button>

              <div className="text-center text-[11px] text-[#A99B8B] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B99663]" />
                <span>Garantía de satisfacción y cambios fáciles por 30 días</span>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
