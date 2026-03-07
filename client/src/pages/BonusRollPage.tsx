import BonusRoll from '@/components/BonusRoll';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

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

  // ✅ handleBeforeRoll : PAS de pub au 1er lancer (déjà montrée dans OracleSelection)
  // Pub uniquement à partir du 2ème lancer, tous les 3 lancers (2, 5, 8...)
  const handleBeforeRoll = async (): Promise<boolean> => {
    if (isPremium) {
      console.log('👑 [BONUS ROLL] Premium actif : pas de pub');
      setRollCount(prev => prev + 1);
      return true;
    }

    const nextCount = rollCount + 1;
    console.log(`🎲 [BONUS ROLL] Lancer #${nextCount}`);

    // ✅ 1er lancer : pas de pub (déjà montrée avant d'arriver ici)
    // Pub à partir du 4ème lancer, puis tous les 3 (4, 7, 10...)
    if (nextCount > 1 && (nextCount - 1) % 3 === 0) {
      console.log(`🎬 [BONUS ROLL] Lancer #${nextCount} → Pub interstitielle`);
      try {
        const { showInterstitialAd } = await import('@/admobService');
        await showInterstitialAd(`bonus_roll_${nextCount}`);
        console.log('✅ [BONUS ROLL] Pub interstitielle affichée');
      } catch (error) {
        console.error('❌ [BONUS ROLL] Erreur pub interstitielle:', error);
      }
    } else {
      const nextAd = nextCount === 1 ? 4 : nextCount + (3 - ((nextCount - 1) % 3));
      console.log(`⏭️ [BONUS ROLL] Lancer #${nextCount} → Pas de pub (prochain: ${nextAd})`);
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

      {/* ✅ PAS de cosmic-nav — les boutons Retour sont déjà dans BonusRoll */}

      {/* Main Cosmic Area */}
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

        /* ✅ Main occupe tout l'espace disponible */
        .cosmic-main {
          position: relative;
          z-index: 10;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 100px 0 40px;
          -webkit-overflow-scrolling: touch;
        }

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

        @media (max-width: 768px) {
          .cosmic-main {
            align-items: center;
          }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}