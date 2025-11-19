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
  oracleType?: OracleType | 'oracle';
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
  const { t, language } = useLanguage();

  const handleClick = () => {
    if (isSelectable) {
      console.log(`Card ${number} selected`);
      onClick?.();
    }
  };

  const isBack = number === 0;

  // — MODIFICATION : même normalisation que dans CardGame
  const normalizeCardName = (name: string): string => {
    return name
      .trim()
      .replace(/['\s]/g, '')                  // enlever espaces et apostrophes
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');       // enlever accents
  };

  const getTranslatedCardName = (): string => {
    if (!cardName) return '';

    const normalized = normalizeCardName(cardName);

    console.log(`🔍 TarotCard [${language}]: "${cardName}" → normalized: "${normalized}"`);

    const possibleKeys = [
      `cards.${oracleType}.${normalized}.name`,
      `cards.${oracleType}.${cardName}.name`,
      `oracle.${oracleType}.${normalized}.name`,
      `${oracleType}.cards.${normalized}.name`,
    ];

    for (const key of possibleKeys) {
      const translated = t(key);
      if (translated !== key) {
        console.log(`   ✅ Traduction trouvée : ${key} → ${translated}`);
        return translated;
      }
    }

    console.log(`   ⚠️ Pas de traduction trouvée pour "${cardName}", on retourne l’original`);
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
          {/* … ton code pour le dos de carte reste identique … */}
        </div>
      ) : (
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
