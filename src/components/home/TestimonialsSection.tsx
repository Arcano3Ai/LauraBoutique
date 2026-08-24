'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-2">
            Opiniones Reales
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
            ELLAS YA ENCONTRARON SU ESTILO
          </h2>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Experiencias de mujeres que eligen verse elegantes todos los días.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-[#F7F2EA] p-8 border border-[#DCCFBD] flex flex-col justify-between relative group hover:border-[#B99663] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#B99663]/30 mb-4" />

              {/* Stars */}
              <div className="flex text-[#B99663] mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B99663]" />
                ))}
              </div>

              {/* Comment text */}
              <p className="font-editorial text-lg text-[#292725] leading-relaxed mb-6 font-normal">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#DCCFBD]/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                    — {t.name}
                  </h4>
                  <span className="text-[11px] text-[#A99B8B] font-light">
                    {t.city}
                  </span>
                </div>
                <span className="text-[10px] text-[#B99663] font-semibold uppercase tracking-wider bg-[#B99663]/10 px-2 py-0.5">
                  Compra Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
