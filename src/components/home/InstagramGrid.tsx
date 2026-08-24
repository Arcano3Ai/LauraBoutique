'use client';

import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { INSTAGRAM_POSTS_DATA } from '@/data/mockData';

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#F7F2EA] border-b border-[#DCCFBD]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#B99663] text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Comunidad</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal tracking-tight">
            @LAURABOUTIQUE
          </h2>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Síguenos para inspiración diaria, ideas de combinación y lanzamientos exclusivos.
          </p>
        </div>

        {/* 6 Photos Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS_DATA.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#ECE5DC] overflow-hidden border border-[#DCCFBD] block shadow-xs"
            >
              <img
                src={post.image}
                alt="Laura Boutique Instagram Look"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-[#292725]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-secondary inline-flex items-center gap-2"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>SEGUIR EN INSTAGRAM</span>
          </a>
        </div>

      </div>
    </section>
  );
};
