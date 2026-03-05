import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import LegalModal from './LegalModal';
import RestorePremiumModal from './RestorePremiumModal';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGrimoire: () => void;
  onOpenPremium: () => void;
  isPremium: boolean;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export default function MenuDrawer({ isOpen, onClose, onOpenGrimoire, onOpenPremium, isPremium }: MenuDrawerProps) {
  const { t, language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'legal' | 'privacy' | null>(null);
  const [restoreOpen, setRestoreOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (legalModal) { setLegalModal(null); return; }
        if (restoreOpen) { setRestoreOpen(false); return; }
        onClose();
      }
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, legalModal, restoreOpen, onClose]);

  useEffect(() => {
    if (!isOpen) { setLangOpen(false); }
  }, [isOpen]);

  const currentLang = languages.find(l => l.code === language);

  return (
    <>
      <LegalModal isOpen={legalModal !== null} onClose={() => setLegalModal(null)} type={legalModal || 'legal'}/>
      <RestorePremiumModal
        isOpen={restoreOpen}
        onClose={() => setRestoreOpen(false)}
        onRestoreSuccess={() => { setRestoreOpen(false); onClose(); window.location.reload(); }}
      />
      {isOpen && <><style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap');

        .md-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(4,0,16,0.75); backdrop-filter: blur(8px);
          animation: md-fade-in 0.25s ease;
        }
        @keyframes md-fade-in { from{opacity:0} to{opacity:1} }

        .md-drawer {
          position: fixed; top: 0; left: 0; bottom: 0; width: 300px; z-index: 201;
          background: #080514;
          border-right: 1px solid rgba(201,168,76,0.12);
          display: flex; flex-direction: column;
          animation: md-slide-in 0.3s cubic-bezier(0.16,1,0.3,1);
          overflow-y: auto;
          font-family: 'Jost', sans-serif;
        }
        @keyframes md-slide-in { from{transform:translateX(-100%)} to{transform:translateX(0)} }

        /* Header */
        .md-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .md-logo {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 400;
          background: linear-gradient(135deg, #F7F2EA 0%, #E8D080 50%, #C9A84C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .md-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; color: rgba(247,242,234,0.82);
        }
        .md-close:hover { background: rgba(255,255,255,0.08); color: rgba(247,242,234,0.85); }

        /* Nav */
        .md-nav { padding: 12px 14px; flex: 1; display: flex; flex-direction: column; gap: 4px; }

        /* Item standard */
        .md-item {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 14px; border-radius: 10px; cursor: pointer;
          background: transparent; border: 1px solid transparent;
          transition: all 0.22s; width: 100%; text-align: left;
          color: inherit;
        }
        .md-item:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.06);
        }
        .md-item-icon {
          width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.22s;
        }
        .md-item:hover .md-item-icon { background: rgba(255,255,255,0.07); }
        .md-item-texts { flex: 1; min-width: 0; overflow: hidden; }
        .md-item-title {
          font-size: 14px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.92); margin-bottom: 1px;
        }
        .md-item-sub {
          font-size: 11px; font-weight: 200; letter-spacing: 0.2px;
          color: rgba(247,242,234,0.72);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        /* Item gold (grimoire) */
        .md-item-gold .md-item-icon { background: rgba(201,168,76,0.08); border-color: rgba(201,168,76,0.15); }
        .md-item-gold:hover { background: rgba(201,168,76,0.05); border-color: rgba(201,168,76,0.15); }
        .md-item-gold:hover .md-item-icon { background: rgba(201,168,76,0.12); border-color: rgba(201,168,76,0.25); }
        .md-item-gold .md-item-title { color: rgba(232,208,128,0.95); }

        /* Item premium */
        .md-item-premium {
          background: rgba(201,168,76,0.04);
          border-color: rgba(201,168,76,0.15) !important;
        }
        .md-item-premium:hover {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.3) !important;
        }
        .md-item-premium .md-item-icon {
          background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.2);
        }
        .md-item-premium .md-item-title { color: #C9A84C; }
        .md-premium-badge {
          font-size: 9px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.82);
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 3px 8px;
        }
        .md-premium-badge.active {
          color: #C9A84C; background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.2);
        }

        /* Separator */
        .md-sep {
          height: 1px; background: rgba(255,255,255,0.05);
          margin: 8px 14px;
        }
        .md-sep-label {
          font-size: 9px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(247,242,234,0.65); padding: 8px 14px 4px;
        }

        /* Langue */
        .md-lang-list { padding: 4px 8px 0; display: flex; flex-direction: column; gap: 2px; }
        .md-lang-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px; cursor: pointer; width: 100%;
          background: transparent; border: none; text-align: left;
          transition: background 0.2s; color: inherit;
        }
        .md-lang-btn:hover { background: rgba(255,255,255,0.04); }
        .md-lang-btn.active { background: rgba(201,168,76,0.07); }
        .md-lang-flag { font-size: 18px; }
        .md-lang-name { font-size: 13px; font-weight: 300; color: rgba(247,242,234,0.92); flex: 1; }
        .md-lang-btn.active .md-lang-name { color: rgba(201,168,76,0.9); }
        .md-lang-check { font-size: 11px; color: rgba(201,168,76,0.7); }

        /* Legal links */
        .md-legal-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 8px; cursor: pointer; width: 100%;
          background: transparent; border: none; text-align: left;
          font-size: 12px; font-weight: 200; letter-spacing: 0.5px;
          color: rgba(247,242,234,0.78); transition: color 0.2s;
          font-family: 'Jost', sans-serif;
        }
        .md-legal-btn:hover { color: #F7F2EA; }

        /* Footer */
        .md-footer {
          padding: 14px 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 10px; font-weight: 200; letter-spacing: 1px;
          color: rgba(247,242,234,0.55); text-align: center;
        }

        /* Arrow icon */
        .md-arrow { color: rgba(247,242,234,0.6); transition: transform 0.2s; }
        .md-arrow.open { transform: rotate(180deg); }
      `}</style>

      {/* Overlay */}
      <div className="md-overlay" onClick={onClose}/>

      {/* Drawer */}
      <div className="md-drawer">

        {/* Header */}
        <div className="md-head">
          <span className="md-logo">CartoMystik</span>
          <button className="md-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="md-nav">

          {/* Grimoire */}
          <button className="md-item md-item-gold" onClick={() => { onClose(); setTimeout(onOpenGrimoire, 80); }}>
            <div className="md-item-icon">📕</div>
            <div className="md-item-texts">
              <div className="md-item-title">{t('grimoire.title') || 'Grimoire'}</div>
              <div className="md-item-sub">{t('grimoire.subtitle') || 'Vos tirages sauvegardés'}</div>
            </div>
          </button>

          {/* Premium */}
          <button className="md-item md-item-premium" onClick={() => { onClose(); setTimeout(onOpenPremium, 80); }}>
            <div className="md-item-icon">✦</div>
            <div className="md-item-texts" style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:2}}>
                <div className="md-item-title" style={{flex:1}}>{t('premium.title') || 'Premium'}</div>
                <span className={`md-premium-badge ${isPremium ? 'active' : ''}`} style={{flexShrink:0}}>
                  {isPremium ? (t('premium.active') || 'Actif') : 'Upgrade'}
                </span>
              </div>
              <div className="md-item-sub">{t('premium.subtitle') || 'Sans publicité, grimoire illimité'}</div>
            </div>
          </button>

          {/* Restaurer (non-premium only) */}
          {!isPremium && (
            <button className="md-item" onClick={() => setRestoreOpen(true)} style={{borderColor:'rgba(255,255,255,0.05)'}}>
              <div className="md-item-icon" style={{fontSize:'14px'}}>↩</div>
              <div className="md-item-texts">
                <div className="md-item-title" style={{color:'rgba(247,242,234,0.9)'}}>
                  {t('premium.restore.title') || 'Restaurer un abonnement'}
                </div>
                <div className="md-item-sub">{t('premium.restore.subtitle') || 'Déjà Premium ? Récupérez votre accès'}</div>
              </div>
            </button>
          )}

          {/* Langue */}
          <div className="md-sep"/>
          {/* ✅ FIX : libellé section langue traduit */}
          <div className="md-sep-label">{t('menu.language') || 'Langue'}</div>

          <button className="md-item" onClick={() => setLangOpen(v => !v)}>
            <div className="md-item-icon" style={{fontSize:'18px'}}>{currentLang?.flag}</div>
            <div className="md-item-texts">
              <div className="md-item-title">{currentLang?.name}</div>
              {/* ✅ FIX : "Changer la langue" hardcodé → traduit */}
              <div className="md-item-sub">{t('menu.changeLanguage') || 'Change language'}</div>
            </div>
            <svg className={`md-arrow ${langOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {langOpen && (
            <div className="md-lang-list">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`md-lang-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                >
                  <span className="md-lang-flag">{lang.flag}</span>
                  <span className="md-lang-name">{lang.name}</span>
                  {language === lang.code && <span className="md-lang-check">✓</span>}
                </button>
              ))}
            </div>
          )}

          {/* Légal */}
          <div className="md-sep" style={{marginTop: 12}}/>
          <button className="md-legal-btn" onClick={() => setLegalModal('legal')}>
            <span style={{opacity:.5}}>·</span> {t('legal.mentions') || 'Mentions légales'}
          </button>
          <button className="md-legal-btn" onClick={() => setLegalModal('privacy')}>
            <span style={{opacity:.5}}>·</span> {t('legal.privacy') || 'Politique de confidentialité'}
          </button>

        </nav>

        <div className="md-footer">CartoMystik · v1.0</div>
      </div>

      </>}
    </>
  );
}