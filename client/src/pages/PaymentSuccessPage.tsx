
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { config } from '@/config';

export default function PaymentSuccessPage() {
  const [verified, setVerified] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Vérifier le statut Premium avant de rediriger
    const verifyPremium = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.isPremium) {
          console.log('✅ Statut Premium confirmé !');
          setVerified(true);
        }
      } catch (error) {
        console.error('❌ Erreur vérification Premium:', error);
      }
    };

    verifyPremium();

    // Redirection après 3 secondes vers la sélection des oracles
    const timer = setTimeout(() => {
      // Utiliser window.history pour revenir en arrière
      window.history.back();
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/30">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Paiement réussi !</h1>
        <p className="text-white mb-2">
          {verified ? '✅ Votre compte Premium a été activé' : '⏳ Activation en cours...'}
        </p>
        <p className="text-purple-200 text-sm">Redirection en cours...</p>
      </div>
    </div>
  );
}
