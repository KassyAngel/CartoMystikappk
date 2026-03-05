import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { useLanguage } from '@/contexts/LanguageContext';
import { config } from '@/config';
import { getDeviceId, saveUserEmail } from '@/lib/userStorage';
import {
  initializeRevenueCat, getOfferings, purchasePackage, restorePurchases
} from '@/services/revenueCatService';
import type { PurchasesOfferings, PurchasesPackage } from '@revenuecat/purchases-capacitor';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (planId?: string) => void;
}

export default function PremiumModal({ isOpen, onClose, onPurchase }: PremiumModalProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'premium_1month' | 'premium_3months' | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setMounted(true), 40);
      if (isNative) loadOfferings();
    } else {
      setMounted(false);
      setError(''); setEmailError(''); setEmail('');
    }
  }, [isOpen]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && !loading) onClose(); };
    if (isOpen) { document.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [isOpen, loading, onClose]);

  const loadOfferings = async () => {
    try { await initializeRevenueCat(); setOfferings(await getOfferings()); }
    catch (e) { setError(t('premium.error.loadFailed') || 'Impossible de charger les offres'); }
  };

  const handleRevenueCatPurchase = async (pkg: PurchasesPackage) => {
    if (!email.includes('@')) { setEmailError(t('premium.error.invalidEmail') || 'Email invalide'); return; }
    setLoading(true); setError('');
    try {
      const result = await purchasePackage(pkg, email);
      if (result.success) { await saveUserEmail(email); onPurchase(pkg.identifier); }
      else setError(t('premium.error.purchaseFailed') || 'Erreur achat');
    } catch (e: any) { setError(e.message || 'Erreur'); }
    finally { setLoading(false); }
  };

  const handleRevenueCatRestore = async () => {
    if (!email.includes('@')) { setEmailError(t('premium.error.invalidEmail') || 'Email invalide'); return; }
    setLoading(true); setError('');
    try {
      const result = await restorePurchases(email);
      if (result.success) { await saveUserEmail(email); onPurchase(); }
      else setError(t('premium.error.noActivePremium') || 'Aucun abonnement trouvé');
    } catch (e: any) { setError(e.message || 'Erreur'); }
    finally { setLoading(false); }
  };

  const handleStripe = async () => {
    if (!selectedPlan) return;
    if (!email || !email.includes('@')) { setEmailError(t('premium.error.emailInvalid') || 'Email invalide'); return; }
    setEmailError(''); setLoading(true);
    try {
      const deviceId = await getDeviceId();
      const res = await fetch(`${config.apiBaseUrl}/api/create-checkout-session`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan, deviceId, email }),
      });
      const data = await res.json();
      if (data.success && data.url) {
        const w = window.open(data.url, '_blank');
        if (!w) alert('Autorisez les popups pour accéder au paiement');
        else onClose();
      } else throw new Error(data.error || 'Erreur');
    } catch (e: any) { alert(e.message || 'Erreur paiement'); }
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  const packages = offerings?.current?.availablePackages || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap');

        .pm-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(4,0,16,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: pm-fade 0.25s ease;
        }
        @keyframes pm-fade { from{opacity:0} to{opacity:1} }

        .pm-card {
          width: 100%; max-width: 380px; max-height: 88vh; overflow-y: auto;
          background: linear-gradient(160deg, #10081e 0%, #080514 70%);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px; position: relative;
          font-family: 'Jost', sans-serif;
          transform: translateY(14px); opacity: 0;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
        }
        .pm-card.vis { transform: translateY(0); opacity: 1; }
        .pm-card::-webkit-scrollbar { width: 3px; }
        .pm-card::-webkit-scrollbar-track { background: transparent; }
        .pm-card::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }

        .pm-corner { position:absolute; width:8px; height:8px; border-color:rgba(201,168,76,0.3); border-style:solid; }
        .pm-tl{top:0;left:0;border-width:1px 0 0 1px}
        .pm-tr{top:0;right:0;border-width:1px 1px 0 0}
        .pm-bl{bottom:0;left:0;border-width:0 0 1px 1px}
        .pm-br{bottom:0;right:0;border-width:0 1px 1px 0}

        .pm-close {
          position: absolute; top: 14px; right: 14px;
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(247,242,234,0.72); transition: all 0.2s;
        }
        .pm-close:hover { background: rgba(255,255,255,0.08); color: #F7F2EA; }

        /* Header */
        .pm-head {
          padding: 36px 28px 20px; text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .pm-star {
          font-size: 28px; margin-bottom: 12px; display: block;
          filter: drop-shadow(0 0 10px rgba(201,168,76,0.5));
        }
        .pm-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 300; font-style: italic;
          color: #E8D080; margin-bottom: 6px;
        }
        .pm-sub {
          font-size: 13px; font-weight: 200; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.88); line-height: 1.55;
        }

        /* Body */
        .pm-body { padding: 20px 24px 24px; }

        /* Email input */
        .pm-label {
          font-size: 9px; font-weight: 300; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.9); margin-bottom: 8px; display: block;
        }
        .pm-input {
          width: 100%; padding: 11px 14px; margin-bottom: 4px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1); border-bottom-color: rgba(201,168,76,0.3);
          border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300;
          color: #F7F2EA; outline: none; transition: border-color 0.2s;
        }
        .pm-input:focus { border-color: rgba(201,168,76,0.5); }
        .pm-input::placeholder { color: rgba(247,242,234,0.45); }
        .pm-email-hint {
          font-size: 10px; font-weight: 200; color: rgba(247,242,234,0.75);
          margin-bottom: 18px; display: block;
        }
        .pm-err { font-size: 11px; color: rgba(220,80,80,0.9); margin-bottom: 10px; display: block; }

        /* Plan cards */
        .pm-plans { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .pm-plan {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-radius: 8px; cursor: pointer;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.22s; position: relative; overflow: hidden;
        }
        .pm-plan:hover { border-color: rgba(201,168,76,0.25); background: rgba(201,168,76,0.04); }
        .pm-plan.selected { border-color: rgba(201,168,76,0.5); background: rgba(201,168,76,0.07); }
        .pm-plan-left {}
        .pm-plan-name { font-size: 15px; font-weight: 300; color: #F7F2EA; margin-bottom: 2px; }
        .pm-plan.selected .pm-plan-name { color: #E8D080; }
        .pm-plan-note { font-size: 11px; font-weight: 200; color: rgba(247,242,234,0.75); }
        .pm-plan-right { text-align: right; }
        .pm-plan-old { font-size: 11px; color: rgba(247,242,234,0.6); text-decoration: line-through; }
        .pm-plan-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 400; color: #C9A84C; }
        .pm-plan-badge {
          position: absolute; top: 6px; right: 6px;
          font-size: 9px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(201,168,76,0.9); background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2); border-radius: 20px; padding: 2px 8px;
        }
        .pm-plan-radio {
          width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.15); margin-right: 12px;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .pm-plan.selected .pm-plan-radio { border-color: rgba(201,168,76,0.7); background: rgba(201,168,76,0.15); }
        .pm-plan-radio-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #C9A84C;
          opacity: 0; transition: opacity 0.2s;
        }
        .pm-plan.selected .pm-plan-radio-dot { opacity: 1; }

        /* CTA button */
        .pm-cta {
          width: 100%; padding: 14px;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.85); cursor: pointer; transition: all 0.25s;
          margin-bottom: 12px;
        }
        .pm-cta:hover:not(:disabled) {
          background: rgba(201,168,76,0.07); border-color: rgba(201,168,76,0.6); color: #C9A84C;
        }
        .pm-cta:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Benefits */
        .pm-benefits {
          margin-top: 16px; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 8px;
        }
        .pm-benefit {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 200; color: rgba(247,242,234,0.88);
        }
        .pm-benefit-dot {
          width: 4px; height: 4px; border-radius: 50%; background: rgba(201,168,76,0.5); flex-shrink: 0;
        }

        /* Restore link */
        .pm-restore-link {
          width: 100%; padding: 8px; background: none; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 200;
          color: rgba(247,242,234,0.28); letter-spacing: 0.5px; transition: color 0.2s;
          text-align: center;
        }
        .pm-restore-link:hover { color: rgba(247,242,234,0.88); }

        /* Error */
        .pm-error-box {
          padding: 10px 14px; border-radius: 6px; margin-bottom: 12px;
          background: rgba(200,60,60,0.08); border: 1px solid rgba(200,60,60,0.2);
          font-size: 12px; color: rgba(220,100,100,0.9);
        }

        /* RevenueCat package */
        .pm-pkg { margin-bottom: 10px; }
        .pm-pkg-info { margin-bottom: 8px; }
        .pm-pkg-title { font-size: 15px; font-weight: 300; color: #E8D080; }
        .pm-pkg-desc { font-size: 12px; font-weight: 200; color: rgba(247,242,234,0.82); }
        .pm-pkg-price { font-family: 'Playfair Display', serif; font-size: 22px; color: #C9A84C; }
        .pm-pkg-btn {
          width: 100%; padding: 13px; background: transparent;
          border: 1px solid rgba(201,168,76,0.35); border-radius: 3px;
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 300;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(201,168,76,0.85); cursor: pointer; transition: all 0.25s;
        }
        .pm-pkg-btn:hover:not(:disabled) { background: rgba(201,168,76,0.07); border-color: rgba(201,168,76,0.6); }
        .pm-pkg-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .pm-conditions {
          margin-top: 14px; font-size: 10px; font-weight: 200; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.65); text-align: center; line-height: 1.8;
        }
        .pm-conditions span { color: rgba(201,168,76,0.5); }
      `}</style>

      <div className="pm-overlay" onClick={e => { if (e.target === e.currentTarget && !loading) onClose(); }}>
        <div className={`pm-card ${mounted ? 'vis' : ''}`}>
          <div className="pm-corner pm-tl"/><div className="pm-corner pm-tr"/>
          <div className="pm-corner pm-bl"/><div className="pm-corner pm-br"/>

          <button className="pm-close" onClick={() => !loading && onClose()}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Header */}
          <div className="pm-head">
            <span className="pm-star">✦</span>
            <div className="pm-title">{t('premium.title') || 'Premium'}</div>
            <p className="pm-sub">{t('premium.subtitle') || 'Débloquez toutes les fonctionnalités'}</p>
          </div>

          <div className="pm-body">

            {/* Email */}
            {!showRestore && (
              <>
                <label className="pm-label">{t('premium.emailLabel') || 'Votre email'}</label>
                <input
                  type="email" className="pm-input" placeholder="exemple@email.com"
                  value={email} disabled={loading}
                  onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                />
                {emailError && <span className="pm-err">{emailError}</span>}
                <span className="pm-email-hint">{t('premium.emailHelp') || 'Pour récupérer votre abonnement'}</span>
              </>
            )}

            {/* RevenueCat (natif) */}
            {isNative && !showRestore && (
              packages.length > 0 ? packages.map(pkg => (
                <div key={pkg.identifier} className="pm-pkg">
                  <div className="pm-pkg-info">
                    <div className="pm-pkg-title">{pkg.product.title}</div>
                    <div className="pm-pkg-desc">{pkg.product.description}</div>
                    <div className="pm-pkg-price">{pkg.product.priceString}</div>
                  </div>
                  <button className="pm-pkg-btn" disabled={loading} onClick={() => handleRevenueCatPurchase(pkg)}>
                    {loading ? '···' : (t('premium.buy') || 'Acheter')}
                  </button>
                </div>
              )) : !error && (
                <div style={{textAlign:'center',padding:'24px 0',color:'rgba(247,242,234,0.4)',fontSize:'13px'}}>
                  Chargement des offres…
                </div>
              )
            )}

            {/* Stripe (web) */}
            {!isNative && !showRestore && (
              <>
                <div className="pm-plans">
                  {/* Plan 1 mois */}
                  <div className={`pm-plan ${selectedPlan === 'premium_1month' ? 'selected' : ''}`}
                    onClick={() => { setSelectedPlan('premium_1month'); setEmailError(''); }}>
                    <div className="pm-plan-radio"><div className="pm-plan-radio-dot"/></div>
                    <div className="pm-plan-left">
                      <div className="pm-plan-name">{t('premium.plan.1month') || '1 mois'}</div>
                      <div className="pm-plan-note">{t('premium.plan.1month.subtitle') || 'Abonnement mensuel'}</div>
                    </div>
                    <div className="pm-plan-right">
                      <div className="pm-plan-price">3,99€</div>
                    </div>
                  </div>

                  {/* Plan 3 mois */}
                  <div className={`pm-plan ${selectedPlan === 'premium_3months' ? 'selected' : ''}`}
                    onClick={() => { setSelectedPlan('premium_3months'); setEmailError(''); }}>
                    <span className="pm-plan-badge">-25%</span>
                    <div className="pm-plan-radio"><div className="pm-plan-radio-dot"/></div>
                    <div className="pm-plan-left">
                      <div className="pm-plan-name">{t('premium.plan.3months') || '3 mois'}</div>
                      <div className="pm-plan-note" style={{color:'rgba(127,201,168,0.7)'}}>
                        {t('premium.plan.3months.subtitle') || 'Meilleure offre'}
                      </div>
                    </div>
                    <div className="pm-plan-right">
                      <div className="pm-plan-old">11,97€</div>
                      <div className="pm-plan-price">8,98€</div>
                    </div>
                  </div>
                </div>

                <button className="pm-cta" disabled={!selectedPlan || loading || !email} onClick={handleStripe}>
                  {loading ? '···' : (t('premium.button.subscribe') || 'Continuer vers le paiement')}
                </button>
              </>
            )}

            {/* Restauration (natif) */}
            {showRestore && isNative && (
              <>
                <label className="pm-label">{t('premium.restoreEmailLabel') || 'Votre email'}</label>
                <input type="email" className="pm-input" placeholder="exemple@email.com"
                  value={email} disabled={loading}
                  onChange={e => { setEmail(e.target.value); setEmailError(''); }}/>
                {emailError && <span className="pm-err">{emailError}</span>}
                <button className="pm-cta" style={{marginTop:12}} disabled={loading} onClick={handleRevenueCatRestore}>
                  {loading ? '···' : (t('premium.restore') || 'Restaurer')}
                </button>
                <button className="pm-restore-link" onClick={() => setShowRestore(false)}>
                  ← {t('premium.backToPurchase') || 'Retour aux offres'}
                </button>
              </>
            )}

            {/* Error */}
            {error && <div className="pm-error-box">{error}</div>}

            {/* Toggle restaurer */}
            {isNative && !showRestore && (
              <button className="pm-restore-link" onClick={() => setShowRestore(true)}>
                {t('premium.restoreSubscription') || 'Restaurer un abonnement existant'}
              </button>
            )}

            {/* Avantages */}
            <div className="pm-benefits">
              {[
                t('premium.benefits.ads') || 'Sans publicité',
                t('premium.benefits.grimoire') || 'Grimoire illimité',
                t('premium.benefits.notes') || 'Notes personnalisées',
                t('premium.benefits.history') || 'Historique complet',
              ].map((b, i) => (
                <div key={i} className="pm-benefit">
                  <div className="pm-benefit-dot"/>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="pm-conditions">
              <div>{t('premium.conditions.line1')}</div>
              <div><span>{t('premium.conditions.line2')}</span></div>
              <div style={{fontSize:9}}>{t('premium.conditions.line3')}</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}