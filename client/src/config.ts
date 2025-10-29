import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

// Pour Replit Dev, utiliser l'URL sans port (le proxy Replit gère le routage)
const API_BASE_URL = isNative 
  ? 'https://cartomystikappk.onrender.com'
  : window.location.origin; // Utilise l'origine actuelle pour éviter les problèmes CORS

export const config = {
  apiBaseUrl: import.meta.env.DEV 
    ? 'http://localhost:5000' 
    : 'https://cartomystikappk.onrender.com'
};