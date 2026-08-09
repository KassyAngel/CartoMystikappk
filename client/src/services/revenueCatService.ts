import { Capacitor } from '@capacitor/core';
import {
  Purchases,
  LOG_LEVEL,
  type PurchasesOfferings,
  type CustomerInfo,
  type PurchasesPackage,
} from '@revenuecat/purchases-capacitor';
import { config } from '@/config';

// 🔴 CORRECTION CRITIQUE : l'identifiant réel de l'entitlement dans
// RevenueCat est "CartoMystik Pro" (voir Product catalog > Entitlements),
// PAS "premium". C'est la cause racine du bug : le code cherchait une clé
// qui n'existe jamais dans entitlements.active, donc isPremiumActive était
// toujours false, quel que soit l'achat.
const PREMIUM_ENTITLEMENT_ID = 'CartoMystik Pro';

/**
 * 🔧 Initialisation de RevenueCat
 */
export async function initializeRevenueCat(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('🌐 Web : RevenueCat non disponible');
    return;
  }

  try {
    console.log('🔧 Initialisation RevenueCat (v11)...');

    const platform = Capacitor.getPlatform();
    const apiKey =
      platform === 'android'
        ? 'goog_FysChuiotCqiQGrxnPIxWGJtyKH'
        : 'appl_VOTRE_CLE_IOS';

    await Purchases.configure({ apiKey });
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

    console.log('✅ RevenueCat initialisé avec succès');
  } catch (error) {
    console.error('❌ Erreur initialisation RevenueCat:', error);
  }
}

/**
 * 📦 Récupération des offres disponibles
 */
export async function getOfferings(): Promise<PurchasesOfferings | null> {
  if (!Capacitor.isNativePlatform()) return null;

  try {
    const result = await Purchases.getOfferings();
    console.log('📦 Offres récupérées:', result);
    return result;
  } catch (error) {
    console.error('❌ Erreur récupération offres:', error);
    return null;
  }
}

/**
 * 🛒 Achat d'un package
 * 🔴 CORRECTION : bon identifiant d'entitlement + vérification que le
 *                 serveur a bien activé le premium, avec retry.
 */
export async function purchasePackage(
  aPackage: PurchasesPackage,
  email: string
): Promise<{ success: boolean; customerInfo?: CustomerInfo; error?: string }> {
  if (!Capacitor.isNativePlatform()) return { success: false, error: 'Non disponible sur web' };

  try {
    await Purchases.logIn({ appUserID: email });
    console.log(`✅ Utilisateur connecté : ${email}`);

    const purchaseResult = await Purchases.purchasePackage({ aPackage });

    let activeEntitlement = purchaseResult.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];

    // 🔁 Filet de sécurité n°1 : polling sur getCustomerInfo() jusqu'à 10s,
    // au cas où RevenueCat mette un peu de temps à traiter le reçu.
    if (!activeEntitlement) {
      console.warn('⚠️ Entitlement pas encore visible, vérifications répétées (jusqu\'à 10s)...');
      activeEntitlement = await pollForEntitlement(5, 2000);
    }

    // 🔁 Filet de sécurité n°2 : si le polling n'a rien donné, on force une
    // resynchronisation complète avec le Play Store — exactement ce que fait
    // "Restaurer un abonnement", mais automatiquement, sans action utilisateur.
    if (!activeEntitlement) {
      console.warn('⚠️ Toujours rien après polling, resynchronisation forcée via restorePurchases()...');
      try {
        const restoreResult = await Purchases.restorePurchases();
        activeEntitlement = restoreResult.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
      } catch (restoreError) {
        console.error('❌ Erreur lors de la resynchronisation forcée:', restoreError);
      }
    }

    if (!activeEntitlement) {
      console.warn('⚠️ Premium non actif après achat, malgré polling et resynchronisation');
      return { success: false, error: 'Achat non confirmé par RevenueCat' };
    }

    const premiumEntitlement = activeEntitlement;
    const productId = premiumEntitlement.productIdentifier;
    const expirationDate = premiumEntitlement.expirationDate || null;

    console.log('✅ Premium activé côté RevenueCat !');
    console.log('📦 Produit acheté:', productId);
    console.log('📅 Expiration:', expirationDate || 'Non fournie par RevenueCat');

    const activationResult = await activatePremiumOnServerWithRetry({
      email,
      productId,
      expirationDate,
    });

    if (!activationResult.success) {
      console.error('❌ Achat validé côté store mais activation serveur échouée après retries');
      return {
        success: false,
        customerInfo: purchaseResult.customerInfo,
        error:
          "Votre achat a été validé par Google Play, mais nous n'avons pas pu l'enregistrer sur nos serveurs. " +
          "Réessayez dans quelques instants via 'Restaurer un abonnement existant', ou contactez le support si le problème persiste.",
      };
    }

    return { success: true, customerInfo: purchaseResult.customerInfo };
  } catch (error: any) {
    if (error.userCancelled) {
      console.log('❌ Achat annulé par l\'utilisateur');
      return { success: false, error: 'Achat annulé' };
    }
    console.error('❌ Erreur achat:', error);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
}

/**
 * 🔁 Vérifie plusieurs fois de suite (avec délai) si l'entitlement premium
 * est devenu actif. Utilisé juste après un achat pour absorber le léger
 * délai que RevenueCat peut prendre à traiter le reçu Google Play.
 */
async function pollForEntitlement(maxAttempts: number, delayMs: number) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    try {
      const info = await Purchases.getCustomerInfo();
      const entitlement = info.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
      if (entitlement) {
        console.log(`✅ Entitlement détecté après ${attempt} vérification(s)`);
        return entitlement;
      }
      console.log(`⏳ Vérification ${attempt}/${maxAttempts} : toujours pas actif`);
    } catch (error) {
      console.error(`❌ Erreur lors de la vérification ${attempt}/${maxAttempts}:`, error);
    }
  }
  return undefined;
}

/**
 * ♻️ Restauration des achats
 * 🔴 CORRECTION : bon identifiant d'entitlement + vérification serveur.
 */
export async function restorePurchases(
  email: string
): Promise<{ success: boolean; customerInfo?: CustomerInfo; error?: string }> {
  if (!Capacitor.isNativePlatform()) return { success: false, error: 'Non disponible sur web' };

  try {
    await Purchases.logIn({ appUserID: email });
    console.log(`✅ Utilisateur connecté pour restauration : ${email}`);

    const result = await Purchases.restorePurchases();

    const entitlements = result.customerInfo.entitlements.active;
    const isPremiumActive = !!entitlements[PREMIUM_ENTITLEMENT_ID];

    if (!isPremiumActive) {
      console.warn('⚠️ Aucun abonnement actif trouvé lors de la restauration');
      return { success: false, error: 'Aucun abonnement actif trouvé' };
    }

    const premiumEntitlement = entitlements[PREMIUM_ENTITLEMENT_ID];
    const productId = premiumEntitlement.productIdentifier;
    const expirationDate = premiumEntitlement.expirationDate || null;

    console.log('✅ Premium restauré côté RevenueCat !');
    console.log('📦 Produit restauré:', productId);
    console.log('📅 Expiration:', expirationDate || 'Non fournie par RevenueCat');

    const activationResult = await activatePremiumOnServerWithRetry({
      email,
      productId,
      expirationDate,
    });

    if (!activationResult.success) {
      console.error('❌ Restauration validée côté store mais activation serveur échouée après retries');
      return {
        success: false,
        customerInfo: result.customerInfo,
        error:
          "Votre abonnement a été retrouvé, mais nous n'avons pas pu le réactiver sur nos serveurs. " +
          "Réessayez dans quelques instants, ou contactez le support si le problème persiste.",
      };
    }

    return { success: true, customerInfo: result.customerInfo };
  } catch (error: any) {
    console.error('❌ Erreur restauration:', error);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
}

/**
 * 👑 Vérification du statut premium (côté RevenueCat directement)
 */
export async function checkPremiumStatus(email: string): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  try {
    await Purchases.logIn({ appUserID: email });
    const result = await Purchases.getCustomerInfo();

    const entitlements = result.customerInfo.entitlements.active;
    const isPremium = !!entitlements[PREMIUM_ENTITLEMENT_ID];

    console.log('👑 Statut Premium:', isPremium);
    return isPremium;
  } catch (error) {
    console.error('❌ Erreur vérification Premium:', error);
    return false;
  }
}

/**
 * 🚀 Envoi au serveur (activation premium) — tentative unique
 */
async function activatePremiumOnServer(data: {
  email: string;
  productId: string;
  expirationDate: string | null;
}): Promise<{ success: boolean }> {
  console.log('📤 Envoi au backend pour activation Premium:', data);

  const response = await fetch(`${config.apiBaseUrl}/api/premium/activate-revenuecat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erreur serveur (${response.status})`);
  }

  const result = await response.json();

  console.log('✅ Réponse du backend:', result);
  console.log('⏱️ Durée:', result.durationMonths || 'Non calculée', 'mois');
  console.log(
    '📅 Expire le:',
    result.premiumUntil ? new Date(result.premiumUntil).toLocaleDateString('fr-FR') : 'Non définie'
  );

  return { success: !!result.success };
}

/**
 * 🔁 Wrapper avec retry (3 tentatives, backoff progressif)
 */
async function activatePremiumOnServerWithRetry(
  data: { email: string; productId: string; expirationDate: string | null },
  maxAttempts: number = 3
): Promise<{ success: boolean }> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await activatePremiumOnServer(data);
      if (result.success) {
        if (attempt > 1) console.log(`✅ Activation réussie à la tentative ${attempt}`);
        return result;
      }
      console.warn(`⚠️ Tentative ${attempt}/${maxAttempts} : le serveur a renvoyé success=false`);
    } catch (error) {
      console.error(`❌ Tentative ${attempt}/${maxAttempts} échouée:`, error);
    }

    if (attempt < maxAttempts) {
      const delayMs = attempt * 1500;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.error(`❌ Échec définitif de l'activation serveur après ${maxAttempts} tentatives`);
  return { success: false };
}