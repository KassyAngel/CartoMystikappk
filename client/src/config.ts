import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

const API_BASE_URL = isNative 
  ? 'https://cartomystikappk.onrender.com'
  : 'https://6ff68a04-c6dd-4290-a776-a222d5d0c22f-00-3477r7j3sy8oe.janeway.replit.dev:3001';

export const config = {
  apiBaseUrl: API_BASE_URL,
};