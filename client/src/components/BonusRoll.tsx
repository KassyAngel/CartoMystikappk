import React, { useState } from 'react';
import MysticalButton from './MysticalButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface BonusRollProps {
  onComplete?: (result: { total: number; dice: [number, number]; interpretation: string }) => void;
  variation: string | null;
  onReset?: () => void; // ⚠️ Utilisé uniquement pour le bouton "Retour" (reset complet)
  isPremium?: boolean;
  onBeforeRoll?: () => Promise<boolean>; // ✅ Callback AVANT le lancer (gestion des pubs)
  onAfterRoll?: () => void; // ✅ Callback pour "Nouveau lancer" (changement de couleur)
}

const getDiceStyles = (variation: string | null) => {
  switch (variation) {
    case '1':
      return {
        gradient: 'from-[#fbbf24] via-[#fcd34d] to-[#fde68a]',
        border: 'border-[#ffd700]',
        shadow: 'shadow-[0_6px_24px_rgba(251,191,36,0.5),inset_0_2px_6px_rgba(255,255,255,0.3)]',
        hoverShadow: 'hover:shadow-[0_8px_32px_rgba(255,215,0,0.6)]',
        totalBg: 'from-[#ffd700] via-[#fbbf24] to-[#f59e0b]',
        totalBorder: 'border-white',
        totalShadow: 'shadow-[0_8px_32px_rgba(255,215,0,0.8),inset_0_2px_6px_rgba(255,255,255,0.5)]'
      };
    case '2':
      return {
        gradient: 'from-[#22d3ee] via-[#67e8f9] to-[#a5f3fc]',
        border: 'border-[#22d3ee]',
        shadow: 'shadow-[0_6px_24px_rgba(34,211,238,0.5),inset_0_2px_6px_rgba(255,255,255,0.3)]',
        hoverShadow: 'hover:shadow-[0_8px_32px_rgba(34,211,238,0.6)]',
        totalBg: 'from-[#22d3ee] via-[#06b6d4] to-[#0891b2]',
        totalBorder: 'border-cyan-100',
        totalShadow: 'shadow-[0_8px_32px_rgba(34,211,238,0.8),inset_0_2px_6px_rgba(255,255,255,0.5)]'
      };
    case '3':
      return {
        gradient: 'from-[#a855f7] via-[#c084fc] to-[#e879f9]',
        border: 'border-[#e879f9]',
        shadow: 'shadow-[0_6px_24px_rgba(168,85,247,0.5),inset_0_2px_6px_rgba(255,255,255,0.3)]',
        hoverShadow: 'hover:shadow-[0_8px_32px_rgba(232,121,249,0.6)]',
        totalBg: 'from-[#a855f7] via-[#9333ea] to-[#7e22ce]',
        totalBorder: 'border-fuchsia-200',
        totalShadow: 'shadow-[0_8px_32px_rgba(168,85,247,0.8),inset_0_2px_6px_rgba(255,255,255,0.5)]'
      };
    default:
      return {
        gradient: 'from-[#fbbf24] via-[#fcd34d] to-[#fde68a]',
        border: 'border-[#ffd700]',
        shadow: 'shadow-[0_6px_24px_rgba(251,191,36,0.5),inset_0_2px_6px_rgba(255,255,255,0.3)]',
        hoverShadow: 'hover:shadow-[0_8px_32px_rgba(255,215,0,0.6)]',
        totalBg: 'from-[#ffd700] via-[#fbbf24] to-[#f59e0b]',
        totalBorder: 'border-white',
        totalShadow: 'shadow-[0_8px_32px_rgba(255,215,0,0.8),inset_0_2px_6px_rgba(255,255,255,0.5)]'
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
  const [message, setMessage] = useState(t('oracle.bonusRoll.ready'));
  const [interpretation, setInterpretation] = useState<{ title: string; message: string } | null>(null);
  const [isLoadingAd, setIsLoadingAd] = useState(false);

  const diceStyles = getDiceStyles(variation);

  async function rollDice() {
    if (rolling || isLoadingAd) {
      console.log('⏳ [BONUS ROLL] Lancer en cours ou pub active, ignoré');
      return;
    }

    // 🎁 ÉTAPE 1 : Appeler le callback AVANT le lancer (gestion des pubs)
    if (onBeforeRoll) {
      setIsLoadingAd(true);
      setMessage(t('oracle.bonusRoll.loadingAd') || '⏳ Chargement...');

      const canRoll = await onBeforeRoll();

      setIsLoadingAd(false);

      if (!canRoll) {
        console.log('❌ [BONUS ROLL] Lancer bloqué par onBeforeRoll');
        setMessage(t('oracle.bonusRoll.ready'));
        return; // ❌ Bloquer le lancer si la pub a échoué
      }
    }

    // 🎲 ÉTAPE 2 : Lancer les dés
    setRolling(true);
    setMessage(t('oracle.bonusRoll.rolling'));

    let rolls = 0;
    const maxRolls = 20;

    const interval = setInterval(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDice([d1, d2]);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(interval);
        const sum = d1 + d2;

        const currentVariation = variation || '1';
        console.log(`🎲 [BONUS ROLL] Résultat: ${sum} (variation: ${currentVariation})`);

        const title = t(`oracle.bonusRoll.${sum}.title.${currentVariation}`) || '✨ Mystère Cosmique';
        const interpretationMessage = t(`oracle.bonusRoll.${sum}.message.${currentVariation}`) || 'Les étoiles vous réservent une surprise...';

        const result = { title, message: interpretationMessage };

        setInterpretation(result);
        setMessage(`${t('oracle.bonusRoll.result')} : ${sum}`);
        setRolling(false);
        setHasRolled(true);

        if (onComplete) {
          onComplete({
            total: sum,
            dice: [d1, d2],
            interpretation: `${result.title}\n\n${result.message}`,
          });
        }

        // ✅ NE PAS changer la couleur ici, on attend le clic sur "Nouveau lancer"
      }
    }, 80);
  }

  const renderDiceDots = (value: number) => {
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
      <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-0.5 sm:gap-1 p-1.5 sm:p-2">
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
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-white rounded-full shadow-lg" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bonus-roll-container w-full h-full flex flex-col p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-2 border-[#ffd700] shadow-2xl overflow-hidden">
      <div className="text-center mb-2 sm:mb-3 flex-shrink-0">
        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-[#ffd700] font-serif mb-1 flex items-center justify-center gap-1 sm:gap-1.5">
          🎁 {t('oracle.bonusRoll.title')}
        </h3>
        <p className="text-[#b19cd9] text-xs sm:text-sm leading-snug px-2">
          {!hasRolled ? t('oracle.bonusRoll.description') : t('oracle.bonusRoll.cosmicMessage')}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden min-h-0">
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 flex-shrink-0">
          <div
            className={`dice-3d w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl
            bg-gradient-to-br ${diceStyles.gradient}
            flex items-center justify-center flex-shrink-0
            border-2 sm:border-3 md:border-4 ${diceStyles.border}
            ${diceStyles.shadow}
            ${rolling ? 'animate-shake-3d' : 'hover:scale-105 transition-all duration-300'}
            ${!hasRolled && !rolling && !isLoadingAd ? `cursor-pointer ${diceStyles.hoverShadow}` : ''}
            relative overflow-hidden`}
            onClick={!hasRolled ? rollDice : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl" />
            {renderDiceDots(dice[0])}
          </div>

          <div className="text-[#ffd700] text-xl sm:text-2xl md:text-3xl font-bold animate-pulse drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] flex-shrink-0">
            +
          </div>

          <div
            className={`dice-3d w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl
            bg-gradient-to-br ${diceStyles.gradient}
            flex items-center justify-center flex-shrink-0
            border-2 sm:border-3 md:border-4 ${diceStyles.border}
            ${diceStyles.shadow}
            ${rolling ? 'animate-shake-3d' : 'hover:scale-105 transition-all duration-300'}
            ${!hasRolled && !rolling && !isLoadingAd ? `cursor-pointer ${diceStyles.hoverShadow}` : ''}
            relative overflow-hidden`}
            onClick={!hasRolled ? rollDice : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl" />
            {renderDiceDots(dice[1])}
          </div>

          {hasRolled && (
            <>
              <div className="text-[#ffd700] text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] flex-shrink-0">
                =
              </div>
              <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl
              bg-gradient-to-br ${diceStyles.totalBg}
              flex items-center justify-center text-[#1a0033] font-bold text-2xl sm:text-3xl md:text-4xl
              border-2 sm:border-3 md:border-4 ${diceStyles.totalBorder} flex-shrink-0
              ${diceStyles.totalShadow}
              animate-bounce-in-3d
              relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg sm:rounded-xl" />
                <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {dice[0] + dice[1]}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="text-center px-2 sm:px-3 w-full max-w-lg flex-shrink-0">
          <p className="text-[#ffd700] font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 break-words leading-tight">
            {message}
          </p>

          {interpretation && (
            <div className="mt-2 sm:mt-3 p-2 sm:p-3 md:p-4 bg-gradient-to-br from-[#2d1b69] to-[#1a0033] rounded-lg sm:rounded-xl border border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.3)] backdrop-blur-sm mx-auto w-full animate-fade-in-scale">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <span className="text-xl sm:text-2xl animate-pulse">🎁</span>
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#ffd700] leading-tight break-words text-center drop-shadow-[0_2px_6px_rgba(255,215,0,0.5)] max-w-[200px] sm:max-w-none">
                  {interpretation.title}
                </h4>
                <span className="text-xl sm:text-2xl animate-pulse">✨</span>
              </div>
              <div className="bg-[#1a0033]/50 rounded-md sm:rounded-lg p-2 sm:p-3 border border-[#ffd700]/30">
                <p className="text-[#e9d5ff] text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed break-words text-center font-medium">
                  {interpretation.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 pt-2 sm:pt-3">
        {!hasRolled && !rolling && !isLoadingAd && (
          <div className="text-center px-2">
            <MysticalButton
              onClick={rollDice}
              className="w-full text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
            >
              {t('oracle.bonusRoll.rollButton')}
            </MysticalButton>
          </div>
        )}

        {hasRolled && (
          <div className="text-center px-2">
            <MysticalButton
              variant="secondary"
              onClick={() => {
                setHasRolled(false);
                setInterpretation(null);
                setDice([1, 1]);
                setMessage(t('oracle.bonusRoll.ready'));

                // 🎨 Changer la couleur au moment du "Nouveau lancer"
                if (onAfterRoll) {
                  onAfterRoll();
                }

                // ⚠️ NE PAS appeler onReset() ici (il reset le compteur de pubs)
              }}
              className="w-full text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
            >
              {t('oracle.bonusRoll.newRoll')}
            </MysticalButton>
          </div>
        )}

        {isLoadingAd && (
          <div className="text-center py-2">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#ffd700]"></div>
            <p className="text-[#ffd700] text-xs mt-2">
              {isPremium ? 'Préparation...' : 'Chargement de la publicité...'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        .bonus-roll-container {
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
        }

        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(15px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes shake-3d {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          10% { transform: translateX(-2px) translateY(-2px) rotate(-2deg); }
          20% { transform: translateX(2px) translateY(2px) rotate(2deg); }
          30% { transform: translateX(-2px) translateY(2px) rotate(-2deg); }
          40% { transform: translateX(2px) translateY(-2px) rotate(2deg); }
          50% { transform: translateX(-2px) translateY(-2px) rotate(-2deg); }
          60% { transform: translateX(2px) translateY(2px) rotate(2deg); }
          70% { transform: translateX(-2px) translateY(2px) rotate(-2deg); }
          80% { transform: translateX(2px) translateY(-2px) rotate(2deg); }
          90% { transform: translateX(-2px) translateY(-2px) rotate(-2deg); }
        }
        .animate-shake-3d {
          animation: shake-3d 0.15s ease-in-out infinite;
        }

        @keyframes bounce-in-3d {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.25) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: scale(0.95) rotate(270deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        .animate-bounce-in-3d {
          animation: bounce-in-3d 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .dice-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .dice-3d:hover:not(.animate-shake-3d) {
          transform: rotateX(8deg) rotateY(-8deg) scale(1.05);
        }
      `}</style>
    </div>
  );
}