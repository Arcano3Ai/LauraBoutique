'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/mockData';

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-2">
            Categorías Seleccionadas
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
            DESCUBRE TU ESTILO
          </h2>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-2 font-light">
            Prendas diseñadas para complementarse y crear un armario versátil y sofisticado.
          </p>
        </div>

        {/* Categories Grid (5 categories in editorial masonry/grid layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <Link
              key={cat.id}
              href={cat.link}
              className={`group relative overflow-hidden bg-[#ECE5DC] border border-[#DCCFBD] flex flex-col justify-end min-h-[380px] sm:min-h-[420px] transition-all duration-500 hover:shadow-xl ${
                idx === 0 || idx === 3 ? 'lg:translate-y-2' : ''
              }`}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/90 via-[#292725]/40 to-transparent transition-opacity duration-300" />

              {/* Card Content */}
              <div className="relative z-10 p-6 text-white flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#DCCFBD] mb-1">
                  Colección
                </span>
                <h3 className="font-editorial text-2xl font-normal tracking-wide text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#ECE5DC]/90 font-light line-clamp-2 mb-4 leading-relaxed">
                  &ldquo;{cat.tagline}&rdquo;
                </p>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-white group-hover:text-[#DCCFBD] transition-colors">
                  <span>VER COLECCIÓN</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
