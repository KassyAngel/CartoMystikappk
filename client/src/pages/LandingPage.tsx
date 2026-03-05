import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const { t, isLanguageLoaded } = useLanguage();
  const [disclaimerOk, setDisclaimerOk] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = async () => {
      try {
        const { value } = await Preferences.get({ key: 'disclaimerAccepted' });
        if (value) { setDisclaimerOk(true); }
        else if (isLanguageLoaded) { setTimeout(() => setShowDisclaimer(true), 600); }
      } catch {
        if (isLanguageLoaded) setTimeout(() => setShowDisclaimer(true), 600);
      }
    };
    check();
  }, [isLanguageLoaded]);

  const acceptDisclaimer = async () => {
    try { await Preferences.set({ key: 'disclaimerAccepted', value: 'true' }); } catch {}
    setShowDisclaimer(false);
    setDisclaimerOk(true);
  };

  return (
    <div className={`landing-root ${mounted ? 'is-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8D080;
          --gold-dim: rgba(201,168,76,0.35);
          --white: #F7F2EA;
          --white-dim: rgba(247,242,234,0.75);
          --bg-deep: #05030E;
          --bg-mid: #0B0618;
          --purple-dim: rgba(120,80,200,0.12);
          --glass: rgba(255,255,255,0.03);
          --glass-border: rgba(255,255,255,0.07);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-deep);
          font-family: 'Jost', sans-serif;
          color: var(--white);
          padding: 0;
          position: relative;
          overflow: hidden;
        }

        /* Fond dégradé */
        .bg-gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -5%, rgba(80,40,160,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(40,20,90,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 20% 60%, rgba(60,30,120,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Grain texture */
        .bg-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        /* Lignes de grille horizontales subtiles */
        .bg-lines {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 79px,
            rgba(255,255,255,0.012) 80px
          );
          pointer-events: none;
        }

        /* Orbe central */
        .orb-container {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(16px) scale(0.95);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .is-mounted .orb-container { opacity: 1; transform: translateY(0) scale(1); transition-delay: 0.1s; }

        .orb-glow {
          position: absolute;
          inset: -40px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, rgba(100,60,200,0.08) 40%, transparent 70%);
          animation: glow-pulse 5s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .orb-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .ring-1 {
          inset: 20px;
          border-color: rgba(201,168,76,0.18) transparent rgba(201,168,76,0.06) transparent;
          animation: spin 35s linear infinite;
        }
        .ring-2 {
          inset: 35px;
          border-color: transparent rgba(180,140,255,0.15) transparent rgba(180,140,255,0.08);
          animation: spin 22s linear infinite reverse;
        }
        .ring-3 {
          inset: 50px;
          border-color: rgba(201,168,76,0.1) transparent rgba(201,168,76,0.04) transparent;
          animation: spin 48s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orb-dot {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orb-dot-inner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(240,208,128,0.9) 0%, rgba(201,168,76,0.6) 40%, rgba(140,90,200,0.2) 100%);
          box-shadow:
            0 0 20px rgba(201,168,76,0.6),
            0 0 60px rgba(201,168,76,0.2),
            0 0 120px rgba(201,168,76,0.08);
          animation: orb-breathe 5s ease-in-out infinite;
        }
        @keyframes orb-breathe {
          0%, 100% { transform: scale(0.92); box-shadow: 0 0 15px rgba(201,168,76,0.5), 0 0 50px rgba(201,168,76,0.15); }
          50% { transform: scale(1.08); box-shadow: 0 0 30px rgba(201,168,76,0.8), 0 0 80px rgba(201,168,76,0.25), 0 0 160px rgba(201,168,76,0.1); }
        }

        /* Header */
        .header-bar {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 20px 24px;
          position: relative;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .is-mounted .header-bar { opacity: 1; transition-delay: 0.8s; }

        .lang-btn {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(247,242,234,0.4);
          padding: 8px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .lang-btn:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(247,242,234,0.75);
          border-color: rgba(255,255,255,0.12);
        }

        /* Contenu central */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 32px;
          position: relative;
          z-index: 10;
          width: 100%;
          gap: 0;
        }

        /* Texte badge */
        .badge {
          font-size: 9px;
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.6;
          margin-bottom: 32px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .badge { opacity: 0.6; transition-delay: 0.3s; }

        /* Titre */
        .main-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(42px, 11vw, 64px);
          font-weight: 300;
          letter-spacing: -1px;
          line-height: 1;
          color: var(--white);
          text-align: center;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .is-mounted .main-title { opacity: 1; transform: translateY(0); transition-delay: 0.35s; }

        .title-accent {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 60%, #a07830 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .main-tagline {
          font-size: 11px;
          font-weight: 200;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(247,242,234,0.55);
          margin-bottom: 36px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .main-tagline { opacity: 1; transition-delay: 0.5s; }

        /* Description */
        .main-desc {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-style: italic;
          font-weight: 300;
          color: rgba(247,242,234,0.82);
          text-align: center;
          line-height: 1.75;
          max-width: 260px;
          margin-bottom: 48px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .main-desc { opacity: 1; transition-delay: 0.6s; }

        /* Ligne séparatrice fine */
        .sep {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, var(--gold-dim), transparent);
          margin-bottom: 48px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .sep { opacity: 1; transition-delay: 0.7s; }

        /* Bouton principal */
        .cta-wrap {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          margin-bottom: 24px;
        }
        .is-mounted .cta-wrap { opacity: 1; transform: translateY(0); transition-delay: 0.85s; }

        .cta-btn {
          position: relative;
          padding: 17px 56px;
          background: linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%);
          border: 1px solid rgba(201,168,76,0.7);
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #E8D080;
          cursor: pointer;
          transition: all 0.4s ease;
          overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .cta-btn:hover:not(:disabled) {
          border-color: rgba(201,168,76,0.75);
          color: var(--gold-light);
          box-shadow: 0 0 30px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.4);
          transform: translateY(-1px);
        }
        .cta-btn:hover:not(:disabled)::after { opacity: 1; }
        .cta-btn:active:not(:disabled) { transform: translateY(0); }
        .cta-btn:disabled { opacity: 0.25; cursor: not-allowed; }

        /* Note footer */
        .footer-note {
          font-size: 11px;
          font-weight: 300;
          color: #F7F2EA;
          text-align: center;
          letter-spacing: 0.5px;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .is-mounted .footer-note { opacity: 1; transition-delay: 0.6s; }

        /* Footer */
        .footer-bar {
          width: 100%;
          padding: 24px 32px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 10;
        }

        /* Particules légères */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          width: 1px;
          height: 1px;
          background: white;
          border-radius: 50%;
          animation: particle-fade var(--dur, 4s) ease-in-out infinite var(--del, 0s);
        }
        @keyframes particle-fade {
          0%, 100% { opacity: 0; transform: translateY(0); }
          20% { opacity: var(--max-op, 0.5); }
          80% { opacity: var(--max-op, 0.5); transform: translateY(-3px); }
        }

        /* Disclaimer */
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(5,3,14,0.9);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px;
          animation: fade-in 0.4s ease;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

        .disc-card {
          width: 100%;
          max-width: 340px;
          background: linear-gradient(160deg, rgba(20,10,40,0.95) 0%, rgba(10,5,25,0.98) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 40px 28px;
          text-align: center;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slide-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .disc-label {
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0.65;
          margin-bottom: 20px;
        }
        .disc-text {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 300;
          color: rgba(247,242,234,0.75);
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .disc-accept {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.08) 100%);
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 6px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .disc-accept:hover {
          background: linear-gradient(135deg, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0.12) 100%);
          border-color: rgba(201,168,76,0.7);
          color: var(--gold-light);
        }
      `}</style>

      {/* Disclaimer */}
      {false && (
        <div className="overlay">
          <div className="disc-card">
            <div className="disc-label">Avertissement</div>
            <p className="disc-text">
              {t('disclaimer.text') || "Cet oracle est destiné au divertissement et à la réflexion personnelle. Les lectures ne constituent pas des conseils professionnels."}
            </p>
            <button className="disc-accept" onClick={acceptDisclaimer}>
              {t('disclaimer.accept') || "J'accepte"}
            </button>
          </div>
        </div>
      )}

      {/* Arrière-plans */}
      <div className="bg-gradient" />
      <div className="bg-noise" />
      <div className="bg-lines" />

      {/* Particules */}
      <div className="particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() < 0.2 ? 2 : 1}px`,
            height: `${Math.random() < 0.2 ? 2 : 1}px`,
            '--dur': `${3 + Math.random() * 6}s`,
            '--del': `${Math.random() * 6}s`,
            '--max-op': 0.15 + Math.random() * 0.5,
          } as any} />
        ))}
      </div>

      {/* Header */}
      {!showDisclaimer && (
        <div className="header-bar">
          <LanguageSelector />
        </div>
      )}

      {/* Contenu */}
      <div className="main-content">

        {/* Orbe */}
        <div className="orb-container" style={{ marginBottom: 48 }}>
          <div className="orb-glow" />
          <div className="orb-ring ring-1" />
          <div className="orb-ring ring-2" />
          <div className="orb-ring ring-3" />
          <div className="orb-dot">
            <div className="orb-dot-inner" />
          </div>
        </div>

        {/* Titre */}
        <h1 className="main-title">
          <span className="title-accent">{t('landing.title') || 'CartoMystik'}</span>
        </h1>

        <div className="main-tagline">{t('landing.tagline') || 'Divination & Révélation'}</div>

        <p className="main-desc">
          {t('landing.subtitle') || 'Découvrez les mystères de votre destinée à travers les cartes et les astres'}
        </p>

        <div className="sep" />

        {/* CTA */}
        <div className="cta-wrap">
          <button
            className="cta-btn"
            onClick={onEnter}
          >
            {t('landing.enter') || 'Commencer'}
          </button>
        </div>

        <p className="footer-note">
          {t('landing.ads.support') || 'Application gratuite · financée par la publicité'}
        </p>
      </div>

      {/* Footer spacer */}
      <div className="footer-bar" />
    </div>
  );
}