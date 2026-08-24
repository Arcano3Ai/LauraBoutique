'use client';

import React from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';

export const SizeGuideModal: React.FC = () => {
  const isOpen = useStore((state) => state.isSizeGuideOpen);
  const closeSizeGuide = useStore((state) => state.closeSizeGuide);

  if (!isOpen) return null;

  const sizeChart = [
    { size: 'XS (Extra Chica)', bust: '82 - 86 cm', waist: '62 - 66 cm', hip: '88 - 92 cm', mxSize: '28 - 30 (2-4)' },
    { size: 'S (Chica)', bust: '86 - 90 cm', waist: '66 - 70 cm', hip: '92 - 96 cm', mxSize: '30 - 32 (4-6)' },
    { size: 'M (Mediana)', bust: '90 - 95 cm', waist: '70 - 75 cm', hip: '96 - 101 cm', mxSize: '32 - 34 (6-8)' },
    { size: 'L (Grande)', bust: '95 - 101 cm', waist: '75 - 81 cm', hip: '101 - 107 cm', mxSize: '34 - 36 (8-10)' },
    { size: 'XL (Extra Grande)', bust: '101 - 108 cm', waist: '81 - 88 cm', hip: '107 - 114 cm', mxSize: '36 - 38 (10-12)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeSizeGuide}
        className="fixed inset-0 bg-[#292725]/70 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative bg-[#FDFBF7] w-full max-w-2xl border border-[#DCCFBD] shadow-2xl overflow-hidden animate-fade-in z-10">
        
        {/* Header */}
        <div className="p-6 border-b border-[#DCCFBD] flex items-center justify-between bg-[#F7F2EA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B99663]/15 flex items-center justify-center text-[#B99663]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-semibold text-[#292725]">
                Guía de Tallas & Medidas
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#A99B8B]">
                Medidas expresadas en centímetros (CM)
              </p>
            </div>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-1.5 text-[#292725] hover:text-[#B99663] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          <p className="text-xs text-[#292725]/80 leading-relaxed">
            Nuestros patrones están diseñados teniendo en cuenta la figura femenina mexicana. Si dudas entre dos tallas, te recomendamos elegir la mayor si prefieres un fit más relajado o la menor si buscas una silueta entallada.
          </p>

          {/* Table */}
          <div className="overflow-x-auto border border-[#DCCFBD]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#292725] text-[#FDFBF7] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Talla</th>
                  <th className="p-3">Busto</th>
                  <th className="p-3">Cintura</th>
                  <th className="p-3">Cadera</th>
                  <th className="p-3">Equivalente MX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCCFBD]/60 bg-[#FDFBF7]">
                {sizeChart.map((row, idx) => (
                  <tr key={row.size} className={idx % 2 === 0 ? 'bg-[#F7F2EA]/40' : ''}>
                    <td className="p-3 font-semibold text-[#292725]">{row.size}</td>
                    <td className="p-3 text-[#292725]/80">{row.bust}</td>
                    <td className="p-3 text-[#292725]/80">{row.waist}</td>
                    <td className="p-3 text-[#292725]/80">{row.hip}</td>
                    <td className="p-3 text-[#B99663] font-medium">{row.mxSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tips */}
          <div className="bg-[#F7F2EA] p-4 border border-[#DCCFBD] space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#292725] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B99663]" />
              ¿Cómo tomar tus medidas correctamente?
            </h5>
            <ul className="text-xs text-[#A99B8B] space-y-1.5 list-disc list-inside">
              <li><strong className="text-[#292725]">Busto:</strong> Pasa la cinta métrica por la parte más prominente del pecho.</li>
              <li><strong className="text-[#292725]">Cintura:</strong> Mide la parte más estrecha del torso, justo arriba del ombligo.</li>
              <li><strong className="text-[#292725]">Cadera:</strong> Coloca la cinta alrededor de la parte más ancha de la cadera.</li>
            </ul>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={closeSizeGuide}
              className="btn-editorial-primary w-full sm:w-auto"
            >
              Entendido, Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
