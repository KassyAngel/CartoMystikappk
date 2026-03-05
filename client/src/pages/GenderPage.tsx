import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GenderPageProps {
  onNext: (gender: string) => void;
  onBack: () => void;
}

const GENDERS = [
  { value: 'homme',  labelKey: 'gender.male',   symbol: 'M', label: 'Homme' },
  { value: 'femme',  labelKey: 'gender.female',  symbol: 'F', label: 'Féminin' },
  { value: 'autre',  labelKey: 'gender.other',   symbol: '—', label: 'Autre' },
];

export default function GenderPage({ onNext, onBack }: GenderPageProps) {
  const [selected, setSelected] = useState('');
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => onNext(selected), 350);
      return () => clearTimeout(timer);
    }
  }, [selected, onNext]);

  return (
    <div className={`page-root ${mounted ? 'is-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8D080;
          --gold-dim: rgba(201,168,76,0.35);
          --white: #F7F2EA;
          --white-dim: rgba(247,242,234,0.5);
          --bg-deep: #05030E;
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
            radial-gradient(ellipse 50% 40% at 90% 90%, rgba(40,20,90,0.1) 0%, transparent 50%);
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

        .progress-track { position:fixed; top:0; left:0; right:0; height:1px; z-index:100; background:rgba(255,255,255,0.05); }
        .progress-fill { height:100%; background:linear-gradient(90deg,transparent,var(--gold),transparent); animation:shimmer 2.5s ease-in-out infinite; }
        @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:1} }

        /* Nav */
        .nav-bar {
          display:flex; align-items:center; padding:20px 24px;
          position:relative; z-index:20;
          opacity:0; transition:opacity 0.5s ease;
        }
        .is-mounted .nav-bar { opacity:1; transition-delay:0.1s; }
        .nav-back {
          display:flex; align-items:center; gap:8px;
          background:none; border:none;
          font-family:'Jost',sans-serif; font-size:11px; font-weight:300;
          letter-spacing:2px; text-transform:uppercase;
          color:rgba(247,242,234,0.82); cursor:pointer; transition:color 0.3s; padding:0;
        }
        .nav-back:hover { color:#F7F2EA; }
        .nav-back-arrow { width:20px; height:1px; background:currentColor; position:relative; }
        .nav-back-arrow::before {
          content:''; position:absolute; left:0; top:-3px; width:6px; height:6px;
          border-left:1px solid currentColor; border-bottom:1px solid currentColor;
          transform:rotate(45deg);
        }

        /* Contenu */
        .page-content {
          flex:1; display:flex; flex-direction:column; align-items:center;
          justify-content:center; padding:0 28px 60px;
          position:relative; z-index:10;
        }

        /* Steps */
        .step-indicator {
          display:flex; align-items:center; gap:6px; margin-bottom:48px;
          opacity:0; transition:opacity 0.6s ease;
        }
        .is-mounted .step-indicator { opacity:1; transition-delay:0.2s; }
        .step-dot { height:1px; transition:all 0.4s; }
        .step-dot.done { background:rgba(201,168,76,0.5); width:24px; }
        .step-dot.active { background:var(--gold); width:32px; }
        .step-dot.inactive { background:rgba(255,255,255,0.08); width:24px; }

        /* Titre */
        .page-title {
          font-family:'Playfair Display',Georgia,serif;
          font-size:clamp(34px,9vw,50px); font-weight:300;
          color:var(--white); text-align:center; margin-bottom:12px;
          opacity:0; transform:translateY(12px);
          transition:opacity 0.7s ease, transform 0.7s ease;
        }
        .is-mounted .page-title { opacity:1; transform:translateY(0); transition-delay:0.25s; }
        .page-title em { font-style:italic; color:var(--gold-light); }

        .page-sub {
          font-family:'Playfair Display',serif;
          font-size:13px; font-style:italic; font-weight:300;
          color:rgba(247,242,234,0.85); text-align:center; line-height:1.7; max-width:240px;
          margin-bottom:48px; opacity:0; transition:opacity 0.7s ease;
        }
        .is-mounted .page-sub { opacity:1; transition-delay:0.4s; }

        /* Options */
        .options-list {
          width:100%; max-width:300px; display:flex; flex-direction:column; gap:10px;
          margin-bottom:40px; opacity:0; transition:opacity 0.7s ease;
        }
        .is-mounted .options-list { opacity:1; transition-delay:0.55s; }

        .option-item {
          position:relative;
          display:flex; align-items:center;
          padding:18px 20px;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:8px;
          cursor:pointer;
          transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
          overflow:hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .option-item::before {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 100%);
          opacity:0; transition:opacity 0.3s;
        }
        .option-item:hover { border-color:rgba(201,168,76,0.25); transform:translateX(2px); }
        .option-item:hover::before { opacity:1; }

        .option-item.selected {
          border-color:rgba(201,168,76,0.55);
          background:rgba(201,168,76,0.06);
          transform:translateX(4px);
          box-shadow:0 0 24px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.1);
        }
        .option-item.selected::before { opacity:1; }

        /* Indicateur gauche */
        .opt-indicator {
          width:2px; height:0;
          background:var(--gold);
          position:absolute; left:0; top:50%; transform:translateY(-50%);
          border-radius:0 2px 2px 0;
          transition:height 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .option-item.selected .opt-indicator { height:60%; }

        .opt-symbol {
          width:32px; height:32px; border-radius:50%;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          font-family:'Jost',sans-serif; font-size:11px; font-weight:300; letter-spacing:1px;
          color:rgba(247,242,234,0.5);
          margin-right:16px; flex-shrink:0;
          transition:all 0.3s;
        }
        .option-item.selected .opt-symbol {
          border-color:rgba(201,168,76,0.5);
          color:var(--gold);
          background:rgba(201,168,76,0.06);
        }

        .opt-label {
          font-family:'Playfair Display',serif;
          font-size:17px; font-weight:300; letter-spacing:0.5px;
          color:rgba(247,242,234,0.88); flex:1;
          transition:color 0.3s;
        }
        .option-item.selected .opt-label { color:var(--white); }
        .option-item:hover .opt-label { color:rgba(247,242,234,0.8); }

        .opt-check {
          width:16px; height:16px; border-radius:50%;
          border:1px solid rgba(201,168,76,0.4);
          display:flex; align-items:center; justify-content:center;
          opacity:0; transform:scale(0.7);
          transition:all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .opt-check-inner {
          width:6px; height:6px; border-radius:50%;
          background:var(--gold);
        }
        .option-item.selected .opt-check {
          opacity:1; transform:scale(1);
          border-color:var(--gold);
          box-shadow:0 0 8px rgba(201,168,76,0.4);
        }

        /* Bouton retour */
        .btn-back {
          opacity:0; transition:opacity 0.7s ease;
        }
        .is-mounted .btn-back { opacity:1; transition-delay:0.7s; }
        .ghost-btn {
          padding:12px 32px;
          background:none; border:1px solid rgba(255,255,255,0.07); border-radius:3px;
          font-family:'Jost',sans-serif; font-size:11px; font-weight:300;
          letter-spacing:3px; text-transform:uppercase;
          color:rgba(247,242,234,0.78); border-color:rgba(255,255,255,0.18); cursor:pointer; transition:all 0.3s;
        }
        .ghost-btn:hover { border-color:rgba(255,255,255,0.35); color:#F7F2EA; }
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
        <div className="progress-fill" style={{ width: '100%' }} />
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
          <div className="step-dot done" />
          <div className="step-dot active" />
        </div>

        <h1 className="page-title">
          <em>{t('gender.title') || 'Genre'}</em>
        </h1>
        <p className="page-sub">
          {t('gender.subtitle') || 'Personnalisez votre expérience'}
        </p>

        <div className="options-list">
          {GENDERS.map(g => (
            <div
              key={g.value}
              className={`option-item ${selected === g.value ? 'selected' : ''}`}
              onClick={() => setSelected(g.value)}
            >
              <div className="opt-indicator" />
              <div className="opt-symbol">{g.symbol}</div>
              <div className="opt-label">{t(g.labelKey) || g.label}</div>
              <div className="opt-check">
                <div className="opt-check-inner" />
              </div>
            </div>
          ))}
        </div>

        <div className="btn-back">
          <button className="ghost-btn" onClick={onBack}>
            {t('common.back') || 'Retour'}
          </button>
        </div>
      </div>
    </div>
  );
}