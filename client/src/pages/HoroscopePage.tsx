import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserSession } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { config } from '@/config';
import { showInterstitialAd } from '@/admobService';
import Prediction100Days from '@/components/Prediction100Days';

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

const getStreak = (): number => {
  const lastVisit = localStorage.getItem('horoscope_last_visit');
  const streak = parseInt(localStorage.getItem('horoscope_streak') || '0');
  if (!lastVisit) return 0;

  const today = new Date();
  const lastVisitDate = new Date(lastVisit);
  const daysDiff = Math.floor((today.getTime() - lastVisitDate.getTime()) / 86400000);

  if (daysDiff === 0) return streak;
  if (daysDiff <= 2) return streak;
  return 0;
};

const updateStreak = (): number => {
  const lastVisit = localStorage.getItem('horoscope_last_visit');
  const today = new Date();
  const todayString = today.toDateString();
  let newStreak = 1;

  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    const daysDiff = Math.floor((today.getTime() - lastVisitDate.getTime()) / 86400000);

    if (daysDiff === 0) {
      newStreak = parseInt(localStorage.getItem('horoscope_streak') || '1');
    } else if (daysDiff === 1) {
      newStreak = parseInt(localStorage.getItem('horoscope_streak') || '0') + 1;
    } else if (daysDiff === 2) {
      newStreak = parseInt(localStorage.getItem('horoscope_streak') || '0') + 1;
    } else {
      newStreak = 1;
    }
  }

  localStorage.setItem('horoscope_last_visit', todayString);
  localStorage.setItem('horoscope_streak', newStreak.toString());
  return newStreak;
};

const getXP = (): number => parseInt(localStorage.getItem('horoscope_xp') || '0');
const addXP = (points: number): number => {
  const currentXP = getXP();
  const newXP = currentXP + points;
  localStorage.setItem('horoscope_xp', newXP.toString());
  return newXP;
};
const getLevel = (xp: number): number => Math.floor(xp / 100) + 1;

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

export default function HoroscopePage({ user, onBack, onSaveReading, isPremium = false }: HoroscopePageProps) {
  const { t } = useLanguage();

  const [openSections, setOpenSections] = useState<number[]>([0]);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [hasSavedReading, setHasSavedReading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sectionOpenCount, setSectionOpenCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXP] = useState(0);
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGainAmount, setXPGainAmount] = useState(0);
  const [show100Reward, setShow100Reward] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showPrediction100, setShowPrediction100] = useState(false);

  const [debugTapCount, setDebugTapCount] = useState(0);
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  const englishSign = user.zodiacSign ? signMapping[user.zodiacSign.name] : "aries";

  const simulateStreak100 = () => {
    localStorage.setItem('horoscope_streak', '100');
    localStorage.setItem('horoscope_last_visit', new Date().toDateString());
    localStorage.removeItem('reward_100_shown');
    setStreak(100);
    setShowDebugMenu(false);
    window.location.reload();
  };

  const simulateStreak200 = () => {
    localStorage.setItem('horoscope_streak', '200');
    localStorage.setItem('horoscope_last_visit', new Date().toDateString());
    localStorage.removeItem('reward_200_shown');
    setStreak(200);
    setShowDebugMenu(false);
    window.location.reload();
  };

  const resetAllProgress = () => {
    if (confirm('⚠️ Réinitialiser ?')) {
      localStorage.removeItem('horoscope_streak');
      localStorage.removeItem('horoscope_last_visit');
      localStorage.removeItem('horoscope_xp');
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('horoscope_consulted_') || 
            key.startsWith('horoscope_explored_') ||
            key.startsWith('reward_')) {
          localStorage.removeItem(key);
        }
      });
      setShowDebugMenu(false);
      window.location.reload();
    }
  };

  const handleLogoTap = () => {
    setDebugTapCount(prev => prev + 1);
    setTimeout(() => setDebugTapCount(0), 2000);
  };

  useEffect(() => {
    if (debugTapCount === 3) {
      setShowDebugMenu(true);
      setDebugTapCount(0);
    }
  }, [debugTapCount]);

  useEffect(() => {
    const currentStreak = updateStreak();
    setStreak(currentStreak);
    const currentXP = getXP();
    setXP(currentXP);

    if (currentStreak > 0 && currentStreak % 100 === 0) {
      const rewardKey = `reward_${currentStreak}_shown`;

      if (!localStorage.getItem(rewardKey)) {
        setTimeout(() => {
          setShow100Reward(true);
          localStorage.setItem(rewardKey, 'true');
        }, 2000);
      }
    }
  }, []);

  const { data: horoscope, isLoading, isFetching, error, refetch } = useQuery<HoroscopeData>({
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

        const dailyConsultKey = `horoscope_consulted_${new Date().toDateString()}`;
        if (!localStorage.getItem(dailyConsultKey)) {
          const oldLevel = getLevel(getXP());
          const newXP = addXP(10);
          const newLvl = getLevel(newXP);

          setXP(newXP);
          setXPGainAmount(10);
          setShowXPGain(true);
          localStorage.setItem(dailyConsultKey, 'true');
          setTimeout(() => setShowXPGain(false), 2000);

          if (newLvl > oldLevel) {
            setTimeout(() => {
              setNewLevel(newLvl);
              setShowLevelUp(true);
              setTimeout(() => setShowLevelUp(false), 3000);
            }, 2500);
          }
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

    if (openSections.length + 1 === 8) {
      const explorationKey = `horoscope_explored_${new Date().toDateString()}`;
      if (!localStorage.getItem(explorationKey)) {
        const oldLevel = getLevel(getXP());
        const newXP = addXP(5);
        const newLvl = getLevel(newXP);

        setXP(newXP);
        setXPGainAmount(5);
        setShowXPGain(true);
        localStorage.setItem(explorationKey, 'true');
        setTimeout(() => setShowXPGain(false), 2000);

        if (newLvl > oldLevel) {
          setTimeout(() => {
            setNewLevel(newLvl);
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
          }, 2500);
        }
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

  const handleDiscoverPrediction = () => {
    if (!user || !user.zodiacSign) {
      console.error('❌ Impossible d\'afficher la prédiction');
      return;
    }

    setShow100Reward(false);
    setTimeout(() => {
      setShowPrediction100(true);
    }, 300);
  };

  if (!user || !user.zodiacSign) {
    return (
      <div className="horoscope-page min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-b from-[#0a0515] via-[#1a0f2e] to-[#0a0515]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔮</div>
          <h1 className="text-3xl font-bold mb-4 text-purple-200">{t("horoscope.title") || "Horoscope"}</h1>
          <p className="text-purple-300 text-lg mb-8">{t("horoscope.noSign") || "Aucun signe zodiacal trouvé."}</p>
          <button onClick={onBack} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-full text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
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

  // 📤 PARTAGE NATIF (Web Share API + fallback copie)
  const handleShare = async () => {
    if (!horoscope) return;

    const signName = t(`zodiac.signs.${englishSign}`) || englishSign;
    const translatedHoroscope = translateHoroscopeData(horoscope, englishSign, t);

    const shareText = `🔮 ${t('horoscope.share.header', { sign: signName })} 🔮

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

🌟 ${t('horoscope.share.footer')}`.trim();

    // 📱 Essayer l'API de partage natif (disponible sur mobile et certains navigateurs modernes)
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('horoscope.share.header', { sign: signName }),
          text: shareText,
        });
        console.log('✅ Partage réussi via Web Share API');
        return;
      } catch (error: any) {
        // Si l'utilisateur annule le partage, ne rien faire
        if (error.name === 'AbortError') {
          console.log('ℹ️ Partage annulé par l\'utilisateur');
          return;
        }
        // Si erreur, fallback vers la copie
        console.log('ℹ️ Web Share API non disponible, utilisation du presse-papier');
      }
    }

    // 📋 Fallback : copie dans le presse-papier
    try {
      // Méthode moderne (Clipboard API)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        alert(t('horoscope.share.copied') || '✅ Horoscope copié dans le presse-papier !');
        return;
      }

      // Méthode compatible (textarea temporaire)
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.width = '1px';
      textarea.style.height = '1px';
      textarea.style.padding = '0';
      textarea.style.border = 'none';
      textarea.style.outline = 'none';
      textarea.style.boxShadow = 'none';
      textarea.style.background = 'transparent';
      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999);

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (successful) {
        alert(t('horoscope.share.copied') || '✅ Horoscope copié dans le presse-papier !');
      } else {
        alert('❌ Impossible de copier');
      }
    } catch (err) {
      console.error('❌ Erreur lors de la copie:', err);
      alert('❌ Impossible de copier');
    }
  };

  if (showPrediction100) {
    return (
      <Prediction100Days
        user={user}
        streak={streak}
        onBack={() => {
          setShowPrediction100(false);
        }}
      />
    );
  }

  return (
    <div className="horoscope-page min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0515] via-[#1a0f2e] to-[#0a0515]">
      {showDebugMenu && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-sm w-full border-2 border-yellow-500">
            <h3 className="text-yellow-400 font-bold text-xl mb-4 text-center">🛠️ Debug</h3>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                <div className="text-gray-400 text-xs mb-1">Streak</div>
                <div className="text-white font-bold text-lg">{streak} 🔥</div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                <div className="text-gray-400 text-xs mb-1">XP</div>
                <div className="text-white font-bold text-lg">{xp} ⭐</div>
              </div>
            </div>

            <div className="space-y-2">
              <button onClick={simulateStreak100} className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg text-white font-semibold transition-all text-sm">
                🎯 100j
              </button>

              <button onClick={simulateStreak200} className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg text-white font-semibold transition-all text-sm">
                🎯 200j
              </button>

              <button onClick={resetAllProgress} className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-lg text-white font-semibold transition-all text-sm">
                🔄 Reset
              </button>

              <button onClick={() => setShowDebugMenu(false)} className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-all text-sm">
                ❌ Fermer
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* 🎉 RÉCOMPENSE - CONFETTI EN ARRIÈRE-PLAN (z-index: 40) */}
      {show100Reward && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          {/* ✨ CONFETTI - z-index inférieur à la carte */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
            {/* Halos lumineux */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 rounded-full blur-[120px] opacity-60 animate-pulse"></div>

            {/* Confettis - première vague */}
            {[...Array(50)].map((_, i) => {
              const angle = (i / 50) * 360;
              const distance = 200 + Math.random() * 150;
              const colors = ['#fbbf24', '#f59e0b', '#f97316', '#ec4899', '#a855f7', '#6366f1', '#10b981'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  key={`wave1-${i}`}
                  className="absolute top-1/2 left-1/2 w-2 h-3 rounded-sm"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
                    animation: `confettiExplode 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${Math.random() * 0.3}s forwards`,
                    '--angle': `${angle}deg`,
                    '--distance': `${distance}px`,
                    '--rotation': `${Math.random() * 1080}deg`,
                  } as any}
                />
              );
            })}

            {/* Confettis - deuxième vague */}
            {[...Array(35)].map((_, i) => {
              const angle = (i / 35) * 360 + 10;
              const distance = 150 + Math.random() * 120;
              const colors = ['#fbbf24', '#f59e0b', '#ec4899', '#a855f7'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              return (
                <div
                  key={`wave2-${i}`}
                  className="absolute top-1/2 left-1/2 w-4 h-5 rounded"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 20px ${color}`,
                    animation: `confettiExplode 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.4 + Math.random() * 0.4}s forwards`,
                    '--angle': `${angle}deg`,
                    '--distance': `${distance}px`,
                    '--rotation': `${Math.random() * 1080}deg`,
                  } as any}
                />
              );
            })}

            {/* Halos lumineux pulsants */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 360;
              return (
                <div
                  key={`light-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    animation: `lightPulse 3s ease-in-out ${i * 0.2}s infinite`,
                    '--orbit-angle': `${angle}deg`,
                    '--orbit-radius': '180px',
                  } as any}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 opacity-60 blur-xl"></div>
                </div>
              );
            })}
          </div>

          {/* 🎴 CARTE - z-index supérieur aux confettis (z-50) */}
          <div className="relative max-w-md w-full z-50">
            <div
              className="relative bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-purple-900/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-400/60 shadow-2xl"
              style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 1.5s forwards'
              }}
            >
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 border-4 border-amber-300 shadow-2xl shadow-amber-500/50 mb-4 animate-bounce">
                  <span className="text-4xl font-black text-purple-900">{streak}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-200 bg-clip-text text-transparent leading-tight"
                    style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                  {t('horoscope.reward100.title') || 'LÉGENDE !'}
                </h2>

                <p className="text-xl text-purple-300 font-bold mb-6">
                  {streak} {t('horoscope.reward100.daysLabel') || 'jours consécutifs !'}
                </p>

                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 mb-6 border-2 border-purple-400/40">
                  <p className="text-purple-100 text-base leading-relaxed">
                    {t('horoscope.reward100.message') ||
                    "Bravo ! Niveau exceptionnel..."}
                  </p>
                </div>

                <button
                  onClick={handleDiscoverPrediction}
                  className="relative group w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-purple-500 rounded-full font-bold text-lg shadow-2xl shadow-purple-500/60 transition-all duration-300 hover:scale-105 border-2 border-purple-400 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative text-white">
                    {t('horoscope.reward100.discover') || 'Découvrir ma prédiction'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLevelUp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => {
                const angle = (i / 30) * 360;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      fontSize: `${20 + Math.random() * 15}px`,
                      animation: `explode 2s ease-out ${Math.random() * 0.2}s forwards`,
                      '--angle': `${angle}deg`,
                      '--distance': `${100 + Math.random() * 50}px`,
                    } as any}
                  >
                    {['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)]}
                  </div>
                );
              })}
            </div>

            <div className="relative bg-gradient-to-br from-purple-900 via-fuchsia-900 to-purple-900 rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center"
                 style={{ animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <div className="text-7xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold text-amber-300 mb-2">
                {t('horoscope.levelUp.title') || 'Niveau !'}
              </h2>
              <p className="text-purple-200 text-2xl font-bold mb-4">
                {t('horoscope.levelUp.newLevel', { level: newLevel }) || `Niveau ${newLevel}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {showXPGain && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl border-2 border-amber-300">
            {xpGainAmount === 10 ? '+10 XP ⭐' : xpGainAmount === 5 ? '+5 XP ✨' : `+${xpGainAmount} XP`}
          </div>
        </div>
      )}

      <div className="absolute top-16 left-4 z-10">
        <div className="relative" onClick={handleLogoTap}>
          <div className="absolute inset-0 bg-orange-500/40 rounded-lg blur-lg animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-lg px-3 py-1.5 border-2 border-orange-400/60 shadow-2xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
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

      <div className="relative z-10 p-4 pt-16 pb-safe">
        {(isLoading || isFetching) && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-purple-300 text-lg">{t('horoscope.loading') || '✨...'}</p>
          </div>
        )}

        {error && errorMessage && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4 max-w-md mx-auto">
            <p className="text-red-300">{errorMessage}</p>
            <button onClick={() => refetch()} className="mt-3 px-4 py-2 bg-red-500 rounded-lg text-white">
              {t('horoscope.retry')}
            </button>
          </div>
        )}

        {horoscope && (
          <>
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div 
                  className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-900/50 via-fuchsia-900/50 to-purple-900/50 backdrop-blur-md border-2 border-amber-400/30 flex items-center justify-center hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={handleLogoTap}
                >
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

            <div className="max-w-md mx-auto mb-4">
              <div className="relative bg-gradient-to-br from-amber-900/40 via-purple-900/40 to-amber-900/40 backdrop-blur-xl rounded-xl p-4 border border-amber-400/30">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <div className="text-amber-200 font-bold text-sm">
                        {t('horoscope.level', { level }) || `Niveau ${level}`}
                      </div>
                      <div className="text-purple-300 text-[10px]">
                        {xp} / {level * 100} XP
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-fuchsia-200 text-xs font-semibold">
                      +{Math.min(xp % 100, 15)} XP
                    </div>
                    <div className="text-purple-300 text-[9px]">
                      {t('horoscope.xpToday') || 'Aujourd\'hui'}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full bg-purple-900/50 rounded-full h-3 overflow-hidden border border-purple-400/20">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-fuchsia-500 to-amber-500 rounded-full transition-all duration-1000 relative"
                      style={{
                        width: `${((xp % 100) / 100) * 100}%`,
                        backgroundSize: '200% 100%',
                        animation: 'gradient 3s ease infinite'
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-purple-200 text-[10px]">
                      {100 - (xp % 100)} XP avant {level + 1} 🎯
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-center text-purple-200 text-xs font-semibold mb-2">
                {t('horoscope.badges.title') || '🏆 Accomplissements'}
              </h3>
              <div className="flex justify-center gap-2">
                {badges.map(badge => (
                  <div key={badge.id} className={`relative transition-all duration-500 ${badge.unlocked ? 'scale-100 opacity-100' : 'scale-90 opacity-30'}`}>
                    {badge.unlocked && (
                      <div className="absolute inset-0 bg-amber-400/20 rounded-lg blur-md animate-pulse"></div>
                    )}
                    <div className={`relative rounded-lg p-2 border ${badge.unlocked ? 'bg-gradient-to-br from-amber-900/50 to-yellow-900/50 border-amber-400/30' : 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-400/20'}`}>
                      <div className="text-xl flex items-center justify-center h-7">{badge.icon}</div>
                      <div className={`text-[9px] mt-1 text-center ${badge.unlocked ? 'text-amber-200' : 'text-purple-300'}`}>
                        {badge.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            <div className="max-w-md mx-auto mb-4">
              <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md rounded-xl p-4 border border-indigo-400/30">
                <div className="flex items-start gap-3">
                  <div className="text-3xl mt-0.5">🔮</div>
                  <div className="flex-1">
                    <div className="text-indigo-200 font-bold text-sm mb-1.5">
                      {t('horoscope.tomorrow.title') || 'Reviens demain'}
                    </div>
                    <div className="text-purple-200/80 text-xs leading-relaxed">
                      {t('horoscope.tomorrow.description') || 'Horoscope quotidien.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full max-w-md mx-auto mb-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>📤</span>
              <span>{t('horoscope.share.button') || 'Partager'}</span>
            </button>

            <div className="text-center">
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
              >
                {t('horoscope.backButton') || '✨ Retour'}
              </button>
            </div>
          </>
        )}
      </div>

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
        @keyframes confettiExplode {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform:
              translate(-50%, -50%)
              translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
              )
              rotate(var(--rotation))
              scale(0);
            opacity: 0;
          }
        }
        @keyframes lightPulse {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) scale(1.5);
            opacity: 0.8;
          }
        }
        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform:
              translate(-50%, -50%)
              translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
              )
              rotate(720deg)
              scale(0);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}