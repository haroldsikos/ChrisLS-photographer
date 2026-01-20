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

        // Updated logic for reorganized folder structure: /images/categories/[id]/[1..N].webp
        if (category.id === 'commercial') {
            // Commercial has ~40 images (comm_1 ... comm_40)
            for (let i = 1; i <= 20; i++) {
                generatedImages.push({
                    id: `${category.id}-${i}`,
                    // Note: My script moved 'commercial' folder content to 'categories/commercial'
                    // The files inside are likely still named 'comm_X.webp' if they were before, 
                    // or just 1.webp etc if I renamed them? 
                    // My script: "if dst exists, move files individually". 
                    // It does NOT rename commercial files. It preserved names. 
                    // Previous names were 'comm_X.webp'.
                    url: `/images/categories/commercial/comm_${i}.webp`,
                    category: t(category.titleKey),
                    title: `${t(category.titleKey)} ${i}`
                });
            }
        } else {
            // Other categories have ~5 images each (1.webp ... 5.webp)
            // We want to show a grid of 12, so we cycle them.
            const availableImagesCount = 5;

            for (let i = 0; i < 12; i++) {
                // cycle 1..5
                const fileNum = (i % availableImagesCount) + 1;

                generatedImages.push({
                    id: `${category.id}-${i}`,
                    url: `/images/categories/${category.id}/${fileNum}.webp`,
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
