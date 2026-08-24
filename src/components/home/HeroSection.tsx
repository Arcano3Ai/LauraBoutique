'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F5EFE6] via-[#F8F5F0] to-[#F5EFE6] overflow-hidden border-b border-[#DCCFBD]">
      {/* Subtle Luxury Pattern / Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B99663]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#DCCFBD]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headlines & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 space-y-7">
            
            {/* Luxury Brand Emblem - Bien Grande */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-3 border-[#B99663] bg-[#121110] shrink-0 hover:scale-105 transition-all duration-700 ring-8 ring-[#B99663]/25 group">
                <img
                  src="/images/logo.jpg"
                  alt="My Boutique More Logo Oficial"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FDFBF7] border border-[#B99663]/50 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#B99663]" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#1C1A18]">
                    BOUTIQUE OFICIAL 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A99B8B] tracking-[0.25em] uppercase font-semibold">
                  Atemporal • Elegante • Accesible
                </p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1A18] leading-[1.08] tracking-tight font-normal">
                VISTE TU <br />
                <span className="italic font-light text-[#B99663]">ESENCIA</span>
              </h1>
              <p className="text-sm sm:text-base text-[#1C1A18]/80 font-light leading-relaxed max-w-lg">
                Moda atemporal, femenina y distinguida para todos los días. Diseñada para hacerte sentir segura y elegante sin gastar una fortuna.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
              <Link
                href="/shop"
                className="btn-editorial-primary flex items-center justify-center gap-2 group shadow-lg"
              >
                <span>EXPLORAR COLECCIÓN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?badge=NUEVO"
                className="btn-editorial-secondary flex items-center justify-center"
              >
                NOVEDADES DE TEMPORADA
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[#DCCFBD] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="font-editorial text-2xl text-[#1C1A18] font-semibold block leading-none">100%</span>
                <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider block mt-1.5">Diseño Mexicano</span>
              </div>
              <div>
                <span className="font-editorial text-2xl text-[#1C1A18] font-semibold block leading-none">XS - XL</span>
                <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider block mt-1.5">Tallas Reales</span>
              </div>
              <div>
                <div className="flex items-center gap-1 font-editorial text-2xl text-[#B99663] font-semibold leading-none">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-[#B99663] text-[#B99663]" />
                </div>
                <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider block mt-1.5">120+ Reseñas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Editorial Campaign Photo */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-4/5 sm:aspect-16/11 lg:aspect-4/5 w-full bg-[#ECE5DC] overflow-hidden shadow-2xl border-2 border-[#DCCFBD] group">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1600"
                alt="My Boutique More Campaña Atemporal"
                className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-1000"
              />

              {/* Gradient Overlay for high-end feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/60 via-transparent to-transparent pointer-events-none" />

              {/* Editorial Floating Tag */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-[#FDFBF7]/95 backdrop-blur-md p-4 sm:p-5 border border-[#B99663]/40 shadow-xl max-w-xs">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B99663] font-bold block mb-1">
                  Pieza Insignia
                </span>
                <p className="font-editorial text-base sm:text-lg text-[#1C1A18]">
                  Vestido Aura en Lino Arena
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DCCFBD]">
                  <span className="text-sm font-bold text-[#1C1A18]">
                    $899 MXN
                  </span>
                  <Link
                    href="/product/vestido-aura"
                    className="text-[10px] uppercase tracking-wider text-[#B99663] font-semibold hover:underline"
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
