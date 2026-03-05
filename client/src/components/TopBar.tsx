import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MenuDrawer from './MenuDrawer';
import UserProfileModal from './UserProfileModal';
import PremiumModal from './PremiumModal';

interface TopBarProps {
  onOpenGrimoire: () => void;
  onOpenPremium: () => void;
  isPremium: boolean;
}

export default function TopBar({ onOpenGrimoire, onOpenPremium, isPremium }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const { user } = useUser();
  const { t } = useLanguage();

  if (!user || !user.name) return null;

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsMenuOpen(false); setIsPremiumModalOpen(false);
    setTimeout(() => setIsProfileOpen(true), 80);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsProfileOpen(false); setIsPremiumModalOpen(false);
    setIsMenuOpen(true);
  };

  const handleOpenPremium = () => {
    setIsMenuOpen(false); setIsProfileOpen(false);
    setTimeout(() => setIsPremiumModalOpen(true), 80);
  };

  const closeAll = () => {
    setIsMenuOpen(false); setIsProfileOpen(false); setIsPremiumModalOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=Jost:wght@200;300;400;500&display=swap');

        .tb-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          height: 56px;
          background: rgba(5,3,14,0.92);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 16px;
          font-family: 'Jost', sans-serif;
        }

        /* Bouton menu */
        .tb-menu-btn {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s;
          flex-direction: column; gap: 4px; padding: 0;
        }
        .tb-menu-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); }
        .tb-burger-line {
          width: 16px; height: 1px; background: rgba(247,242,234,0.6);
          border-radius: 1px; transition: all 0.25s;
        }

        /* Logo */
        .tb-logo {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 20px; font-weight: 400; letter-spacing: 0.5px;
          background: linear-gradient(135deg, #F7F2EA 0%, #E8D080 40%, #C9A84C 70%, #E8D080 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: default; user-select: none;
        }

        /* Bouton profil */
        .tb-profile-btn {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 6px 12px 6px 8px;
          cursor: pointer; transition: all 0.25s;
          font-family: 'Jost', sans-serif;
        }
        .tb-profile-btn:hover {
          background: rgba(201,168,76,0.06);
          border-color: rgba(201,168,76,0.25);
        }
        .tb-profile-name {
          font-size: 13px; font-weight: 300; letter-spacing: 0.3px;
          color: rgba(247,242,234,0.8);
        }
        .tb-profile-sign {
          font-size: 14px; color: rgba(201,168,76,0.7);
        }

        /* Badge premium */
        .tb-premium-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #C9A84C;
          box-shadow: 0 0 6px rgba(201,168,76,0.7);
        }
      `}</style>

      <div className="tb-bar">
        {/* Menu */}
        <button className="tb-menu-btn" onClick={handleMenuClick} aria-label="Menu">
          <div className="tb-burger-line"/>
          <div className="tb-burger-line" style={{width: 12}}/>
          <div className="tb-burger-line"/>
        </button>

        {/* Logo */}
        <span className="tb-logo">CartoMystik</span>

        {/* Profil */}
        <button className="tb-profile-btn" onClick={handleProfileClick} aria-label="Profil">
          {isPremium && <div className="tb-premium-dot"/>}
          <span className="tb-profile-name">{user.name}</span>
          <span className="tb-profile-sign">{user.zodiacSign?.symbol || '·'}</span>
        </button>
      </div>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={closeAll}
        onOpenGrimoire={() => { closeAll(); setTimeout(onOpenGrimoire, 80); }}
        onOpenPremium={handleOpenPremium}
        isPremium={isPremium}
      />

      {!isMenuOpen && !isPremiumModalOpen && isProfileOpen && (
        <UserProfileModal isOpen={isProfileOpen} onClose={closeAll} />
      )}

      {!isMenuOpen && !isProfileOpen && isPremiumModalOpen && (
        <PremiumModal
          isOpen={isPremiumModalOpen}
          onClose={closeAll}
          onPurchase={(planId?: string) => { if (planId) console.log('Plan:', planId); closeAll(); }}
        />
      )}
    </>
  );
}