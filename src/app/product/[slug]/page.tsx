'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { 
  Star, Heart, Plus, Minus, Truck, ShieldCheck, RefreshCw, 
  ChevronRight, ChevronDown, Check, Sparkles, Share2 
} from 'lucide-react';
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/lib/store';
import { ProductColor, ProductSize } from '@/types';
import { useToast } from '@/components/ui/ToastProvider';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const openSizeGuide = useStore((state) => state.openSizeGuide);
  const { toast } = useToast();

  const product = products.find((p) => p.slug === resolvedParams.slug);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('descripcion');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 bg-[#FDFBF7]">
        <h2 className="font-editorial text-3xl text-[#292725] mb-2">Producto no encontrado</h2>
        <p className="text-xs text-[#A99B8B] mb-6">El producto que buscas ya no está disponible o la URL es incorrecta.</p>
        <Link href="/shop" className="btn-editorial-primary">Volver al Catálogo</Link>
      </div>
    );
  }

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.sizes[0];
  const isInWishlist = useStore.getState().isInWishlist(product.id);

  const handleAddToCart = (redirectCheckout = false) => {
    addToCart(product, currentColor, currentSize, quantity);
    toast(`¡${product.name} agregado al carrito!`, {
      type: 'success',
      submessage: `Talla: ${currentSize} | Color: ${currentColor.name} | Cantidad: ${quantity}`
    });
    if (redirectCheckout) {
      router.push('/checkout');
    }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 md:py-14 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#A99B8B] mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#292725] transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href="/shop" className="hover:text-[#292725] transition-colors">Ropa</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#292725] transition-colors capitalize">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-[#292725] font-semibold truncate">{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery (7 columns) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[560px] pb-2 md:pb-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-26 shrink-0 bg-[#ECE5DC] overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx
                        ? 'border-[#292725] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image */}
            <div className="flex-1 relative aspect-3/4 bg-[#ECE5DC] overflow-hidden border border-[#DCCFBD] group">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge if available */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#292725] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-md">
                  {product.badge}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Product Purchasing Details & Accordions (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              {/* Category & Reviews Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B99663]">
                  {product.categoryName}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#B99663]">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B99663]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#292725]">{product.rating}</span>
                  <span className="text-[#A99B8B]">({product.reviewCount} reseñas)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Price & Free Shipping notice */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#292725]">
                  ${product.price.toLocaleString('es-MX')} MXN
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-[#A99B8B]">
                    ${product.originalPrice.toLocaleString('es-MX')} MXN
                  </span>
                )}
              </div>

              {/* Shipping Highlight */}
              <div className="mt-3 p-2.5 bg-[#F7F2EA] border border-[#DCCFBD] text-xs text-[#292725] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B99663] shrink-0" />
                <span>
                  {product.price >= FREE_SHIPPING_THRESHOLD ? (
                    <strong className="text-[#B99663]">¡Este producto cuenta con Envío Gratis!</strong>
                  ) : (
                    <>Envío gratis en compras desde <strong>$1,499 MXN</strong></>
                  )}
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-[#292725]/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="pt-2 border-t border-[#DCCFBD]/70">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                  Color: <span className="font-normal text-[#A99B8B]">{currentColor.name}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      currentColor.name === col.name
                        ? 'border-[#292725] scale-110 shadow-md ring-2 ring-[#B99663]/40'
                        : 'border-[#DCCFBD] hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {currentColor.name === col.name && (
                      <Check className={`w-4 h-4 ${col.hex === '#FDFBF7' || col.hex === '#FFFFFF' || col.hex === '#F7F2EA' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="pt-2 border-t border-[#DCCFBD]/70">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                  Talla: <span className="text-[#B99663]">{currentSize}</span>
                </span>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="text-xs text-[#B99663] underline font-medium hover:text-[#292725] transition-colors"
                >
                  ¿Cuál es mi talla?
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 h-11 px-4 text-xs font-bold uppercase tracking-wider border transition-all ${
                      currentSize === sz
                        ? 'bg-[#292725] text-white border-[#292725]'
                        : 'bg-white text-[#292725] border-[#DCCFBD] hover:border-[#292725]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                Cantidad
              </span>
              <div className="flex items-center border border-[#DCCFBD] bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#292725] hover:bg-[#ECE5DC] transition-colors"
                  aria-label="Disminuir"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#292725]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#292725] hover:bg-[#ECE5DC] transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Purchasing Buttons */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart(false)}
                  className="btn-editorial-primary flex-1 py-4 text-center font-bold tracking-widest text-xs"
                >
                  AGREGAR AL CARRITO
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Favoritos"
                  className={`w-14 h-13 flex items-center justify-center border transition-all ${
                    isInWishlist
                      ? 'border-[#B99663] bg-[#B99663]/10 text-[#B99663]'
                      : 'border-[#DCCFBD] bg-white text-[#292725] hover:border-[#292725]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-[#B99663]' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(true)}
                className="btn-editorial-gold w-full py-4 text-center font-bold tracking-widest text-xs"
              >
                COMPRAR AHORA
              </button>
            </div>

            {/* Accordions */}
            <div className="pt-6 border-t border-[#DCCFBD] divide-y divide-[#DCCFBD]">
              
              {/* Accordion 1: Descripción & Medidas */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('descripcion')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#292725] hover:text-[#B99663]"
                >
                  <span>Descripción & Modelo</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'descripcion' ? 'rotate-180 text-[#B99663]' : 'text-[#A99B8B]'}`} />
                </button>
                {openAccordion === 'descripcion' && (
                  <div className="pt-3 text-xs text-[#292725]/80 space-y-2 leading-relaxed animate-fade-in">
                    <p>{product.description}</p>
                    {product.measurements && (
                      <p className="text-[11px] text-[#A99B8B] bg-[#F7F2EA] p-2 border border-[#DCCFBD]">
                        Medidas de referencia: La modelo mide {product.measurements.modelHeight} y porta talla {product.measurements.modelWearingSize}.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Composición & Materiales */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('materiales')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#292725] hover:text-[#B99663]"
                >
                  <span>Composición & Materiales</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'materiales' ? 'rotate-180 text-[#B99663]' : 'text-[#A99B8B]'}`} />
                </button>
                {openAccordion === 'materiales' && (
                  <div className="pt-3 text-xs text-[#292725]/80 space-y-2 leading-relaxed animate-fade-in">
                    <p className="font-semibold text-[#292725]">{product.composition}</p>
                    <p className="text-[11px] text-[#A99B8B]">Confeccionado bajo altos estándares de costura para garantizar durabilidad y suavidad.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Cuidados de la Prenda */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('cuidados')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#292725] hover:text-[#B99663]"
                >
                  <span>Cuidados de la Prenda</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'cuidados' ? 'rotate-180 text-[#B99663]' : 'text-[#A99B8B]'}`} />
                </button>
                {openAccordion === 'cuidados' && (
                  <div className="pt-3 text-xs text-[#292725]/80 space-y-1.5 leading-relaxed animate-fade-in">
                    <ul className="list-disc list-inside space-y-1">
                      {product.careInstructions.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 4: Envíos & Cambios */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('envios')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#292725] hover:text-[#B99663]"
                >
                  <span>Envíos, Cambios y Devoluciones</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'envios' ? 'rotate-180 text-[#B99663]' : 'text-[#A99B8B]'}`} />
                </button>
                {openAccordion === 'envios' && (
                  <div className="pt-3 text-xs text-[#292725]/80 space-y-2 leading-relaxed animate-fade-in">
                    <p>• <strong>Envíos nacionales:</strong> 2 a 5 días hábiles a cualquier ciudad de México por DHL o Estafeta.</p>
                    <p>• <strong>Cambios sin costo:</strong> Cuentas con 30 días para solicitar cambio de talla.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-14 border-t border-[#DCCFBD]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
                Sugerencias
              </span>
              <h2 className="font-editorial text-3xl text-[#292725]">
                COMPLETA TU ARMARIO
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
