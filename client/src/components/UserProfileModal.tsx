import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import EditProfileModal from './EditProfileModal';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user } = useUser();
  const { t } = useLanguage();
  const [showEdit, setShowEdit] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) { setTimeout(() => setMounted(true), 40); }
    else { setMounted(false); setShowEdit(false); }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showEdit) { setShowEdit(false); return; }
        onClose();
      }
    };
    if (isOpen) { document.addEventListener('keydown', handleEsc); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', handleEsc); document.body.style.overflow = ''; };
  }, [isOpen, showEdit, onClose]);

  if (!isOpen || !user) return null;

  const formatDate = (d: string) => {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  const genderLabel = (g: string) => {
    const map: Record<string, string> = {
      homme: t('gender.male') || 'Homme',
      femme: t('gender.female') || 'Féminin',
      autre: t('gender.other') || 'Autre',
    };
    return map[g] || g;
  };

  const zodiacMap: Record<string, string> = {
    'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini', 'Cancer': 'cancer',
    'Lion': 'leo', 'Vierge': 'virgo', 'Balance': 'libra', 'Scorpion': 'scorpio',
    'Sagittaire': 'sagittarius', 'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces',
    'Aries': 'aries', 'Taurus': 'taurus', 'Gemini': 'gemini', 'Leo': 'leo', 'Virgo': 'virgo',
    'Libra': 'libra', 'Scorpio': 'scorpio', 'Sagittarius': 'sagittarius', 'Capricorn': 'capricorn',
    'Aquarius': 'aquarius', 'Pisces': 'pisces',
  };

  const zodiacKey = user.zodiacSign?.name ? (zodiacMap[user.zodiacSign.name] || user.zodiacSign.name.toLowerCase()) : '';
  const zodiacName = zodiacKey ? (t(`zodiac.signs.${zodiacKey}`) || user.zodiacSign?.name || '') : '';
  const genderSymbol = user.gender === 'homme' ? '♂' : user.gender === 'femme' ? '♀' : '⚥';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .up-overlay {
          position: fixed; inset: 0;
          z-index: 300;
          background: rgba(4,0,16,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: up-in 0.22s ease;
          font-family: 'Jost', sans-serif;
        }
        @keyframes up-in { from{opacity:0} to{opacity:1} }

        .up-card {
          width: 100%; max-width: 320px;
          background: #07040f;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 3px;
          position: relative;
          transform: translateY(16px); opacity: 0;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.38s ease;
        }
        .up-card.vis { transform: translateY(0); opacity: 1; }

        .up-c { position:absolute; width:8px; height:8px; border-color:rgba(201,168,76,0.35); border-style:solid; }
        .up-tl{top:0;left:0;border-width:1px 0 0 1px}
        .up-tr{top:0;right:0;border-width:1px 1px 0 0}
        .up-bl{bottom:0;left:0;border-width:0 0 1px 1px}
        .up-br{bottom:0;right:0;border-width:0 1px 1px 0}

        .up-close {
          position:absolute; top:12px; right:12px;
          width:26px; height:26px; border-radius:5px;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; color:rgba(247,242,234,0.35); transition:all 0.2s;
        }
        .up-close:hover { color:rgba(247,242,234,0.75); background:rgba(255,255,255,0.07); }

        /* Top section */
        .up-top {
          display:flex; flex-direction:column; align-items:center;
          padding:40px 28px 28px; text-align:center;
          background:radial-gradient(ellipse 130% 90% at 50% 0%, rgba(70,30,160,0.12) 0%, transparent 65%);
        }
        .up-avatar {
          width:68px; height:68px; border-radius:50%;
          border:1px solid rgba(201,168,76,0.28);
          background:radial-gradient(ellipse, rgba(90,50,200,0.18) 0%, rgba(5,3,14,1) 75%);
          display:flex; align-items:center; justify-content:center;
          font-size:26px; margin-bottom:14px;
          box-shadow:0 0 0 5px rgba(201,168,76,0.05), 0 0 30px rgba(70,30,180,0.18);
        }
        .up-name {
          font-family:'Playfair Display',serif;
          font-size:23px; font-weight:300; font-style:italic;
          color:#E8D080; margin-bottom:5px;
        }
        .up-zodiac {
          font-size:10px; font-weight:300; letter-spacing:4px; text-transform:uppercase;
          color:rgba(247,242,234,0.72);
        }

        .up-divider {
          height:1px; margin:0 28px;
          background:linear-gradient(to right, transparent, rgba(201,168,76,0.14), transparent);
        }

        /* Info rows */
        .up-infos { padding:18px 18px 14px; display:flex; flex-direction:column; gap:8px; }
        .up-row {
          display:flex; align-items:center; gap:12px;
          padding:11px 13px; border-radius:8px;
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(255,255,255,0.045);
          transition:border-color 0.2s;
        }
        .up-row:hover { border-color:rgba(201,168,76,0.1); }
        .up-row-icon {
          width:30px; height:30px; border-radius:7px; flex-shrink:0;
          background:rgba(201,168,76,0.06); border:1px solid rgba(201,168,76,0.1);
          display:flex; align-items:center; justify-content:center;
          font-size:13px; color:rgba(201,168,76,0.65);
        }
        .up-row-label {
          font-size:9px; font-weight:300; letter-spacing:2.5px; text-transform:uppercase;
          color:rgba(247,242,234,0.65); margin-bottom:3px;
        }
        .up-row-value {
          font-size:14px; font-weight:300; color:#F7F2EA; letter-spacing:0.2px;
        }

        /* Bouton modifier */
        .up-edit {
          display:block; width:calc(100% - 36px);
          margin:6px 18px 24px;
          padding:13px 20px;
          background:rgba(201,168,76,0.04);
          border:1px solid rgba(201,168,76,0.25);
          border-radius:3px;
          font-family:'Jost',sans-serif;
          font-size:10px; font-weight:300;
          letter-spacing:3.5px; text-transform:uppercase;
          color:rgba(201,168,76,0.95); border-color:rgba(201,168,76,0.45);
          cursor:pointer; transition:all 0.25s; text-align:center;
        }
        .up-edit:hover {
          background:rgba(201,168,76,0.09);
          border-color:rgba(201,168,76,0.5);
          color:#C9A84C;
        }
        .up-edit:active { transform:scale(0.98); }

        /* EditProfileModal wrapper — z-index 400, au-dessus du profil (300) */
        .up-edit-wrapper {
          position:fixed; inset:0; z-index:400;
        }
      `}</style>

      {/* Overlay profil (z-300) */}
      <div className="up-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className={`up-card ${mounted ? 'vis' : ''}`}>
          <div className="up-c up-tl"/><div className="up-c up-tr"/>
          <div className="up-c up-bl"/><div className="up-c up-br"/>

          <button className="up-close" onClick={onClose}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div className="up-top">
            <div className="up-avatar">{user.zodiacSign?.symbol || '✦'}</div>
            <div className="up-name">{user.name}</div>
            {zodiacName && <div className="up-zodiac">{zodiacName}</div>}
          </div>

          <div className="up-divider"/>

          <div className="up-infos">
            {user.birthDate && (
              <div className="up-row">
                <div className="up-row-icon">☽</div>
                <div>
                  <div className="up-row-label">{t('profile.birthdate') || 'Date de naissance'}</div>
                  <div className="up-row-value">{formatDate(user.birthDate)}</div>
                </div>
              </div>
            )}
            {user.gender && (
              <div className="up-row">
                <div className="up-row-icon">{genderSymbol}</div>
                <div>
                  <div className="up-row-label">{t('profile.gender') || 'Genre'}</div>
                  <div className="up-row-value">{genderLabel(user.gender)}</div>
                </div>
              </div>
            )}
            {user.zodiacSign && (
              <div className="up-row">
                <div className="up-row-icon">{user.zodiacSign.symbol}</div>
                <div>
                  <div className="up-row-label">{t('profile.zodiac') || 'Signe astrologique'}</div>
                  <div className="up-row-value">{zodiacName}</div>
                </div>
              </div>
            )}
          </div>

          <button
            className="up-edit"
            onClick={e => { e.preventDefault(); e.stopPropagation(); setShowEdit(true); }}
          >
            {t('profile.edit') || 'Modifier mon profil'}
          </button>
        </div>
      </div>

      {/* EditProfileModal monté EN DEHORS de la card, z-400 */}
      {showEdit && (
        <div className="up-edit-wrapper">
          <EditProfileModal
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            onSaved={() => { setShowEdit(false); onClose(); }}
          />
        </div>
      )}
    </>
  );
}