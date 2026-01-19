import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ArrowUpRight, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
}

const Shop: React.FC = () => {
  // Número de teléfono para WhatsApp (Reemplazar con el real)
  const WHATSAPP_NUMBER = "51972772288";
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Print: Atardecer Andino",
      type: "Fine Art Print",
      price: 45.00,
      image: "/images/shop/shop_1.webp",
      description: "Impresión Giclée en papel de algodón de 30x40cm. Edición limitada."
    },
    {
      id: 2,
      name: "Pack Presets: Nostalgia",
      type: "Digital",
      price: 25.00,
      image: "/images/shop/shop_2.webp",
      description: "Colección de 10 presets para Lightroom Desktop & Mobile. Estilo cinematográfico."
    },
    {
      id: 3,
      name: "Sesión Retrato: Esencia",
      type: "Servicio",
      price: 150.00,
      image: "/images/shop/shop_3.webp",
      description: "Sesión de 1 hora en exteriores. Entrega de 20 fotos editadas en alta resolución."
    },
    {
      id: 4,
      name: "Print: Océano Profundo",
      type: "Fine Art Print",
      price: 60.00,
      image: "/images/shop/shop_4.webp",
      description: "Impresión gran formato 50x70cm. Papel mate de alta calidad."
    },
    {
      id: 5,
      name: "Mentoria 1:1",
      type: "Educación",
      price: 80.00,
      image: "/images/shop/shop_5.webp",
      description: "Revisión de portafolio y dirección creativa por videollamada (60 min)."
    },
    {
      id: 6,
      name: "Zine: Caminos",
      type: "Físico",
      price: 35.00,
      image: "/images/shop/shop_6.webp",
      description: "Fotolibro de tapa blanda con 40 páginas de fotografía documental de viajes."
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x750/F5F5F4/57534E?text=Mockup"; // Fallback aesthetic mockup
    e.currentTarget.onerror = null; // Prevent infinite loop
  };

  const handleBuyClick = (product: Product) => {
    const message = `Hola Chris LS, estoy interesado en el producto: ${product.name} (Precio ref: S/ ${product.price.toFixed(2)}). ¿Me podrías dar más información?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleImageClick = (index: number) => {
    setSelectedProductIndex(index);
  };

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
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900 dark:text-stone-100">Tienda</h1>
        <p className="font-sans text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">Prints, Presets & Servicios</p>
        <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product, index) => (
          <div key={product.id} className="group flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-6 cursor-pointer" onClick={() => handleImageClick(index)}>
              <img
                src={product.image}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white drop-shadow-md">
                <Maximize2 size={20} />
              </div>

              {/* Type Tag */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-stone-900 dark:text-stone-100">
                {product.type}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors cursor-pointer" onClick={() => handleImageClick(index)}>
                  {product.name}
                </h3>
                <span className="font-sans text-sm font-medium text-stone-800 dark:text-stone-200 ml-4">
                  S/ {product.price.toFixed(2)}
                </span>
              </div>

              <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>

              <button
                onClick={() => handleBuyClick(product)}
                className="w-full py-3 border border-stone-200 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 hover:bg-stone-900 dark:hover:bg-customDark hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 group/btn text-stone-900 dark:text-stone-200"
              >
                <span>Consultar</span>
                <ArrowUpRight size={14} className="opacity-50 group-hover/btn:opacity-100" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center bg-stone-100 dark:bg-stone-800/50 p-8 rounded-sm">
        <p className="font-sans text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">¿Buscas algo personalizado?</p>
        <p className="font-serif text-xl text-stone-800 dark:text-stone-200">
          Realizo impresiones a medida y licencias comerciales bajo pedido.
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
              <button
                onClick={() => handleBuyClick(selectedProduct)}
                className="mt-4 px-6 py-2 border border-white/30 hover:bg-white hover:text-stone-900 transition-colors text-xs uppercase tracking-[0.2em]"
              >
                Consultar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;