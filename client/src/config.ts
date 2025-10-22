import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

const API_BASE_URL = isNative 
  ? 'https://cartomystikappk.onrender.com'
  : '';

export const config = {
  apiBaseUrl: API_BASE_URL,
};