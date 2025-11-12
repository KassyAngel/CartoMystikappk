import { useState, useEffect, useRef } from 'react';
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
  const [showDice, setShowDice] = useState(false);
  const [isLoadingAd, setIsLoadingAd] = useState(false);

  const handleStartRoll = async () => {
    // ✅ Animation de transition avec le loader
    setIsLoadingAd(true);
    console.log('🎯 Démarrage du Bonus Roll - Animation de déverrouillage');

    // Petit délai pour l'animation (1.5 secondes)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoadingAd(false);
    setShowDice(true);
  };

  const handleComplete = async (result: { total: number; dice: [number, number]; interpretation: string }) => {
    setIsComplete(true);
    console.log('Tirage bonus complété:', result);
  };

  // ✅ Écran de démarrage
  if (!showDice && !isLoadingAd) {
    return (
      <div className="main-content w-full min-h-screen flex flex-col items-center justify-center p-4 pb-24 relative overflow-x-hidden overflow-y-auto">
        {/* Fond animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033]">
          <div className="absolute inset-0 opacity-20">
            {[...Array(30)].map((_, i) => (
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

        {/* Contenu */}
        <div className="text-center relative z-10 px-3 w-full max-w-md">
          {/* Badge BONUS - Texte adaptatif */}
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide shadow-lg animate-pulse max-w-[90vw]">
              <span className="whitespace-nowrap overflow-hidden text-ellipsis block">
                🎁 {t('oracle.bonusRoll.exclusiveBadge') || 'BONUS EXCLUSIF'}
              </span>
            </div>
          </div>

          {/* Icône centrale */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-3 sm:border-4 border-yellow-300 shadow-[0_0_40px_rgba(251,191,36,0.7)]">
              <span className="text-5xl sm:text-6xl animate-bounce">🎲</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif mb-3 sm:mb-4 leading-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] px-2 break-words">
            {t('oracle.bonusRoll.title')}
          </h1>

          <div className="text-amber-50 text-xs sm:text-sm mb-4 sm:mb-6 leading-snug sm:leading-relaxed bg-purple-900/60 py-2.5 sm:py-3 px-2.5 sm:px-3 rounded-lg sm:rounded-xl border border-amber-400/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] min-h-[60px] sm:min-h-[70px] flex items-center justify-center">
            <p className="text-center break-words">
              ✨ <span className="font-semibold text-amber-300">{t('oracle.bonusRoll.description')}</span>
            </p>
          </div>

          {/* Bouton avec texte qui s'adapte */}
          <MysticalButton 
            onClick={handleStartRoll}
            className="w-full py-2.5 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-[0_0_30px_rgba(251,191,36,0.6)] transform hover:scale-105 transition-all min-h-[48px] sm:min-h-[52px] flex items-center justify-center"
          >
            <span className="text-center leading-tight break-words block max-w-full">
               {t('oracle.bonusRoll.startButton') || 'Débloquer le Tirage Bonus'}
            </span>
          </MysticalButton>

          {/* Bouton retour */}
          <button
            onClick={onBack}
            className="mt-3 sm:mt-4 text-purple-300 hover:text-purple-100 text-xs sm:text-sm transition-colors"
          >
            ← {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  // ✅ Loader pendant la pub
  if (isLoadingAd) {
    return (
      <div className="main-content w-full min-h-screen flex flex-col items-center justify-center p-5 relative overflow-hidden">
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

        <div className="text-center relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎁</div>
            </div>
          </div>

          <p className="text-amber-300 text-xl font-bold font-serif mb-2 animate-pulse">
            {t('oracle.bonusRoll.loadingAd') || 'Déverrouillage...'}
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

  // ✅ Vue principale avec les dés - Scrollable verticalement uniquement
  return (
    <div className="main-content w-full min-h-screen flex flex-col p-2 sm:p-4 pt-14 sm:pt-16 pb-[140px] relative overflow-x-hidden overflow-y-auto">
      {/* Fond amélioré avec effet de particules */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033] -z-10">
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

      {/* Header compact */}
      <div className="text-center mb-2 sm:mb-3 relative flex-shrink-0 px-2">
        {/* Badge BONUS - Texte court adaptatif */}
        <div className="inline-block mb-1.5 sm:mb-2">
          <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wide shadow-lg animate-pulse max-w-[85vw]">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis block">
              🎁 {t('oracle.bonusRoll.exclusiveBadge') || 'BONUS'}
            </span>
          </div>
        </div>

        {/* Icône centrale */}
        <div className="flex justify-center mb-1.5 sm:mb-2">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.6)]">
              <span className="text-xl sm:text-2xl animate-bounce">🎲</span>
            </div>
          </div>
        </div>

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-serif mb-1.5 sm:mb-2 leading-tight px-2
          bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent
          drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] break-words">
          {t('oracle.bonusRoll.title')}
        </h1>

        <div className="text-purple-100 text-[10px] sm:text-xs max-w-md mx-auto px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-900/60 rounded-lg border border-amber-400/30">
          <span className="font-medium text-amber-300 break-words leading-snug block">
            ✨ {t('oracle.bonusRoll.description')}
          </span>
        </div>
      </div>

      {/* Composant des dés - Centré et adaptatif */}
      <div className="flex-1 flex items-center justify-center py-2 sm:py-3 min-h-0">
        <div className="w-full max-w-2xl px-1 sm:px-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
            <BonusRoll onComplete={handleComplete} />
          </div>
        </div>
      </div>

      {/* Boutons navigation - Fixés en bas avec texte adaptatif */}
      <div className="flex-shrink-0 pt-2 sm:pt-3 pb-2">
        <div className="flex gap-1.5 sm:gap-2 justify-center max-w-md mx-auto px-2">
          <MysticalButton 
            variant="secondary" 
            onClick={onBack}
            className="flex-1 min-h-[40px] sm:min-h-[44px] text-[11px] sm:text-sm font-semibold px-2"
          >
            <span className="break-words block leading-tight">← {t('common.back')}</span>
          </MysticalButton>

          {isComplete && (
            <MysticalButton 
              onClick={onBack}
              className="flex-1 min-h-[40px] sm:min-h-[44px] text-[11px] sm:text-sm font-semibold px-2
                bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500
                shadow-[0_0_20px_rgba(251,191,36,0.5)]"
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