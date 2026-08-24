'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, User as UserIcon, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const cartCount = useStore((state) => state.getCartCount());
  const wishlistCount = useStore((state) => state.wishlist.length);
  const openCart = useStore((state) => state.openCart);
  const openSearch = useStore((state) => state.openSearch);
  const openMobileMenu = useStore((state) => state.openMobileMenu);
  const user = useStore((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', href: '/' },
    { name: 'NUEVO', href: '/shop?badge=NUEVO' },
    { name: 'ROPA', href: '/shop', hasMegaMenu: true },
    { name: 'VESTIDOS', href: '/shop?category=vestidos' },
    { name: 'BLUSAS', href: '/shop?category=blusas' },
    { name: 'PANTALONES', href: '/shop?category=pantalones' },
    { name: 'SETS', href: '/shop?category=sets' },
    { name: 'ACCESORIOS', href: '/shop?category=accesorios' },
    { name: 'SALE', href: '/shop?badge=SALE', highlight: true }
  ];

  return (
    <header className="w-full z-40 sticky top-0 transition-all duration-300">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#292725] text-[#F7F2EA] text-[11px] uppercase tracking-[0.18em] py-2 px-4 text-center font-medium border-b border-[#3D3A37]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <span>Envío gratis en compras mayores a $1,499 MXN</span>
          <span className="hidden sm:inline text-[#B99663]">•</span>
          <span className="hidden sm:inline">3 y 6 MSI con tarjetas participantes</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-md py-3 border-b border-[#DCCFBD]/80'
            : 'bg-[#F7F2EA] py-5 border-b border-[#DCCFBD]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={openMobileMenu}
              aria-label="Abrir Menú"
              className="p-2 text-[#292725] hover:text-[#B99663] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo - Bien Grande */}
          <div className="flex-1 lg:flex-none text-center lg:text-left py-1">
            <Link href="/" className="inline-flex items-center gap-3 sm:gap-4 group">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full overflow-hidden shadow-2xl border-2 border-[#B99663] group-hover:scale-105 group-hover:border-[#D4AF77] transition-all duration-300 bg-[#121110] shrink-0 ring-4 ring-[#B99663]/20">
                <img
                  src="/images/logo.jpg"
                  alt="My Boutique More Logo Oficial"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div className="text-left">
                <span className="font-editorial text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider text-[#1C1A18] block group-hover:text-[#B99663] transition-colors leading-tight">
                  MY BOUTIQUE MORE
                </span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-[#A99B8B] font-medium block mt-0.5">
                  Atemporal • Elegante • Accesible
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <Link
                      href={link.href}
                      className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-[#B99663] font-semibold'
                          : 'text-[#292725] hover:text-[#B99663]'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3 h-3 text-[#A99B8B]" />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors py-2 relative ${
                    link.highlight
                      ? 'text-[#C48B71] font-semibold hover:text-[#292725]'
                      : isActive
                      ? 'text-[#B99663] font-semibold'
                      : 'text-[#292725] hover:text-[#B99663]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B99663]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Utility Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Buscar"
              className="p-2 text-[#292725] hover:text-[#B99663] transition-colors relative group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              aria-label="Favoritos"
              className="p-2 text-[#292725] hover:text-[#B99663] transition-colors relative group"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#B99663] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login Link */}
            <Link
              href={user ? '/account' : '/login'}
              aria-label="Mi Cuenta"
              className="p-2 text-[#292725] hover:text-[#B99663] transition-colors relative group hidden sm:inline-flex"
            >
              <UserIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label="Carrito"
              className="p-2 text-[#292725] hover:text-[#B99663] transition-colors relative group flex items-center"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#292725] text-[#F7F2EA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#F7F2EA]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />
    </header>
  );
};
