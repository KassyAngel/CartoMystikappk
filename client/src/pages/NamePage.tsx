import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NamePageProps {
  onNext: (name: string) => void;
  onBack?: () => void;
}

export default function NamePage({ onNext, onBack }: NamePageProps) {
  const [name, setName] = useState('');
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => { if (name.trim()) onNext(name.trim()); };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.trim()) handleNext();
  };

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
            radial-gradient(ellipse 40% 40% at 15% 70%, rgba(60,30,120,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .bg-noise {
          position: absolute; inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }
        .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .particle {
          position: absolute; border-radius: 50%; background: white;
          animation: pfade var(--dur,4s) ease-in-out infinite var(--del,0s);
        }
        @keyframes pfade {
          0%,100% { opacity: 0; } 40%,60% { opacity: var(--op,0.3); }
        }

        /* Barre progression */
        .progress-track {
          position: fixed; top: 0; left: 0; right: 0; height: 1px; z-index: 100;
          background: rgba(255,255,255,0.05);
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
          animation: shimmer-prog 2.5s ease-in-out infinite;
        }
        @keyframes shimmer-prog { 0%,100%{opacity:0.5} 50%{opacity:1} }

        /* Header nav */
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
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(247,242,234,0.55);
          cursor: pointer;
          transition: color 0.3s;
          padding: 0;
        }
        .nav-back:hover { color: rgba(247,242,234,0.85); }
        .nav-back-arrow {
          width: 20px;
          height: 1px;
          background: currentColor;
          position: relative;
        }
        .nav-back-arrow::before {
          content: '';
          position: absolute;
          left: 0;
          top: -3px;
          width: 6px;
          height: 6px;
          border-left: 1px solid currentColor;
          border-bottom: 1px solid currentColor;
          transform: rotate(45deg);
        }

        /* Contenu */
        .page-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 32px 60px;
          position: relative;
          z-index: 10;
        }

        /* Step indicator */
        .step-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 48px;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .is-mounted .step-indicator { opacity: 1; transition-delay: 0.2s; }

        .step-dot {
          width: 24px;
          height: 1px;
          background: var(--gold-dim);
          transition: all 0.4s ease;
        }
        .step-dot.active {
          background: var(--gold);
          width: 32px;
        }
        .step-dot.inactive { background: rgba(255,255,255,0.08); }

        /* Titre */
        .page-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(36px, 9vw, 52px);
          font-weight: 300;
          letter-spacing: -0.5px;
          line-height: 1.05;
          text-align: center;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          color: var(--white);
        }
        .is-mounted .page-title { opacity: 1; transform: translateY(0); transition-delay: 0.25s; }

        .page-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-sub {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 300;
          color: rgba(247,242,234,0.85);
          text-align: center;
          line-height: 1.7;
          max-width: 240px;
          margin-bottom: 52px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .page-sub { opacity: 1; transition-delay: 0.4s; }

        /* Input zone */
        .input-zone {
          width: 100%;
          max-width: 280px;
          margin-bottom: 40px;
          position: relative;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .input-zone { opacity: 1; transition-delay: 0.55s; }

        .mystic-input {
          width: 100%;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          outline: none;
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 3px;
          color: var(--white);
          text-align: center;
          padding: 14px 4px 14px;
          transition: border-color 0.4s ease;
          caret-color: var(--gold);
        }
        .mystic-input::placeholder {
          color: rgba(247,242,234,0.2);
          font-style: italic;
          letter-spacing: 2px;
        }
        .mystic-input:focus {
          border-bottom-color: rgba(201,168,76,0.5);
        }

        .input-line-active {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          width: 0;
        }
        .input-line-active.show { width: 100%; }

        /* Bouton */
        .btn-wrap {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .is-mounted .btn-wrap { opacity: 1; transform: translateY(0); transition-delay: 0.7s; }

        .primary-btn {
          position: relative;
          padding: 16px 52px;
          background: linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%);
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #E8D080;
          border-color: rgba(201,168,76,0.65);
          cursor: pointer;
          transition: all 0.35s ease;
          overflow: hidden;
        }
        .primary-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0.08);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .primary-btn:hover:not(:disabled) {
          border-color: rgba(201,168,76,0.75);
          color: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(201,168,76,0.1);
        }
        .primary-btn:hover:not(:disabled)::after { opacity: 1; }
        .primary-btn:active:not(:disabled) { transform: translateY(0); }
        .primary-btn:disabled { opacity: 0.2; cursor: not-allowed; }
      `}</style>

      {/* Arrière-plan */}
      <div className="bg-gradient" />
      <div className="bg-noise" />
      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() < 0.2 ? 2 : 1}px`,
            height: `${Math.random() < 0.2 ? 2 : 1}px`,
            '--dur': `${3 + Math.random() * 5}s`,
            '--del': `${Math.random() * 5}s`,
            '--op': 0.15 + Math.random() * 0.45,
          } as any} />
        ))}
      </div>

      {/* Progression */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '33%' }} />
      </div>

      {/* Nav */}
      <div className="nav-bar">
        {onBack && (
          <button className="nav-back" onClick={onBack}>
            <span className="nav-back-arrow" />
            {t('common.home') || 'Accueil'}
          </button>
        )}
      </div>

      {/* Contenu */}
      <div className="page-content">

        {/* Indicateur d'étapes */}
        <div className="step-indicator">
          <div className="step-dot active" />
          <div className="step-dot inactive" />
          <div className="step-dot inactive" />
        </div>

        <h1 className="page-title">
          <em>{t('name.title') || 'Prénom'}</em>
        </h1>

        <p className="page-sub">
          {t('name.subtitle') || 'Comment préférez-vous être appelé ?'}
        </p>

        <div className="input-zone">
          <input
            className="mystic-input"
            type="text"
            placeholder={t('name.placeholder') || 'Votre prénom'}
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyPress={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
          <div className={`input-line-active ${focused || name ? 'show' : ''}`} />
        </div>

        <div className="btn-wrap">
          <button className="primary-btn" onClick={handleNext} disabled={!name.trim()}>
            {t('name.next') || 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
}