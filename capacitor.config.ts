import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cartomystik.app',
  appName: 'CartoMystik',
  webDir: 'public',  // Répertoire contenant les fichiers HTML, CSS, JS générés par ton app web

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

    SplashScreen: {
      launchShowDuration: 2000,  // Durée de l'écran de splash (2 secondes)
      launchAutoHide: true,      // Cache l'écran de splash après la durée
      backgroundColor: "#4b0082", // Fond violet mystique
      androidSplashResourceName: "splash",  // Le nom de l'image de splash si tu veux utiliser une image
      showSpinner: false,        // Désactive le spinner de chargement
    }
  }
};

export default config;
