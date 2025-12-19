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
      launchShowDuration: 2000,           // Durée d'affichage (2 secondes)
      launchAutoHide: true,               // Cache automatiquement
      backgroundColor: "#0f0f1e",         // Fond violet foncé (adapte à ton design)
      androidSplashResourceName: "splash", // Nom du fichier (sans .png)
      androidScaleType: "CENTER_CROP",    // Mode d'affichage centré
      showSpinner: false                  // Pas de spinner de chargement
    }
  }
};

export default config;