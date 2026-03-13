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

  const isBack = number === 0;

  const handleClick = () => {
    if (isSelectable) {
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
        'w-full h-full',
        'rounded-xl cursor-pointer',
        'touch-manipulation flex items-center justify-center',
        'relative overflow-hidden',
        isSelectable && 'hover:scale-105 transition-transform duration-300',
        isSelected && 'selected scale-105 ring-4 ring-[#ffd700] ring-offset-2 ring-offset-purple-900',
        !isSelectable && 'cursor-default',
        !isBack && 'mystical-card',
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-${number}`}
    >
      {isBack ? (
        /* DOS DE LA CARTE */
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {!imageError ? (
            <>
              <img 
                src="/Image/Dos-carte.webp" 
                alt="Dos de carte"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(1.1)' } as React.CSSProperties}
                loading="eager"
                onError={() => {
                  console.error('❌ Erreur chargement image: /Image/Dos-carte.webp');
                  setImageError(true);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,215,0,0.1) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 70%, rgba(138,43,226,0.15) 0%, transparent 50%)`
                }} />
              </div>
            </div>
          )}

          <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/40 pointer-events-none" />
          <div className="absolute top-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute top-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute bottom-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
          <div className="absolute bottom-3 right-3 text-[#ffd700]/60 text-xs">✦</div>

          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
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

                  {/* ── Dégradé + nom de la carte ──────────────────────────────
                      CORRECTION : plus de white-space:nowrap ni text-overflow:ellipsis
                      Le nom se répartit sur 2 lignes max avec font-size adaptatif.
                      On utilise clamp() pour que les noms longs restent lisibles
                      quelle que soit la largeur de la carte.
                  ─────────────────────────────────────────────────────────── */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      /* Dégradé plus haut pour laisser de la place aux 2 lignes */
                      height: '56px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      padding: '0 5px 5px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      minHeight: '52px',
                    }}
                  >
                    <span
                      style={{
                        /* clamp : min 9px, idéal 2.2cqw (relatif au conteneur), max 12px
                           Permet aux noms longs de rétrécir automatiquement         */
                        fontSize: 'clamp(9px, 2.2cqw, 12px)',
                        fontWeight: 700,
                        color: '#ffffff',
                        textAlign: 'center',
                        lineHeight: 1.25,
                        /* Autorise le retour à la ligne mais coupe au bout de 2 lignes */
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as any,
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                        /* Ombre portée pour lisibilité sur toutes les images */
                        textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)',
                        width: '100%',
                      }}
                    >
                      {getTranslatedCardName()}
                    </span>
                  </div>
                </div>
              ) : (
                /* Pas d'image : fond dégradé + nom centré */
                <div
                  className="absolute inset-0 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #4a3470 0%, #2d1b4e 50%, #1a0f3a 100%)',
                  }}
                >
                  <span
                    style={{
                      color: '#ffd700',
                      fontWeight: 700,
                      fontSize: 'clamp(9px, 2.2cqw, 13px)',
                      lineHeight: 1.3,
                      textAlign: 'center',
                      padding: '0 8px',
                      /* 3 lignes max pour les noms très longs */
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical' as any,
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                    }}
                  >
                    {getTranslatedCardName()}
                  </span>
                </div>
              );
            })()}

            {/* Oracles autres que daily/tarot/angels */}
            {oracleType !== 'daily' && oracleType !== 'tarot' && oracleType !== 'angels' && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a3470] via-[#2d1b4e] to-[#1a0f3a] rounded-xl overflow-hidden">
                <div className="absolute inset-2 rounded-lg border-2 border-[#ffd700]/40 pointer-events-none" />
                <div className="absolute top-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute top-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute bottom-3 left-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute bottom-3 right-3 text-[#ffd700]/60 text-xs">✦</div>
                <div className="absolute inset-0 flex items-center justify-center px-3">
                  <span
                    style={{
                      color: '#ffd700',
                      fontWeight: 700,
                      fontSize: 'clamp(9px, 2.2cqw, 13px)',
                      lineHeight: 1.3,
                      textAlign: 'center',
                      /* 3 lignes max */
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical' as any,
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                    }}
                  >
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

/*
 * ═══════════════════════════════════════════════════════
 *  CORRECTIONS APPORTÉES
 *
 *  Problème : les noms longs étaient coupés avec "…" car le CSS utilisait
 *    white-space: nowrap + text-overflow: ellipsis
 *
 *  Solution :
 *  • Suppression de white-space:nowrap et text-overflow:ellipsis
 *  • Utilisation de -webkit-line-clamp: 2 (face avec image)
 *    ou -webkit-line-clamp: 3 (face sans image / autres oracles)
 *    → le nom se répartit proprement sur 2 ou 3 lignes maximum
 *  • font-size en clamp(9px, 2.2cqw, 12px) : adaptatif à la largeur
 *    de la carte, donc les très longs noms rétrécissent naturellement
 *  • word-break: break-word : évite tout débordement horizontal
 *  • Dégradé bas légèrement plus haut (56px → 56px) pour héberger 2 lignes
 *  • textShadow renforcé pour lisibilité sur images claires
 * ═══════════════════════════════════════════════════════
 */