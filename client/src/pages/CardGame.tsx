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

// ─── Angles & lifts pour l'éventail ─────────────────────────────────────────

// 9 cartes (tarot / anges) : spread de -64° à +64°
const FAN9_ROTS  = [-64, -48, -32, -16, 0, 16, 32, 48, 64];
const FAN9_LIFTS = [  8,  -2, -10, -16, -18, -16, -10, -2,  8];

// 5 cartes (tirage du jour) : spread de -36° à +36°
const FAN5_ROTS  = [-36, -18, 0, 18, 36];
const FAN5_LIFTS = [  -2, -10, -14, -10, -2];

export default function CardGame({ 
  user, oracle, oracleType, onCardsSelected, onSaveReading, onBack 
}: CardGameProps) {
  const [randomCards, setRandomCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [selectedCardsIndices, setSelectedCardsIndices] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedCard, setRevealedCard] = useState<{ card: any; index: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  const { isLoaded: imagesLoaded, progress } = useCardImagePreloader(oracleType);

  const playFlip = useSound('Flip-card.wav');
  const playReveal = useSound('Bouton-reveal.wav');

  const isDailyReading = oracleType === 'daily';

  // ── 5 cartes pour le tirage du jour, 9 pour tarot/anges ──────────────────
  const displayCards = isDailyReading ? 5 : 9;
  const maxSelection = isDailyReading ? 1 : 3;

  const fanRots  = isDailyReading ? FAN5_ROTS  : FAN9_ROTS;
  const fanLifts = isDailyReading ? FAN5_LIFTS : FAN9_LIFTS;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // ─── Helpers ────────────────────────────────────────────────────────────────
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

  // ─── Génération des cartes ───────────────────────────────────────────────────
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

  // ─── Clic carte ─────────────────────────────────────────────────────────────
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

  // ─── Interprétation ─────────────────────────────────────────────────────────
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

  // ─── Fermeture modale ────────────────────────────────────────────────────────
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

  // ─── Rebattre les cartes ─────────────────────────────────────────────────────
  const handleReshuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      try {
        const newCards = selectRandomCardsWithoutRepeat(oracle.cards.length, displayCards, oracleType);
        setRandomCards(newCards);
      } catch {
        const fallback = Array.from({length: oracle.cards.length}, (_, i) => i)
          .sort(() => Math.random() - 0.5).slice(0, displayCards);
        setRandomCards(fallback);
      }
      setFlippedCards(new Array(displayCards).fill(false));
      setSelectedCardsIndices([]);
      setHoveredIndex(null);
      setIsShuffling(false);
    }, 580);
  };

  // ─── Loading ─────────────────────────────────────────────────────────────────
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

  // ─── Variables d'affichage ───────────────────────────────────────────────────
  const selectionCount = selectedCardsIndices.length;
  const allSelected = selectionCount === maxSelection;
  const oracleLabels: Record<string,string> = {
    daily: 'Tirage du Jour',
    tarot: 'Tarot de Marseille',
    angels: "Oracle des Anges",
    runes: 'Runes Ancestrales'
  };
  const oracleLabel = oracleLabels[oracleType] || oracle.title;

  // ── Taille des cartes dans l'éventail ────────────────────────────────────────
  // Daily (5 cartes) : un peu plus grandes ; tarot/anges (9 cartes) : plus petites
  const cardW = isDailyReading ? 90 : 76;
  const cardH = isDailyReading ? 144 : 122;

  // Transform de chaque carte selon son état
  const getCardTransform = (cardIndex: number): string => {
    const rot  = fanRots[cardIndex];
    const lift = fanLifts[cardIndex];
    if (hoveredIndex === cardIndex) return `rotate(${rot}deg) translateY(${lift - 16}px)`;
    return `rotate(${rot}deg) translateY(${lift}px)`;
  };

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

          /* HEADER */
          .cg-header {
            position: relative; z-index: 20;
            display: flex; align-items: center; justify-content: space-between;
            padding: 12px 20px 0;
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
          .cg-dot.filled { background: var(--gold); box-shadow: 0 0 6px rgba(201,168,76,0.6); }

          /* TITLE */
          .cg-title-block {
            position: relative; z-index: 10; text-align: center;
            padding: 8px 20px 6px;
            opacity: 0; transform: translateY(10px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
          .cg-mounted .cg-title-block { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
          .cg-oracle-badge {
            display: inline-block;
            font-size: 9px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
            color: rgba(220,185,90,1.0);
            border: 1px solid rgba(201,168,76,0.45);
            border-radius: 20px; padding: 4px 12px; margin-bottom: 8px;
          }
          .cg-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: clamp(22px, 6vw, 32px); font-weight: 300;
            color: var(--white); margin: 0 0 4px; line-height: 1.1;
          }
          .cg-title em { font-style: italic; color: #F0DC88; }
          .cg-desc {
            font-family: 'Playfair Display', serif;
            font-size: 14px; font-style: italic; font-weight: 300;
            color: rgba(247,242,234,0.85); line-height: 1.65;
          }

          /* ══════════════════════════════════════════
             ZONE ÉVENTAIL
          ══════════════════════════════════════════ */
          .cg-fan-area {
            position: relative; z-index: 10;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 30px;
            touch-action: pan-y;
            user-select: none;
            -webkit-user-select: none;
            opacity: 0; transition: opacity 0.8s ease;
            overflow: visible;
          }
          .cg-mounted .cg-fan-area { opacity: 1; transition-delay: 0.4s; }

          .cg-fan-pivot {
            position: relative;
            width: 0; height: 0;
          }

          .cg-pivot-glow {
            position: absolute;
            bottom: -8px; left: 50%;
            transform: translateX(-50%);
            width: 180px; height: 28px;
            border-radius: 50%;
            background: radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%);
            pointer-events: none;
            animation: glowPulse 3.5s ease-in-out infinite;
          }
          @keyframes glowPulse {
            0%,100% { opacity:0.5; transform:translateX(-50%) scaleX(1); }
            50%      { opacity:1;   transform:translateX(-50%) scaleX(1.3); }
          }

          .cg-fan-card {
            position: absolute;
            bottom: 0;
            left: calc(var(--cw, 90px) / -2);
            width: var(--cw, 90px);
            height: var(--ch, 144px);
            transform-origin: 50% 100%;
            transform: rotate(var(--rot, 0deg)) translateY(var(--lift, 0px));
            transition:
              transform 0.4s cubic-bezier(0.34, 1.45, 0.64, 1),
              filter 0.3s ease,
              opacity 0.35s ease;
            cursor: pointer;
            will-change: transform;
            animation: fanSpread 0.7s cubic-bezier(0.34, 1.2, 0.64, 1) calc(0.3s + var(--i, 0) * 0.06s) both;
          }
          @keyframes fanSpread {
            from { transform: rotate(0deg) translateY(60px); opacity: 0; }
            to   { transform: rotate(var(--rot, 0deg)) translateY(var(--lift, 0px)); opacity: 1; }
          }

          .cg-fan-card.cg-disabled {
            cursor: default;
            opacity: 0.4;
            pointer-events: none;
          }
          .cg-fan-card.cg-flipped {
            cursor: default;
            filter: drop-shadow(0 0 14px rgba(221,185,90,0.35));
          }

          /* ══════════════════════════════════════════
             RANGÉE DES CARTES SÉLECTIONNÉES
          ══════════════════════════════════════════ */
          .cg-selected-row {
            position: relative; z-index: 10;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 14px;
            padding: 0 20px;
            min-height: 120px;
            flex-shrink: 0;
            opacity: 0; transition: opacity 0.6s ease;
          }
          .cg-mounted .cg-selected-row { opacity: 1; transition-delay: 0.35s; }

          .cg-selected-slot {
            width: 80px; height: 128px;
            border: 1px dashed rgba(201,168,76,0.55);
            border-radius: 7px;
            display: flex; align-items: center; justify-content: center;
            transition: border-color 0.4s ease;
            flex-shrink: 0;
            background: rgba(201,168,76,0.04);
          }
          .cg-selected-slot .slot-num {
            font-family: 'Playfair Display', serif;
            font-size: 18px; font-style: italic;
            color: rgba(201,168,76,0.7);
            transition: color 0.4s ease;
          }

          .cg-selected-card {
            width: 80px; height: 128px;
            flex-shrink: 0;
            animation: cardRise 0.55s cubic-bezier(0.34, 1.45, 0.64, 1) both;
            filter: drop-shadow(0 4px 20px rgba(201,168,76,0.3));
          }
          @keyframes cardRise {
            from { opacity: 0; transform: translateY(30px) scale(0.88); }
            to   { opacity: 1; transform: translateY(0px) scale(1); }
          }

          .cg-selected-card-wrap {
            display: flex; flex-direction: column; align-items: center; gap: 5px;
            flex-shrink: 0;
            animation: cardRise 0.55s cubic-bezier(0.34, 1.45, 0.64, 1) both;
          }
          .cg-selected-order {
            font-size: 9px; font-weight: 300; letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(221,185,90,0.7);
          }

          .cg-divider-row {
            display: flex; align-items: center; gap: 8px;
            padding: 0 40px;
            margin: 2px 0;
            flex-shrink: 0;
            opacity: 0; transition: opacity 0.5s ease;
          }
          .cg-mounted .cg-divider-row { opacity: 1; transition-delay: 0.38s; }
          .cg-div-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent); }
          .cg-div-glyph { font-size: 9px; color: rgba(201,168,76,0.35); letter-spacing: 2px; }

          /* Bouton rebattre */
          .cg-reshuffle-btn {
            padding: 10px 24px;
            background: none;
            border: 1px solid rgba(201,168,76,0.28); border-radius: 3px;
            font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 300;
            letter-spacing: 2.5px; text-transform: uppercase;
            color: rgba(221,185,90,0.7); cursor: pointer;
            transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s, color 0.3s;
          }
          .cg-reshuffle-btn:hover { border-color: rgba(201,168,76,0.55); color: rgba(221,185,90,1); }
          .cg-reshuffle-btn.hidden {
            opacity: 0; pointer-events: none; transform: translateY(4px);
          }

          /* INSTRUCTION */
          .cg-instruction {
            position: relative; z-index: 10;
            text-align: center; padding: 0 20px 2px;
            opacity: 0; transition: opacity 0.7s ease;
          }
          .cg-mounted .cg-instruction { opacity: 1; transition-delay: 0.6s; }
          .cg-instruction-text {
            font-size: 12px; font-weight: 400; letter-spacing: 0.3px;
            color: rgba(247,242,234,0.88); margin-bottom: 2px;
          }
          .cg-counter {
            font-family: 'Playfair Display', serif;
            font-size: 11px; font-style: italic;
            color: rgba(220,185,90,1.0);
          }

          /* FOOTER */
          .cg-footer {
            position: relative; z-index: 10;
            padding: 4px 20px 14px;
            display: flex; align-items: center; justify-content: center; gap: 10px;
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
            width: 1px; height: 10px;
            background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent);
            margin: 0 auto;
          }

          /* ── ANIMATION BATTAGE ── */
          @keyframes shuffleFan {
            0%   {
              transform: rotate(var(--rot)) translateY(var(--lift));
              opacity: 1;
            }
            35%  {
              transform: rotate(calc(var(--rot) * 0.15)) translateY(-12px);
              opacity: 0.9;
            }
            55%  {
              transform: rotate(calc(var(--rot) * 0.05)) translateY(-8px) scale(0.97);
              opacity: 0.85;
            }
            75%  {
              transform: rotate(calc(var(--rot) * 0.05)) translateY(50px) scale(0.95);
              opacity: 0;
            }
            100% {
              transform: rotate(0deg) translateY(60px);
              opacity: 0;
            }
          }
          .cg-fan-card.shuffling {
            animation: shuffleFan 0.55s cubic-bezier(0.4, 0, 0.6, 1)
              calc(var(--i, 0) * 0.03s) forwards !important;
          }

          .cg-reshuffle-btn.shuffling .shuffle-icon {
            display: inline-block;
            animation: spinIcon 0.55s ease forwards;
          }
          @keyframes spinIcon {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
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

        {/* HEADER */}
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

        {/* TITRE */}
        <div className="cg-title-block">
          <div className="cg-oracle-badge">{oracleLabel}</div>
          <h1 className="cg-title">
            <em>{t(`oracle.${oracleType}.title`) || oracleLabel}</em>
          </h1>
          <p className="cg-desc">{t(`oracle.${oracleType}.description`)}</p>
        </div>

        <div className="cg-line"/>

        {/* RANGÉE DES CARTES SÉLECTIONNÉES */}
        <div className="cg-selected-row">
          {Array.from({length: maxSelection}, (_, slotIndex) => {
            const selectedFanIndex = selectedCardsIndices[slotIndex];
            const hasCard = selectedFanIndex !== undefined;
            const actualIndex = hasCard ? randomCards[selectedFanIndex] : null;

            if (hasCard && actualIndex !== null) {
              return (
                <div key={`sel-${slotIndex}`} className="cg-selected-card-wrap">
                  <div className="cg-selected-card">
                    <TarotCard
                      number={actualIndex + 1}
                      isSelected={false}
                      isSelectable={false}
                      onClick={() => {}}
                      cardName={oracle.cards[actualIndex]?.name}
                      oracleType={getCardOracleType()}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div key={`slot-${slotIndex}`} className="cg-selected-slot">
                <span className="slot-num">{slotIndex + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Séparateur */}
        <div className="cg-divider-row">
          <div className="cg-div-line" />
          <span className="cg-div-glyph">✦</span>
          <div className="cg-div-line" />
        </div>

        {/* ÉVENTAIL */}
        <div className="cg-fan-area">
          <div className="cg-fan-pivot">
            <div className="cg-pivot-glow" />

            {Array.from({length: displayCards}, (_, cardIndex) => {
              const actualIndex = randomCards[cardIndex];
              const isFlipped   = flippedCards[cardIndex];
              const isDisabled  = allSelected && !isFlipped;
              const canClick    = !isFlipped && !isDisabled;

              if (isFlipped) return null;

              // z-index : cartes centrales au-dessus pour 9 cartes
              const mid = Math.floor(displayCards / 2);
              const baseZ = mid - Math.abs(cardIndex - mid) + 1;

              const shuffleClass = isShuffling ? 'shuffling' : '';

              return (
                <div
                  key={`${oracleType}-${cardIndex}-${actualIndex}`}
                  className={[
                    'cg-fan-card',
                    isDisabled ? 'cg-disabled' : '',
                    shuffleClass,
                  ].join(' ').trim()}
                  style={{
                    '--rot':  `${fanRots[cardIndex]}deg`,
                    '--lift': `${fanLifts[cardIndex]}px`,
                    '--i':    cardIndex,
                    '--cw':   `${cardW}px`,
                    '--ch':   `${cardH}px`,
                    zIndex: baseZ,
                    transform: getCardTransform(cardIndex),
                  } as any}
                  onClick={() => handleCardClick(cardIndex)}
                  onMouseEnter={() => canClick && setHoveredIndex(cardIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <TarotCard
                    number={0}
                    isSelected={false}
                    isSelectable={canClick}
                    onClick={() => handleCardClick(cardIndex)}
                    cardName={undefined}
                    oracleType={getCardOracleType()}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* INSTRUCTION */}
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

        {/* FOOTER */}
        <div className="cg-footer">
          <button
            className={`cg-reshuffle-btn ${selectionCount > 0 ? 'hidden' : ''} ${isShuffling ? 'shuffling' : ''}`}
            onClick={handleReshuffle}
            disabled={isShuffling}
          >
            <span className="shuffle-icon" style={{display:'inline-block', marginRight: 6}}>↺</span>
            {t('cardgame.reshuffle') || 'Rebattre les cartes'}
          </button>
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

/*
 * ═══════════════════════════════════════════════════════
 *  RÉSUMÉ DES CHANGEMENTS
 *
 *  1. Tirage du jour : 3 cartes → 5 cartes (FAN5)
 *     Angles : -36°, -18°, 0°, +18°, +36°
 *
 *  2. Tarot / Anges : 6 cartes → 9 cartes (FAN9)
 *     Angles : -64°, -48°, -32°, -16°, 0°, +16°, +32°, +48°, +64°
 *     Taille des cartes réduite à 76×122px pour qu'elles tiennent à l'écran
 *
 *  3. z-index recalculé dynamiquement : la carte centrale est toujours
 *     au-dessus, les extrêmes en dessous (logique symétrique)
 *
 *  CLÉS I18N inchangées :
 *    cardgame.back / cardgame.daily.choose / cardgame.selected
 *    cardgame.reading.instruction / cardgame.reshuffle
 * ═══════════════════════════════════════════════════════
 */