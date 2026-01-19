import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

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

  const handleBuyClick = (product: Product) => {
    const message = `Hola Chris LS, estoy interesado en el producto: ${product.name} (Precio ref: S/ ${product.price.toFixed(2)}). ¿Me podrías dar más información?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto fade-in">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900 dark:text-stone-100">Tienda</h1>
        <p className="font-sans text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">Prints, Presets & Servicios</p>
        <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-6 cursor-pointer" onClick={() => handleBuyClick(product)}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

              {/* Type Tag */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-stone-900 dark:text-stone-100">
                {product.type}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors cursor-pointer" onClick={() => handleBuyClick(product)}>
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
    </div>
  );
};

export default Shop;