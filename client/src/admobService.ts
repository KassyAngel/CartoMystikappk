import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();

// 🎯 INTERRUPTEUR : Changez cette valeur pour passer de TEST à PRODUCTION
const IS_PRODUCTION = false; // ⚠️ false = TEST, true = PRODUCTION (avant soumission Google Play)

console.log('🔍 Détection plateforme AdMob:', {
  isNative,
  platform,
  mode: IS_PRODUCTION ? '🚀 PRODUCTION' : '🧪 TEST',
  userAgent: navigator.userAgent,
  isAndroid: platform === 'android',
  isIOS: platform === 'ios',
  capacitorAvailable: typeof Capacitor !== 'undefined',
  windowLocation: window.location.href
});

// 📱 IDs AdMob - Automatiquement TEST ou PRODUCTION selon IS_PRODUCTION
const BANNER_AD_ID = isNative 
  ? (IS_PRODUCTION 
      ? 'ca-app-pub-5733508257471048/2428210645'  // 🚀 PROD - Bannière accueil
      : 'ca-app-pub-3940256099942544/6300978111') // 🧪 TEST
  : '';

const INTERSTITIAL_AD_ID = isNative
  ? (IS_PRODUCTION 
      ? 'ca-app-pub-5733508257471048/5422426681'  // 🚀 PROD - Interstitiel 1
      : 'ca-app-pub-3940256099942544/1033173712') // 🧪 TEST
  : '';

// ✅ NOUVEAU : ID Pub Récompensée (Rewarded Ad)
const REWARDED_AD_ID = isNative
  ? (IS_PRODUCTION
      ? 'ca-app-pub-5733508257471048/7281390536'  // 🚀 PROD - Pub récompensée
      : 'ca-app-pub-3940256099942544/5224354917') // 🧪 TEST
  : '';

// ✅ État de préchargement
let isInterstitialReady = false;
let isPreparingInterstitial = false;

// Compteur global pour tracer les pubs
let interstitialAdCounter = 0;

export async function initialize() {
  console.log(`📱 Initialisation AdMob - Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
  console.log(`📱 Platform: ${platform}, isNative: ${isNative}`);

  if (!isNative) {
    console.log('📱 AdMob ignoré (pas sur mobile natif) - Vous êtes sur:', platform);
    return;
  }

  try {
    await AdMob.initialize({
      // ✅ Ajoutez votre Device ID ici pour tester sans risque
      testingDevices: IS_PRODUCTION ? [] : [
        'YOUR_DEVICE_ID_HERE' // ⚠️ Remplacez par votre vrai Device ID (voir logs AdMob)
      ],
      initializeForTesting: !IS_PRODUCTION,
    });
    console.log(`✅ AdMob initialisé en mode ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
    console.log(`📺 Bannière ID: ${BANNER_AD_ID}`);
    console.log(`📺 Interstitiel ID: ${INTERSTITIAL_AD_ID}`);
    console.log(`🎁 Récompensée ID: ${REWARDED_AD_ID}`);

    // ✅ Précharger la première pub interstitielle immédiatement
    prepareInterstitial();

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

// ✅ Précharge une pub interstitielle en arrière-plan
export async function prepareInterstitial() {
  if (!isNative || isPreparingInterstitial) return;

  isPreparingInterstitial = true;

  try {
    console.log('⏳ Préchargement pub interstitielle...');

    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
    });

    isInterstitialReady = true;
    console.log('✅ Pub interstitielle prête !');
  } catch (error) {
    console.error('❌ Erreur préparation interstitielle:', error);
    isInterstitialReady = false;
  } finally {
    isPreparingInterstitial = false;
  }
}

// ✅ Affiche une pub interstitielle (préchargée)
export async function showInterstitial() {
  if (!isNative) return;

  try {
    await AdMob.showInterstitial();
    console.log('✅ Interstitielle affichée');
    isInterstitialReady = false; // Pub consommée
  } catch (error) {
    console.error('❌ Erreur affichage interstitielle:', error);
    isInterstitialReady = false;
  }
}

// ✅ Fonction principale : affiche la pub et précharge la suivante
export async function showInterstitialAd(context: string = 'unknown') {
  if (!isNative) {
    console.log('📱 Pas de pub (web) - Context:', context);
    return;
  }

  interstitialAdCounter++;
  const adNumber = interstitialAdCounter;

  try {
    console.log(`📺 [PUB #${adNumber}] Demande d'affichage - Context: ${context}`);

    // ✅ Stratégie 1 : Si pub prête, afficher immédiatement
    if (isInterstitialReady) {
      console.log(`⚡ [PUB #${adNumber}] Affichage instantané (préchargée)`);

      await AdMob.showInterstitial();
      console.log(`✅ [PUB #${adNumber}] Affichée avec succès - Context: ${context}`);

      isInterstitialReady = false;

      // Précharger la suivante immédiatement
      prepareInterstitial();

    } else {
      // ✅ Stratégie 2 : Pub pas prête, préparer + attendre + afficher
      console.log(`⏳ [PUB #${adNumber}] Pas prête, préparation en cours...`);

      await prepareInterstitial();

      // Attendre que la pub soit prête (max 3 secondes)
      let attempts = 0;
      while (!isInterstitialReady && attempts < 6) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }

      if (isInterstitialReady) {
        await AdMob.showInterstitial();
        console.log(`✅ [PUB #${adNumber}] Affichée après préparation - Context: ${context}`);
        isInterstitialReady = false;

        // Précharger la suivante
        prepareInterstitial();
      } else {
        console.log(`⚠️ [PUB #${adNumber}] Timeout, pub ignorée - Context: ${context}`);
      }
    }

  } catch (error: any) {
    console.error(`❌ [PUB #${adNumber}] Erreur - Context: ${context}`, error);
    isInterstitialReady = false;

    // Réessayer une fois en mode fallback
    try {
      console.log(`🔄 [PUB #${adNumber}] Tentative de fallback...`);

      await AdMob.prepareInterstitial({
        adId: INTERSTITIAL_AD_ID,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      await AdMob.showInterstitial();
      console.log(`✅ [PUB #${adNumber}] Affichée après fallback - Context: ${context}`);

      // Précharger la suivante
      prepareInterstitial();

    } catch (retryError) {
      console.error(`❌ [PUB #${adNumber}] Échec complet - Context: ${context}`, retryError);

      // Réessayer de précharger pour la prochaine fois
      setTimeout(() => prepareInterstitial(), 5000);
    }
  }
}

// ✅ Pub récompensée (pour Bonus Roll)
export async function showRewardedAd(): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub récompense (web)');
    return true; // En mode web, débloquer quand même
  }

  try {
    console.log('🎁 Préparation pub récompensée...');

    await AdMob.prepareRewardVideoAd({
      adId: REWARDED_AD_ID, // ✅ Utilise ton ID
    });

    console.log('⏳ Attente que la pub soit prête...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('🎬 Affichage de la pub récompensée...');
    const result = await AdMob.showRewardVideoAd();

    console.log('📊 Résultat pub récompensée:', result);

    // ✅ Vérifier si l'utilisateur a bien regardé jusqu'au bout
    if (result && (result.rewardType || result.rewarded === true)) {
      console.log(`✅ Récompense obtenue ! Type: ${result.rewardType || 'default'}, Montant: ${result.rewardAmount || 1}`);
      return true; // L'utilisateur a regardé en entier
    }

    console.log('⚠️ Pub fermée avant la fin ou erreur');
    return false;

  } catch (error: any) {
    console.error('❌ Erreur pub récompense:', error);

    // Si l'erreur dit que la pub n'est pas prête, c'est OK de débloquer quand même
    if (error?.message?.includes('not ready') || error?.message?.includes('not loaded')) {
      console.log('⚠️ Pub pas disponible, déblocage gratuit');
      return true; // Débloquer quand même (meilleure UX)
    }

    return false;
  }
}

// ✅ Utilitaire : Vérifier si une pub est prête
export function isInterstitialAvailable(): boolean {
  return isInterstitialReady;
}

// ✅ Debug : Afficher l'état des pubs
export function getAdStatus() {
  return {
    isNative,
    platform,
    mode: IS_PRODUCTION ? 'PRODUCTION' : 'TEST',
    bannerAdId: BANNER_AD_ID,
    interstitialAdId: INTERSTITIAL_AD_ID,
    rewardedAdId: REWARDED_AD_ID, // ✅ Ajouté
    isInterstitialReady,
    isPreparingInterstitial,
    adCounter: interstitialAdCounter,
  };
}

// ✅ Afficher le statut dans la console (debug)
if (!IS_PRODUCTION) {
  (window as any).getAdStatus = getAdStatus;
  console.log('🐛 Debug mode: Tapez "getAdStatus()" dans la console pour voir l\'état des pubs');
}