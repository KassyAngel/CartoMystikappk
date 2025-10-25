import React, { useState } from 'react';
import { showInterstitialAd } from '@/admobService';
import MysticalButton from './MysticalButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface BonusRollProps {
  onComplete?: (result: { total: number; dice: [number, number]; interpretation: string }) => void;
}

export default function BonusRoll({ onComplete }: BonusRollProps) {
  const { t } = useLanguage();
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [message, setMessage] = useState(t('oracle.bonusRoll.ready'));
  const [interpretation, setInterpretation] = useState<{ title: string; message: string } | null>(null);
  const [isLoadingAd, setIsLoadingAd] = useState(false);
  const [rollCount, setRollCount] = useState(0); // Compteur de tirages

  const getRandomVariation = () => Math.random() < 0.5 ? '1' : '2';

  async function rollDice() {
    if (rolling || isLoadingAd) return;

    // Incrémenter le compteur de tirages
    const newRollCount = rollCount + 1;
    setRollCount(newRollCount);

    // Pub tous les 2 tirages (2, 4, 6, etc.)
    if (newRollCount % 2 === 0) {
      setIsLoadingAd(true);
      setMessage(t('oracle.bonusRoll.loadingAd'));

      try {
        await showInterstitialAd();
      } catch (error) {
        console.log("Pub non disponible, on continue quand même");
      }

      setIsLoadingAd(false);
    }

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

        const variation = getRandomVariation();
        const title = t(`oracle.bonusRoll.${sum}.title.${variation}`) || "✨ Mystère Cosmique";
        const interpretationMessage = t(`oracle.bonusRoll.${sum}.message.${variation}`) || "Les étoiles vous réservent une surprise...";

        const result = { title, message: interpretationMessage };

        setInterpretation(result);
        setMessage(`${t('oracle.bonusRoll.result')} : ${sum}`);
        setRolling(false);
        setHasRolled(true);

        if (onComplete) {
          onComplete({
            total: sum,
            dice: [d1, d2],
            interpretation: `${result.title}\n\n${result.message}`
          });
        }
      }
    }, 80);
  }

  // Fonction pour afficher les points sur le dé
  const renderDiceDots = (value: number) => {
    const dotPositions: Record<number, string[]> = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };

    const positions = dotPositions[value] || [];

    return (
      <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-1 p-2">
        {positions.map((pos, idx) => {
          const positionClass = {
            'top-left': 'col-start-1 row-start-1',
            'top-right': 'col-start-3 row-start-1',
            'middle-left': 'col-start-1 row-start-2',
            'center': 'col-start-2 row-start-2',
            'middle-right': 'col-start-3 row-start-2',
            'bottom-left': 'col-start-1 row-start-3',
            'bottom-right': 'col-start-3 row-start-3'
          }[pos];

          return (
            <div
              key={idx}
              className={`${positionClass} flex items-center justify-center`}
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-white rounded-full shadow-lg" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bonus-roll-container p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-2 border-[#ffd700] shadow-2xl">

      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#ffd700] font-serif mb-1 sm:mb-2 flex items-center justify-center gap-2">
          🎁 {t('oracle.bonusRoll.title')}
        </h3>
        <p className="text-[#b19cd9] text-xs sm:text-sm leading-tight px-2">
          {!hasRolled ? t('oracle.bonusRoll.description') : t('oracle.bonusRoll.cosmicMessage')}
        </p>
      </div>

      {/* Dés avec design 3D amélioré */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
        {/* Dé 1 */}
        <div
          className={`dice-3d w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl
            bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#c4b5fd]
            flex items-center justify-center
            border-4 border-[#ffd700]
            shadow-[0_8px_32px_rgba(139,92,246,0.5),inset_0_2px_8px_rgba(255,255,255,0.3)]
            ${rolling ? 'animate-shake-3d' : 'hover:scale-110 transition-all duration-300'}
            ${!hasRolled && !rolling && !isLoadingAd ? 'cursor-pointer hover:shadow-[0_12px_40px_rgba(255,215,0,0.6)]' : ''}
            relative overflow-hidden`}
          onClick={!hasRolled ? rollDice : undefined}
        >
          {/* Reflet brillant */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl" />
          {renderDiceDots(dice[0])}
        </div>

        <div className="text-[#ffd700] text-3xl sm:text-4xl md:text-5xl font-bold animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
          +
        </div>

        {/* Dé 2 */}
        <div
          className={`dice-3d w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl
            bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#c4b5fd]
            flex items-center justify-center
            border-4 border-[#ffd700]
            shadow-[0_8px_32px_rgba(139,92,246,0.5),inset_0_2px_8px_rgba(255,255,255,0.3)]
            ${rolling ? 'animate-shake-3d' : 'hover:scale-110 transition-all duration-300'}
            ${!hasRolled && !rolling && !isLoadingAd ? 'cursor-pointer hover:shadow-[0_12px_40px_rgba(255,215,0,0.6)]' : ''}
            relative overflow-hidden`}
          onClick={!hasRolled ? rollDice : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl sm:rounded-2xl" />
          {renderDiceDots(dice[1])}
        </div>

        {/* Résultat */}
        {hasRolled && (
          <>
            <div className="text-[#ffd700] text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
              =
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl
              bg-gradient-to-br from-[#ffd700] via-[#fbbf24] to-[#f59e0b]
              flex items-center justify-center text-[#1a0033] font-bold text-4xl sm:text-5xl md:text-6xl
              border-4 border-white
              shadow-[0_12px_48px_rgba(255,215,0,0.8),inset_0_2px_8px_rgba(255,255,255,0.5)]
              animate-bounce-in-3d
              relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl sm:rounded-2xl" />
              <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {dice[0] + dice[1]}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Message et interprétation */}
      <div className="text-center mb-4">
        <p className="text-[#ffd700] font-semibold text-base sm:text-lg mb-2">{message}</p>

        {interpretation && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#1a0033] rounded-xl border border-[#7b5dcf] backdrop-blur-sm">
            <h4 className="text-lg sm:text-xl font-bold text-[#ffd700] mb-2 leading-tight">
              {interpretation.title}
            </h4>
            <p className="text-[#b19cd9] text-sm sm:text-base leading-relaxed">
              {interpretation.message}
            </p>
          </div>
        )}
      </div>

      {/* Boutons */}
      {!hasRolled && !rolling && !isLoadingAd && (
        <div className="text-center">
          <MysticalButton 
            onClick={rollDice}
            className="w-full sm:w-auto text-sm sm:text-base min-h-[44px]"
          >
            {t('oracle.bonusRoll.rollButton')}
          </MysticalButton>
        </div>
      )}

      {hasRolled && (
        <div className="text-center">
          <MysticalButton 
            variant="secondary" 
            onClick={() => {
              setHasRolled(false);
              setInterpretation(null);
              setDice([1, 1]);
              setMessage(t('oracle.bonusRoll.ready'));
            }}
            className="w-full sm:w-auto text-sm sm:text-base min-h-[44px]"
          >
            {t('oracle.bonusRoll.newRoll')}
          </MysticalButton>
        </div>
      )}

      {isLoadingAd && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd700]"></div>
        </div>
      )}

      <style>{`
        @keyframes shake-3d {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          10% { transform: translateX(-3px) translateY(-3px) rotate(-3deg); }
          20% { transform: translateX(3px) translateY(3px) rotate(3deg); }
          30% { transform: translateX(-3px) translateY(3px) rotate(-3deg); }
          40% { transform: translateX(3px) translateY(-3px) rotate(3deg); }
          50% { transform: translateX(-3px) translateY(-3px) rotate(-3deg); }
          60% { transform: translateX(3px) translateY(3px) rotate(3deg); }
          70% { transform: translateX(-3px) translateY(3px) rotate(-3deg); }
          80% { transform: translateX(3px) translateY(-3px) rotate(3deg); }
          90% { transform: translateX(-3px) translateY(-3px) rotate(-3deg); }
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
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: scale(0.9) rotate(270deg);
          }
          100% { 
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        .animate-bounce-in-3d {
          animation: bounce-in-3d 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .dice-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .dice-3d:hover {
          transform: rotateX(10deg) rotateY(-10deg) scale(1.1);
        }
      `}</style>
    </div>
  );
}