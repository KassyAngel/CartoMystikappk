import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { config } from '@/config';
import { saveUserEmail } from '@/lib/userStorage';

export default function PaymentSuccessPage() {
  const [verified, setVerified] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const email = urlParams.get('email');

    const verifyPremium = async () => {
      try {
        // ✅ Sauvegarder l'email depuis l'URL ou localStorage
        let savedEmail = email;
        if (!savedEmail) {
          savedEmail = localStorage.getItem('userEmail');
        }

        if (savedEmail) {
          await saveUserEmail(savedEmail);
          console.log('✅ Email utilisateur sauvegardé:', savedEmail);
        }

        // ✅ Vérifier le statut Premium
        const response = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
          credentials: 'include',
          headers: savedEmail ? { 'x-user-email': savedEmail } : {},
        });

        const data = await response.json();

        if (data.isPremium) {
          console.log('✅ Statut Premium confirmé !');
          setVerified(true);
        } else {
          console.warn('⚠️ Premium pas encore activé, attendez quelques secondes...');
          // Réessayer après 3 secondes
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } catch (error) {
        console.error('❌ Erreur vérification Premium:', error);
      }
    };

    verifyPremium();

    // ✅ Redirection vers oracle-selection (étape 'oracle')
    const timer = setTimeout(() => {
      console.log('🔄 Redirection vers la sélection des oracles...');
      setLocation('/');
      // Forcer le rechargement pour actualiser le statut Premium
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/30 max-w-md mx-4">
        <div className="text-6xl mb-4 animate-bounce">✨</div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">
          Paiement réussi !
        </h1>
        <p className="text-white mb-2">
          {verified
            ? '✅ Votre compte Premium a été activé'
            : '⏳ Activation en cours...'}
        </p>
        <p className="text-purple-200 text-sm mb-4">
          Profitez de toutes les fonctionnalités Premium !
        </p>
        <div className="space-y-2 text-purple-300 text-xs">
          <p>✓ Sans publicité</p>
          <p>✓ Grimoire illimité</p>
          <p>✓ Historique complet</p>
        </div>
        <p className="text-purple-300 text-xs mt-4">
          Redirection automatique vers les oracles...
        </p>
      </div>
    </div>
  );
}