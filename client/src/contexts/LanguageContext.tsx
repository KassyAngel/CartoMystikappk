import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language } from '@/data/translations'; // Garde le type unique
import { translations as generalTranslations } from '@/data/translations';
import { translations as horoscopeTranslations } from '@/data/translationHoroscope';
import { saveLanguage, getSavedLanguage } from '@/lib/userStorage';
import { scheduleNotificationWithLanguage } from '@/components/NotificationPermissionModal';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    (async () => {
      const savedLang = await getSavedLanguage();
      if (savedLang) {
        console.log('🌍 Langue chargée depuis storage:', savedLang);
        setLanguageState(savedLang as Language);
      } else {
        console.log('🌍 Aucune langue sauvegardée, utilisation du français par défaut');
      }
      setIsLanguageLoaded(true);
    })();
  }, []);

  // Sauvegarder automatiquement quand la langue change
  const setLanguage = useCallback((lang: Language) => {
    console.log('🌍 Changement de langue:', language, '→', lang);
    setLanguageState(lang);
    saveLanguage(lang);
  }, [language]);

  // Fonction de traduction optimisée
  const t = useCallback((key: string, params?: Record<string, any>) => {
    // Priorité : horoscopeTranslations puis generalTranslations
    let translation =
      horoscopeTranslations[language][key] ||
      generalTranslations[language][key] ||
      key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        const regex = new RegExp(`\\{${paramKey}\\}`, 'g');
        translation = translation.replace(regex, String(paramValue || ''));
      });
    }
    return translation;
  }, [language]);

  // Recréer les notifications si la langue change
  useEffect(() => {
    if (!isLanguageLoaded) return;

    const permission = localStorage.getItem('notificationPermission');
    if (permission === 'granted') {
      const savedLanguage = localStorage.getItem('notificationLanguage');
      if (savedLanguage !== language) {
        console.log('🔄 Langue changée, mise à jour des notifications:', language);
        scheduleNotificationWithLanguage(t);
      }
    }
  }, [language, t, isLanguageLoaded]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLanguageLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

export type { Language };
