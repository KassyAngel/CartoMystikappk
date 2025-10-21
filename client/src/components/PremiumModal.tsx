import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase?: (planId: string) => void;
}

export default function PremiumModal({ isOpen, onClose, onPurchase }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'premium_1month' | 'premium_3months' | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  // Fermer avec Escape
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

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    setLoading(true);

    try {
      const confirmMessage = selectedPlan === 'premium_1month' 
        ? `💳 ${t("premium.confirm.1month")}` 
        : `💳 ${t("premium.confirm.3months")}`;

      const paymentSuccess = confirm(confirmMessage);

      if (paymentSuccess) {
        const response = await fetch('/api/premium/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ planId: selectedPlan })
        });

        const data = await response.json();

        if (data.success) {
          alert(`🎉 ${t("premium.success")}`);
          if (onPurchase) onPurchase(selectedPlan);
          onClose();
        } else {
          alert(`❌ ${t("premium.error.activation")}`);
        }
      }
    } catch (error) {
      console.error('Erreur abonnement:', error);
      alert(`❌ ${t("premium.error.payment")}`);
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
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      {/* Contenu Modal */}
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-yellow-500/30">
        {/* Bouton fermer */}
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

        {/* Titre */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✨</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            {t("premium.title") || "Premium"}
          </h2>
          <p className="text-purple-200 text-sm">
            {t("premium.subtitle") || "Débloquez toutes les fonctionnalités"}
          </p>
        </div>

        {/* Plans */}
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

          {/* Plan 3 mois */}
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

        {/* Bouton S'abonner */}
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
            ? (t("premium.button.processing") || "En cours...") 
            : (selectedPlan 
              ? (t("premium.button.subscribe") || "S'abonner") 
              : (t("premium.button.select") || "Sélectionner un plan")
            )
          }
        </button>

        {/* Conditions */}
        <div className="mt-4 text-xs text-purple-200 text-center space-y-1">
          <p>{t("premium.conditions.line1") || "Paiement sécurisé"}</p>
          <p className="text-purple-300">{t("premium.conditions.line2") || "Annulation à tout moment"}</p>
        </div>

        {/* Avantages */}
        <div className="mt-4 pt-4 border-t border-purple-500/30">
          <div className="text-center text-sm text-purple-200 space-y-1">
            <div>✓ {t("premium.benefits.ads") || "Sans publicité"}</div>
            <div>✓ {t("premium.benefits.grimoire") || "Accès au grimoire"}</div>
            <div>✓ {t("premium.benefits.notes") || "Notes personnalisées"}</div>
            <div>✓ {t("premium.benefits.history") || "Historique complet"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}