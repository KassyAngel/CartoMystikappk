import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from '@/components/MysticalButton';

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setIsVisible(false);
    setTimeout(onAccept, 300);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-6 max-w-lg w-full border-2 border-amber-400/50 shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100' : 'scale-90'
        }`}
      >
        {/* Icône d'avertissement */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">⚠️</div>
          <div className="text-amber-300 text-xs">✨ ✦ ✨</div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-amber-300 text-center mb-4 font-serif">
          {t('disclaimer.title')}
        </h2>

        {/* Texte du disclaimer */}
        <div className="bg-black/30 rounded-lg p-4 mb-6">
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
      </div>
    </div>
  );
}