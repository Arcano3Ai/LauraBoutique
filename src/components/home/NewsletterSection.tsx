'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast('Por favor introduce un correo electrónico válido.', { type: 'error' });
      return;
    }

    setSubscribed(true);
    toast('¡Bienvenida a la comunidad de Laura Boutique!', {
      type: 'success',
      submessage: 'Te enviamos tu código de 10% de bienvenida a tu correo.'
    });
    setEmail('');
  };

  return (
    <section className="py-16 md:py-24 bg-[#F7F2EA] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle decorative emblem */}
        <div className="w-12 h-12 rounded-full bg-[#DCCFBD]/50 mx-auto flex items-center justify-center text-[#B99663] mb-6">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Title & Subtitle */}
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#292725] font-normal tracking-tight mb-3">
          FORMA PARTE DE LAURA
        </h2>
        <p className="text-xs sm:text-sm text-[#A99B8B] max-w-md mx-auto leading-relaxed mb-8 font-light">
          Recibe primero nuestras nuevas colecciones, promociones y consejos de estilo directamente en tu bandeja.
        </p>

        {/* Form Container */}
        {subscribed ? (
          <div className="bg-[#FDFBF7] p-6 border border-[#B99663] max-w-md mx-auto animate-fade-in shadow-md">
            <CheckCircle2 className="w-8 h-8 text-[#B99663] mx-auto mb-2" />
            <h4 className="font-editorial text-xl text-[#292725]">¡Gracias por suscribirte!</h4>
            <p className="text-xs text-[#A99B8B] mt-1">
              Usa el código <strong className="text-[#B99663]">BIENVENIDA15</strong> en tu primera compra para 15% OFF.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#FDFBF7] text-xs text-[#292725] placeholder-[#A99B8B] border border-[#DCCFBD] focus:outline-hidden focus:border-[#292725]"
                />
              </div>
              <button
                type="submit"
                className="btn-editorial-primary whitespace-nowrap py-3.5"
              >
                QUIERO SER PARTE
              </button>
            </div>
          </form>
        )}

        {/* Little guarantee note */}
        <p className="text-[11px] text-[#A99B8B] mt-4 font-light">
          Sin spam. Solo cosas bonitas y beneficios exclusivos para ti.
        </p>

      </div>
    </section>
  );
};
