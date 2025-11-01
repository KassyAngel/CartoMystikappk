import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { config } from '@/config';
import { saveUserEmail } from '@/lib/userStorage';

interface RestorePremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSuccess: () => void;
}

export default function RestorePremiumModal({ 
  isOpen, 
  onClose, 
  onRestoreSuccess 
}: RestorePremiumModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose();
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

  // Réinitialiser le state à l'ouverture
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRestore = async () => {
    // Validation email
    if (!email) {
      setError(t('premium.error.emailRequired') || "L'email est requis.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('premium.error.emailInvalid') || "L'email n'est pas valide.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      const trimmedEmail = email.toLowerCase().trim();
      console.log('🔄 Tentative de restauration pour:', trimmedEmail);

      // Vérifier si cet email a un Premium actif
      const response = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
        credentials: 'include',
        headers: {
          'x-user-email': trimmedEmail,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.isPremium) {
        // ✅ Premium trouvé ! Sauvegarder l'email
        await saveUserEmail(trimmedEmail);
        console.log('✅ Premium restauré pour:', trimmedEmail);

        setSuccess(true);

        // Redirection après 2 secondes
        setTimeout(() => {
          onRestoreSuccess();
        }, 2000);
      } else {
        // ❌ Aucun Premium trouvé pour cet email
        setError(
          t('premium.restore.notFound') || 
          "Aucun abonnement Premium trouvé pour cet email. Vérifiez l'adresse ou souscrivez à un nouvel abonnement."
        );
      }
    } catch (err: any) {
      console.error('❌ Erreur restauration Premium:', err);
      setError(
        t('premium.restore.error') || 
        'Une erreur est survenue lors de la restauration. Réessayez.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) onClose();
  };

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={handleOverlayClick} 
      />

      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-indigo-500/30">
        {/* Bouton fermer */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
          aria-label={t('common.close') || 'Fermer'}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Titre */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔄</div>
          <h2 className="text-2xl font-bold text-indigo-300 mb-2">
            {t('premium.restore.title') || 'Restaurer mon abonnement'}
          </h2>
          <p className="text-indigo-200 text-sm">
            {t('premium.restore.description') || 
             'Entrez l\'email utilisé lors de votre achat Premium'}
          </p>
        </div>

        {/* Message de succès */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-300 text-center font-semibold">
              ✅ {t('premium.restore.success') || 'Premium restauré avec succès !'}
            </p>
            <p className="text-green-200 text-xs text-center mt-1">
              {t('premium.restore.redirecting') || 'Redirection en cours...'}
            </p>
          </div>
        )}

        {/* Formulaire */}
        {!success && (
          <>
            <div className="mb-6">
              <label 
                htmlFor="restore-email" 
                className="block text-sm font-medium text-indigo-200 mb-2"
              >
                {t('premium.emailLabel') || 'Votre email'}
              </label>
              <input
                id="restore-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                disabled={loading}
                className="w-full px-4 py-3 bg-white/10 border border-indigo-400/30 rounded-lg text-white placeholder-indigo-300/50 focus:outline-none focus:border-indigo-400 disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
                    handleRestore();
                  }
                }}
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Bouton restaurer */}
            <button
              type="button"
              onClick={handleRestore}
              disabled={loading || !email}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                !loading && email
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {t('premium.restore.verifying') || 'Vérification...'}
                </span>
              ) : (
                `🔄 ${t('premium.restore.button') || 'Restaurer'}`
              )}
            </button>
          </>
        )}

        {/* Informations */}
        <div className="mt-6 p-4 bg-indigo-900/40 rounded-lg border border-indigo-500/20">
          <p className="text-indigo-200 text-xs text-center">
            ℹ️ {t('premium.restore.info') || 
              'Vous devez utiliser le même email que lors de votre achat Premium sur Stripe.'}
          </p>
        </div>

        {/* Aide */}
        <div className="mt-4 text-center">
          <p className="text-indigo-300 text-xs">
            {t('premium.restore.help') || 'Besoin d\'aide ?'}{' '}
              <a 
                href="mailto:kcevent37@gmail.com" 
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
              {t('premium.restore.contact') || 'Contactez-nous'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}