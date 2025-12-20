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

    // ✅ AJOUTER CETTE SECTION
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#0f0f1e",
      androidSplashResourceName: "splash",
      androidScaleType: "FIT_CENTER",        // Garde les proportions
      showSpinner: false,
      iosSpinnerStyle: "small",
      spinnerColor: "#999999"
    }
  }
};

export default config;