import React from 'react';
import Gallery from '../components/Gallery';
import { Photo } from '../types';

interface PortfolioProps {
  title: string;
  subtitle?: string;
  category: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ title, subtitle, category }) => {

  const getImages = () => {
    if (category === 'photo') {
      // Images p50-p89 (40 images)
      return Array.from({ length: 40 }, (_, i) => `/images/portfolio/p${50 + i}.webp`);
    } else if (category === 'commercial') {
      // Images comm_1-comm_40 (40 images)
      return Array.from({ length: 40 }, (_, i) => `/images/commercial/comm_${1 + i}.webp`);
    }
    return [];
  };

  const portfolioImages = getImages();

  const photos: Photo[] = portfolioImages.map((url, i) => ({
    id: `${category}-${i}`,
    url: url,
    title: `Moment ${i + 1}`,
    category: category
  }));

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto fade-in">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900 dark:text-stone-100">{title}</h1>
        {subtitle && (
          <p className="font-sans text-xs tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">{subtitle}</p>
        )}
        <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto mt-8"></div>
      </div>

      <Gallery photos={photos} />
    </div>
  );
};

export default Portfolio;