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
  onSaveReading?: (reading: any) => Promise<void>;
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

const createHoroscopeDataMapping = () => {
  const descriptions: Record<string, string[]> = {
    aries: [
      "Votre énergie débordante attire toutes les bonnes opportunités aujourd'hui. C'est le moment de foncer vers vos objectifs avec confiance.",
      "Mars vous donne un courage extraordinaire pour surmonter tous les obstacles. Vos initiatives seront couronnées de succès.",
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
  onSaveReading
}: HoroscopePageProps) {
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [hasSavedReading, setHasSavedReading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  const englishSign = user.zodiacSign
    ? signMapping[user.zodiacSign.name]
    : "aries";

  // 🪄 Nouvelle logique de récupération avec timeout + gestion d'erreur détaillée
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

  const handleRetry = async () => {
    await refetch();
  };

  useEffect(() => {
    if (horoscope && !hasSavedReading && onSaveReading) {
      const saveHoroscope = async () => {
        try {
          await onSaveReading({
            type: 'horoscope',
            answer: JSON.stringify({
              sign: englishSign,
              description: horoscope.description,
              mood: horoscope.mood,
              luckyNumber: horoscope.luckyNumber,
              luckyColor: horoscope.luckyColor,
              compatibility: horoscope.compatibility
            }),
            date: new Date()
          });
          setHasSavedReading(true);
          console.log('✅ Horoscope saved → pub triggered via App.tsx');
        } catch (error) {
          console.error('❌ Erreur sauvegarde horoscope:', error);
        }
      };
      saveHoroscope();
    }
  }, [horoscope, hasSavedReading, onSaveReading, englishSign]);

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
              finalMessage={finalMessage}
              isVisible={showInterpretation}
              openFirst={false}
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
