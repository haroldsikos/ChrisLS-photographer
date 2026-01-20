import React from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import FadeInImage from '../components/FadeInImage';

const Home: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="fade-in">
      {/* Hero Section - 5x1 Image Grid */}
      <div className="relative h-screen w-full grid grid-cols-5 overflow-hidden">
        {[
          '/images/hero/hero_slide_1.webp',
          '/images/hero/hero_slide_2.webp',
          '/images/hero/hero_slide_3.webp',
          '/images/hero/hero_slide_4.webp',
          '/images/hero/hero_slide_5.webp'
        ].map((src, index) => (
          <div key={index} className="relative h-full w-full overflow-hidden border-r border-white last:border-r-0">
            <FadeInImage
              src={src}
              alt={`Gallery strip ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover scale-[1.16]"
              containerClassName="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Title Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center p-6 z-10">
          <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-9xl mb-6 tracking-wide drop-shadow-lg">
            {t('home.title')}
          </h1>
          <p className="text-white/90 font-sans text-sm md:text-base tracking-[0.3em] uppercase max-w-2xl leading-loose drop-shadow-md">
            {t('home.subtitle')}
          </p>
          <div className="mt-12 pointer-events-auto">
            <Link
              to={PageRoute.PHOTOGRAPHY}
              className="border border-white/80 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              {t('home.cta')}
            </Link>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl mb-8 text-stone-900 dark:text-stone-100">{t('home.introTitle')}</h2>
        <p className="font-serif text-xl text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
          {t('home.introQuote')}
        </p>
        <p className="font-sans text-sm text-stone-500 dark:text-stone-400 leading-7">
          {t('home.introText')}
        </p>
      </section>

      {/* Featured Grid Preview */}
      {/* Featured Grid Preview */}
      <section className="h-[80vh] w-full grid grid-cols-1 md:grid-cols-2">
        {/* Photography Link */}
        <Link to={PageRoute.PHOTOGRAPHY} className="relative group overflow-hidden h-full block">
          <FadeInImage src="/images/home/featured_photo.webp" className="w-full h-full object-cover transition-transform duration-700 scale-[1.16] group-hover:scale-[1.25]" alt="Photography" containerClassName="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <span className="text-white font-serif text-3xl tracking-widest border-b border-transparent group-hover:border-white pb-2 transition-all">{t('home.featuredPhoto')}</span>
          </div>
        </Link>

        {/* Shop Link */}
        <Link to={PageRoute.SHOP} className="relative group overflow-hidden h-full block">
          <FadeInImage src="/images/home/featured_commercial.webp" className="w-full h-full object-cover transition-transform duration-700 scale-[1.16] group-hover:scale-[1.25]" alt="Shop" containerClassName="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <span className="text-white font-serif text-3xl tracking-widest border-b border-transparent group-hover:border-white pb-2 transition-all">{t('home.featuredShop')}</span>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Home;