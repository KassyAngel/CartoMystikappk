import { 
  AdMob, 
  BannerAdOptions, 
  BannerAdSize, 
  BannerAdPosition, 
  RewardAdOptions,
  AdMobRewardItem,
  RewardAdPluginEvents,
  AdLoadInfo
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const AdMobError = Error;

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

// ✅ Variables pour suivre l'état des pubs
let isInterstitialReady = false;
let isInterstitialShowing = false;
let isRewardedReady = false;
let isRewardedShowing = false;

// 🎁 Variables globales pour les pubs récompensées
let currentRewardResolve: ((value: boolean) => void) | null = null;
let rewardReceived = false;
let adShown = false;

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
    (AdMob.addListener as any)('interstitialAdLoaded', () => {
      console.log('✅ Pub interstitielle chargée et prête');
      isInterstitialReady = true;
    });

    (AdMob.addListener as any)('interstitialAdFailedToLoad', (error: any) => {
      console.error('❌ Échec chargement pub interstitielle:', error);
      isInterstitialReady = false;
    });

    (AdMob.addListener as any)('interstitialAdShowed', () => {
      console.log('👁️ Pub interstitielle affichée');
      isInterstitialShowing = true;
    });

    (AdMob.addListener as any)('interstitialAdDismissed', () => {
      console.log('✅ Pub interstitielle fermée par l\'utilisateur');
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    (AdMob.addListener as any)('interstitialAdFailedToShow', (error: any) => {
      console.error('❌ Échec affichage pub interstitielle:', error);
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    // 🎁 CORRECTION CRITIQUE : Utiliser les BONS noms d'événements
    (AdMob.addListener as any)(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      console.log('✅ [GLOBAL] Pub récompensée chargée:', info);
      isRewardedReady = true;
    });

    (AdMob.addListener as any)(RewardAdPluginEvents.FailedToLoad, (error: any) => {
      console.error('❌ [GLOBAL] Échec chargement pub récompensée:', error);
      isRewardedReady = false;
    });

    (AdMob.addListener as any)(RewardAdPluginEvents.Showed, () => {
      console.log('👁️ [GLOBAL] Pub récompensée affichée à l\'écran');
      adShown = true;
    });

    (AdMob.addListener as any)(RewardAdPluginEvents.Dismissed, () => {
      console.log('🚪 [GLOBAL] Pub récompensée fermée');

      // ✅ Attendre 1 seconde pour être SÛR
      setTimeout(() => {
        console.log('🎯 [GLOBAL] Résolution après fermeture:');
        console.log(`   ├─ Mode: ${IS_PRODUCTION ? 'PRODUCTION 🚀' : 'TEST 🧪'}`);
        console.log(`   ├─ Pub affichée: ${adShown ? '✅' : '❌'}`);
        console.log(`   ├─ Récompense reçue: ${rewardReceived ? '✅' : '❌'}`);

        let shouldUnlock = false;
        let reason = '';

        if (IS_PRODUCTION) {
          // 🚀 PRODUCTION : Débloque SEULEMENT si récompense reçue
          shouldUnlock = adShown && rewardReceived;
          reason = shouldUnlock 
            ? '✅ PRODUCTION: Pub vue + Récompense reçue'
            : `❌ PRODUCTION: ${!adShown ? 'Pub non affichée' : 'Récompense non reçue'}`;
        } else {
          // 🧪 TEST : Débloque si la pub a été affichée (peu importe la récompense)
          shouldUnlock = adShown;
          reason = shouldUnlock 
            ? '✅ TEST: Pub affichée (récompense ignorée en mode test)'
            : '❌ TEST: Pub non affichée';
        }

        console.log(`   └─ Résultat: ${reason}`);

        if (currentRewardResolve) {
          currentRewardResolve(shouldUnlock);
          currentRewardResolve = null;
        }

        // Reset complet
        isRewardedReady = false;
        isRewardedShowing = false;
        rewardReceived = false;
        adShown = false;
      }, 1000); // ✅ 1 seconde au lieu de 500ms
    });

    (AdMob.addListener as any)(RewardAdPluginEvents.FailedToShow, (error: any) => {
      console.error('❌ [GLOBAL] Échec affichage pub récompensée:', error);
      if (currentRewardResolve) {
        currentRewardResolve(false);
        currentRewardResolve = null;
      }
      isRewardedReady = false;
      isRewardedShowing = false;
      rewardReceived = false;
      adShown = false;
    });

    // ✅ ÉVÉNEMENT CRITIQUE : La récompense elle-même
    (AdMob.addListener as any)(RewardAdPluginEvents.Rewarded, (reward: AdMobRewardItem) => {
      console.log('🎁✅ [GLOBAL] RÉCOMPENSE REÇUE:', reward);
      rewardReceived = true;
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

// 🎁 PUB RÉCOMPENSÉE - VERSION FINALE CORRIGÉE
let rewardedAdCounter = 0;

export async function showRewardedAd(context: string = 'bonus_roll'): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub récompensée (web) - Context:', context);
    return true; // ✅ En web, on débloque toujours
  }

  if (isRewardedShowing) {
    console.log('⚠️ Une pub récompensée est déjà affichée');
    return false;
  }

  rewardedAdCounter++;
  const adNumber = rewardedAdCounter;

  return new Promise(async (resolve) => {
    // ✅ Timeout de sécurité (60 secondes max)
    const safetyTimeout = setTimeout(() => {
      console.log(`⏰ [PUB RÉCOMPENSÉE #${adNumber}] Timeout - Échec`);
      if (currentRewardResolve) {
        currentRewardResolve(false);
        currentRewardResolve = null;
      }
      isRewardedShowing = false;
      resolve(false);
    }, 60000);

    try {
      console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] Démarrage... Context: ${context}`);

      // ✅ Stocker la fonction resolve
      currentRewardResolve = (success: boolean) => {
        clearTimeout(safetyTimeout);
        resolve(success);
      };

      // ✅ Reset des flags
      rewardReceived = false;
      adShown = false;
      isRewardedShowing = true;

      // ✅ Préparer la pub récompensée
      const options: RewardAdOptions = {
        adId: REWARDED_AD_ID,
      };

      await AdMob.prepareRewardVideoAd(options);
      console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Préparée`);

      // ✅ Attendre 1.5s pour être sûr
      await new Promise(r => setTimeout(r, 1500));

      // ✅ Afficher la pub
      await AdMob.showRewardVideoAd();
      console.log(`🎬 [PUB RÉCOMPENSÉE #${adNumber}] Commande d'affichage envoyée`);

    } catch (error: any) {
      console.error(`❌ [PUB RÉCOMPENSÉE #${adNumber}] Erreur - Context: ${context}`, error);
      clearTimeout(safetyTimeout);
      if (currentRewardResolve) {
        currentRewardResolve(false);
        currentRewardResolve = null;
      }
      isRewardedShowing = false;
      resolve(false);
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