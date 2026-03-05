import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CardSection {
  icon: string;
  title: string;
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
  isVisible = false, className, openFirst = false, onSectionOpen
}: SummaryCardProps) {
  const [openSections, setOpenSections] = useState<number[]>(openFirst ? [0] : []);
  const { t } = useLanguage();

  if (!isVisible) return null;

  const toggleSection = async (index: number) => {
    const isOpening = !openSections.includes(index);
    setOpenSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    if (isOpening && onSectionOpen && sections?.[index]) {
      const result = onSectionOpen(sections[index].title);
      if (result instanceof Promise) result.catch(() => {});
    }
  };

  // Format ancien (horoscope)
  if (content && !sections) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 12,
        padding: '28px 24px',
        maxWidth: 480,
        margin: '0 auto',
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');`}</style>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20, fontWeight: 300,
          color: '#E8D080', textAlign: 'center',
          marginBottom: 20, letterSpacing: 0.5,
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
    <div style={{
      width: '100%', maxWidth: 480, margin: '0 auto',
      fontFamily: "'Jost', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .sc-container { position: relative; }

        .sc-header {
          text-align: center;
          margin-bottom: 20px;
        }

        /* ✅ FIX lisibilité : 0.7 → 0.95 */
        .sc-eyebrow {
          font-size: 9px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(220,185,90,1.0); margin-bottom: 8px;
        }
        .sc-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(20px, 5vw, 26px); font-weight: 300;
          color: #F7F2EA; letter-spacing: 0.5px; margin: 0;
        }
        .sc-title em { font-style: italic; color: #F0DC88; }

        .sc-divider {
          display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
        }
        .sc-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3));
        }
        .sc-divider-line.right {
          background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent);
        }
        .sc-divider-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(201,168,76,0.65);
        }

        .sc-sections { display: flex; flex-direction: column; gap: 8px; }

        .sc-section {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .sc-section.open { border-color: rgba(201,168,76,0.30); }

        .sc-section-btn {
          width: 100%; display: flex; align-items: center;
          padding: 16px 18px; gap: 14px;
          background: none; border: none; cursor: pointer;
          text-align: left; transition: background 0.25s;
        }
        .sc-section-btn:hover { background: rgba(201,168,76,0.05); }

        .sc-section-icon {
          width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          transition: background 0.3s, border-color 0.3s;
        }
        .sc-section.open .sc-section-icon {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.38);
        }

        /* ✅ FIX lisibilité titre carte : blanc pur */
        .sc-section-label {
          flex: 1;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 16px; font-weight: 400; letter-spacing: 0.3px;
          color: #F7F2EA;
        }
        /* ✅ FIX lisibilité titre ouvert : or vif */
        .sc-section.open .sc-section-label { color: #F0DC88; }

        /* ✅ FIX lisibilité chevron : 0.4 → 0.70 */
        .sc-chevron {
          width: 16px; height: 16px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: rgba(220,185,90,1.0);
          transition: transform 0.3s ease, color 0.3s;
        }
        .sc-section.open .sc-chevron { transform: rotate(180deg); color: rgba(220,185,90,1.0); }
        .sc-chevron svg { width: 14px; height: 14px; }

        .sc-section-body {
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
          max-height: 0; opacity: 0;
        }
        .sc-section-body.open { max-height: 800px; opacity: 1; }

        /* ✅ FIX lisibilité contenu : 0.85 → 0.92 */
        .sc-section-content {
          padding: 0 18px 18px 68px;
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.92); line-height: 1.9;
          white-space: pre-line;
        }

        .sc-final {
          margin-top: 12px;
          background: rgba(201,168,76,0.05);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 10px;
          padding: 20px;
        }
        .sc-final-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
        }
        .sc-final-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.25), transparent);
        }
        /* ✅ FIX lisibilité label conseil : 0.7 → 0.95 */
        .sc-final-label {
          font-size: 9px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(220,185,90,1.0);
        }
        /* ✅ FIX lisibilité texte conseil : 0.82 → 0.92 */
        .sc-final-text {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.92); line-height: 1.9;
          white-space: pre-line;
        }
      `}</style>

      <div className="sc-container">

        {/* ✅ FIX : "Votre lecture" hardcodé → clé de traduction */}
        <div className="sc-header">
          <div className="sc-eyebrow">
            {t('revelation.summary.eyebrow') || t('interpretation.label.reading') || 'Your reading'}
          </div>
          <h3 className="sc-title"><em>{title}</em></h3>
        </div>

        <div className="sc-divider">
          <div className="sc-divider-line"/>
          <div className="sc-divider-dot"/>
          <div className="sc-divider-line right"/>
        </div>

        <div className="sc-sections">
          {sections.map((section, index) => {
            const isOpen = openSections.includes(index);
            return (
              <div key={index} className={`sc-section ${isOpen ? 'open' : ''}`}>
                <button className="sc-section-btn" onClick={() => toggleSection(index)}>
                  <div className="sc-section-icon">{section.icon}</div>
                  <span className="sc-section-label">{section.title}</span>
                  <div className="sc-chevron">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </button>
                <div className={`sc-section-body ${isOpen ? 'open' : ''}`}>
                  <div className="sc-section-content">{section.content}</div>
                </div>
              </div>
            );
          })}
        </div>

        {finalMessage && (
          <div className="sc-final">
            <div className="sc-final-header">
              <div className="sc-final-label">
                {t('interpretation.advice.title') || 'Your personal advice'}
              </div>
              <div className="sc-final-line"/>
            </div>
            <p className="sc-final-text">{finalMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}