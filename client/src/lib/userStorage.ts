import { UserSession } from '@shared/schema';

const USER_STORAGE_KEY = 'mystic_user_session';
const LANGUAGE_KEY = 'mystic_language'; // ✅ Nouvelle clé

export const saveUserSession = (user: UserSession): void => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la session:', error);
  }
};

export const getUserSession = (): UserSession | null => {
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;

    const user = JSON.parse(stored);

    // Vérifier que les données sont valides
    if (user.name && user.birthDate && user.gender) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    return null;
  }
};

export const clearUserSession = (): void => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    // Ne pas supprimer la langue, elle persiste même après déconnexion
  } catch (error) {
    console.error('Erreur lors de la suppression de la session:', error);
  }
};

// ✅ Nouvelles fonctions pour gérer la langue
export const saveLanguage = (language: string): void => {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
    console.log('✅ Langue sauvegardée:', language);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la langue:', error);
  }
};

export const getSavedLanguage = (): string | null => {
  try {
    const language = localStorage.getItem(LANGUAGE_KEY);
    console.log('📖 Langue récupérée:', language);
    return language;
  } catch (error) {
    console.error('Erreur lors de la récupération de la langue:', error);
    return null;
  }
};

export const clearLanguage = (): void => {
  try {
    localStorage.removeItem(LANGUAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression de la langue:', error);
  }
};