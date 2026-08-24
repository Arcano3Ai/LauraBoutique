'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Truck } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-14 md:py-18 bg-[#292725] text-[#FDFBF7] border-y border-[#3D3A37] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#DCCFBD_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[#B99663] text-xs font-semibold uppercase tracking-[0.2em]">
              <Truck className="w-4 h-4" />
              <span>Beneficio Exclusivo</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#FDFBF7] font-normal tracking-wide">
              ENVÍO GRATIS A TODO MÉXICO
            </h2>
            <p className="text-xs sm:text-sm text-[#DCCFBD] font-light">
              En todas tus compras superiores a <strong className="text-white font-semibold">$1,499 MXN</strong>. Entregas seguras por paquetería exprés directa a tu puerta.
            </p>
          </div>

          <div>
            <Link
              href="/shop"
              className="px-8 py-4 bg-[#B99663] hover:bg-[#A38250] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xl inline-flex items-center gap-2"
            >
              <span>COMPRAR AHORA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
