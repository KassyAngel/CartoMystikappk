import { useState, useEffect } from 'react';
import SummaryCard from '@/components/SummaryCard';
import { OracleData, OracleCard, UserSession, OracleType } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSecureRandomInt } from '@/lib/utils';
import { getTimeUntilMidnight } from '@/lib/dailyLimit';

interface CardSection {
  icon: string;
  title: string;
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

  const generateSections = () => {
    const genderSuffix = user.gender === 'femme' ? 'e' : '';
    const genderText = t(`interpretation.gender.${user.gender || 'autre'}`);
    const zodiacMap: Record<string,string> = {'Bélier':'aries','Taureau':'taurus','Gémeaux':'gemini','Cancer':'cancer','Lion':'leo','Vierge':'virgo','Balance':'libra','Scorpion':'scorpio','Sagittaire':'sagittarius','Capricorne':'capricorn','Verseau':'aquarius','Poissons':'pisces'};
    const zodiacKey = user.zodiacSign?.name ? zodiacMap[user.zodiacSign.name] : null;
    const zodiacName = zodiacKey ? t(`zodiac.signs.${zodiacKey}`) : user.zodiacSign?.name || t('interpretation.fallback.zodiac');

    const getMeaning = (cardName: string, oType: 'tarot'|'angels'|'runes'|'daily') => {
      const norm = normalizeCardName(cardName);
      const base = `cards.${oType}.${norm}.meaning`;
      const vars = [t(`${base}.var1`,{genderSuffix}),t(`${base}.var2`,{genderSuffix}),t(`${base}.var3`,{genderSuffix})].filter(v=>!v.includes(`cards.${oType}`));
      return vars.length ? vars[getSecureRandomInt(0,vars.length-1)] : t(base,{genderSuffix});
    };

    const getGreeting = (type: string) => {
      const keys = ['','.var1','.var2','.var3','.var4'].map(s => t(`interpretation.${type}.greeting${s}`,{name:user.name,genderSuffix})).filter(v=>!v.includes('interpretation.'));
      return keys.length ? keys[getSecureRandomInt(0,keys.length-1)] : '';
    };

    const getAdvice = () => {
      const keys = Array.from({length:10},(_,i)=>t(`interpretation.advice.var${i+1}`,{genderSuffix})).filter(v=>!v.includes('interpretation.'));
      return keys.length ? keys[getSecureRandomInt(0,keys.length-1)].replace('{genderSuffix}',genderSuffix) : '';
    };

    const sections: CardSection[] = [];
    let finalMessage = '';
    let greeting = '';

    if (isDailyReading) {
      const card = selectedCards[0];
      const name = t(`cards.daily.${normalizeCardName(card.name)}.name`) || card.name;
      sections.push({ icon: '☀', title: name, content: getMeaning(card.name,'daily') });
      const wisdomKeys = ['','var1','var2','var3','var4','var5'].map(s=>t(`interpretation.daily.wisdom${s?'.'+s:''}`,{zodiacSign:zodiacName})).filter(v=>!v.includes('interpretation.'));
      finalMessage = wisdomKeys.length ? wisdomKeys[getSecureRandomInt(0,wisdomKeys.length-1)] : '';
      greeting = getGreeting('daily');

    } else if (oracle.title === 'Tarot de Marseille') {
      const icons = ['✦','·','◆'];
      selectedCards.slice(0,3).forEach((card,i) => {
        const name = t(`cards.tarot.${normalizeCardName(card.name)}.name`) || card.name;
        sections.push({ icon: icons[i], title: name, content: getMeaning(card.name,'tarot') });
      });
      const tarotTemplates = Array.from({length:8},(_,i)=>t(`interpretation.tarot.template.advice.var${i+1}`,{name:user.name,zodiacSign:zodiacName,genderText})).filter(v=>!v.includes('interpretation.'));
      const tarotAdvices = Array.from({length:8},(_,i)=>t(`interpretation.tarot.advice.var${i+1}`,{genderSuffix})).filter(v=>!v.includes('interpretation.'));
      const tmpl = tarotTemplates.length ? tarotTemplates[getSecureRandomInt(0,tarotTemplates.length-1)] : '';
      const adv = tarotAdvices.length ? tarotAdvices[getSecureRandomInt(0,tarotAdvices.length-1)] : '';
      finalMessage = `${tmpl} ${adv}`.trim();
      greeting = getGreeting('tarot');

    } else if (oracle.title === 'Oracle des Anges') {
      const icons = ['✦','·','◆'];
      selectedCards.slice(0,3).forEach((card,i) => {
        const name = t(`cards.angels.${normalizeCardName(card.name)}.name`) || card.name;
        sections.push({ icon: icons[i], title: name, content: getMeaning(card.name,'angels') });
      });
      const angelsTemplates = Array.from({length:8},(_,i)=>t(`interpretation.angels.template.message.var${i+1}`,{name:user.name,zodiacSign:zodiacName,genderText})).filter(v=>!v.includes('interpretation.'));
      const tmpl = angelsTemplates.length ? angelsTemplates[getSecureRandomInt(0,angelsTemplates.length-1)] : '';
      finalMessage = `${tmpl.replace('{genderSuffix}',genderSuffix)} ${getAdvice()}`.trim();
      greeting = getGreeting('angels');

    } else {
      const icons = ['ᚱ','ᚢ','ᚦ'];
      selectedCards.slice(0,3).forEach((card,i) => {
        const name = t(`cards.runes.${normalizeCardName(card.name)}.name`) || card.name;
        sections.push({ icon: icons[i], title: name, content: getMeaning(card.name,'runes') });
      });
      finalMessage = (t('interpretation.runes.advice',{genderText,name:user.name,zodiacSign:zodiacName}).replace('{genderSuffix}',genderSuffix)+' '+getAdvice()).trim();
      greeting = getGreeting('runes');
    }

    return { sections, finalMessage, greeting };
  };

  const { sections, finalMessage, greeting } = generateSections();
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

        .ip-header {
          position: relative; z-index: 20;
          padding: 20px 24px 0;
          opacity: 0; transition: opacity 0.5s ease;
        }
        .ip-mounted .ip-header { opacity: 1; transition-delay: 0.1s; }

        .ip-title-block {
          position: relative; z-index: 10;
          text-align: center; padding: 28px 24px 20px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ip-mounted .ip-title-block { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }

        .ip-greeting {
          font-size: 10px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
          /* ✅ +lisibilité : 0.7 → 0.95 */
          color: rgba(220,185,90,1.0); margin-bottom: 10px;
        }
        .ip-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px,6vw,34px); font-weight: 300;
          color: var(--white); margin: 0 0 8px; line-height: 1.15;
        }
        .ip-title em { font-style: italic; color: #F0DC88; }
        .ip-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          /* ✅ +lisibilité : 0.72 → 0.92 */
          color: rgba(247,242,234,0.92); line-height: 1.65;
        }

        .ip-line {
          width: 1px; height: 28px; margin: 0 auto;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.25), transparent);
        }

        .ip-scroll {
          position: relative; z-index: 10;
          flex: 1; overflow-y: auto; padding: 16px 20px;
          -webkit-overflow-scrolling: touch;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .ip-mounted .ip-scroll { opacity: 1; transition-delay: 0.35s; }

        .ip-daily-box {
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 10px; padding: 16px 18px;
          margin-bottom: 12px; text-align: center;
        }
        .ip-daily-box-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 400;
          color: #F0DC88; margin-bottom: 4px;
        }
        .ip-daily-box-sub {
          font-size: 14px; font-weight: 300; letter-spacing: 0.3px;
          /* ✅ +lisibilité : 0.62 → 0.88 */
          color: rgba(247,242,234,0.88);
        }

        .ip-footer {
          position: relative; z-index: 10;
          padding: 16px 20px 32px;
          display: flex; flex-direction: column; gap: 10px;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .ip-mounted .ip-footer { opacity: 1; transition-delay: 0.5s; }

        .ip-btn-primary {
          width: 100%; padding: 16px 24px;
          background: linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.08) 100%);
          border: 1px solid rgba(201,168,76,0.5); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 4px; text-transform: uppercase;
          color: #F0DC88; cursor: pointer; transition: all 0.35s ease;
        }
        .ip-btn-primary:hover {
          border-color: rgba(220,185,90,1.0); color: #fff8d0;
          box-shadow: 0 0 24px rgba(201,168,76,0.15);
        }

        .ip-btn-secondary {
          width: 100%; padding: 14px 24px;
          background: none;
          /* ✅ +lisibilité : border 0.07 → 0.22 */
          border: 1px solid rgba(255,255,255,0.22); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          /* ✅ +lisibilité : 0.45 → 0.80 */
          color: rgba(247,242,234,0.80); cursor: pointer; transition: all 0.3s;
        }
        .ip-btn-secondary:hover {
          border-color: rgba(255,255,255,0.45);
          /* ✅ +lisibilité : 0.65 → 1.0 */
          color: rgba(247,242,234,1);
        }
      `}</style>

      <div className="ip-bg"/>
      <div className="ip-noise"/>
      <div className="ip-particles">
        {Array.from({length:25}).map((_,i)=>(
          <div key={i} className="ip-particle" style={{
            left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
            width:`${Math.random()<.2?2:1}px`, height:`${Math.random()<.2?2:1}px`,
            '--dur':`${3+Math.random()*5}s`,'--del':`${Math.random()*5}s`,
            '--op':0.08+Math.random()*0.25,
          } as any}/>
        ))}
      </div>

      <div className="ip-title-block">
        <div className="ip-greeting">
          {isDailyReading
            ? t('interpretation.label.daily') || 'Oracle du jour'
            : t('interpretation.label.reading') || 'Your reading'
          }
        </div>
        <h1 className="ip-title">
          <em>{isDailyReading
            ? t('interpretation.title.daily',{name:user.name}) || `Pour ${user.name}`
            : t('interpretation.title.reading',{name:user.name}) || `Interprétation pour ${user.name}`
          }</em>
        </h1>
        {greeting && <p className="ip-subtitle">{greeting}</p>}
      </div>

      <div className="ip-line"/>

      <div className="ip-scroll">
        {isDailyReading && (
          <div className="ip-daily-box" style={{marginBottom: 16}}>
            <div className="ip-daily-box-title">{t('interpretation.dailyComplete') || 'Tirage du jour terminé'}</div>
            <div className="ip-daily-box-sub">
              {t('interpretation.timeUntilReset',{hours:timeLeft.hours,minutes:timeLeft.minutes}) || `Prochain tirage dans ${timeLeft.hours}h${timeLeft.minutes}min`}
            </div>
          </div>
        )}
        <SummaryCard
          title={t('revelation.summary.title') || 'What your cards reveal'}
          sections={sections}
          finalMessage={finalMessage}
          isVisible={true}
        />
      </div>

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