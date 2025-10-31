import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { config } from '@/config';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: (planId: string) => void;
}

export default function PremiumModal({ isOpen, onClose, onPurchase }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'premium_1month' | 'premium_3months' | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
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
  }, [isOpen, onClose, loading]);

  if (!isOpen) return null;

  // ✅ NOUVEAU : Fonction de paiement Stripe
  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    setLoading(true);

    try {
      console.log('🛒 Création session Stripe pour plan:', selectedPlan);

      // 1️⃣ Appeler le backend pour créer la session Stripe
      const response = await fetch(`${config.apiBaseUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId: selectedPlan })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.url) {
        console.log('✅ Session Stripe créée, redirection vers:', data.url);

        /// 2️⃣ Ouvrir la page de paiement Stripe dans un nouvel onglet
        const stripeWindow = window.open(data.url, '_blank');

        if (!stripeWindow) {
          // Si le popup est bloqué
          alert('⚠️ Veuillez autoriser les popups pour accéder au paiement Stripe');
        } else {
          // Fermer la modal après ouverture
          onClose();
        }
      } else {
        throw new Error(data.error || 'Erreur création session');
      }

    } catch (error: any) {
      console.error('❌ Erreur paiement Stripe:', error);
      alert(`❌ ${t("premium.error.payment") || "Erreur lors du paiement. Réessayez."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loading) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-yellow-500/30">
        <button
          type="button"
          onClick={handleCloseClick}
          disabled={loading}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t("common.close") || "Fermer"}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✨</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            {t("premium.title") || "Premium"}
          </h2>
          <p className="text-purple-200 text-sm">
            {t("premium.subtitle") || "Débloquez toutes les fonctionnalités"}
          </p>
        </div>

        {/* Plans d'abonnement */}
        <div className="space-y-3 mb-6">
          {/* Plan 1 mois */}
          <button
            type="button"
            onClick={() => setSelectedPlan('premium_1month')}
            disabled={loading}
            className={`w-full p-4 rounded-xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedPlan === 'premium_1month'
                ? 'border-yellow-400 bg-yellow-400/20 shadow-lg scale-105'
                : 'border-purple-400/30 bg-purple-800/30 hover:border-yellow-400/50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="text-white font-semibold">{t("premium.plan.1month") || "1 mois"}</div>
                <div className="text-purple-200 text-xs">{t("premium.plan.1month.subtitle") || "Abonnement mensuel"}</div>
              </div>
              <div className="text-yellow-400 font-bold text-xl">3,99€</div>
            </div>
          </button>

          {/* Plan 3 mois (avec badge promo) */}
          <button
            type="button"
            onClick={() => setSelectedPlan('premium_3months')}
            disabled={loading}
            className={`w-full p-4 rounded-xl border-2 transition-all relative disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedPlan === 'premium_3months'
                ? 'border-yellow-400 bg-yellow-400/20 shadow-lg scale-105'
                : 'border-purple-400/30 bg-purple-800/30 hover:border-yellow-400/50'
            }`}
          >
            <div className="absolute -top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {t("premium.plan.discount") || "-25%"}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-left">
                <div className="text-white font-semibold">{t("premium.plan.3months") || "3 mois"}</div>
                <div className="text-green-400 text-xs font-semibold">{t("premium.plan.3months.subtitle") || "Meilleure offre !"}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm line-through">11,97€</div>
                <div className="text-yellow-400 font-bold text-xl">8,98€</div>
              </div>
            </div>
          </button>
        </div>

        {/* Bouton de paiement */}
        <button
          type="button"
          onClick={handleSubscribe}
          disabled={!selectedPlan || loading}
          className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
            selectedPlan && !loading
              ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loading
            ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                {t("premium.button.processing") || "Redirection..."}
              </span>
            )
            : (selectedPlan
              ? `💳 ${t("premium.button.subscribe") || "Payer avec Stripe"}`
              : (t("premium.button.select") || "Sélectionner un plan")
            )
          }
        </button>

        {/* Conditions */}
        <div className="mt-4 text-xs text-purple-200 text-center space-y-1">
          <p>🔒 {t("premium.conditions.line1") || "Paiement sécurisé par Stripe"}</p>
          <p className="text-green-400 font-semibold">✓ {t("premium.conditions.line2") || "Paiement unique, SANS renouvellement automatique"}</p>
          <p className="text-purple-300 text-[10px]">{t("premium.conditions.line3") || "Aucun remboursement après paiement. Accès Premium valable pour la durée choisie."}</p>
          <p className="text-purple-300 text-[10px]">Vous serez notifié 3 jours avant l'expiration de votre accès.</p>
        </div>

        {/* Avantages Premium */}
        <div className="mt-4 pt-4 border-t border-purple-500/30">
          <div className="text-center text-sm text-purple-200 space-y-1">
            <div>✓ {t("premium.benefits.ads") || "Sans publicité"}</div>
            <div>✓ {t("premium.benefits.grimoire") || "Grimoire illimité"}</div>
            <div>✓ {t("premium.benefits.notes") || "Notes personnalisées"}</div>
            <div>✓ {t("premium.benefits.history") || "Historique complet"}</div>
          </div>
        </div>

        {/* Logo Stripe */}
        <div className="mt-3 flex items-center justify-center gap-2 text-purple-300 text-xs">
          <span>Powered by</span>
          <svg className="h-4" viewBox="0 0 60 25" fill="currentColor">
            <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.70c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}