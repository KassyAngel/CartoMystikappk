import { useState } from 'react';
import MysticalButton from '@/components/MysticalButton';
import MysticalInput from '@/components/MysticalInput';
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
  const [currentAnswer, setCurrentAnswer] = useState<{ key: string; icon: string; color: string } | null>(null);
  const [mounted] = useState(true);
  const { t } = useLanguage();

  const mysticalAnswers = [
    { key: 'yes', icon: '✦', color: '#7dffb3' },
    { key: 'no', icon: '✕', color: '#ff7d7d' },
    { key: 'maybe', icon: '◈', color: '#c4a8ff' },
    { key: 'veryLikely', icon: '✧', color: '#ffe57d' },
    { key: 'unlikely', icon: '◇', color: '#7dc8ff' },
    { key: 'certain', icon: '✦', color: '#7dffcf' },
    { key: 'noChance', icon: '✕', color: '#ff9d7d' },
    { key: 'askLater', icon: '◎', color: '#b0b8d0' },
    { key: 'dontCount', icon: '✕', color: '#ffb87d' },
    { key: 'yesDefinitely', icon: '✦', color: '#7dff9d' },
    { key: 'signsYes', icon: '✧', color: '#fffb7d' },
    { key: 'signsNo', icon: '◇', color: '#9d7dff' },
    { key: 'unclear', icon: '◌', color: '#c0c8d8' },
    { key: 'trustIntuition', icon: '◈', color: '#ffb8e8' },
  ];

  const saveReading = async (answerKey: string) => {
    if (onSaveReading) {
      try {
        await onSaveReading({ type: 'crystalBall', question, answer: answerKey, date: new Date() });
      } catch {}
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

  const handleNewQuestion = () => {
    setQuestion('');
    setCurrentAnswer(null);
    setPhase('question');
  };

  return (
    <div className={`cb-root ${mounted ? 'cb-mounted' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --gold: #DDB95A;
          --gold-light: #F0DC88;
          --gold-dim: rgba(221,185,90,0.3);
          --white: #F7F2EA;
          --bg: #05030E;
        }

        * { box-sizing: border-box; }

        .cb-root {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center;
          background: var(--bg);
          font-family: 'Jost', sans-serif;
          color: var(--white);
          position: relative; overflow-x: hidden;
          padding: 0 0 48px;
        }

        /* ── Arrière-plans ── */
        .cb-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,40,180,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(40,20,100,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 80% 60%, rgba(60,20,120,0.08) 0%, transparent 50%);
        }
        .cb-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .cb-particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .cb-particle {
          position: absolute; border-radius: 50%; background: white;
          animation: cbpf var(--d,5s) ease-in-out infinite var(--dl,0s);
        }
        @keyframes cbpf { 0%,100%{opacity:0} 40%,60%{opacity:var(--op,.15)} }

        /* ── Header ── */
        .cb-header {
          position: relative; z-index: 10;
          width: 100%; display: flex; align-items: center; justify-content: space-between;
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

        /* ── Titre ── */
        .cb-title-block {
          position: relative; z-index: 10;
          text-align: center; padding: 32px 24px 8px;
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
          font-family: 'Playfair Display', serif;
          font-size: 14px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.82); line-height: 1.65; max-width: 280px; margin: 0 auto;
        }

        /* ── Orbe ── */
        .cb-orb-wrap {
          position: relative; z-index: 10;
          width: 200px; height: 200px; margin: 32px auto 40px;
          opacity: 0; transform: scale(0.9);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .cb-mounted .cb-orb-wrap { opacity: 1; transform: scale(1); transition-delay: 0.35s; }

        /* Halo externe */
        .cb-orb-halo {
          position: absolute; inset: -24px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(120,60,220,0.18) 0%, rgba(221,185,90,0.06) 50%, transparent 70%);
          animation: cb-breathe 4s ease-in-out infinite;
        }

        /* Anneaux */
        .cb-ring { position: absolute; border-radius: 50%; border: 1px solid transparent; }
        .cb-ring-1 {
          inset: 8px;
          border-color: rgba(221,185,90,0.30) transparent rgba(221,185,90,0.08) transparent;
          animation: cb-spin 18s linear infinite;
        }
        .cb-ring-2 {
          inset: 22px;
          border-color: transparent rgba(160,100,255,0.22) transparent rgba(160,100,255,0.08);
          animation: cb-spin 28s linear infinite reverse;
        }
        .cb-ring-3 {
          inset: 36px;
          border-color: rgba(221,185,90,0.12) transparent rgba(221,185,90,0.04) transparent;
          animation: cb-spin 40s linear infinite;
        }
        @keyframes cb-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        /* Sphère en verre — look cristal clair */
        .cb-sphere {
          position: absolute; inset: 44px; border-radius: 50%;
          background:
            radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55) 0%, rgba(220,210,255,0.25) 25%, transparent 55%),
            radial-gradient(circle at 70% 75%, rgba(160,100,255,0.30) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(180,140,255,0.50) 0%, rgba(100,60,200,0.65) 50%, rgba(40,15,90,0.75) 100%);
          box-shadow:
            0 0 50px rgba(140,80,255,0.55),
            0 0 100px rgba(140,80,255,0.20),
            inset 0 0 40px rgba(200,160,255,0.25),
            inset 0 8px 24px rgba(255,255,255,0.14),
            inset 0 -12px 24px rgba(80,20,160,0.35);
          border: 1px solid rgba(220,200,255,0.28);
          animation: cb-breathe 4s ease-in-out infinite;
          overflow: hidden;
        }

        /* Grand reflet principal haut-gauche */
        .cb-sphere-reflex {
          position: absolute; top: 8%; left: 12%; width: 42%; height: 30%;
          background: radial-gradient(ellipse, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.18) 40%, transparent 100%);
          border-radius: 50%; transform: rotate(-25deg);
          pointer-events: none;
        }

        /* Petit reflet secondaire bas-droit */
        .cb-sphere-reflex2 {
          position: absolute; bottom: 14%; right: 12%; width: 20%; height: 14%;
          background: radial-gradient(ellipse, rgba(200,180,255,0.35) 0%, transparent 100%);
          border-radius: 50%; pointer-events: none;
        }

        /* Contenu centre orbe */
        .cb-sphere-center {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }

        /* ✅ Symbole central bien visible */
        .cb-sphere-icon {
          font-size: 34px; font-weight: 300;
          color: rgba(255,255,255,1);
          text-shadow:
            0 0 10px rgba(255,255,255,1),
            0 0 28px rgba(220,180,255,0.9),
            0 0 56px rgba(180,120,255,0.6);
          animation: cb-breathe 4s ease-in-out infinite;
        }

        /* ✅ Texte réponse opaque + glow fort */
        .cb-sphere-answer {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 400; font-style: italic;
          text-align: center; padding: 0 8px;
          animation: cb-reveal 0.6s cubic-bezier(0.16,1,0.3,1);
          text-shadow: 0 0 14px currentColor, 0 0 36px currentColor, 0 2px 8px rgba(0,0,0,0.7);
          -webkit-text-stroke: 0.3px rgba(255,255,255,0.25);
        }

        @keyframes cb-reveal { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
        @keyframes cb-breathe {
          0%,100% { transform: scale(0.97); }
          50% { transform: scale(1.03); }
        }

        /* Loader orbe */
        .cb-orb-loader {
          position: absolute; inset: 0; border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 0%, rgba(221,185,90,0.3) 30%, transparent 60%);
          animation: cb-spin 1.5s linear infinite;
        }

        /* Socle */
        .cb-orb-base {
          position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%);
          width: 80px; height: 14px;
          background: linear-gradient(135deg, rgba(221,185,90,0.15) 0%, rgba(221,185,90,0.08) 100%);
          border: 1px solid rgba(221,185,90,0.2);
          border-radius: 50%;
        }

        @keyframes cb-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* ── Contenu ── */
        .cb-content {
          position: relative; z-index: 10;
          width: 100%; max-width: 480px; padding: 0 20px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cb-mounted .cb-content { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }

        /* Card de base */
        .cb-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(221,185,90,0.2);
          border-radius: 12px;
          padding: 24px 20px;
          margin-bottom: 10px;
          position: relative; overflow: hidden;
        }
        .cb-card::before {
          content: ''; position: absolute; inset: 0; border-radius: 12px;
          background: linear-gradient(135deg, rgba(221,185,90,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Coins décoratifs */
        .cb-corner {
          position: absolute; width: 8px; height: 8px;
          border-color: rgba(221,185,90,0.3); border-style: solid;
        }
        .cb-corner.tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .cb-corner.tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
        .cb-corner.bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
        .cb-corner.br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

        /* Titre card */
        .cb-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px; font-weight: 300; font-style: italic;
          color: var(--gold-light); text-align: center;
          margin-bottom: 16px;
        }

        /* Input zone */
        .cb-input {
          background: transparent; border: none;
          border-bottom: 1px solid rgba(221,185,90,0.35);
          color: var(--white);
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px; font-weight: 300; letter-spacing: 0.5px;
          text-align: center; padding: 12px 4px;
          transition: border-color 0.4s; caret-color: var(--gold);
          width: 100%; outline: none;
          margin-bottom: 20px; resize: none;
        }
        .cb-input::placeholder { color: rgba(247,242,234,0.30); font-style: italic; }
        .cb-input:focus { border-bottom-color: rgba(221,185,90,0.8); }

        /* Hint */
        .cb-hint {
          font-size: 12px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.60);
          text-align: center; line-height: 1.6; margin-bottom: 20px;
          font-style: italic; font-family: 'Playfair Display', serif;
        }

        /* Bouton primaire */
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
        .cb-btn-primary:disabled {
          opacity: 0.35; cursor: not-allowed;
        }

        /* Bouton secondaire */
        .cb-btn-secondary {
          width: 100%; padding: 14px 24px;
          background: none; border: 1px solid rgba(255,255,255,0.18); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.78); cursor: pointer; transition: all 0.3s;
          margin-top: 10px;
        }
        .cb-btn-secondary:hover {
          border-color: rgba(255,255,255,0.38); color: rgba(247,242,234,1);
        }

        /* Séparateur */
        .cb-sep {
          width: 1px; height: 24px; margin: 4px auto;
          background: linear-gradient(to bottom, transparent, rgba(221,185,90,0.2), transparent);
        }

        /* Phase loading */
        .cb-loading-text {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.85); text-align: center;
          margin-bottom: 16px;
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
          50% { transform: translateY(-6px); opacity: 1; }
        }

        /* Question rappel */
        .cb-question-recall {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.75); text-align: center; line-height: 1.65;
        }
        .cb-question-recall strong {
          display: block; font-size: 9px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold); margin-bottom: 6px; font-style: normal;
        }

        /* Réponse */
        .cb-answer-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px, 7vw, 34px); font-weight: 300; font-style: italic;
          text-align: center; line-height: 1.2;
          padding: 8px 0;
          animation: cb-reveal 0.8s cubic-bezier(0.16,1,0.3,1);
        }

        .cb-answer-sep {
          width: 48px; height: 1px; margin: 12px auto;
          background: linear-gradient(90deg, transparent, rgba(221,185,90,0.4), transparent);
        }

        .cb-answer-guidance {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.80); text-align: center; line-height: 1.7;
        }

        /* Disclaimer */
        .cb-disclaimer {
          font-size: 11px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.45); text-align: center;
          line-height: 1.6; padding: 16px 4px 0;
          font-style: italic; font-family: 'Playfair Display', serif;
        }

        /* Ligne fine */
        .cb-line {
          width: 1px; height: 28px; margin: 0 auto 24px;
          background: linear-gradient(to bottom, transparent, rgba(221,185,90,0.2), transparent);
        }
      `}</style>

      {/* Arrière-plans */}
      <div className="cb-bg" />
      <div className="cb-noise" />
      <div className="cb-particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="cb-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() < 0.2 ? 2 : 1}px`,
            height: `${Math.random() < 0.2 ? 2 : 1}px`,
            '--d': `${4 + Math.random() * 6}s`,
            '--dl': `${Math.random() * 6}s`,
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
        <h1 className="cb-title">
          <em>{t('crystalBall.title') || 'Boule de Cristal'}</em>
        </h1>
        <p className="cb-subtitle">
          {t('crystalBall.subtitle') || 'Posez votre question et laissez la magie vous guider'}
        </p>
      </div>

      {/* Orbe */}
      <div className="cb-orb-wrap" style={{ animation: phase === 'loading' ? 'cb-float 1.5s ease-in-out infinite' : 'cb-float 4s ease-in-out infinite' }}>
        <div className="cb-orb-halo" />
        <div className="cb-ring cb-ring-1" />
        <div className="cb-ring cb-ring-2" />
        <div className="cb-ring cb-ring-3" />

        <div className="cb-sphere">
          <div className="cb-sphere-reflex" />
          <div className="cb-sphere-reflex2" />
          {phase === 'loading' && <div className="cb-orb-loader" />}
          <div className="cb-sphere-center">
            {phase === 'question' && (
              <span className="cb-sphere-icon">◈</span>
            )}
            {phase === 'loading' && (
              <span className="cb-sphere-icon" style={{ opacity: 0.5 }}>◌</span>
            )}
            {phase === 'answer' && currentAnswer && (
              <span
                className="cb-sphere-answer"
                style={{ color: currentAnswer.color }}
              >
                {currentAnswer.icon}
              </span>
            )}
          </div>
        </div>

        <div className="cb-orb-base" />
      </div>

      <div className="cb-line" />

      {/* Contenu */}
      <div className="cb-content">

        {/* ── PHASE QUESTION ── */}
        {phase === 'question' && (
          <>
            <div className="cb-card">
              <div className="cb-corner tl" /><div className="cb-corner tr" />
              <div className="cb-corner bl" /><div className="cb-corner br" />
              <div className="cb-card-title">
                {t('crystalBall.askPrompt') || 'Quelle est votre question ?'}
              </div>
              <textarea
                className="cb-input"
                placeholder={t('crystalBall.questionPlaceholder') || 'Écrivez votre question ici'}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                maxLength={200}
                rows={2}
              />
              <p className="cb-hint">
                {t('crystalBall.closedQuestionHint') || 'La boule répond par oui, non, ou peut-être — posez une question précise'}
              </p>
              <button
                className="cb-btn-primary"
                onClick={handleAskQuestion}
                disabled={!question.trim()}
              >
                {t('crystalBall.submitQuestion') || 'Consulter la boule'}
              </button>
            </div>
            <button className="cb-btn-secondary" onClick={onBack}>
              {t('common.back') || 'Retour'}
            </button>
          </>
        )}

        {/* ── PHASE LOADING ── */}
        {phase === 'loading' && (
          <div className="cb-card" style={{ textAlign: 'center', padding: '32px 20px' }}>
            <div className="cb-corner tl" /><div className="cb-corner tr" />
            <div className="cb-corner bl" /><div className="cb-corner br" />
            <p className="cb-loading-text">
              {t('crystalBall.thinking') || 'La boule réfléchit…'}
            </p>
            <div className="cb-loading-dots">
              <div className="cb-loading-dot" />
              <div className="cb-loading-dot" />
              <div className="cb-loading-dot" />
            </div>
          </div>
        )}

        {/* ── PHASE RÉPONSE ── */}
        {phase === 'answer' && currentAnswer && (
          <>
            {/* Rappel question */}
            <div className="cb-card" style={{ marginBottom: 10 }}>
              <div className="cb-corner tl" /><div className="cb-corner tr" />
              <div className="cb-corner bl" /><div className="cb-corner br" />
              <p className="cb-question-recall">
                <strong>{t('crystalBall.yourQuestion') || 'Votre question'}</strong>
                « {question} »
              </p>
            </div>

            {/* Réponse */}
            <div className="cb-card" style={{ marginBottom: 10 }}>
              <div className="cb-corner tl" /><div className="cb-corner tr" />
              <div className="cb-corner bl" /><div className="cb-corner br" />
              <p
                className="cb-answer-text"
                style={{ color: currentAnswer.color, textShadow: `0 0 30px ${currentAnswer.color}60` }}
              >
                {t(`crystalBall.answers.${currentAnswer.key}`) || currentAnswer.key}
              </p>
              <div className="cb-answer-sep" />
              <p className="cb-answer-guidance">
                {t('crystalBall.guidance') || 'Écoutez votre intuition pour interpréter ce message'}
              </p>
            </div>

            {/* Actions */}
            <button className="cb-btn-primary" onClick={handleNewQuestion}>
              {t('crystalBall.newQuestion') || 'Poser une autre question'}
            </button>
            <button className="cb-btn-secondary" onClick={onBack}>
              {t('crystalBall.backHome') || "Retour à l'accueil"}
            </button>

            <p className="cb-disclaimer">
              {t('crystalBall.disclaimer') || 'Les réponses sont symboliques et destinées au divertissement.'}
            </p>
          </>
        )}

      </div>
    </div>
  );
}