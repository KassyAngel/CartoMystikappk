import React, { useState, useMemo } from "react";
import { Reading } from "@/App";
import { useLanguage } from "@/contexts/LanguageContext";

interface GrimoireModalProps {
  isPremium: boolean;
  readings: Reading[];
  onSaveNote: (readingId: string, note: string) => Promise<void>;
  onToggleFavorite: (readingId: string) => Promise<void>;
  onClose: () => void;
  onClearAll?: () => Promise<void>;
}

const GrimoireModal = ({
  isPremium,
  readings,
  onSaveNote,
  onToggleFavorite,
  onClose,
  onClearAll,
}: GrimoireModalProps) => {
  const [expandedReadings, setExpandedReadings] = useState<Set<string>>(new Set());
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { t, language } = useLanguage();

  // 🔧 Dédupliquer les lectures
  const uniqueReadings = useMemo(() => {
    const seen = new Map<string, Reading>();
    readings.forEach(reading => {
      const dateKey = new Date(reading.date).toISOString().split('T')[0];
      const cardsKey = reading.cards ? reading.cards.sort().join(',') : '';
      const key = `${dateKey}-${reading.type}-${cardsKey}`;
      if (!seen.has(key)) seen.set(key, reading);
    });
    return Array.from(seen.values()).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [readings]);

  const totalReadings = uniqueReadings.length;
  const readingsThisMonth = useMemo(() => {
    const now = new Date();
    return uniqueReadings.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [uniqueReadings]);

  const handleClearAll = async () => {
    if (!onClearAll) return;
    try {
      await onClearAll();
      setShowConfirmDelete(false);
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ Toggle identique à l'original — crée un nouveau Set à chaque fois
  const toggleExpand = (id: string) => {
    setExpandedReadings(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const displayedReadings = isPremium ? uniqueReadings : uniqueReadings.slice(0, 3);

  const getOracleBadge = (type: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      tarot:       { label: t("grimoire.oracle.tarot"),       color: '#A87FC9' },
      angels:      { label: t("grimoire.oracle.angels"),      color: '#7FA8C9' },
      runes:       { label: t("grimoire.oracle.runes"),       color: '#C9A84C' },
      oracle:      { label: t("grimoire.oracle.daily"),       color: '#C9A84C' },
      crystalBall: { label: t("grimoire.oracle.crystalBall"), color: '#7FC9A8' },
      horoscope:   { label: t("grimoire.oracle.horoscope"),   color: '#C97FA8' },
      daily:       { label: t("grimoire.oracle.daily"),       color: '#C9A84C' },
    };
    return badges[type] || badges.oracle;
  };

  const normalizeCardName = (cardName: string | undefined | null): string => {
    if (!cardName || typeof cardName !== 'string') return '';
    return cardName.trim().replace(/[''\s-]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const translateCardName = (cardName: string | undefined, readingType: string): string => {
    if (!cardName || typeof cardName !== 'string') return '';
    const oracleKeyMap: Record<string, string> = { tarot: 'tarot', angels: 'angels', runes: 'runes', oracle: 'daily', daily: 'daily' };
    const oracleKey = oracleKeyMap[readingType] || 'daily';
    const normalizedName = normalizeCardName(cardName);
    if (!normalizedName) return cardName;
    const keys = [
      `cards.${oracleKey}.${normalizedName}.name`,
      `cards.${oracleKey}.${normalizedName}`,
      `${oracleKey}.cards.${normalizedName}.name`,
    ];
    for (const key of keys) {
      const translated = t(key);
      if (translated && translated !== key && translated !== cardName) return translated;
    }
    return cardName;
  };

  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    const localeMap: Record<string, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', de: 'de-DE', it: 'it-IT' };
    const locale = localeMap[language] || 'en-US';
    return {
      date: d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .gm-overlay {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(4,0,16,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          font-family: 'Jost', sans-serif;
        }

        .gm-modal {
          background: #07040f;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          width: 100%; max-width: 520px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .gm-c { position:absolute; width:8px; height:8px; border-color:rgba(201,168,76,0.3); border-style:solid; z-index:2; pointer-events:none; }
        .gm-tl{top:0;left:0;border-width:1px 0 0 1px}
        .gm-tr{top:0;right:0;border-width:1px 1px 0 0}
        .gm-bl{bottom:0;left:0;border-width:0 0 1px 1px}
        .gm-br{bottom:0;right:0;border-width:0 1px 1px 0}

        /* Header */
        .gm-head {
          padding: 22px 22px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
          background: radial-gradient(ellipse 120% 100% at 50% -20%, rgba(70,30,160,0.1) 0%, transparent 65%);
        }
        .gm-head-left { display: flex; flex-direction: column; gap: 2px; }
        .gm-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 300; font-style: italic;
          color: #E8D080; letter-spacing: 0.3px; margin: 0;
        }
        .gm-subtitle {
          font-size: 10px; font-weight: 200; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.65);
        }
        .gm-close {
          width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(247,242,234,0.6); transition: all 0.2s;
        }
        .gm-close:hover { color: #F7F2EA; background: rgba(255,255,255,0.1); }

        /* Stats */
        .gm-stats {
          display: flex; align-items: center;
          padding: 14px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          flex-shrink: 0;
        }
        .gm-stat { flex: 1; text-align: center; padding: 8px 0; }
        .gm-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 300; color: #E8D080; line-height: 1;
        }
        .gm-stat-label {
          font-size: 9px; font-weight: 200; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.72); margin-top: 4px;
        }
        .gm-stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.06); }
        .gm-clear-btn {
          margin-left: 16px; padding: 8px 14px; flex-shrink: 0;
          background: rgba(200,60,60,0.07);
          border: 1px solid rgba(200,60,60,0.2); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(220,100,100,0.85); cursor: pointer; transition: all 0.22s;
        }
        .gm-clear-btn:hover { background: rgba(200,60,60,0.12); border-color: rgba(200,60,60,0.4); color: rgba(220,100,100,1); }

        /* Banners */
        .gm-banner {
          margin: 12px 22px 0; padding: 10px 14px; border-radius: 6px;
          font-size: 12px; font-weight: 300; line-height: 1.5;
          flex-shrink: 0;
        }
        .gm-banner-free { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.15); color: rgba(201,168,76,0.92); }
        .gm-banner-premium { background: rgba(127,201,168,0.05); border: 1px solid rgba(127,201,168,0.15); color: rgba(127,201,168,0.88); }

        /* Confirm delete */
        .gm-confirm {
          margin: 12px 22px 0; padding: 16px 18px; border-radius: 6px;
          background: rgba(180,40,40,0.08); border: 1px solid rgba(180,40,40,0.2);
          text-align: center; flex-shrink: 0;
        }
        .gm-confirm-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 300; color: rgba(230,120,120,0.95); margin-bottom: 6px;
        }
        .gm-confirm-sub { font-size: 12px; font-weight: 200; color: rgba(247,242,234,0.72); margin-bottom: 14px; }
        .gm-confirm-btns { display: flex; gap: 8px; justify-content: center; }
        .gm-confirm-cancel {
          padding: 9px 20px; background: transparent;
          border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(247,242,234,0.72); cursor: pointer; transition: all 0.2s;
        }
        .gm-confirm-cancel:hover { border-color: rgba(255,255,255,0.3); color: #F7F2EA; }
        .gm-confirm-delete {
          padding: 9px 20px; background: rgba(180,40,40,0.15);
          border: 1px solid rgba(180,40,40,0.35); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 300;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(220,100,100,0.95); cursor: pointer; transition: all 0.2s;
        }
        .gm-confirm-delete:hover { background: rgba(180,40,40,0.25); border-color: rgba(180,40,40,0.55); }

        /* Zone scrollable */
        .gm-list {
          flex: 1;
          overflow-y: auto;
          padding: 14px 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 0;
        }
        .gm-list::-webkit-scrollbar { width: 3px; }
        .gm-list::-webkit-scrollbar-track { background: transparent; }
        .gm-list::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }

        /* Empty */
        .gm-empty {
          text-align: center; padding: 48px 24px;
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.6);
        }
        .gm-empty-sub { font-size: 13px; margin-top: 8px; opacity: 0.8; }

        /* Reading card */
        .gm-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          transition: border-color 0.22s;
        }
        .gm-card:hover { border-color: rgba(255,255,255,0.12); }

        .gm-card-head {
          padding: 12px 14px 10px;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .gm-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 20px;
          font-size: 10px; font-weight: 300; letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid; flex-shrink: 0;
        }
        .gm-badge-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .gm-fav-star { font-size: 13px; color: #C9A84C; flex-shrink: 0; }
        .gm-date { text-align: right; font-size: 11px; font-weight: 200; color: rgba(247,242,234,0.65); line-height: 1.6; flex-shrink: 0; }

        /* Cards */
        .gm-cards-section { padding: 10px 14px 0; }
        .gm-cards-label {
          font-size: 9px; font-weight: 300; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(247,242,234,0.65); margin-bottom: 8px;
        }
        .gm-cards-list { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .gm-chip {
          padding: 4px 10px; border-radius: 4px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          font-size: 11px; font-weight: 200; color: rgba(247,242,234,0.88);
        }

        /* Expand button */
        .gm-expand-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px; cursor: pointer; width: 100%;
          background: transparent; border: none;
          border-top: 1px solid rgba(255,255,255,0.04);
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 300;
          letter-spacing: 1px; color: rgba(247,242,234,0.72); transition: color 0.2s;
          text-align: left;
        }
        .gm-expand-btn:hover { color: #F7F2EA; }
        .gm-expand-chevron { font-size: 10px; transition: transform 0.25s; display: inline-block; }
        .gm-expand-chevron.open { transform: rotate(180deg); }

        /* Interprétation */
        .gm-interp {
          padding: 14px 16px;
          margin: 0 14px 10px;
          border-radius: 8px;
          background: rgba(70,30,160,0.08);
          border: 1px solid rgba(201,168,76,0.1);
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.92);
          line-height: 1.9;
          white-space: pre-wrap;
          word-break: break-word;
        }

        /* Notes */
        .gm-notes { padding: 0 14px 10px; }
        .gm-notes-label {
          font-size: 9px; font-weight: 300; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(247,242,234,0.65); margin-bottom: 6px; display: block;
        }
        .gm-notes-input {
          width: 100%; box-sizing: border-box;
          padding: 9px 0;
          background: transparent;
          border: none; border-bottom: 1px solid rgba(255,255,255,0.1);
          font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 200;
          color: rgba(247,242,234,0.88); outline: none; transition: border-color 0.2s;
        }
        .gm-notes-input:focus { border-bottom-color: rgba(201,168,76,0.45); }
        .gm-notes-input::placeholder { color: rgba(247,242,234,0.35); }

        /* Actions */
        .gm-actions { padding: 8px 14px 12px; display: flex; gap: 8px; }
        .gm-fav-btn {
          padding: 8px 16px; border-radius: 4px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 300;
          letter-spacing: 2px; text-transform: uppercase; transition: all 0.22s;
        }
        .gm-fav-btn-off {
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(247,242,234,0.65);
        }
        .gm-fav-btn-off:hover { border-color: rgba(201,168,76,0.4); color: rgba(201,168,76,0.9); }
        .gm-fav-btn-on {
          background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.35);
          color: rgba(201,168,76,0.95);
        }
        .gm-fav-btn-on:hover { background: rgba(201,168,76,0.18); }
      `}</style>

      <div className="gm-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="gm-modal">
          {/* Coins déco */}
          <div className="gm-c gm-tl"/><div className="gm-c gm-tr"/>
          <div className="gm-c gm-bl"/><div className="gm-c gm-br"/>

          {/* Header */}
          <div className="gm-head">
            <div className="gm-head-left">
              <div className="gm-title">{t("grimoire.title") || 'Grimoire'}</div>
              <div className="gm-subtitle">{t("grimoire.subtitle") || 'Vos tirages sauvegardés'}</div>
            </div>
            <button className="gm-close" onClick={onClose} aria-label="Fermer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="gm-stats">
            <div className="gm-stat">
              <div className="gm-stat-num">{totalReadings}</div>
              <div className="gm-stat-label">{t("grimoire.stats.total") || "Total"}</div>
            </div>
            <div className="gm-stat-divider"/>
            <div className="gm-stat">
              <div className="gm-stat-num">{readingsThisMonth}</div>
              <div className="gm-stat-label">{t("grimoire.stats.thisMonth") || "Ce mois"}</div>
            </div>
            {onClearAll && totalReadings > 0 && (
              <button className="gm-clear-btn" onClick={() => setShowConfirmDelete(true)}>
                {t("grimoire.clearAll.button") || "Effacer"}
              </button>
            )}
          </div>

          {/* Confirm delete */}
          {showConfirmDelete && (
            <div className="gm-confirm">
              <div className="gm-confirm-title">{t("grimoire.clearAll.confirm.title") || "Confirmer la suppression"}</div>
              <div className="gm-confirm-sub">{t("grimoire.clearAll.confirm.message") || "Cette action est irréversible."}</div>
              <div className="gm-confirm-btns">
                <button className="gm-confirm-cancel" onClick={() => setShowConfirmDelete(false)}>
                  {t("common.cancel") || "Annuler"}
                </button>
                <button className="gm-confirm-delete" onClick={handleClearAll}>
                  {t("grimoire.clearAll.confirm.button") || "Supprimer"}
                </button>
              </div>
            </div>
          )}

          {/* Banners */}
          {!isPremium && (
            <div className="gm-banner gm-banner-free">
              <div style={{fontWeight:400, marginBottom:2}}>✦ {t("grimoire.free.title")}</div>
              <div style={{fontSize:11, opacity:.9}}>{t("grimoire.free.subtitle")}</div>
            </div>
          )}
          {isPremium && (
            <div className="gm-banner gm-banner-premium">
              ✦ {t("grimoire.premium.active")}
            </div>
          )}

          {/* Liste scrollable */}
          <div className="gm-list">
            {displayedReadings.length === 0 ? (
              <div className="gm-empty">
                <div>{t("grimoire.empty.title") || "Aucun tirage sauvegardé"}</div>
                <div className="gm-empty-sub">{t("grimoire.empty.subtitle")}</div>
              </div>
            ) : (
              displayedReadings.map(reading => {
                const badge = getOracleBadge(reading.type);
                const { date, time } = formatDateTime(reading.date);
                const isExpanded = expandedReadings.has(reading.id);

                return (
                  <div key={reading.id} className="gm-card">

                    {/* Card header */}
                    <div className="gm-card-head">
                      <div style={{display:'flex', alignItems:'center', gap:8, flex:1, minWidth:0}}>
                        <div
                          className="gm-badge"
                          style={{
                            color: badge.color,
                            borderColor: `${badge.color}30`,
                            background: `${badge.color}10`,
                          }}
                        >
                          <div className="gm-badge-dot" style={{background: badge.color}}/>
                          {badge.label}
                        </div>
                        {reading.isFavorite && <span className="gm-fav-star">★</span>}
                      </div>
                      <div className="gm-date">
                        <div>{date}</div>
                        <div>{time}</div>
                      </div>
                    </div>

                    {/* Cartes tirées */}
                    {reading.cards && Array.isArray(reading.cards) && reading.cards.length > 0 && (
                      <div className="gm-cards-section">
                        <div className="gm-cards-label">{t("grimoire.cards.title") || "Cartes tirées"}</div>
                        <div className="gm-cards-list">
                          {reading.cards
                            .filter(c => c && typeof c === 'string')
                            .map((card, idx) => (
                              <span key={idx} className="gm-chip">
                                {translateCardName(card, reading.type) || card}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Bouton expand */}
                    {reading.answer && (
                      <button
                        className="gm-expand-btn"
                        onClick={() => toggleExpand(reading.id)}
                        type="button"
                      >
                        <span>
                          {isExpanded
                            ? t("grimoire.interpretation.hide") || "Masquer l'interprétation"
                            : t("grimoire.interpretation.show") || "Afficher l'interprétation"
                          }
                        </span>
                        <span className={`gm-expand-chevron${isExpanded ? ' open' : ''}`}>▾</span>
                      </button>
                    )}

                    {/* Interprétation complète */}
                    {isExpanded && reading.answer && (
                      <div className="gm-interp">
                        {reading.answer}
                      </div>
                    )}

                    {/* Notes */}
                    <div className="gm-notes" style={{marginTop: reading.answer ? 0 : 8}}>
                      <label className="gm-notes-label">{t("grimoire.notes.title") || "Notes"}</label>
                      <input
                        type="text"
                        className="gm-notes-input"
                        defaultValue={reading.notes}
                        onBlur={e => onSaveNote(reading.id, e.target.value)}
                        placeholder={t("grimoire.notes.placeholder") || "Ajoutez vos réflexions…"}
                      />
                    </div>

                    {/* Actions */}
                    <div className="gm-actions">
                      <button
                        className={`gm-fav-btn ${reading.isFavorite ? 'gm-fav-btn-on' : 'gm-fav-btn-off'}`}
                        onClick={() => onToggleFavorite(reading.id)}
                        type="button"
                      >
                        {reading.isFavorite
                          ? `★ ${t("grimoire.favorite.remove")}`
                          : `☆ ${t("grimoire.favorite.add")}`}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GrimoireModal;