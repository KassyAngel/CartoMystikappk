
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobBannerSize, InterstitialAdPluginEvents, AdMobError } from '@capacitor-community/admob';

class AdMobService {
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['YOUR_DEVICE_ID'], // Pour les tests
        initializeForTesting: true, // À retirer en production
      });
      
      this.isInitialized = true;
      console.log('✅ AdMob initialisé');
    } catch (error) {
      console.error('❌ Erreur initialisation AdMob:', error);
    }
  }

  async showBanner(options: { position?: 'TOP' | 'BOTTOM' } = {}) {
    try {
      const bannerOptions: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544/6300978111', // ID de test
        adSize: BannerAdSize.BANNER,
        position: options.position === 'TOP' ? BannerAdPosition.TOP_CENTER : BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
      };

      await AdMob.showBanner(bannerOptions);
      console.log('✅ Bannière affichée');
    } catch (error) {
      console.error('❌ Erreur affichage bannière:', error);
    }
  }

  async hideBanner() {
    try {
      await AdMob.hideBanner();
      console.log('🙈 Bannière masquée');
    } catch (error) {
      console.error('❌ Erreur masquage bannière:', error);
    }
  }

  async removeBanner() {
    try {
      await AdMob.removeBanner();
      console.log('🗑️ Bannière supprimée');
    } catch (error) {
      console.error('❌ Erreur suppression bannière:', error);
    }
  }

  async prepareInterstitial() {
    try {
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', // ID de test
      });
      console.log('⏳ Interstitiel préparé');
    } catch (error) {
      console.error('❌ Erreur préparation interstitiel:', error);
    }
  }

  async showInterstitial() {
    try {
      await AdMob.showInterstitial();
      console.log('✅ Interstitiel affiché');
    } catch (error) {
      console.error('❌ Erreur affichage interstitiel:', error);
    }
  }
}

export const admobService = new AdMobService();
