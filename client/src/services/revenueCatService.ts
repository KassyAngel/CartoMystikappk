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
        ? 'goog_FysChuiotCqiQGrxnPIxWGJtyKH' // ⚠️ À remplacer
        : 'appl_VOTRE_CLE_IOS';

    // ✅ Dans v11, on utilise configure() (et non setup)
    await Purchases.configure({ apiKey });

    // Activer les logs
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
 * 🛒 Achat d’un package
 */
export async function purchasePackage(
  aPackage: PurchasesPackage,
  email: string
): Promise<{ success: boolean; customerInfo?: CustomerInfo }> {
  if (!Capacitor.isNativePlatform()) return { success: false };

  try {
    await Purchases.logIn({ appUserID: email });
    console.log(`✅ Utilisateur connecté : ${email}`);

    const purchaseResult = await Purchases.purchasePackage({ aPackage });

    const entitlements = purchaseResult.customerInfo.entitlements.active;
    const isPremiumActive = !!entitlements['premium'];

    if (isPremiumActive) {
      const expirationDate = entitlements['premium']?.expirationDate || null;

      await activatePremiumOnServer({
        email,
        productId: aPackage.identifier,
        expirationDate,
      });

      return { success: true, customerInfo: purchaseResult.customerInfo };
    }

    console.warn('⚠️ Premium non actif après achat');
    return { success: false };
  } catch (error: any) {
    if (error.userCancelled) {
      console.log('❌ Achat annulé');
    } else {
      console.error('❌ Erreur achat:', error);
    }
    return { success: false };
  }
}

/**
 * ♻️ Restauration des achats
 */
export async function restorePurchases(
  email: string
): Promise<{ success: boolean; customerInfo?: CustomerInfo }> {
  if (!Capacitor.isNativePlatform()) return { success: false };

  try {
    await Purchases.logIn({ appUserID: email });
    const result = await Purchases.restorePurchases();

    const entitlements = result.customerInfo.entitlements.active;
    const isPremiumActive = !!entitlements['premium'];

    if (isPremiumActive) {
      const expirationDate = entitlements['premium']?.expirationDate || null;

      await activatePremiumOnServer({
        email,
        productId: 'restored',
        expirationDate,
      });

      return { success: true, customerInfo: result.customerInfo };
    }

    console.warn('⚠️ Aucun abonnement actif trouvé');
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
 */
async function activatePremiumOnServer(data: {
  email: string;
  productId: string;
  expirationDate: string | null;
}): Promise<{ success: boolean }> {
  try {
    console.log('📤 Activation Premium sur le serveur:', data);

    const response = await fetch(`${config.apiBaseUrl}/api/premium/activate-revenuecat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return { success: result.success };
  } catch (error) {
    console.error('❌ Erreur d’envoi au serveur:', error);
    return { success: false };
  }
}
