import { useState, useEffect } from "react";
import GrimoireModal from './pages/GrimoireModal';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import PremiumModal from './components/PremiumModal';
import NotificationPermissionModal from './components/NotificationPermissionModal';
import RatingModal from './components/RatingModal';
import TopBar from './components/TopBar';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserProvider } from "@/contexts/UserContext";
import OracleMystiqueApp from "@/pages/OracleMystiqueApp";
import NotFound from "@/pages/not-found";
import { initialize as initializeAdMob, showBanner, hideBanner, showInterstitialAd, preloadInterstitial } from './admobService';
import { initializeRevenueCat } from './services/revenueCatService';
import { config } from '@/config';
import { getUserEmail } from '@/lib/userStorage';
import { getDeviceId } from '@/lib/deviceId';

export interface Reading {
  id: string;
  type: 'tarot' | 'oracle' | 'crystal' | 'horoscope' | 'angels' | 'runes' | 'crystalBall' | 'mysteryDice' | 'bonusRoll';
  oracleTitle?: string;
  date: Date;
  cards?: string[];
  question?: string;
  answer?: string;
  notes: string;
  isFavorite: boolean;
}

type AppStep =
  | 'landing' | 'name' | 'date' | 'gender'
  | 'oracle' | 'game' | 'revelation' | 'interpretation'
  | 'horoscope' | 'crystalBall' | 'mysteryDice' | 'bonusRoll'
  | 'responsiveTest';

function Router({ onSaveReading, onStepChange, shouldShowAdBeforeReading, isPremium }: {
  onSaveReading: (reading: any) => Promise<void>;
  onStepChange: (step: AppStep) => void;
  shouldShowAdBeforeReading: (oracleType: string) => Promise<boolean>;
  isPremium: boolean;
}) {
  return (
    <Switch>
      <Route path="/success" component={PaymentSuccessPage} />
      <Route path="/cancel" component={PaymentCancelPage} />
      <Route path="/">
        <OracleMystiqueApp
          onSaveReading={onSaveReading}
          onStepChange={onStepChange as any}
          shouldShowAdBeforeReading={shouldShowAdBeforeReading}
          isPremium={isPremium}
        />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isPremium, setIsPremium] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [readingCount, setReadingCount] = useState(0);
  const [bannerShown, setBannerShown] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    const initDeviceId = async () => {
      const id = await getDeviceId();
      setDeviceId(id);
      console.log('🔑 Device ID initialisé:', id);
    };
    initDeviceId();
  }, []);

  useEffect(() => {
    const migrateData = async () => {
      if (!deviceId) return;

      const migrationDone = localStorage.getItem('migration_done');
      if (migrationDone) return;

      try {
        const response = await fetch(`${config.apiBaseUrl}/api/readings/migrate`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Device-ID': deviceId 
          },
          credentials: 'include'
        });

        if (response.ok) {
          localStorage.setItem('migration_done', 'true');
          console.log('✅ Migration des données terminée');
        }
      } catch (error) {
        console.error('❌ Erreur migration:', error);
      }
    };

    migrateData();
  }, [deviceId]);

  // ✅ Initialisation AdMob + RevenueCat
  useEffect(() => {
    const initServices = async () => {
      try {
        await initializeAdMob();
        await initializeRevenueCat();
        console.log('✅ Services AdMob + RevenueCat initialisés');
      } catch (error) {
        console.error('❌ Erreur initialisation services:', error);
      }
    };
    initServices();
  }, []);

  // ✅ GESTION BANNIÈRE : Permanente à partir de la page Oracle (sauf Premium)
  useEffect(() => {
    if (isPremium) {
      console.log('👑 Premium actif : bannière cachée');
      if (bannerShown) {
        hideBanner();
        setBannerShown(false);
      }
      return;
    }

    // Pages où la bannière NE doit PAS s'afficher (onboarding uniquement)
    const noBannerPages = ['landing', 'name', 'date', 'gender'];
    const shouldShowBanner = !noBannerPages.includes(currentStep);

    // Afficher la bannière sur toutes les pages après l'onboarding
    if (shouldShowBanner && !bannerShown) {
      console.log(`🎯 Page "${currentStep}" atteinte → Affichage de la bannière permanente`);
      const timer = setTimeout(() => {
        showBanner();
        setBannerShown(true);
        console.log('📺 Bannière affichée en permanence (utilisateur gratuit)');
      }, 500);

      return () => clearTimeout(timer);
    }

    // Cacher la bannière uniquement si on retourne sur les pages d'onboarding
    if (!shouldShowBanner && bannerShown) {
      console.log('👋 Retour à l\'onboarding → Masquer la bannière');
      hideBanner();
      setBannerShown(false);
    }
  }, [currentStep, isPremium, bannerShown]);

  const showTopBar = !['landing', 'name', 'date', 'gender'].includes(currentStep);

  useEffect(() => {
    const checkNotificationPermission = () => {
      const permission = localStorage.getItem('notificationPermission');
      if (!permission && currentStep === 'oracle') {
        setShowNotificationModal(true);
      }
    };
    checkNotificationPermission();
  }, [currentStep]);

  useEffect(() => {
    if (!deviceId) return;
    loadUserData();
    checkPremiumExpiration();

    const interval = setInterval(() => {
      loadUserData();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [deviceId]);

  const loadUserData = async () => {
    if (!deviceId) {
      console.log('⏳ Device ID pas encore initialisé, on attend...');
      return;
    }

    try {
      const savedEmail = await getUserEmail();

      const premiumResponse = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
        credentials: 'include',
        headers: savedEmail ? { 'x-user-email': savedEmail } : {},
      });
      const premiumData = await premiumResponse.json();
      setIsPremium(premiumData.isPremium);

      console.log('✅ Statut Premium:', premiumData.isPremium, savedEmail ? `(email: ${savedEmail})` : '(sans email)');

      const readingsResponse = await fetch(`${config.apiBaseUrl}/api/readings`, {
        credentials: 'include',
        headers: {
          'X-Device-ID': deviceId
        }
      });

      if (!readingsResponse.ok) {
        const errorData = await readingsResponse.json();
        console.error('❌ Erreur chargement tirages:', errorData);
        setIsLoading(false);
        return;
      }

      const readingsData = await readingsResponse.json();
      setReadings(
        readingsData.readings.map((r: any) => ({
          ...r,
          date: new Date(r.date)
        }))
      );

      console.log('✅ Données chargées:', readingsData.readings.length, 'tirages pour device:', deviceId);
    } catch (error) {
      console.error('❌ Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPremiumExpiration = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/user/premium-expiration-alert`, {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.shouldAlert) {
        let alertMessage = '';

        if (data.alertType === 'expired') {
          alertMessage = `⚠️ Votre accès Premium a expiré.\n\nVous pouvez souscrire à nouveau pour profiter des avantages Premium.`;
        } else if (data.alertType === 'warning') {
          const days = data.daysRemaining;
          const expirationDate = new Date(data.expirationDate).toLocaleDateString('fr-FR');
          alertMessage = `🔔 Votre accès Premium expire dans ${days} jour${days > 1 ? 's' : ''}.\n\nDate d'expiration : ${expirationDate}\n\nPour renouveler, rendez-vous dans le menu Premium.`;
        }

        if (alertMessage) {
          setTimeout(() => {
            alert(alertMessage);
            if (data.alertType === 'expired') {
              setTimeout(() => window.location.reload(), 1000);
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.error('❌ Erreur vérification expiration Premium:', error);
    }
  };

  const handleSaveNote = async (readingId: string, note: string) => {
    if (!deviceId) return;

    try {
      await fetch(`${config.apiBaseUrl}/api/readings/${readingId}/note`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-Device-ID': deviceId
        },
        credentials: 'include',
        body: JSON.stringify({ note })
      });

      setReadings(prev =>
        prev.map(r => r.id === readingId ? { ...r, notes: note } : r)
      );
    } catch (error) {
      console.error('❌ Erreur sauvegarde note:', error);
    }
  };

  const handleToggleFavorite = async (readingId: string) => {
    if (!deviceId) return;

    const reading = readings.find(r => r.id === readingId);
    if (!reading) return;

    try {
      await fetch(`${config.apiBaseUrl}/api/readings/${readingId}/favorite`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-Device-ID': deviceId
        },
        credentials: 'include',
        body: JSON.stringify({ isFavorite: !reading.isFavorite })
      });

      setReadings(prev =>
        prev.map(r => r.id === readingId ? { ...r, isFavorite: !r.isFavorite } : r)
      );
    } catch (error) {
      console.error('❌ Erreur toggle favori:', error);
    }
  };

  const clearAllReadings = async () => {
    if (!deviceId) return;

    try {
      console.log('🗑️ Suppression de tous les tirages du Grimoire...');
      const response = await fetch(`${config.apiBaseUrl}/api/readings`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-Device-ID': deviceId
        }
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');
      setReadings([]);
      console.log('🔥 Grimoire vidé !');
    } catch (error) {
      console.error('❌ Erreur vidage grimoire:', error);
      alert('Une erreur est survenue lors de la suppression des tirages.');
    }
  };

  // ✅ SYSTÈME DE PUB AVANT TIRAGE (pour les tirages globaux uniquement)
  const shouldShowAdBeforeReading = async (oracleType: string): Promise<boolean> => {
    console.log(`🎯 [PUB CHECK] Oracle sélectionné: "${oracleType}"`);

    if (isPremium) {
      console.log('👑 Premium actif : pas de pub');
      return false;
    }

    // ✅ Horoscope et BonusRoll ont leur propre système de pub
    if (oracleType === 'horoscope' || oracleType === 'bonusRoll') {
      console.log(`⏭️ "${oracleType}" exclu : pas de pub interstitielle (système propre)`);
      return false;
    }

    const nextCount = readingCount + 1;
    const shouldShow = nextCount % 3 === 0;

    console.log(`📊 Compteur: ${readingCount} → ${nextCount} | Pub: ${shouldShow ? 'OUI ✅' : 'NON ❌'}`);

    if (shouldShow) {
      console.log('🎬 Affichage pub interstitielle AVANT le tirage');
      try {
        await showInterstitialAd(`before_${oracleType}`);
        console.log('✅ Pub interstitielle affichée avec succès');
      } catch (error) {
        console.error('❌ Erreur pub interstitielle:', error);
      }
    }

    // Pré-charger la prochaine pub
    if ((nextCount + 1) % 3 === 0) {
      console.log(`🔄 Pré-chargement pub pour le tirage #${nextCount + 1}`);
      setTimeout(() => preloadInterstitial(), 1000);
    }

    return shouldShow;
  };

  // ✅ SYSTÈME D'ÉVALUATION GOOGLE PLAY
  const checkAndShowRating = () => {
    // Récupérer les données de rating
    const hasRated = localStorage.getItem('hasRatedApp');
    const readingCountStr = localStorage.getItem('ratingReadingCount');
    const currentCount = parseInt(readingCountStr || '0', 10);

    // Si déjà noté, ne rien faire
    if (hasRated === 'true') {
      console.log('⭐ Utilisateur a déjà noté l\'app');
      return;
    }

    // Incrémenter le compteur
    const newCount = currentCount + 1;
    localStorage.setItem('ratingReadingCount', newCount.toString());

    console.log(`⭐ Compteur rating: ${currentCount} → ${newCount}`);

    // Afficher le modal après 5 tirages
    if (newCount === 5) {
      console.log('🎯 5 tirages atteints → Affichage du modal de rating');
      setTimeout(() => {
        setShowRatingModal(true);
      }, 2000); // 2 secondes après le tirage pour ne pas être intrusif
    }
  };

  const handleRateApp = () => {
    console.log('⭐ Utilisateur a accepté de noter l\'app');

    // Marquer comme noté pour ne plus redemander
    localStorage.setItem('hasRatedApp', 'true');
    setShowRatingModal(false);

    // ✅ Redirection vers Google Play Store avec votre URL
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.cartomystik.app&pli=1';

    // Ouvrir dans un nouvel onglet (pour le web) ou dans l'app Play Store (pour mobile)
    window.open(playStoreUrl, '_blank');

    console.log('📱 Redirection vers Google Play Store');
  };

  const handleCloseRating = () => {
    console.log('⭐ Utilisateur a choisi "Plus tard"');
    setShowRatingModal(false);

    // Redemander dans 5 tirages (réinitialiser le compteur à 0)
    const currentCount = parseInt(localStorage.getItem('ratingReadingCount') || '0', 10);
    localStorage.setItem('ratingReadingCount', (currentCount - 5).toString());

    console.log('⏭️ Modal de rating redemandera dans 5 tirages');
  };

  const addReading = async (reading: Omit<Reading, 'id' | 'notes' | 'isFavorite'>) => {
    if (!deviceId) return;

    // ✅ Types NON sauvegardés dans le Grimoire
    const typesExcludedFromGrimoire = ['crystalBall', 'horoscope', 'mysteryDice', 'bonusRoll'];
    const shouldSaveInGrimoire = !typesExcludedFromGrimoire.includes(reading.type);

    // ✅ Types comptabilisés pour le système de pub global
    const typesCountedForAds = ['tarot', 'oracle', 'angels', 'runes', 'crystalBall', 'crystal'];
    const shouldIncrementCounter = typesCountedForAds.includes(reading.type);

    try {
      console.log(`📤 Sauvegarde tirage: "${reading.type}" | Grimoire: ${shouldSaveInGrimoire} | Compteur: ${shouldIncrementCounter}`);

      if (shouldSaveInGrimoire) {
        const response = await fetch(`${config.apiBaseUrl}/api/readings`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Device-ID': deviceId
          },
          credentials: 'include',
          body: JSON.stringify(reading)
        });

        if (response.status === 403) {
          console.log('⚠️ Erreur 403 ignorée');
        } else if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Erreur HTTP ${response.status}:`, errorText);
          throw new Error(`Erreur HTTP: ${response.status}`);
        } else {
          const newReading = await response.json();
          setReadings(prev => [
            { ...newReading, date: new Date(newReading.date) },
            ...prev
          ]);
          console.log('✅ Tirage enregistré dans le Grimoire:', newReading.id);
        }
      }

      if (shouldIncrementCounter) {
        setReadingCount(prev => {
          const newCount = prev + 1;
          console.log(`📊 ✅ Compteur mis à jour: ${prev} → ${newCount} (type: ${reading.type})`);
          return newCount;
        });

        // ✅ Vérifier si on doit montrer le modal de rating
        checkAndShowRating();
      } else {
        console.log(`📊 ⏭️ Type "${reading.type}" NON comptabilisé (système pub indépendant)`);
      }

    } catch (error) {
      console.error('❌ Erreur ajout tirage:', error);
      alert('⚠️ Erreur lors de la sauvegarde du tirage.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
        <div className="text-purple-400 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <TooltipProvider>
            <div className="dark relative w-screen h-screen overflow-hidden">
              {/* ✅ CSS pour éviter que la bannière cache les boutons */}
              {!isPremium && bannerShown && (
                <style>{`
                  /* ✅ Espace réservé pour la bannière AdMob (60px) + marge de sécurité (50px) */
                  .main-content {
                    padding-bottom: 110px !important;
                  }

                  /* ✅ Classe pour les éléments qui doivent rester visibles */
                  .pb-safe {
                    padding-bottom: 110px !important;
                  }

                  /* ✅ Responsive desktop */
                  @media (min-width: 640px) {
                    .main-content, .pb-safe {
                      padding-bottom: 120px !important;
                    }
                  }

                  /* ⚠️ CRITIQUE : Empêcher l'overlap des boutons avec la bannière */
                  button, a, input, textarea {
                    position: relative;
                    z-index: 10;
                  }

                  /* ⚠️ Bannière au-dessus du fond mais sous les overlays */
                  #admob-banner {
                    z-index: 5 !important;
                  }
                `}</style>
              )}

              {showTopBar && (
                <TopBar
                  onOpenGrimoire={() => setIsGrimoireOpen(true)}
                  onOpenPremium={() => setIsPremiumModalOpen(true)}
                  isPremium={isPremium}
                />
              )}

              {showNotificationModal && (
                <NotificationPermissionModal
                  onClose={() => setShowNotificationModal(false)}
                />
              )}

              {isGrimoireOpen && (
                <GrimoireModal
                  isPremium={isPremium}
                  readings={readings}
                  onSaveNote={handleSaveNote}
                  onToggleFavorite={handleToggleFavorite}
                  onClose={() => setIsGrimoireOpen(false)}
                  onClearAll={clearAllReadings}
                />
              )}

              {isPremiumModalOpen && (
                <PremiumModal
                  isOpen={isPremiumModalOpen}
                  onClose={() => setIsPremiumModalOpen(false)}
                  onPurchase={() => {
                    setIsPremiumModalOpen(false);
                    window.location.reload();
                  }}
                />
              )}

              {/* ✅ MODAL DE RATING GOOGLE PLAY */}
              {showRatingModal && (
                <RatingModal
                  onClose={handleCloseRating}
                  onRate={handleRateApp}
                />
              )}

              <Toaster />

              <div className={`w-full h-full overflow-y-auto ${!isPremium && bannerShown ? 'main-content' : ''}`}>
                <Router
                  onSaveReading={addReading}
                  onStepChange={setCurrentStep}
                  shouldShowAdBeforeReading={shouldShowAdBeforeReading}
                  isPremium={isPremium}
                />
              </div>
            </div>
          </TooltipProvider>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;