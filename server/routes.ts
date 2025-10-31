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
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.options("*", (_, res) => res.status(200).end());

  // ========================================
  // 💳 CRÉATION SESSION CHECKOUT
  // ========================================
      app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
        console.log("📥 Requête create-checkout-session reçue:", req.body);
        try {
          const { planId } = req.body;
          if (!planId) {
            console.error("❌ planId manquant");
            return res.status(400).json({ error: "planId requis" });
          }

      const prices: Record<string, { amount: number; currency: string }> = {
        premium_1month: { amount: 399, currency: "eur" },
        premium_3months: { amount: 898, currency: "eur" },
      };

      const selectedPrice = prices[planId];
      if (!selectedPrice) return res.status(400).json({ error: "Plan invalide" });

      // Récupérer le deviceId envoyé par le client
      const { deviceId } = req.body;
      
      if (!deviceId) {
        console.error("❌ deviceId manquant");
        return res.status(400).json({ error: "deviceId requis" });
      }
      
      const userId = deviceId;
      
      console.log(`🔑 UserId (deviceId) utilisé pour le paiement: ${userId}`);

      // Déterminer l'URL frontend selon l'environnement
      const isDevelopment = process.env.NODE_ENV !== 'production';
      const frontendUrl = isDevelopment 
        ? 'https://6ff68a04-c6dd-4290-a776-a222d5d0c22f-00-3477r7j3sy8oe.janeway.replit.dev:5000'
        : (process.env.FRONTEND_URL || 'https://cartomystikappk.onrender.com');

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
              // ✅ Pas de recurring pour un paiement unique
            },
            quantity: 1,
          },
        ],
        mode: "payment", // ✅ Mode paiement unique (pas de renouvellement automatique)
        success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/cancel`,
        metadata: {
          userId: userId.toString(),
          planId: planId,
        },
      });

      console.log("✅ Session Stripe créée:", session.id);
      res.json({ success: true, sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error("❌ Erreur création session Stripe:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // ========================================
  // 🔮 HOROSCOPE (inchangé)
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

  function generateDailyHoroscope(sign: string) {
    const today = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const currentDate = today.toLocaleDateString('fr-FR', dateOptions);

    const horoscopes: Record<string, any> = {
      aries: {
        descriptions: [
          "Votre énergie débordante attire toutes les bonnes opportunités aujourd'hui. C'est le moment de foncer vers vos objectifs avec confiance.",
          "Mars vous donne un courage extraordinaire pour surmonter tous les obstacles. Vos initiatives seront couronnées de succès.",
          "Votre charisme naturel ouvre toutes les portes aujourd'hui. N'hésitez pas à prendre les devants dans vos projets.",
          "Les énergies cosmiques favorisent votre carrière. Ce pourrait être le moment idéal pour une promotion ou un changement de direction.",
          "En amour, votre franchise et votre enthousiasme apportent de la fraîcheur à vos relations. Soyez à l'écoute des besoins de votre partenaire.",
          "Votre santé semble robuste aujourd'hui. Cependant, évitez les excès, surtout côté alimentation."
        ],
        moods: ["Énergique", "Confiant", "Déterminé", "Passionné", "Optimiste", "Dynamique"],
        colors: ["Rouge", "Orange vif", "Bordeaux", "Corail", "Écarlate", "Vermillon"],
        compatibility: ["Lion, Sagittaire", "Gémeaux, Verseau", "Balance, Lion", "Verseau, Gémeaux", "Sagittaire, Balance", "Lion, Verseau"]
      },
      taurus: {
        descriptions: [
          "La stabilité que vous recherchez se manifeste enfin dans votre vie. Profitez de cette période de sérénité pour savourer les plaisirs simples.",
          "Une période favorable aux investissements ou à la gestion de vos finances. Les décisions prises aujourd'hui porteront leurs fruits à long terme.",
          "Vénus vous apporte douceur et harmonie dans vos relations. C'est un jour parfait pour cultiver l'amour et l'amitié.",
          "Votre patience et votre persévérance portent leurs fruits. Les résultats de vos efforts passés se concrétisent aujourd'hui.",
          "Les relations familiales sont particulièrement harmonieuses. Profitez de ce moment pour renforcer les liens avec ceux qui vous sont chers.",
          "Ne négligez pas votre bien-être physique, prenez le temps de vous détendre et de faire de l'exercice."
        ],
        moods: ["Paisible", "Sensuel", "Stable", "Généreux", "Patient", "Harmonieux"],
        colors: ["Vert émeraude", "Rose tendre", "Beige doré", "Terre de Sienne", "Vert olive", "Rose poudré"],
        compatibility: ["Vierge, Capricorne", "Cancer, Poissons", "Scorpion, Vierge", "Capricorne, Cancer", "Poissons, Scorpion", "Vierge, Poissons"]
      },
      gemini: {
        descriptions: [
          "Votre curiosité naturelle vous mène vers de merveilleuses découvertes. Restez ouvert aux nouvelles rencontres et aux idées innovantes.",
          "Des opportunités professionnelles se présentent. Osez proposer vos idées innovantes, elles seront bien accueillies.",
          "Mercure stimule votre intelligence et votre créativité. C'est le jour idéal pour communiquer, écrire ou apprendre quelque chose de nouveau.",
          "Votre adaptabilité est votre plus grand atout aujourd'hui. Embrassez les changements avec enthousiasme.",
          "Soyez attentif à votre entourage, certaines personnes pourraient avoir des informations cruciales à partager avec vous.",
          "Votre état d'esprit créatif vous pousse à explorer de nouveaux moyens pour améliorer votre santé mentale et physique."
        ],
        moods: ["Curieux", "Communicatif", "Vif", "Sociable", "Adaptable", "Créatif"],
        colors: ["Jaune citron", "Bleu ciel", "Argent", "Lavande", "Jaune d'or", "Bleu pervenche"],
        compatibility: ["Balance, Verseau", "Bélier, Lion", "Sagittaire, Balance", "Verseau, Bélier", "Lion, Sagittaire", "Balance, Bélier"]
      },
      cancer: {
        descriptions: [
          "Votre intuition est particulièrement développée aujourd'hui. Suivez votre cœur, il vous guidera vers les bonnes décisions.",
          "Les projets collaboratifs vous seront favorables. Profitez de cette période pour unir vos forces avec d'autres personnes.",
          "La famille et les amis jouent un rôle clé dans votre épanouissement aujourd'hui. Soyez à l'écoute et offrez votre soutien.",
          "Un petit moment de relaxation pourrait faire des merveilles pour votre énergie. Pensez à méditer ou à prendre un bain apaisant.",
          "La Lune illumine votre sensibilité et renforce vos liens familiaux. C'est un moment privilégié pour exprimer vos sentiments.",
          "Votre bienveillance naturelle attire les confidences et renforce vos amitiés. Vous êtes un refuge pour ceux qui vous entourent."
        ],
        moods: ["Émotionnel", "Protecteur", "Intuitif", "Tendre", "Maternel", "Empathique"],
        colors: ["Blanc nacré", "Bleu océan", "Argent lunaire", "Rose pâle", "Perle", "Bleu laiteux"],
        compatibility: ["Scorpion, Poissons", "Taureau, Vierge", "Capricorne, Scorpion", "Poissons, Taureau", "Vierge, Capricorne", "Scorpion, Vierge"]
      },
      leo: {
        descriptions: [
          "Votre rayonnement naturel éblouit votre entourage. C'est votre moment de gloire, profitez-en pour briller de mille feux.",
          "Le Soleil vous donne une confiance inébranlable. Vos projets créatifs et vos initiatives personnelles sont favorisés.",
          "Les relations amicales sont renforcées grâce à votre générosité. Vous pourriez organiser un événement pour célébrer vos liens.",
          "Le moment est idéal pour prendre des initiatives audacieuses dans votre carrière. Vous êtes prêt à saisir les opportunités qui se présentent.",
          "Un peu de sport ou d'activité physique pourrait vous apporter un regain d'énergie. Faites quelque chose qui vous excite.",
          "Votre générosité et votre chaleur humaine vous valent l'admiration de tous. Vous inspirez et motivez ceux qui vous entourent."
        ],
        moods: ["Rayonnant", "Généreux", "Créatif", "Majestueux", "Charismatique", "Théâtral"],
        colors: ["Or", "Orange solaire", "Jaune impérial", "Rouge royal", "Doré", "Ambre"],
        compatibility: ["Bélier, Sagittaire", "Gémeaux, Balance", "Verseau, Bélier", "Sagittaire, Gémeaux", "Balance, Verseau", "Bélier, Balance"]
      },
      virgo: {
        descriptions: [
          "Votre perfectionnisme et votre attention aux détails vous mènent vers l'excellence. Chaque effort sera récompensé.",
          "Mercure affine votre sens critique et votre capacité d'analyse. C'est le moment idéal pour organiser et planifier vos projets.",
          "Votre sens de l'organisation brille aujourd'hui. Utilisez cette énergie pour structurer vos projets à long terme.",
          "Les relations professionnelles sont particulièrement favorisées. Vous pourriez recevoir une proposition intéressante.",
          "Prenez soin de votre santé en équilibrant travail et détente. Une petite pause bien méritée pourrait faire une grande différence.",
          "Votre serviabilité et votre dévouement touchent profondément votre entourage. Vos conseils sont précieux et recherchés."
        ],
        moods: ["Méthodique", "Serviable", "Précis", "Sage", "Analytique", "Perfectionniste"],
        colors: ["Beige naturel", "Vert olive", "Gris perle", "Bleu marine", "Taupe", "Kaki"],
        compatibility: ["Taureau, Capricorne", "Cancer, Scorpion", "Poissons, Taureau", "Capricorne, Cancer", "Scorpion, Poissons", "Taureau, Scorpion"]
      },
      libra: {
        descriptions: [
          "Vénus vous inspire l'harmonie et la beauté dans tous vos projets. C'est un jour parfait pour cultiver l'art et l'esthétique.",
          "Votre diplomatie naturelle résout tous les conflits avec élégance. Vous êtes un médiateur né et apprécié de tous.",
          "Un équilibre parfait entre vie personnelle et professionnelle vous permettra de briller dans les deux domaines. Cherchez à maintenir cette harmonie.",
          "Prenez soin de votre corps et de votre esprit. Le yoga ou la méditation seraient des alliés parfaits aujourd'hui.",
          "Les affaires de cœur sont renforcées par une communication ouverte et sincère. Exprimez-vous clairement.",
          "L'équilibre que vous recherchez se manifeste dans tous les domaines de votre vie. Savourez cette période de sérénité."
        ],
        moods: ["Harmonieux", "Raffiné", "Diplomatique", "Équilibré", "Artistique", "Charmeur"],
        colors: ["Rose pastel", "Bleu ciel", "Vert menthe", "Ivoire", "Lilas", "Bleu poudré"],
        compatibility: ["Gémeaux, Verseau", "Lion, Sagittaire", "Bélier, Gémeaux", "Verseau, Lion", "Sagittaire, Bélier", "Gémeaux, Lion"]
      },
      scorpio: {
        descriptions: [
          "Votre intensité et votre magnétisme attirent les opportunités exceptionnelles. Plongez dans vos passions avec détermination.",
          "Vous êtes en pleine transformation. Profitez-en pour laisser derrière vous les aspects de votre vie qui ne vous servent plus.",
          "Un peu de passion dans vos relations amoureuses apportera un souffle nouveau. Exprimez vos désirs sans réserve.",
          "Pluton transforme votre vie de manière positive. Embrassez les changements profonds qui s'offrent à vous.",
          "Votre énergie mentale est forte, mais ne laissez pas votre corps derrière. Accordez-vous un peu de temps pour vous détendre.",
          "Votre intuition perçante révèle des vérités cachées. Utilisez cette clairvoyance pour prendre les bonnes décisions."
        ],
        moods: ["Intense", "Mystérieux", "Passionné", "Transformateur", "Magnétique", "Profond"],
        colors: ["Rouge bordeaux", "Noir profond", "Pourpre", "Grenat", "Cramoisi", "Brun acajou"],
        compatibility: ["Cancer, Poissons", "Vierge, Capricorne", "Taureau, Cancer", "Poissons, Vierge", "Capricorne, Taureau", "Cancer, Vierge"]
      },
      sagittarius: {
        descriptions: [
          "Jupiter élargit vos horizons et vous ouvre de nouveaux chemins. C'est le moment idéal pour voyager ou explorer de nouvelles philosophies.",
          "Aujourd'hui est une journée idéale pour explorer de nouveaux horizons professionnels. Pensez à des collaborations ou à des projets à l'international.",
          "Votre optimisme attire les bonnes personnes autour de vous. C'est une excellente période pour créer de nouvelles alliances.",
          "Votre optimisme contagieux inspire et motive votre entourage. Votre vision positive attire la chance et le succès.",
          "Une activité en plein air pourrait vous revitaliser. Faites le plein d'énergie et profitez des bienfaits de la nature.",
          "Votre soif d'aventure vous mène vers des expériences enrichissantes. Osez sortir de votre zone de confort."
        ],
        moods: ["Aventurier", "Optimiste", "Philosophe", "Libre", "Explorateur", "Enthousiaste"],
        colors: ["Bleu turquoise", "Violet royal", "Orange mandarine", "Vert forêt", "Indigo", "Cobalt"],
        compatibility: ["Bélier, Lion", "Balance, Verseau", "Gémeaux, Bélier", "Lion, Balance", "Verseau, Gémeaux", "Bélier, Verseau"]
      },
      capricorn: {
        descriptions: [
          "Saturne récompense votre patience et votre travail acharné. Vos efforts passés portent enfin leurs fruits de manière spectaculaire.",
          "Votre détermination vous permet de franchir de nouvelles étapes importantes dans votre carrière. Les résultats seront à la hauteur de vos efforts.",
          "Le soutien de vos proches vous aide à maintenir l'équilibre. N'ayez pas peur de demander de l'aide lorsque vous en avez besoin.",
          "Votre sens des responsabilités et votre maturité vous valent le respect et la reconnaissance. Vous inspirez confiance.",
          "Soyez attentif à votre bien-être physique. Un peu de repos ou un soin relaxant serait bénéfique.",
          "Votre détermination inébranlable vous mène vers vos objectifs les plus ambitieux. Rien ne peut arrêter votre ascension."
        ],
        moods: ["Ambitieux", "Responsable", "Persévérant", "Sage", "Discipliné", "Pragmatique"],
        colors: ["Gris anthracite", "Marron chocolat", "Vert foncé", "Bleu nuit", "Sépia", "Vert sapin"],
        compatibility: ["Taureau, Vierge", "Scorpion, Poissons", "Cancer, Taureau", "Vierge, Scorpion", "Poissons, Cancer", "Taureau, Poissons"]
      },
      aquarius: {
        descriptions: [
          "Uranus stimule votre originalité et votre innovation. Vos idées révolutionnaires changent positivement votre environnement.",
          "Vos idées innovantes prennent de l'ampleur, mais attention à ne pas vous disperser. Restez concentré sur vos priorités.",
          "Les relations amicales sont particulièrement favorisées. Vous pourriez organiser un événement qui rassemble vos proches.",
          "Votre vision futuriste et votre humanisme vous positionnent comme un leader visionnaire. Vous inspirez le progrès.",
          "Prenez soin de vous mentalement. La pratique de la pleine conscience ou d'un hobby créatif pourrait vous apaiser.",
          "Votre indépendance d'esprit vous libère des conventions limitantes. Suivez votre voie unique avec confiance."
        ],
        moods: ["Visionnaire", "Indépendant", "Humaniste", "Original", "Innovateur", "Altruiste"],
        colors: ["Bleu électrique", "Argent métallique", "Turquoise", "Violet", "Néon", "Cyan"],
        compatibility: ["Gémeaux, Balance", "Sagittaire, Bélier", "Lion, Gémeaux", "Balance, Sagittaire", "Bélier, Lion", "Gémeaux, Sagittaire"]
      },
      pisces: {
        descriptions: [
          "Neptune exalte votre sensibilité artistique et votre compassion. Votre créativité touche profondément ceux qui vous entourent.",
          "Votre sensibilité vous aide à voir les choses sous un angle unique. N'hésitez pas à utiliser votre intuition pour prendre des décisions importantes.",
          "Les relations amoureuses et familiales sont sous le signe de la complicité. Vous êtes un véritable soutien pour vos proches.",
          "Votre empathie naturelle vous connecte aux émotions des autres. Vous êtes un guérisseur né avec un don précieux.",
          "La méditation ou une activité spirituelle pourrait vous apporter un grand soulagement. Prenez un moment pour vous recentrer.",
          "Votre intuition vous guide vers des révélations spirituelles importantes. Faites confiance à votre sagesse intérieure."
        ],
        moods: ["Intuitif", "Compassionnel", "Artistique", "Spirituel", "Rêveur", "Sensible"],
        colors: ["Bleu océan", "Vert aqua", "Violet mystique", "Blanc perle", "Bleu lagon", "Vert d'eau"],
        compatibility: ["Cancer, Scorpion", "Capricorne, Taureau", "Vierge, Cancer", "Scorpion, Capricorne", "Taureau, Vierge", "Cancer, Capricorne"]
      }
    };

     const signData = horoscopes[sign];
        if (!signData) {
          throw new Error('Signe non trouvé');
        }

        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
        const descIndex = dayOfYear % signData.descriptions.length;
        const moodIndex = dayOfYear % signData.moods.length;
        const colorIndex = dayOfYear % signData.colors.length;
        const compatIndex = dayOfYear % signData.compatibility.length;
        const luckyNumber = (dayOfYear % 50) + 1;

        return {
          sign: sign,
          date: getSignDateRange(sign),
          description: signData.descriptions[descIndex],
          mood: signData.moods[moodIndex],
          luckyNumber: luckyNumber.toString(),
          luckyColor: signData.colors[colorIndex],
          compatibility: signData.compatibility[compatIndex],
          currentDate: currentDate
        };
      }

      function getSignDateRange(sign: string): string {
        const ranges: Record<string, string> = {
          aries: "21 mars - 19 avril",
          taurus: "20 avril - 20 mai",
          gemini: "21 mai - 20 juin",
          cancer: "21 juin - 22 juillet",
          leo: "23 juillet - 22 août",
          virgo: "23 août - 22 septembre",
          libra: "23 septembre - 22 octobre",
          scorpio: "23 octobre - 21 novembre",
          sagittarius: "22 novembre - 21 décembre",
          capricorn: "22 décembre - 19 janvier",
          aquarius: "20 janvier - 18 février",
          pisces: "19 février - 20 mars"
        };
        return ranges[sign] || "";
      }

      // ===== ROUTES PREMIUM =====

      app.post("/api/premium/activate", async (req, res) => {
        try {
          const { planId } = req.body;
          const now = new Date();
          let premiumUntil: Date;

          if (planId === 'premium_1month') {
            premiumUntil = new Date(now.setMonth(now.getMonth() + 1));
          } else if (planId === 'premium_3months') {
            premiumUntil = new Date(now.setMonth(now.getMonth() + 3));
          } else {
            return res.status(400).json({ error: 'Plan invalide' });
          }

          await storage.setItem('premiumUntil', premiumUntil.toISOString());

          console.log(`✅ Premium activé jusqu'au ${premiumUntil.toLocaleDateString('fr-FR')}`);

          res.json({
            success: true,
            isPremium: true,
            premiumUntil: premiumUntil.toISOString()
          });
        } catch (error) {
          console.error("❌ Erreur activation premium:", error);
          res.status(500).json({ error: "Erreur serveur" });
        }
      });

      app.get("/api/user/premium-status", async (req, res) => {
        try {
          // Utiliser le même système de userId que pour le paiement
          const userId = req.cookies?.userId;
          
          if (!userId) {
            console.log('🔍 Aucun userId trouvé dans les cookies');
            return res.json({ isPremium: false, premiumUntil: null });
          }

          // Vérifier le statut premium de cet utilisateur
          const premiumUntilStr = await storage.getItem(`premiumUntil_${userId}`);

          if (!premiumUntilStr) {
            console.log(`🔍 Vérification premium pour ${userId || 'utilisateur inconnu'}: Aucun abonnement`);
            return res.json({ isPremium: false, premiumUntil: null });
          }

          const premiumUntil = new Date(premiumUntilStr);
          const now = new Date();
          const isPremium = premiumUntil > now;

          console.log(`🔍 Vérification premium pour ${userId}: ${isPremium ? 'Actif' : 'Expiré'} (expire: ${premiumUntil.toLocaleDateString('fr-FR')})`);

          res.json({
            isPremium,
            premiumUntil: isPremium ? premiumUntilStr : null
          });
        } catch (error) {
          console.error("❌ Erreur vérification premium:", error);
          res.json({ isPremium: false, premiumUntil: null });
        }
      });

      // ===== ROUTES GRIMOIRE =====

      app.get("/api/readings", async (req, res) => {
        try {
          const allReadings = await storage.getItem('readings') || [];
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

          // ✅ Tirages illimités pour tous (Premium = sans pub)
          const allReadings = await storage.getItem('readings') || [];
          
          console.log('📖 Sauvegarde tirage - Total actuel:', allReadings.length);

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

          // ❌ Ne pas sauvegarder certains types dans le Grimoire
          const typesExcludedFromGrimoire = ['crystalBall', 'horoscope', 'bonusRoll'];

          if (!typesExcludedFromGrimoire.includes(type)) {
            allReadings.unshift(newReading);
            await storage.setItem('readings', allReadings);
            console.log('✅ Tirage sauvegardé dans Grimoire:', {
              id: newReading.id,
              type: newReading.type,
              totalSaved: allReadings.length
            });
          } else {
            console.log('🚫 Tirage NON sauvegardé (type exclu du Grimoire):', type);
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

          const allReadings = await storage.getItem('readings') || [];
          const index = allReadings.findIndex((r: any) => r.id === id);

          if (index === -1) {
            return res.status(404).json({ error: "Tirage non trouvé" });
          }

          allReadings[index].notes = note;
          await storage.setItem('readings', allReadings);

          console.log(`📝 Note mise à jour pour le tirage ${id}`);
          res.json(allReadings[index]);
        } catch (error) {
          console.error("❌ Erreur mise à jour note:", error);
          res.status(500).json({ error: "Erreur serveur" });
        }
      });

      app.put("/api/readings/:id/favorite", async (req, res) => {
        try {
          const { id } = req.params;
          const { isFavorite } = req.body;

          const allReadings = await storage.getItem('readings') || [];
          const index = allReadings.findIndex((r: any) => r.id === id);

          if (index === -1) {
            return res.status(404).json({ error: "Tirage non trouvé" });
          }

          allReadings[index].isFavorite = isFavorite;
          await storage.setItem('readings', allReadings);

          console.log(`⭐ Favori ${isFavorite ? 'ajouté' : 'retiré'} pour le tirage ${id}`);
          res.json(allReadings[index]);
        } catch (error) {
          console.error("❌ Erreur toggle favori:", error);
          res.status(500).json({ error: "Erreur serveur" });
        }
      });

      // 🗑️ Route pour vider le Grimoire
      app.delete("/api/readings", async (req, res) => {
        try {
          await storage.setItem('readings', []);
          console.log('🔥 Tous les tirages ont été supprimés du Grimoire');
          res.json({ success: true, message: 'Grimoire vidé avec succès' });
        } catch (error) {
          console.error("❌ Erreur suppression tirages:", error);
          res.status(500).json({ error: "Erreur serveur" });
        }
      });

      // ===== ROUTE ALERTE EXPIRATION PREMIUM =====
      app.get("/api/user/premium-expiration-alert", async (req, res) => {
        try {
          const userId = req.cookies?.userId;
          
          if (!userId) {
            return res.json({ shouldAlert: false });
          }

          const premiumUntilStr = await storage.getItem(`premiumUntil_${userId}`);
          if (!premiumUntilStr) {
            return res.json({ shouldAlert: false });
          }

          const premiumUntil = new Date(premiumUntilStr);
          const now = new Date();
          const daysRemaining = Math.ceil((premiumUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

          // Vérifier si une alerte a déjà été affichée aujourd'hui
          const lastAlertDateStr = await storage.getItem(`lastAlertDate_${userId}`);
          const today = new Date().toDateString();
          
          if (lastAlertDateStr === today) {
            // Déjà alerté aujourd'hui
            return res.json({ shouldAlert: false });
          }

          // Conditions d'alerte
          let shouldAlert = false;
          let message = '';
          let alertType = '';

          if (daysRemaining <= 0) {
            // Premium expiré
            shouldAlert = true;
            message = 'premium.expired';
            alertType = 'expired';
          } else if (daysRemaining <= 3) {
            // 3 jours ou moins avant expiration
            shouldAlert = true;
            message = 'premium.expiringSoon';
            alertType = 'warning';
          }

          if (shouldAlert) {
            // Enregistrer la date de l'alerte pour éviter les doublons
            await storage.setItem(`lastAlertDate_${userId}`, today);
          }

          res.json({
            shouldAlert,
            message,
            alertType,
            daysRemaining: Math.max(0, daysRemaining),
            expirationDate: premiumUntil.toISOString()
          });

        } catch (error) {
          console.error("❌ Erreur vérification alerte expiration:", error);
          res.json({ shouldAlert: false });
        }
      });

      const httpServer = createServer(app);
      return httpServer;
    }