import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ArrowUpRight, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FadeIn from '../components/FadeIn';

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
  gallery?: string[];
  features?: string[];
}

const Shop: React.FC = () => {
  const { t, language, formatCurrency } = useLanguage();
  // Número de teléfono para WhatsApp (Reemplazar con el real)
  const WHATSAPP_NUMBER = "51972772288";
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Products data regenerated with translations
  const products: Product[] = [
    {
      id: 7,
      name: t('shop.products.7.name'),
      type: t('shop.type.digital'),
      price: 45.00,
      image: "/images/instagram/img_81.webp",
      description: t('shop.products.7.desc'),
      features: [
        "15 Presets únicos para Lightroom Mobile & Desktop",
        "Diseñados para condiciones de luz natural y artificial",
        "Estilo Cinematic, Moody y Warm tones",
        "Guía de instalación paso a paso (PDF)",
        "Compatibles con fotos RAW y JPG"
      ],
      gallery: [
        "/images/instagram/img_81.webp",
        "/images/instagram/img_70.webp",
        "/images/instagram/img_73.webp",
        "/images/instagram/img_13.webp",
        "/images/instagram/img_41.webp"
      ]
    },
    {
      id: 1,
      name: t('shop.products.1.name'),
      type: t('shop.type.service'),
      price: 1500.00,
      image: "https://images.unsplash.com/photo-1550713450-94c9b4fc9f25?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: t('shop.products.1.desc'),
      features: [
        "Cobertura fotográfica completa (8 horas)",
        "Sesión de pre-boda (Engagement) en locación a elegir",
        "Entrega de 500+ fotografías editadas en alta resolución",
        "Galería online privada para compartir con invitados",
        "Caja de regalo con 20 impresiones Fine Art 4x6"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1550713450-94c9b4fc9f25?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1517456215183-9a2c3a748d0c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 2,
      name: t('shop.products.2.name'),
      type: t('shop.type.service'),
      price: 350.00,
      image: "https://images.unsplash.com/photo-1538678867871-8a43e7487746?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: t('shop.products.2.desc'),
      features: [
        "Sesión fotográfica de 1.5 horas",
        "Asesoría de vestuario y styling personalizado",
        "Uso de vestidos del closet de clientes (si disponible)",
        "30 fotografías con edición artística detallada",
        "Opción de realizar en estudio o exterior (playa/campo)"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1538678867871-8a43e7487746?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1710897872810-363b7a8d3f95?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1649949474530-51fd3d999837?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    },
    {
      id: 3,
      name: t('shop.products.3.name'),
      type: t('shop.type.service'),
      price: 450.00,
      image: "https://images.unsplash.com/photo-1543932927-a9def13a0e7c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: t('shop.products.3.desc'),
      features: [
        "Experiencia fotográfica de 2 horas para parejas",
        "Guía de dirección para poses naturales y espontáneas",
        "40 fotografías editadas en alta calidad",
        "Cambio de vestuario ilimitado dentro del tiempo",
        "Video reel corto de regalo para redes sociales"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1543932927-a9def13a0e7c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1888&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: 4,
      name: t('shop.products.4.name'),
      type: t('shop.type.service'),
      price: 250.00,
      image: "https://images.unsplash.com/photo-1730423295586-d945e34a8a99?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: t('shop.products.4.desc'),
      features: [
        "Sesión individual de 1 hora",
        "Ideal para marca personal, LinkedIn o redes sociales",
        "15 fotografías con retoque de piel High-End",
        "Fondo infinito (blanco/negro) o ambiente natural",
        "Entrega digital en 48 horas"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1730423295586-d945e34a8a99?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop"
      ]
    },
    {
      id: 5,
      name: t('shop.products.5.name'),
      type: t('shop.type.service'),
      price: 600.00,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ",
      description: t('shop.products.5.desc'),
      features: [
        "Cobertura de eventos sociales o corporativos (4 horas)",
        "Captura de momentos clave y atmósfera del lugar",
        "Entrega ilimitada de fotos con corrección de color",
        "Entrega express en 3 días hábiles",
        "Link de descarga habilitado por 6 meses"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
      ]
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x750/F5F5F4/57534E?text=Mockup"; // Fallback aesthetic mockup
    e.currentTarget.onerror = null; // Prevent infinite loop
    console.warn(`Failed to load image: ${e.currentTarget.src}`);
  };

  const getWhatsAppUrl = (product: Product) => {
    const message = `Hola Cris L.S, estoy interesado en el producto: ${product.name} (Precio ref: S/ ${product.price.toFixed(2)}). ¿Me podrías dar más información?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleImageClick = (index: number) => {
    setSelectedProductIndex(index);
    setCurrentGalleryIndex(0);
  };

  // ... (keeping existing useCallback/useEffect hooks for lightbox)

  const closeLightbox = useCallback(() => {
    setSelectedProductIndex(null);
    setCurrentGalleryIndex(0);
  }, []);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedProductIndex((prev) =>
      prev !== null ? (prev + 1) % products.length : null
    );
    setCurrentGalleryIndex(0);
  }, [products.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedProductIndex((prev) =>
      prev !== null ? (prev - 1 + products.length) % products.length : null
    );
    setCurrentGalleryIndex(0);
  }, [products.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProductIndex === null) return;

      switch (e.key) {
        case 'Escape': closeLightbox(); break;
        case 'ArrowRight': showNext(); break;
        case 'ArrowLeft': showPrev(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProductIndex, closeLightbox, showNext, showPrev]);

  const selectedProduct = selectedProductIndex !== null ? products[selectedProductIndex] : null;

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto fade-in">
      <FadeIn className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900 dark:text-stone-100">{t('shop.title')}</h1>
        <p className="font-sans text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">{t('shop.subtitle')}</p>
        <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mt-8"></div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
        {products.map((product, index) => (
          <FadeIn key={product.id} className="group flex flex-col" delay={index * 100}>
            {/* Image Container */}
            {/* Image Container / Placeholder with Card Stack Effect - Always Visible Fan */}
            <div className="relative aspect-[4/5] w-[90%] mx-auto mb-12 cursor-pointer group/card perspective-1000" onClick={() => handleImageClick(index)}>

              {/* Back Card 2 (Right Fan) - Always visible but tighter, expands on hover */}
              <div className="absolute inset-0 bg-stone-200 dark:bg-stone-700/60 rounded-sm transform transition-all duration-500 ease-out origin-bottom-right rotate-3 translate-x-2 group-hover/card:rotate-4 group-hover/card:translate-x-3 shadow-sm overflow-hidden">
                {product.gallery?.[2] && (
                  <img
                    src={product.gallery[2]}
                    alt=""
                    className={`w-full h-full object-cover opacity-80 ${product.id === 7 ? 'scale-110' : ''}`}
                    loading="lazy"
                  />
                )}
              </div>

              {/* Back Card 1 (Left Fan) - Always visible, expands on hover */}
              <div className="absolute inset-0 bg-stone-300 dark:bg-stone-600/60 rounded-sm transform transition-all duration-500 ease-out origin-bottom-left -rotate-2 -translate-x-1 group-hover/card:-rotate-2 group-hover/card:-translate-x-2 shadow-md overflow-hidden">
                {product.gallery?.[1] && (
                  <img
                    src={product.gallery[1]}
                    alt=""
                    className={`w-full h-full object-cover opacity-90 ${product.id === 7 ? 'scale-110' : ''}`}
                    loading="lazy"
                  />
                )}
              </div>

              {/* Main Front Card */}
              <div className="relative z-10 w-full h-full overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-lg transition-all duration-500 ease-out group-hover/card:-translate-y-1 group-hover/card:shadow-2xl flex items-center justify-center">

                {/* Main Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  onError={handleImageError}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${product.id === 7 ? 'scale-110 group-hover/card:scale-[1.15]' : 'group-hover/card:scale-105'}`}
                  loading="lazy"
                />

                {/* Overlay for text legibility (optional, primarily for hover) */}
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-colors duration-500" />

                {/* Content inside the card - Hidden by default, appears on hover or if no image */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-6 text-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                  <span className="font-serif text-xl md:text-2xl italic tracking-widest text-white drop-shadow-md">
                    {product.name}
                  </span>
                </div>

                {/* Subtle sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-30" />

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 transition-all duration-500 -translate-y-2 group-hover/card:translate-y-0 text-white z-30">
                  <Maximize2 size={20} />
                </div>

                {/* Type Tag */}
                <div className="absolute top-4 left-4 bg-stone-900/60 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-white border border-white/20 z-30">
                  {product.type}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors cursor-pointer" onClick={() => handleImageClick(index)}>
                  {product.name}
                </h3>
                <span className="font-sans text-sm font-medium text-stone-800 dark:text-stone-200 ml-4">
                  {formatCurrency(product.price)}
                </span>
              </div>

              <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>

              <a
                href={getWhatsAppUrl(product)}
                className="w-full py-3 border border-stone-200 dark:border-stone-700 hover:border-stone-900 dark:hover:border-white hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all duration-300 text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 group/btn text-stone-900 dark:text-stone-200"
              >
                <span>{t('shop.consultLink')}</span>
                <ArrowUpRight size={14} className="opacity-50 group-hover/btn:opacity-100" />
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-20 text-center bg-stone-100 dark:bg-stone-800/50 p-8 rounded-sm">
        <p className="font-sans text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">{t('shop.customTitle')}</p>
        <p className="font-serif text-xl text-stone-800 dark:text-stone-200">
          {t('shop.customText')}
        </p>
      </FadeIn>

      {/* Lightbox / Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[200] bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 fade-in"
          style={{ animationDuration: '0.3s' }}
          onClick={closeLightbox}
        >
          {/* Main Content Card */}
          <div
            className="relative max-w-6xl w-full bg-stone-100 dark:bg-stone-900 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] mx-auto border border-stone-200 dark:border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE COLUMN (Mobile: Top Right, Desktop: Absolute in Right Col) */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full text-stone-500 hover:text-white transition-colors md:hidden"
            >
              <X size={24} />
            </button>

            {/* LEFT COLUMN: Image / Gallery */}
            <div className="w-full md:w-3/5 bg-stone-200 dark:bg-black flex items-center justify-center relative h-[40%] md:h-full overflow-hidden group/gallery">

              {/* Gallery Navigation Arrows (Internal) */}
              {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGalleryIndex(prev => prev === 0 ? selectedProduct.gallery!.length - 1 : prev - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all md:opacity-0 md:group-hover/gallery:opacity-100 z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGalleryIndex(prev => (prev + 1) % selectedProduct.gallery!.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all md:opacity-0 md:group-hover/gallery:opacity-100 z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Main Lightbox Image */}
              <img
                key={`${selectedProduct.id}-${currentGalleryIndex}`}
                src={selectedProduct.gallery ? selectedProduct.gallery[currentGalleryIndex] : selectedProduct.image}
                alt={selectedProduct.name}
                onError={handleImageError}
                className="w-full h-full object-contain bg-stone-900 fade-in select-none"
                style={{ animationDuration: '0.4s' }}
              />

              {/* Dots Indicators (Overlay on Image) */}
              {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {selectedProduct.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentGalleryIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === currentGalleryIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/80'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Info & Details */}
            <div className="w-full md:w-2/5 p-8 md:p-10 overflow-y-auto bg-white dark:bg-stone-900 flex flex-col h-full relative">

              {/* Desktop Close Button */}
              <div className="hidden md:flex absolute top-4 right-4 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const elem = document.documentElement;
                    if (!document.fullscreenElement) {
                      elem.requestFullscreen().catch(err => console.error(err));
                    } else {
                      if (document.exitFullscreen) document.exitFullscreen().catch(err => console.error(err));
                    }
                  }}
                  className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors p-2"
                  title="Pantalla Completa"
                >
                  <Maximize2 size={20} />
                </button>
                <button
                  onClick={closeLightbox}
                  className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Product Header */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-bold mb-2 block">
                  {selectedProduct.type}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-xl font-medium text-stone-800 dark:text-stone-200">
                  {formatCurrency(selectedProduct.price)}
                </p>
              </div>

              {/* Description */}
              <div className="prose prose-stone dark:prose-invert mb-8">
                <p className="text-stone-600 dark:text-stone-400 font-sans text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="w-full h-px bg-stone-200 dark:bg-stone-800 mb-8"></div>

              {/* Features List */}
              {selectedProduct.features && (
                <div className="mb-8 flex-grow">
                  <h3 className="font-sans text-xs uppercase tracking-widest text-stone-900 dark:text-stone-100 font-bold mb-4">
                    {t('shop.includes') || 'LO QUE INCLUYE:'}
                  </h3>
                  <ul className="space-y-3">
                    {selectedProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-200 shrink-0 mt-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-auto pt-6">
                <a
                  href={getWhatsAppUrl(selectedProduct)}
                  className="w-full py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-white/90 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>{t('shop.consultLink')}</span>
                  <ShoppingBag size={16} />
                </a>
              </div>

            </div>
          </div>

          {/* Global Product Navigation (Outside Card) */}
          <button
            onClick={showPrev}
            className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-[201] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all hover:scale-110"
            title="Producto Anterior"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>

          <button
            onClick={showNext}
            className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-[201] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all hover:scale-110"
            title="Siguiente Producto"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>

        </div>
      )}
    </div>
  );
};

export default Shop;