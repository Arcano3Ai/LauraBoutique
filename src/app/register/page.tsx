'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

export default function RegisterPage() {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    login(email, name);
    toast('¡Cuenta creada con éxito!', {
      type: 'success',
      submessage: 'Disfruta de 10% OFF con el código LAURA10 en tu primera compra.'
    });
    router.push('/account');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-[80vh] py-14 flex items-center justify-center px-4 border-b border-[#DCCFBD]">
      <div className="max-w-md w-full bg-[#F7F2EA] p-8 sm:p-10 border border-[#DCCFBD] shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#B99663] bg-[#121110] mx-auto mb-3 shadow-md">
            <Image
              src="/images/logo.png"
              alt="My Boutique More Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99663] font-semibold block mb-1">
            Bienvenida
          </span>
          <h1 className="font-editorial text-3xl text-[#292725] font-normal">
            CREAR CUENTA
          </h1>
          <p className="text-xs text-[#A99B8B] mt-1 font-light">
            Únete a la comunidad de My Boutique More y recibe beneficios exclusivos.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
              Nombre Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Sofía Hernández"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
              Correo Electrónico *
            </label>
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
              Teléfono (WhatsApp para avisos de entrega)
            </label>
            <input
              type="tel"
              placeholder="55 1234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#292725] block mb-1">
              Contraseña *
            </label>
            <input
              type="password"
              required
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="btn-editorial-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2"
          >
            <span>REGISTRARME</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#DCCFBD] text-center text-xs text-[#292725]">
          <p>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-[#B99663] underline font-semibold">
              Iniciar Sesión
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
