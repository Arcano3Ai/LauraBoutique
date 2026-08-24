'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#292725] text-[#F7F2EA] border-t border-[#3D3A37] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3D3A37]">
          
          {/* Brand Presentation Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-wider text-[#FDFBF7] block leading-none">
                LAURA BOUTIQUE
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99663] font-medium block mt-1.5">
                Atemporal • Elegante • Accesible
              </span>
            </Link>
            <p className="text-xs text-[#A99B8B] leading-relaxed max-w-sm">
              Boutique mexicana contemporánea creada para mujeres que valoran la elegancia, la comodidad y las prendas que trascienden las temporadas sin costar una fortuna.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Laura Boutique"
                className="w-8 h-8 rounded-full border border-[#3D3A37] flex items-center justify-center text-[#DCCFBD] hover:text-[#B99663] hover:border-[#B99663] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Laura Boutique"
                className="w-8 h-8 rounded-full border border-[#3D3A37] flex items-center justify-center text-[#DCCFBD] hover:text-[#B99663] hover:border-[#B99663] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/525500000000?text=Hola%20Laura%20Boutique%20%F0%9F%91%8B%20Me%20gustar%C3%ADa%20recibir%20ayuda%20para%20elegir%20una%20prenda."
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Laura Boutique"
                className="w-8 h-8 rounded-full border border-[#3D3A37] flex items-center justify-center text-[#DCCFBD] hover:text-[#B99663] hover:border-[#B99663] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:contacto@lauraboutique.mx"
                aria-label="Correo de Laura Boutique"
                className="w-8 h-8 rounded-full border border-[#3D3A37] flex items-center justify-center text-[#DCCFBD] hover:text-[#B99663] hover:border-[#B99663] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: COMPRAR */}
          <div>
            <h4 className="font-editorial text-base tracking-wider text-[#FDFBF7] mb-4 uppercase font-normal">
              COMPRAR
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A99B8B]">
              <li>
                <Link href="/shop?badge=NUEVO" className="hover:text-[#B99663] transition-colors">
                  Nueva colección
                </Link>
              </li>
              <li>
                <Link href="/shop?category=vestidos" className="hover:text-[#B99663] transition-colors">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link href="/shop?category=blusas" className="hover:text-[#B99663] transition-colors">
                  Blusas
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pantalones" className="hover:text-[#B99663] transition-colors">
                  Pantalones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sets" className="hover:text-[#B99663] transition-colors">
                  Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accesorios" className="hover:text-[#B99663] transition-colors">
                  Accesorios
                </Link>
              </li>
              <li>
                <Link href="/shop?badge=SALE" className="text-[#C48B71] hover:text-[#FDFBF7] transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: AYUDA */}
          <div>
            <h4 className="font-editorial text-base tracking-wider text-[#FDFBF7] mb-4 uppercase font-normal">
              AYUDA
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A99B8B]">
              <li>
                <Link href="/contacto" className="hover:text-[#B99663] transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#B99663] transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/politicas#envios" className="hover:text-[#B99663] transition-colors">
                  Envíos a todo México
                </Link>
              </li>
              <li>
                <Link href="/politicas#cambios" className="hover:text-[#B99663] transition-colors">
                  Cambios y devoluciones
                </Link>
              </li>
              <li>
                <Link href="/faq#guia-tallas" className="hover:text-[#B99663] transition-colors">
                  Guía de tallas
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#B99663] hover:underline transition-all">
                  Panel Administrador
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: LAURA BOUTIQUE & CONTACTO */}
          <div>
            <h4 className="font-editorial text-base tracking-wider text-[#FDFBF7] mb-4 uppercase font-normal">
              LAURA BOUTIQUE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A99B8B] mb-6">
              <li>
                <Link href="/nosotros" className="hover:text-[#B99663] transition-colors">
                  Nuestra historia
                </Link>
              </li>
              <li>
                <Link href="/politicas#privacidad" className="hover:text-[#B99663] transition-colors">
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href="/politicas#terminos" className="hover:text-[#B99663] transition-colors">
                  Términos y condiciones
                </Link>
              </li>
            </ul>

            <h5 className="text-[11px] font-semibold tracking-widest text-[#DCCFBD] uppercase mb-2">
              Atención Personalizada
            </h5>
            <p className="text-xs text-[#A99B8B]">Lun - Sáb: 9:00 am - 8:00 pm</p>
            <p className="text-xs text-[#A99B8B] mt-1">CDMX, México</p>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A99B8B]">
          <p>© 2026 Laura Boutique. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-[11px] text-[#DCCFBD]/80">
            <span>Tarjeta de Crédito / Débito</span>
            <span>•</span>
            <span>Mercado Pago</span>
            <span>•</span>
            <span>PayPal</span>
            <span>•</span>
            <span>OXXO Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
