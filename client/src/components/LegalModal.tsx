
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
        // Créer un parser DOM temporaire
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extraire uniquement le contenu du body (sans les styles)
        const bodyContent = doc.querySelector('body');
        
        if (bodyContent) {
          // Supprimer le bouton "Retour" qui n'a plus de sens dans le modal
          const backBtn = bodyContent.querySelector('.back-btn');
          if (backBtn) backBtn.remove();
          
          // Supprimer le footer s'il existe
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
          className="flex-1 overflow-y-auto p-6 prose prose-sm max-w-none"
          style={{
            color: '#1f2937',
            fontSize: '15px',
            lineHeight: '1.6'
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            .prose h1 {
              color: #7c3aed;
              font-size: 1.875rem;
              font-weight: 700;
              margin-bottom: 1rem;
              border-bottom: 2px solid #e9d5ff;
              padding-bottom: 0.5rem;
            }
            .prose h2 {
              color: #6d28d9;
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            .prose h3 {
              color: #7c3aed;
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1rem;
              margin-bottom: 0.5rem;
            }
            .prose p {
              margin-bottom: 0.75rem;
              color: #374151;
            }
            .prose ul, .prose ol {
              margin-left: 1.5rem;
              margin-bottom: 1rem;
            }
            .prose li {
              margin-bottom: 0.5rem;
              color: #4b5563;
            }
            .prose a {
              color: #7c3aed;
              text-decoration: underline;
            }
            .prose a:hover {
              color: #6d28d9;
            }
            .prose strong {
              color: #1f2937;
              font-weight: 600;
            }
            .prose .info-box, .prose .rights-list {
              background: rgba(168, 85, 247, 0.1);
              border-left: 4px solid #a855f7;
              padding: 1rem;
              margin: 1rem 0;
              border-radius: 0.5rem;
            }
            .prose table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
            }
            .prose th, .prose td {
              border: 1px solid #e5e7eb;
              padding: 0.75rem;
              text-align: left;
            }
            .prose th {
              background: rgba(168, 85, 247, 0.1);
              font-weight: 600;
              color: #6d28d9;
            }
            .prose .date {
              color: #9ca3af;
              font-size: 0.875rem;
              margin-bottom: 1.5rem;
            }
          `}} />
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </>
  );
}
