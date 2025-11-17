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

// ⛔️ FIX : on stocke manuellement les listeners
let _allListeners: { remove: () => void }[] = [];

// ⛔️ FIX helper pour enregistrer proprement un listener
function _addListener(event: string, callback: any) {
  const listener = (AdMob.addListener as any)(event, callback);
  _allListeners.push(listener);
  return listener;
}

// ⛔️ FIX remplacement de removeAllListeners()
function _removeAllListenersSafe() {
  _allListeners.forEach(l => {
    try { l.remove(); } catch {}
  });
  _allListeners = [];
}

// Variables pubs
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

    // 🛠️ Enregistrement des listeners (CORRIGÉ avec notre wrapper)
    _addListener('interstitialAdLoaded', () => {
      console.log('✅ Pub interstitielle chargée et prête');
      isInterstitialReady = true;
    });

    _addListener('interstitialAdFailedToLoad', (error: any) => {
      console.error('❌ Échec chargement pub interstitielle:', error);
      isInterstitialReady = false;
    });

    _addListener('interstitialAdShowed', () => {
      console.log('👁️ Pub interstitielle affichée');
      isInterstitialShowing = true;
    });

    _addListener('interstitialAdDismissed', () => {
      console.log('✅ Pub interstitielle fermée par l\'utilisateur');
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    _addListener('interstitialAdFailedToShow', (error: any) => {
      console.error('❌ Échec affichage pub interstitielle:', error);
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    _addListener('onRewardedVideoAdLoaded', () => {
      console.log('✅ Pub récompensée chargée et prête');
      isRewardedReady = true;
    });

    _addListener('onRewardedVideoAdFailedToLoad', (error: any) => {
      console.error('❌ Échec chargement pub récompensée:', error);
      isRewardedReady = false;
    });

    _addListener('onRewardedVideoAdShowed', () => {
      console.log('👁️ Pub récompensée affichée');
      isRewardedShowing = true;
    });

    _addListener('onRewardedVideoAdDismissed', () => {
      console.log('✅ Pub récompensée fermée');
      isRewardedReady = false;
      isRewardedShowing = false;
    });

    _addListener('onRewardedVideoAdFailedToShow', (error: any) => {
      console.error('❌ Échec affichage pub récompensée:', error);
      isRewardedReady = false;
      isRewardedShowing = false;
    });

    _addListener('onRewarded', (reward: AdMobRewardItem) => {
      console.log('🎁 Récompense gagnée:', reward);
    });

    console.log(`✅ AdMob initialisé en mode ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
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

// Compteur global
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

// 🎁 PUB RÉCOMPENSÉE
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
    let adShown = false;
    let resolved = false;
    let rewardReceived = false;

    const safetyTimeout = setTimeout(() => {
      if (!resolved) {
        console.log(`⏰ [PUB RÉCOMPENSÉE #${adNumber}] Timeout - Force résolution`);
        resolved = true;
        isRewardedShowing = false;
        resolve(false);
      }
    }, 60000);

    try {
      console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] Préparation... Context: ${context}`);

      const showedListener = _addListener('onRewardedVideoAdShowed', () => {
        console.log(`👁️ [PUB RÉCOMPENSÉE #${adNumber}] Affichée à l'écran`);
        adShown = true;
      });

      const rewardListener = _addListener('onRewarded', (reward: AdMobRewardItem) => {
        console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] Récompense obtenue:`, reward);
        rewardReceived = true;
      });

      const dismissListener = _addListener('onRewardedVideoAdDismissed', () => {
        if (!resolved) {
          console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Fermée`);

          clearTimeout(safetyTimeout);
          showedListener.remove();
          rewardListener.remove();
          dismissListener.remove();

          isRewardedShowing = false;
          resolved = true;

          resolve(adShown && rewardReceived);
        }
      });

      const options: RewardAdOptions = { adId: REWARDED_AD_ID };

      await AdMob.prepareRewardVideoAd(options);
      await new Promise(r => setTimeout(r, 1500));

      await AdMob.showRewardVideoAd();
      console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Commande d'affichage envoyée`);

    } catch (error) {
      console.error(`❌ [PUB RÉCOMPENSÉE #${adNumber}] Erreur`, error);
      clearTimeout(safetyTimeout);
      isRewardedShowing = false;

      if (!resolved) {
        resolved = true;
        resolve(false);
      }
    }
  });
}

// 🧹 FIX : cleanup sécurisé
export async function cleanup() {
  if (!isNative) return;

  try {
    console.log('🧹 Nettoyage listeners AdMob...');
    _removeAllListenersSafe();
    console.log('🧹 Listeners nettoyés');
  } catch (e) {
    console.error('❌ Erreur cleanup:', e);
  }
}
