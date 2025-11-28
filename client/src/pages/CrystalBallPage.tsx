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
    <div className="crystal-ball-page min-h-screen w-full flex justify-center items-start px-4 pt-12 sm:pt-16 pb-8 overflow-y-auto relative">
      {/* ✨ FOND AMÉLIORÉ AVEC ÉTOILES DORÉES */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#2d1b69] to-[#0a001a]"></div>

        {/* Étoiles dorées animées */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-300 rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 2 + 's'
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-xl w-full flex flex-col gap-6 relative z-10">

        {/* ✨ HEADER AMÉLIORÉ AVEC BORDURES DORÉES */}
        <div className="text-center space-y-3 relative">
          {/* Décorations dorées */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-4xl opacity-80">
            ✦
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold
                         bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent
                         drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]
                         tracking-wide relative py-2">
            {t('crystalBall.title')}
          </h1>

          {/* Ligne décorative dorée */}
          <div className="flex items-center justify-center gap-3 opacity-70">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <span className="text-yellow-300 text-xl">✧</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>

          <p className="text-amber-200 text-sm sm:text-base font-medium px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {t('crystalBall.subtitle')}
          </p>
        </div>

        {/* ✨ BOULE DE CRISTAL AGRANDIE ET DORÉE */}
        <div className="flex justify-center py-4">
          <div className={`relative w-48 h-48 sm:w-56 sm:h-56 ${phase === 'loading' ? 'animate-pulse' : ''}`}>
            {/* Halo extérieur doré pulsant */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-600 opacity-30 blur-3xl animate-pulse-slow"></div>

            {/* Cercles magiques dorés */}
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50 animate-spin-slow"></div>
            <div className="absolute inset-3 rounded-full border border-amber-300/40 animate-spin-reverse"></div>
            <div className="absolute inset-6 rounded-full border border-yellow-200/30"></div>

            {/* Socle doré */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-b-full shadow-[0_4px_20px_rgba(251,191,36,0.4)]"></div>

            {/* Boule principale améliorée */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-300 via-blue-200 to-indigo-400 
                            flex items-center justify-center 
                            shadow-[0_0_40px_rgba(251,191,36,0.4),inset_0_0_30px_rgba(255,255,255,0.3)]
                            border-4 border-yellow-300/60">
              {phase === 'loading' ? (
                <div className="text-6xl sm:text-7xl animate-spin filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
                  🔮
                </div>
              ) : phase === 'answer' && currentAnswer ? (
                <div className={`text-6xl sm:text-7xl animate-bounce ${currentAnswer.color} filter drop-shadow-[0_0_15px_currentColor]`}>
                  {currentAnswer.icon}
                </div>
              ) : (
                <div className="text-6xl sm:text-7xl opacity-90 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                  🔮
                </div>
              )}
            </div>

            {/* Reflets lumineux */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>

            {/* Particules flottantes dorées */}
            {phase === 'loading' && (
              <>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </>
            )}

            {/* Étoiles scintillantes autour */}
            <div className="absolute -top-4 -left-4 text-yellow-300 text-2xl animate-pulse">✦</div>
            <div className="absolute -top-4 -right-4 text-amber-300 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>✧</div>
            <div className="absolute -bottom-4 -left-4 text-yellow-400 text-xl animate-pulse" style={{animationDelay: '1s'}}>✦</div>
            <div className="absolute -bottom-4 -right-4 text-amber-400 text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>✧</div>
          </div>
        </div>

        {/* ✨ CONTENU PRINCIPAL AMÉLIORÉ */}
        <div className="space-y-4">

          {/* PAGE QUESTION */}
          {phase === 'question' && (
            <div className="space-y-4">
              {/* Card principale avec bordures dorées */}
              <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] 
                              border-3 border-yellow-400/70 
                              rounded-2xl p-6 
                              shadow-[0_0_35px_rgba(251,191,36,0.4)]
                              relative overflow-hidden">

                {/* Coins dorés décoratifs */}
                <div className="absolute top-3 left-3 text-yellow-400/60 text-xl">✦</div>
                <div className="absolute top-3 right-3 text-amber-400/60 text-xl">✦</div>
                <div className="absolute bottom-3 left-3 text-yellow-400/60 text-xl">✦</div>
                <div className="absolute bottom-3 right-3 text-amber-400/60 text-xl">✦</div>

                {/* Titre mystique avec icône dorée */}
                <div className="text-center mb-5 relative">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent px-6 py-3 rounded-full border border-yellow-400/30">
                    <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">🔮</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold 
                                   bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent
                                   drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                      {t('crystalBall.askPrompt')}
                    </h2>
                    <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">🔮</span>
                  </div>
                </div>

                <MysticalInput
                  placeholder={t('crystalBall.questionPlaceholder')}
                  value={question}
                  onChange={setQuestion}
                  maxLength={200}
                  className="text-sm sm:text-base mb-4 border-yellow-400/50 focus:border-yellow-300"
                />

                {/* Hint mystique amélioré */}
                <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-purple-900/80 
                                rounded-xl p-4 border-2 border-yellow-400/40 mb-4
                                shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                  <p className="text-amber-100 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">✨</span>
                    <span>{t('crystalBall.closedQuestionHint')}</span>
                  </p>
                </div>

                <MysticalButton
                  onClick={handleAskQuestion}
                  disabled={!question.trim()}
                  className="w-full text-sm sm:text-base py-4 
                             bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 
                             hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500
                             disabled:opacity-40 disabled:cursor-not-allowed
                             shadow-[0_0_25px_rgba(251,191,36,0.5)]
                             border-2 border-yellow-300/50"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">🔮</span>
                    <span className="font-bold tracking-wide">{t('crystalBall.submitQuestion')}</span>
                    <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">✨</span>
                  </span>
                </MysticalButton>
              </div>

              {/* Bouton retour élégant */}
              <button
                onClick={onBack}
                className="w-full text-amber-300 hover:text-yellow-200 
                           text-sm sm:text-base font-semibold py-3 
                           transition-all duration-300
                           hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
              >
                ← {t('common.back')}
              </button>
            </div>
          )}

          {/* PAGE LOADING AMÉLIORÉE */}
          {phase === 'loading' && (
            <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] 
                            border-3 border-yellow-400/70 
                            rounded-2xl p-8 
                            shadow-[0_0_40px_rgba(251,191,36,0.5)]
                            relative overflow-hidden">

              {/* Animation de fond */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-amber-500/10 to-yellow-500/5 animate-pulse"></div>

              <div className="text-center space-y-6 relative z-10">
                <div className="text-3xl animate-spin inline-block filter drop-shadow-[0_0_20px_rgba(251,191,36,1)]">
                  🔮
                </div>

                <p className="text-amber-200 text-lg sm:text-xl font-serif animate-pulse
                               drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {t('crystalBall.thinking')}
                </p>

                <div className="flex justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(251,191,36,0.8)]"></span>
                  <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(251,191,36,0.8)]" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(251,191,36,0.8)]" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            </div>
          )}

          {/* PAGE RÉPONSE AMÉLIORÉE */}
          {phase === 'answer' && currentAnswer && (
            <div className="space-y-4">
              {/* Question rappel avec bordure dorée */}
              <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-purple-900/80 
                              rounded-xl p-5 
                              border-2 border-yellow-400/60 
                              shadow-[0_0_25px_rgba(251,191,36,0.3)]
                              relative">
                <div className="absolute top-2 right-2 text-yellow-300 text-xl opacity-60">✦</div>
                <p className="text-center">
                  <span className="text-amber-200 text-sm sm:text-base font-bold block mb-2 
                                   drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    📜 {t('crystalBall.yourQuestion')}
                  </span>
                  <span className="text-white text-sm sm:text-base font-medium italic">
                    "{question}"
                  </span>
                </p>
              </div>

              {/* Réponse principale dorée */}
              <div className="bg-gradient-to-br from-[#1a0033] to-[#2d1b69] 
                              border-3 border-yellow-400/80 
                              rounded-2xl p-8 
                              shadow-[0_0_40px_rgba(251,191,36,0.5)]
                              relative overflow-hidden">

                {/* Lueur de fond dorée */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10"></div>

                {/* Coins décoratifs */}
                <div className="absolute top-3 left-3 text-yellow-300 text-2xl animate-pulse">✦</div>
                <div className="absolute top-3 right-3 text-amber-300 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>✦</div>
                <div className="absolute bottom-3 left-3 text-yellow-300 text-2xl animate-pulse" style={{animationDelay: '1s'}}>✦</div>
                <div className="absolute bottom-3 right-3 text-amber-300 text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>✦</div>

                <div className="text-center space-y-4 relative z-10">
                  <div className={`text-3xl sm:text-4xl font-bold ${currentAnswer.color} font-serif 
                                   drop-shadow-[0_0_15px_currentColor] animate-pulse`}>
                    {t(`crystalBall.answers.${currentAnswer.key}`)}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                  <p className="text-amber-100 text-xs sm:text-sm leading-relaxed
                                 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {t('crystalBall.guidance')}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <MysticalButton
                  onClick={handleNewQuestion}
                  variant="primary"
                  className="w-full text-sm sm:text-base py-4
                             bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 
                             hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500
                             shadow-[0_0_25px_rgba(251,191,36,0.5)]
                             border-2 border-yellow-300/50"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">✨</span>
                    <span className="font-bold">{t('crystalBall.newQuestion')}</span>
                  </span>
                </MysticalButton>

                <button
                  onClick={onBack}
                  className="w-full text-amber-300 hover:text-yellow-200 
                             text-sm sm:text-base font-semibold py-3 
                             transition-all duration-300
                             hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                >
                  ← {t('crystalBall.backHome')}
                </button>
              </div>

              {/* Disclaimer doré */}
              <div className="bg-gradient-to-r from-amber-900/50 via-yellow-900/50 to-amber-900/50 
                              rounded-xl p-4 border-2 border-yellow-400/40
                              shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <p className="text-amber-100 text-xs sm:text-sm text-center leading-relaxed">
                  <span className="text-lg filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">⚠️</span> {t('crystalBall.disclaimer')}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* CSS Animations personnalisées */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}