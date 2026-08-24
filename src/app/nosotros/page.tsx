import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, ShieldCheck } from 'lucide-react';

export default function NosotrosPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-20 border-b border-[#DCCFBD]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Top Headline */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[#B99663] text-[10px] font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestra Esencia</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#292725] font-normal leading-[1.1]">
            ELEGANCIA QUE SÍ PUEDES <span className="italic text-[#B99663]">PERMITIRTE</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A99B8B] font-light leading-relaxed">
            Laura Boutique nació para romper el mito de que vestir con distinción y prendas atemporales debe ser exclusivo o inaccesible.
          </p>
        </div>

        {/* Big Editorial Photo */}
        <div className="aspect-16/9 sm:aspect-21/9 w-full bg-[#ECE5DC] overflow-hidden border border-[#DCCFBD] shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1600"
            alt="Laura Boutique Taller y Confección"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2-Column Manifesto Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 text-xs sm:text-sm text-[#292725]/80 leading-relaxed font-light">
          <div className="space-y-4">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#292725] font-normal">
              Prendas para vivir, combinar y repetir
            </h3>
            <p>
              En un mundo dominado por modas efímeras y tendencias que caducan en semanas, en Laura Boutique apostamos por la belleza de lo atemporal. Diseñamos piezas que celebran la feminidad con cortes limpios, paletas neutras y caídas nobles que favorecen a la mujer contemporánea en México.
            </p>
            <p>
              Creemos firmemente en el poder de un buen lino, una viscosa fluida o un corte sastre estructurado para transformar tu seguridad desde la mañana en la oficina hasta una cena especial.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#292725] font-normal">
              El equilibrio entre calidad y accesibilidad
            </h3>
            <p>
              Trabajamos directamente con talleres de confección calificados para ofrecerte piezas que se sienten y lucen de alta gama, manteniendo precios honestos que te permiten construir un armario cápsula sin comprometer tu presupuesto.
            </p>
            <p>
              Cada prenda que sale de nuestro showroom en Ciudad de México lleva el compromiso de hacerte sentir cómoda, hermosa y lista para cualquier momento de tu día a día.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Laura Boutique */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#DCCFBD]">
          <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] text-center space-y-2">
            <span className="font-editorial text-xl font-bold text-[#292725] block">Atemporal</span>
            <p className="text-xs text-[#A99B8B]">Diseños que no pasan de moda y que puedes usar año tras año sin perder vigencia.</p>
          </div>

          <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] text-center space-y-2">
            <span className="font-editorial text-xl font-bold text-[#B99663] block">Elegante</span>
            <p className="text-xs text-[#A99B8B]">Siluetas sofisticadas y detalles cuidados que elevan cualquier ocasión cotidiana.</p>
          </div>

          <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] text-center space-y-2">
            <span className="font-editorial text-xl font-bold text-[#292725] block">Accesible</span>
            <p className="text-xs text-[#A99B8B]">Precios justos pensados para la mujer real sin sacrificar tacto ni confección.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/shop" className="btn-editorial-primary inline-flex items-center gap-2">
            <span>DESCUBRE NUESTRAS PRENDAS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
