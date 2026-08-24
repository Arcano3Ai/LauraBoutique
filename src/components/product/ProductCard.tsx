'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product, ProductSize } from '@/types';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const addToCart = useStore((state) => state.addToCart);
  const openQuickView = useStore((state) => state.openQuickView);
  const { toast } = useToast();

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], size, 1);
    toast(`¡${product.name} agregado al carrito!`, {
      type: 'success',
      submessage: `Talla: ${size} | Color: ${product.colors[0].name}`
    });
    setShowQuickSizes(false);
  };

  const badgeStyles: Record<string, string> = {
    NUEVO: 'bg-[#292725] text-[#FDFBF7]',
    'BEST SELLER': 'bg-[#B99663] text-[#FDFBF7]',
    'ÚLTIMAS PIEZAS': 'bg-[#A99B8B] text-[#FDFBF7]',
    SALE: 'bg-[#C48B71] text-[#FDFBF7]'
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col justify-between bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image Container with Hover Flip */}
      <div className="relative aspect-3/4 w-full bg-[#ECE5DC] overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 shadow-sm ${
                badgeStyles[product.badge] || 'bg-[#292725] text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 bg-[#C48B71] text-white">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Agregar a favoritos"
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isInWishlist
              ? 'bg-[#FDFBF7] text-[#B99663] shadow-md'
              : 'bg-[#FDFBF7]/80 text-[#292725] hover:bg-[#FDFBF7] hover:text-[#B99663]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-[#B99663]' : ''}`} />
        </button>

        {/* Product Images with Cross-Fade / Slide on Hover */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} vista alterna`}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${
                isHovered ? 'opacity-100 scale-105 transition-transform duration-1000' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Quick View Button on Desktop Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
          }}
          aria-label="Vista rápida"
          className="hidden md:flex items-center gap-1.5 absolute bottom-14 left-1/2 -translate-x-1/2 bg-[#FDFBF7]/90 backdrop-blur-xs text-[#292725] text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 border border-[#DCCFBD] shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#292725] hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Rápida</span>
        </button>

        {/* Quick Add To Cart Button / Size Selector Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {showQuickSizes ? (
            <div className="bg-[#292725] text-white p-3 animate-fade-in flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-[#DCCFBD] mb-2 font-medium">
                Selecciona tu talla
              </span>
              <div className="flex gap-1.5 justify-center flex-wrap">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(sz, e)}
                    className="px-2.5 py-1 text-[11px] font-bold bg-[#3D3A37] hover:bg-[#B99663] text-white transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.sizes.length === 1 && product.sizes[0] === 'ÚNICA') {
                  handleQuickAdd('ÚNICA', e);
                } else {
                  setShowQuickSizes(true);
                }
              }}
              className="w-full bg-[#292725]/90 md:bg-[#292725] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-[#B99663] transition-colors md:opacity-0 md:group-hover:opacity-100 duration-300"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Agregar al Carrito</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-2 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#A99B8B] mb-1">
            <span className="uppercase tracking-widest font-medium">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[#B99663]">
              <Star className="w-3 h-3 fill-[#B99663]" />
              <span className="font-semibold">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#B99663] transition-colors">
            <h3 className="font-editorial text-base sm:text-lg font-medium text-[#292725] leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          <p className="text-[11px] text-[#A99B8B] line-clamp-1 mt-0.5 font-light">
            {product.tagline}
          </p>
        </div>

        {/* Price & Swatches */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#292725]">
              ${product.price.toLocaleString('es-MX')} MXN
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-[#A99B8B]">
                ${product.originalPrice.toLocaleString('es-MX')}
              </span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center gap-1">
            {product.colors.map((col) => (
              <span
                key={col.name}
                className="w-2.5 h-2.5 rounded-full border border-[#DCCFBD]"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
