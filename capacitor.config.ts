import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cartomystik.app',
  appName: 'CartoMystik',
  webDir: 'dist/public',
  server: {
    cleartext: false,
    allowNavigation: [
      'cartomystikappk.onrender.com'
    ]
  },
  android: {
    allowMixedContent: false
  }
};

export default config;
