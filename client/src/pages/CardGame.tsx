    import { useState, useEffect } from 'react';
    import TarotCard from '@/components/TarotCard';
    import MysticalButton from '@/components/MysticalButton';
    import CardRevealModal from '@/components/CardRevealModal';
    import { OracleData, UserSession, OracleType } from '@shared/schema';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { useSound } from '@/hooks/useSound';
    import { saveDailyReading } from '@/lib/dailyLimit';
    import { 
      selectRandomCardsWithoutRepeat, 
      saveTirageToHistory,
      getRecentCards 
    } from '@/lib/utils';

    interface CardGameProps {
      user: UserSession;
      oracle: OracleData;
      oracleType: OracleType;
      onCardsSelected: (selectedCardIndices: number[]) => void;
      onBack: () => void;
    }

    export default function CardGame({ oracle, oracleType, onCardsSelected, onBack }: CardGameProps) {
      const [randomCards, setRandomCards] = useState<number[]>([]);
      const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
      const [selectedCardsIndices, setSelectedCardsIndices] = useState<number[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [revealedCard, setRevealedCard] = useState<{ card: any; index: number } | null>(null);
      const { t } = useLanguage();

      const playFlip = useSound('Flip-card.wav');
      const playReveal = useSound('Bouton-reveal.wav');

      const isDailyReading = oracleType === 'daily';
      const displayCards = isDailyReading ? 3 : 6;
      const maxSelection = isDailyReading ? 1 : 3;

      const getCardOracleType = (): 'tarot' | 'angels' | 'runes' | 'oracle' => {
        if (oracleType === 'daily') return 'oracle';
        if (oracleType === 'tarot') return 'tarot';
        if (oracleType === 'angels') return 'angels';
        if (oracleType === 'runes') return 'runes';
        return 'oracle';
      };

      useEffect(() => {
        const generateCards = async () => {
          setIsLoading(true);
          try {
            const selectedCards = selectRandomCardsWithoutRepeat(
              oracle.cards.length,
              displayCards,
              oracleType
            );
            setRandomCards(selectedCards);
            setFlippedCards(new Array(displayCards).fill(false));

            if (process.env.NODE_ENV === 'development') {
              const recentCards = getRecentCards(oracleType);
              console.log(`Cartes récentes évitées: [${recentCards.join(', ')}] | Sélectionnées: [${selectedCards.join(', ')}]`);
            }
          } catch (error) {
            console.error('Erreur génération cartes:', error);
            const fallbackCards = Array.from({length: oracle.cards.length}, (_, i) => i)
              .sort(() => Math.random() - 0.5)
              .slice(0, displayCards);
            setRandomCards(fallbackCards);
            setFlippedCards(new Array(displayCards).fill(false));
          } finally {
            setIsLoading(false);
          }
        };
        generateCards();
      }, [oracle.cards.length, displayCards, oracleType]);

      const handleCardClick = (cardIndex: number) => {
        if (flippedCards[cardIndex]) return;
        if (selectedCardsIndices.length >= maxSelection) return;

        playFlip();

        const newFlippedCards = [...flippedCards];
        newFlippedCards[cardIndex] = true;
        setFlippedCards(newFlippedCards);

        const actualIndex = randomCards[cardIndex];
        const cardData = oracle.cards[actualIndex];

        // Afficher le modal avec la carte révélée
        setRevealedCard({ card: cardData, index: cardIndex });

        const newSelected = [...selectedCardsIndices, cardIndex];
        setSelectedCardsIndices(newSelected);
      };

      const handleCloseModal = () => {
        setRevealedCard(null);

        // Si toutes les cartes sont sélectionnées, passer à l'interprétation
        if (selectedCardsIndices.length === maxSelection) {
          playReveal();
          setTimeout(() => {
            const selectedCards = selectedCardsIndices.map(idx => randomCards[idx]);

            if (isDailyReading) {
              saveDailyReading(selectedCards);
            }
            saveTirageToHistory(oracleType, selectedCards);

            onCardsSelected(selectedCards);
          }, 300);
        }
      };

      if (isLoading) {
        return (
          <div className="game-area w-full text-center min-h-screen flex flex-col justify-center p-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="mystical-card rounded-xl p-6 animate-pulse">
                <h2 className="text-[#ffd700] text-xl font-bold font-serif mb-2">
                  {t(`oracle.${oracleType}.title`)}
                </h2>
                <p className="text-[#b19cd9] text-sm">
                  {t('cardgame.loading')}
                </p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <>
          <div className="game-area w-full text-center min-h-screen flex flex-col justify-between p-2 sm:p-4 pt-20 sm:pt-24">
            <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4">
              <div className="reading-type">
                <h2 className="text-[#ffd700] text-xl sm:text-2xl md:text-3xl font-bold font-serif text-shadow-glow leading-tight">
                  {t(`oracle.${oracleType}.title`)}
                </h2>
                <p className="text-[#b19cd9] text-sm sm:text-base max-w-2xl mx-auto">
                  {t(`oracle.${oracleType}.description`)}
                </p>
                <p className="text-[#c9a9dd] text-xs sm:text-sm mt-2 sm:mt-3">
                  {isDailyReading 
                    ? t('cardgame.daily.instruction')
                    : t('cardgame.reading.instruction')
                  }
                </p>
              </div>

              <div className={`cards-container flex flex-col items-center gap-4 ${isDailyReading ? '' : 'max-w-5xl mx-auto'}`}>
                {isDailyReading ? (
                  <div className="cards-grid flex justify-center gap-4 sm:gap-6 lg:gap-8">
                    {Array.from({length: displayCards}, (_, cardIndex) => {
                      const actualIndex = randomCards[cardIndex];
                      const isCardFlipped = flippedCards[cardIndex];
                      const canClick = !isCardFlipped && selectedCardsIndices.length < maxSelection;
                      const cardData = oracle.cards[actualIndex];

                      return (
                        <TarotCard
                          key={`${oracleType}-${cardIndex}-${actualIndex}`}
                          number={isCardFlipped ? actualIndex + 1 : 0}
                          isSelected={false}
                          isSelectable={canClick}
                          onClick={() => handleCardClick(cardIndex)}
                          cardName={isCardFlipped ? cardData?.name : undefined}
                          oracleType={getCardOracleType()}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="cards-grid flex justify-center gap-3 sm:gap-4 md:gap-6">
                      {Array.from({length: 3}, (_, cardIndex) => {
                        const actualIndex = randomCards[cardIndex];
                        const isCardFlipped = flippedCards[cardIndex];
                        const isSelected = selectedCardsIndices.includes(cardIndex);
                        const canClick = !isCardFlipped && selectedCardsIndices.length < maxSelection;
                        const cardData = oracle.cards[actualIndex];

                        return (
                          <TarotCard
                            key={`${oracleType}-${cardIndex}-${actualIndex}`}
                            number={isCardFlipped ? actualIndex + 1 : 0}
                            isSelected={isSelected}
                            isSelectable={canClick}
                            onClick={() => handleCardClick(cardIndex)}
                            cardName={isCardFlipped ? cardData?.name : undefined}
                            oracleType={getCardOracleType()}
                          />
                        );
                      })}
                    </div>

                    <div className="cards-grid flex justify-center gap-3 sm:gap-4 md:gap-6">
                      {Array.from({length: 3}, (_, i) => {
                        const cardIndex = i + 3;
                        const actualIndex = randomCards[cardIndex];
                        const isCardFlipped = flippedCards[cardIndex];
                        const isSelected = selectedCardsIndices.includes(cardIndex);
                        const canClick = !isCardFlipped && selectedCardsIndices.length < maxSelection;
                        const cardData = oracle.cards[actualIndex];

                        return (
                          <TarotCard
                            key={`${oracleType}-${cardIndex}-${actualIndex}`}
                            number={isCardFlipped ? actualIndex + 1 : 0}
                            isSelected={isSelected}
                            isSelectable={canClick}
                            onClick={() => handleCardClick(cardIndex)}
                            cardName={isCardFlipped ? cardData?.name : undefined}
                            oracleType={getCardOracleType()}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className="controls">
                <p className="text-[#b19cd9] text-xs sm:text-sm mb-3">
                  {isDailyReading 
                    ? t('cardgame.daily.choose')
                    : t('cardgame.selected')
                        .replace('{current}', selectedCardsIndices.length.toString())
                        .replace('{max}', maxSelection.toString())
                  }
                </p>

                <MysticalButton 
                  variant="secondary" 
                  onClick={onBack} 
                  className="px-4 py-2 text-sm min-h-[44px]"
                >
                  ← {t('cardgame.back')}
                </MysticalButton>
              </div>
            </div>
          </div>

          {/* Modal de révélation de carte */}
          {revealedCard && (
            <CardRevealModal
              card={revealedCard.card}
              oracleType={getCardOracleType()}
              onClose={handleCloseModal}
              cardNumber={selectedCardsIndices.length}
              totalCards={maxSelection}
            />
          )}
        </>
      );
    }