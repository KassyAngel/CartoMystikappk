import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CardSection {
  icon: string;
  title: string;
  content: string;
}

interface SummaryCardProps {
  title: string;
  sections?: CardSection[];
  content?: string;
  finalMessage?: string;
  isVisible?: boolean;
  className?: string;
  openFirst?: boolean;
}

export default function SummaryCard({ 
  title, 
  sections,
  content,
  finalMessage,
  isVisible = false, 
  className,
  openFirst = false
}: SummaryCardProps) {
  const [openSections, setOpenSections] = useState<number[]>(openFirst ? [0] : []);
  const { t } = useLanguage();

  if (!isVisible) return null;

  // ========== ANCIEN FORMAT (pour l'horoscope) ==========
  if (content && !sections) {
    return (
      <div className={cn(
        'shimmer bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-4 border-[#ffd700] rounded-3xl p-4 sm:p-6 relative overflow-hidden max-w-4xl mx-auto',
        'shadow-[0_12px_35px_rgba(255,215,0,0.2)]',
        className
      )}>
        <h3 className="text-[#ffd700] text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 font-serif relative z-10 text-shadow-glow">
          {title}
        </h3>

        <div className="text-[#e6d7ff] leading-7 text-base sm:text-lg whitespace-pre-line relative z-10 max-h-[60vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  // ========== NOUVEAU FORMAT (avec accordéons pour les tirages) ==========
  if (!sections || sections.length === 0) {
    return null;
  }

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={cn(
      'shimmer bg-gradient-to-br from-[#1a0033] to-[#2d1b69] border-4 border-[#ffd700] rounded-3xl p-4 sm:p-6 relative overflow-hidden max-w-4xl mx-auto',
      'shadow-[0_12px_35px_rgba(255,215,0,0.2)]',
      className
    )}>
      <h3 className="text-[#ffd700] text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 font-serif relative z-10 text-shadow-glow">
        {title}
      </h3>

      <div className="space-y-3 relative z-10">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="border border-[#ffd700]/30 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm"
          >
            {/* En-tête cliquable */}
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between p-4 hover:bg-[#ffd700]/10 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span className="text-[#ffd700] font-semibold text-base sm:text-lg">
                  {section.title}
                </span>
              </div>
              {openSections.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
              )}
            </button>

            {/* Contenu accordéon */}
            <div 
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                openSections.includes(index)
                  ? "max-h-[90vh] overflow-y-auto opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              <div className="p-4 pt-0 text-[#e6d7ff] leading-7 text-base whitespace-pre-line">
                {section.content}
              </div>
            </div>
          </div>
        ))}

        {/* Message final toujours visible - ✅ TRADUIT */}
        {finalMessage && (
          <div className="mt-6 p-4 bg-gradient-to-r from-[#ffd700]/10 to-[#ffd700]/5 rounded-xl border border-[#ffd700]/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💫</span>
              <span className="text-[#ffd700] font-semibold text-lg">
                {t('interpretation.advice.title')}
              </span>
            </div>
            <p className="text-[#e6d7ff] leading-7 text-base whitespace-pre-line">
              {finalMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
