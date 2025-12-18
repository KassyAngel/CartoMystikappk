import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import MysticalButton from "@/components/MysticalButton";
import SummaryCard from "@/components/SummaryCard";
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
  'Bélier': 'aries',
  'Taureau': 'taurus',
  'Gémeaux': 'gemini',
  'Cancer': 'cancer',
  'Lion': 'leo',
  'Vierge': 'virgo',
  'Balance': 'libra',
  'Scorpion': 'scorpio',
  'Sagittaire': 'sagittarius',
  'Capricorne': 'capricorn',
  'Verseau': 'aquarius',
  'Poissons': 'pisces'
};

const generatePersonalLuckyNumber = (userName: string, date: string, sign: string): string => {
  const seed = `${userName}-${date}-${sign}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return String(Math.abs(hash % 50) + 1);
};

// ✅ CORRIGÉ : Fonction stable qui génère une SEULE FOIS par signe/catégorie/date
const getStableVariation = (sign: string, category: 'love' | 'work' | 'finances' | 'health' | 'advice', date: string, t: (key: string) => string): string => {
  const variationCounts = {
    love: 8,
    work: 8,
    finances: 8,
    health: 8,
    advice: 5
  };

  const maxVariations = variationCounts[category];

  // ✅ Utiliser la date pour avoir une variation stable pendant la journée
  const seed = `${sign}-${category}-${date}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }

  const randomIndex = Math.abs(hash) % maxVariations;

  const key = `horoscope.data.${category}.${sign}.${randomIndex}`;
  const translation = t(key);

  console.log(`🔮 ${category} - Sign: ${sign} - Date: ${date} - Index: ${randomIndex} - Key: ${key}`);

  return translation !== key ? translation : t(`horoscope.data.${category}.fallback`);
};

const createHoroscopeDataMapping = () => {
  const descriptions: Record<string, string[]> = {
    aries: [
      "Votre énergie débordante attire toutes les bonnes opportunités aujourd'hui.",
    ],
  };
  return { descriptions };
};

const translateHoroscopeData = (
  horoscope: HoroscopeData,
  sign: string,
  t: (key: string) => string,
) => {
  const { descriptions } = createHoroscopeDataMapping();

  const findDescriptionIndex = (frenchText: string, sign: string): number => {
    if (descriptions[sign]) {
      return descriptions[sign].findIndex((desc) => desc === frenchText);
    }
    return -1;
  };

  const translateDescription = (frenchDescription: string): string => {
    if (!frenchDescription) return t('horoscope.data.descriptions.fallback') || 'Description non disponible';

    const descIndex = findDescriptionIndex(frenchDescription, sign);
    if (descIndex !== -1) {
      const key = `horoscope.data.descriptions.${sign}.${descIndex}`;
      const translation = t(key);
      return translation;
    }
    return frenchDescription;
  };

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
    description: translateDescription(horoscope?.description),
    mood: translateMood(horoscope?.mood),
    luckyColor: translateColor(horoscope?.luckyColor),
    compatibility: translateCompatibility(horoscope?.compatibility),
    date: translateDate(sign),
    luckyNumber: horoscope?.luckyNumber || '0',
  };
};

const getRandomFinalMessage = (
  t: (key: string) => string,
  user: UserSession,
  zodiacSign: string
): string => {
  const genderText = t(`interpretation.gender.${user.gender || "autre"}`);
  const randomVariant = Math.floor(Math.random() * 5) + 1;
  const messageKey = `horoscope.message.var${randomVariant}`;

  return t(messageKey)
    .replace('{genderText}', genderText)
    .replace('{name}', user.name)
    .replace('{zodiacSign}', zodiacSign);
};

export default function HoroscopePage({
  user,
  onBack,
  onSaveReading,
  isPremium = false
}: HoroscopePageProps) {
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [hasSavedReading, setHasSavedReading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sectionOpenCount, setSectionOpenCount] = useState(0);
  const { t } = useLanguage();

  const englishSign = user.zodiacSign
    ? signMapping[user.zodiacSign.name]
    : "aries";

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
      console.log(`🔮 Récupération horoscope pour ${englishSign}...`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      try {
        const response = await fetch(`${config.apiBaseUrl}/api/horoscope/${englishSign}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Horoscope reçu:', data);
        return data;
      } catch (error: any) {
        console.error('❌ Erreur horoscope:', error);

        if (error.name === 'AbortError') {
          setErrorMessage("⏱️ Le serveur met trop de temps à répondre. Réessaie dans quelques secondes.");
        } else {
          setErrorMessage("❌ Impossible de récupérer l'horoscope. Vérifie ta connexion Internet.");
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
          const personalLuckyNumber = generatePersonalLuckyNumber(
            user.name, 
            horoscope.currentDate, 
            englishSign
          );

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
          console.log('✅ Horoscope saved with personal lucky number:', personalLuckyNumber);
        } catch (error) {
          console.error('❌ Erreur sauvegarde horoscope:', error);
        }
      };
      saveHoroscope();
    }
  }, [horoscope, hasSavedReading, onSaveReading, englishSign, user.name]);

  useEffect(() => {
    if (horoscope) {
      const timer = setTimeout(() => {
        setShowInterpretation(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [horoscope]);

  const handleSectionOpen = async (sectionTitle: string) => {
    if (isPremium) {
      console.log('👑 Premium : pas de pub sur section');
      return;
    }

    const newCount = sectionOpenCount + 1;
    setSectionOpenCount(newCount);

    console.log(`📂 Section ouverte: "${sectionTitle}" (${newCount}ème ouverture)`);

    if (newCount === 2) {
      console.log('🎬 2ème section ouverte → Affichage pub interstitielle');

      setTimeout(async () => {
        try {
          await showInterstitialAd(`horoscope_section_${sectionTitle}`);
        } catch (error) {
          console.error('❌ Erreur pub section:', error);
        }
      }, 300);
    }
  };

  // ✅ CORRIGÉ : Variations stables basées sur la date
  const getStableCompatibilityMessage = (
    t: (key: string, vars?: Record<string, any>) => string,
    compatibility: string,
    date: string
  ): string => {
    // Hash basé sur la date pour avoir une variation stable pendant la journée
    const seed = `compatibility-${date}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }

    const randomVariant = (Math.abs(hash) % 8) + 1;
    const compatibilityKey = `horoscope.compatibility.var${randomVariant}`;
    return t(compatibilityKey, { compatibility: compatibility });
  };

  const getStableMoodMessage = (
    t: (key: string, vars?: Record<string, any>) => string,
    mood: string,
    date: string
  ): string => {
    // Hash basé sur la date pour avoir une variation stable pendant la journée
    const seed = `mood-${date}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }

    const randomVariant = (Math.abs(hash) % 6) + 1;
    const moodKey = `horoscope.mood.var${randomVariant}`;
    return t(moodKey, { mood: mood });
  };

  // ✅ CORRIGÉ : useMemo pour générer les sections UNE SEULE FOIS
  const horoscopeSections = useMemo(() => {
    if (!horoscope || !user.zodiacSign) return { sections: [], greeting: "", finalMessage: "" };

    const translatedHoroscope = translateHoroscopeData(horoscope, englishSign, t);
    const translatedZodiacSign = t(`zodiac.${englishSign}`);

    const personalLuckyNumber = generatePersonalLuckyNumber(
      user.name, 
      horoscope.currentDate, 
      englishSign
    );

    const greeting = t("horoscope.greeting", {
      name: user.name,
      zodiacSign: translatedZodiacSign,
      zodiacSymbol: user.zodiacSign.symbol,
    });

    // ✅ Les variations sont générées UNE SEULE FOIS grâce à useMemo
    const sections = [
      {
        icon: "🔮",
        title: t("horoscope.predictions.title"),
        content: t(`horoscope.data.descriptions.${englishSign}.0`),
      },
      {
        icon: "💕",
        title: t("horoscope.love.title"),
        content: getStableVariation(englishSign, 'love', horoscope.currentDate, t),
      },
      {
        icon: "💼",
        title: t("horoscope.work.title"),
        content: getStableVariation(englishSign, 'work', horoscope.currentDate, t),
      },
      {
        icon: "💰",
        title: t("horoscope.finances.title"),
        content: getStableVariation(englishSign, 'finances', horoscope.currentDate, t),
      },
      {
        icon: "😊",
        title: t("horoscope.mood.title"),
        content: getStableMoodMessage(t, translatedHoroscope.mood, horoscope.currentDate),
      },
      {
        icon: "✨",
        title: t("horoscope.assets.title"),
        content: `🎲 ${t("horoscope.assets.luckyNumber", { luckyNumber: personalLuckyNumber })}\n\n🎨 ${t("horoscope.assets.luckyColor", { luckyColor: translatedHoroscope.luckyColor })}`,
      },
      {
        icon: "💞",
        title: t("horoscope.compatibility.title"),
        content: getStableCompatibilityMessage(t, translatedHoroscope.compatibility, horoscope.currentDate),
      },
      {
        icon: "🌟",
        title: t("horoscope.advice.title"),
        content: getStableVariation(englishSign, 'advice', horoscope.currentDate, t),
      },
    ];

    return { sections, greeting, finalMessage: "" };
  }, [horoscope, user.zodiacSign, user.name, englishSign, t]); // ✅ Dépendances correctes

  if (!user.zodiacSign) {
    return (
      <div className="horoscope-page p-5 pt-20 sm:pt-24 text-center">
        <h1 className="mystical-title text-3xl md:text-5xl font-bold font-serif mb-8">
          {t("horoscope.title")}
        </h1>
        <p className="text-[#b19cd9] text-lg mb-8">{t("horoscope.noSign")}</p>
        <MysticalButton onClick={onBack}>{t("common.back")}</MysticalButton>
      </div>
    );
  }

  const { sections, greeting, finalMessage } = horoscopeSections;

  return (
      <div className="horoscope-page p-3 sm:p-4 pt-16 sm:pt-20 min-h-screen flex flex-col pb-safe">
      <div className="horoscope-header text-center mb-4 sm:mb-6">
        <h1 className="mystical-title text-xl sm:text-2xl md:text-3xl font-bold font-serif mb-3">
          {t("horoscope.title")}
        </h1>

        <div className="text-center mb-4">
          <div className="text-4xl sm:text-5xl mb-2">{user.zodiacSign.symbol}</div>
          <h2 className="text-[#ffd700] text-lg sm:text-xl md:text-2xl font-bold font-serif">
            {t(`zodiac.signs.${englishSign}`)}
          </h2>
          <p className="text-[#b19cd9] text-sm sm:text-base italic mt-1">
            {horoscope ? translateHoroscopeData(horoscope, englishSign, t).date : ""}
          </p>
        </div>
      </div>

      {(isLoading || isFetching) && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-300">
            Chargement de votre horoscope...
            <br />
            <span className="text-xs text-purple-400">(Le serveur peut mettre 30-60s à démarrer)</span>
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4 text-center">
          <p className="text-red-300">{errorMessage}</p>
          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white"
          >
            Réessayer
          </button>
        </div>
      )}

      {horoscope && (
        <>
          <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-2 border-[#ffd700] rounded-2xl p-4 text-center mb-4">
            <p className="text-[#ffd700] text-sm sm:text-base md:text-lg italic">{greeting}</p>
          </div>

          <div className="flex-1">
            <SummaryCard
              title={t("horoscope.predictions.title")}
              sections={sections}
              finalMessage="" 
              isVisible={showInterpretation}
              openFirst={false}
              onSectionOpen={handleSectionOpen}
            />
          </div>
        </>
      )}

      <div className="horoscope-controls text-center mt-6 sm:mt-10 pb-4">
        <div className="flex gap-4 justify-center flex-wrap">
          <MysticalButton variant="secondary" onClick={onBack}>
            {t("horoscope.newConsultation")}
          </MysticalButton>
        </div>
      </div>
    </div>
  );
}