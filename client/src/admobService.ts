import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// ⚠️ REMPLACEZ CES IDs PAR VOS VRAIS IDs AdMob
const ADMOB_IDS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',      // ID TEST - Remplacer
  interstitial: 'ca-app-pub-3940256099942544/1033173712' // ID TEST - Remplacer
};

// Initialiser AdMob
export async function initialize() {
  try {
    await AdMob.initialize({
      initializeForTesting: true,
    });
    console.log('✅ AdMob initialisé');
  } catch (error) {
    console.error('❌ Erreur initialisation AdMob:', error);
  }
}

// Afficher la bannière
export async function showBanner() {
  await showBannerAd();
}

// Afficher une bannière publicitaire
export async function showBannerAd() {
  try {
    await AdMob.showBanner({
      adId: ADMOB_IDS.banner,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    });
    console.log('✅ Bannière affichée');
  } catch (error) {
    console.error('❌ Erreur affichage bannière:', error);
  }
}

// Masquer la bannière
export async function hideBannerAd() {
  try {
    await AdMob.hideBanner();
    console.log('✅ Bannière masquée');
  } catch (error) {
    console.error('❌ Erreur masquage bannière:', error);
  }
}

// Supprimer la bannière
export async function removeBannerAd() {
  try {
    await AdMob.removeBanner();
    console.log('✅ Bannière supprimée');
  } catch (error) {
    console.error('❌ Erreur suppression bannière:', error);
  }
}

// Afficher une pub interstitielle (plein écran)
export async function showInterstitialAd() {
  try {
    console.log('🔄 Préparation de l\'interstitiel...');

    // 1. Préparer la pub
    await AdMob.prepareInterstitial({
      adId: ADMOB_IDS.interstitial,
    });

    console.log('⏳ Attente du chargement...');

    // 2. Attendre que la pub soit chargée (2 secondes)
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('📢 Affichage de l\'interstitiel...');

    // 3. Afficher la pub
    await AdMob.showInterstitial();

    console.log('✅ Interstitiel affiché');
  } catch (error) {
    console.error('❌ Erreur interstitiel:', error);
  }
}