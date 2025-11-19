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

  // ✅ NORMALISATION EXACTE POUR TES CLÉS (garde les majuscules !)
  const normalizeCardName = (name: string): string => {
    return name
      .trim()
      .replace(/[''\s-]/g, '');  // Supprimer apostrophes, espaces, tirets
    // ❌ PAS de .toLowerCase() car tes clés ont des majuscules !
  };

  // ✅ TRADUCTION
  const getTranslatedCardName = (): string => {
    if (!cardName) return '';

    const normalized = normalizeCardName(cardName);

    console.log(`🔍 TarotCard [${language}]: "${cardName}" → "${normalized}"`);

    const possibleKeys = [
      `cards.${oracleType}.${normalized}.name`,
      `cards.${oracleType}.${cardName}.name`,
      `oracle.${oracleType}.${normalized}.name`,
      `${oracleType}.cards.${normalized}.name`,
    ];

    for (const key of possibleKeys) {
      const translated = t(key);
      if (translated !== key) {
        console.log(`   ✅ "${key}" → "${translated}"`);
        return translated;
      }
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[20%] left-[30%] w-16 h-16 bg-blue-500/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[30%] right-[25%] w-20 h-20 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
            <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-[25%] left-[15%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-[60%] left-[70%] w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-[80%] right-[40%] w-0.5 h-0.5 bg-yellow-200/80 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-[30%] left-[50%] w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
          </div>

          <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/30"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[#ffd700]/20 scale-150"></div>
              <div className="relative text-4xl sm:text-5xl text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] font-serif">
                ☽
              </div>
            </div>
          </div>

          <div className="absolute top-3 left-3 text-[#ffd700]/40 text-xs">✦</div>
          <div className="absolute top-3 right-3 text-[#ffd700]/40 text-xs">✦</div>
          <div className="absolute bottom-3 left-3 text-[#ffd700]/40 text-xs">✦</div>
          <div className="absolute bottom-3 right-3 text-[#ffd700]/40 text-xs">✦</div>

          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
          )}
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