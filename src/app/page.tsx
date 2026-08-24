import React from 'react';
import { CinematicIntroModal } from '@/components/home/CinematicIntroModal';
import { IntroVideoBanner } from '@/components/home/IntroVideoBanner';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { NewCollectionSection } from '@/components/home/NewCollectionSection';
import { EditorialSection } from '@/components/home/EditorialSection';
import { BestSellersSection } from '@/components/home/BestSellersSection';
import { ArmaTuLookSection } from '@/components/home/ArmaTuLookSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { InstagramGrid } from '@/components/home/InstagramGrid';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* Modal de Intro Cinematográfico al entrar */}
      <CinematicIntroModal />

      {/* 0. Video Fashion Film de Intro */}
      <IntroVideoBanner />

      {/* 1. Hero Principal Editorial */}
      <HeroSection />

      {/* 2. Categorías Destacadas */}
      <CategoriesSection />

      {/* 3. Nueva Colección */}
      <NewCollectionSection />

      {/* 4. Sección Editorial 50/50 */}
      <EditorialSection />

      {/* 5. Los Favoritos de Laura (Best Sellers) */}
      <BestSellersSection />

      {/* 6. Arma Tu Look (Bundle Interactivo) */}
      <ArmaTuLookSection />

      {/* 7. Banner Promocional de Envío Gratis */}
      <PromoBanner />

      {/* 8. Beneficios de Marca */}
      <BenefitsSection />

      {/* 9. Testimonios */}
      <TestimonialsSection />

      {/* 10. Instagram Feed */}
      <InstagramGrid />

      {/* 11. Newsletter */}
      <NewsletterSection />
    </main>
  );
}
