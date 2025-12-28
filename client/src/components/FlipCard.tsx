import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { OracleCard } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCardImagePath } from './TarotCard';
import { getFrenchKeyFromTranslatedName, getTarotFrenchKey, getAngelsFrenchKey } from '@/lib/cardNameMapping';

interface FlipCardProps {
  card: OracleCard;
  position: string;
  oracleType: string;
  isFlipped?: boolean;
  onFlip?: () => void;
  className?: string;
  noAnimation?: boolean;
  hidePosition?: boolean;
  showPositionAbove?: boolean;
}

export default function FlipCard({ 
  card, 
  position, 
  oracleType,
  isFlipped = false, 
  onFlip, 
  className,
  noAnimation = false,
  hidePosition = false,
  showPositionAbove = false
}: FlipCardProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t, language } = useLanguage();

  // ✅ Récupérer l'image avec le mapping
  const cardImagePath = (oracleType === 'daily' || oracleType === 'oracle' || oracleType === 'tarot' || oracleType === 'angels') 
    ? getCardImagePath(card.name, oracleType, language) 
    : null;

  useEffect(() => {
    if (isFlipped && noAnimation) {
      setIsInitialRender(false);
    } else {
      const timer = setTimeout(() => {
        setIsInitialRender(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isFlipped, noAnimation]);

  // ✅ Précharger l'image dès que la carte est retournée
  useEffect(() => {
    if (isFlipped && cardImagePath && !imageLoaded && !imageError) {
      const img = new Image();
      img.src = cardImagePath;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [isFlipped, cardImagePath, imageLoaded, imageError]);

  const getOracleCategory = () => {
    if (oracleType === 'runes') return 'runes';
    if (oracleType === 'tarot') return 'tarot';
    if (oracleType === 'angels') return 'angels';
    if (oracleType === 'daily' || oracleType === 'oracle') return 'daily';
    return 'daily';
  };

  const getTranslatedCardName = () => {
    const category = getOracleCategory();

    // ✅ Pour daily, utiliser le mapping daily
    if (category === 'daily') {
      const frenchKey = getFrenchKeyFromTranslatedName(card.name, language);
      const translationKey = `cards.daily.${frenchKey}.name`;

      const translated = t(translationKey);

      if (translated !== translationKey) {
        return translated;
      }

      return card.name;
    }

    // ✅ Pour tarot, utiliser le mapping tarot
    if (category === 'tarot') {
      const frenchKey = getTarotFrenchKey(card.name, language);
      const translationKey = `cards.tarot.${frenchKey}.name`;

      const translated = t(translationKey);

      if (translated !== translationKey) {
        return translated;
      }

      return card.name;
    }

    // ✅ Pour angels, utiliser le mapping angels
    if (category === 'angels') {
      const frenchKey = getAngelsFrenchKey(card.name, language);
      const translationKey = `cards.angels.${frenchKey}.name`;

      const translated = t(translationKey);

      if (translated !== translationKey) {
        return translated;
      }

      return card.name;
    }

    // Pour les autres types, normaliser le nom
    const cardKey = card.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z0-9]/g, '');

    const translationKey = `cards.${category}.${cardKey}.name`;
    const translated = t(translationKey);

    if (translated !== translationKey) {
      return translated;
    }

    return card.name;
  };

  const handleFlip = () => {
    if (!isFlipped && onFlip) {
      console.log(`Card ${card.name} flipped`);
      onFlip();

      const newSparkles = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));

      setSparkles(newSparkles);

      setTimeout(() => {
        setSparkles([]);
      }, 1000);
    }
  };

  return (
    <div className={cn('text-center', className)}>
      {/* Label de position AU-DESSUS de la carte */}
      {!hidePosition && showPositionAbove && (
        <div className="mb-2 sm:mb-3">
          <p className="text-amber-200/70 font-serif text-[10px] sm:text-xs tracking-widest uppercase">
            {position}
          </p>
        </div>
      )}

      {/* CARTE - GRANDES DIMENSIONS */}
      <div className="flip-card w-full aspect-[2/3] perspective-1000 mx-auto relative">
        <div 
          className={cn(
            'flip-card-inner relative w-full h-full text-center transform-preserve-3d',
            !isInitialRender && 'transition-transform duration-700',
            isFlipped ? 'rotate-y-180 pointer-events-none' : 'cursor-pointer'
          )}
          onClick={handleFlip}
          data-testid={`flip-card-${position.toLowerCase()}`}
        >
          {/* DOS DE LA CARTE */}
          <div className={cn(
            "flip-card-front absolute w-full h-full backface-hidden rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shadow-xl",
            isFlipped && "pointer-events-none"
          )}>
            <img
              src="/image/Tarot/verso-cartes.jpg"
              alt="Dos de carte"
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 mystical-card rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-purple-900/30">
              <span className="text-[9px] sm:text-xs italic font-light tracking-wide text-white/60 px-2">
                {t('revelation.flipCard.reveal')}
              </span>
            </div>
          </div>

          {/* FACE DE LA CARTE - DESIGN ÉPURÉ */}
          <div className={cn(
            "flip-card-back absolute w-full h-full backface-hidden rounded-xl sm:rounded-2xl rotate-y-180 overflow-hidden shadow-xl",
            "bg-gradient-to-br from-[#4a3470] via-[#2d1b4e] to-[#1a0f3a]",
            "flex flex-col items-center justify-center p-4 sm:p-5 md:p-6",
            isFlipped && "mystical-card-flipped"
          )}>
            {/* ✅ IMAGE DE FOND pour daily, tarot et angels - PRÉCHARGÉE */}
            {cardImagePath && !imageError && (
              <>
                <img 
                  src={cardImagePath}
                  alt={card.name}
                  className={`absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    console.error(`❌ Image manquante: ${cardImagePath}`);
                    setImageError(true);
                  }}
                />
                {/* Overlay pour le texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </>
            )}

            {/* Cadre doré élégant */}
            <div className="absolute inset-3 sm:inset-4 rounded-lg sm:rounded-xl border-2 sm:border-[3px] border-amber-400/60 pointer-events-none">
              {/* Coins décoratifs raffinés */}
              <div className="absolute -top-0.5 -left-0.5 w-5 h-5 sm:w-6 sm:h-6">
                <div className="absolute top-0 left-0 w-4 sm:w-5 h-0.5 bg-gradient-to-r from-amber-300 to-transparent"></div>
                <div className="absolute top-0 left-0 w-0.5 h-4 sm:h-5 bg-gradient-to-b from-amber-300 to-transparent"></div>
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6">
                <div className="absolute top-0 right-0 w-4 sm:w-5 h-0.5 bg-gradient-to-l from-amber-300 to-transparent"></div>
                <div className="absolute top-0 right-0 w-0.5 h-4 sm:h-5 bg-gradient-to-b from-amber-300 to-transparent"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>
              <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 sm:w-6 sm:h-6">
                <div className="absolute bottom-0 left-0 w-4 sm:w-5 h-0.5 bg-gradient-to-r from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-4 sm:h-5 bg-gradient-to-t from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6">
                <div className="absolute bottom-0 right-0 w-4 sm:w-5 h-0.5 bg-gradient-to-l from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-4 sm:h-5 bg-gradient-to-t from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
              </div>

              {/* Étoiles subtiles */}
              <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 text-amber-300/40 text-[9px] sm:text-xs">✦</div>
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 text-amber-300/40 text-[9px] sm:text-xs">✦</div>
              <div className="absolute bottom-2 sm:bottom-2.5 left-2 sm:left-2.5 text-amber-300/40 text-[9px] sm:text-xs">✦</div>
              <div className="absolute bottom-2 sm:bottom-2.5 right-2 sm:right-2.5 text-amber-300/40 text-[9px] sm:text-xs">✦</div>
            </div>

            {/* NOM DE LA CARTE - TRÈS LISIBLE */}
            <div className="relative z-10 text-center flex items-center justify-center h-full px-3 sm:px-4">
              <h3 className="text-amber-50 text-sm sm:text-lg md:text-xl lg:text-2xl font-serif leading-tight text-center break-words hyphens-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {getTranslatedCardName()}
              </h3>
            </div>

            {/* Dégradé lumineux subtil (seulement si pas d'image) */}
            {!cardImagePath && (
              <div className="absolute inset-0 bg-gradient-radial from-amber-400/8 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-2xl"></div>
            )}
          </div>
        </div>

        {/* Sparkle effects */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#ffd700] rounded-full pointer-events-none animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
          />
        ))}
      </div>

      {/* Label de position EN DESSOUS (old style) */}
      {!hidePosition && !showPositionAbove && (
        <div className="text-[#ffd700] text-xs sm:text-sm md:text-base font-bold mt-2 sm:mt-3 font-serif text-shadow-glow">
          {position}
        </div>
      )}
    </div>
  );
}