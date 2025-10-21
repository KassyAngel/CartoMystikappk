import { useState, useEffect } from 'react';
import StarsBackground from '@/components/StarsBackground';
import LandingPage from './LandingPage';
import NamePage from './NamePage';
import DatePage from './DatePage';
import GenderPage from './GenderPage';
import OracleSelection from './OracleSelection';
import CardGame from './CardGame';
import RevelationPage from './RevelationPage';
import InterpretationPage from './InterpretationPage';
import HoroscopePage from './HoroscopePage';
import { ZodiacSign } from '@shared/schema';
import { oracleData } from '@/data/oracleData';
import ResponsiveTest from '@/components/ResponsiveTest';
import CrystalBallPage from './CrystalBallPage';
import { useUser } from '@/contexts/UserContext'; // ✅ Import du context

type AppStep =
  | 'landing'
  | 'name'
  | 'date'
  | 'gender'
  | 'oracle'
  | 'game'
  | 'revelation'
  | 'interpretation'
  | 'horoscope'
  | 'crystalBall'
  | 'responsiveTest';

interface OracleMystiqueAppProps {
  onSaveReading?: (reading: any) => Promise<void>;
  onStepChange?: (step: AppStep) => void;
}

export default function OracleMystiqueApp({ onSaveReading, onStepChange }: OracleMystiqueAppProps) {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const { user, setUser, clearUser } = useUser(); // ✅ Utilisation du context
  const [selectedOracle, setSelectedOracle] = useState('');
  const [selectedCardIndices, setSelectedCardIndices] = useState<number[]>([]);

  // ✅ Informer le parent du changement d'étape
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  // ✅ Charger la session au démarrage (déjà géré par UserContext)
  useEffect(() => {
    if (user.name && user.birthDate && user.gender) {
      console.log('Session utilisateur chargée depuis le context:', user);
      setCurrentStep('oracle');
    }
  }, []);

  const handleEnter = () => setCurrentStep('name');

  const handleNameSubmit = (name: string) => {
    setUser({ ...user, name });
    setCurrentStep('date');
  };

  const handleDateSubmit = (birthDate: string, zodiacSign?: ZodiacSign) => {
    setUser({ ...user, birthDate, zodiacSign });
    setCurrentStep('gender');
  };

  const handleGenderSubmit = (gender: string) => {
    setUser({ ...user, gender });
    console.log('Session utilisateur sauvegardée dans le context');
    setCurrentStep('oracle');
  };

  const handleOracleSelect = (oracleType: string) => {
    setSelectedOracle(oracleType);
    if (oracleType === 'horoscope') setCurrentStep('horoscope');
    else if (oracleType === 'crystalBall') setCurrentStep('crystalBall');
    else setCurrentStep('game');
  };

  const handleCardsSelected = (cardIndices: number[]) => {
    setSelectedCardIndices(cardIndices);
    setCurrentStep('revelation');
  };

  const handleRevealInterpretation = () => setCurrentStep('interpretation');
  const handleBackToCards = () => setCurrentStep('revelation');
  const handleBackToName = () => setCurrentStep('name');
  const handleBackToDate = () => setCurrentStep('date');
  const handleBackToGender = () => setCurrentStep('gender');
  const handleBackToOracle = () => setCurrentStep('oracle');
  const handleGoToCrystalBall = () => setCurrentStep('crystalBall');

  const handleBackToHome = () => {
    clearUser(); // ✅ Utilisation du context
    console.log('Session utilisateur effacée');
    setCurrentStep('landing');
    setSelectedOracle('');
    setSelectedCardIndices([]);
  };

  const oracle = selectedOracle ? oracleData[selectedOracle] : null;

  const handleSaveReading = async (reading: any) => {
    try {
      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reading)
      });
      if (response.ok) {
        const savedReading = await response.json();
        console.log('✅ Tirage enregistré dans le grimoire :', savedReading);
        if (onSaveReading) {
          await onSaveReading(savedReading);
        }
      }
    } catch (error) {
      console.error('❌ Erreur sauvegarde tirage:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarsBackground />

      <main className="flex-grow flex flex-col justify-center items-center max-w-6xl mx-auto p-5">
        {currentStep === 'responsiveTest' && <ResponsiveTest />}
        {currentStep === 'landing' && <LandingPage onEnter={handleEnter} />}
        {currentStep === 'name' && <NamePage onNext={handleNameSubmit} />}
        {currentStep === 'date' && <DatePage onNext={handleDateSubmit} onBack={handleBackToName} />}
        {currentStep === 'gender' && (
          <GenderPage onNext={handleGenderSubmit} onBack={handleBackToDate} />
        )}
        {currentStep === 'oracle' && (
          <OracleSelection
            user={user}
            onOracleSelect={handleOracleSelect}
            onBack={handleBackToGender}
            onHome={handleBackToHome}
          />
        )}
        {currentStep === 'game' && oracle && (
          <CardGame
            user={user}
            oracle={oracle}
            oracleType={selectedOracle as any}
            onCardsSelected={handleCardsSelected}
            onBack={handleBackToOracle}
          />
        )}
        {currentStep === 'revelation' && oracle && (
          <RevelationPage
            user={user}
            oracle={oracle}
            oracleType={selectedOracle as any}
            selectedCardIndices={selectedCardIndices}
            onBack={handleBackToOracle}
            onRevealInterpretation={handleRevealInterpretation}
          />
        )}

        {currentStep === 'interpretation' && oracle && (
          <InterpretationPage
            user={user}
            oracle={oracle}
            oracleType={selectedOracle as any}
            selectedCardIndices={selectedCardIndices}
            selectedCards={selectedCardIndices.map(index => oracle.cards[index])}
            onBack={handleBackToCards}
            onHome={handleBackToOracle}
            onCrystalBall={handleGoToCrystalBall}
            onSaveReading={handleSaveReading}
          />
        )}

        {currentStep === 'horoscope' && (
          <HoroscopePage
            user={user}
            onBack={handleBackToOracle}
            onHome={handleBackToHome}
          />
        )}

        {currentStep === 'crystalBall' && (
          <CrystalBallPage
            user={user}
            onBack={handleBackToOracle}
            onSaveReading={handleSaveReading}
          />
        )}
      </main>
    </div>
  );
}