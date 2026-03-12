import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CardSection {
  icon: string;
  title: string;
  position?: string;
  content: string;
}

interface SummaryCardProps {
  title: string;
  sections?: CardSection[];
  content?: string;
  finalMessage?: string;
  isVisible?: boolean;
  className?: string;
  openFirst?: boolean;
  onSectionOpen?: (sectionTitle: string) => void | Promise<void>;
}

export default function SummaryCard({
  title, sections, content, finalMessage,
  isVisible = false, openFirst = false, onSectionOpen
}: SummaryCardProps) {
  const [openSections, setOpenSections] = useState<number[]>(openFirst ? [0] : []);
  const { t } = useLanguage();

  if (!isVisible) return null;

  const toggleSection = async (index: number) => {
    const isOpening = !openSections.includes(index);
    setOpenSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
    if (isOpening && onSectionOpen && sections?.[index]) {
      const result = onSectionOpen(sections[index].title);
      if (result instanceof Promise) result.catch(() => {});
    }
  };

  // ── Mode horoscope (contenu brut, pas de sections) ──────────────
  if (content && !sections) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(201,168,76,0.18)',
        borderRadius: 12, padding: '28px 24px',
        maxWidth: 480, margin: '0 auto',
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');`}</style>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20, fontWeight: 300, color: '#E8D080',
          textAlign: 'center', marginBottom: 20, letterSpacing: 0.5,
        }}>{title}</h3>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15, fontStyle: 'italic', fontWeight: 300,
          color: 'rgba(247,242,234,0.88)', lineHeight: 1.85,
          whiteSpace: 'pre-line', maxHeight: '60vh', overflowY: 'auto',
        }}>{content}</div>
      </div>
    );
  }

  if (!sections || sections.length === 0) return null;

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        /* ── Header ── */
        .sc-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300; letter-spacing: 4px;
          text-transform: uppercase; color: rgba(220,185,90,0.9);
          text-align: center; margin-bottom: 8px;
        }
        .sc-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(20px,5vw,26px); font-weight: 300;
          color: #F7F2EA; letter-spacing: 0.5px; margin: 0;
          text-align: center;
        }
        .sc-title em { font-style: italic; color: #F0DC88; }

        .sc-divider {
          display: flex; align-items: center; gap: 14px;
          margin: 16px 0 20px;
        }
        .sc-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25));
        }
        .sc-divider-line.r {
          background: linear-gradient(90deg, rgba(201,168,76,0.25), transparent);
        }
        .sc-divider-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(201,168,76,0.55);
        }

        /* ── Sections ── */
        .sc-sections { display: flex; flex-direction: column; gap: 10px; }

        .sc-section {
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .sc-section.open {
          background: rgba(201,168,76,0.04);
          border-color: rgba(201,168,76,0.28);
        }

        .sc-section-btn {
          width: 100%; display: flex; align-items: center;
          padding: 14px 16px; gap: 12px;
          background: none; border: none; cursor: pointer;
          text-align: left;
        }
        .sc-section-btn:active { background: rgba(201,168,76,0.04); }

        /* Icône ronde */
        .sc-icon {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.16);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          transition: background 0.3s, border-color 0.3s;
        }
        .sc-section.open .sc-icon {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.38);
        }

        /* Texte titre + position */
        .sc-label-wrap { flex: 1; min-width: 0; }
        .sc-position {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300; letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201,168,76,0.65);
          margin-bottom: 3px;
          display: block;
        }
        .sc-section.open .sc-position { color: rgba(220,185,90,0.85); }

        .sc-card-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px; font-weight: 400; letter-spacing: 0.3px;
          color: #F7F2EA;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          display: block;
        }
        .sc-section.open .sc-card-name { color: #F0DC88; }

        /* Chevron */
        .sc-chevron {
          width: 28px; height: 28px; flex-shrink: 0; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.85);
          transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1),
                      background 0.3s, border-color 0.3s, color 0.3s;
        }
        .sc-section.open .sc-chevron {
          transform: rotate(180deg);
          background: rgba(201,168,76,0.16);
          border-color: rgba(201,168,76,0.50);
          color: #F0DC88;
        }
        .sc-chevron svg { width: 14px; height: 14px; stroke-width: 2.5; }

        /* Corps dépliable */
        .sc-body {
          overflow: hidden;
          max-height: 0; opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
        }
        .sc-body.open { max-height: 900px; opacity: 1; }

        .sc-body-inner {
          padding: 0 16px 18px 68px;
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.90); line-height: 1.9;
          white-space: pre-line;
        }

        /* Séparateur interne */
        .sc-body-sep {
          height: 1px; margin: 0 16px 14px 68px;
          background: linear-gradient(90deg, rgba(201,168,76,0.18), transparent);
        }

        /* Bloc synthèse final */
        .sc-final {
          margin-top: 14px;
          background: rgba(201,168,76,0.04);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 12px; padding: 18px 20px;
        }
        .sc-final-head {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .sc-final-label {
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 300; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(220,185,90,0.85);
          white-space: nowrap;
        }
        .sc-final-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.22), transparent);
        }
        .sc-final-text {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.92); line-height: 1.9;
          white-space: pre-line; margin: 0;
        }
      `}</style>

      {/* Header */}
      <div className="sc-eyebrow">
        {t('revelation.summary.eyebrow') || t('interpretation.label.reading') || 'Votre lecture'}
      </div>
      <h3 className="sc-title"><em>{title}</em></h3>

      <div className="sc-divider">
        <div className="sc-divider-line" />
        <div className="sc-divider-dot" />
        <div className="sc-divider-line r" />
      </div>

      {/* Sections */}
      <div className="sc-sections">
        {sections.map((section, index) => {
          const isOpen = openSections.includes(index);
          return (
            <div key={index} className={`sc-section${isOpen ? ' open' : ''}`}>
              <button className="sc-section-btn" onClick={() => toggleSection(index)}>
                <div className="sc-icon">{section.icon}</div>
                <div className="sc-label-wrap">
                  {section.position && (
                    <span className="sc-position">{section.position}</span>
                  )}
                  <span className="sc-card-name">{section.title}</span>
                </div>
                <div className="sc-chevron">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              <div className={`sc-body${isOpen ? ' open' : ''}`}>
                <div className="sc-body-sep" />
                <div className="sc-body-inner">{section.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthèse / conseil final */}
      {finalMessage && (
        <div className="sc-final">
          <div className="sc-final-head">
            <span className="sc-final-label">
              {t('interpretation.conclusion.title') || 'Ce que tu peux faire maintenant'}
            </span>
            <div className="sc-final-line" />
          </div>
          <p className="sc-final-text">{finalMessage}</p>
        </div>
      )}
    </div>
  );
}