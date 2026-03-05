import { useEffect, useState } from 'react';
import { OracleData, UserSession, OracleType } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';

interface RevelationPageProps {
  user: UserSession;
  oracle: OracleData;
  oracleType: OracleType;
  selectedCardIndices: number[];
  onBack: () => void;
  onRevealInterpretation: () => void;
}

export default function RevelationPage({ 
  user, oracle, oracleType, onRevealInterpretation 
}: RevelationPageProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const isDailyReading = oracleType === 'daily';

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => onRevealInterpretation(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onRevealInterpretation]);

  return (
    <div className={`rv-root ${mounted ? 'rv-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        :root {
          --gold: #DDB95A;
          --gold-light: #F0DC88;
          --white: #F7F2EA;
          --bg: #05030E;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rv-root {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--bg);
          font-family: 'Jost', sans-serif; color: var(--white);
          position: relative; overflow: hidden;
          padding: 40px 32px;
        }

        .rv-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 50% 30%, rgba(80,40,160,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(40,20,90,0.1) 0%, transparent 55%);
        }
        .rv-noise {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .rv-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .rv-particle {
          position: absolute; border-radius: 50%; background: white;
          animation: rvpf var(--d,4s) ease-in-out infinite var(--dl,0s);
        }
        @keyframes rvpf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.2)} }

        .rv-orb-wrap {
          position: relative; width: 160px; height: 160px; margin-bottom: 56px;
          opacity: 0; transform: scale(0.85);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .rv-mounted .rv-orb-wrap { opacity: 1; transform: scale(1); transition-delay: 0.1s; }

        .rv-orb-glow {
          position: absolute; inset: -32px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, rgba(100,60,200,0.06) 40%, transparent 70%);
          animation: rv-breathe 4s ease-in-out infinite;
        }

        .rv-ring { position: absolute; border-radius: 50%; border: 1px solid transparent; }
        .rv-ring-1 { inset: 10px; border-color: rgba(201,168,76,0.35) transparent rgba(201,168,76,0.1) transparent; animation: rv-spin 3s linear infinite; }
        .rv-ring-2 { inset: 28px; border-color: transparent rgba(180,140,255,0.2) transparent rgba(180,140,255,0.08); animation: rv-spin 4.5s linear infinite reverse; }
        .rv-ring-3 { inset: 44px; border-color: rgba(201,168,76,0.15) transparent rgba(201,168,76,0.05) transparent; animation: rv-spin 7s linear infinite; }

        @keyframes rv-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .rv-orb-center { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .rv-orb-dot {
          width: 52px; height: 52px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(240,208,128,0.95) 0%, rgba(201,168,76,0.6) 45%, rgba(120,80,200,0.15) 100%);
          box-shadow: 0 0 20px rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.2);
          animation: rv-breathe 4s ease-in-out infinite;
        }
        @keyframes rv-breathe {
          0%,100% { transform: scale(0.93); opacity: .85; }
          50% { transform: scale(1.07); opacity: 1; }
        }

        .rv-text {
          position: relative; z-index: 10;
          text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .rv-mounted .rv-text { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }

        .rv-label {
          font-size: 10px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
          /* ✅ +lisibilité : 0.55 → 0.88 */
          color: rgba(220,185,90,1.0);
        }

        .rv-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(20px, 5vw, 28px); font-weight: 300;
          color: var(--white); line-height: 1.3;
        }
        .rv-title em { font-style: italic; color: var(--gold-light); }

        .rv-dots { display: flex; gap: 8px; align-items: center; }
        .rv-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold);
          animation: rv-dot-bounce 1.2s ease-in-out infinite;
          /* ✅ +lisibilité : 0.5 → 0.80 */
          opacity: 0.80;
        }
        .rv-dot:nth-child(2) { animation-delay: 0.2s; }
        .rv-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes rv-dot-bounce {
          0%,100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-5px); opacity: 1; }
        }

        .rv-message {
          font-family: 'Playfair Display', serif;
          font-size: 14px; font-style: italic; font-weight: 300;
          /* ✅ +lisibilité : 0.4 → 0.75 */
          color: rgba(247,242,234,0.75);
          max-width: 260px; line-height: 1.7; text-align: center;
          opacity: 0; transition: opacity 0.7s ease;
        }
        .rv-mounted .rv-message { opacity: 1; transition-delay: 0.9s; }
      `}</style>

      <div className="rv-bg"/>
      <div className="rv-noise"/>
      <div className="rv-particles">
        {Array.from({length: 35}).map((_,i) => (
          <div key={i} className="rv-particle" style={{
            left: `${Math.random()*100}%`, top: `${Math.random()*100}%`,
            width: `${Math.random()<.2?2:1}px`, height: `${Math.random()<.2?2:1}px`,
            '--d': `${3+Math.random()*5}s`, '--dl': `${Math.random()*5}s`,
            '--op': 0.1+Math.random()*0.4,
          } as any}/>
        ))}
      </div>

      <div className="rv-orb-wrap">
        <div className="rv-orb-glow"/>
        <div className="rv-ring rv-ring-1"/>
        <div className="rv-ring rv-ring-2"/>
        <div className="rv-ring rv-ring-3"/>
        <div className="rv-orb-center">
          <div className="rv-orb-dot"/>
        </div>
      </div>

      <div className="rv-text">
        <div className="rv-label">
          {isDailyReading ? 'Oracle du jour' : oracle.title}
        </div>
        <h2 className="rv-title">
          <em>{isDailyReading
            ? t('revelation.loading.daily', { name: user.name }) || `Les astres dévoilent ton oracle du jour, ${user.name}`
            : t('revelation.loading.reading', { name: user.name, oracle: oracle.title }) || `Révélation en cours, ${user.name}`
          }</em>
        </h2>
        <div className="rv-dots">
          <div className="rv-dot"/>
          <div className="rv-dot"/>
          <div className="rv-dot"/>
        </div>
      </div>

      <p className="rv-message">
        {t('revelation.loading.mysticMessage') || '"Les étoiles s\'alignent pour toi..."'}
      </p>
    </div>
  );
}