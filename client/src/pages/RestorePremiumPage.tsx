
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from '@/components/MysticalButton';
import MysticalInput from '@/components/MysticalInput';
import { config } from '@/config';
import { saveLanguage } from '@/lib/userStorage';

interface RestorePremiumPageProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RestorePremiumPage({ onClose, onSuccess }: RestorePremiumPageProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRestore = async () => {
    if (!email) {
      setError(t("premium.error.emailRequired") || "L'email est requis.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t("premium.error.emailInvalid") || "L'email n'est pas valide.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      console.log('🔍 Vérification Premium pour:', email);

      const response = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
        credentials: 'include',
        headers: {
          'x-user-email': email.toLowerCase().trim()
        }
      });

      if (!response.ok) {
        throw new Error('Erreur serveur');
      }

      const data = await response.json();

      if (data.isPremium) {
        // ✅ Premium trouvé ! Sauvegarder l'email localement
        await saveLanguage(email.toLowerCase().trim());
        
        setSuccess(t("premium.restore.success") || "✅ Abonnement Premium restauré avec succès !");
        
        // Recharger la page après 2 secondes
        setTimeout(() => {
          onSuccess();
          window.location.reload();
        }, 2000);
      } else {
        setError(t("premium.restore.notFound") || "❌ Aucun abonnement Premium actif trouvé pour cet email.");
      }
    } catch (err) {
      console.error('❌ Erreur restauration Premium:', err);
      setError(t("premium.restore.error") || "❌ Erreur lors de la restauration. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-yellow-500/30">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔄</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            {t("premium.restore.title") || "Restaurer mon abonnement"}
          </h2>
          <p className="text-purple-200 text-sm">
            {t("premium.restore.subtitle") || "Entrez l'email utilisé lors de votre achat"}
          </p>
        </div>

        {success ? (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-400 rounded-lg text-green-300 text-center">
            {success}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <MysticalInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                disabled={loading}
                className="w-full"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <MysticalButton
              onClick={handleRestore}
              disabled={loading || !email}
              className="w-full mb-4"
            >
              {loading
                ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    {t("premium.restore.checking") || "Vérification..."}
                  </span>
                )
                : (t("premium.restore.button") || "🔍 Restaurer mon abonnement")
              }
            </MysticalButton>
          </>
        )}

        <div className="text-xs text-purple-200 text-center space-y-1">
          <p>💡 {t("premium.restore.help1") || "Utilisez l'email que vous avez fourni lors de l'achat"}</p>
          <p>🔒 {t("premium.restore.help2") || "Vos données sont sécurisées"}</p>
        </div>
      </div>
    </div>
  );
}
