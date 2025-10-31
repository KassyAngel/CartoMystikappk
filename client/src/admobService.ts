
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobBannerSize, InterstitialAdPluginEvents, AdMobError } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();

console.log('🔍 Détection plateforme AdMob:', {
  isNative,
  platform,
  userAgent: navigator.userAgent,
  isAndroid: platform === 'android',
  isIOS: platform === 'ios',
  capacitorAvailable: typeof Capacitor !== 'undefined',
  windowLocation: window.location.href
});

// 🧪 IDs AdMob de TEST (à remplacer en production)
const BANNER_AD_ID = isNative 
  ? 'ca-app-pub-3940256099942544/6300978111'  // Test Banner
  : '';

const INTERSTITIAL_AD_ID = isNative
  ? 'ca-app-pub-3940256099942544/1033173712'  // Test Interstitial
  : '';

export async function initialize() {
  console.log('📱 Initialisation AdMob - isNative:', isNative, 'platform:', platform);
  
  if (!isNative) {
    console.log('📱 AdMob ignoré (pas sur mobile natif) - Vous êtes sur:', platform);
    return;
  }

  try {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: ['YOUR_DEVICE_ID'],  // 🧪 Mode test
      initializeForTesting: true,  // 🧪 True pour les pubs de test
    });
    console.log('✅ AdMob initialisé en mode TEST');
  } catch (error) {
    console.error('❌ Erreur init AdMob:', error);
  }
}

export async function showBanner() {
  if (!isNative) return;

  try {
    const options: BannerAdOptions = {
      adId: BANNER_AD_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    };

    await AdMob.showBanner(options);
    console.log('✅ Bannière affichée');
  } catch (error) {
    console.error('❌ Erreur bannière:', error);
  }
}

export async function hideBanner() {
  if (!isNative) return;

  try {
    await AdMob.hideBanner();
    console.log('👁️ Bannière cachée');
  } catch (error) {
    console.error('❌ Erreur hide bannière:', error);
  }
}

export async function removeBanner() {
  if (!isNative) return;

  try {
    await AdMob.removeBanner();
    console.log('🗑️ Bannière supprimée');
  } catch (error) {
    console.error('❌ Erreur remove bannière:', error);
  }
}

export async function prepareInterstitial() {
  if (!isNative) return;

  try {
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
    });
    console.log('✅ Interstitielle préparée');
  } catch (error) {
    console.error('❌ Erreur préparation interstitielle:', error);
  }
}

export async function showInterstitial() {
  if (!isNative) return;

  try {
    await AdMob.showInterstitial();
    console.log('✅ Interstitielle affichée');
  } catch (error) {
    console.error('❌ Erreur affichage interstitielle:', error);
  }
}

// Compteur global pour tracer les pubs
let interstitialAdCounter = 0;

export async function showInterstitialAd(context: string = 'unknown') {
  if (!isNative) {
    console.log('📱 Pas de pub (web) - Context:', context);
    return;
  }

  interstitialAdCounter++;
  const adNumber = interstitialAdCounter;

  try {
    console.log(`📺 [PUB #${adNumber}] Préparation... Context: ${context}`);
    
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
    });

    // Attendre un peu que la pub soit prête
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await AdMob.showInterstitial();
    console.log(`✅ [PUB #${adNumber}] Affichée avec succès - Context: ${context}`, result);
  } catch (error: any) {
    console.error(`❌ [PUB #${adNumber}] Erreur - Context: ${context}`, error);
    
    // Si l'erreur est "Ad is not ready", on réessaye
    if (error?.message?.includes('not ready')) {
      console.log(`⏳ [PUB #${adNumber}] Pas prête, nouvelle tentative...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        await AdMob.showInterstitial();
        console.log(`✅ [PUB #${adNumber}] Affichée après réessai - Context: ${context}`);
      } catch (retryError) {
        console.error(`❌ [PUB #${adNumber}] Échec après réessai - Context: ${context}`, retryError);
      }
    }
  }
}
