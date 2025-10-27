import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";

// ✅ Charger les variables d'environnement
dotenv.config();

const app = express();

// ⚠️ IMPORTANT : Le webhook Stripe DOIT venir AVANT express.json()
// Car Stripe a besoin du body brut (raw) pour vérifier la signature
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      // Cette route sera gérée dans routes.ts
      const handler = (app as any)._stripeWebhookHandler;
      if (handler) {
        await handler(req, res);
      } else {
        res.status(404).json({ error: "Webhook handler not found" });
      }
    } catch (error) {
      console.error("❌ Erreur webhook:", error);
      res.status(500).json({ error: "Webhook error" });
    }
  }
);

// ✅ Middleware JSON (APRÈS le webhook Stripe)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Logger des requêtes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Servir les fichiers statiques et Vite en dev
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Démarrer le serveur
  const PORT = parseInt(process.env.PORT || '3000', 10);
  server.listen(PORT, "0.0.0.0", () => {
    log(`✅ Serveur démarré sur le port ${PORT}`);
  });
})();
