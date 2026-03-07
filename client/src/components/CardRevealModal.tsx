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

  const cardImagePath = (isDailyOracle || isTarot || isAngels) 
    ? getCardImagePath(card?.name, oracleType, language) 
    : null;

  useEffect(() => {
    if (!cardImagePath) {
      setTimeout(() => setIsVisible(true), 50);
      return;
    }
    const img = new Image();
    img.src = cardImagePath;
    img.onload = () => { setImageLoaded(true); setTimeout(() => setIsVisible(true), 50); };
    img.onerror = () => { setImageError(true); setTimeout(() => setIsVisible(true), 50); };
  }, [cardImagePath]);

  const getTranslatedCardName = () => {
    if (!card?.name) return '';
    const originalName = card.name;

    if (isDailyOracle) {
      const frenchKey = getFrenchKeyFromTranslatedName(originalName, language);
      const translationKey = `cards.daily.${frenchKey}.name`;
      const translated = t(translationKey);
      return translated !== translationKey ? translated : originalName;
    }
    if (isTarot) {
      const frenchKey = getTarotFrenchKey(originalName, language);
      const translationKey = `cards.tarot.${frenchKey}.name`;
      const translated = t(translationKey);
      return translated !== translationKey ? translated : originalName;
    }
    if (isAngels) {
      const frenchKey = getAngelsFrenchKey(originalName, language);
      const translationKey = `cards.angels.${frenchKey}.name`;
      const translated = t(translationKey);
      return translated !== translationKey ? translated : originalName;
    }
    if (oracleType === 'horoscope') return originalName;

    const normalizedName = originalName
      .trim().replace(/[''\s-]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const key2 = `cards.${oracleType}.${normalizedName}.name`;
    const translation2 = t(key2);
    return translation2 !== key2 ? translation2 : originalName;
  };

  return (
    <>
      <style>{`
        /* ✅ MODAL OVERLAY — couvre tout l'écran */
        .crm-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          /* ✅ Scroll vertical autorisé si le contenu dépasse */
          overflow-y: auto;
          overflow-x: hidden;
          touch-action: pan-y;
        }

        /* ✅ CONTENU SCROLLABLE avec padding-bottom = hauteur bannière AdMob + safe area */
        .crm-content {
          position: relative;
          width: 100%;
          max-width: 420px;
          padding: 24px 20px;
          /* ✅ Espace en bas = bannière AdMob (≈60px) + safe area device + marge confort */
          padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .crm-content.hidden {
          opacity: 0;
          transform: scale(0.75);
        }
        .crm-content.visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Carte image */
        .crm-card-wrap {
          position: relative;
          width: 100%;
          max-width: 280px;
          aspect-ratio: 2 / 3;
        }

        /* Image plein cadre (daily / tarot / angels) */
        .crm-img-container {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .crm-img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 16px;
          transition: opacity 0.3s ease;
        }
        .crm-img.loading { opacity: 0; }
        .crm-img.loaded  { opacity: 1; }
        .crm-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%);
          border-radius: 16px;
          pointer-events: none;
        }
        .crm-glow {
          position: absolute;
          inset: -16px;
          background: rgba(251,191,36,0.18);
          filter: blur(24px);
          border-radius: 50%;
          opacity: 0.65;
          animation: crm-pulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes crm-pulse { 0%,100%{opacity:.5;transform:scale(.95)} 50%{opacity:.8;transform:scale(1.05)} }

        /* Cadre doré (runes) */
        .crm-runes-container {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #4a3470 0%, #2d1b4e 50%, #1a0f3a 100%);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .crm-runes-border {
          position: absolute; inset: 16px;
          border-radius: 10px;
          border: 3px solid rgba(251,191,36,0.6);
          pointer-events: none;
        }
        .crm-corner {
          position: absolute; width: 24px; height: 24px;
        }
        .crm-corner.tl { top: -1px; left: -1px; }
        .crm-corner.tr { top: -1px; right: -1px; }
        .crm-corner.bl { bottom: -1px; left: -1px; }
        .crm-corner.br { bottom: -1px; right: -1px; }
        .crm-corner-dot {
          position: absolute;
          width: 6px; height: 6px;
          background: #fbbf24;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(251,191,36,0.7);
        }
        .crm-corner.tl .crm-corner-dot { top: 0; left: 0; }
        .crm-corner.tr .crm-corner-dot { top: 0; right: 0; }
        .crm-corner.bl .crm-corner-dot { bottom: 0; left: 0; }
        .crm-corner.br .crm-corner-dot { bottom: 0; right: 0; }

        /* Nom de la carte */
        .crm-name {
          margin-top: 24px;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 26px; font-weight: 400;
          color: #fdf8ec;
          text-align: center;
          line-height: 1.25;
          word-break: break-word;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }

        /* Progression */
        .crm-progress {
          margin-top: 20px;
          display: flex; flex-direction: column;
          align-items: center; gap: 12px;
          width: 100%;
        }
        .crm-progress-label {
          font-size: 13px; font-weight: 500;
          color: rgba(251,191,36,0.85);
          letter-spacing: 0.3px;
        }
        .crm-dots {
          display: flex; gap: 8px;
        }
        .crm-dot {
          width: 8px; height: 8px; border-radius: 50%;
          transition: all 0.4s ease;
        }
        .crm-dot.active {
          background: #fbbf24;
          box-shadow: 0 0 8px rgba(251,191,36,0.7);
        }
        .crm-dot.inactive {
          background: rgba(139,92,246,0.3);
        }

        /* ✅ Bouton — bien visible et espacé de la bannière */
        .crm-btn-wrap {
          margin-top: 20px;
          width: 100%;
          max-width: 320px;
        }
      `}</style>

      {/* Overlay — click en dehors = ferme */}
      <div className="crm-overlay" onClick={onClose}>
        <div
          className={`crm-content ${isVisible ? 'visible' : 'hidden'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── CARTE ── */}
          <div className="crm-card-wrap">
            {(isDailyOracle || isTarot || isAngels) && cardImagePath && !imageError ? (
              /* Image pleine */
              <div className="crm-img-container">
                <img
                  src={cardImagePath}
                  alt={card?.name}
                  className={`crm-img ${imageLoaded ? 'loaded' : 'loading'}`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                <div className="crm-img-overlay" />
                <div className="crm-glow" />
              </div>
            ) : (
              /* Cadre doré runes */
              <div className="crm-runes-container">
                <div className="crm-runes-border">
                  <div className="crm-corner tl"><div className="crm-corner-dot"/></div>
                  <div className="crm-corner tr"><div className="crm-corner-dot"/></div>
                  <div className="crm-corner bl"><div className="crm-corner-dot"/></div>
                  <div className="crm-corner br"><div className="crm-corner-dot"/></div>
                  <div style={{ position:'absolute', top:10, left:10, color:'rgba(251,191,36,0.4)', fontSize:12 }}>✦</div>
                  <div style={{ position:'absolute', top:10, right:10, color:'rgba(251,191,36,0.4)', fontSize:12 }}>✦</div>
                  <div style={{ position:'absolute', bottom:10, left:10, color:'rgba(251,191,36,0.4)', fontSize:12 }}>✦</div>
                  <div style={{ position:'absolute', bottom:10, right:10, color:'rgba(251,191,36,0.4)', fontSize:12 }}>✦</div>
                </div>
                <div className="crm-glow" />
              </div>
            )}
          </div>

          {/* ── NOM ── */}
          <h2 className="crm-name">{getTranslatedCardName()}</h2>

          {/* ── PROGRESSION ── */}
          <div className="crm-progress">
            <p className="crm-progress-label">
              {t('cardgame.cardRevealed')} {cardNumber} / {totalCards}
            </p>
            <div className="crm-dots">
              {Array.from({ length: totalCards }).map((_, i) => (
                <div
                  key={i}
                  className={`crm-dot ${i < cardNumber ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
          </div>

          {/* ✅ BOUTON — toujours visible au-dessus de la bannière AdMob */}
          <div className="crm-btn-wrap">
            <MysticalButton
              variant="primary"
              onClick={onClose}
              className="min-h-[48px] px-8 w-full"
            >
              {cardNumber < totalCards
                ? t('cardgame.continue')
                : t('cardgame.seeInterpretation')
              }
            </MysticalButton>
          </div>
        </div>
      </div>
    </>
  );
}