import { Capacitor } from '@capacitor/core';
import {
  Purchases,
  LOG_LEVEL,
  type PurchasesOfferings,
  type CustomerInfo,
  type PurchasesPackage,
} from '@revenuecat/purchases-capacitor';
import { config } from '@/config';

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

    // ✅ Configure RevenueCat
    await Purchases.configure({ apiKey });

    // Activer les logs pour debug
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
 * 🔴 CORRECTION : Récupère le productIdentifier exact depuis l'entitlement
 */
export async function purchasePackage(
  aPackage: PurchasesPackage,
  email: string
): Promise<{ success: boolean; customerInfo?: CustomerInfo }> {
  if (!Capacitor.isNativePlatform()) return { success: false };

  try {
    // 1. Connecter l'utilisateur avec son email
    await Purchases.logIn({ appUserID: email });
    console.log(`✅ Utilisateur connecté : ${email}`);

    // 2. Effectuer l'achat via Google Play
    const purchaseResult = await Purchases.purchasePackage({ aPackage });

    // 3. Vérifier si l'entitlement Premium est actif
    const entitlements = purchaseResult.customerInfo.entitlements.active;
    const isPremiumActive = !!entitlements['premium'];

    if (isPremiumActive) {
      const premiumEntitlement = entitlements['premium'];

      // 🔴 CORRECTION : Utiliser productIdentifier de l'entitlement (plus précis que aPackage.identifier)
      const productId = premiumEntitlement.productIdentifier;
      const expirationDate = premiumEntitlement.expirationDate || null;

      console.log('✅ Premium activé !');
      console.log('📦 Produit acheté:', productId);
      console.log('📅 Expiration:', expirationDate || 'Non fournie par RevenueCat');

      // 4. Envoyer au backend pour activation
      await activatePremiumOnServer({
        email,
        productId,
        expirationDate,
      });

      return { success: true, customerInfo: purchaseResult.customerInfo };
    }

    console.warn('⚠️ Premium non actif après achat');
    return { success: false };
  } catch (error: any) {
    if (error.userCancelled) {
      console.log('❌ Achat annulé par l\'utilisateur');
    } else {
      console.error('❌ Erreur achat:', error);
    }
    return { success: false };
  }
}

/**
 * ♻️ Restauration des achats
 * 🔴 CORRECTION : Récupère le productIdentifier exact depuis l'entitlement
 */
export async function restorePurchases(
  email: string
): Promise<{ success: boolean; customerInfo?: CustomerInfo }> {
  if (!Capacitor.isNativePlatform()) return { success: false };

  try {
    // 1. Connecter l'utilisateur
    await Purchases.logIn({ appUserID: email });
    console.log(`✅ Utilisateur connecté pour restauration : ${email}`);

    // 2. Restaurer les achats Google Play
    const result = await Purchases.restorePurchases();

    // 3. Vérifier si l'entitlement Premium est actif
    const entitlements = result.customerInfo.entitlements.active;
    const isPremiumActive = !!entitlements['premium'];

    if (isPremiumActive) {
      const premiumEntitlement = entitlements['premium'];

      // 🔴 CORRECTION : Utiliser productIdentifier de l'entitlement
      const productId = premiumEntitlement.productIdentifier;
      const expirationDate = premiumEntitlement.expirationDate || null;

      console.log('✅ Premium restauré !');
      console.log('📦 Produit restauré:', productId);
      console.log('📅 Expiration:', expirationDate || 'Non fournie par RevenueCat');

      // 4. Envoyer au backend pour réactivation
      await activatePremiumOnServer({
        email,
        productId,
        expirationDate,
      });

      return { success: true, customerInfo: result.customerInfo };
    }

    console.warn('⚠️ Aucun abonnement actif trouvé lors de la restauration');
    return { success: false };
  } catch (error) {
    console.error('❌ Erreur restauration:', error);
    return { success: false };
  }
}

/**
 * 👑 Vérification du statut premium
 */
export async function checkPremiumStatus(email: string): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  try {
    await Purchases.logIn({ appUserID: email });
    const result = await Purchases.getCustomerInfo();

    const entitlements = result.customerInfo.entitlements.active;
    const isPremium = !!entitlements['premium'];

    console.log('👑 Statut Premium:', isPremium);
    return isPremium;
  } catch (error) {
    console.error('❌ Erreur vérification Premium:', error);
    return false;
  }
}

/**
 * 🚀 Envoi au serveur (activation premium)
 * 🔴 Cette fonction envoie les données au backend qui calculera la durée
 */
async function activatePremiumOnServer(data: {
  email: string;
  productId: string;
  expirationDate: string | null;
}): Promise<{ success: boolean }> {
  try {
    console.log('📤 Envoi au backend pour activation Premium:', data);

    const response = await fetch(`${config.apiBaseUrl}/api/premium/activate-revenuecat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur serveur');
    }

    const result = await response.json();

    console.log('✅ Réponse du backend:', result);
    console.log('⏱️ Durée:', result.durationMonths || 'Non calculée', 'mois');
    console.log('📅 Expire le:', result.premiumUntil ? new Date(result.premiumUntil).toLocaleDateString('fr-FR') : 'Non définie');

    return { success: result.success };
  } catch (error) {
    console.error('❌ Erreur d\'envoi au serveur:', error);
    return { success: false };
  }
}