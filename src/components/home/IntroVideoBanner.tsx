'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Volume2, VolumeX, Play, Pause, ArrowRight, Sparkles, X } from 'lucide-react';
import { getAssetPath } from '@/lib/assets';

export const IntroVideoBanner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const primaryVideoSrc = getAssetPath('/assets/video/intro.mp4');
  const fallbackVideoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-black-dress-41315-large.mp4';

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (isDismissed) return null;

  return (
    <section className="relative w-full bg-[#121110] text-[#FDFBF7] overflow-hidden border-b border-[#3D3A37]">
      {/* Background Video Player */}
      <div className="relative w-full h-[55vh] min-h-[380px] max-h-[560px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center opacity-85 scale-102 hover:scale-100 transition-transform duration-1000"
        >
          <source src={primaryVideoSrc} type="video/mp4" />
          <source src={fallbackVideoSrc} type="video/mp4" />
          Tu navegador no soporta reproducción de video.
        </video>

        {/* High-Fashion Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/40 to-[#121110]/30 pointer-events-none" />

        {/* Video Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="p-2.5 rounded-full bg-[#121110]/70 backdrop-blur-md text-[#FDFBF7] hover:text-[#B99663] border border-[#B99663]/40 transition-all shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            className="p-2.5 rounded-full bg-[#121110]/70 backdrop-blur-md text-[#FDFBF7] hover:text-[#B99663] border border-[#B99663]/40 transition-all shadow-lg"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Cerrar video intro"
            className="p-2.5 rounded-full bg-[#121110]/70 backdrop-blur-md text-[#A99B8B] hover:text-white border border-[#3D3A37] transition-all shadow-lg"
            title="Ocultar intro"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Editorial Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#B99663] bg-[#121110] shadow-2xl mb-4 ring-4 ring-[#B99663]/25">
            <Image
              src="/assets/images/logo.png"
              alt="My Boutique More Logo"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1A18]/80 backdrop-blur-md border border-[#B99663]/40 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B99663]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-[#FDFBF7]">
              CAMPAÑA 2026 • FASHION FILM
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#FDFBF7] font-normal tracking-tight max-w-2xl leading-tight drop-shadow-md">
            LA ELEGANCIA DE SER <span className="italic text-[#B99663]">TÚ</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#DCCFBD] max-w-lg mt-2 font-light drop-shadow-sm">
            Diseños atemporales creados para acompañarte en cada momento importante.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-2.5 bg-[#B99663] hover:bg-[#D4AF77] text-white text-[11px] font-semibold uppercase tracking-[0.18em] transition-all shadow-xl inline-flex items-center gap-2"
            >
              <span>EXPLORAR TIENDA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
