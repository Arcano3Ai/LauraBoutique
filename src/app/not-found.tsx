import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#FDFBF7] min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center border-b border-[#DCCFBD]">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99663] font-bold block mb-2">
        Error 404
      </span>
      <h1 className="font-editorial text-4xl sm:text-6xl text-[#292725] mb-3 font-normal">
        PÁGINA NO ENCONTRADA
      </h1>
      <p className="text-xs sm:text-sm text-[#A99B8B] max-w-md mx-auto mb-8 font-light">
        La sección que estás buscando no existe o ha cambiado de lugar. Te invitamos a regresar a nuestra colección.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-editorial-secondary">
          Ir al Inicio
        </Link>
        <Link href="/shop" className="btn-editorial-primary inline-flex items-center gap-2">
          <span>Explorar Catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
