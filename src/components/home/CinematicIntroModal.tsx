'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { getAssetPath } from '@/lib/assets';

export const CinematicIntroModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user already dismissed intro in this session
    const seen = sessionStorage.getItem('my_boutique_intro_seen');
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    sessionStorage.setItem('my_boutique_intro_seen', 'true');
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade-in">
      {/* Outer Click Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div className="relative z-10 max-w-3xl w-full bg-[#121110] border-2 border-[#B99663]/60 shadow-2xl rounded-sm overflow-hidden flex flex-col">
        
        {/* Top Control Bar */}
        <div className="p-3.5 bg-[#1C1A18] border-b border-[#3D3A37] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B99663]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[#FDFBF7]">
              MY BOUTIQUE MORE • VIDEO OFICIAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-[#292725] text-[#DCCFBD] hover:text-[#B99663] transition-colors"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Play/Pause Toggle */}
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-[#292725] text-[#DCCFBD] hover:text-[#B99663] transition-colors"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full bg-[#292725] text-[#FDFBF7] hover:text-[#B99663] hover:bg-[#3D3A37] transition-all flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              title="Cerrar video"
            >
              <span>Cerrar</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-16/9 w-full bg-black overflow-hidden group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={getAssetPath('/assets/video/intro.mp4')} type="video/mp4" />
            <source src={getAssetPath('/video/intro.mp4')} type="video/mp4" />
            <source src={getAssetPath('/intro.mp4')} type="video/mp4" />
            Tu navegador no soporta reproducción de video.
          </video>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 bg-[#181716] border-t border-[#3D3A37] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs text-[#DCCFBD] font-medium block">
              Bienvenida a la nueva experiencia de lujo accesible.
            </span>
            <span className="text-[10px] text-[#A99B8B] uppercase tracking-wider">
              Atemporal • Elegante • Accesible
            </span>
          </div>

          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#B99663] hover:bg-[#D4AF77] text-white text-[11px] font-semibold uppercase tracking-[0.18em] transition-all shadow-lg inline-flex items-center justify-center gap-2"
          >
            <span>ENTRAR A LA BOUTIQUE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
