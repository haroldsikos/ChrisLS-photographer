import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../constants/translations';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    formatCurrency: (amountPEN: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved === 'es' || saved === 'en') ? saved : 'es';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (path: string): string => {
        const keys = path.split('.');
        let current: any = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${language}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
    };

    const EXCHANGE_RATE = 3.75; // 1 USD = 3.75 PEN (approx fixed rate)

    const formatCurrency = (amountPEN: number): string => {
        if (language === 'es') {
            const usdApprox = (amountPEN / EXCHANGE_RATE).toFixed(2);
            return `S/ ${amountPEN.toFixed(2)} (~$${usdApprox})`;
        } else {
            const usdAmount = (amountPEN / EXCHANGE_RATE).toFixed(2);
            return `$${usdAmount} (~S/ ${amountPEN.toFixed(2)})`;
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
