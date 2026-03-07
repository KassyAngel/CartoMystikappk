import { useState, useEffect } from 'react';
import TarotCard from '@/components/TarotCard';
import CardRevealModal from '@/components/CardRevealModal';
import { OracleData, UserSession, OracleType, OracleCard } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { saveDailyReading } from '@/lib/dailyLimit';
import { 
  selectRandomCardsWithoutRepeat, 
  saveTirageToHistory,
  getSecureRandomInt
} from '@/lib/utils';
import { getFrenchKeyFromTranslatedName, getTarotFrenchKey, getAngelsFrenchKey } from '@/lib/cardNameMapping';
import { useCardImagePreloader } from '@/hooks/useCardImagePreloader';

interface CardGameProps {
  user: UserSession;
  oracle: OracleData;
  oracleType: OracleType;
  onCardsSelected: (selectedCardIndices: number[]) => void;
  onSaveReading?: (reading: any) => Promise<void>;
  onBack: () => void;
}

export default function CardGame({ 
  user, oracle, oracleType, onCardsSelected, onSaveReading, onBack 
}: CardGameProps) {
  const [randomCards, setRandomCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [selectedCardsIndices, setSelectedCardsIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedCard, setRevealedCard] = useState<{ card: any; index: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  const { isLoaded: imagesLoaded, progress } = useCardImagePreloader(oracleType);

  const playFlip = useSound('Flip-card.wav');
  const playReveal = useSound('Bouton-reveal.wav');

  const isDailyReading = oracleType === 'daily';
  const displayCards = isDailyReading ? 3 : 6;
  const maxSelection = isDailyReading ? 1 : 3;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const normalizeCardName = (name: string): string =>
    name.trim().replace(/[''\s-]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const getCardOracleType = (): 'tarot' | 'angels' | 'runes' | 'oracle' | 'daily' => {
    if (oracleType === 'daily') return 'daily';
    if (oracleType === 'tarot') return 'tarot';
    if (oracleType === 'angels') return 'angels';
    if (oracleType === 'runes') return 'runes';
    return 'oracle';
  };

  const translateCardName = (cardName: string | undefined): string | undefined => {
    if (!cardName) return undefined;
    const oracleTypeKey = getCardOracleType();
    const sourceLanguage = 'fr';
    if (oracleTypeKey === 'daily') {
      const frenchKey = getFrenchKeyFromTranslatedName(cardName, sourceLanguage);
      const translated = t(`cards.daily.${frenchKey}.name`);
      return translated !== `cards.daily.${frenchKey}.name` ? translated : cardName;
    }
    if (oracleTypeKey === 'tarot') {
      const frenchKey = getTarotFrenchKey(cardName, sourceLanguage);
      const translated = t(`cards.tarot.${frenchKey}.name`);
      return translated !== `cards.tarot.${frenchKey}.name` ? translated : cardName;
    }
    if (oracleTypeKey === 'angels') {
      const frenchKey = getAngelsFrenchKey(cardName, sourceLanguage);
      const translated = t(`cards.angels.${frenchKey}.name`);
      return translated !== `cards.angels.${frenchKey}.name` ? translated : cardName;
    }
    const norm = normalizeCardName(cardName);
    const translated = t(`cards.${oracleTypeKey}.${norm}.name`);
    return translated !== `cards.${oracleTypeKey}.${norm}.name` ? translated : cardName;
  };

  useEffect(() => {
    const generateCards = async () => {
      setIsLoading(true);
      if (!imagesLoaded) return;
      try {
        const selectedCards = selectRandomCardsWithoutRepeat(oracle.cards.length, displayCards, oracleType);
        setRandomCards(selectedCards);
        setFlippedCards(new Array(displayCards).fill(false));
      } catch {
        const fallback = Array.from({length: oracle.cards.length}, (_, i) => i)
          .sort(() => Math.random() - 0.5).slice(0, displayCards);
        setRandomCards(fallback);
        setFlippedCards(new Array(displayCards).fill(false));
      } finally {
        setIsLoading(false);
      }
    };
    generateCards();
  }, [oracle.cards.length, displayCards, oracleType, imagesLoaded, progress]);

  const handleCardClick = (cardIndex: number) => {
    if (flippedCards[cardIndex]) return;
    if (selectedCardsIndices.length >= maxSelection) return;
    playFlip();
    const newFlippedCards = [...flippedCards];
    newFlippedCards[cardIndex] = true;
    setFlippedCards(newFlippedCards);
    const actualIndex = randomCards[cardIndex];
    setRevealedCard({ card: oracle.cards[actualIndex], index: cardIndex });
    setSelectedCardsIndices([...selectedCardsIndices, cardIndex]);
  };

  const generateFullInterpretation = (selectedCards: OracleCard[]): string => {
    const genderSuffix = user.gender === 'femme' ? 'e' : '';
    const genderText = t(`interpretation.gender.${user.gender || 'autre'}`);
    const getZodiac = () => {
      if (!user.zodiacSign?.name) return '';
      const map: Record<string,string> = {'Bélier':'aries','Taureau':'taurus','Gémeaux':'gemini','Cancer':'cancer','Lion':'leo','Vierge':'virgo','Balance':'libra','Scorpion':'scorpio','Sagittaire':'sagittarius','Capricorne':'capricorn','Verseau':'aquarius','Poissons':'pisces'};
      const key = map[user.zodiacSign.name];
      return key ? t(`zodiac.signs.${key}`) : user.zodiacSign.name;
    };
    const zodiac = getZodiac() || t('interpretation.fallback.zodiac');

    const getMeaning = (cardName: string, oType: 'tarot'|'angels'|'runes'|'oracle'|'daily') => {
      let key = cardName;
      if (oType === 'daily') key = getFrenchKeyFromTranslatedName(cardName, 'fr');
      else if (oType === 'tarot') key = getTarotFrenchKey(cardName, 'fr');
      else if (oType === 'angels') key = getAngelsFrenchKey(cardName, 'fr');
      else key = normalizeCardName(cardName);
      const mKey = oType === 'oracle' ? 'daily' : oType;
      const base = `cards.${mKey}.${key}.meaning`;
      const vars = [t(`${base}.var1`,{genderSuffix}),t(`${base}.var2`,{genderSuffix}),t(`${base}.var3`,{genderSuffix})].filter(v=>!v.includes('cards.'));
      return vars.length ? vars[getSecureRandomInt(0,vars.length-1)] : t(base,{genderSuffix});
    };

    const sections = selectedCards.map(c => `${translateCardName(c.name)||c.name}\n${getMeaning(c.name, getCardOracleType())}`);
    return sections.join('\n\n');
  };

  const handleCloseModal = async () => {
    setRevealedCard(null);
    if (selectedCardsIndices.length === maxSelection) {
      playReveal();
      const cards = selectedCardsIndices.map(idx => randomCards[idx]);
      const cardsData = cards.map(idx => oracle.cards[idx]);
      const interp = generateFullInterpretation(cardsData);
      if (onSaveReading) {
        try {
          await onSaveReading({ type: oracleType === 'daily' ? 'oracle' : oracleType, cards: cardsData.map(c=>c.name), date: new Date(), answer: interp });
        } catch {}
      }
      if (isDailyReading) saveDailyReading(cards);
      saveTirageToHistory(oracleType, cards);
      setTimeout(() => onCardsSelected(cards), 300);
    }
  };

  if (isLoading || !imagesLoaded) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#05030E', fontFamily: "'Jost', sans-serif", padding: '24px',
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400&display=swap');`}</style>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(240,208,128,0.7) 0%, rgba(201,168,76,0.3) 60%, transparent 100%)',
            margin: '0 auto 24px',
            animation: 'pulse-load 2s ease-in-out infinite',
          }}/>
          <p style={{ fontSize: 12, letterSpacing: 3, color: '#DDB95A', textTransform: 'uppercase', marginBottom: 16 }}>
            {!imagesLoaded ? `Chargement ${Math.round(progress)}%` : 'Préparation...'}
          </p>
          {!imagesLoaded && progress > 0 && (
            <div style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 1, overflow: 'hidden', margin: '0 auto' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', transition: 'width 0.3s ease' }}/>
            </div>
          )}
        </div>
        <style>{`@keyframes pulse-load { 0%,100%{transform:scale(0.9);opacity:.7} 50%{transform:scale(1.1);opacity:1} }`}</style>
      </div>
    );
  }

  const selectionCount = selectedCardsIndices.length;
  const oracleLabels: Record<string,string> = { daily: 'Tirage du Jour', tarot: 'Tarot de Marseille', angels: "Oracle des Anges", runes: 'Runes Ancestrales' };
  const oracleLabel = oracleLabels[oracleType] || oracle.title;

  return (
    <>
      <div className={`cg-root ${mounted ? 'cg-mounted' : ''}`}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

          :root {
            --gold: #DDB95A;
            --gold-light: #F0DC88;
            --gold-dim: rgba(201,168,76,0.3);
            --white: #F7F2EA;
            --bg: #05030E;
          }
          * { box-sizing: border-box; }

          .cg-root {
            min-height: 100vh; display: flex; flex-direction: column;
            background: var(--bg); font-family: 'Jost', sans-serif; color: var(--white);
            position: relative; overflow: hidden;
            padding-top: env(safe-area-inset-top, 0px);
            /* ✅ FIX SCROLL : autoriser uniquement le scroll vertical sur toute la page */
            touch-action: pan-y;
          }

          .cg-bg {
            position: absolute; inset: 0; pointer-events: none;
            background:
              radial-gradient(ellipse 80% 50% at 50% -5%, rgba(80,40,160,0.2) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 85% 80%, rgba(40,20,90,0.1) 0%, transparent 50%);
          }
          .cg-noise {
            position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
          }
          .cg-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
          .cg-particle {
            position: absolute; border-radius: 50%; background: white;
            animation: cgpf var(--dur,4s) ease-in-out infinite var(--del,0s);
          }
          @keyframes cgpf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.2)} }

          /* Header */
          .cg-header {
            position: relative; z-index: 20;
            display: flex; align-items: center; justify-content: space-between;
            padding: 20px 24px 0;
            opacity: 0; transition: opacity 0.6s ease;
          }
          .cg-mounted .cg-header { opacity: 1; transition-delay: 0.1s; }

          .cg-back {
            display: flex; align-items: center; gap: 8px;
            background: none; border: none; cursor: pointer; padding: 0;
            font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
            letter-spacing: 2px; text-transform: uppercase;
            color: rgba(247,242,234,0.80); transition: color 0.3s;
          }
          .cg-back:hover { color: rgba(247,242,234,1); }
          .cg-back-arr { width: 18px; height: 1px; background: currentColor; position: relative; }
          .cg-back-arr::before {
            content: ''; position: absolute; left: 0; top: -3px;
            width: 6px; height: 6px;
            border-left: 1px solid currentColor; border-bottom: 1px solid currentColor;
            transform: rotate(45deg);
          }

          .cg-progress-dots { display: flex; align-items: center; gap: 6px; }
          .cg-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: rgba(255,255,255,0.30); transition: all 0.4s ease;
          }
          .cg-dot.filled {
            background: var(--gold);
            box-shadow: 0 0 6px rgba(201,168,76,0.6);
          }

          /* Titre */
          .cg-title-block {
            position: relative; z-index: 10; text-align: center;
            padding: 32px 24px 24px;
            opacity: 0; transform: translateY(10px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
          .cg-mounted .cg-title-block { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }

          .cg-oracle-badge {
            display: inline-block;
            font-size: 9px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
            color: rgba(220,185,90,1.0);
            border: 1px solid rgba(201,168,76,0.45);
            border-radius: 20px; padding: 5px 14px; margin-bottom: 14px;
          }

          .cg-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: clamp(26px, 7vw, 38px); font-weight: 300;
            color: var(--white); margin: 0 0 8px; line-height: 1.1;
          }
          .cg-title em { font-style: italic; color: #F0DC88; }

          .cg-desc {
            font-family: 'Playfair Display', serif;
            font-size: 14px; font-style: italic; font-weight: 300;
            color: rgba(247,242,234,0.85); line-height: 1.65;
          }

          /* ✅ FIX PRINCIPAL : touch-action pan-y sur toute la zone cartes */
          .cg-cards-area {
            position: relative; z-index: 10;
            flex: 1; display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 8px 16px; gap: 16px;
            opacity: 0; transition: opacity 0.8s ease;
            /* Interdit scroll horizontal et rotation, autorise uniquement vertical */
            touch-action: pan-y;
            /* Empêche la sélection de texte accidentelle */
            user-select: none;
            -webkit-user-select: none;
          }
          .cg-mounted .cg-cards-area { opacity: 1; transition-delay: 0.4s; }

          /* ✅ Chaque rangée de cartes aussi */
          .cg-cards-row {
            display: flex; justify-content: center; align-items: center; gap: 14px;
            touch-action: pan-y;
          }

          /* Instruction */
          .cg-instruction {
            position: relative; z-index: 10;
            text-align: center; padding: 0 24px 12px;
            opacity: 0; transition: opacity 0.7s ease;
          }
          .cg-mounted .cg-instruction { opacity: 1; transition-delay: 0.6s; }

          .cg-instruction-text {
            font-size: 13px; font-weight: 400; letter-spacing: 0.3px;
            color: rgba(247,242,234,0.88); margin-bottom: 4px;
          }
          .cg-counter {
            font-family: 'Playfair Display', serif;
            font-size: 12px; font-style: italic;
            color: rgba(220,185,90,1.0);
          }

          /* Footer */
          .cg-footer {
            position: relative; z-index: 10;
            padding: 16px 24px 32px; display: flex; justify-content: center;
            opacity: 0; transition: opacity 0.7s ease;
          }
          .cg-mounted .cg-footer { opacity: 1; transition-delay: 0.7s; }

          .cg-back-btn {
            padding: 13px 36px;
            background: none;
            border: 1px solid rgba(255,255,255,0.22); border-radius: 3px;
            font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
            letter-spacing: 3px; text-transform: uppercase;
            color: rgba(247,242,234,0.78); cursor: pointer; transition: all 0.3s;
          }
          .cg-back-btn:hover { border-color: rgba(255,255,255,0.45); color: rgba(247,242,234,1); }

          .cg-line {
            width: 1px; height: 32px;
            background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
            margin: 0 auto;
          }
        `}</style>

        <div className="cg-bg" />
        <div className="cg-noise" />
        <div className="cg-particles">
          {Array.from({length: 30}).map((_,i) => (
            <div key={i} className="cg-particle" style={{
              left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
              width: `${Math.random()<.2?2:1}px`, height: `${Math.random()<.2?2:1}px`,
              '--dur': `${3+Math.random()*5}s`, '--del': `${Math.random()*5}s`,
              '--op': 0.1+Math.random()*0.35,
            } as any}/>
          ))}
        </div>

        <div className="cg-header">
          <button className="cg-back" onClick={onBack}>
            <span className="cg-back-arr"/>
            {t('cardgame.back') || 'Retour'}
          </button>
          {!isDailyReading && (
            <div className="cg-progress-dots">
              {Array.from({length: maxSelection}).map((_,i) => (
                <div key={i} className={`cg-dot ${i < selectionCount ? 'filled' : ''}`}/>
              ))}
            </div>
          )}
        </div>

        <div className="cg-title-block">
          <div className="cg-oracle-badge">{oracleLabel}</div>
          <h1 className="cg-title">
            <em>{t(`oracle.${oracleType}.title`) || oracleLabel}</em>
          </h1>
          <p className="cg-desc">{t(`oracle.${oracleType}.description`)}</p>
        </div>

        <div className="cg-line"/>

        {/* ✅ touch-action pan-y posé ici ET sur chaque row */}
        <div className="cg-cards-area">
          {isDailyReading ? (
            <div className="cg-cards-row">
              {Array.from({length: displayCards}, (_, cardIndex) => {
                const actualIndex = randomCards[cardIndex];
                const isFlipped = flippedCards[cardIndex];
                const canClick = !isFlipped && selectionCount < maxSelection;
                return (
                  <TarotCard
                    key={`${oracleType}-${cardIndex}-${actualIndex}`}
                    number={isFlipped ? actualIndex + 1 : 0}
                    isSelected={false}
                    isSelectable={canClick}
                    onClick={() => handleCardClick(cardIndex)}
                    cardName={isFlipped ? oracle.cards[actualIndex]?.name : undefined}
                    oracleType={getCardOracleType()}
                  />
                );
              })}
            </div>
          ) : (
            <>
              <div className="cg-cards-row">
                {Array.from({length: 3}, (_, i) => {
                  const isFlipped = flippedCards[i];
                  const canClick = !isFlipped && selectionCount < maxSelection;
                  return (
                    <TarotCard
                      key={`${oracleType}-${i}-${randomCards[i]}`}
                      number={isFlipped ? randomCards[i]+1 : 0}
                      isSelected={selectedCardsIndices.includes(i)}
                      isSelectable={canClick}
                      onClick={() => handleCardClick(i)}
                      cardName={isFlipped ? oracle.cards[randomCards[i]]?.name : undefined}
                      oracleType={getCardOracleType()}
                    />
                  );
                })}
              </div>
              <div className="cg-cards-row">
                {Array.from({length: 3}, (_, i) => {
                  const ci = i + 3;
                  const isFlipped = flippedCards[ci];
                  const canClick = !isFlipped && selectionCount < maxSelection;
                  return (
                    <TarotCard
                      key={`${oracleType}-${ci}-${randomCards[ci]}`}
                      number={isFlipped ? randomCards[ci]+1 : 0}
                      isSelected={selectedCardsIndices.includes(ci)}
                      isSelectable={canClick}
                      onClick={() => handleCardClick(ci)}
                      cardName={isFlipped ? oracle.cards[randomCards[ci]]?.name : undefined}
                      oracleType={getCardOracleType()}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="cg-instruction">
          <p className="cg-instruction-text">
            {isDailyReading
              ? t('cardgame.daily.choose') || 'Choisissez la carte qui vous appelle'
              : t('cardgame.selected')?.replace('{current}', selectionCount.toString()).replace('{max}', maxSelection.toString()) || `${selectionCount} / ${maxSelection} cartes choisies`
            }
          </p>
          {!isDailyReading && (
            <p className="cg-counter">
              {t('cardgame.reading.instruction') || 'Laissez votre intuition vous guider'}
            </p>
          )}
        </div>

        <div className="cg-footer">
          <button className="cg-back-btn" onClick={onBack}>
            {t('cardgame.back') || 'Retour'}
          </button>
        </div>
      </div>

      {revealedCard && (
        <CardRevealModal
          card={revealedCard.card}
          oracleType={oracleType === 'daily' ? 'oracle' : oracleType}
          onClose={handleCloseModal}
          cardNumber={selectedCardsIndices.length}
          totalCards={maxSelection}
        />
      )}
    </>
  );
}