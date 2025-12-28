import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from './MysticalButton';
import { getCardImagePath } from './TarotCard';
import { getFrenchKeyFromTranslatedName, getTarotFrenchKey, getAngelsFrenchKey } from '@/lib/cardNameMapping';

interface CardRevealModalProps {
  card: any;
  oracleType: 'tarot' | 'angels' | 'runes' | 'oracle' | 'daily' | 'horoscope';
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
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isDailyOracle = oracleType === 'oracle' || oracleType === 'daily';
  const isTarot = oracleType === 'tarot';
  const isAngels = oracleType === 'angels';

  // ✅ Récupérer l'image AVANT d'afficher avec le mapping
  const cardImagePath = (isDailyOracle || isTarot || isAngels) 
    ? getCardImagePath(card?.name, oracleType, language) 
    : null;

  useEffect(() => {
    // Si pas d'image, afficher direct
    if (!cardImagePath) {
      setTimeout(() => setIsVisible(true), 50);
      return;
    }

    // Précharger l'image AVANT d'afficher le modal
    const img = new Image();
    img.src = cardImagePath;
    img.onload = () => {
      setImageLoaded(true);
      setTimeout(() => setIsVisible(true), 50);
    };
    img.onerror = () => {
      setImageError(true);
      setTimeout(() => setIsVisible(true), 50);
    };
  }, [cardImagePath]);

  const getTranslatedCardName = () => {
    if (!card?.name) return '';

    const originalName = card.name;

    // ✅ Pour oracle ou daily, utiliser le mapping daily
    if (isDailyOracle) {
      const frenchKey = getFrenchKeyFromTranslatedName(originalName, language);
      const translationKey = `cards.daily.${frenchKey}.name`;

      const translated = t(translationKey);

      if (translated !== translationKey) {
        return translated;
      }

      return originalName;
    }

    // ✅ Pour tarot, utiliser le mapping tarot
    if (isTarot) {
      const frenchKey = getTarotFrenchKey(originalName, language);
      const translationKey = `cards.tarot.${frenchKey}.name`;

      const translated = t(translationKey);

      if (translated !== translationKey) {
        return translated;
      }

      return originalName;
    }

    // ✅ Pour angels, utiliser le mapping angels
    if (isAngels) {
      const frenchKey = getAngelsFrenchKey(originalName, language);
      const translationKey = `cards.angels.${frenchKey}.name`;

      const translated = t(translationKey);

      if (translated !== translationKey) {
        return translated;
      }

      return originalName;
    }

    // ✅ Pour horoscope, retourner tel quel (pas de traduction spéciale)
    if (oracleType === 'horoscope') {
      return originalName;
    }

    // Pour les autres types (runes), essayer plusieurs variantes
    const normalizedName = originalName
      .trim()
      .replace(/[''\s-]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const key2 = `cards.${oracleType}.${normalizedName}.name`;
    const translation2 = t(key2);
    if (translation2 !== key2) return translation2;

    return originalName;
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

          {/* ✅ VERSION DAILY / TAROT / ANGELS - IMAGE PLEIN ÉCRAN SANS CADRE */}
          {(isDailyOracle || isTarot || isAngels) && cardImagePath && !imageError ? (
            <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={cardImagePath}
                alt={card.name}
                className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error(`❌ Image manquante: ${cardImagePath}`);
                  setImageError(true);
                }}
              />
              {/* Overlay léger pour le texte */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Lueur externe dorée */}
              <div className="absolute -inset-4 bg-amber-400/20 blur-2xl rounded-full opacity-60 animate-pulse"></div>
            </div>
          ) : (
            //* ✅ VERSION RUNES - AVEC CADRE DORÉ */}
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
              </div>

              {/* Gradient lumineux */}
              <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 via-transparent to-transparent pointer-events-none"></div>

              {/* Lueur externe */}
              <div className="absolute -inset-4 bg-amber-400/20 blur-2xl rounded-full opacity-60 animate-pulse"></div>
            </div>
          )}
        </div>

        {/* ✅ NOM DE LA CARTE - EN DESSOUS */}
        <div className="mt-6 text-center">
          <h2 className="text-amber-50 text-2xl font-serif leading-tight break-words drop-shadow-lg">
            {getTranslatedCardName()}
          </h2>
        </div>

        {/* Indicateur de progression */}
        <div className="mt-6 text-center">
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