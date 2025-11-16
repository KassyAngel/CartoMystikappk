import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  RewardAdOptions,
  AdMobRewardItem
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const AdMobError = Error;

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();

const IS_PRODUCTION = false;

console.log('🔍 Détection plateforme AdMob:', {
  isNative,
  platform,
  mode: IS_PRODUCTION ? '🚀 PRODUCTION' : '🧪 TEST',
});

// 📱 IDs AdMob
const BANNER_AD_ID = isNative 
  ? (IS_PRODUCTION 
      ? 'ca-app-pub-5733508257471048/2428210645'
      : 'ca-app-pub-3940256099942544/6300978111')
  : '';

const INTERSTITIAL_AD_ID = isNative
  ? (IS_PRODUCTION 
      ? 'ca-app-pub-5733508257471048/5422426681'
      : 'ca-app-pub-3940256099942544/1033173712')
  : '';

const REWARDED_AD_ID = isNative
  ? (IS_PRODUCTION
      ? 'ca-app-pub-5733508257471048/7281390536'
      : 'ca-app-pub-3940256099942544/5224354917')
  : '';

// ✅ Variables globales pour les pubs récompensées
let isRewardedShowing = false;
let currentRewardResolve: ((value: boolean) => void) | null = null;
let rewardReceived = false;
let adShown = false;

export async function initialize() {
  console.log(`📱 Initialisation AdMob - Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);

  if (!isNative) {
    console.log('📱 AdMob ignoré (pas sur mobile natif)');
    return;
  }

  try {
    await AdMob.initialize({
      testingDevices: IS_PRODUCTION ? [] : ['YOUR_DEVICE_ID'],
      initializeForTesting: !IS_PRODUCTION,
    });

    // ✅ LISTENERS GLOBAUX POUR PUBS RÉCOMPENSÉES
    (AdMob.addListener as any)('onRewardedVideoAdLoaded', () => {
      console.log('✅ Pub récompensée chargée');
    });

    (AdMob.addListener as any)('onRewardedVideoAdFailedToLoad', (error: any) => {
      console.error('❌ Échec chargement pub récompensée:', error);
    });

    (AdMob.addListener as any)('onRewardedVideoAdShowed', () => {
      console.log('👁️ [GLOBAL] Pub récompensée affichée');
      adShown = true;
      isRewardedShowing = true;
    });

    (AdMob.addListener as any)('onRewarded', (reward: AdMobRewardItem) => {
      console.log('🎁✅ [GLOBAL] RÉCOMPENSE REÇUE:', reward);
      rewardReceived = true;
    });

    (AdMob.addListener as any)('onRewardedVideoAdDismissed', () => {
      console.log('🚪 [GLOBAL] Pub récompensée fermée');
      isRewardedShowing = false;

      // ✅ Attendre 1 seconde puis résoudre
      setTimeout(() => {
        if (currentRewardResolve) {
          const shouldUnlock = adShown && (rewardReceived || !IS_PRODUCTION);

          console.log('🎯 [GLOBAL] Résolution:');
          console.log(`   ├─ Mode: ${IS_PRODUCTION ? 'PROD' : 'TEST'}`);
          console.log(`   ├─ Pub affichée: ${adShown ? '✅' : '❌'}`);
          console.log(`   ├─ Récompense: ${rewardReceived ? '✅' : '❌'}`);
          console.log(`   └─ Résultat: ${shouldUnlock ? '✅ DÉBLOQUÉ' : '❌ BLOQUÉ'}`);

          currentRewardResolve(shouldUnlock);
          currentRewardResolve = null;
          rewardReceived = false;
          adShown = false;
        }
      }, 1000);
    });

    (AdMob.addListener as any)('onRewardedVideoAdFailedToShow', (error: any) => {
      console.error('❌ Échec affichage pub récompensée:', error);
      isRewardedShowing = false;
      if (currentRewardResolve) {
        currentRewardResolve(false);
        currentRewardResolve = null;
      }
    });

    console.log(`✅ AdMob initialisé en mode ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
  } catch (error) {
    console.error('❌ Erreur init AdMob:', error);
  }
}

export async function showBanner() {
  if (!isNative) return;
  try {
    await AdMob.showBanner({
      adId: BANNER_AD_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    });
    console.log('✅ Bannière affichée');
  } catch (error) {
    console.error('❌ Erreur bannière:', error);
  }
}

export async function hideBanner() {
  if (!isNative) return;
  try {
    await AdMob.hideBanner();
  } catch (error) {
    console.error('❌ Erreur hide bannière:', error);
  }
}

export async function removeBanner() {
  if (!isNative) return;
  try {
    await AdMob.removeBanner();
  } catch (error) {
    console.error('❌ Erreur remove bannière:', error);
  }
}

let interstitialAdCounter = 0;

export async function showInterstitialAd(context: string = 'unknown') {
  if (!isNative) return;

  interstitialAdCounter++;
  const adNumber = interstitialAdCounter;

  try {
    console.log(`📺 [INTERSTITIEL #${adNumber}] Context: ${context}`);
    await AdMob.prepareInterstitial({ adId: INTERSTITIAL_AD_ID });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await AdMob.showInterstitial();
    console.log(`✅ [INTERSTITIEL #${adNumber}] Affichée`);
  } catch (error: any) {
    console.error(`❌ [INTERSTITIEL #${adNumber}] Erreur:`, error);
  }
}

// 🎁 PUB RÉCOMPENSÉE - VERSION SIMPLIFIÉE AVEC LISTENERS GLOBAUX
let rewardedAdCounter = 0;

export async function showRewardedAd(context: string = 'bonus_roll'): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub (web) - Context:', context);
    return true;
  }

  if (isRewardedShowing) {
    console.log('⚠️ Une pub récompensée est déjà affichée');
    return false;
  }

  rewardedAdCounter++;
  const adNumber = rewardedAdCounter;

  // ✅ Reset des états
  rewardReceived = false;
  adShown = false;

  return new Promise(async (resolve) => {
    // ✅ Stocker le resolve pour que le listener global puisse l'appeler
    currentRewardResolve = resolve;

    // ✅ Timeout de sécurité
    const safetyTimeout = setTimeout(() => {
      if (currentRewardResolve) {
        console.log(`⏰ [PUB #${adNumber}] TIMEOUT`);
        currentRewardResolve(false);
        currentRewardResolve = null;
      }
    }, 60000);

    try {
      console.log(`🎁 [PUB #${adNumber}] Démarrage... Context: ${context}`);

      const options: RewardAdOptions = {
        adId: REWARDED_AD_ID,
      };

      await AdMob.prepareRewardVideoAd(options);
      console.log(`✅ [PUB #${adNumber}] Préparée`);

      await new Promise(r => setTimeout(r, 1500));

      await AdMob.showRewardVideoAd();
      console.log(`🎬 [PUB #${adNumber}] Commande d'affichage envoyée`);

      // ✅ Nettoyer le timeout si tout se passe bien
      setTimeout(() => clearTimeout(safetyTimeout), 65000);

    } catch (error: any) {
      console.error(`❌ [PUB #${adNumber}] ERREUR:`, error);
      clearTimeout(safetyTimeout);
      if (currentRewardResolve) {
        currentRewardResolve(false);
        currentRewardResolve = null;
      }
    }
  });
}

export async function cleanup() {
  if (!isNative) return;
  try {
    await (AdMob as any).removeAllListeners();
    console.log('🧹 Listeners AdMob nettoyés');
  } catch (error) {
    console.error('❌ Erreur nettoyage listeners:', error);
  }
}