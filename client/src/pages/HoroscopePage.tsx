import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import MysticalButton from "@/components/MysticalButton";
import { UserSession } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { config } from '@/config';
import { showInterstitialAd } from '@/admobService';

interface HoroscopePageProps {
  user: UserSession;
  onBack: () => void;
  onHome: () => void;
  onSaveReading?: (reading: any) => Promise<void>;
  isPremium?: boolean;
}

interface HoroscopeData {
  sign: string;
  date: string;
  description: string;
  mood: string;
  luckyNumber: string;
  luckyColor: string;
  compatibility: string;
  currentDate: string;
  love?: string;
  work?: string;
  finances?: string;
  health?: string;
  advice?: string;
}

const signMapping: Record<string, string> = {
  'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini',
  'Cancer': 'cancer', 'Lion': 'leo', 'Vierge': 'virgo',
  'Balance': 'libra', 'Scorpion': 'scorpio', 'Sagittaire': 'sagittarius',
  'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces'
};

// 🔥 Gestion du Streak
const getStreak = (): number => {
  const lastVisit = localStorage.getItem('horoscope_last_visit');
  const streak = parseInt(localStorage.getItem('horoscope_streak') || '0');

  if (!lastVisit) return 0;

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastVisit === today) return streak;
  if (lastVisit === yesterday) return streak;
  return 0;
};

const updateStreak = (): number => {
  const lastVisit = localStorage.getItem('horoscope_last_visit');
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  let newStreak = 1;

  if (lastVisit === yesterday) {
    const currentStreak = parseInt(localStorage.getItem('horoscope_streak') || '0');
    newStreak = currentStreak + 1;
  } else if (lastVisit !== today) {
    newStreak = 1;
  } else {
    newStreak = parseInt(localStorage.getItem('horoscope_streak') || '1');
  }

  localStorage.setItem('horoscope_last_visit', today);
  localStorage.setItem('horoscope_streak', newStreak.toString());

  return newStreak;
};

// ⭐ Gestion XP
const getXP = (): number => parseInt(localStorage.getItem('horoscope_xp') || '0');
const addXP = (points: number): number => {
  const currentXP = getXP();
  const newXP = currentXP + points;
  localStorage.setItem('horoscope_xp', newXP.toString());
  return newXP;
};
const getLevel = (xp: number): number => Math.floor(xp / 100) + 1;

// 🏆 Badges
const getBadges = (streak: number, t: (key: string) => string) => [
  { id: 1, icon: '🔥', label: t('horoscope.badges.days7'), unlocked: streak >= 7 },
  { id: 2, icon: '⭐', label: t('horoscope.badges.days15'), unlocked: streak >= 15 },
  { id: 3, icon: '💎', label: t('horoscope.badges.days30'), unlocked: streak >= 30 },
  { id: 4, icon: '👑', label: t('horoscope.badges.days100'), unlocked: streak >= 100 },
];

const generatePersonalLuckyNumber = (userName: string, date: string, sign: string): string => {
  const seed = `${userName}-${date}-${sign}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return String(Math.abs(hash % 50) + 1);
};

const getStableVariation = (
  sign: string, 
  category: 'descriptions' | 'love' | 'work' | 'finances' | 'health' | 'advice', 
  date: string, 
  t: (key: string) => string
): string => {
  const variationCounts: Record<string, number> = {
    descriptions: 15, love: 8, work: 8, finances: 8, health: 8, advice: 5
  };

  const maxVariations = variationCounts[category];
  const seed = `${sign}-${category}-${date}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }

  const randomIndex = Math.abs(hash) % maxVariations;
  const key = `horoscope.data.${category}.${sign}.${randomIndex}`;
  const translation = t(key);

  return translation !== key ? translation : t(`horoscope.data.${category}.fallback`) || `Contenu non disponible`;
};

const translateHoroscopeData = (horoscope: HoroscopeData, sign: string, t: (key: string) => string) => {
  const translateMood = (frenchMood: string): string => {
    if (!frenchMood) return t('horoscope.data.moods.fallback') || 'Non disponible';
    const key = `horoscope.data.moods.${frenchMood}`;
    return t(key) !== key ? t(key) : frenchMood;
  };

  const translateColor = (frenchColor: string): string => {
    if (!frenchColor) return t('horoscope.data.colors.fallback') || 'Non disponible';
    const key = `horoscope.data.colors.${frenchColor}`;
    return t(key) !== key ? t(key) : frenchColor;
  };

  const translateCompatibility = (frenchCompatibility: string): string => {
    if (!frenchCompatibility) return t('horoscope.data.compatibility.fallback') || 'Non disponible';
    const key = `horoscope.data.compatibility.${frenchCompatibility}`;
    return t(key) !== key ? t(key) : frenchCompatibility;
  };

  const translateDate = (sign: string): string => {
    const key = `horoscope.data.dates.${sign}`;
    return t(key) !== key ? t(key) : horoscope?.date || '';
  };

  return {
    ...horoscope,
    mood: translateMood(horoscope?.mood),
    luckyColor: translateColor(horoscope?.luckyColor),
    compatibility: translateCompatibility(horoscope?.compatibility),
    date: translateDate(sign),
    luckyNumber: horoscope?.luckyNumber || '0',
  };
};

export default function HoroscopePage({
  user,
  onBack,
  onSaveReading,
  isPremium = false
}: HoroscopePageProps) {
  const [openSections, setOpenSections] = useState<number[]>([0]);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [hasSavedReading, setHasSavedReading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sectionOpenCount, setSectionOpenCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXP] = useState(0);
  const [showXPGain, setShowXPGain] = useState(false);
  const [show100Reward, setShow100Reward] = useState(false);
  const { t } = useLanguage();

  const englishSign = user.zodiacSign ? signMapping[user.zodiacSign.name] : "aries";

  // 🔥 Init Streak & XP
  useEffect(() => {
    const currentStreak = updateStreak();
    setStreak(currentStreak);
    setXP(getXP());

    // 🎉 Récompense 100 jours
    if (currentStreak === 100 && !localStorage.getItem('reward_100_shown')) {
      setTimeout(() => {
        setShow100Reward(true);
        localStorage.setItem('reward_100_shown', 'true');
      }, 1000);
    }
  }, []);

  const {
    data: horoscope,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<HoroscopeData>({
    queryKey: ['horoscope', englishSign],
    queryFn: async () => {
      setErrorMessage(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      try {
        const response = await fetch(`${config.apiBaseUrl}/api/horoscope/${englishSign}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();

        // ⭐ Ajouter XP pour consultation
        const dailyConsultKey = `horoscope_consulted_${new Date().toDateString()}`;
        if (!localStorage.getItem(dailyConsultKey)) {
          const newXP = addXP(10);
          setXP(newXP);
          setShowXPGain(true);
          localStorage.setItem(dailyConsultKey, 'true');
          setTimeout(() => setShowXPGain(false), 2000);
        }

        return data;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          setErrorMessage(t('horoscope.errors.timeout'));
        } else {
          setErrorMessage(t('horoscope.errors.fetchFailed'));
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    enabled: !!user.zodiacSign,
  });

  useEffect(() => {
    if (horoscope && !hasSavedReading && onSaveReading) {
      const saveHoroscope = async () => {
        try {
          const personalLuckyNumber = generatePersonalLuckyNumber(user.name, horoscope.currentDate, englishSign);
          await onSaveReading({
            type: 'horoscope',
            answer: JSON.stringify({
              sign: englishSign,
              description: horoscope.description,
              mood: horoscope.mood,
              luckyNumber: personalLuckyNumber,
              luckyColor: horoscope.luckyColor,
              compatibility: horoscope.compatibility,
              love: horoscope.love,
              work: horoscope.work,
              finances: horoscope.finances,
              health: horoscope.health,
              advice: horoscope.advice
            }),
            date: new Date()
          });
          setHasSavedReading(true);
        } catch (error) {
          console.error('❌ Erreur sauvegarde horoscope:', error);
        }
      };
      saveHoroscope();
    }
  }, [horoscope, hasSavedReading, onSaveReading, englishSign, user.name]);

  useEffect(() => {
    if (horoscope) {
      const timer = setTimeout(() => setShowInterpretation(true), 0);
      return () => clearTimeout(timer);
    }
  }, [horoscope]);

  const handleSectionOpen = async (sectionTitle: string, index: number) => {
    if (isPremium) return;

    const newCount = sectionOpenCount + 1;
    setSectionOpenCount(newCount);

    // ⭐ XP pour exploration complète
    if (openSections.length === 7) {
      const explorationKey = `horoscope_explored_${new Date().toDateString()}`;
      if (!localStorage.getItem(explorationKey)) {
        const newXP = addXP(5);
        setXP(newXP);
        setShowXPGain(true);
        localStorage.setItem(explorationKey, 'true');
        setTimeout(() => setShowXPGain(false), 2000);
      }
    }

    if (newCount === 2) {
      setTimeout(async () => {
        try {
          await showInterstitialAd(`horoscope_section_${sectionTitle}`);
        } catch (error) {
          console.error('❌ Erreur pub section:', error);
        }
      }, 300);
    }
  };

  const getStableCompatibilityMessage = (t: (key: string, vars?: Record<string, any>) => string, compatibility: string, date: string): string => {
    const seed = `compatibility-${date}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    const randomVariant = (Math.abs(hash) % 8) + 1;
    return t(`horoscope.compatibility.var${randomVariant}`, { compatibility });
  };

  const getStableMoodMessage = (t: (key: string, vars?: Record<string, any>) => string, mood: string, date: string): string => {
    const seed = `mood-${date}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    const randomVariant = (Math.abs(hash) % 6) + 1;
    return t(`horoscope.mood.var${randomVariant}`, { mood });
  };

  const horoscopeSections = useMemo(() => {
    if (!horoscope || !user.zodiacSign) return { sections: [], personalLuckyNumber: "" };

    const translatedHoroscope = translateHoroscopeData(horoscope, englishSign, t);
    const personalLuckyNumber = generatePersonalLuckyNumber(user.name, horoscope.currentDate, englishSign);

    const sections = [
      { icon: "🔮", title: t("horoscope.predictions.title"), content: getStableVariation(englishSign, 'descriptions', horoscope.currentDate, t) },
      { icon: "💕", title: t("horoscope.love.title"), content: getStableVariation(englishSign, 'love', horoscope.currentDate, t) },
      { icon: "💼", title: t("horoscope.work.title"), content: getStableVariation(englishSign, 'work', horoscope.currentDate, t) },
      { icon: "💰", title: t("horoscope.finances.title"), content: getStableVariation(englishSign, 'finances', horoscope.currentDate, t) },
      { icon: "😊", title: t("horoscope.mood.title"), content: getStableMoodMessage(t, translatedHoroscope.mood, horoscope.currentDate) },
      { icon: "✨", title: t("horoscope.assets.title"), content: `🎲 ${t("horoscope.assets.luckyNumber", { luckyNumber: personalLuckyNumber })}\n\n🎨 ${t("horoscope.assets.luckyColor", { luckyColor: translatedHoroscope.luckyColor })}` },
      { icon: "💞", title: t("horoscope.compatibility.title"), content: getStableCompatibilityMessage(t, translatedHoroscope.compatibility, horoscope.currentDate) },
      { icon: "🌟", title: t("horoscope.advice.title"), content: getStableVariation(englishSign, 'advice', horoscope.currentDate, t) },
    ];

    return { sections, personalLuckyNumber };
  }, [horoscope, user.zodiacSign, user.name, englishSign, t]);

  if (!user || !user.zodiacSign) {
    return (
      <div className="horoscope-page min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-b from-[#0a0515] via-[#1a0f2e] to-[#0a0515]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔮</div>
          <h1 className="text-3xl font-bold mb-4 text-purple-200">
            {t("horoscope.title") || "Horoscope"}
          </h1>
          <p className="text-purple-300 text-lg mb-8">
            {t("horoscope.noSign") || "Aucun signe zodiacal trouvé. Veuillez configurer votre profil."}
          </p>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-full text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            {t("common.back") || "Retour"}
          </button>
        </div>
      </div>
    );
  }

  const { sections, personalLuckyNumber } = horoscopeSections;
  const level = getLevel(xp);
  const badges = getBadges(streak, t);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    handleSectionOpen(sections[index].title, index);
  };

  // 🆕 PARTAGE COMPLET DE L'HOROSCOPE
  const handleShare = () => {
    if (!horoscope) return;

    const signName = t(`zodiac.signs.${englishSign}`) || englishSign;
    const translatedHoroscope = translateHoroscopeData(horoscope, englishSign, t);

    // Construction du message complet avec traduction
    const shareTitle = t('horoscope.share.fullTitle', { sign: signName }) || `${signName} - Horoscope du jour`;

    const shareText = `
🔮 ${t('horoscope.share.header', { sign: signName })} 🔮

📅 ${new Date().toLocaleDateString(t('common.locale') || 'fr-FR', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

${t('horoscope.predictions.title')}: ${getStableVariation(englishSign, 'descriptions', horoscope.currentDate, t).substring(0, 150)}...

💕 ${t('horoscope.love.title')}: ${getStableVariation(englishSign, 'love', horoscope.currentDate, t).substring(0, 100)}...

💼 ${t('horoscope.work.title')}: ${getStableVariation(englishSign, 'work', horoscope.currentDate, t).substring(0, 100)}...

✨ ${t('horoscope.assets.luckyNumber', { luckyNumber: personalLuckyNumber })}
🎨 ${t('horoscope.assets.luckyColor', { luckyColor: translatedHoroscope.luckyColor })}

🌟 ${t('horoscope.share.footer')}
`.trim();

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
      }).catch((error) => {
        console.log('Partage annulé ou erreur:', error);
      });
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(shareText).then(() => {
        alert(t('horoscope.share.copied') || 'Horoscope copié dans le presse-papier !');
      });
    }
  };

  return (
    <div className="horoscope-page min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0515] via-[#1a0f2e] to-[#0a0515]">

      {/* ✨ Particules */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-300/30 rounded-full"
            style={{
              width: Math.random() > 0.5 ? '2px' : '3px',
              height: Math.random() > 0.5 ? '2px' : '3px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`
            }}
          />
        ))}
      </div>

      {/* 🎉 RÉCOMPENSE 100 JOURS */}
      {show100Reward && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-md w-full">
            {/* Effet de lumière */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>

            <div className="relative bg-gradient-to-br from-purple-900 via-fuchsia-900 to-purple-900 rounded-3xl p-8 border-4 border-amber-400 shadow-2xl">
              {/* Confettis */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl animate-fall"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  >
                    {['🎉', '⭐', '🌟', '✨', '💫'][Math.floor(Math.random() * 5)]}
                  </div>
                ))}
              </div>

              <div className="relative text-center">
                <div className="text-8xl mb-4 animate-bounce">👑</div>
                <h2 className="text-3xl font-bold text-amber-300 mb-2">
                  {t('horoscope.reward100.title') || 'LÉGENDE ACCOMPLIE !'}
                </h2>
                <p className="text-xl text-purple-200 mb-4">
                  {t('horoscope.reward100.subtitle') || '100 jours de suite !'}
                </p>
                <div className="bg-black/30 rounded-xl p-4 mb-6">
                  <p className="text-purple-100 text-sm leading-relaxed">
                    {t('horoscope.reward100.message') || 
                    'Félicitations ! Tu as atteint un niveau de dévotion cosmique exceptionnel. Les astres te récompensent avec un titre exclusif et des prédictions encore plus précises !'}
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <span className="text-white font-semibold">
                      {t('horoscope.reward100.badge') || 'Badge "Maître des Étoiles"'}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span className="text-white font-semibold">
                      {t('horoscope.reward100.bonus') || '+50 XP Bonus'}
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-2xl">🎁</span>
                    <span className="text-white font-semibold">
                      {t('horoscope.reward100.gift') || 'Horoscope hebdomadaire débloqué'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShow100Reward(false);
                    addXP(50); // Bonus XP
                    setXP(getXP());
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 rounded-full text-purple-900 font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {t('horoscope.reward100.continue') || '✨ Continuer l\'aventure'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 Streak Counter */}
      <div className="absolute top-16 left-4 z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/40 rounded-lg blur-lg animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-lg px-3 py-1.5 border-2 border-orange-400/60 shadow-2xl flex items-center gap-2">
            <div className="text-2xl drop-shadow-lg">🔥</div>
            <div className="text-white">
              <div className="text-sm font-bold leading-none">{streak}</div>
              <div className="text-[9px] opacity-90 leading-none mt-0.5">
                {t('horoscope.streak.label') || 'jours'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Date */}
      <div className="absolute top-16 right-4 z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-fuchsia-500/30 rounded-full blur-md animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full px-3 py-1 border border-fuchsia-400/50 shadow-lg">
            <span className="text-xs font-bold text-white">
              ✨ {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {/* ⭐ XP Gain Animation */}
      {showXPGain && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-amber-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl">
            {t('horoscope.xpGain') || '+10 XP ⭐'}
          </div>
        </div>
      )}

      <div className="relative z-10 p-4 pt-16 pb-safe">

        {/* Loading */}
        {(isLoading || isFetching) && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-purple-300 text-lg">{t('horoscope.loading') || '✨ Chargement...'}</p>
          </div>
        )}

        {/* Error */}
        {error && errorMessage && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4 max-w-md mx-auto">
            <p className="text-red-300">{errorMessage}</p>
            <button onClick={() => refetch()} className="mt-3 px-4 py-2 bg-red-500 rounded-lg text-white">
              {t('horoscope.retry')}
            </button>
          </div>
        )}

        {/* Content */}
        {horoscope && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-900/50 via-fuchsia-900/50 to-purple-900/50 backdrop-blur-md border-2 border-amber-400/30 flex items-center justify-center hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full" style={{ animation: 'spin-slow 8s linear infinite' }}></div>
                  <div className="relative text-6xl sm:text-7xl drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]">
                    {user.zodiacSign.symbol}
                  </div>
                </div>
              </div>

              <div className="relative mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-amber-200 via-yellow-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                  {t(`zodiac.signs.${englishSign}`)}
                </h2>
              </div>

              <p className="text-purple-300/70 text-xs sm:text-sm">
                {translateHoroscopeData(horoscope, englishSign, t).date}
              </p>
            </div>

            {/* ⭐ Stats XP/Niveau */}
            <div className="flex justify-center gap-3 mb-4">
              <div className="relative w-[88px]">
                <div className="absolute inset-0 bg-amber-400/20 rounded-lg blur-md"></div>
                <div className="relative bg-gradient-to-br from-amber-900/60 to-yellow-900/60 backdrop-blur-md rounded-lg h-[36px] border border-amber-400/30 flex items-center justify-center gap-1.5">
                  <span className="text-amber-300 text-sm">⭐</span>
                  <span className="text-amber-100 text-xs font-bold">
                    {t('horoscope.level', { level }) || `Niv. ${level}`}
                  </span>
                </div>
              </div>

              <div className="relative w-[88px]">
                <div className="absolute inset-0 bg-purple-400/20 rounded-lg blur-md"></div>
                <div className="relative bg-gradient-to-br from-purple-900/60 to-fuchsia-900/60 backdrop-blur-md rounded-lg h-[36px] border border-purple-400/30 flex items-center justify-center">
                  <span className="text-purple-100 text-xs font-bold">{xp} XP</span>
                </div>
              </div>
            </div>

            {/* 📊 Progress Bar */}
            <div className="mb-4 mx-auto max-w-md">
              <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-xl p-3 border border-indigo-400/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-200 text-xs font-semibold">
                    {t('horoscope.progress.label') || 'Exploration'}
                  </span>
                  <span className="text-amber-300 text-xs font-bold">{openSections.length}/8</span>
                </div>

                <div className="w-full bg-purple-900/50 rounded-full h-2 overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${(openSections.length / 8) * 100}%` }}
                  ></div>
                </div>

                {openSections.length === 8 ? (
                  <div className="text-center">
                    <span className="text-amber-300 text-xs">
                      {t('horoscope.progress.completed') || '🎉 +5 XP débloqué !'}
                    </span>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-purple-300 text-xs">
                      {t('horoscope.progress.openAll') || 'Ouvre toutes les sections pour +5 XP'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 🏆 Badges */}
            <div className="mb-4">
              <h3 className="text-center text-purple-200 text-xs font-semibold mb-2">
                {t('horoscope.badges.title') || '🏆 Accomplissements'}
              </h3>
              <div className="flex justify-center gap-2">
                {badges.map(badge => (
                  <div key={badge.id} className={`relative ${badge.unlocked ? '' : 'opacity-30'}`}>
                    {badge.unlocked && (
                      <div className="absolute inset-0 bg-amber-400/20 rounded-lg blur-md"></div>
                    )}
                    <div className={`relative rounded-lg p-2 border ${badge.unlocked ? 'bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30' : 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-400/20'}`}>
                      <div className="text-xl">{badge.icon}</div>
                      <div className={`text-[9px] mt-1 ${badge.unlocked ? 'text-amber-200' : 'text-purple-300'}`}>
                        {badge.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="max-w-2xl mx-auto space-y-2 mb-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    opacity: 0,
                    animation: `slideUp 0.5s ease-out ${index * 0.05}s forwards`
                  }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

                  <div className="relative bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl rounded-xl border border-purple-400/30 overflow-hidden transform group-hover:scale-[1.01] transition-all duration-300">

                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{section.icon}</span>
                        <h3 className="text-amber-200 font-semibold text-left text-sm">{section.title}</h3>
                      </div>
                      <svg 
                        className={`w-4 h-4 text-purple-300 transition-transform duration-300 ${openSections.includes(index) ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openSections.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-3 pb-3 pt-1">
                        <p className="text-purple-100/90 text-xs leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 👀 Teaser Demain */}
            <div className="max-w-md mx-auto mb-4">
              <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md rounded-xl p-4 border border-indigo-400/30">
                <div className="flex items-start gap-3">
                  <div className="text-3xl mt-0.5">🔮</div>
                  <div className="flex-1">
                    <div className="text-indigo-200 font-bold text-sm mb-1.5">
                      {t('horoscope.tomorrow.title') || 'Reviens demain'}
                    </div>
                    <div className="text-purple-200/80 text-xs leading-relaxed">
                      {t('horoscope.tomorrow.description') || 'Ton horoscope quotidien t\'attend chaque jour. Ne manque aucune prédiction des astres !'}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-purple-300/60">
                  <span>🌟</span>
                  <span>{t('horoscope.tomorrow.hint') || 'Consulte tous les jours pour maintenir ta série'}</span>
                </div>
              </div>
            </div>

            {/* 📤 Partage */}
            <button 
              onClick={handleShare}
              className="w-full max-w-md mx-auto mb-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>📤</span>
              <span>{t('horoscope.share.button') || 'Partager mon horoscope'}</span>
            </button>

            {/* Bouton retour */}
            <div className="text-center">
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
              >
                {t('horoscope.backButton') || '✨ Retour au sommaire'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}