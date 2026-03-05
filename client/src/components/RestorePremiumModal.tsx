import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { config } from '@/config';
import { saveUserEmail } from '@/lib/userStorage';

interface RestorePremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSuccess: () => void;
}

export default function RestorePremiumModal({ isOpen, onClose, onRestoreSuccess }: RestorePremiumModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setEmail(''); setError(''); setSuccess(false);
      setTimeout(() => setMounted(true), 40);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && !loading) onClose(); };
    if (isOpen) document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const handleRestore = async () => {
    if (!email) { setError(t('premium.error.emailRequired') || "L'email est requis."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError(t('premium.error.emailInvalid') || "Email invalide."); return; }
    setError(''); setLoading(true);
    try {
      const trimmedEmail = email.toLowerCase().trim();
      const res = await fetch(`${config.apiBaseUrl}/api/user/premium-status`, {
        credentials: 'include',
        headers: { 'x-user-email': trimmedEmail },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.isPremium) {
        await saveUserEmail(trimmedEmail);
        setSuccess(true);
        setTimeout(() => onRestoreSuccess(), 2000);
      } else {
        setError(t('premium.restore.notFound') || "Aucun abonnement Premium trouvé pour cet email.");
      }
    } catch (err: any) {
      setError(t('premium.restore.error') || 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap');

        .rp-overlay {
          position: fixed; inset: 0;
          z-index: 500; /* Au-dessus du drawer (201) */
          background: rgba(4,0,16,0.88);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          animation: rp-fade 0.2s ease;
          font-family: 'Jost', sans-serif;
        }
        @keyframes rp-fade { from{opacity:0} to{opacity:1} }

        .rp-card {
          width: 100%; max-width: 320px;
          background: linear-gradient(160deg, #150328 0%, #0a011a 100%);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 4px; padding: 36px 28px;
          text-align: center; position: relative;
          transform: translateY(14px); opacity: 0;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease;
        }
        .rp-card.vis { transform: translateY(0); opacity: 1; }

        /* Coins déco */
        .rp-c { position:absolute; width:7px; height:7px; border-color:rgba(201,168,76,0.35); border-style:solid; }
        .rp-tl{top:0;left:0;border-width:1px 0 0 1px}
        .rp-tr{top:0;right:0;border-width:1px 1px 0 0}
        .rp-bl{bottom:0;left:0;border-width:0 0 1px 1px}
        .rp-br{bottom:0;right:0;border-width:0 1px 1px 0}

        .rp-close {
          position: absolute; top: 12px; right: 12px;
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(247,242,234,0.72); transition: all 0.2s;
        }
        .rp-close:hover { background: rgba(255,255,255,0.09); color: #F7F2EA; }
        .rp-close:disabled { opacity: 0.3; cursor: not-allowed; }

        .rp-eyebrow {
          font-size: 9px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(201,168,76,0.92); margin-bottom: 10px;
        }
        .rp-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 300; font-style: italic;
          color: #E8D080; margin-bottom: 8px;
        }
        .rp-desc {
          font-size: 13px; font-weight: 200; color: rgba(247,242,234,0.88);
          line-height: 1.65; margin-bottom: 24px;
        }

        /* Success */
        .rp-success {
          padding: 16px; border-radius: 6px; margin-bottom: 16px;
          background: rgba(127,201,168,0.08); border: 1px solid rgba(127,201,168,0.2);
        }
        .rp-success-text { font-size: 14px; font-weight: 300; color: rgba(127,201,168,0.9); margin-bottom: 4px; }
        .rp-success-sub { font-size: 11px; font-weight: 200; color: rgba(127,201,168,0.55); }

        /* Input */
        .rp-label {
          font-size: 9px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.92); display: block; text-align: left; margin-bottom: 7px;
        }
        .rp-input {
          width: 100%; padding: 11px 14px; margin-bottom: 6px;
          background: rgba(255,255,255,0.03);
          border: none; border-bottom: 1px solid rgba(201,168,76,0.25);
          font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300;
          color: #F7F2EA; outline: none; transition: border-color 0.2s;
          border-radius: 0;
        }
        .rp-input:focus { border-bottom-color: rgba(201,168,76,0.6); }
        .rp-input::placeholder { color: rgba(247,242,234,0.45); }
        .rp-input:disabled { opacity: 0.5; }

        .rp-error {
          font-size: 11px; color: rgba(220,90,90,0.9);
          text-align: left; margin-bottom: 14px; line-height: 1.5;
        }

        /* Buttons */
        .rp-btn {
          width: 100%; padding: 13px; margin-top: 16px;
          background: transparent; border: 1px solid rgba(201,168,76,0.35); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.85); cursor: pointer; transition: all 0.25s;
        }
        .rp-btn:hover:not(:disabled) {
          background: rgba(201,168,76,0.07); border-color: rgba(201,168,76,0.6); color: #C9A84C;
        }
        .rp-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Info + help */
        .rp-info {
          margin-top: 20px; padding: 12px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06);
          font-size: 11px; font-weight: 200; color: rgba(247,242,234,0.82); line-height: 1.6;
        }
        .rp-help {
          margin-top: 14px; font-size: 11px; font-weight: 200; color: rgba(247,242,234,0.72);
        }
        .rp-help a { color: rgba(201,168,76,0.85); text-decoration: none; transition: color 0.2s; }
        .rp-help a:hover { color: rgba(201,168,76,0.8); }
      `}</style>

      <div className="rp-overlay" onClick={e => { if (e.target === e.currentTarget && !loading) onClose(); }}>
        <div className={`rp-card ${mounted ? 'vis' : ''}`}>
          <div className="rp-c rp-tl"/><div className="rp-c rp-tr"/>
          <div className="rp-c rp-bl"/><div className="rp-c rp-br"/>

          <button className="rp-close" onClick={onClose} disabled={loading}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div className="rp-eyebrow">Abonnement</div>
          <div className="rp-title">{t('premium.restore.title') || 'Restaurer mon accès'}</div>
          <p className="rp-desc">{t('premium.restore.description') || "Entrez l'email utilisé lors de votre achat Premium"}</p>

          {success ? (
            <div className="rp-success">
              <div className="rp-success-text">✦ {t('premium.restore.success') || 'Premium restauré avec succès'}</div>
              <div className="rp-success-sub">{t('premium.restore.redirecting') || 'Redirection en cours…'}</div>
            </div>
          ) : (
            <>
              <label className="rp-label" htmlFor="rp-email">{t('premium.emailLabel') || 'Votre email'}</label>
              <input
                id="rp-email" type="email" className="rp-input"
                placeholder="exemple@email.com"
                value={email} disabled={loading}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => { if (e.key === 'Enter' && !loading) handleRestore(); }}
              />
              {error && <div className="rp-error">{error}</div>}
              <button className="rp-btn" onClick={handleRestore} disabled={loading || !email}>
                {loading ? '···' : (t('premium.restore.button') || 'Restaurer')}
              </button>
            </>
          )}

          <div className="rp-info">
            {t('premium.restore.info') || "Utilisez le même email que lors de votre achat Premium sur Stripe."}
          </div>
          <div className="rp-help">
            {t('premium.restore.help') || 'Besoin d\'aide ?'}{' '}
            <a href="mailto:cartomystik@gmail.com">{t('premium.restore.contact') || 'Contactez-nous'}</a>
          </div>
        </div>
      </div>
    </>
  );
}