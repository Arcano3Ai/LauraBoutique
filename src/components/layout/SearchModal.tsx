'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';

export const SearchModal: React.FC = () => {
  const isOpen = useStore((state) => state.isSearchOpen);
  const closeSearch = useStore((state) => state.closeSearch);
  const products = useStore((state) => state.products);

  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.occasion && p.occasion.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-[#292725]/70 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative bg-[#FDFBF7] w-full max-w-3xl border border-[#DCCFBD] shadow-2xl overflow-hidden animate-fade-in z-10">
        
        {/* Search Bar Input */}
        <div className="p-5 sm:p-6 border-b border-[#DCCFBD] flex items-center gap-4 bg-[#F7F2EA]">
          <Search className="w-6 h-6 text-[#A99B8B] shrink-0" />
          <input
            type="text"
            placeholder="Buscar vestidos, blusas, pantalones, sets, accesorios..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-[#292725] placeholder-[#A99B8B] focus:outline-hidden font-normal"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#A99B8B] hover:text-[#292725] text-xs uppercase tracking-wider font-semibold"
            >
              Borrar
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-[#292725] hover:text-[#B99663] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A99B8B] font-semibold mb-4">
                Búsquedas populares
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Vestido Aura', 'Pantalón Siena', 'Blusa Isabella', 'Set Olivia', 'Lino', 'Vestidos de fiesta', 'Blazer'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 bg-[#F7F2EA] text-[#292725] text-xs border border-[#DCCFBD] hover:border-[#B99663] hover:text-[#B99663] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#DCCFBD]/50 flex items-center justify-between">
                <span className="text-xs text-[#A99B8B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B99663]" />
                  Envíos a todo México en compras desde $1,499 MXN
                </span>
                <Link
                  href="/shop"
                  onClick={closeSearch}
                  className="text-xs font-semibold uppercase tracking-wider text-[#292725] hover:text-[#B99663] inline-flex items-center gap-1"
                >
                  <span>Ver todo el catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A99B8B] font-semibold mb-4">
                {filteredProducts.length} resultado{filteredProducts.length > 1 ? 's' : ''} para &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 p-3 bg-[#F7F2EA] border border-[#DCCFBD]/60 hover:border-[#B99663] transition-all group"
                  >
                    <div className="w-16 h-20 relative bg-[#ECE5DC] overflow-hidden shrink-0">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#B99663] font-semibold block">
                        {p.categoryName}
                      </span>
                      <h4 className="font-editorial text-base text-[#292725] truncate group-hover:text-[#B99663] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#292725] mt-1">
                        ${p.price.toLocaleString('es-MX')} MXN
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-editorial text-xl text-[#292725] mb-2">
                No encontramos resultados para &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#A99B8B] max-w-sm mx-auto mb-6">
                Intenta buscar por tipo de prenda (ej. vestidos, blusas, pantalones) o explora nuestras categorías destacadas.
              </p>
              <Link
                href="/shop"
                onClick={closeSearch}
                className="btn-editorial-primary inline-flex"
              >
                Ver Todo el Catálogo
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
