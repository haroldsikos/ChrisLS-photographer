import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import FadeInImage from '../components/FadeInImage';

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-[3/4] bg-stone-200 overflow-hidden relative">
            <FadeInImage
              src="/images/about/Christian_me.webp"
              alt="Cris L.S"
              className="w-full h-full object-cover rounded-sm shadow-xl"
              containerClassName="w-full h-full"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="font-serif text-4xl mb-2 text-stone-900 dark:text-stone-100">{t('about.title')}</h1>
          <p className="font-sans text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase mb-6">{t('about.subtitle')}</p>

          <div className="font-serif text-lg text-stone-700 dark:text-stone-300 space-y-6 leading-relaxed">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
            <p>
              {t('about.p3')}
            </p>
            <p>
              {t('about.p4')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;