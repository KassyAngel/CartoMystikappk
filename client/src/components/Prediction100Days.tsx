import { useState, useEffect } from "react";
import { UserSession } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface Prediction100Props {
  user: UserSession;
  streak: number; // 🔥 IMPORTANT : recevoir le streak pour varier les prédictions
  onBack: () => void;
}

const signMapping: Record<string, string> = {
  'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini',
  'Cancer': 'cancer', 'Lion': 'leo', 'Vierge': 'virgo',
  'Balance': 'libra', 'Scorpion': 'scorpio', 'Sagittaire': 'sagittarius',
  'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces'
};

// 🔮 Génération de prédiction UNIQUE selon le signe ET le streak
const getPredictionVariation = (sign: string, userName: string, streak: number): number => {
  // 🔥 AJOUT DU STREAK dans le seed pour varier les prédictions !
  const seed = `${sign}-${userName}-${streak}-${new Date().getFullYear()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 6); // 6 variations possibles
};

const getPredictionContent = (sign: string, variation: number, t: (key: string) => string) => {
  const key = `prediction100.${sign}.var${variation}`;
  const prediction = t(key);

  if (prediction === key) {
    return t('prediction100.fallback') || 'Les astres te réservent une période de transformation profonde.';
  }

  return prediction;
};

const formatDate = (date: Date, locale: string): string => {
  const localeMap: Record<string, string> = {
    'fr': 'fr-FR',
    'en': 'en-US',
    'es': 'es-ES',
    'it': 'it-IT',
    'de': 'de-DE',
    'pt': 'pt-PT'
  };

  const browserLocale = localeMap[locale] || 'fr-FR';

  return date.toLocaleDateString(browserLocale, { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

export default function Prediction100Days({ user, streak, onBack }: Prediction100Props) {
  const { t, language } = useLanguage();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const englishSign = user?.zodiacSign ? signMapping[user.zodiacSign.name] || "aries" : "aries";
  const userName = user?.name || 'Anonymous';
  const zodiacSymbol = user?.zodiacSign?.symbol || "🔮";

  // 🔥 UTILISER LE STREAK pour varier les prédictions !
  const variation = getPredictionVariation(englishSign, userName, streak);
  const prediction = getPredictionContent(englishSign, variation, t);

  console.log(`🔮 Prediction100Days - Streak: ${streak}, Variation: ${variation}`);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 100);

  if (!user || !user.zodiacSign) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0515] via-[#1a0f2e] to-[#0a0515] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🔮</div>
          <p className="text-purple-300 text-lg mb-6">
            {t('prediction100.loading') || 'Préparation...'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-full text-white font-semibold transition-all shadow-lg"
          >
            ← {t('common.back') || 'Retour'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0515] via-[#1a0f2e] to-[#0a0515]">

      {/* ✨ Particules */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.7 ? '3px' : '2px',
              height: Math.random() > 0.7 ? '3px' : '2px',
              background: `radial-gradient(circle, ${
                ['rgba(251,191,36,0.8)', 'rgba(250,204,21,0.6)', 'rgba(252,211,77,0.7)'][Math.floor(Math.random() * 3)]
              }, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
              boxShadow: '0 0 10px rgba(251,191,36,0.5)'
            }}
          />
        ))}
      </div>

      {/* 🌟 Étoiles filantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-amber-300 rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: '-50px',
              animation: `shootingStar ${3 + i}s ease-out ${i * 4}s infinite`,
              boxShadow: '0 0 20px 2px rgba(251,191,36,0.8), 0 0 40px 4px rgba(251,191,36,0.4)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pt-12 pb-safe max-w-2xl mx-auto">

        {/* 🎭 Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-amber-900/60 via-yellow-900/60 to-amber-900/60 backdrop-blur-xl border-4 border-amber-400/60 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/20 to-transparent rounded-full"
                   style={{ animation: 'spin-slow 12s linear infinite' }}></div>
              <div className="relative text-8xl drop-shadow-[0_0_40px_rgba(251,191,36,1)] filter brightness-125">
                {zodiacSymbol}
              </div>
            </div>
          </div>

          <div className={`transform transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent leading-tight px-4"
                style={{ backgroundSize: '200% auto', animation: 'gradient 4s ease infinite' }}>
              {t("prediction100.title") || "Ta Prédiction Exclusive"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-amber-300/90 text-base sm:text-lg mb-4 px-4">
              <span className="font-semibold">{t(`zodiac.signs.${englishSign}`) || englishSign}</span>
              <span className="text-amber-400/60">•</span>
              <span className="font-light text-sm sm:text-base">{t("prediction100.period") || "100 Prochains Jours"}</span>
            </div>
          </div>

          {/* Dates */}
          <div className={`max-w-md mx-auto transform transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} px-4`}>
            <div className="bg-gradient-to-r from-amber-900/40 via-yellow-900/50 to-amber-900/40 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border-2 border-amber-400/40 shadow-2xl">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-amber-200/70 text-[10px] sm:text-xs font-semibold mb-1">
                    {t("prediction100.startDate") || "Début"}
                  </div>
                  <div className="text-amber-100 font-bold text-xs sm:text-sm truncate">
                    {formatDate(startDate, language)}
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-amber-400 text-2xl sm:text-3xl">→</div>
                </div>

                <div className="flex-1 min-w-0 text-right">
                  <div className="text-amber-200/70 text-[10px] sm:text-xs font-semibold mb-1">
                    {t("prediction100.endDate") || "Fin"}
                  </div>
                  <div className="text-amber-100 font-bold text-xs sm:text-sm truncate">
                    {formatDate(endDate, language)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔮 Prédiction - TEXTE PLUS GROS */}
        <div className={`transform transition-all duration-1000 delay-400 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} px-4`}>
          <div className="relative group mb-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-600/30 via-yellow-500/30 to-amber-600/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

            <div className="relative bg-gradient-to-br from-purple-900/50 via-fuchsia-900/40 to-amber-900/50 backdrop-blur-2xl rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden">

              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-400/20 to-transparent pointer-events-none"></div>

              <div className="relative p-6 sm:p-8">

                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-200 mb-3">
                    {t("prediction100.header") || "Ce que les astres révèlent"}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"></div>
                </div>

                {/* 📝 TEXTE PLUS GROS : base → 16px, sm → 18px */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-amber-400/20 mb-6 max-w-3xl mx-auto">
                  <p className="text-purple-100 leading-relaxed" 
                     style={{ 
                       fontSize: '16px',  // Mobile
                       textAlign: 'left',
                       textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                       lineHeight: '1.75',
                       letterSpacing: '0.01em'
                     }}>
                    <style>{`
                      @media (min-width: 640px) {
                        p {
                          font-size: 18px !important;  // Desktop
                        }
                      }
                    `}</style>
                    {prediction}
                  </p>
                </div>

                {/* Conseil */}
                <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-xl p-4 border border-amber-400/40 max-w-2xl mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl mt-0.5 flex-shrink-0">💡</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-amber-200 font-bold text-sm mb-1">
                        {t("prediction100.advice.title") || "Conseil des Astres"}
                      </h3>
                      <p className="text-purple-100/90 text-xs leading-relaxed">
                        {t("prediction100.advice.content") ||
                        "Consulte ton horoscope quotidien pour affiner cette prédiction."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour */}
        <div className={`text-center transform transition-all duration-1000 delay-600 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} px-4`}>
          <button
            onClick={onBack}
            className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-500 rounded-full text-white font-bold text-base shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-300 hover:scale-105 border-2 border-amber-400"
          >
            <span className="relative z-10">
              {t("prediction100.back") || "Retour à l'horoscope"}
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) translateY(50vh) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}