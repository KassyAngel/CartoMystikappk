import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobBannerSize, InterstitialAdPluginEvents, AdMobError } from '@capacitor-community/admob';

async function initialize() {
  try {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['YOUR_DEVICE_ID'], // Pour les tests
      initializeForTesting: true, // À retirer en production
    });
    console.log('✅ AdMob initialisé');
  } catch (error) {
    console.error('❌ Erreur initialisation AdMob:', error);
  }
}

async function showBanner(options?: { position?: 'TOP' | 'BOTTOM' }) {
  try {
    const bannerOptions: BannerAdOptions = {
      adId: 'ca-app-pub-3940256099942544/6300978111', // ID de test
      adSize: BannerAdSize.BANNER,
      position: options?.position === 'TOP' ? BannerAdPosition.TOP_CENTER : BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    };

    await AdMob.showBanner(bannerOptions);
    console.log('✅ Bannière affichée');
  } catch (error) {
    console.error('❌ Erreur affichage bannière:', error);
  }
}

async function hideBanner() {
  try {
    await AdMob.removeBanner();
    console.log('🙈 Bannière masquée');
  } catch (error) {
    console.error('❌ Erreur masquage bannière:', error);
  }
}

async function removeBanner() {
  try {
    await AdMob.removeBanner();
    console.log('🗑️ Bannière supprimée');
  } catch (error) {
    console.error('❌ Erreur suppression bannière:', error);
  }
}

async function prepareInterstitial() {
  try {
    await AdMob.prepareInterstitial({
      adId: 'ca-app-pub-3940256099942544/1033173712', // ID de test
    });
    console.log('⏳ Interstitiel préparé');
  } catch (error) {
    console.error('❌ Erreur préparation interstitiel:', error);
  }
}

async function showInterstitial() {
  try {
    await AdMob.showInterstitial();
    console.log('✅ Interstitiel affiché');
  } catch (error) {
    console.error('❌ Erreur affichage interstitiel:', error);
  }
}

// Fonction combinée pour afficher un interstitiel
async function showInterstitialAd() {
  await prepareInterstitial();
  await showInterstitial();
}

// Export des fonctions pour compatibilité avec les imports existants
export { initialize };
export { showBanner };
export { hideBanner };
export { removeBanner };
export { prepareInterstitial };
export { showInterstitial };
export { showInterstitialAd };