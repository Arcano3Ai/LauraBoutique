'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronRight, ChevronDown, User, Heart, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';

export const MobileMenuDrawer: React.FC = () => {
  const isOpen = useStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = useStore((state) => state.closeMobileMenu);
  const user = useStore((state) => state.user);

  const [expandedSection, setExpandedSection] = useState<string | null>('ropa');

  if (!isOpen) return null;

  const toggleSection = (sec: string) => {
    setExpandedSection((prev) => (prev === sec ? null : sec));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={closeMobileMenu}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FDFBF7] shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in border-r border-[#DCCFBD]">
        {/* Drawer Header */}
        <div>
          <div className="p-4 border-b border-[#DCCFBD] flex items-center justify-between bg-[#F7F2EA]">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#B99663] bg-[#121110] shrink-0 shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="My Boutique More Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <span className="font-editorial text-lg font-bold tracking-wider text-[#292725] block leading-tight">
                  MY BOUTIQUE MORE
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#A99B8B] block">
                  Atemporal • Elegante
                </span>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-1.5 text-[#292725] hover:text-[#B99663] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 px-5 space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block py-2.5 text-xs font-semibold uppercase tracking-widest text-[#292725] hover:text-[#B99663] border-b border-[#DCCFBD]/40"
            >
              INICIO
            </Link>
            <Link
              href="/shop?badge=NUEVO"
              onClick={closeMobileMenu}
              className="block py-2.5 text-xs font-semibold uppercase tracking-widest text-[#292725] hover:text-[#B99663] border-b border-[#DCCFBD]/40"
            >
              NUEVO
            </Link>

            {/* Accordion ROPA */}
            <div className="border-b border-[#DCCFBD]/40">
              <button
                onClick={() => toggleSection('ropa')}
                className="w-full py-2.5 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#292725] hover:text-[#B99663]"
              >
                <span>ROPA</span>
                {expandedSection === 'ropa' ? (
                  <ChevronDown className="w-4 h-4 text-[#A99B8B]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#A99B8B]" />
                )}
              </button>

              {expandedSection === 'ropa' && (
                <div className="pl-4 pb-3 space-y-2 text-xs text-[#292725]/80">
                  <Link
                    href="/shop?category=vestidos"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Vestidos
                  </Link>
                  <Link
                    href="/shop?category=blusas"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Blusas
                  </Link>
                  <Link
                    href="/shop?category=pantalones"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Pantalones
                  </Link>
                  <Link
                    href="/shop?category=faldas"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Faldas
                  </Link>
                  <Link
                    href="/shop?category=sets"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Sets
                  </Link>
                  <Link
                    href="/shop?category=chamarras"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Chamarras
                  </Link>
                  <Link
                    href="/shop?category=basicos"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Básicos
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion POR OCASIÓN */}
            <div className="border-b border-[#DCCFBD]/40">
              <button
                onClick={() => toggleSection('ocasion')}
                className="w-full py-2.5 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#292725] hover:text-[#B99663]"
              >
                <span>POR OCASIÓN</span>
                {expandedSection === 'ocasion' ? (
                  <ChevronDown className="w-4 h-4 text-[#A99B8B]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#A99B8B]" />
                )}
              </button>

              {expandedSection === 'ocasion' && (
                <div className="pl-4 pb-3 space-y-2 text-xs text-[#292725]/80">
                  <Link
                    href="/shop?occasion=casual"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Casual
                  </Link>
                  <Link
                    href="/shop?occasion=oficina"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Oficina
                  </Link>
                  <Link
                    href="/shop?occasion=cena"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Cena
                  </Link>
                  <Link
                    href="/shop?occasion=evento"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Evento
                  </Link>
                  <Link
                    href="/shop?occasion=fin-de-semana"
                    onClick={closeMobileMenu}
                    className="block py-1 hover:text-[#B99663]"
                  >
                    Fin de semana
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/shop?category=accesorios"
              onClick={closeMobileMenu}
              className="block py-2.5 text-xs font-semibold uppercase tracking-widest text-[#292725] hover:text-[#B99663] border-b border-[#DCCFBD]/40"
            >
              ACCESORIOS
            </Link>

            <Link
              href="/shop?badge=SALE"
              onClick={closeMobileMenu}
              className="block py-2.5 text-xs font-semibold uppercase tracking-widest text-[#C48B71] hover:text-[#292725] border-b border-[#DCCFBD]/40"
            >
              SALE
            </Link>
          </div>

          {/* User & Help Shortcuts */}
          <div className="px-5 py-4 bg-[#F7F2EA]/60 border-t border-[#DCCFBD] space-y-3">
            <Link
              href={user ? '/account' : '/login'}
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-xs font-medium text-[#292725] hover:text-[#B99663]"
            >
              <User className="w-4 h-4 text-[#A99B8B]" />
              <span>{user ? `Hola, ${user.name.split(' ')[0]}` : 'Iniciar Sesión / Registro'}</span>
            </Link>
            <Link
              href="/nosotros"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-xs font-medium text-[#292725] hover:text-[#B99663]"
            >
              <Sparkles className="w-4 h-4 text-[#B99663]" />
              <span>Nuestra Historia</span>
            </Link>
            <Link
              href="/contacto"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 text-xs font-medium text-[#292725] hover:text-[#B99663]"
            >
              <MessageCircle className="w-4 h-4 text-[#A99B8B]" />
              <span>Ayuda & Contacto</span>
            </Link>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-5 border-t border-[#DCCFBD] bg-[#F7F2EA] text-center">
          <p className="text-[10px] text-[#A99B8B] tracking-widest uppercase">
            Moneda: MXN ($) • Envíos a todo México
          </p>
        </div>
      </div>
    </div>
  );
};
