import { useState } from 'react';
import MysticalButton from '@/components/MysticalButton';
import MysticalInput from '@/components/MysticalInput';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSecureRandomInt } from '@/lib/utils';

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
        await onSaveReading({
          type: 'crystalBall',
          question: question,
          answer: answerKey,
          date: new Date()
        });
        console.log('✅ Crystal Ball saved');
      } catch (error) {
        console.error('❌ Save error:', error);
      }
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setPhase('loading');

    setTimeout(() => {
      const randomAnswer = mysticalAnswers[getSecureRandomInt(0, mysticalAnswers.length - 1)];
      setCurrentAnswer(randomAnswer);
      setPhase('answer');
      saveReading(randomAnswer.key);
    }, 2500);
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setCurrentAnswer(null);
    setPhase('question');
  };

  return (
    <div className="crystal-ball-page min-h-screen w-full flex justify-center items-start px-4 pt-16 sm:pt-20 pb-8 overflow-y-auto">
      <div className="max-w-xl w-full flex flex-col gap-6">

        {/* ✨ HEADER AMÉLIORÉ - Plus visible */}
        <div className="text-center space-y-2 pt-4">
          <h1 className="mystical-title text-3xl sm:text-4xl md:text-5xl font-serif text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            {t('crystalBall.title')}
          </h1>
          <p className="text-[#e6d7ff] text-sm sm:text-base font-medium">
            {t('crystalBall.subtitle')}
          </p>
        </div>

        {/* ✨ BOULE DE CRISTAL - Plus grande et magique */}
        <div className="flex justify-center py-4">
          <div className={`relative w-48 h-48 sm:w-56 sm:h-56 ${phase === 'loading' ? 'animate-pulse' : ''}`}>
            {/* Halo extérieur */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-purple-800 opacity-50 blur-3xl animate-pulse"></div>

            {/* Cercle magique tournant */}
            <div className="absolute inset-0 rounded-full border-4 border-[#ffd700]/30 animate-spin" style={{ animationDuration: '8s' }}></div>
            <div className="absolute inset-3 rounded-full border-2 border-purple-400/40 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>

            {/* Boule principale */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-400 via-blue-300 to-indigo-500 flex items-center justify-center shadow-[0_0_50px_rgba(138,43,226,0.6)]">
              {phase === 'loading' ? (
                <div className="text-6xl sm:text-7xl animate-spin">🔮</div>
              ) : phase === 'answer' && currentAnswer ? (
                <div className={`text-6xl sm:text-7xl animate-bounce ${currentAnswer.color}`}>
                  {currentAnswer.icon}
                </div>
              ) : (
                <div className="text-6xl sm:text-7xl opacity-80">🔮</div>
              )}
            </div>

            {/* Particules flottantes */}
            {phase === 'loading' && (
              <>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </>
            )}
          </div>
        </div>

        {/* ✨ CONTENU PRINCIPAL - Cards avec fond */}
        <div className="space-y-4">

          {/* PAGE QUESTION */}
          {phase === 'question' && (
            <div className="space-y-5">
              {/* Card principale */}
              <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-2 border-[#ffd700] rounded-2xl p-6 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                <h2 className="text-xl sm:text-2xl font-serif text-[#ffd700] mb-4 text-center">
                  {t('crystalBall.askPrompt')}
                </h2>

                <MysticalInput
                  placeholder={t('crystalBall.questionPlaceholder')}
                  value={question}
                  onChange={setQuestion}
                  maxLength={200}
                  className="text-base sm:text-lg mb-4"
                />

                {/* Hint visible */}
                <div className="bg-purple-900/50 rounded-xl p-4 border border-purple-400/30 mb-4">
                  <p className="text-[#e6d7ff] text-sm sm:text-base leading-relaxed flex items-start gap-2">
                    <span className="text-2xl flex-shrink-0">💡</span>
                    <span>{t('crystalBall.closedQuestionHint')}</span>
                  </p>
                </div>

                <MysticalButton
                  onClick={handleAskQuestion}
                  disabled={!question.trim()}
                  className="w-full text-base sm:text-lg py-4 disabled:opacity-40"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-2xl">🔮</span>
                    <span className="font-semibold">{t('crystalBall.submitQuestion')}</span>
                  </span>
                </MysticalButton>
              </div>

              {/* Bouton retour */}
              <button
                onClick={onBack}
                className="w-full text-[#ffd700] hover:text-white text-base sm:text-lg font-semibold py-3 transition-all"
              >
                ← {t('common.back')}
              </button>
            </div>
          )}

          {/* PAGE LOADING */}
          {phase === 'loading' && (
            <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-2 border-[#ffd700] rounded-2xl p-8 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
              <div className="text-center space-y-6">
                <p className="text-white text-xl sm:text-2xl font-serif animate-pulse">
                  {t('crystalBall.thinking')}
                </p>
                <div className="flex justify-center gap-3">
                  <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
                  <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
                </div>
              </div>
            </div>
          )}

          {/* PAGE RÉPONSE */}
          {phase === 'answer' && currentAnswer && (
            <div className="space-y-4">
              {/* Question rappel - AMÉLIORATION */}
              <div className="bg-purple-900/60 rounded-xl p-4 border-2 border-[#ffd700]/40 mb-4">
                <p className="text-center">
                  <span className="text-[#ffd700] text-sm font-semibold block mb-1">
                    📝 {t('crystalBall.yourQuestion')}
                  </span>
                  <span className="text-white text-base sm:text-lg">
                    "{question}"
                  </span>
                </p>
              </div>

              {/* Réponse principale */}
              <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-4 border-[#ffd700] rounded-2xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.3)] shimmer">
                <div className="text-center space-y-4">
                  <div className={`text-3xl sm:text-4xl font-bold ${currentAnswer.color} font-serif drop-shadow-[0_0_10px_currentColor]`}>
                    {t(`crystalBall.answers.${currentAnswer.key}`)}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent"></div>
                  <p className="text-[#e6d7ff] text-sm sm:text-base leading-relaxed">
                    {t('crystalBall.guidance')}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <MysticalButton
                  onClick={handleNewQuestion}
                  variant="primary"
                  className="w-full text-base sm:text-lg py-4"
                >
                  ✨ {t('crystalBall.newQuestion')}
                </MysticalButton>
                <button
                  onClick={onBack}
                  className="w-full text-[#ffd700] hover:text-white text-base sm:text-lg font-semibold py-3 transition-all"
                >
                  ← {t('crystalBall.backHome')}
                </button>
              </div>

              {/* Disclaimer visible */}
              <div className="bg-purple-900/60 rounded-xl p-4 border border-purple-400/40">
                <p className="text-[#e6d7ff] text-sm sm:text-base text-center leading-relaxed">
                  <span className="text-yellow-400 text-lg">⚠️</span>
                  <br />
                  {t('crystalBall.disclaimer')}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}