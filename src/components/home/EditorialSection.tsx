'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#DCCFBD]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Fashion Editorial Image */}
          <div className="relative">
            <div className="aspect-3/4 sm:aspect-4/3 lg:aspect-4/5 w-full bg-[#ECE5DC] overflow-hidden border border-[#DCCFBD] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1200"
                alt="My Boutique More Manifiesto Editorial"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000"
              />
            </div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#292725] text-[#F7F2EA] p-4 sm:p-5 border border-[#B99663]/50 shadow-xl hidden sm:block">
              <p className="font-editorial text-lg italic text-[#B99663] leading-none">
                Estilo Sostenible
              </p>
              <span className="text-[9px] uppercase tracking-widest text-[#DCCFBD] block mt-1">
                Confección Consciente
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto & Call to Action */}
          <div className="space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-1.5 text-[#B99663] text-[10px] font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nuestra Filosofía</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#292725] font-normal leading-[1.1] tracking-tight">
              MENOS TENDENCIA. <br />
              <span className="italic text-[#B99663]">MÁS ESTILO.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#292725]/80 font-light leading-relaxed">
              Creemos en prendas que no dependen de una temporada. Diseños que puedes combinar, repetir y hacer tuyos para verte impecable sin esfuerzo en cualquier ocasión.
            </p>

            <p className="text-xs sm:text-sm text-[#A99B8B] leading-relaxed">
              Cada una de nuestras piezas es seleccionada bajo tres premisas innegociables: cortes favorecedores, materiales que perduran y una relación calidad-precio justa para la mujer contemporánea en México.
            </p>

            {/* Checklist items */}
            <div className="pt-2 space-y-2 text-xs text-[#292725]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99663]" />
                <span>Prendas versátiles que funcionan en el trabajo y en tus planes sociales.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99663]" />
                <span>Texturas suaves y transpirables ideales para el clima de México.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99663]" />
                <span>Cero complicaciones para combinar tus looks del día a día.</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="btn-editorial-primary inline-flex items-center gap-2"
              >
                <span>CONOCE LA COLECCIÓN</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
