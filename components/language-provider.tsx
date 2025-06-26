'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, locales } from '@/lib/shared-i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dict, setDict] = useState<any>({});

  const setLocale = (newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    }
  };

  useEffect(() => {
    // Load dictionary for current locale
    const loadDictionary = async () => {
      try {
        const module = await import(`@/dictionaries/${locale}.json`);
        setDict(module.default);
      } catch (error) {
        console.warn(`Failed to load dictionary for ${locale}, using default`);
        const fallback = await import(`@/dictionaries/${defaultLocale}.json`);
        setDict(fallback.default);
      }
    };

    loadDictionary();
  }, [locale]);

  useEffect(() => {
    // Get locale from cookie on mount
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale;
    
    if (cookieLocale && locales.includes(cookieLocale)) {
      setLocaleState(cookieLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}