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
            <img
                src={src}
                alt={alt}
                className={`transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'
                    } ${className}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
                {...props}
            />
        </div>
    );
};

export default FadeInImage;
