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

    // 🎁 Écouter les événements des pubs récompensées
    (AdMob.addListener as any)('onRewardedVideoAdLoaded', () => {
      console.log('✅ Pub récompensée chargée et prête');
      isRewardedReady = true;
    });

    (AdMob.addListener as any)('onRewardedVideoAdFailedToLoad', (error: any) => {
      console.error('❌ Échec chargement pub récompensée:', error);
      isRewardedReady = false;
    });

    (AdMob.addListener as any)('onRewardedVideoAdShowed', () => {
      console.log('👁️ Pub récompensée affichée');
      isRewardedShowing = true;
    });

    (AdMob.addListener as any)('onRewardedVideoAdDismissed', () => {
      console.log('✅ Pub récompensée fermée');
      isRewardedReady = false;
      isRewardedShowing = false;
    });

    (AdMob.addListener as any)('onRewardedVideoAdFailedToShow', (error: any) => {
      console.error('❌ Échec affichage pub récompensée:', error);
      isRewardedReady = false;
      isRewardedShowing = false;
    });

    (AdMob.addListener as any)('onRewarded', (reward: AdMobRewardItem) => {
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

// 🎁 PUB RÉCOMPENSÉE - VERSION ULTRA-ROBUSTE
let rewardedAdCounter = 0;

export async function showRewardedAd(context: string = 'bonus_roll'): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub récompensée (web) - Context:', context);
    return true;
  }

  if (isRewardedShowing) {
    console.log('⚠️ Une pub récompensée est déjà affichée');
    return false;
  }

  rewardedAdCounter++;
  const adNumber = rewardedAdCounter;

  return new Promise(async (resolve) => {
    let resolved = false;
    let rewardReceived = false;
    let adShown = false;
    let dismissCalled = false;

    // ✅ Timeout de sécurité (60 secondes)
    const safetyTimeout = setTimeout(() => {
      if (!resolved) {
        console.log(`⏰ [PUB RÉCOMPENSÉE #${adNumber}] TIMEOUT après 60s`);
        resolved = true;
        isRewardedShowing = false;
        resolve(false);
      }
    }, 60000);

    // ✅ Fonction de résolution finale
    const finalResolve = () => {
      if (resolved) return;

      const shouldUnlock = adShown && rewardReceived;
      console.log(`🎯 [PUB RÉCOMPENSÉE #${adNumber}] RÉSOLUTION FINALE:`);
      console.log(`   ├─ Pub affichée: ${adShown ? '✅ OUI' : '❌ NON'}`);
      console.log(`   ├─ Récompense reçue: ${rewardReceived ? '✅ OUI' : '❌ NON'}`);
      console.log(`   └─ Résultat: ${shouldUnlock ? '✅ DÉBLOQUÉ' : '❌ BLOQUÉ'}`);

      clearTimeout(safetyTimeout);
      isRewardedShowing = false;
      resolved = true;
      resolve(shouldUnlock);
    };

    try {
      console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] Démarrage... Context: ${context}`);

      // ✅ ÉTAPE 1 : Écouter la récompense (PRIORITÉ ABSOLUE)
      const rewardListener = (AdMob.addListener as any)('onRewarded', (reward: AdMobRewardItem) => {
        console.log(`🎁✅ [PUB RÉCOMPENSÉE #${adNumber}] RÉCOMPENSE REÇUE:`, reward);
        rewardReceived = true;

        // ✅ Si dismiss déjà appelé, résoudre immédiatement
        if (dismissCalled) {
          console.log(`⚡ [PUB RÉCOMPENSÉE #${adNumber}] Dismiss déjà appelé, résolution immédiate`);
          rewardListener.remove();
          finalResolve();
        }
      });

      // ✅ ÉTAPE 2 : Écouter l'affichage
      const showedListener = (AdMob.addListener as any)('onRewardedVideoAdShowed', () => {
        console.log(`👁️ [PUB RÉCOMPENSÉE #${adNumber}] Affichée à l'écran`);
        adShown = true;
      });

      // ✅ ÉTAPE 3 : Écouter la fermeture (attendre 2 secondes)
      const dismissListener = (AdMob.addListener as any)('onRewardedVideoAdDismissed', () => {
        console.log(`🚪 [PUB RÉCOMPENSÉE #${adNumber}] Fermée - Attente 2s pour la récompense...`);
        dismissCalled = true;

        // ✅ CRITIQUE : Attendre 2 SECONDES (pas 500ms)
        setTimeout(() => {
          console.log(`⏰ [PUB RÉCOMPENSÉE #${adNumber}] Fin du délai de 2s`);
          showedListener.remove();
          rewardListener.remove();
          dismissListener.remove();
          finalResolve();
        }, 2000); // ✅ 2 SECONDES au lieu de 500ms
      });

      // ✅ ÉTAPE 4 : Préparer la pub
      const options: RewardAdOptions = {
        adId: REWARDED_AD_ID,
      };

      console.log(`⏳ [PUB RÉCOMPENSÉE #${adNumber}] Préparation...`);
      await AdMob.prepareRewardVideoAd(options);
      console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Préparée, attente 1.5s...`);
      await new Promise(r => setTimeout(r, 1500));

      // ✅ ÉTAPE 5 : Afficher la pub
      await AdMob.showRewardVideoAd();
      console.log(`🎬 [PUB RÉCOMPENSÉE #${adNumber}] Commande d'affichage envoyée`);

    } catch (error: any) {
      console.error(`❌ [PUB RÉCOMPENSÉE #${adNumber}] ERREUR:`, error);
      clearTimeout(safetyTimeout);
      isRewardedShowing = false;
      if (!resolved) {
        resolved = true;
        resolve(false);
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