import type { Express, Request, Response } from "express";
import { storage } from "../storage";

export function registerPremiumRevenueCatRoutes(app: Express) {

  // ========================================
  // 🛒 ACTIVER PREMIUM VIA REVENUECAT
  // ========================================
  app.post("/api/premium/activate-revenuecat", async (req: Request, res: Response) => {
    try {
      const { email, productId, expirationDate } = req.body;

      console.log('🛒 Activation Premium RevenueCat:', { email, productId, expirationDate });

      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: "Email manquant" 
        });
      }

      const userId = email.toLowerCase().trim();

      // Calculer la date d'expiration
      let premiumUntil: Date;

      if (expirationDate) {
        // Si RevenueCat fournit une date d'expiration, on l'utilise
        premiumUntil = new Date(expirationDate);
      } else {
        // Sinon, on calcule selon le productId
        const now = new Date();

        if (productId.includes('1month') || productId.includes('monthly')) {
          premiumUntil = new Date(now.setMonth(now.getMonth() + 1));
        } else if (productId.includes('3month') || productId.includes('quarterly')) {
          premiumUntil = new Date(now.setMonth(now.getMonth() + 3));
        } else if (productId.includes('1year') || productId.includes('annual')) {
          premiumUntil = new Date(now.setFullYear(now.getFullYear() + 1));
        } else {
          // Par défaut : 1 mois
          premiumUntil = new Date(now.setMonth(now.getMonth() + 1));
        }
      }

      // Sauvegarder dans le storage
      await storage.setItem(`premiumUntil_${userId}`, premiumUntil.toISOString());

      console.log(`✅ Premium activé pour ${userId} jusqu'au ${premiumUntil.toLocaleDateString('fr-FR')}`);
      console.log(`📦 Produit: ${productId}`);

      res.json({ 
        success: true,
        isPremium: true,
        premiumUntil: premiumUntil.toISOString(),
        expirationDate: premiumUntil.toISOString()
      });

    } catch (error: any) {
      console.error('❌ Erreur activation Premium RevenueCat:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });

  // ========================================
  // ✅ VÉRIFIER STATUT PREMIUM (déjà existant mais on le garde)
  // ========================================
  app.get("/api/user/premium-status-revenuecat", async (req: Request, res: Response) => {
    try {
      const userEmail = req.headers['x-user-email'] as string;

      if (!userEmail) {
        console.log('🔍 Aucun email trouvé pour RevenueCat');
        return res.json({ isPremium: false, premiumUntil: null });
      }

      const userId = userEmail.toLowerCase().trim();
      const premiumUntilStr = await storage.getItem(`premiumUntil_${userId}`);

      if (!premiumUntilStr) {
        return res.json({ isPremium: false, premiumUntil: null });
      }

      const premiumUntil = new Date(premiumUntilStr);
      const now = new Date();
      const isPremium = premiumUntil > now;

      console.log(`🔍 Vérification Premium RevenueCat pour ${userId}: ${isPremium ? 'Actif' : 'Expiré'} (expire: ${premiumUntil.toLocaleDateString('fr-FR')})`);

      res.json({
        isPremium,
        premiumUntil: isPremium ? premiumUntilStr : null,
      });
    } catch (error) {
      console.error('❌ Erreur vérification premium RevenueCat:', error);
      res.json({ isPremium: false, premiumUntil: null });
    }
  });

  // ========================================
  // 🔄 WEBHOOK REVENUECAT (optionnel mais recommandé)
  // ========================================
  app.post("/api/revenuecat-webhook", async (req: Request, res: Response) => {
    try {
      const event = req.body;

      console.log('🎣 Webhook RevenueCat reçu:', event.type);

      // Types d'événements RevenueCat possibles :
      // - INITIAL_PURCHASE
      // - RENEWAL
      // - CANCELLATION
      // - EXPIRATION
      // - PRODUCT_CHANGE

      if (event.type === 'INITIAL_PURCHASE' || event.type === 'RENEWAL') {
        const { app_user_id, product_id, expiration_at_ms } = event.event;

        if (!app_user_id) {
          console.error('❌ app_user_id manquant dans le webhook');
          return res.status(400).json({ error: 'app_user_id manquant' });
        }

        const expirationDate = expiration_at_ms 
          ? new Date(expiration_at_ms).toISOString()
          : null;

        // Activer Premium automatiquement
        await storage.setItem(
          `premiumUntil_${app_user_id}`,
          expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        );

        console.log(`✅ Premium activé via webhook pour ${app_user_id}`);
      } 
      else if (event.type === 'CANCELLATION' || event.type === 'EXPIRATION') {
        const { app_user_id } = event.event;

        if (app_user_id) {
          // On ne supprime pas immédiatement, on laisse expirer naturellement
          console.log(`⚠️ Annulation/Expiration détectée pour ${app_user_id}`);
        }
      }

      res.json({ received: true });

    } catch (error: any) {
      console.error('❌ Erreur webhook RevenueCat:', error);
      res.status(500).json({ error: error.message });
    }
  });
}