import { useState } from 'react';
import OracleCard from '../OracleCard';

export default function OracleCardExample() {
  const [selectedOracle, setSelectedOracle] = useState<string>('');
  
  const oracles = [
    {
      id: 'tarot',
      title: 'Tarot de Marseille',
      description: 'Les 22 arcanes majeurs dévoilent les mystères de votre destinée',
      icon: '🔮'
    },
    {
      id: 'angels',
      title: 'Oracle des Anges',
      description: 'Connectez-vous avec vos guides angéliques pour recevoir leurs messages d\'amour',
      icon: '👼'
    },
    {
      id: 'runes',
      title: 'Runes Nordiques',
      description: 'L\'ancienne sagesse des Vikings vous révèle votre chemin de guerre et de victoire',
      icon: '⚡'
    }
  ];
  
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-center gap-8 flex-wrap">
        {oracles.map((oracle) => (
          <OracleCard
            key={oracle.id}
            title={oracle.title}
            description={oracle.description}
            icon={oracle.icon}
            isSelected={selectedOracle === oracle.id}
            onClick={() => setSelectedOracle(oracle.id)}
          />
        ))}
      </div>
      <p className="text-white/60 text-center">Sélectionné: {selectedOracle}</p>
    </div>
  );
}