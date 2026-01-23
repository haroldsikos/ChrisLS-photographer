import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    delay?: number;
    threshold?: number;
    duration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    duration = 1000,
    style,
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '50px' // Trigger slightly before element is fully in view
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={`transition-all ease-out transform ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
                } ${className}`}
            style={{
                ...style,
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default FadeIn;
