import { useState, useEffect, useMemo } from 'react';
import SummaryCard from '@/components/SummaryCard';
import { OracleData, OracleCard, UserSession, OracleType } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSecureRandomInt } from '@/lib/utils';
import { getTimeUntilMidnight } from '@/lib/dailyLimit';
import { getFrenchKeyFromTranslatedName, getTarotFrenchKey, getAngelsFrenchKey } from '@/lib/cardNameMapping';

interface CardSection {
  icon: string;
  title: string;
  position?: string;
  content: string;
}

interface InterpretationPageProps {
  user: UserSession;
  oracle: OracleData;
  oracleType: OracleType;
  selectedCardIndices: number[];
  selectedCards: OracleCard[];
  onBack: () => void;
  onHome: () => void;
  onCrystalBall?: () => void;
  onSaveReading?: (reading: any) => Promise<void>;
}

export default function InterpretationPage({
  user, oracle, oracleType, selectedCards,
  onBack, onHome, onCrystalBall
}: InterpretationPageProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const isDailyReading = oracleType === 'daily';

  const normalizeCardName = (name: string) =>
    name.trim().replace(/[''\s]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // ─── Helpers ────────────────────────────────────────────────────────────────
  const getCardOracleType = (): 'tarot' | 'angels' | 'runes' | 'daily' => {
    if (oracleType === 'daily') return 'daily';
    if (oracleType === 'tarot') return 'tarot';
    if (oracleType === 'angels') return 'angels';
    return 'runes';
  };

  const getMeaning = (cardName: string, oType: 'tarot' | 'angels' | 'runes' | 'daily') => {
    const genderSuffix = user.gender === 'femme' ? 'e' : '';
    let key = cardName;
    if (oType === 'daily') key = getFrenchKeyFromTranslatedName(cardName, 'fr');
    else if (oType === 'tarot') key = getTarotFrenchKey(cardName, 'fr');
    else if (oType === 'angels') key = getAngelsFrenchKey(cardName, 'fr');
    else key = normalizeCardName(cardName);

    const base = `cards.${oType}.${key}.meaning`;
    const vars = [
      t(`${base}.var1`, { genderSuffix }),
      t(`${base}.var2`, { genderSuffix }),
      t(`${base}.var3`, { genderSuffix }),
    ].filter(v => !v.includes(`cards.${oType}`));
    return vars.length ? vars[getSecureRandomInt(0, vars.length - 1)] : t(base, { genderSuffix });
  };

  const pick = (arr: string[]) =>
    arr.length ? arr[getSecureRandomInt(0, arr.length - 1)] : '';

  const getVariants = (keyBase: string, count: number, vars: Record<string, string> = {}): string[] =>
    Array.from({ length: count }, (_, i) => t(`${keyBase}.var${i + 1}`, vars))
      .filter(v => !v.includes(keyBase));

  // ─── Synthèse Tarot ─────────────────────────────────────────────────────────
  // Templates dans translations.ts, variables {kw0}/{kw1}/{kw2} pour traduction
  const buildTarotSynthesis = (cards: OracleCard[]): string => {
    const kw = cards.map(c => {
      const key = getTarotFrenchKey(c.name, 'fr');
      const k = t(`cards.tarot.${key}.keyword`);
      return k.includes('cards.tarot') ? c.name : k;
    });
    const [kw0, kw1, kw2] = kw;

    const templates = Array.from({ length: 12 }, (_, i) =>
      t(`interpretation.synthesis.tarot.${i + 1}`, { kw0, kw1, kw2 })
    ).filter(v => v && !v.includes('interpretation.synthesis'));

    // Fallback FR si pas de clés traduites
    if (!templates.length) {
      const fb = [
        kw0 && kw1 && kw2 ? `En ce moment, ${kw0} est présent dans ta vie. Cela laisse place à ${kw1} qui évolue, et ce qui arrive, c'est ${kw2}.` : '',
        kw0 && kw2 ? `Tu pars de ${kw0}. Pas à pas, ce chemin te mène vers ${kw2}.` : '',
        kw1 ? `Ce tirage montre un moment de changement. Ce qui bouge en toi, c'est ${kw1}.` : '',
        kw0 && kw1 && kw2 ? `Trois étapes : d'abord ${kw0} qui pose la situation. Puis ${kw1} qui la met en mouvement. Et enfin ${kw2} qui montre où ça va.` : '',
        kw2 ? `Ce que tes cartes montrent en ce moment : tout ce que tu traverses te prépare à ${kw2}.` : '',
        kw1 && kw2 ? `${kw1} est en train de changer en toi. Ce changement prépare l'arrivée de ${kw2}.` : '',
        kw0 && kw2 ? `Tu n'es plus tout à fait dans ${kw0}, et pas encore dans ${kw2}. Tu es entre les deux, et c'est là que tout se joue.` : '',
        `Ces trois cartes racontent une seule histoire : un mouvement qui se déroule en ce moment dans ta vie.`,
      ].filter(Boolean) as string[];
      return pick(fb);
    }
    return pick(templates);
  };

  // ─── Synthèse Anges ──────────────────────────────────────────────────────────
  const buildAngelsSynthesis = (cards: OracleCard[]): string => {
    const genderSuffix = user.gender === 'femme' ? 'e' : '';

    const energy = (card: OracleCard) => {
      const key = getAngelsFrenchKey(card.name, 'fr');
      const e = t(`cards.angels.${key}.keyword`);
      return e.includes('cards.angels') ? card.name : e;
    };
    const e0 = energy(cards[0]);
    const e1 = energy(cards[1]);
    const e2 = energy(cards[2]);

    const templates = Array.from({ length: 12 }, (_, i) =>
      t(`interpretation.synthesis.angels.${i + 1}`, { e0, e1, e2, genderSuffix })
    ).filter(v => v && !v.includes('interpretation.synthesis'));

    // Fallback FR si pas de clés traduites
    if (!templates.length) {
      const fb = [
        e0 && e1 && e2 ? `Les anges te guident en trois étapes : laisser partir ${e0}, recevoir ${e1}, et devenir ${e2}.` : '',
        e0 && e2 ? `Ce que tu lâches, ${e0}, fait de la place pour quelque chose de nouveau : ${e2}.` : '',
        e1 ? `${e1} entre dans ta vie en ce moment. C'est une réponse à ce que tu traverses.` : '',
        e0 && e1 ? `En libérant ${e0}, tu t'ouvres à ${e1}. C'est le mouvement que les anges voient pour toi.` : '',
        e2 ? `Au bout de ce chemin, il y a ${e2}. C'est qui tu deviens, pas un rêve lointain.` : '',
        `Tu n'es pas seul${genderSuffix} dans ce moment. Une présence bienveillante accompagne chacun de tes pas.`,
        `Ce tirage t'invite à faire confiance. Pas à l'aveugle, mais avec la certitude que tu es sur le bon chemin.`,
      ].filter(Boolean) as string[];
      return pick(fb);
    }
    return pick(templates);
  };

  // ─── Action concrète Tarot ──────────────────────────────────────────────────
  // Directives de VIE traduites via t() — sans répéter les keywords de la synthèse
  const buildTarotAction = (cards: OracleCard[], name: string, genderSuffix: string): string => {
    const templates = Array.from({ length: 8 }, (_, i) =>
      t(`interpretation.action.tarot.${i + 1}`, { name, genderSuffix })
    ).filter(v => v && !v.includes('interpretation.action'));

    // Fallback FR — directives concrètes sans keywords
    if (!templates.length) {
      const fb = [
        `${name}, dans les prochains jours : prends note de ce qui attire vraiment ton attention. C'est là que ton énergie veut aller.`,
        `${name}, un conseil simple : avant de prendre une décision importante, demande-toi si elle te rapproche de ce que tu veux vraiment ou si elle t'en éloigne.`,
        `${name}, ce tirage te dit de ne pas forcer. Si quelque chose résiste, laisse-le reposer. La clarté vient quand on arrête de pousser.`,
        `${name}, sois attentif${genderSuffix} aux petits signes autour de toi cette semaine. Ils font partie du mouvement que tes cartes ont montré.`,
        `${name}, le bon timing, c'est maintenant. Si tu attends le moment parfait, il ne viendra pas. Commence avec ce que tu as.`,
        `${name}, parle de ce que tu ressens à quelqu'un en qui tu as confiance. Mettre des mots dessus t'aidera à avancer.`,
        `${name}, prends soin de toi physiquement cette semaine. L'énergie de ce tirage demande que tu sois ancré${genderSuffix} dans ton corps.`,
        `${name}, lâche une chose que tu contrôles trop en ce moment. Ce relâchement est exactement ce dont tu as besoin.`,
      ];
      return pick(fb);
    }
    return pick(templates);
  };

  // ─── Action concrète Anges ──────────────────────────────────────────────────
  const buildAngelsAction = (cards: OracleCard[], name: string, genderSuffix: string): string => {
    const templates = Array.from({ length: 8 }, (_, i) =>
      t(`interpretation.action.angels.${i + 1}`, { name, genderSuffix })
    ).filter(v => v && !v.includes('interpretation.action'));

    // Fallback FR — conseils angéliques sans keywords
    if (!templates.length) {
      const fb = [
        `${name}, prends 5 minutes aujourd'hui dans le calme et demande-toi : qu'est-ce que je traîne depuis trop longtemps ? Juste nommer la chose, c'est déjà un geste de libération.`,
        `${name}, les anges te demandent d'arrêter de te justifier. Tu n'as pas besoin de la permission de quelqu'un d'autre pour avancer.`,
        `${name}, fais un geste de soin pour toi aujourd'hui : quelque chose que tu repousses depuis des semaines. C'est ça, le message.`,
        `${name}, observe sans juger cette semaine. Quelque chose que tu vois souvent autour de toi est un signe. Fais-lui confiance.`,
        `${name}, dis oui à quelque chose que tu refuses habituellement par peur. Les anges te disent que le moment est sûr.`,
        `${name}, écris ce que tu ressens. Pas pour quelqu'un, juste pour toi. Ça libère ce qui ne peut pas sortir autrement.`,
        `${name}, cherche la beauté dans une chose ordinaire aujourd'hui. C'est un exercice simple qui change l'énergie autour de toi.`,
        `${name}, si quelqu'un te demande comment tu vas, réponds vraiment. Ne dis pas juste "bien". Cette honnêteté est un acte spirituel.`,
      ];
      return pick(fb);
    }
    return pick(templates);
  };

  // ─── Génération complète ─────────────────────────────────────────────────────
  const generateSections = () => {
    const genderSuffix = user.gender === 'femme' ? 'e' : '';
    const zodiacMap: Record<string, string> = {
      'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini',
      'Cancer': 'cancer', 'Lion': 'leo', 'Vierge': 'virgo',
      'Balance': 'libra', 'Scorpion': 'scorpio', 'Sagittaire': 'sagittarius',
      'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces',
    };
    const zodiacKey = user.zodiacSign?.name ? zodiacMap[user.zodiacSign.name] : null;
    const zodiacName = zodiacKey
      ? t(`zodiac.signs.${zodiacKey}`)
      : user.zodiacSign?.name || t('interpretation.fallback.zodiac');

    const genderText = t(`interpretation.gender.${user.gender || 'autre'}`);

    const getGreeting = (type: string) => {
      const keys = ['', '.var1', '.var2', '.var3', '.var4']
        .map(s => t(`interpretation.${type}.greeting${s}`, { name: user.name, genderSuffix }))
        .filter(v => !v.includes('interpretation.'));
      return keys.length ? pick(keys) : '';
    };

    const getAdvice = () => {
      const keys = Array.from({ length: 10 }, (_, i) =>
        t(`interpretation.advice.var${i + 1}`, { genderSuffix })
      ).filter(v => !v.includes('interpretation.'));
      return keys.length ? pick(keys).replace('{genderSuffix}', genderSuffix) : '';
    };

    const sections: CardSection[] = [];
    let finalMessage = '';
    let greeting = '';

    // ── Tirage du jour ──────────────────────────────────────────────
    if (isDailyReading) {
      const card = selectedCards[0];
      const key = getFrenchKeyFromTranslatedName(card.name, 'fr');
      const name = t(`cards.daily.${key}.name`) || card.name;
      sections.push({ icon: '☀', title: name, content: getMeaning(card.name, 'daily') });

      const wisdomKeys = ['', 'var1', 'var2', 'var3', 'var4', 'var5']
        .map(s => t(`interpretation.daily.wisdom${s ? '.' + s : ''}`, { zodiacSign: zodiacName }))
        .filter(v => !v.includes('interpretation.'));
      finalMessage = wisdomKeys.length ? pick(wisdomKeys) : '';
      greeting = getGreeting('daily');

    // ── Tarot ───────────────────────────────────────────────────────
    } else if (oracle.title === 'Tarot de Marseille') {
      const icons = ['✦', '·', '◆'];
      const positions = [
        t('interpretation.position.tarot.1') || 'Énergie du moment',
        t('interpretation.position.tarot.2') || 'Ce qui se transforme',
        t('interpretation.position.tarot.3') || 'Ce qui arrive',
      ];

      selectedCards.slice(0, 3).forEach((card, i) => {
        const key = getTarotFrenchKey(card.name, 'fr');
        const name = t(`cards.tarot.${key}.name`) || card.name;
        sections.push({
          icon: icons[i],
          title: name,
          position: positions[i],
          content: getMeaning(card.name, 'tarot'),
        });
      });

      // Synthèse non-répétitive (12 templates basés sur keywords)
      const synthesis = buildTarotSynthesis(selectedCards.slice(0, 3));

      // Action concrète dérivée des keywords — liée aux cartes, pas aléatoire
      const action = buildTarotAction(selectedCards.slice(0, 3), user.name, genderSuffix);

      // Un seul bloc : synthèse + action séparés par saut de ligne
      finalMessage = [synthesis, action].filter(Boolean).join('\n\n');
      greeting = getGreeting('tarot');

    // ── Oracle des Anges ────────────────────────────────────────────
    } else if (oracle.title === 'Oracle des Anges') {
      const icons = ['✦', '·', '◆'];
      const positions = [
        t('interpretation.position.angels.1') || 'Ce que tu libères',
        t('interpretation.position.angels.2') || 'Ce que tu accueilles',
        t('interpretation.position.angels.3') || 'Ce que tu incarnes',
      ];

      selectedCards.slice(0, 3).forEach((card, i) => {
        const key = getAngelsFrenchKey(card.name, 'fr');
        const name = t(`cards.angels.${key}.name`) || card.name;
        sections.push({
          icon: icons[i],
          title: name,
          position: positions[i],
          content: getMeaning(card.name, 'angels'),
        });
      });

      // Synthèse non-répétitive (12 templates)
      const synthesis = buildAngelsSynthesis(selectedCards.slice(0, 3));

      // Action concrète dérivée des énergies angéliques
      const action = buildAngelsAction(selectedCards.slice(0, 3), user.name, genderSuffix);

      // Un seul bloc fusionné
      finalMessage = [synthesis, action].filter(Boolean).join('\n\n');
      greeting = getGreeting('angels');

    // ── Runes ───────────────────────────────────────────────────────
    } else {
      const icons = ['ᚱ', 'ᚢ', 'ᚦ'];
      selectedCards.slice(0, 3).forEach((card, i) => {
        const name = t(`cards.runes.${normalizeCardName(card.name)}.name`) || card.name;
        sections.push({ icon: icons[i], title: name, content: getMeaning(card.name, 'runes') });
      });
      finalMessage = (
        t('interpretation.runes.advice', {
          genderText, name: user.name, zodiacSign: zodiacName,
        }).replace('{genderSuffix}', genderSuffix)
        + ' ' + getAdvice()
      ).trim();
      greeting = getGreeting('runes');
    }

    return { sections, finalMessage, greeting };
  };

  // Mémorisé sur les cartes uniquement — la synthèse ne change pas si on change de langue
  // car les keywords sont en français (langue source des templates)
  const { sections, finalMessage, greeting } = useMemo(
    () => generateSections(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCards.map(c => c.name).join(','), oracleType, user.name, user.gender]
  );
  const timeLeft = getTimeUntilMidnight();

  return (
    <div className={`ip-root ${mounted ? 'ip-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        :root {
          --gold: #DDB95A; --gold-light: #F0DC88;
          --white: #F7F2EA; --bg: #05030E;
        }
        * { box-sizing: border-box; }

        .ip-root {
          min-height: 100vh; display: flex; flex-direction: column;
          background: var(--bg); font-family: 'Jost', sans-serif; color: var(--white);
          position: relative; overflow: hidden;
          padding-top: 56px;
        }
        .ip-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 50% at 50% -5%, rgba(80,40,160,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 80%, rgba(40,20,90,0.1) 0%, transparent 50%);
        }
        .ip-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .ip-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .ip-particle {
          position: absolute; border-radius: 50%; background: white;
          animation: ippf var(--dur,4s) ease-in-out infinite var(--del,0s);
        }
        @keyframes ippf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.2)} }

        /* Title block */
        .ip-title-block {
          position: relative; z-index: 10;
          text-align: center; padding: 28px 24px 16px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ip-mounted .ip-title-block { opacity: 1; transform: translateY(0); transition-delay: 0.15s; }

        .ip-greeting-tag {
          display: inline-block;
          font-size: 9px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(220,185,90,0.9);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 20px; padding: 4px 14px; margin-bottom: 12px;
        }
        .ip-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px,6vw,34px); font-weight: 300;
          color: var(--white); margin: 0 0 10px; line-height: 1.15;
        }
        .ip-title em { font-style: italic; color: #F0DC88; }
        .ip-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.88); line-height: 1.7; margin: 0;
        }

        .ip-line {
          width: 1px; height: 24px; margin: 0 auto;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent);
        }

        /* Scroll zone */
        .ip-scroll {
          position: relative; z-index: 10;
          flex: 1; overflow-y: auto; padding: 14px 20px;
          -webkit-overflow-scrolling: touch;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .ip-mounted .ip-scroll { opacity: 1; transition-delay: 0.3s; }

        /* Bandeau tirage du jour */
        .ip-daily-box {
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 10px; padding: 14px 18px;
          margin-bottom: 14px; text-align: center;
        }
        .ip-daily-box-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 400; color: #F0DC88; margin-bottom: 4px;
        }
        .ip-daily-box-sub {
          font-size: 13px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.80);
        }

        /* Footer */
        .ip-footer {
          position: relative; z-index: 10;
          padding: 14px 20px 32px;
          display: flex; flex-direction: column; gap: 10px;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .ip-mounted .ip-footer { opacity: 1; transition-delay: 0.45s; }

        .ip-btn-primary {
          width: 100%; padding: 16px 24px;
          background: linear-gradient(135deg, rgba(201,168,76,0.14), rgba(201,168,76,0.08));
          border: 1px solid rgba(201,168,76,0.5); border-radius: 4px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 4px; text-transform: uppercase;
          color: #F0DC88; cursor: pointer; transition: all 0.3s ease;
        }
        .ip-btn-primary:hover {
          border-color: rgba(220,185,90,1); color: #fff8d0;
          box-shadow: 0 0 20px rgba(201,168,76,0.12);
        }
        .ip-btn-secondary {
          width: 100%; padding: 14px 24px; background: none;
          border: 1px solid rgba(255,255,255,0.20); border-radius: 4px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.75); cursor: pointer; transition: all 0.3s;
        }
        .ip-btn-secondary:hover {
          border-color: rgba(255,255,255,0.4); color: rgba(247,242,234,1);
        }
      `}</style>

      <div className="ip-bg" />
      <div className="ip-noise" />
      <div className="ip-particles">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="ip-particle" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: `${Math.random() < .2 ? 2 : 1}px`, height: `${Math.random() < .2 ? 2 : 1}px`,
            '--dur': `${3 + Math.random() * 5}s`, '--del': `${Math.random() * 5}s`,
            '--op': 0.08 + Math.random() * 0.22,
          } as any} />
        ))}
      </div>

      {/* Titre */}
      <div className="ip-title-block">
        <div className="ip-greeting-tag">
          {isDailyReading
            ? t('interpretation.label.daily') || 'Oracle du jour'
            : t('interpretation.label.reading') || 'Votre lecture'
          }
        </div>
        <h1 className="ip-title">
          <em>
            {isDailyReading
              ? t('interpretation.title.daily', { name: user.name }) || `Pour ${user.name}`
              : t('interpretation.title.reading', { name: user.name }) || `Interprétation pour ${user.name}`
            }
          </em>
        </h1>
        {greeting && <p className="ip-subtitle">{greeting}</p>}
      </div>

      <div className="ip-line" />

      {/* Contenu scrollable */}
      <div className="ip-scroll">
        {isDailyReading && (
          <div className="ip-daily-box">
            <div className="ip-daily-box-title">
              {t('interpretation.dailyComplete') || 'Tirage du jour terminé'}
            </div>
            <div className="ip-daily-box-sub">
              {t('interpretation.timeUntilReset', {
                hours: timeLeft.hours, minutes: timeLeft.minutes,
              }) || `Prochain tirage dans ${timeLeft.hours}h${timeLeft.minutes}min`}
            </div>
          </div>
        )}

        <SummaryCard
          title={t('revelation.summary.title') || 'Ce que révèlent tes cartes'}
          sections={sections}
          finalMessage={finalMessage}
          isVisible={true}
        />
      </div>

      {/* Footer */}
      <div className="ip-footer">
        {isDailyReading ? (
          <>
            <button className="ip-btn-primary" onClick={onCrystalBall}>
              {t('interpretation.consultCrystalBall') || 'Consulter la boule de cristal'}
            </button>
            <button className="ip-btn-secondary" onClick={onHome}>
              {t('common.backHome') || "Retour à l'accueil"}
            </button>
          </>
        ) : (
          <button className="ip-btn-secondary" onClick={onHome}>
            {t('interpretation.newConsultation') || 'Nouvelle consultation'}
          </button>
        )}
      </div>
    </div>
  );
}