import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// ✅ Variable pour tracker si AdMob est initialisé
let isAdMobInitialized = false;

// ✅ Fonction d'initialisation avec protection
async function initialize() {
  // Ne pas initialiser sur le web
  if (!Capacitor.isNativePlatform()) {
    console.log('🌐 Mode web détecté, AdMob désactivé');
    return;
  }

  // Ne pas initialiser deux fois
  if (isAdMobInitialized) {
    console.log('✅ AdMob déjà initialisé');
    return;
  }

  try {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [], // Vide pour utiliser les ID de test Google
      initializeForTesting: true, // Garde true pour utiliser les ID de test
    });
    isAdMobInitialized = true;
    console.log('✅ AdMob initialisé avec succès');
  } catch (error) {
    console.error('❌ Erreur initialisation AdMob:', error);
  }
}

// ✅ Wrapper pour s'assurer que AdMob est initialisé
async function ensureAdMobReady() {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  if (!isAdMobInitialized) {
    await initialize();
  }

  return isAdMobInitialized;
}

async function showBanner(options?: { position?: 'TOP' | 'BOTTOM' }) {
  if (!(await ensureAdMobReady())) {
    console.log('🌐 AdMob non disponible (mode web)');
    return;
  }

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
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.removeBanner();
    console.log('🙈 Bannière masquée');
  } catch (error) {
    console.error('❌ Erreur masquage bannière:', error);
  }
}

async function removeBanner() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.removeBanner();
    console.log('🗑️ Bannière supprimée');
  } catch (error) {
    console.error('❌ Erreur suppression bannière:', error);
  }
}

async function prepareInterstitial() {
  if (!(await ensureAdMobReady())) {
    console.log('🌐 AdMob non disponible (mode web)');
    return;
  }

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
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.showInterstitial();
    console.log('✅ Interstitiel affiché');
  } catch (error) {
    console.error('❌ Erreur affichage interstitiel:', error);
  }
}

// Fonction combinée pour afficher un interstitiel
async function showInterstitialAd() {
  if (!(await ensureAdMobReady())) {
    console.log('🌐 AdMob non disponible (mode web)');
    return;
  }

  try {
    await prepareInterstitial();
    // Attendre un peu avant d'afficher
    await new Promise(resolve => setTimeout(resolve, 500));
    await showInterstitial();
  } catch (error) {
    console.error('❌ Erreur affichage interstitiel:', error);
  }
}

// Export des fonctions
export { 
  initialize,
  showBanner,
  hideBanner,
  removeBanner,
  prepareInterstitial,
  showInterstitial,
  showInterstitialAd
};

// ✅ AUTO-INITIALISATION au chargement du module
if (Capacitor.isNativePlatform()) {
  initialize().catch(err => {
    console.error('❌ Erreur auto-init AdMob:', err);
  });
  if (Capacitor.isNativePlatform()) {
    console.log('📱 Platform native détectée, initialisation AdMob...');
    initialize().catch(err => {
      console.error('❌ Erreur auto-init AdMob:', err);
    });
  } else {
    console.log('🌐 Platform web détectée, AdMob désactivé');
  }
}