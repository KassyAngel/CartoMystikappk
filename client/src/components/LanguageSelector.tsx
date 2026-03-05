import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (value: Language) => {
    console.log('👤 Utilisateur change de langue:', language, '→', value);
    setLanguage(value);
    setOpen(false);
  };

  // Fermer si clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find(l => l.code === language);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400&display=swap');

        .ls-wrap { position: relative; font-family: 'Jost', sans-serif; }

        .ls-trigger {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 12px; cursor: pointer;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; transition: all 0.22s;
          user-select: none;
        }
        .ls-trigger:hover {
          background: rgba(201,168,76,0.07);
          border-color: rgba(201,168,76,0.3);
        }

        .ls-globe {
          width: 13px; height: 13px; color: rgba(201,168,76,0.65); flex-shrink: 0;
        }
        .ls-code {
          font-size: 12px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.75);
        }
        .ls-chevron {
          width: 10px; height: 10px; color: rgba(247,242,234,0.35);
          transition: transform 0.22s;
        }
        .ls-chevron.open { transform: rotate(180deg); }

        /* Dropdown */
        .ls-dropdown {
          position: absolute; top: calc(100% + 6px); right: 0;
          min-width: 150px;
          background: #08050f;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          animation: ls-drop 0.18s cubic-bezier(0.16,1,0.3,1);
          z-index: 999;
        }
        @keyframes ls-drop {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .ls-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .ls-item:last-child { border-bottom: none; }
        .ls-item:hover { background: rgba(201,168,76,0.07); }
        .ls-item.active { background: rgba(201,168,76,0.05); }

        .ls-item-flag { font-size: 16px; line-height: 1; }
        .ls-item-code {
          font-size: 9px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.35); width: 18px; flex-shrink: 0;
        }
        .ls-item-name {
          font-size: 13px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.75); flex: 1;
        }
        .ls-item.active .ls-item-name { color: rgba(201,168,76,0.9); }
        .ls-item-check {
          font-size: 10px; color: rgba(201,168,76,0.7);
          opacity: 0; transition: opacity 0.15s;
        }
        .ls-item.active .ls-item-check { opacity: 1; }
      `}</style>

      <div className="ls-wrap" ref={ref}>
        <div className="ls-trigger" onClick={() => setOpen(v => !v)} data-testid="select-language">
          {/* Globe SVG inline */}
          <svg className="ls-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="ls-code">{language.toUpperCase()}</span>
          <svg className={`ls-chevron ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>

        {open && (
          <div className="ls-dropdown">
            {languages.map(lang => (
              <div
                key={lang.code}
                className={`ls-item ${language === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
                data-testid={`option-${lang.code}`}
              >
                <span className="ls-item-flag">{lang.flag}</span>
                <span className="ls-item-code">{lang.code}</span>
                <span className="ls-item-name">{lang.name}</span>
                <span className="ls-item-check">✓</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}