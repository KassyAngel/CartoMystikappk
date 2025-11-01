import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cartomystik.app',
  appName: 'CartoMystik',
  webDir: 'dist/public',
  server: {
    cleartext: false,
    allowNavigation: [
      'cartomystikappk.onrender.com',
      '*.stripe.com',  // ✅ Autoriser Stripe
      'checkout.stripe.com'  // ✅ Autoriser Stripe Checkout
    ]
  },
  android: {
    allowMixedContent: false
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;