import { useState, useEffect } from 'react';
import TarotCard from '@/components/TarotCard';
import MysticalButton from '@/components/MysticalButton';
import CardRevealModal from '@/components/CardRevealModal';
import { OracleData, UserSession, OracleType, OracleCard } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { saveDailyReading } from '@/lib/dailyLimit';
import { 
  selectRandomCardsWithoutRepeat, 
  saveTirageToHistory,
  getRecentCards,
  getSecureRandomInt
} from '@/lib/utils';

interface CardGameProps {
  user: UserSession;
  oracle: OracleData;
  oracleType: OracleType;
  onCardsSelected: (selectedCardIndices: number[]) => void;
  onSaveReading?: (reading: any) => Promise<void>;
  onBack: () => void;
}

export default function CardGame({ 
  user,
  oracle, 
  oracleType, 
  onCardsSelected, 
  onSaveReading,
  onBack 
}: CardGameProps) {
  const [randomCards, setRandomCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [selectedCardsIndices, setSelectedCardsIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedCard, setRevealedCard] = useState<{ card: any; index: number } | null>(null);
  const { t, language } = useLanguage();

  const playFlip = useSound('Flip-card.wav');
  const playReveal = useSound('Bouton-reveal.wav');

  const isDailyReading = oracleType === 'daily';
  const displayCards = isDailyReading ? 3 : 6;
  const maxSelection = isDailyReading ? 1 : 3;

  // — MODIFICATION : fonction de normalisation
  const normalizeCardName = (name: string): string => {
    return name
      .trim()
      .replace(/['\s]/g, '')                      // enlever espaces et apostrophes
      .normalize('NFD')                          
      .replace(/[\u0300-\u036f]/g, '');           // enlever accents
  };

  const getCardOracleType = (): 'tarot' | 'angels' | 'runes' | 'oracle' => {
    if (oracleType === 'daily') return 'oracle';
    if (oracleType === 'tarot') return 'tarot';
    if (oracleType === 'angels') return 'angels';
    if (oracleType === 'runes') return 'runes';
    return 'oracle';
  };

  // — MODIFICATION : traduction du nom de la carte avec normalisation
  const translateCardName = (cardName: string | undefined): string | undefined => {
    if (!cardName) return undefined;

    const oTypeKey = getCardOracleType();
    const normalizedName = normalizeCardName(cardName);

    console.log(`🔍 [${language}] Carte: "${cardName}" → normalized: "${normalizedName}"`);

    const possibleKeys = [
      // on essaie d’abord avec le nom normalisé
      `cards.${oTypeKey}.${normalizedName}.name`,
      // fallback sur le nom original (moins fiable si accents)
      `cards.${oTypeKey}.${cardName}.name`,
    ];

    for (const key of possibleKeys) {
      const translated = t(key);
      if (translated !== key) {
        console.log(`   ✅ Traduction trouvée avec clé "${key}" → "${translated}"`);
        return translated;
      }
    }

    console.log(`   ⚠️ Aucune traduction trouvée pour "${cardName}", on renvoie l'original`);
    return cardName;
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
        const fallbackCards = Array.from({ length: oracle.cards.length }, (_, i) => i)
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

    const newFlipped = [...flippedCards];
    newFlipped[cardIndex] = true;
    setFlippedCards(newFlipped);

    const actualIndex = randomCards[cardIndex];
    const cardData = oracle.cards[actualIndex];

    // — MODIFICATION : on utilise translateCardName normalisé
    const displayName = translateCardName(cardData.name) ?? cardData.name;

    console.log(`🃏 Carte révélée: "${cardData.name}" → "${displayName}"`);

    const translatedCardData = {
      ...cardData,
      name: displayName,
    };

    setRevealedCard({ card: translatedCardData, index: cardIndex });

    const newSelected = [...selectedCardsIndices, cardIndex];
    setSelectedCardsIndices(newSelected);
  };

  const generateFullInterpretation = (selectedCards: OracleCard[]): string => {
    const genderText = t(`interpretation.gender.${user.gender ?? 'autre'}`);
    const genderSuffix = user.gender === 'femme' ? 'e' : '';

    const getTranslatedZodiacName = (): string => {
      if (!user.zodiacSign?.name) return '';
      const signMap: Record<string, string> = {
        'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini',
        'Cancer': 'cancer', 'Lion': 'leo', 'Vierge': 'virgo',
        'Balance': 'libra', 'Scorpion': 'scorpio', 'Sagittaire': 'sagittarius',
        'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces'
      };
      const english = signMap[user.zodiacSign.name];
      return english ? t(`zodiac.signs.${english}`) : user.zodiacSign.name;
    };

    const zodiacName = getTranslatedZodiacName();

    const getRandomCardMeaning = (cardName: string, oType: 'tarot' | 'angels' | 'runes' | 'oracle'): string => {
      const normalizedName = normalizeCardName(cardName);
      const baseKey = `cards.${oType}.${normalizedName}.meaning`;

      const var1 = t(`${baseKey}.var1`, { genderSuffix });
      const var2 = t(`${baseKey}.var2`, { genderSuffix });
      const var3 = t(`${baseKey}.var3`, { genderSuffix });
      const variations = [var1, var2, var3].filter(v => !v.includes(`${baseKey}`));

      if (variations.length > 0) {
        return variations[getSecureRandomInt(0, variations.length - 1)];
      }

      // — MODIFICATION : on utilise toujours la version normalisée
      return t(baseKey, { genderSuffix });
    };

    const getRandomGreeting = (oType: string): string => {
      const variations: Record<string, string[]> = {
        daily: [
          t('interpretation.daily.greeting', { name: user.name }),
          t('interpretation.daily.greeting.var1', { name: user.name }),
          t('interpretation.daily.greeting.var2', { name: user.name }),
          t('interpretation.daily.greeting.var3', { name: user.name }),
          t('interpretation.daily.greeting.var4', { name: user.name })
        ],
        tarot: [
          t('interpretation.tarot.greeting', { name: user.name }),
          t('interpretation.tarot.greeting.var1', { name: user.name }),
          t('interpretation.tarot.greeting.var2', { name: user.name }),
          t('interpretation.tarot.greeting.var3', { name: user.name }),
          t('interpretation.tarot.greeting.var4', { name: user.name })
        ],
        angels: [
          t('interpretation.angels.greeting', { name: user.name }),
          t('interpretation.angels.greeting.var1', { name: user.name }),
          t('interpretation.angels.greeting.var2', { name: user.name }),
          t('interpretation.angels.greeting.var3', { name: user.name }),
          t('interpretation.angels.greeting.var4', { name: user.name })
        ],
        runes: [
          t('interpretation.runes.greeting', { name: user.name, genderSuffix }),
          t('interpretation.runes.greeting.var1', { name: user.name }),
          t('interpretation.runes.greeting.var2', { name: user.name }),
          t('interpretation.runes.greeting.var3', { name: user.name }),
          t('interpretation.runes.greeting.var4', { name: user.name })
        ]
      };

      const arr = variations[oType] ?? variations.tarot;
      return arr[getSecureRandomInt(0, arr.length - 1)];
    };

    const getRandomAdvice = (): string => {
      const adv = [
        t('interpretation.advice.var1', { genderSuffix }),
        t('interpretation.advice.var2'),
        t('interpretation.advice.var3'),
        t('interpretation.advice.var4', { genderSuffix }),
        t('interpretation.advice.var5', { genderSuffix }),
        t('interpretation.advice.var6', { genderSuffix }),
        t('interpretation.advice.var7'),
        t('interpretation.advice.var8'),
        t('interpretation.advice.var9'),
        t('interpretation.advice.var10')
      ];
      return adv[getSecureRandomInt(0, adv.length - 1)];
    };

    const sections: Array<{ icon: string; title: string; content: string }> = [];
    let finalMessage = '';
    let greeting = '';

    if (isDailyReading) {
      const card = selectedCards[0];
      const dailyCardName = translateCardName(card.name) ?? card.name;
      const dailyCardMeaning = getRandomCardMeaning(card.name, 'oracle');

      sections.push({
        icon: '☀️',
        title: dailyCardName,
        content: dailyCardMeaning
      });

      const getRandomWisdom = (zSign: string): string => {
        const keys = [
          'interpretation.daily.wisdom',
          'interpretation.daily.wisdom.var1',
          'interpretation.daily.wisdom.var2',
          'interpretation.daily.wisdom.var3',
          'interpretation.daily.wisdom.var4',
          'interpretation.daily.wisdom.var5'
        ];
        const randomKey = keys[getSecureRandomInt(0, keys.length - 1)];
        const translated = t(randomKey, { zodiacSign: zSign });
        if (translated.includes('interpretation.daily')) {
          return t('interpretation.daily.wisdom', { zodiacSign: zSign });
        }
        return translated;
      };

      finalMessage = getRandomWisdom(zodiacName || '');
      greeting = getRandomGreeting('daily');
    } else if (oracleType === 'tarot') {
      // ton code tarot reste, juste remplacer cardName par translateCardName quand nécessaire
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];
      const card1Name = translateCardName(card1.name) ?? card1.name;
      const card2Name = translateCardName(card2.name) ?? card2.name;
      const card3Name = translateCardName(card3.name) ?? card3.name;

      sections.push(
        { icon: '✨', title: card1Name, content: getRandomCardMeaning(card1.name, 'tarot') },
        { icon: '🌙', title: card2Name, content: getRandomCardMeaning(card2.name, 'tarot') },
        { icon: '⭐', title: card3Name, content: getRandomCardMeaning(card3.name, 'tarot') }
      );

      const templates = [
        t('interpretation.tarot.template.advice.var1', { name: user.name, zodiacSign: zodiacName, genderText }),
        t('interpretation.tarot.template.advice.var2', { name: user.name, zodiacSign: zodiacName, genderText }),
        t('interpretation.tarot.template.advice.var3', { name: user.name, zodiacSign: zodiacName, genderText }),
        t('interpretation.tarot.template.advice.var4', { name: user.name, zodiacSign: zodiacName, genderText })
      ];
      finalMessage = templates[getSecureRandomInt(0, templates.length - 1)] + ' ' + getRandomAdvice();
      greeting = getRandomGreeting('tarot');
    } else if (oracleType === 'angels') {
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];
      const card1Name = translateCardName(card1.name) ?? card1.name;
      const card2Name = translateCardName(card2.name) ?? card2.name;
      const card3Name = translateCardName(card3.name) ?? card3.name;

      sections.push(
        { icon: '👼', title: card1Name, content: getRandomCardMeaning(card1.name, 'angels') },
        { icon: '✨', title: card2Name, content: getRandomCardMeaning(card2.name, 'angels') },
        { icon: '🌟', title: card3Name, content: getRandomCardMeaning(card3.name, 'angels') }
      );

      const templates = [
        t('interpretation.angels.template.message.var1', { name: user.name, zodiacSign: zodiacName, genderText }),
        t('interpretation.angels.template.message.var2', { name: user.name, zodiacSign: zodiacName, genderText }),
        t('interpretation.angels.template.message.var3', { name: user.name, zodiacSign: zodiacName, genderText }),
        t('interpretation.angels.template.message.var4', { name: user.name, zodiacSign: zodiacName, genderText })
      ];
      finalMessage = templates[getSecureRandomInt(0, templates.length - 1)].replace('{genderSuffix}', genderSuffix) + ' ' + getRandomAdvice();
      greeting = getRandomGreeting('angels');
    } else {
      // runes
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];
      const card1Name = translateCardName(card1.name) ?? card1.name;
      const card2Name = translateCardName(card2.name) ?? card2.name;
      const card3Name = translateCardName(card3.name) ?? card3.name;

      sections.push(
        { icon: 'ᚱ', title: card1Name, content: getRandomCardMeaning(card1.name, 'runes') },
        { icon: 'ᚢ', title: card2Name, content: getRandomCardMeaning(card2.name, 'runes') },
        { icon: 'ᚦ', title: card3Name, content: getRandomCardMeaning(card3.name, 'runes') }
      );

      finalMessage = t('interpretation.runes.advice', { genderText, name: user.name, zodiacSign: zodiacName }).replace('{genderSuffix}', genderSuffix) + ' ' + getRandomAdvice();
      greeting = getRandomGreeting('runes');
    }

    const fullText = [
      greeting,
      '',
      ...sections.map(s => `${s.icon} ${s.title}\n${s.content}`),
      '',
      finalMessage
    ].join('\n\n');

    return fullText;
  };

  const handleCloseModal = async () => {
    setRevealedCard(null);

    if (selectedCardsIndices.length === maxSelection) {
      playReveal();
      const selected = selectedCardsIndices.map(idx => randomCards[idx]);
      const selectedData = selected.map(idx => oracle.cards[idx]);

      const fullInterpretation = generateFullInterpretation(selectedData);

      if (onSaveReading) {
        try {
          // — MODIFICATION : stocker les clés normalisées si tu veux  
          const cardsToSave = selectedData.map(card => ({
            name: card.name,
            key: normalizeCardName(card.name),
          }));

          await onSaveReading({
            type: oracleType === 'daily' ? 'oracle' : oracleType,
            cards: cardsToSave,         // on envoie un objet au lieu d'un string pur
            date: new Date(),
            answer: fullInterpretation
          });
          console.log(`✅ ${oracleType} saved`);
        } catch (error) {
          console.error('❌ Erreur sauvegarde:', error);
        }
      }

      if (isDailyReading) {
        saveDailyReading(selected);
      }
      saveTirageToHistory(oracleType, selected);

      setTimeout(() => {
        onCardsSelected(selected);
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
                {Array.from({ length: displayCards }, (_, cardIndex) => {
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
                      cardName={isCardFlipped ? translateCardName(cardData.name) : undefined}
                      oracleType={getCardOracleType()}
                    />
                  );
                })}
              </div>
            ) : (
              <>
                {/* … le reste reste identique … */}
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
