// Détecte si on est sur mobile (Capacitor) ou web
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

// URL de ton API Replit (remplace par la vraie URL)
const API_BASE_URL = isNative 
  ? 'https://ton-replit-url.repl.co'  // ⚠️ REMPLACE par ton URL Replit
  : '';  // En web, utilise les URLs relatives

export const config = {
  apiBaseUrl: API_BASE_URL,
};