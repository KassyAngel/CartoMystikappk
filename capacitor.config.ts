import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cartomystik.app',
  appName: 'CartoMystik',
  webDir: 'dist/public', // ✅ Important : dist/public et pas dist
  server: {
    androidScheme: 'https'
  }
};

export default config;