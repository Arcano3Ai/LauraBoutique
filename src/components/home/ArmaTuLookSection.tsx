'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';
import { LOOK_BUNDLE_DATA, PRODUCTS_DATA } from '@/data/mockData';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

export const ArmaTuLookSection: React.FC = () => {
  const addToCart = useStore((state) => state.addToCart);
  const openCart = useStore((state) => state.openCart);
  const { toast } = useToast();

  const handleBuyEntireLook = () => {
    // Find each product in catalog and add to cart
    LOOK_BUNDLE_DATA.items.forEach((item) => {
      const product = PRODUCTS_DATA.find((p) => p.name.toLowerCase() === item.name.toLowerCase());
      if (product) {
        addToCart(product, product.colors[0], product.sizes[0], 1);
      }
    });

    toast('¡Look Completo agregado a tu carrito!', {
      type: 'success',
      submessage: 'Vestido Aura + Bolsa Siena + Aretes Alma ($1,697 MXN)'
    });
    openCart();
  };

  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-2">
            Estilismo Completo
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
            ARMA TU LOOK
          </h2>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Conjuntos curados por nuestro equipo de diseño para resolver tu outfit en un instante.
          </p>
        </div>

        {/* 2-Column Look Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F7F2EA] p-6 sm:p-10 border border-[#DCCFBD]">
          
          {/* Left Column: Full Editorial Styled Photo */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-4/5 sm:aspect-16/11 w-full bg-[#ECE5DC] overflow-hidden border border-[#DCCFBD] shadow-lg group">
              <img
                src={LOOK_BUNDLE_DATA.image}
                alt="Laura Boutique Look Completo 01"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000"
              />

              {/* Look Badge */}
              <div className="absolute top-4 left-4 bg-[#292725] text-white px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold shadow-md">
                {LOOK_BUNDLE_DATA.name}
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown & Bundle Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B99663] block mb-1">
                Outfit Curado
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#292725]">
                {LOOK_BUNDLE_DATA.name}: Minimalismo Cálido
              </h3>
              <p className="text-xs text-[#A99B8B] mt-1 font-light leading-relaxed">
                {LOOK_BUNDLE_DATA.tagline}
              </p>
            </div>

            {/* Itemized List */}
            <div className="divide-y divide-[#DCCFBD]/70 border-y border-[#DCCFBD]/70 py-2">
              {LOOK_BUNDLE_DATA.items.map((item, idx) => {
                const product = PRODUCTS_DATA.find((p) => p.name.toLowerCase() === item.name.toLowerCase());
                return (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#B99663]/15 text-[#B99663] text-[10px] font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      {product ? (
                        <Link
                          href={`/product/${product.slug}`}
                          className="text-xs font-semibold text-[#292725] hover:text-[#B99663] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span className="text-xs font-semibold text-[#292725]">{item.name}</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#292725]">
                      ${item.price.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total Look Calculation */}
            <div className="bg-[#FDFBF7] p-4 border border-[#DCCFBD] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] block">
                  Precio Total del Look
                </span>
                <span className="text-xl font-bold text-[#292725]">
                  ${LOOK_BUNDLE_DATA.totalPrice.toLocaleString('es-MX')} MXN
                </span>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B99663] bg-[#B99663]/10 px-2.5 py-1 border border-[#B99663]/20">
                  <Sparkles className="w-3 h-3" />
                  Envío Gratis Incluido
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleBuyEntireLook}
              className="btn-editorial-primary w-full flex items-center justify-center gap-2 text-center shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>COMPRAR EL LOOK COMPLETO</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
