'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Heart } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'ENVÍOS A TODO MÉXICO',
      description: 'Cobertura nacional con paqueterías de confianza y seguimiento en tiempo real.'
    },
    {
      icon: ShieldCheck,
      title: 'PAGO 100% SEGURO',
      description: 'Procesamiento encriptado con Tarjetas, Mercado Pago, PayPal y OXXO Pay.'
    },
    {
      icon: RefreshCw,
      title: 'CAMBIOS FÁCILES',
      description: 'Hasta 30 días naturales para cambios de talla sin complicaciones ni costos ocultos.'
    },
    {
      icon: Heart,
      title: 'COMPRA CON CONFIANZA',
      description: 'Cada prenda es inspeccionada y empaquetada con esmero antes de salir de boutique.'
    }
  ];

  return (
    <section className="py-14 md:py-18 bg-[#F7F2EA] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 bg-[#FDFBF7] border border-[#DCCFBD]/60 transition-all hover:border-[#B99663] hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-[#B99663]/15 flex items-center justify-center text-[#B99663] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-editorial text-base font-semibold uppercase tracking-wider text-[#292725] mb-1">
                  {b.title}
                </h4>
                <p className="text-xs text-[#A99B8B] leading-relaxed font-light">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
