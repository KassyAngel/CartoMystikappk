import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import MysticalInput from '@/components/MysticalInput';
import MysticalButton from '@/components/MysticalButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface NamePageProps {
  onNext: (name: string) => void;
}

export default function NamePage({ onNext }: NamePageProps) {
  const [name, setName] = useState('');
  const { t } = useLanguage();

  const handleNext = () => {
    if (name.trim()) onNext(name.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.trim()) handleNext();
  };

  return (
    <>
      <div className="intro-page active flex flex-col min-h-screen justify-center items-center bg-gradient-to-b from-[#0e0020] via-[#1b0338] to-[#0a0017] text-white px-6 relative overflow-hidden pt-16 sm:pt-20">

        {/* Effet d'étoiles de fond */}
        <div className="absolute inset-0 bg-[url('/stars-bg.svg')] bg-cover opacity-20 pointer-events-none"></div>

        {/* Halo central */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-400/10 via-purple-500/10 to-transparent blur-3xl"></div>

        {/* Barre de progression */}
        <div className="absolute top-0 left-0 w-full">
          <div className="mb-4">
            <ProgressBar progress={33} />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="z-10 flex flex-col items-center justify-center space-y-6 sm:space-y-7 w-full max-w-md">

          {/* Symbole mystique ✦ - COMME LA LANDING PAGE */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-2">
            {/* Cercles concentriques animés */}
            <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-3 border border-purple-400/30 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-6 border border-blue-400/20 rounded-full animate-spin-slow"></div>

            {/* Symbole central ✦ */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl sm:text-6xl text-amber-300/90 font-serif animate-pulse-slow">✦</div>
            </div>

            {/* Lueur ambiante */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>

          {/* Titre avec dégradé */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
            {t('name.title') || 'Prénom'}
          </h1>

          {/* Sous-texte */}
          <p className="text-purple-100 text-sm sm:text-base font-light leading-relaxed max-w-sm text-center">
            {t('name.subtitle') || 'Comment préférez-vous être appelé ? Entrez votre nom ou votre surnom.'}
          </p>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-400/40"></div>
            <span className="text-amber-400/70 text-xl">✦</span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-amber-400/40"></div>
          </div>

          {/* Input prénom */}
          <div className="w-full space-y-4 pt-4">
            <MysticalInput
              type="text"
              placeholder={t('name.placeholder') || 'Entrez votre prénom'}
              value={name}
              onChange={(value: string) => setName(value)}
              onKeyPress={handleKeyPress}
              className="text-center text-lg sm:text-xl font-serif bg-transparent border-b border-amber-300/40 focus:border-amber-300/80 transition-all duration-300 focus:scale-[1.02]"
            />

            {/* Bouton */}
            <div className="pt-4 flex justify-center">
              <MysticalButton 
                onClick={handleNext} 
                disabled={!name.trim()}
                className="px-8 py-2.5 text-sm sm:text-base rounded-full font-medium tracking-wide 
                           shadow-md hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>{t('name.next') || 'Suivant'}</span>
                  <span className="text-amber-300">→</span>
                </span>
              </MysticalButton>
            </div>
          </div>
        </div>

        {/* Spacer bas */}
        <div className="pb-4 sm:pb-6"></div>
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
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 20s linear infinite;
        }
      `}} />
    </>
  );
}