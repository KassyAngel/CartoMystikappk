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
    console.log('Tirage bonus complété:', result);
  };

  if (isLoading) {
    return (
      <div className="main-content w-full min-h-screen flex flex-col items-center justify-center p-5 relative overflow-hidden">
        {/* Fond animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033]">
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-amber-400 rounded-full animate-pulse"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 2 + 's',
                  animationDuration: Math.random() * 3 + 2 + 's'
                }}
              />
            ))}
          </div>
        </div>

        {/* Contenu du loader */}
        <div className="text-center relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎁</div>
            </div>
          </div>

          <p className="text-amber-300 text-xl font-bold font-serif mb-2 animate-pulse">
            {t('oracle.bonusRoll.loadingAd')}
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
            <span className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content w-full min-h-screen flex flex-col p-2 sm:p-5 pt-14 sm:pt-20 pb-4 relative overflow-hidden">
      {/* Fond amélioré avec effet de particules */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033] -z-10">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-amber-400 rounded-full animate-float"
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

      {/* Header amélioré */}
      <div className="text-center mb-6 sm:mb-8 relative">
        {/* Badge BONUS flottant */}
        <div className="inline-block mb-4">
          <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide sm:tracking-wider shadow-lg animate-pulse">
            🎁 BONUS EXCLUSIF
          </div>
        </div>

        {/* Icône centrale avec effet */}
        <div className="flex justify-center mb-4">
          <div className="relative w-12 h-12 sm:w-20 sm:h-20">
            <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-[0_0_30px_rgba(251,191,36,0.6)]">
              <span className="text-3xl sm:text-5xl animate-bounce">🎲</span>
            </div>
          </div>
        </div>

        <h1 className="mystical-title text-2xl sm:text-4xl md:text-5xl font-bold font-serif mb-2 sm:mb-3 leading-tight px-2
          bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent
          drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
          {t('oracle.bonusRoll.title')}
        </h1>

        <p className="text-purple-200 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-snug sm:leading-relaxed px-3 sm:px-4
          bg-purple-900/30 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-amber-400/30 backdrop-blur-sm">
          ✨ {t('oracle.bonusRoll.description')}
        </p>

        {/* Séparateur décoratif amélioré */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-5">
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-400"></div>
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/30 blur-lg"></div>
            <span className="relative text-amber-300 text-2xl">✦</span>
          </div>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-400"></div>
        </div>
      </div>

      {/* Composant des dés - Centré avec cadre */}
      <div className="flex-1 flex items-center justify-center py-2 sm:py-4">
        <div className="w-full max-w-2xl px-1 sm:px-4">
          <div className="relative">
            {/* Effet de lueur autour du composant */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
            <BonusRoll onComplete={handleComplete} />
          </div>
        </div>
      </div>

      {/* Boutons navigation améliorés */}
      <div className="mt-4 sm:mt-6 pb-3 sm:pb-4">
        <div className="flex gap-2 sm:gap-3 justify-center max-w-md mx-auto px-2 sm:px-3">
          <MysticalButton 
            variant="secondary" 
            onClick={onBack}
            className="flex-1 min-h-[48px] text-sm sm:text-base font-semibold"
          >
            ← {t('common.back')}
          </MysticalButton>

          {isComplete && (
            <MysticalButton 
              onClick={onBack}
              className="flex-1 min-h-[48px] text-sm sm:text-base font-semibold
                bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500
                shadow-[0_0_20px_rgba(251,191,36,0.5)]"
            >
              {t('oracle.backToOracles') || 'Retour'} →
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