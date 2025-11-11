import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from './MysticalButton';
import { config } from '@/config';
import { getDeviceId, saveUserEmail } from '@/lib/userStorage';
import { 
  initializeRevenueCat, 
  getOfferings, 
  purchasePackage, 
  restorePurchases
} from '@/services/revenueCatService';
import type { PurchasesOfferings, PurchasesPackage } from '@revenuecat/purchases-capacitor';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

export default function PremiumModal({ isOpen, onClose, onPurchase }: PremiumModalProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRestoreForm, setShowRestoreForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'premium_1month' | 'premium_3months' | null>(null);

  // Pour RevenueCat (mobile natif)
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [error, setError] = useState('');

  const isNative = Capacitor.isNativePlatform();
  const platform = Capacitor.getPlatform();

  console.log('💳 PremiumModal - Plateforme:', { isNative, platform });

  // Charger les offres RevenueCat si on est sur mobile natif
  useEffect(() => {
    if (isOpen && isNative) {
      loadRevenueCatOfferings();
    }
  }, [isOpen, isNative]);

  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, isLoading]);

  // ==================== REVENUECAT (Mobile Natif) ====================
  const loadRevenueCatOfferings = async () => {
    try {
      console.log('📦 Chargement offres RevenueCat...');
      await initializeRevenueCat();
      const availableOfferings = await getOfferings();
      setOfferings(availableOfferings);
      console.log('✅ Offres RevenueCat chargées:', availableOfferings);
    } catch (error) {
      console.error('❌ Erreur chargement offres RevenueCat:', error);
      setError(t('premium.error.loadFailed') || 'Impossible de charger les offres');
    }
  };

  const handleRevenueCatPurchase = async (pkg: PurchasesPackage) => {
    if (!email || !email.includes('@')) {
      setEmailError(t('premium.error.invalidEmail') || "L'email n'est pas valide.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('🛒 Achat RevenueCat du package:', pkg.identifier);

      const result = await purchasePackage(pkg, email);

      if (result.success) {
        await saveUserEmail(email);
        console.log('✅ Premium activé via RevenueCat !');
        onPurchase();
      } else {
        setError(t('premium.error.purchaseFailed') || 'Erreur lors de l\'achat');
      }
    } catch (error: any) {
      console.error('❌ Erreur achat RevenueCat:', error);
      setError(error.message || t('premium.error.unknown') || 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevenueCatRestore = async () => {
    if (!email || !email.includes('@')) {
      setEmailError(t('premium.error.invalidEmail') || "L'email n'est pas valide.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('♻️ Restauration achats RevenueCat...');

      const result = await restorePurchases(email);

      if (result.success) {
        await saveUserEmail(email);
        console.log('✅ Premium restauré via RevenueCat !');
        onPurchase();
      } else {
        setError(t('premium.error.noActivePremium') || 'Aucun abonnement actif trouvé');
      }
    } catch (error: any) {
      console.error('❌ Erreur restauration RevenueCat:', error);
      setError(error.message || t('premium.error.unknown') || 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== STRIPE (Web) ====================
  const handleStripeSubscribe = async () => {
    if (!selectedPlan) return;

    // Validation email
    if (!email) {
      setEmailError(t('premium.error.emailRequired') || "L'email est requis.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t('premium.error.emailInvalid') || "L'email n'est pas valide.");
      return;
    }
    setEmailError('');

    setIsLoading(true);

    try {
      console.log('🛒 Création session Stripe pour plan:', selectedPlan);

      const deviceId = await getDeviceId();
      const response = await fetch(`${config.apiBaseUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId: selectedPlan, deviceId, email })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.url) {
        console.log('✅ Session Stripe créée, redirection vers:', data.url);

        const stripeWindow = window.open(data.url, '_blank');

        if (!stripeWindow) {
          alert('⚠️ Veuillez autoriser les popups pour accéder au paiement Stripe');
        } else {
          onClose();
        }
      } else {
        throw new Error(data.error || 'Erreur création session');
      }

    } catch (error: any) {
      console.error('❌ Erreur paiement Stripe:', error);
      alert(`❌ ${t('premium.error.payment') || 'Erreur lors du paiement. Réessayez.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== HANDLERS ====================
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    if (!isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // ==================== RENDER ====================
  const currentOffering = offerings?.current;
  const availablePackages = currentOffering?.availablePackages || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-yellow-500/30 max-h-[90vh] overflow-y-auto">

        {/* Bouton fermeture */}
        <button
          onClick={handleCloseClick}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✨</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            {t('premium.title') || 'Premium'}
          </h2>
          <p className="text-purple-200 text-sm">
            {t('premium.subtitle') || 'Débloquez toutes les fonctionnalités'}
          </p>
          <p className="text-purple-300 text-xs mt-2">
            {isNative ? `📱 ${t('premium.payment.googlePlay')}` : `🌐 ${t('premium.payment.stripe')}`}
          </p>
        </div>

        {/* Champ Email */}
        {!showRestoreForm && (
          <div className="mb-6">
            <label className="block text-purple-200 text-sm mb-2">
              📧 {t('premium.emailLabel') || 'Votre email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              placeholder="exemple@email.com"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-purple-800/50 border border-purple-500/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-yellow-400/50 disabled:opacity-50"
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
            <p className="text-purple-300 text-xs mt-2">
              {t('premium.emailHelp') || 'Pour récupérer votre abonnement'}
            </p>
          </div>
        )}

        {/* ==================== MODE NATIVE (RevenueCat) ==================== */}
        {isNative && !showRestoreForm && (
          <>
            {availablePackages.length > 0 ? (
              <div className="space-y-4 mb-6">
                {availablePackages.map((pkg) => (
                  <div
                    key={pkg.identifier}
                    className="bg-purple-800/30 rounded-xl p-4 border-2 border-purple-500/30 hover:border-yellow-400/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-yellow-300 font-semibold">
                          {pkg.product.title}
                        </h3>
                        <p className="text-purple-200 text-sm">
                          {pkg.product.description}
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-yellow-300">
                        {pkg.product.priceString}
                      </div>
                    </div>
                    <MysticalButton
                      onClick={() => handleRevenueCatPurchase(pkg)}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? `⏳ ${t('premium.button.loading') || 'Chargement...'}` : `🛒 ${t('premium.buy') || 'Acheter'}`}
                    </MysticalButton>
                  </div>
                ))}
              </div>
            ) : !error ? (
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-purple-200">{t('premium.loading.offers') || 'Chargement des offres...'}</p>
              </div>
            ) : null}
          </>
        )}

        {/* ==================== MODE WEB (Stripe) ==================== */}
        {!isNative && !showRestoreForm && (
          <>
            <div className="space-y-4 mb-6">
              {/* Plan 1 mois */}
              <button
                onClick={() => { setSelectedPlan('premium_1month'); setEmailError(''); }}
                disabled={isLoading}
                className={`w-full p-4 rounded-xl border-2 transition-all disabled:opacity-50 ${
                  selectedPlan === 'premium_1month'
                    ? 'border-yellow-400 bg-yellow-400/20 shadow-lg scale-105'
                    : 'border-purple-400/30 bg-purple-800/30 hover:border-yellow-400/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      {t('premium.plan.1month') || '1 mois'}
                    </div>
                    <div className="text-purple-200 text-xs">
                      {t('premium.plan.1month.subtitle') || 'Abonnement mensuel'}
                    </div>
                  </div>
                  <div className="text-yellow-400 font-bold text-xl">3,99€</div>
                </div>
              </button>

              {/* Plan 3 mois */}
              <button
                onClick={() => { setSelectedPlan('premium_3months'); setEmailError(''); }}
                disabled={isLoading}
                className={`w-full p-4 rounded-xl border-2 transition-all relative disabled:opacity-50 ${
                  selectedPlan === 'premium_3months'
                    ? 'border-yellow-400 bg-yellow-400/20 shadow-lg scale-105'
                    : 'border-purple-400/30 bg-purple-800/30 hover:border-yellow-400/50'
                }`}
              >
                <div className="absolute -top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {t('premium.plan.discount') || '-25%'}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-white font-semibold">
                      {t('premium.plan.3months') || '3 mois'}
                    </div>
                    <div className="text-green-400 text-xs font-semibold">
                      {t('premium.plan.3months.subtitle') || 'Meilleure offre !'}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm line-through">11,97€</div>
                    <div className="text-yellow-400 font-bold text-xl">8,98€</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Bouton Stripe */}
            <MysticalButton
              onClick={handleStripeSubscribe}
              disabled={!selectedPlan || isLoading || !email}
              className="w-full mb-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {t('premium.button.processing') || 'Redirection...'}
                </span>
              ) : selectedPlan ? (
                `💳 ${t('premium.button.subscribe') || 'Payer avec Stripe'}`
              ) : (
                t('premium.button.select') || 'Sélectionner un plan'
              )}
            </MysticalButton>
          </>
        )}

        {/* ==================== FORMULAIRE RESTAURATION ==================== */}
        {showRestoreForm && isNative && (
          <div className="mb-6">
            <label className="block text-purple-200 text-sm mb-2">
              📧 {t('premium.restoreEmailLabel') || 'Votre email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-purple-800/50 border border-purple-500/30 text-white placeholder-purple-300/50 focus:outline-none focus:border-yellow-400/50 disabled:opacity-50"
            />
            <MysticalButton
              onClick={handleRevenueCatRestore}
              disabled={isLoading}
              className="w-full mt-4"
            >
              {isLoading ? `⏳ ${t('premium.button.restoring') || 'Restauration...'}` : `♻️ ${t('premium.restore') || 'Restaurer'}`}
            </MysticalButton>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
            <p className="text-red-200 text-sm">❌ {error}</p>
          </div>
        )}

        {/* Toggle Restauration (uniquement mobile) */}
        {isNative && (
          <button
            onClick={() => setShowRestoreForm(!showRestoreForm)}
            className="text-purple-300 hover:text-purple-100 text-sm transition-colors w-full text-center mb-4"
          >
            {showRestoreForm 
              ? `← ${t('premium.backToPurchase') || 'Retour aux achats'}` 
              : `♻️ ${t('premium.restoreSubscription') || 'Restaurer un abonnement'}`
            }
          </button>
        )}

        {/* Conditions */}
        <div className="mt-4 text-xs text-purple-200 text-center space-y-1">
          <p>{t('premium.conditions.line1')}</p>
          <p className="text-green-400 font-semibold">{t('premium.conditions.line2')}</p>
          <p className="text-purple-300 text-[10px]">{t('premium.conditions.line3')}</p>
        </div>

        {/* Avantages */}
        <div className="mt-4 pt-4 border-t border-purple-500/30">
          <div className="text-center text-sm text-purple-200 space-y-1">
            <div>✓ {t('premium.benefits.ads') || 'Sans publicité'}</div>
            <div>✓ {t('premium.benefits.grimoire') || 'Grimoire illimité'}</div>
            <div>✓ {t('premium.benefits.notes') || 'Notes personnalisées'}</div>
            <div>✓ {t('premium.benefits.history') || 'Historique complet'}</div>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-3 flex items-center justify-center gap-2 text-purple-300 text-xs">
          <span>{t('premium.poweredBy') || 'Powered by'}</span>
          {isNative ? (
            <span className="font-semibold">Google Play</span>
          ) : (
            <svg className="h-4" viewBox="0 0 60 25" fill="currentColor">
              <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.70c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.10 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}