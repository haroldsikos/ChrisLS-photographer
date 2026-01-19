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

    return (
        <div className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${containerClassName}`}>
            {/* Animated Skeleton Shimmer Overlay */}
            <div
                className={`absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Base colored background while loading */}
            <div className={`absolute inset-0 bg-stone-200 dark:bg-stone-800 transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />

            <img
                src={src}
                alt={alt}
                className={`transition-all duration-1000 ease-out will-change-transform ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110'
                    } ${className}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
                {...props}
            />
        </div>
    );
};

export default FadeInImage;
