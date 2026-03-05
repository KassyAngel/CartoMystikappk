import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getZodiacSign } from '@/data/oracleData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditProfileModal({ isOpen, onClose, onSaved }: EditProfileModalProps) {
  const { user, updateUser } = useUser();
  const { t } = useLanguage();

  const [name, setName] = useState(user?.name || '');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState(user?.gender || '');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setTimeout(() => setMounted(true), 40);
    else setMounted(false);
  }, [isOpen]);

  useEffect(() => {
    if (user?.birthDate) {
      try {
        const date = new Date(user.birthDate);
        setDay(date.getDate().toString());
        setMonth((date.getMonth() + 1).toString());
        setYear(date.getFullYear().toString());
      } catch (error) {
        console.error('Error parsing birth date:', error);
      }
    }
  }, [user?.birthDate]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleSave = () => {
    if (!name || !day || !month || !year || !gender) {
      alert(t('profile.edit.error') || 'Veuillez remplir tous les champs');
      return;
    }
    try {
      const birthDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const zodiacSign = getZodiacSign(parseInt(month), parseInt(day));
      updateUser({ name, birthDate, gender, zodiacSign });
      onSaved();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Une erreur est survenue lors de la sauvegarde');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: t(`date.months.${i + 1}`)
  }));
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const isValid = !!(name && day && month && year && gender);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .ep-overlay {
          position: fixed; inset: 0; z-index: 400;
          background: rgba(4,0,16,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: ep-fadein 0.22s ease;
          font-family: 'Jost', sans-serif;
        }
        @keyframes ep-fadein { from{opacity:0} to{opacity:1} }

        .ep-card {
          width: 100%; max-width: 340px;
          background: #07040f;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 3px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
          transform: translateY(16px); opacity: 0;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.38s ease;
          scrollbar-width: thin;
          scrollbar-color: rgba(201,168,76,0.15) transparent;
        }
        .ep-card::-webkit-scrollbar { width: 3px; }
        .ep-card::-webkit-scrollbar-track { background: transparent; }
        .ep-card::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 3px; }
        .ep-card.vis { transform: translateY(0); opacity: 1; }

        .ep-c { position:absolute; width:8px; height:8px; border-color:rgba(201,168,76,0.35); border-style:solid; }
        .ep-tl{top:0;left:0;border-width:1px 0 0 1px}
        .ep-tr{top:0;right:0;border-width:1px 1px 0 0}
        .ep-bl{bottom:0;left:0;border-width:0 0 1px 1px}
        .ep-br{bottom:0;right:0;border-width:0 1px 1px 0}

        .ep-header {
          padding: 32px 28px 22px;
          background: radial-gradient(ellipse 130% 90% at 50% 0%, rgba(70,30,160,0.1) 0%, transparent 65%);
          position: relative;
        }

        .ep-close {
          position: absolute; top: 12px; right: 12px;
          width: 26px; height: 26px; border-radius: 5px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(247,242,234,0.6); transition: all 0.2s;
        }
        .ep-close:hover { color: #F7F2EA; background: rgba(255,255,255,0.1); }

        .ep-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 300; font-style: italic;
          color: #E8D080; margin: 0 0 4px;
        }
        .ep-subtitle {
          font-size: 10px; font-weight: 300; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(247,242,234,0.65);
        }

        .ep-divider {
          height: 1px; margin: 0 28px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.14), transparent);
        }

        .ep-body { padding: 20px 18px 14px; display: flex; flex-direction: column; gap: 14px; }

        .ep-field-label {
          display: block;
          font-size: 9px; font-weight: 300; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(247,242,234,0.72);
          margin-bottom: 7px;
        }

        .ep-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 11px 14px;
          color: #F7F2EA;
          font-size: 14px; font-weight: 300;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.2px;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .ep-input::placeholder { color: rgba(247,242,234,0.35); }
        .ep-input:focus {
          border-color: rgba(201,168,76,0.45);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.07);
        }

        .ep-date-row { display: flex; gap: 6px; }
        .ep-select-wrap { flex: 1; position: relative; }

        .ep-select {
          width: 100%; box-sizing: border-box;
          appearance: none; -webkit-appearance: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 11px 24px 11px 10px;
          color: #F7F2EA;
          font-size: 13px; font-weight: 300;
          font-family: 'Jost', sans-serif;
          cursor: pointer; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ep-select option { background: #0d0918; color: #F7F2EA; }
        .ep-select:focus {
          border-color: rgba(201,168,76,0.45);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.07);
        }
        .ep-select-arrow {
          position: absolute; right: 8px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(201,168,76,0.6);
        }

        .ep-gender-list { display: flex; flex-direction: column; gap: 5px; }
        .ep-gender-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 13px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          cursor: pointer; transition: all 0.2s; width: 100%;
        }
        .ep-gender-btn:hover { border-color: rgba(201,168,76,0.2); background: rgba(255,255,255,0.05); }
        .ep-gender-btn.active { border-color: rgba(201,168,76,0.45); background: rgba(201,168,76,0.07); }

        .ep-radio {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s;
        }
        .ep-gender-btn.active .ep-radio { border-color: rgba(201,168,76,0.8); }
        .ep-radio-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #C9A84C;
          transform: scale(0); transition: transform 0.2s;
        }
        .ep-gender-btn.active .ep-radio-dot { transform: scale(1); }

        .ep-gender-icon { font-size: 14px; color: rgba(201,168,76,0.75); }
        .ep-gender-label {
          font-size: 14px; font-weight: 300;
          color: rgba(247,242,234,0.82); letter-spacing: 0.2px;
          transition: color 0.2s;
        }
        .ep-gender-btn.active .ep-gender-label { color: #F7F2EA; }
        .ep-gender-check {
          margin-left: auto; font-size: 11px;
          color: rgba(201,168,76,0.85);
          opacity: 0; transition: opacity 0.2s;
        }
        .ep-gender-btn.active .ep-gender-check { opacity: 1; }

        .ep-footer { padding: 6px 18px 24px; display: flex; gap: 8px; }

        .ep-btn {
          flex: 1; padding: 13px;
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 300;
          letter-spacing: 3.5px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
        }
        .ep-btn-cancel {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(247,242,234,0.72);
        }
        .ep-btn-cancel:hover { border-color: rgba(255,255,255,0.3); color: #F7F2EA; }
        .ep-btn-save {
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.45);
          color: rgba(201,168,76,0.95);
        }
        .ep-btn-save:hover:not(:disabled) {
          background: rgba(201,168,76,0.15);
          border-color: rgba(201,168,76,0.7);
          color: #E8D080;
        }
        .ep-btn-save:disabled { opacity: 0.35; cursor: not-allowed; }
        .ep-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      <div className="ep-overlay" onClick={handleOverlayClick}>
        <div className={`ep-card ${mounted ? 'vis' : ''}`}>

          <div className="ep-c ep-tl"/><div className="ep-c ep-tr"/>
          <div className="ep-c ep-bl"/><div className="ep-c ep-br"/>

          <div className="ep-header">
            <button className="ep-close" onClick={onClose} aria-label="Fermer">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <h2 className="ep-title">✏️ {t('profile.edit.title') || 'Modifier mon profil'}</h2>
            <p className="ep-subtitle">{t('profile.edit.subtitle') || 'Informations personnelles'}</p>
          </div>

          <div className="ep-divider"/>

          <div className="ep-body">

            <div>
              <label className="ep-field-label">{t('name.label') || 'Nom'}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ep-input"
                placeholder={t('name.placeholder') || 'Votre nom'}
              />
            </div>

            <div>
              <label className="ep-field-label">{t('date.title') || 'Date de naissance'}</label>
              <div className="ep-date-row">
                <div className="ep-select-wrap">
                  <select value={day} onChange={(e) => setDay(e.target.value)} className="ep-select">
                    <option value="">{t('date.day') || 'Jour'}</option>
                    {dayOptions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <svg className="ep-select-arrow" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="ep-select-wrap">
                  <select value={month} onChange={(e) => setMonth(e.target.value)} className="ep-select">
                    <option value="">{t('date.month') || 'Mois'}</option>
                    {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <svg className="ep-select-arrow" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="ep-select-wrap">
                  <select value={year} onChange={(e) => setYear(e.target.value)} className="ep-select">
                    <option value="">{t('date.year') || 'Année'}</option>
                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <svg className="ep-select-arrow" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="ep-field-label">{t('gender.title') || 'Genre'}</label>
              <div className="ep-gender-list">
                {[
                  { value: 'homme', label: t('gender.male') || 'Homme', icon: '♂' },
                  { value: 'femme', label: t('gender.female') || 'Féminin', icon: '♀' },
                  { value: 'autre', label: t('gender.other') || 'Autre', icon: '⚥' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setGender(opt.value)}
                    className={`ep-gender-btn${gender === opt.value ? ' active' : ''}`}
                  >
                    <div className="ep-radio"><div className="ep-radio-dot"/></div>
                    <span className="ep-gender-icon">{opt.icon}</span>
                    <span className="ep-gender-label">{opt.label}</span>
                    <span className="ep-gender-check">✓</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ep-footer">
            <button className="ep-btn ep-btn-cancel" onClick={onClose}>
              {t('common.cancel') || 'Annuler'}
            </button>
            <button className="ep-btn ep-btn-save" onClick={handleSave} disabled={!isValid}>
              {t('common.save') || 'Sauvegarder'}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}