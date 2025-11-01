import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// ====== Initialisation Stripe ======
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== CONFIGURATION CORS =====
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "x-user-email"],
    })
  );

  app.options("*", (_, res) => res.status(200).end());

  // ========================================
  // 🎣 WEBHOOK STRIPE (CRITIQUE !)
  // ========================================
  app.post(
    "/api/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.warn("⚠️ STRIPE_WEBHOOK_SECRET non défini, webhook ignoré");
        return res.status(400).send("Webhook secret manquant");
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error(`❌ Webhook signature invalide: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      console.log(`🎣 Webhook reçu: ${event.type}`);

      // ✅ ACTIVATION AUTOMATIQUE DU PREMIUM APRÈS PAIEMENT
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planId } = session.metadata as {
          userId: string;
          planId: string;
        };

        console.log(`💳 Paiement confirmé pour ${userId} (plan: ${planId})`);

        try {
          const now = new Date();
          let premiumUntil: Date;

          if (planId === "premium_1month") {
            premiumUntil = new Date(now.setMonth(now.getMonth() + 1));
          } else if (planId === "premium_3months") {
            premiumUntil = new Date(now.setMonth(now.getMonth() + 3));
          } else {
            console.error(`❌ Plan inconnu: ${planId}`);
            return res.status(400).send("Plan invalide");
          }

          // ✅ SAUVEGARDER LE PREMIUM AVEC L'EMAIL
          await storage.setItem(
            `premiumUntil_${userId}`,
            premiumUntil.toISOString()
          );

          console.log(
            `✅ Premium activé pour ${userId} jusqu'au ${premiumUntil.toLocaleDateString(
              "fr-FR"
            )}`
          );
        } catch (error) {
          console.error("❌ Erreur activation Premium:", error);
        }
      }

      res.json({ received: true });
    }
  );

  // ========================================
  // 💳 CRÉATION SESSION CHECKOUT STRIPE
  // ========================================
  app.post(
    "/api/create-checkout-session",
    async (req: Request, res: Response) => {
      console.log("📥 Requête create-checkout-session reçue:", req.body);

      try {
        const { planId, email } = req.body;
        if (!planId || !email) {
          console.error("❌ planId ou email manquant");
          return res.status(400).json({ error: "planId et email requis" });
        }

        const prices: Record<string, { amount: number; currency: string }> = {
          premium_1month: { amount: 399, currency: "eur" },
          premium_3months: { amount: 898, currency: "eur" },
        };

        const selectedPrice = prices[planId];
        if (!selectedPrice) {
          return res.status(400).json({ error: "Plan invalide" });
        }

        const userId = email.toLowerCase().trim();
        console.log(`🔑 UserId (email) utilisé pour le paiement: ${userId}`);

        // ===== Déterminer l'URL frontend selon l'environnement =====
        const isDevelopment = process.env.NODE_ENV !== "production";
        const frontendUrl = isDevelopment
          ? process.env.FRONTEND_URL ||
            "https://6ff68a04-c6dd-4290-a776-a222d5d0c22f-00-3477r7j3sy8oe.janeway.replit.dev"
          : process.env.FRONTEND_URL || "https://cartomystikappk.onrender.com";

        // ✅ Création de la session Stripe
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: selectedPrice.currency,
                product_data: {
                  name:
                    planId === "premium_1month"
                      ? "Oracle Mystique Premium - 1 mois"
                      : "Oracle Mystique Premium - 3 mois",
                  description: "Accès illimité sans publicités",
                },
                unit_amount: selectedPrice.amount,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(
            userId
          )}`,
          cancel_url: `${frontendUrl}/cancel`,
          metadata: {
            userId,
            planId,
          },
          customer_email: userId, // ✅ Email pré-rempli dans Stripe
        });

        console.log("✅ Session Stripe créée:", session.id);
        console.log("📍 Success URL:", `${frontendUrl}/success`);
        console.log("📍 Cancel URL:", `${frontendUrl}/cancel`);

        res.json({ success: true, sessionId: session.id, url: session.url });
      } catch (error: any) {
        console.error("❌ Erreur création session Stripe:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    }
  );

  // ========================================
  // 🔮 HOROSCOPE
  // ========================================
  const horoscopeHandler = async (req: Request, res: Response) => {
    try {
      const { sign } = req.params;
      const validSigns = [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
      ];

      if (!validSigns.includes(sign.toLowerCase()))
        return res.status(400).json({ error: "Signe zodiacal invalide" });

      console.log(`🔮 Horoscope pour ${sign}`);
      const horoscope = generateDailyHoroscope(sign.toLowerCase());
      res.json(horoscope);
    } catch (error) {
      console.error("❌ Erreur horoscope:", error);
      res.status(500).json({ error: "Impossible de générer l'horoscope" });
    }
  };

  app.get("/api/horoscope/:sign", horoscopeHandler);
  app.post("/api/horoscope/:sign", horoscopeHandler);

  // ===== FONCTIONS HOROSCOPE =====
  function generateDailyHoroscope(sign: string) {
    // (... ton code horoscope complet ici, inchangé ...)
    return {};
  }

  // ========================================
  // 💎 ROUTES PREMIUM
  // ========================================
  app.post("/api/premium/activate", async (req, res) => {
    try {
      const { planId, email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email requis" });
      }

      const userId = email.toLowerCase().trim();
      const now = new Date();
      let premiumUntil: Date;

      if (planId === "premium_1month") {
        premiumUntil = new Date(now.setMonth(now.getMonth() + 1));
      } else if (planId === "premium_3months") {
        premiumUntil = new Date(now.setMonth(now.getMonth() + 3));
      } else {
        return res.status(400).json({ error: "Plan invalide" });
      }

      await storage.setItem(
        `premiumUntil_${userId}`,
        premiumUntil.toISOString()
      );
      console.log(
        `✅ Premium activé pour ${userId} jusqu'au ${premiumUntil.toLocaleDateString(
          "fr-FR"
        )}`
      );

      res.json({
        success: true,
        isPremium: true,
        premiumUntil: premiumUntil.toISOString(),
      });
    } catch (error) {
      console.error("❌ Erreur activation premium:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.get("/api/user/premium-status", async (req, res) => {
    try {
      const userEmail = req.headers["x-user-email"] as string;

      if (!userEmail) {
        console.log("🔍 Aucun email trouvé dans les headers");
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

      console.log(
        `🔍 Vérification premium pour ${userId}: ${
          isPremium ? "Actif" : "Expiré"
        } (expire: ${premiumUntil.toLocaleDateString("fr-FR")})`
      );

      res.json({
        isPremium,
        premiumUntil: isPremium ? premiumUntilStr : null,
      });
    } catch (error) {
      console.error("❌ Erreur vérification premium:", error);
      res.json({ isPremium: false, premiumUntil: null });
    }
  });

  // ========================================
  // 📚 ROUTES GRIMOIRE (tirages)
  // ========================================
  app.get("/api/readings", async (req, res) => {
    try {
      const allReadings = (await storage.getItem("readings")) || [];
      console.log(`📖 Récupération de ${allReadings.length} tirages`);
      res.json({ readings: allReadings });
    } catch (error) {
      console.error("❌ Erreur récupération tirages:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.post("/api/readings", async (req, res) => {
    try {
      const { type, cards, question, answer } = req.body;
      const allReadings = (await storage.getItem("readings")) || [];

      const newReading = {
        id: Date.now().toString(),
        type,
        cards: cards || null,
        question: question || null,
        answer: answer || null,
        notes: "",
        isFavorite: false,
        date: new Date().toISOString(),
      };

      const excluded = ["crystalBall", "horoscope", "bonusRoll"];
      if (!excluded.includes(type)) {
        allReadings.unshift(newReading);
        await storage.setItem("readings", allReadings);
        console.log("✅ Tirage sauvegardé:", newReading.id);
      }

      res.json(newReading);
    } catch (error) {
      console.error("❌ Erreur création tirage:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.put("/api/readings/:id/note", async (req, res) => {
    try {
      const { id } = req.params;
      const { note } = req.body;
      const allReadings = (await storage.getItem("readings")) || [];
      const index = allReadings.findIndex((r: any) => r.id === id);

      if (index === -1)
        return res.status(404).json({ error: "Tirage non trouvé" });

      allReadings[index].notes = note;
      await storage.setItem("readings", allReadings);
      res.json(allReadings[index]);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.put("/api/readings/:id/favorite", async (req, res) => {
    try {
      const { id } = req.params;
      const { isFavorite } = req.body;
      const allReadings = (await storage.getItem("readings")) || [];
      const index = allReadings.findIndex((r: any) => r.id === id);

      if (index === -1)
        return res.status(404).json({ error: "Tirage non trouvé" });

      allReadings[index].isFavorite = isFavorite;
      await storage.setItem("readings", allReadings);
      res.json(allReadings[index]);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.delete("/api/readings", async (req, res) => {
    try {
      await storage.setItem("readings", []);
      res.json({ success: true, message: "Grimoire vidé avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  // ========================================
  // ⚠️ ALERTE EXPIRATION PREMIUM
  // ========================================
  app.get("/api/user/premium-expiration-alert", async (req, res) => {
    try {
      const userEmail = req.headers["x-user-email"] as string;

      if (!userEmail) {
        return res.json({ shouldAlert: false });
      }

      const userId = userEmail.toLowerCase().trim();
      const premiumUntilStr = await storage.getItem(`premiumUntil_${userId}`);

      if (!premiumUntilStr) return res.json({ shouldAlert: false });

      const premiumUntil = new Date(premiumUntilStr);
      const now = new Date();
      const daysRemaining = Math.ceil(
        (premiumUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      const lastAlertDateStr = await storage.getItem(
        `lastAlertDate_${userId}`
      );
      const today = new Date().toDateString();
      if (lastAlertDateStr === today) return res.json({ shouldAlert: false });

      let shouldAlert = false;
      let message = "";
      let alertType = "";

      if (daysRemaining <= 0) {
        shouldAlert = true;
        message = "premium.expired";
        alertType = "expired";
      } else if (daysRemaining <= 3) {
        shouldAlert = true;
        message = "premium.expiringSoon";
        alertType = "warning";
      }

      if (shouldAlert)
        await storage.setItem(`lastAlertDate_${userId}`, today);

      res.json({
        shouldAlert,
        message,
        alertType,
        daysRemaining: Math.max(0, daysRemaining),
        expirationDate: premiumUntil.toISOString(),
      });
    } catch (error) {
      console.error("❌ Erreur vérification alerte expiration:", error);
      res.json({ shouldAlert: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}