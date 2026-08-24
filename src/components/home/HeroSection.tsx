'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F7F2EA] overflow-hidden border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headlines & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 space-y-6">
            
            {/* Small Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDFBF7] border border-[#DCCFBD] w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B99663]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#292725]">
                ATEMPORAL • ELEGANTE • ACCESIBLE
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#292725] leading-[1.05] tracking-tight font-normal">
                VISTE TU <br />
                <span className="italic font-light text-[#B99663]">ESENCIA</span>
              </h1>
              <p className="text-sm sm:text-base text-[#292725]/80 font-light leading-relaxed max-w-md pt-2">
                Moda atemporal, femenina y elegante para todos los días. Diseñada para hacerte sentir segura sin gastar una fortuna.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <Link
                href="/shop"
                className="btn-editorial-primary flex items-center justify-center gap-2 group"
              >
                <span>COMPRAR AHORA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?badge=NUEVO"
                className="btn-editorial-secondary flex items-center justify-center"
              >
                VER NUEVA COLECCIÓN
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[#DCCFBD]/60 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="font-editorial text-2xl text-[#292725] font-semibold block leading-none">100%</span>
                <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider block mt-1">Diseño Mexicano</span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#292725] font-semibold block leading-none">XS - XL</span>
                <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider block mt-1">Tallas Reales</span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#292725] font-semibold block leading-none">4.9 ★</span>
                <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider block mt-1">Satisfacción</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Campaign Photo */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-4/5 sm:aspect-16/11 lg:aspect-4/3 w-full bg-[#ECE5DC] overflow-hidden shadow-xl border border-[#DCCFBD]">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1600"
                alt="My Boutique More Campaña Atemporal"
                className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-1000"
              />

              {/* Editorial Floating Tag */}
              <div className="absolute bottom-6 left-6 bg-[#FDFBF7]/90 backdrop-blur-md p-4 border border-[#DCCFBD] shadow-lg max-w-xs hidden sm:block">
                <span className="text-[9px] uppercase tracking-widest text-[#B99663] font-bold block mb-1">
                  Colección Insignia
                </span>
                <p className="font-editorial text-base text-[#292725]">
                  Vestido Aura en Lino Arena
                </p>
                <span className="text-xs font-semibold text-[#292725] mt-1 block">
                  $899 MXN
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
