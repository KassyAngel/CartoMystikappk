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
  const diceContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Ne plus charger la pub automatiquement au mount
  // useEffect supprimé

  const handleStartRoll = async () => {
    setIsLoadingAd(true);

    try {
      // Afficher la pub AVANT de montrer les dés
      await showInterstitialAd();
    } catch (error) {
      console.log("Pub non disponible");
    } finally {
      // Une fois la pub fermée, montrer les dés
      setIsLoadingAd(false);
      setShowDice(true);
    }
  };

  const handleComplete = async (result: { total: number; dice: [number, number]; interpretation: string }) => {
    setIsComplete(true);
    console.log('Tirage bonus complété:', result);
  };

  // ✅ Écran de démarrage (sans barres blanches)
  if (!showDice && !isLoadingAd) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center p-5 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033]">
        {/* Fond animé */}
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

        {/* Contenu */}
        <div className="text-center relative z-10 px-4 max-w-md">
          {/* Badge BONUS */}
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg animate-pulse">
              🎁 BONUS EXCLUSIF
            </div>
          </div>

          {/* Icône centrale */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-[0_0_40px_rgba(251,191,36,0.7)]">
              <span className="text-7xl animate-bounce">🎲</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold font-serif mb-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
            {t('oracle.bonusRoll.title')}
          </h1>

          <p className="text-amber-50 text-lg mb-8 leading-relaxed bg-purple-900/60 py-4 px-6 rounded-xl border border-amber-400/50 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            ✨ <span className="font-semibold text-amber-300">{t('oracle.bonusRoll.description')}</span>
          </p>

          {/* Bouton principal */}
          <MysticalButton 
            onClick={handleStartRoll}
            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-[0_0_30px_rgba(251,191,36,0.6)] transform hover:scale-105 transition-all"
          >
            🎲 {t('oracle.bonusRoll.startButton') || 'Lancer le tirage bonus'}
          </MysticalButton>

          {/* Bouton retour */}
          <button
            onClick={onBack}
            className="mt-4 text-purple-300 hover:text-purple-100 text-sm transition-colors"
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
      <div className="fixed inset-0 flex flex-col items-center justify-center p-5 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033]">
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

        <div className="text-center relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎁</div>
            </div>
          </div>

          <p className="text-amber-300 text-xl font-bold font-serif mb-2 animate-pulse">
            {t('oracle.bonusRoll.loadingAd') || 'Déverrouillage de votre révélation...'}
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

  // ✅ Vue principale avec les dés (DIRECTEMENT après la pub)
  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033] overflow-hidden pb-24">
      {/* Fond animé */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="min-h-full flex flex-col p-4 pt-20">
          {/* Header */}
          <div className="text-center mb-6 relative">
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg animate-pulse">
                🎁 BONUS EXCLUSIF
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                  <span className="text-5xl animate-bounce">🎲</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
              {t('oracle.bonusRoll.title')}
            </h1>

            <p className="text-amber-50 text-base max-w-2xl mx-auto bg-purple-900/60 py-3 px-4 rounded-xl border border-amber-400/50 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              ✨ <span className="font-semibold text-amber-300">{t('oracle.bonusRoll.description')}</span>
            </p>
          </div>

          {/* Composant des dés */}
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full max-w-2xl px-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl pointer-events-none"></div>
                <BonusRoll onComplete={handleComplete} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons navigation fixes en bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a0033] via-[#1a0033]/95 to-transparent pt-4 pb-6 px-4">
        <div className="flex gap-3 justify-center max-w-md mx-auto">
          <MysticalButton 
            variant="secondary" 
            onClick={onBack}
            className="flex-1 min-h-[48px] font-semibold"
          >
            ← {t('common.back')}
          </MysticalButton>

          {isComplete && (
            <MysticalButton 
              onClick={onBack}
              className="flex-1 min-h-[48px] font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
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