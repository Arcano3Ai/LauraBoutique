'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useStore } from '@/lib/store';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const cartCount = useStore((state) => state.getCartCount());
  const wishlistCount = useStore((state) => state.wishlist.length);
  const openCart = useStore((state) => state.openCart);
  const openSearch = useStore((state) => state.openSearch);
  const openMobileMenu = useStore((state) => state.openMobileMenu);

  return (
    <nav
      aria-label="Navegación Móvil Inferior"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#DCCFBD] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        
        {/* Inicio */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === '/' ? 'text-[#B99663]' : 'text-[#292725] hover:text-[#B99663]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Inicio</span>
        </Link>

        {/* Buscar */}
        <button
          onClick={openSearch}
          className="flex flex-col items-center justify-center py-1 text-[#292725] hover:text-[#B99663] transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Buscar</span>
        </button>

        {/* Favoritos */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
            pathname === '/wishlist' ? 'text-[#B99663]' : 'text-[#292725] hover:text-[#B99663]'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-3 bg-[#B99663] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Favoritos</span>
        </Link>

        {/* Carrito */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 text-[#292725] hover:text-[#B99663] transition-colors relative"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 bg-[#292725] text-[#F7F2EA] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Carrito</span>
        </button>

        {/* Menú */}
        <button
          onClick={openMobileMenu}
          className="flex flex-col items-center justify-center py-1 text-[#292725] hover:text-[#B99663] transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Menú</span>
        </button>

      </div>
    </nav>
  );
};
