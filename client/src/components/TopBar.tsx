import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MenuDrawer from './MenuDrawer';
import UserProfileModal from './UserProfileModal';
import PremiumModal from './PremiumModal';
import { Menu, User, BookOpen, Crown, BarChart3 } from 'lucide-react';

interface TopBarProps {
  onOpenGrimoire: () => void;
  onOpenPremium: () => void;
  onOpenStats: () => void; // Added for stats functionality
  isPremium: boolean;
}

export default function TopBar({ onOpenGrimoire, onOpenPremium, onOpenStats, isPremium }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const { user } = useUser();
  const { t } = useLanguage();

  // Si pas de user, ne rien afficher
  if (!user || !user.name) {
    return null;
  }

  // Gestion sécurisée de l'ouverture du profil
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      console.log('Opening profile modal, user:', user);
      // Fermer le menu si ouvert
      setIsMenuOpen(false);
      setIsPremiumModalOpen(false);
      // Attendre un peu avant d'ouvrir le profil
      setTimeout(() => {
        setIsProfileOpen(true);
      }, 100);
    } catch (error) {
      console.error('Error opening profile:', error);
    }
  };

  // Gestion sécurisée de l'ouverture du menu
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      console.log('Opening menu drawer');
      // Fermer le profil si ouvert
      setIsProfileOpen(false);
      setIsPremiumModalOpen(false);
      setIsMenuOpen(true);
    } catch (error) {
      console.error('Error opening menu:', error);
    }
  };

  // Ouvrir le modal Premium
  const handleOpenPremium = () => {
    console.log('🌟 Opening Premium Modal');
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setTimeout(() => {
      setIsPremiumModalOpen(true);
      console.log('✅ Premium Modal opened');
    }, 100);
  };

  // Fermer tous les modals
  const closeAll = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsPremiumModalOpen(false);
  };

  return (
    <>
      {/* Barre supérieure */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-purple-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Gauche : Menu hamburger */}
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-lg hover:bg-purple-700/50 transition-colors"
            aria-label={t('menu.open')}
          >
            <svg className="w-6 h-6 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Centre : Logo/Titre élégant */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent font-bold tracking-wide">
              CartoMystik
            </h1>
          </div>

          {/* Droite : Boutons et Profil utilisateur */}
          <div className="flex items-center gap-3">
            {/* Bouton Statistiques */}
            <button
              onClick={onOpenStats}
              className="p-2 rounded-full bg-blue-600/30 hover:bg-blue-600/50 transition-all border border-blue-500/30"
              title={t('stats.title') || 'Statistiques'}
            >
              <BarChart3 size={20} className="text-blue-200" />
            </button>

            {/* Bouton Grimoire */}
            <button
              onClick={onOpenGrimoire}
              className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 transition-all border border-purple-500/30"
              title={t('grimoire.subtitle')}
            >
              <BookOpen size={20} className="text-purple-200" />
            </button>

            {/* Profil utilisateur */}
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-700/50 hover:bg-purple-600/50 transition-all hover:scale-105"
              aria-label={t('profile.open')}
            >
              <span className="font-medium text-purple-200">{user.name || 'User'}</span>
              <span className="text-xl">{user.zodiacSign?.symbol || '✨'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu latéral */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={closeAll}
        onOpenGrimoire={() => {
          closeAll();
          setTimeout(() => onOpenGrimoire(), 100);
        }}
        onOpenPremium={() => {
          handleOpenPremium();
        }}
        isPremium={isPremium}
      />

      {/* Modal profil - Ne rendre que si menu fermé */}
      {!isMenuOpen && !isPremiumModalOpen && isProfileOpen && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={closeAll}
        />
      )}

      {/* Modal Premium */}
      {!isMenuOpen && !isProfileOpen && isPremiumModalOpen && (
        <PremiumModal
          isOpen={isPremiumModalOpen}
          onClose={closeAll}
          onPurchase={(planId) => {
            if (planId) {
              console.log('Plan purchased:', planId);
            }
            closeAll();
          }}
        />
      )}
    </>
  );
}