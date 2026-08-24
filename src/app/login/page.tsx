'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    login(email, 'Clienta My Boutique More');
    toast('¡Bienvenida de vuelta a My Boutique More!', { type: 'success' });
    router.push('/account');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-[75vh] py-14 flex items-center justify-center px-4 border-b border-[#DCCFBD]">
      <div className="max-w-md w-full bg-[#F7F2EA] p-8 sm:p-10 border border-[#DCCFBD] shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99663] font-semibold block mb-1">
            My Boutique More
          </span>
          <h1 className="font-editorial text-3xl text-[#292725] font-normal">
            INICIAR SESIÓN
          </h1>
          <p className="text-xs text-[#A99B8B] mt-1 font-light">
            Accede a tu historial de compras y pedidos guardados.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden focus:border-[#292725]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725]">
                Contraseña
              </label>
              <a href="#" className="text-[10px] text-[#B99663] underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden focus:border-[#292725]"
            />
          </div>

          <button
            type="submit"
            className="btn-editorial-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2"
          >
            <span>INGRESAR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#DCCFBD] text-center text-xs text-[#292725]">
          <p>
            ¿Aún no tienes cuenta?{' '}
            <Link href="/register" className="text-[#B99663] underline font-semibold">
              Crear cuenta nueva
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
