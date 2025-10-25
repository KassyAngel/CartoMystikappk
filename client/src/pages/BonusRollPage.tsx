import { useState, useEffect } from 'react';
import MysticalButton from '@/components/MysticalButton';
import BonusRoll from '@/components/BonusRoll';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { showInterstitialAd } from '@/admobService';

interface BonusRollPageProps {
  user: UserSession;
  onBack: () => void;
  onSaveReading?: (reading: any) => void; 
}

export default function BonusRollPage({ user, onBack, onSaveReading }: BonusRollPageProps) {
  const { t } = useLanguage();
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Pub interstitielle au chargement de la page
  useEffect(() => {
    const loadAd = async () => {
      try {
        await showInterstitialAd();
      } catch (error) {
        console.log("Pub non disponible au chargement");
      } finally {
        setIsLoading(false);
      }
    };

    loadAd();
  }, []);

  const handleComplete = async (result: { total: number; dice: [number, number]; interpretation: string }) => {
    setIsComplete(true);

    // ✅ Pas de sauvegarde dans le grimoire pour le tirage bonus
    console.log('Tirage bonus complété:', result);
  };

  if (isLoading) {
    return (
      <div className="main-content w-full min-h-screen flex flex-col items-center justify-center p-5">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#ffd700] mb-4"></div>
          <p className="text-[#ffd700] text-lg font-semibold animate-pulse">
            {t('oracle.bonusRoll.loadingAd')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content w-full min-h-screen flex flex-col p-3 sm:p-5 pt-16 sm:pt-20 pb-6">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex justify-center mb-2 sm:mb-3">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl animate-bounce">🎁</span>
            </div>
          </div>
        </div>

        <h1 className="mystical-title text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-2 sm:mb-3 text-amber-300 leading-tight px-2">
          {t('oracle.bonusRoll.title')}
        </h1>
        <p className="text-purple-200 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed px-3">
          {t('oracle.bonusRoll.description')}
        </p>

        {/* Séparateur décoratif */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <span className="text-amber-300/60 text-lg">✦</span>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>
      </div>

      {/* Composant des dés - Centré */}
      <div className="flex-1 flex items-center justify-center py-2 sm:py-4">
        <div className="w-full max-w-2xl px-2 sm:px-4">
          <BonusRoll onComplete={handleComplete} />
        </div>
      </div>

      {/* Boutons navigation */}
      <div className="mt-4 sm:mt-6 pb-2 sm:pb-4">
        <div className="flex gap-2 sm:gap-3 justify-center max-w-md mx-auto px-3">
          <MysticalButton 
            variant="secondary" 
            onClick={onBack}
            className="flex-1 min-h-[44px] text-sm sm:text-base"
          >
            ← {t('common.back')}
          </MysticalButton>

          {isComplete && (
            <MysticalButton 
              onClick={onBack}
              className="flex-1 min-h-[44px] text-sm sm:text-base"
            >
              {t('oracle.backToOracles') || 'Retour aux oracles'} →
            </MysticalButton>
          )}
        </div>
      </div>
    </div>
  );
}