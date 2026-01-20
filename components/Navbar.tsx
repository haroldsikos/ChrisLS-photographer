import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Mail, Moon, Sun, Facebook } from 'lucide-react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  // Local language state removed in favor of Context

  const location = useLocation();
  const isHome = location.pathname === PageRoute.HOME;
  const isTransparentWithDarkBg = isHome && !scrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme with document class and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: t('nav.photography'), path: PageRoute.PHOTOGRAPHY },
    { label: t('nav.shop'), path: PageRoute.SHOP },
    { label: t('nav.about'), path: PageRoute.ABOUT },
    { label: t('nav.contact'), path: PageRoute.CONTACT },
    { label: t('nav.support'), path: PageRoute.TIPS },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-stone-50/95 dark:bg-customDark/95 backdrop-blur-sm shadow-sm py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        {/* Logo */}
        <Link
          to={PageRoute.HOME}
          className={`flex items-center gap-3 text-2xl font-serif tracking-widest font-semibold uppercase z-[101] relative transition-colors duration-300 ${isTransparentWithDarkBg ? 'text-white' : 'text-stone-900 dark:text-stone-100'
            }`}
        >
          <img
            src="/images/about/Logo_CrisLS.webp"
            alt="Logo Cris L.S"
            className={`w-10 h-10 object-contain transition-all duration-300 ${!isTransparentWithDarkBg ? 'invert dark:invert-0' : ''}`}
          />
          Cris L.S
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-[0.2em] transition-colors ${location.pathname === link.path
                ? `font-medium border-b pb-1 ${isTransparentWithDarkBg
                  ? 'text-white border-white'
                  : 'text-stone-900 dark:text-stone-100 border-stone-800 dark:border-stone-100'
                }`
                : `${isTransparentWithDarkBg
                  ? 'text-white/80 hover:text-white'
                  : 'text-stone-800 dark:text-stone-300 hover:text-stone-500 dark:hover:text-stone-100'
                }`
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Toggle Desktop */}
          <button
            onClick={() => setLanguage(prev => prev === 'es' ? 'en' : 'es')}
            className={`flex items-center text-xs tracking-widest font-sans ml-2 transition-colors ${isTransparentWithDarkBg
              ? 'text-white/90 hover:text-white'
              : 'text-stone-800 dark:text-stone-300 hover:text-stone-500 dark:hover:text-white'
              }`}
            title="Cambiar Idioma"
          >
            <span className={`transition-opacity ${language === 'es' ? 'font-bold' : 'opacity-60'}`}>ES</span>
            <span className="mx-1 opacity-40">|</span>
            <span className={`transition-opacity ${language === 'en' ? 'font-bold' : 'opacity-60'}`}>EN</span>
          </button>

          {/* Theme Toggle Desktop */}
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors ${isTransparentWithDarkBg
              ? 'text-white/90 hover:text-white'
              : 'text-stone-800 dark:text-stone-300 hover:text-stone-500 dark:hover:text-white'
              }`}
            title={isDark ? t('nav.toggleThemeLight') : t('nav.toggleTheme')}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Controls Container (Menu Button Only) */}
        <div className="md:hidden flex items-center gap-4 z-[101] relative">
          {/* Mobile Menu Button - Animating Hamburger/X */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-10 h-10 focus:outline-none flex items-center justify-center transition-colors ${isTransparentWithDarkBg
              ? 'text-white'
              : 'text-stone-900 dark:text-stone-100'
              }`}
            aria-label="Toggle Menu"
          >
            <div className="absolute transition-all duration-500 ease-in-out transform origin-center"
              style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'rotate(180deg) scale(0.5)' : 'rotate(0deg) scale(1)' }}>
              <Menu size={32} strokeWidth={1.5} />
            </div>
            <div className="absolute transition-all duration-500 ease-in-out transform origin-center"
              style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.5)' }}>
              <X size={32} strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Pure Fade, Full Screen Coverage */}
      <div className={`fixed inset-0 h-[100dvh] w-full bg-stone-50/95 dark:bg-customDark/95 backdrop-blur-sm z-[100] transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center items-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>

        {/* Navigation Links - Centered, Fade Only */}
        <div className="flex flex-col space-y-8 text-center items-center pt-12">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`text-lg font-serif tracking-[0.2em] transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
                } ${location.pathname === link.path
                  ? 'text-stone-900 dark:text-stone-50 underline underline-offset-8'
                  : 'text-stone-800 dark:text-stone-300 hover:text-stone-500 dark:hover:text-stone-100'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom Footer in Menu - Centered, Fade Only */}
        <div className={`mt-12 flex flex-col items-center space-y-8 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>

          <div className="flex flex-row items-center justify-center gap-6 w-full px-6">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className={`absolute transition-all duration-500 ease-in-out transform ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                  <Sun size={20} />
                </div>
                <div className={`absolute transition-all duration-500 ease-in-out transform ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                  <Moon size={20} />
                </div>
              </div>
              <span className="text-xs uppercase tracking-widest font-sans text-center">
                {isDark ? t('nav.toggleThemeLight') : t('nav.toggleTheme')}
              </span>
            </button>

            {/* Mobile Language Toggle */}
            <button
              onClick={() => setLanguage(prev => prev === 'es' ? 'en' : 'es')}
              className="text-stone-800 dark:text-stone-200 hover:text-stone-500 dark:hover:text-white transition-colors"
            >
              <span className="text-sm tracking-[0.2em] font-serif border border-stone-300 dark:border-stone-700 rounded-full px-5 py-2 flex items-center gap-2">
                <span className={language === 'es' ? 'font-bold' : 'opacity-50'}>ES</span>
                <span className="opacity-30">|</span>
                <span className={language === 'en' ? 'font-bold' : 'opacity-50'}>EN</span>
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <p className="text-stone-400 text-xs tracking-widest uppercase font-sans">{t('footer.contact')}</p>
            <div className="flex space-x-6 text-stone-900 dark:text-stone-200">
              {/* Facebook */}
              <a href="https://www.facebook.com/share/18DusMowtr/" target="_blank" rel="noopener noreferrer" className="p-2 border border-stone-200 dark:border-stone-700 rounded-full hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all duration-300">
                <Facebook size={24} strokeWidth={1.5} />
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/cris_l_._s" target="_blank" rel="noopener noreferrer" className="p-2 border border-stone-200 dark:border-stone-700 rounded-full hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all duration-300">
                <Instagram size={24} strokeWidth={1.5} />
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@cris.lsfotografo?_r=1&_t=ZS-93D8QM0tokU" target="_blank" rel="noopener noreferrer" className="p-2 border border-stone-200 dark:border-stone-700 rounded-full hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>

              {/* Mail */}
              <a href="mailto:Warcristian01@gmail.com" className="p-2 border border-stone-200 dark:border-stone-700 rounded-full hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all duration-300">
                <Mail size={24} strokeWidth={1.5} />
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/51972772288" target="_blank" rel="noopener noreferrer" className="p-2 border border-stone-200 dark:border-stone-700 rounded-full hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.224-.579.73-.71.88-.131.149-.262.168-.486.056-.224-.112-.95-.35-1.809-1.116-.674-.6-1.13-1.343-1.263-1.569-.131-.224-.014-.345.098-.458.101-.101.224-.263.336-.395.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.429-.006-.15 0-.393.056-.6.28-.206.225-.787.769-.787 1.876 0 1.106.806 2.174.919 2.325.113.15 1.587 2.423 3.845 3.398.537.232.956.371 1.28.474.537.171 1.025.147 1.409.089.423-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.149-.43-.262" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;