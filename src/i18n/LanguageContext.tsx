import React, { useEffect, useState, createContext, useContext } from 'react';
import { translations, Language, TranslationKeys } from './translations';
interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: TranslationKeys;
}
const LanguageContext = createContext<LanguageContextValue | null>(null);
export function LanguageProvider({ children }: {children: ReactNode;}) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem('canal-mandji-lang');
    if (stored === 'en' || stored === 'fr') return stored;
    return navigator.language?.startsWith('fr') ? 'fr' : 'en';
  });
  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('canal-mandji-lang', l);
    } catch {}
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang]
      }}>
      
      {children}
    </LanguageContext.Provider>);

}
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
  throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}