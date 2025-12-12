import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { OracleType } from '@shared/schema';

interface TarotCardProps {
  number: number;
  isSelected?: boolean;
  isSelectable?: boolean;
  onClick?: () => void;
  className?: string;
  cardName?: string;
  oracleType?: 'tarot' | 'angels' | 'runes' | 'oracle' | 'daily';
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

  const handleClick = () => {
    if (isSelectable) {
      console.log(`Card ${number} selected`);
      onClick?.();
    }
  };

  const isBack = number === 0;

  const normalizeCardName = (name: string): string => {
    return name
      .trim()
      .replace(/[''\s-]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const getTranslatedCardName = (): string => {
    if (!cardName) return '';

    const normalized = normalizeCardName(cardName);
    const translationKey = `cards.${oracleType}.${normalized}.name`;

    console.log(`🔍 TarotCard [${language}]: "${cardName}" → key: "${translationKey}"`);

    const translated = t(translationKey);
    if (translated !== translationKey) {
      console.log(`   ✅ Trouvé: "${translated}"`);
      return translated;
    }

    console.log(`   ⚠️ Pas de traduction`);
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
        /* ✅ DOS DE LA CARTE - CORRIGÉ */
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {!imageError ? (
            <>
              {/* ✅ Image avec fallback */}
              <img 
                src="/Image/Dos-carte.jpg" 
                alt="Dos de carte"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  filter: 'contrast(1.05) saturate(1.1)'
                } as React.CSSProperties}
                loading="lazy"
                onError={() => {
                  console.error('❌ Erreur chargement image: /Image/Dos-carte.jpg');
                  setImageError(true);
                }}
              />

              {/* Overlay léger pour uniformiser */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20"></div>
            </>
          ) : (
            /* ✅ FALLBACK si l'image ne charge pas */
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)`
                }}></div>
              </div>
            </div>
          )}

          {/* Bordure dorée */}
          <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/40 pointer-events-none"></div>

          {/* Coins décoratifs */}
          <div className="absolute top-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute top-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute bottom-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute bottom-3 right-3 text-[#ffd700]/60 text-xs">✦</div>

          {/* Effet de brillance au survol */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
        </div>
      ) : (
        /* FACE DE LA CARTE (nom de la carte révélée) */
        cardName ? (
          <div className="text-center px-2">
            <span className="text-[#ffd700] font-bold text-xs sm:text-sm md:text-base leading-tight block">
              {getTranslatedCardName()}
            </span>
            <div className="text-yellow-400/50 text-[10px] mt-1">✦ ✧ ✦</div>
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