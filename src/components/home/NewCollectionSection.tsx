'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/lib/store';

export const NewCollectionSection: React.FC = () => {
  const products = useStore((state) => state.products);
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'vestidos' | 'blusas' | 'pantalones' | 'sets'>('todos');

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'todos') return true;
    return p.category === selectedFilter;
  }).slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-[#F7F2EA] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-2">
              Lanzamientos
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
              NUEVA COLECCIÓN
            </h2>
            <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
              Piezas pensadas para acompañarte hoy y siempre.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'todos', label: 'Todas las piezas' },
              { id: 'vestidos', label: 'Vestidos' },
              { id: 'blusas', label: 'Blusas' },
              { id: 'pantalones', label: 'Pantalones' },
              { id: 'sets', label: 'Sets' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border ${
                  selectedFilter === tab.id
                    ? 'bg-[#292725] text-white border-[#292725]'
                    : 'bg-transparent text-[#292725] border-[#DCCFBD] hover:border-[#292725]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Columns Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/shop"
            className="btn-editorial-primary inline-flex items-center gap-2"
          >
            <span>VER CATÁLOGO COMPLETO</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
