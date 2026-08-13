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
const IS_PRODUCTION = true; // ⚠️ Mettre à true avant la soumission finale

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

// 🎯 Variables pour le pré-chargement intelligent
let isInterstitialReady = false;
let isInterstitialLoading = false;
let isInterstitialShowing = false;

// 🔴 NOUVEAU : source de vérité interne du statut Premium.
// Le service ne dépend plus uniquement du timing des appels React —
// il vérifie lui-même ce flag avant CHAQUE commande native, y compris
// juste avant qu'une bannière déjà "en vol" (showBanner() appelé mais
// pas encore chargé côté natif) ne se rende visible. Ça règle le bug
// où une bannière commandée juste avant l'achat finissait par
// s'afficher APRÈS le hideBanner(), car sa requête réseau AdMob
// aboutissait plus tard.
let isPremiumActive = false;

export function setPremiumStatus(premium: boolean) {
  const changed = isPremiumActive !== premium;
  isPremiumActive = premium;
  if (changed) {
    console.log(`👑 [AdMob] Statut Premium mis à jour: ${premium}`);
  }
  // Dès qu'on devient Premium, on nettoie tout de suite, au cas où une
  // bannière serait déjà visible ou en cours de chargement.
  if (premium && isNative) {
    removeBanner();
  }
}

export async function initialize() {
  console.log(`📱 Initialisation AdMob - Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
  console.log(`📱 Platform: ${platform}, isNative: ${isNative}`);

  if (!isNative) {
    console.log('📱 AdMob ignoré (pas sur mobile natif) - Vous êtes sur:', platform);
    return;
  }

  try {
    await AdMob.initialize({
      testingDevices: IS_PRODUCTION ? [] : ['1763659614607'],
      initializeForTesting: !IS_PRODUCTION,
    });

    // 🛠️ Enregistrement des listeners
    _addListener('interstitialAdLoaded', () => {
      console.log('✅ Pub interstitielle chargée et prête');
      isInterstitialReady = true;
      isInterstitialLoading = false;
    });

    _addListener('interstitialAdFailedToLoad', (error: any) => {
      console.error('❌ Échec chargement pub interstitielle:', error);
      isInterstitialReady = false;
      isInterstitialLoading = false;
    });

    _addListener('interstitialAdShowed', () => {
      console.log('👁️ Pub interstitielle affichée');
      isInterstitialShowing = true;
    });

    _addListener('interstitialAdDismissed', () => {
      console.log('✅ Pub interstitielle fermée par l\'utilisateur');
      isInterstitialReady = false;
      isInterstitialShowing = false;
      // 🔄 Recharger une nouvelle pub pour la prochaine fois (sauf si Premium)
      if (!isPremiumActive) {
        setTimeout(() => preloadInterstitial(), 1000);
      }
    });

    _addListener('interstitialAdFailedToShow', (error: any) => {
      console.error('❌ Échec affichage pub interstitielle:', error);
      isInterstitialReady = false;
      isInterstitialShowing = false;
    });

    console.log(`✅ AdMob initialisé en mode ${IS_PRODUCTION ? 'PRODUCTION' : 'TEST'}`);
  } catch (error) {
    console.error('❌ Erreur init AdMob:', error);
  }
}

// 🎯 NOUVELLE FONCTION : Pré-charger la pub sans l'afficher
export async function preloadInterstitial() {
  if (!isNative || isPremiumActive) return;

  // Éviter de charger plusieurs fois
  if (isInterstitialReady || isInterstitialLoading) {
    console.log('⏭️ Pub déjà prête ou en chargement, skip');
    return;
  }

  try {
    console.log('🔄 PRÉ-CHARGEMENT pub interstitielle...');
    isInterstitialLoading = true;

    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
    });

    console.log('✅ Pub interstitielle pré-chargée avec succès');
  } catch (error) {
    console.error('❌ Erreur pré-chargement interstitielle:', error);
    isInterstitialLoading = false;
  }
}

// 🎯 FONCTION AMÉLIORÉE : Affiche instantanément si prête, sinon attend
export async function showInterstitialAd(context: string = 'unknown'): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub (web) - Context:', context);
    return true;
  }

  // 🔴 Garde-fou Premium : revérifié ici, pas seulement côté appelant
  if (isPremiumActive) {
    console.log('👑 Premium actif — pub interstitielle annulée. Context:', context);
    return false;
  }

  if (isInterstitialShowing) {
    console.log('⚠️ Une pub interstitielle est déjà affichée');
    return false;
  }

  try {
    console.log(`📺 [PUB INTERSTITIEL] Context: ${context}`);

    // ✅ Si la pub est prête, l'afficher IMMÉDIATEMENT
    if (isInterstitialReady) {
      console.log('⚡ Pub prête ! Affichage instantané...');
      await AdMob.showInterstitial();
      console.log('✅ Pub affichée instantanément');
      return true;
    }

    // ⏳ Sinon, charger puis afficher (avec timeout)
    console.log('⏳ Pub pas prête, chargement...');

    if (!isInterstitialLoading) {
      await AdMob.prepareInterstitial({
        adId: INTERSTITIAL_AD_ID,
      });
    }

    // Attendre max 5 secondes que la pub soit prête
    const maxWait = 5000;
    const startTime = Date.now();

    while (!isInterstitialReady && (Date.now() - startTime) < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 🔴 Re-vérification : si l'utilisateur est devenu Premium PENDANT
    // l'attente (ex: achat en cours dans un autre écran), on annule.
    if (isPremiumActive) {
      console.log('👑 Premium devenu actif pendant le chargement — pub annulée');
      return false;
    }

    if (isInterstitialReady) {
      await AdMob.showInterstitial();
      console.log('✅ Pub affichée après chargement');
      return true;
    } else {
      console.log('⏰ Timeout : pub pas prête après 5s');
      return false;
    }

  } catch (error: any) {
    console.error(`❌ Erreur pub interstitielle:`, error);
    isInterstitialShowing = false;
    return false;
  }
}

export async function showBanner() {
  if (!isNative) return;

  // 🔴 Garde-fou Premium : c'est LA correction du bug. Cette fonction
  // peut être commandée par un setTimeout(500ms) programmé avant que
  // l'achat n'aboutisse. Sans cette vérification, la bannière pouvait
  // finir par se charger et s'afficher APRÈS le hideBanner() déclenché
  // par l'activation Premium.
  if (isPremiumActive) {
    console.log('👑 Premium actif — affichage bannière annulé');
    return;
  }

  try {
    const options: BannerAdOptions = {
      adId: BANNER_AD_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    };

    await AdMob.showBanner(options);

    // 🔴 Double vérification après le await : si le Premium est devenu
    // actif pendant que la requête AdMob était en vol, on détruit la
    // bannière qui vient tout juste d'apparaître.
    if (isPremiumActive) {
      console.log('👑 Premium devenu actif pendant le chargement de la bannière — suppression immédiate');
      await AdMob.removeBanner();
      return;
    }

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

// 🎁 PUB RÉCOMPENSÉE - VERSION PRODUCTION ULTRA-ROBUSTE
let rewardedAdCounter = 0;
let currentRewardedAdPromise: Promise<boolean> | null = null;

export async function showRewardedAd(context: string = 'bonus_roll'): Promise<boolean> {
  if (!isNative) {
    console.log('📱 Pas de pub récompensée (web) - Context:', context);
    return true;
  }

  if (currentRewardedAdPromise) {
    console.warn(`⚠️ [PUB RÉCOMPENSÉE] BLOQUÉ - Pub déjà en cours`);
    return currentRewardedAdPromise;
  }

  rewardedAdCounter++;
  const adNumber = rewardedAdCounter;

  const promise = new Promise<boolean>(async (resolve) => {
    let adShown = false;
    let resolved = false;
    let rewardReceived = false;
    let showedListener: any;
    let rewardListener: any;
    let dismissListener: any;
    let failedToShowListener: any;
    let failedToLoadListener: any;

    const safetyTimeout = setTimeout(() => {
      if (!resolved) {
        console.log(`⏰ [PUB RÉCOMPENSÉE #${adNumber}] TIMEOUT (120s) - Résolution forcée`);
        cleanup();
        resolved = true;
        currentRewardedAdPromise = null;
        resolve(false);
      }
    }, 120000);

    const cleanup = () => {
      clearTimeout(safetyTimeout);
      try {
        if (showedListener) showedListener.remove();
        if (rewardListener) rewardListener.remove();
        if (dismissListener) dismissListener.remove();
        if (failedToShowListener) failedToShowListener.remove();
        if (failedToLoadListener) failedToLoadListener.remove();
      } catch (e) {
        console.error('❌ Erreur cleanup listeners:', e);
      }
    };

    try {
      console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] === DÉMARRAGE === Context: ${context}`);

      failedToLoadListener = _addListener('onRewardedVideoAdFailedToLoad', (error: any) => {
        if (!resolved) {
          console.error(`❌ [PUB RÉCOMPENSÉE #${adNumber}] ÉCHEC CHARGEMENT:`, error);
          cleanup();
          resolved = true;
          currentRewardedAdPromise = null;
          resolve(false);
        }
      });

      showedListener = _addListener('onRewardedVideoAdShowed', () => {
        console.log(`👁️ [PUB RÉCOMPENSÉE #${adNumber}] AFFICHÉE`);
        adShown = true;
      });

      rewardListener = _addListener('onRewarded', (reward: AdMobRewardItem) => {
        console.log(`🎁 [PUB RÉCOMPENSÉE #${adNumber}] RÉCOMPENSE:`, reward);
        rewardReceived = true;
      });

      dismissListener = _addListener('onRewardedVideoAdDismissed', () => {
        if (!resolved) {
          console.log(`🚪 [PUB RÉCOMPENSÉE #${adNumber}] FERMÉE`);
          console.log(`   📊 Affichée=${adShown}, Récompense=${rewardReceived}`);

          const shouldUnlock = adShown;
          console.log(`   🎯 RÉSULTAT: ${shouldUnlock ? '✅ DÉBLOQUÉ' : '❌ BLOQUÉ'}`);

          cleanup();
          resolved = true;
          currentRewardedAdPromise = null;
          resolve(shouldUnlock);
        }
      });

      failedToShowListener = _addListener('onRewardedVideoAdFailedToShow', (error: any) => {
        if (!resolved) {
          console.error(`❌ [PUB RÉCOMPENSÉE #${adNumber}] ÉCHEC AFFICHAGE:`, error);
          cleanup();
          resolved = true;
          currentRewardedAdPromise = null;
          resolve(false);
        }
      });

      const options: RewardAdOptions = { adId: REWARDED_AD_ID };

      console.log(`🔄 [PUB RÉCOMPENSÉE #${adNumber}] Préparation...`);
      await AdMob.prepareRewardVideoAd(options);

      console.log(`⏳ [PUB RÉCOMPENSÉE #${adNumber}] Attente 2s...`);
      await new Promise(r => setTimeout(r, 2000));

      console.log(`🎬 [PUB RÉCOMPENSÉE #${adNumber}] Affichage...`);
      await AdMob.showRewardVideoAd();

      console.log(`✅ [PUB RÉCOMPENSÉE #${adNumber}] Commande envoyée`);

    } catch (error: any) {
      console.error(`💥 [PUB RÉCOMPENSÉE #${adNumber}] ERREUR:`, error);
      cleanup();

      if (!resolved) {
        resolved = true;
        currentRewardedAdPromise = null;
        resolve(false);
      }
    }
  });

  currentRewardedAdPromise = promise;

  promise.finally(() => {
    setTimeout(() => {
      currentRewardedAdPromise = null;
    }, 1000);
  });

  return promise;
}

// 🧹 Cleanup sécurisé
export async function cleanup() {
  if (!isNative) return;

  try {
    console.log('🧹 Nettoyage listeners AdMob...');
    _removeAllListenersSafe();
    currentRewardedAdPromise = null;
    console.log('🧹 Listeners et états nettoyés');
  } catch (e) {
    console.error('❌ Erreur cleanup:', e);
  }
}