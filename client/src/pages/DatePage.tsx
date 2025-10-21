import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import MysticalSelect from '@/components/MysticalSelect';
import MysticalButton from '@/components/MysticalButton';
import { getZodiacSign } from '@/data/oracleData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Moon, Star, Sparkles } from 'lucide-react';

interface DatePageProps {
  onNext: (birthDate: string, zodiacSign?: any) => void;
  onBack: () => void;
}

const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function DatePage({ onNext, onBack }: DatePageProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const { t } = useLanguage();

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString().padStart(2, '0')
  }));

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: t(`date.months.${i + 1}`)
  }));

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString()
  }));

  const zodiacSign = day && month ? getZodiacSign(parseInt(month), parseInt(day)) : undefined;

  const handleNext = () => {
    if (day && month && year) {
      const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      onNext(birthDate, zodiacSign);
    }
  };

  const isComplete = day && month && year;

  return (
    <>
      <div className="intro-page active flex flex-col min-h-screen text-center max-w-3xl w-full mx-auto px-4 sm:px-6 bg-[#140424] pt-16 sm:pt-20">

        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar progress={66} />
        </div>

        {/* Contenu principal centré */}
        <div className="flex-1 flex flex-col justify-center space-y-6 sm:space-y-8 py-6">

          {/* Titre */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
              {t('date.title')}
            </h1>

            <p className="text-purple-200 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
              {t('date.subtitle')}
            </p>

            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400/50"></div>
              <Sparkles className="w-4 h-4 text-amber-400/60" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400/50"></div>
            </div>
          </div>

          {/* Cercle zodiacal - RÉDUIT DE 30% */}
          <div className="relative mx-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative">
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm border-2 border-purple-500/30"
                style={{
                  animation: 'spin-slow 60s linear infinite'
                }}
              >
                {zodiacSymbols.map((symbol, index) => {
                  const angle = (index * 30 - 90) * (Math.PI / 180);
                  const radius = 48; // Réduit de 68 à 48 (30%)
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  return (
                    <div
                      key={index}
                      className="absolute text-xs sm:text-sm md:text-base opacity-50 transition-opacity hover:opacity-80"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      {symbol}
                    </div>
                  );
                })}
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                {zodiacSign ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-xl sm:text-2xl md:text-3xl shadow-lg shadow-amber-500/50 animate-pulse">
                    {zodiacSign.symbol}
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-600/40 to-indigo-600/40 flex items-center justify-center shadow-lg shadow-purple-500/30 backdrop-blur-sm border border-purple-400/30">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-300 animate-pulse" />
                  </div>
                )}
              </div>

              <span className="absolute -top-1 -right-1 text-amber-300/60 text-sm animate-pulse">✦</span>
              <span className="absolute -bottom-1 -left-1 text-purple-300/60 text-xs animate-pulse" style={{ animationDelay: '0.7s' }}>✦</span>
            </div>
          </div>

          {/* Champs de date - AGRANDIS POUR MOBILE */}
          <div className="max-w-xl mx-auto w-full">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-center gap-1 text-purple-200/80 text-xs sm:text-sm font-medium">
                  <span className="text-base sm:text-lg">📅</span>
                  <span>{t('date.day')}</span>
                </div>
                <MysticalSelect
                  placeholder="--"
                  value={day}
                  onChange={setDay}
                  options={dayOptions}
                  className="text-base sm:text-lg min-h-[44px] sm:min-h-[48px]"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-center gap-1 text-purple-200/80 text-xs sm:text-sm font-medium">
                  <span className="text-base sm:text-lg">📆</span>
                  <span>{t('date.month')}</span>
                </div>
                <MysticalSelect
                  placeholder="--"
                  value={month}
                  onChange={setMonth}
                  options={monthOptions}
                  className="text-base sm:text-lg min-h-[44px] sm:min-h-[48px]"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-center gap-1 text-purple-200/80 text-xs sm:text-sm font-medium">
                  <span className="text-base sm:text-lg">🎂</span>
                  <span>{t('date.year')}</span>
                </div>
                <MysticalSelect
                  placeholder="----"
                  value={year}
                  onChange={setYear}
                  options={yearOptions}
                  className="text-base sm:text-lg min-h-[44px] sm:min-h-[48px]"
                />
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 sm:gap-4 justify-center items-center pt-4">
            <MysticalButton variant="secondary" onClick={onBack}>
              <span className="flex items-center justify-center gap-2">
                <span className="text-amber-300">←</span>
                <span>{t('common.back')}</span>
              </span>
            </MysticalButton>

            <MysticalButton 
              onClick={handleNext} 
              disabled={!isComplete}
              className="shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <span>{t('date.next')}</span>
                <span className="text-amber-300">→</span>
              </span>
            </MysticalButton>
          </div>
        </div>

        <div className="pb-4 sm:pb-6"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
    </>
  );
}