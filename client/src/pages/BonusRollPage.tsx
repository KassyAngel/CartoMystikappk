import { useState } from 'react';
import MysticalButton from '@/components/MysticalButton';
import BonusRoll from '@/components/BonusRoll';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { showRewardedAd, showInterstitialAd } from '@/admobService';

interface BonusRollPageProps {
  user: UserSession;
  onBack: () => void;
  onSaveReading?: (reading: any) => void;
  isPremium?: boolean;
}

// ✅ Fonction helper pour générer une variation aléatoire
const getRandomVariation = () => {
  const variations = ['1', '2', '3'];
  return variations[Math.floor(Math.random() * variations.length)];
};

const getVariationStyles = (variation: string | null, t: any) => {
  switch (variation) {
    case '1':
      return {
        name: t('oracle.bonusRoll.variations.golden') || 'Doré Royal',
        emoji: '👑',
        badge: 'from-amber-500 via-yellow-400 to-amber-500',
        badgeText: 'text-purple-900',
        gradient: 'from-amber-500 via-yellow-400 to-orange-500',
        glow: 'bg-amber-500/30',
        glowColor: 'rgba(251,191,36,0.7)',
        border: 'border-yellow-300',
        particle: 'bg-amber-400',
        textGradient: 'from-amber-300 via-yellow-200 to-amber-300',
        bgBox: 'bg-purple-900/60 border-amber-400/50',
        button: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
        buttonShadow: 'shadow-[0_0_30px_rgba(251,191,36,0.6)]'
      };
    case '2':
      return {
        name: t('oracle.bonusRoll.variations.silver') || 'Argent Mystique',
        emoji: '🌙',
        badge: 'from-cyan-400 via-blue-300 to-cyan-400',
        badgeText: 'text-blue-900',
        gradient: 'from-cyan-400 via-blue-300 to-indigo-400',
        glow: 'bg-cyan-400/30',
        glowColor: 'rgba(34,211,238,0.7)',
        border: 'border-cyan-300',
        particle: 'bg-cyan-300',
        textGradient: 'from-cyan-200 via-blue-100 to-cyan-200',
        bgBox: 'bg-blue-900/60 border-cyan-400/50',
        button: 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
        buttonShadow: 'shadow-[0_0_30px_rgba(34,211,238,0.6)]'
      };
    case '3':
      return {
        name: t('oracle.bonusRoll.variations.cosmic') || 'Violet Cosmique',
        emoji: '🔮',
        badge: 'from-purple-500 via-fuchsia-400 to-purple-500',
        badgeText: 'text-purple-900',
        gradient: 'from-purple-500 via-fuchsia-400 to-pink-500',
        glow: 'bg-purple-500/30',
        glowColor: 'rgba(168,85,247,0.7)',
        border: 'border-fuchsia-300',
        particle: 'bg-fuchsia-400',
        textGradient: 'from-purple-300 via-fuchsia-200 to-purple-300',
        bgBox: 'bg-purple-900/60 border-fuchsia-400/50',
        button: 'from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500',
        buttonShadow: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]'
      };
    default:
      return {
        name: t('oracle.bonusRoll.variations.golden') || 'Doré Royal',
        emoji: '👑',
        badge: 'from-amber-500 via-yellow-400 to-amber-500',
        badgeText: 'text-purple-900',
        gradient: 'from-amber-500 via-yellow-400 to-orange-500',
        glow: 'bg-amber-500/30',
        glowColor: 'rgba(251,191,36,0.7)',
        border: 'border-yellow-300',
        particle: 'bg-amber-400',
        textGradient: 'from-amber-300 via-yellow-200 to-amber-300',
        bgBox: 'bg-purple-900/60 border-amber-400/50',
        button: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
        buttonShadow: 'shadow-[0_0_30px_rgba(251,191,36,0.6)]'
      };
  }
};

export default function BonusRollPage({ 
  user, 
  onBack, 
  onSaveReading,
  isPremium = false
}: BonusRollPageProps) {
  const { t } = useLanguage();
  const [isComplete, setIsComplete] = useState(false);

  // 🎨 État pour gérer le changement de variation (couleur des dés)
  const [variation, setVariation] = useState<string>(() => {
    const initial = getRandomVariation();
    console.log(`🎨 [BONUS ROLL] Variation initiale: ${initial}`);
    return initial;
  });

  // 🎯 Compteur de lancers pour les pubs (indépendant du système global)
  const [rollCount, setRollCount] = useState(0);

  // 🎁 Flag pour la pub récompensée (1er lancer uniquement)
  const [hasShownRewardedAd, setHasShownRewardedAd] = useState(false);

  const handleComplete = (result: { total: number; dice: [number, number]; interpretation: string }) => {
    setIsComplete(true);
    console.log('✅ Tirage bonus complété:', result);
  };

  // 🎲 FONCTION APPELÉE AVANT CHAQUE LANCER DE DÉS
  const handleBeforeRoll = async (): Promise<boolean> => {
    if (isPremium) {
      console.log('👑 [BONUS ROLL] Premium actif : pas de pub');
      return true; // ✅ Autoriser le lancer
    }

    const nextCount = rollCount + 1;
    console.log(`🎲 [BONUS ROLL] Lancer #${nextCount}`);

    // 🎁 1ER LANCER = PUB RÉCOMPENSÉE
    if (nextCount === 1 && !hasShownRewardedAd) {
      console.log('🎁 [BONUS ROLL] 1er lancer → Affichage pub récompensée obligatoire...');

      try {
        const success = await showRewardedAd('bonus_roll_first');

        if (!success) {
          console.log('❌ [BONUS ROLL] Pub récompensée échouée → Lancer bloqué');
          alert('⚠️ Veuillez regarder la publicité pour débloquer le premier lancer.');
          return false; // ❌ Bloquer le lancer
        }

        console.log('✅ [BONUS ROLL] Pub récompensée visionnée → Lancer autorisé');
        setHasShownRewardedAd(true);
      } catch (error) {
        console.error('❌ [BONUS ROLL] Erreur pub récompensée:', error);
        return false;
      }
    }

    // 🎬 TOUS LES 3 LANCERS (après le 1er) = PUB INTERSTITIELLE
    // Formule: (nextCount - 1) % 3 === 0 et nextCount > 1
    // Lancer 4, 7, 10, 13...
    if (nextCount > 1 && (nextCount - 1) % 3 === 0) {
      console.log(`🎬 [BONUS ROLL] Lancer #${nextCount} → Pub interstitielle (tous les 3 lancers après le 1er)`);

      // Attendre un peu pour que l'utilisateur voie le résultat
      setTimeout(async () => {
        try {
          await showInterstitialAd(`bonus_roll_${nextCount}`);
          console.log('✅ [BONUS ROLL] Pub interstitielle affichée');
        } catch (error) {
          console.error('❌ [BONUS ROLL] Erreur pub interstitielle:', error);
        }
      }, 500);
    }

    // 📊 Incrémenter le compteur
    setRollCount(nextCount);

    return true; // ✅ Autoriser le lancer
  };

  // 🎨 FONCTION APPELÉE QUAND L'UTILISATEUR CLIQUE SUR "NOUVEAU LANCER"
  const handleAfterRoll = () => {
    const newVariation = getRandomVariation();
    setVariation(newVariation);
    console.log(`🎨 [BONUS ROLL] Nouvelle variation: ${newVariation}`);
  };

  // 🔄 FONCTION POUR RESET COMPLET (retour à l'écran Oracle)
  const handleBackToOracle = () => {
    setRollCount(0);
    setHasShownRewardedAd(false);
    const newVariation = getRandomVariation();
    setVariation(newVariation);
    console.log(`🔄 [BONUS ROLL] Reset complet → Variation: ${newVariation}, Compteur: 0`);
  };

  const styles = getVariationStyles(variation, t);

  return (
    <div className="main-content w-full min-h-screen flex flex-col p-2 sm:p-4 pt-14 sm:pt-16 pb-[140px] relative overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033] -z-10">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${styles.particle} rounded-full animate-float`}
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 10 + 's'
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-2 sm:mb-3 relative flex-shrink-0 px-2">
        {/* Badge Premium si applicable */}
        {isPremium && (
          <div className="inline-block mb-2">
            <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 text-purple-900 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
              <span className="flex items-center gap-1">
                👑 {t('premium.badge') || 'Premium'}
              </span>
            </div>
          </div>
        )}

        <div className="inline-block mb-1.5 sm:mb-2">
          <div className={`bg-gradient-to-r ${styles.badge} ${styles.badgeText} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wide shadow-lg animate-pulse max-w-[85vw]`}>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis block">
              {styles.emoji} {styles.name}
            </span>
          </div>
        </div>

        <div className="flex justify-center mb-1.5 sm:mb-2">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <div className={`absolute inset-0 ${styles.glow} rounded-full blur-xl animate-pulse`}></div>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} rounded-full flex items-center justify-center border-2 ${styles.border}`}
              style={{ boxShadow: `0 0 20px ${styles.glowColor}` }}
            >
              <span className="text-xl sm:text-2xl animate-bounce">🎲</span>
            </div>
          </div>
        </div>

        <h1 className={`text-lg sm:text-xl md:text-2xl font-bold font-serif mb-1.5 sm:mb-2 leading-tight px-2
          bg-gradient-to-r ${styles.textGradient} bg-clip-text text-transparent
          drop-shadow-[0_0_15px_${styles.glowColor}] break-words`}>
          {t('oracle.bonusRoll.title')}
        </h1>

        <div className={`text-purple-100 text-[10px] sm:text-xs max-w-md mx-auto px-2 sm:px-3 py-1.5 sm:py-2 ${styles.bgBox} rounded-lg border`}>
          <span className={`font-medium bg-gradient-to-r ${styles.textGradient} bg-clip-text text-transparent break-words leading-snug block`}>
            ✨ {t('oracle.bonusRoll.description')}
          </span>
        </div>


      </div>

      <div className="flex-1 flex items-center justify-center py-2 sm:py-3 min-h-0">
        <div className="w-full max-w-2xl px-1 sm:px-2">
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div
                className={`bg-gradient-to-br ${styles.gradient} rounded-2xl blur-2xl opacity-20 w-[130%] h-[130%]`}
              />
            </div>

            {/* 🎲 Composant BonusRoll avec callbacks */}
            <BonusRoll 
              onComplete={handleComplete}
              variation={variation}
              isPremium={isPremium}
              onBeforeRoll={handleBeforeRoll}
              onAfterRoll={handleAfterRoll}
              onReset={handleBackToOracle}
            />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 pt-2 sm:pt-3 pb-2">
        <div className="flex gap-1.5 sm:gap-2 justify-center max-w-md mx-auto px-2">
          <MysticalButton 
            variant="secondary" 
            onClick={() => {
              handleBackToOracle(); // Reset complet
              onBack(); // Retour à l'écran Oracle
            }}
            className="flex-1 min-h-[40px] sm:min-h-[44px] text-[11px] sm:text-sm font-semibold px-2"
          >
            <span className="break-words block leading-tight">← {t('common.back')}</span>
          </MysticalButton>

          {isComplete && (
            <MysticalButton 
              onClick={() => {
                handleBackToOracle(); // Reset complet
                onBack(); // Retour à l'écran Oracle
              }}
              className={`flex-1 min-h-[40px] sm:min-h-[44px] text-[11px] sm:text-sm font-semibold px-2
                bg-gradient-to-r ${styles.button} ${styles.buttonShadow}`}
            >
              <span className="break-words block leading-tight">{t('oracle.backToOracles') || 'Retour'} →</span>
            </MysticalButton>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}