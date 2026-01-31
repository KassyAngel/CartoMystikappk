import { useState } from 'react';
import MysticalButton from '@/components/MysticalButton';
import BonusRoll from '@/components/BonusRoll';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { showInterstitialAd } from '@/admobService';

interface BonusRollPageProps {
  user: UserSession;
  onBack: () => void;
  onSaveReading?: (reading: any) => void;
  isPremium?: boolean;
}

const getRandomVariation = () => {
  const variations = ['1', '2', '3'];
  return variations[Math.floor(Math.random() * variations.length)];
};

export default function BonusRollPage({ 
  user, 
  onBack, 
  onSaveReading,
  isPremium = false
}: BonusRollPageProps) {
  const { t } = useLanguage();
  const [isComplete, setIsComplete] = useState(false);
  const [variation, setVariation] = useState<string>(() => {
    const initial = getRandomVariation();
    console.log(`🎨 [BONUS ROLL] Variation initiale: ${initial}`);
    return initial;
  });
  const [rollCount, setRollCount] = useState(0);

  const handleComplete = (result: { total: number; dice: [number, number]; interpretation: string }) => {
    setIsComplete(true);
    console.log('✅ Tirage bonus complété:', result);
  };

  const handleBeforeRoll = async (): Promise<boolean> => {
    if (isPremium) {
      console.log('👑 [BONUS ROLL] Premium actif : pas de pub');
      return true;
    }

    const nextCount = rollCount + 1;
    console.log(`🎲 [BONUS ROLL] Lancer #${nextCount}`);

    // ✅ CORRECTION: Pub au 1er lancer, puis tous les 3 lancers (1, 4, 7, 10...)
    if (nextCount === 1 || (nextCount - 1) % 3 === 0) {
      console.log(`🎬 [BONUS ROLL] Lancer #${nextCount} → Pub interstitielle`);
      try {
        await showInterstitialAd(`bonus_roll_${nextCount}`);
        console.log('✅ [BONUS ROLL] Pub interstitielle affichée');
      } catch (error) {
        console.error('❌ [BONUS ROLL] Erreur pub interstitielle:', error);
      }
    } else {
      console.log(`⏭️ [BONUS ROLL] Lancer #${nextCount} → Pas de pub (prochain: ${nextCount + (3 - ((nextCount - 1) % 3))})`);
    }

    setRollCount(nextCount);
    return true;
  };

  const handleAfterRoll = () => {
    const newVariation = getRandomVariation();
    setVariation(newVariation);
    console.log(`🎨 [BONUS ROLL] Nouvelle variation: ${newVariation}`);
  };

  const handleBackToOracle = () => {
    setRollCount(0);
    const newVariation = getRandomVariation();
    setVariation(newVariation);
    console.log(`🔄 [BONUS ROLL] Reset complet - Retour à la sélection`);
    onBack();
  };

  const getVariationGlow = () => {
    switch (variation) {
      case '1': return 'rgba(255, 215, 0, 0.2)';
      case '2': return 'rgba(0, 217, 255, 0.2)';
      case '3': return 'rgba(255, 0, 255, 0.2)';
      default: return 'rgba(255, 215, 0, 0.2)';
    }
  };

  return (
    <div className="cosmic-page-wrapper">
      {/* Deep Space Background */}
      <div className="space-background" />

      {/* Nebula Effect */}
      <div 
        className="nebula-layer"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${getVariationGlow()}, transparent 60%)`
        }}
      />

      {/* Floating Stars */}
      <div className="stars-field">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Top Navigation - Minimal */}
      <div className="cosmic-nav">
        {isPremium && (
          <div className="premium-badge-mini">
            <span>👑</span>
          </div>
        )}

        <MysticalButton 
          variant="secondary" 
          onClick={() => {
            handleBackToOracle();
          }}
          className="nav-btn-cosmic"
        >
          <span className="nav-icon">←</span>
          <span className="nav-label">{t('common.back')}</span>
        </MysticalButton>

        {isComplete && (
          <MysticalButton 
            onClick={() => {
              handleBackToOracle();
            }}
            className="nav-btn-cosmic primary"
          >
            <span className="nav-label">{t('oracle.backToOracles') || 'Retour'}</span>
            <span className="nav-icon">→</span>
          </MysticalButton>
        )}
      </div>

      {/* ✅ Main Cosmic Area - SCROLLABLE */}
      <div className="cosmic-main">
        <BonusRoll 
          onComplete={handleComplete}
          variation={variation}
          isPremium={isPremium}
          onBeforeRoll={handleBeforeRoll}
          onAfterRoll={handleAfterRoll}
          onReset={handleBackToOracle}
        />
      </div>

      <style>{`
        .cosmic-page-wrapper {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #000000;
        }

        /* Deep Space Background */
        .space-background {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at top, #1a0033 0%, #0d0019 50%, #000000 100%);
          z-index: 0;
        }

        .space-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(30, 0, 60, 0.3), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 20, 60, 0.2), transparent 40%);
          animation: nebulaShift 15s ease-in-out infinite;
        }

        @keyframes nebulaShift {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Nebula Layer */
        .nebula-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          animation: nebulaDrift 20s ease-in-out infinite;
        }

        @keyframes nebulaDrift {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translate(30px, 20px) scale(1.1);
            opacity: 0.6;
          }
        }

        /* Stars Field */
        .stars-field {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .star-twinkle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: starTwinkleAnim ease-in-out infinite;
        }

        @keyframes starTwinkleAnim {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* Navigation */
        .cosmic-nav {
          position: relative;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          gap: 1rem;
          background: linear-gradient(
            to bottom,
            rgba(10, 0, 25, 0.9) 0%,
            rgba(10, 0, 25, 0.7) 70%,
            transparent 100%
          );
          backdrop-filter: blur(10px);
          flex-shrink: 0; /* ✅ Empêche la nav de rétrécir */
        }

        .premium-badge-mini {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          animation: premiumFloat 3s ease-in-out infinite;
        }

        @keyframes premiumFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }

        .nav-btn-cosmic {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          background: rgba(20, 0, 40, 0.8);
          border: 1px solid rgba(100, 50, 200, 0.5);
          color: #a78bfa;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(5px);
        }

        .nav-btn-cosmic:hover {
          background: rgba(30, 0, 60, 1);
          border-color: rgba(150, 100, 255, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(100, 50, 200, 0.4);
        }

        .nav-btn-cosmic.primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .nav-btn-cosmic.primary:hover {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          box-shadow: 0 5px 25px rgba(139, 92, 246, 0.6);
        }

        .nav-icon {
          font-size: 1.25rem;
          font-weight: 900;
        }

        .nav-label {
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        /* ✅ Main Cosmic Area - SCROLLABLE */
        .cosmic-main {
          position: relative;
          z-index: 10;
          flex: 1;
          overflow-y: auto; /* ✅ CRITIQUE: Permet le scroll vertical */
          overflow-x: hidden;
          display: flex;
          align-items: flex-start; /* ✅ Alignement en haut pour le scroll */
          justify-content: center;
          padding: 0;
          -webkit-overflow-scrolling: touch; /* ✅ Smooth scroll sur iOS */
        }

        /* ✅ Style de la scrollbar (optionnel, pour webkit) */
        .cosmic-main::-webkit-scrollbar {
          width: 8px;
        }

        .cosmic-main::-webkit-scrollbar-track {
          background: rgba(15, 5, 40, 0.3);
        }

        .cosmic-main::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }

        .cosmic-main::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cosmic-nav {
            padding: 0.75rem 1rem;
          }

          .nav-btn-cosmic {
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }

          .nav-label {
            display: none;
          }

          .nav-icon {
            font-size: 1.5rem;
          }

          .nav-btn-cosmic.primary .nav-label {
            display: inline;
          }

          .premium-badge-mini {
            font-size: 1.25rem;
          }

          /* ✅ Assure que le scroll fonctionne bien sur mobile */
          .cosmic-main {
            align-items: center; /* ✅ Centré sur mobile si pas de scroll nécessaire */
          }
        }
      `}</style>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}