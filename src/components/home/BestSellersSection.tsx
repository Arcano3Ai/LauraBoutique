'use client';

import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/lib/store';

export const BestSellersSection: React.FC = () => {
  const products = useStore((state) => state.products);
  const bestSellers = products.filter((p) => p.isBestSeller || p.badge === 'BEST SELLER');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7F2EA] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Rating Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-[#B99663]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#B99663]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#292725]">
                4.9 · 128 reseñas verificadas
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
              LOS FAVORITOS DE LAURA
            </h2>
            <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
              Las piezas que nuestras clientas están amando y repitiendo.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Anterior"
              className="w-10 h-10 border border-[#DCCFBD] bg-[#FDFBF7] flex items-center justify-center text-[#292725] hover:bg-[#292725] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Siguiente"
              className="w-10 h-10 border border-[#DCCFBD] bg-[#FDFBF7] flex items-center justify-center text-[#292725] hover:bg-[#292725] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory"
        >
          {bestSellers.map((prod) => (
            <div
              key={prod.id}
              className="min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] snap-start"
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
