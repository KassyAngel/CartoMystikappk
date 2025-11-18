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

  // ✅ NORMALISATION COMPATIBLE AVEC TES CLÉS DE TRADUCTION
  const normalizeCardName = (name: string): string => {
    // Garder le format exact : supprimer juste apostrophes et tirets
    return name
      .trim()
      .replace(/['']/g, '')           // Supprimer apostrophes
      .replace(/-/g, '')              // Supprimer tirets
      .replace(/\s+/g, '');           // Supprimer espaces → "LacherPrise", "NouveauDepart"
  };

  // ✅ TRADUCTION AVEC PLUSIEURS FORMATS
  const getTranslatedCardName = (): string => {
    if (!cardName) return '';

    // Format normalisé pour les clés
    const normalized = normalizeCardName(cardName);

    console.log(`🃏 TarotCard [${language}]: "${cardName}" → normalized: "${normalized}"`);
    console.log(`   Oracle type: ${oracleType}`);

    // ✅ ESSAYER DIFFÉRENTS FORMATS DE CLÉS
    const possibleKeys = [
      // Format exact comme dans ton fichier de traduction
      `cards.${oracleType}.${normalized}.name`,           // Ex: cards.daily.Guidance.name

      // Formats alternatifs au cas où
      `cards.${oracleType}.${cardName}.name`,             // Nom original
      `cards.${oracleType}.${normalized}`,                // Sans .name
      `oracle.${oracleType}.cards.${normalized}.name`,    // Format alternatif
      `dailyReading.cards.${normalized}`,                 // Pour tirage du jour
    ];

    // Essayer chaque format
    for (const key of possibleKeys) {
      const translated = t(key);

      // Si la traduction existe (ne retourne pas la clé elle-même)
      if (translated && translated !== key) {
        console.log(`   ✅ Trouvé avec clé: "${key}" → "${translated}"`);
        return translated;
      }
    }

    // ⚠️ Aucune traduction trouvée : afficher l'original
    console.log(`   ⚠️ Aucune traduction trouvée pour les clés testées`);
    console.log(`   📌 Clés testées:`, possibleKeys);
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
        /* ✨ DOS DE LA CARTE - VERSION PROFESSIONNELLE ✨ */
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
          {/* Effet galaxie de fond */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[20%] left-[30%] w-16 h-16 bg-blue-500/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[30%] right-[25%] w-20 h-20 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Petites étoiles scintillantes */}
          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
            <div className="absolute top-[40%] right-[15%] w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-[25%] left-[15%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-[60%] left-[70%] w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-[80%] right-[40%] w-0.5 h-0.5 bg-yellow-200/80 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute top-[30%] left-[50%] w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
          </div>

          {/* Bordure dorée intérieure */}
          <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/30"></div>

          {/* Symbole central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Lueur derrière le symbole */}
              <div className="absolute inset-0 blur-xl bg-[#ffd700]/20 scale-150"></div>

              {/* Symbole mystique */}
              <div className="relative text-4xl sm:text-5xl text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] font-serif">
                ☽
              </div>
            </div>
          </div>

          {/* Coins ornementés */}
          <div className="absolute top-3 left-3 text-[#ffd700]/40 text-xs">✦</div>
          <div className="absolute top-3 right-3 text-[#ffd700]/40 text-xs">✦</div>
          <div className="absolute bottom-3 left-3 text-[#ffd700]/40 text-xs">✦</div>
          <div className="absolute bottom-3 right-3 text-[#ffd700]/40 text-xs">✦</div>

          {/* Effet de brillance au hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
          )}
        </div>
      ) : (
        /* ✅ FACE AVEC NOM TRADUIT CORRECTEMENT */
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