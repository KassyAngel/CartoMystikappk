// src/components/RatingModal.tsx
import { X, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RatingModalProps {
  onClose: () => void;
  onRate: () => void;
}

export default function RatingModal({ onClose, onRate }: RatingModalProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="relative rounded-2xl p-7 max-w-sm w-full animate-in fade-in zoom-in duration-300"
        style={{
          background: 'linear-gradient(160deg, #0d0a1a 0%, #12102b 50%, #0a0d1f 100%)',
          border: '1px solid rgba(180, 150, 80, 0.35)',
          boxShadow: '0 0 40px rgba(120, 80, 200, 0.2), 0 0 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(180,150,80,0.15)',
        }}
      >
        {/* Decorative top border line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(180,150,80,0.6), transparent)' }}
        />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 transition"
          aria-label={t('close')}
          style={{ color: 'rgba(180,150,80,0.5)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(180,150,80,1)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180,150,80,0.5)')}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          {/* Stars */}
          <div className="flex justify-center mb-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-7 h-7"
                style={{
                  color: '#c9a84c',
                  fill: '#c9a84c',
                  filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.6))',
                  animation: 'pulse 2s ease-in-out infinite',
                  animationDelay: `${star * 120}ms`,
                }}
              />
            ))}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,150,80,0.3))' }} />
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(180,150,80,0.6)' }} />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(180,150,80,0.3), transparent)' }} />
          </div>

          <h2
            className="text-xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #e8d5a3 0%, #c9a84c 50%, #e8d5a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.04em',
            }}
          >
            {t('ratingModal.title')}
          </h2>

          <p
            className="mb-6 leading-relaxed text-sm"
            style={{ color: 'rgba(180, 160, 220, 0.75)' }}
          >
            {t('ratingModal.description')}
          </p>

          <div className="space-y-3">
            <button
              onClick={onRate}
              className="w-full py-3 px-6 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #7c4dab 0%, #5b3480 50%, #3d1f6e 100%)',
                color: '#e8d5a3',
                border: '1px solid rgba(180,150,80,0.4)',
                boxShadow: '0 4px 20px rgba(100,50,180,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
                letterSpacing: '0.12em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 28px rgba(100,50,180,0.55), inset 0 1px 0 rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(180,150,80,0.7)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(100,50,180,0.35), inset 0 1px 0 rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(180,150,80,0.4)';
              }}
            >
              {t('ratingModal.rateButton')}
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-xl font-medium text-sm tracking-wider uppercase transition-all duration-200"
              style={{
                background: 'transparent',
                color: 'rgba(180,150,80,0.5)',
                border: '1px solid rgba(180,150,80,0.15)',
                letterSpacing: '0.1em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(180,150,80,0.8)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(180,150,80,0.35)';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(180,150,80,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(180,150,80,0.5)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(180,150,80,0.15)';
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {t('ratingModal.laterButton')}
            </button>
          </div>
        </div>

        {/* Decorative bottom border line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(180,150,80,0.4), transparent)' }}
        />
      </div>
    </div>
  );
}