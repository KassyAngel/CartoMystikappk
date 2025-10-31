import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const isProd = import.meta.env.PROD;

// Domaine unique (tu peux le centraliser ici)
const RENDER_URL = 'https://cartomystikappk.onrender.com';

// Configuration globale
export const config = {
  apiBaseUrl: isNative
    ? RENDER_URL // Android/iOS : Render
    : isProd
      ? RENDER_URL // Web en production
      : `${window.location.origin}`, // Dev (Replit ou localhost)
};
