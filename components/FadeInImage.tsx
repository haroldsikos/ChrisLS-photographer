import React, { useState } from 'react';

interface FadeInImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
}

const FadeInImage: React.FC<FadeInImageProps> = ({
    src,
    alt,
    className = '',
    containerClassName = '',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showWatermark, setShowWatermark] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowWatermark(true);
        setTimeout(() => setShowWatermark(false), 2000);
    };

    return (
        <div
            className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${containerClassName}`}
            onContextMenu={handleContextMenu}
        >
            {/* Animated Skeleton Shimmer Overlay */}
            <div
                className={`absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Base colored background while loading */}
            <div className={`absolute inset-0 bg-stone-200 dark:bg-stone-800 transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />

            {/* Visual Watermark Overlay */}
            <div
                className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${showWatermark ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-sm border border-white/20">
                    <p className="font-serif text-white text-xl tracking-widest uppercase">© Cris L.S</p>
                </div>
            </div>

            <img
                src={src}
                alt={alt}
                className={`transition-all duration-1000 ease-out will-change-transform select-none ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl scale-110'
                    } ${className}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
                draggable={false}
                {...props}
            />
        </div>
    );
};

export default FadeInImage;
