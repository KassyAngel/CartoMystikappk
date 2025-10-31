import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'legal' | 'privacy' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { language } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!isOpen || !type) return null;

  const getFileName = () => {
    const isNative = Capacitor.isNativePlatform();
    const platform = Capacitor.getPlatform();

    // Détection du chemin selon la plateforme
    let basePath = './';
    if (isNative) {
      if (platform === 'android') {
        basePath = 'capacitor://localhost/';
      } else if (platform === 'ios') {
        basePath = 'capacitor://localhost/';
      }
    }

    const fileName = type === 'legal' 
      ? (language === 'fr' ? 'mentions-legales.html' : 'mentions-legales-en.html')
      : (language === 'fr' ? 'politique-confidentialite.html' : 'politique-confidentialite-en.html');

    const fullPath = `${basePath}${fileName}`;
    console.log('📄 Chargement page légale:', {
      fullPath,
      isNative,
      platform,
      basePath,
      fileName,
      currentURL: window.location.href
    });

    return fullPath;
  };

  // 🔧 Nettoyage de l'iframe pour éviter les fuites mémoire
  useEffect(() => {
    return () => {
      if (iframeRef.current) {
        // Vider le contenu de l'iframe avant démontage
        iframeRef.current.src = 'about:blank';
      }
    };
  }, []);

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
            {type === 'legal' ? (
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
            ref={iframeRef}
            src={getFileName()}
            className="w-full h-full border-0"
            title={type === 'legal' ? 'Mentions Légales' : 'Politique de Confidentialité'}
            sandbox="allow-same-origin"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}