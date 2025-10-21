import { useState } from 'react';
import FlipCard from '../FlipCard';
import { useSound } from '@/hooks/useSound'; // ✅ AJOUTEZ

export default function FlipCardExample() {
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const playFlipSound = useSound('Flip-card.wav'); // ✅ AJOUTEZ

  const mockCards = [
    { name: 'Le Fou', meaning: 'Nouveaux départs, spontanéité, liberté' },
    { name: 'La Papesse', meaning: 'Intuition, mystère, connaissance cachée' },
    { name: 'L\'Empereur', meaning: 'Autorité, structure, leadership' }
  ];

  const positions = ['Passé', 'Présent', 'Futur'];

  const handleFlip = (position: string) => {
    if (!flippedCards.includes(position)) {
      playFlipSound(); // ✅ AJOUTEZ
      setFlippedCards([...flippedCards, position]);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center gap-12 flex-wrap">
        {positions.map((position, index) => (
          <FlipCard
            key={position}
            card={mockCards[index]}
            position={position}
            isFlipped={flippedCards.includes(position)}
            onFlip={() => handleFlip(position)}
            oracleType="tarot"
          />
        ))}
      </div>
      <p className="text-white/60 text-center mt-6">
        Cartes retournées: {flippedCards.join(', ')}
      </p>
    </div>
  );
}