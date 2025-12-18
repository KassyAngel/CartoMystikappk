import { useEffect } from 'react';
import { OracleData, UserSession, OracleType } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';

interface RevelationPageProps {
  user: UserSession;
  oracle: OracleData;
  oracleType: OracleType;
  selectedCardIndices: number[];
  onBack: () => void;
  onRevealInterpretation: () => void;
}

export default function RevelationPage({ 
  user, 
  oracle, 
  oracleType,
  onRevealInterpretation 
}: RevelationPageProps) {
  const { t } = useLanguage();

  const isDailyReading = oracleType === 'daily';

  // Auto-redirect après 2.5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      onRevealInterpretation();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onRevealInterpretation]);

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-safe bg-gradient-to-b from-[#1a0933] via-[#2d1b4e] to-[#1a0933]">

      {/* Animation de loading mystique */}
      <div className="relative mb-8">
        {/* Cercle externe rotatif */}
        <div className="w-32 h-32 border-4 border-amber-400/20 rounded-full animate-spin-slow">
          <div className="absolute inset-0 border-t-4 border-amber-400 rounded-full"></div>
        </div>

        {/* Cercle interne rotatif inverse */}
        <div className="absolute inset-4 w-24 h-24 border-4 border-purple-400/20 rounded-full animate-spin-reverse">
          <div className="absolute inset-0 border-b-4 border-purple-400 rounded-full"></div>
        </div>

        {/* Étoile centrale pulsante */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl text-amber-300 animate-pulse">✦</span>
        </div>

        {/* Lueur externe */}
        <div className="absolute -inset-8 bg-amber-400/10 blur-2xl rounded-full animate-pulse"></div>
      </div>

      {/* Texte de chargement */}
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl sm:text-3xl font-serif text-amber-100/90 animate-fade-in">
          {t('revelation.loading.title')}
        </h2>

        <p className="text-amber-200/70 text-sm sm:text-base italic animate-fade-in-delay">
          {isDailyReading 
            ? t('revelation.loading.daily', { name: user.name })
            : t('revelation.loading.reading', { name: user.name, oracle: oracle.title })
          }
        </p>

        {/* Points de chargement animés */}
        <div className="flex justify-center gap-2 pt-4">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>

      {/* Message mystique aléatoire */}
      <div className="mt-12 text-center">
        <p className="text-purple-300/60 text-xs sm:text-sm italic max-w-sm">
          "{t('revelation.loading.mysticMessage')}"
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          0%, 30% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in-delay 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}