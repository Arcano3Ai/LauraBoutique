'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, Ruler } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function FAQPage() {
  const openSizeGuide = useStore((state) => state.openSizeGuide);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Envíos y Entregas',
      q: '¿Cuánto tiempo tarda en llegar mi pedido?',
      a: 'Nuestros envíos estándar tardan entre 2 a 4 días hábiles en llegar a cualquier parte de la República Mexicana vía DHL o Estafeta. También contamos con opción exprés (día siguiente hábil en ciudades principales).'
    },
    {
      category: 'Envíos y Entregas',
      q: '¿Cómo obtengo envío gratis?',
      a: 'Todas las compras a partir de $1,499 MXN cuentan automáticamente con envío estándar nacional sin costo adicional.'
    },
    {
      category: 'Tallas y Ajuste',
      q: '¿Cómo sé cuál es mi talla adecuada?',
      a: 'Nuestros patrones están diseñados con medidas reales para la mujer mexicana. Puedes consultar nuestra Guía de Tallas con medidas en centímetros para busto, cintura y cadera.'
    },
    {
      category: 'Cambios y Devoluciones',
      q: '¿Puedo cambiar una prenda si no me quedó la talla?',
      a: '¡Claro que sí! Cuentas con 30 días naturales a partir de que recibes tu pedido para solicitar un cambio de talla sin costo de flete en tu primer cambio.'
    },
    {
      category: 'Métodos de Pago',
      q: '¿Qué formas de pago aceptan?',
      a: 'Aceptamos Tarjetas de Crédito y Débito (Visa, Mastercard, American Express), Mercado Pago, PayPal y pagos en efectivo en tiendas OXXO.'
    },
    {
      category: 'Cuidados de la Ropa',
      q: '¿Cómo debo lavar mis prendas de lino y viscosa?',
      a: 'Recomendamos lavar con agua fría y jabón neutro, en ciclo delicado o a mano. Evitar el uso de secadora caliente y secar a la sombra en superficie plana.'
    }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
            Centro de Ayuda
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
            PREGUNTAS FRECUENTES
          </h1>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Todo lo que necesitas saber sobre compras, envíos, cambios y cuidados en My Boutique More.
          </p>
        </div>

        {/* Quick Size Guide CTA */}
        <div className="bg-[#F7F2EA] p-5 border border-[#DCCFBD] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Ruler className="w-6 h-6 text-[#B99663] shrink-0" />
            <div>
              <h4 className="font-editorial text-lg text-[#292725]">¿Dudas con las medidas exactas?</h4>
              <p className="text-xs text-[#A99B8B]">Consulta nuestra tabla de medidas corporales en centímetros.</p>
            </div>
          </div>
          <button onClick={openSizeGuide} className="btn-editorial-primary text-xs whitespace-nowrap">
            Abrir Guía de Tallas
          </button>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#F7F2EA] border border-[#DCCFBD] p-5">
              <button
                onClick={() => setOpenQuestion(openQuestion === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B99663] font-semibold block mb-0.5">
                    {faq.category}
                  </span>
                  <span className="font-editorial text-base sm:text-lg text-[#292725] font-medium">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#A99B8B] shrink-0 transition-transform ${
                    openQuestion === idx ? 'rotate-180 text-[#B99663]' : ''
                  }`}
                />
              </button>
              {openQuestion === idx && (
                <div className="pt-3 mt-3 border-t border-[#DCCFBD]/60 text-xs text-[#292725]/80 leading-relaxed animate-fade-in">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-14 p-8 bg-[#292725] text-white text-center border border-[#3D3A37] space-y-4">
          <h3 className="font-editorial text-2xl">¿No encuentras lo que buscas?</h3>
          <p className="text-xs text-[#DCCFBD] max-w-md mx-auto font-light">
            Nuestro equipo de asesoría de imagen y atención a clientas está disponible para ayudarte en tiempo real.
          </p>
          <a
            href="https://wa.me/525500000000?text=Hola%20My%20Boutique%20More%20%F0%9F%91%8B%20Me%20gustar%C3%ADa%20recibir%20ayuda%20para%20elegir%20una%20prenda."
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-gold inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hablar con una Asesora por WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
