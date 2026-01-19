import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ArrowUpRight, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
}

const Shop: React.FC = () => {
  const { t, language, formatCurrency } = useLanguage();
  // Número de teléfono para WhatsApp (Reemplazar con el real)
  const WHATSAPP_NUMBER = "51972772288";
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

  // Products data regenerated with translations
  const products: Product[] = [
    {
      id: 1,
      name: t('shop.products.1.name'),
      type: t('shop.type.service'),
      price: 1500.00,
      image: "https://placehold.co/600x800/F5F5F4/57534E?text=Wedding",
      description: t('shop.products.1.desc')
    },
    {
      id: 2,
      name: t('shop.products.2.name'),
      type: t('shop.type.service'),
      price: 350.00,
      image: "https://placehold.co/600x800/F5F5F4/57534E?text=Maternity",
      description: t('shop.products.2.desc')
    },
    {
      id: 3,
      name: t('shop.products.3.name'),
      type: t('shop.type.service'),
      price: 450.00,
      image: "https://placehold.co/600x800/F5F5F4/57534E?text=Couple",
      description: t('shop.products.3.desc')
    },
    {
      id: 4,
      name: t('shop.products.4.name'),
      type: t('shop.type.service'),
      price: 250.00,
      image: "https://placehold.co/600x800/F5F5F4/57534E?text=Portrait",
      description: t('shop.products.4.desc')
    },
    {
      id: 5,
      name: t('shop.products.5.name'),
      type: t('shop.type.service'),
      price: 600.00,
      image: "https://placehold.co/600x800/F5F5F4/57534E?text=Event",
      description: t('shop.products.5.desc')
    },
    {
      id: 6,
      name: t('shop.products.6.name'),
      type: t('shop.type.print'),
      price: 120.00,
      image: "https://placehold.co/600x800/F5F5F4/57534E?text=Fine+Art+Print",
      description: t('shop.products.6.desc')
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x750/F5F5F4/57534E?text=Mockup"; // Fallback aesthetic mockup
    e.currentTarget.onerror = null; // Prevent infinite loop
    console.warn(`Failed to load image: ${e.currentTarget.src}`);
  };

  const getWhatsAppUrl = (product: Product) => {
    const message = `Hola Chris LS, estoy interesado en el producto: ${product.name} (Precio ref: S/ ${product.price.toFixed(2)}). ¿Me podrías dar más información?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleImageClick = (index: number) => {
    setSelectedProductIndex(index);
  };

  // ... (keeping existing useCallback/useEffect hooks for lightbox)

  const closeLightbox = useCallback(() => {
    setSelectedProductIndex(null);
  }, []);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedProductIndex((prev) =>
      prev !== null ? (prev + 1) % products.length : null
    );
  }, [products.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedProductIndex((prev) =>
      prev !== null ? (prev - 1 + products.length) % products.length : null
    );
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
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900 dark:text-stone-100">{t('shop.title')}</h1>
        <p className="font-sans text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">{t('shop.subtitle')}</p>
        <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
        {products.map((product, index) => (
          <div key={product.id} className="group flex flex-col">
            {/* Image Container */}
            {/* Image Container / Placeholder with Card Stack Effect - Always Visible Fan */}
            <div className="relative aspect-[4/5] mb-8 cursor-pointer group/card perspective-1000" onClick={() => handleImageClick(index)}>

              {/* Back Card 2 (Right Fan) - Always visible but tighter, expands on hover */}
              <div className="absolute inset-0 bg-stone-200 dark:bg-stone-700/60 rounded-sm transform transition-all duration-500 ease-out origin-bottom-right rotate-3 translate-x-2 group-hover/card:rotate-6 group-hover/card:translate-x-4 shadow-sm" />

              {/* Back Card 1 (Left Fan) - Always visible, expands on hover */}
              <div className="absolute inset-0 bg-stone-300 dark:bg-stone-600/60 rounded-sm transform transition-all duration-500 ease-out origin-bottom-left -rotate-2 -translate-x-1 group-hover/card:-rotate-3 group-hover/card:-translate-x-3 shadow-md" />

              {/* Main Front Card */}
              <div className="relative z-10 w-full h-full overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-lg transition-all duration-500 ease-out group-hover/card:-translate-y-2 group-hover/card:shadow-2xl flex items-center justify-center">

                {/* Content inside the card */}
                <div className="w-full h-full flex items-center justify-center p-6 text-center">
                  <span className="font-serif text-2xl italic tracking-widest text-stone-400 dark:text-stone-500 group-hover/card:text-stone-800 dark:group-hover/card:text-stone-300 transition-colors duration-500">
                    {product.name}
                  </span>
                </div>

                {/* Subtle sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 transition-all duration-500 -translate-y-2 group-hover/card:translate-y-0 text-stone-400 dark:text-stone-500">
                  <Maximize2 size={20} />
                </div>

                {/* Type Tag */}
                <div className="absolute top-4 left-4 bg-stone-900/5 dark:bg-white/5 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-stone-500 dark:text-stone-400 border border-stone-200/50 dark:border-stone-700/50">
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
          </div>
        ))}
      </div>

      <div className="mt-20 text-center bg-stone-100 dark:bg-stone-800/50 p-8 rounded-sm">
        <p className="font-sans text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">{t('shop.customTitle')}</p>
        <p className="font-serif text-xl text-stone-800 dark:text-stone-200">
          {t('shop.customText')}
        </p>
      </div>

      {/* Lightbox / Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[200] bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
          style={{ animationDuration: '0.3s' }}
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 flex gap-4 z-[201]">
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
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              title="Pantalla Completa"
            >
              <Maximize2 size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              title="Cerrar"
            >
              <X size={32} />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={showPrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[201] p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all hover:scale-110"
            title="Anterior"
          >
            <ChevronLeft size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
          </button>

          <button
            onClick={showNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[201] p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all hover:scale-110"
            title="Siguiente"
          >
            <ChevronRight size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={selectedProduct.id}
              src={selectedProduct.image}
              alt={selectedProduct.name}
              onError={handleImageError}
              className="max-h-[80vh] w-auto object-contain shadow-2xl rounded-sm fade-in"
              style={{ animationDuration: '0.3s' }}
            />
            <div className="mt-6 text-center text-white">
              <p className="font-serif text-2xl italic tracking-wide">{selectedProduct.name}</p>
              <p className="text-xs font-sans uppercase tracking-[0.2em] mt-2 text-stone-400">{selectedProduct.type}</p>
              {/* Optional: Add a button to buy directly from lightbox */}
              <a
                href={getWhatsAppUrl(selectedProduct)}
                className="mt-4 px-6 py-2 border border-white/30 hover:bg-white hover:text-stone-900 transition-colors text-xs uppercase tracking-[0.2em] inline-block"
              >
                {t('shop.consultLink')}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;