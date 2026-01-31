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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 max-w-sm w-full border-2 border-purple-500/30 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          aria-label={t('close')}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-4 gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse"
                style={{ animationDelay: `${star * 100}ms` }}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">
            {t('ratingModal.title')}
          </h2>

          <p className="text-purple-200 mb-6 leading-relaxed">
            {t('ratingModal.description')}
          </p>

          <div className="space-y-3">
            <button
              onClick={onRate}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition transform hover:scale-105 active:scale-95"
            >
              ⭐ {t('ratingModal.rateButton')}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-white/10 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              {t('ratingModal.laterButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}