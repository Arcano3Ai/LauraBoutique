'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const message = encodeURIComponent(
    'Hola My Boutique More 👋 Me gustaría recibir ayuda para elegir una prenda.'
  );
  const whatsappUrl = `https://wa.me/525500000000?text=${message}`;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex flex-col items-end group">
      
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div className="mb-2 bg-[#FDFBF7] text-[#292725] text-xs p-3 shadow-xl border border-[#DCCFBD] max-w-xs relative animate-fade-in flex items-start gap-2">
          <p className="leading-relaxed text-[11px]">
            ¿Dudas con tu talla o look? <span className="font-semibold text-[#B99663]">Escríbenos por WhatsApp</span>.
          </p>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#A99B8B] hover:text-[#292725] p-0.5"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Tooltip triangle indicator */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-[#FDFBF7] border-b border-r border-[#DCCFBD] rotate-45" />
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a My Boutique More"
        className="w-13 h-13 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 hover:bg-[#20bd5a] transition-all duration-300 relative"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        {/* Pulse ripple */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
      </a>
    </div>
  );
};
