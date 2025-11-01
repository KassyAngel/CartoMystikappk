import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { UserSession } from '@shared/schema';

const USER_STORAGE_KEY = 'mystic_user_session';
const LANGUAGE_KEY = 'mystic_language';
const DEVICE_ID_KEY = 'mystic_device_id';
const USER_EMAIL_KEY = 'mystic_user_email';

// Détecte si on est sur mobile
const isNative = Capacitor.isNativePlatform();

// ===== DEVICE ID =====
export const getDeviceId = async (): Promise<string> => {
  try {
    let deviceId: string | null = null;

    if (isNative) {
      const result = await Preferences.get({ key: DEVICE_ID_KEY });
      deviceId = result.value;
    } else {
      deviceId = localStorage.getItem(DEVICE_ID_KEY);
    }

    if (deviceId) {
      return deviceId;
    }

    if (isNative) {
      const info = await Device.getId();
      deviceId = info.identifier;
    } else {
      deviceId = `web_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    if (isNative) {
      await Preferences.set({ key: DEVICE_ID_KEY, value: deviceId });
    } else {
      localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    console.log('✅ DeviceId généré:', deviceId);
    return deviceId;
  } catch (error) {
    console.error('❌ Erreur récupération deviceId:', error);
    const fallbackId = `fallback_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return fallbackId;
  }
};

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

// ===== USER EMAIL (pour Premium) =====
/**
 * Sauvegarder l'email de l'utilisateur (pour récupérer le Premium après réinstallation)
 */
export const saveUserEmail = async (email: string): Promise<void> => {
  try {
    const trimmedEmail = email.toLowerCase().trim();

    if (isNative) {
      await Preferences.set({ key: USER_EMAIL_KEY, value: trimmedEmail });
    } else {
      localStorage.setItem(USER_EMAIL_KEY, trimmedEmail);
    }

    console.log('✅ Email utilisateur sauvegardé:', trimmedEmail);
  } catch (error) {
    console.error('❌ Erreur sauvegarde email:', error);
  }
};

/**
 * Récupérer l'email sauvegardé
 */
export const getUserEmail = async (): Promise<string | null> => {
  try {
    let email: string | null = null;

    if (isNative) {
      const result = await Preferences.get({ key: USER_EMAIL_KEY });
      email = result.value;
    } else {
      email = localStorage.getItem(USER_EMAIL_KEY);
    }

    console.log('📧 Email récupéré:', email || 'aucun');
    return email;
  } catch (error) {
    console.error('❌ Erreur récupération email:', error);
    return null;
  }
};

/**
 * Supprimer l'email sauvegardé (déconnexion / réinitialisation)
 */
export const clearUserEmail = async (): Promise<void> => {
  try {
    if (isNative) {
      await Preferences.remove({ key: USER_EMAIL_KEY });
    } else {
      localStorage.removeItem(USER_EMAIL_KEY);
    }
    console.log('🗑️ Email utilisateur supprimé');
  } catch (error) {
    console.error('❌ Erreur suppression email:', error);
  }
};
