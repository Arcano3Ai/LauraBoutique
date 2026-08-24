'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Clock, Phone, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/ToastProvider';

export default function ContactoPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Asesoría de Tallas', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast('¡Mensaje enviado con éxito! Te responderemos en menos de 24 horas.', { type: 'success' });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
            Atención Personalizada
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
            CONTACTO & ASESORÍA
          </h1>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Estamos aquí para orientarte con tallas, combinaciones de prendas o cualquier detalle de tu pedido.
          </p>
        </div>

        {/* 2 Columns: Contact Information + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Box */}
            <div className="p-6 bg-[#292725] text-white border border-[#3D3A37] space-y-3">
              <div className="flex items-center gap-2 text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Canal Prioritario WhatsApp</span>
              </div>
              <p className="text-xs text-[#DCCFBD] font-light leading-relaxed">
                ¿Necesitas respuesta inmediata? Nuestro equipo de estilistas te atiende de manera directa por WhatsApp.
              </p>
              <a
                href="https://wa.me/525500000000?text=Hola%20My%20Boutique%20More%20%F0%9F%91%8B%20Me%20gustar%C3%ADa%20recibir%20ayuda%20para%20elegir%20una%20prenda."
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-gold w-full text-center inline-flex items-center justify-center gap-2 text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>

            {/* General Info Cards */}
            <div className="bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4 text-xs text-[#292725]">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B99663] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider">Horario de Atención</strong>
                  <p className="text-[#A99B8B]">Lunes a Viernes: 9:00 am – 8:00 pm</p>
                  <p className="text-[#A99B8B]">Sábados: 10:00 am – 6:00 pm</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B99663] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider">Correo Electrónico</strong>
                  <p className="text-[#A99B8B]">contacto@myboutiquemore.com</p>
                  <p className="text-[#A99B8B]">pedidos@myboutiquemore.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B99663] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] uppercase tracking-wider">Boutique & Showroom</strong>
                  <p className="text-[#A99B8B]">Polanco, Ciudad de México, México</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F2EA] p-8 border border-[#DCCFBD]">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#B99663] mx-auto" />
                <h3 className="font-editorial text-2xl text-[#292725]">¡Gracias por escribirnos!</h3>
                <p className="text-xs text-[#A99B8B]">Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-editorial text-2xl text-[#292725] mb-2">Envíanos un Mensaje</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold uppercase tracking-wider block mb-1 text-[11px]">Tu Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Mariana Ramos"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 bg-white border border-[#DCCFBD] text-[#292725] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold uppercase tracking-wider block mb-1 text-[11px]">Tu Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-3 bg-white border border-[#DCCFBD] text-[#292725] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1 text-[11px]">Motivo del Contacto</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-3 bg-white border border-[#DCCFBD] text-[#292725] focus:outline-hidden"
                  >
                    <option value="Asesoría de Tallas">Asesoría de Tallas y Ajuste</option>
                    <option value="Estado de Pedido">Estado de mi Pedido / Guía</option>
                    <option value="Cambios y Devoluciones">Cambio o Devolución</option>
                    <option value="Duda General">Duda General de Colección</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider block mb-1 text-[11px]">Tu Mensaje *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Escribe aquí tu consulta con el mayor detalle posible..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 bg-white border border-[#DCCFBD] text-[#292725] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-editorial-primary w-full py-3.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR MENSAJE</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
