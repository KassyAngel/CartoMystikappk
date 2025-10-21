import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Récupérer le signe depuis l'URL
    const { sign } = req.query;

    if (!sign || typeof sign !== 'string') {
      return res.status(400).json({ error: 'Signe zodiacal manquant' });
    }

    const validSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                       'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

    if (!validSigns.includes(sign.toLowerCase())) {
      return res.status(400).json({ error: 'Signe zodiacal invalide' });
    }

    const horoscope = generateDailyHoroscope(sign.toLowerCase());
    res.status(200).json(horoscope);
  } catch (error) {
    console.error('Erreur horoscope:', error);
    res.status(500).json({ error: 'Impossible de récupérer l\'horoscope du jour' });
  }
}

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