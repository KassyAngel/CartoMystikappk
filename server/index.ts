import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { registerPremiumRevenueCatRoutes } from "./routes/premiumRevenueCat"; // ✅ Ajout de ton import

// Charger les variables d'environnement
dotenv.config();
const app = express();
app.use(cookieParser());

// ⚠️ IMPORTANT : Définir la route webhook AVANT express.json()
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) return res.status(400).send("Signature manquante");

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );

      console.log("📬 Événement Stripe reçu:", event.type);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (userId && planId) {
          console.log(`✅ Paiement réussi pour user ${userId}, plan ${planId}`);

          const expiresAt = new Date();
          if (planId === "premium_1month") {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
          } else if (planId === "premium_3months") {
            expiresAt.setMonth(expiresAt.getMonth() + 3);
          }

          console.log(`📅 Plan choisi: ${planId}, expiration prévue: ${expiresAt.toLocaleDateString("fr-FR")}`);

          const { storage } = await import("./storage");
          await storage.setItem(`premiumUntil_${userId}`, expiresAt.toISOString());

          console.log(`✅ User ${userId} premium jusqu'au ${expiresAt.toISOString()}`);
        }
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error("❌ Erreur webhook Stripe:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

// Middleware JSON (après le webhook Stripe)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger des requêtes API
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      log(logLine);
    }
  });
  next();
});

// 🆕 Ajout de la route Premium RevenueCat
registerPremiumRevenueCatRoutes(app);

// Démarrage du serveur
(async () => {
  const serverRoutes = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, serverRoutes);
  } else {
    serveStatic(app);
  }

  // Création du serveur HTTP
  const httpServer = createServer(app);

  // Gestion du port Render
  const PORT = Number(process.env.PORT) || 5000;
  console.log(`🔧 Démarrage sur le port ${PORT}`);

  httpServer.listen(PORT, "0.0.0.0", () => {
    log(`✅ Serveur démarré sur le port ${PORT}`);
  });

  httpServer.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Le port ${PORT} est déjà utilisé !`);
      console.error("Essayez de changer le PORT dans votre fichier .env ou tuez le processus existant.");
      process.exit(1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });

  // 🆕 Retour du serveur HTTP à la fin
  return httpServer;
})();
