import { useState } from 'react';
import TarotCard from '../TarotCard';

export default function TarotCardExample() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleCardClick = (cardNumber: number) => {
    if (selectedCards.includes(cardNumber)) {
      setSelectedCards(selectedCards.filter(n => n !== cardNumber));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, cardNumber]);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-center gap-4 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <TarotCard
            key={num}
            number={num}
            isSelected={selectedCards.includes(num)}
            onClick={() => handleCardClick(num)}
          />
        ))}
      </div>
      <p className="text-white/60 text-center">
        Cartes sélectionnées: {selectedCards.join(', ')} ({selectedCards.length}/3)
      </p>
    </div>
  );
}