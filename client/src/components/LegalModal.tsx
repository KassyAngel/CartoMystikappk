
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
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extraire le contenu du body
        const bodyContent = doc.querySelector('body');
        
        if (bodyContent) {
          // Supprimer les éléments inutiles
          const backBtn = bodyContent.querySelector('.back-btn');
          if (backBtn) backBtn.remove();
          
          const footer = bodyContent.querySelector('footer');
          if (footer) footer.remove();
          
          setHtmlContent(bodyContent.innerHTML);
        } else {
          setHtmlContent('<p>Contenu non disponible</p>');
        }
      })
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-10 bg-white rounded-xl shadow-2xl z-[201] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-900 to-purple-800 flex-shrink-0">
          <h2 className="text-yellow-300 font-serif font-bold text-lg md:text-2xl">
            {type === 'mentions' ? 'Mentions Légales' : 'Politique de Confidentialité'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-purple-700/50 transition-colors flex-shrink-0"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-purple-50 to-white">
          <style dangerouslySetInnerHTML={{ __html: `
            .legal-content {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              color: #1f2937;
              line-height: 1.7;
            }
            .legal-content h1 {
              color: #7c3aed;
              font-size: 1.75rem;
              font-weight: 700;
              margin-bottom: 1rem;
              padding-bottom: 0.75rem;
              border-bottom: 3px solid #e9d5ff;
            }
            .legal-content h2 {
              color: #6d28d9;
              font-size: 1.35rem;
              font-weight: 600;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .legal-content h3 {
              color: #7c3aed;
              font-size: 1.15rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            .legal-content p {
              margin-bottom: 1rem;
              color: #374151;
              font-size: 0.95rem;
            }
            .legal-content ul, .legal-content ol {
              margin-left: 1.5rem;
              margin-bottom: 1rem;
              padding-left: 0.5rem;
            }
            .legal-content li {
              margin-bottom: 0.5rem;
              color: #4b5563;
              font-size: 0.95rem;
            }
            .legal-content a {
              color: #7c3aed;
              text-decoration: underline;
              word-break: break-all;
            }
            .legal-content a:hover {
              color: #6d28d9;
            }
            .legal-content strong {
              color: #1f2937;
              font-weight: 600;
            }
            .legal-content .info-box, 
            .legal-content .rights-list,
            .legal-content .contact-info,
            .legal-content .editor-info {
              background: rgba(168, 85, 247, 0.08);
              border-left: 4px solid #a855f7;
              padding: 1rem;
              margin: 1rem 0;
              border-radius: 0.5rem;
            }
            .legal-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
              font-size: 0.9rem;
            }
            .legal-content th, 
            .legal-content td {
              border: 1px solid #e5e7eb;
              padding: 0.75rem;
              text-align: left;
            }
            .legal-content th {
              background: rgba(168, 85, 247, 0.1);
              font-weight: 600;
              color: #6d28d9;
            }
            .legal-content .date {
              color: #9ca3af;
              font-size: 0.85rem;
              margin-bottom: 1.5rem;
              font-style: italic;
            }
            .legal-content .container {
              max-width: none;
            }
            
            @media (max-width: 768px) {
              .legal-content h1 { font-size: 1.5rem; }
              .legal-content h2 { font-size: 1.2rem; }
              .legal-content h3 { font-size: 1.05rem; }
              .legal-content p,
              .legal-content li { font-size: 0.9rem; }
            }
          `}} />
          <div className="legal-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </>
  );
}
