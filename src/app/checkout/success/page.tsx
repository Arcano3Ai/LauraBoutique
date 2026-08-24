'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Truck, Mail, PhoneCall, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'LB-94830';
  const orders = useStore((state) => state.orders);

  const currentOrder = orders.find((o) => o.orderNumber === orderNumber) || orders[0];

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B99663', '#DCCFBD', '#292725', '#C48B71']
      });
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12 md:py-20 border-b border-[#DCCFBD]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#B99663]/15 text-[#B99663] mx-auto flex items-center justify-center mb-6 animate-fade-in shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#B99663] font-bold block mb-2">
          ¡Gracias por tu compra!
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#292725] font-normal mb-3">
          TU PEDIDO ESTÁ CONFIRMADO
        </h1>
        <p className="text-xs sm:text-sm text-[#A99B8B] max-w-md mx-auto mb-8 font-light">
          Hemos recibido tu orden y estamos preparando cada prenda con el cuidado que mereces.
        </p>

        {/* Order Card Details */}
        <div className="bg-[#F7F2EA] p-6 sm:p-8 border border-[#DCCFBD] text-left space-y-6 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCCFBD] gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] block">Número de Pedido</span>
              <strong className="font-editorial text-xl text-[#292725]">{orderNumber}</strong>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] block">Estado</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B99663] bg-[#B99663]/15 px-2.5 py-1">
                <Sparkles className="w-3.5 h-3.5" />
                {currentOrder?.status || 'Pagado / En preparación'}
              </span>
            </div>
          </div>

          {/* Delivery & Tracking */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#292725]">
            <div className="space-y-1">
              <span className="text-[#A99B8B] uppercase tracking-wider text-[10px] font-semibold block">
                Dirección de Entrega
              </span>
              <p className="font-semibold">{currentOrder?.shippingAddress?.fullName || 'Clienta Laura Boutique'}</p>
              <p className="text-[#A99B8B]">{currentOrder?.shippingAddress?.street}</p>
              <p className="text-[#A99B8B]">
                {currentOrder?.shippingAddress?.city}, {currentOrder?.shippingAddress?.state} {currentOrder?.shippingAddress?.postalCode}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[#A99B8B] uppercase tracking-wider text-[10px] font-semibold block">
                Guía de Paquetería
              </span>
              <p className="font-bold text-[#292725] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#B99663]" />
                {currentOrder?.trackingNumber || 'DHL-MX-849204812'}
              </p>
              <p className="text-[11px] text-[#A99B8B]">Recibirás notificaciones por correo y WhatsApp conforme avance tu paquete.</p>
            </div>
          </div>

          {/* Items Preview */}
          {currentOrder?.items && currentOrder.items.length > 0 && (
            <div className="pt-4 border-t border-[#DCCFBD] space-y-2">
              <span className="text-[#A99B8B] uppercase tracking-wider text-[10px] font-semibold block">
                Prendas en el pedido
              </span>
              <div className="divide-y divide-[#DCCFBD]/50">
                {currentOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <span>{it.product.name} (Talla {it.selectedSize}) x{it.quantity}</span>
                    <span className="font-bold">${(it.product.price * it.quantity).toLocaleString('es-MX')} MXN</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account" className="btn-editorial-secondary">
            Ver en Mi Cuenta & Pedidos
          </Link>
          <Link href="/shop" className="btn-editorial-primary inline-flex items-center justify-center gap-2">
            <span>Seguir Explorando Colección</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-xs tracking-widest text-[#A99B8B]">CARGANDO CONFIRMACIÓN...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
