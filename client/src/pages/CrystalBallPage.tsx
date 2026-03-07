import { useState } from 'react';
import { UserSession } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSecureRandomInt } from '@/lib/utils';

interface CrystalBallPageProps {
  onBack: () => void;
  onSaveReading?: (reading: any) => Promise<void>;
  user: UserSession;
}

type Phase = 'question' | 'loading' | 'answer';

export default function CrystalBallPage({ onBack, onSaveReading }: CrystalBallPageProps) {
  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState<Phase>('question');
  const [currentAnswer, setCurrentAnswer] = useState<{ key: string; color: string } | null>(null);
  const [mounted] = useState(true);
  const { t } = useLanguage();

  const mysticalAnswers = [
    { key: 'yes',            color: '#7dffb3' },
    { key: 'no',             color: '#ff7d7d' },
    { key: 'maybe',          color: '#c4a8ff' },
    { key: 'veryLikely',     color: '#ffe57d' },
    { key: 'unlikely',       color: '#7dc8ff' },
    { key: 'certain',        color: '#7dffcf' },
    { key: 'noChance',       color: '#ff9d7d' },
    { key: 'askLater',       color: '#b0b8d0' },
    { key: 'dontCount',      color: '#ffb87d' },
    { key: 'yesDefinitely',  color: '#7dff9d' },
    { key: 'signsYes',       color: '#fffb7d' },
    { key: 'signsNo',        color: '#9d7dff' },
    { key: 'unclear',        color: '#c0c8d8' },
    { key: 'trustIntuition', color: '#ffb8e8' },
  ];

  // ✅ Taille de police adaptive selon longueur du texte
  const getOrbFontSize = (text: string) => {
    const len = text.length;
    if (len <= 3)  return '32px';
    if (len <= 6)  return '26px';
    if (len <= 10) return '20px';
    if (len <= 16) return '15px';
    if (len <= 24) return '12px';
    return '10px';
  };

  const saveReading = async (answerKey: string) => {
    if (onSaveReading) {
      try { await onSaveReading({ type: 'crystalBall', question, answer: answerKey, date: new Date() }); } catch {}
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setPhase('loading');
    setTimeout(() => {
      const randomAnswer = mysticalAnswers[getSecureRandomInt(0, mysticalAnswers.length - 1)];
      setCurrentAnswer(randomAnswer);
      setPhase('answer');
      saveReading(randomAnswer.key);
    }, 2800);
  };

  const handleNewQuestion = () => { setQuestion(''); setCurrentAnswer(null); setPhase('question'); };

  return (
    <div className={`cb-root ${mounted ? 'cb-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #DDB95A; --gold-light: #F0DC88;
          --gold-dim: rgba(221,185,90,0.3); --white: #F7F2EA; --bg: #05030E;
        }
        * { box-sizing: border-box; }

        .cb-root {
          min-height: 100vh; display: flex; flex-direction: column; align-items: center;
          background: var(--bg); font-family: 'Jost', sans-serif; color: var(--white);
          position: relative; overflow-x: hidden; padding: 0 0 48px;
        }

        .cb-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,40,180,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(40,20,100,0.12) 0%, transparent 55%);
        }
        .cb-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .cb-particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .cb-particle { position: absolute; border-radius: 50%; background: white; animation: cbpf var(--d,5s) ease-in-out infinite var(--dl,0s); }
        @keyframes cbpf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.15)} }

        .cb-header {
          position: relative; z-index: 10; width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 0;
          opacity: 0; transition: opacity 0.6s ease;
        }
        .cb-mounted .cb-header { opacity: 1; transition-delay: 0.1s; }
        .cb-back-btn {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer; padding: 0;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.75); transition: color 0.3s;
        }
        .cb-back-btn:hover { color: rgba(247,242,234,1); }
        .cb-back-arr { width: 18px; height: 1px; background: currentColor; position: relative; }
        .cb-back-arr::before {
          content: ''; position: absolute; left: 0; top: -3px;
          width: 6px; height: 6px;
          border-left: 1px solid currentColor; border-bottom: 1px solid currentColor;
          transform: rotate(45deg);
        }

        .cb-title-block {
          position: relative; z-index: 10; text-align: center; padding: 32px 24px 8px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .cb-mounted .cb-title-block { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
        .cb-badge {
          display: inline-block; font-size: 9px; font-weight: 300;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(221,185,90,0.4);
          border-radius: 20px; padding: 5px 14px; margin-bottom: 14px;
        }
        .cb-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(28px, 8vw, 42px); font-weight: 300;
          color: var(--white); margin: 0 0 8px; line-height: 1.1;
        }
        .cb-title em { font-style: italic; color: var(--gold-light); }
        .cb-subtitle {
          font-family: 'Playfair Display', serif; font-size: 14px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.82); line-height: 1.65; max-width: 280px; margin: 0 auto;
        }

        /* ── BOULE DE CRISTAL ── */
        .cb-orb-wrap {
          position: relative; z-index: 10;
          width: 220px; height: 220px; margin: 36px auto 44px;
          opacity: 0; transform: scale(0.9);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .cb-mounted .cb-orb-wrap { opacity: 1; transform: scale(1); transition-delay: 0.35s; }

        .cb-orb-glow {
          position: absolute; inset: -40px; border-radius: 50%;
          background: radial-gradient(ellipse at 50% 50%,
            rgba(140,80,255,0.18) 0%, rgba(100,50,200,0.08) 45%, transparent 70%);
          filter: blur(12px);
          animation: cb-glow-pulse 5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes cb-glow-pulse {
          0%,100% { opacity: 0.6; transform: scale(0.95); }
          50%      { opacity: 1.0; transform: scale(1.05); }
        }

        .cb-orb-shadow {
          position: absolute; bottom: -14px; left: 50%;
          transform: translateX(-50%);
          width: 110px; height: 20px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(60,20,140,0.55) 0%, transparent 70%);
          filter: blur(8px);
          animation: cb-shadow-anim 5s ease-in-out infinite;
        }
        @keyframes cb-shadow-anim {
          0%,100% { transform: translateX(-50%) scaleX(0.88); opacity: 0.55; }
          50%      { transform: translateX(-50%) scaleX(1.08); opacity: 0.8; }
        }

        .cb-orb-base {
          position: absolute; bottom: -18px; left: 50%;
          transform: translateX(-50%);
          width: 88px; height: 14px;
          background: linear-gradient(180deg, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.06) 100%);
          border: 1px solid rgba(201,168,76,0.30); border-radius: 50%;
          box-shadow: 0 2px 10px rgba(201,168,76,0.08);
        }

        .cb-sphere {
          position: absolute; inset: 10px; border-radius: 50%; overflow: hidden; cursor: default;
          background:
            radial-gradient(ellipse 65% 55% at 35% 40%, rgba(130,80,255,0.50) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 68% 65%, rgba(80,35,200,0.38) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%,
              rgba(25,10,75,0.97) 0%, rgba(12,4,45,0.99) 55%, rgba(5,2,20,1) 100%);
          box-shadow:
            0 0 30px rgba(120,65,255,0.50), 0 0 65px rgba(100,45,220,0.22),
            0 0 120px rgba(80,30,180,0.10), inset 0 0 28px rgba(150,90,255,0.22),
            inset 0 -18px 36px rgba(15,4,60,0.65), inset 0 0 0 1px rgba(190,155,255,0.20);
          border: 1px solid rgba(175,140,255,0.25);
          animation: cb-breathe 5s ease-in-out infinite;
        }

        .cb-nebula {
          position: absolute; inset: -25%; border-radius: 50%;
          background: conic-gradient(from 0deg at 42% 38%,
            rgba(110,55,255,0.00) 0deg, rgba(110,55,255,0.28) 55deg,
            rgba(190,90,255,0.18) 110deg, rgba(75,35,200,0.22) 175deg,
            rgba(130,70,255,0.12) 240deg, rgba(110,55,255,0.00) 360deg);
          animation: cb-nebula-spin 22s linear infinite;
          mix-blend-mode: screen; opacity: 0.75;
        }
        @keyframes cb-nebula-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .cb-stardust {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle 2px at 28% 32%, rgba(255,255,255,0.80) 0%, transparent 100%),
            radial-gradient(circle 1px at 62% 25%, rgba(210,185,255,0.70) 0%, transparent 100%),
            radial-gradient(circle 1px at 74% 58%, rgba(255,255,255,0.50) 0%, transparent 100%),
            radial-gradient(circle 2px at 42% 72%, rgba(180,145,255,0.55) 0%, transparent 100%),
            radial-gradient(circle 1px at 18% 64%, rgba(255,255,255,0.40) 0%, transparent 100%),
            radial-gradient(circle 1px at 82% 80%, rgba(200,165,255,0.50) 0%, transparent 100%),
            radial-gradient(circle 1px at 55% 48%, rgba(255,255,255,0.30) 0%, transparent 100%);
          animation: cb-dust-drift 9s ease-in-out infinite alternate;
        }
        @keyframes cb-dust-drift {
          from { transform: translate(0, 0) rotate(0deg); }
          to   { transform: translate(4px, -5px) rotate(10deg); }
        }

        .cb-reflex-main {
          position: absolute; top: 5%; left: 6%; width: 52%; height: 38%;
          background: radial-gradient(ellipse,
            rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.28) 28%,
            rgba(255,255,255,0.06) 58%, transparent 100%);
          border-radius: 50%; transform: rotate(-32deg);
          pointer-events: none; filter: blur(1.5px);
        }
        .cb-reflex-sparkle {
          position: absolute; top: 9%; left: 14%; width: 13%; height: 9%;
          background: radial-gradient(ellipse,
            rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.45) 40%, transparent 100%);
          border-radius: 50%; pointer-events: none;
        }
        .cb-reflex-low {
          position: absolute; bottom: 8%; right: 8%; width: 30%; height: 22%;
          background: radial-gradient(ellipse,
            rgba(175,140,255,0.42) 0%, rgba(150,110,255,0.18) 45%, transparent 100%);
          border-radius: 50%; transform: rotate(18deg);
          pointer-events: none; filter: blur(2.5px);
        }
        .cb-reflex-rim {
          position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(ellipse 100% 100% at 50% 50%,
            transparent 60%, rgba(165,135,255,0.10) 72%,
            rgba(210,190,255,0.20) 82%, rgba(255,255,255,0.07) 90%, transparent 100%);
          pointer-events: none;
        }

        /* ✅ Centre de la boule — texte adaptatif */
        .cb-sphere-center {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }

        .cb-sphere-answer {
          font-family: 'Playfair Display', serif;
          font-weight: 400; font-style: italic;
          text-align: center;
          line-height: 1.25;
          word-break: break-word;
          max-width: 100%;
          display: block;
          animation: cb-reveal 0.7s cubic-bezier(0.16,1,0.3,1);
          text-shadow: 0 0 14px currentColor, 0 0 36px currentColor, 0 0 70px currentColor;
          z-index: 2;
          /* font-size géré inline dynamiquement */
        }

        .cb-orb-loader {
          position: absolute; inset: -1px; border-radius: 50%; z-index: 3; pointer-events: none;
          background: conic-gradient(from 0deg,
            transparent 0%, rgba(201,168,76,0.55) 18%,
            rgba(240,220,136,0.85) 32%, rgba(201,168,76,0.55) 48%, transparent 65%);
          animation: cb-spin-loader 1.8s linear infinite;
          mix-blend-mode: screen;
        }
        @keyframes cb-spin-loader { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        @keyframes cb-breathe {
          0%,100% { box-shadow:
            0 0 28px rgba(120,65,255,0.45), 0 0 60px rgba(100,45,220,0.18),
            inset 0 0 25px rgba(150,90,255,0.18), inset 0 -18px 36px rgba(15,4,60,0.65),
            inset 0 0 0 1px rgba(190,155,255,0.18); }
          50% { box-shadow:
            0 0 42px rgba(130,75,255,0.60), 0 0 85px rgba(110,55,230,0.25),
            inset 0 0 35px rgba(165,105,255,0.28), inset 0 -18px 36px rgba(15,4,60,0.65),
            inset 0 0 0 1px rgba(200,165,255,0.28); }
        }
        @keyframes cb-reveal { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
        @keyframes cb-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-9px); }
        }

        /* ── UI CONTENU ── */
        .cb-content {
          position: relative; z-index: 10; width: 100%; max-width: 480px; padding: 0 20px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cb-mounted .cb-content { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }

        .cb-card {
          background: rgba(255,255,255,0.025); border: 1px solid rgba(221,185,90,0.2);
          border-radius: 12px; padding: 24px 20px; margin-bottom: 10px;
          position: relative; overflow: hidden;
        }
        .cb-card::before {
          content: ''; position: absolute; inset: 0; border-radius: 12px;
          background: linear-gradient(135deg, rgba(221,185,90,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        .cb-corner { position: absolute; width: 8px; height: 8px; border-color: rgba(221,185,90,0.3); border-style: solid; }
        .cb-corner.tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .cb-corner.tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
        .cb-corner.bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
        .cb-corner.br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

        .cb-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px; font-weight: 300; font-style: italic;
          color: var(--gold-light); text-align: center; margin-bottom: 16px;
        }

        .cb-input {
          background: transparent; border: none;
          border-bottom: 1px solid rgba(221,185,90,0.35); color: var(--white);
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px; font-weight: 300; letter-spacing: 0.5px;
          text-align: center; padding: 12px 4px;
          transition: border-color 0.4s; caret-color: var(--gold);
          width: 100%; outline: none; margin-bottom: 20px; resize: none;
        }
        .cb-input::placeholder { color: rgba(247,242,234,0.30); font-style: italic; }
        .cb-input:focus { border-bottom-color: rgba(221,185,90,0.8); }

        .cb-hint {
          font-size: 12px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.60); text-align: center; line-height: 1.6;
          margin-bottom: 20px; font-style: italic; font-family: 'Playfair Display', serif;
        }

        .cb-btn-primary {
          width: 100%; padding: 16px 24px;
          background: linear-gradient(135deg, rgba(221,185,90,0.14) 0%, rgba(221,185,90,0.08) 100%);
          border: 1px solid rgba(221,185,90,0.5); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--gold-light); cursor: pointer; transition: all 0.35s ease;
        }
        .cb-btn-primary:hover:not(:disabled) {
          border-color: rgba(221,185,90,0.85); color: #fff8d0;
          box-shadow: 0 0 24px rgba(221,185,90,0.15);
        }
        .cb-btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

        .cb-btn-secondary {
          width: 100%; padding: 14px 24px;
          background: none; border: 1px solid rgba(255,255,255,0.18); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.78); cursor: pointer; transition: all 0.3s;
          margin-top: 10px;
        }
        .cb-btn-secondary:hover { border-color: rgba(255,255,255,0.38); color: rgba(247,242,234,1); }

        .cb-loading-text {
          font-family: 'Playfair Display', serif; font-size: 16px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.85); text-align: center; margin-bottom: 16px;
        }
        .cb-loading-dots { display: flex; gap: 8px; justify-content: center; }
        .cb-loading-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--gold);
          animation: cb-dot 1.2s ease-in-out infinite; opacity: 0.8;
        }
        .cb-loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .cb-loading-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cb-dot {
          0%,100% { transform: translateY(0); opacity: 0.5; }
          50%      { transform: translateY(-6px); opacity: 1; }
        }

        .cb-question-recall {
          font-family: 'Playfair Display', serif; font-size: 13px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.75); text-align: center; line-height: 1.65;
        }
        .cb-question-recall strong {
          display: block; font-size: 9px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 6px; font-style: normal;
        }

        .cb-answer-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px, 7vw, 34px); font-weight: 300; font-style: italic;
          text-align: center; line-height: 1.2; padding: 8px 0;
          animation: cb-reveal 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .cb-answer-sep {
          width: 48px; height: 1px; margin: 12px auto;
          background: linear-gradient(90deg, transparent, rgba(221,185,90,0.4), transparent);
        }
        .cb-answer-guidance {
          font-family: 'Playfair Display', serif; font-size: 13px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.80); text-align: center; line-height: 1.7;
        }
        .cb-disclaimer {
          font-size: 11px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.45); text-align: center; line-height: 1.6;
          padding: 16px 4px 0; font-style: italic; font-family: 'Playfair Display', serif;
        }
        .cb-line {
          width: 1px; height: 28px; margin: 0 auto 24px;
          background: linear-gradient(to bottom, transparent, rgba(221,185,90,0.2), transparent);
        }
      `}</style>

      <div className="cb-bg" />
      <div className="cb-noise" />
      <div className="cb-particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="cb-particle" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: `${Math.random() < 0.2 ? 2 : 1}px`, height: `${Math.random() < 0.2 ? 2 : 1}px`,
            '--d': `${4 + Math.random() * 6}s`, '--dl': `${Math.random() * 6}s`,
            '--op': 0.08 + Math.random() * 0.25,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* Header */}
      <div className="cb-header">
        <button className="cb-back-btn" onClick={onBack}>
          <span className="cb-back-arr" />
          {t('common.back') || 'Retour'}
        </button>
      </div>

      {/* Titre */}
      <div className="cb-title-block">
        <div className="cb-badge">Divination</div>
        <h1 className="cb-title"><em>{t('crystalBall.title') || 'Boule de Cristal'}</em></h1>
        <p className="cb-subtitle">{t('crystalBall.subtitle') || 'Posez votre question et laissez la magie vous guider'}</p>
      </div>

      {/* ── BOULE DE CRISTAL ── */}
      <div
        className="cb-orb-wrap"
        style={{ animation: phase === 'loading' ? 'cb-float 1.4s ease-in-out infinite' : 'cb-float 4.5s ease-in-out infinite' }}
      >
        <div className="cb-orb-glow" />
        <div className="cb-orb-shadow" />

        <div className="cb-sphere">
          <div className="cb-nebula" />
          <div className="cb-stardust" />
          <div className="cb-reflex-main" />
          <div className="cb-reflex-sparkle" />
          <div className="cb-reflex-low" />
          <div className="cb-reflex-rim" />
          {phase === 'loading' && <div className="cb-orb-loader" />}

          {/* ✅ Texte adaptatif — plus de symbole */}
          <div className="cb-sphere-center">
            {phase === 'answer' && currentAnswer && (() => {
              const answerText = t(`crystalBall.answers.${currentAnswer.key}`) || currentAnswer.key;
              return (
                <span
                  className="cb-sphere-answer"
                  style={{
                    color: currentAnswer.color,
                    fontSize: getOrbFontSize(answerText),
                  }}
                >
                  {answerText}
                </span>
              );
            })()}
          </div>
        </div>

        <div className="cb-orb-base" />
      </div>

      <div className="cb-line" />

      {/* Contenu */}
      <div className="cb-content">

        {phase === 'question' && (
          <>
            <div className="cb-card">
              <div className="cb-corner tl" /><div className="cb-corner tr" />
              <div className="cb-corner bl" /><div className="cb-corner br" />
              <div className="cb-card-title">{t('crystalBall.askPrompt') || 'Quelle est votre question ?'}</div>
              <textarea
                className="cb-input"
                placeholder={t('crystalBall.questionPlaceholder') || 'Écrivez votre question ici...'}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                maxLength={200} rows={2}
              />
              <p className="cb-hint">{t('crystalBall.closedQuestionHint') || 'La boule répond par oui, non, ou peut-être — posez une question précise'}</p>
              <button className="cb-btn-primary" onClick={handleAskQuestion} disabled={!question.trim()}>
                {t('crystalBall.submitQuestion') || 'Consulter la boule'}
              </button>
            </div>
            <button className="cb-btn-secondary" onClick={onBack}>{t('common.back') || 'Retour'}</button>
          </>
        )}

        {phase === 'loading' && (
          <div className="cb-card" style={{ textAlign: 'center', padding: '32px 20px' }}>
            <div className="cb-corner tl" /><div className="cb-corner tr" />
            <div className="cb-corner bl" /><div className="cb-corner br" />
            <p className="cb-loading-text">{t('crystalBall.thinking') || 'La boule réfléchit…'}</p>
            <div className="cb-loading-dots">
              <div className="cb-loading-dot" /><div className="cb-loading-dot" /><div className="cb-loading-dot" />
            </div>
          </div>
        )}

        {phase === 'answer' && currentAnswer && (
          <>
            <div className="cb-card" style={{ marginBottom: 10 }}>
              <div className="cb-corner tl" /><div className="cb-corner tr" />
              <div className="cb-corner bl" /><div className="cb-corner br" />
              <p className="cb-question-recall">
                <strong>{t('crystalBall.yourQuestion') || 'Votre question'}</strong>
                « {question} »
              </p>
            </div>
            <div className="cb-card" style={{ marginBottom: 10 }}>
              <div className="cb-corner tl" /><div className="cb-corner tr" />
              <div className="cb-corner bl" /><div className="cb-corner br" />
              <p
                className="cb-answer-text"
                style={{
                  color: currentAnswer.color,
                  textShadow: `0 0 30px ${currentAnswer.color}60`
                }}
              >
                {t(`crystalBall.answers.${currentAnswer.key}`) || currentAnswer.key}
              </p>
              <div className="cb-answer-sep" />
              <p className="cb-answer-guidance">{t('crystalBall.guidance') || 'Écoutez votre intuition pour interpréter ce message'}</p>
            </div>
            <button className="cb-btn-primary" onClick={handleNewQuestion}>
              {t('crystalBall.newQuestion') || 'Poser une autre question'}
            </button>
            <button className="cb-btn-secondary" onClick={onBack}>
              {t('crystalBall.backHome') || "Retour à l'accueil"}
            </button>
            <p className="cb-disclaimer">{t('crystalBall.disclaimer') || 'Les réponses sont symboliques et destinées au divertissement.'}</p>
          </>
        )}
      </div>
    </div>
  );
}