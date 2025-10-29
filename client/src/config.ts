
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

// Configuration API selon l'environnement
export const config = {
  apiBaseUrl: isNative 
    ? 'https://cartomystikappk.onrender.com'  // Production pour l'app native
    : import.meta.env.PROD 
      ? 'https://cartomystikappk.onrender.com'  // Production web
      : ''  // Développement: utiliser l'origine actuelle (Replit proxy)
};
