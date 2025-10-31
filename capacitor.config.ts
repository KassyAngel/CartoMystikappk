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
    ]
  }
};

export default config;
