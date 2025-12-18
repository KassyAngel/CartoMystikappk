import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import MysticalButton from '@/components/MysticalButton';
import LanguageSelector from '@/components/LanguageSelector';
import DisclaimerModal from '@/components/DisclaimerModal';
import { useLanguage } from '@/contexts/LanguageContext';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const { t, isLanguageLoaded } = useLanguage();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  // ✅ Vérifier si le disclaimer a déjà été accepté (avec Capacitor Preferences)
  useEffect(() => {
    const checkDisclaimer = async () => {
      try {
        const { value } = await Preferences.get({ key: 'disclaimerAccepted' });

        if (!value) {
          // 🔴 IMPORTANT : Attendre que la langue soit chargée avant d'afficher le disclaimer
          if (isLanguageLoaded) {
            setTimeout(() => setShowDisclaimer(true), 300);
          }
        } else {
          setDisclaimerChecked(true);
        }
      } catch (error) {
        console.error('❌ Erreur lecture disclaimer:', error);
        // En cas d'erreur, afficher le disclaimer par sécurité
        if (isLanguageLoaded) {
          setTimeout(() => setShowDisclaimer(true), 300);
        }
      }
    };

    checkDisclaimer();
  }, [isLanguageLoaded]);

  const handleDisclaimerAccept = async () => {
    try {
      // ✅ Sauvegarder avec Capacitor Preferences au lieu de localStorage
      await Preferences.set({
        key: 'disclaimerAccepted',
        value: 'true'
      });

      setShowDisclaimer(false);
      setDisclaimerChecked(true);
      console.log('✅ Disclaimer accepté et sauvegardé');
    } catch (error) {
      console.error('❌ Erreur sauvegarde disclaimer:', error);
      // Continuer quand même
      setShowDisclaimer(false);
      setDisclaimerChecked(true);
    }
  };

  return (
    <div className="landing-page min-h-screen flex flex-col justify-between items-center text-center p-4 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#0a0118] via-[#1a0933] to-[#0a0118]">

      {/* ✅ Modal Disclaimer - PRIORITAIRE */}
      {showDisclaimer && <DisclaimerModal onAccept={handleDisclaimerAccept} />}

      {/* 🌍 Sélecteur de langue en haut à droite - masqué si disclaimer affiché */}
      {!showDisclaimer && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
          <LanguageSelector />
        </div>
      )}

      {/* Effets de fond mystiques améliorés */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient radial animé */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] animate-pulse-slower"></div>
        <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-amber-600/15 rounded-full blur-[100px] animate-pulse-slow"></div>

        {/* Grille mystique subtile */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Étoiles scintillantes */}
        <div className="absolute top-20 left-[10%] text-amber-300/30 text-xl animate-twinkle">✦</div>
        <div className="absolute top-[30%] right-[15%] text-purple-300/25 text-lg animate-twinkle-delayed">✦</div>
        <div className="absolute bottom-[25%] left-[20%] text-blue-300/20 text-base animate-twinkle">✦</div>
        <div className="absolute bottom-[15%] right-[20%] text-amber-300/25 text-xl animate-twinkle-delayed">✦</div>
        <div className="absolute top-[40%] left-[8%] text-purple-300/20 text-sm animate-twinkle">✦</div>
        <div className="absolute top-[60%] right-[12%] text-blue-300/20 text-sm animate-twinkle-delayed">✦</div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center w-full max-w-3xl px-4">

        {/* Symbole mystique élégant */}
        <div className="mb-8 sm:mb-10">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
            {/* Cercles concentriques animés */}
            <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border border-purple-400/30 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-8 border border-blue-400/20 rounded-full animate-spin-slow"></div>

            {/* Symbole central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl sm:text-6xl text-amber-300/90 font-serif">✦</div>
            </div>

            {/* Lueur ambiante */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
        </div>

        {/* Titre principal avec effet gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 sm:mb-8 leading-tight tracking-wide">
          <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent animate-gradient">
            {t('landing.title')}
          </span>
        </h1>

        {/* Sous-titre raffiné */}
        <p className="text-purple-100 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
          {t('landing.subtitle')}
        </p>

        {/* Séparateur décoratif */}
        <div className="flex items-center gap-4 mb-10 sm:mb-12">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-amber-400/40 to-amber-400/70"></div>
          <span className="text-amber-300/70 text-2xl animate-pulse-slow">✦</span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-amber-400/40 to-amber-400/70"></div>
        </div>

        {/* Bouton principal avec effet premium */}
        <div className="relative group">
          {/* Aura externe */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/0 via-amber-400/20 to-amber-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

          {/* Bouton */}
          <MysticalButton 
            onClick={onEnter}
            disabled={!disclaimerChecked}
            className="relative group text-sm sm:text-base py-3 px-10 sm:px-12 min-h-[48px] rounded-full font-serif uppercase tracking-widest text-amber-100 
                       bg-gradient-to-br from-[#4b2c7a] via-[#5c2a7e] to-[#b07cff] 
                       border border-amber-300/40 
                       shadow-[0_0_15px_rgba(255,215,0,0.15)] 
                       hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] 
                       transition-all duration-500 ease-out backdrop-blur-sm overflow-hidden
                       disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-enter"
          >
            {/* Effet lumineux interne */}
            <span className="absolute inset-0 rounded-full bg-amber-300/10 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></span>

            {/* Contenu du bouton */}
            <span className="relative z-10 flex items-center gap-2">
              <span>{t('landing.enter')}</span>
              <span className="text-amber-200 text-xl transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </MysticalButton>
        </div>

        {/* Message discret */}
        <p className="mt-8 text-purple-200 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed" data-testid="text-ads-support">
          {t('landing.ads.support')}
        </p>
      </div>

      {/* Footer avec copyright (optionnel) */}
      <div className="relative z-10 pb-4 text-purple-300/30 text-xs">
        <div className="animate-float">✦</div>
      </div>

      {/* Styles d'animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 20s linear infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite 1s;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}