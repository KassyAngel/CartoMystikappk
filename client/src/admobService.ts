import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  RewardAdOptions,
  AdMobRewardItem,
  AdMobError 
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();

// 🎯 INTERRUPTEUR : Changez cette valeur pour passer de TEST à PRODUCTION
const IS_PRODUCTION = false; // ⚠️ Mettre à true avant la soumission finale

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

// 🎁 ID pour les pubs récompensées (Bonus Roll)
const REWARDED_AD_ID = isNative
  ? (IS_PRODUCTION
      ? 'ca-app-pub-5733508257471048/7281390536'  // 🚀 PROD - Rewarded
      : 'ca-app-pub-3940256099942544/5224354917') // 🧪 TEST Rewarded
  : '';

// ✅ Variables pour suivre l'état des pubs
let isInterstitialReady = false;
let isInterstitialShowing = false;
let isRewardedReady = false;
let isRewardedShowing = false;

export async function initialize() {
  console.log(`📱 Initialisation AdMob - Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
  console.log(`📱 Platform: ${platform}, isNative: ${isNative}`);

  if (!isNative) {
    console.log('📱 AdMob ignoré (pas sur mobile natif) - Vous êtes sur:', platform);
    return;
  }

  try {
    await AdMob.initialize({
      testingDevices: IS_PRODUCTION ? [] : ['YOUR_DEVICE_ID'],
      initializeForTesting: !IS_PRODUCTION,
    });

    // ✅ Écouter les événements des pubs interstitielles
    AdMob.addListener('interstitialAdLoaded', () => {
      console.log('✅ Pub interstitielle chargée et prête');
      isInterstitialReady = true;
    });

    AdMob.addListener('interstitialAdFailedToLoad', (error: AdMobError) => {
      console.error('❌ Échec chargement pub interstitielle:', error);
      isInterstitialReady = false;
    });

    AdMob.addListener('interstitialAdShowed', () => {
      console.log('👁️ Pub interstitielle affichée');
      isInterstitialShowing = true;
    });

    AdMob.addListener('interstitialAdDismissed', () => {
      console.log('✅ Pub interstitielle fermée par l\'utilisateur');
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    AdMob.addListener('interstitialAdFailedToShow', (error: AdMobError) => {
      console.error('❌ Échec affichage pub interstitielle:', error);
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    // 🎁 Écouter les événements des pubs récompensées
    AdMob.addListener('onRewardedVideoAdLoaded', () => {
      console.log('✅ Pub récompensée chargée et prête');
      isRewardedReady = true;
    });

    AdMob.addListener('onRewardedVideoAdFailedToLoad', (error: AdMobError) => {
      console.error('❌ Échec chargement pub récompensée:', error);
      isRewardedReady = false;
    });

    AdMob.addListener('onRewardedVideoAdShowed', () => {
      console.log('👁️ Pub récompensée affichée');
      isRewardedShowing = true;
    });

    AdMob.addListener('onRewardedVideoAdDismissed', () => {
      console.log('✅ Pub récompensée fermée');
      isRewardedReady = false;
      isRewardedShowing = false;
    });

    AdMob.addListener('onRewardedVideoAdFailedToShow', (error: AdMobError) => {
      console.error('❌ Échec affichage pub récompensée:', error);
      isRewardedReady = false;
      isRewardedShowing = false;
    });

    AdMob.addListener('onRewarded', (reward: AdMobRewardItem) => {
      console.log('🎁 Récompense gagnée:', reward);
    });

    console.log(`✅ AdMob initialisé en mode ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
    console.log(`📺 Bannière ID: ${BANNER_AD_ID}`);
    console.log(`📺 Interstitiel ID: ${INTERSTITIAL_AD_ID}`);
    console.log(`🎁 Rewarded ID: ${REWARDED_AD_ID}`);
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

// Compteur global pour tracer les pubs interstitielles
let interstitialAdCounter = 0;

export async function showInterstitialAd(context: string = 'unknown') {
  if (!isNative) {
    console.log('📱 Pas de pub (web) - Context:', context);
    return;
  }

  if (isInterstitialShowing) {
    console.log('⚠️ Une pub interstitielle est déjà affichée, on attend...');
    return;
  }

  interstitialAdCounter++;
  const adNumber = interstitialAdCounter;

  try {
    console.log(`📺 [PUB INTERSTITIEL #${adNumber}] Préparation... Context: ${context}`);

    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await AdMob.showInterstitial();
    console.log(`✅ [PUB INTERSTITIEL #${adNumber}] Affichée - Context: ${context}`, result);

  } catch (error: any) {
    console.error(`❌ [PUB INTERSTITIEL #${adNumber}] Erreur - Context: ${context}`, error);
    isInterstitialShowing = false;

    if (error?.message?.includes('not ready')) {
      console.log(`⏳ [PUB INTERSTITIEL #${adNumber}] Pas prête, réessai...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        await AdMob.showInterstitial();
        console.log(`✅ [PUB INTERSTITIEL #${adNumber}] Affichée après réessai`);
      } catch (retryError) {
        console.error(`❌ [PUB INTERSTITIEL #${adNumber}] Échec après réessai`, retryError);
        isInterstitialShowing = false;
      }
    }
  }
}

// 🎁 NOUVELLE FONCTION : Pub récompensée pour Bonus Roll
let rewardedAdCounter = 0;

export async function showRewardedAd(context: string = 'bonus_roll'): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub récompensée (web) - Context:', context);
    return true; // On considère comme réussi sur web
  }

  if (isRewardedShowing) {
    console.log('⚠️ Une pub récompensée est déjà affichée');
    return false;
  }

  rewardedAdCounter++;
  const adNumber = rewardedAdCounter;

  return new Promise(async (resolve) => {
    let rewardedGranted = false;

    try {
      console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] Préparation... Context: ${context}`);

      // ✅ Écouter la récompense AVANT d'afficher la pub
      const rewardListener = AdMob.addListener('onRewarded', (reward: AdMobRewardItem) => {
        console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] Récompense obtenue:`, reward);
        rewardedGranted = true;
      });

      // ✅ Écouter la fermeture
      const dismissListener = AdMob.addListener('onRewardedVideoAdDismissed', () => {
        console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Fermée - Récompense: ${rewardedGranted ? 'OUI' : 'NON'}`);
        rewardListener.remove();
        dismissListener.remove();
        isRewardedShowing = false;
        resolve(rewardedGranted); // Retourne true seulement si la récompense a été gagnée
      });

      // ✅ Préparer la pub récompensée
      const options: RewardAdOptions = {
        adId: REWARDED_AD_ID,
      };

      await AdMob.prepareRewardVideoAd(options);

      // Attendre que la pub soit prête
      await new Promise(r => setTimeout(r, 1500));

      // ✅ Afficher la pub
      await AdMob.showRewardVideoAd();
      console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Affichée - Context: ${context}`);

    } catch (error: any) {
      console.error(`❌ [PUB RÉCOMPENSÉE #${adNumber}] Erreur - Context: ${context}`, error);
      isRewardedShowing = false;
      resolve(false); // Erreur = pas de récompense
    }
  });
}

// ✅ Fonction pour nettoyer les listeners
export async function cleanup() {
  if (!isNative) return;

  try {
    await AdMob.removeAllListeners();
    console.log('🧹 Listeners AdMob nettoyés');
  } catch (error) {
    console.error('❌ Erreur nettoyage listeners:', error);
  }
}