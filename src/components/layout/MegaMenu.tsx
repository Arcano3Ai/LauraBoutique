'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-[#DCCFBD] shadow-2xl z-40 animate-fade-in transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* Column 1: Categorías de Ropa */}
        <div className="col-span-3">
          <h4 className="font-editorial text-lg tracking-wide text-[#292725] mb-4 pb-2 border-b border-[#DCCFBD]/50 font-normal">
            ROPA
          </h4>
          <ul className="space-y-2.5">
            {[
              { name: 'Vestidos', href: '/shop?category=vestidos' },
              { name: 'Blusas', href: '/shop?category=blusas' },
              { name: 'Pantalones', href: '/shop?category=pantalones' },
              { name: 'Faldas', href: '/shop?category=faldas' },
              { name: 'Sets', href: '/shop?category=sets' },
              { name: 'Chamarras', href: '/shop?category=chamarras' },
              { name: 'Básicos', href: '/shop?category=basicos' }
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-[#292725]/80 hover:text-[#B99663] transition-colors inline-block py-1 font-medium hover:translate-x-1 duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Por Ocasión */}
        <div className="col-span-3">
          <h4 className="font-editorial text-lg tracking-wide text-[#292725] mb-4 pb-2 border-b border-[#DCCFBD]/50 font-normal">
            POR OCASIÓN
          </h4>
          <ul className="space-y-2.5">
            {[
              { name: 'Casual', href: '/shop?occasion=casual' },
              { name: 'Oficina', href: '/shop?occasion=oficina' },
              { name: 'Cena', href: '/shop?occasion=cena' },
              { name: 'Evento', href: '/shop?occasion=evento' },
              { name: 'Fin de semana', href: '/shop?occasion=fin-de-semana' }
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-[#292725]/80 hover:text-[#B99663] transition-colors inline-block py-1 font-medium hover:translate-x-1 duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Destacados Editoriales */}
        <div className="col-span-3 bg-[#F7F2EA] p-6 flex flex-col justify-between border border-[#DCCFBD]/60">
          <div>
            <div className="flex items-center gap-1.5 text-[#B99663] text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Edición Especial</span>
            </div>
            <h5 className="font-editorial text-xl text-[#292725] leading-tight mb-2">
              Colección Cápsula Primavera-Verano
            </h5>
            <p className="text-xs text-[#A99B8B] leading-relaxed">
              Prendas seleccionadas con linos suaves y tonos neutros combinables entre sí.
            </p>
          </div>
          <Link
            href="/shop?badge=NUEVO"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#292725] hover:text-[#B99663] mt-4 transition-colors group"
          >
            <span>Ver Colección</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Column 4: Card Visual */}
        <div className="col-span-3 relative h-64 overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
            alt="Laura Boutique Colección"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#DCCFBD]">
              Favoritos de Temporada
            </span>
            <p className="font-editorial text-lg text-white">Vestido Aura & Set Olivia</p>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-[11px] uppercase tracking-wider text-white underline underline-offset-4 mt-1 hover:text-[#DCCFBD]"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
