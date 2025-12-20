import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cartomystik.app',
  appName: 'CartoMystik',
  webDir: 'dist/public',
  server: {
    cleartext: false,
    allowNavigation: [
      'cartomystikappk.onrender.com',
      '*.stripe.com',
      'checkout.stripe.com'
    ]
  },
  android: {
    allowMixedContent: false
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    // ✅ AJOUTEZ CETTE CONFIGURATION
    SplashScreen: {
      launchShowDuration: 0,           // Ne pas montrer automatiquement
      launchAutoHide: true,            // Cacher automatiquement
      backgroundColor: "#0f0f1e",
      androidScaleType: "CENTER",
      showSpinner: false,
      androidSpinnerStyle: "small",
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;