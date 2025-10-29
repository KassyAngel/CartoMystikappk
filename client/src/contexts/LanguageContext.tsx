
```typescript
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, translations } from '@/data/translations';
import { saveLanguage, getSavedLanguage } from '@/lib/userStorage';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('fr');

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    (async () => {
      const savedLang = await getSavedLanguage();
      if (savedLang) {
        setLanguageState(savedLang as Language);
      }
    })();
  }, []);

  // Sauvegarder automatiquement quand la langue change
  const setLanguage = useCallback((lang: Language) => {
    console.log('🌍 Changement de langue:', language, '→', lang);
    setLanguageState(lang);
    saveLanguage(lang);
  }, [language]);

  // Fonction de traduction optimisée avec useCallback
  const t = useCallback((key: string, params?: Record<string, any>) => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        const regex = new RegExp('\\{' + paramKey + '\\}', 'g');
        translation = translation.replace(regex, String(paramValue || ''));
      });
    }
    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

export type { Language };
```
