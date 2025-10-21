import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import MysticalButton from '@/components/MysticalButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface GenderPageProps {
  onNext: (gender: string) => void;
  onBack: () => void;
}

export default function GenderPage({ onNext, onBack }: GenderPageProps) {
  const [selectedGender, setSelectedGender] = useState('');
  const { t } = useLanguage();

  const genderOptions = [
    { value: 'homme', label: t('gender.male'), icon: '♂' },
    { value: 'femme', label: t('gender.female'), icon: '♀' },
    { value: 'autre', label: t('gender.other'), icon: '⚥' }
  ];

  useEffect(() => {
    if (selectedGender) {
      console.log('Gender submitted:', selectedGender);
      setTimeout(() => {
        onNext(selectedGender);
      }, 500);
    }
  }, [selectedGender, onNext]);

  return (
    <>
      <div className="intro-page active flex flex-col min-h-screen text-center px-6 relative overflow-hidden bg-gradient-to-b from-[#0e0020] via-[#1b0338] to-[#0a0017] text-white pt-16 sm:pt-20">

        {/* Effet d'étoiles */}
        <div className="absolute inset-0 bg-[url('/stars-bg.svg')] bg-cover opacity-20 pointer-events-none"></div>

        {/* Halo central */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-400/10 via-purple-500/10 to-transparent blur-3xl"></div>

        {/* Barre de progression */}
        <div className="mb-4">
          <ProgressBar progress={100} />
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col justify-center z-10 max-w-md mx-auto w-full space-y-5 sm:space-y-6 py-4">

          {/* Symbole mystique ✦ */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto">
            <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full" style={{ animation: 'spin-slow 30s linear infinite' }}></div>
            <div className="absolute inset-2 border border-purple-400/30 rounded-full" style={{ animation: 'spin-reverse 20s linear infinite' }}></div>
            <div className="absolute inset-4 border border-blue-400/20 rounded-full" style={{ animation: 'spin-slow 30s linear infinite' }}></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl sm:text-5xl text-amber-300/90 font-serif" style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}>✦</div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-purple-400/10 to-blue-400/10 rounded-full blur-2xl" style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}></div>
          </div>

          {/* Titre */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
            {t('gender.title') || 'Genre'}
          </h1>

          {/* Sous-titre */}
          <p className="text-purple-100 text-sm sm:text-base font-light leading-relaxed max-w-sm mx-auto px-4">
            {t('gender.subtitle') || 'Indiquez votre genre afin de personnaliser votre expérience'}
          </p>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/40"></div>
            <span className="text-amber-400/70 text-lg">✦</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/40"></div>
          </div>

          {/* Sélecteur de genre */}
          <div className="w-full max-w-sm mx-auto space-y-2.5 sm:space-y-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedGender(option.value)}
                className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-300 group
                  ${selectedGender === option.value
                    ? 'border-amber-400 bg-amber-400/20 scale-[1.02] shadow-lg shadow-amber-400/20'
                    : 'border-purple-500/30 bg-purple-800/20 hover:border-amber-400/50 hover:bg-purple-700/30 hover:scale-[1.01] hover:shadow-md hover:shadow-purple-400/10'
                  }`}
              >
                <span className={`text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110 ${
                  selectedGender === option.value ? 'animate-bounce-once' : ''
                }`}>
                  {option.icon}
                </span>
                <span className={`flex-1 text-left text-base sm:text-lg font-medium transition-colors ${
                  selectedGender === option.value ? 'text-amber-200' : 'text-purple-200 group-hover:text-amber-200'
                }`}>
                  {option.label}
                </span>
                {selectedGender === option.value && (
                  <span className="text-amber-400 text-xl animate-fade-in">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Bouton retour */}
          <div className="flex justify-center pt-2">
            <MysticalButton
              variant="secondary"
              onClick={onBack}
              data-testid="button-back"
              className="px-6 py-2 text-sm sm:text-base rounded-full font-medium tracking-wide 
                         shadow-md hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-amber-300">←</span>
                <span>{t('gender.back') || 'Retour'}</span>
              </span>
            </MysticalButton>
          </div>
        </div>

        {/* Spacer bas */}
        <div className="pb-2"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </>
  );
}