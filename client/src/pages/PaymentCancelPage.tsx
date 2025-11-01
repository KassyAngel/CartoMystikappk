import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function PaymentCancelPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // ✅ Redirection vers la page d'accueil (oracle-selection)
    const timer = setTimeout(() => {
      console.log('🔄 Redirection vers la sélection des oracles...');
      setLocation('/'); // Retour à OracleMystiqueApp
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-800">
      <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-red-400/30 max-w-md mx-4">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-red-400 mb-4">
          Paiement annulé
        </h1>
        <p className="text-white mb-4">
          Vous avez annulé le paiement
        </p>
        <p className="text-purple-200 text-sm mb-2">
          Vous pouvez réessayer à tout moment depuis le menu Premium
        </p>
        <p className="text-purple-300 text-xs">
          Retour à la sélection des oracles...
        </p>
      </div>
    </div>
  );
}