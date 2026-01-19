import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import { CATEGORIES } from '../constants/categories';
import { PageRoute, Photo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

const CategoryGallery: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const { t } = useLanguage();

    const category = CATEGORIES.find(c => c.id === categoryId);

    if (!category) {
        return <Navigate to={PageRoute.PHOTOGRAPHY} replace />;
    }

    // Mocking images logic based on the existing available files in the system
    // In a real app, this would query a backend or a larger config file.
    const images = useMemo(() => {
        const generatedImages: Photo[] = [];

        let prefix = 'p';
        let start = 50;
        let count = 12; // Images per category to show

        // Simple distribution hash to vary images slightly between categories
        // ensuring we use the files we saw in the file list (p50-p89, comm_1...)
        if (category.id === 'commercial') {
            // Use commercial folder
            for (let i = 1; i <= 20; i++) {
                generatedImages.push({
                    id: `${category.id}-${i}`,
                    url: `/images/commercial/comm_${i}.webp`,
                    category: t(category.titleKey),
                    title: `${t(category.titleKey)} ${i}`
                });
            }
        } else {
            // Distribute portfolio images
            // We have roughly p50 to p89 (40 images) + some others.
            // We'll just loop through them with different offsets.
            const categoryIndex = CATEGORIES.indexOf(category);
            const offset = categoryIndex * 5;

            for (let i = 0; i < 15; i++) {
                // Formula to cycle through available images p50-p89
                const fileNum = 50 + ((i + offset) % 40);
                generatedImages.push({
                    id: `${category.id}-${i}`,
                    url: `/images/portfolio/p${fileNum}.webp`,
                    category: t(category.titleKey),
                    title: `${t(category.titleKey)} ${i + 1}`
                });
            }
        }
        return generatedImages;
    }, [category, t]);


    return (
        <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto fade-in min-h-screen">
            {/* Header */}
            <div className="mb-12 flex flex-col items-center text-center relative">
                <Link
                    to={PageRoute.PHOTOGRAPHY}
                    className="absolute left-0 top-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition-colors flex items-center gap-2"
                    title={t('nav.photography')}
                >
                    <ArrowLeft size={20} className="stroke-[1.5]" />
                    <span className="hidden md:inline font-sans text-xs tracking-widest uppercase">Back</span>
                </Link>

                <h1 className="font-serif text-4xl md:text-6xl mb-4 text-stone-900 dark:text-stone-100 tracking-wide uppercase">
                    {t(category.titleKey)}
                </h1>
                <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-stone-500 dark:text-stone-400 uppercase max-w-2xl leading-relaxed">
                    {t(category.descriptionKey)}
                </p>
                <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mt-8"></div>
            </div>

            {/* Mosaic Gallery */}
            <Gallery photos={images} />
        </div>
    );
};

export default CategoryGallery;
