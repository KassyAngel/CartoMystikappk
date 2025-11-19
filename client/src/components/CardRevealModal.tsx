import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from './MysticalButton';

interface CardRevealModalProps {
  card: any;
  oracleType: 'tarot' | 'angels' | 'runes' | 'oracle';
  onClose: () => void;
  cardNumber?: number;
  totalCards?: number;
}

export default function CardRevealModal({ 
  card, 
  oracleType, 
  onClose, 
  cardNumber = 1, 
  totalCards = 1
}: CardRevealModalProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const normalizeCardName = (name: string): string => {
    return name
      .trim()
      .replace(/[''\s-]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const getTranslatedCardName = () => {
    if (!card?.name) return '';

    const normalizedName = normalizeCardName(card.name);
    const possibleKeys = [
      `cards.${oracleType}.${normalizedName}.name`,
      `cards.${oracleType}.${card.name}.name`,
    ];

    for (const key of possibleKeys) {
      const translated = t(key);
      if (translated !== key) {
        return translated;
      }
    }

    return card.name;
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-sm transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Carte révélée en grand */}
        <div className="relative aspect-[2/3] w-full max-w-[280px] mx-auto">
          {/* Cadre de la carte */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a3470] via-[#2d1b4e] to-[#1a0f3a] rounded-2xl shadow-2xl overflow-hidden">

            {/* Bordure dorée */}
            <div className="absolute inset-4 rounded-xl border-[3px] border-amber-400/60 pointer-events-none">
              {/* Coins décoratifs */}
              <div className="absolute -top-0.5 -left-0.5 w-6 h-6">
                <div className="absolute top-0 left-0 w-5 h-0.5 bg-gradient-to-r from-amber-300 to-transparent"></div>
                <div className="absolute top-0 left-0 w-0.5 h-5 bg-gradient-to-b from-amber-300 to-transparent"></div>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-6 h-6">
                <div className="absolute top-0 right-0 w-5 h-0.5 bg-gradient-to-l from-amber-300 to-transparent"></div>
                <div className="absolute top-0 right-0 w-0.5 h-5 bg-gradient-to-b from-amber-300 to-transparent"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>
              <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6">
                <div className="absolute bottom-0 left-0 w-5 h-0.5 bg-gradient-to-r from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-5 bg-gradient-to-t from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6">
                <div className="absolute bottom-0 right-0 w-5 h-0.5 bg-gradient-to-l from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-5 bg-gradient-to-t from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>

              {/* Étoiles */}
              <div className="absolute top-2.5 left-2.5 text-amber-300/40 text-xs">✦</div>
              <div className="absolute top-2.5 right-2.5 text-amber-300/40 text-xs">✦</div>
              <div className="absolute bottom-2.5 left-2.5 text-amber-300/40 text-xs">✦</div>
              <div className="absolute bottom-2.5 right-2.5 text-amber-300/40 text-xs">✦</div>

              {/* Motif central */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-400/5 text-7xl">✦</div>
            </div>

            {/* Nom de la carte */}
            <div className="absolute inset-0 flex items-center justify-center px-8">
              <h2 className="text-amber-50 text-2xl font-serif leading-tight text-center break-words drop-shadow-[0_2px_8px_rgba(255,215,0,0.3)]">
                {getTranslatedCardName()}
              </h2>
            </div>

            {/* Gradient lumineux */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Lueur externe */}
          <div className="absolute -inset-4 bg-amber-400/20 blur-2xl rounded-full opacity-60 animate-pulse"></div>
        </div>

        {/* Indicateur de progression */}
        <div className="mt-8 text-center">
          <p className="text-amber-200/80 text-sm font-medium mb-3">
            {t('cardgame.cardRevealed')} {cardNumber} / {totalCards}
          </p>

          {/* Points indicateurs */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: totalCards }).map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < cardNumber 
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/50' 
                    : 'bg-purple-500/30'
                }`}
              />
            ))}
          </div>

          {/* Bouton continuer */}
          <MysticalButton
            variant="primary"
            onClick={onClose}
            className="min-h-[48px] px-8"
          >
            {cardNumber < totalCards ? t('cardgame.continue') : t('cardgame.seeInterpretation')}
          </MysticalButton>
        </div>
      </div>
    </div>
  );
}