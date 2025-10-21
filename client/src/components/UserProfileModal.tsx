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
  const [showEditModal, setShowEditModal] = useState(false);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showEditModal) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, showEditModal]);

  if (!isOpen || !user) return null;

  // Formater la date de naissance
  const formatBirthDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr;
    }
  };

  // Traduire le genre
  const getGenderLabel = (gender: string) => {
    if (!gender) return '';
    const genderMap: Record<string, string> = {
      'homme': t('gender.male') || 'Homme',
      'femme': t('gender.female') || 'Femme',
      'autre': t('gender.other') || 'Autre'
    };
    return genderMap[gender] || gender;
  };

  // Convertir le nom du signe en clé de traduction
  const getZodiacKey = (signName: string) => {
    if (!signName) return 'aries';

    const zodiacMap: Record<string, string> = {
      'Aries': 'aries',
      'Taurus': 'taurus',
      'Gemini': 'gemini',
      'Cancer': 'cancer',
      'Leo': 'leo',
      'Virgo': 'virgo',
      'Libra': 'libra',
      'Scorpio': 'scorpio',
      'Sagittarius': 'sagittarius',
      'Capricorn': 'capricorn',
      'Aquarius': 'aquarius',
      'Pisces': 'pisces',
      'Bélier': 'aries',
      'Taureau': 'taurus',
      'Gémeaux': 'gemini',
      'Lion': 'leo',
      'Vierge': 'virgo',
      'Balance': 'libra',
      'Scorpion': 'scorpio',
      'Sagittaire': 'sagittarius',
      'Capricorne': 'capricorn',
      'Verseau': 'aquarius',
      'Poissons': 'pisces'
    };

    return zodiacMap[signName] || signName.toLowerCase();
  };

  // Formater les dates du signe astrologique
  const getZodiacDates = () => {
    if (!user.zodiacSign) return '';

    try {
      if (typeof user.zodiacSign.dates === 'string') {
        return user.zodiacSign.dates;
      }

      if (user.zodiacSign.dates && typeof user.zodiacSign.dates === 'object') {
        const dates = user.zodiacSign.dates as any;
        if (dates.start && dates.end) {
          return `${dates.start.day}/${dates.start.month} - ${dates.end.day}/${dates.end.month}`;
        }
      }
    } catch (error) {
      console.error('Error formatting zodiac dates:', error);
    }

    return '';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget && !showEditModal) {
      onClose();
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditModal(true);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl max-w-md w-full border-2 border-purple-500/30 animate-scale-in">

          {/* Header avec symbole zodiacal */}
          <div className="relative p-6 text-center border-b border-purple-500/30">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-purple-700/50 transition-colors z-10"
              aria-label={t('common.close') || 'Fermer'}
            >
              <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-5xl shadow-lg">
              {user.zodiacSign?.symbol || '✨'}
            </div>

            <h2 className="text-2xl font-bold text-yellow-300 mb-1 font-serif">
              {user.name || 'Utilisateur'}
            </h2>

            {user.zodiacSign && (
              <p className="text-purple-200 text-sm">
                {t(`zodiac.signs.${getZodiacKey(user.zodiacSign.name)}`)}
                {getZodiacDates() && ` • ${getZodiacDates()}`}
              </p>
            )}
          </div>

          {/* Informations */}
          <div className="p-6 space-y-4">

            {/* Date de naissance */}
            {user.birthDate && (
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎂</span>
                  <div className="flex-1">
                    <div className="text-purple-300 text-xs">{t('profile.birthdate') || 'Date de naissance'}</div>
                    <div className="text-purple-100 font-semibold">{formatBirthDate(user.birthDate)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Genre */}
            {user.gender && (
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {user.gender === 'homme' ? '♂' : user.gender === 'femme' ? '♀' : '⚥'}
                  </span>
                  <div className="flex-1">
                    <div className="text-purple-300 text-xs">{t('profile.gender') || 'Genre'}</div>
                    <div className="text-purple-100 font-semibold">{getGenderLabel(user.gender)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Signe astrologique détaillé */}
            {user.zodiacSign && (
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{user.zodiacSign.symbol}</span>
                  <div className="flex-1">
                    <div className="text-purple-300 text-xs">{t('profile.zodiac') || 'Signe astrologique'}</div>
                    <div className="text-purple-100 font-semibold">
                      {t(`zodiac.signs.${getZodiacKey(user.zodiacSign.name)}`)}
                    </div>
                    {getZodiacDates() && (
                      <div className="text-purple-400 text-xs mt-1">
                        {getZodiacDates()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bouton modifier */}
          <div className="p-6 pt-0">
            <button
              onClick={() => setShowEditModal(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t('profile.edit') || 'Modifier'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de modification */}
      {showEditModal && (
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSaved={() => {
            setShowEditModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}