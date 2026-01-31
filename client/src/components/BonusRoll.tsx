import React, { useState, useEffect } from 'react';
import MysticalButton from './MysticalButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface BonusRollProps {
  onComplete?: (result: { total: number; dice: [number, number]; interpretation: string }) => void;
  variation: string | null;
  onReset?: () => void;
  isPremium?: boolean;
  onBeforeRoll?: () => Promise<boolean>;
  onAfterRoll?: () => void;
}

const getDiceStyles = (variation: string | null) => {
  switch (variation) {
    case '1': // Gold Cosmic
      return {
        primary: '#FFD700',
        secondary: '#FFA500',
        glow: '#FFD700',
        shadowColor: 'rgba(255, 215, 0, 0.8)',
        particleColor: '#FFD700',
        gradientStart: '#FFD700',
        gradientEnd: '#FF8C00',
        nebulaColor1: 'rgba(255, 215, 0, 0.4)',
        nebulaColor2: 'rgba(255, 140, 0, 0.35)',
      };
    case '2': // Silver Mystic
      return {
        primary: '#00D9FF',
        secondary: '#0099CC',
        glow: '#00D9FF',
        shadowColor: 'rgba(0, 217, 255, 0.8)',
        particleColor: '#00D9FF',
        gradientStart: '#00D9FF',
        gradientEnd: '#0066CC',
        nebulaColor1: 'rgba(0, 217, 255, 0.4)',
        nebulaColor2: 'rgba(0, 102, 204, 0.35)',
      };
    case '3': // Purple Cosmic
      return {
        primary: '#FF00FF',
        secondary: '#CC00FF',
        glow: '#FF00FF',
        shadowColor: 'rgba(255, 0, 255, 0.8)',
        particleColor: '#FF00FF',
        gradientStart: '#FF00FF',
        gradientEnd: '#9900FF',
        nebulaColor1: 'rgba(255, 0, 255, 0.4)',
        nebulaColor2: 'rgba(153, 0, 255, 0.35)',
      };
    default:
      return {
        primary: '#FFD700',
        secondary: '#FFA500',
        glow: '#FFD700',
        shadowColor: 'rgba(255, 215, 0, 0.8)',
        particleColor: '#FFD700',
        gradientStart: '#FFD700',
        gradientEnd: '#FF8C00',
        nebulaColor1: 'rgba(255, 215, 0, 0.4)',
        nebulaColor2: 'rgba(255, 140, 0, 0.35)',
      };
  }
};

export default function BonusRoll({ 
  onComplete, 
  variation, 
  onReset, 
  isPremium = false,
  onBeforeRoll,
  onAfterRoll
}: BonusRollProps) {
  const { t } = useLanguage();

  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [interpretation, setInterpretation] = useState<{ title: string; message: string } | null>(null);
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const styles = getDiceStyles(variation);

  async function rollDice() {
    if (rolling || isLoadingAd) return;

    if (onBeforeRoll) {
      setIsLoadingAd(true);
      const canRoll = await onBeforeRoll();
      setIsLoadingAd(false);
      if (!canRoll) return;
    }

    setRolling(true);
    setShowExplosion(false);

    let rolls = 0;
    const maxRolls = 25;

    const interval = setInterval(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDice([d1, d2]);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(interval);
        const sum = d1 + d2;

        setShowExplosion(true);
        setTimeout(() => setShowExplosion(false), 1000);

        const currentVariation = variation || '1';
        const title = t(`oracle.bonusRoll.${sum}.title.${currentVariation}`) || '✨ Révélation Cosmique';
        const interpretationMessage = t(`oracle.bonusRoll.${sum}.message.${currentVariation}`) || 'Les astres se sont alignés...';

        setInterpretation({ title, message: interpretationMessage });
        setRolling(false);
        setHasRolled(true);

        if (onComplete) {
          onComplete({
            total: sum,
            dice: [d1, d2],
            interpretation: `${title}\n\n${interpretationMessage}`,
          });
        }
      }
    }, 60);
  }

  const renderDiceDots = (value: number, isAnimating: boolean) => {
    const dotPositions: Record<number, string[]> = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };

    const positions = dotPositions[value] || [];

    return (
      <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 p-2">
        {positions.map((pos, idx) => {
          const positionClass = {
            'top-left': 'col-start-1 row-start-1',
            'top-right': 'col-start-3 row-start-1',
            'middle-left': 'col-start-1 row-start-2',
            center: 'col-start-2 row-start-2',
            'middle-right': 'col-start-3 row-start-2',
            'bottom-left': 'col-start-1 row-start-3',
            'bottom-right': 'col-start-3 row-start-3',
          }[pos];

          return (
            <div key={idx} className={`${positionClass} flex items-center justify-center`}>
              <div 
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-lg ${isAnimating ? 'animate-pulse' : ''}`}
                style={{
                  boxShadow: `0 0 8px ${styles.glow}, 0 2px 4px rgba(0,0,0,0.5)`
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mystical-dice-container">
      {/* Cosmic Portal Background */}
      <div className="cosmic-portal">
        <div className="portal-ring" style={{ borderColor: styles.primary }}>
          <div className="portal-ring-inner" style={{ borderColor: styles.secondary }} />
        </div>
        <div className="portal-glow" style={{ 
          background: `radial-gradient(circle, ${styles.glow}40, transparent 70%)` 
        }} />
      </div>

      {/* Floating Particles */}
      <div className="particles-field">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              background: styles.particleColor,
            }}
          />
        ))}
      </div>

      {/* Explosion Particles */}
      {showExplosion && (
        <div className="explosion-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="explosion-particle"
              style={{
                left: '50%',
                top: '50%',
                '--angle': `${(360 / 30) * i}deg`,
                background: styles.particleColor,
                boxShadow: `0 0 10px ${styles.glow}`,
              } as any}
            />
          ))}
        </div>
      )}

      {/* ✅ Contenu centré verticalement avec espace pour la pub en bas */}
      <div className="content-wrapper">
        {!hasRolled ? (
          // INITIAL STATE - Ready to Roll
          <div className="initial-state">
            {/* Nébuleuse cosmique en arrière-plan */}
            <div className="nebula-background">
              <div 
                className="nebula-cloud nebula-1"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, ${styles.nebulaColor1}, transparent 60%)`,
                }}
              />
              <div 
                className="nebula-cloud nebula-2"
                style={{
                  background: `radial-gradient(ellipse at 70% 30%, ${styles.nebulaColor2}, transparent 50%)`,
                }}
              />
              <div 
                className="nebula-cloud nebula-3"
                style={{
                  background: `radial-gradient(ellipse at 50% 20%, ${styles.nebulaColor1}, transparent 70%)`,
                }}
              />
            </div>

            {/* Phrase mystique */}
            <div className="mystical-quote">
              <p 
                className="quote-text"
                style={{
                  color: styles.primary,
                  textShadow: `0 0 12px ${styles.glow}25`,
                }}
              >
                {t('oracle.bonusRoll.mysticalQuote') || 'Les astres vous observent'}
              </p>
            </div>

            {/* Constellation décorative */}
            <div className="constellation-header">
              <div className="constellation-line" style={{ background: styles.primary }} />
              <div className="constellation-dots">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="constellation-dot"
                    style={{ 
                      background: styles.primary,
                      boxShadow: `0 0 10px ${styles.glow}`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="title-section">
              <h2 className="mystical-title" style={{
                background: `linear-gradient(135deg, ${styles.gradientStart}, ${styles.gradientEnd})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
              }}>
                {t('oracle.bonusRoll.title')}
              </h2>
              <p className="mystical-subtitle">
                {isLoadingAd ? t('oracle.bonusRoll.loading') || 'Préparation en cours...' : t('oracle.bonusRoll.subtitle')}
              </p>
            </div>

            {/* Orbites cosmiques autour des dés */}
            <div className="dice-stage-wrapper">
              <div className="cosmic-orbit" style={{ borderColor: `${styles.primary}30` }}>
                <div className="orbit-particle" style={{ background: styles.primary }} />
              </div>

              <div className="dice-stage">
                <div 
                  className={`cosmic-dice ${rolling ? 'spinning' : 'idle'}`}
                  onClick={!rolling && !isLoadingAd ? rollDice : undefined}
                  style={{
                    boxShadow: rolling 
                      ? `0 0 40px ${styles.shadowColor}, 0 10px 30px rgba(0,0,0,0.5)`
                      : `0 0 30px ${styles.shadowColor}, 0 5px 20px rgba(0,0,0,0.5)`,
                    borderColor: styles.primary,
                  }}
                >
                  <div className="dice-glow" style={{ background: styles.glow }} />
                  {renderDiceDots(dice[0], rolling)}
                </div>

                <div 
                  className="plus-icon"
                  style={{ 
                    color: styles.primary,
                    textShadow: `0 0 20px ${styles.glow}`
                  }}
                >
                  +
                </div>

                <div 
                  className={`cosmic-dice ${rolling ? 'spinning' : 'idle'}`}
                  onClick={!rolling && !isLoadingAd ? rollDice : undefined}
                  style={{
                    boxShadow: rolling 
                      ? `0 0 40px ${styles.shadowColor}, 0 10px 30px rgba(0,0,0,0.5)`
                      : `0 0 30px ${styles.shadowColor}, 0 5px 20px rgba(0,0,0,0.5)`,
                    borderColor: styles.primary,
                  }}
                >
                  <div className="dice-glow" style={{ background: styles.glow }} />
                  {renderDiceDots(dice[1], rolling)}
                </div>
              </div>
            </div>

            {/* Éléments décoratifs mystiques */}
            <div className="mystic-symbols">
              <div className="symbol-rune" style={{ color: styles.primary }}>⟡</div>
              <div className="symbol-rune" style={{ color: styles.primary }}>◆</div>
              <div className="symbol-rune" style={{ color: styles.primary }}>⟡</div>
            </div>

            {!rolling && !isLoadingAd && (
              <MysticalButton
                onClick={rollDice}
                className="roll-cta"
                style={{
                  background: `linear-gradient(135deg, ${styles.gradientStart}, ${styles.gradientEnd})`,
                  boxShadow: `0 0 30px ${styles.shadowColor}, 0 5px 20px rgba(0,0,0,0.5)`,
                }}
              >
                <span className="cta-text">{t('oracle.bonusRoll.rollButton')}</span>
              </MysticalButton>
            )}

            {isLoadingAd && (
              <div className="loading-state">
                <div className="cosmic-spinner" style={{ borderTopColor: styles.primary }} />
              </div>
            )}
          </div>
        ) : (
          // RESULT STATE - Revelation
          <div className="result-state">
            <div className="result-dice-group">
              <div 
                className="cosmic-dice result-dice"
                style={{
                  boxShadow: `0 0 40px ${styles.shadowColor}, 0 10px 30px rgba(0,0,0,0.5)`,
                  borderColor: styles.primary,
                }}
              >
                <div className="dice-glow pulse" style={{ background: styles.glow }} />
                {renderDiceDots(dice[0], false)}
              </div>

              <div className="result-operator" style={{ color: styles.primary }}>+</div>

              <div 
                className="cosmic-dice result-dice"
                style={{
                  boxShadow: `0 0 40px ${styles.shadowColor}, 0 10px 30px rgba(0,0,0,0.5)`,
                  borderColor: styles.primary,
                }}
              >
                <div className="dice-glow pulse" style={{ background: styles.glow }} />
                {renderDiceDots(dice[1], false)}
              </div>

              <div className="result-operator" style={{ color: styles.primary }}>=</div>

              <div 
                className="result-total"
                style={{
                  background: `linear-gradient(135deg, ${styles.gradientStart}, ${styles.gradientEnd})`,
                  boxShadow: `0 0 50px ${styles.shadowColor}, 0 10px 40px rgba(0,0,0,0.6)`,
                  borderColor: styles.primary,
                }}
              >
                <div className="total-glow pulse" style={{ background: styles.glow }} />
                <span className="total-number">{dice[0] + dice[1]}</span>
              </div>
            </div>

            {interpretation && (
              <div 
                className="revelation-card"
                style={{
                  borderColor: styles.primary,
                  boxShadow: `0 0 15px ${styles.shadowColor}, 0 5px 20px rgba(0,0,0,0.7)`,
                }}
              >
                <div className="card-header-line" style={{ background: `linear-gradient(90deg, transparent, ${styles.primary}, transparent)` }} />
                <h3 
                  className="revelation-title"
                  style={{
                    background: `linear-gradient(135deg, ${styles.gradientStart}, ${styles.gradientEnd})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {interpretation.title}
                </h3>
                <div className="divider" style={{ background: `linear-gradient(90deg, transparent, ${styles.primary}, transparent)` }} />
                <p className="revelation-message">{interpretation.message}</p>
              </div>
            )}

            <MysticalButton
              variant="secondary"
              onClick={() => {
                setHasRolled(false);
                setInterpretation(null);
                setDice([1, 1]);
                if (onAfterRoll) onAfterRoll();
              }}
              className="new-roll-btn"
              style={{
                borderColor: styles.primary,
                color: styles.primary,
                background: 'rgba(15, 5, 40, 0.8)',
              }}
            >
              {t('oracle.bonusRoll.newRoll')}
            </MysticalButton>

            {/* ✅ Bouton retour - TOUJOURS VISIBLE */}
            {onReset && (
              <MysticalButton
                variant="secondary"
                onClick={onReset}
                className="back-button-bottom"
                style={{
                  borderColor: styles.primary,
                  color: styles.primary,
                  background: 'rgba(15, 5, 40, 0.6)',
                }}
              >
                <span className="back-arrow">←</span>
                <span className="back-text">{t('oracle.bonusRoll.backToSelection') || 'Retour à la sélection'}</span>
              </MysticalButton>
            )}
          </div>
        )}
      </div>

      <style>{`
        .mystical-dice-container {
          position: relative;
          width: 100%;
          min-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden; /* ✅ Pas de scroll sur le container principal */
        }

        /* ✅ SOLUTION: Wrapper qui centre le contenu et laisse de l'espace pour la pub */
        .content-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 180px); /* ✅ Hauteur minimale moins espace pour nav (80px) et pub (100px) */
          padding: 1rem 1.5rem;
          padding-bottom: 6rem; /* ✅ Espace pour la bannière pub (60px) + marge de sécurité */
        }

        /* Back Button Bottom - ✅ TOUJOURS VISIBLE */
        .back-button-bottom {
          position: relative !important;
          z-index: 10;
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Rajdhani', sans-serif !important;
          font-size: 0.9rem !important;
          font-weight: 600 !important;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          animation: buttonAppear 0.6s ease-out 1.2s both;
          backdrop-filter: blur(10px);
          min-height: 44px;
        }

        .back-button-bottom:hover {
          transform: translateY(-2px) !important;
        }

        .back-arrow {
          font-size: 1.125rem;
          font-weight: bold;
        }

        .back-text {
          letter-spacing: 0.05em;
        }

        /* Cosmic Portal */
        .cosmic-portal {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .portal-ring {
          width: 500px;
          height: 500px;
          border: 2px solid;
          border-radius: 50%;
          animation: portalRotate 20s linear infinite;
          opacity: 0.2;
        }

        .portal-ring-inner {
          position: absolute;
          inset: 30px;
          border: 1px solid;
          border-radius: 50%;
          animation: portalRotate 15s linear infinite reverse;
        }

        .portal-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes portalRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }

        /* Nébuleuse cosmique */
        .nebula-background {
          position: absolute;
          top: -50px;
          left: 0;
          right: 0;
          height: 200px;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .nebula-cloud {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(60px);
        }

        .nebula-1 {
          top: -80px;
          left: -40px;
          animation: nebulaFloat1 12s ease-in-out infinite;
        }

        .nebula-2 {
          top: -100px;
          right: -40px;
          animation: nebulaFloat2 15s ease-in-out infinite;
        }

        .nebula-3 {
          top: -90px;
          left: 50%;
          transform: translateX(-50%);
          animation: nebulaFloat3 18s ease-in-out infinite;
        }

        @keyframes nebulaFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50% { transform: translate(30px, 20px) scale(1.2); opacity: 0.8; }
        }

        @keyframes nebulaFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(-30px, 25px) scale(1.25); opacity: 0.75; }
        }

        @keyframes nebulaFloat3 {
          0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, 30px) scale(1.15); opacity: 0.7; }
        }

        /* Phrase mystique */
        .mystical-quote {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 0.5rem;
          padding: 0.5rem 1rem;
          animation: fadeInDown 0.8s ease-out;
        }

        .quote-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          animation: textGlow 3s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }

        /* Floating Particles */
        .particles-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle-float {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 5s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          25% { opacity: 1; }
          75% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-150px) scale(1); }
        }

        /* Explosion */
        .explosion-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .explosion-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: explode 0.8s ease-out forwards;
        }

        @keyframes explode {
          0% { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(200px) scale(0);
            opacity: 0;
          }
        }

        /* Initial State */
        .initial-state,
        .result-state {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }

        /* Constellation Header */
        .constellation-header {
          position: relative;
          width: 100%;
          max-width: 250px;
          height: 30px;
          animation: fadeInDown 0.6s ease-out 0.2s both;
        }

        .constellation-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          opacity: 0.3;
        }

        .constellation-dots {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .constellation-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title-section {
          text-align: center;
          animation: fadeInDown 0.6s ease-out 0.4s both;
          margin-top: 0;
        }

        .mystical-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.3rem, 5vw, 1.75rem);
          font-weight: 900;
          letter-spacing: 0.05em;
          margin: 0 0 0.75rem 0;
          filter: drop-shadow(0 0 8px ${styles.shadowColor}15);
        }

        .mystical-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          color: #a78bfa;
          font-weight: 600;
          max-width: 350px;
          line-height: 1.5;
        }

        /* Dice Stage with Orbit */
        .dice-stage-wrapper {
          position: relative;
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .cosmic-orbit {
          position: absolute;
          inset: -35px;
          border: 1px solid;
          border-radius: 50%;
          animation: orbitRotate 10s linear infinite;
        }

        .orbit-particle {
          position: absolute;
          top: 0;
          left: 50%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        @keyframes orbitRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dice-stage,
        .result-dice-group {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          position: relative;
          z-index: 2;
        }

        .cosmic-dice {
          position: relative;
          width: 65px;
          height: 65px;
          background: rgba(15, 5, 40, 0.95);
          border: 2px solid;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        .cosmic-dice.idle:hover {
          transform: translateY(-8px) scale(1.05);
          filter: brightness(1.2);
        }

        .cosmic-dice.spinning {
          animation: diceSpinMystic 0.1s linear infinite;
        }

        @keyframes diceSpinMystic {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .cosmic-dice.result-dice {
          animation: resultAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          cursor: default;
        }

        @keyframes resultAppear {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .dice-glow {
          position: absolute;
          inset: -20px;
          opacity: 0.3;
          filter: blur(20px);
          border-radius: 50%;
        }

        .dice-glow.pulse {
          animation: glowPulseStrong 2s ease-in-out infinite;
        }

        @keyframes glowPulseStrong {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .plus-icon,
        .result-operator {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.75rem;
          font-weight: 900;
          animation: operatorPulse 2s ease-in-out infinite;
        }

        @keyframes operatorPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        /* Mystic Symbols */
        .mystic-symbols {
          display: flex;
          gap: 1.5rem;
          animation: fadeIn 0.8s ease-out 0.8s both;
        }

        .symbol-rune {
          font-size: 1.25rem;
          opacity: 0.5;
          animation: symbolFloat 3s ease-in-out infinite;
        }

        .symbol-rune:nth-child(2) {
          animation-delay: 0.3s;
        }

        .symbol-rune:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes symbolFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Result Total */
        .result-total {
          position: relative;
          width: 75px;
          height: 75px;
          border: 3px solid;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          animation: totalReveal 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s both;
        }

        @keyframes totalReveal {
          0% { transform: scale(0) rotate(-360deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .total-glow {
          position: absolute;
          inset: -30px;
          opacity: 0.4;
          filter: blur(25px);
          border-radius: 50%;
        }

        .total-number {
          position: relative;
          z-index: 10;
          font-family: 'Orbitron', sans-serif;
          font-size: 2.75rem;
          font-weight: 900;
          color: #0f0528;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        /* Revelation Card */
        .revelation-card {
          background: rgba(15, 5, 40, 0.95);
          border: 1.5px solid;
          border-radius: 20px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          animation: cardReveal 0.8s ease-out 0.6s both;
          max-width: 420px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card-header-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          opacity: 0.5;
        }

        .revelation-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          text-align: center;
          margin: 0 0 0.875rem 0;
        }

        .divider {
          height: 1px;
          width: 100%;
          margin: 0.875rem 0;
          opacity: 0.3;
        }

        .revelation-message {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #c4b5fd;
          text-align: center;
          margin: 0;
          font-weight: 500;
        }

        /* Buttons */
        .roll-cta,
        .new-roll-btn {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.875rem 2rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: buttonAppear 0.6s ease-out 1s both;
          min-width: 180px;
        }

        @keyframes buttonAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .roll-cta:hover,
        .new-roll-btn:hover {
          transform: translateY(-4px);
          filter: brightness(1.2);
        }

        .new-roll-btn {
          background: rgba(15, 5, 40, 0.8);
          border: 2px solid;
          padding: 0.75rem 1.75rem;
          font-size: 0.95rem;
        }

        /* Loading */
        .loading-state {
          display: flex;
          justify-content: center;
          padding: 1.5rem;
        }

        .cosmic-spinner {
          width: 45px;
          height: 45px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: #FFD700;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .content-wrapper {
            min-height: calc(100vh - 200px); /* ✅ Plus d'espace sur mobile */
            padding: 1rem;
            padding-bottom: 7rem; /* ✅ Plus d'espace pour la pub sur mobile */
          }

          .nebula-cloud {
            width: 250px;
            height: 250px;
          }

          .cosmic-dice {
            width: 55px;
            height: 55px;
          }

          .result-total {
            width: 65px;
            height: 65px;
          }

          .total-number {
            font-size: 2.25rem;
          }

          .mystical-title {
            font-size: 1.15rem;
          }

          .mystical-subtitle {
            font-size: 0.85rem;
          }

          .quote-text {
            font-size: 1rem;
          }

          .roll-cta,
          .new-roll-btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.95rem;
            min-width: 160px;
          }

          .revelation-card {
            padding: 1.25rem;
          }

          .portal-ring {
            width: 300px;
            height: 300px;
          }

          .portal-glow {
            width: 200px;
            height: 200px;
          }

          .back-button-bottom {
            margin-bottom: 0.5rem;
          }

          .initial-state,
          .result-state {
            gap: 1.25rem;
          }
        }
      `}</style>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}