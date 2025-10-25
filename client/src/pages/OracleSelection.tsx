import { useState } from 'react';
import OracleCard from '@/components/OracleCard';
import MysticalButton from '@/components/MysticalButton';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { hasUsedDailyReading } from '@/lib/dailyLimit';

interface OracleSelectionProps {
  user: UserSession;
  onOracleSelect: (oracleType: string) => void;
  onBack: () => void;
  onHome: () => void;
}

export default function OracleSelection({ 
  user, 
  onOracleSelect, 
  onBack, 
  onHome
}: OracleSelectionProps) {
  const [selectedOracle, setSelectedOracle] = useState('');
  const { t } = useLanguage();
  const playFlipSound = useSound('Flip-card.wav');
  const hasDoneDaily = hasUsedDailyReading();

  // ✅ Oracles normaux (sans le bonus)
  const oracles = [
    ...(!hasDoneDaily ? [{
      id: 'daily',
      title: t('oracle.daily.title'),
      description: t('oracle.daily.description'),
      icon: '☀️'
    }] : []),
    ...(hasDoneDaily ? [{
      id: 'crystalBall',
      title: t('oracle.crystalBall.title'),
      description: t('oracle.crystalBall.description'),
      icon: '🔮'
    }] : []),
    {
      id: 'tarot',
      title: t('oracle.tarot.title'),
      description: t('oracle.tarot.description'),
      icon: '🌟'
    },
    {
      id: 'angels',
      title: t('oracle.angels.title'),
      description: t('oracle.angels.description'),
      icon: '👼'
    },
    {
      id: 'horoscope',
      title: t('oracle.horoscope.title'),
      description: t('oracle.horoscope.description'),
      icon: '♈'
    }
  ];

  const handleOracleClick = (oracleId: string) => {
    playFlipSound();
    setSelectedOracle(oracleId);

    setTimeout(() => {
      onOracleSelect(oracleId);
    }, 500);
  };

  return (
    <div className="main-content w-full min-h-screen flex flex-col p-2 sm:p-3 pt-14 sm:pt-16 pb-3">
      {/* Header ultra-compact */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="flex justify-center mb-1.5 sm:mb-2">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                ✦
              </span>
            </div>
          </div>
        </div>

        <p className="text-purple-200 text-xs sm:text-sm md:text-base max-w-lg mx-auto font-light leading-tight px-2">
          {t('oracle.subtitle')}
        </p>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <span className="text-amber-300/60 text-sm">✦</span>
          <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>
      </div>

      {/* Grille des cartes */}
      <div className="flex-1 flex items-center justify-center py-1 sm:py-2">
        <div className="w-full max-w-4xl px-1 sm:px-2">
          {/* ✅ Grille principale des oracles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 mb-4">
            {oracles.map((oracle) => (
              <OracleCard
                key={oracle.id}
                title={oracle.title}
                description={oracle.description}
                icon={oracle.icon}
                isSelected={selectedOracle === oracle.id}
                onClick={() => handleOracleClick(oracle.id)}
              />
            ))}
          </div>

          {/* ✅ BONUS ROLL - Carte spéciale mise en évidence */}
          <div className="relative mt-6">
            {/* Badge BONUS flottant */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                🎁 BONUS
              </div>
            </div>

            {/* Effet de lueur animée */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 rounded-2xl blur-xl animate-pulse"></div>

            {/* Carte Bonus */}
            <button
              onClick={() => handleOracleClick('bonusRoll')}
              className={`relative w-full p-4 rounded-2xl
                bg-gradient-to-br from-amber-600 via-yellow-500 to-orange-600
                hover:from-amber-500 hover:via-yellow-400 hover:to-orange-500
                border-3 border-yellow-300
                shadow-[0_0_30px_rgba(251,191,36,0.5),inset_0_2px_8px_rgba(255,255,255,0.3)]
                hover:shadow-[0_0_50px_rgba(251,191,36,0.8),inset_0_2px_8px_rgba(255,255,255,0.5)]
                transform hover:scale-105
                transition-all duration-300
                group overflow-hidden
                ${selectedOracle === 'bonusRoll' ? 'scale-105 ring-4 ring-yellow-300' : ''}`}
            >
              {/* Effet brillant animé */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              {/* Contenu */}
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-3xl animate-bounce">🎲</span>
                <div className="text-left flex-1">
                  <div className="text-white font-bold text-base sm:text-lg drop-shadow-lg">
                    {t('oracle.bonusRoll.title')}
                  </div>
                  <div className="text-yellow-100 text-xs font-medium">
                    {t('oracle.bonusRoll.description')}
                  </div>
                </div>
                <span className="text-2xl">✨</span>
              </div>

              {/* Particules décoratives */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full animate-ping opacity-75" style={{animationDelay: '150ms'}}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Boutons navigation */}
      <div className="text-center pt-2">
        <div className="flex gap-1.5 sm:gap-2 justify-center max-w-xs sm:max-w-sm mx-auto px-2">
          <MysticalButton 
            variant="secondary" 
            onClick={onBack}
            className="flex-1 min-h-[42px] text-xs sm:text-sm px-2 sm:px-3"
          >
            ← {t('oracle.back')}
          </MysticalButton>
          <MysticalButton 
            onClick={onHome} 
            data-testid="button-home"
            className="flex-1 min-h-[42px] text-xs sm:text-sm px-2 sm:px-3"
          >
            🏠 {t('oracle.home')}
          </MysticalButton>
        </div>
      </div>
    </div>
  );
}