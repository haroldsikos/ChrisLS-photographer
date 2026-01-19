import React from 'react';
import { Instagram, Mail, Twitter, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `transition-colors duration-200 ${isActive
      ? 'font-bold text-stone-900 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 pb-0.5'
      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
      }`;
  };

  return (
    <footer className="bg-stone-50 dark:bg-stone-900/50 py-16 border-t border-stone-200 dark:border-stone-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-8">

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/cris_l_._s" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-stone-800 dark:border-stone-400 rounded-full hover:bg-stone-800 hover:text-white dark:hover:bg-stone-200 dark:hover:text-stone-900 transition-all duration-300 group">
            <Instagram size={20} className="text-stone-800 dark:text-stone-200 group-hover:text-white dark:group-hover:text-stone-900" />
          </a>
          <a href="mailto:contact@chrisls.com" className="w-12 h-12 flex items-center justify-center border border-stone-800 dark:border-stone-400 rounded-full hover:bg-stone-800 hover:text-white dark:hover:bg-stone-200 dark:hover:text-stone-900 transition-all duration-300 group">
            <Mail size={20} className="text-stone-800 dark:text-stone-200 group-hover:text-white dark:group-hover:text-stone-900" />
          </a>
          <a href="https://wa.me/51972772288" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-stone-800 dark:border-stone-400 rounded-full hover:bg-stone-800 hover:text-white dark:hover:bg-stone-200 dark:hover:text-stone-900 transition-all duration-300 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-stone-800 dark:text-stone-200 group-hover:text-white dark:group-hover:text-stone-900 transition-colors"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.224-.579.73-.71.88-.131.149-.262.168-.486.056-.224-.112-.95-.35-1.809-1.116-.674-.6-1.13-1.343-1.263-1.569-.131-.224-.014-.345.098-.458.101-.101.224-.263.336-.395.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.429-.006-.15 0-.393.056-.6.28-.206.225-.787.769-.787 1.876 0 1.106.806 2.174.919 2.325.113.15 1.587 2.423 3.845 3.398.537.232.956.371 1.28.474.537.171 1.025.147 1.409.089.423-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.149-.43-.262" />
            </svg>
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-xs tracking-widest uppercase">
          <Link to={PageRoute.PHOTOGRAPHY} className={getLinkClass(PageRoute.PHOTOGRAPHY)}>{t('nav.photography')}</Link>
          <Link to={PageRoute.ABOUT} className={getLinkClass(PageRoute.ABOUT)}>{t('nav.about')}</Link>
          <Link to={PageRoute.TIPS} className={getLinkClass(PageRoute.TIPS)}>{t('nav.support')}</Link>
        </div>

        {/* Copyright */}
        <div className="text-stone-400 dark:text-stone-600 text-xs font-sans">
          &copy; {new Date().getFullYear()} Chris LS Photography. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;