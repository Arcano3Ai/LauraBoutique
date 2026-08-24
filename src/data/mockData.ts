import { Product, LookBundle, Coupon, Review, Order } from '@/types';

export const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 
  'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-vestido-aura',
    slug: 'vestido-aura',
    name: 'Vestido Aura',
    tagline: 'Elegancia fluida en lino premium con caída natural',
    category: 'vestidos',
    categoryName: 'Vestidos',
    occasion: 'cena',
    price: 899,
    originalPrice: 1199,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Beige Arena', hex: '#DCCFBD' },
      { name: 'Negro Carbón', hex: '#292725' },
      { name: 'Blanco Cálido', hex: '#FDFBF7' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 18,
    description: 'El Vestido Aura es la máxima expresión del minimalismo atemporal. Diseñado con una silueta midi sutilmente entallada en la cintura y falda fluida con movimiento orgánico. Perfecto para transitar sin esfuerzo de un día de trabajo a una cena elegante.',
    composition: '80% Lino Mexicano Suave, 20% Algodón Peinado',
    careInstructions: [
      'Lavar a mano con agua fría y jabón neutro',
      'No usar blanqueadores ni cloro',
      'Secar a la sombra en superficie plana',
      'Planchar a temperatura media del revés'
    ],
    measurements: {
      modelHeight: '1.72 m',
      modelWearingSize: 'S'
    },
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'prod-blusa-isabella',
    slug: 'blusa-isabella',
    name: 'Blusa Isabella',
    tagline: 'Textura satinada con cuello drapeado y mangas con puño fino',
    category: 'blusas',
    categoryName: 'Blusas',
    occasion: 'oficina',
    price: 599,
    badge: 'NUEVO',
    rating: 4.8,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Ivory / Marfil', hex: '#F7F2EA' },
      { name: 'Taupe Suave', hex: '#A99B8B' },
      { name: 'Terracota Sutil', hex: '#C48B71' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 24,
    description: 'Una blusa sofisticada con caída impecable. La blusa Isabella combina suavidad al tacto y estructura sutil en los hombros, haciéndola la prenda ideal para combinar con sastrería o jeans rectos.',
    composition: '70% Viscosa Sostenible, 30% Rayón Premium',
    careInstructions: [
      'Lavar en ciclo delicado con bolsa de lavado',
      'No retorcer ni exprimir',
      'Planchar con vapor a baja temperatura'
    ],
    measurements: {
      modelHeight: '1.68 m',
      modelWearingSize: 'S'
    },
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'prod-pantalon-siena',
    slug: 'pantalon-siena',
    name: 'Pantalón Siena',
    tagline: 'Pantalón sastre de tiro alto con pinzas y pernera ancha',
    category: 'pantalones',
    categoryName: 'Pantalones',
    occasion: 'oficina',
    price: 749,
    originalPrice: 949,
    badge: 'BEST SELLER',
    rating: 5.0,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Beige Cálido', hex: '#DCCFBD' },
      { name: 'Negro Carbón', hex: '#292725' },
      { name: 'Café Moka', hex: '#5D493D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 15,
    description: 'El pantalón sastre que estiliza cualquier silueta. Confeccionado con un tiro alto estructurado y pinzas delanteras que aportan elegancia sin sacrificar la libertad de movimiento en tu día a día.',
    composition: '65% Poliéster Reciclado, 32% Rayón, 3% Elastano',
    careInstructions: [
      'Lavar a máquina en ciclo frío',
      'No usar secadora',
      'Colgar en gancho para mantener las pinzas definidas'
    ],
    measurements: {
      modelHeight: '1.74 m',
      modelWearingSize: 'M'
    },
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'prod-set-olivia',
    slug: 'set-olivia',
    name: 'Set Olivia',
    tagline: 'Conjunto dos piezas chaleco estructurado y falda midi',
    category: 'sets',
    categoryName: 'Sets',
    occasion: 'evento',
    price: 999,
    originalPrice: 1299,
    badge: 'NUEVO',
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Crema Crudo', hex: '#F7F2EA' },
      { name: 'Taupe Desierto', hex: '#A99B8B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 9,
    description: 'El Set Olivia resuelve tu outfit completo en un segundo. Chaleco abotonado al frente con forro interno suave y falda midi con abertura trasera sutil. Puedes usarlos juntos para un look coordinado o por separado para infinitas combinaciones.',
    composition: '75% Lino, 25% Algodón',
    careInstructions: [
      'Lavado en seco recomendado o lavado a mano con agua fría',
      'No exprimir',
      'Planchar con trapo húmedo encima'
    ],
    measurements: {
      modelHeight: '1.70 m',
      modelWearingSize: 'S'
    },
    isBestSeller: false,
    isNewArrival: true,
    featured: true
  },
  {
    id: 'prod-vestido-emilia',
    slug: 'vestido-emilia',
    name: 'Vestido Emilia',
    tagline: 'Vestido camisero en popelina de algodón con cinturón de tela',
    category: 'vestidos',
    categoryName: 'Vestidos',
    occasion: 'casual',
    price: 1099,
    badge: 'ÚLTIMAS PIEZAS',
    rating: 4.8,
    reviewCount: 34,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Blanco Nieve', hex: '#FFFFFF' },
      { name: 'Azul Nube', hex: '#C5D0D6' }
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 4,
    description: 'Un clásico renovado. El Vestido Emilia está confeccionado en popelina de algodón de peso medio con botones en concha nácar y cinturón a juego para ajustar a tu gusto.',
    composition: '100% Algodón Popelina Peinado',
    careInstructions: ['Lavar a máquina en frío', 'Planchar con vapor alto'],
    measurements: {
      modelHeight: '1.69 m',
      modelWearingSize: 'M'
    },
    isBestSeller: false,
    isNewArrival: false,
    featured: false
  },
  {
    id: 'prod-blusa-valentina',
    slug: 'blusa-valentina',
    name: 'Blusa Valentina',
    tagline: 'Top fluido con escote barco y detalle fruncido en hombro',
    category: 'blusas',
    categoryName: 'Blusas',
    occasion: 'casual',
    price: 549,
    badge: 'SALE',
    originalPrice: 699,
    rating: 4.7,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Rosa Empolvado', hex: '#E2C2B9' },
      { name: 'Ivory', hex: '#F7F2EA' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 14,
    description: 'La prenda básica pero elevada que tu armario cápsula necesita. Tejido ligero con tacto ultrasuave y favorecedor cuello barco.',
    composition: '95% Modal, 5% Spandex',
    careInstructions: ['Lavar en frío', 'No usar secadora caliente'],
    measurements: {
      modelHeight: '1.67 m',
      modelWearingSize: 'S'
    },
    isBestSeller: false,
    isNewArrival: false,
    featured: false
  },
  {
    id: 'prod-pantalon-roma',
    slug: 'pantalon-roma',
    name: 'Pantalón Roma',
    tagline: 'Pantalón cropped de lino con elástico oculto posterior',
    category: 'pantalones',
    categoryName: 'Pantalones',
    occasion: 'fin-de-semana',
    price: 699,
    badge: 'NUEVO',
    rating: 4.9,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Arena Suave', hex: '#DCCFBD' },
      { name: 'Oliva Suave', hex: '#8F9479' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 20,
    description: 'Comodidad total para el día a día. Pretina delantera limpia para estilizar y elástico en espalda para máxima adaptabilidad.',
    composition: '70% Lino, 30% Rayón',
    careInstructions: ['Lavar en frío', 'Secado al aire libre'],
    measurements: {
      modelHeight: '1.71 m',
      modelWearingSize: 'M'
    },
    isBestSeller: false,
    isNewArrival: true,
    featured: false
  },
  {
    id: 'prod-set-laura',
    slug: 'set-laura',
    name: 'Set Laura',
    tagline: 'Nuestra pieza insignia: Top asimétrico y pantalón palazzo',
    category: 'sets',
    categoryName: 'Sets',
    occasion: 'cena',
    price: 949,
    originalPrice: 1199,
    badge: 'BEST SELLER',
    rating: 5.0,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Charcoal / Carbón', hex: '#292725' },
      { name: 'Dorado Suave', hex: '#B99663' },
      { name: 'Ivory', hex: '#F7F2EA' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 11,
    description: 'El conjunto representativo de la boutique. Un diseño asimétrico contemporáneo que fusiona la comodidad de un palazzo vaporoso con un top moderno que roba miradas.',
    composition: '85% Tencel Lyocell, 15% Seda Sintética',
    careInstructions: ['Lavar a mano', 'Planchado suave con vapor'],
    measurements: {
      modelHeight: '1.73 m',
      modelWearingSize: 'S'
    },
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'prod-bolsa-siena',
    slug: 'bolsa-siena',
    name: 'Bolsa Siena',
    tagline: 'Bolso baguette en piel vegana estructurada con herrajes dorados',
    category: 'accesorios',
    categoryName: 'Accesorios',
    occasion: 'casual',
    price: 499,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviewCount: 39,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Caramelo / Camel', hex: '#9C6F44' },
      { name: 'Negro Clásico', hex: '#292725' }
    ],
    sizes: ['ÚNICA'],
    inStock: true,
    stockCount: 16,
    description: 'El bolso minimalista definitivo. Tamaño perfecto para tus esenciales diarios, con correa intercambiable para llevar al hombro o cruzado.',
    composition: 'Piel vegana PU de alta densidad, forro de algodón orgánico',
    careInstructions: ['Limpiar con paño suave ligeramente húmedo'],
    isBestSeller: true,
    isNewArrival: false,
    featured: true
  },
  {
    id: 'prod-aretes-alma',
    slug: 'aretes-alma',
    name: 'Aretes Alma',
    tagline: 'Arracadas orgánicas martilladas con baño en oro de 18k',
    category: 'accesorios',
    categoryName: 'Accesorios',
    occasion: 'evento',
    price: 299,
    rating: 5.0,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200'
    ],
    colors: [
      { name: 'Oro Suave', hex: '#B99663' }
    ],
    sizes: ['ÚNICA'],
    inStock: true,
    stockCount: 30,
    description: 'Piezas artesanales con textura irregular que capturan la luz de manera sutil y elegante. Hipoalergénicos y ultraligeros.',
    composition: 'Latón con triple chapa de oro 18k libre de níquel',
    careInstructions: ['Guardar en su bolsita de tela', 'Evitar contacto directo con perfumes'],
    isBestSeller: false,
    isNewArrival: false,
    featured: true
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'vestidos',
    name: 'VESTIDOS',
    tagline: 'Elegancia que nunca pasa de moda',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=900',
    link: '/shop?category=vestidos',
    count: 24
  },
  {
    id: 'blusas',
    name: 'BLUSAS',
    tagline: 'Detalles que hacen la diferencia',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=900',
    link: '/shop?category=blusas',
    count: 18
  },
  {
    id: 'pantalones',
    name: 'PANTALONES',
    tagline: 'Comodidad con estilo',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900',
    link: '/shop?category=pantalones',
    count: 16
  },
  {
    id: 'sets',
    name: 'SETS',
    tagline: 'Looks completos sin complicaciones',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=900',
    link: '/shop?category=sets',
    count: 12
  },
  {
    id: 'accesorios',
    name: 'ACCESORIOS',
    tagline: 'El toque final',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=900',
    link: '/shop?category=accesorios',
    count: 20
  }
];

export const LOOK_BUNDLE_DATA: LookBundle = {
  id: 'look-01',
  name: 'LOOK 01',
  tagline: 'Estilismo minimalista para transicionar del día a la noche',
  image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
  items: [
    { name: 'Vestido Aura', price: 899, productId: 'prod-vestido-aura' },
    { name: 'Bolsa Siena', price: 499, productId: 'prod-bolsa-siena' },
    { name: 'Aretes Alma', price: 299, productId: 'prod-aretes-alma' }
  ],
  totalPrice: 1697,
  productIds: ['prod-vestido-aura', 'prod-bolsa-siena', 'prod-aretes-alma']
};

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    name: 'Mariana R.',
    city: 'Guadalajara, Jal.',
    rating: 5,
    comment: 'Me encantó la calidad. Se ve mucho más caro de lo que cuesta. Las telas tienen una caída hermosa y el empaque venía perfumado y muy cuidado.'
  },
  {
    id: 't-2',
    name: 'Fernanda G.',
    city: 'Monterrey, N.L.',
    rating: 5,
    comment: 'Por fin encontré ropa bonita que puedo usar tanto para trabajar como para salir los fines de semana. Las tallas corresponden exactamente a las medidas.'
  },
  {
    id: 't-3',
    name: 'Alejandra M.',
    city: 'Ciudad de México',
    rating: 5,
    comment: 'Todo llegó precioso y el vestido me quedó perfecto. El envío a CDMX tardó solo 2 días. Sin duda seré clienta frecuente de My Boutique More.'
  }
];

export const INSTAGRAM_POSTS_DATA = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    likes: 420,
    comments: 28,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    likes: 635,
    comments: 45,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    likes: 310,
    comments: 19,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=800',
    likes: 580,
    comments: 37,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    likes: 720,
    comments: 54,
    url: 'https://instagram.com'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    likes: 490,
    comments: 31,
    url: 'https://instagram.com'
  }
];

export const COUPONS_DATA: Coupon[] = [
  {
    code: 'LAURA10',
    discountPercentage: 10,
    description: '10% de descuento en tu orden',
    active: true
  },
  {
    code: 'BIENVENIDA15',
    discountPercentage: 15,
    minSpend: 999,
    description: '15% de descuento en compras mayores a $999 MXN',
    active: true
  },
  {
    code: 'ENVIOGRATIS',
    discountPercentage: 0,
    discountFixed: 149,
    description: 'Envío estándar sin costo',
    active: true
  }
];

export const INITIAL_ORDERS_DATA: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'LB-94821',
    date: '2026-08-20',
    items: [
      {
        id: 'ci-1',
        product: PRODUCTS_DATA[0],
        selectedColor: PRODUCTS_DATA[0].colors[0],
        selectedSize: 'S',
        quantity: 1
      },
      {
        id: 'ci-2',
        product: PRODUCTS_DATA[8],
        selectedColor: PRODUCTS_DATA[8].colors[0],
        selectedSize: 'ÚNICA',
        quantity: 1
      }
    ],
    subtotal: 1398,
    discount: 139.8,
    shipping: 0,
    total: 1258.2,
    status: 'En camino',
    trackingNumber: 'DHL-MX-849204812',
    shippingAddress: {
      fullName: 'Sofía Valenzuela',
      email: 'sofia.valenzuela@gmail.com',
      phone: '55 1234 5678',
      street: 'Av. Horacio 412, Depto 302',
      colonia: 'Polanco',
      city: 'Ciudad de México',
      state: 'Ciudad de México',
      postalCode: '11560'
    },
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'ord-1002',
    orderNumber: 'LB-94822',
    date: '2026-08-22',
    items: [
      {
        id: 'ci-3',
        product: PRODUCTS_DATA[2],
        selectedColor: PRODUCTS_DATA[2].colors[0],
        selectedSize: 'M',
        quantity: 1
      }
    ],
    subtotal: 749,
    discount: 0,
    shipping: 149,
    total: 898,
    status: 'En preparación',
    trackingNumber: 'EST-MX-99201948',
    shippingAddress: {
      fullName: 'Camila Navarro',
      email: 'camilanavarro@outlook.com',
      phone: '33 9876 5432',
      street: 'Paseo de los Laureles 104',
      colonia: 'Puerta de Hierro',
      city: 'Zapopan',
      state: 'Jalisco',
      postalCode: '45116'
    },
    paymentMethod: 'Mercado Pago'
  }
];
