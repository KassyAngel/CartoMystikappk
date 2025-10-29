import { useState, useEffect } from "react";
import GrimoireModal from "./pages/GrimoireModal";
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
import { showBanner, showInterstitialAd } from './admobService';
import { config } from '@/config';

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

  // Afficher la bannière au démarrage
  useEffect(() => {
    showBanner();
  }, []);

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
  }, []);

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

  // 🗑️ NOUVELLE FONCTION : Effacer tout le Grimoire
  const clearAllReadings = async () => {
    try {
      console.log('🗑️ Suppression de tous les tirages du Grimoire...');

      // Appel API pour supprimer tous les tirages
      const response = await fetch(`${config.apiBaseUrl}/api/readings`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Vider l'état local
      setReadings([]);

      console.log('🔥 Grimoire complètement vidé !');
    } catch (error) {
      console.error('❌ Erreur lors du vidage du grimoire:', error);
      alert('Une erreur est survenue lors de la suppression des tirages.');
    }
  };

  const addReading = async (reading: Omit<Reading, 'id' | 'notes' | 'isFavorite'>) => {
    // ❌ Liste des types à NE PAS sauvegarder dans le Grimoire
    const typesExcludedFromGrimoire = ['crystalBall', 'horoscope', 'mysteryDice', 'bonusRoll'];
    const shouldSaveInGrimoire = !typesExcludedFromGrimoire.includes(reading.type);

    try {
      console.log('📤 Envoi tirage:', reading.type);

      // ✅ Envoyer au serveur SEULEMENT si c'est un type à sauvegarder
      if (shouldSaveInGrimoire) {
        const response = await fetch(`${config.apiBaseUrl}/api/readings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(reading)
        });

        // ⚠️ IGNORE l'erreur 403 (ancienne limite obsolète)
        if (response.status === 403) {
          console.log('⚠️ Erreur 403 ignorée (limite supprimée côté serveur)');
          // Ne rien faire, continuer normalement
        } else if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        } else {
          const newReading = await response.json();

          // ✅ Ajouter à l'état local
          setReadings(prev => [
            { ...newReading, date: new Date(newReading.date) },
            ...prev
          ]);
          console.log('✅ Tirage enregistré dans Grimoire:', newReading.id);
        }
      } else {
        console.log(`🚫 ${reading.type} non sauvegardé dans Grimoire (type exclu)`);
      }

      // 🎬 SYSTÈME PUB UNIFIÉ (avec vérification Premium)
      if (!isPremium) {
        const newCount = readingCount + 1;
        setReadingCount(newCount);

        let shouldShowAd = false;
        const isCrystalBall = reading.type === 'crystalBall';

        if (isCrystalBall) {
          shouldShowAd = newCount === 2 || (newCount > 2 && (newCount - 2) % 3 === 0);
          console.log(`🔮 Crystal Ball n°${newCount} → Pub: ${shouldShowAd ? 'OUI' : 'NON'}`);
        } else {
          shouldShowAd = newCount === 1 || newCount % 2 === 0;
          console.log(`🌟 ${reading.type} n°${newCount} → Pub: ${shouldShowAd ? 'OUI' : 'NON'}`);
        }

        if (shouldShowAd) {
          console.log(`🎬 Affichage pub interstitielle (tirage global n°${newCount})`);
          setTimeout(() => {
            showInterstitialAd();
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

              <Toaster />

              <div className="w-full h-full overflow-y-auto">
                <Router 
                  onSaveReading={addReading} 
                  onStepChange={setCurrentStep} 
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