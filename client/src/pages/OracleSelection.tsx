import { useState } from 'react';
import OracleCard from '@/components/OracleCard';
import MysticalButton from '@/components/MysticalButton';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { hasUsedDailyReading } from '@/lib/dailyLimit';
import { getSavedLanguage } from '@/lib/userStorage';
import { config } from '@/config';

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

  const checkPremiumStatus = async () => {
    try {
      const savedEmail = await getSavedLanguage();

      const response = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
        credentials: 'include',
        headers: savedEmail ? { 'x-user-email': savedEmail } : {},
      });

      if (!response.ok) {
        console.error("Failed to check premium status");
        return false;
      }
      const data = await response.json();
      return data.isPremium;
    } catch (error) {
      console.error("Error checking premium status:", error);
      return false;
    }
  };

  return (
      <div className="main-content w-full min-h-screen flex flex-col p-2 sm:p-3 pt-14 sm:pt-16 pb-safe">
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
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-purple-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
                🎁 BONUS
              </div>
            </div>

            {/* Effet de lueur douce */}
            <div className="absolute inset-0 bg-amber-400/10 rounded-2xl blur-2xl"></div>

            {/* Carte Bonus */}
            <button
              onClick={() => handleOracleClick('bonusRoll')}
              className={`relative w-full p-4 sm:p-5 rounded-2xl
                bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#1a0033]
                border-2 border-amber-400/60
                hover:border-amber-300
                shadow-[0_0_20px_rgba(251,191,36,0.3)]
                hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]
                transform hover:scale-[1.02]
                transition-all duration-300
                group overflow-hidden
                ${selectedOracle === 'bonusRoll' ? 'scale-[1.02] border-amber-300' : ''}`}
            >
              {/* Effet brillant animé */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Contenu */}
              <div className="relative flex items-center justify-center gap-3 sm:gap-4">
                {/* Icône dé avec effet */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg animate-pulse"></div>
                  <span className="relative text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">🎲</span>
                </div>

                {/* Texte */}
                <div className="text-left flex-1">
                  <div className="text-amber-300 font-bold text-base sm:text-lg mb-0.5 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]">
                    {t('oracle.bonusRoll.title')}
                  </div>
                  <div className="text-purple-200 text-xs sm:text-sm font-normal leading-snug">
                    {t('oracle.bonusRoll.description')}
                  </div>
                </div>
              </div>

              {/* Petites étoiles décoratives */}
              <div className="absolute top-3 right-3 text-amber-400/40 text-sm animate-pulse">✦</div>
              <div className="absolute bottom-3 left-3 text-amber-400/40 text-sm animate-pulse" style={{animationDelay: '500ms'}}>✦</div>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ BOUTON RETOUR UNIQUEMENT (Accueil supprimé) */}
      <div className="text-center pt-2">
        <div className="flex justify-center max-w-xs mx-auto px-2">
          <MysticalButton
            variant="secondary"
            onClick={onBack}
            className="w-full sm:w-auto min-h-[42px] text-xs sm:text-sm px-4 sm:px-6"
          >
            ← {t('oracle.back')}
          </MysticalButton>
        </div>
      </div>
    </div>
  );
}