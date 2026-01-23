import React, { useState, useEffect, useCallback } from 'react';
import { Photo } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeInImage from './FadeInImage';
import FadeIn from './FadeIn';

interface GalleryProps {
  photos: Photo[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeGallery = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, [photos.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      switch (e.key) {
        case 'Escape': closeGallery(); break;
        case 'ArrowRight': showNext(); break;
        case 'ArrowLeft': showPrev(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, closeGallery, showNext, showPrev]);

  const selectedPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 px-4 md:px-0">
        {photos.map((photo, index) => {
          // Staggered vertical alignment without rotation - More pronounced (más marcado)
          const margins = ['mt-0', 'mt-24', 'mt-8', 'mt-32', 'mt-12', 'mt-20'];
          const marginStyle = margins[index % margins.length];

          return (
            <FadeIn
              key={photo.id}
              className={`break-inside-avoid mb-16 group cursor-pointer ${marginStyle} transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105 relative z-0 hover:z-20`}
              onClick={() => handlePhotoClick(index)}
            >
              <div className="relative overflow-hidden">
                <FadeInImage
                  src={photo.url}
                  alt={photo.title || "Photography by Cris L.S"}
                  className="w-full h-auto transition-transform duration-[1.5s] ease-out scale-110 group-hover:scale-115"
                  containerClassName="w-full bg-stone-100 dark:bg-stone-900"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                {photo.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-gradient-to-t from-black/50 to-transparent">
                    <p className="font-serif italic text-lg tracking-wide">{photo.title}</p>
                    {photo.category && <p className="text-xs font-sans uppercase tracking-widest">{photo.category}</p>}
                  </div>
                )}
                {/* Expand icon indicator on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white drop-shadow-md">
                  <Maximize2 size={20} />
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Lightbox / Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[200] bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4 fade-in"
          style={{ animationDuration: '0.3s' }}
          onClick={closeGallery}
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
                closeGallery();
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
            onContextMenu={(e) => {
              e.preventDefault();
              const el = document.getElementById('lightbox-watermark');
              if (el) {
                el.style.opacity = '1';
                setTimeout(() => { el.style.opacity = '0'; }, 2000);
              }
            }}
          >
            {/* Visual Watermark Overlay for Lightbox */}
            <div
              id="lightbox-watermark"
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 opacity-0"
            >
              <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-sm border border-white/20">
                <p className="font-serif text-white text-xl tracking-widest uppercase">© Cris L.S</p>
              </div>
            </div>
            <img
              key={selectedPhoto.id} // Re-mount key for animation
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-h-[80vh] w-auto object-contain shadow-2xl rounded-sm fade-in select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              style={{ animationDuration: '0.3s' }}
            />
            <div className="mt-6 text-center text-white">
              <p className="font-serif text-2xl italic tracking-wide">{selectedPhoto.title}</p>
              {selectedPhoto.category && <p className="text-xs font-sans uppercase tracking-[0.2em] mt-2 text-stone-400">{selectedPhoto.category}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;