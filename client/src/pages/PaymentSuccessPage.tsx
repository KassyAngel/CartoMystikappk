
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  useEffect(() => {
    // Recharger pour mettre à jour le statut Premium
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/30">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Paiement réussi !</h1>
        <p className="text-white mb-2">Votre compte Premium a été activé</p>
        <p className="text-purple-200 text-sm">Redirection en cours...</p>
      </div>
    </div>
  );
}
