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
import BonusRollPage from './BonusRollPage';
import CrystalBallPage from './CrystalBallPage';
import ResponsiveTest from '@/components/ResponsiveTest';
import { ZodiacSign } from '@shared/schema';
import { oracleData } from '@/data/oracleData';
import { useUser } from '@/contexts/UserContext';

type AppStep =
  | 'landing' | 'name' | 'date' | 'gender'
  | 'oracle' | 'game' | 'revelation' | 'interpretation'
  | 'horoscope' | 'crystalBall' | 'bonusRoll' | 'responsiveTest';

interface OracleMystiqueAppProps {
  onSaveReading?: (reading: any) => Promise<void>;
  onStepChange?: ((step: AppStep) => void) | ((step: AppStep) => Promise<void>);
  shouldShowAdBeforeReading?: (oracleType: string) => Promise<boolean>;
  shouldShowAdForBonusRoll?: (oracleType: string) => Promise<boolean>; // ✅ AJOUT
  isPremium?: boolean;
}

export default function OracleMystiqueApp({ 
  onSaveReading, 
  onStepChange,
  shouldShowAdBeforeReading,
  shouldShowAdForBonusRoll, // ✅ AJOUT
  isPremium = false
}: OracleMystiqueAppProps) {
  const [currentStep, setCurrentStep] = useState<AppStep>('landing');
  const { user, setUser, clearUser } = useUser();
  const [selectedOracle, setSelectedOracle] = useState('');
  const [selectedCardIndices, setSelectedCardIndices] = useState<number[]>([]);

  useEffect(() => {
    if (onStepChange) {
      const result = onStepChange(currentStep);
      if (result instanceof Promise) {
        result.catch(err => console.error('Error in onStepChange:', err));
      }
    }
  }, [currentStep, onStepChange]);

  useEffect(() => {
    if (user.name && user.birthDate && user.gender) {
      console.log('Session utilisateur chargée depuis le context:', user);
      setCurrentStep('oracle');
    }
  }, []);

  const handleEnter = () => setCurrentStep('name');
  const handleNameSubmit = (name: string) => { setUser({ ...user, name }); setCurrentStep('date'); };
  const handleDateSubmit = (birthDate: string, zodiacSign?: ZodiacSign) => { setUser({ ...user, birthDate, zodiacSign }); setCurrentStep('gender'); };
  const handleGenderSubmit = (gender: string) => { setUser({ ...user, gender }); console.log('Session utilisateur sauvegardée dans le context'); setCurrentStep('oracle'); };

  const handleOracleSelect = async (oracleType: string) => {
    console.log(`🎯 Oracle sélectionné: "${oracleType}"`);

    // Pub classique pour tirages standards (bonusRoll géré dans OracleSelection)
    const typesWithInterstitialAd = ['tarot', 'oracle', 'angels', 'runes', 'crystalBall', 'crystal'];
    if (typesWithInterstitialAd.includes(oracleType) && shouldShowAdBeforeReading) {
      console.log('🎬 Vérification pub avant tirage...');
      await shouldShowAdBeforeReading(oracleType);
    } else {
      console.log(`⏭️ "${oracleType}" — pub gérée en amont ou absente`);
    }

    setSelectedOracle(oracleType);
    if (oracleType === 'horoscope') setCurrentStep('horoscope');
    else if (oracleType === 'crystalBall') setCurrentStep('crystalBall');
    else if (oracleType === 'bonusRoll') setCurrentStep('bonusRoll');
    else setCurrentStep('game');
  };

  const handleCardsSelected = (cardIndices: number[]) => { setSelectedCardIndices(cardIndices); setCurrentStep('revelation'); };
  const handleRevealInterpretation = () => setCurrentStep('interpretation');
  const handleBackToCards = () => setCurrentStep('revelation');
  const handleBackToName = () => setCurrentStep('name');
  const handleBackToDate = () => setCurrentStep('date');
  const handleBackToGender = () => setCurrentStep('gender');
  const handleBackToOracle = () => setCurrentStep('oracle');
  const handleGoToCrystalBall = () => setCurrentStep('crystalBall');

  const handleBackToHome = () => {
    clearUser();
    console.log('Session utilisateur effacée');
    setCurrentStep('landing');
    setSelectedOracle('');
    setSelectedCardIndices([]);
  };

  const oracle = selectedOracle ? oracleData[selectedOracle] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <StarsBackground />
      <main className="flex-grow flex flex-col justify-center items-center max-w-6xl mx-auto p-5 pb-safe">

        {currentStep === 'responsiveTest' && <ResponsiveTest />}
        {currentStep === 'landing' && <LandingPage onEnter={handleEnter} />}
        {currentStep === 'name' && <NamePage onNext={handleNameSubmit} />}
        {currentStep === 'date' && <DatePage onNext={handleDateSubmit} onBack={handleBackToName} />}
        {currentStep === 'gender' && <GenderPage onNext={handleGenderSubmit} onBack={handleBackToDate} />}

        {currentStep === 'oracle' && (
          <OracleSelection
            user={user}
            onOracleSelect={handleOracleSelect}
            onBack={handleBackToGender}
            onHome={handleBackToHome}
            // ✅ shouldShowAdForBonusRoll : pub dédiée bonusRoll, pas exclue
            shouldShowAdBeforeReading={shouldShowAdForBonusRoll}
            isPremium={isPremium}
          />
        )}

        {currentStep === 'game' && oracle && (
          <CardGame
            user={user}
            oracle={oracle}
            oracleType={selectedOracle as any}
            onCardsSelected={handleCardsSelected}
            onSaveReading={onSaveReading}
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
            onSaveReading={onSaveReading}
          />
        )}

        {currentStep === 'horoscope' && (
          <HoroscopePage
            user={user}
            onBack={handleBackToOracle}
            onHome={handleBackToHome}
            onSaveReading={onSaveReading}
            isPremium={isPremium}
          />
        )}

        {currentStep === 'crystalBall' && (
          <CrystalBallPage
            user={user}
            onBack={handleBackToOracle}
            onSaveReading={onSaveReading}
          />
        )}

        {currentStep === 'bonusRoll' && (
          <BonusRollPage
            user={user}
            onBack={handleBackToOracle}
            isPremium={isPremium}
            // ✅ onBeforeRoll retiré — pub déjà montrée dans OracleSelection
          />
        )}
      </main>
    </div>
  );
}