'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Star, Heart, Check, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ProductColor, ProductSize } from '@/types';
import { useToast } from '@/components/ui/ToastProvider';

export const QuickViewModal: React.FC = () => {
  const product = useStore((state) => state.quickViewProduct);
  const closeQuickView = useStore((state) => state.closeQuickView);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => (product ? state.isInWishlist(product.id) : false));
  const openSizeGuide = useStore((state) => state.openSizeGuide);
  const { toast } = useToast();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.sizes[0];

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize, 1);
    toast(`¡${product.name} agregado al carrito!`, {
      type: 'success',
      submessage: `Talla: ${currentSize} | Color: ${currentColor.name}`
    });
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-[#292725]/70 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative bg-[#FDFBF7] w-full max-w-4xl border border-[#DCCFBD] shadow-2xl overflow-hidden animate-fade-in z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FDFBF7]/80 hover:bg-[#FDFBF7] text-[#292725] rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Column */}
        <div className="relative bg-[#ECE5DC] h-72 md:h-[480px]">
          <img
            src={product.images[activeImageIdx] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Thumbnail dots if multiple */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeImageIdx === idx ? 'bg-[#292725] w-6' : 'bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[480px]">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-widest text-[#B99663] font-semibold">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-[#B99663] text-xs">
                <Star className="w-3.5 h-3.5 fill-[#B99663]" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-[#A99B8B]">({product.reviewCount})</span>
              </div>
            </div>

            <h3 className="font-editorial text-2xl font-semibold text-[#292725] mb-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold text-[#292725]">
                ${product.price.toLocaleString('es-MX')} MXN
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-[#A99B8B]">
                  ${product.originalPrice.toLocaleString('es-MX')} MXN
                </span>
              )}
            </div>

            <p className="text-xs text-[#A99B8B] leading-relaxed mb-6">
              {product.tagline}
            </p>

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725]">
                  Color: <span className="text-[#A99B8B] font-normal">{currentColor.name}</span>
                </label>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                      currentColor.name === c.name
                        ? 'border-[#292725] scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {currentColor.name === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#FDFBF7' || c.hex === '#FFFFFF' || c.hex === '#F7F2EA' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725]">
                  Talla
                </label>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="text-[10px] uppercase tracking-wider text-[#B99663] underline font-medium hover:text-[#292725]"
                >
                  ¿Cuál es mi talla?
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-10 h-10 px-3 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      currentSize === s
                        ? 'bg-[#292725] text-white border-[#292725]'
                        : 'bg-transparent text-[#292725] border-[#DCCFBD] hover:border-[#292725]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#DCCFBD]/50">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-editorial-primary flex-1 text-center"
              >
                Agregar al Carrito
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Favoritos"
                className={`w-12 h-12 flex items-center justify-center border transition-colors ${
                  isInWishlist
                    ? 'border-[#B99663] bg-[#B99663]/10 text-[#B99663]'
                    : 'border-[#DCCFBD] text-[#292725] hover:border-[#292725]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-[#B99663]' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={closeQuickView}
              className="text-xs uppercase tracking-wider text-[#A99B8B] hover:text-[#292725] flex items-center justify-center gap-1.5 py-1 text-center font-medium"
            >
              <span>Ver ficha de producto completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
