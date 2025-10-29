import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";
// Charger les variables d'environnement
dotenv.config();
const app = express();
// Webhook Stripe
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
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
// Middleware JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Logger des requêtes 
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
// Démarrer le serveur
(async () => {
  const server = await registerRoutes(app);
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  // Gestion du port
  const PORT = process.env.PORT || 3001; // Utilise PORT de Render ou 3001 par défaut
  console.log(`🔧 Démarrage sur le port ${PORT}`);
  server.listen(PORT, "0.0.0.0") // Utilisez 0.0.0.0 pour que le port soit accessible
    .on("listening", () => log(`✅ Serveur démarré sur le port ${PORT}`))
    .on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Le port ${PORT} est déjà utilisé !`);
        console.error("Essayez de changer le PORT dans votre fichier .env ou tuez le processus existant.");
        process.exit(1);
      } else {
        console.error(err);
        process.exit(1);
      }
    });
})();