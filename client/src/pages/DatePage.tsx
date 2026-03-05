import { useState, useEffect } from 'react';
import { getZodiacSign } from '@/data/oracleData';
import { useLanguage } from '@/contexts/LanguageContext';

interface DatePageProps {
  onNext: (birthDate: string, zodiacSign?: any) => void;
  onBack: () => void;
}

const ZODIAC_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

export default function DatePage({ onNext, onBack }: DatePageProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const zodiacSign = day && month ? getZodiacSign(parseInt(month), parseInt(day)) : null;
  const isComplete = day && month && year;

  const handleNext = () => {
    if (isComplete) {
      const birthDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
      onNext(birthDate, zodiacSign);
    }
  };

  const currentYear = new Date().getFullYear();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className={`page-root ${mounted ? 'is-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8D080;
          --gold-dim: rgba(201,168,76,0.35);
          --white: #F7F2EA;
          --white-dim: rgba(247,242,234,0.75);
          --bg-deep: #05030E;
          --glass: rgba(255,255,255,0.03);
          --glass-border: rgba(255,255,255,0.07);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-deep);
          font-family: 'Jost', sans-serif;
          color: var(--white);
          position: relative;
          overflow: hidden;
        }

        .bg-gradient {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(80,40,160,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 85% 20%, rgba(60,20,120,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .bg-noise {
          position: absolute; inset: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px; pointer-events: none;
        }
        .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .particle {
          position: absolute; border-radius: 50%; background: white;
          animation: pfade var(--dur,4s) ease-in-out infinite var(--del,0s);
        }
        @keyframes pfade { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.3)} }

        .progress-track { position: fixed; top:0; left:0; right:0; height:1px; z-index:100; background: rgba(255,255,255,0.05); }
        .progress-fill { height:100%; background: linear-gradient(90deg,transparent,var(--gold),transparent); animation: shimmer 2.5s ease-in-out infinite; }
        @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:1} }

        /* Nav */
        .nav-bar {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          position: relative;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .is-mounted .nav-bar { opacity: 1; transition-delay: 0.1s; }
        .nav-back {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.82); cursor: pointer; transition: color 0.3s; padding: 0;
        }
        .nav-back:hover { color: #F7F2EA; }
        .nav-back-arrow { width: 20px; height: 1px; background: currentColor; position: relative; }
        .nav-back-arrow::before {
          content:''; position:absolute; left:0; top:-3px; width:6px; height:6px;
          border-left:1px solid currentColor; border-bottom:1px solid currentColor;
          transform: rotate(45deg);
        }

        /* Contenu */
        .page-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 28px 60px;
          position: relative;
          z-index: 10;
        }

        /* Step indicator */
        .step-indicator {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 40px;
          opacity: 0; transition: opacity 0.6s ease;
        }
        .is-mounted .step-indicator { opacity: 1; transition-delay: 0.2s; }
        .step-dot { height: 1px; background: rgba(255,255,255,0.08); transition: all 0.4s; }
        .step-dot.done { background: rgba(201,168,76,0.5); width: 24px; }
        .step-dot.active { background: var(--gold); width: 32px; }
        .step-dot.inactive { width: 24px; }

        /* Orbe zodiaque */
        .zodiac-wrap {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto 44px;
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .is-mounted .zodiac-wrap { opacity: 1; transform: scale(1); transition-delay: 0.25s; }

        .zodiac-track {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.1);
          animation: spin-track 50s linear infinite;
        }
        @keyframes spin-track { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .zodiac-sym-item {
          position: absolute;
          font-size: 10px;
          color: rgba(201,168,76,0.2);
          transition: color 0.5s ease, font-size 0.5s ease, text-shadow 0.5s ease;
          line-height: 1;
          transform: translate(-50%, -50%);
        }
        .zodiac-sym-item.active {
          color: rgba(201,168,76,0.9);
          font-size: 16px;
          text-shadow: 0 0 12px rgba(201,168,76,0.8), 0 0 28px rgba(201,168,76,0.3);
        }

        .zodiac-center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .zodiac-center-sym {
          font-size: 38px;
          color: var(--gold-light);
          animation: breathe 4s ease-in-out infinite;
          filter: drop-shadow(0 0 14px rgba(201,168,76,0.7));
          line-height: 1;
        }
        .zodiac-center-label {
          font-size: 8px;
          font-weight: 300;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.5);
          margin-top: 6px;
        }
        .zodiac-center-empty {
          width: 32px; height: 32px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(180,140,255,0.15) 0%, transparent 70%);
          animation: breathe 5s ease-in-out infinite;
        }
        @keyframes breathe { 0%,100%{transform:scale(0.94);opacity:.8} 50%{transform:scale(1.06);opacity:1} }

        .zodiac-glow {
          position: absolute; inset: -20px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%);
          animation: breathe 4s ease-in-out infinite;
        }

        /* Titre */
        .page-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(30px, 8vw, 44px);
          font-weight: 300;
          color: var(--white);
          text-align: center;
          margin-bottom: 10px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .is-mounted .page-title { opacity: 1; transform: translateY(0); transition-delay: 0.35s; }
        .page-title em { font-style: italic; color: var(--gold-light); }

        .page-sub {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.85);
          text-align: center; line-height: 1.7; max-width: 240px;
          margin-bottom: 44px;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .is-mounted .page-sub { opacity: 1; transition-delay: 0.45s; }

        /* Sélecteurs */
        .selectors {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 320px;
          margin-bottom: 44px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .selectors { opacity: 1; transition-delay: 0.55s; }

        .sel-group { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .sel-label {
          font-size: 8px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.72); text-align: center;
        }

        .sel-wrapper { position: relative; }
        .mystic-select {
          width: 100%;
          appearance: none; -webkit-appearance: none;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 13px; font-weight: 300;
          color: var(--white);
          text-align: center;
          text-align-last: center;
          padding: 13px 22px 13px 4px;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          outline: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .mystic-select:focus, .mystic-select:hover {
          border-color: rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.04);
        }
        .mystic-select option { background: #0a0518; color: var(--white); }
        .sel-chevron {
          position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
          width: 8px; height: 8px;
          border-right: 1px solid rgba(201,168,76,0.4);
          border-bottom: 1px solid rgba(201,168,76,0.4);
          transform: translateY(-65%) rotate(45deg);
          pointer-events: none;
        }

        /* Boutons */
        .btn-row {
          display: flex;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .btn-row { opacity: 1; transition-delay: 0.7s; }

        .ghost-btn {
          padding: 14px 28px;
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.75);
          border-color: rgba(255,255,255,0.18);
          cursor: pointer;
          transition: all 0.3s;
        }
        .ghost-btn:hover { border-color: rgba(255,255,255,0.35); color: rgba(247,242,234,0.95); }

        .primary-btn {
          position: relative;
          padding: 14px 40px;
          background: linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%);
          border: 1px solid rgba(201,168,76,0.65);
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 400; letter-spacing: 4px; text-transform: uppercase;
          color: #E8D080;
          cursor: pointer;
          transition: all 0.35s ease;
          overflow: hidden;
        }
        .primary-btn:hover:not(:disabled) {
          border-color: rgba(201,168,76,0.75); color: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(201,168,76,0.1);
        }
        .primary-btn:active:not(:disabled) { transform: translateY(0); }
        .primary-btn:disabled { opacity: 0.2; cursor: not-allowed; }
      `}</style>

      <div className="bg-gradient" />
      <div className="bg-noise" />
      <div className="particles">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() < 0.2 ? 2 : 1}px`,
            height: `${Math.random() < 0.2 ? 2 : 1}px`,
            '--dur': `${3 + Math.random() * 5}s`,
            '--del': `${Math.random() * 5}s`,
            '--op': 0.1 + Math.random() * 0.4,
          } as any} />
        ))}
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: '66%' }} />
      </div>

      <div className="nav-bar">
        <button className="nav-back" onClick={onBack}>
          <span className="nav-back-arrow" />
          {t('common.back') || 'Retour'}
        </button>
      </div>

      <div className="page-content">

        <div className="step-indicator">
          <div className="step-dot done" />
          <div className="step-dot active" />
          <div className="step-dot inactive" />
        </div>

        {/* Orbe zodiaque */}
        <div className="zodiac-wrap">
          <div className="zodiac-glow" />
          <div className="zodiac-track" />
          {ZODIAC_SYMBOLS.map((sym, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const r = 60;
            const x = 75 + r * Math.cos(angle);
            const y = 75 + r * Math.sin(angle);
            const isActive = zodiacSign && zodiacSign.symbol === sym;
            return (
              <div key={i} className={`zodiac-sym-item ${isActive ? 'active' : ''}`}
                style={{ left: `${x}px`, top: `${y}px` }}>
                {sym}
              </div>
            );
          })}
          <div className="zodiac-center">
            {zodiacSign ? (
              <>
                <div className="zodiac-center-sym">{zodiacSign.symbol}</div>
                <div className="zodiac-center-label">{zodiacSign.name || ''}</div>
              </>
            ) : (
              <div className="zodiac-center-empty" />
            )}
          </div>
        </div>

        <h1 className="page-title">
          <em>{t('date.title') || 'Date de naissance'}</em>
        </h1>
        <p className="page-sub">{t('date.subtitle') || 'Révélez votre signe astrologique'}</p>

        {/* Sélecteurs */}
        <div className="selectors">
          <div className="sel-group">
            <div className="sel-label">Jour</div>
            <div className="sel-wrapper">
              <select className="mystic-select" value={day} onChange={e => setDay(e.target.value)}>
                <option value="">—</option>
                {days.map(d => <option key={d} value={d}>{String(d).padStart(2, '0')}</option>)}
              </select>
              <div className="sel-chevron" />
            </div>
          </div>
          <div className="sel-group">
            <div className="sel-label">Mois</div>
            <div className="sel-wrapper">
              <select className="mystic-select" value={month} onChange={e => setMonth(e.target.value)}>
                <option value="">—</option>
                {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
              <div className="sel-chevron" />
            </div>
          </div>
          <div className="sel-group">
            <div className="sel-label">Année</div>
            <div className="sel-wrapper">
              <select className="mystic-select" value={year} onChange={e => setYear(e.target.value)}>
                <option value="">——</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <div className="sel-chevron" />
            </div>
          </div>
        </div>

        <div className="btn-row">
          <button className="ghost-btn" onClick={onBack}>
            {t('common.back') || 'Retour'}
          </button>
          <button className="primary-btn" onClick={handleNext} disabled={!isComplete}>
            {t('date.next') || 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
}