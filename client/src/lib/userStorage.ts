import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { UserSession } from '@shared/schema';

const USER_STORAGE_KEY = 'mystic_user_session';
const LANGUAGE_KEY = 'mystic_language';

// Détecte si on est sur mobile
const isNative = Capacitor.isNativePlatform();

// ===== USER SESSION =====

export const saveUserSession = async (user: UserSession): Promise<void> => {
  try {
    const data = JSON.stringify(user);
    if (isNative) {
      await Preferences.set({ key: USER_STORAGE_KEY, value: data });
    } else {
      localStorage.setItem(USER_STORAGE_KEY, data);
    }
    console.log('✅ Session sauvegardée');
  } catch (error) {
    console.error('❌ Erreur sauvegarde session:', error);
  }
};

export const getUserSession = async (): Promise<UserSession | null> => {
  try {
    let stored: string | null = null;

    if (isNative) {
      const result = await Preferences.get({ key: USER_STORAGE_KEY });
      stored = result.value;
    } else {
      stored = localStorage.getItem(USER_STORAGE_KEY);
    }

    if (!stored) return null;

    const user = JSON.parse(stored);
    if (user.name && user.birthDate && user.gender) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('❌ Erreur récupération session:', error);
    return null;
  }
};

export const clearUserSession = async (): Promise<void> => {
  try {
    if (isNative) {
      await Preferences.remove({ key: USER_STORAGE_KEY });
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    console.log('✅ Session supprimée');
  } catch (error) {
    console.error('❌ Erreur suppression session:', error);
  }
};

// ===== LANGUAGE =====

export const saveLanguage = async (language: string): Promise<void> => {
  try {
    if (isNative) {
      await Preferences.set({ key: LANGUAGE_KEY, value: language });
    } else {
      localStorage.setItem(LANGUAGE_KEY, language);
    }
    console.log('✅ Langue sauvegardée:', language);
  } catch (error) {
    console.error('❌ Erreur sauvegarde langue:', error);
  }
};

export const getSavedLanguage = async (): Promise<string | null> => {
  try {
    let language: string | null = null;

    if (isNative) {
      const result = await Preferences.get({ key: LANGUAGE_KEY });
      language = result.value;
    } else {
      language = localStorage.getItem(LANGUAGE_KEY);
    }

    console.log('📖 Langue récupérée:', language);
    return language;
  } catch (error) {
    console.error('❌ Erreur récupération langue:', error);
    return null;
  }
};

export const clearLanguage = async (): Promise<void> => {
  try {
    if (isNative) {
      await Preferences.remove({ key: LANGUAGE_KEY });
    } else {
      localStorage.removeItem(LANGUAGE_KEY);
    }
  } catch (error) {
    console.error('❌ Erreur suppression langue:', error);
  }
};