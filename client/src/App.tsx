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
import { showBannerAd, showInterstitialAd } from './admobService';

export interface Reading {
  id: string;
  type: 'tarot' | 'oracle' | 'crystal' | 'horoscope' | 'angels' | 'runes' |'crystalBall'
  oracleTitle?: string;
  date: Date;
  cards?: string[];
  question?: string;
  answer?: string;
  notes: string;
  isFavorite: boolean;
}

type AppStep = 'landing' | 'name' | 'date' | 'gender' | 'oracle' | 'game' | 'revelation' | 'interpretation' | 'horoscope' | 'crystalBall' | 'responsiveTest';

function Router({ onSaveReading, onStepChange }: { 
  onSaveReading: (reading: any) => Promise<void>;
  onStepChange: (step: AppStep) => void;
}) {
  return (
    <Switch>
      <Route path="/">
        <OracleMystiqueApp 
          onSaveReading={onSaveReading} 
          onStepChange={onStepChange} 
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
    showBannerAd();
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
      const premiumResponse = await fetch('/api/user/premium-status', {
        credentials: 'include'
      });
      const premiumData = await premiumResponse.json();
      setIsPremium(premiumData.isPremium);

      const readingsResponse = await fetch('/api/readings', {
        credentials: 'include'
      });
      const readingsData = await readingsResponse.json();
      setReadings(readingsData.readings.map((r: any) => ({
        ...r,
        date: new Date(r.date)
      })));
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async (readingId: string, note: string) => {
    try {
      await fetch(`/api/readings/${readingId}/note`, {
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
      console.error('Erreur sauvegarde note:', error);
    }
  };

  const handleToggleFavorite = async (readingId: string) => {
    const reading = readings.find(r => r.id === readingId);
    if (!reading) return;

    try {
      await fetch(`/api/readings/${readingId}/favorite`, {
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
      console.error('Erreur toggle favori:', error);
    }
  };

  const addReading = async (reading: Omit<Reading, 'id' | 'notes' | 'isFavorite'>) => {
    // ❌ NE PAS sauvegarder Crystal Ball dans le Grimoire
    if (reading.type === 'crystalBall') {
      console.log('🔮 Crystal Ball not saved in Grimoire');
      return;
    }

    try {
      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reading)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const newReading = await response.json();
      setReadings(prev => [
        { ...newReading, date: new Date(newReading.date) },
        ...prev
      ]);

      // 🎯 Gestion des pubs interstitielles
      const newCount = readingCount + 1;
      setReadingCount(newCount);

      console.log(`📊 Compteur de tirages: ${newCount}`); 

      // Afficher pub : après le 1er tirage, puis toutes les 2
      if (newCount === 1 || newCount % 2 === 0) {
        console.log(`📢 Affichage pub (tirage n°${newCount})`);
        setTimeout(() => {
          showInterstitialAd();
        }, 1000); // Attend 1 seconde après le tirage
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