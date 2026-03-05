import { useState, useEffect } from 'react';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/hooks/useSound';
import { hasUsedDailyReading } from '@/lib/dailyLimit';
import { getSavedLanguage } from '@/lib/userStorage';
import { config } from '@/config';

interface OracleSelectionProps {
  user: UserSession;
  onOracleSelect: (oracleType: string) => void;
  onBack: () => void;
  onHome: () => void;
}

interface OracleItem {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  accentRgb: string;
}

export default function OracleSelection({ user, onOracleSelect, onBack }: OracleSelectionProps) {
  const [selected, setSelected] = useState('');
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const playFlip = useSound('Flip-card.wav');
  const hasDoneDaily = hasUsedDailyReading();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const mainOracles: OracleItem[] = [
    ...(!hasDoneDaily ? [{
      id: 'daily',
      title: t('oracle.daily.title') || 'Tirage du Jour',
      description: t('oracle.daily.description') || 'Une carte pour vous guider aujourd\'hui',
      imageSrc: '/Image/Tirage-jour.jpg',
      accentRgb: '201,168,76',
    }] : [{
      id: 'crystalBall',
      title: t('oracle.crystalBall.title') || 'Boule de Cristal',
      description: t('oracle.crystalBall.description') || 'Posez vos questions à la boule mystique',
      imageSrc: '/Image/Bouledecristal.jpg',
      accentRgb: '127,201,168',
    }]),
    {
      id: 'tarot',
      title: t('oracle.tarot.title') || 'Tarot de Marseille',
      description: t('oracle.tarot.description') || 'Les 22 arcanes révèlent votre destinée',
      imageSrc: '/Image/Tirage-tarot.jpg',
      accentRgb: '168,127,201',
    },
    {
      id: 'angels',
      title: t('oracle.angels.title') || 'Oracle des Anges',
      description: t('oracle.angels.description') || 'Recevez les messages de vos guides',
      imageSrc: '/Image/Tirage-anges.jpg',
      accentRgb: '127,168,201',
    },
    {
      id: 'horoscope',
      title: t('oracle.horoscope.title') || 'Horoscope',
      description: t('oracle.horoscope.description') || 'Ce que les astres vous réservent',
      imageSrc: '/Image/Horoscope.jpg',
      accentRgb: '201,127,168',
    },
  ];

  const handleSelect = (id: string) => {
    playFlip();
    setSelected(id);
    setTimeout(() => onOracleSelect(id), 420);
  };

  return (
    <div className={`os-root ${mounted ? 'os-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #C9A84C; --gold-light: #E8D080;
          --white: #F7F2EA; --bg: #05030E;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .os-root {
          min-height: 100vh; display: flex; flex-direction: column;
          background: var(--bg); font-family: 'Jost', sans-serif; color: var(--white);
          position: relative; overflow: hidden;
          padding-top: 56px;
        }

        .os-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 45% at 50% -5%, rgba(80,40,160,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 90% 70%, rgba(40,20,90,0.1) 0%, transparent 50%);
        }
        .os-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .os-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .os-particle {
          position: absolute; border-radius: 50%; background: white;
          animation: ospf var(--d,4s) ease-in-out infinite var(--dl,0s);
        }
        @keyframes ospf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.2)} }

        /* Header */
        .os-header {
          position: relative; z-index: 10;
          text-align: center; padding: 20px 24px 14px;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .os-mounted .os-header { opacity: 1; transform: translateY(0); transition-delay: 0.15s; }

        .os-eyebrow {
          font-size: 9px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(201,168,76,0.75); margin-bottom: 8px;
        }
        .os-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: 14px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.72); line-height: 1.7; font-size: 15px;
        }

        /* Ligne */
        .os-line {
          width: 1px; height: 24px; margin: 0 auto 20px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent);
        }

        /* Grille oracles */
        .os-grid {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; gap: 8px;
          padding: 0 16px;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .os-mounted .os-grid { opacity: 1; transition-delay: 0.3s; }

        /* Carte oracle — layout horizontal */
        .os-card {
          position: relative;
          display: flex; align-items: center; gap: 0;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden; cursor: pointer;
          transition: all 0.32s cubic-bezier(0.16,1,0.3,1);
          -webkit-tap-highlight-color: transparent;
          min-height: 80px;
        }
        .os-card:hover {
          border-color: rgba(var(--c-rgb), 0.3);
          transform: translateX(3px);
          box-shadow: 0 6px 28px rgba(0,0,0,0.3), 0 0 20px rgba(var(--c-rgb),0.07);
        }
        .os-card:active { transform: translateX(1px) scale(0.99); }
        .os-card.os-active {
          border-color: rgba(var(--c-rgb), 0.5);
          background: rgba(var(--c-rgb), 0.06);
          box-shadow: 0 0 28px rgba(var(--c-rgb),0.1);
        }

        /* Indicateur latéral */
        .os-card-bar {
          width: 3px; height: 100%; position: absolute; left: 0; top: 0;
          background: rgb(var(--c-rgb));
          transform: scaleY(0); transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          border-radius: 0 2px 2px 0;
        }
        .os-card:hover .os-card-bar { transform: scaleY(0.5); }
        .os-card.os-active .os-card-bar { transform: scaleY(0.7); }

        /* Image */
        .os-card-img {
          width: 72px; height: 80px; flex-shrink: 0;
          overflow: hidden; position: relative;
        }
        .os-card-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease;
          filter: brightness(0.9) contrast(1.05);
        }
        .os-card:hover .os-card-img img { transform: scale(1.06); }
        .os-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 60%, rgba(5,3,14,0.6) 100%);
        }

        /* Texte */
        .os-card-body {
          flex: 1; padding: 14px 14px 14px 16px;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .os-card-texts { flex: 1; }
        .os-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px; font-weight: 400; letter-spacing: 0.2px;
          color: #F7F2EA; margin-bottom: 4px; line-height: 1.25;
          transition: color 0.3s;
        }
        .os-card.os-active .os-card-title { color: rgb(var(--c-rgb)); }
        .os-card-desc {
          font-size: 12px; font-weight: 200; letter-spacing: 0.2px;
          color: rgba(247,242,234,0.62); line-height: 1.5;
          transition: color 0.3s;
        }
        .os-card:hover .os-card-desc { color: rgba(247,242,234,0.82); }

        /* Arrow */
        .os-card-arrow {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(var(--c-rgb), 0.2);
          display: flex; align-items: center; justify-content: center;
          color: rgba(var(--c-rgb), 0.4);
          transition: all 0.3s;
        }
        .os-card:hover .os-card-arrow {
          border-color: rgba(var(--c-rgb), 0.5);
          color: rgba(var(--c-rgb), 0.8);
          background: rgba(var(--c-rgb), 0.08);
        }
        .os-card.os-active .os-card-arrow {
          border-color: rgba(var(--c-rgb), 0.6);
          color: rgb(var(--c-rgb));
          background: rgba(var(--c-rgb), 0.12);
        }
        .os-card-arrow svg { width: 12px; height: 12px; }

        /* Bonus */
        .os-bonus-wrap {
          position: relative; z-index: 10;
          margin: 16px 16px 0;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .os-mounted .os-bonus-wrap { opacity: 1; transition-delay: 0.5s; }

        .os-bonus-label {
          display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
        }
        .os-bonus-line { flex: 1; height: 1px; background: rgba(201,168,76,0.15); }
        .os-bonus-tag {
          font-size: 8px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          border: 1px solid rgba(201,168,76,0.2); border-radius: 20px;
          padding: 4px 12px;
        }

        .os-bonus-card {
          position: relative; display: flex; align-items: center; gap: 0;
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 12px; overflow: hidden; cursor: pointer;
          transition: all 0.32s cubic-bezier(0.16,1,0.3,1);
          -webkit-tap-highlight-color: transparent;
          min-height: 80px;
        }
        .os-bonus-card:hover {
          border-color: rgba(201,168,76,0.4);
          transform: translateX(3px);
          box-shadow: 0 6px 28px rgba(0,0,0,0.3), 0 0 20px rgba(201,168,76,0.08);
        }
        .os-bonus-card:active { transform: translateX(1px) scale(0.99); }
        .os-bonus-card.os-active {
          border-color: rgba(201,168,76,0.55);
          background: rgba(201,168,76,0.08);
        }
        .os-bonus-card-img {
          width: 72px; height: 80px; flex-shrink: 0; overflow: hidden; position: relative;
        }
        .os-bonus-card-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease;
          filter: brightness(0.9) contrast(1.05);
        }
        .os-bonus-card:hover .os-bonus-card-img img { transform: scale(1.06); }
        .os-bonus-card-body {
          flex: 1; padding: 14px 14px 14px 16px;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .os-bonus-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 400;
          color: var(--gold-light); margin-bottom: 3px;
        }
        .os-bonus-desc {
          font-size: 12px; font-weight: 200;
          color: rgba(247,242,234,0.65); line-height: 1.5;
        }
        .os-bonus-arrow {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; align-items: center; justify-content: center;
          color: rgba(201,168,76,0.5);
          transition: all 0.3s;
        }
        .os-bonus-card:hover .os-bonus-arrow {
          border-color: rgba(201,168,76,0.6); color: var(--gold);
          background: rgba(201,168,76,0.08);
        }
        .os-bonus-arrow svg { width: 12px; height: 12px; }

        /* Footer */
        .os-footer {
          position: relative; z-index: 10;
          padding: 20px 16px 32px;
          display: flex; justify-content: center;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .os-mounted .os-footer { opacity: 1; transition-delay: 0.65s; }

        .os-back-btn {
          padding: 12px 32px;
          background: none; border: 1px solid rgba(255,255,255,0.07); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.4); cursor: pointer; transition: all 0.3s;
        }
        .os-back-btn:hover { border-color: rgba(255,255,255,0.14); color: rgba(247,242,234,0.65); }
      `}</style>

      <div className="os-bg"/>
      <div className="os-noise"/>
      <div className="os-particles">
        {Array.from({length: 28}).map((_,i) => (
          <div key={i} className="os-particle" style={{
            left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
            width: `${Math.random()<.2?2:1}px`, height: `${Math.random()<.2?2:1}px`,
            '--d': `${3+Math.random()*5}s`, '--dl': `${Math.random()*5}s`,
            '--op': 0.08+Math.random()*0.3,
          } as any}/>
        ))}
      </div>

      {/* Header */}
      <div className="os-header">
        <div className="os-eyebrow">{t('oracle.choose') || 'Choisissez votre oracle'}</div>
        <p className="os-subtitle">
          {t('oracle.subtitle') || 'Découvrez les secrets de votre destinée'}
        </p>
      </div>

      <div className="os-line"/>

      {/* Grille */}
      <div className="os-grid">
        {mainOracles.map((oracle) => (
          <div
            key={oracle.id}
            className={`os-card ${selected === oracle.id ? 'os-active' : ''}`}
            style={{ '--c-rgb': oracle.accentRgb } as any}
            onClick={() => handleSelect(oracle.id)}
          >
            <div className="os-card-bar"/>
            {oracle.imageSrc && (
              <div className="os-card-img">
                <img src={oracle.imageSrc} alt={oracle.title}/>
                <div className="os-card-img-overlay"/>
              </div>
            )}
            <div className="os-card-body">
              <div className="os-card-texts">
                <div className="os-card-title">{oracle.title}</div>
                <div className="os-card-desc">{oracle.description}</div>
              </div>
              <div className="os-card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus */}
      <div className="os-bonus-wrap">
        <div className="os-bonus-label">
          <div className="os-bonus-line"/>
          <div className="os-bonus-tag">{t('oracle.bonus') || 'Bonus'}</div>
          <div className="os-bonus-line"/>
        </div>
        <div
          className={`os-bonus-card ${selected === 'bonusRoll' ? 'os-active' : ''}`}
          onClick={() => handleSelect('bonusRoll')}
        >
          <div className="os-bonus-card-img">
            <img src="/Image/Tirage-de.jpg" alt="Tirage Bonus"/>
          </div>
          <div className="os-bonus-card-body">
            <div className="os-card-texts">
              <div className="os-bonus-title">{t('oracle.bonusRoll.title') || 'Tirage Bonus'}</div>
              <div className="os-bonus-desc">{t('oracle.bonusRoll.description') || 'Déverrouillez votre révélation numérologique'}</div>
            </div>
            <div className="os-bonus-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="os-footer">
        <button className="os-back-btn" onClick={onBack}>
          {t('oracle.back') || 'Retour'}
        </button>
      </div>
    </div>
  );
}