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

      let premiumUntil: Date;
      let durationMonths = 1;

      if (expirationDate) {
        premiumUntil = new Date(expirationDate);
        console.log('📅 Utilisation de la date d\'expiration RevenueCat:', premiumUntil.toLocaleDateString('fr-FR'));
      } else {
        const now = new Date();
        const productIdLower = productId.toLowerCase();

        if (productIdLower.includes('3month') || 
            productIdLower.includes('3_month') || 
            productIdLower.includes('quarterly')) {
          durationMonths = 3;
          console.log('⏱️ Produit détecté : 3 mois');
        } else if (productIdLower.includes('1month') || 
                   productIdLower.includes('1_month') || 
                   productIdLower.includes('monthly')) {
          durationMonths = 1;
          console.log('⏱️ Produit détecté : 1 mois');
        } else if (productIdLower.includes('1year') || 
                   productIdLower.includes('annual') || 
                   productIdLower.includes('yearly')) {
          durationMonths = 12;
          console.log('⏱️ Produit détecté : 1 an');
        } else {
          console.warn(`⚠️ Produit non reconnu: "${productId}". Durée par défaut : 1 mois`);
          durationMonths = 1;
        }

        premiumUntil = new Date(now);
        premiumUntil.setMonth(premiumUntil.getMonth() + durationMonths);

        console.log(`📅 Date d'expiration calculée: ${premiumUntil.toLocaleDateString('fr-FR')}`);
      }

      await storage.setItem(`premiumUntil_${userId}`, premiumUntil.toISOString());
      await storage.setItem(`premiumProduct_${userId}`, productId);

      console.log(`✅ Premium activé pour ${userId}`);
      console.log(`   📦 Produit: ${productId}`);
      console.log(`   ⏱️ Durée: ${durationMonths} mois`);
      console.log(`   📅 Expire le: ${premiumUntil.toLocaleDateString('fr-FR')}`);

      res.json({ 
        success: true,
        isPremium: true,
        premiumUntil: premiumUntil.toISOString(),
        expirationDate: premiumUntil.toISOString(),
        productId: productId,
        durationMonths: durationMonths
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
  // ✅ VÉRIFIER STATUT PREMIUM REVENUECAT
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

      const productId = await storage.getItem(`premiumProduct_${userId}`);

      console.log(`🔍 Vérification Premium RevenueCat pour ${userId}:`);
      console.log(`   Statut: ${isPremium ? '✅ Actif' : '❌ Expiré'}`);
      console.log(`   Expire: ${premiumUntil.toLocaleDateString('fr-FR')}`);
      if (productId) {
        console.log(`   Produit: ${productId}`);
      }

      res.json({
        isPremium,
        premiumUntil: isPremium ? premiumUntilStr : null,
        productId: productId || null
      });
    } catch (error) {
      console.error('❌ Erreur vérification premium RevenueCat:', error);
      res.json({ isPremium: false, premiumUntil: null });
    }
  });

  // ========================================
  // 🔄 WEBHOOK REVENUECAT
  // 🔴 CORRECTION : app_user_id normalisé en lowercase/trim, exactement
  //                 comme partout ailleurs, pour matcher la même clé
  //                 que l'app lit via /api/user/premium-status.
  // ========================================
  app.post("/api/revenuecat-webhook", async (req: Request, res: Response) => {
    try {
      const event = req.body;

      console.log('🎣 Webhook RevenueCat reçu:', event.type);

      if (event.type === 'INITIAL_PURCHASE' || event.type === 'RENEWAL') {
        const { app_user_id, product_id, expiration_at_ms } = event.event;

        if (!app_user_id) {
          console.error('❌ app_user_id manquant dans le webhook');
          return res.status(400).json({ error: 'app_user_id manquant' });
        }

        // 🔴 Normalisation identique à toutes les autres routes premium
        const userId = app_user_id.toLowerCase().trim();

        let premiumUntil: Date;
        let durationMonths = 1;

        if (expiration_at_ms) {
          premiumUntil = new Date(expiration_at_ms);
        } else {
          const now = new Date();
          const productIdLower = (product_id || '').toLowerCase();

          if (productIdLower.includes('3month')) {
            durationMonths = 3;
          } else if (productIdLower.includes('1month')) {
            durationMonths = 1;
          }

          premiumUntil = new Date(now);
          premiumUntil.setMonth(premiumUntil.getMonth() + durationMonths);
        }

        await storage.setItem(
          `premiumUntil_${userId}`,
          premiumUntil.toISOString()
        );

        await storage.setItem(
          `premiumProduct_${userId}`,
          product_id
        );

        console.log(`✅ Premium activé via webhook pour ${userId}`);
        console.log(`   📦 Produit: ${product_id}`);
        console.log(`   📅 Expire le: ${premiumUntil.toLocaleDateString('fr-FR')}`);
      } 
      else if (event.type === 'CANCELLATION' || event.type === 'EXPIRATION') {
        const { app_user_id } = event.event;

        if (app_user_id) {
          const userId = app_user_id.toLowerCase().trim();
          console.log(`⚠️ ${event.type} détectée pour ${userId}`);
          console.log('   La date d\'expiration existante sera respectée');
        }
      }

      res.json({ received: true });

    } catch (error: any) {
      console.error('❌ Erreur webhook RevenueCat:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // ========================================
  // 🔍 DEBUG : Voir les infos Premium d'un utilisateur
  // ========================================
  app.get("/api/debug/premium/:email", async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const userId = email.toLowerCase().trim();

      const premiumUntilStr = await storage.getItem(`premiumUntil_${userId}`);
      const productId = await storage.getItem(`premiumProduct_${userId}`);

      if (!premiumUntilStr) {
        return res.json({ 
          message: 'Aucun Premium trouvé',
          email: userId 
        });
      }

      const premiumUntil = new Date(premiumUntilStr);
      const now = new Date();
      const isPremium = premiumUntil > now;
      const daysRemaining = Math.ceil((premiumUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      res.json({
        email: userId,
        isPremium,
        premiumUntil: premiumUntil.toISOString(),
        premiumUntilFormatted: premiumUntil.toLocaleDateString('fr-FR'),
        productId,
        daysRemaining: Math.max(0, daysRemaining),
        status: isPremium ? 'Actif' : 'Expiré'
      });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}