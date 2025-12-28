import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { OracleType } from '@shared/schema';
import { 
  getFrenchKeyFromTranslatedName, 
  getTarotFrenchKey,
  getAngelsFrenchKey,
  dailyCardImages,
  tarotCardImages,
  angelsCardImages
} from '@/lib/cardNameMapping';

interface TarotCardProps {
  number: number;
  isSelected?: boolean;
  isSelectable?: boolean;
  onClick?: () => void;
  className?: string;
  cardName?: string;
  oracleType?: 'tarot' | 'angels' | 'runes' | 'oracle' | 'daily';
}

export function getCardImagePath(cardName: string, oracleType: string, language: string = 'fr'): string | null {
  const frenchKey = cardName
    .trim()
    .replace(/[\s'''`´]/g, '');

  if (oracleType === 'daily' || oracleType === 'oracle') {
    const imageName = dailyCardImages[frenchKey];
    return imageName ? `/Image/daily/${imageName}` : null;
  }

  if (oracleType === 'tarot') {
    const imageName = tarotCardImages[frenchKey];
    return imageName ? `/Image/tarot/${imageName}` : null;
  }

  if (oracleType === 'angels') {
    const imageName = angelsCardImages[frenchKey];
    return imageName ? `/Image/oracle/${imageName}` : null;
  }

  return null;
}

export default function TarotCard({ 
  number, 
  isSelected, 
  isSelectable = true,
  onClick, 
  className,
  cardName,
  oracleType = 'tarot'
}: TarotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();

  // ✅ Plus de préchargement ici car fait en amont dans CardGame
  const isBack = number === 0;

  const handleClick = () => {
    if (isSelectable) {
      console.log(`Card ${number} selected`);
      onClick?.();
    }
  };

  const normalizeCardName = (name: string): string => {
    return name
      .trim()
      .replace(/[''\s-]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const getTranslatedCardName = (): string => {
    if (!cardName) return '';

    if (oracleType === 'daily') {
      const frenchKey = getFrenchKeyFromTranslatedName(cardName, language);
      const translationKey = `cards.daily.${frenchKey}.name`;
      const translated = t(translationKey);
      if (translated !== translationKey) return translated;
      return cardName;
    }

    if (oracleType === 'tarot') {
      const frenchKey = getTarotFrenchKey(cardName, language);
      const translationKey = `cards.tarot.${frenchKey}.name`;
      const translated = t(translationKey);
      if (translated !== translationKey) return translated;
      return cardName;
    }

    if (oracleType === 'angels') {
      const frenchKey = getAngelsFrenchKey(cardName, language);
      const translationKey = `cards.angels.${frenchKey}.name`;
      const translated = t(translationKey);
      if (translated !== translationKey) return translated;
      return cardName;
    }

    const normalized = normalizeCardName(cardName);
    const translationKey = `cards.${oracleType}.${normalized}.name`;
    const translated = t(translationKey);
    if (translated !== translationKey) return translated;
    return cardName;
  };

  return (
    <div
      className={cn(
        'w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-44 rounded-xl cursor-pointer min-h-[44px]',
        'touch-manipulation flex items-center justify-center transition-all duration-300',
        'relative overflow-hidden',
        isSelectable && 'hover:scale-105',
        isSelected && 'selected scale-105 ring-4 ring-[#ffd700] ring-offset-2 ring-offset-purple-900',
        !isSelectable && 'cursor-default opacity-50',
        !isBack && 'mystical-card',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-${number}`}
    >
      {isBack ? (
        /* DOS DE LA CARTE - Optimisé sans transition */
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {!imageError ? (
            <>
              <img 
                src="/Image/Dos-carte.jpg" 
                alt="Dos de carte"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  filter: 'contrast(1.05) saturate(1.1)'
                } as React.CSSProperties}
                loading="eager"
                onError={() => {
                  console.error('❌ Erreur chargement image: /Image/Dos-carte.jpg');
                  setImageError(true);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)`
                }}></div>
              </div>
            </div>
          )}

          <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/40 pointer-events-none"></div>
          <div className="absolute top-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute top-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute bottom-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute bottom-3 right-3 text-[#ffd700]/60 text-xs">✦</div>

          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
        </div>
      ) : (
        /* FACE DE LA CARTE */
        cardName ? (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            {(oracleType === 'daily' || oracleType === 'tarot' || oracleType === 'angels') && (() => {
              const imagePath = getCardImagePath(cardName, oracleType, language);
              return imagePath ? (
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={imagePath}
                    alt={cardName}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`❌ Image manquante: ${imagePath}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 text-center px-2 pb-2">
                    <span className="text-white font-bold text-xs sm:text-sm leading-tight block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {getTranslatedCardName()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a3470] via-[#2d1b4e] to-[#1a0f3a] rounded-xl flex items-center justify-center">
                  <span className="text-[#ffd700] font-bold text-xs sm:text-sm md:text-base leading-tight text-center px-2">
                    {getTranslatedCardName()}
                  </span>
                </div>
              );
            })()}

            {oracleType !== 'daily' && oracleType !== 'tarot' && oracleType !== 'angels' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a3470] via-[#2d1b4e] to-[#1a0f3a] rounded-xl overflow-hidden">
                <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/40 pointer-events-none"></div>
                <div className="absolute top-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute top-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute bottom-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute bottom-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute inset-0 flex items-center justify-center px-2">
                  <span className="text-[#ffd700] font-bold text-xs sm:text-sm md:text-base leading-tight text-center">
                    {getTranslatedCardName()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : number > 0 ? (
          <span className="text-center leading-tight text-sm sm:text-base md:text-lg font-bold text-[#ffd700]">
            {number}
          </span>
        ) : null
      )}
    </div>
  );
}