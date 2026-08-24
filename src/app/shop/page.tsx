'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, X, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { useStore } from '@/lib/store';
import { ProductCategory, ProductSize } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const allProducts = useStore((state) => state.products);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedSize, setSelectedSize] = useState<string>('todos');
  const [selectedColor, setSelectedColor] = useState<string>('todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<string>('recientes');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with URL query parameters on mount or change
  useEffect(() => {
    const cat = searchParams.get('category');
    const badge = searchParams.get('badge');
    const occasion = searchParams.get('occasion');

    if (cat) setSelectedCategory(cat.toLowerCase());
    else if (badge) setSelectedCategory('todos');
    else if (occasion) setSelectedCategory('todos');
  }, [searchParams]);

  const categories = [
    { id: 'todos', name: 'Todos los productos' },
    { id: 'vestidos', name: 'Vestidos' },
    { id: 'blusas', name: 'Blusas' },
    { id: 'pantalones', name: 'Pantalones' },
    { id: 'faldas', name: 'Faldas' },
    { id: 'sets', name: 'Sets' },
    { id: 'chamarras', name: 'Chamarras' },
    { id: 'basicos', name: 'Básicos' },
    { id: 'accesorios', name: 'Accesorios' }
  ];

  const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL'];

  const colors = [
    { name: 'Beige', hex: '#DCCFBD' },
    { name: 'Negro', hex: '#292725' },
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Café', hex: '#5D493D' },
    { name: 'Rosa', hex: '#E2C2B9' },
    { name: 'Azul', hex: '#C5D0D6' }
  ];

  const priceRanges = [
    { id: 'todos', label: 'Todos los precios' },
    { id: '0-500', label: '$0 - $500 MXN', min: 0, max: 500 },
    { id: '500-1000', label: '$500 - $1,000 MXN', min: 500, max: 1000 },
    { id: '1000-plus', label: '$1,000+ MXN', min: 1000, max: Infinity }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    const badgeParam = searchParams.get('badge');
    const occasionParam = searchParams.get('occasion');

    return allProducts.filter((p) => {
      // Badge filter if URL specifies
      if (badgeParam && p.badge !== badgeParam) return false;

      // Occasion filter if URL specifies
      if (occasionParam && p.occasion !== occasionParam) return false;

      // Category
      if (selectedCategory !== 'todos' && p.category !== selectedCategory) return false;

      // Size
      if (selectedSize !== 'todos' && !p.sizes.includes(selectedSize as ProductSize)) return false;

      // Color
      if (selectedColor !== 'todos') {
        const matchesColor = p.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      // Price Range
      if (selectedPriceRange !== 'todos') {
        const range = priceRanges.find((r) => r.id === selectedPriceRange);
        if (range && range.min !== undefined && range.max !== undefined) {
          if (p.price < range.min || p.price > range.max) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-menor') return a.price - b.price;
      if (sortBy === 'precio-mayor') return b.price - a.price;
      if (sortBy === 'mas-vendidos') return b.reviewCount - a.reviewCount;
      return 0; // recientes
    });
  }, [allProducts, selectedCategory, selectedSize, selectedColor, selectedPriceRange, sortBy, searchParams]);

  const clearAllFilters = () => {
    setSelectedCategory('todos');
    setSelectedSize('todos');
    setSelectedColor('todos');
    setSelectedPriceRange('todos');
    setSortBy('recientes');
  };

  const hasActiveFilters =
    selectedCategory !== 'todos' ||
    selectedSize !== 'todos' ||
    selectedColor !== 'todos' ||
    selectedPriceRange !== 'todos';

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 md:py-12 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#A99B8B] mb-6">
          <Link href="/" className="hover:text-[#292725] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#292725] font-medium">Ropa</span>
          {selectedCategory !== 'todos' && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#B99663] capitalize font-semibold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-[#DCCFBD]/70 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
              Catálogo Oficial
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#292725] font-normal tracking-tight">
              {selectedCategory === 'todos' ? 'ROPA' : selectedCategory.toUpperCase()}
            </h1>
            <p className="text-xs sm:text-sm text-[#A99B8B] mt-1.5 font-light">
              Encuentra piezas que se adapten a tu estilo y trasciendan las temporadas.
            </p>
          </div>

          <span className="text-xs text-[#A99B8B]">
            Mostrando <strong className="text-[#292725]">{filteredProducts.length}</strong> productos
          </span>
        </div>

        {/* Mobile Filter & Sort Trigger Buttons */}
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 py-2.5 px-4 bg-[#F7F2EA] border border-[#DCCFBD] text-xs font-semibold uppercase tracking-wider text-[#292725] flex items-center justify-center gap-2 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B99663]" />
            <span>FILTRAR {hasActiveFilters && '•'}</span>
          </button>

          <div className="flex-1 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#F7F2EA] border border-[#DCCFBD] text-xs font-semibold uppercase tracking-wider text-[#292725] appearance-none cursor-pointer focus:outline-hidden"
            >
              <option value="recientes">Más recientes</option>
              <option value="mas-vendidos">Más vendidos</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6 pb-4 border-b border-[#DCCFBD]/50">
            <span className="text-xs text-[#A99B8B]">Filtros activos:</span>
            {selectedCategory !== 'todos' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F2EA] text-xs border border-[#DCCFBD] text-[#292725]">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('todos')}><X className="w-3 h-3 text-[#A99B8B]" /></button>
              </span>
            )}
            {selectedSize !== 'todos' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F2EA] text-xs border border-[#DCCFBD] text-[#292725]">
                Talla: {selectedSize}
                <button onClick={() => setSelectedSize('todos')}><X className="w-3 h-3 text-[#A99B8B]" /></button>
              </span>
            )}
            {selectedColor !== 'todos' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F2EA] text-xs border border-[#DCCFBD] text-[#292725]">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('todos')}><X className="w-3 h-3 text-[#A99B8B]" /></button>
              </span>
            )}
            {selectedPriceRange !== 'todos' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F2EA] text-xs border border-[#DCCFBD] text-[#292725]">
                {priceRanges.find((r) => r.id === selectedPriceRange)?.label}
                <button onClick={() => setSelectedPriceRange('todos')}><X className="w-3 h-3 text-[#A99B8B]" /></button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#B99663] underline font-semibold ml-2 hover:text-[#292725]"
            >
              Limpiar todos
            </button>
          </div>
        )}

        {/* Main 2-Column Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Desktop Sidebar (3 columns) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 bg-[#F7F2EA] p-6 border border-[#DCCFBD] sticky top-24">
            
            {/* Categorías */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#292725] mb-3 pb-2 border-b border-[#DCCFBD]">
                CATEGORÍAS
              </h3>
              <ul className="space-y-1.5">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left text-xs uppercase tracking-wider py-1 transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'font-bold text-[#B99663]'
                          : 'text-[#292725]/80 hover:text-[#B99663]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#B99663]" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tallas */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#292725] mb-3 pb-2 border-b border-[#DCCFBD]">
                TALLA
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSize('todos')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase border transition-all ${
                    selectedSize === 'todos'
                      ? 'bg-[#292725] text-white border-[#292725]'
                      : 'bg-white text-[#292725] border-[#DCCFBD] hover:border-[#292725]'
                  }`}
                >
                  Todas
                </button>
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-9 px-2.5 py-1.5 text-xs font-bold uppercase border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#292725] text-white border-[#292725]'
                        : 'bg-white text-[#292725] border-[#DCCFBD] hover:border-[#292725]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#292725] mb-3 pb-2 border-b border-[#DCCFBD]">
                COLOR
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(selectedColor === c.name ? 'todos' : c.name)}
                    className={`flex items-center gap-2 px-2.5 py-1 bg-white border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-[#292725] ring-1 ring-[#292725]'
                        : 'border-[#DCCFBD] hover:border-[#292725]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[11px] text-[#292725]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#292725] mb-3 pb-2 border-b border-[#DCCFBD]">
                PRECIO
              </h3>
              <ul className="space-y-1.5">
                {priceRanges.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => setSelectedPriceRange(r.id)}
                      className={`w-full text-left text-xs py-1 transition-colors ${
                        selectedPriceRange === r.id
                          ? 'font-bold text-[#B99663]'
                          : 'text-[#292725]/80 hover:text-[#B99663]'
                      }`}
                    >
                      {r.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ordenar */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#292725] mb-3 pb-2 border-b border-[#DCCFBD]">
                ORDENAR
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 bg-white border border-[#DCCFBD] text-xs text-[#292725] focus:outline-hidden"
              >
                <option value="recientes">Más recientes</option>
                <option value="mas-vendidos">Más vendidos</option>
                <option value="precio-menor">Precio: Menor a Mayor</option>
                <option value="precio-mayor">Precio: Mayor a Menor</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2 bg-[#ECE5DC] text-xs uppercase tracking-wider font-semibold text-[#292725] hover:bg-[#292725] hover:text-white transition-colors"
              >
                Restablecer Filtros
              </button>
            )}

          </aside>

          {/* Product Grid (9 columns desktop, 4 cols inside) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#F7F2EA] border border-[#DCCFBD] p-8">
                <p className="font-editorial text-2xl text-[#292725] mb-2">
                  No hay productos con los filtros seleccionados
                </p>
                <p className="text-xs text-[#A99B8B] max-w-sm mx-auto mb-6">
                  Prueba cambiando los criterios de talla, color o precio para ver más opciones.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-editorial-primary inline-flex"
                >
                  Restablecer Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FDFBF7] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-l border-[#DCCFBD]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DCCFBD]">
                <h3 className="font-editorial text-xl font-semibold text-[#292725]">
                  Filtros
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#292725]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categorías Mobile */}
              <div className="py-4 border-b border-[#DCCFBD]/50">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#292725]">
                  Categoría
                </h4>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`block w-full text-left text-xs py-1 ${
                        selectedCategory === c.id ? 'font-bold text-[#B99663]' : 'text-[#292725]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Talla Mobile */}
              <div className="py-4 border-b border-[#DCCFBD]/50">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#292725]">
                  Talla
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSize('todos')}
                    className={`px-2.5 py-1 text-xs border ${
                      selectedSize === 'todos' ? 'bg-[#292725] text-white' : 'bg-white'
                    }`}
                  >
                    Todas
                  </button>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-1 text-xs border ${
                        selectedSize === s ? 'bg-[#292725] text-white' : 'bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Mobile */}
              <div className="py-4">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#292725]">
                  Color
                </h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(selectedColor === col.name ? 'todos' : col.name)}
                      className={`px-2.5 py-1 text-xs border flex items-center gap-1.5 ${
                        selectedColor === col.name ? 'border-[#292725] bg-white font-bold' : 'bg-white'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCCFBD] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-editorial-primary w-full text-center"
              >
                Ver {filteredProducts.length} Productos
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full text-center text-xs uppercase text-[#A99B8B] py-1"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-xs tracking-widest text-[#A99B8B]">CARGANDO CATÁLOGO...</div>}>
      <ShopContent />
    </Suspense>
  );
}
