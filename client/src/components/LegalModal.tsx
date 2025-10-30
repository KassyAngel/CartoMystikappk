import { useLanguage } from '@/contexts/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mentions' | 'privacy' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { language } = useLanguage();

  if (!isOpen || !type) return null;

  const getFileName = () => {
    const lang = language === 'fr' ? '' : '-en';
    if (type === 'mentions') {
      return `/mentions-legales${lang}.html`;
    }
    return `/politique-confidentialite${lang}.html`;
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 z-[100] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-10 z-[101] bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/30 bg-purple-900/50">
          <h2 className="text-yellow-300 font-serif font-bold text-xl">
            {type === 'mentions' ? (
              language === 'fr' ? 'Mentions Légales' : 'Legal Notice'
            ) : (
              language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-purple-700/50 transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-64px)] bg-white">
          <iframe
            src={getFileName()}
            className="w-full h-full border-0"
            title={type === 'mentions' ? 'Mentions Légales' : 'Politique de Confidentialité'}
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </>
  );
}