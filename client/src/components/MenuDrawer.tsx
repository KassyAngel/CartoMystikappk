import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Browser } from '@capacitor/browser'; // ✅ Ajouté

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGrimoire: () => void;
  onOpenPremium: () => void;
  isPremium: boolean;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

export default function MenuDrawer({ isOpen, onClose, onOpenGrimoire, onOpenPremium, isPremium }: MenuDrawerProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentLanguage = languages.find(l => l.code === language);

  // ✅ Fonctions pour ouvrir les pages légales via Capacitor Browser
  const openLegalMentions = async () => {
    onClose();

    // Si la langue a un fichier dédié, sinon utilise l'anglais
    const availableLanguages = ['fr', 'en'];
    const lang = availableLanguages.includes(language) ? language : 'en';

    const url = lang === 'fr' 
      ? `${window.location.origin}/mentions-legales.html`
      : `${window.location.origin}/mentions-legales-en.html`;

    await Browser.open({ url });
  };

  const openPrivacyPolicy = async () => {
    onClose();

    // Si la langue a un fichier dédié, sinon utilise l'anglais
    const availableLanguages = ['fr', 'en'];
    const lang = availableLanguages.includes(language) ? language : 'en';

    const url = lang === 'fr' 
      ? `${window.location.origin}/politique-confidentialite.html`
      : `${window.location.origin}/politique-confidentialite-en.html`;

    await Browser.open({ url });
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900 shadow-2xl z-50 transform transition-transform duration-300 animate-slide-in-left overflow-y-auto">

        {/* Header */}
        <div className="p-6 border-b border-purple-500/30">
          <div className="flex items-center justify-between">
            <h2 className="text-yellow-300 font-serif font-bold text-2xl">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-purple-700/50 transition-colors"
              aria-label={t('common.close')}
            >
              <svg className="w-6 h-6 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu items */}
        <nav className="p-4 space-y-2">

          {/* Grimoire */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenGrimoire();
            }}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-purple-800/30 hover:bg-purple-700/50 transition-all group"
          >
            <div className="text-3xl group-hover:scale-110 transition-transform">📕</div>
            <div className="flex-1 text-left">
              <div className="text-purple-100 font-semibold">{t('grimoire.title')}</div>
              <div className="text-purple-300 text-xs">{t('grimoire.subtitle')}</div>
            </div>
          </button>

          {/* Premium */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenPremium();
            }}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-purple-800/30 hover:bg-purple-700/50 transition-all group relative overflow-hidden"
          >
            {isPremium && (
              <div className="absolute top-1 right-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ✓ {t('premium.active')}
              </div>
            )}
            <div className="text-3xl group-hover:scale-110 transition-transform">⭐</div>
            <div className="flex-1 text-left">
              <div className="text-yellow-300 font-semibold">{t('premium.title')}</div>
              <div className="text-purple-300 text-xs">{t('premium.subtitle')}</div>
            </div>
          </button>

          {/* Langue - Section déroulante */}
          <div className="pt-4 border-t border-purple-500/30">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLanguageOpen(!isLanguageOpen);
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-purple-800/30 hover:bg-purple-700/50 transition-all group"
            >
              <Globe className="w-6 h-6 text-purple-200 group-hover:scale-110 transition-transform" />
              <div className="flex-1 text-left">
                <div className="text-purple-100 font-semibold flex items-center gap-2">
                  {currentLanguage?.flag} {currentLanguage?.name}
                </div>
                <div className="text-purple-300 text-xs">
                  {language === 'fr' && 'Changer la langue'}
                  {language === 'en' && 'Change language'}
                  {language === 'es' && 'Cambiar idioma'}
                  {language === 'de' && 'Sprache ändern'}
                  {language === 'it' && 'Cambia lingua'}
                </div>
              </div>
              {isLanguageOpen ? (
                <ChevronUp className="w-5 h-5 text-purple-300" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-300" />
              )}
            </button>

            {/* Liste des langues (déroulante) */}
            {isLanguageOpen && (
              <div className="mt-2 space-y-1 pl-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLanguage(lang.code);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      language === lang.code
                        ? 'bg-purple-700/50 text-yellow-300'
                        : 'hover:bg-purple-700/30 text-purple-200'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <span className="ml-auto text-yellow-300">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Pages légales via Capacitor Browser */}
          <div className="pt-4 border-t border-purple-500/30 space-y-1">
            <button
              onClick={openLegalMentions}
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-purple-700/30 transition-colors text-purple-200 text-sm"
            >
              <span>📜</span>
              <span>{t('legal.mentions')}</span>
            </button>

            <button
              onClick={openPrivacyPolicy}
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-purple-700/30 transition-colors text-purple-200 text-sm"
            >
              <span>🔒</span>
              <span>{t('legal.privacy')}</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/30 mt-4">
          <p className="text-purple-300 text-xs text-center">
            CartoMystik v1.0
          </p>
        </div>
      </div>
    </>
  );
}
