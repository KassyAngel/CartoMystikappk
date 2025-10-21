import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getZodiacSign } from '@/data/oracleData';
import MysticalButton from '@/components/MysticalButton';

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

  // Initialiser les valeurs de date
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

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
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

      updateUser({
        name,
        birthDate,
        gender,
        zodiacSign
      });

      onSaved();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Une erreur est survenue lors de la sauvegarde');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: t(`date.months.${i + 1}`)
  }));
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl shadow-2xl max-w-md w-full border-2 border-yellow-400/50 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 p-6 border-b border-purple-500/30 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-purple-700/50 transition-colors"
            aria-label={t('common.close') || 'Fermer'}
          >
            <svg className="w-5 h-5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-yellow-300 font-serif">
            ✏️ {t('profile.edit.title') || 'Modifier le profil'}
          </h2>
          <p className="text-purple-200 text-sm mt-1">
            {t('profile.edit.subtitle') || 'Modifiez vos informations personnelles'}
          </p>
        </div>

        {/* Formulaire */}
        <div className="p-6 space-y-4">

          {/* Nom */}
          <div>
            <label className="text-purple-200 text-sm font-semibold block mb-2">
              {t('name.label') || 'Votre nom'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-purple-800/30 border-2 border-purple-500/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder={t('name.placeholder') || 'Entrez votre nom'}
            />
          </div>

          {/* Date de naissance */}
          <div>
            <label className="text-purple-200 text-sm font-semibold block mb-2">
              {t('date.title') || 'Date de naissance'}
            </label>
            <div className="flex gap-2">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="flex-1 bg-purple-800/30 border-2 border-purple-500/30 rounded-xl px-3 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              >
                <option value="">{t('date.day') || 'Jour'}</option>
                {dayOptions.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="flex-1 bg-purple-800/30 border-2 border-purple-500/30 rounded-xl px-3 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              >
                <option value="">{t('date.month') || 'Mois'}</option>
                {monthOptions.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="flex-1 bg-purple-800/30 border-2 border-purple-500/30 rounded-xl px-3 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              >
                <option value="">{t('date.year') || 'Année'}</option>
                {yearOptions.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="text-purple-200 text-sm font-semibold block mb-2">
              {t('gender.title') || 'Genre'}
            </label>
            <div className="space-y-2">
              {[
                { value: 'homme', label: t('gender.male') || 'Homme', icon: '♂' },
                { value: 'femme', label: t('gender.female') || 'Femme', icon: '♀' },
                { value: 'autre', label: t('gender.other') || 'Autre', icon: '⚥' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGender(option.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    gender === option.value
                      ? 'border-yellow-400 bg-yellow-400/20'
                      : 'border-purple-500/30 bg-purple-800/20 hover:border-purple-400/50'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className={gender === option.value ? 'text-yellow-300 font-semibold' : 'text-purple-200'}>
                    {option.label}
                  </span>
                  {gender === option.value && (
                    <span className="ml-auto text-yellow-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="p-6 pt-0 flex gap-3">
          <MysticalButton
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            {t('common.cancel') || 'Annuler'}
          </MysticalButton>
          <MysticalButton
            variant="primary"
            onClick={handleSave}
            className="flex-1"
            disabled={!name || !day || !month || !year || !gender}
          >
            {t('common.save') || 'Enregistrer'}
          </MysticalButton>
        </div>
      </div>
    </div>
  );
}