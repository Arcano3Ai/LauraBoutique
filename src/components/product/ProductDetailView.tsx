'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Star, Heart, Plus, Minus, Truck, ShieldCheck, RefreshCw, 
  ChevronRight, ChevronDown, Check, Sparkles, Share2 
} from 'lucide-react';
import { useStore, FREE_SHIPPING_THRESHOLD } from '@/lib/store';
import { Product, ProductColor, ProductSize } from '@/types';
import { useToast } from '@/components/ui/ToastProvider';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductDetailViewProps {
  slug: string;
}

export function ProductDetailView({ slug }: ProductDetailViewProps) {
  const router = useRouter();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const openSizeGuide = useStore((state) => state.openSizeGuide);
  const { toast } = useToast();

  const product = products.find((p) => p.slug === slug);

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
        <Link href="/shop" className="btn-editorial-primary">
          Ver Catálogo Completo
        </Link>
      </div>
    );
  }

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.sizes[0];
  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize, quantity);
    toast(`¡${product.name} añadido a tu carrito!`, {
      type: 'success',
      submessage: `Talla: ${currentSize} · Color: ${currentColor.name} · Cantidad: ${quantity}`
    });
  };

  const handleBuyNow = () => {
    addToCart(product, currentColor, currentSize, quantity);
    router.push('/checkout');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-6 md:py-12 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#A99B8B] mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#B99663] transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href="/shop" className="hover:text-[#B99663] transition-colors">Catálogo</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#B99663] transition-colors">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-[#292725] font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Layout (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] shrink-0 pb-2 md:pb-0">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-26 overflow-hidden border transition-all duration-200 shrink-0 bg-[#ECE5DC] relative ${
                    activeImgIndex === idx
                      ? 'border-[#B99663] ring-1 ring-[#B99663]'
                      : 'border-[#DCCFBD] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Ver imagen ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Active Image with Zoom Area */}
            <div className="flex-1 relative aspect-3/4 sm:aspect-4/5 w-full bg-[#ECE5DC] overflow-hidden border border-[#DCCFBD] group shadow-sm">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge if present */}
              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 shadow-md bg-[#292725] text-white">
                  {product.badge}
                </span>
              )}

              {/* Wishlist quick action */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Guardar en favoritos"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#292725] hover:text-[#C48B71] shadow-md transition-transform hover:scale-110"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C48B71] text-[#C48B71]' : ''}`} />
              </button>
            </div>

          </div>

          {/* Right Column: Product Purchasing Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category & Title */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
                {product.categoryName}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal leading-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-xs text-[#A99B8B] mt-1 font-light italic">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Price & Rating */}
            <div className="flex items-baseline gap-4 pb-4 border-b border-[#DCCFBD]">
              <span className="font-editorial text-2xl sm:text-3xl text-[#292725] font-semibold">
                ${product.price.toLocaleString('es-MX')} MXN
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#A99B8B] line-through">
                  ${product.originalPrice.toLocaleString('es-MX')} MXN
                </span>
              )}
              {product.rating && (
                <div className="ml-auto flex items-center gap-1.5 text-xs text-[#B99663]">
                  <Star className="w-4 h-4 fill-[#B99663]" />
                  <span className="font-semibold text-[#292725]">{product.rating}</span>
                  <span className="text-[#A99B8B]">({product.reviewCount || 12})</span>
                </div>
              )}
            </div>

            {/* Color Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#292725] uppercase tracking-wider text-[11px]">
                  Color: <span className="font-normal text-[#A99B8B] normal-case">{currentColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 relative ${
                      currentColor.name === col.name
                        ? 'border-[#B99663] scale-110'
                        : 'border-transparent hover:border-[#DCCFBD]'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    aria-label={`Seleccionar color ${col.name}`}
                  >
                    {currentColor.name === col.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white drop-shadow-md" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Link */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#292725] uppercase tracking-wider text-[11px]">
                  Talla: <span className="font-normal text-[#A99B8B]">{currentSize}</span>
                </span>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="text-[11px] text-[#B99663] underline hover:text-[#292725] transition-colors"
                >
                  ¿Cuál es mi talla?
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[44px] h-10 px-3 text-xs font-semibold tracking-wider transition-all uppercase ${
                      currentSize === sz
                        ? 'bg-[#292725] text-white border border-[#292725]'
                        : 'bg-[#F7F2EA] text-[#292725] border border-[#DCCFBD] hover:border-[#292725]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center border border-[#DCCFBD] bg-[#F7F2EA]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Disminuir cantidad"
                    className="p-3 text-[#292725] hover:text-[#B99663] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#292725] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Aumentar cantidad"
                    className="p-3 text-[#292725] hover:text-[#B99663] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-editorial-primary text-center justify-center py-3.5"
                >
                  AGREGAR AL CARRITO
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-editorial-gold text-center justify-center py-3.5"
              >
                COMPRAR AHORA
              </button>
            </div>

            {/* Value Props Micro Badges */}
            <div className="bg-[#F7F2EA] p-4 border border-[#DCCFBD] space-y-2.5 text-xs text-[#292725]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#B99663] shrink-0" />
                <span>
                  {product.price >= FREE_SHIPPING_THRESHOLD ? (
                    <strong className="text-[#B99663]">¡Esta prenda califica para Envío Gratis a todo México!</strong>
                  ) : (
                    <span>Envío gratis a partir de $1,499 MXN.</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-[#B99663] shrink-0" />
                <span>30 días para cambios de talla sin complicaciones.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B99663] shrink-0" />
                <span>Compra protegida y pago 100% seguro.</span>
              </div>
            </div>

            {/* Accordions (Details, Materials, Care, Shipping) */}
            <div className="border-t border-[#DCCFBD] divide-y divide-[#DCCFBD]/70 text-xs">
              
              {/* Accordion 1: Descripción & Modelo */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('descripcion')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#292725] text-left"
                >
                  <span>Descripción & Ajuste</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'descripcion' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'descripcion' && (
                  <div className="pt-3 text-[#A99B8B] space-y-2 font-light leading-relaxed animate-fade-in">
                    <p>{product.description}</p>
                    {product.measurements && (
                      <p className="text-[11px] text-[#292725] bg-[#ECE5DC]/60 p-2.5 border border-[#DCCFBD]/50">
                        📏 <strong>Medidas de referencia:</strong> La modelo mide {product.measurements.modelHeight} y está usando talla {product.measurements.modelWearingSize}.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Composición & Materiales */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('materiales')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#292725] text-left"
                >
                  <span>Composición & Materiales</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'materiales' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'materiales' && (
                  <div className="pt-3 text-[#A99B8B] space-y-1 font-light animate-fade-in">
                    <p>• <strong>Composición:</strong> {product.composition}</p>
                    <p>• Tejido fresco con tratamiento antipeeling y caída natural.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Cuidados */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('cuidados')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#292725] text-left"
                >
                  <span>Cuidados de la Prenda</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'cuidados' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'cuidados' && (
                  <div className="pt-3 text-[#A99B8B] space-y-1 font-light animate-fade-in">
                    {product.careInstructions.map((care, i) => (
                      <p key={i}>• {care}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Envíos y Devoluciones */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('envios')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-wider text-[#292725] text-left"
                >
                  <span>Envíos & Cambios</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'envios' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'envios' && (
                  <div className="pt-3 text-[#A99B8B] space-y-1 font-light leading-relaxed animate-fade-in">
                    <p>• Despacho en 24-48 horas hábiles.</p>
                    <p>• Entrega estándar de 2 a 4 días a cualquier estado de México.</p>
                    <p>• Si la talla no te queda, cuentas con 30 días para solicitar cambio fácil.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#DCCFBD]">
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
                Completa tu estilo
              </span>
              <h2 className="font-editorial text-3xl text-[#292725] font-normal">
                TAMBIÉN PODRÍA GUSTARTE
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
