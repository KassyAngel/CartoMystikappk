import { useState, useEffect } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import MysticalButton from '@/components/MysticalButton';

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setIsVisible(false);
    setTimeout(onAccept, 300);
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageSelector(false);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-6 max-w-lg w-full border-2 border-amber-400/50 shadow-2xl transform transition-all duration-300 relative ${
          isVisible ? 'scale-100' : 'scale-90'
        }`}
      >
        {/* 🌍 Bouton changement de langue en haut à droite */}
        <button
          onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-700/50 hover:bg-purple-600/70 text-purple-100 text-sm transition-colors border border-purple-500/30"
        >
          <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
          <span className="hidden sm:inline">{languages.find(l => l.code === language)?.name}</span>
          <span className="text-xs">▼</span>
        </button>

        {/* 🌍 Menu déroulant des langues */}
        {showLanguageSelector && (
          <div className="absolute top-16 right-4 bg-purple-800 rounded-lg shadow-2xl border border-purple-500/50 overflow-hidden z-10 min-w-[160px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                  language === lang.code
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-purple-800 text-purple-100 hover:bg-purple-700'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {language === lang.code && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        )}

        {/* Icône d'avertissement */}
        <div className="text-center mb-4 mt-8">
          <div className="text-6xl mb-2 animate-pulse">⚠️</div>
          <div className="text-amber-300 text-xs">✨ ✦ ✨</div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-amber-300 text-center mb-4 font-serif">
          {t('disclaimer.title')}
        </h2>

        {/* Texte du disclaimer */}
        <div className="bg-black/30 rounded-lg p-4 mb-6 max-h-[40vh] overflow-y-auto">
          <p className="text-purple-100 text-sm leading-relaxed text-center">
            {t('disclaimer.text')}
          </p>
        </div>

        {/* Note supplémentaire */}
        <p className="text-amber-400 text-xs text-center mb-6 italic font-semibold">
          ✦ {t('disclaimer.note')} ✦
        </p>

        {/* Bouton J'ai compris */}
        <MysticalButton 
          variant="primary" 
          onClick={handleAccept} 
          className="w-full"
        >
          ✓ {t('disclaimer.accept')}
        </MysticalButton>

        {/* Info supplémentaire */}
        <p className="text-purple-300 text-xs text-center mt-4">
          {t('disclaimer.legal')}
        </p>
      </div>
    </div>
  );
}