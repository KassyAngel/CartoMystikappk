
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mentions' | 'privacy' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { language } = useLanguage();
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (!isOpen || !type) return;

    const availableLanguages = ['fr', 'en'];
    const lang = availableLanguages.includes(language) ? language : 'en';
    
    let filename = '';
    if (type === 'mentions') {
      filename = lang === 'fr' ? '/mentions-legales.html' : '/mentions-legales-en.html';
    } else {
      filename = lang === 'fr' ? '/politique-confidentialite.html' : '/politique-confidentialite-en.html';
    }

    // Charger le contenu HTML
    fetch(filename)
      .then(res => res.text())
      .then(html => setHtmlContent(html))
      .catch(err => {
        console.error('❌ Error loading HTML:', err);
        setHtmlContent('<p>Erreur de chargement</p>');
      });
  }, [isOpen, type, language]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-10 bg-white rounded-xl shadow-2xl z-[101] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-900">
          <h2 className="text-yellow-300 font-serif font-bold text-xl">
            {type === 'mentions' ? 'Mentions Légales' : 'Politique de Confidentialité'}
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
        <div 
          className="flex-1 overflow-y-auto p-4"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </>
  );
}
