import { useState, useEffect } from 'react';
import MysticalButton from '@/components/MysticalButton';
import MysticalInput from '@/components/MysticalInput';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSecureRandomInt } from '@/lib/utils';
import { showInterstitialAd } from '@/admobService'; // ⚡ AJOUTÉ

interface CrystalBallPageProps {
  onBack: () => void;
  onSaveReading?: (reading: any) => Promise<void>;
  user: UserSession;
}

type Phase = 'question' | 'loading' | 'answer';

export default function CrystalBallPage({ onBack, onSaveReading }: CrystalBallPageProps) {
  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState<Phase>('question');
  const [currentAnswer, setCurrentAnswer] = useState<{ key: string; icon: string; color: string } | null>(null);
  const [questionCount, setQuestionCount] = useState(0); // ⚡ AJOUTÉ
  const { t } = useLanguage();

  const mysticalAnswers = [
    { key: 'yes', icon: '✨', color: 'text-green-400' },
    { key: 'no', icon: '🌑', color: 'text-red-400' },
    { key: 'maybe', icon: '🔮', color: 'text-purple-400' },
    { key: 'veryLikely', icon: '⭐', color: 'text-yellow-400' },
    { key: 'unlikely', icon: '🌙', color: 'text-blue-400' },
    { key: 'certain', icon: '💫', color: 'text-green-300' },
    { key: 'noChance', icon: '❌', color: 'text-red-300' },
    { key: 'askLater', icon: '⏳', color: 'text-gray-400' },
    { key: 'dontCount', icon: '🚫', color: 'text-orange-400' },
    { key: 'yesDefinitely', icon: '✅', color: 'text-green-500' },
    { key: 'signsYes', icon: '🌟', color: 'text-yellow-300' },
    { key: 'signsNo', icon: '🌘', color: 'text-indigo-400' },
    { key: 'unclear', icon: '🌫️', color: 'text-gray-300' },
    { key: 'trustIntuition', icon: '💭', color: 'text-pink-400' }
  ];

  const saveReading = async (answerKey: string) => {
    if (onSaveReading) {
      try {
        const readingData = {
          type: 'crystalBall',
          question: question,
          answer: answerKey,
          date: new Date()
        };
        await onSaveReading(readingData);
        console.log('✅ Crystal Ball reading saved');
      } catch (error) {
        console.error('❌ Save error:', error);
      }
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    // ⚡ Incrémenter le compteur
    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    console.log(`🔮 Question n°${newCount}`);

    // ⚡ Système de pub : 1er gratuit, 2e avec pub, puis tous les 3 (5, 8, 11...)
    const shouldShowAd = newCount === 2 || (newCount > 2 && (newCount - 2) % 3 === 0);

    if (shouldShowAd) {
      console.log(`🎬 Affichage pub (question n°${newCount})`);
      try {
        await showInterstitialAd();
      } catch (error) {
        console.log("Pub non disponible");
      }
    }

    console.log('🔮 Phase: LOADING');
    setPhase('loading');

    setTimeout(() => {
      const randomAnswer = mysticalAnswers[getSecureRandomInt(0, mysticalAnswers.length - 1)];
      console.log('✨ Phase: ANSWER -', randomAnswer.key);

      setCurrentAnswer(randomAnswer);
      setPhase('answer');

      saveReading(randomAnswer.key);
    }, 2500);
  };

  const handleNewQuestion = () => {
    console.log('🔄 Phase: QUESTION');
    setQuestion('');
    setCurrentAnswer(null);
    setPhase('question');
  };

  return (
    <div className="crystal-ball-page min-h-screen w-full flex justify-center items-start px-4 py-4 pt-20 sm:pt-24">
      <div className="max-w-lg w-full flex flex-col gap-3 sm:gap-4">

        {/* Header - Compact */}
        <div className="text-center space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-amber-100/90 tracking-wide">
            {t('crystalBall.title')}
          </h1>
          <p className="text-purple-200/70 text-xs sm:text-sm italic">
            {t('crystalBall.subtitle')}
          </p>
        </div>

        {/* Boule de cristal - Plus petite */}
        <div className="flex justify-center py-2 sm:py-3">
          <div className={`relative w-32 h-32 sm:w-40 sm:h-40 ${phase === 'loading' ? 'animate-pulse' : ''}`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-purple-800 opacity-70 blur-2xl"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-purple-400 via-blue-300 to-indigo-500 flex items-center justify-center shadow-2xl">
              {phase === 'loading' ? (
                <div className="text-4xl sm:text-5xl animate-spin">🔮</div>
              ) : phase === 'answer' && currentAnswer ? (
                <div className={`text-4xl sm:text-5xl ${currentAnswer.color}`}>
                  {currentAnswer.icon}
                </div>
              ) : (
                <div className="text-4xl sm:text-5xl opacity-60">🔮</div>
              )}
            </div>
          </div>
        </div>

        {/* Contenu principal - Compact */}
        <div className="min-h-[250px]">

          {/* Page Question */}
          {phase === 'question' && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-serif text-amber-300 mb-2">
                  {t('crystalBall.askPrompt')}
                </h2>
              </div>

              <MysticalInput
                placeholder={t('crystalBall.questionPlaceholder')}
                value={question}
                onChange={setQuestion}
                maxLength={200}
                className="text-sm sm:text-base"
              />

              <p className="text-purple-200/80 text-xs sm:text-sm text-center leading-relaxed px-2">
                💡 {t('crystalBall.closedQuestionHint')}
              </p>

              <MysticalButton
                onClick={handleAskQuestion}
                disabled={!question.trim()}
                className="w-full min-h-[48px] text-sm sm:text-base"
              >
                🔮 {t('crystalBall.submitQuestion')}
              </MysticalButton>

              <div className="text-center pt-1">
                <button
                  onClick={onBack}
                  className="text-purple-300/60 hover:text-purple-200 text-xs sm:text-sm transition-colors"
                >
                  ← {t('common.back')}
                </button>
              </div>
            </div>
          )}

          {/* Page Loading */}
          {phase === 'loading' && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-3">
                <p className="text-white/90 text-base sm:text-lg font-serif animate-pulse">
                  {t('crystalBall.thinking')}
                </p>
                <div className="flex justify-center gap-2">
                  <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
                  <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
                </div>
              </div>
            </div>
          )}

          {/* Page Réponse */}
          {phase === 'answer' && currentAnswer && (
            <div className="space-y-3">
              <div className="text-center mb-2">
                <p className="text-purple-200/60 text-xs sm:text-sm italic px-2">
                  "{question}"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm border-2 border-amber-400/50 shadow-2xl">
                <div className="text-center space-y-3">
                  <div className={`text-2xl sm:text-3xl font-bold ${currentAnswer.color} font-serif`}>
                    {t(`crystalBall.answers.${currentAnswer.key}`)}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                    {t('crystalBall.guidance')}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <MysticalButton
                  onClick={handleNewQuestion}
                  variant="primary"
                  className="w-full min-h-[48px] text-sm sm:text-base"
                >
                  ✨ {t('crystalBall.newQuestion')}
                </MysticalButton>
                <button
                  onClick={onBack}
                  className="w-full text-purple-300/70 hover:text-purple-200 text-xs sm:text-sm transition-colors py-2"
                >
                  ← {t('crystalBall.backHome')}
                </button>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-2.5 border border-purple-500/30">
                <p className="text-purple-100/80 text-[10px] sm:text-xs text-center leading-relaxed">
                  ⚠️ {t('crystalBall.disclaimer')}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}