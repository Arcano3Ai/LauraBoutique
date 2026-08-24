'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[65vh] bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center border-b border-[#DCCFBD]">
        <div className="w-16 h-16 rounded-full bg-[#ECE5DC] flex items-center justify-center text-[#B99663] mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] mb-2 font-normal">
          Tu lista de favoritos está vacía
        </h1>
        <p className="text-xs sm:text-sm text-[#A99B8B] max-w-md mx-auto mb-8 font-light">
          Guarda las prendas que más te gusten haciendo clic en el corazón ♡ para tenerlas siempre a mano.
        </p>
        <Link href="/shop" className="btn-editorial-primary inline-flex items-center gap-2">
          <span>Descubrir Colección</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-[#DCCFBD]/70 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
              Guardados para ti
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
              MIS FAVORITOS ({wishlist.length})
            </h1>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-wider text-[#B99663] underline font-semibold hover:text-[#292725]">
            Seguir explorando piezas
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
