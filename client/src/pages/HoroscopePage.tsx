import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MysticalButton from "@/components/MysticalButton";
import SummaryCard from "@/components/SummaryCard";
import { UserSession } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { config } from '@/config';

interface HoroscopePageProps {
  user: UserSession;
  onBack: () => void;
  onHome: () => void;
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
}

// Mapping des signes français vers les noms anglais pour l'API
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

// Les fonctions de mapping restent identiques...
const createHoroscopeDataMapping = () => {
  const descriptions: Record<string, string[]> = {
    aries: [
      "Votre énergie débordante attire toutes les bonnes opportunités aujourd'hui. C'est le moment de foncer vers vos objectifs avec confiance.",
      "Mars vous donne un courage extraordinaire pour surmonter tous les obstacles. Vos initiatives seront couronnées de succès.",
      // ... (garder toutes les descriptions existantes)
    ],
    // ... (garder tous les autres signes)
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
    const descIndex = findDescriptionIndex(frenchDescription, sign);
    if (descIndex !== -1) {
      const key = `horoscope.data.descriptions.${sign}.${descIndex}`;
      const translation = t(key);
      return translation;
    }
    return frenchDescription;
  };

  const translateMood = (frenchMood: string): string => {
    const key = `horoscope.data.moods.${frenchMood}`;
    return t(key) !== key ? t(key) : frenchMood;
  };

  const translateColor = (frenchColor: string): string => {
    const key = `horoscope.data.colors.${frenchColor}`;
    return t(key) !== key ? t(key) : frenchColor;
  };

  const translateCompatibility = (frenchCompatibility: string): string => {
    const key = `horoscope.data.compatibility.${frenchCompatibility}`;
    return t(key) !== key ? t(key) : frenchCompatibility;
  };

  const translateDate = (sign: string): string => {
    const key = `horoscope.data.dates.${sign}`;
    return t(key) !== key ? t(key) : horoscope.date;
  };

  return {
    ...horoscope,
    description: translateDescription(horoscope.description),
    mood: translateMood(horoscope.mood),
    luckyColor: translateColor(horoscope.luckyColor),
    compatibility: translateCompatibility(horoscope.compatibility),
    date: translateDate(sign),
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
}: HoroscopePageProps) {
  const [showInterpretation, setShowInterpretation] = useState(false);
  const { t } = useLanguage();

  const englishSign = user.zodiacSign
    ? signMapping[user.zodiacSign.name]
    : "aries";

  const {
    data: horoscope,
    isLoading,
    error,
    refetch,
  } = useQuery<HoroscopeData>({
    queryKey: ['horoscope', englishSign],
    queryFn: async () => {
      const response = await fetch(`${config.apiBaseUrl}/api/horoscope/${englishSign}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'horoscope');
      }
      return response.json();
    },
    enabled: !!user.zodiacSign,
  });

  const handleRetry = async () => {
    await refetch();
  };

  useEffect(() => {
    if (horoscope) {
      const timer = setTimeout(() => {
        setShowInterpretation(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [horoscope]);

  const getRandomCompatibilityMessage = (
    t: (key: string, vars?: Record<string, any>) => string,
    compatibility: string
  ): string => {
    const randomVariant = Math.floor(Math.random() * 8) + 1;
    const compatibilityKey = `horoscope.compatibility.var${randomVariant}`;
    return t(compatibilityKey, { compatibility: compatibility });
  };

  const getRandomMoodMessage = (
    t: (key: string, vars?: Record<string, any>) => string,
    mood: string
  ): string => {
    const randomVariant = Math.floor(Math.random() * 6) + 1;
    const moodKey = `horoscope.mood.var${randomVariant}`;
    return t(moodKey, { mood: mood });
  };

  const generateHoroscopeSections = () => {
    if (!horoscope || !user.zodiacSign) return { sections: [], greeting: "", finalMessage: "" };

    const translatedHoroscope = translateHoroscopeData(horoscope, englishSign, t);
    const translatedZodiacSign = t(`zodiac.${englishSign}`);

    const greeting = t("horoscope.greeting", {
      name: user.name,
      zodiacSign: translatedZodiacSign,
      zodiacSymbol: user.zodiacSign.symbol,
    });

    const sections = [
      {
        icon: "🔮",
        title: t("horoscope.predictions.title"),
          content: t(`horoscope.data.descriptions.${englishSign}.0`),
      },
      {
        icon: "😊",
        title: t("horoscope.mood.title"),
        content: getRandomMoodMessage(t, translatedHoroscope.mood),
      },
      {
        icon: "✨",
        title: t("horoscope.assets.title"),
        content: `🎲 ${t("horoscope.assets.luckyNumber", { luckyNumber: translatedHoroscope.luckyNumber })}\n\n🎨 ${t("horoscope.assets.luckyColor", { luckyColor: translatedHoroscope.luckyColor })}`,
      },
      {
        icon: "💕",
        title: t("horoscope.compatibility.title"),
        content: getRandomCompatibilityMessage(t, translatedHoroscope.compatibility),
      },
    ];

    const finalMessage = getRandomFinalMessage(t, user, translatedZodiacSign);

    return { sections, greeting, finalMessage };
  };

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

  const { sections, greeting, finalMessage } = generateHoroscopeSections();

  return (
    <div className="horoscope-page p-3 sm:p-4 pt-16 sm:pt-20 min-h-screen flex flex-col pb-6">

      {/* Header compact */}
      <div className="horoscope-header text-center mb-4 sm:mb-6">
        <h1 className="mystical-title text-xl sm:text-2xl md:text-3xl font-bold font-serif mb-3">
          {t("horoscope.title")}
        </h1>

        {/* Symbole et nom du signe - Compact */}
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

      {isLoading && (
        <div className="text-center flex-1 flex items-center justify-center">
          <div>
            <div className="mystical-loader mb-4">
              <div className="stars-spinner"></div>
            </div>
            <p className="text-[#b19cd9] text-lg">{t("horoscope.loading")}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center mb-8">
          <p className="text-[#ff6b6b] text-lg mb-4">{t("horoscope.error")}</p>
          <MysticalButton onClick={handleRetry} data-testid="button-retry">
            {t("horoscope.retry")}
          </MysticalButton>
        </div>
      )}

      {horoscope && (
        <>
          {/* Salutation */}
          <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-2 border-[#ffd700] rounded-2xl p-4 text-center mb-4">
            <p className="text-[#ffd700] text-sm sm:text-base md:text-lg italic">{greeting}</p>
          </div>

          {/* Accordéon avec gestion de visibilité */}
          <div className="flex-1">
            <SummaryCard
              title={t("horoscope.predictions.title")}
              sections={sections}
              finalMessage={finalMessage}
              isVisible={showInterpretation}
              openFirst={false}
            />
          </div>
        </>
      )}

      <div className="horoscope-controls text-center mt-6 sm:mt-10 pb-4">
        <div className="flex gap-4 justify-center flex-wrap">
          <MysticalButton variant="secondary" onClick={onBack} data-testid="button-new-consultation">
            {t("horoscope.newConsultation")}
          </MysticalButton>
        </div>
      </div>
    </div>
  );
}