import React from 'react';
import { Link } from 'react-router-dom';
import { PortfolioCategory, PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import FadeInImage from './FadeInImage';

interface CategoryHeroProps {
    category: PortfolioCategory;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ category }) => {
    const { t } = useLanguage();

    return (
        <Link
            to={`${PageRoute.PHOTOGRAPHY}/${category.id}`}
            className="relative block w-full h-[15vh] min-h-[150px] md:h-[35vh] md:min-h-[350px] lg:h-[40vh] group overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <FadeInImage
                    src={category.coverImage}
                    alt={t(category.titleKey)}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 ${category.id === 'casual' ? '!w-[calc(100%+40px)] !max-w-none !-ml-[20px]' : ''}`}
                    containerClassName="w-full h-full"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 transition-transform duration-700 group-hover:scale-105">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-widest mb-2 md:mb-4 drop-shadow-lg transition-all duration-300">
                    {t(category.titleKey)}
                </h2>
                <p className="text-white/90 font-sans text-[10px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-[80%] md:max-w-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {t(category.descriptionKey)}
                </p>
            </div>
        </Link>
    );
};

export default CategoryHero;
