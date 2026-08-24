import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MobileMenuDrawer } from '@/components/layout/MobileMenuDrawer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { SearchModal } from '@/components/layout/SearchModal';
import { SizeGuideModal } from '@/components/layout/SizeGuideModal';
import { QuickViewModal } from '@/components/layout/QuickViewModal';
import { ToastProvider } from '@/components/ui/ToastProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'My Boutique More | Atemporal • Elegante • Accesible',
  description:
    'Boutique mexicana de moda y ropa femenina contemporánea. Vestidos, blusas, pantalones, calzado y sets elegantes diseñados para tu día a día sin gastar una fortuna. Envíos a todo México.',
  keywords: [
    'My Boutique More',
    'Ropa mujer México',
    'Moda atemporal',
    'Vestidos elegantes',
    'Boutique mexicana',
    'Calzado y accesorios',
    'Ropa formal y casual'
  ],
  openGraph: {
    title: 'My Boutique More | Atemporal • Elegante • Accesible',
    description:
      'Moda atemporal, femenina y elegante para todos los días. Diseños versátiles para la mujer mexicana contemporánea.',
    url: 'https://myboutiquemore.com',
    siteName: 'My Boutique More',
    locale: 'es_MX',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F2EA] text-[#292725] antialiased">
        <ToastProvider>
          {/* Main Top Header */}
          <Header />

          {/* Page Content */}
          <div className="flex-1 w-full">{children}</div>

          {/* Main Footer */}
          <Footer />

          {/* Global Interactive Overlays & Modals */}
          <CartDrawer />
          <MobileBottomNav />
          <MobileMenuDrawer />
          <WhatsAppFloat />
          <SearchModal />
          <SizeGuideModal />
          <QuickViewModal />
        </ToastProvider>
      </body>
    </html>
  );
}
