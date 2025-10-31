import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cartomystik.app',
  appName: 'CartoMystik',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
    cleartext: false,
    allowNavigation: [
      'cartomystikappk.onrender.com'
    ],
    // ✅ Ne pas forcer une URL en développement sur Android
    hostname: undefined,
    url: undefined
  },
  android: {
    allowMixedContent: false
  }
};

export default config;
