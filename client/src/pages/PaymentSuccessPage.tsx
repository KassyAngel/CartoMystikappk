import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation();
  const { t, isLanguageLoaded } = useLanguage();

  useEffect(() => {
    if (!isLanguageLoaded) return;

    const timer = setTimeout(() => {
      console.log('✅ Redirection après succès du paiement...');
      setLocation('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [setLocation, isLanguageLoaded]);

  // 🆕 Attendre que la langue soit chargée
  if (!isLanguageLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-green-400/30 max-w-md mx-4">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          {t('payment.success.title')}
        </h1>
        <div className="mb-6">
          <div className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ {t('payment.success.verified')}
          </div>
        </div>
        <div className="text-white mb-6">
          <p className="font-semibold mb-3">{t('payment.success.benefits')}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <span>🚫</span>
              <span>{t('payment.success.noAds')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📖</span>
              <span>{t('payment.success.unlimitedGrimoire')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>📊</span>
              <span>{t('payment.success.fullHistory')}</span>
            </div>
          </div>
        </div>
        <p className="text-purple-300 text-xs animate-pulse">
          {t('payment.success.redirecting')}
        </p>
      </div>
    </div>
  );
}