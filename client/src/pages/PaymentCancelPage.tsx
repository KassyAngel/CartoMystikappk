
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function PaymentCancelPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirection après 3 secondes vers la page d'accueil
    const timer = setTimeout(() => {
      setLocation('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-red-400/30">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-red-400 mb-4">Paiement annulé</h1>
        <p className="text-white mb-4">Vous avez annulé le paiement</p>
        <p className="text-purple-200 text-sm">Redirection en cours...</p>
      </div>
    </div>
  );
}
