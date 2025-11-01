import { useState, useEffect } from "react";
import { useEffect as useRouteEffect } from "react";
import GrimoireModal from './pages/GrimoireModal';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import PremiumModal from './components/PremiumModal';
import NotificationPermissionModal from './components/NotificationPermissionModal';
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
import { initialize as initializeAdMob, showBanner, showInterstitialAd } from './admobService';
import { config } from '@/config';
import RestorePremiumPage from '@/pages/RestorePremiumPage';

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

type AppStep = 'landing' | 'name' | 'date' | 'gender' | 'oracle' | 'game' | 'revelation' | 'interpretation' | 'horoscope' | 'crystalBall' | 'mysteryDice' | 'bonusRoll' | 'responsiveTest';

function Router({ onSaveReading, onStepChange }: {
  onSaveReading: (reading: any) => Promise<void>;
  onStepChange: (step: AppStep) => void;
}) {
  return (
    <Switch>
      <Route path="/success" component={PaymentSuccessPage} />
      <Route path="/cancel" component={PaymentCancelPage} />
      <Route path="/">
        <OracleMystiqueApp
          onSaveReading={onSaveReading}
          onStepChange={onStepChange as any}
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
  const [readingCount, setReadingCount] = useState(0);
  const [showRestorePremium, setShowRestorePremium] = useState(false);

  // 🆕 Initialiser AdMob au démarrage
  useEffect(() => {
    const initAds = async () => {
      try {
        await initializeAdMob();
        console.log('✅ AdMob initialisé au démarrage');
      } catch (error) {
        console.error('❌ Erreur initialisation AdMob:', error);
      }
    };
    initAds();
  }, []);

  // Afficher la bannière au démarrage (sauf si Premium)
  useEffect(() => {
    if (!isPremium) {
      // 🔧 Délai de 2 secondes pour réduire la charge mémoire initiale
      const timer = setTimeout(() => {
        showBanner();
        console.log('📺 Bannière affichée (utilisateur gratuit)');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.log('👑 Bannière cachée (utilisateur Premium)');
    }
  }, [isPremium]);

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
    loadUserData();
    checkPremiumExpiration();

    // Écouter l'événement pour ouvrir la restauration Premium
    const handleShowRestore = () => setShowRestorePremium(true);
    window.addEventListener('showRestorePremium', handleShowRestore);
    return () => window.removeEventListener('showRestorePremium', handleShowRestore);

    // 🔄 Vérification automatique du statut Premium toutes les heures
    const premiumCheckInterval = setInterval(() => {
      loadUserData();
    }, 60 * 60 * 1000); // 1 heure

    return () => clearInterval(premiumCheckInterval);
  }, []);

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
          alertMessage = `🔔 Votre accès Premium expire dans ${days} jour${days > 1 ? 's' : ''}.\n\nDate d expiration : ${expirationDate}\n\nPour renouveler, rendez-vous dans le menu Premium.`;
        }

        if (alertMessage) {
          // Afficher l'alerte après un court délai pour ne pas perturber le chargement
          setTimeout(() => {
            alert(alertMessage);

            // 🔄 Si l'abonnement a expiré, recharger la page pour réactiver les limitations
            if (data.alertType === 'expired') {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.error('❌ Erreur vérification expiration Premium:', error);
    }
  };

  const loadUserData = async () => {
    try {
      const premiumResponse = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
        credentials: 'include'
      });
      const premiumData = await premiumResponse.json();
      setIsPremium(premiumData.isPremium);

      const readingsResponse = await fetch(`${config.apiBaseUrl}/api/readings`, {
        credentials: 'include'
      });
      const readingsData = await readingsResponse.json();
      setReadings(readingsData.readings.map((r: any) => ({
        ...r,
        date: new Date(r.date)
      })));

      console.log('✅ Données chargées:', readingsData.readings.length, 'tirages');
    } catch (error) {
      console.error('❌ Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async (readingId: string, note: string) => {
    try {
      await fetch(`${config.apiBaseUrl}/api/readings/${readingId}/note`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ note })
      });

      setReadings(prev =>
        prev.map(r =>
          r.id === readingId ? { ...r, notes: note } : r
        )
      );
    } catch (error) {
      console.error('❌ Erreur sauvegarde note:', error);
    }
  };

  const handleToggleFavorite = async (readingId: string) => {
    const reading = readings.find(r => r.id === readingId);
    if (!reading) return;

    try {
      await fetch(`${config.apiBaseUrl}/api/readings/${readingId}/favorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isFavorite: !reading.isFavorite })
      });

      setReadings(prev =>
        prev.map(r =>
          r.id === readingId ? { ...r, isFavorite: !r.isFavorite } : r
        )
      );
    } catch (error) {
      console.error('❌ Erreur toggle favori:', error);
    }
  };

  const clearAllReadings = async () => {
    try {
      console.log('🗑️ Suppression de tous les tirages du Grimoire...');

      const response = await fetch(`${config.apiBaseUrl}/api/readings`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setReadings([]);
      console.log('🔥 Grimoire complètement vidé !');
    } catch (error) {
      console.error('❌ Erreur lors du vidage du grimoire:', error);
      alert('Une erreur est survenue lors de la suppression des tirages.');
    }
  };

  const addReading = async (reading: Omit<Reading, 'id' | 'notes' | 'isFavorite'>) => {
    const typesExcludedFromGrimoire = ['crystalBall', 'horoscope', 'mysteryDice', 'bonusRoll'];
    const shouldSaveInGrimoire = !typesExcludedFromGrimoire.includes(reading.type);

    try {
      console.log('📤 Envoi tirage:', reading.type);

      if (shouldSaveInGrimoire) {
        const response = await fetch(`${config.apiBaseUrl}/api/readings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(reading)
        });

        if (response.status === 403) {
          console.log('⚠️ Erreur 403 ignorée (limite supprimée côté serveur)');
        } else if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        } else {
          const newReading = await response.json();

          setReadings(prev => [
            { ...newReading, date: new Date(newReading.date) },
            ...prev
          ]);
          console.log('✅ Tirage enregistré dans Grimoire:', newReading.id);
        }
      } else {
        console.log(`🚫 ${reading.type} non sauvegardé dans Grimoire (type exclu)`);
      }

      // 🎬 Système pub simplifié : 1 pub tous les 3 tirages
      if (!isPremium) {
        const newCount = readingCount + 1;
        setReadingCount(newCount);

        // Pub au 3ème tirage, puis tous les 3 tirages (3, 6, 9, 12...)
        const shouldShowAd = newCount % 3 === 0;

        console.log(`📊 Tirage n°${newCount} (${reading.type}) → Pub: ${shouldShowAd ? 'OUI ✅' : 'NON ❌'}`);

        if (shouldShowAd) {
          console.log(`🎬 Affichage pub interstitielle après 3 tirages`);
          setTimeout(() => {
            showInterstitialAd(`after_${reading.type}_reading`);
          }, 1000);
        }
      } else {
        console.log('👑 Premium actif : pas de publicité');
      }

    } catch (error) {
      console.error('❌ Erreur ajout tirage:', error);
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
                  isOpen={isGrimoireOpen}
                  onClose={() => setIsGrimoireOpen(false)}
                  readings={readings}
                  onSaveNote={handleSaveNote}
                  onToggleFavorite={handleToggleFavorite}
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

              <Toaster />

              <div className="w-full h-full overflow-y-auto">
                <Router
                  onSaveReading={addReading}
                  onStepChange={setCurrentStep}
                />
              </div>

              {showRestorePremium && (
                <RestorePremiumPage
                  onClose={() => setShowRestorePremium(false)}
                  onSuccess={() => {
                    setShowRestorePremium(false);
                    loadUserData();
                  }}
                />
              )}
            </div>
          </TooltipProvider>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;