// ❌ AdMob temporairement désactivé en raison d'erreurs de compilation
// Les fonctions sont des stubs vides pour éviter les erreurs de référence

console.log('🚫 AdMob désactivé');

async function initialize() {
  console.log('🚫 AdMob désactivé - initialize() non exécuté');
}

async function showBanner(options?: { position?: 'TOP' | 'BOTTOM' }) {
  console.log('🚫 AdMob désactivé - showBanner() non exécuté');
}

async function hideBanner() {
  console.log('🚫 AdMob désactivé - hideBanner() non exécuté');
}

async function removeBanner() {
  console.log('🚫 AdMob désactivé - removeBanner() non exécuté');
}

async function prepareInterstitial() {
  console.log('🚫 AdMob désactivé - prepareInterstitial() non exécuté');
}

async function showInterstitial() {
  console.log('🚫 AdMob désactivé - showInterstitial() non exécuté');
}

async function showInterstitialAd() {
  console.log('🚫 AdMob désactivé - showInterstitialAd() non exécuté');
}

export { 
  initialize,
  showBanner,
  hideBanner,
  removeBanner,
  prepareInterstitial,
  showInterstitial,
  showInterstitialAd
};