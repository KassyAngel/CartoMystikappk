export type Language = "fr" | "en" | "es" | "de" | "it";

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Landing Page
    "landing.title": "CartoMystik",
    "landing.subtitle":
      "Découvrez les mystères de votre destinée à travers les cartes, les astres et la sagesse ancienne",
    "landing.enter": "ENTRER",
    "landing.ads.support": "Les publicités nous aident à garder l'application gratuite",

    // 🆕 Disclaimer - AJOUTER ICI
    "disclaimer.title": "Avertissement Important",
    "disclaimer.text": "CartoMystik est une application de divertissement et de développement personnel. Consultez des experts qualifiés pour toute décision importante..",
    "disclaimer.note": "En continuant, vous acceptez d'utiliser cette application à des fins de divertissement",
    "disclaimer.accept": "J'ai compris",
    "disclaimer.legal": "Cette application est conforme au RGPD",

    // No-repeat system
    "system.antirepeat.loading": "Les cartes se mélangent...",
    "system.antirepeat.active": "Système anti-répétition actif",
    "system.cards.refreshed": "Nouvelles cartes disponibles",

    // Name Page
    "name.title": "Prénom",
    "name.subtitle":
      "Comment préférez-vous être appelé ? Entrez votre nom ou votre surnom",
    "name.placeholder": "Entrez votre nom",
    "name.next": "SUIVANT",

    // Date Page
    "date.title": "Date de naissance",
    "date.subtitle":
      "Révélez votre signe astrologique pour une divination personnalisée",
    "date.day": "Jour",
    "date.month": "Mois",
    "date.year": "Année",
    "date.next": "SUIVANT",
    "date.months.1": "Janvier",
    "date.months.2": "Février",
    "date.months.3": "Mars",
    "date.months.4": "Avril",
    "date.months.5": "Mai",
    "date.months.6": "Juin",
    "date.months.7": "Juillet",
    "date.months.8": "Août",
    "date.months.9": "Septembre",
    "date.months.10": "Octobre",
    "date.months.11": "Novembre",
    "date.months.12": "Décembre",

    // Gender Page
    "gender.title": "Genre",
    "gender.subtitle":
      "Indiquez votre genre afin de personnaliser votre expérience",
    "gender.male": "Homme",
    "gender.female": "Féminin",
    "gender.other": "Autre",
    "gender.next": "COMMENCER",
    "gender.back": "RETOUR",

    // Barre de navigation
    "menu.open": "Ouvrir le menu",
    "profile.open": "Ouvrir le profil",
    "profile.birthdate": "Date de naissance",
    "profile.gender": "Genre",
    "profile.zodiac": "Signe astrologique",
    "profile.edit": "Modifier mon profil",
    "profile.edit.title": "Modifier mon profil",
    "profile.edit.subtitle": "Mettez à jour vos informations personnelles",
    "profile.edit.error": "Veuillez remplir tous les champs",
    "grimoire.subtitle": "Votre historique de tirages",
    "premium.active": "Actif",
    "locale": "fr-FR",
    "common.cancel": "Annuler",
    "common.save": "Sauvegarder",
    "name.label": "Nom",
    
    // FR Notifications  
    "notification.channel.name": "Tirage Quotidien",
    "notification.channel.description": "Notifications pour votre tirage mystique du jour",
    "notification.variants.1.title": "✨ Les astres vous appellent",
    "notification.variants.1.body": "Découvrez votre horoscope et votre tirage mystique du jour !",
    "notification.variants.2.title": "🔮 Votre destinée vous attend",
    "notification.variants.2.body": "Consultez votre tirage quotidien et votre horoscope personnalisé",
    "notification.variants.3.title": "🌙 Le mystère se révèle",
    "notification.variants.3.body": "Votre tirage du jour et horoscope sont prêts !",
    "notification.variants.4.title": "⭐ Un message des étoiles",
    "notification.variants.4.body": "Découvrez ce que les cartes et les astres vous réservent aujourd'hui",
    "notification.variants.5.title": "✨ CartoMystik vous appelle",
    "notification.variants.5.body": "Votre guidance quotidienne : tirage de cartes et horoscope disponibles",
    "notification.modal.title": "Notifications Quotidiennes",
    "notification.modal.description": "Recevez chaque jour à 10h un rappel mystique pour découvrir votre tirage et horoscope personnalisés",
    "notification.modal.benefit1": "Tirage journalier",
    "notification.modal.benefit2": "Horoscope personnalisé selon votre signe",
    "notification.modal.benefit3": "Ne manquez jamais votre guidance quotidienne",
    "notification.modal.accept": "Activer les notifications",
    "notification.modal.decline": "Non merci",
    "notification.modal.note": "Vous pourrez modifier ce choix dans les paramètres",
    
    // Oracle Selection
    "oracle.welcome": "Bienvenue {name} !",
    "oracle.subtitle": "Découvrez les secrets de votre destinée",
    "oracle.daily.title": "Tirage du Jour",
    "oracle.daily.description":
      "Une carte pour vous guider et vous inspirer aujourd'hui",
    "oracle.horoscope.title": "Horoscope",
    "oracle.horoscope.description":
      "Découvrez ce que les astres vous réservent aujourd'hui selon votre signe",
    "oracle.tarot.title": "Tarot",
    "oracle.tarot.description":
      '"Les 22 arcanes majeurs dévoilent les mystères de votre destinée"',
    "oracle.angels.title": "Oracle des Anges",
    "oracle.angels.description":
      "Connectez-vous avec vos guides angéliques pour recevoir leurs messages d'amour",
    "oracle.runes.title": "Runes Nordiques",
    "oracle.runes.description":
      "L'ancienne sagesse des Vikings vous révèle votre chemin de guerre et de victoire",
    "oracle.back": "RETOUR",
    "oracle.home": "Accueil",

    // Card Game
    "cardgame.back": "Retour",
    "cardgame.daily.instruction":
      "Choisissez 1 carte pour votre conseil du jour",
    "cardgame.reading.instruction":
      "Choisissez 3 cartes pour éclairer votre destinée",
    "cardgame.selected": "Cartes sélectionnées: {current}/{max}",
    "cardgame.reveal": "RÉVÉLER LES CARTES",
    "cardgame.page": "Page {current} sur {total}",
    "cardgame.previous": "Précédent",
    "cardgame.next": "Suivant",
    "cardgame.daily.choose": "Choisissez la carte qui vous appelle",

    // CardGame - Modal de révélation
    "cardgame.cardRevealed": "Carte révélée",
    "cardgame.continue": "Continuer",
    "cardgame.seeInterpretation": "Voir l'interprétation",

    // Revelation - Loading
    "revelation.loading.title": "Interprétation en cours...",
    "revelation.loading.daily": "Les astres dévoilent ton oracle du jour, {name}",
    "revelation.loading.reading": "Les cartes révèlent leurs secrets mystiques, {name}",
    "revelation.loading.mysticMessage": "Les étoiles s'alignent pour toi...",

    // Revelation Page
    "revelation.positions.daily": "Conseil du Jour",
    "revelation.positions.past": "Carte 1",
    "revelation.positions.present": "Carte 2",
    "revelation.positions.future": "Carte 3",
    "revelation.summary.title": "Ce que révèlent tes cartes",
    "revelation.newConsultation": "Nouvelle consultation",
    "revelation.title.daily": "Votre Conseil du Jour",
    "revelation.title.reading": "Votre Tirage - {oracle}",
    "revelation.instruction.daily":
      "Cliquez sur votre carte pour révéler le message du jour",
    "revelation.instruction.reading":
      "Cliquez sur chaque carte pour révéler votre destinée",
    "revelation.flipCard.reveal": "Touchez pour révéler",
    "revelation.summary.seeMore": "Voir plus ↓",
    "revelation.summary.seeLess": "Voir moins ↑",
    "revelation.revealButton": "Révèlation",
    "revelation.backToSelection": "Retour à la sélection",
    "interpretation.advice.title": "Ton conseil personnel",
    "revelation.subtitle.revealed": "Contemplez vos cartes révélées",

    // Interpretation Templates
    "interpretation.gender.femme": "Ma chère",
    "interpretation.gender.homme": "Mon cher",
    "interpretation.gender.autre": "Chère âme",
    "interpretation.daily.greeting":"Bonjour {name} ! Voici ton conseil pour cette belle journée.",
    "interpretation.daily.zodiac": "En tant que {zodiacSign}, ",
    "interpretation.daily.cardMessage":'La carte "{cardName}" a une énergie spéciale pour toi aujourd\'hui.',
    "interpretation.daily.wisdom":"En tant que {zodiacSign}, tu as la sagesse nécessaire pour bien utiliser ce conseil. Fais confiance à ton instinct et laisse cette énergie positive guider tes actions d'aujourd'hui.",
    "interpretation.daily.closing":"Bonne journée {genderText} {name}, et que les étoiles illuminent ton chemin !",
    "interpretation.tarot.greeting":"Salut {name} ! Alors, ton tirage de Tarot me dit des choses intéressantes.",
    "interpretation.tarot.past":"{cardName} dans ton passé révèle : {cardMeaning}. Ces expériences t'ont vraiment fait grandir et t'ont rendu{genderSuffix} plus fort{genderSuffix}.",
    "interpretation.tarot.present":"En ce moment, {cardName} influence ta vie avec son énergie : {cardMeaning}. Tu es dans une période importante qui annonce de belles choses pour la suite.",
    "interpretation.tarot.future":"Pour ton futur, {cardName} t'apporte : {cardMeaning}. Cette énergie va transformer ta vie de manière positive et durable.",
    "interpretation.tarot.advice":"Mon conseil : {name}, avec ton caractère de {zodiacSign}, fais confiance à ton instinct. Tu as tout ce qu'il faut pour réussir !",
    "interpretation.angels.greeting":
      "Bonjour {name} ! Tes anges gardiens ont des révélations lumineuses à partager avec toi.",
    "interpretation.angels.past":
      "Dans ton cheminement passé, {cardName} a semé des graines divines : {cardMeaning}. Ces bénédictions ont nourri ton âme et t'ont préparé{genderSuffix} à recevoir l'amour inconditionnel qui t'entoure maintenant.",
    "interpretation.angels.present":
      "En ce moment précis, {cardName} illumine ton présent : {cardMeaning}. Cette lumière céleste guide chacun de tes pas et transforme tes défis en opportunités de croissance spirituelle.",
    "interpretation.angels.future":
      "Vers ton avenir radieux, {cardName} déploie ses ailes protectrices : {cardMeaning}. Les portes du paradis s'ouvrent devant toi, révélant un chemin pavé de miracles et de synchronicités.",
    "interpretation.angels.message":
      "Transmission angélique : {genderText} {name}, ton essence de {zodiacSign} vibre en harmonie avec ces fréquences divines. Laisse ton cœur s'ouvrir à ces messages d'amour pur et reste réceptif{genderSuffix} aux signes que tes guides t'envoient !",
    "interpretation.runes.greeting":
      "Salut {name} ! Les anciennes runes scandinaves révèlent les secrets de ton destin de guerrier{genderSuffix}.",
    "interpretation.runes.past":
      "Ta rune du passé, {cardName}, révèle : {cardMeaning}. Ces forces primitives ont sculpté ton caractère dans le feu et la glace, te préparant{genderSuffix} aux défis d'aujourd'hui avec la sagesse des anciens.",
    "interpretation.runes.present":
      "En ce moment, {cardName} guide tes pas : {cardMeaning}. Cette énergie runique illumine ton chemin actuel, te connectant aux forces mystiques qui régissent ton quotidien.",
    "interpretation.runes.future":
      "Vers l'avenir, {cardName} annonce : {cardMeaning}. Cette prophétie runique trace la voie de tes accomplissements futurs, où tu brilleras victorieux{genderSuffix} sous l'égide des dieux du Nord.",
    "interpretation.runes.advice":
      "Souviens-toi, {genderText} {name} : en tant que {zodiacSign}, tu portes l'héritage des Vikings dans ton sang. Les runes ont parlé - suis leur guidance avec courage et détermination{genderSuffix} !",
    "interpretation.fallback.zodiac": "personne intuitive",
    "interpretation.fallback.angels": "être lumineux",
    "interpretation.fallback.runes": "guerrier{genderSuffix}",
    "interpretation.title.daily": "Interprétation pour {name}",
    "interpretation.title.reading": "Tirage cartes pour {name}",
    "interpretation.subtitle": "Voici votre révélation personnalisée",
    "interpretation.backToCards": "Retour aux cartes",
    "interpretation.newConsultation": "Nouvelle consultation",

    // ========== VARIATIONS POUR LE TIRAGE DU JOUR ==========

    // Variations pour "la carte a une énergie spéciale"
    "interpretation.daily.cardMessage.var1":
      'la carte "{cardName}" a une énergie spéciale pour toi aujourd\'hui.',
    "interpretation.daily.cardMessage.var2":
      "la carte \"{cardName}\" t'apporte une vibration unique aujourd'hui.",
    "interpretation.daily.cardMessage.var3":
      'la carte "{cardName}" résonne particulièrement avec ton énergie du jour.',
    "interpretation.daily.cardMessage.var4":
      'la carte "{cardName}" porte un message important pour toi aujourd\'hui.',
    "interpretation.daily.cardMessage.var5":
      'la carte "{cardName}" vibre en harmonie avec ta journée.',
    "interpretation.daily.cardMessage.var6":
      'la carte "{cardName}" éclaire ton chemin avec une force particulière aujourd\'hui.',
    "interpretation.daily.cardMessage.var7":
      "la carte \"{cardName}\" t'invite à écouter ton intuition aujourd'hui.",
    "interpretation.daily.cardMessage.var8":
      'la carte "{cardName}" transmet une énergie puissante qui te guide.',
    "interpretation.daily.cardMessage.var9":
      "la carte \"{cardName}\" t'offre une vibration exceptionnelle à ressentir aujourd'hui.",
    "interpretation.daily.cardMessage.var10":
      'la carte "{cardName}" t\'accompagne avec une énergie lumineuse tout au long de la journée.',

    // Variations pour "Bonne journée"
    "interpretation.daily.closing.var1":
      "Bonne journée {genderText} {name}, et que les étoiles illuminent ton chemin !",
    "interpretation.daily.closing.var2":
      "Belle journée à toi {name}, que cette guidance t'accompagne !",
    "interpretation.daily.closing.var3":
      "Profite bien de ta journée {name}, les énergies sont avec toi !",
    "interpretation.daily.closing.var4":
      "Passe une merveilleuse journée {genderText} {name} !",
    "interpretation.daily.closing.var5":
      "Que cette journée te soit douce {name}, l'univers veille sur toi !",
    "interpretation.daily.closing.var6":
      "Que ta journée soit lumineuse, {genderText} {name}, et remplie de belles surprises !",
    "interpretation.daily.closing.var7":
      "Bonne journée à toi, {name}, que l’énergie positive t’accompagne à chaque instant !",
    "interpretation.daily.closing.var8":
      "Que ce jour t’apporte joie et sérénité, {genderText} {name} !",
    "interpretation.daily.closing.var9":
      "Souris à la vie aujourd’hui, {name}, elle te le rendra au centuple !",
    "interpretation.daily.closing.var10":
      "Passe une journée inspirante, {genderText} {name}, sous la protection des étoiles !",

    // Variations pour "Wisdom"
    "interpretation.daily.wisdom.var1":
      "En tant que {zodiacSign}, tu as la sagesse nécessaire pour bien utiliser ce conseil. Fais confiance à ton instinct et laisse cette énergie positive guider tes actions aujourd'hui.",
    "interpretation.daily.wisdom.var2":
    "Ton signe astrologique t'apporte une belle intuition. Fais-lui confiance et laisse-toi guider par l’énergie positive qui t’entoure",
    "interpretation.daily.wisdom.var3":
      "Les astres t’accompagnent aujourd’hui. Laisse cette belle énergie t’aider à avancer sereinement.",
    "interpretation.daily.wisdom.var4":
      "En tant que {zodiacSign}, tu détiens les clés pour interpréter ce message céleste. Fais-en bon usage tout au long de la journée.",
    "interpretation.daily.wisdom.var5":
      "Ton caractère de {zodiacSign} résonne parfaitement avec ce conseil. Laisse cette harmonie cosmique éclairer ton chemin aujourd'hui.",
    "interpretation.daily.wisdom.var6":
      "Le ciel parle à travers ton signe zodiacal. Sois à l'écoute des signes et avance confiant.",
    "interpretation.daily.wisdom.var7":
      "En tant que {zodiacSign}, tu es aligné{genderSuffix} avec une énergie subtile aujourd'hui. Suis-la, elle te mènera là où tu dois être.",
    "interpretation.daily.wisdom.var8":
    "Ton signe {zodiacSign} te guide avec sagesse. Laisse ton cœur ouvert et ton esprit clair te montrer le chemin.",
    "interpretation.daily.wisdom.var9":
      "Tu portes en toi, une lumière unique. Que ce message t'aide à la faire rayonner pleinement et fièrement.",
    "interpretation.daily.wisdom.var10":
      "Ton énergie de {zodiacSign} est en résonance avec les vibrations du jour. Accueille ce conseil comme un guide bienveillant et inspirant.",

    // Horoscope daily sections
    "horoscope.greeting": `Salut {name} ! Voici ton horoscope du jour en tant que {zodiacSign} {zodiacSymbol}`,
    "horoscope.predictions.title": "Prévisions du jour :",
    "horoscope.mood.today": "Ton humeur aujourd'hui : {mood}",
    "horoscope.mood.energy":
      "Cette énergie va t'accompagner toute la journée. Profite-en pour faire les choses qui te font du bien !",
    "horoscope.assets.title": "Tes atouts du jour :",
    "horoscope.assets.luckyNumber": "• Chiffre porte-bonheur : {luckyNumber}",
    "horoscope.assets.luckyColor": "• Couleur porte-bonheur : {luckyColor}",
    "horoscope.compatibility":
      "Compatibilité : Tu t'entendras particulièrement bien avec les signes {compatibility} aujourd'hui. C'est le moment idéal pour renforcer tes relations !",
    "horoscope.message": `{genderText} {name}, en tant que {zodiacSign}, tu as cette belle énergie qui attire les bonnes choses. Fais confiance aux astres et à ton intuition aujourd\'hui !`,
    "horoscope.mood.title": "Humeur du jour",
    "horoscope.compatibility.title": "Compatibilité",
    "horoscope.advice.title": "Ton conseil personnel",

    // Zodiac signs names
    "zodiac.signs.aries": "Bélier",
    "zodiac.signs.taurus": "Taureau",
    "zodiac.signs.gemini": "Gémeaux",
    "zodiac.signs.cancer": "Cancer",
    "zodiac.signs.leo": "Lion",
    "zodiac.signs.virgo": "Vierge",
    "zodiac.signs.libra": "Balance",
    "zodiac.signs.scorpio": "Scorpion",
    "zodiac.signs.sagittarius": "Sagittaire",
    "zodiac.signs.capricorn": "Capricorne",
    "zodiac.signs.aquarius": "Verseau",
    "zodiac.signs.pisces": "Poissons",

    // Zodiac Signs
    "zodiac.aries": "Bélier",
    "zodiac.taurus": "Taureau",
    "zodiac.gemini": "Gémeaux",
    "zodiac.cancer": "Cancer",
    "zodiac.leo": "Lion",
    "zodiac.virgo": "Vierge",
    "zodiac.libra": "Balance",
    "zodiac.scorpio": "Scorpion",
    "zodiac.sagittarius": "Sagittaire",
    "zodiac.capricorn": "Capricorne",
    "zodiac.aquarius": "Verseau",
    "zodiac.pisces": "Poissons",

    // Card Names and Meanings - Runes
    "cards.runes.Fehu.name": "Fehu",
    "cards.runes.Fehu.meaning":"Richesse, prospérité, nouveau départ financier",
    "cards.runes.Uruz.name": "Uruz",
    "cards.runes.Uruz.meaning": "Force brute, santé, transformation",
    "cards.runes.Thurisaz.name": "Thurisaz",
    "cards.runes.Thurisaz.meaning": "Défense, protection, force destructrice",
    "cards.runes.Ansuz.name": "Ansuz",
    "cards.runes.Ansuz.meaning": "Communication divine, inspiration, sagesse",
    "cards.runes.Raidho.name": "Raidho",
    "cards.runes.Raidho.meaning": "Voyage, mouvement, progression",
    "cards.runes.Kenaz.name": "Kenaz",
    "cards.runes.Kenaz.meaning": "Connaissance, créativité, illumination",
    "cards.runes.Gebo.name": "Gebo",
    "cards.runes.Gebo.meaning": "Don, échange, partenariat",
    "cards.runes.Wunjo.name": "Wunjo",
    "cards.runes.Wunjo.meaning": "Joie, bonheur, harmonie",
    "cards.runes.Hagalaz.name": "Hagalaz",
    "cards.runes.Hagalaz.meaning": "Disruption, changement forcé, purification",
    "cards.runes.Nauthiz.name": "Nauthiz",
    "cards.runes.Nauthiz.meaning": "Nécessité, contrainte, leçon karmique",
    "cards.runes.Isa.name": "Isa",
    "cards.runes.Isa.meaning": "Glace, stagnation, patience",
    "cards.runes.Jera.name": "Jera",
    "cards.runes.Jera.meaning": "Récolte, cycles, récompense",
    "cards.runes.Eihwaz.name": "Eihwaz",
    "cards.runes.Eihwaz.meaning":
      "Endurance, protection, connexion spirituelle",
    "cards.runes.Perthro.name": "Perthro",
    "cards.runes.Perthro.meaning": "Mystère, destin, forces cachées",
    "cards.runes.Algiz.name": "Algiz",
    "cards.runes.Algiz.meaning": "Protection divine, connexion aux guides",
    "cards.runes.Sowilo.name": "Sowilo",
    "cards.runes.Sowilo.meaning": "Succès, victoire, énergie solaire",
    "cards.runes.Tiwaz.name": "Tiwaz",
    "cards.runes.Tiwaz.meaning": "Victoire, justice, sacrifice honorable",
    "cards.runes.Berkano.name": "Berkano",
    "cards.runes.Berkano.meaning": "Croissance, fertilité, nouveau cycle",
    "cards.runes.Ehwaz.name": "Ehwaz",
    "cards.runes.Ehwaz.meaning": "Mouvement, progrès, partenariat",
    "cards.runes.Mannaz.name": "Mannaz",
    "cards.runes.Mannaz.meaning": "Humanité, soi, intelligence",
    "cards.runes.Laguz.name": "Laguz",
    "cards.runes.Laguz.meaning": "Eau, intuition, émotions",
    "cards.runes.Ingwaz.name": "Ingwaz",
    "cards.runes.Ingwaz.meaning": "Fertilité masculine, énergie créatrice",
    "cards.runes.Dagaz.name": "Dagaz",
    "cards.runes.Dagaz.meaning": "Éveil, transformation, nouveau jour",
    "cards.runes.Othala.name": "Othala",
    "cards.runes.Othala.meaning": "Héritage, propriété, tradition familiale",

    // Card Names and Meanings - Daily
    "cards.daily.NouveauDepart.name": "Nouveau Départ",
    "cards.daily.NouveauDepart.meaning":
      "Aujourd’hui marque la fin d’un cycle important et l’ouverture d’une toute nouvelle page dans votre vie. C’est un moment privilégié pour oser franchir les barrières qui vous retenaient jusqu’à présent, que ce soit dans un domaine personnel, professionnel ou sentimental. L’univers vous envoie un message d’encouragement : avancez sans peur, faites confiance à votre intuition et soyez réceptif{genderSuffix} aux opportunités qui se présentent. Chaque petit pas posé aujourd’hui, même s’il paraît modeste, construit la fondation d’un avenir plus riche, plus serein et profondément épanouissant. Ce renouveau vous invite à lâcher le passé, à vous renouveler et à embrasser pleinement les changements qui vous mèneront vers votre mieux-être.",
    "cards.daily.Patience.name": "Patience",
    "cards.daily.Patience.meaning":
      "Ce tirage vous rappelle que certaines choses prennent du temps pour se manifester. Ne vous découragez pas si les résultats tardent à venir : la patience est votre plus grand atout aujourd’hui. Prenez le temps d’observer, de respirer profondément et d’accepter le rythme naturel des événements. La tranquillité intérieure que vous cultiverez vous permettra de rester serein{genderSuffix} face aux défis, et sera la clé pour attirer la réussite et les bonnes opportunités au moment parfait. Rappelez-vous que tout vient en son temps, et que la persévérance finit toujours par payer.",
    "cards.daily.Creativite.name": "Créativité",
    "cards.daily.Creativite.meaning":
      "Votre esprit est particulièrement fertile aujourd’hui. Laissez vos idées jaillir librement, même les plus inattendues, car elles pourraient se transformer en solutions brillantes ou en projets porteurs d’avenir. La créativité n’est pas seulement artistique : elle éclaire aussi vos choix, vos relations et vos défis. Écoutez vos inspirations profondes et osez les concrétiser avec confiance. En libérant cette énergie créative, vous ouvrez la porte à des opportunités inédites qui nourriront votre épanouissement personnel et professionnel. N’hésitez pas à expérimenter et à suivre votre intuition, car votre originalité est votre plus grande force aujourd’hui.",
    "cards.daily.Amour.name": "Amour",
    "cards.daily.Amour.meaning":
      "L’énergie d’aujourd’hui est tournée vers le cœur. Exprimez votre tendresse et votre gratitude envers vos proches, car un simple geste peut avoir un grand impact. Si vous êtes en couple, renforcez vos liens par des attentions sincères et authentiques qui nourrissent votre relation. Si vous êtes célibataire, ouvrez-vous à la possibilité de nouvelles rencontres : l’amour pourrait se manifester là où vous ne l’attendiez pas. Soyez à l’écoute de vos émotions et laissez votre cœur guider vos actions. Cette journée favorise les échanges affectueux et les moments de complicité, essentiels à votre équilibre émotionnel.",
    "cards.daily.Courage.name": "Courage",
    "cards.daily.Courage.meaning":
      "Des défis peuvent se présenter aujourd’hui, mais vous possédez la force et la résilience nécessaires pour les surmonter. Le courage ne signifie pas l’absence de peur, mais la capacité à agir malgré elle. En affrontant vos obstacles avec détermination, vous gagnerez en confiance et en maturité. Chaque pas courageux que vous ferez renforcera votre chemin et affirmera votre valeur, apportant une croissance personnelle profonde.",
    "cards.daily.Intuition.name": "Intuition",
    "cards.daily.Intuition.meaning":
      "Votre voix intérieure est particulièrement forte aujourd’hui. Faites confiance à vos pressentiments, même si vous ne pouvez pas toujours les expliquer rationnellement. Ils vous guideront vers des choix plus alignés avec vos véritables besoins et votre chemin de vie. Prenez un moment de silence pour écouter vos ressentis, car votre intuition détient la réponse aux questions que vous vous posez en ce moment, et elle vous soutiendra dans vos décisions importantes.",
    "cards.daily.Gratitude.name": "Gratitude",
    "cards.daily.Gratitude.meaning":
      "Prends un moment pour apprécier profondément ce que tu as déjà. Reconnaître tes bénédictions, même les plus petites, attire encore plus de positif dans ta vie et ouvre la porte à de nouvelles opportunités. Cultiver la gratitude aujourd’hui t’aidera à ressentir plus de paix intérieure et à renforcer tes liens avec les autres.",
    "cards.daily.Communication.name": "Communication",
    "cards.daily.Communication.meaning":
      "Exprime-toi avec clarté et bienveillance aujourd’hui. Tes paroles ont le pouvoir d’apaiser les tensions, d’inspirer ceux qui t’entourent et de renforcer les liens importants dans ta vie. Une communication sincère et respectueuse ouvre la voie à une meilleure compréhension mutuelle et à des échanges profondément enrichissants.",
    "cards.daily.Equilibre.name": "Équilibre",
    "cards.daily.Equilibre.meaning":
      "Aujourd’hui, trouvez l’équilibre entre ce que vous donnez aux autres et ce dont vous avez besoin pour vous-même. Il est important de ne pas vous oublier au nom de vos responsabilités. Prendre soin de vous, c’est aussi prendre soin de votre énergie et de votre bien-être intérieur. En cultivant cette harmonie, vous avancerez plus aligné{genderSuffix} et plus serein{genderSuffix} sur votre chemin.",
    "cards.daily.Confiance.name": "Confiance",
    "cards.daily.Confiance.meaning":
      "Aujourd’hui, croyez pleinement en vos capacités et avancez avec une énergie assurée. La confiance en vous est une force intérieure précieuse qui vous rend plus fort{genderSuffix}, plus clair{genderSuffix} dans vos choix, et plus aligné{genderSuffix} avec votre vérité. Même si le doute surgit, souvenez-vous que chaque pas fait avec foi vous rapproche de vos véritables réussites.",
    "cards.daily.Lacher-prise.name": "Lâcher-prise",
    "cards.daily.Lacher-prise.meaning":
      "Aujourd’hui, libérez-vous des poids du passé et des préoccupations qui n’ont plus lieu d’être. Ce que vous ne pouvez pas contrôler ne mérite pas de drainer votre énergie. En acceptant de lâcher prise, vous ouvrez la voie à plus de paix intérieure et de clarté. Vous vous sentirez plus léger{genderSuffix}, plus centré{genderSuffix}, et prêt{genderSuffix} à accueillir ce qui vient avec confiance.",
    "cards.daily.Joie.name": "Joie",
    "cards.daily.Joie.meaning":
      "Aujourd’hui, ouvrez votre cœur à la joie simple des petits instants : un sourire, un geste sincère, une pensée lumineuse. Même au milieu des obligations, cette énergie positive peut transformer votre état d’esprit. En cultivant la joie, vous devenez plus rayonnant{genderSuffix}, plus présent{genderSuffix}, et vous attirez naturellement des expériences qui nourrissent votre bien-être.",
    "cards.daily.Sagesse.name": "Sagesse",
    "cards.daily.Sagesse.meaning":
      "Aujourd’hui, ralentissez et accordez-vous un moment de recul avant d’agir. Votre sagesse intérieure est une alliée précieuse : elle vous guide, vous protège et vous éclaire dans vos choix. En vous connectant à cette voix calme et lucide, vous deviendrez plus ancré{genderSuffix}, plus clair{genderSuffix} dans vos décisions, et capable de voir au-delà des apparences.",
    "cards.daily.Transformation.name": "Transformation",
    "cards.daily.Transformation.meaning":
      "Aujourd’hui, accueillez les changements qui se présentent à vous, même s’ils semblent déstabilisants au premier abord. Ces transformations ne sont pas là par hasard : elles vous poussent à grandir, à évoluer et à vous rapprocher de la meilleure version de vous-même. En embrassant ce mouvement, vous deviendrez plus aligné{genderSuffix}, plus confiant{genderSuffix}, et prêt{genderSuffix} à franchir une nouvelle étape.",
    "cards.daily.Abondance.name": "Abondance",
    "cards.daily.Abondance.meaning":
      "Rappelle-toi que tu possèdes déjà toutes les ressources nécessaires pour réussir. L’abondance se manifeste véritablement lorsque tu crois pleinement en ton potentiel et que tu t’ouvres aux opportunités qui se présentent. Sois confiant{genderSuffix} en tes capacités, car tu as en toi la force d’attirer tout ce dont tu as besoin pour prospérer aujourd’hui et demain.",
    "cards.daily.Paix.name": "Paix",
    "cards.daily.Paix.meaning":
      "Cultive la paix intérieure en libérant les tensions et les conflits qui t’entourent. La sérénité que tu trouveras t’apportera la clarté d’esprit et l’harmonie nécessaires pour avancer serein{genderSuffix} aujourd’hui.",
    "cards.daily.Force.name": "Force",
    "cards.daily.Force.meaning":
      "Puise au plus profond de ta force intérieure, elle est bien plus grande que tu ne l'imagines. Elle te soutient dans les défis, t'apporte courage et résilience, et t'aide à avancer avec confiance malgré les obstacles.",
    "cards.daily.Pardon.name": "Pardon",
    "cards.daily.Pardon.meaning":
      "Offre le pardon, à toi-même comme aux autres. Ce geste puissant libère ton cœur des poids du passé et ouvre la voie à une véritable guérison intérieure, te permettant d'avancer plus léger{genderSuffix} et apaisé{genderSuffix}.",
    "cards.daily.Espoir.name": "Espoir",
    "cards.daily.Espoir.meaning":
      "Garde espoir, même dans les moments difficiles. La lumière finit toujours par revenir, tout comme le soleil après la nuit la plus sombre. Ce message t'invite à cultiver la patience et la confiance en un avenir meilleur, car chaque épreuve prépare un renouveau prometteur pour toi, qui grandira et s'épanouira à son heure.",
    "cards.daily.Action.name": "Action",
    "cards.daily.Action.meaning":
      "Le moment est venu de passer à l’action. Ne laisse plus tes projets en attente, c’est aujourd’hui que les choses avancent. Ose franchir le pas avec confiance{genderSuffix}, car chaque initiative que tu prendras te rapprochera de tes objectifs et ouvrira de nouvelles portes dans ta vie.",
    "cards.daily.Compassion.name": "Compassion",
    "cards.daily.Compassion.meaning":
      "Fais preuve de compassion envers toi-même et envers les autres. La bienveillance adoucit les cœurs et renforce les liens. En cultivant cette douceur, tu crées un espace de guérison et de compréhension, essentiel pour toi comme pour ceux qui t’entourent. Ce tirage t’invite à ouvrir ton cœur pleinement aujourd’hui, à écouter sans juger et à offrir ton soutien avec empathie. En agissant ainsi, tu contribues à un climat harmonieux et tu fais grandir ta propre paix intérieure.",
    "cards.daily.Inspiration.name": "Inspiration",
    "cards.daily.Inspiration.meaning":
      "Ouvre grand les yeux et ton esprit à tout ce qui t’entoure. L’inspiration se cache dans les détails du quotidien, prête à nourrir ta créativité et à éveiller de nouvelles idées. Ce message t’encourage à rester curieux{genderSuffix} et réceptif{genderSuffix}, à accueillir les signes et les étincelles qui peuvent illuminer ton chemin. Prends le temps d’écouter ces impulsions, elles te guideront vers des solutions innovantes et des moments de joie renouvelée.",
    "cards.daily.Determination.name": "Détermination",
    "cards.daily.Determination.meaning":
      "Ta persévérance et ta volonté sont tes meilleurs alliés aujourd’hui. Même si des obstacles se dressent sur ton chemin, continue d’avancer avec confiance et détermination. Ta ténacité te permettra de surmonter les difficultés et t’ouvrira la voie vers le succès durable. Ce message t’invite à ne pas baisser les bras, car chaque effort compte et te rapproche de tes objectifs les plus chers.",
    "cards.daily.Aventure.name": "Aventure",
    "cards.daily.Aventure.meaning":
      "Sors de ta routine et ose découvrir de nouvelles expériences aujourd’hui. Qu’elle soit grande ou petite, cette aventure nourrira ton esprit et réchauffera ton cœur. Prends ce temps pour explorer, t’émerveiller et te laisser surprendre. Ce message t’encourage à ouvrir ton horizon et à accueillir le changement avec enthousiasme.",
    "cards.daily.Reconciliation.name": "Réconciliation",
    "cards.daily.Reconciliation.meaning":
      "Il est temps de guérir tes blessures intérieures et de faire la paix avec ton passé. La réconciliation t’apporte liberté et légèreté, te permettant d’avancer plus sereinement sur ton chemin. Accueille ce processus avec bienveillance et laisse-toi transformer par cette guérison intérieure.",
    "cards.daily.Innovation.name": "Innovation",
    "cards.daily.Innovation.meaning":
      "Aujourd’hui, laisse tes idées originales prendre vie. Ta capacité à penser différemment est une vraie richesse qui peut transformer tes projets et inspirer ton entourage. N’hésite pas à sortir des sentiers battus et à oser exprimer ta créativité unique pour ouvrir de nouvelles voies.",
    "cards.daily.Connexion.name": "Connexion",
    "cards.daily.Connexion.meaning":
      "Renforce tes liens avec les autres, mais aussi avec toi-même. Les connexions authentiques nourrissent ton âme, apportent soutien et réconfort, et te rappellent que tu n’es jamais seul{genderSuffix}. Prends le temps d’écouter et de partager sincèrement, cela t’apportera équilibre et épanouissement.",
    "cards.daily.Prosperite.name": "Prospérité",
    "cards.daily.Prosperite.meaning":
      "La prospérité arrive dans ta vie sous différentes formes : matérielles, émotionnelles ou spirituelles. Accueille cette abondance avec gratitude et confiance. Sois ouvert{genderSuffix} à recevoir et à partager ce que la vie t’offre aujourd’hui pour renforcer ta richesse intérieure et extérieure.",
    "cards.daily.Authenticite.name": "Authenticité",
    "cards.daily.Authenticite.meaning":
      "Reste fidèle à tes valeurs et à ta véritable nature. Ton authenticité attire les bonnes personnes et t’oriente vers des choix en harmonie avec ton cœur. N’aie pas peur de montrer qui tu es vraiment, car c’est dans cette sincérité que tu trouveras ta force et ta paix intérieure.",
    "cards.daily.Revelation.name": "Révélation",
    "cards.daily.Revelation.meaning":
      "Une vérité cachée ou une prise de conscience importante va bientôt se manifester. Reste attentif et garde l’esprit ouvert pour accueillir cette révélation. Sois prêt à recevoir ce nouvel éclairage, car il pourra transformer ta vision et t’aider à avancer avec plus de clarté.",
    "cards.daily.Protection.name": "Protection",
    "cards.daily.Protection.meaning":
      "Tu es entouré{genderSuffix} de bienveillance et de forces protectrices qui veillent sur toi. Fais confiance à cette protection, elle t’accompagne dans tes choix et tes pas. N’aie rien à craindre aujourd’hui, laisse cette énergie rassurante t’apaiser et te guider.",
    "cards.daily.Renaissance.name": "Renaissance",
    "cards.daily.Renaissance.meaning":
      "Un nouveau cycle s’ouvre devant toi, t’invitant à te libérer de tout ce qui appartient au passé. Accueille cette renaissance comme une opportunité précieuse de te réinventer, de grandir et de te renouveler. Ose tourner la page pour embrasser pleinement ce nouveau départ.",
    "cards.daily.Clarte.name": "Clarté",
    "cards.daily.Clarte.meaning":
      "Les réponses que tu cherches vont bientôt se révéler. Prends du recul, observe attentivement les signes qui t’entourent et laisse le brouillard se dissiper progressivement. Cette clarté nouvelle t’aidera à prendre des décisions éclairées et alignées avec ta vérité intérieure. Conseil : prends un moment calme aujourd’hui pour réfléchir posément avant d’agir, cela te permettra de voir la situation sous un angle plus clair.",
    "cards.daily.Passion.name": "Passion",
    "cards.daily.Passion.meaning":
      "Suis ce qui te passionne vraiment, car ton enthousiasme est une énergie puissante qui peut transformer ta vie. Nourris cette flamme intérieure, donne-lui de l’espace pour grandir et laisse-la guider tes choix vers ce qui te rend vivant{genderSuffix}. Conseil : consacre du temps à ce qui t’allume le cœur aujourd’hui, même dans les petites actions, cela renforcera ta motivation et ta joie de vivre.",
    "cards.daily.Equite.name": "Équité",
    "cards.daily.Equite.meaning":
      "La justice et l’équilibre vont bientôt se rétablir dans tes affaires. Reste intègre et patient{genderSuffix} : tes actions justes porteront leurs fruits et ramèneront l’harmonie autour de toi. Conseil : garde la tête froide face aux défis, et continue d’agir avec honnêteté et respect, même si les résultats tardent à venir.",
    "cards.daily.Harmonie.name": "Harmonie",
    "cards.daily.Harmonie.meaning":
      "Tous les éléments de ta vie tendent à s’aligner aujourd’hui. Profite de cette période pour consolider ce qui fonctionne bien et pour instaurer des routines qui nourrissent ton bien-être physique, mental et émotionnel. Conseil : prends le temps de t’écouter et d’équilibrer tes différentes sphères de vie pour maintenir cette belle harmonie sur le long terme.",
    "cards.daily.Eveil.name": "Éveil",
    "cards.daily.Eveil.meaning":
      "Ta conscience s’élargit aujourd’hui, ouvrant la porte à de nouvelles perspectives et à une meilleure compréhension de toi-même et du monde qui t’entoure. Accueille ces prises de conscience avec ouverture et curiosité : elles peuvent transformer ton regard sur la vie et guider tes prochains pas vers une voie plus authentique. Conseil : prends le temps de réfléchir à ce que ces nouvelles révélations signifient pour toi, et ose agir en accord avec cette nouvelle clarté.",
    "cards.daily.Generosite.name": "Générosité",
    "cards.daily.Generosite.meaning":
      "Donne sans compter aujourd’hui, non par devoir, mais par cœur. Ce geste sincère et désintéressé créera un cercle de réciprocité autour de toi et attirera des expériences bienfaisantes qui enrichiront ta vie. Conseil : sois attentif{genderSuffix} aux besoins des autres, tout en veillant à ne pas t’oublier toi-même dans cet élan généreux.",
    "cards.daily.Perseverance.name": "Persévérance",
    "cards.daily.Perseverance.meaning":
      "N’abandonne pas maintenant : ta détermination est sur le point de porter ses fruits. Continue avec constance et discipline, la victoire est plus proche que tu ne le penses. Conseil : garde le cap même si le chemin semble long, chaque effort te rapproche de ton but.",
    "cards.daily.Simplicite.name": "Simplicité",
    "cards.daily.Simplicite.meaning":
      "La solution est souvent plus simple que ce que l’on imagine. Va à l’essentiel, élimine le superflu, et tu trouveras des réponses claires et efficaces. Conseil : simplifie ta vie aujourd’hui pour mieux te concentrer sur ce qui compte vraiment.",
    "cards.daily.Legerete.name": "Légèreté",
    "cards.daily.Legerete.meaning":
      "Adopte une attitude légère aujourd’hui : ris, joue, et déleste-toi des poids inutiles. Cette légèreté t’ouvrira au plaisir et à la créativité. Conseil : permets-toi de t’amuser et de prendre du recul pour mieux avancer.",
    "cards.daily.Ancrage.name": "Ancrage",
    "cards.daily.Ancrage.meaning":
      "Reviens à tes racines pour trouver stabilité et force. Des pratiques simples comme la respiration, la marche ou des routines régulières t’aideront à te recentrer et à avancer plus sereinement. Conseil : prends le temps de te connecter à toi-même et au moment présent.",
    "cards.daily.Mystere.name": "Mystère",
    "cards.daily.Mystere.meaning":
      "Accepte ce que tu ne peux pas encore comprendre. Le mystère fait partie de la magie de la vie : en laissant de l’espace à l’inconnu, tu ouvres la porte à des révélations qui se dévoileront au bon moment. Conseil : fais confiance au temps et reste ouvert{genderSuffix} aux surprises que l’univers t’envoie.",
    "cards.daily.Celebration.name": "Célébration",
    "cards.daily.Celebration.meaning":
      "C’est le moment de célébrer tes succès, même les plus petits. Reconnaître tes accomplissements nourrit ta confiance en toi et attire encore plus de raisons de te réjouir. Conseil : prends le temps de te féliciter et partage ta joie avec ceux qui t’entourent.",
    "cards.daily.Guidance.name": "Guidance",
    "cards.daily.Guidance.meaning":
      "Aujourd’hui, une aide inattendue ou un signe discret peut se manifester sur ton chemin. Reste attentif{genderSuffix} aux petites synchronicités qui croisent ta route, car elles portent un message important. Ces signes t’orienteront vers des choix plus éclairés et bénéfiques. Accueille ces indications avec confiance, elles ouvrent une porte vers une direction nouvelle et favorable.",
    "cards.daily.Purification.name": "Purification",
    "cards.daily.Purification.meaning":
      "C’est le moment idéal pour faire le tri autour de toi et en toi. En débarrassant ton espace et ton esprit du superflu, tu invites un souffle de renouveau. Cette purification crée un environnement propice aux transformations positives, libérant ton énergie pour accueillir de nouvelles opportunités avec clarté et légèreté.",
    "cards.daily.Vision.name": "Vision",
    "cards.daily.Vision.meaning":
      "Ta vision du futur se clarifie aujourd'hui. Identifie la direction qui t’attire et avance avec confiance vers cet horizon nouvellement révélé. Garde l’esprit ouvert aux possibilités qui s’offrent à toi et laisse-toi guider par cette clarté intérieure vers tes objectifs les plus authentiques.",

    // Card Names and Meanings - Tarot
    "cards.tarot.LeFou.name": "Le Fou",
    "cards.tarot.LeFou.meaning": "Nouveaux départs, spontanéité, liberté",
    "cards.tarot.LeFou.meaning.var1":
      "Le Mat représente un nouveau départ dans ta vie. C'est le moment de faire confiance à ton instinct et de te lancer dans l'inconnu sans avoir toutes les réponses. Cette carte t'invite à sortir de ta zone de confort. Concrètement, cela peut signifier postuler pour un emploi qui te fait un peu peur, engager une conversation importante que tu reportes, ou commencer ce projet que tu planifies depuis des mois. Le Mat te dit: n'attends pas d'être totalement prêt, car ce moment n'arrivera jamais. Lance-toi maintenant. Attention toutefois à ne pas confondre spontanéité et imprudence. Renseigne-toi un minimum, mais ne laisse pas la peur te paralyser.",
    "cards.tarot.LeFou.meaning.var2":
      "Cette carte annonce un vent de fraîcheur et de nouveauté dans ton existence. Tu es à un tournant où l'innocence et la curiosité peuvent être tes meilleures alliées. Le Mat t'encourage à adopter un regard neuf sur ta situation, comme si tu la découvrais pour la première fois. Dans ton quotidien, demande-toi où tu te sens coincé par des habitudes ou des peurs. C'est là que l'énergie du Mat peut opérer. Peut-être que tu dois oser une approche différente dans tes relations, tenter une nouvelle méthode au travail, ou simplement accepter de ne pas tout contrôler. Fais ce premier pas avec légèreté. Le piège serait de te lancer sans aucune préparation: sois spontané mais pas naïf.",
    "cards.tarot.LeFou.meaning.var3":
      "Le Mat t'apporte un message de liberté et de renouveau. C'est le commencement d'un cycle où tu peux te réinventer. Cette carte te demande d'avoir le courage de l'innocence, cette capacité à croire que les choses sont possibles malgré les obstacles apparents. Sur le plan pratique, identifie ce qui te retient actuellement. Est-ce la peur du jugement? La crainte de l'échec? Le Mat te conseille d'avancer malgré ces doutes. Commence petit si nécessaire: un appel téléphonique, une inscription, une conversation. L'important est de bouger. Reste toutefois vigilant: l'optimisme du Mat ne doit pas te faire ignorer les signaux d'alerte réels. Écoute aussi ta prudence.",
    "cards.tarot.LeBateleur.name": "Le Bateleur",
    "cards.tarot.LeBateleur.meaning":
      "Créativité, communication, nouveau projet",
    "cards.tarot.LeBateleur.meaning.var1":
      "Le Bateleur t’apporte un vent de nouveauté et d’enthousiasme. Tu es à l’aube d’un nouveau départ, porteur de promesses et d’élans créatifs. Toutes les ressources sont déjà en toi : confiance, idées, énergie. Cette carte t’invite à oser, à agir, même si le chemin n’est pas encore totalement clair. C’est le moment idéal pour lancer un projet, exprimer une idée ou simplement croire en ta capacité de transformer le potentiel en réalité. En amour ou au travail, cette impulsion peut tout changer.",
    "cards.tarot.LeBateleur.meaning.var2":
      "Le Bateleur marque le début d’une aventure personnelle ou professionnelle. Tu prends conscience de ton pouvoir d’agir et de choisir. Cette carte symbolise la jeunesse d’esprit, la créativité et l’envie de construire sur des bases solides. Si tu traverses une période d’hésitation, Le Bateleur te rappelle que le premier pas est souvent le plus important. Une rencontre inspirante, une opportunité inattendue ou une idée fulgurante pourrait bien te montrer la voie. Reste ouvert et curieux.",
    "cards.tarot.LeBateleur.meaning.var3":
      "Le Bateleur est le symbole d’un renouveau audacieux. Il t’encourage à te connecter à ton énergie vitale pour passer à l’action avec confiance. Ce que tu entreprends maintenant a le potentiel de durer, à condition d’y mettre ta volonté et ton cœur. Cette carte apparaît souvent quand on est prêt à reprendre les rênes de sa vie. Une prise de conscience t’offre une chance de réaligner tes choix avec tes valeurs profondes. Le moment est venu de bâtir avec lucidité et enthousiasme.",
    "cards.tarot.LaPapesse.name": "La Papesse",
    "cards.tarot.LaPapesse.meaning": "Intuition, mystère, connaissance cachée",
    "cards.tarot.LaPapesse.meaning.var1":
      "La Papesse t’invite à ralentir et à écouter. Une transformation discrète mais profonde est en cours. Elle te rappelle que les réponses ne sont pas à l’extérieur, mais en toi. Grâce à ton intuition, tu avances vers un changement juste et aligné. C’est le moment d’observer, de réfléchir, de te reconnecter à ce que tu ressens vraiment. L’action viendra plus tard — pour l’instant, laisse la sagesse intérieure te guider.",
    "cards.tarot.LaPapesse.meaning.var2":
      "La Papesse apparaît lorsque tu es prêt{genderSuffix} à comprendre des vérités plus profondes. Elle parle de maturation intérieure, d’un chemin qui se dessine dans le silence et l’introspection. Tes décisions ne seront pas prises à la légère — elles viendront d’un lieu de clarté et d’alignement. Cette carte peut aussi signaler la naissance d’un lien de confiance, ou le renforcement d’une relation déjà présente. Tu avances avec justesse, protégé par une force douce et ancienne.",
    "cards.tarot.LaPapesse.meaning.var3":
      "La Papesse est la gardienne des mystères et du savoir caché. Elle t’encourage à faire confiance à ce que tu pressens, même si cela défie la logique. En ce moment, tu n’as pas besoin d’agir, mais de comprendre, de ressentir, de te recentrer. Tes choix futurs seront d’autant plus puissants qu’ils seront enracinés dans ta vérité intérieure. La Papesse t’invite à plonger dans tes profondeurs pour mieux renaître, avec lucidité et sagesse.",
    "cards.tarot.LImperatrice.name": "L'Impératrice",
    "cards.tarot.LImperatrice.meaning":
      "Fertilité, abondance, créativité féminine",
    "cards.tarot.LImperatrice.meaning.var1":
      "L’Impératrice t’invite à reprendre confiance en ta capacité de créer, de comprendre et de guider avec intelligence. Elle symbolise une féminité active, lucide et généreuse. Tu es prêt{genderSuffix} à faire naître quelque chose de concret : une idée, un projet, une relation. Grâce à ton sens de l’analyse et à ton intuition aiguisée, tu peux poser les bases solides d’un avenir florissant. C’est le moment d’agir avec équilibre : en conscience, sans précipitation, mais avec détermination.",
    "cards.tarot.LImperatrice.meaning.var2":
      "L’Impératrice te reconnecte à ta puissance créatrice. Son énergie te pousse à structurer tes idées et à les transformer en réalité. Elle parle de lucidité, d’autonomie et de beauté dans l’action. Tu n’agis pas dans le chaos : tu bâtis avec intelligence, en t’appuyant sur ton expérience. Ce que tu conçois maintenant a le potentiel de grandir et de t’épanouir pleinement. C’est une invitation à assumer ton autorité naturel{genderSuffix}, sans arrogance, mais avec assurance.",
    "cards.tarot.LImperatrice.meaning.var3":
      "L’Impératrice veille avec sagesse sur ton évolution. Elle te rappelle que la vraie force réside dans la clarté d’esprit et la maîtrise de soi. Ton pouvoir réside dans ta capacité à prendre des décisions éclairées, à faire preuve de discernement et à t’affirmer sans dominer. Cet arcane t’encourage à exprimer ton intelligence, à nourrir ta créativité, et à guider les autres sans te perdre. L’avenir s’écrit avec conscience. Tu as les clés en main.",
    "cards.tarot.LEmpereur.name": "L'Empereur",
    "cards.tarot.LEmpereur.meaning": "Autorité, structure, leadership",
    "cards.tarot.LEmpereur.meaning.var1":
      "L’Empereur t’apporte autorité, structure et leadership. Tu es prêt{genderSuffix} à prendre le contrôle et à bâtir une base stable. Cette carte t’encourage à agir avec confiance et responsabilité. Tes décisions auront un impact durable, alors mène avec sagesse et force.",
    "cards.tarot.LEmpereur.meaning.var2":
      "Avec l’Empereur, l’ordre et la discipline guident ton chemin. Tu as la capacité d’organiser ton environnement et d’affirmer ton pouvoir avec sagesse. Fais un pas en avant et assume ton rôle de leader. La structure et la clarté ouvriront des portes vers de nouvelles opportunités.",
    "cards.tarot.LEmpereur.meaning.var3":
      "L’Empereur symbolise une présence solide et fiable. Tu es prêt{genderSuffix} à offrir guidance et soutien à ceux qui t’entourent. Utilise ton expérience et ton autorité pour créer stabilité et croissance. Trouve l’équilibre entre fermeté et justice pour obtenir les meilleurs résultats.",
    "cards.tarot.LePape.name": "Le Pape",
    "cards.tarot.LePape.meaning":
      "Sagesse traditionnelle, guidance spirituelle",
    "cards.tarot.LePape.meaning.var1":
      "Le Pape t’invite à te connecter à ta sagesse intérieure et à rechercher des réponses dans la tradition et l’expérience. Tu es prêt{genderSuffix} à guider ou à être guidé{genderSuffix} avec bienveillance. Cette carte parle de transmission, de conseil avisé, et d’une avancée ancrée dans des valeurs profondes. Une décision importante peut se présenter : fonder ton choix sur ce qui est juste, et non sur l’impulsivité.",
    "cards.tarot.LePape.meaning.var2":
      "Le Pape représente un appui solide dans une période où tu recherches stabilité et vérité. Il t’encourage à écouter les enseignements du passé pour mieux comprendre le présent. Tu es prêt{genderSuffix} à transmettre ou à recevoir un savoir essentiel. Cette carte peut aussi indiquer la présence d’un mentor ou d’une figure spirituelle qui t’aide à avancer.",
    "cards.tarot.LePape.meaning.var3":
      "Symbole de sagesse et de tradition, Le Pape t’amène à prendre du recul pour réfléchir avec justesse. Tu es dans une phase où l’intuition et la raison doivent travailler ensemble. Tu es prêt{genderSuffix} à incarner tes valeurs, à faire preuve de patience et à consolider des bases durables. C’est le moment de faire confiance aux processus lents mais puissants de la maturation.",
    "cards.tarot.LAmoureux.name": "L'Amoureux",
    "cards.tarot.LAmoureux.meaning": "Choix, relations, harmonie",
    "cards.tarot.LAmoureux.meaning.var1":
      "L’Amoureux t’invite à faire un choix important, souvent lié aux sentiments, aux relations ou à tes valeurs profondes. Tu es prêt{genderSuffix} à suivre ce qui résonne en toi, même si le chemin n’est pas encore totalement clair. Cette carte t’encourage à écouter ton cœur, à équilibrer passion et raison, et à t’engager en conscience. L’harmonie viendra en assumant pleinement ta décision.",
    "cards.tarot.LAmoureux.meaning.var2":
      "L’Amoureux symbolise une période de connexion profonde, avec toi-même ou avec une autre personne. Tu es dans une dynamique où les émotions prennent de la place et demandent à être clarifiées. Tu es prêt{genderSuffix} à ouvrir ton cœur et à vivre une relation sincère, ou à faire la paix avec une partie de toi-même. Cette carte t’invite à cultiver la cohérence entre tes désirs et tes actions.",
    "cards.tarot.LAmoureux.meaning.var3":
      "Face à une décision délicate, L’Amoureux te rappelle que l’amour, sous toutes ses formes, demande du courage. Tu es prêt{genderSuffix} à choisir en fonction de ce qui te nourrit vraiment. Il ne s’agit pas de plaire aux autres, mais de rester fidèle à ce qui fait vibrer ton âme. L’alignement personnel est la clé d’une véritable harmonie.",
    "cards.tarot.LeChariot.name": "Le Chariot",
    "cards.tarot.LeChariot.meaning": "Victoire, maîtrise de soi, progression",
    "cards.tarot.LeChariot.meaning.var1":
      "Le Chariot t’encourage à prendre les rênes de ta vie avec détermination. Tu es prêt{genderSuffix} à avancer, à dépasser les obstacles et à affirmer ta volonté. Cette carte symbolise la victoire par la maîtrise de soi, la clarté des objectifs et le courage d’aller de l’avant. Rien ne peut t’arrêter si tu restes concentré{genderSuffix} sur ta direction.",
    "cards.tarot.LeChariot.meaning.var2":
      "Le Chariot annonce une progression rapide et contrôlée. Tu es dans une dynamique de mouvement, de conquête et d’ambition saine. Tu es prêt{genderSuffix} à diriger avec assurance, sans perdre ton équilibre intérieur. Cette carte t’invite à canaliser tes forces opposées, à rester centré{genderSuffix}, et à avancer avec confiance vers ce que tu veux vraiment.",
    "cards.tarot.LeChariot.meaning.var3":
      "Avec Le Chariot, tu entres dans une phase de réussite active. Tu es prêt{genderSuffix} à agir, à relever des défis et à sortir victorieux{genderSuffix} grâce à ta discipline et à ton esprit de décision. C’est une carte de triomphe sur les doutes et les hésitations. Avance avec foi en toi-même, le chemin s’ouvre devant toi.",
    "cards.tarot.LaJustice.name": "La Justice",
    "cards.tarot.LaJustice.meaning": "Équilibre, vérité, conséquences",
    "cards.tarot.LaJustice.meaning.var1":
      "La Justice t’appelle à faire preuve de discernement. Tu es prêt{genderSuffix} à regarder les choses avec lucidité, à faire face aux conséquences de tes actes et à poser des choix justes. Cette carte te pousse à rechercher l’équilibre intérieur et à agir en cohérence avec tes valeurs. La vérité est une alliée puissante : en l’embrassant, tu gagnes en clarté et en force.",
    "cards.tarot.LaJustice.meaning.var2":
      "Avec La Justice, tu entres dans une période de régulation, de prise de responsabilités et de réajustement. Tu es prêt{genderSuffix} à prendre des décisions éclairées, même si elles demandent courage et impartialité. Cette carte indique que l’heure est venue de mettre de l’ordre, de réparer ce qui doit l’être, ou de trancher avec équité. Tu avances vers plus de maturité.",
    "cards.tarot.LaJustice.meaning.var3":
      "La Justice te guide vers l’honnêteté et l’équité. Elle t’invite à observer ta situation sans illusion et à faire confiance à ton jugement intérieur. Tu es prêt{genderSuffix} à rétablir un équilibre rompu, à dire ce qui doit être dit et à agir en adulte responsable. Cette carte t’encourage à faire le tri entre ce qui est juste pour toi et ce qui ne l’est plus.",
    "cards.tarot.LHermite.name": "L'Hermite",
    "cards.tarot.LHermite.meaning":
      "Introspection, sagesse intérieure, guidance",
    "cards.tarot.LHermite.meaning.var1":
      "L’Hermite t’invite à un voyage intérieur profond. Tu es prêt{genderSuffix} à te retirer du tumulte extérieur pour chercher la vérité en toi. Cette période de solitude choisie te permet de puiser dans ta sagesse et de mieux comprendre ton chemin.",
    "cards.tarot.LHermite.meaning.var2":
      "Avec L’Hermite, tu entres dans une phase de réflexion et de guidance intérieure. Tu es prêt{genderSuffix} à écouter ta voix intérieure, même si elle te mène sur des chemins moins fréquentés. Cette carte t’encourage à faire preuve de patience et de discernement.",
    "cards.tarot.LHermite.meaning.var3":
      "L’Hermite te guide vers l’introspection et la lumière intérieure. Tu es prêt{genderSuffix} à te détacher des influences extérieures pour mieux entendre ta sagesse profonde. Cette carte te pousse à avancer avec prudence, mais avec une certitude intérieure renforcée.",
    "cards.tarot.LaRouedeFortune.name": "La Roue de Fortune",
    "cards.tarot.LaRouedeFortune.meaning": "Changement, cycles, destinée",
    "cards.tarot.LaRouedeFortune.meaning.var1":
      "La Roue de Fortune t’invite à accepter le changement comme une force naturelle. Tu es prêt{genderSuffix} à suivre les cycles de la vie, même quand ils te mènent vers l’inconnu. Cette carte te rappelle que la destinée est en mouvement, et qu’il faut savoir s’adapter pour avancer.",
    "cards.tarot.LaRouedeFortune.meaning.var2":
      "Avec La Roue de Fortune, une nouvelle phase débute. Tu es prêt{genderSuffix} à tourner la page, à accueillir les retournements de situation et à apprendre des expériences passées. Cette carte symbolise la transformation et l’évolution constante.",
    "cards.tarot.LaRouedeFortune.meaning.var3":
      "La Roue de Fortune te guide à naviguer entre hauts et bas avec sagesse. Tu es prêt{genderSuffix} à comprendre que tout cycle a une fin et un commencement. Cette carte t’encourage à rester ouvert{genderSuffix} au flux de la vie, en confiance et en harmonie avec ton destin.",
    "cards.tarot.LaForce.name": "La Force",
    "cards.tarot.LaForce.meaning": "Courage, patience, maîtrise intérieure",
    "cards.tarot.LaForce.meaning.var1":
      "La Force te rappelle que ton véritable pouvoir réside dans la douceur et la patience. Tu es prêt{genderSuffix} à canaliser ton énergie, à dompter tes impulsions et à affronter les situations avec calme et détermination. Cette carte parle de maîtrise intérieure et de courage tranquille. Privilégie la constance à la précipitation, elle t’amènera plus loin que la force brute.",
    "cards.tarot.LaForce.meaning.var2":
      "Avec La Force, tu es invité{genderSuffix} à puiser dans ta force morale pour surmonter les obstacles. Tu es prêt{genderSuffix} à faire face aux épreuves sans te laisser submerger, avec confiance en toi et en tes capacités. Cette carte t’encourage à faire preuve de résilience et à rester centré{genderSuffix}. Prends le temps de respirer avant chaque action, la sérénité est ton meilleur allié.",
    "cards.tarot.LaForce.meaning.var3":
      "La Force symbolise le courage intérieur et la capacité à rester aligné{genderSuffix} face aux tensions. Tu es prêt{genderSuffix} à faire preuve de sang-froid, à dominer tes peurs et à transformer l’adversité en croissance personnelle. Cette carte t’invite à croire en ta stabilité intérieure. Garde la tête haute et avance sans crainte, ta paix intérieure ouvrira les bonnes portes.",
    "cards.tarot.LePendu.name": "Le Pendu",
    "cards.tarot.LePendu.meaning":
      "Sacrifice, nouvelle perspective, lâcher-prise",
    "cards.tarot.LePendu.meaning.var1":
      "Le Pendu t’invite à changer de point de vue. Tu es prêt{genderSuffix} à abandonner les schémas anciens et à voir ta situation sous un angle nouveau, même si cela implique une forme de sacrifice temporaire. Cette carte parle d’acceptation et de patience. Parfois, c’est en lâchant prise que l’on retrouve sa liberté.",
    "cards.tarot.LePendu.meaning.var2":
      "Avec Le Pendu, tu entres dans une phase de pause nécessaire. Tu es prêt{genderSuffix} à suspendre l’action pour mieux comprendre ce qui se joue en profondeur. Ce moment d’attente n’est pas une faiblesse, mais une transition vers plus de clarté. Accueille cette immobilité comme un espace fertile de transformation.",
    "cards.tarot.LePendu.meaning.var3":
      "Le Pendu symbolise une période où le lâcher-prise devient essentiel. Tu es prêt{genderSuffix} à renoncer à ce qui ne sert plus ton évolution, même si cela demande courage et humilité. Cette carte te guide vers un éveil par le dépouillement. Laisse tomber les résistances : ce vide ouvre la voie au renouveau.",
    "cards.tarot.LArcanesansnom.name": "La Mort",
    "cards.tarot.LArcanesansnom.meaning":
      "Transformation profonde, fin de cycle",
    "cards.tarot.LArcanesansnom.meaning.var1":
      "Ne te laisse pas impressionner par le nom de cette carte : La Mort symbolise une transformation profonde, pas une fin tragique. Tu es prêt{genderSuffix} à laisser derrière toi une phase révolue de ta vie pour ouvrir la voie à un renouveau plus aligné avec qui tu es devenu{genderSuffix}. L’Arcane sans nom te libère de ce qui t’alourdissait, afin que tu puisses avancer plus léger dans ta métamorphose.",
    "cards.tarot.LArcanesansnom.meaning.var2":
      "La Mort n’est pas une carte négative, mais une invitation au changement radical. Tu es prêt{genderSuffix} à tourner une page importante, à clore un chapitre qui ne résonne plus avec ton présent. Ce passage peut sembler inconfortable, mais il est porteur de renaissance et d’opportunités nouvelles. Accepte de lâcher ce qui t’attache au passé pour mieux accueillir ce qui s’annonce.",
    "cards.tarot.LArcanesansnom.meaning.var3":
      "L’Arcane sans nom marque une fin nécessaire pour une transformation durable. Contrairement aux apparences, cette carte parle de vie plus que de mort : elle évoque un grand nettoyage intérieur. Tu es prêt{genderSuffix} à te délester de ce qui n’a plus lieu d’être, à faire le deuil de certaines illusions ou habitudes obsolètes. Ce que tu abandonnes aujourd’hui prépare la croissance de demain.",
    "cards.tarot.Temperance.name": "Tempérance",
    "cards.tarot.Temperance.meaning": "Modération, guérison, équilibre",
    "cards.tarot.Temperance.meaning.var1":
      "Tempérance t'invite à la douceur et à l'harmonie. Tu es prêt{genderSuffix} à pacifier tes émotions, à éviter les extrêmes et à trouver le juste milieu. Cette carte parle de guérison intérieure, de temps d'intégration où tout se rééquilibre doucement. Cultive la patience : tout s'ajuste quand tu respectes ton propre rythme.",
    "cards.tarot.Temperance.meaning.var2":
      "Avec Tempérance, une phase d'apaisement s’ouvre à toi. Tu es prêt{genderSuffix} à faire dialoguer les contraires, à écouter autant qu'à t'exprimer, à créer un pont entre les parties de toi qui semblaient opposées. Cette carte évoque l’alchimie du cœur et de l’esprit. Autorise-toi à ralentir pour mieux t’aligner.",
    "cards.tarot.Temperance.meaning.var3":
      "Tempérance symbolise un équilibre retrouvé, une paix intérieure qui s’installe avec maturité. Tu es prêt{genderSuffix} à laisser couler ce qui doit circuler, sans forcer ni retenir. Il est temps de te reconnecter à ton centre, à cette stabilité tranquille qui te soutient. Prends soin de ce point d’équilibre fragile, il est ta force.",
    "cards.tarot.LeDiable.name": "Le Diable",
    "cards.tarot.LeDiable.meaning": "Dépendances, illusions, matérialisme",
    "cards.tarot.LeDiable.meaning.var1":
      "Le Diable te met face à tes chaînes invisibles. Tu es prêt{genderSuffix} à reconnaître les dépendances qui te limitent, qu’elles soient matérielles, émotionnelles ou mentales. Cette carte t’invite à briser les illusions qui t’empêchent de voir la vérité et à reprendre ton pouvoir intérieur. Ose te libérer de ce qui t’enchaîne.",
    "cards.tarot.LeDiable.meaning.var2":
      "Avec Le Diable, tu es confronté{genderSuffix} à tes tentations et à tes peurs profondes. Cette carte t’encourage à regarder au-delà des apparences et à comprendre les racines de tes comportements compulsifs. En prenant conscience, tu pourras commencer à dénouer les nœuds qui te retiennent. N’oublie pas que la lumière perce toujours l’obscurité.",
    "cards.tarot.LeDiable.meaning.var3":
      "Le Diable te pousse à examiner ton rapport au matériel et aux plaisirs immédiats. Tu es prêt{genderSuffix} à questionner tes valeurs et à voir si certaines illusions contrôlent tes choix. Cette carte te rappelle que la vraie liberté vient de la conscience et de la maîtrise de soi. Cherche à transformer tes chaînes en forces.",
    "cards.tarot.LaMaisonDieu.name": "La Maison Dieu",
    "cards.tarot.LaMaisonDieu.meaning":
      "Révélation soudaine, changement radical",
    "cards.tarot.LaMaisonDieu.meaning.var1":
      "La Maison Dieu te secoue brusquement, révélant des vérités cachées. Tu es prêt{genderSuffix} à accueillir ce changement radical, même s’il est déstabilisant. Cette carte invite à accepter la transformation nécessaire pour reconstruire sur des bases plus solides. Parfois, il faut laisser tomber l’ancien pour renaître plus fort.",
    "cards.tarot.LaMaisonDieu.meaning.var2":
      "Avec La Maison Dieu, une révélation soudaine bouleverse ta réalité. Tu es prêt{genderSuffix} à faire face à la destruction de certitudes qui ne te servent plus. Ce moment de chaos annonce une libération puissante, permettant de te libérer de ce qui t’entrave. Garde confiance, après la tempête vient la clarté.",
    "cards.tarot.LaMaisonDieu.meaning.var3":
      "La Maison Dieu t’invite à accepter les ruptures nécessaires à ton évolution. Tu es prêt{genderSuffix} à abandonner les constructions fragiles pour ouvrir la voie à un renouveau profond. Cette carte rappelle que les chutes douloureuses préparent souvent les plus belles renaissances.",
    "cards.tarot.LEtoile.name": "L'Étoile",
    "cards.tarot.LEtoile.meaning": "Espoir, inspiration, guidance divine",
    "cards.tarot.LEtoile.meaning.var1":
      "L'Étoile t’apporte un souffle d’espoir et d’inspiration. Tu es prêt{genderSuffix} à croire en un avenir meilleur et à suivre la guidance divine qui éclaire ton chemin. N’hésite pas à te connecter à ta lumière intérieure pour avancer avec confiance.",
    "cards.tarot.LEtoile.meaning.var2":
      "Avec L'Étoile, une période de renouveau spirituel s’ouvre à toi. Tu es prêt{genderSuffix} à recevoir des messages de l’univers et à te laisser guider par ton intuition. Reste ouvert{genderSuffix} et cultive la confiance en toi et en la vie.",
    "cards.tarot.LEtoile.meaning.var3":
      "L'Étoile t’invite à garder la foi, même dans les moments d’incertitude. Tu es prêt{genderSuffix} à te laisser inspirer et à poursuivre tes rêves avec patience et sérénité. Prends le temps de te reconnecter à ce qui te nourrit profondément.",
    "cards.tarot.LaLune.name": "La Lune",
    "cards.tarot.LaLune.meaning": "Illusions, subconscient, intuition",
    "cards.tarot.LaLune.meaning.var1":
      "La Lune t’invite à explorer ton subconscient et à écouter ton intuition. Tu es prêt{genderSuffix} à accepter que tout n’est pas toujours clair et que les illusions peuvent te tromper. Reste attentif{genderSuffix} aux signes subtils qui te guident dans l’ombre.",
    "cards.tarot.LaLune.meaning.var2":
      "Avec La Lune, des mystères et des émotions profondes remontent à la surface. Tu es prêt{genderSuffix} à plonger en toi-même, même si cela peut susciter des doutes ou des peurs. Ne rejette pas tes ressentis, ils t’aident à mieux te comprendre.",
    "cards.tarot.LaLune.meaning.var3":
      "La Lune t’encourage à faire confiance à ton intuition malgré les incertitudes et les illusions qui t’entourent. Tu es prêt{genderSuffix} à avancer en acceptant l’inconnu et à te libérer des peurs qui t’entravent. Sois patient{genderSuffix} avec toi-même dans ce cheminement.",
    "cards.tarot.LeSoleil.name": "Le Soleil",
    "cards.tarot.LeSoleil.meaning": "Joie, succès, vitalité",
    "cards.tarot.LeSoleil.meaning.var1":
      "Le Soleil t’apporte lumière et énergie positive. Tu es prêt{genderSuffix} à accueillir la joie et à célébrer tes succès. Profite de cette vitalité pour avancer avec confiance et enthousiasme.",
    "cards.tarot.LeSoleil.meaning.var2":
      "Avec Le Soleil, une période de clarté et d’optimisme s’ouvre à toi. Tu es prêt{genderSuffix} à rayonner, à partager ta bonne humeur et à attirer les bonnes opportunités. Garde ton cœur ouvert et savoure chaque instant.",
    "cards.tarot.LeSoleil.meaning.var3":
      "Le Soleil t’invite à retrouver ta force intérieure et ta vitalité. Tu es prêt{genderSuffix} à dépasser les obstacles avec une attitude positive et à inspirer ceux qui t’entourent. Ne doute pas de ta capacité à réussir.",
    "cards.tarot.LeJugement.name": "Le Jugement",
    "cards.tarot.LeJugement.meaning": "Éveil spirituel, renaissance, pardon",
    "cards.tarot.LeJugement.meaning.var1":
      "Le Jugement t’invite à un réveil intérieur profond. Tu es prêt{genderSuffix} à reconnaître tes erreurs passées et à embrasser une renaissance spirituelle. Accueille cette transformation pour avancer avec légèreté et clarté.",
    "cards.tarot.LeJugement.meaning.var2":
      "Avec Le Jugement, une période de pardon et de libération s’ouvre à toi. Tu es prêt{genderSuffix} à te libérer des poids du passé et à renouer avec ta vérité. Ouvre ton cœur et laisse-toi guider vers une nouvelle vie.",
    "cards.tarot.LeJugement.meaning.var3":
      "Le Jugement te pousse à écouter ton appel intérieur et à agir avec conscience. Tu es prêt{genderSuffix} à faire la paix avec toi-même et à renaître plus fort{genderSuffix}. Ne crains pas le changement, il est porteur d’espoir.",
    "cards.tarot.LeMonde.name": "Le Monde",
    "cards.tarot.LeMonde.meaning": "Accomplissement, réussite, cycle complet",
    "cards.tarot.LeMonde.meaning.var1":
      "Le Monde symbolise l’accomplissement et la réussite. Tu es prêt{genderSuffix} à célébrer la fin d’un cycle important. Profite de ce moment d’épanouissement pour apprécier tout ce que tu as accompli et préparer la suite avec confiance.",
    "cards.tarot.LeMonde.meaning.var2":
      "Avec Le Monde, un cycle complet se termine, ouvrant la porte à de nouvelles possibilités. Tu es prêt{genderSuffix} à intégrer les leçons apprises et à avancer avec sérénité. Accueille cette étape comme une victoire personnelle.",
    "cards.tarot.LeMonde.meaning.var3":
      "Le Monde t’invite à vivre pleinement l’harmonie et la plénitude. Tu es prêt{genderSuffix} à reconnaître ta valeur et à t’ouvrir au monde avec gratitude. Laisse-toi porter par cette énergie positive pour concrétiser tes projets.",

    // Card Names and Meanings - Angels
    "cards.angels.ArchangeMichel.name": "Archange Michel",
    "cards.angels.ArchangeMichel.meaning":
      "Protection divine, courage et force",
    "cards.angels.ArchangeMichel.meaning.var1":
      "L'Archange Michel t'entoure de sa protection puissante. Il te donne le courage d'affronter les situations difficiles et de te défendre contre les énergies négatives. Cette carte te rappelle que tu n'es jamais seul face aux épreuves. Concrètement, si tu te sens menacé ou déstabilisé dans ta vie, Michel te conseille de poser des limites claires. Apprends à dire non aux personnes ou situations qui drainent ton énergie. Protège ton espace personnel, que ce soit physique ou émotionnel. Son épée de lumière coupe les liens toxiques et te libère des peurs qui te paralysent. N'hésite pas à demander de l'aide si tu en as besoin, c'est un signe de force, pas de faiblesse.",
    "cards.angels.ArchangeMichel.meaning.var2":
      "Cette carte annonce l'intervention d'une force protectrice dans ta vie. Michel te demande de te lever avec courage et de reprendre ton pouvoir personnel. Tu as traversé des moments où tu t'es senti vulnérable, mais maintenant il est temps de retrouver ta force intérieure. Dans ton quotidien, identifie ce qui mine ta confiance en toi. Est-ce une relation toxique? Un environnement professionnel étouffant? Des pensées négatives récurrentes? Michel t'encourage à agir avec détermination pour changer la situation. Sa présence te garantit que tu es soutenu dans cette démarche. Prends une décision que tu reportes par peur, confronte quelqu'un qui te manque de respect, ou simplement affirme tes besoins clairement.",
    "cards.angels.ArchangeMichel.meaning.var3":
      "L'énergie de Michel apporte une protection divine à ce moment de ta vie. Il te rappelle que tu possèdes en toi une force insoupçonnée. Cette carte t'invite à te tenir debout face à l'adversité, à défendre tes valeurs et tes convictions. Sur le plan pratique, examine où tu te compromets par peur du conflit ou du rejet. Michel te donne le courage de rester authentique même si cela déplaît à certains. Sa force te permet d'établir des frontières saines dans tes relations. Si tu fais face à une injustice, c'est le moment d'agir. Son bouclier te protège pendant que tu prends position. Rappelle-toi que la vraie force n'est pas dans l'agressivité, mais dans l'affirmation calme et ferme de qui tu es.",
    "cards.angels.ArchangeGabriel.name": "Archange Gabriel",
    "cards.angels.ArchangeGabriel.meaning":
      "Messages divins, créativité et communication",
    "cards.angels.ArchangeGabriel.meaning.var1":
      "L'Archange Gabriel t'apporte un message important. Il est le messager divin qui ouvre les canaux de communication dans ta vie. Cette carte indique qu'une information cruciale va te parvenir ou que tu dois transmettre quelque chose d'essentiel. Gabriel stimule aussi ta créativité et t'encourage à exprimer ce que tu portes en toi. Concrètement, sois attentif aux signes, aux conversations et aux opportunités qui se présentent. C'est le moment d'écrire, de parler, de créer. Si tu as un projet artistique en tête, lance-toi. Si tu dois avoir une conversation difficile, Gabriel te donne les mots justes. Écoute ton intuition et n'ignore pas les messages qui te parviennent, même subtils.",
    "cards.angels.ArchangeGabriel.meaning.var2":
      "Gabriel annonce une période de communication et d'expression personnelle. Il te demande de libérer ta voix et de partager tes idées avec le monde. Peut-être as-tu gardé le silence trop longtemps sur un sujet qui te tient à cœur. Cette carte t'encourage à parler, à écrire, à créer sans craindre le jugement. Dans ton quotidien, identifie ce que tu dois communiquer. Un sentiment à exprimer à un proche? Un projet créatif à démarrer? Une vérité à dire? Gabriel te soutient dans cette démarche. Il favorise aussi la réception de nouvelles importantes, alors reste ouvert. Les messages divins peuvent venir par des moyens inattendus.",
    "cards.angels.ArchangeGabriel.meaning.var3":
      "L'énergie de Gabriel éveille ta créativité et clarifie ta communication. Il te rappelle que tu as quelque chose d'unique à offrir au monde. Cette carte t'invite à utiliser tes talents artistiques ou ton don de communication. Sur le plan pratique, engage-toi dans une activité créative cette semaine, même quelque chose de simple. Écris dans un journal, peins, chante, décore ton espace. Gabriel débloque aussi les situations où la communication était difficile. Si tu attends des nouvelles, elles arrivent bientôt. Si tu dois clarifier un malentendu, c'est le bon moment. Exprime-toi avec authenticité et écoute vraiment ce que les autres te disent.",
    "cards.angels.ArchangeRaphael.name": "Archange Raphaël",
    "cards.angels.ArchangeRaphael.meaning": "Guérison physique et émotionnelle",
    "cards.angels.ArchangeRaphael.meaning.var1":
      "L'Archange Raphaël t'enveloppe de son énergie curative. Il apaise tes blessures physiques et émotionnelles avec douceur et compassion. Cette carte indique qu'un processus de guérison est en cours dans ta vie. Raphaël te rappelle que prendre soin de toi n'est pas égoïste, c'est essentiel. Concrètement, accorde-toi du repos si ton corps te le demande. Consulte un professionnel de santé si tu as négligé des symptômes. Sur le plan émotionnel, autorise-toi à ressentir et à libérer les émotions refoulées. Raphaël te guide vers les personnes et les pratiques qui favorisent ta guérison, que ce soit la médecine, la thérapie, ou simplement du temps pour toi.",
    "cards.angels.ArchangeRaphael.meaning.var2":
      "Raphaël annonce une période de rétablissement et de régénération. Il te demande de ralentir et d'écouter les besoins de ton corps et de ton cœur. Tu as peut-être poussé trop loin, ignoré des signaux d'alarme ou porté seul des fardeaux trop lourds. Cette carte t'encourage à demander de l'aide et à accepter le soutien qui t'est offert. Dans ton quotidien, identifie ce qui nécessite une attention particulière. Une fatigue persistante? Une blessure émotionnelle non résolue? Des relations qui te blessent? Raphaël te donne la force de faire les changements nécessaires pour ton bien-être. Prends rendez-vous avec un médecin, un thérapeute, ou simplement accorde-toi une journée de repos complète.",
    "cards.angels.ArchangeRaphael.meaning.var3":
      "L'énergie guérisseuse de Raphaël travaille dans ta vie en ce moment. Il t'aide à te libérer des souffrances du passé et à restaurer ton équilibre intérieur. Cette carte t'invite à traiter avec bienveillance tes blessures, qu'elles soient visibles ou invisibles. Sur le plan pratique, adopte des habitudes qui nourrissent ton corps et ton esprit. Mange sainement, dors suffisamment, bouge doucement. Pour les blessures émotionnelles, considère de parler à quelqu'un de confiance ou d'écrire ce que tu ressens. Raphaël te rappelle que la guérison prend du temps et que c'est normal. Sois patient avec toi-même et célèbre chaque petit progrès sur ce chemin.",
    "cards.angels.ArchangeUriel.name": "Archange Uriel",
    "cards.angels.ArchangeUriel.meaning": "Sagesse divine et illumination",
    "cards.angels.ArchangeUriel.meaning.var1":
      "L'Archange Uriel illumine ton chemin de sa sagesse divine. Il t'aide à voir clairement les situations complexes et à comprendre le sens profond de ce que tu vis. Cette carte indique qu'une prise de conscience importante se prépare. Uriel éclaire ce qui était dans l'ombre et te révèle des vérités essentielles. Concrètement, prends du temps pour la réflexion et la méditation. Les réponses que tu cherches sont déjà en toi, Uriel t'aide simplement à les voir. Si tu fais face à une décision difficile, observe la situation sous différents angles. Uriel te donne le discernement nécessaire pour faire le bon choix. Fais confiance aux intuitions soudaines et aux moments de clarté qui surgissent.",
    "cards.angels.ArchangeUriel.meaning.var2":
      "Uriel annonce une période d'illumination intérieure et de compréhension profonde. Il te demande de chercher la sagesse au-delà des apparences et de faire confiance à ton savoir intérieur. Tu possèdes plus de sagesse que tu ne le crois. Cette carte t'encourage à étudier, à apprendre, à creuser les sujets qui t'intéressent. Dans ton quotidien, remarque les synchronicités et les coïncidences qui te guident. Uriel te montre les patterns et les leçons cachées dans tes expériences. Si quelque chose te trouble, prends du recul et observe avec détachement. La sagesse vient souvent quand on cesse de chercher frénétiquement et qu'on laisse la compréhension émerger naturellement. Lis, apprends, questionne.",
    "cards.angels.ArchangeUriel.meaning.var3":
      "L'énergie d'Uriel apporte lumière et clarté dans ta vie. Il dissipe la confusion et te permet de voir la vérité des situations. Cette carte t'invite à développer ta sagesse intérieure par l'observation et la contemplation. Sur le plan pratique, crée des moments de silence dans ta journée pour réfléchir. Tiens un journal pour noter tes réflexions et insights. Uriel favorise l'apprentissage, donc c'est un bon moment pour te former dans un domaine qui t'intéresse. Si tu cherches des réponses, consulte des livres de sagesse ou des enseignants inspirants. Uriel te rappelle que la vraie connaissance transforme, elle ne reste pas théorique. Applique ce que tu apprends dans ta vie concrète.",
    "cards.angels.AngeGardien.name": "Ange Gardien",
    "cards.angels.AngeGardien.meaning": "Protection personnelle et guidance",
    "cards.angels.AngeGardien.meaning.var1":
      "Ton Ange Gardien te fait savoir qu'il est constamment à tes côtés. Il veille sur toi avec amour et te protège des dangers que tu ne vois même pas. Cette carte te rappelle que tu n'es jamais seul dans ton chemin de vie. Ta guidance personnelle est toujours disponible, il suffit de demander. Concrètement, si tu te sens perdu ou anxieux, prends un moment pour te connecter intérieurement. Demande à ton Ange Gardien de te montrer des signes de sa présence. Fais confiance aux intuitions qui te détournent d'une situation ou t'attirent vers une autre. Ces impulsions sont souvent sa manière de te guider. Si tu traverses une période difficile, sache que tu es protégé et soutenu, même si tu ne le vois pas encore.",
    "cards.angels.AngeGardien.meaning.var2":
      "Cette carte annonce une protection renforcée autour de toi en ce moment. Ton Ange Gardien t'envoie un message clair qu'il guide tes pas et éloigne les obstacles de ton chemin. Il te demande de lui faire confiance et de suivre ton instinct. Dans ton quotidien, remarque les petits miracles et les coïncidences heureuses qui se produisent. C'est ton ange qui travaille en coulisses pour ton bien-être. Si tu dois prendre une décision importante, calme ton mental et écoute cette voix intérieure douce mais ferme. Ton Ange Gardien communique par les sensations, les rêves, les signes répétés. Sois attentif et remercie-le pour sa présence constante dans ta vie.",
    "cards.angels.AngeGardien.meaning.var3":
      "L'énergie de ton Ange Gardien t'enveloppe de protection et d'amour inconditionnel. Il connaît ta mission de vie et t'aide à rester sur le bon chemin. Cette carte t'invite à renforcer ta connexion avec lui par la prière ou la méditation. Sur le plan pratique, crée un rituel quotidien pour reconnaître sa présence. Cela peut être simplement dire merci le matin ou demander sa guidance avant de dormir. Ton Ange Gardien te protège physiquement mais aussi émotionnellement et spirituellement. Si tu te sens vulnérable, visualise ses ailes qui t'entourent. Il te rappelle que même dans les moments les plus sombres, tu es guidé vers la lumière. Écoute les messages qui viennent de ton cœur, c'est souvent lui qui te parle.",
    "cards.angels.AngedelAmour.name": "Ange de l'Amour",
    "cards.angels.AngedelAmour.meaning":
      "Relations harmonieuses et amour inconditionnel",
    "cards.angels.AngedelAmour.meaning.var1":
      "L'Ange de l'Amour ouvre ton cœur à des relations plus authentiques et harmonieuses. Il t'enseigne que l'amour commence par toi-même et rayonne ensuite vers les autres. Cette carte indique une période favorable pour guérir tes blessures affectives et attirer des relations saines. L'amour inconditionnel signifie accepter sans jugement, toi-même d'abord, puis les autres. Concrètement, observe comment tu te parles intérieurement. Es-tu aussi dur avec toi que tu ne le serais jamais avec un ami? Change ce dialogue interne. Dans tes relations, pratique l'écoute véritable et l'expression honnête de tes sentiments. Si tu es en couple, c'est le moment de raviver la connexion. Si tu es célibataire, travaille sur ton amour-propre avant de chercher l'amour ailleurs.",
    "cards.angels.AngedelAmour.meaning.var2":
      "Cette carte annonce une énergie d'amour et d'harmonie qui entre dans ta vie. L'Ange de l'Amour te rappelle que tu mérites d'être aimé pour qui tu es vraiment. Il t'encourage à baisser tes défenses et à te montrer vulnérable dans tes relations. Dans ton quotidien, identifie les murs que tu as construits par peur d'être blessé. Ces protections t'empêchent aussi de recevoir l'amour qui t'est offert. Ose montrer tes émotions sincères à ceux qui comptent pour toi. Pardonne les anciennes blessures, pas pour les autres, mais pour te libérer toi-même. L'Ange de l'Amour favorise aussi les rencontres significatives, alors reste ouvert aux nouvelles personnes qui croisent ton chemin.",
    "cards.angels.AngedelAmour.meaning.var3":
      "L'énergie de l'Ange de l'Amour t'invite à créer plus d'harmonie dans toutes tes relations. Il te guide vers un amour mature, celui qui accepte les imperfections et choisit la bienveillance. Cette carte t'encourage à réparer les liens abîmés si c'est encore possible et sain pour toi. Sur le plan pratique, exprime ta gratitude aux personnes que tu aimes. Un message sincère, un geste attentionné peuvent transformer une relation. Si une relation te fait plus de mal que de bien, l'Ange de l'Amour te donne aussi le courage de la libérer avec compassion. L'amour inconditionnel inclut parfois de poser des limites claires. Rappelle-toi que tu enseignes aux autres comment te traiter par ce que tu acceptes.",
    "cards.angels.AngedelaPaix.name": "Ange de la Paix",
    "cards.angels.AngedelaPaix.meaning": "Sérénité intérieure et calme",
    "cards.angels.AngedelaPaix.meaning.var1":
      "L'Ange de la Paix t'apporte une énergie de sérénité et de calme profond. Il t'aide à trouver le silence intérieur même au milieu du chaos extérieur. Cette carte indique qu'il est temps de ralentir et de cultiver ta tranquillité d'esprit. La paix véritable ne dépend pas des circonstances, elle naît de ton état intérieur. Concrètement, crée des moments de pause dans ta journée. Cinq minutes de respiration consciente, une marche dans la nature, ou simplement t'asseoir en silence. Si tu vis des conflits, l'Ange de la Paix t'encourage à choisir l'apaisement plutôt que d'avoir raison. Parfois, la paix demande de lâcher prise sur le besoin de contrôle. Éloigne-toi des sources de stress inutiles comme les nouvelles anxiogènes ou les conversations toxiques.",
    "cards.angels.AngedelaPaix.meaning.var2":
      "Cette carte annonce une période de réconciliation et d'harmonie intérieure. L'Ange de la Paix te demande de faire la paix avec ton passé, tes erreurs et tes regrets. Il te rappelle que tu ne peux pas changer ce qui a été, mais tu peux choisir comment tu vis maintenant. Dans ton quotidien, identifie ce qui perturbe ta paix intérieure. Des pensées obsessionnelles? Des rancunes tenaces? Des peurs constantes? Travaille activement à apaiser ces turbulences. La méditation, le pardon et l'acceptation sont tes outils. Si tu es en conflit avec quelqu'un, cherche des points de réconciliation plutôt que de nourrir la division. L'Ange de la Paix te guide vers des solutions douces et des compromis respectueux.",
    "cards.angels.AngedelaPaix.meaning.var3":
      "L'énergie de l'Ange de la Paix calme les tempêtes de ton esprit et de ton cœur. Il t'invite à créer un sanctuaire de sérénité dans ta vie quotidienne. Cette carte te rappelle que la paix est un choix conscient que tu fais à chaque instant. Sur le plan pratique, aménage un espace chez toi dédié au calme et à la détente. Limite ton exposition aux stimulations excessives et aux environnements stressants. Si ton mental s'emballe avec des inquiétudes, reviens doucement au moment présent. Respire profondément et rappelle-toi que la plupart de tes peurs concernent un futur qui n'existe pas encore. L'Ange de la Paix t'enseigne que le calme n'est pas l'absence de problèmes, c'est la capacité de rester centré malgré eux.",
    "cards.angels.AngedelaProsperite.name": "Ange de la Prospérité",
    "cards.angels.AngedelaProsperite.meaning":
      "Abondance et réussite matérielle",
    "cards.angels.AngedelaProsperite.meaning.var1":
      "L'Ange de la Prospérité t'invite à accueillir l'abondance dans ta vie. Il te rappelle que la réussite matérielle est à portée de main, à condition de garder une attitude positive et de croire en tes capacités. Cette carte t'encourage à agir avec confiance et à saisir les opportunités qui se présentent. Concrètement, sois attentif aux signes de chance, aux idées qui peuvent améliorer ta situation financière, et n'hésite pas à investir en toi-même.",
    "cards.angels.AngedelaProsperite.meaning.var2":
      "Cette carte annonce une période favorable à la croissance et à la stabilité matérielle. L'Ange de la Prospérité te soutient dans tes projets d'entreprise, d'investissement ou d'évolution professionnelle. Il t'invite aussi à cultiver la gratitude pour ce que tu possèdes déjà, car cela attire encore plus d'abondance. Dans ton quotidien, prends des décisions réfléchies et reste ouvert aux conseils avisés.",
    "cards.angels.AngedelaProsperite.meaning.var3":
      "L'énergie de l'Ange de la Prospérité agit comme un levier pour manifester tes objectifs financiers. Il t'encourage à dépasser les blocages liés à la peur ou au manque. Cette carte te rappelle que prospérer ne signifie pas seulement accumuler des biens, mais aussi créer un équilibre entre richesse matérielle et bien-être personnel. Sur le plan pratique, organise-toi, planifie tes finances et cultive une vision claire de tes ambitions.",
    "cards.angels.AngedelaGuerison.name": "Ange de la Guérison",
    "cards.angels.AngedelaGuerison.meaning": "Rétablissement et bien-être",
    "cards.angels.AngedelaGuerison.meaning.var1":
      "L'Ange de la Guérison t'enveloppe de son énergie bienfaisante. Il t'invite à prendre soin de ton corps et de ton esprit avec douceur et patience. Cette carte annonce un processus de rétablissement, que ce soit physique, émotionnel ou spirituel. Concrètement, écoute les besoins de ton corps, repose-toi et accepte le soutien des autres.",
    "cards.angels.AngedelaGuerison.meaning.var2":
      "Cette carte symbolise une période favorable à la restauration de ton bien-être. L'Ange de la Guérison t'encourage à lâcher prise sur les douleurs passées et à te tourner vers des pratiques qui nourrissent ta santé globale. Dans ton quotidien, adopte des habitudes saines, médite et autorise-toi à guérir à ton rythme.",
    "cards.angels.AngedelaGuerison.meaning.var3":
      "L'énergie de l'Ange de la Guérison agit comme un catalyseur pour ta transformation intérieure. Il te soutient dans la libération des blocages et des souffrances enfouies. Cette carte t'invite à cultiver la compassion envers toi-même et à reconnaître que la guérison est un chemin progressif. Prends le temps d'accueillir chaque étape avec confiance.",
    "cards.angels.AngedelaSagesse.name": "Ange de la Sagesse",
    "cards.angels.AngedelaSagesse.meaning":
      "Connaissance spirituelle et discernement",
    "cards.angels.AngedelaSagesse.meaning.var1":
      "L'Ange de la Sagesse t'invite à chercher la connaissance au-delà des apparences. Il t'aide à développer ton discernement et à écouter ta voix intérieure. Cette carte indique un moment propice à la réflexion profonde et à la prise de décisions éclairées. Concrètement, prends du temps pour méditer, lire ou étudier des sujets qui élèvent ton esprit.",
    "cards.angels.AngedelaSagesse.meaning.var2":
      "Cette carte annonce une période d'éveil spirituel et de clarté mentale. L'Ange de la Sagesse te guide pour comprendre les leçons cachées dans tes expériences. Dans ta vie quotidienne, sois attentif aux signes et aux synchronicités qui t'orientent. Cultive la patience et l'humilité dans ta quête de vérité.",
    "cards.angels.AngedelaSagesse.meaning.var3":
      "L'énergie de l'Ange de la Sagesse t'accompagne dans ton cheminement intérieur. Il t'encourage à faire preuve de calme et de discernement face aux défis. Cette carte te rappelle que la véritable sagesse vient de l'équilibre entre connaissance et compassion. Sur le plan pratique, prends du temps pour te poser et réfléchir, puis partage tes découvertes avec bienveillance.",
    "cards.angels.AngedelaJoie.name": "Ange de la Joie",
    "cards.angels.AngedelaJoie.meaning": "Bonheur et optimisme",
    "cards.angels.AngedelaJoie.meaning.var1":
      "L'Ange de la Joie t'invite à accueillir la lumière et le bonheur dans ta vie. Il te rappelle que la joie est un choix, même dans les moments difficiles. Cette carte encourage à cultiver l'optimisme et à célébrer les petites victoires quotidiennes. Concrètement, prends le temps de rire, de sourire et de partager des moments positifs avec ceux que tu aimes.",
    "cards.angels.AngedelaJoie.meaning.var2":
      "Cette carte annonce une période où la légèreté et l'enthousiasme prennent le dessus. L'Ange de la Joie te pousse à te libérer des poids émotionnels qui te retiennent. Dans ta vie quotidienne, cherche les sources de plaisir simple, comme une promenade, une musique ou une activité créative. La joie est contagieuse, partage-la autour de toi.",
    "cards.angels.AngedelaJoie.meaning.var3":
      "L'énergie de l'Ange de la Joie rayonne en toi, t'invitant à vivre pleinement et à savourer chaque instant. Il t'encourage à nourrir ta gratitude et à voir le positif même dans les défis. Sur le plan pratique, crée des rituels qui apportent de la gaieté, comme écouter ta chanson préférée ou pratiquer une activité qui te passionne. La joie est un moteur puissant pour ton bien-être.",
    "cards.angels.AngedelaFoi.name": "Ange de la Foi",
    "cards.angels.AngedelaFoi.meaning": "Confiance en l'univers et espoir",
    "cards.angels.AngedelaFoi.meaning.var1":
      "L'Ange de la Foi t'invite à faire confiance à l'univers et à croire en un avenir meilleur. Il t'encourage à garder l'espoir même face aux incertitudes. Cette carte te rappelle que la foi ouvre des portes invisibles et te guide sur ton chemin. Concrètement, lâche prise sur le contrôle excessif et accueille les surprises de la vie.",
    "cards.angels.AngedelaFoi.meaning.var2":
      "Cette carte annonce une période où ta confiance intérieure est renforcée. L'Ange de la Foi t'aide à surmonter les doutes et à garder le cap malgré les obstacles. Dans ton quotidien, pratique la patience et l'acceptation, et cherche des signes qui confirment que tu es soutenu. La foi est un ancrage puissant pour avancer.",
    "cards.angels.AngedelaFoi.meaning.var3":
      "L'énergie de l'Ange de la Foi t'encourage à croire en toi et en la bienveillance de l'univers. Il te rappelle que même quand le chemin semble obscur, une lumière intérieure brille toujours. Sur le plan pratique, prends un moment chaque jour pour renforcer ta confiance par la méditation ou la prière. La foi nourrit ta force intérieure et ton courage.",
    "cards.angels.AngedelaCreativite.name": "Ange de la Créativité",
    "cards.angels.AngedelaCreativite.meaning":
      "Inspiration artistique et innovation",
    "cards.angels.AngedelaCreativite.meaning.var1":
      "L'Ange de la Créativité stimule ton inspiration et t'invite à exprimer tes talents artistiques. Il t'encourage à sortir des sentiers battus et à innover dans ta vie. Cette carte rappelle que la créativité est un moyen de te connecter à ton essence profonde. Concrètement, prends le temps de créer, que ce soit par l'écriture, la peinture, la musique ou toute autre forme d'expression.",
    "cards.angels.AngedelaCreativite.meaning.var2":
      "Cette carte annonce une phase où ton imagination est en éveil. L'Ange de la Créativité t'incite à explorer de nouvelles idées et à expérimenter sans peur du jugement. Dans ta vie quotidienne, accorde-toi des moments pour rêver et laisser libre cours à ton inspiration. Ta créativité peut aussi être une solution pour résoudre des problèmes.",
    "cards.angels.AngedelaCreativite.meaning.var3":
      "L'énergie de l'Ange de la Créativité t'invite à renouveler ta vision et à innover. Il te rappelle que chaque acte créatif est une forme de transformation. Sur le plan pratique, lance-toi dans un projet artistique ou invente une nouvelle façon de faire les choses. Ose exprimer ton originalité et nourris ta passion avec enthousiasme.",
    "cards.angels.AngedelaPurification.name": "Ange de la Purification",
    "cards.angels.AngedelaPurification.meaning":
      "Nettoyage énergétique et renouveau",
    "cards.angels.AngedelaPurification.meaning.var1":
      "L'Ange de la Purification t'aide à libérer les énergies négatives et à purifier ton esprit et ton corps. Il t'invite à faire un nettoyage intérieur pour retrouver clarté et légèreté. Concrètement, prends le temps de te recentrer et d'éliminer ce qui ne te sert plus, que ce soit des pensées, des émotions ou des influences extérieures.",
    "cards.angels.AngedelaPurification.meaning.var2":
      "Cette carte annonce une période de renouveau où tu es appelé à te débarrasser des blocages énergétiques. L'Ange de la Purification t'encourage à faire le vide pour accueillir du neuf. Dans ton quotidien, pratique des rituels simples comme la méditation, la sophrologie pour te revitaliser.",
    "cards.angels.AngedelaPurification.meaning.var3":
      "L'énergie de l'Ange de la Purification travaille à nettoyer ton espace personnel et ton esprit. Il te rappelle que le renouveau passe par un lâcher-prise sincère. Sur le plan pratique, organise ton environnement pour créer un lieu sain et apaisant. Prends soin de toi avec douceur et ouvre-toi à une nouvelle énergie positive.",
    "cards.angels.AngedelaCompassion.name": "Ange de la Compassion",
    "cards.angels.AngedelaCompassion.meaning": "Empathie et bienveillance",
    "cards.angels.AngedelaCompassion.meaning.var1":
      "L'Ange de la Compassion t'invite à ouvrir ton cœur avec douceur et empathie envers toi-même et les autres. Il te rappelle l'importance de la bienveillance dans tes relations. Concrètement, fais preuve de patience et de compréhension, même face aux difficultés ou aux erreurs.",
    "cards.angels.AngedelaCompassion.meaning.var2":
      "Cette carte annonce une période où ta capacité d'écoute et d'empathie est renforcée. L'Ange de la Compassion t'encourage à soutenir ceux qui traversent des épreuves. Dans ta vie quotidienne, offre ton aide sans jugement et cultive la tendresse dans tes interactions.",
    "cards.angels.AngedelaCompassion.meaning.var3":
      "L'énergie de l'Ange de la Compassion t'accompagne pour développer un amour inconditionnel. Il te rappelle que la vraie force réside dans la douceur. Sur le plan pratique, pratique des gestes d'amour et de soutien, et apprends à te pardonner toi-même avec indulgence.",
    "cards.angels.AngedelaTransformation.name": "Ange de la Transformation",
    "cards.angels.AngedelaTransformation.meaning":
      "Changements positifs et évolution",
    "cards.angels.AngedelaTransformation.meaning.var1":
      "L'Ange de la Transformation t'accompagne dans un processus de changement profond. Il t'invite à embrasser les évolutions qui se présentent, même si elles peuvent sembler incertaines. Concrètement, laisse aller les anciennes habitudes ou croyances qui ne te servent plus pour faire place à du renouveau positif.",
    "cards.angels.AngedelaTransformation.meaning.var2":
      "Cette carte annonce une période où des changements importants se produisent dans ta vie. L'Ange de la Transformation te soutient pour traverser ces étapes avec confiance et sérénité. Dans ton quotidien, sois attentif aux signes qui t'indiquent le chemin à suivre et n'hésite pas à prendre des décisions audacieuses.",
    "cards.angels.AngedelaTransformation.meaning.var3":
      "L'énergie de l'Ange de la Transformation t'invite à évoluer en harmonie avec toi-même. Il te rappelle que chaque étape, même difficile, est une opportunité de croissance. Sur le plan pratique, accueille les changements avec ouverture et adapte-toi avec souplesse pour construire une vie plus alignée avec tes aspirations.",
    "cards.angels.AngedelAbondance.name": "Ange de l'Abondance",
    "cards.angels.AngedelAbondance.meaning":
      "Richesse spirituelle et matérielle",
    "cards.angels.AngedelAbondance.meaning.var1":
      "L'Ange de l'Abondance t'invite à accueillir la richesse sous toutes ses formes, matérielle comme spirituelle. Il t'encourage à reconnaître et à apprécier ce que tu possèdes déjà. Concrètement, cultive la gratitude pour attirer davantage de prospérité dans ta vie.",
    "cards.angels.AngedelAbondance.meaning.var2":
      "Cette carte annonce une période où les flux d'abondance se renforcent autour de toi. L'Ange de l'Abondance te rappelle que ton état d'esprit est clé : reste ouvert et confiant pour recevoir ce qui t'est destiné. Dans ton quotidien, repère les opportunités et agis avec générosité.",
    "cards.angels.AngedelAbondance.meaning.var3":
      "L'énergie de l'Ange de l'Abondance t'invite à équilibrer don et réception. Il te rappelle que la vraie richesse réside dans le partage et l'harmonie intérieure. Sur le plan pratique, donne sans attendre en retour et sois attentif à ce que la vie te renvoie en retour.",
    "cards.angels.AngedelaLiberation.name": "Ange de la Libération",
    "cards.angels.AngedelaLiberation.meaning":
      "Liberté des peurs et limitations",
    "cards.angels.AngedelaLiberation.meaning.var1":
      "L'Ange de la Libération t'aide à te défaire des peurs et des blocages qui freinent ton épanouissement. Il t'invite à lâcher ce qui te retient pour avancer avec plus de légèreté. Concrètement, identifie tes chaînes invisibles et décide de les briser.",
    "cards.angels.AngedelaLiberation.meaning.var2":
      "Cette carte annonce une phase où tu peux te libérer des limitations intérieures et extérieures. L'Ange de la Libération te soutient pour oser sortir de ta zone de confort. Dans ton quotidien, affronte tes peurs avec courage et accueille la nouveauté avec confiance.",
    "cards.angels.AngedelaLiberation.meaning.var3":
      "L'énergie de l'Ange de la Libération t'invite à vivre dans la liberté intérieure. Il te rappelle que tu as le pouvoir de choisir tes pensées et tes réactions. Sur le plan pratique, pratique le pardon envers toi-même et les autres pour te libérer des poids émotionnels.",
    "cards.angels.AngedelaGratitude.name": "Ange de la Gratitude",
    "cards.angels.AngedelaGratitude.meaning": "Reconnaissance et appréciation",
    "cards.angels.AngedelaGratitude.meaning.var1":
      "L'Ange de la Gratitude t'invite à cultiver un cœur reconnaissant. En appréciant pleinement ce que tu as, tu ouvres la porte à davantage de bénédictions. Prends le temps chaque jour de noter ce qui te rend heureux et reçois ces cadeaux avec joie.",
    "cards.angels.AngedelaGratitude.meaning.var2":
      "Cette carte signale une période favorable pour reconnaître les petites et grandes choses qui enrichissent ta vie. L'Ange de la Gratitude te rappelle que cette attitude positive attire encore plus d'abondance et de paix intérieure. Dans ta routine, observe et célèbre chaque instant de bonheur.",
    "cards.angels.AngedelaGratitude.meaning.var3":
      "L'énergie de l'Ange de la Gratitude te pousse à transformer ton regard sur le monde. En choisissant d'être reconnaissant, tu modifies ta vibration et favorises l'harmonie autour de toi. Essaie de partager cette gratitude avec ceux que tu aimes, cela renforce les liens et élève les énergies.",
    "cards.angels.AngedelaManifestation.name": "Ange de la Manifestation",
    "cards.angels.AngedelaManifestation.meaning":
      "Réalisation des rêves et projets",
    "cards.angels.AngedelaManifestation.meaning.var1":
      "L'Ange de la Manifestation t'encourage à concentrer ton énergie sur tes objectifs. En visualisant clairement ce que tu souhaites réaliser, tu amplifies ta capacité à attirer les opportunités. Agis avec confiance et persévérance pour concrétiser tes rêves.",
    "cards.angels.AngedelaManifestation.meaning.var2":
      "Cette carte annonce un moment favorable pour transformer tes idées en réalité. L'Ange de la Manifestation te rappelle que tes pensées et tes actions sont des outils puissants. Reste aligné avec tes intentions et reste ouvert aux signes qui te guident.",
    "cards.angels.AngedelaManifestation.meaning.var3":
      "L'énergie de cet ange te pousse à croire en ton potentiel créatif. En prenant des décisions claires et en passant à l'action, tu avances vers tes aspirations. Cultive la patience et la détermination, car chaque étape te rapproche de la réussite.",
    "cards.angels.AngedelHarmonie.name": "Ange de l'Harmonie",
    "cards.angels.AngedelHarmonie.meaning":
      "Équilibre dans tous les aspects de la vie",
    "cards.angels.AngedelHarmonie.meaning.var1":
      "L'Ange de l'Harmonie t'invite à trouver un équilibre durable entre tes émotions, tes relations et tes engagements. En cultivant la paix intérieure et la tolérance, tu crées un environnement apaisant qui favorise le bien-être et la sérénité.",
    "cards.angels.AngedelHarmonie.meaning.var2":
      "Cette carte annonce une phase où tu peux rétablir l’équilibre dans ta vie malgré les tensions. L'Ange de l'Harmonie te conseille de rester à l’écoute de toi-même et des autres, d'agir avec douceur, et de privilégier la compréhension mutuelle pour surmonter les conflits.",
    "cards.angels.AngedelHarmonie.meaning.var3":
      "L’énergie de l’Ange de l’Harmonie t’aide à apaiser les discordes internes et externes. En favorisant la modération, la patience et le respect, tu bâtis des relations solides et tu atteins une stabilité durable qui te soutient dans tous les aspects de ta vie.",
    "cards.angels.AngedelaNouvelleVie.name": "Ange de la Nouvelle Vie",
    "cards.angels.AngedelaNouvelleVie.meaning":
      "Nouveaux commencements et renaissance",
    "cards.angels.AngedelaNouvelleVie.meaning.var1":
      "L'Ange de la Nouvelle Vie t'invite à accueillir un nouveau cycle avec ouverture et confiance. C’est le moment de laisser derrière toi le passé pour embrasser des opportunités fraîches et un renouveau profond dans ta vie.",
    "cards.angels.AngedelaNouvelleVie.meaning.var2":
      "Cette carte annonce une période de transformation où tu peux renaître pleinement. L'Ange te soutient dans tes nouveaux départs, t’encourage à poser des bases solides et à avancer avec foi vers un avenir prometteur.",
    "cards.angels.AngedelaNouvelleVie.meaning.var3":
      "L’énergie de l’Ange de la Nouvelle Vie t’accompagne pour tourner une page importante. Elle te rappelle que chaque fin est un nouveau commencement, et que tu as en toi la force nécessaire pour te réinventer et grandir avec sérénité.",

    // Horoscope
    "horoscope.title": "Horoscope du Jour",
    "horoscope.predictions": "Vos Prédictions Astrales",
    "horoscope.retry": "Réessayer",
    "horoscope.home": "Accueil",
    "horoscope.newConsultation": "Nouvelle consultation",
    "horoscope.error":
      "Désolé, impossible de récupérer votre horoscope du jour.",
    "horoscope.loading": "Les astres révèlent vos prédictions...",
    "horoscope.noSign":
      "Désolé, nous avons besoin de votre signe astrologique pour afficher votre horoscope.",

    // Horoscope Data Translations - Descriptions
    "horoscope.data.descriptions.aries.0":
      "Votre énergie débordante vous pousse à agir avec audace aujourd’hui. Profitez-en pour initier de nouveaux projets.",
    "horoscope.data.descriptions.aries.1":
      "Une rencontre inattendue pourrait bouleverser vos émotions. Restez attentif, cette personne pourrait marquer votre journée.",
    "horoscope.data.descriptions.aries.2":
      "Votre enthousiasme communicatif attire l’attention de votre entourage. Faites preuve de patience pour éviter les malentendus.",
    "horoscope.data.descriptions.aries.3":
      "Au travail, une opportunité pourrait se présenter. Analysez-la soigneusement avant de prendre une décision.",
    "horoscope.data.descriptions.aries.4":
      "Attention aux tensions dans vos relations proches. Gardez votre calme et privilégiez le dialogue pour éviter les conflits.",
    "horoscope.data.descriptions.aries.6":
      "Votre spontanéité est un atout, mais évitez les excès ou les décisions impulsives qui pourraient vous créer des problèmes.",
    "horoscope.data.descriptions.aries.7":
      "Une idée originale pourrait vous apporter succès et reconnaissance. N’hésitez pas à la partager et à la concrétiser.",
    "horoscope.data.descriptions.aries.8":
      "Une vérité cachée pourrait se révéler. Restez attentif et utilisez cette information à bon escient.",
    "horoscope.data.descriptions.aries.9":
      "Vos efforts constants commencent à porter leurs fruits. C’est le moment de récolter les résultats de votre travail.",
    "horoscope.data.descriptions.aries.10":
      "Votre assurance naturelle attire la confiance des autres. Profitez-en pour consolider vos relations personnelles et professionnelles.",
    "horoscope.data.descriptions.aries.11":
      "Une surprise agréable pourrait illuminer votre journée, que ce soit une rencontre, un message ou un événement positif.",
    "horoscope.data.descriptions.aries.12":
      "Vos liens amicaux ou familiaux sont renforcés. Profitez de ces moments pour créer des souvenirs précieux.",
    "horoscope.data.descriptions.aries.13":
      "Votre intuition est particulièrement fine aujourd’hui. Suivez vos ressentis pour prendre de bonnes décisions.",
    "horoscope.data.descriptions.aries.14":
      "Une énergie positive vous accompagne toute la journée. Profitez-en pour avancer avec confiance et réaliser vos ambitions.",
    "horoscope.data.descriptions.taurus.0":
      "La stabilité que vous recherchez se manifeste enfin dans votre vie. Profitez de cette période de sérénité pour savourer les plaisirs simples.",
    "horoscope.data.descriptions.taurus.1":
      "Une rencontre prometteuse pourrait se produire aujourd'hui, apportant une belle complicité et des émotions positives à partager.",
    "horoscope.data.descriptions.taurus.2":
      "Vénus vous apporte douceur et harmonie dans vos relations. C'est un jour parfait pour cultiver l'amour et l'amitié.",
    "horoscope.data.descriptions.taurus.3":
      "Votre patience et votre persévérance portent leurs fruits. Les résultats de vos efforts passés se concrétisent aujourd'hui.",
    "horoscope.data.descriptions.taurus.4":
      "Les relations familiales sont particulièrement harmonieuses. Profitez de ce moment pour renforcer les liens avec ceux qui vous sont chers.",
    "horoscope.data.descriptions.taurus.5":
      "Ne négligez pas votre bien-être physique, prenez le temps de vous détendre et de faire de l'exercice.",
    "horoscope.data.descriptions.taurus.6":
      "Vos talents artistiques sont mis en lumière aujourd'hui, et vous aurez l'occasion de les exprimer pleinement dans vos projets personnels ou professionnels.",
    "horoscope.data.descriptions.taurus.7":
      "C'est le moment idéal pour concrétiser vos projets à long terme, en mettant en place les étapes nécessaires pour atteindre vos objectifs avec succès.",
    "horoscope.data.descriptions.taurus.8":
      "Votre sens pratique et votre discernement vous permettent d'éviter de nombreux pièges et de prendre des décisions judicieuses dans vos affaires quotidiennes.",
    "horoscope.data.descriptions.taurus.9":
      "Une période de prospérité matérielle s'annonce, offrant des opportunités de gains financiers et de stabilité économique si vous restez attentif.",
    "horoscope.data.descriptions.taurus.10":
      "Votre fidélité et votre loyauté en amitié sont reconnues et appréciées par votre entourage, créant des liens encore plus forts et harmonieux.",
    "horoscope.data.descriptions.taurus.11":
      "Les plaisirs simples de la vie vous apportent une grande satisfaction et contribuent à votre bien-être émotionnel et mental aujourd'hui.",
    "horoscope.data.descriptions.taurus.12":
      "Votre stabilité émotionnelle rassure votre entourage, et vous êtes perçu comme un point de référence fiable et apaisant pour ceux qui vous entourent.",
    "horoscope.data.descriptions.taurus.13":
      "C'est un jour idéal pour les activités en pleine nature, qui vous permettront de vous ressourcer, de prendre du recul et de retrouver votre énergie.",
    "horoscope.data.descriptions.taurus.14":
      "Vos efforts passés commencent enfin à être récompensés, et vous constaterez que votre persévérance porte ses fruits dans vos projets et vos relations.",
    "horoscope.data.descriptions.gemini.0":
      "Votre curiosité naturelle vous mène vers de merveilleuses découvertes. Restez ouvert aux nouvelles rencontres et aux idées innovantes.",
    "horoscope.data.descriptions.gemini.1":
      "Des opportunités professionnelles se présentent. Osez proposer vos idées innovantes, elles seront bien accueillies.",
    "horoscope.data.descriptions.gemini.2":
      "Mercure stimule votre intelligence et votre créativité. C'est le jour idéal pour communiquer, écrire ou apprendre quelque chose de nouveau.",
    "horoscope.data.descriptions.gemini.3":
      "Votre capacité à vous adapter est remarquable aujourd’hui, profitez-en pour explorer de nouvelles opportunités qui s’offrent à vous.",
    "horoscope.data.descriptions.gemini.4":
      "Soyez attentif à votre entourage, certaines personnes pourraient avoir des informations cruciales à partager avec vous.",
    "horoscope.data.descriptions.gemini.5":
      "Aujourd'hui, votre esprit est vif et curieux, mais attention aux malentendus ou aux petites disputes qui pourraient surgir autour de vous.",
    "horoscope.data.descriptions.gemini.6":
      "Une surprise agréable pourrait illuminer votre journée, que ce soit une rencontre, un message ou une idée inspirante.",
    "horoscope.data.descriptions.gemini.7":
      "Votre aisance à communiquer attire l'attention aujourd'hui, mais attention à ne pas révéler trop d'informations ou à provoquer des malentendus.",
    "horoscope.data.descriptions.gemini.8":
      "Une conversation inattendue change votre point de vue et ouvre de nouvelles perspectives dans vos relations ou vos projets.",
    "horoscope.data.descriptions.gemini.9":
      "Votre polyvalence vous permet de jongler avec plusieurs projets à la fois, sans perdre en efficacité ni en créativité.",
    "horoscope.data.descriptions.gemini.10":
      "Les nouvelles technologies vous ouvrent de nouveaux horizons et facilitent vos échanges ou vos projets innovants.",
    "horoscope.data.descriptions.gemini.11":
      "Votre esprit vif et votre humour détendent l'atmosphère, attirant les autres vers vous avec légèreté et charisme.",
    "horoscope.data.descriptions.gemini.12":
      "C'est un moment parfait pour apprendre quelque chose de nouveau et enrichir vos connaissances ou vos compétences.",
    "horoscope.data.descriptions.gemini.13":
      "Vos réseaux sociaux et vos contacts vous apportent aujourd'hui des opportunités inattendues et profitables.",
    "horoscope.data.descriptions.gemini.14":
      "Faites attention aux confidences : une amitié pourrait être mise à l'épreuve par un malentendu ou un secret révélé.",
    "horoscope.data.descriptions.cancer.0":
      "Votre intuition est particulièrement développée aujourd'hui. Suivez votre cœur, il vous guidera vers les bonnes décisions.",
    "horoscope.data.descriptions.cancer.1":
      "Cette journée pourrait vous donner le tournis. Ne vous laissez pas submerger par de petites contrariétés. Une énergie intérieure vous soutient positivement, alors ménagez votre système nerveux et offrez-vous une pause hors du quotidien !",
    "horoscope.data.descriptions.cancer.2":
      "La famille et les amis jouent un rôle clé dans votre épanouissement aujourd'hui. Soyez à l'écoute et offrez votre soutien.",
    "horoscope.data.descriptions.cancer.3":
      "Un petit moment de relaxation pourrait faire des merveilles pour votre énergie. Pensez à méditer ou à prendre un bain apaisant.",
    "horoscope.data.descriptions.cancer.4":
      "La Lune illumine votre sensibilité et renforce vos liens familiaux. C'est un moment privilégié pour exprimer vos sentiments.",
    "horoscope.data.descriptions.cancer.5":
      "Votre bienveillance naturelle attire les confidences et renforce vos amitiés. Vous êtes un refuge pour ceux qui vous entourent.",
    "horoscope.data.descriptions.cancer.6":
      "C'est un jour parfait pour exprimer vos émotions et partager vos sentiments avec sincérité, ce qui renforcera vos relations.",
    "horoscope.data.descriptions.cancer.7":
      "Votre empathie naturelle vous permet de comprendre profondément les autres et de leur offrir un soutien précieux.",
    "horoscope.data.descriptions.cancer.8":
      "Vos relations sont placées sous le signe de l'amitié et de la complicité aujourd'hui. Cherchez l'écoute et le soutien de votre entourage, tout en restant attentif à leurs besoins comme aux vôtres, sans les négliger.",
    "horoscope.data.descriptions.cancer.9":
      "Votre foyer se transforme en un véritable havre de paix et de bonheur, propice au repos et à la sérénité.",
    "horoscope.data.descriptions.cancer.10":
      "Une intuition forte vous guide vers la bonne décision, même face à des situations complexes ou incertaines.",
    "horoscope.data.descriptions.cancer.11":
      "Vos souvenirs d'enfance vous inspirent positivement et vous rappellent les valeurs essentielles qui vous motivent.",
    "horoscope.data.descriptions.cancer.12":
      "On vous demandera de faire preuve de diplomatie, il y a du positif à en extraire pour vous. C'est à travers vos loisirs préférés que vous trouverez matière à vous détendre. Laissez vos soucis au vestiaire.",
    "horoscope.data.descriptions.cancer.13":
      "Vos liens avec de nouvelles connaissances combleront le vide et les manques que vous ressentez. Votre goût prononcé pour les bonnes choses risque de vous faire commettre quelques excès, allez-y doucement.",
    "horoscope.data.descriptions.cancer.14":
      "Une réconciliation familiale apporte une profonde harmonie et installe un climat de paix dans votre entourage.",
    "horoscope.data.descriptions.leo.0":
      "Votre magnétisme attire les regards aujourd’hui, surtout en amour. Si vous êtes en couple, attention à ne pas susciter la jalousie. Au travail, vos idées brillantes séduisent, mais prenez le temps de bien les défendre. Une reconnaissance inattendue pourrait flatter votre ego.",
    "horoscope.data.descriptions.leo.1":
      "Une opportunité professionnelle se présente, mais elle demande du courage et un engagement total. Ne laissez pas vos peurs saboter votre élan. Côté personnel, un proche pourrait avoir besoin de votre soutien. Soyez attentif aux signaux autour de vous.",
    "horoscope.data.descriptions.leo.2":
      "Dans votre famille, une discussion importante éclaire une situation confuse. Même si les mots peuvent être durs, ils permettront d’avancer. En amour, une sincérité désarmante sera votre meilleure alliée. La vérité finira par renforcer vos liens.",
    "horoscope.data.descriptions.leo.3":
      "Une rencontre amicale pourrait se transformer en une complicité solide. Vous avez besoin d’entourer votre vie de personnes vraies et bienveillantes. Au travail, votre créativité vous aide à surmonter un obstacle. Laissez vos intuitions guider vos choix.",
    "horoscope.data.descriptions.leo.4":
      "La chance vous sourit aujourd’hui, mais seulement si vous osez la provoquer. Une surprise agréable peut se manifester dans votre vie sentimentale. Côté finances, évitez les dépenses impulsives. Un petit geste de générosité pourrait vous rapporter gros plus tard.",
    "horoscope.data.descriptions.leo.5":
      "Vous débordez d’énergie et d’enthousiasme, mais votre corps a aussi besoin de repos. Ne négligez pas votre équilibre intérieur. Un projet qui vous tient à cœur commence à prendre forme. Laissez vos proches partager votre joie.",
    "horoscope.data.descriptions.leo.6":
      "La jalousie d’une personne de votre entourage pourrait troubler votre tranquillité. Restez vigilant sans céder à la méfiance excessive. En amour, privilégiez la tendresse plutôt que la confrontation. Votre lumière intérieure est votre meilleure protection.",
    "horoscope.data.descriptions.leo.7":
      "Des imprévus financiers risquent de vous déstabiliser, mais rien d’insurmontable. Prenez le temps d’analyser avant de réagir. Dans vos relations, la sincérité d’un ami vous aidera à garder le cap. Un soutien extérieur pourrait vous surprendre positivement.",
    "horoscope.data.descriptions.leo.8":
      "Les célibataires pourraient croiser une personne qui réveille leur cœur. Pour les couples, un moment de complicité renforce l’union. Au travail, vos efforts constants commencent enfin à payer. La journée est porteuse d’espoir et d’élan nouveau.",
    "horoscope.data.descriptions.leo.9":
      "Votre travail est remarqué et pourrait vous valoir une belle opportunité, mais un rival jaloux pourrait chercher à vous freiner. Ne laissez pas les critiques entamer votre confiance. Côté personnel, prenez du temps pour souffler et savourer vos petites victoires.",
    "horoscope.data.descriptions.leo.10":
      "La chaleur d’un moment en famille ou avec vos proches vous ressource profondément. Vous réalisez que votre bonheur passe par ces instants simples. En amour, une parole tendre guérit une tension récente. La sérénité revient doucement.",
    "horoscope.data.descriptions.leo.11":
      "Le retour d’un vieil ami ou d’une personne du passé réveille de beaux souvenirs. Ce lien peut se transformer en un projet constructif ou en un soutien inattendu. En amour, des sentiments enfouis remontent à la surface. C’est une journée riche en émotions.",
    "horoscope.data.descriptions.leo.12":
      "Une rencontre fortuite pourrait bouleverser vos habitudes et ouvrir une porte inattendue. Laissez la surprise opérer sans chercher à tout contrôler. Professionnellement, une proposition originale peut émerger. Restez ouvert aux synchronicités.",
    "horoscope.data.descriptions.leo.13":
      "Votre désir de reconnaissance est fort aujourd’hui, mais veillez à ne pas en demander trop à vos proches ou collègues. En amour, un geste tendre vaut parfois mieux que mille discours. Vous inspirez, mais veillez à rester authentique.",
    "horoscope.data.descriptions.leo.14":
      "Une décision importante s’impose, et votre intuition vous guidera vers la bonne voie. Ne vous laissez pas influencer par les avis contradictoires. Dans vos relations, la franchise reste la clé. La clarté que vous trouverez aujourd’hui marquera un tournant.",
    "horoscope.data.descriptions.virgo.0":
      "Votre sens du détail est aiguisé aujourd’hui, ce qui vous aide à résoudre un problème délicat. En amour, évitez d’être trop critique, car votre exigence peut blesser. Côté finances, une gestion prudente porte déjà ses fruits.",
    "horoscope.data.descriptions.virgo.1":
      "Une personne de votre entourage pourrait chercher à tester votre patience. Gardez votre calme et ne tombez pas dans le piège des conflits inutiles. Votre sagesse naturelle vous permettra de sortir gagnant de cette situation.",
    "horoscope.data.descriptions.virgo.2":
      "L’amour prend une place importante aujourd’hui. Si vous êtes célibataire, une rencontre prometteuse pourrait éveiller votre curiosité. En couple, privilégiez les petites attentions qui consolident vos liens au quotidien.",
    "horoscope.data.descriptions.virgo.3":
      "Votre organisation et votre sérieux impressionnent vos collègues. Une nouvelle responsabilité pourrait vous être confiée. Même si cela demande un effort supplémentaire, cette reconnaissance sera bénéfique à long terme.",
    "horoscope.data.descriptions.virgo.4":
      "Votre sensibilité est mise en avant aujourd’hui. Un proche pourrait avoir besoin de votre écoute. Montrez de l’empathie, mais ne portez pas tous les fardeaux des autres. Prenez aussi soin de votre propre équilibre.",
    "horoscope.data.descriptions.virgo.5":
      "Une opportunité financière ou matérielle se profile. Mais attention aux décisions prises dans la précipitation. Analysez chaque détail avant de vous engager, votre prudence habituelle sera votre meilleure alliée.",
    "horoscope.data.descriptions.virgo.6":
      "Votre esprit critique est fort aujourd’hui, mais il peut créer des tensions avec vos proches. Transformez cette énergie en conseils constructifs plutôt qu’en reproches. Votre clarté sera alors perçue comme un soutien.",
    "horoscope.data.descriptions.virgo.7":
      "Une petite dispute pourrait troubler votre quotidien, mais elle aura le mérite de clarifier une situation restée floue. Acceptez ce moment comme une étape nécessaire pour avancer vers des relations plus sincères.",
    "horoscope.data.descriptions.virgo.8":
      "Vous ressentez le besoin de faire un tri, que ce soit dans vos affaires, vos relations ou vos habitudes. Cette démarche de purification vous permettra d’y voir plus clair et de repartir sur de meilleures bases.",
    "horoscope.data.descriptions.virgo.9":
      "La chance vous accompagne aujourd’hui, mais seulement si vous osez sortir de votre zone de confort. Une rencontre ou une idée pourrait ouvrir des perspectives nouvelles et positives. Ne laissez pas vos doutes freiner cet élan.",
    "horoscope.data.descriptions.virgo.10":
      "Votre sens de la loyauté est remarqué et apprécié par vos amis. Mais prenez garde à ne pas vous oublier en voulant trop donner. Vos besoins personnels sont tout aussi importants que ceux de votre entourage.",
    "horoscope.data.descriptions.virgo.11":
      "Un imprévu au travail ou à la maison vous oblige à revoir vos plans. Même si cela vous dérange, cette adaptation vous apportera finalement une solution plus efficace. Faites confiance au processus.",
    "horoscope.data.descriptions.virgo.12":
      "L’amour pourrait vous surprendre là où vous ne l’attendiez pas. Restez attentif aux signes et aux gestes discrets autour de vous. Pour les couples, un moment tendre renforce vos liens et ranime la flamme.",
    "horoscope.data.descriptions.virgo.13":
      "Votre esprit est en ébullition aujourd’hui, rempli de nouvelles idées. Canalisez cette créativité en projets concrets plutôt qu’en réflexions trop nombreuses. Un pas après l’autre, vos efforts porteront leurs fruits.",
    "horoscope.data.descriptions.virgo.14":
      "Une révélation ou une confidence pourrait bouleverser vos certitudes. Même si la vérité est parfois difficile à entendre, elle vous libérera d’un poids. Accueillez ce changement avec sagesse et ouverture.",
    "horoscope.data.descriptions.libra.0":
      "Votre charme naturel attire les regards aujourd’hui. En amour, une rencontre pourrait éveiller votre cœur. Si vous êtes en couple, un moment romantique apporte équilibre et complicité.",
    "horoscope.data.descriptions.libra.1":
      "Un différend pourrait surgir dans votre entourage. Faites preuve de diplomatie et évitez les jugements hâtifs. Votre capacité à rester juste sera une force pour rétablir l’harmonie.",
    "horoscope.data.descriptions.libra.2":
      "Vos talents relationnels brillent aujourd’hui. Profitez-en pour renforcer vos liens amicaux et professionnels. Une conversation sincère pourrait ouvrir la porte à une belle opportunité.",
    "horoscope.data.descriptions.libra.3":
      "Une décision importante se présente à vous. Ne laissez pas l’hésitation vous bloquer. Écoutez votre intuition et pesez le pour et le contre avec sagesse, la réponse viendra naturellement.",
    "horoscope.data.descriptions.libra.4":
      "Votre équilibre intérieur est mis à l’épreuve. Trop de responsabilités risquent de vous fatiguer. Prenez du recul, déléguez si possible, et accordez-vous un moment rien que pour vous.",
    "horoscope.data.descriptions.libra.5":
      "Une surprise agréable pourrait illuminer votre journée, que ce soit une attention d’un proche ou une opportunité inattendue. Accueillez-la avec gratitude et optimisme.",
    "horoscope.data.descriptions.libra.6":
      "Un secret ou une vérité cachée pourrait être révélé aujourd’hui. Même si cela vous déstabilise, cette clarté vous permettra de mieux avancer et de renforcer vos choix futurs.",
    "horoscope.data.descriptions.libra.7":
      "Vous ressentez le besoin de renforcer vos liens familiaux. Un moment partagé avec vos proches vous apporte chaleur et réconfort. C’est une journée idéale pour exprimer votre affection.",
    "horoscope.data.descriptions.libra.8":
      "Au travail, votre sens de la coopération est apprécié. Mais attention à ne pas vous effacer devant les autres. Faites entendre vos idées, elles méritent d’être reconnues.",
    "horoscope.data.descriptions.libra.9":
      "Votre cœur pourrait être mis à l’épreuve par des doutes ou des hésitations. Prenez le temps de clarifier vos sentiments. La sincérité, même délicate, est le chemin de la paix intérieure.",
    "horoscope.data.descriptions.libra.10":
      "Un regain de confiance vous pousse à aller de l’avant. C’est le moment idéal pour lancer un projet personnel ou prendre une initiative audacieuse. Osez, les astres vous soutiennent.",
    "horoscope.data.descriptions.libra.11":
      "Une rencontre inspirante pourrait transformer votre vision d’une situation. Soyez attentif aux conseils ou aux signes subtils autour de vous, ils portent en eux des réponses précieuses.",
    "horoscope.data.descriptions.libra.12":
      "Votre quête d’harmonie peut être perturbée par une personne jalouse ou envieuse. Ne vous laissez pas atteindre par ces énergies négatives. Restez centré sur vos objectifs et votre lumière.",
    "horoscope.data.descriptions.libra.13":
      "La chance semble vous sourire aujourd’hui. Une opportunité financière ou relationnelle se dessine. Restez ouvert et saisissez-la, elle pourrait marquer un tournant positif dans votre vie.",
    "horoscope.data.descriptions.libra.14":
      "Votre besoin d’équilibre vous guide vers de nouveaux choix. Que ce soit en amour, au travail ou dans vos amitiés, vous trouvez enfin le courage de poser des limites justes et nécessaires.",
    "horoscope.data.descriptions.scorpio.0":
      "Votre intuition est particulièrement forte aujourd’hui. Suivez vos pressentiments, ils vous guideront vers des choix justes, notamment en amour et en amitié.",
    "horoscope.data.descriptions.scorpio.1":
      "Une tension pourrait éclater dans votre entourage. Ne laissez pas la jalousie ou les rancunes gâcher vos relations, misez sur la franchise pour apaiser les esprits.",
    "horoscope.data.descriptions.scorpio.2":
      "Vous pourriez croiser une personne intrigante qui éveille en vous curiosité et émotions. Cette rencontre pourrait bouleverser vos certitudes.",
    "horoscope.data.descriptions.scorpio.3":
      "Votre détermination impressionne. C’est une journée idéale pour franchir un cap professionnel ou clarifier une situation qui traîne depuis trop longtemps.",
    "horoscope.data.descriptions.scorpio.4":
      "Un secret bien gardé pourrait voir le jour. Même si cela vous surprend, cette révélation vous aidera à avancer et à comprendre davantage votre entourage.",
    "horoscope.data.descriptions.scorpio.5":
      "Votre intensité attire autant qu’elle déstabilise. Utilisez cette énergie pour séduire ou renforcer vos liens affectifs, mais évitez les excès de possessivité.",
    "horoscope.data.descriptions.scorpio.6":
      "Une proposition inattendue pourrait se présenter. Avant de dire oui, analysez les dessous de la situation : tout n’est pas toujours ce qu’il paraît.",
    "horoscope.data.descriptions.scorpio.7":
      "Vous ressentez le besoin de vous isoler pour réfléchir. Cette introspection vous permettra de clarifier vos priorités et de retrouver votre équilibre intérieur.",
    "horoscope.data.descriptions.scorpio.8":
      "Un projet ou une idée que vous portiez depuis longtemps trouve enfin un élan favorable. Votre persévérance commence à porter ses fruits.",
    "horoscope.data.descriptions.scorpio.9":
      "Attention aux malentendus amoureux. Vos émotions intenses peuvent brouiller votre communication. Restez calme et exprimez vos ressentis avec douceur.",
    "horoscope.data.descriptions.scorpio.10":
      "Votre magnétisme est puissant aujourd’hui. Vous pourriez captiver l’attention de quelqu’un qui jouera un rôle important dans vos projets futurs.",
    "horoscope.data.descriptions.scorpio.11":
      "La jalousie ou la compétition d’une personne de votre entourage pourrait se révéler. Protégez votre énergie et ne vous laissez pas entraîner dans des conflits inutiles.",
    "horoscope.data.descriptions.scorpio.12":
      "Votre passion est un moteur incroyable, mais veillez à ne pas vous épuiser. Accordez-vous des pauses pour préserver votre équilibre émotionnel et physique.",
    "horoscope.data.descriptions.scorpio.13":
      "Une bonne nouvelle pourrait éclairer votre journée, que ce soit sur le plan professionnel, affectif ou financier. Accueillez-la avec confiance.",
    "horoscope.data.descriptions.scorpio.14":
      "Votre pouvoir de transformation est à son apogée. Profitez de cette énergie pour tourner la page d’un chapitre difficile et entamer un nouveau départ plus lumineux.",
    "horoscope.data.descriptions.sagittarius.0":
      "Votre optimisme naturel illumine votre journée. Profitez-en pour entreprendre quelque chose de nouveau et partager votre joie avec vos proches.",
    "horoscope.data.descriptions.sagittarius.1":
      "Une rencontre inattendue pourrait éveiller votre curiosité et vos émotions. Soyez ouvert aux nouvelles personnes autour de vous, elles pourraient vous surprendre.",
    "horoscope.data.descriptions.sagittarius.2":
      "Votre esprit d’aventure vous pousse à explorer de nouvelles idées ou lieux. Cependant, évitez de vous disperser, concentrez-vous sur ce qui compte vraiment.",
    "horoscope.data.descriptions.sagittarius.3":
      "Au travail, une opportunité vous est offerte. Saisissez-la, mais vérifiez les détails pour éviter les malentendus ou les déceptions.",
    "horoscope.data.descriptions.sagittarius.4":
      "Vos amis comptent sur votre énergie positive. Une dispute pourrait surgir, mais votre diplomatie naturelle permet de rétablir l’harmonie rapidement.",
    "horoscope.data.descriptions.sagittarius.5":
      "L’amour est favorisé aujourd’hui. Un geste tendre ou un mot sincère pourrait renforcer vos liens ou provoquer une rencontre marquante.",
    "horoscope.data.descriptions.sagittarius.6":
      "Vous pourriez être tenté par des excès ou des dépenses impulsives. Gardez votre équilibre et évitez les regrets futurs.",
    "horoscope.data.descriptions.sagittarius.7":
      "Votre créativité et vos idées originales sont à l’honneur. Exprimez-les pleinement, elles pourraient inspirer votre entourage et ouvrir de nouvelles portes.",
    "horoscope.data.descriptions.sagittarius.8":
      "Une vérité cachée ou une confidence pourrait être révélée. Restez attentif et ne laissez pas les malentendus perturber vos relations.",
    "horoscope.data.descriptions.sagittarius.9":
      "Une journée propice aux voyages ou aux apprentissages. Profitez-en pour élargir vos horizons et découvrir quelque chose de nouveau sur vous-même.",
    "horoscope.data.descriptions.sagittarius.10":
      "Votre humour et votre légèreté attirent les autres. Partagez ces moments de bonne humeur, mais restez sincère pour éviter les faux-semblants.",
    "horoscope.data.descriptions.sagittarius.11":
      "Un challenge ou un obstacle pourrait surgir. Votre persévérance et votre enthousiasme vous permettront de le surmonter avec succès.",
    "horoscope.data.descriptions.sagittarius.12":
      "Attention aux tensions dans le cercle familial. Prenez le temps d’écouter et de comprendre les besoins de chacun pour éviter les conflits inutiles.",
    "horoscope.data.descriptions.sagittarius.13":
      "Votre intuition est renforcée aujourd’hui. Suivez vos ressentis dans vos décisions, surtout en amour et en amitié.",
    "horoscope.data.descriptions.sagittarius.14":
      "Une énergie favorable vous accompagne pour réaliser vos projets. Profitez de ce soutien cosmique pour faire avancer vos ambitions et nourrir votre bonheur.",
    "horoscope.data.descriptions.capricorn.0":
      "Votre sérieux et votre persévérance attirent l’admiration aujourd’hui. C’est le moment idéal pour avancer sur un projet important.",
    "horoscope.data.descriptions.capricorn.1":
      "Une personne de votre entourage pourrait vous surprendre par ses réactions. Restez attentif et ne tirez pas de conclusions hâtives.",
    "horoscope.data.descriptions.capricorn.2":
      "Votre sens de l’organisation vous permet de gérer vos responsabilités avec efficacité. Mais n’oubliez pas de prendre du temps pour vous détendre.",
    "horoscope.data.descriptions.capricorn.3":
      "Une opportunité professionnelle ou financière se présente. Analysez-la avec soin avant de prendre votre décision.",
    "horoscope.data.descriptions.capricorn.4":
      "Votre loyauté et votre fidélité sont appréciées, mais veillez à ne pas vous laisser exploiter. Posez des limites claires si nécessaire.",
    "horoscope.data.descriptions.capricorn.5":
      "Un moment agréable avec un proche pourrait raviver des liens affectifs ou familiaux. Profitez de cette complicité pour renforcer votre relation.",
    "horoscope.data.descriptions.capricorn.6":
      "Vous pourriez être tenté par des excès ou des dépenses impulsives. Restez prudent pour éviter les regrets futurs.",
    "horoscope.data.descriptions.capricorn.7":
      "Une idée créative ou un projet que vous aviez mis de côté trouve enfin un élan favorable. N’hésitez pas à le concrétiser.",
    "horoscope.data.descriptions.capricorn.8":
      "Une vérité cachée ou un secret pourrait être révélé. Prenez le temps de comprendre les implications avant de réagir.",
    "horoscope.data.descriptions.capricorn.9":
      "Vos efforts constants portent leurs fruits aujourd’hui. C’est le moment de récolter les résultats de votre travail et de vos sacrifices.",
    "horoscope.data.descriptions.capricorn.10":
      "Votre sérieux inspire confiance et respect. Profitez-en pour montrer vos compétences et faire valoir vos talents.",
    "horoscope.data.descriptions.capricorn.11":
      "Attention aux tensions dans votre cercle professionnel ou familial. Gardez votre calme et privilégiez le dialogue pour désamorcer les conflits.",
    "horoscope.data.descriptions.capricorn.12":
      "Votre intuition est particulièrement fine. Suivez vos ressentis pour prendre des décisions justes, surtout en amour et en amitié.",
    "horoscope.data.descriptions.capricorn.13":
      "Une journée propice aux contacts et aux échanges enrichissants. Une rencontre ou une conversation pourrait apporter des perspectives nouvelles.",
    "horoscope.data.descriptions.capricorn.14":
      "Votre persévérance et votre rigueur vous aident à surmonter les obstacles. Une énergie favorable accompagne vos actions, profitez-en pour avancer.",
    "horoscope.data.descriptions.aquarius.0":
      "Votre originalité et votre créativité sont mises en avant aujourd’hui. N’hésitez pas à partager vos idées, elles pourraient inspirer votre entourage.",
    "horoscope.data.descriptions.aquarius.1":
      "Une rencontre inattendue pourrait éveiller votre curiosité et vos émotions. Soyez attentif, cette personne pourrait marquer votre journée.",
    "horoscope.data.descriptions.aquarius.2":
      "Votre esprit d’innovation est à son apogée. Profitez-en pour expérimenter de nouvelles méthodes dans votre travail ou vos projets personnels.",
    "horoscope.data.descriptions.aquarius.3":
      "Attention aux malentendus avec un proche. Écoutez attentivement avant de réagir, la clarté et la patience éviteront les conflits inutiles.",
    "horoscope.data.descriptions.aquarius.4":
      "Une opportunité surprenante pourrait se présenter. Analysez-la avant de vous engager, tout n’est pas toujours ce qu’il semble.",
    "horoscope.data.descriptions.aquarius.5":
      "Votre énergie communicative attire l’attention des autres. C’est le moment idéal pour renforcer vos liens amicaux ou professionnels.",
    "horoscope.data.descriptions.aquarius.6":
      "Un moment de solitude pourrait vous permettre de recharger vos batteries et de réfléchir à vos priorités. Écoutez vos besoins intérieurs.",
    "horoscope.data.descriptions.aquarius.7":
      "Vos idées originales pourraient provoquer l’admiration… mais aussi un peu de jalousie. Restez concentré sur vos objectifs et ignorez les distractions.",
    "horoscope.data.descriptions.aquarius.8":
      "Une surprise agréable pourrait égayer votre journée, que ce soit un message, un geste ou un projet qui prend forme.",
    "horoscope.data.descriptions.aquarius.9":
      "Votre sens de la justice et de l’équilibre est sollicité aujourd’hui. Aidez à apaiser les tensions autour de vous, votre rôle est important.",
    "horoscope.data.descriptions.aquarius.10":
      "Attention aux excès ou aux décisions impulsives. Prenez le temps de réfléchir et de peser le pour et le contre avant d’agir.",
    "horoscope.data.descriptions.aquarius.11":
      "Une vérité cachée ou un secret pourrait se révéler. Restez calme et utilisez cette information pour améliorer vos relations ou vos projets.",
    "horoscope.data.descriptions.aquarius.12":
      "Vos relations amicales ou amoureuses sont favorisées. Un geste sincère ou un mot tendre pourrait renforcer vos liens et créer de beaux souvenirs.",
    "horoscope.data.descriptions.aquarius.13":
      "Une idée ou un projet ancien pourrait renaître sous un nouvel éclairage. C’est le moment de lui donner vie et de concrétiser vos aspirations.",
    "horoscope.data.descriptions.aquarius.14":
      "Votre énergie et votre intuition vous guident vers des choix positifs. Profitez de cette journée pour avancer avec confiance et audace.",
    "horoscope.data.descriptions.pisces.0":
      "Votre sensibilité est votre force aujourd’hui. Écoutez vos émotions, elles vous guideront dans vos relations et vos choix.",
    "horoscope.data.descriptions.pisces.1":
      "Une personne chère pourrait vous surprendre par sa franchise. Restez ouvert et attentif pour éviter les malentendus.",
    "horoscope.data.descriptions.pisces.2":
      "Votre créativité est à son apogée. Profitez-en pour exprimer vos idées artistiques ou originales dans vos projets.",
    "horoscope.data.descriptions.pisces.3":
      "Attention aux décisions impulsives, surtout en matière financière. Réfléchissez avant de vous engager.",
    "horoscope.data.descriptions.pisces.4":
      "Vos relations amicales sont favorisées. Un geste ou un mot sincère pourrait renforcer vos liens et apporter de la joie.",
    "horoscope.data.descriptions.pisces.5":
      "Une journée propice à l’introspection. Prenez du temps pour vous reconnecter à vos besoins et à vos désirs profonds.",
    "horoscope.data.descriptions.pisces.6":
      "Une opportunité inattendue pourrait se présenter. Évaluez-la avec discernement avant de vous lancer.",
    "horoscope.data.descriptions.pisces.7":
      "Votre intuition est particulièrement fine aujourd’hui. Faites-lui confiance pour guider vos décisions personnelles et professionnelles.",
    "horoscope.data.descriptions.pisces.8":
      "Un proche pourrait chercher votre soutien. Écoutez-le attentivement et offrez-lui votre empathie sans vous oublier.",
    "horoscope.data.descriptions.pisces.9":
      "Une surprise romantique ou affective pourrait égayer votre journée. Soyez ouvert aux signes et aux gestes d’affection.",
    "horoscope.data.descriptions.pisces.10":
      "Des tensions mineures pourraient surgir. Restez calme et privilégiez la communication pour éviter les conflits.",
    "horoscope.data.descriptions.pisces.11":
      "Votre sens de la compassion attire les autres vers vous. Profitez-en pour créer des liens sincères et durables.",
    "horoscope.data.descriptions.pisces.12":
      "Un projet ancien pourrait retrouver un nouvel élan. C’est le moment idéal pour concrétiser vos idées et ambitions.",
    "horoscope.data.descriptions.pisces.13":
      "Vos émotions sont intenses et enrichissantes aujourd’hui. Canalisez-les pour renforcer vos relations et vos initiatives.",
    "horoscope.data.descriptions.pisces.14":
      "Une énergie positive vous accompagne tout au long de la journée. Suivez vos intuitions et laissez votre cœur guider vos choix.",

    // Messages de fin variés
    "horoscope.message.var1":
      "{genderText} {name}, en tant que {zodiacSign}, tu as cette belle énergie qui attire les bonnes choses. Fais confiance aux astres et à ton intuition aujourd'hui !",
    "horoscope.message.var2":
      "{genderText} {name}, ton signe {zodiacSign} t'apporte une énergie positive aujourd'hui. Laisse-toi guider par les étoiles !",
    "horoscope.message.var3":
      "Cher {name}, les astres te sourient aujourd'hui. Profite de cette belle énergie cosmique qui t'entoure !",
    "horoscope.message.var4":
      "{genderText} {name}, votre {zodiacSign} rayonne aujourd'hui. Que cette journée vous apporte joie et sérénité !",
    "horoscope.message.var5":
      "Les étoiles vous bénissent aujourd'hui, {name}. En tant que {zodiacSign}, vous êtes en parfaite harmonie avec l'univers !",

    // Variations pour la compatibilité
    "horoscope.compatibility.var1":
      "Compatibilité : Tu t'entendras particulièrement bien avec les signes {compatibility} aujourd'hui. C'est le moment idéal pour renforcer tes relations !",
    "horoscope.compatibility.var2":
      "Affinités : Les signes {compatibility} vibrent sur la même longueur d'onde que toi aujourd'hui. Profite de cette harmonie !",
    "horoscope.compatibility.var3":
      "Relations privilégiées : {compatibility} seront tes alliés parfaits aujourd'hui. Une belle complicité vous attend !",
    "horoscope.compatibility.var4":
      "Connexions cosmiques : L'énergie des signes {compatibility} s'accorde magnifiquement avec la tienne. Laisse-toi porter par cette synergie !",
    "horoscope.compatibility.var5":
      "Harmonies astrales : {compatibility} partagent tes vibrations aujourd'hui. Ces rencontres pourraient être magiques !",
    "horoscope.compatibility.var6":
      "Complicité stellaire : Les natifs de {compatibility} comprennent intuitivement ton état d'esprit aujourd'hui. Cultive ces liens précieux !",
    "horoscope.compatibility.var7":
      "Synergies planétaires : {compatibility} sont en parfaite résonance avec ton énergie du jour. Une collaboration fructueuse s'annonce !",
    "horoscope.compatibility.var8":
      "Entente céleste : {compatibility} partagent ta vision aujourd'hui. C'est le moment parfait pour approfondir vos échanges !",

    // Variations pour l'humeur
    "horoscope.mood.var1":
      "Ton humeur aujourd'hui : {mood}\nCette énergie va t'accompagner toute la journée. Profite-en pour faire les choses qui te font du bien !",
    "horoscope.mood.var2":
      "État d'esprit du jour : {mood}\nLaisse cette vibration positive guider tes actions et tes décisions aujourd'hui !",
    "horoscope.mood.var3":
      "Énergie dominante : {mood}\nC'est le moment parfait pour canaliser cette force intérieure vers tes projets !",
    "horoscope.mood.var4":
      "Atmosphère cosmique : {mood}\nTu rayonnes de cette belle énergie qui attire toutes les bonnes choses vers toi !",
    "horoscope.mood.var5":
      "Vibration astrale : {mood}\nCette humeur spéciale va colorer ta journée de mille nuances positives !",
    "horoscope.mood.var6":
      "Influence planétaire : {mood}\nEmbrasse cette énergie unique et laisse-la transformer ta journée en quelque chose d'extraordinaire !",

    // Horoscope Data Translations - Moods
    "horoscope.data.moods.Énergique": "Énergique",
    "horoscope.data.moods.Confiant": "Confiant",
    "horoscope.data.moods.Déterminé": "Déterminé",
    "horoscope.data.moods.Passionné": "Passionné",
    "horoscope.data.moods.Optimiste": "Optimiste",
    "horoscope.data.moods.Dynamique": "Dynamique",
    "horoscope.data.moods.Paisible": "Paisible",
    "horoscope.data.moods.Sensuel": "Sensuel",
    "horoscope.data.moods.Stable": "Stable",
    "horoscope.data.moods.Généreux": "Généreux",
    "horoscope.data.moods.Patient": "Patient",
    "horoscope.data.moods.Harmonieux": "Harmonieux",
    "horoscope.data.moods.Curieux": "Curieux",
    "horoscope.data.moods.Communicatif": "Communicatif",
    "horoscope.data.moods.Vif": "Vif",
    "horoscope.data.moods.Sociable": "Sociable",
    "horoscope.data.moods.Adaptable": "Adaptable",
    "horoscope.data.moods.Créatif": "Créatif",
    "horoscope.data.moods.Émotionnel": "Émotionnel",
    "horoscope.data.moods.Protecteur": "Protecteur",
    "horoscope.data.moods.Intuitif": "Intuitif",
    "horoscope.data.moods.Tendre": "Tendre",
    "horoscope.data.moods.Maternel": "Maternel",
    "horoscope.data.moods.Empathique": "Empathique",
    "horoscope.data.moods.Rayonnant": "Rayonnant",
    "horoscope.data.moods.Majestueux": "Majestueux",
    "horoscope.data.moods.Charismatique": "Charismatique",
    "horoscope.data.moods.Théâtral": "Théâtral",
    "horoscope.data.moods.Méthodique": "Méthodique",
    "horoscope.data.moods.Serviable": "Serviable",
    "horoscope.data.moods.Précis": "Précis",
    "horoscope.data.moods.Sage": "Sage",
    "horoscope.data.moods.Analytique": "Analytique",
    "horoscope.data.moods.Perfectionniste": "Perfectionniste",
    "horoscope.data.moods.Raffiné": "Raffiné",
    "horoscope.data.moods.Diplomatique": "Diplomatique",
    "horoscope.data.moods.Équilibré": "Équilibré",
    "horoscope.data.moods.Artistique": "Artistique",
    "horoscope.data.moods.Charmeur": "Charmeur",
    "horoscope.data.moods.Intense": "Intense",
    "horoscope.data.moods.Mystérieux": "Mystérieux",
    "horoscope.data.moods.Transformateur": "Transformateur",
    "horoscope.data.moods.Magnétique": "Magnétique",
    "horoscope.data.moods.Profond": "Profond",
    "horoscope.data.moods.Aventurier": "Aventurier",
    "horoscope.data.moods.Philosophe": "Philosophe",
    "horoscope.data.moods.Libre": "Libre",
    "horoscope.data.moods.Explorateur": "Explorateur",
    "horoscope.data.moods.Enthousiaste": "Enthousiaste",
    "horoscope.data.moods.Ambitieux": "Ambitieux",
    "horoscope.data.moods.Responsable": "Responsable",
    "horoscope.data.moods.Persévérant": "Persévérant",
    "horoscope.data.moods.Discipliné": "Discipliné",
    "horoscope.data.moods.Pragmatique": "Pragmatique",
    "horoscope.data.moods.Visionnaire": "Visionnaire",
    "horoscope.data.moods.Indépendant": "Indépendant",
    "horoscope.data.moods.Humaniste": "Humaniste",
    "horoscope.data.moods.Original": "Original",
    "horoscope.data.moods.Innovateur": "Innovateur",
    "horoscope.data.moods.Altruiste": "Altruiste",
    "horoscope.data.moods.Compassionnel": "Compassionnel",
    "horoscope.data.moods.Spirituel": "Spirituel",
    "horoscope.data.moods.Rêveur": "Rêveur",
    "horoscope.data.moods.Sensible": "Sensible",

    "horoscope.data.colors.Rouge": "Rouge",
    "horoscope.data.colors.Orange vif": "Orange vif",
    "horoscope.data.colors.Bordeaux": "Bordeaux",
    "horoscope.data.colors.Corail": "Corail",
    "horoscope.data.colors.Écarlate": "Écarlate",
    "horoscope.data.colors.Vermillon": "Vermillon",
    "horoscope.data.colors.Vert émeraude": "Vert émeraude",
    "horoscope.data.colors.Rose tendre": "Rose tendre",
    "horoscope.data.colors.Beige doré": "Beige doré",
    "horoscope.data.colors.Terre de Sienne": "Terre de Sienne",
    "horoscope.data.colors.Vert olive": "Vert olive",
    "horoscope.data.colors.Rose poudré": "Rose poudré",
    "horoscope.data.colors.Jaune citron": "Jaune citron",
    "horoscope.data.colors.Bleu ciel": "Bleu ciel",
    "horoscope.data.colors.Argent": "Argent",
    "horoscope.data.colors.Lavande": "Lavande",
    "horoscope.data.colors.Jaune d'or": "Jaune d'or",
    "horoscope.data.colors.Bleu pervenche": "Bleu pervenche",
    "horoscope.data.colors.Blanc nacré": "Blanc nacré",
    "horoscope.data.colors.Bleu océan": "Bleu océan",
    "horoscope.data.colors.Argent lunaire": "Argent lunaire",
    "horoscope.data.colors.Rose pâle": "Rose pâle",
    "horoscope.data.colors.Perle": "Perle",
    "horoscope.data.colors.Bleu laiteux": "Bleu laiteux",
    "horoscope.data.colors.Or": "Or",
    "horoscope.data.colors.Orange solaire": "Orange solaire",
    "horoscope.data.colors.Jaune impérial": "Jaune impérial",
    "horoscope.data.colors.Rouge royal": "Rouge royal",
    "horoscope.data.colors.Doré": "Doré",
    "horoscope.data.colors.Ambre": "Ambre",
    "horoscope.data.colors.Beige naturel": "Beige naturel",
    "horoscope.data.colors.Gris perle": "Gris perle",
    "horoscope.data.colors.Bleu marine": "Bleu marine",
    "horoscope.data.colors.Taupe": "Taupe",
    "horoscope.data.colors.Kaki": "Kaki",
    "horoscope.data.colors.Rose pastel": "Rose pastel",
    "horoscope.data.colors.Vert menthe": "Vert menthe",
    "horoscope.data.colors.Ivoire": "Ivoire",
    "horoscope.data.colors.Lilas": "Lilas",
    "horoscope.data.colors.Bleu poudré": "Bleu poudré",
    "horoscope.data.colors.Rouge bordeaux": "Rouge bordeaux",
    "horoscope.data.colors.Noir profond": "Noir profond",
    "horoscope.data.colors.Pourpre": "Pourpre",
    "horoscope.data.colors.Grenat": "Grenat",
    "horoscope.data.colors.Cramoisi": "Cramoisi",
    "horoscope.data.colors.Brun acajou": "Brun acajou",
    "horoscope.data.colors.Bleu turquoise": "Bleu turquoise",
    "horoscope.data.colors.Violet royal": "Violet royal",
    "horoscope.data.colors.Orange mandarine": "Orange mandarine",
    "horoscope.data.colors.Vert forêt": "Vert forêt",
    "horoscope.data.colors.Indigo": "Indigo",
    "horoscope.data.colors.Cobalt": "Cobalt",
    "horoscope.data.colors.Gris anthracite": "Gris anthracite",
    "horoscope.data.colors.Marron chocolat": "Marron chocolat",
    "horoscope.data.colors.Vert foncé": "Vert foncé",
    "horoscope.data.colors.Bleu nuit": "Bleu nuit",
    "horoscope.data.colors.Sépia": "Sépia",
    "horoscope.data.colors.Vert sapin": "Vert sapin",
    "horoscope.data.colors.Bleu électrique": "Bleu électrique",
    "horoscope.data.colors.Argent métallique": "Argent métallique",
    "horoscope.data.colors.Turquoise": "Turquoise",
    "horoscope.data.colors.Violet": "Violet",
    "horoscope.data.colors.Néon": "Néon",
    "horoscope.data.colors.Cyan": "Cyan",
    "horoscope.data.colors.Vert aqua": "Vert aqua",
    "horoscope.data.colors.Violet mystique": "Violet mystique",
    "horoscope.data.colors.Blanc perle": "Blanc perle",
    "horoscope.data.colors.Bleu lagon": "Bleu lagon",
    "horoscope.data.colors.Vert d'eau": "Vert d'eau",

    "horoscope.data.compatibility.Lion, Sagittaire": "Lion, Sagittaire",
    "horoscope.data.compatibility.Gémeaux, Verseau": "Gémeaux, Verseau",
    "horoscope.data.compatibility.Balance, Lion": "Balance, Lion",
    "horoscope.data.compatibility.Verseau, Gémeaux": "Verseau, Gémeaux",
    "horoscope.data.compatibility.Sagittaire, Balance": "Sagittaire, Balance",
    "horoscope.data.compatibility.Lion, Verseau": "Lion, Verseau",
    "horoscope.data.compatibility.Vierge, Capricorne": "Vierge, Capricorne",
    "horoscope.data.compatibility.Cancer, Poissons": "Cancer, Poissons",
    "horoscope.data.compatibility.Scorpion, Vierge": "Scorpion, Vierge",
    "horoscope.data.compatibility.Capricorne, Cancer": "Capricorne, Cancer",
    "horoscope.data.compatibility.Poissons, Scorpion": "Poissons, Scorpion",
    "horoscope.data.compatibility.Vierge, Poissons": "Vierge, Poissons",
    "horoscope.data.compatibility.Balance, Verseau": "Balance, Verseau",
    "horoscope.data.compatibility.Bélier, Lion": "Bélier, Lion",
    "horoscope.data.compatibility.Verseau, Bélier": "Verseau, Bélier",
    "horoscope.data.compatibility.Sagittaire, Gémeaux": "Sagittaire, Gémeaux",
    "horoscope.data.compatibility.Balance, Bélier": "Balance, Bélier",
    "horoscope.data.compatibility.Scorpion, Poissons": "Scorpion, Poissons",
    "horoscope.data.compatibility.Taureau, Vierge": "Taureau, Vierge",
    "horoscope.data.compatibility.Capricorne, Scorpion": "Capricorne, Scorpion",
    "horoscope.data.compatibility.Poissons, Taureau": "Poissons, Taureau",
    "horoscope.data.compatibility.Bélier, Sagittaire": "Bélier, Sagittaire",
    "horoscope.data.compatibility.Gémeaux, Balance": "Gémeaux, Balance",
    "horoscope.data.compatibility.Bélier, Gémeaux": "Bélier, Gémeaux",
    "horoscope.data.compatibility.Verseau, Lion": "Verseau, Lion",
    "horoscope.data.compatibility.Sagittaire, Bélier": "Sagittaire, Bélier",
    "horoscope.data.compatibility.Gémeaux, Lion": "Gémeaux, Lion",
    "horoscope.data.compatibility.Cancer, Scorpion": "Cancer, Scorpion",
    "horoscope.data.compatibility.Vierge, Cancer": "Vierge, Cancer",
    "horoscope.data.compatibility.Scorpion, Capricorne": "Scorpion, Capricorne",
    "horoscope.data.compatibility.Cancer, Vierge": "Cancer, Vierge",
    "horoscope.data.compatibility.Cancer, Taureau": "Cancer, Taureau",
    "horoscope.data.compatibility.Vierge, Scorpion": "Vierge, Scorpion",
    "horoscope.data.compatibility.Poissons, Cancer": "Poissons, Cancer",
    "horoscope.data.compatibility.Taureau, Poissons": "Taureau, Poissons",
    "horoscope.data.compatibility.Cancer, Capricorne": "Cancer, Capricorne",
    "horoscope.data.compatibility.Lion, Balance": "Lion, Balance",
    "horoscope.data.compatibility.Balance, Sagittaire": "Balance, Sagittaire",
    "horoscope.data.compatibility.Gémeaux, Sagittaire": "Gémeaux, Sagittaire",

    // Horoscope Data Translations - Date Ranges
    "horoscope.data.dates.aries": "21 mars - 19 avril",
    "horoscope.data.dates.taurus": "20 avril - 20 mai",
    "horoscope.data.dates.gemini": "21 mai - 20 juin",
    "horoscope.data.dates.cancer": "21 juin - 22 juillet",
    "horoscope.data.dates.leo": "23 juillet - 22 août",
    "horoscope.data.dates.virgo": "23 août - 22 septembre",
    "horoscope.data.dates.libra": "23 septembre - 22 octobre",
    "horoscope.data.dates.scorpio": "23 octobre - 21 novembre",
    "horoscope.data.dates.sagittarius": "22 novembre - 21 décembre",
    "horoscope.data.dates.capricorn": "22 décembre - 19 janvier",
    "horoscope.data.dates.aquarius": "20 janvier - 18 février",
    "horoscope.data.dates.pisces": "19 février - 20 mars",

    // FRANÇAIS - Toutes les nouvelles traductions pour les variations

    // ========== SALUTATIONS VARIÉES ==========

    // Tirage quotidien - variantes
    "interpretation.daily.greeting.var1":
      "Salut {name} ! J'ai un message spécial pour toi aujourd'hui.",
    "interpretation.daily.greeting.var2":
      "Coucou {name} ! Ton guide du jour t'attend avec impatience.",
    "interpretation.daily.greeting.var3":
      "Hello {name} ! Une belle énergie t'accompagne aujourd'hui.",
    "interpretation.daily.greeting.var4":
      "Bonjour {name} ! Les énergies cosmiques ont préparé quelque chose pour toi.",

    // Tarot - variantes
    "interpretation.tarot.greeting.var1":
      "Coucou {name} ! Ton tirage de Tarot révèle des aspects fascinants de ta vie.",
    "interpretation.tarot.greeting.var2":
      "Hello {name} ! Les cartes de Tarot ont des messages puissants pour toi.",
    "interpretation.tarot.greeting.var3":
      "Bonjour {name} ! Ton tirage de Tarot dévoile des vérités importantes.",
    "interpretation.tarot.greeting.var4":
      "Salut {name} ! Les arcanes du Tarot parlent clairement de ton avenir.",

    // Anges - variantes
    "interpretation.angels.greeting.var1":
      "Salut {name} ! Le royaume angélique déborde de messages d'amour pour toi.",
    "interpretation.angels.greeting.var2":
      "Coucou {name} ! Tes guides célestes illuminent ton chemin aujourd'hui.",
    "interpretation.angels.greeting.var3":
      "Hello {name} ! Les anges chantent des mélodies de guidance spécialement pour toi.",
    "interpretation.angels.greeting.var4":
      "Bonjour {name} ! Une symphonie angélique résonne dans les sphères célestes pour toi.",

    // Runes - variantes
    "interpretation.runes.greeting.var1":
      "Heil {name} ! Les runes des anciens parlent de ton héritage viking.",
    "interpretation.runes.greeting.var2":
      "Salut {name} ! L'écho des dieux nordiques résonne à travers ces runes sacrées.",
    "interpretation.runes.greeting.var3":
      "Bonjour {name} ! Les runes millénaires dévoilent la force qui sommeille en toi.",
    "interpretation.runes.greeting.var4":
      "Hello {name} ! La sagesse des Vikings traverse les âges pour te guider.",

    // ========== TRANSITIONS VARIÉES ==========

    // Transitions pour le passé
    "interpretation.transition.past.var1":
      "Ces expériences t'ont vraiment fait grandir et t'ont rendu plus fort{genderSuffix}.",
    "interpretation.transition.past.var2":
      "Ces moments ont forgé ton caractère et ta résilience.",
    "interpretation.transition.past.var3":
      "Tout cela a contribué à façonner la personne que tu es devenu{genderSuffix}.",
    "interpretation.transition.past.var4":
      "Ces épreuves t'ont donné une sagesse précieuse.",
    "interpretation.transition.past.var5":
      "C'est grâce à ces expériences que tu as développé ta force intérieure.",
    "interpretation.transition.past.var6":
      "Ces événements t'ont appris des leçons importantes sur la vie.",
    "interpretation.transition.past.var7":
      "Tout ce vécu a enrichi ton âme et ton expérience.",
    "interpretation.transition.past.var8":
      "Ces défis ont révélé ta véritable nature et ta détermination.",

    // Transitions pour le présent
    "interpretation.transition.present.var1":
      "Tu es dans une période importante qui annonce de belles choses pour la suite.",
    "interpretation.transition.present.var2":
      "Cette phase de ta vie ouvre des perspectives prometteuses.",
    "interpretation.transition.present.var3":
      "C'est un moment clé qui prépare ton avenir radieux.",
    "interpretation.transition.present.var4":
      "Cette période actuelle pose les bases de ton succès futur.",
    "interpretation.transition.present.var5":
      "Tu vis une transition qui va transformer ta vie positivement.",
    "interpretation.transition.present.var6":
      "Ce moment présent est porteur de grandes promesses.",
    "interpretation.transition.present.var7":
      "Cette étape marque un tournant positif dans ton existence.",
    "interpretation.transition.present.var8":
      "Tu traverses une phase qui va t'apporter beaucoup de satisfaction.",

    // Transitions pour le futur
    "interpretation.transition.future.var1":
      "Cette énergie va transformer ta vie de manière positive et durable.",
    "interpretation.transition.future.var2":
      "Ces influences vont apporter des changements merveilleux dans ta vie.",
    "interpretation.transition.future.var3":
      "Cette force va créer des opportunités extraordinaires pour toi.",
    "interpretation.transition.future.var4":
      "Ces vibrations vont attirer tout ce dont tu as besoin.",
    "interpretation.transition.future.var5":
      "Cette énergie va manifester tes rêves les plus chers.",
    "interpretation.transition.future.var6":
      "Ces influences divines vont illuminer ton chemin.",
    "interpretation.transition.future.var7":
      "Cette puissance va débloquer ton potentiel caché.",
    "interpretation.transition.future.var8":
      "Ces énergies vont synchroniser tous les aspects de ta vie.",

    // ========== CONSEILS VARIÉS ==========

    "interpretation.advice.var1":
      "fais confiance à ton instinct. Tu as tout ce qu'il faut pour réussir !",
    "interpretation.advice.var2":
      "écoute ta sagesse intérieure. Elle ne te trahira jamais !",
    "interpretation.advice.var3":
      "suis ton cœur et tes intuitions. Ils te guident vers le bonheur !",
    "interpretation.advice.var4":
      "reste connecté{genderSuffix} à tes valeurs. Elles sont ton meilleur guide !",
    "interpretation.advice.var5":
      "garde foi en tes capacités. Tu es plus fort{genderSuffix} que tu ne le penses !",
    "interpretation.advice.var6":
      "reste ouvert{genderSuffix} aux opportunités. L'univers travaille pour toi !",
    "interpretation.advice.var7":
      "cultive ta patience. Tout arrive au moment parfait !",
    "interpretation.advice.var8":
      "maintiens ta détermination. Tes efforts seront récompensés !",
    "interpretation.advice.var9":
      "préserve ton optimisme. Il attire les meilleures énergies !",
    "interpretation.advice.var10":
      "nourris ta confiance. Elle est la clé de toutes tes réussites !",

    //Clé de traductions variations
    "interpretation.tarot.template.advice.var1":
      "Mon conseil : {name}, avec ton caractère de {zodiacSign},",
    "interpretation.tarot.template.advice.var2":
      "{genderText} {name}, en tant que {zodiacSign},",
    "interpretation.tarot.template.advice.var3":
      "Écoute bien {name} : comme {zodiacSign},",
    "interpretation.tarot.template.advice.var4":
      "Retiens ceci {name}, ton essence de {zodiacSign}",
    "interpretation.tarot.template.advice.var5":
      "{name}, les astres parlent à travers ta nature de {zodiacSign}.",
    "interpretation.tarot.template.advice.var6":
      "Souviens-toi, {name} : ton signe {zodiacSign} détient une part de vérité essentielle.",
    "interpretation.tarot.template.advice.var7":
      "{genderText} {name}, ta destinée résonne avec l’énergie du {zodiacSign}.",
    "interpretation.tarot.template.advice.var8":
      "Sache-le {name}, en tant que {zodiacSign}, tu portes une lumière unique.",

    // Templates pour le message final
    "interpretation.angels.template.message.var1":
      "Message angélique : {genderText} {name}, avec ton essence de {zodiacSign}",
    "interpretation.angels.template.message.var2":
      "Les anges te transmettent {name} : en tant que {zodiacSign}",
    "interpretation.angels.template.message.var3":
      "Guidance céleste {name} : comme {zodiacSign}",
    "interpretation.angels.template.message.var4":
      "Bénédiction angélique {name}, ta nature de {zodiacSign}",
    "interpretation.angels.template.message.var5":
      "{name}, les anges honorent ta lumière de {zodiacSign}.",
    "interpretation.angels.template.message.var6":
      "Écoutez, {name} : Ton âme de {zodiacSign} reçoit un message divin.",
    "interpretation.angels.template.message.var7":
      "Message céleste pour toi, {name}, en tant que {zodiacSign}, tu es guidé{genderSuffix}.",
    "interpretation.angels.template.message.var8":
      "Les sphères célestes murmurent à {name} : ton essence de {zodiacSign} est en éveil.",

    // Crystal Ball French
    "crystalBall.title": "Boule de Cristal Mystique",
    "crystalBall.subtitle":
      "Posez votre question et laissez la magie vous guider",
    "crystalBall.askPrompt": "Quelle est votre question ?",
    "crystalBall.questionPlaceholder": "Écrivez votre question ici...",
    "crystalBall.submitQuestion": "Consulter la Boule",
    "crystalBall.thinking": "La boule réfléchit...",
    "crystalBall.guidance":
      "Écoutez votre intuition pour interpréter ce message",
    "crystalBall.askAnother": "Poser une autre question",
    "crystalBall.closedQuestionHint": "Que voulez-vous savoir ? Interrogez la boule… mais attention : elle ne répond que par oui, non...",
    "crystalBall.example.good": "Ex : Vais-je rencontrer l'amour cette année ?",
    "crystalBall.example.bad": "Ex : Quand vais-je me marier ?",
    "crystalBall.newQuestion": "Poser une autre question",
    "crystalBall.backHome": "🏠 Retour à l'accueil",
    
    // Français
    "oracle.crystalBall.title": "Boule de Cristal",
    "oracle.crystalBall.description": "Posez vos questions à la boule mystique",
   
    // Réponses Crytal Ball French
    "crystalBall.answers.yes": "Oui",
    "crystalBall.answers.no": "Non",
    "crystalBall.answers.maybe": "Peut-être",
    "crystalBall.answers.veryLikely": "Très probable",
    "crystalBall.answers.unlikely": "Peu probable",
    "crystalBall.answers.certain": "C'est certain",
    "crystalBall.answers.noChance": "Aucune chance",
    "crystalBall.answers.askLater": "La réponse viendra en son temps",
    "crystalBall.answers.dontCount": "Ne compte pas dessus",
    "crystalBall.answers.yesDefinitely": "Oui, absolument",
    "crystalBall.answers.signsYes": "Les signes pointent vers oui",
    "crystalBall.answers.signsNo": "Les signes pointent vers non",
    "crystalBall.answers.unclear": "Il est trop tôt pour le dire",
    "crystalBall.answers.trustIntuition": "Fais confiance à ton intuition",

    // Message fin Crystal Ball French
    "interpretation.dailyComplete": "Votre tirage du jour est terminé",
    "interpretation.timeUntilReset":
      "Prochain tirage disponible dans {hours}h{minutes}min",
    "interpretation.consultCrystalBall": "Consulter la Boule de Cristal",
    "common.backHome": "Retour à l'accueil",
    "crystalBall.disclaimer":
      "Les réponses de la boule de cristal sont symboliques et destinées au divertissement. Écoute toujours ton cœur et tes proches pour les choix de ta vraie vie.",

    // GRIMOIRE MYSTIQUE
    "grimoire.title": "Grimoire Mystique",
    "grimoire.free.title": "Version gratuite : 3 derniers tirages sauvegardés",
    "grimoire.free.subtitle": "Passez Premium pour un historique illimité !",
    "grimoire.premium.active": "Accès Premium activé - Historique illimité",
    "grimoire.empty.title": "Aucun tirage enregistré",
    "grimoire.empty.subtitle": "Commencez votre première consultation pour remplir votre grimoire mystique",
    "grimoire.cards.title": "Cartes tirées :",
    "grimoire.interpretation.show": "Voir l'interprétation complète",
    "grimoire.interpretation.hide": "Masquer l'interprétation complète",
    "grimoire.notes.title": "Notes personnelles",
    "grimoire.notes.placeholder": "Ajoutez vos réflexions...",
    "grimoire.favorite.add": "Ajouter aux favoris",
    "grimoire.favorite.remove": "Retirer des favoris",
    "grimoire.oracle.daily": "Tirage du Jour",
    "grimoire.oracle.tarot": "Tarot",
    "grimoire.oracle.angels": "Oracle des Anges",
    "grimoire.oracle.runes": "Runes Vikings",

    // Grimoire - Statistiques
    "grimoire.stats.total": "Total",
    "grimoire.stats.thisMonth": "Ce mois",

    // Grimoire - Effacer tout
    "grimoire.clearAll.button": "Tout effacer",
    "grimoire.clearAll.confirm.title": "Êtes-vous sûr ?",
    "grimoire.clearAll.confirm.message": "Cette action est irréversible. Tous vos tirages seront supprimés définitivement.",
    "grimoire.clearAll.confirm.button": "Oui, tout effacer",

    // MENU LÉGAL
    "legal.menu.title": "Menu légal",
    "legal.mentions": "Mentions légales",
    "legal.privacy": "Politique de confidentialité",

    // PREMIUM MODAL
    "premium.button.label": "Devenir Premium",
    "premium.title": "Supprime les Publicités !",
    "premium.subtitle": "Fais tes tirages sans pub !",
    "premium.plan.1month": "1 Mois",
    "premium.plan.1month.subtitle": "Sans engagement",
    "premium.plan.3months": "3 Mois",
    "premium.plan.3months.subtitle": "Meilleure offre",
    "premium.plan.discount": "-25%",
    "premium.button.subscribe": "S'abonner maintenant",
    "premium.button.select": "Sélectionne une offre",
    "premium.button.processing": "Traitement...",
    "premium.benefits.ads": "Aucune publicité",
    "premium.benefits.grimoire": "Grimoire Mystique illimité",
    "premium.benefits.notes": "Notes et favoris",
    "premium.benefits.history": "Historique complet de vos tirages",
    "premium.confirm.1month": "Confirmer le paiement de 3,99€ pour 1 mois ?",
    "premium.confirm.3months": "Confirmer le paiement de 8,98€ pour 3 mois ?",
    "premium.success": "Abonnement activé avec succès ! Profitez de votre expérience sans pub et du Grimoire illimité.",
    "premium.error.activation": "Erreur lors de l'activation de l'abonnement",
    "premium.error.payment": "Erreur lors du paiement. Veuillez réessayer.",
    "premium.error.invalidEmail": "L'email n'est pas valide.",
    "premium.error.noActivePremium": "Aucun abonnement actif trouvé",
    
    // Premium
    "premium.manage": "Gérer mon abonnement (annuler, factures...)",
    "premium.expired": "Votre accès Premium a expiré",
    "premium.expiringSoon": "Votre accès Premium expire bientôt",
    "premium.conditions.line1": "🔒 Paiement sécurisé par Stripe",
    "premium.conditions.line2": "✓ Paiement unique, SANS renouvellement automatique",
    "premium.conditions.line3": "Aucun remboursement après paiement. Accès Premium valable pour la durée choisie.",
    "premium.conditions.line4": "Vous serez notifié 3 jours avant l'expiration de votre accès.",
    "premium.securePayment": "Paiement sécurisé par",
    "premium.restoreSubscription": "Restaurer un abonnement",
    "premium.backToPurchases": "Retour aux achats",
    "premium.payment.googlePlay": "Paiement Google Play",
    "premium.payment.stripe": "Paiement Web Stripe",
    "premium.restoreEmailLabel": 'Votre Email',
    "premium.restore": 'Restaurer',
    "premium.buy": 'Acheter',

    //PREMIUM RESTOR
    "premium.restore.title": "Restaurer mon abonnement",
    "premium.restore.subtitle": "Déjà Premium ? Récupérez votre accès",
    "premium.restore.description": "Entrez l'email utilisé lors de votre achat Premium",
    "premium.restore.button": "Restaurer",
    "premium.restore.verifying": "Vérification...",
    "premium.restore.success": "Premium restauré avec succès !",
    "premium.restore.redirecting": "Redirection en cours...",
    "premium.restore.notFound": "Aucun abonnement Premium trouvé pour cet email. Vérifiez l'adresse ou souscrivez à un nouvel abonnement.",
    "premium.restore.error": "Une erreur est survenue lors de la restauration. Réessayez.",
    "premium.restore.info": "Vous devez utiliser le même email que lors de votre achat Premium sur Stripe.",
    "premium.restore.help": "Besoin d'aide ?",
    "premium.restore.contact": "Contactez-nous",
    "premium.error.emailRequired": "L'email est requis.",
    "premium.error.emailInvalid": "L'email n'est pas valide.",
    "premium.emailLabel": "Votre email",
    "premium.emailHelp": "Pour récupérer votre abonnement",
    "premium.backToPurchase": 'Retour aux achats',
    "premium.button.loading": 'Chargement...',
    "premium.loading.offers": 'Chargement des offres...',
    "premium.button.restoring": 'Restauration...',
    "premium.poweredBy": 'Powered by',
    "premium.error.loadFailed": "Impossible de charger les offres",
    "premium.error.purchaseFailed": "Erreur lors de l\'achat",
    "premium.error.unknown": "Erreur inconnue",

    // PAGE PAIEMENT SUCESS CANCEL
    "payment.success.title": "Paiement réussi !",
    "payment.success.verified": "Votre compte Premium a été activé",
    "payment.success.activating": "Activation en cours...",
    "payment.success.benefits": "Profitez de toutes les fonctionnalités Premium !",
    "payment.success.noAds": "Sans publicité",
    "payment.success.unlimitedGrimoire": "Grimoire illimité",
    "payment.success.fullHistory": "Historique complet",
    "payment.success.redirecting": "Redirection automatique vers les oracles...",
    "payment.cancel.title": "Paiement annulé",
    "payment.cancel.message": "Vous avez annulé le paiement",
    "payment.cancel.retry": "Vous pouvez réessayer à tout moment depuis le menu Premium",
    "payment.cancel.redirecting": "Retour à la sélection des oracles...",

    // Tirage Bonus Oracle
    "oracle.bonusRoll.title": "Tirage Bonus",
    "oracle.bonusRoll.description": "Déverrouillez votre révélation numérologique secrète",
    "oracle.bonusRoll.ready": "Prêt à découvrir votre message bonus ?",
    "oracle.bonusRoll.rolling": "🎲 Lancement des dés mystiques...",
    "oracle.bonusRoll.loadingAd": "📢 Déverrouillage de votre révélation...",
    "oracle.bonusRoll.result": "Résultat",
    "oracle.bonusRoll.cosmicMessage": "Votre message bonus",
    "oracle.bonusRoll.rollButton": "🎲 Lancer les Dés",
    "oracle.bonusRoll.newRoll": "✨ Nouveau Tirage Bonus",
    "oracle.bonusRoll.diceResult": "Dés",
    "oracle.bonusRoll.startButton": "🎁 Débloquer le Tirage Bonus",
    "oracle.bonusRoll.exclusiveBadge":'BONUS EXCLUSIF',
    "oracle.bonusRoll.adRequired": "Vous devez regarder la publicité complète pour accéder au Tirage Bonus.",
    "oracle.bonusRoll.badge": "BONUS EXCLUSIF",
    "oracle.bonusRoll.pleaseWait": "Un instant s'il vous plaît",
           
    // Interprétations Bonus Roll - 3 variations par nombre
    "oracle.bonusRoll.2.title.1": "🌅 Nouveau Départ",
    "oracle.bonusRoll.2.message.1": "Les étoiles s'alignent pour un nouveau commencement. Double chance vous accompagne aujourd'hui !",
    "oracle.bonusRoll.2.title.2": "✨ Renaissance Cosmique",
    "oracle.bonusRoll.2.message.2": "Un cycle nouveau débute dans votre vie. L'univers vous offre une seconde chance extraordinaire.",
    "oracle.bonusRoll.2.title.3": "🦋 Transformation Douce",
    "oracle.bonusRoll.2.message.3": "La dualité du 2 vous invite à l'équilibre. Une nouvelle page s'ouvre devant vous, tournez-la avec confiance.",

    "oracle.bonusRoll.3.title.1": "🔮 Intuition Divine",
    "oracle.bonusRoll.3.message.1": "Votre sixième sens est à son apogée. Suivez votre intuition, elle ne vous trompera pas.",
    "oracle.bonusRoll.3.title.2": "👁️ Vision Mystique",
    "oracle.bonusRoll.3.message.2": "Les voiles se lèvent sur votre perception. Votre clairvoyance atteint des sommets inégalés.",
    "oracle.bonusRoll.3.title.3": "🌙 Sagesse Intérieure",
    "oracle.bonusRoll.3.message.3": "Le triangle sacré du 3 éclaire votre chemin. Corps, esprit et âme ne font qu'un aujourd'hui.",

    "oracle.bonusRoll.4.title.1": "🏛️ Fondations Solides",
    "oracle.bonusRoll.4.message.1": "La stabilité et la confiance sont vos alliés. Vos bases sont solides, construisez avec assurance.",
    "oracle.bonusRoll.4.title.2": "⚓ Ancrage Puissant",
    "oracle.bonusRoll.4.message.2": "Votre stabilité est votre force. Construisez maintenant quelque chose de durable.",
    "oracle.bonusRoll.4.title.3": "🗿 Structure Divine",
    "oracle.bonusRoll.4.message.3": "Les quatre éléments vous soutiennent. Votre détermination est une vraie force.",

    "oracle.bonusRoll.5.title.1": "✨ Opportunités Magiques",
    "oracle.bonusRoll.5.message.1": "Le changement apporte des surprises inattendues. Restez ouvert aux nouvelles possibilités.",
    "oracle.bonusRoll.5.title.2": "🌪️ Vent du Changement",
    "oracle.bonusRoll.5.message.2": "Une transformation se présente à vous. Accueillez ce qui vient avec confiance et audace.",
    "oracle.bonusRoll.5.title.3": "🎭 Liberté Créatrice",
    "oracle.bonusRoll.5.message.3": "Le chiffre 5 apporte une grande libération. Votre esprit aventurier peut enfin s’exprimer.",

    "oracle.bonusRoll.6.title.1": "⚖️ Harmonie Parfaite",
    "oracle.bonusRoll.6.message.1": "L'équilibre règne dans votre vie. Savourez cette période de paix et d'harmonie.",
    "oracle.bonusRoll.6.title.2": "🕊️ Sérénité Absolue",
    "oracle.bonusRoll.6.message.2": "Votre âme baigne dans la tranquillité. Profitez de cet instant de grâce cosmique.",
    "oracle.bonusRoll.6.title.3": "💝 Amour Universel",
    "oracle.bonusRoll.6.message.3": "Le nombre de l'amour vous enveloppe. Relations et connexions s'épanouissent sous votre regard bienveillant.",

    "oracle.bonusRoll.7.title.1": "🍀 Chance Mystique",
    "oracle.bonusRoll.7.message.1": "Le nombre de la chance vous sourit ! Attendez-vous à des surprises agréables.",
    "oracle.bonusRoll.7.title.2": "🎰 Fortune Divine",
    "oracle.bonusRoll.7.message.2": "Les dés du destin tombent en votre faveur. La providence vous bénit aujourd'hui.",
    "oracle.bonusRoll.7.title.3": "🌠 Magie Céleste",
    "oracle.bonusRoll.7.message.3": "Le 7 est un un chiffre sacré. L'univers conspire à votre réussite de façon miraculeuse.",

    "oracle.bonusRoll.8.title.1": "💎 Abondance Cosmique",
    "oracle.bonusRoll.8.message.1": "La réussite et la prospérité vous entourent. L'univers récompense vos efforts.",
    "oracle.bonusRoll.8.title.2": "👑 Prospérité Infinie",
    "oracle.bonusRoll.8.message.2": "Le flux d'abondance coule vers vous. Votre travail porte des fruits magnifiques.",
    "oracle.bonusRoll.8.title.3": "💰 Richesse Manifestée",
    "oracle.bonusRoll.8.message.3": "Le 8 de l'infini matérialise vos désirs. Succès matériel et spirituel marchent main dans la main.",

    "oracle.bonusRoll.9.title.1": "🌱 Évolution Spirituelle",
    "oracle.bonusRoll.9.message.1": "Votre croissance personnelle atteint de nouveaux sommets. Continuez votre chemin.",
    "oracle.bonusRoll.9.title.2": "🦋 Métamorphose Sacrée",
    "oracle.bonusRoll.9.message.2": "Vous êtes en pleine transformation spirituelle. Votre âme s'élève vers la lumière.",
    "oracle.bonusRoll.9.title.3": "🌌 Sagesse Universelle",
    "oracle.bonusRoll.9.message.3": "Le chiffre 9 marque la fin d’un cycle. Vous avez appris, grandi! Votre évolution devient un exemple pour les autres.",

    "oracle.bonusRoll.10.title.1": "🎯 Défis Stimulants",
    "oracle.bonusRoll.10.message.1": "De nouveaux challenges vous attendent, mais vous êtes prêt à les relever avec brio.",
    "oracle.bonusRoll.10.title.2": "⚔️ Épreuves Formatrices",
    "oracle.bonusRoll.10.message.2": "Les obstacles deviennent des tremplins. Votre détermination transforme tout en victoire.",
    "oracle.bonusRoll.10.title.3": "🔟 Nouveau Cycle Maître",
    "oracle.bonusRoll.10.message.3": "Le nombre 10 marque la fin d'un chapitre et le début d'un autre. Vous renaissez plus fort, plus sage.",

    "oracle.bonusRoll.11.title.1": "🔥 Persévérance Victorieuse",
    "oracle.bonusRoll.11.message.1": "Votre détermination porte ses fruits. Le nombre maître 11 vous guide vers le succès.",
    "oracle.bonusRoll.11.title.2": "⚡ Maître Illuminé",
    "oracle.bonusRoll.11.message.2": "Le nombre sacré 11 révèle votre potentiel illimité. Votre présence guide ceux qui vous entourent.",
    "oracle.bonusRoll.11.title.3": "✨ Éveil Spirituel",
    "oracle.bonusRoll.11.message.3": "Le nombre 11 signale l’arrivée d’une nouvelle opportunité. Soyez prêt à la saisir dès maintenant.",

    "oracle.bonusRoll.12.title.1": "👑 Accomplissement Total",
    "oracle.bonusRoll.12.message.1": "Vous êtes arrivé à un stade de plénitude où tout semble en harmonie et vous vous sentez accompli.",
    "oracle.bonusRoll.12.title.2": "🌟 Perfection Cosmique",
    "oracle.bonusRoll.12.message.2": "Vous avez bouclé un cycle important et vous approchez de l’excellence. Tout semble s’harmoniser autour de votre réussite.",
    "oracle.bonusRoll.12.title.3": "🏆 Triomphe Absolu",
    "oracle.bonusRoll.12.message.3": "Votre chemin atteint un point important avec le nombre 12. Tout se met en ordre et vous vous sentez parfaitement à votre place.",

    "oracle.backToOracles": "Retour aux oracles",

    // Common
    "common.back": "Retour",
    "common.home": "Accueil",
    "common.language": "Langue",
  },

  en: {
    // Landing Page
    "landing.title": "CartoMystik",
    "landing.subtitle":
      "Discover the mysteries of your destiny through cards, stars and ancient wisdom",
    "landing.enter": "ENTER",
    "landing.ads.support": "Ads help us keep the app free",

    // 🆕 Disclaimer - ADD HERE
    "disclaimer.title": "Important Disclaimer",
      "disclaimer.text": "CartoMystik is an entertainment and personal development application. Consult qualified experts for any important decisions.",
      "disclaimer.note": "By continuing, you agree to use this app for entertainment purposes only.",
      "disclaimer.accept": "I Understand",
      "disclaimer.legal": "This app is compliant with GDPR.",

    // No-repeat system
    "system.antirepeat.loading": "Cards are shuffling...",
    "system.antirepeat.active": "Anti-repeat system active",
    "system.cards.refreshed": "New cards available",

    // Name Page
    "name.title": "First Name",
    "name.subtitle":
      "How would you like to be called? Enter your name or nickname",
    "name.placeholder": "Enter your name",
    "name.next": "NEXT",

    // Date Page
    "date.title": "Birth Date",
    "date.subtitle":
      "Reveal your astrological sign for a personalized divination",
    "date.day": "Day",
    "date.month": "Month",
    "date.year": "Year",
    "date.next": "NEXT",
    "date.months.1": "January",
    "date.months.2": "February",
    "date.months.3": "March",
    "date.months.4": "April",
    "date.months.5": "May",
    "date.months.6": "June",
    "date.months.7": "July",
    "date.months.8": "August",
    "date.months.9": "September",
    "date.months.10": "October",
    "date.months.11": "November",
    "date.months.12": "December",

    // Gender Page
    "gender.title": "Gender",
    "gender.subtitle": "Enter your gender to provide context to the AI",
    "gender.male": "Male",
    "gender.female": "Female",
    "gender.other": "Other",
    "gender.next": "START",
    "gender.back": "BACK",

    //Barre de navigation EN
      "menu.open": "Open menu",
      "profile.open": "Open profile",
      "profile.birthdate": "Birthdate",
      "profile.gender": "Gender",
      "profile.zodiac": "Zodiac sign",
      "profile.edit": "Edit my profile",
      "profile.edit.title": "Edit my profile",
      "profile.edit.subtitle": "Update your personal information",
      "profile.edit.error": "Please fill out all fields",
      "grimoire.subtitle": "Your reading history",
      "premium.active": "Active",
      "locale": "en-US",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "name.label": "Name",
      
    // EN Notifications  
    "notification.channel.name": "Daily Reading",
    "notification.channel.description": "Notifications for your daily mystical reading",
    "notification.variants.1.title": "✨ The stars are calling you",
    "notification.variants.1.body": "Discover your horoscope and daily mystical reading!",
    "notification.variants.2.title": "🔮 Your destiny awaits",
    "notification.variants.2.body": "Check your daily reading and personalized horoscope",
    "notification.variants.3.title": "🌙 The mystery unfolds",
    "notification.variants.3.body": "Your daily reading and horoscope are ready!",
    "notification.variants.4.title": "⭐ A message from the stars",
    "notification.variants.4.body": "Discover what the cards and the stars have in store for you today",
    "notification.variants.5.title": "✨ CartoMystik is calling you",
    "notification.variants.5.body": "Your daily guidance: card reading and horoscope now available",
    "notification.modal.title": "Daily Notifications",
    "notification.modal.description": "Receive a mystical reminder every day at 10 a.m. to discover your personalized reading and horoscope",
    "notification.modal.benefit1": "Daily card reading",
    "notification.modal.benefit2": "Personalized horoscope based on your sign",
    "notification.modal.benefit3": "Never miss your daily guidance",
    "notification.modal.accept": "Enable notifications",
    "notification.modal.decline": "No thanks",
    "notification.modal.note": "You can change this choice later in the settings",

    // Oracle Selection
    "oracle.welcome": "Welcome {name}!",
    "oracle.subtitle": "Discover the secrets of your destiny",
    "oracle.daily.title": "Daily Card Reading",
    "oracle.daily.description": "One card to guide and inspire you today",
    "oracle.horoscope.title": "Horoscope",
    "oracle.horoscope.description":
      "Discover what the stars have in store for you today according to your sign",
    "oracle.tarot.title": "Tarot",
    "oracle.tarot.description":
      "The 22 Major Arcana reveal the mysteries of your destiny",
    "oracle.angels.title": "Angel Oracle",
    "oracle.angels.description":
      "Connect with your angelic guides to receive their messages of love",
    "oracle.runes.title": "Nordic Runes",
    "oracle.runes.description":
      "The ancient wisdom of the Vikings reveals your path of war and victory",
    "oracle.back": "BACK",
    "oracle.home": "Home",

    // Card Game
    "cardgame.back": "Back",
    "cardgame.daily.instruction": "Choose 1 card for your daily advice",
    "cardgame.reading.instruction":
      "Choose 3 cards to shed light on your destiny",
    "cardgame.selected": "Selected cards: {current}/{max}",
    "cardgame.page": "Page {current} of {total}",
    "cardgame.previous": "Previous",
    "cardgame.next": "Next",
    "cardgame.reveal": "REVEAL CARDS",
    "cardgame.daily.choose": "Choose the card that calls to you",

    // CardGame - Modal de révélation
    "cardgame.cardRevealed": "Card revealed",
    "cardgame.continue": "Continue",
    "cardgame.seeInterpretation": "See the interpretation",

    // Revelation - Loading
    "revelation.loading.title": "Interpreting...",
    "revelation.loading.daily": "The stars reveal your daily oracle, {name}",
    "revelation.loading.reading": "The cards unveil their mystical secrets, {name}",
    "revelation.loading.mysticMessage": "The stars are aligning for you...",

    // Revelation Page
    "revelation.positions.daily": "Daily Advice",
    "revelation.positions.past": "Card 1",
    "revelation.positions.present": "Card 2",
    "revelation.positions.future": "Card 3",
    "revelation.summary.title": "What your cards reveal",
    "revelation.newConsultation": "New consultation",
    "revelation.title.daily": "Your Daily Advice",
    "revelation.title.reading": "Your Reading - {oracle}",
    "revelation.instruction.daily":
      "Click on your card to reveal today's message",
    "revelation.instruction.reading":
      "Click on each card to reveal your destiny",
    "revelation.flipCard.reveal": "Touch to reveal",
    "revelation.summary.seeMore": "See more ↓",
    "revelation.summary.seeLess": "See less ↑",
    "revelation.revealButton": "Revelation",
    "revelation.backToSelection": "Back to Selection",
    "interpretation.advice.title": "Your personal advice",
    "revelation.subtitle.revealed": "Contemplate your revealed cards",
       
    // Interpretation Templates
    "interpretation.gender.femme": "My dear",
    "interpretation.gender.homme": "My dear",
    "interpretation.gender.autre": "Dear soul",
    "interpretation.daily.greeting":
      "Hello {name}! Here is your advice for this beautiful day.",
    "interpretation.daily.zodiac": "As a {zodiacSign}, ",
    "interpretation.daily.cardMessage":
      'the card "{cardName}" has a special energy for you today.',
    "interpretation.daily.wisdom":
      "As a {zodiacSign}, you have the wisdom to use this advice well. Trust your instinct and let this positive energy guide your actions today.",
    "interpretation.daily.closing":
      "Have a good day {genderText} {name}, and may the stars light your path!",
    "interpretation.tarot.greeting":
      "Hi {name}! Your Tarot reading tells me interesting things.",
    "interpretation.tarot.past":
      "{cardName} in your past shows that you have lived moments that really made you grow. It wasn't always easy, but it made you stronger.",
    "interpretation.tarot.present":
      "Right now, {cardName} influences your life positively. You are in a period where things are moving, and that's a good sign for what's ahead.",
    "interpretation.tarot.future":
      "For your future, {cardName} announces beautiful things! You can expect happy changes that will bring you satisfaction.",
    "interpretation.tarot.advice":
      "My advice: {name}, with your character as a {zodiacSign}, trust your instinct. You have everything it takes to succeed!",
    "interpretation.angels.greeting":
      "Hello {name}! Your guardian angels have luminous revelations to share with you.",
    "interpretation.angels.past":
      "Throughout your past journey, {cardName} has planted divine seeds: {cardMeaning}. These blessings have nourished your soul and prepared you to receive the unconditional love that surrounds you now.",
    "interpretation.angels.present":
      "In this precise moment, {cardName} illuminates your present: {cardMeaning}. This celestial light guides each of your steps and transforms your challenges into opportunities for spiritual growth.",
    "interpretation.angels.future":
      "Towards your radiant future, {cardName} spreads its protective wings: {cardMeaning}. The gates of heaven open before you, revealing a path paved with miracles and synchronicities.",
    "interpretation.angels.message":
      "Angelic transmission: {genderText} {name}, your essence as {zodiacSign} vibrates in harmony with these divine frequencies. Let your heart open to these messages of pure love and remain receptive to the signs your guides send you!",
    "interpretation.runes.greeting":
      "Hail {name}! The ancient Nordic runes reveal the secrets of your warrior destiny.",
    "interpretation.runes.past":
      "Your past rune, {cardName}, reveals: {cardMeaning}. These primal forces have shaped your character through fire and ice, preparing you for today's challenges with ancient wisdom.",
    "interpretation.runes.present":
      "Right now, {cardName} guides your steps: {cardMeaning}. This runic energy illuminates your current path, connecting you to the mystical forces governing your daily life.",
    "interpretation.runes.future":
      "Toward the future, {cardName} announces: {cardMeaning}. This runic prophecy traces the path of your future achievements, where you will shine victorious under the Norse gods' aegis.",
    "interpretation.runes.advice":
      "Remember, {genderText} {name}: as a {zodiacSign}, you carry the Viking legacy in your blood. The runes have spoken - follow their guidance with courage and determination!",
    "interpretation.fallback.zodiac": "intuitive person",
    "interpretation.fallback.angels": "luminous being",
    "interpretation.fallback.runes": "fighter",
    "interpretation.title.daily": "Interpretation for {name}",
    "interpretation.title.reading": "Card reading for {name}",
    "interpretation.subtitle": "Here is your personalized revelation",

    "interpretation.backToCards": "Back to cards",
    "interpretation.newConsultation": "New consultation",

    // ========== VARIATIONS FOR THE DAILY DRAW ==========

    // Variations for "the card has a special energy"
    "interpretation.daily.cardMessage.var1":
      'The card "{cardName}" has a special energy for you today.',
    "interpretation.daily.cardMessage.var2":
      'The card "{cardName}" brings a unique vibration to you today.',
    "interpretation.daily.cardMessage.var3":
      'The card "{cardName}" particularly resonates with your energy today.',
    "interpretation.daily.cardMessage.var4":
      'The card "{cardName}" carries an important message for you today.',
    "interpretation.daily.cardMessage.var5":
      'The card "{cardName}" vibrates in harmony with your day.',
    "interpretation.daily.cardMessage.var6":
      'The card "{cardName}" shines a special light on your path today.',
    "interpretation.daily.cardMessage.var7":
      'The card "{cardName}" invites you to listen to your intuition today.',
    "interpretation.daily.cardMessage.var8":
      'The card "{cardName}" conveys a powerful energy guiding you.',
    "interpretation.daily.cardMessage.var9":
      'The card "{cardName}" offers you an exceptional vibration to feel today.',
    "interpretation.daily.cardMessage.var10":
      'The card "{cardName}" accompanies you with a bright energy throughout the day.',

    //Variations for "Wisdom"
    "interpretation.daily.wisdom.var1":
      "As a {zodiacSign}, you have the wisdom needed to make good use of this advice. Trust your instinct and let this positive energy guide your actions today.",
    "interpretation.daily.wisdom.var2":
      "Your zodiac sign brings you beautiful intuition. Trust it and let yourself be guided by the positive energy around you.",
    "interpretation.daily.wisdom.var3":
      "The stars are with you today. Let this beautiful energy help you move forward peacefully.",
    "interpretation.daily.wisdom.var4":
      "As a {zodiacSign}, you hold the keys to interpreting this celestial message. Use it well throughout the day.",
    "interpretation.daily.wisdom.var5":
      "Your {zodiacSign} nature resonates perfectly with this advice. Let this cosmic harmony illuminate your path today.",
    "interpretation.daily.wisdom.var6":
      "The sky speaks through your zodiac sign. Be attentive to the signs and move forward with confidence.",
    "interpretation.daily.wisdom.var7":
      "As a {zodiacSign}, you are aligned{genderSuffix} with a subtle energy today. Follow it, it will lead you where you need to be.",
    "interpretation.daily.wisdom.var8":
      "Your {zodiacSign} sign guides you with wisdom. Let your heart be open and your mind clear to show you the way.",
    "interpretation.daily.wisdom.var9":
      "You carry a unique light within you. May this message help you shine it fully and proudly.",
    "interpretation.daily.wisdom.var10":
      "Your {zodiacSign} energy resonates with the vibrations of the day. Welcome this advice as a kind and inspiring guide.",

    // Variations for "Have a good day"
    "interpretation.daily.closing.var1":
      "Have a great day {genderText} {name}, and may the stars light your path!",
    "interpretation.daily.closing.var2":
      "Wishing you a beautiful day {name}, may this guidance accompany you!",
    "interpretation.daily.closing.var3":
      "Enjoy your day {name}, the energies are with you!",
    "interpretation.daily.closing.var4":
      "Have a wonderful day {genderText} {name}!",
    "interpretation.daily.closing.var5":
      "May your day be gentle {name}, the universe is watching over you!",
    "interpretation.daily.closing.var6":
      "Have a bright day, {genderText} {name}, filled with wonderful surprises!",
    "interpretation.daily.closing.var7":
      "Have a great day, {name}, may positive energy accompany you every moment!",
    "interpretation.daily.closing.var8":
      "May this day bring you joy and serenity, {genderText} {name}!",
    "interpretation.daily.closing.var9":
      "Smile at life today, {name}, and it will smile back at you!",
    "interpretation.daily.closing.var10":
      "Have an inspiring day, {genderText} {name}, under the protection of the stars!",

    // Horoscope daily sections
    "horoscope.greeting": `Hi {name}! Here's your daily horoscope as {zodiacSign} {zodiacSymbol}`,
    "horoscope.predictions.title": "Today's predictions:",
    "horoscope.mood.today": "Your mood today: {mood}",
    "horoscope.mood.energy":
      "This energy will accompany you all day. Take advantage of it to do things that make you feel good!",
    "horoscope.assets.title": "Your assets of the day:",
    "horoscope.assets.luckyNumber": "• Lucky number: {luckyNumber}",
    "horoscope.assets.luckyColor": "• Lucky color: {luckyColor}",
    "horoscope.compatibility":
      "Compatibility: You will get along particularly well with {compatibility} signs today. It's the ideal time to strengthen your relationships!",
    "horoscope.message": `{genderText} {name}, as {zodiacSign}, you have this beautiful energy that attracts good things. Trust the stars and your intuition today!`,
      "horoscope.mood.title": "Mood of the day",
      "horoscope.compatibility.title": "Compatibility",
      "horoscope.advice.title": "Your personal advice",

    // Zodiac signs names
    "zodiac.signs.aries": "Aries",
    "zodiac.signs.taurus": "Taurus",
    "zodiac.signs.gemini": "Gemini",
    "zodiac.signs.cancer": "Cancer",
    "zodiac.signs.leo": "Leo",
    "zodiac.signs.virgo": "Virgo",
    "zodiac.signs.libra": "Libra",
    "zodiac.signs.scorpio": "Scorpio",
    "zodiac.signs.sagittarius": "Sagittarius",
    "zodiac.signs.capricorn": "Capricorn",
    "zodiac.signs.aquarius": "Aquarius",
    "zodiac.signs.pisces": "Pisces",

    // Zodiac Signs
    "zodiac.aries": "Aries",
    "zodiac.taurus": "Taurus",
    "zodiac.gemini": "gemini",
    "zodiac.cancer": "Cancer",
    "zodiac.leo": "Leo",
    "zodiac.virgo": "Virgo",
    "zodiac.libra": "Libra",
    "zodiac.scorpio": "Scorpio",
    "zodiac.sagittarius": "Sagittarius",
    "zodiac.capricorn": "Capricorn",
    "zodiac.aquarius": "Aquarius",
    "zodiac.pisces": "Pisces",

    // Card Names and Meanings - Runes
    "cards.runes.Fehu.name": "Fehu",
    "cards.runes.Fehu.meaning": "Wealth, prosperity, new financial beginning",
    "cards.runes.Uruz.name": "Uruz",
    "cards.runes.Uruz.meaning": "Brute strength, health, transformation",
    "cards.runes.Thurisaz.name": "Thurisaz",
    "cards.runes.Thurisaz.meaning": "Defense, protection, destructive force",
    "cards.runes.Ansuz.name": "Ansuz",
    "cards.runes.Ansuz.meaning": "Divine communication, inspiration, wisdom",
    "cards.runes.Raidho.name": "Raidho",
    "cards.runes.Raidho.meaning": "Journey, movement, progression",
    "cards.runes.Kenaz.name": "Kenaz",
    "cards.runes.Kenaz.meaning": "Knowledge, creativity, illumination",
    "cards.runes.Gebo.name": "Gebo",
    "cards.runes.Gebo.meaning": "Gift, exchange, partnership",
    "cards.runes.Wunjo.name": "Wunjo",
    "cards.runes.Wunjo.meaning": "Joy, happiness, harmony",
    "cards.runes.Hagalaz.name": "Hagalaz",
    "cards.runes.Hagalaz.meaning": "Disruption, forced change, purification",
    "cards.runes.Nauthiz.name": "Nauthiz",
    "cards.runes.Nauthiz.meaning": "Necessity, constraint, karmic lesson",
    "cards.runes.Isa.name": "Isa",
    "cards.runes.Isa.meaning": "Ice, stagnation, patience",
    "cards.runes.Jera.name": "Jera",
    "cards.runes.Jera.meaning": "Harvest, cycles, reward",
    "cards.runes.Eihwaz.name": "Eihwaz",
    "cards.runes.Eihwaz.meaning": "Endurance, protection, spiritual connection",
    "cards.runes.Perthro.name": "Perthro",
    "cards.runes.Perthro.meaning": "Mystery, destiny, hidden forces",
    "cards.runes.Algiz.name": "Algiz",
    "cards.runes.Algiz.meaning": "Divine protection, connection to guides",
    "cards.runes.Sowilo.name": "Sowilo",
    "cards.runes.Sowilo.meaning": "Success, victory, solar energy",
    "cards.runes.Tiwaz.name": "Tiwaz",
    "cards.runes.Tiwaz.meaning": "Victory, justice, honorable sacrifice",
    "cards.runes.Berkano.name": "Berkano",
    "cards.runes.Berkano.meaning": "Growth, fertility, new cycle",
    "cards.runes.Ehwaz.name": "Ehwaz",
    "cards.runes.Ehwaz.meaning": "Movement, progress, partnership",
    "cards.runes.Mannaz.name": "Mannaz",
    "cards.runes.Mannaz.meaning": "Humanity, self, intelligence",
    "cards.runes.Laguz.name": "Laguz",
    "cards.runes.Laguz.meaning": "Water, intuition, emotions",
    "cards.runes.Ingwaz.name": "Ingwaz",
    "cards.runes.Ingwaz.meaning": "Masculine fertility, creative energy",
    "cards.runes.Dagaz.name": "Dagaz",
    "cards.runes.Dagaz.meaning": "Awakening, transformation, new day",
    "cards.runes.Othala.name": "Othala",
    "cards.runes.Othala.meaning": "Heritage, property, family tradition",

    // Card Names and Meanings - Daily
    "cards.daily.NouveauDepart.name": "New Beginning",
    "cards.daily.NouveauDepart.meaning":
      "Today marks the end of an important cycle and the opening of a whole new chapter in your life. It is a privileged moment to dare to break through the barriers that have held you back until now, whether in your personal, professional, or romantic life. The universe sends you a message of encouragement: move forward without fear, trust your intuition, and be receptive to the opportunities that arise. Every small step you take today, even if it seems modest, builds the foundation for a richer, calmer, and deeply fulfilling future. This renewal invites you to let go of the past, renew yourself, and fully embrace the changes that will lead you toward your well-being.",
    "cards.daily.Patience.name": "Patience",
    "cards.daily.Patience.meaning":
      "This reading reminds you that some things take time to manifest. Don’t get discouraged if results take a while to appear: patience is your greatest asset today. Take the time to observe, breathe deeply, and accept the natural rhythm of events. The inner calm you cultivate will allow you to stay serene in the face of challenges and will be the key to attracting success and good opportunities at the perfect moment. Remember, everything comes in its own time, and perseverance always pays off.",
    "cards.daily.Creativite.name": "Creativity",
    "cards.daily.Creativite.meaning":
      "Your mind is especially fertile today. Let your ideas flow freely, even the most unexpected ones, as they could turn into brilliant solutions or promising projects. Creativity is not only artistic: it also enlightens your choices, relationships, and challenges. Listen to your deep inspirations and dare to bring them to life with confidence. By unleashing this creative energy, you open the door to unprecedented opportunities that will nurture your personal and professional growth. Don’t hesitate to experiment and follow your intuition, as your originality is your greatest strength today.",
    "cards.daily.Amour.name": "Love",
    "cards.daily.Amour.meaning":
      "Today’s energy is focused on the heart. Express your tenderness and gratitude towards your loved ones, as a simple gesture can have a great impact. If you are in a relationship, strengthen your bonds with sincere and authentic attentions that nourish your connection. If you are single, open yourself to the possibility of new encounters: love may appear where you least expect it. Be attentive to your emotions and let your heart guide your actions. This day favors affectionate exchanges and moments of complicity, essential for your emotional balance.",
    "cards.daily.Courage.name": "Courage",
    "cards.daily.Courage.meaning":
      "Challenges may arise today, but you possess the strength and resilience needed to overcome them. Courage does not mean the absence of fear, but the ability to act despite it. By facing your obstacles with determination, you will gain confidence and maturity. Each courageous step you take will reinforce your path and affirm your worth, bringing about deep personal growth.",
    "cards.daily.Intuition.name": "Intuition",
    "cards.daily.Intuition.meaning":
      "Your inner voice is especially strong today. Trust your gut feelings, even if you cannot always explain them logically. They will guide you toward choices that align more closely with your true needs and life path. Take a moment of silence to listen to your feelings, as your intuition holds the answers to the questions you are currently asking yourself and will support you in important decisions.",
    "cards.daily.Gratitude.name": "Gratitude",
    "cards.daily.Gratitude.meaning":
      "Take a moment to deeply appreciate what you already have. Recognizing your blessings, even the smallest ones, attracts even more positivity into your life and opens the door to new opportunities. Cultivating gratitude today will help you feel more inner peace and strengthen your connections with others.",
    "cards.daily.Communication.name": "Communication",
    "cards.daily.Communication.meaning":
      "Express yourself with clarity and kindness today. Your words have the power to ease tensions, inspire those around you, and strengthen important bonds in your life. Sincere and respectful communication paves the way for better mutual understanding and deeply enriching exchanges.",
    "cards.daily.Equilibre.name": "Balance",
    "cards.daily.Equilibre.meaning":
      "Today, find balance between what you give to others and what you need for yourself. It’s important not to forget yourself in the name of responsibilities. Taking care of yourself also means caring for your energy and inner well-being. By cultivating this harmony, you will move forward more aligned and serene on your path.",
    "cards.daily.Confiance.name": "Confidence",
    "cards.daily.Confiance.meaning":
      "Believe fully in your abilities today and move forward with assured energy. Self-confidence is a precious inner strength that makes you stronger, clearer in your choices, and more aligned with your truth. Even if doubt arises, remember that every step taken in faith brings you closer to your true successes.",
    "cards.daily.Lacher-prise.name": "Letting Go",
    "cards.daily.Lacher-prise.meaning":
      "Today, release yourself from the burdens of the past and worries that no longer serve you. What you cannot control does not deserve to drain your energy. By choosing to let go, you open the way to greater inner peace and clarity. You will feel lighter, more centered, and ready to welcome what comes with confidence.",
    "cards.daily.Joie.name": "Joy",
    "cards.daily.Joie.meaning":
      "Open your heart today to the simple joy found in small moments: a smile, a sincere gesture, a bright thought. Even amidst responsibilities, this positive energy can transform your mindset. By cultivating joy, you become more radiant, more present, and naturally attract experiences that nourish your well-being.",
    "cards.daily.Sagesse.name": "Wisdom",
    "cards.daily.Sagesse.meaning":
      "Slow down today and allow yourself a moment of reflection before taking action. Your inner wisdom is a precious ally: it guides, protects, and enlightens you in your choices. By connecting with this calm and clear voice, you will become more grounded, clearer in your decisions, and capable of seeing beyond appearances.",
    "cards.daily.Transformation.name": "Transformation",
    "cards.daily.Transformation.meaning":
      "Welcome the changes coming your way today, even if they seem unsettling at first. These transformations are not accidental: they push you to grow, evolve, and move closer to the best version of yourself. By embracing this flow, you will become more aligned, more confident, and ready to step into a new phase.",
    "cards.daily.Abondance.name": "Abundance",
    "cards.daily.Abondance.meaning":
      "Remember that you already possess all the resources you need to succeed. True abundance manifests when you fully believe in your potential and open yourself to the opportunities around you. Have confidence in your abilities, for you hold the strength to attract everything you need to thrive today and beyond.",
    "cards.daily.Paix.name": "Peace",
    "cards.daily.Paix.meaning":
      "Cultivate inner peace by releasing the tensions and conflicts around you. The serenity you find will bring clarity of mind and the harmony needed to move forward with calm today.",
    "cards.daily.Force.name": "Strength",
    "cards.daily.Force.meaning":
      "Draw deeply from your inner strength, which is far greater than you imagine. It supports you through challenges, gives you courage and resilience, and helps you move forward with confidence despite obstacles.",
    "cards.daily.Pardon.name": "Forgiveness",
    "cards.daily.Pardon.meaning":
      "Offer forgiveness, both to yourself and others. This powerful act frees your heart from the burdens of the past and opens the way to true inner healing, allowing you to move forward lighter and more at peace.",
    "cards.daily.Espoir.name": "Hope",
    "cards.daily.Espoir.meaning":
      "Hold onto hope, even in difficult times. Light always returns, just like the sun after the darkest night. This message encourages you to cultivate patience and trust in a better future, as every trial prepares a promising renewal that will grow and flourish in its own time.",
    "cards.daily.Action.name": "Action",
    "cards.daily.Action.meaning":
      "The time has come to take action. Don’t leave your projects on hold any longer; today is the day things move forward. Dare to take the step with confidence, as every initiative you take brings you closer to your goals and opens new doors in your life.",
    "cards.daily.Compassion.name": "Compassion",
    "cards.daily.Compassion.meaning":
      "Show compassion to yourself and others. Kindness softens hearts and strengthens bonds. By cultivating this gentleness, you create a space for healing and understanding, essential both for you and those around you. This message invites you to open your heart fully today, listen without judgment, and offer your support with empathy. By doing so, you contribute to a harmonious atmosphere and nurture your own inner peace.",
    "cards.daily.Inspiration.name": "Inspiration",
    "cards.daily.Inspiration.meaning":
      "Open your eyes and mind wide to everything around you. Inspiration hides in the details of everyday life, ready to fuel your creativity and spark new ideas. This message encourages you to stay curious and open, welcoming signs and sparks that can illuminate your path. Take the time to listen to these impulses—they will guide you toward innovative solutions and moments of renewed joy.",
    "cards.daily.Determination.name": "Determination",
    "cards.daily.Determination.meaning":
      "Your perseverance and willpower are your greatest allies today. Even if obstacles arise, keep moving forward with confidence and determination. Your tenacity will help you overcome challenges and open the way to lasting success. This message urges you not to give up, as every effort counts and brings you closer to your most cherished goals.",
    "cards.daily.Aventure.name": "Adventure",
    "cards.daily.Aventure.meaning":
      "Step out of your routine and dare to discover new experiences today. Whether big or small, this adventure will nourish your mind and warm your heart. Take time to explore, marvel, and allow yourself to be surprised. This message encourages you to broaden your horizons and embrace change with enthusiasm.",
    "cards.daily.Reconciliation.name": "Reconciliation",
    "cards.daily.Reconciliation.meaning":
      "It is time to heal your inner wounds and make peace with your past. Reconciliation brings freedom and lightness, allowing you to move forward more peacefully on your path. Welcome this process with kindness and let yourself be transformed by this inner healing.",
    "cards.daily.Innovation.name": "Innovation",
    "cards.daily.Innovation.meaning":
      "Today, let your original ideas come to life. Your ability to think differently is a true treasure that can transform your projects and inspire those around you. Don’t hesitate to step off the beaten path and boldly express your unique creativity to open new doors.",
    "cards.daily.Connexion.name": "Connection",
    "cards.daily.Connexion.meaning":
      "Strengthen your bonds with others, but also with yourself. Authentic connections nourish your soul, provide support and comfort, and remind you that you are never alone. Take the time to listen and share sincerely; this will bring you balance and fulfillment.",
    "cards.daily.Prosperite.name": "Prosperity",
    "cards.daily.Prosperite.meaning":
      "Prosperity is entering your life in many forms—material, emotional, or spiritual. Welcome this abundance with gratitude and trust. Be open to receiving and sharing what life offers you today to strengthen both your inner and outer wealth.",
    "cards.daily.Authenticite.name": "Authenticity",
    "cards.daily.Authenticite.meaning":
      "Stay true to your values and your genuine self. Your authenticity attracts the right people and guides you toward choices that align with your heart. Don’t be afraid to show who you really are; it is in this sincerity that you will find your strength and inner peace.",
    "cards.daily.Revelation.name": "Revelation",
    "cards.daily.Revelation.meaning":
      "A hidden truth or important realization is about to surface. Stay alert and keep an open mind to welcome this revelation. Be ready to receive this new insight as it can transform your perspective and help you move forward with greater clarity.",
    "cards.daily.Protection.name": "Protection",
    "cards.daily.Protection.meaning":
      "You are surrounded by kindness and protective forces watching over you. Trust this protection—it supports you in your choices and steps. Have no fear today; let this reassuring energy soothe and guide you.",
    "cards.daily.Renaissance.name": "Rebirth",
    "cards.daily.Renaissance.meaning":
      "A new cycle opens before you, inviting you to release everything that belongs to the past. Embrace this rebirth as a precious opportunity to reinvent, grow, and renew yourself. Dare to turn the page and fully embrace this fresh start.",
    "cards.daily.Clarte.name": "Clarity",
    "cards.daily.Clarte.meaning":
      "The answers you seek will soon be revealed. Step back, carefully observe the signs around you, and let the fog gradually clear. This newfound clarity will help you make enlightened decisions aligned with your inner truth. Take a calm moment today to reflect before acting—it will allow you to see the situation from a clearer perspective.",
    "cards.daily.Passion.name": "Passion",
    "cards.daily.Passion.meaning":
      "Follow what truly excites you, for your enthusiasm is a powerful energy that can transform your life. Nurture this inner flame, give it room to grow, and let it guide your choices toward what makes you feel alive. Spend time today on what lights up your heart—even small actions will boost your motivation and joy of living.",
    "cards.daily.Equite.name": "Fairness",
    "cards.daily.Equite.meaning":
      "Justice and balance will soon be restored in your affairs. Stay honest and patient—your fair actions will bear fruit and bring harmony around you. Keep a cool head when facing challenges, and continue acting with integrity and respect, even if results take time.",
    "cards.daily.Harmonie.name": "Harmony",
    "cards.daily.Harmonie.meaning":
      "All parts of your life are aligning today. Use this time to strengthen what’s working well and establish routines that nurture your physical, mental, and emotional well-being. Take moments to listen to yourself and balance the different areas of your life to maintain this beautiful harmony long-term.",
    "cards.daily.Eveil.name": "Awakening",
    "cards.daily.Eveil.meaning":
      "Your awareness expands today, opening the door to new perspectives and a deeper understanding of yourself and the world around you. Welcome these insights with openness and curiosity—they can transform how you see life and guide your next steps toward a more authentic path. Reflect on what these revelations mean for you, and dare to act in alignment with this newfound clarity.",
    "cards.daily.Generosite.name": "Generosity",
    "cards.daily.Generosite.meaning":
      "Give generously today—not out of obligation, but from the heart. This sincere and selfless gesture will create a circle of reciprocity around you and attract enriching experiences into your life. Be attentive to others’ needs while making sure you don’t forget to care for yourself in this generous flow.",
    "cards.daily.Perseverance.name": "Perseverance",
    "cards.daily.Perseverance.meaning":
      "Don’t give up now—your determination is about to pay off. Keep going with consistency and discipline; victory is closer than you think. Stay the course even if the path seems long, as every effort brings you nearer to your goal.",
    "cards.daily.Simplicite.name": "Simplicity",
    "cards.daily.Simplicite.meaning":
      "The solution is often simpler than you imagine. Focus on what really matters, eliminate the unnecessary, and you’ll find clear and effective answers. Simplify your life today to better concentrate on what truly counts.",
    "cards.daily.Legerete.name": "Lightness",
    "cards.daily.Legerete.meaning":
      "Adopt a light-hearted attitude today: laugh, play, and shed unnecessary burdens. This lightness will open you to pleasure and creativity. Allow yourself to have fun and step back to move forward more freely.",
    "cards.daily.Ancrage.name": "Grounding",
    "cards.daily.Ancrage.meaning":
      "Return to your roots to find stability and strength. Simple practices like breathing, walking, or regular routines will help you recentre and move forward with greater calm. Take time to connect with yourself and the present moment.",
    "cards.daily.Mystere.name": "Mystery",
    "cards.daily.Mystere.meaning":
      "Accept what you cannot yet understand. Mystery is part of life’s magic: by making space for the unknown, you open the door to revelations that will unfold at the right time. Trust in the timing and stay open to the surprises the universe sends your way.",
    "cards.daily.Celebration.name": "Celebration",
    "cards.daily.Celebration.meaning":
      "Now is the time to celebrate your successes, even the smallest ones. Acknowledging your accomplishments nurtures your self-confidence and attracts even more reasons to rejoice. Take time to congratulate yourself and share your joy with those around you.",
    "cards.daily.Guidance.name": "Guidance",
    "cards.daily.Guidance.meaning":
      "Today, unexpected help or subtle signs may appear on your path. Stay attentive to the small synchronicities crossing your way, as they carry important messages. These signs will guide you toward wiser, more beneficial choices. Welcome these indications with confidence—they open the door to a new and favorable direction.",
    "cards.daily.Purification.name": "Purification",
    "cards.daily.Purification.meaning":
      "This is an ideal time to clear out what no longer serves you, both around you and within. By freeing your space and mind from excess, you invite a breath of renewal. This purification creates a fertile environment for positive transformations, releasing your energy to welcome new opportunities with clarity and lightness.",
    "cards.daily.Vision.name": "Vision",
    "cards.daily.Vision.meaning":
      "Your vision for the future becomes clearer today. Identify the direction that calls to you and move forward with confidence toward this newly revealed horizon. Keep an open mind to the possibilities before you and let this inner clarity guide you toward your most authentic goals.",

    // Card Names and Meanings - Tarot
    "cards.tarot.LeFou.name": "The Fool",
    "cards.tarot.LeFou.meaning": "New beginnings, spontaneity, freedom",
    "cards.tarot.LeFou.meaning.var1":
      "The Fool represents a new beginning in your life. It's time to trust your instincts and take a leap into the unknown, even without having all the answers. This card invites you to step out of your comfort zone. In practical terms, this could mean applying for a job that intimidates you, starting an important conversation you've been putting off, or launching that project you've been planning for months. The Fool tells you: don’t wait until you're completely ready, because that moment will never come. Start now. However, be careful not to confuse spontaneity with recklessness. Do some basic research, but don’t let fear paralyze you.",
    "cards.tarot.LeFou.meaning.var2":
      "This card signals a breath of fresh air and newness in your life. You're at a turning point where innocence and curiosity can be your best allies. The Fool encourages you to look at your situation with fresh eyes, as if seeing it for the first time. In your daily life, ask yourself where you feel stuck due to habits or fears. That’s where the Fool’s energy can work. Maybe you need to try a new approach in your relationships, experiment with a different method at work, or simply accept that you can’t control everything. Take that first step with lightness. The trap would be to jump in with zero preparation: be spontaneous, but not naive.",
    "cards.tarot.LeFou.meaning.var3":
      "The Fool brings you a message of freedom and renewal. It’s the beginning of a cycle where you can reinvent yourself. This card asks you to embrace the courage of innocence — the ability to believe things are possible despite apparent obstacles. On a practical level, identify what’s currently holding you back. Is it fear of judgment? Fear of failure? The Fool advises you to move forward despite these doubts. Start small if needed: a phone call, a registration, a conversation. What matters is taking action. Still, stay alert: the Fool’s optimism should not lead you to ignore real warning signs. Also listen to your caution.",
    "cards.tarot.LeBateleur.name": "The Magician",
    "cards.tarot.LeBateleur.meaning": "Creativity, communication, new project",
    "cards.tarot.LeBateleur.meaning.var1":
      "The Magician brings you a wave of novelty and excitement. You are at the dawn of a new beginning, full of promises and creative momentum. All the resources are already within you: confidence, ideas, energy. This card invites you to take bold steps and act, even if the path isn’t fully clear yet. It's the perfect moment to launch a project, express an idea, or simply believe in your ability to turn potential into reality. In love or at work, this impulse can change everything.",
    "cards.tarot.LeBateleur.meaning.var2":
      "The Magician marks the start of a personal or professional adventure. You are becoming aware of your power to act and choose. This card symbolizes a youthful spirit, creativity, and the desire to build on solid ground. If you’re in a moment of hesitation, The Magician reminds you that the first step is often the most important. An inspiring encounter, an unexpected opportunity, or a sudden idea could show you the way. Stay open and curious.",
    "cards.tarot.LeBateleur.meaning.var3":
      "The Magician is a symbol of bold renewal. It encourages you to connect with your vital energy and move forward with confidence. What you begin now has the potential to endure, as long as you commit to it with willpower and heart. This card often appears when you're ready to take back control of your life. A moment of clarity offers you the chance to realign your actions with your deepest values. Now is the time to build with clarity and enthusiasm.",
    "cards.tarot.LaPapesse.name": "The High Priestess",
    "cards.tarot.LaPapesse.meaning": "Intuition, mystery, hidden knowledge",
    "cards.tarot.LaPapesse.meaning.var1":
      "The High Priestess invites you to slow down and listen. A subtle yet profound transformation is underway. She reminds you that the answers are not outside, but within. Through your intuition, you are moving toward a change that is fair and aligned. This is a time for observation, reflection, and reconnecting with what you truly feel. Action will come later — for now, let inner wisdom guide you.",
    "cards.tarot.LaPapesse.meaning.var2":
      "The High Priestess appears when you're ready to grasp deeper truths. She speaks of inner maturity and a path revealed in silence and introspection. Your decisions won't be made lightly — they will come from a place of clarity and alignment. This card may also signal the birth of a trusting connection, or the strengthening of a bond already present. You move forward with grace, protected by a soft, ancient force.",
    "cards.tarot.LaPapesse.meaning.var3":
      "The High Priestess is the guardian of mysteries and hidden knowledge. She encourages you to trust what you sense, even if it defies logic. Right now, there's no need to act — only to understand, to feel, to center yourself. Your future choices will be stronger when rooted in your inner truth. The High Priestess invites you to dive deep into your inner world to rise again with clarity and wisdom.",
    "cards.tarot.LImperatrice.name": "The Empress",
    "cards.tarot.LImperatrice.meaning":
      "Fertility, abundance, feminine creativity",
    "cards.tarot.LImperatrice.meaning.var1":
      "The Empress invites you to regain confidence in your ability to create, understand, and lead with intelligence. She symbolizes an active, clear, and generous femininity. You are ready to bring something concrete into being: an idea, a project, or a relationship. Thanks to your analytical mind and sharp intuition, you can lay solid foundations for a flourishing future. It is the ideal time to act with balance: consciously, without rushing, but with determination.",
    "cards.tarot.LImperatrice.meaning.var2":
      "The Empress reconnects you to your creative power. Her energy pushes you to structure your ideas and turn them into reality. She speaks of clarity, autonomy, and beauty in action. You do not act chaotically: you build wisely, relying on your experience. What you conceive now has the potential to grow and flourish fully. It is an invitation to embrace your natural authority, without arrogance, but with confidence.",
    "cards.tarot.LImperatrice.meaning.var3":
      "The Empress watches over your evolution with wisdom. She reminds you that true strength lies in clarity of mind and self-control. Your power lies in your ability to make enlightened decisions, show discernment, and assert yourself without dominating. This arcana encourages you to express your intelligence, nurture your creativity, and guide others without losing yourself. The future is written consciously. You hold the keys.",
    "cards.tarot.LEmpereur.name": "The Emperor",
    "cards.tarot.LEmpereur.meaning": "Authority, structure, leadership",
    "cards.tarot.LEmpereur.meaning.var1":
      "The Emperor brings you authority, structure, and leadership. You are ready to take control and build a stable foundation. This card encourages you to act with confidence and responsibility. Your decisions will have a lasting impact, so lead with wisdom and strength.",
    "cards.tarot.LEmpereur.meaning.var2":
      "With the Emperor, order and discipline guide your path. You have the ability to organize your environment and assert your power wisely. Take a step forward and assume your role as a leader. Structure and clarity will open doors to new opportunities.",
    "cards.tarot.LEmpereur.meaning.var3":
      "The Emperor symbolizes a solid and reliable presence. You are ready to offer guidance and support to those around you. Use your experience and authority to create stability and growth. Find the balance between firmness and justice to achieve the best results.",
    "cards.tarot.LePape.name": "The Hierophant",
    "cards.tarot.LePape.meaning": "Traditional wisdom, spiritual guidance",
    "cards.tarot.LePape.meaning.var1":
      "The Hierophant invites you to connect with your inner wisdom and seek answers in tradition and experience. You are ready to guide or be guided with kindness. This card speaks of transmission, wise advice, and progress rooted in deep values. An important decision may arise: base your choice on what is right, not on impulse.",
    "cards.tarot.LePape.meaning.var2":
      "The Hierophant represents a solid support in a time when you seek stability and truth. He encourages you to listen to the teachings of the past to better understand the present. You are ready to pass on or receive essential knowledge. This card may also indicate the presence of a mentor or spiritual figure helping you move forward.",
    "cards.tarot.LePape.meaning.var3":
      "A symbol of wisdom and tradition, the Hierophant invites you to step back and reflect with clarity. You are in a phase where intuition and reason must work together. You are ready to embody your values, show patience, and build lasting foundations. Now is the time to trust the slow but powerful process of growth.",
    "cards.tarot.LAmoureux.name": "The Lovers",
    "cards.tarot.LAmoureux.meaning": "Choices, relationships, harmony",
    "cards.tarot.LAmoureux.meaning.var1":
      "The Lovers invite you to make an important decision, often related to emotions, relationships, or your core values. You are ready to follow what resonates with you, even if the path isn’t fully clear yet. This card encourages you to listen to your heart, balance passion with reason, and commit with awareness. Harmony will come when you fully own your choice.",
    "cards.tarot.LAmoureux.meaning.var2":
      "The Lovers symbolize a time of deep connection, either with yourself or another person. You are in a moment where emotions take space and need clarity. You are ready to open your heart and live a sincere relationship, or make peace with a part of yourself. This card invites you to align your desires with your actions.",
    "cards.tarot.LAmoureux.meaning.var3":
      "In the face of a difficult decision, the Lovers remind you that love, in all its forms, takes courage. You are ready to choose what truly nourishes you. This is not about pleasing others, but staying true to what makes your soul resonate. Personal alignment is the key to real harmony.",
    "cards.tarot.LeChariot.name": "The Chariot",
    "cards.tarot.LeChariot.meaning": "Victory, willpower, determination",
    "cards.tarot.LeChariot.meaning.var1":
      "The Chariot encourages you to take the reins of your life with determination. You are ready to move forward, overcome obstacles, and assert your will. This card symbolizes victory through self‑mastery, clarity of goals, and the courage to press on. Nothing can stop you if you stay focused on your direction.",
    "cards.tarot.LeChariot.meaning.var2":
      "The Chariot heralds rapid and controlled progress. You are in a momentum of movement, conquest, and healthy ambition. You are ready to lead with confidence without losing your inner balance. This card invites you to channel opposing forces, stay centered, and move forward with trust toward what you truly want.",
    "cards.tarot.LeChariot.meaning.var3":
      "With The Chariot, you enter a phase of active success. You are ready to act, take on challenges, and emerge victorious thanks to your discipline and decisiveness. It’s a card of triumph over doubts and hesitations. Move forward with faith in yourself, the path opens ahead of you.",
    "cards.tarot.LaJustice.name": "Justice",
    "cards.tarot.LaJustice.meaning": "Balance, fairness, truth",
    "cards.tarot.LaJustice.meaning.var1":
      "Justice calls you to exercise discernment. You are ready to see things clearly, face the consequences of your actions, and make fair decisions. This card pushes you to seek inner balance and act in alignment with your values. Truth is a powerful ally, by embracing it, you gain clarity and strength.",
    "cards.tarot.LaJustice.meaning.var2":
      "With Justice, you're entering a period of regulation, responsibility, and rebalancing. You are ready to make informed decisions, even if they require courage and impartiality. This card signals that it's time to bring order, repair what needs to be fixed, or make a fair call. You are moving toward greater maturity.",
    "cards.tarot.LaJustice.meaning.var3":
      "Justice guides you toward honesty and fairness. It invites you to observe your situation without illusion and trust your inner judgment. You are ready to restore broken balance, say what must be said, and act as a responsible adult. This card encourages you to sort out what is truly right for you and what no longer is.",
    "cards.tarot.LHermite.name": "The Hermit",
    "cards.tarot.LHermite.meaning": "Introspection, inner wisdom, guidance",
    "cards.tarot.LHermite.meaning.var1":
      "The Hermit invites you on a deep inner journey. You are ready to withdraw from the external noise to seek truth within yourself. This chosen solitude allows you to draw on your wisdom and better understand your path.",
    "cards.tarot.LHermite.meaning.var2":
      "With The Hermit, you enter a phase of reflection and inner guidance. You are ready to listen to your inner voice, even if it leads you down less traveled paths. This card encourages patience and discernment.",
    "cards.tarot.LHermite.meaning.var3":
      "The Hermit guides you toward introspection and inner light. You are ready to detach from outside influences to better hear your deep wisdom. This card urges you to move forward cautiously but with strengthened inner certainty.",
    "cards.tarot.LaRouedeFortune.name": "The Wheel of Fortune",
    "cards.tarot.LaRouedeFortune.meaning": "Change, cycles, destiny",
    "cards.tarot.LaRouedeFortune.meaning.var1":
      "The Wheel of Fortune invites you to embrace change as a natural force. You are ready to follow the cycles of life, even when they lead you into the unknown. This card reminds you that destiny is in motion, and adaptability is key to moving forward.",
    "cards.tarot.LaRouedeFortune.meaning.var2":
      "With the Wheel of Fortune, a new chapter begins. You are ready to turn the page, welcome twists of fate, and learn from past experiences. This card symbolizes transformation and ongoing evolution.",
    "cards.tarot.LaRouedeFortune.meaning.var3":
      "The Wheel of Fortune guides you through life’s ups and downs with wisdom. You are ready to understand that every cycle has an end and a beginning. This card encourages you to stay open to life’s flow, with trust and harmony in your path.",
    "cards.tarot.LaForce.name": "Strength",
    "cards.tarot.LaForce.meaning": "Courage, patience, inner mastery",
    "cards.tarot.LaForce.meaning.var1":
      "Strength reminds you that your true power lies in gentleness and patience. You are ready to channel your energy, tame impulses, and face challenges with calm determination. This card speaks of inner mastery and quiet courage. Favor consistency over haste; it will carry you further than raw force.",
    "cards.tarot.LaForce.meaning.var2":
      "With Strength, you are invited to draw on your moral fortitude to overcome obstacles. You are ready to face trials without being overwhelmed, with confidence in yourself and your abilities. This card encourages resilience and steadiness. Take a breath before acting—serenity is your best ally.",
    "cards.tarot.LaForce.meaning.var3":
      "Strength symbolizes inner courage and the ability to remain aligned amid tension. You are ready to show composure, master your fears, and turn adversity into personal growth. This card urges you to trust your inner stability. Hold your head high and move forward fearlessly—your inner peace will open the right doors.",
    "cards.tarot.LePendu.name": "The Hanged Man",
    "cards.tarot.LePendu.meaning": "Sacrifice, new perspective, letting go",
    "cards.tarot.LePendu.meaning.var1":
      "The Hanged Man invites you to shift your perspective. You are ready to release old patterns and view your situation through a new lens, even if it means a temporary sacrifice. This card speaks of acceptance and patience. Sometimes, letting go is the first step to finding freedom.",
    "cards.tarot.LePendu.meaning.var2":
      "With the Hanged Man, you enter a phase of necessary pause. You are ready to suspend action in order to better understand what lies beneath. This moment of stillness is not weakness, but a transition toward greater clarity. Embrace this stillness as fertile ground for transformation.",
    "cards.tarot.LePendu.meaning.var3":
      "The Hanged Man symbolizes a time when surrender becomes essential. You are ready to release what no longer serves your growth, even if it requires courage and humility. This card guides you toward awakening through simplicity. Drop your resistance — emptiness can be the doorway to renewal.",
    "cards.tarot.LArcanesansnom.name": "Death",
    "cards.tarot.LArcanesansnom.meaning": "Transformation, endings, renewal",
    "cards.tarot.LArcanesansnom.meaning.var1":
      "Don’t be misled by its name: Death symbolizes deep transformation, not a tragic end. You are ready to leave behind an old phase of your life to open the way to a renewal more aligned with who you have become. This Arcana without a name frees you from what weighed you down so you can move lighter in your metamorphosis.",
    "cards.tarot.LArcanesansnom.meaning.var2":
      "Death is not a negative card, but an invitation to radical change. You are readyto turn an important page, to close a chapter that no longer resonates with your present. This passage may feel uncomfortable, but it carries rebirth and new opportunities. Embrace letting go of what clings to the past to better welcome what is coming.",
    "cards.tarot.LArcanesansnom.meaning.var3":
      "This Arcana without a name marks a necessary ending for sustainable transformation. Contrary to appearances, this card speaks more of life than death: it evokes an inner cleansing. You are ready to shed what no longer serves, to mourn illusions or obsolete habits. What you release today lays the groundwork for tomorrow’s growth.",
    "cards.tarot.Temperance.name": "Temperance",
    "cards.tarot.Temperance.meaning": "Moderation, harmony, healing",
    "cards.tarot.Temperance.meaning.var1":
      "Temperance invites you to softness and harmony. You are ready to calm your emotions, avoid extremes and find the middle ground. This card speaks of inner healing, a time of integration where everything gently realigns. Embrace patience: things settle when you honor your own tempo.",
    "cards.tarot.Temperance.meaning.var2":
      "With Temperance, a phase of peace opens before you. You are ready to let opposites converse, to listen as much as express yourself, to build a bridge between parts of you that seemed opposed. This card evokes the alchemy of heart and mind. Give yourself permission to slow down to better align.",
    "cards.tarot.Temperance.meaning.var3":
      "Temperance symbolizes a regained balance, an inner peace that settles with maturity. You are ready to let flow what must flow, without forcing or holding back. It’s time to reconnect with your center, with that quiet stability that supports you. Nurture that delicate balance, it is your strength.",
    "cards.tarot.LeDiable.name": "The Devil",
    "cards.tarot.LeDiable.meaning": "Addiction, illusions, materialism",
    "cards.tarot.LeDiable.meaning.var1":
      "The Devil confronts you with your invisible chains. You are ready to recognize the dependencies that limit you, whether material, emotional, or mental. This card invites you to break the illusions that keep you from seeing the truth and to reclaim your inner power. Dare to free yourself from what binds you.",
    "cards.tarot.LeDiable.meaning.var2":
      "With The Devil, you face your temptations and deep fears. This card encourages you to look beyond appearances and understand the roots of your compulsive behaviors. By becoming aware, you can begin to untangle the knots that hold you back. Remember, light always pierces darkness.",
    "cards.tarot.LeDiable.meaning.var3":
      "The Devil urges you to examine your relationship with material things and immediate pleasures. You are ready to question your values and see if certain illusions control your choices. This card reminds you that true freedom comes from awareness and self-mastery. Seek to transform your chains into strengths.",
    "cards.tarot.LaMaisonDieu.name": "The Tower",
    "cards.tarot.LaMaisonDieu.meaning":
      "Sudden upheaval, revelation, radical change",
    "cards.tarot.LaMaisonDieu.meaning.var1":
      "The Tower shakes you suddenly, revealing hidden truths. You are ready to embrace this radical change, even if it feels unsettling. This card invites you to accept the necessary transformation to rebuild on stronger foundations. Sometimes, you must let go of the old to be reborn stronger.",
    "cards.tarot.LaMaisonDieu.meaning.var2":
      "With The Tower, a sudden revelation disrupts your reality. You are ready to face the destruction of beliefs that no longer serve you. This moment of chaos signals a powerful liberation, allowing you to free yourself from what holds you back. Keep faith, after the storm comes clarity.",
    "cards.tarot.LaMaisonDieu.meaning.var3":
      "The Tower invites you to accept the necessary breaks for your evolution. You are readyto abandon fragile constructs to open the way to deep renewal. This card reminds you that painful falls often prepare the most beautiful rebirths.",
    "cards.tarot.LEtoile.name": "The Star",
    "cards.tarot.LEtoile.meaning": "Hope, inspiration, divine guidance",
    "cards.tarot.LEtoile.meaning.var1":
      "The Star brings you a breath of hope and inspiration. You are readyto believe in a better future and to follow the divine guidance that lights your path. Don’t hesitate to connect with your inner light to move forward with confidence.",
    "cards.tarot.LEtoile.meaning.var2":
      "With The Star, a period of spiritual renewal opens up to you. You are ready to receive messages from the universe and to be guided by your intuition. Stay open and nurture trust in yourself and in life.",
    "cards.tarot.LEtoile.meaning.var3":
      "The Star invites you to keep faith, even in moments of uncertainty. You are ready to be inspired and to pursue your dreams with patience and serenity. Take the time to reconnect with what deeply nourishes you.",
    "cards.tarot.LaLune.name": "The Moon",
    "cards.tarot.LaLune.meaning": "Illusions, subconscious, intuition",
    "cards.tarot.LaLune.meaning.var1":
      "The Moon invites you to explore your subconscious and listen to your intuition. You are ready to accept that things are not always clear and that illusions can deceive you. Stay attentive to the subtle signs guiding you through the shadows.",
    "cards.tarot.LaLune.meaning.var2":
      "With The Moon, deep mysteries and emotions surface. You are ready to dive within yourself, even if it brings doubts or fears. Don’t reject your feelings; they help you understand yourself better.",
    "cards.tarot.LaLune.meaning.var3":
      "The Moon encourages you to trust your intuition despite the uncertainties and illusions around you. You are ready to move forward accepting the unknown and to free yourself from the fears that hold you back. Be patient with yourself on this journey.",
    "cards.tarot.LeSoleil.name": "The Sun",
    "cards.tarot.LeSoleil.meaning": "Joy, success, vitality",
    "cards.tarot.LeSoleil.meaning.var1":
      "The Sun brings you light and positive energy. You are ready to welcome joy and celebrate your successes. Use this vitality to move forward with confidence and enthusiasm.",
    "cards.tarot.LeSoleil.meaning.var2":
      "With The Sun, a period of clarity and optimism opens up to you. You are ready to shine, share your good mood, and attract good opportunities. Keep your heart open and savor every moment.",
    "cards.tarot.LeSoleil.meaning.var3":
      "The Sun invites you to regain your inner strength and vitality. You are ready to overcome obstacles with a positive attitude and inspire those around you. Don’t doubt your ability to succeed.",
    "cards.tarot.LeJugement.name": "Judgement",
    "cards.tarot.LeJugement.meaning":
      "Spiritual awakening, rebirth, forgiveness",
    "cards.tarot.LeJugement.meaning.var1":
      "Judgement invites you to a deep inner awakening. You are ready to acknowledge past mistakes and embrace spiritual rebirth. Welcome this transformation to move forward with lightness and clarity.",
    "cards.tarot.LeJugement.meaning.var2":
      "With Judgement, a period of forgiveness and release opens up to you. You are ready to free yourself from the burdens of the past and reconnect with your truth. Open your heart and allow yourself to be guided towards a new life.",
    "cards.tarot.LeJugement.meaning.var3":
      "Judgement urges you to listen to your inner calling and act consciously. You are ready to make peace with yourself and be reborn stronger. Do not fear change, it brings hope.",
    "cards.tarot.LeMonde.name": "The World",
    "cards.tarot.LeMonde.meaning": "Accomplishment, success, completion",
    "cards.tarot.LeMonde.meaning.var1":
      "The World symbolizes accomplishment and success. You are ready to celebrate the end of an important cycle. Enjoy this moment of fulfillment to appreciate all you have achieved and prepare for what’s next with confidence.",
    "cards.tarot.LeMonde.meaning.var2":
      "With The World, a complete cycle comes to an end, opening the door to new possibilities. You are ready to integrate the lessons learned and move forward with serenity. Welcome this stage as a personal victory.",
    "cards.tarot.LeMonde.meaning.var3":
      "The World invites you to fully experience harmony and wholeness. You are ready to recognize your worth and open yourself to the world with gratitude. Let yourself be carried by this positive energy to realize your projects.",

    // Card Names and Meanings - Angels
    "cards.angels.ArchangeMichel.name": "Archangel Michael",
    "cards.angels.ArchangeMichel.meaning":"Divine protection, courage and strength",
    "cards.angels.ArchangeMichel.meaning.var1":"Archangel Michael surrounds you with his powerful protection. He gives you the courage to face difficult situations and to defend yourself against negative energies. This card reminds you that you are never alone in the face of challenges. Practically speaking, if you feel threatened or unsettled in your life, Michael advises you to set clear boundaries. Learn to say no to people or situations that drain your energy. Protect your personal space—both physically and emotionally. His sword of light cuts toxic ties and frees you from the fears that paralyze you. Don’t hesitate to ask for help if you need it; it’s a sign of strength, not weakness.",
    "cards.angels.ArchangeMichel.meaning.var2":"This card signals the intervention of a protective force in your life. Michael asks you to rise with courage and reclaim your personal power. You’ve been through moments of vulnerability, but now it’s time to reconnect with your inner strength. In your daily life, identify what is undermining your self-confidence. Is it a toxic relationship? A suffocating work environment? Recurring negative thoughts? Michael encourages you to act decisively to change the situation. His presence assures you that you are supported in this process. Make a decision you’ve been postponing out of fear, confront someone who disrespects you, or simply assert your needs clearly.",
    "cards.angels.ArchangeMichel.meaning.var3":"Michael’s energy brings divine protection at this time in your life. He reminds you that you hold within you an unsuspected strength. This card invites you to stand tall in the face of adversity, to defend your values and convictions. On a practical level, examine where you are compromising yourself out of fear of conflict or rejection. Michael gives you the courage to stay true to yourself, even if it displeases others. His strength helps you establish healthy boundaries in your relationships. If you’re facing an injustice, now is the time to act. His shield protects you as you take a stand. Remember: true strength isn’t in aggression, but in the calm and firm affirmation of who you are.",
    "cards.angels.ArchangeGabriel.name": "Archangel Gabriel",
    "cards.angels.ArchangeGabriel.meaning":"Divine messages, creativity and communication",
    "cards.angels.ArchangeGabriel.meaning.var1":"Archangel Gabriel brings you an important message. He is the divine messenger who opens communication channels in your life. This card indicates that crucial information is coming your way, or that you are meant to share something essential. Gabriel also stimulates your creativity and encourages you to express what you carry within. Practically speaking, pay attention to signs, conversations, and opportunities that arise. This is the time to write, speak, create. If you have an artistic project in mind, go for it. If you need to have a difficult conversation, Gabriel gives you the right words. Listen to your intuition and don’t ignore the messages that come to you, even the subtle ones.",
    "cards.angels.ArchangeGabriel.meaning.var2":"Gabriel announces a time of communication and personal expression. He asks you to free your voice and share your ideas with the world. Maybe you’ve been silent for too long about something that matters to you. This card encourages you to speak, write, create—without fear of judgment. In your daily life, identify what you need to communicate. A feeling to express to someone close? A creative project to start? A truth to speak? Gabriel supports you in this process. He also facilitates the reception of important news, so stay open. Divine messages may come through unexpected means.",
    "cards.angels.ArchangeGabriel.meaning.var3":"Gabriel’s energy awakens your creativity and clarifies your communication. He reminds you that you have something unique to offer the world. This card invites you to use your artistic talents or your gift of communication. On a practical level, engage in a creative activity this week—even something simple. Write in a journal, paint, sing, decorate your space. Gabriel also unblocks situations where communication has been difficult. If you’re waiting for news, it’s coming soon. If you need to clear up a misunderstanding, now is the right time. Express yourself authentically, and truly listen to what others are saying.",
  "cards.angels.ArchangeRaphael.name": "Archangel Raphael",
    "cards.angels.ArchangeRaphael.meaning": "Physical and emotional healing",
    "cards.angels.ArchangeRaphael.meaning.var1":"Archangel Raphael wraps you in his healing energy. He soothes your physical and emotional wounds with gentleness and compassion. This card indicates that a healing process is underway in your life. Raphael reminds you that taking care of yourself is not selfish—it’s essential. Practically speaking, give yourself rest if your body is asking for it. Consult a healthcare professional if you’ve been neglecting symptoms. On an emotional level, allow yourself to feel and release repressed emotions. Raphael guides you toward the people and practices that support your healing—whether it’s medicine, therapy, or simply time for yourself.",
    "cards.angels.ArchangeRaphael.meaning.var2":"Raphael announces a time of recovery and regeneration. He asks you to slow down and listen to the needs of your body and heart. You may have pushed yourself too far, ignored warning signs, or carried heavy burdens alone. This card encourages you to ask for help and accept the support being offered to you. In your daily life, identify what needs special attention. Persistent fatigue? An unresolved emotional wound? Relationships that are hurting you? Raphael gives you the strength to make the changes necessary for your well-being. Make an appointment with a doctor, a therapist, or simply take a full day of rest.",
    "cards.angels.ArchangeRaphael.meaning.var3":"Raphael’s healing energy is working in your life right now. He helps you release past suffering and restore your inner balance. This card invites you to treat your wounds—visible or invisible—with kindness. On a practical level, adopt habits that nourish your body and mind. Eat healthily, sleep enough, move gently. For emotional wounds, consider talking to someone you trust or writing down what you feel. Raphael reminds you that healing takes time—and that’s okay. Be patient with yourself and celebrate each small step forward on this journey.",
    "cards.angels.ArchangeUriel.name": "Archangel Uriel",
    "cards.angels.ArchangeUriel.meaning": "Divine wisdom and illumination",
    "cards.angels.ArchangeUriel.meaning.var1":"Archangel Uriel illuminates your path with his divine wisdom. He helps you see complex situations clearly and understand the deeper meaning of what you are experiencing. This card indicates that an important awareness is preparing to emerge. Uriel shines light on what was in the shadows and reveals essential truths to you. Practically speaking, take time for reflection and meditation. The answers you seek are already within you; Uriel simply helps you see them. If you face a difficult decision, observe the situation from different angles. Uriel gives you the discernment needed to make the right choice. Trust sudden intuitions and moments of clarity that arise.",
    "cards.angels.ArchangeUriel.meaning.var2":"Uriel announces a period of inner illumination and deep understanding. He asks you to seek wisdom beyond appearances and trust your inner knowing. You possess more wisdom than you think. This card encourages you to study, learn, and delve into subjects that interest you. In your daily life, notice the synchronicities and coincidences that guide you. Uriel shows you patterns and hidden lessons in your experiences. If something troubles you, take a step back and observe with detachment. Wisdom often comes when we stop searching frantically and allow understanding to emerge naturally. Read, learn, question.",
    "cards.angels.ArchangeUriel.meaning.var3":"Uriel’s energy brings light and clarity into your life. He dispels confusion and allows you to see the truth of situations. This card invites you to develop your inner wisdom through observation and contemplation. Practically, create moments of silence during your day to reflect. Keep a journal to note your thoughts and insights. Uriel favors learning, so this is a good time to study a field that interests you. If you seek answers, consult books of wisdom or inspiring teachers. Uriel reminds you that true knowledge transforms; it does not remain theoretical. Apply what you learn in your concrete life.",
    "cards.angels.AngeGardien.name": "Guardian Angel",
    "cards.angels.AngeGardien.meaning": "Personal protection and guidance",
    "cards.angels.AngeGardien.meaning.var1":"Your Guardian Angel lets you know that they are constantly by your side. They watch over you with love and protect you from dangers you don’t even see. This card reminds you that you are never alone on your life path. Your personal guidance is always available; you just need to ask. Practically speaking, if you feel lost or anxious, take a moment to connect inwardly. Ask your Guardian Angel to show you signs of their presence. Trust the intuitions that steer you away from one situation or draw you toward another. These impulses are often their way of guiding you. If you are going through a difficult time, know that you are protected and supported, even if you don’t see it yet.",
    "cards.angels.AngeGardien.meaning.var2":"This card announces strengthened protection around you at this time. Your Guardian Angel sends you a clear message that they guide your steps and keep obstacles away from your path. They ask you to trust them and follow your instincts. In your daily life, notice the small miracles and happy coincidences that happen. It is your angel working behind the scenes for your well-being. If you have to make an important decision, calm your mind and listen to that inner voice—gentle but firm. Your Guardian Angel communicates through sensations, dreams, repeated signs. Be attentive and thank them for their constant presence in your life.",
    "cards.angels.AngeGardien.meaning.var3":"The energy of your Guardian Angel envelops you with protection and unconditional love. They know your life mission and help you stay on the right path. This card invites you to strengthen your connection with them through prayer or meditation. Practically, create a daily ritual to acknowledge their presence. It can be as simple as saying thank you in the morning or asking for their guidance before sleep. Your Guardian Angel protects you physically, emotionally, and spiritually. If you feel vulnerable, visualize their wings surrounding you. They remind you that even in the darkest moments, you are guided toward the light. Listen to the messages coming from your heart—it’s often them speaking to you.",
    "cards.angels.AngedelAmour.name": "Angel of Love",
    "cards.angels.AngedelAmour.meaning":"Harmonious relationships and unconditional love",
    "cards.angels.AngedelAmour.meaning.var1":"The Angel of Love opens your heart to more authentic and harmonious relationships. They teach you that love begins with yourself and then radiates outwards to others. This card indicates a favorable period to heal your emotional wounds and attract healthy relationships. Unconditional love means accepting without judgment—yourself first, then others. Practically speaking, observe how you speak to yourself internally. Are you as harsh with yourself as you would never be with a friend? Change that inner dialogue. In your relationships, practice true listening and honest expression of your feelings. If you are in a couple, this is the time to rekindle the connection. If you are single, work on your self-love before seeking love elsewhere.",
    "cards.angels.AngedelAmour.meaning.var2":"This card announces an energy of love and harmony entering your life. The Angel of Love reminds you that you deserve to be loved for who you truly are. They encourage you to lower your defenses and show vulnerability in your relationships. In your daily life, identify the walls you have built out of fear of being hurt. These protections also prevent you from receiving the love being offered to you. Dare to show your sincere emotions to those who matter to you. Forgive old wounds—not for others, but to free yourself. The Angel of Love also favors meaningful encounters, so remain open to new people crossing your path.",
    "cards.angels.AngedelAmour.meaning.var3":"The energy of the Angel of Love invites you to create more harmony in all your relationships. They guide you towards mature love—the kind that accepts imperfections and chooses kindness. This card encourages you to repair damaged bonds if it is still possible and healthy for you. Practically, express your gratitude to the people you love. A sincere message, a thoughtful gesture can transform a relationship. If a relationship harms you more than it benefits you, the Angel of Love also gives you the courage to release it with compassion. Unconditional love sometimes includes setting clear boundaries. Remember that you teach others how to treat you by what you accept.",
    "cards.angels.AngedelaPaix.name": "Angel of Peace",
    "cards.angels.AngedelaPaix.meaning": "Inner serenity and calm",
    "cards.angels.AngedelaPaix.meaning.var1":"The Angel of Peace brings you an energy of serenity and deep calm. They help you find inner silence even amidst external chaos. This card indicates that it is time to slow down and cultivate your peace of mind. True peace does not depend on circumstances; it is born from your inner state. Practically speaking, create moments of pause during your day. Five minutes of conscious breathing, a walk in nature, or simply sitting in silence. If you are experiencing conflicts, the Angel of Peace encourages you to choose calmness over being right. Sometimes, peace requires letting go of the need for control. Distance yourself from unnecessary stress sources such as anxiety-inducing news or toxic conversations.",
    "cards.angels.AngedelaPaix.meaning.var2":"This card announces a period of reconciliation and inner harmony. The Angel of Peace asks you to make peace with your past, your mistakes, and your regrets. They remind you that you cannot change what has been, but you can choose how you live now. In your daily life, identify what disturbs your inner peace. Obsessive thoughts? Persistent grudges? Constant fears? Actively work to soothe these turbulences. Meditation, forgiveness, and acceptance are your tools. If you are in conflict with someone, seek points of reconciliation rather than nurturing division. The Angel of Peace guides you toward gentle solutions and respectful compromises.",
    "cards.angels.AngedelaPaix.meaning.var3":"The energy of the Angel of Peace calms the storms of your mind and heart. They invite you to create a sanctuary of serenity in your daily life. This card reminds you that peace is a conscious choice you make at every moment. Practically, set up a space at home dedicated to calm and relaxation. Limit your exposure to excessive stimulation and stressful environments. If your mind races with worries, gently return to the present moment. Breathe deeply and remember that most of your fears concern a future that does not yet exist. The Angel of Peace teaches you that calm is not the absence of problems; it is the ability to stay centered despite them.",
    "cards.angels.AngedelaProsperite.name": "Angel of Prosperity",
    "cards.angels.AngedelaProsperite.meaning": "Abundance and material success",
    "cards.angels.AngedelaProsperite.meaning.var1":"The Angel of Prosperity invites you to welcome abundance into your life. It reminds you that material success is within reach, provided you maintain a positive attitude and believe in your abilities. This card encourages you to act with confidence and seize opportunities as they arise. Practically, pay attention to signs of luck, ideas that can improve your financial situation, and do not hesitate to invest in yourself.",
    "cards.angels.AngedelaProsperite.meaning.var2":"This card signals a favorable period for growth and material stability. The Angel of Prosperity supports your business projects, investments, or professional advancement. It also invites you to cultivate gratitude for what you already possess, as this attracts even more abundance. In your daily life, make thoughtful decisions and stay open to wise advice.",
    "cards.angels.AngedelaProsperite.meaning.var3":"The energy of the Angel of Prosperity acts as a lever to manifest your financial goals. It encourages you to overcome blockages related to fear or scarcity. This card reminds you that prospering is not just about accumulating possessions, but also about creating a balance between material wealth and personal well-being. Practically, get organized, plan your finances, and cultivate a clear vision of your ambitions.",
    "cards.angels.AngedelaGuerison.name": "Angel of Healing",
    "cards.angels.AngedelaGuerison.meaning": "Recovery and well-being",
    "cards.angels.AngedelaGuerison.meaning.var1":"The Angel of Healing envelops you with its beneficial energy. It invites you to take care of your body and mind with gentleness and patience. This card announces a healing process, whether physical, emotional, or spiritual. Practically, listen to your body’s needs, rest, and accept support from others.",
    "cards.angels.AngedelaGuerison.meaning.var2":"This card symbolizes a favorable period for restoring your well-being. The Angel of Healing encourages you to let go of past pains and turn toward practices that nurture your overall health. In your daily life, adopt healthy habits, meditate, and allow yourself to heal at your own pace.",
    "cards.angels.AngedelaGuerison.meaning.var3":"The energy of the Angel of Healing acts as a catalyst for your inner transformation. It supports you in releasing blockages and buried suffering. This card invites you to cultivate compassion toward yourself and to recognize that healing is a gradual journey. Take time to embrace each step with confidence.",
    "cards.angels.AngedelaSagesse.name": "Angel of Wisdom",
    "cards.angels.AngedelaSagesse.meaning":"Spiritual knowledge and discernment",
    "cards.angels.AngedelaSagesse.meaning.var1":"The Angel of Wisdom invites you to seek knowledge beyond appearances. It helps you develop your discernment and listen to your inner voice. This card signals a favorable time for deep reflection and making enlightened decisions. Practically, take time to meditate, read, or study subjects that elevate your spirit.",
    "cards.angels.AngedelaSagesse.meaning.var2":"This card announces a period of spiritual awakening and mental clarity. The Angel of Wisdom guides you to understand the hidden lessons in your experiences. In your daily life, be attentive to signs and synchronicities that lead you. Cultivate patience and humility in your quest for truth.",
    "cards.angels.AngedelaSagesse.meaning.var3":"The energy of the Angel of Wisdom accompanies you on your inner journey. It encourages you to show calm and discernment when facing challenges. This card reminds you that true wisdom comes from balancing knowledge and compassion. Practically, take time to pause and reflect, then share your insights with kindness.",
    "cards.angels.AngedelaJoie.name": "Angel of Joy",
    "cards.angels.AngedelaJoie.meaning": "Happiness and optimism",
    "cards.angels.AngedelaJoie.meaning.var1":"The Angel of Joy invites you to welcome light and happiness into your life. It reminds you that joy is a choice, even in difficult moments. This card encourages cultivating optimism and celebrating small daily victories. Practically, take time to laugh, smile, and share positive moments with those you love.",
    "cards.angels.AngedelaJoie.meaning.var2":"This card announces a period where lightness and enthusiasm take precedence. The Angel of Joy urges you to free yourself from emotional burdens that hold you back. In your daily life, seek sources of simple pleasure, like a walk, music, or a creative activity. Joy is contagious—share it with those around you.",
    "cards.angels.AngedelaJoie.meaning.var3":"The energy of the Angel of Joy shines within you, inviting you to live fully and savor every moment. It encourages you to nurture gratitude and see the positive even in challenges. Practically, create rituals that bring cheerfulness, like listening to your favorite song or engaging in a passionate activity. Joy is a powerful driver for your well-being.",
    "cards.angels.AngedelaFoi.name": "Angel of Faith",
    "cards.angels.AngedelaFoi.meaning": "Trust in the universe and hope",
    "cards.angels.AngedelaFoi.meaning.var1":"The Angel of Faith invites you to trust the universe and believe in a better future. It encourages you to keep hope even in the face of uncertainties. This card reminds you that faith opens invisible doors and guides you on your path. Practically, let go of excessive control and welcome life’s surprises.",
    "cards.angels.AngedelaFoi.meaning.var2":"This card signals a period where your inner confidence is strengthened. The Angel of Faith helps you overcome doubts and stay on course despite obstacles. In your daily life, practice patience and acceptance, and look for signs that confirm you are supported. Faith is a powerful anchor to move forward.",
    "cards.angels.AngedelaFoi.meaning.var3":"The energy of the Angel of Faith encourages you to believe in yourself and in the benevolence of the universe. It reminds you that even when the path seems dark, an inner light always shines. Practically, take a moment each day to strengthen your confidence through meditation or prayer. Faith nourishes your inner strength and courage.",
    "cards.angels.AngedelaCreativite.name": "Angel of Creativity",
    "cards.angels.AngedelaCreativite.meaning":"Artistic inspiration and innovation",
    "cards.angels.AngedelaCreativite.meaning.var1":"The Angel of Creativity stimulates your inspiration and invites you to express your artistic talents. It encourages you to step off the beaten path and innovate in your life. This card reminds you that creativity is a way to connect with your deep essence. Practically, take time to create, whether through writing, painting, music, or any other form of expression.",
    "cards.angels.AngedelaCreativite.meaning.var2":"This card announces a phase where your imagination is awakened. The Angel of Creativity urges you to explore new ideas and experiment without fear of judgment. In your daily life, allow yourself moments to dream and freely express your inspiration. Your creativity can also be a solution to solve problems.",
    "cards.angels.AngedelaCreativite.meaning.var3":"The energy of the Angel of Creativity invites you to renew your vision and innovate. It reminds you that every creative act is a form of transformation. Practically, embark on an artistic project or invent a new way of doing things. Dare to express your originality and nurture your passion with enthusiasm.",
    "cards.angels.AngedelaPurification.name": "Angel of Purification",
    "cards.angels.AngedelaPurification.meaning": "Energy cleansing and renewal",
    "cards.angels.AngedelaPurification.meaning.var1":"The Angel of Purification helps you release negative energies and cleanse your mind and body. It invites you to perform an inner cleansing to regain clarity and lightness. Practically, take time to refocus and eliminate what no longer serves you, whether thoughts, emotions, or external influences.",
    "cards.angels.AngedelaPurification.meaning.var2":"This card announces a period of renewal where you are called to remove energetic blockages. The Angel of Purification encourages you to clear out the old to welcome the new. In your daily life, practice simple rituals like meditation or relaxation techniques to revitalize yourself.",
    "cards.angels.AngedelaPurification.meaning.var3":"The energy of the Angel of Purification works to cleanse your personal space and mind. It reminds you that renewal comes through sincere letting go. Practically, organize your environment to create a healthy and peaceful place. Take care of yourself gently and open up to new positive energy.",
    "cards.angels.AngedelaCompassion.name": "Angel of Compassion",
    "cards.angels.AngedelaCompassion.meaning": "Empathy and kindness",
    "cards.angels.AngedelaCompassion.meaning.var1":"The Angel of Compassion invites you to open your heart gently with empathy toward yourself and others. It reminds you of the importance of kindness in your relationships. Practically, show patience and understanding, even in the face of difficulties or mistakes.",
    "cards.angels.AngedelaCompassion.meaning.var2":"This card announces a period where your capacity for listening and empathy is strengthened. The Angel of Compassion encourages you to support those going through challenges. In your daily life, offer help without judgment and cultivate tenderness in your interactions.",
    "cards.angels.AngedelaCompassion.meaning.var3":"The energy of the Angel of Compassion accompanies you to develop unconditional love. It reminds you that true strength lies in gentleness. Practically, perform acts of love and support, and learn to forgive yourself with kindness.",
    "cards.angels.AngedelaTransformation.name": "Angel of Transformation",
    "cards.angels.AngedelaTransformation.meaning":"Positive changes and growth",
    "cards.angels.AngedelaTransformation.meaning.var1":"The Angel of Transformation accompanies you through a process of deep change. It invites you to embrace the shifts unfolding, even if they seem uncertain. Let go of old habits or beliefs that no longer serve you to make room for positive renewal.",
    "cards.angels.AngedelaTransformation.meaning.var2":"This card marks a time when significant changes are occurring in your life. The Angel of Transformation supports you in moving through these phases with confidence and calm. In your daily life, pay attention to signs guiding you and don’t hesitate to make bold decisions.",
    "cards.angels.AngedelaTransformation.meaning.var3":"The energy of the Angel of Transformation invites you to evolve in harmony with yourself. It reminds you that each step, even the difficult ones, is a chance for growth. Practically, welcome change with openness and adapt with flexibility to build a life aligned with your true aspirations.",
    "cards.angels.AngedelAbondance.name": "Angel of Abundance",
    "cards.angels.AngedelAbondance.meaning": "Spiritual and material wealth",
    "cards.angels.AngedelAbondance.meaning.var1":"The Angel of Abundance invites you to welcome wealth in all its forms—material and spiritual. It encourages you to recognize and appreciate what you already have. Practically, cultivate gratitude to attract more prosperity into your life.",
    "cards.angels.AngedelAbondance.meaning.var2":"This card signals a time when abundance flows more strongly around you. The Angel of Abundance reminds you that your mindset is key—stay open and confident to receive what is meant for you. In your daily life, spot opportunities and act with generosity.",
    "cards.angels.AngedelAbondance.meaning.var3":"The energy of the Angel of Abundance invites you to balance giving and receiving. It reminds you that true wealth lies in sharing and inner harmony. Practically, give freely without expecting in return, and stay mindful of what life gives back to you.",
    "cards.angels.AngedelaLiberation.name": "Angel of Liberation",
    "cards.angels.AngedelaLiberation.meaning":"Freedom from fears and limitations",
    "cards.angels.AngedelaLiberation.meaning.var1":"The Angel of Liberation helps you release the fears and blockages holding you back from your full potential. It invites you to let go of what restrains you to move forward with greater ease. Practically, identify your invisible chains and decide to break free.",
    "cards.angels.AngedelaLiberation.meaning.var2":"This card signals a time when you can free yourself from both inner and outer limitations. The Angel of Liberation supports you in stepping out of your comfort zone. In your daily life, face your fears with courage and welcome new experiences with confidence.",
    "cards.angels.AngedelaLiberation.meaning.var3":"The energy of the Angel of Liberation invites you to live with inner freedom. It reminds you that you have the power to choose your thoughts and reactions. Practically, practice self-forgiveness and let go of emotional weights to free yourself.",
    "cards.angels.AngedelaGratitude.name": "Angel of Gratitude",
    "cards.angels.AngedelaGratitude.meaning": "Recognition and appreciation",
    "cards.angels.AngedelaGratitude.meaning.var1":"The Angel of Gratitude invites you to cultivate a thankful heart. By fully appreciating what you have, you open the door to even more blessings. Take time each day to note what brings you joy and receive these gifts with gratitude.",
    "cards.angels.AngedelaGratitude.meaning.var2":"This card marks a favorable time to recognize both the small and large things enriching your life. The Angel of Gratitude reminds you that this positive attitude attracts even more abundance and inner peace. In your routine, observe and celebrate every moment of happiness.",
    "cards.angels.AngedelaGratitude.meaning.var3":"The energy of the Angel of Gratitude encourages you to shift your perspective on the world. By choosing to be grateful, you raise your vibration and foster harmony around you. Try sharing this gratitude with those you love, strengthening bonds and elevating energies.",
    "cards.angels.AngedelaManifestation.name": "Angel of Manifestation",
    "cards.angels.AngedelaManifestation.meaning":"Realization of dreams and projects",
    "cards.angels.AngedelaManifestation.meaning.var1":"The Angel of Manifestation encourages you to focus your energy on your goals. By clearly visualizing what you wish to achieve, you enhance your ability to attract opportunities. Act with confidence and perseverance to make your dreams come true.",
    "cards.angels.AngedelaManifestation.meaning.var2":"This card indicates a favorable time to turn your ideas into reality. The Angel of Manifestation reminds you that your thoughts and actions are powerful tools. Stay aligned with your intentions and remain open to the signs that guide you.",
    "cards.angels.AngedelaManifestation.meaning.var3":"The energy of this angel pushes you to believe in your creative potential. By making clear decisions and taking action, you move closer to your aspirations. Cultivate patience and determination, as each step brings you closer to success.",
    "cards.angels.AngedelHarmonie.name": "Angel of Harmony",
    "cards.angels.AngedelHarmonie.meaning": "Balance in all aspects of life",
    "cards.angels.AngedelHarmonie.meaning.var1":"The Angel of Harmony invites you to find a lasting balance between your emotions, relationships, and commitments. By cultivating inner peace and tolerance, you create a calming environment that promotes well-being and serenity.",
    "cards.angels.AngedelHarmonie.meaning.var2":"This card signals a phase where you can restore balance in your life despite tensions. The Angel of Harmony advises you to stay in tune with yourself and others, act with gentleness, and prioritize mutual understanding to overcome conflicts.",
    "cards.angels.AngedelHarmonie.meaning.var3":"The energy of the Angel of Harmony helps you soothe internal and external discord. By fostering moderation, patience, and respect, you build strong relationships and achieve lasting stability that supports you in all areas of your life.",
    "cards.angels.AngedelaNouvelleVie.name": "Angel of New Life",
    "cards.angels.AngedelaNouvelleVie.meaning": "New beginnings and rebirth",
    "cards.angels.AngedelaNouvelleVie.meaning.var1":"The Angel of New Life invites you to embrace a new cycle with openness and trust. This is the time to leave the past behind and welcome fresh opportunities and a profound renewal in your life.",
    "cards.angels.AngedelaNouvelleVie.meaning.var2":"This card signals a period of transformation where you can fully rebirth. The Angel supports you in your new beginnings, encourages you to lay strong foundations, and move forward with faith towards a promising future.",
    "cards.angels.AngedelaNouvelleVie.meaning.var3":"The energy of the Angel of New Life accompanies you as you turn an important page. It reminds you that every ending is a new beginning, and you have the strength within to reinvent yourself and grow with serenity.",

    // Horoscope
    "horoscope.title": "Daily Horoscope",
    "horoscope.predictions": "Your Astral Predictions",
    "horoscope.retry": "Retry",
    "horoscope.home": "Home",
    "horoscope.newConsultation": "New consultation",
    "horoscope.error": "Sorry, unable to fetch your daily horoscope.",
    "horoscope.loading": "The stars reveal your predictions...",
    "horoscope.noSign":
      "Sorry, we need your astrological sign to display your horoscope.",

    // Horoscope Data Translations - Descriptions
    "horoscope.data.descriptions.aries.0":
      "Your overflowing energy pushes you to act boldly today. Take advantage to start new projects.",
    "horoscope.data.descriptions.aries.1":
      "An unexpected encounter could stir your emotions. Stay alert, this person might make your day memorable.",
    "horoscope.data.descriptions.aries.2":
      "Your communicative enthusiasm attracts attention. Be patient to avoid misunderstandings.",
    "horoscope.data.descriptions.aries.3":
      "At work, an opportunity might appear. Analyze it carefully before making a decision.",
    "horoscope.data.descriptions.aries.4":
      "Beware of tensions in close relationships. Stay calm and favor dialogue to prevent conflicts.",
    "horoscope.data.descriptions.aries.6":
      "Your spontaneity is an asset, but avoid excesses or impulsive decisions that could cause problems.",
    "horoscope.data.descriptions.aries.7":
      "An original idea could bring success and recognition. Don’t hesitate to share and realize it.",
    "horoscope.data.descriptions.aries.8":
      "A hidden truth may be revealed. Stay attentive and use this information wisely.",
    "horoscope.data.descriptions.aries.9":
      "Your constant efforts are beginning to pay off. It’s time to reap the results of your work.",
    "horoscope.data.descriptions.aries.10":
      "Your natural confidence attracts trust from others. Use it to strengthen personal and professional relationships.",
    "horoscope.data.descriptions.aries.11":
      "A pleasant surprise could brighten your day, whether a meeting, a message, or a positive event.",
    "horoscope.data.descriptions.aries.12":
      "Your friendships or family ties are strengthened. Enjoy these moments to create precious memories.",
    "horoscope.data.descriptions.aries.13":
      "Your intuition is especially sharp today. Follow your feelings to make good decisions.",
    "horoscope.data.descriptions.aries.14":
      "Positive energy accompanies you all day. Use it to move forward with confidence and achieve your ambitions.",
    "horoscope.data.descriptions.taurus.0":
      "The stability you seek is finally manifesting in your life. Enjoy this period of serenity to savor simple pleasures.",
    "horoscope.data.descriptions.taurus.1":
      "A promising encounter could happen today, bringing a beautiful connection and positive emotions to share.",
    "horoscope.data.descriptions.taurus.2":
      "Venus brings you sweetness and harmony in your relationships. It’s a perfect day to cultivate love and friendship.",
    "horoscope.data.descriptions.taurus.3":
      "Your patience and perseverance are paying off. The results of your past efforts materialize today.",
    "horoscope.data.descriptions.taurus.4":
      "Family relationships are particularly harmonious. Take this moment to strengthen bonds with your loved ones.",
    "horoscope.data.descriptions.taurus.5":
      "Don’t neglect your physical well-being; take time to relax and exercise.",
    "horoscope.data.descriptions.taurus.6":
      "Your artistic talents are highlighted today, giving you the opportunity to fully express them in personal or professional projects.",
    "horoscope.data.descriptions.taurus.7":
      "This is the perfect time to realize your long-term projects by taking the necessary steps to achieve your goals successfully.",
    "horoscope.data.descriptions.taurus.8":
      "Your practical sense and discernment help you avoid many pitfalls and make wise decisions in your daily affairs.",
    "horoscope.data.descriptions.taurus.9":
      "A period of material prosperity is approaching, offering opportunities for financial gain and economic stability if you remain attentive.",
    "horoscope.data.descriptions.taurus.10":
      "Your fidelity and loyalty in friendship are recognized and appreciated by those around you, creating even stronger and more harmonious bonds.",
    "horoscope.data.descriptions.taurus.11":
      "Simple pleasures in life bring you great satisfaction and contribute to your emotional and mental well-being today.",
    "horoscope.data.descriptions.taurus.12":
      "Your emotional stability reassures those around you, and you are seen as a reliable and calming reference point for others.",
    "horoscope.data.descriptions.taurus.13":
      "This is an ideal day for outdoor activities, which will allow you to recharge, take a step back, and regain your energy.",
    "horoscope.data.descriptions.taurus.14":
      "Your past efforts are finally being rewarded, and you will see that your perseverance pays off in your projects and relationships.",
    "horoscope.data.descriptions.gemini.0":
      "Your natural curiosity leads you to wonderful discoveries. Stay open to new encounters and innovative ideas.",
    "horoscope.data.descriptions.gemini.1":"Professional opportunities are presenting themselves. Dare to propose your innovative ideas; they will be well received.",
    "horoscope.data.descriptions.gemini.2":
      "Mercury stimulates your intelligence and creativity. It’s the ideal day to communicate, write, or learn something new.",
    "horoscope.data.descriptions.gemini.3":
      "Your ability to adapt is remarkable today, take advantage of it to explore new opportunities that come your way.",
    "horoscope.data.descriptions.gemini.4":
      "Be attentive to your surroundings; some people may have crucial information to share with you.",
    "horoscope.data.descriptions.gemini.5":
      "Today, your mind is sharp and curious, but beware of misunderstandings or small disputes that may arise around you.",
    "horoscope.data.descriptions.gemini.6":
      "A pleasant surprise could brighten your day, whether it's a meeting, a message, or an inspiring idea.",
    "horoscope.data.descriptions.gemini.7":
      "Your ease in communicating attracts attention today, but be careful not to reveal too much information or cause misunderstandings.",
    "horoscope.data.descriptions.gemini.8":
      "An unexpected conversation changes your perspective and opens new doors in your relationships or projects.",
    "horoscope.data.descriptions.gemini.9":
      "Your versatility allows you to juggle multiple projects at once without losing efficiency or creativity.",
    "horoscope.data.descriptions.gemini.10":
      "New technologies open new horizons for you, facilitating exchanges and innovative projects.",
    "horoscope.data.descriptions.gemini.11":
      "Your wit and humor lighten the atmosphere, attracting others to you with charm and ease.",
    "horoscope.data.descriptions.gemini.12":
      "This is the perfect time to learn something new and expand your knowledge or skills.",
    "horoscope.data.descriptions.gemini.13":
      "Your social networks and contacts bring you unexpected and profitable opportunities today.",
    "horoscope.data.descriptions.gemini.14":
      "Be careful with confidences: a friendship could be tested by a misunderstanding or a revealed secret.",
    "horoscope.data.descriptions.cancer.0":
      "Your intuition is particularly developed today. Follow your heart; it will guide you to the right decisions.",
    "horoscope.data.descriptions.cancer.1":
      "This day could leave you feeling dizzy. Don't let yourself be overwhelmed by minor annoyances. An inner energy supports you positively, so take care of your nervous system and allow yourself a break from the daily routine!",
    "horoscope.data.descriptions.cancer.2":
      "Family and friends play a key role in your fulfillment today. Be attentive and offer your support.",
    "horoscope.data.descriptions.cancer.3":
      "A little moment of relaxation could do wonders for your energy. Consider meditating or taking a soothing bath.",
    "horoscope.data.descriptions.cancer.4":
      "The Moon illuminates your sensitivity and strengthens family bonds. It’s a special moment to express your feelings.",
    "horoscope.data.descriptions.cancer.5":
      "Your natural kindness attracts confidences and strengthens your friendships. You are a refuge for those around you.",
    "horoscope.data.descriptions.cancer.6":
      "Today is a perfect day to express your emotions and share your feelings sincerely, strengthening your relationships.",
    "horoscope.data.descriptions.cancer.7":
      "Your natural empathy allows you to deeply understand others and offer them valuable support.",
    "horoscope.data.descriptions.cancer.8":
      "Your relationships are marked by friendship and complicity today. Seek the listening ear and support of those around you, while remaining attentive to their needs as well as your own, without neglecting either.",
    "horoscope.data.descriptions.cancer.9":
      "Your home becomes a true haven of peace and happiness, ideal for rest and serenity.",
    "horoscope.data.descriptions.cancer.10":
      "A strong intuition guides you toward the right decision, even in complex or uncertain situations.",
    "horoscope.data.descriptions.cancer.11":
      "Your childhood memories inspire you positively and remind you of the essential values that drive you.",
    "horoscope.data.descriptions.cancer.12":
      "You will be asked to show diplomacy, and there is something positive to gain from it. Through your favorite hobbies, you will find ways to relax. Leave your worries at the door.",
    "horoscope.data.descriptions.cancer.13":
      "Your connections with new acquaintances will fill the voids and lacks you feel. Your strong taste for the good things may lead you to a few excesses, so take it easy.",
    "horoscope.data.descriptions.cancer.14":
      "A family reconciliation brings deep harmony and creates a peaceful atmosphere around you.",
    "horoscope.data.descriptions.leo.0":
      "Your magnetism draws attention today, especially in love. If you're in a relationship, be careful not to provoke jealousy. At work, your brilliant ideas impress, but take the time to defend them well. Unexpected recognition could flatter your ego.",
    "horoscope.data.descriptions.leo.1":
      "A professional opportunity arises, but it requires courage and full commitment. Don't let fear sabotage your momentum. Personally, a loved one may need your support. Be attentive to the signals around you.",
    "horoscope.data.descriptions.leo.2":
      "Within your family, an important discussion clarifies a confusing situation. Even if the words are harsh, they will help you move forward. In love, disarming sincerity will be your best ally. Truth will ultimately strengthen your bonds.",
    "horoscope.data.descriptions.leo.3":
      "A friendly encounter could turn into a solid bond. You need to surround yourself with genuine and caring people. At work, your creativity helps you overcome obstacles. Let your intuition guide your choices.",
    "horoscope.data.descriptions.leo.4":
      "Luck smiles upon you today, but only if you dare to provoke it. A pleasant surprise may appear in your love life. Financially, avoid impulsive spending. A small act of generosity could bring great returns later.",
    "horoscope.data.descriptions.leo.5":
      "You overflow with energy and enthusiasm, but your body also needs rest. Don't neglect your inner balance. A project close to your heart begins to take shape. Let your loved ones share your joy.",
    "horoscope.data.descriptions.leo.6":
      "Jealousy from someone around you could disturb your peace. Stay vigilant without succumbing to excessive suspicion. In love, favor tenderness over confrontation. Your inner light is your best protection.",
    "horoscope.data.descriptions.leo.7":
      "Unexpected financial setbacks may unsettle you, but nothing insurmountable. Take time to analyze before reacting. In relationships, a friend's sincerity will help you stay on track. External support could pleasantly surprise you.",
    "horoscope.data.descriptions.leo.8":
      "Singles might meet someone who awakens their heart. For couples, a moment of complicity strengthens the bond. At work, your constant efforts are finally paying off. The day is full of hope and renewed energy.",
    "horoscope.data.descriptions.leo.9":
      "Your work is noticed and could bring a great opportunity, but a jealous rival might try to slow you down. Don't let criticism undermine your confidence. Personally, take time to relax and enjoy your small victories.",
    "horoscope.data.descriptions.leo.10":
      "A warm moment with family or loved ones deeply refreshes you. You realize your happiness comes from these simple moments. In love, a tender word heals recent tension. Serenity returns slowly.",
    "horoscope.data.descriptions.leo.11":
      "The return of an old friend or someone from your past revives beautiful memories. This bond could turn into a constructive project or unexpected support. In love, buried feelings resurface. It's an emotionally rich day.",
    "horoscope.data.descriptions.leo.12":
      "A chance encounter could disrupt your habits and open an unexpected door. Let the surprise unfold without trying to control everything. Professionally, an original proposal may emerge. Stay open to synchronicities.",
    "horoscope.data.descriptions.leo.13":
      "Your desire for recognition is strong today, but be careful not to demand too much from loved ones or colleagues. In love, a tender gesture is sometimes worth a thousand words. You inspire, but remain authentic.",
    "horoscope.data.descriptions.leo.14":
      "An important decision is required, and your intuition will guide you on the right path. Don't be influenced by conflicting opinions. In relationships, honesty remains key. The clarity you gain today will mark a turning point.",
    "horoscope.data.descriptions.virgo.0":
      "Your attention to detail is sharp today, helping you solve a tricky problem. In love, avoid being too critical, as your high standards could hurt. Financially, careful management is already paying off.",
    "horoscope.data.descriptions.virgo.1":
      "Someone around you might test your patience. Stay calm and don't fall into unnecessary conflicts. Your natural wisdom will help you come out ahead.",
    "horoscope.data.descriptions.virgo.2":
      "Love takes center stage today. If single, a promising encounter may spark your curiosity. In a relationship, small gestures strengthen your daily bonds.",
    "horoscope.data.descriptions.virgo.3":
      "Your organization and seriousness impress your colleagues. A new responsibility might be entrusted to you. Although it requires extra effort, this recognition will benefit you long-term.",
    "horoscope.data.descriptions.virgo.4":
      "Your sensitivity is highlighted today. A loved one may need your attention. Show empathy, but don't carry all their burdens. Take care of your own balance as well.",
    "horoscope.data.descriptions.virgo.5":
      "A financial or material opportunity arises. But beware of hasty decisions. Analyze every detail before committing; your usual caution is your best ally.",
    "horoscope.data.descriptions.virgo.6":
      "Your critical mind is strong today, but it could create tensions with loved ones. Turn this energy into constructive advice rather than reproaches. Your clarity will then be seen as supportive.",
    "horoscope.data.descriptions.virgo.7":
      "A minor argument might disrupt your day, but it will clarify a previously unclear situation. Accept it as a necessary step toward more sincere relationships.",
    "horoscope.data.descriptions.virgo.8":
      "You feel the need to declutter, whether in your belongings, relationships, or habits. This purification process will allow you to see things clearly and start afresh.",
    "horoscope.data.descriptions.virgo.9":
      "Luck accompanies you today, but only if you step out of your comfort zone. A meeting or idea could open new, positive horizons. Don't let doubts hinder this momentum.",
    "horoscope.data.descriptions.virgo.10":
      "Your loyalty is noticed and appreciated by your friends. But beware of neglecting yourself while giving too much. Your own needs are just as important as those of others.",
    "horoscope.data.descriptions.virgo.11":
      "An unexpected event at work or home forces you to revise your plans. Even if inconvenient, this adaptation will ultimately bring a more effective solution. Trust the process.",
    "horoscope.data.descriptions.virgo.12":
      "Love could surprise you where you least expect it. Stay attentive to subtle signs and gestures. For couples, a tender moment strengthens bonds and rekindles passion.",
    "horoscope.data.descriptions.virgo.13":
      "Your mind is buzzing with new ideas today. Channel this creativity into concrete projects rather than endless reflection. Step by step, your efforts will bear fruit.",
    "horoscope.data.descriptions.virgo.14":
      "A revelation or confession may shake your certainties. Even if the truth is hard to hear, it will free you from a burden. Embrace this change with wisdom and openness.",
    "horoscope.data.descriptions.libra.0":
      "Your natural charm draws attention today. In love, a meeting could awaken your heart. If in a relationship, a romantic moment brings balance and complicity.",
    "horoscope.data.descriptions.libra.1":
      "A disagreement might arise among those close to you. Be diplomatic and avoid hasty judgments. Your ability to remain fair will help restore harmony.",
    "horoscope.data.descriptions.libra.2":
      "Your relational talents shine today. Use them to strengthen your friendships and professional ties. A sincere conversation could open the door to a great opportunity.",
    "horoscope.data.descriptions.libra.3":
      "An important decision awaits you. Don't let hesitation block you. Listen to your intuition and weigh the pros and cons wisely; the answer will come naturally.",
    "horoscope.data.descriptions.libra.4":
      "Your inner balance is challenged. Too many responsibilities may tire you. Step back, delegate if possible, and take a moment just for yourself.",
    "horoscope.data.descriptions.libra.5":
      "A pleasant surprise could brighten your day, whether a thoughtful gesture from a loved one or an unexpected opportunity. Welcome it with gratitude and optimism.",
    "horoscope.data.descriptions.libra.6":
      "A secret or hidden truth may come to light today. Even if unsettling, this clarity will help you move forward and strengthen future choices.",
    "horoscope.data.descriptions.libra.7":
      "You feel the need to strengthen family ties. A shared moment with loved ones brings warmth and comfort. It's an ideal day to express affection.",
    "horoscope.data.descriptions.libra.8":
      "At work, your cooperative spirit is appreciated. But be careful not to fade into the background. Speak up, your ideas deserve recognition.",
    "horoscope.data.descriptions.libra.9":
      "Your heart may be tested by doubts or hesitation. Take time to clarify your feelings. Sincerity, even if delicate, leads to inner peace.",
    "horoscope.data.descriptions.libra.10":
      "A boost of confidence encourages you to move forward. It's the perfect time to start a personal project or take a bold initiative. Dare, the stars support you.",
    "horoscope.data.descriptions.libra.11":
      "An inspiring encounter could transform your view of a situation. Pay attention to subtle advice or signs around you; they hold valuable answers.",
    "horoscope.data.descriptions.libra.12":
      "Your quest for harmony may be disturbed by a jealous or envious person. Don't let negative energies affect you. Stay focused on your goals and your light.",
    "horoscope.data.descriptions.libra.13":
      "Luck seems to favor you today. A financial or relational opportunity arises. Stay open and seize it; it could mark a positive turning point in your life.",
    "horoscope.data.descriptions.libra.14":
      "Your need for balance guides you to new choices. Whether in love, work, or friendships, you finally find the courage to set fair and necessary boundaries.",
    "horoscope.data.descriptions.scorpio.0":
      "Your intuition is particularly strong today. Follow your gut feelings; they will guide you to the right choices, especially in love and friendship.",
    "horoscope.data.descriptions.scorpio.1":
      "Tension might arise in your surroundings. Don't let jealousy or grudges spoil your relationships; rely on honesty to calm things down.",
    "horoscope.data.descriptions.scorpio.2":
      "You may encounter an intriguing person who awakens curiosity and emotions. This meeting could shake up your certainties.",
    "horoscope.data.descriptions.scorpio.3":
      "Your determination impresses. It's an ideal day to take a professional step forward or clarify a long-standing situation.",
    "horoscope.data.descriptions.scorpio.4":
      "A well-kept secret could come to light. Even if surprising, this revelation will help you progress and understand your surroundings better.",
    "horoscope.data.descriptions.scorpio.5":
      "Your intensity attracts as much as it unsettles. Use this energy to charm or strengthen your emotional bonds, but avoid possessiveness.",
    "horoscope.data.descriptions.scorpio.6":
      "An unexpected offer may arise. Before saying yes, analyze the situation carefully: not everything is as it seems.",
    "horoscope.data.descriptions.scorpio.7":
      "You feel the need to isolate yourself to reflect. This introspection will help clarify priorities and regain inner balance.",
    "horoscope.data.descriptions.scorpio.8":
      "A long-standing project or idea finally gets favorable momentum. Your perseverance is beginning to pay off.",
    "horoscope.data.descriptions.scorpio.9":
      "Beware of misunderstandings in love. Intense emotions may cloud communication. Stay calm and express feelings gently.",
    "horoscope.data.descriptions.scorpio.10":
      "Your magnetism is powerful today. You may captivate someone who will play an important role in your future projects.",
    "horoscope.data.descriptions.scorpio.11":
      "Jealousy or competition from someone around you might surface. Protect your energy and avoid unnecessary conflicts.",
    "horoscope.data.descriptions.scorpio.12":
      "Your passion is a tremendous driving force, but take care not to overexert yourself. Allow breaks to preserve emotional and physical balance.",
    "horoscope.data.descriptions.scorpio.13":
      "Good news could brighten your day, whether professionally, romantically, or financially. Receive it with confidence.",
    "horoscope.data.descriptions.scorpio.14":
      "Your transformative power is at its peak. Use this energy to close a difficult chapter and start a brighter new beginning.",
    "horoscope.data.descriptions.sagittarius.0":
      "Your natural optimism lights up your day. Take this chance to try something new and share your joy with loved ones.",
    "horoscope.data.descriptions.sagittarius.1":
      "An unexpected encounter may spark curiosity and emotions. Be open to new people around you; they might surprise you.",
    "horoscope.data.descriptions.sagittarius.2":
      "Your adventurous spirit drives you to explore new ideas or places. Avoid spreading yourself too thin; focus on what truly matters.",
    "horoscope.data.descriptions.sagittarius.3":
      "At work, an opportunity is offered. Seize it, but check the details to avoid misunderstandings or disappointments.",
    "horoscope.data.descriptions.sagittarius.4":
      "Your friends rely on your positive energy. A dispute may arise, but your natural diplomacy will quickly restore harmony.",
    "horoscope.data.descriptions.sagittarius.5":
      "Love is favored today. A tender gesture or sincere word could strengthen bonds or spark a significant encounter.",
    "horoscope.data.descriptions.sagittarius.6":
      "You may be tempted by excesses or impulsive spending. Maintain balance to avoid future regrets.",
    "horoscope.data.descriptions.sagittarius.7":
      "Your creativity and original ideas are highlighted. Express them fully; they could inspire others and open new doors.",
    "horoscope.data.descriptions.sagittarius.8":
      "A hidden truth or confidence might be revealed. Stay attentive and don't let misunderstandings affect your relationships.",
    "horoscope.data.descriptions.sagittarius.9":
      "A day suitable for travel or learning. Use it to broaden your horizons and discover something new about yourself.",
    "horoscope.data.descriptions.sagittarius.10":
      "Your humor and lightness attract others. Share these cheerful moments, but stay sincere to avoid pretenses.",
    "horoscope.data.descriptions.sagittarius.11":
      "A challenge or obstacle may appear. Your perseverance and enthusiasm will help you overcome it successfully.",
    "horoscope.data.descriptions.sagittarius.12":
      "Be mindful of tensions in the family circle. Take time to listen and understand everyone's needs to avoid unnecessary conflicts.",
    "horoscope.data.descriptions.sagittarius.13":
      "Your intuition is enhanced today. Follow your feelings in decisions, especially in love and friendship.",
    "horoscope.data.descriptions.sagittarius.14":
      "A favorable energy accompanies you to achieve your projects. Use this cosmic support to advance your ambitions and nurture happiness.",
    "horoscope.data.descriptions.capricorn.0":
      "Your seriousness and perseverance attract admiration today. It's the perfect moment to progress on an important project.",
    "horoscope.data.descriptions.capricorn.1":
      "Someone around you may surprise you with their reactions. Stay attentive and avoid jumping to conclusions.",
    "horoscope.data.descriptions.capricorn.2":
      "Your organizational skills allow you to manage responsibilities effectively. Don't forget to take time to relax.",
    "horoscope.data.descriptions.capricorn.3":
      "A professional or financial opportunity arises. Analyze it carefully before making a decision.",
    "horoscope.data.descriptions.capricorn.4":
      "Your loyalty and fidelity are appreciated, but avoid being exploited. Set clear boundaries if necessary.",
    "horoscope.data.descriptions.capricorn.5":
      "A pleasant moment with a loved one could rekindle emotional or family bonds. Enjoy this connection to strengthen your relationship.",
    "horoscope.data.descriptions.capricorn.6":
      "You might be tempted by excess or impulsive spending. Stay cautious to avoid regrets.",
    "horoscope.data.descriptions.capricorn.7":
      "A creative idea or project you set aside gains momentum. Don't hesitate to bring it to life.",
    "horoscope.data.descriptions.capricorn.8":
      "A hidden truth or secret may be revealed. Take time to understand the implications before reacting.",
    "horoscope.data.descriptions.capricorn.9":
      "Your consistent efforts pay off today. It's time to reap the rewards of your work and sacrifices.",
    "horoscope.data.descriptions.capricorn.10":
      "Your seriousness inspires trust and respect. Take advantage to showcase your skills and talents.",
    "horoscope.data.descriptions.capricorn.11":
      "Watch for tensions in your professional or family circle. Stay calm and prioritize dialogue to defuse conflicts.",
    "horoscope.data.descriptions.capricorn.12":
      "Your intuition is particularly sharp. Follow your instincts for fair decisions, especially in love and friendship.",
    "horoscope.data.descriptions.capricorn.13":
      "A day favorable for enriching contacts and exchanges. A meeting or conversation could bring new perspectives.",
    "horoscope.data.descriptions.capricorn.14":
      "Your perseverance and rigor help you overcome obstacles. Favorable energy accompanies your actions; use it to move forward.",
    "horoscope.data.descriptions.aquarius.0":
      "Your originality and creativity are highlighted today. Don't hesitate to share your ideas; they may inspire those around you.",
    "horoscope.data.descriptions.aquarius.1":
      "An unexpected meeting may awaken curiosity and emotions. Pay attention; this person could leave a mark on your day.",
    "horoscope.data.descriptions.aquarius.2":
      "Your innovative spirit is at its peak. Use it to experiment with new methods in work or personal projects.",
    "horoscope.data.descriptions.aquarius.3":
      "Beware of misunderstandings with a loved one. Listen carefully before reacting; clarity and patience will prevent unnecessary conflicts.",
    "horoscope.data.descriptions.aquarius.4":
      "A surprising opportunity may present itself. Analyze it before committing; things are not always what they seem.",
    "horoscope.data.descriptions.aquarius.5":
      "Your communicative energy draws attention. It's a perfect moment to strengthen friendships or professional connections.",
    "horoscope.data.descriptions.aquarius.6":
      "A moment of solitude may allow you to recharge and reflect on priorities. Listen to your inner needs.",
    "horoscope.data.descriptions.aquarius.7":
      "Your original ideas could inspire admiration… but also a bit of jealousy. Stay focused on your goals and ignore distractions.",
    "horoscope.data.descriptions.aquarius.8":
      "A pleasant surprise could brighten your day, whether a message, gesture, or project taking shape.",
    "horoscope.data.descriptions.aquarius.9":
      "Your sense of justice and balance is called upon today. Help ease tensions around you; your role is important.",
    "horoscope.data.descriptions.aquarius.10":
      "Beware of excesses or impulsive decisions. Take time to think and weigh pros and cons before acting.",
    "horoscope.data.descriptions.aquarius.11":
      "A hidden truth or secret may emerge. Stay calm and use this information to improve relationships or projects.",
    "horoscope.data.descriptions.aquarius.12":
      "Your friendships or romantic relationships are favored. A sincere gesture or kind word can strengthen bonds and create lasting memories.",
    "horoscope.data.descriptions.aquarius.13":
      "An old idea or project may be reborn in a new light. It's time to bring it to life and achieve your aspirations.",
    "horoscope.data.descriptions.aquarius.14":
      "Your energy and intuition guide you toward positive choices. Use today to move forward with confidence and boldness.",
    "horoscope.data.descriptions.pisces.0":
      "Your sensitivity is your strength today. Listen to your emotions; they will guide your relationships and choices.",
    "horoscope.data.descriptions.pisces.1":
      "A dear person may surprise you with their honesty. Stay open and attentive to avoid misunderstandings.",
    "horoscope.data.descriptions.pisces.2":
      "Your creativity is at its peak. Use it to express artistic or original ideas in your projects.",
    "horoscope.data.descriptions.pisces.3":
      "Be cautious with impulsive decisions, especially regarding finances. Think carefully before committing.",
    "horoscope.data.descriptions.pisces.4":
      "Your friendships are favored. A sincere gesture or word can strengthen bonds and bring joy.",
    "horoscope.data.descriptions.pisces.5":
      "A day conducive to introspection. Take time to reconnect with your needs and deep desires.",
    "horoscope.data.descriptions.pisces.6":
      "An unexpected opportunity may arise. Evaluate it with discernment before diving in.",
    "horoscope.data.descriptions.pisces.7":
      "Your intuition is particularly sharp today. Trust it to guide personal and professional decisions.",
    "horoscope.data.descriptions.pisces.8":
      "A loved one may seek your support. Listen carefully and offer empathy without neglecting yourself.",
    "horoscope.data.descriptions.pisces.9":
      "A romantic or affectionate surprise could brighten your day. Be open to signs and gestures of affection.",
    "horoscope.data.descriptions.pisces.10":
      "Minor tensions may arise. Stay calm and prioritize communication to avoid conflicts.",
    "horoscope.data.descriptions.pisces.11":
      "Your compassion draws others to you. Take advantage to create sincere and lasting connections.",
    "horoscope.data.descriptions.pisces.12":
      "An old project may gain new momentum. It's the perfect time to realize your ideas and ambitions.",
    "horoscope.data.descriptions.pisces.13":
      "Your emotions are intense and enriching today. Channel them to strengthen relationships and initiatives.",
    "horoscope.data.descriptions.pisces.14":
      "Positive energy accompanies you throughout the day. Follow your intuition and let your heart guide your choices.",

    // Varied final messages
    "horoscope.message.var1":
      "{genderText} {name}, as {zodiacSign}, you have this beautiful energy that attracts good things. Trust the stars and your intuition today!",
    "horoscope.message.var2":
      "{genderText} {name}, your {zodiacSign} sign brings you positive energy today. Let yourself be guided by the stars!",
    "horoscope.message.var3":
      "Dear {zodiacSign} {name}, the stars smile upon you today. Enjoy this beautiful cosmic energy that surrounds you!",
    "horoscope.message.var4":
      "{genderText} {name}, your {zodiacSign} shines today. May this day bring you joy and serenity!",
    "horoscope.message.var5":
      "The stars bless you today, {name}. As {zodiacSign}, you are in perfect harmony with the universe!",

    // Variations for compatibility
    "horoscope.compatibility.var1":
      "Compatibility: You'll get along particularly well with {compatibility} signs today. It's the ideal time to strengthen your relationships!",
    "horoscope.compatibility.var2":
      "Affinities: {compatibility} signs vibrate on the same wavelength as you today. Take advantage of this harmony!",
    "horoscope.compatibility.var3":
      "Special connections: {compatibility} will be your perfect allies today. A beautiful complicity awaits you!",
    "horoscope.compatibility.var4":
      "Cosmic connections: The energy of {compatibility} signs harmonizes beautifully with yours. Let yourself be carried by this synergy!",
    "horoscope.compatibility.var5":
      "Astral harmonies: {compatibility} share your vibrations today. These encounters could be magical!",
    "horoscope.compatibility.var6":
      "Stellar complicity: Natives of {compatibility} intuitively understand your state of mind today. Cultivate these precious bonds!",
    "horoscope.compatibility.var7":
      "Planetary synergies: {compatibility} are in perfect resonance with your energy today. A fruitful collaboration is coming!",
    "horoscope.compatibility.var8":
      "Celestial understanding: {compatibility} share your vision today. It's the perfect time to deepen your exchanges!",

    // Mood variations
    "horoscope.mood.var1":
      "Your mood today: {mood}\nThis energy will accompany you throughout the day. Take advantage of it to do things that make you feel good!",
    "horoscope.mood.var2":
      "State of mind today: {mood}\nLet this positive vibration guide your actions and decisions today!",
    "horoscope.mood.var3":
      "Dominant energy: {mood}\nThis is the perfect moment to channel this inner strength into your projects!",
    "horoscope.mood.var4":
      "Cosmic atmosphere: {mood}\nYou radiate this beautiful energy that attracts all good things to you!",
    "horoscope.mood.var5":
      "Astral vibration: {mood}\nThis special mood will color your day with a thousand positive shades!",
    "horoscope.mood.var6":
      "Planetary influence: {mood}\nEmbrace this unique energy and let it transform your day into something extraordinary!",

    // Horoscope Data Translations - Moods (French server keys with English values)
    "horoscope.data.moods.Énergique": "Energetic",
    "horoscope.data.moods.Confiant": "Confident",
    "horoscope.data.moods.Déterminé": "Determined",
    "horoscope.data.moods.Passionné": "Passionate",
    "horoscope.data.moods.Optimiste": "Optimistic",
    "horoscope.data.moods.Dynamique": "Dynamic",
    "horoscope.data.moods.Paisible": "Peaceful",
    "horoscope.data.moods.Sensuel": "Sensual",
    "horoscope.data.moods.Stable": "Stable",
    "horoscope.data.moods.Généreux": "Generous",
    "horoscope.data.moods.Patient": "Patient",
    "horoscope.data.moods.Harmonieux": "Harmonious",
    "horoscope.data.moods.Curieux": "Curious",
    "horoscope.data.moods.Communicatif": "Communicative",
    "horoscope.data.moods.Vif": "Quick",
    "horoscope.data.moods.Sociable": "Sociable",
    "horoscope.data.moods.Adaptable": "Adaptable",
    "horoscope.data.moods.Créatif": "Creative",
    "horoscope.data.moods.Émotionnel": "Emotional",
    "horoscope.data.moods.Protecteur": "Protective",
    "horoscope.data.moods.Intuitif": "Intuitive",
    "horoscope.data.moods.Tendre": "Tender",
    "horoscope.data.moods.Maternel": "Maternal",
    "horoscope.data.moods.Empathique": "Empathetic",
    "horoscope.data.moods.Rayonnant": "Radiant",
    "horoscope.data.moods.Majestueux": "Majestic",
    "horoscope.data.moods.Charismatique": "Charismatic",
    "horoscope.data.moods.Théâtral": "Theatrical",
    "horoscope.data.moods.Méthodique": "Methodical",
    "horoscope.data.moods.Serviable": "Helpful",
    "horoscope.data.moods.Précis": "Precise",
    "horoscope.data.moods.Sage": "Wise",
    "horoscope.data.moods.Analytique": "Analytical",
    "horoscope.data.moods.Perfectionniste": "Perfectionist",
    "horoscope.data.moods.Raffiné": "Refined",
    "horoscope.data.moods.Diplomatique": "Diplomatic",
    "horoscope.data.moods.Équilibré": "Balanced",
    "horoscope.data.moods.Artistique": "Artistic",
    "horoscope.data.moods.Charmeur": "Charming",
    "horoscope.data.moods.Intense": "Intense",
    "horoscope.data.moods.Mystérieux": "Mysterious",
    "horoscope.data.moods.Transformateur": "Transformative",
    "horoscope.data.moods.Magnétique": "Magnetic",
    "horoscope.data.moods.Profond": "Deep",
    "horoscope.data.moods.Aventurier": "Adventurous",
    "horoscope.data.moods.Philosophe": "Philosophical",
    "horoscope.data.moods.Libre": "Free",
    "horoscope.data.moods.Explorateur": "Explorer",
    "horoscope.data.moods.Enthousiaste": "Enthusiastic",
    "horoscope.data.moods.Ambitieux": "Ambitious",
    "horoscope.data.moods.Responsable": "Responsible",
    "horoscope.data.moods.Persévérant": "Persevering",
    "horoscope.data.moods.Discipliné": "Disciplined",
    "horoscope.data.moods.Pragmatique": "Pragmatic",
    "horoscope.data.moods.Visionnaire": "Visionary",
    "horoscope.data.moods.Indépendant": "Independent",
    "horoscope.data.moods.Humaniste": "Humanitarian",
    "horoscope.data.moods.Original": "Original",
    "horoscope.data.moods.Innovateur": "Innovative",
    "horoscope.data.moods.Altruiste": "Altruistic",
    "horoscope.data.moods.Compassionnel": "Compassionate",
    "horoscope.data.moods.Spirituel": "Spiritual",
    "horoscope.data.moods.Rêveur": "Dreamy",
    "horoscope.data.moods.Sensible": "Sensitive",

    "horoscope.data.colors.Rouge": "Red",
    "horoscope.data.colors.Orange vif": "Bright Orange",
    "horoscope.data.colors.Bordeaux": "Burgundy",
    "horoscope.data.colors.Corail": "Coral",
    "horoscope.data.colors.Écarlate": "Scarlet",
    "horoscope.data.colors.Vermillon": "Vermillion",
    "horoscope.data.colors.Vert émeraude": "Emerald Green",
    "horoscope.data.colors.Rose tendre": "Soft Pink",
    "horoscope.data.colors.Beige doré": "Golden Beige",
    "horoscope.data.colors.Terre de Sienne": "Sienna",
    "horoscope.data.colors.Vert olive": "Olive Green",
    "horoscope.data.colors.Rose poudré": "Powder Pink",
    "horoscope.data.colors.Jaune citron": "Lemon Yellow",
    "horoscope.data.colors.Bleu ciel": "Sky Blue",
    "horoscope.data.colors.Argent": "Silver",
    "horoscope.data.colors.Lavande": "Lavender",
    "horoscope.data.colors.Jaune d'or": "Golden Yellow",
    "horoscope.data.colors.Bleu pervenche": "Periwinkle Blue",
    "horoscope.data.colors.Blanc nacré": "Pearl White",
    "horoscope.data.colors.Bleu océan": "Ocean Blue",
    "horoscope.data.colors.Argent lunaire": "Lunar Silver",
    "horoscope.data.colors.Rose pâle": "Pale Pink",
    "horoscope.data.colors.Perle": "Pearl",
    "horoscope.data.colors.Bleu laiteux": "Milky Blue",
    "horoscope.data.colors.Or": "Gold",
    "horoscope.data.colors.Orange solaire": "Solar Orange",
    "horoscope.data.colors.Jaune impérial": "Imperial Yellow",
    "horoscope.data.colors.Rouge royal": "Royal Red",
    "horoscope.data.colors.Doré": "Golden",
    "horoscope.data.colors.Ambre": "Amber",
    "horoscope.data.colors.Beige naturel": "Natural Beige",
    "horoscope.data.colors.Gris perle": "Pearl Gray",
    "horoscope.data.colors.Bleu marine": "Navy Blue",
    "horoscope.data.colors.Taupe": "Taupe",
    "horoscope.data.colors.Kaki": "Khaki",
    "horoscope.data.colors.Rose pastel": "Pastel Pink",
    "horoscope.data.colors.Vert menthe": "Mint Green",
    "horoscope.data.colors.Ivoire": "Ivory",
    "horoscope.data.colors.Lilas": "Lilac",
    "horoscope.data.colors.Bleu poudré": "Powder Blue",
    "horoscope.data.colors.Rouge bordeaux": "Bordeaux Red",
    "horoscope.data.colors.Noir profond": "Deep Black",
    "horoscope.data.colors.Pourpre": "Purple",
    "horoscope.data.colors.Grenat": "Garnet",
    "horoscope.data.colors.Cramoisi": "Crimson",
    "horoscope.data.colors.Brun acajou": "Mahogany Brown",
    "horoscope.data.colors.Bleu turquoise": "Turquoise Blue",
    "horoscope.data.colors.Violet royal": "Royal Purple",
    "horoscope.data.colors.Orange mandarine": "Mandarin Orange",
    "horoscope.data.colors.Vert forêt": "Forest Green",
    "horoscope.data.colors.Indigo": "Indigo",
    "horoscope.data.colors.Cobalt": "Cobalt",
    "horoscope.data.colors.Gris anthracite": "Charcoal Gray",
    "horoscope.data.colors.Marron chocolat": "Chocolate Brown",
    "horoscope.data.colors.Vert foncé": "Dark Green",
    "horoscope.data.colors.Bleu nuit": "Night Blue",
    "horoscope.data.colors.Sépia": "Sepia",
    "horoscope.data.colors.Vert sapin": "Fir Green",
    "horoscope.data.colors.Bleu électrique": "Electric Blue",
    "horoscope.data.colors.Argent métallique": "Metallic Silver",
    "horoscope.data.colors.Turquoise": "Turquoise",
    "horoscope.data.colors.Violet": "Violet",
    "horoscope.data.colors.Néon": "Neon",
    "horoscope.data.colors.Cyan": "Cyan",
    "horoscope.data.colors.Vert aqua": "Aqua Green",
    "horoscope.data.colors.Violet mystique": "Mystic Purple",
    "horoscope.data.colors.Blanc perle": "Pearl White",
    "horoscope.data.colors.Bleu lagon": "Lagoon Blue",
    "horoscope.data.colors.Vert d'eau": "Water Green",

    "horoscope.data.compatibility.Lion, Sagittaire": "Leo, Sagittarius",
    "horoscope.data.compatibility.Gémeaux, Verseau": "Gemini, Aquarius",
    "horoscope.data.compatibility.Balance, Lion": "Libra, Leo",
    "horoscope.data.compatibility.Verseau, Gémeaux": "Aquarius, Gemini",
    "horoscope.data.compatibility.Sagittaire, Balance": "Sagittarius, Libra",
    "horoscope.data.compatibility.Lion, Verseau": "Leo, Aquarius",
    "horoscope.data.compatibility.Vierge, Capricorne": "Virgo, Capricorn",
    "horoscope.data.compatibility.Cancer, Poissons": "Cancer, Pisces",
    "horoscope.data.compatibility.Scorpion, Vierge": "Scorpio, Virgo",
    "horoscope.data.compatibility.Capricorne, Cancer": "Capricorn, Cancer",
    "horoscope.data.compatibility.Poissons, Scorpion": "Pisces, Scorpio",
    "horoscope.data.compatibility.Vierge, Poissons": "Virgo, Pisces",
    "horoscope.data.compatibility.Balance, Verseau": "Libra, Aquarius",
    "horoscope.data.compatibility.Bélier, Lion": "Aries, Leo",
    "horoscope.data.compatibility.Verseau, Bélier": "Aquarius, Aries",
    "horoscope.data.compatibility.Sagittaire, Gémeaux": "Sagittarius, Gemini",
    "horoscope.data.compatibility.Balance, Bélier": "Libra, Aries",
    "horoscope.data.compatibility.Scorpion, Poissons": "Scorpio, Pisces",
    "horoscope.data.compatibility.Taureau, Vierge": "Taurus, Virgo",
    "horoscope.data.compatibility.Capricorne, Scorpion": "Capricorn, Scorpio",
    "horoscope.data.compatibility.Poissons, Taureau": "Pisces, Taurus",
    "horoscope.data.compatibility.Bélier, Sagittaire": "Aries, Sagittarius",
    "horoscope.data.compatibility.Gémeaux, Balance": "Gemini, Libra",
    "horoscope.data.compatibility.Bélier, Gémeaux": "Aries, Gemini",
    "horoscope.data.compatibility.Verseau, Lion": "Aquarius, Leo",
    "horoscope.data.compatibility.Sagittaire, Bélier": "Sagittarius, Aries",
    "horoscope.data.compatibility.Gémeaux, Lion": "Gemini, Leo",
    "horoscope.data.compatibility.Cancer, Scorpion": "Cancer, Scorpio",
    "horoscope.data.compatibility.Vierge, Cancer": "Virgo, Cancer",
    "horoscope.data.compatibility.Scorpion, Capricorne": "Scorpio, Capricorn",
    "horoscope.data.compatibility.Cancer, Vierge": "Cancer, Virgo",
    "horoscope.data.compatibility.Cancer, Taureau": "Cancer, Taurus",
    "horoscope.data.compatibility.Vierge, Scorpion": "Virgo, Scorpio",
    "horoscope.data.compatibility.Poissons, Cancer": "Pisces, Cancer",
    "horoscope.data.compatibility.Taureau, Poissons": "Taurus, Pisces",
    "horoscope.data.compatibility.Cancer, Capricorne": "Cancer, Capricorn",
    "horoscope.data.compatibility.Lion, Balance": "Leo, Libra",
    "horoscope.data.compatibility.Balance, Sagittaire": "Libra, Sagittarius",
    "horoscope.data.compatibility.Gémeaux, Sagittaire": "Gemini, Sagittarius",

    // Horoscope Data Translations - Date Ranges
    "horoscope.data.dates.aries": "March 21 - April 19",
    "horoscope.data.dates.taurus": "April 20 - May 20",
    "horoscope.data.dates.gemini": "May 21 - June 20",
    "horoscope.data.dates.cancer": "June 21 - July 22",
    "horoscope.data.dates.leo": "July 23 - August 22",
    "horoscope.data.dates.virgo": "August 23 - September 22",
    "horoscope.data.dates.libra": "September 23 - October 22",
    "horoscope.data.dates.scorpio": "October 23 - November 21",
    "horoscope.data.dates.sagittarius": "November 22 - December 21",
    "horoscope.data.dates.capricorn": "December 22 - January 19",
    "horoscope.data.dates.aquarius": "January 20 - February 18",
    "horoscope.data.dates.pisces": "February 19 - March 20",

    // ENGLISH - All new translations for variations

    // ========== VARIED GREETINGS ==========

    // Daily reading - variants
    "interpretation.daily.greeting.var1":
      "Hi {name}! I have a special message for you today.",
    "interpretation.daily.greeting.var2":
      "Hey {name}! Your daily guide is waiting for you with anticipation.",
    "interpretation.daily.greeting.var3":
      "Hello {name}! A beautiful energy accompanies you today.",
    "interpretation.daily.greeting.var4":
      "Good day {name}! Cosmic energies have prepared something for you.",

    // Tarot - variants
    "interpretation.tarot.greeting.var1":
      "Hey {name}! Your Tarot reading reveals fascinating aspects of your life.",
    "interpretation.tarot.greeting.var2":
      "Hello {name}! The Tarot cards have powerful messages for you.",
    "interpretation.tarot.greeting.var3":
      "Good day {name}! Your Tarot reading unveils important truths.",
    "interpretation.tarot.greeting.var4":
      "Hi {name}! The Tarot arcana speak clearly about your future.",

    // Angels - variants
    "interpretation.angels.greeting.var1":
      "Hi {name}! The angelic realm overflows with messages of love for you.",
    "interpretation.angels.greeting.var2":
      "Hey {name}! Your celestial guides illuminate your path today.",
    "interpretation.angels.greeting.var3":
      "Hello {name}! Angels sing melodies of guidance especially for you.",
    "interpretation.angels.greeting.var4":
      "Good day {name}! An angelic symphony resonates in the celestial spheres for you.",

    // Runes - variants
    "interpretation.runes.greeting.var1":
      "Heil {name}! The ancient runes speak of your Viking heritage.",
    "interpretation.runes.greeting.var2":
      "Hi {name}! The echo of Nordic gods resonates through these sacred runes.",
    "interpretation.runes.greeting.var3":
      "Good day {name}! The millennial runes reveal the strength that slumbers within you.",
    "interpretation.runes.greeting.var4":
      "Hello {name}! Viking wisdom crosses the ages to guide you.",

    // ========== VARIED TRANSITIONS ==========

    // Past transitions
    "interpretation.transition.past.var1":
      "These experiences have truly made you grow and made you stronger.",
    "interpretation.transition.past.var2":
      "These moments have forged your character and resilience.",
    "interpretation.transition.past.var3":
      "All this has contributed to shaping the person you have become.",
    "interpretation.transition.past.var4":
      "These trials have given you precious wisdom.",
    "interpretation.transition.past.var5":
      "It's thanks to these experiences that you developed your inner strength.",
    "interpretation.transition.past.var6":
      "These events have taught you important lessons about life.",
    "interpretation.transition.past.var7":
      "All this experience has enriched your soul and your journey.",
    "interpretation.transition.past.var8":
      "These challenges have revealed your true nature and determination.",

    // Present transitions
    "interpretation.transition.present.var1":
      "You are in an important period that announces beautiful things ahead.",
    "interpretation.transition.present.var2":
      "This phase of your life opens promising perspectives.",
    "interpretation.transition.present.var3":
      "It's a key moment that prepares your radiant future.",
    "interpretation.transition.present.var4":
      "This current period lays the foundation for your future success.",
    "interpretation.transition.present.var5":
      "You're living a transition that will transform your life positively.",
    "interpretation.transition.present.var6":
      "This present moment carries great promises.",
    "interpretation.transition.present.var7":
      "This stage marks a positive turning point in your existence.",
    "interpretation.transition.present.var8":
      "You're going through a phase that will bring you much satisfaction.",

    // Future transitions
    "interpretation.transition.future.var1":
      "This energy will transform your life in a positive and lasting way.",
    "interpretation.transition.future.var2":
      "These influences will bring wonderful changes to your life.",
    "interpretation.transition.future.var3":
      "This force will create extraordinary opportunities for you.",
    "interpretation.transition.future.var4":
      "These vibrations will attract everything you need.",
    "interpretation.transition.future.var5":
      "This energy will manifest your dearest dreams.",
    "interpretation.transition.future.var6":
      "These divine influences will illuminate your path.",
    "interpretation.transition.future.var7":
      "This power will unlock your hidden potential.",
    "interpretation.transition.future.var8":
      "These energies will synchronize all aspects of your life.",

    // ========== VARIED ADVICE ==========

    "interpretation.advice.var1":
      "trust your instinct. You have everything it takes to succeed!",
    "interpretation.advice.var2":
      "listen to your inner wisdom. It will never betray you!",
    "interpretation.advice.var3":
      "follow your heart and your intuitions. They guide you to happiness!",
    "interpretation.advice.var4":
      "stay connected to your values. They are your best guide!",
    "interpretation.advice.var5":
      "keep faith in your abilities. You are stronger than you think!",
    "interpretation.advice.var6":
      "stay open to opportunities. The universe works for you!",
    "interpretation.advice.var7":
      "cultivate your patience. Everything happens at the perfect time!",
    "interpretation.advice.var8":
      "maintain your determination. Your efforts will be rewarded!",
    "interpretation.advice.var9":
      "preserve your optimism. It attracts the best energies!",
    "interpretation.advice.var10":
      "nourish your confidence. It's the key to all your successes!",

    //Translation key variations
    "interpretation.tarot.template.advice.var1":
      "My advice: {name}, with your {zodiacSign} nature,",
    "interpretation.tarot.template.advice.var2":
      "{genderText} {name}, as a {zodiacSign},",
    "interpretation.tarot.template.advice.var3":
      "Listen well, {name}: as a {zodiacSign},",
    "interpretation.tarot.template.advice.var4":
      "Remember this, {name}, your {zodiacSign} essence is powerful.",
    "interpretation.tarot.template.advice.var5":
      "{name}, the stars speak through your {zodiacSign} nature.",
    "interpretation.tarot.template.advice.var6":
      "Remember, {name}: your {zodiacSign} sign holds an essential truth.",
    "interpretation.tarot.template.advice.var7":
      "{genderText} {name}, your destiny resonates with the energy of the {zodiacSign}.",
    "interpretation.tarot.template.advice.var8":
      "Know this, {name}, as a {zodiacSign}, you carry a unique light.",

    // Templates for the final message
    "interpretation.angels.template.message.var1":
      "Angelic message: {genderText} {name}, with your {zodiacSign} essence",
    "interpretation.angels.template.message.var2":
      "The angels speak to you, {name}: as a {zodiacSign}",
    "interpretation.angels.template.message.var3":
      "Heavenly guidance, {name}: like a true {zodiacSign}",
    "interpretation.angels.template.message.var4":
      "Angelic blessing, {name}, your {zodiacSign} nature shines through",
    "interpretation.angels.template.message.var5":
      "{name}, the angels honor your {zodiacSign} light.",
    "interpretation.angels.template.message.var6":
      "Listen closely, {name}: your {zodiacSign} soul receives a divine message.",
    "interpretation.angels.template.message.var7":
      "Celestial message for you, {name} — as a {zodiacSign}, you are divinely guided.",
    "interpretation.angels.template.message.var8":
      "The heavenly realms whisper to you, {name}: your {zodiacSign} essence is awakening.",

    // Crystal Ball English
    "crystalBall.title": "Mystic Crystal Ball",
    "crystalBall.subtitle": "Ask your question and let the magic guide you",
    "crystalBall.askPrompt": "What is your question?",
    "crystalBall.questionPlaceholder": "Write your question here...",
    "crystalBall.submitQuestion": "Consult the Ball",
    "crystalBall.thinking": "The ball is thinking...",
    "crystalBall.guidance":
      "Listen to your intuition to interpret this message",
    "crystalBall.askAnother": "Ask another question",
    "crystalBall.newQuestion": "Ask another question",
    "crystalBall.backHome": "🏠 Back to home",
    "crystalBall.closedQuestionHint": "What do you want to know? Ask the crystal ball… but be careful: it only answers yes or no...",
    "crystalBall.example.good": "E.g.: Will I find love this year?",
    
    // English
    "oracle.crystalBall.title": "Crystal Ball",
    "oracle.crystalBall.description": "Ask your questions to the mystic ball",

    // Crystal Ball Answers English
    "crystalBall.answers.yes": "Yes",
    "crystalBall.answers.no": "No",
    "crystalBall.answers.maybe": "Maybe",
    "crystalBall.answers.veryLikely": "Very likely",
    "crystalBall.answers.unlikely": "Unlikely",
    "crystalBall.answers.certain": "It is certain",
    "crystalBall.answers.noChance": "No chance",
    "crystalBall.answers.askLater": "The answer will come in time",
    "crystalBall.answers.dontCount": "Don’t count on it",
    "crystalBall.answers.yesDefinitely": "Yes, definitely",
    "crystalBall.answers.signsYes": "Signs point to yes",
    "crystalBall.answers.signsNo": "Signs point to no",
    "crystalBall.answers.unclear": "It is too soon to tell",
    "crystalBall.answers.trustIntuition": "Trust your intuition",

    // Crystal Ball End Message English
    "interpretation.dailyComplete": "Your daily reading is complete",
    "interpretation.timeUntilReset":
      "Next reading available in {hours}h{minutes}min",
    "interpretation.consultCrystalBall": "Consult the Crystal Ball",
    "common.backHome": "Back to home",
    "crystalBall.disclaimer":
      "Crystal ball answers are symbolic and meant for entertainment. Always listen to your heart and loved ones for your real life choices.",

    // GRIMOIRE MYSTIQUE
    "grimoire.title": "Mystical Grimoire",
    "grimoire.free.title": "Free version: 3 latest readings saved",
    "grimoire.free.subtitle": "Upgrade to Premium for unlimited history!",
    "grimoire.premium.active": "Premium Access - Unlimited History",
    "grimoire.empty.title": "No readings saved yet",
    "grimoire.empty.subtitle": "Start your first consultation to fill your mystical grimoire",
    "grimoire.cards.title": "Cards drawn:",
    "grimoire.interpretation.show": "View full interpretation",
    "grimoire.interpretation.hide": "Hide interpretation",
    "grimoire.notes.title": "Personal notes",
    "grimoire.notes.placeholder": "Add your thoughts...",
    "grimoire.favorite.add": "Add to favorites",
    "grimoire.favorite.remove": "Remove from favorites",
    "grimoire.oracle.daily": "Daily Reading",
    "grimoire.oracle.tarot": "Tarot",
    "grimoire.oracle.angels": "Angel Oracle",
    "grimoire.oracle.runes": "Viking Runes",
    "grimoire.stats.total": "Total",
      "grimoire.stats.thisMonth": "This month",

      "grimoire.clearAll.button": "Clear all",
      "grimoire.clearAll.confirm.title": "Are you sure?",
      "grimoire.clearAll.confirm.message": "This action is irreversible. All your readings will be permanently deleted.",
      "grimoire.clearAll.confirm.button": "Yes, clear all",

    // MENU LÉGAL
    "legal.menu.title": "Legal menu",
    "legal.mentions": "Legal notices",
    "legal.privacy": "Privacy policy",

    // PREMIUM MODAL
    "premium.button.label": "Become Premium",
    "premium.title": "Remove Ads!",
    "premium.subtitle": "Do your readings without ads!",
    "premium.plan.1month": "1 Month",
    "premium.plan.1month.subtitle": "No commitment",
    "premium.plan.3months": "3 Months",
    "premium.plan.3months.subtitle": "Best offer",
    "premium.plan.discount": "-25%",
    "premium.button.subscribe": "Subscribe now",
    "premium.button.select": "Select an offer",
    "premium.button.processing": "Processing...",
    "premium.benefits.ads": "No advertisements",
    "premium.benefits.grimoire": "Unlimited Mystic Grimoire",
    "premium.benefits.notes": "Notes and favorites",
    "premium.benefits.history": "Full history of your readings",
    "premium.confirm.1month": "Confirm payment of €3.99 for 1 month?",
    "premium.confirm.3months": "Confirm payment of €8.98 for 3 months?",
    "premium.success": "Subscription successfully activated! Enjoy your ad-free experience and unlimited Grimoire.",
    "premium.error.activation": "Error while activating subscription",
    "premium.error.payment": "Payment error. Please try again.",
    "premium.manage": "Manage my subscription (cancel, invoices...)",
    "premium.expired": "Your Premium access has expired",
    "premium.expiringSoon": "Your Premium access is expiring soon",
    "premium.conditions.line1": "🔒 Secure payment via Stripe",
    "premium.conditions.line2": "✓ One-time payment, NO automatic renewal",
    "premium.conditions.line3": "No refund after payment. Premium access valid for the selected duration.",
    "premium.conditions.line4": "You will be notified 3 days before your access expires.",
    "premium.securePaymentBy": "Secure payment by",
    "premium.restoreSubscription": "Restore a subscription",
    "premium.backToPurchases": "Back to purchases",
    "premium.payment.googlePlay": "Google Play Payment",
    "premium.payment.stripe": "Stripe Web Payment",
    "premium.restoreEmailLabel": "Your Email",
    "premium.restore": "Restore",
    "premium.buy": "Buy",
    "premium.error.invalidEmail": "The email address is not valid.",
    "premium.error.noActivePremium": "No active subscription found",
    
    // PREMIUM RESTOR
    "premium.restore.title": "Restore my subscription",
    "premium.restore.subtitle": "Already Premium? Recover your access",
    "premium.restore.description": "Enter the email used when purchasing Premium",
    "premium.restore.button": "Restore",
    "premium.restore.verifying": "Verifying...",
    "premium.restore.success": "Premium successfully restored!",
    "premium.restore.redirecting": "Redirecting...",
    "premium.restore.notFound": "No Premium subscription found for this email. Check the address or subscribe to a new plan.",
    "premium.restore.error": "An error occurred while restoring. Please try again.",
    "premium.restore.info": "You must use the same email as when you purchased Premium on Stripe.",
    "premium.restore.help": "Need help?",
    "premium.restore.contact": "Contact us",
    "premium.error.emailRequired": "Email is required.",
    "premium.error.emailInvalid": "Email is not valid.",
    "premium.emailLabel": "Your email",
    "premium.emailHelp": "To retrieve your subscription",
    "premium.poweredBy": 'Powered by',
    "premium.backToPurchase": "Back to Purchases",
    "premium.button.loading": "Loading...",
    "premium.loading.offers": "Loading offers...",
    "premium.button.restoring": "Restoring...",
    "premium.error.loadFailed": "Failed to load offers",
    "premium.error.purchaseFailed": "Error during purchase",
    "premium.error.unknown": "Unknown error",

    // PAGE PAIEMENT SUCESS CANCEL
    "payment.success.title": "Payment Successful!",
    "payment.success.verified": "Your Premium account has been activated",
    "payment.success.activating": "Activation in progress...",
    "payment.success.benefits": "Enjoy all Premium features!",
    "payment.success.noAds": "Ad-free",
    "payment.success.unlimitedGrimoire": "Unlimited Grimoire",
    "payment.success.fullHistory": "Full history",
    "payment.success.redirecting": "Automatic redirection to oracles...",
    "payment.cancel.title": "Payment Cancelled",
    "payment.cancel.message": "You cancelled the payment",
    "payment.cancel.retry": "You can try again anytime from the Premium menu",
    "payment.cancel.redirecting": "Returning to oracle selection...",

    // Mystery Dice Oracle
    "oracle.bonusRoll.title": "Bonus Roll",
      "oracle.bonusRoll.description": "Unlock your secret numerological revelation",
      "oracle.bonusRoll.ready": "Ready to discover your bonus message?",
      "oracle.bonusRoll.rolling": "🎲 Rolling the mystical dice...",
      "oracle.bonusRoll.loadingAd": "📢 Unlocking your revelation...",
      "oracle.bonusRoll.result": "Result",
      "oracle.bonusRoll.cosmicMessage": "Your bonus message",
      "oracle.bonusRoll.rollButton": "🎲 Roll the dice",
      "oracle.bonusRoll.newRoll": "✨ New Bonus Roll",
      "oracle.bonusRoll.diceResult": "Dice",
    "oracle.bonusRoll.startButton": "🎁 Unlock Bonus Roll",
    "oracle.bonusRoll.exclusiveBadge": 'EXCLUSIVE BONUS',
    "oracle.bonusRoll.adRequired": "You must watch the complete ad to access the Bonus Roll.",
    "oracle.bonusRoll.badge": "EXCLUSIVE BONUS",
    "oracle.bonusRoll.pleaseWait": "Please wait a moment",
              
    // Interpretations (2 variations per result)
    "oracle.bonusRoll.2.title.1": "🌅 New Beginning",
    "oracle.bonusRoll.2.message.1": "The stars align for a fresh start. Double Luck is with you today!",
    "oracle.bonusRoll.2.title.2": "✨ Cosmic Rebirth",
    "oracle.bonusRoll.2.message.2": "A new cycle begins in your life. The universe offers you an extraordinary second chance.",
    "oracle.bonusRoll.2.title.3": "🦋 Gentle Transformation",
    "oracle.bonusRoll.2.message.3": "The duality of 2 invites you to find balance. A new page opens before you; turn it with confidence.",

    "oracle.bonusRoll.3.title.1": "🔮 Divine Intuition",
    "oracle.bonusRoll.3.message.1": "Your sixth sense is at its peak. Follow your intuition; it will not mislead you.",
    "oracle.bonusRoll.3.title.2": "👁️ Mystical Vision",
    "oracle.bonusRoll.3.message.2": "The veils lift on your perception. Your clairvoyance reaches unparalleled heights.",
    "oracle.bonusRoll.3.title.3": "🌙 Inner Wisdom",
    "oracle.bonusRoll.3.message.3": "The sacred triangle of 3 illuminates your path. Body, mind, and soul unite today.",

    "oracle.bonusRoll.4.title.1": "🏛️ Solid Foundations",
    "oracle.bonusRoll.4.message.1": "Stability and confidence are your allies. Your foundations are strong; build with assurance.",
    "oracle.bonusRoll.4.title.2": "⚓ Powerful Anchoring",
    "oracle.bonusRoll.4.message.2": "Your stability is your strength. Build something lasting now.",
    "oracle.bonusRoll.4.title.3": "🗿 Divine Structure",
    "oracle.bonusRoll.4.message.3": "The four elements support you. Your determination is a true force.",

    "oracle.bonusRoll.5.title.1": "✨ Magical Opportunities",
    "oracle.bonusRoll.5.message.1": "Change brings unexpected surprises. Stay open to new possibilities.",
    "oracle.bonusRoll.5.title.2": "🌪️ Winds of Change",
    "oracle.bonusRoll.5.message.2": "A transformation is coming your way. Embrace it with confidence and courage.",
    "oracle.bonusRoll.5.title.3": "🎭 Creative Freedom",
    "oracle.bonusRoll.5.message.3": "The number 5 brings great liberation. Your adventurous spirit can finally express itself.",

    "oracle.bonusRoll.6.title.1": "⚖️ Perfect Harmony",
    "oracle.bonusRoll.6.message.1": "Balance reigns in your life. Enjoy this period of peace and harmony.",
    "oracle.bonusRoll.6.title.2": "🕊️ Absolute Serenity",
    "oracle.bonusRoll.6.message.2": "Your soul bathes in tranquility. Enjoy this moment of cosmic grace.",
    "oracle.bonusRoll.6.title.3": "💝 Universal Love",
    "oracle.bonusRoll.6.message.3": "The number of love surrounds you. Relationships and connections flourish under your caring gaze.",

    "oracle.bonusRoll.7.title.1": "🍀 Mystical Luck",
    "oracle.bonusRoll.7.message.1": "The number of luck smiles upon you! Expect pleasant surprises.",
    "oracle.bonusRoll.7.title.2": "🎰 Divine Fortune",
    "oracle.bonusRoll.7.message.2": "The dice of destiny fall in your favor. Providence blesses you today.",
    "oracle.bonusRoll.7.title.3": "🌠 Celestial Magic",
    "oracle.bonusRoll.7.message.3": "7 is a sacred number. The universe conspires miraculously in your favor.",

    "oracle.bonusRoll.8.title.1": "💎 Cosmic Abundance",
    "oracle.bonusRoll.8.message.1": "Success and prosperity surround you. The universe rewards your efforts.",
    "oracle.bonusRoll.8.title.2": "👑 Infinite Prosperity",
    "oracle.bonusRoll.8.message.2": "The flow of abundance comes to you. Your work bears beautiful fruit.",
    "oracle.bonusRoll.8.title.3": "💰 Manifested Wealth",
    "oracle.bonusRoll.8.message.3": "The 8 of infinity materializes your desires. Material and spiritual success go hand in hand.",

    "oracle.bonusRoll.9.title.1": "🌱 Spiritual Growth",
    "oracle.bonusRoll.9.message.1": "Your personal growth reaches new heights. Keep moving forward.",
    "oracle.bonusRoll.9.title.2": "🦋 Sacred Metamorphosis",
    "oracle.bonusRoll.9.message.2": "You are undergoing a spiritual transformation. Your soul rises toward the light.",
    "oracle.bonusRoll.9.title.3": "🌌 Universal Wisdom",
    "oracle.bonusRoll.9.message.3": "The number 9 marks the end of a cycle. You have learned and grown! Your journey becomes an example for others.",

    "oracle.bonusRoll.10.title.1": "🎯 Exciting Challenges",
    "oracle.bonusRoll.10.message.1": "New challenges await, but you are ready to face them with skill.",
    "oracle.bonusRoll.10.title.2": "⚔️ Formative Trials",
    "oracle.bonusRoll.10.message.2": "Obstacles become stepping stones. Your determination turns everything into victory.",
    "oracle.bonusRoll.10.title.3": "🔟 New Master Cycle",
    "oracle.bonusRoll.10.message.3": "The number 10 marks the end of one chapter and the start of another. You are reborn stronger and wiser.",

    "oracle.bonusRoll.11.title.1": "🔥 Victorious Perseverance",
    "oracle.bonusRoll.11.message.1": "Your determination bears fruit. The master number 11 guides you toward success.",
    "oracle.bonusRoll.11.title.2": "⚡ Enlightened Master",
    "oracle.bonusRoll.11.message.2": "The sacred number 11 reveals your unlimited potential. Your presence guides those around you.",
    "oracle.bonusRoll.11.title.3": "✨ Spiritual Awakening",
    "oracle.bonusRoll.11.message.3": "The number 11 signals a new opportunity. Be ready to seize it now.",

    "oracle.bonusRoll.12.title.1": "👑 Total Fulfillment",
    "oracle.bonusRoll.12.message.1": "You have reached a stage of fullness where everything feels in harmony, and you feel accomplished.",
    "oracle.bonusRoll.12.title.2": "🌟 Cosmic Perfection",
    "oracle.bonusRoll.12.message.2": "You have completed an important cycle and are approaching excellence. Everything seems to align around your success.",
    "oracle.bonusRoll.12.title.3": "🏆 Absolute Triumph",
    "oracle.bonusRoll.12.message.3": "Your path reaches a key point with the number 12. Everything falls into place, and you feel perfectly in your place.",


    "oracle.backToOracles": "Back to oracles",

    // Common
    "common.back": "Back",
    "common.home": "Home",
    "common.language": "Language",
  },

  es: {
    // Landing Page
    "landing.title": "CartoMystik",
    "landing.subtitle":
      "Descubre los misterios de tu destino a través de las cartas, las estrellas y la sabiduría ancestral",
    "landing.enter": "ENTRAR",
    "landing.ads.support": "Los anuncios nos ayudan a mantener la aplicación gratuita",

    // 🆕 Disclaimer - AGREGAR AQUÍ
     "disclaimer.title": "Aviso Importante",
      "disclaimer.text": "CartoMystik es una aplicación de entretenimiento y desarrollo personal. Consulte a expertos cualificados para cualquier decisión importante.",
      "disclaimer.note": "Al continuar, acepta utilizar esta aplicación con fines de entretenimiento.",
      "disclaimer.accept": "Entendido",
      "disclaimer.legal": "Esta aplicación cumple con el RGPD.",

    // No-repeat system
    "system.antirepeat.loading": "Las cartas se están mezclando...",
    "system.antirepeat.active": "Sistema anti-repetición activo",
    "system.cards.refreshed": "Nuevas cartas disponibles",

    // Name Page
    "name.title": "Nombre",
    "name.subtitle":
      "¿Cómo te gusta que te llamen? Introduce tu nombre o apodo",
    "name.placeholder": "Introduce tu nombre",
    "name.next": "SIGUIENTE",

    // Date Page
    "date.title": "Fecha de Nacimiento",
    "date.subtitle":
      "Revela tu signo astrológico para una adivinación personalizada",
    "date.day": "Día",
    "date.month": "Mes",
    "date.year": "Año",
    "date.next": "SIGUIENTE",
    "date.months.1": "Enero",
    "date.months.2": "Febrero",
    "date.months.3": "Marzo",
    "date.months.4": "Abril",
    "date.months.5": "Mayo",
    "date.months.6": "Junio",
    "date.months.7": "Julio",
    "date.months.8": "Agosto",
    "date.months.9": "Septiembre",
    "date.months.10": "Octubre",
    "date.months.11": "Noviembre",
    "date.months.12": "Diciembre",

    // Gender Page
    "gender.title": "Género",
    "gender.subtitle": "Introduce tu género para proporcionar contexto a la IA",
    "gender.male": "Masculino",
    "gender.female": "Femenino",
    "gender.other": "Otro",
    "gender.next": "COMENZAR",
    "gender.back": "ATRÁS",

    //Barre de navigation
    "menu.open": "Abrir menú",
      "profile.open": "Abrir perfil",
      "profile.birthdate": "Fecha de nacimiento",
      "profile.gender": "Género",
      "profile.zodiac": "Signo zodiacal",
      "profile.edit": "Editar mi perfil",
      "profile.edit.title": "Editar mi perfil",
      "profile.edit.subtitle": "Actualiza tu información personal",
      "profile.edit.error": "Por favor, completa todos los campos",
      "grimoire.subtitle": "Tu historial de lecturas",
      "premium.active": "Activo",
      "locale": "es-ES",
      "common.cancel": "Cancelar",
      "common.save": "Guardar",
      "name.label": "Nombre",
      
    // ES Notificaciones  
    "notification.channel.name": "Lectura Diaria",
    "notification.channel.description": "Notificaciones para tu lectura mística diaria",
    "notification.variants.1.title": "✨ Las estrellas te llaman",
    "notification.variants.1.body": "¡Descubre tu horóscopo y tu lectura mística del día!",
    "notification.variants.2.title": "🔮 Tu destino te espera",
    "notification.variants.2.body": "Consulta tu lectura diaria y tu horóscopo personalizado",
    "notification.variants.3.title": "🌙 El misterio se revela",
    "notification.variants.3.body": "¡Tu lectura diaria y tu horóscopo ya están listos!",
    "notification.variants.4.title": "⭐ Un mensaje de las estrellas",
    "notification.variants.4.body": "Descubre lo que las cartas y las estrellas tienen preparado para ti hoy",
    "notification.variants.5.title": "✨ CartoMystik te llama",
    "notification.variants.5.body": "Tu guía diaria: lectura de cartas y horóscopo disponibles ahora",
    "notification.modal.title": "Notificaciones Diarias",
    "notification.modal.description": "Recibe cada día a las 10 a.m. un recordatorio místico para descubrir tu lectura y horóscopo personalizados",
    "notification.modal.benefit1": "Lectura diaria de cartas",
    "notification.modal.benefit2": "Horóscopo personalizado según tu signo",
    "notification.modal.benefit3": "Nunca te pierdas tu guía diaria",
    "notification.modal.accept": "Activar notificaciones",
    "notification.modal.decline": "No, gracias",
    "notification.modal.note": "Podrás cambiar esta opción más tarde en los ajustes",

    // Oracle Selection
    "oracle.welcome": "¡Bienvenido/a {name}!",
    "oracle.subtitle": "Descubre los secretos de tu destino",
    "oracle.daily.title": "Carta del Día",
    "oracle.daily.description": "Una carta para guiarte e inspirarte hoy",
    "oracle.horoscope.title": "Horóscopo",
    "oracle.horoscope.description":
      "Descubre lo que las estrellas te deparan hoy según tu signo",
    "oracle.tarot.title": "Tarot",
    "oracle.tarot.description":
      "Los 22 Arcanos Mayores revelan los misterios de tu destino",
    "oracle.angels.title": "Oráculo de los Ángeles",
    "oracle.angels.description":
      "Conéctate con tus guías angelicales para recibir sus mensajes de amor",
    "oracle.runes.title": "Runas Nórdicas",
    "oracle.runes.description":
      "La antigua sabiduría de los vikingos revela tu camino de guerra y victoria",
    "oracle.back": "ATRÁS",
    "oracle.home": "Inicio",

    // Card Game
    "cardgame.back": "Atrás",
    "cardgame.daily.instruction": "Elige 1 carta para tu consejo del día",
    "cardgame.reading.instruction": "Elige 3 cartas para iluminar tu destino",
    "cardgame.selected": "Cartas seleccionadas: {current}/{max}",
    "cardgame.reveal": "REVELAR CARTAS",
    "cardgame.page": "Página {current} de {total}",
    "cardgame.previous": "Anterior",
    "cardgame.next": "Siguiente",
    "cardgame.daily.choose": "Elige la carta que te llama",

    // CardGame - Modal de révélation
    "cardgame.cardRevealed": "Carta revelada",
    "cardgame.continue": "Continuar",
    "cardgame.seeInterpretation": "Ver la interpretación",

    // Revelation - Loading
    "revelation.loading.title": "Interpretando...",
    "revelation.loading.daily": "Los astros revelan tu oráculo del día, {name}",
    "revelation.loading.reading": "Las cartas revelan sus secretos místicos, {name}",
    "revelation.loading.mysticMessage": "Las estrellas se alinean para ti...",

    // Revelation Page
    "revelation.positions.daily": "Consejo del Día",
    "revelation.positions.past": "Carta 1",
    "revelation.positions.present": "Carta 2",
    "revelation.positions.future": "Carta 3",
    "revelation.summary.title": "Lo que revelan tus cartas",
    "revelation.newConsultation": "Nueva consulta",
    "revelation.title.daily": "Tu Consejo del Día",
    "revelation.title.reading": "Tu Lectura - {oracle}",
    "revelation.instruction.daily":
      "Haz clic en tu carta para revelar el mensaje del día",
    "revelation.instruction.reading": "Haz clic en cada carta para revelar tu destino",
    "revelation.flipCard.reveal": "Toca para revelar",
    "revelation.summary.seeMore": "Ver más ↓",
    "revelation.summary.seeLess": "Ver menos ↑",
    "revelation.revealButton": "Revelación",
    "revelation.backToSelection": "Volver a la selección",
    "interpretation.advice.title": "Tu consejo personal",
    "revelation.subtitle.revealed": "Contempla tus cartas reveladas",

    // Interpretation Templates
    "interpretation.gender.femme": "Mi querida",
    "interpretation.gender.homme": "Mi querido",
    "interpretation.gender.autre": "Querida alma",
    "interpretation.daily.greeting":
      "¡Hola {name}! Aquí tienes tu consejo para este hermoso día.",
    "interpretation.daily.zodiac": "Como {zodiacSign}, ",
    "interpretation.daily.cardMessage":
      'la carta "{cardName}" tiene una energía especial para ti hoy.',
    "interpretation.daily.wisdom":
      "Como {zodiacSign}, tienes la sabiduría necesaria para usar bien este consejo. Confía en tu instinto y deja que esta energía positiva guíe tus acciones hoy.",
    "interpretation.daily.closing":
      "¡Que tengas un buen día {genderText} {name}, y que las estrellas iluminen tu camino!",
    "interpretation.tarot.greeting":
      "¡Hola {name}! Tu lectura de Tarot me dice cosas interesantes.",
    "interpretation.tarot.past":
      "{cardName} en tu pasado muestra que has vivido momentos que realmente te han hecho crecer. No siempre fue fácil, pero te ha hecho más fuerte.",
    "interpretation.tarot.present":
      "En este momento, {cardName} influye en tu vida de manera positiva. Estás en un período donde las cosas se mueven, y eso es una buena señal para el futuro.",
    "interpretation.tarot.future":
      "¡Para tu futuro, {cardName} anuncia cosas hermosas! Puedes esperar cambios felices que te traerán satisfacción.",
    "interpretation.tarot.advice":
      "Mi consejo: {name}, con tu carácter de {zodiacSign}, confía en tu instinto. ¡Tienes todo lo que necesitas para triunfar!",
    "interpretation.angels.greeting":
      "¡Hola {name}! Tus ángeles guardianes tienen revelaciones luminosas que compartir contigo.",
    "interpretation.angels.past":
      "A lo largo de tu pasado, {cardName} sembró semillas divinas: {cardMeaning}. Estas bendiciones han nutrido tu alma y te han preparado para recibir el amor incondicional que te rodea ahora.",
    "interpretation.angels.present":
      "En este momento preciso, {cardName} ilumina tu presente: {cardMeaning}. Esta luz celestial guía cada uno de tus pasos y transforma tus desafíos en oportunidades de crecimiento espiritual.",
    "interpretation.angels.future":
      "Hacia tu futuro radiante, {cardName} despliega sus alas protectoras: {cardMeaning}. Las puertas del paraíso se abren ante ti, revelando un camino pavimentado con milagros y sincronicidades.",
    "interpretation.angels.message":
      "Transmisión angélica: {genderText} {name}, tu esencia de {zodiacSign} vibra en armonía con estas frecuencias divinas. ¡Deja que tu corazón se abra a estos mensajes de amor puro y mantente receptivo a las señales que tus guías te envían!",
    "interpretation.runes.greeting":
      "¡Salve {name}! Las antiguas runas nórdicas revelan los secretos de tu destino de guerrer.",
    "interpretation.runes.past":
      "Tu runa del pasado, {cardName}, revela: {cardMeaning}. Estas fuerzas primitivas han esculpido tu carácter en fuego y hielo, preparándote para los desafíos de hoy con sabiduría ancestral.",
    "interpretation.runes.present":
      "En este momento, {cardName} guía tus pasos: {cardMeaning}. Esta energía rúnica ilumina tu sendero actual, conectándote con las fuerzas místicas que rigen tu vida cotidiana.",
    "interpretation.runes.future":
      "Hacia el futuro, {cardName} anuncia: {cardMeaning}. Esta profecía rúnica traza el camino de tus logros futuros, donde brillarás victorios{genderSuffix} bajo la égida de los dioses nórdicos.",
    "interpretation.runes.advice":
      "Recuerda, {genderText} {name}: como {zodiacSign}, portas el legado vikingo en tu sangre. Las runas han hablado - ¡sigue su guía con coraje y determinación!",
    "interpretation.fallback.zodiac": "persona intuitiva",
    "interpretation.fallback.angels": "ser luminoso",
    "interpretation.fallback.runes": "luchador",
    "interpretation.title.daily": "Interpretación para {name}",
    "interpretation.title.reading": "Tirada de cartas para {name}",
    "interpretation.subtitle": "Aquí tienes tu revelación personalizada",

    "interpretation.backToCards": "Volver a las cartas",
    "interpretation.newConsultation": "Nueva consulta",

    // ========== VARIACIONES PARA LA TIRADA DIARIA ==========

    // Variaciones para "la carta tiene una energía especial"
    "interpretation.daily.cardMessage.var1":
      'La carta "{cardName}" tiene una energía especial para ti hoy.',
    "interpretation.daily.cardMessage.var2":
      'La carta "{cardName}" te trae una vibración única hoy.',
    "interpretation.daily.cardMessage.var3":
      'La carta "{cardName}" resuena especialmente con tu energía del día.',
    "interpretation.daily.cardMessage.var4":
      'La carta "{cardName}" lleva un mensaje importante para ti hoy.',
    "interpretation.daily.cardMessage.var5":
      'La carta "{cardName}" vibra en armonía con tu día.',
    "interpretation.daily.cardMessage.var6":
      'La carta "{cardName}" ilumina tu camino con una fuerza especial hoy.',
    "interpretation.daily.cardMessage.var7":
      'La carta "{cardName}" te invita a escuchar tu intuición hoy.',
    "interpretation.daily.cardMessage.var8":
      'La carta "{cardName}" transmite una energía poderosa que te guía.',
    "interpretation.daily.cardMessage.var9":
      'La carta "{cardName}" te ofrece una vibración excepcional para sentir hoy.',
    "interpretation.daily.cardMessage.var10":
      'La carta "{cardName}" te acompaña con una energía luminosa durante todo el día.',

    //Variaciones para "Wisdom"
    "interpretation.daily.wisdom.var1":
      "Como {zodiacSign}, tienes la sabiduría necesaria para aprovechar bien este consejo. Confía en tu instinto y deja que esta energía positiva guíe tus acciones hoy.",
    "interpretation.daily.wisdom.var2":
      "Tu signo zodiacal te aporta una hermosa intuición. Confía en ella y déjate guiar por la energía positiva que te rodea.",
    "interpretation.daily.wisdom.var3":
      "Los astros te acompañan hoy. Deja que esta hermosa energía te ayude a avanzar con serenidad.",
    "interpretation.daily.wisdom.var4":
      "Como {zodiacSign}, tienes las claves para interpretar este mensaje celestial. Haz buen uso de ellas durante el día.",
    "interpretation.daily.wisdom.var5":
      "Tu carácter de {zodiacSign} resuena perfectamente con este consejo. Deja que esta armonía cósmica ilumine tu camino hoy.",
    "interpretation.daily.wisdom.var6":
      "El cielo habla a través de tu signo zodiacal. Estate atento a las señales y avanza con confianza.",
    "interpretation.daily.wisdom.var7":
      "Como {zodiacSign}, estás alineado{genderSuffix} con una energía sutil hoy. Síguela, te llevará a donde debes estar.",
    "interpretation.daily.wisdom.var8":
      "Tu signo {zodiacSign} te guía con sabiduría. Deja tu corazón abierto y tu mente clara para mostrarte el camino.",
    "interpretation.daily.wisdom.var9":
      "Llevas una luz única dentro de ti. Que este mensaje te ayude a hacerla brillar plenamente y con orgullo.",
    "interpretation.daily.wisdom.var10":
      "La energía de tu {zodiacSign} está en resonancia con las vibraciones del día. Recibe este consejo como una guía amable e inspiradora.",

    // Variaciones para "Buen día"
    "interpretation.daily.closing.var1":
      "¡Que tengas un gran día {genderText} {name}, y que las estrellas iluminen tu camino!",
    "interpretation.daily.closing.var2":
      "¡Hermoso día para ti {name}, que esta guía te acompañe!",
    "interpretation.daily.closing.var3":
      "Disfruta tu día {name}, ¡las energías están contigo!",
    "interpretation.daily.closing.var4":
      "¡Que tengas un día maravilloso {genderText} {name}!",
    "interpretation.daily.closing.var5":
      "Que tu día sea dulce {name}, ¡el universo vela por ti!",
    "interpretation.daily.closing.var6":
      "Que tengas un día brillante, {genderText} {name}, lleno de maravillosas sorpresas!",
    "interpretation.daily.closing.var7":
      "Que tengas un gran día, {name}, que la energía positiva te acompañe en todo momento!",
    "interpretation.daily.closing.var8":
      "Que este día te traiga alegría y serenidad, {genderText} {name}!",
    "interpretation.daily.closing.var9":
      "¡Sonríe a la vida hoy, {name}, y la vida te sonreirá de vuelta!",
    "interpretation.daily.closing.var10":
      "Que tengas un día inspirador, {genderText} {name}, bajo la protección de las estrellas!",

    // Horoscope daily sections
    "horoscope.greeting": `¡Hola {name}! Aquí tienes tu horóscopo diario como {zodiacSign} {zodiacSymbol}`,
    "horoscope.predictions.title": "Predicciones del día:",
    "horoscope.mood.today": "Tu estado de ánimo hoy: {mood}",
    "horoscope.mood.energy":
      "¡Esta energía te acompañará todo el día. Aprovéchala para hacer cosas que te hagan sentir bien!",
    "horoscope.assets.title": "Tus ventajas del día:",
    "horoscope.assets.luckyNumber": "• Número de la suerte: {luckyNumber}",
    "horoscope.assets.luckyColor": "• Color de la suerte: {luckyColor}",
    "horoscope.compatibility":
      "Compatibilidad: Te llevarás particularmente bien con los signos {compatibility} hoy. ¡Es el momento ideal para fortalecer tus relaciones!",
    "horoscope.message": `{genderText} {name}, como {zodiacSign}, tienes esta hermosa energía que atrae cosas buenas. ¡Confía en las estrellas y en tu intuición hoy!`,
      "horoscope.mood.title": "Estado de ánimo del día",
      "horoscope.compatibility.title": "Compatibilidad",
      "horoscope.advice.title": "Tu consejo personal",

    // Zodiac signs names
    "zodiac.signs.aries": "Aries",
    "zodiac.signs.taurus": "Tauro",
    "zodiac.signs.gemini": "Géminis",
    "zodiac.signs.cancer": "Cáncer",
    "zodiac.signs.leo": "Leo",
    "zodiac.signs.virgo": "Virgo",
    "zodiac.signs.libra": "Libra",
    "zodiac.signs.scorpio": "Escorpio",
    "zodiac.signs.sagittarius": "Sagitario",
    "zodiac.signs.capricorn": "Capricornio",
    "zodiac.signs.aquarius": "Acuario",
    "zodiac.signs.pisces": "Piscis",

    // Zodiac Signs
    "zodiac.aries": "Aries",
    "zodiac.taurus": "Tauro",
    "zodiac.gemini": "Géminis",
    "zodiac.cancer": "Cáncer",
    "zodiac.leo": "Leo",
    "zodiac.virgo": "Virgo",
    "zodiac.libra": "Libra",
    "zodiac.scorpio": "Escorpio",
    "zodiac.sagittarius": "Sagitario",
    "zodiac.capricorn": "Capricornio",
    "zodiac.aquarius": "Acuario",
    "zodiac.pisces": "Piscis",

    // Horoscope
    "horoscope.title": "Horóscopo del Día",
    "horoscope.predictions": "Tus Predicciones Astrales",
    "horoscope.retry": "Reintentar",
    "horoscope.home": "Inicio",
    "horoscope.newConsultation": "Nueva consulta",
    "horoscope.error": "Lo siento, no se pudo obtener tu horóscopo del día.",
    "horoscope.loading": "Los astros revelan tus predicciones...",
    "horoscope.noSign":
      "Lo siento, necesitamos tu signo astrológico para mostrar tu horóscopo.",

    // Card Names and Meanings - Runes
    "cards.runes.Fehu.name": "Fehu",
    "cards.runes.Fehu.meaning":
      "Riqueza, prosperidad, nuevo comienzo financiero",
    "cards.runes.Uruz.name": "Uruz",
    "cards.runes.Uruz.meaning": "Fuerza bruta, salud, transformación",
    "cards.runes.Thurisaz.name": "Thurisaz",
    "cards.runes.Thurisaz.meaning": "Defensa, protección, fuerza destructiva",
    "cards.runes.Ansuz.name": "Ansuz",
    "cards.runes.Ansuz.meaning": "Comunicación divina, inspiración, sabiduría",
    "cards.runes.Raidho.name": "Raidho",
    "cards.runes.Raidho.meaning": "Viaje, movimiento, progresión",
    "cards.runes.Kenaz.name": "Kenaz",
    "cards.runes.Kenaz.meaning": "Conocimiento, creatividad, iluminación",
    "cards.runes.Gebo.name": "Gebo",
    "cards.runes.Gebo.meaning": "Regalo, intercambio, asociación",
    "cards.runes.Wunjo.name": "Wunjo",
    "cards.runes.Wunjo.meaning": "Alegría, felicidad, armonía",
    "cards.runes.Hagalaz.name": "Hagalaz",
    "cards.runes.Hagalaz.meaning": "Disrupción, cambio forzado, purificación",
    "cards.runes.Nauthiz.name": "Nauthiz",
    "cards.runes.Nauthiz.meaning": "Necesidad, restricción, lección kármica",
    "cards.runes.Isa.name": "Isa",
    "cards.runes.Isa.meaning": "Hielo, estancamiento, paciencia",
    "cards.runes.Jera.name": "Jera",
    "cards.runes.Jera.meaning": "Cosecha, ciclos, recompensa",
    "cards.runes.Eihwaz.name": "Eihwaz",
    "cards.runes.Eihwaz.meaning":
      "Resistencia, protección, conexión espiritual",
    "cards.runes.Perthro.name": "Perthro",
    "cards.runes.Perthro.meaning": "Misterio, destino, fuerzas ocultas",
    "cards.runes.Algiz.name": "Algiz",
    "cards.runes.Algiz.meaning": "Protección divina, conexión con guías",
    "cards.runes.Sowilo.name": "Sowilo",
    "cards.runes.Sowilo.meaning": "Éxito, victoria, energía solar",
    "cards.runes.Tiwaz.name": "Tiwaz",
    "cards.runes.Tiwaz.meaning": "Victoria, justicia, sacrificio honorable",
    "cards.runes.Berkano.name": "Berkano",
    "cards.runes.Berkano.meaning": "Crecimiento, fertilidad, nuevo ciclo",
    "cards.runes.Ehwaz.name": "Ehwaz",
    "cards.runes.Ehwaz.meaning": "Movimiento, progreso, asociación",
    "cards.runes.Mannaz.name": "Mannaz",
    "cards.runes.Mannaz.meaning": "Humanidad, yo, inteligencia",
    "cards.runes.Laguz.name": "Laguz",
    "cards.runes.Laguz.meaning": "Agua, intuición, emociones",
    "cards.runes.Ingwaz.name": "Ingwaz",
    "cards.runes.Ingwaz.meaning": "Fertilidad masculina, energía creativa",
    "cards.runes.Dagaz.name": "Dagaz",
    "cards.runes.Dagaz.meaning": "Despertar, transformación, nuevo día",
    "cards.runes.Othala.name": "Othala",
    "cards.runes.Othala.meaning": "Herencia, propiedad, tradición familiar",

    // Card Names and Meanings - Daily
    "cards.daily.NouveauDepart.name": "Nuevo Comienzo",
    "cards.daily.NouveauDepart.meaning":
      "Hoy marca el fin de un ciclo importante y la apertura de una nueva página en tu vida. Es un momento privilegiado para atreverte a superar las barreras que te habían detenido hasta ahora, ya sea en el ámbito personal, profesional o sentimental. El universo te envía un mensaje de ánimo: avanza sin miedo, confía en tu intuición y sé receptivo a las oportunidades que se presenten. Cada pequeño paso dado hoy, aunque parezca modesto, construye la base de un futuro más rico, más sereno y profundamente satisfactorio. Este renacer te invita a soltar el pasado, renovarte y abrazar plenamente los cambios que te llevarán hacia tu bienestar.",
    "cards.daily.Patience.name": "Paciencia",
    "cards.daily.Patience.meaning":
      "Esta lectura te recuerda que algunas cosas necesitan tiempo para manifestarse. No te desanimes si los resultados tardan en llegar: la paciencia es tu mayor fortaleza hoy. Tómate el tiempo para observar, respirar profundamente y aceptar el ritmo natural de los acontecimientos. La tranquilidad interior que cultives te permitirá mantener la serenidad frente a los desafíos, y será la clave para atraer el éxito y las buenas oportunidades en el momento perfecto. Recuerda que todo llega a su debido tiempo, y que la perseverancia siempre termina dando frutos.",
    "cards.daily.Creativite.name": "Creatividad",
    "cards.daily.Creativite.meaning":
      "Tu mente está especialmente fértil hoy. Deja que tus ideas fluyan libremente, incluso las más inesperadas, porque podrían transformarse en soluciones brillantes o en proyectos prometedores. La creatividad no es solo artística: también ilumina tus decisiones, relaciones y desafíos. Escucha tus inspiraciones profundas y atrévete a concretarlas con confianza. Al liberar esta energía creativa, abres la puerta a oportunidades inéditas que nutrirán tu crecimiento personal y profesional. No dudes en experimentar y seguir tu intuición, pues tu originalidad es tu mayor fuerza hoy.",
    "cards.daily.Amour.name": "Amor",
    "cards.daily.Amour.meaning":
      "La energía de hoy está dirigida al corazón. Expresa tu ternura y gratitud hacia tus seres queridos, porque un simple gesto puede tener un gran impacto. Si estás en pareja, fortalece tus lazos con atenciones sinceras y auténticas que nutran tu relación. Si estás soltero, ábrete a la posibilidad de nuevos encuentros: el amor podría manifestarse donde menos lo esperas. Escucha tus emociones y deja que tu corazón guíe tus acciones. Este día favorece los intercambios afectuosos y los momentos de complicidad, esenciales para tu equilibrio emocional.",
    "cards.daily.Courage.name": "Coraje",
    "cards.daily.Courage.meaning":
      "Hoy pueden presentarse desafíos, pero posees la fuerza y la resiliencia necesarias para superarlos. El coraje no significa ausencia de miedo, sino la capacidad de actuar a pesar de él. Al enfrentar tus obstáculos con determinación, ganarás confianza y madurez. Cada paso valiente que des fortalecerá tu camino y afirmará tu valor, aportando un profundo crecimiento personal.",
    "cards.daily.Intuition.name": "Intuición",
    "cards.daily.Intuition.meaning":
      "Tu voz interior está especialmente fuerte hoy. Confía en tus presentimientos, incluso si no siempre puedes explicarlos racionalmente. Ellos te guiarán hacia decisiones más alineadas con tus verdaderas necesidades y tu camino de vida. Tómate un momento de silencio para escuchar tus sentimientos, porque tu intuición tiene la respuesta a las preguntas que te haces ahora, y te apoyará en tus decisiones importantes.",
    "cards.daily.Gratitude.name": "Gratitud",
    "cards.daily.Gratitude.meaning":
      "Tómate un momento para apreciar profundamente lo que ya tienes. Reconocer tus bendiciones, incluso las más pequeñas, atrae aún más positividad a tu vida y abre la puerta a nuevas oportunidades. Cultivar la gratitud hoy te ayudará a sentir más paz interior y a fortalecer tus vínculos con los demás.",
    "cards.daily.Communication.name": "Comunicación",
    "cards.daily.Communication.meaning":
      "Exprésate con claridad y benevolencia hoy. Tus palabras tienen el poder de calmar tensiones, inspirar a quienes te rodean y fortalecer los vínculos importantes en tu vida. Una comunicación sincera y respetuosa abre el camino a una mejor comprensión mutua y a intercambios profundamente enriquecedores.",
    "cards.daily.Equilibre.name": "Equilibrio",
    "cards.daily.Equilibre.meaning":
      "Hoy, encuentra el equilibrio entre lo que das a los demás y lo que necesitas para ti mismo. Es importante que no te olvides de ti en nombre de tus responsabilidades. Cuidarte también significa cuidar tu energía y tu bienestar interior. Al cultivar esta armonía, avanzarás más alineado y sereno en tu camino.",
    "cards.daily.Confiance.name": "Confianza",
    "cards.daily.Confiance.meaning":
      "Hoy cree plenamente en tus capacidades y avanza con una energía segura. La confianza en ti mismo es una fuerza interior valiosa que te hace más fuerte, más claro en tus decisiones y más alineado con tu verdad. Aunque surjan dudas, recuerda que cada paso dado con fe te acerca a tus verdaderos éxitos.",
    "cards.daily.Lacher-prise.name": "Soltar",
    "cards.daily.Lacher-prise.meaning":
      "Hoy libérate de los pesos del pasado y de preocupaciones que ya no tienen lugar. Lo que no puedes controlar no merece drenar tu energía. Al aceptar soltar, abres el camino a más paz interior y claridad. Te sentirás más ligero, más centrado y listo para recibir lo que venga con confianza.",
    "cards.daily.Joie.name": "Alegría",
    "cards.daily.Joie.meaning":
      "Hoy abre tu corazón a la alegría simple de los pequeños momentos: una sonrisa, un gesto sincero, un pensamiento luminoso. Incluso en medio de obligaciones, esta energía positiva puede transformar tu estado de ánimo. Al cultivar la alegría, te vuelves más radiante, más presente y atraes naturalmente experiencias que nutren tu bienestar.",
    "cards.daily.Sagesse.name": "Sabiduría",
    "cards.daily.Sagesse.meaning":
      "Hoy ralentiza y tómate un momento para reflexionar antes de actuar. Tu sabiduría interior es una aliada valiosa: te guía, protege e ilumina en tus decisiones. Al conectarte con esa voz calmada y lúcida, te volverás más anclado, más claro en tus elecciones y capaz de ver más allá de las apariencias.",
    "cards.daily.Transformation.name": "Transformación",
    "cards.daily.Transformation.meaning":
      "Hoy acoge los cambios que se presentan, aunque al principio parezcan desconcertantes. Estas transformaciones no están ahí por casualidad: te impulsan a crecer, evolucionar y acercarte a la mejor versión de ti mismo. Al abrazar este movimiento, te volverás más alineado, más confiado y listo para dar un nuevo paso.",
    "cards.daily.Abondance.name": "Abundancia",
    "cards.daily.Abondance.meaning":
      "Recuerda que ya posees todos los recursos necesarios para tener éxito. La abundancia se manifiesta verdaderamente cuando crees plenamente en tu potencial y te abres a las oportunidades que llegan. Confía en tus capacidades, porque tienes en ti la fuerza para atraer todo lo que necesitas para prosperar hoy y mañana.",
    "cards.daily.Paix.name": "Paz",
    "cards.daily.Paix.meaning":
      "Cultiva la paz interior liberando las tensiones y conflictos que te rodean. La serenidad que encontrarás te traerá claridad mental y la armonía necesaria para avanzar sereno hoy.",
    "cards.daily.Force.name": "Fuerza",
    "cards.daily.Force.meaning":
      "Extrae de lo más profundo de tu fuerza interior, es mucho mayor de lo que imaginas. Te sostiene en los desafíos, te aporta coraje y resiliencia, y te ayuda a avanzar con confianza a pesar de los obstáculos.",
    "cards.daily.Pardon.name": "Perdón",
    "cards.daily.Pardon.meaning":
      "Ofrece perdón, tanto a ti mismo como a los demás. Este poderoso gesto libera tu corazón de los pesos del pasado y abre el camino a una verdadera sanación interior, permitiéndote avanzar más ligero y en paz.",
    "cards.daily.Espoir.name": "Esperanza",
    "cards.daily.Espoir.meaning":
      "Mantén la esperanza, incluso en los momentos difíciles. La luz siempre regresa, como el sol después de la noche más oscura. Este mensaje te invita a cultivar la paciencia y la confianza en un futuro mejor, porque cada prueba prepara un renacer prometedor para ti, que crecerá y florecerá en su momento.",
    "cards.daily.Action.name": "Acción",
    "cards.daily.Action.meaning":
      "Es momento de pasar a la acción. No dejes más tus proyectos en espera, hoy las cosas avanzan. Atrévete a dar el paso con confianza, porque cada iniciativa que tomes te acercará a tus objetivos y abrirá nuevas puertas en tu vida.",
    "cards.daily.Compassion.name": "Compasión",
    "cards.daily.Compassion.meaning":
      "Muestra compasión hacia ti mismo y hacia los demás. La bondad suaviza los corazones y fortalece los lazos. Al cultivar esta dulzura, creas un espacio de sanación y comprensión, esencial para ti y para quienes te rodean. Esta carta te invita a abrir tu corazón plenamente hoy, a escuchar sin juzgar y a ofrecer tu apoyo con empatía. Al actuar así, contribuyes a un clima armonioso y haces crecer tu propia paz interior.",
    "cards.daily.Inspiration.name": "Inspiración",
    "cards.daily.Inspiration.meaning":
      "Abre bien los ojos y tu mente a todo lo que te rodea. La inspiración se esconde en los detalles cotidianos, lista para nutrir tu creatividad y despertar nuevas ideas. Este mensaje te anima a mantenerte curioso y receptivo, a acoger las señales y chispas que pueden iluminar tu camino. Tómate tiempo para escuchar esos impulsos; te guiarán hacia soluciones innovadoras y momentos de alegría renovada.",
    "cards.daily.Determination.name": "Determinación",
    "cards.daily.Determination.meaning":
      "Tu perseverancia y voluntad son tus mejores aliados hoy. Aunque encuentres obstáculos en tu camino, sigue avanzando con confianza y determinación. Tu tenacidad te permitirá superar las dificultades y abrirá el camino hacia el éxito duradero. Este mensaje te invita a no rendirte, pues cada esfuerzo cuenta y te acerca a tus objetivos más queridos.",
    "cards.daily.Aventure.name": "Aventura",
    "cards.daily.Aventure.meaning":
      "Sal de tu rutina y atrévete a descubrir nuevas experiencias hoy. Ya sean grandes o pequeñas, esta aventura nutrirá tu espíritu y calentará tu corazón. Tómate el tiempo para explorar, maravillarte y dejarte sorprender. Este mensaje te anima a abrir tu horizonte y recibir el cambio con entusiasmo.",
    "cards.daily.Reconciliation.name": "Reconciliación",
    "cards.daily.Reconciliation.meaning":
      "Es tiempo de sanar tus heridas internas y hacer las paces con tu pasado. La reconciliación te trae libertad y ligereza, permitiéndote avanzar más serenamente en tu camino. Acoge este proceso con bondad y déjate transformar por esta sanación interior.",
    "cards.daily.Innovation.name": "Innovación",
    "cards.daily.Innovation.meaning":
      "Hoy deja que tus ideas originales cobren vida. Tu capacidad para pensar diferente es una verdadera riqueza que puede transformar tus proyectos e inspirar a quienes te rodean. No dudes en salir de los caminos tradicionales y en expresar tu creatividad única para abrir nuevas vías.",
    "cards.daily.Connexion.name": "Conexión",
    "cards.daily.Connexion.meaning":
      "Fortalece tus lazos con los demás, pero también contigo mismo. Las conexiones auténticas nutren tu alma, aportan apoyo y consuelo, y te recuerdan que nunca estás solo. Tómate tiempo para escuchar y compartir sinceramente; eso te traerá equilibrio y realización.",
    "cards.daily.Prosperite.name": "Prosperidad",
    "cards.daily.Prosperite.meaning":
      "La prosperidad llega a tu vida de diferentes formas: materiales, emocionales o espirituales. Acoge esta abundancia con gratitud y confianza. Ábrete a recibir y compartir lo que la vida te ofrece hoy para fortalecer tu riqueza interior y exterior.",
    "cards.daily.Authenticite.name": "Autenticidad",
    "cards.daily.Authenticite.meaning":
      "Permanece fiel a tus valores y a tu verdadera naturaleza. Tu autenticidad atrae a las personas correctas y te guía hacia decisiones en armonía con tu corazón. No temas mostrar quién eres realmente, porque en esa sinceridad encontrarás tu fuerza y paz interior.",
    "cards.daily.Revelation.name": "Revelación",
    "cards.daily.Revelation.meaning":
      "Una verdad oculta o una importante toma de conciencia pronto se manifestará. Mantente atento y con la mente abierta para acoger esta revelación. Prepárate para recibir esta nueva luz, pues podrá transformar tu visión y ayudarte a avanzar con más claridad.",
    "cards.daily.Protection.name": "Protección",
    "cards.daily.Protection.meaning":
      "Estás rodeado de benevolencia y fuerzas protectoras que velan por ti. Confía en esta protección, te acompaña en tus elecciones y pasos. No temas hoy, deja que esta energía tranquilizadora te calme y te guíe.",
    "cards.daily.Renaissance.name": "Renacimiento",
    "cards.daily.Renaissance.meaning":
      "Un nuevo ciclo se abre ante ti, invitándote a liberarte de todo lo que pertenece al pasado. Acoge este renacimiento como una oportunidad preciosa para reinventarte, crecer y renovarte. Atrévete a pasar página para abrazar plenamente este nuevo comienzo.",
    "cards.daily.Clarte.name": "Claridad",
    "cards.daily.Clarte.meaning":
      "Las respuestas que buscas pronto se revelarán. Toma distancia, observa atentamente las señales que te rodean y deja que la niebla se disipe poco a poco. Esta nueva claridad te ayudará a tomar decisiones informadas y alineadas con tu verdad interior. Consejo: tómate un momento tranquilo hoy para reflexionar con calma antes de actuar, eso te permitirá ver la situación con mayor claridad.",
    "cards.daily.Passion.name": "Pasión",
    "cards.daily.Passion.meaning":
      "Sigue lo que realmente te apasiona, pues tu entusiasmo es una energía poderosa que puede transformar tu vida. Alimenta esta llama interior, dale espacio para crecer y deja que guíe tus elecciones hacia lo que te hace sentir vivo. Consejo: dedica tiempo a lo que enciende tu corazón hoy, incluso en pequeñas acciones, eso fortalecerá tu motivación y tu alegría de vivir.",
    "cards.daily.Equite.name": "Equidad",
    "cards.daily.Equite.meaning":
      "La justicia y el equilibrio pronto se restablecerán en tus asuntos. Mantente íntegro y paciente: tus acciones justas darán frutos y traerán armonía a tu alrededor. Consejo: mantén la cabeza fría ante los desafíos y sigue actuando con honestidad y respeto, aunque los resultados tarden en llegar.",
    "cards.daily.Harmonie.name": "Armonía",
    "cards.daily.Harmonie.meaning":
      "Todos los elementos de tu vida tienden a alinearse hoy. Aprovecha este período para consolidar lo que funciona bien e instaurar rutinas que nutran tu bienestar físico, mental y emocional. Consejo: tómate tiempo para escucharte y equilibrar tus diferentes áreas de vida para mantener esta hermosa armonía a largo plazo.",
    "cards.daily.Eveil.name": "Despertar",
    "cards.daily.Eveil.meaning":
      "Tu conciencia se expande hoy, abriendo la puerta a nuevas perspectivas y a una mejor comprensión de ti mismo y del mundo que te rodea. Acoge estas tomas de conciencia con apertura y curiosidad: pueden transformar tu mirada sobre la vida y guiar tus próximos pasos hacia un camino más auténtico. Consejo: tómate tiempo para reflexionar sobre lo que significan estas nuevas revelaciones para ti y atrévete a actuar en concordancia con esta nueva claridad.",
    "cards.daily.Generosite.name": "Generosidad",
    "cards.daily.Generosite.meaning":
      "Da sin contar hoy, no por deber, sino desde el corazón. Este gesto sincero y desinteresado creará un círculo de reciprocidad a tu alrededor y atraerá experiencias beneficiosas que enriquecerán tu vida. Consejo: mantente atento a las necesidades de los demás, cuidando también de no olvidarte de ti mismo en este impulso generoso.",
    "cards.daily.Perseverance.name": "Perseverancia",
    "cards.daily.Perseverance.meaning":
      "No te rindas ahora: tu determinación está a punto de dar frutos. Continúa con constancia y disciplina, la victoria está más cerca de lo que piensas. Consejo: mantén el rumbo aunque el camino parezca largo, cada esfuerzo te acerca a tu objetivo.",
    "cards.daily.Simplicite.name": "Simplicidad",
    "cards.daily.Simplicite.meaning":
      "La solución suele ser más simple de lo que imaginas. Ve a lo esencial, elimina lo superfluo y encontrarás respuestas claras y efectivas. Consejo: simplifica tu vida hoy para concentrarte en lo que realmente importa.",
    "cards.daily.Legerete.name": "Ligereza",
    "cards.daily.Legerete.meaning":
      "Adopta una actitud ligera hoy: ríe, juega y libérate de los pesos innecesarios. Esta ligereza abrirá el camino al placer y a la creatividad. Consejo: permítete divertirte y tomar distancia para avanzar mejor.",
    "cards.daily.Ancrage.name": "Anclaje",
    "cards.daily.Ancrage.meaning":
      "Vuelve a tus raíces para encontrar estabilidad y fuerza. Prácticas simples como la respiración, caminar o rutinas regulares ayudarán a reencontrarte contigo mismo y avanzar con serenidad. Consejo: tómate tiempo para conectarte contigo y con el momento presente.",
    "cards.daily.Mystere.name": "Misterio",
    "cards.daily.Mystere.meaning":
      "Acepta lo que aún no puedes comprender. El misterio forma parte de la magia de la vida: al dejar espacio a lo desconocido, abrirás la puerta a revelaciones que llegarán en el momento adecuado. Consejo: confía en el tiempo y mantente abierto a las sorpresas que el universo envía.",
    "cards.daily.Celebration.name": "Celebración",
    "cards.daily.Celebration.meaning":
      "Es momento de celebrar tus éxitos, incluso los más pequeños. Reconocer los logros alimenta la confianza y atrae más motivos para alegrarte. Consejo: tómate tiempo para felicitarte y comparte la alegría con quienes te rodean.",
    "cards.daily.Guidance.name": "Guía",
    "cards.daily.Guidance.meaning":
      "Hoy, una ayuda inesperada o una señal sutil puede aparecer en el camino. Mantente atento a las pequeñas sincronicidades, pues contienen mensajes importantes. Estas señales guiarán hacia decisiones más claras y beneficiosas. Acoge estas indicaciones con confianza; abren la puerta a una nueva y favorable dirección.",
    "cards.daily.Purification.name": "Purificación",
    "cards.daily.Purification.meaning":
      "Es momento ideal para limpiar a tu alrededor y dentro de ti. Al deshacerte de lo superfluo, invitas renovación. Esta purificación crea un ambiente propicio para transformaciones positivas, liberando energía para recibir nuevas oportunidades con claridad y ligereza.",
    "cards.daily.Vision.name": "Visión",
    "cards.daily.Vision.meaning":
      "La visión del futuro se aclara hoy. Identifica la dirección que atrae y avanza con confianza hacia ese horizonte recién revelado. Mantén la mente abierta a las posibilidades y déjate guiar por esta claridad interior hacia objetivos auténticos.",

    // Card Names and Meanings - Tarot
    "cards.tarot.LeFou.name": "El Loco",
    "cards.tarot.LeFou.meaning": "Nuevos comienzos, espontaneidad, libertad",
    "cards.tarot.LeFou.meaning.var1":
      "El Loco representa un nuevo comienzo en tu vida. Es el momento de confiar en tu intuición y lanzarte a lo desconocido sin tener todas las respuestas. Esta carta te invita a salir de tu zona de confort. Concretamente, esto puede significar postularte a un trabajo que te intimida, iniciar una conversación importante que has estado posponiendo, o comenzar ese proyecto que llevas meses planificando. El Loco te dice: no esperes a estar completamente preparado, porque ese momento nunca llegará. Empieza ahora. Sin embargo, ten cuidado de no confundir espontaneidad con imprudencia. Infórmate lo mínimo necesario, pero no dejes que el miedo te paralice.",
    "cards.tarot.LeFou.meaning.var2":
      "Esta carta anuncia un soplo de aire fresco y novedad en tu vida. Estás en un punto de inflexión donde la inocencia y la curiosidad pueden ser tus mejores aliadas. El Loco te anima a mirar tu situación con ojos nuevos, como si la descubrieras por primera vez. En tu día a día, pregúntate en qué aspectos te sientes atrapado por hábitos o miedos. Es ahí donde puede actuar la energía del Loco. Tal vez debas atreverte a probar un enfoque diferente en tus relaciones, intentar un nuevo método en el trabajo, o simplemente aceptar que no puedes controlarlo todo. Da ese primer paso con ligereza. La trampa sería lanzarte sin ninguna preparación: sé espontáneo, pero no ingenuo.",
    "cards.tarot.LeFou.meaning.var3":
      "El Loco te trae un mensaje de libertad y renovación. Es el comienzo de un ciclo en el que puedes reinventarte. Esta carta te pide que tengas el coraje de la inocencia, esa capacidad de creer que las cosas son posibles a pesar de los obstáculos aparentes. En lo práctico, identifica qué te está reteniendo en este momento. ¿Es el miedo al juicio? ¿El temor al fracaso? El Loco te aconseja avanzar a pesar de esas dudas. Comienza poco a poco si es necesario: una llamada telefónica, una inscripción, una conversación. Lo importante es moverse. Sin embargo, mantente alerta: el optimismo del Loco no debe hacerte ignorar señales de advertencia reales. Escucha también tu prudencia.",
    "cards.tarot.LeBateleur.name": "El Mago",
    "cards.tarot.LeBateleur.meaning":
      "Creatividad, comunicación, nuevo proyecto",
    "cards.tarot.LeBateleur.meaning.var1":
      "El Mago te trae un soplo de novedad y entusiasmo. Estás al comienzo de una nueva etapa, llena de promesas e impulso creativo. Todos los recursos ya están en ti: confianza, ideas, energía. Esta carta te invita a atreverte, a actuar, incluso si el camino aún no está del todo claro. Es el momento ideal para iniciar un proyecto, expresar una idea o simplemente creer en tu capacidad de convertir el potencial en realidad. En el amor o en el trabajo, este impulso puede cambiarlo todo.",
    "cards.tarot.LeBateleur.meaning.var2":
      "El Mago marca el inicio de una aventura personal o profesional. Tomas conciencia de tu poder de actuar y elegir. Esta carta simboliza la juventud de espíritu, la creatividad y el deseo de construir sobre bases sólidas. Si estás pasando por un momento de duda, El Mago te recuerda que el primer paso suele ser el más importante. Un encuentro inspirador, una oportunidad inesperada o una idea brillante podrían mostrarte el camino. Mantente abierto y curioso.",
    "cards.tarot.LeBateleur.meaning.var3":
      "El Mago es símbolo de un nuevo comienzo audaz. Te anima a conectar con tu energía vital y a pasar a la acción con confianza. Lo que emprendas ahora tiene el potencial de durar, siempre que pongas voluntad y corazón. Esta carta aparece a menudo cuando estás listo para retomar el control de tu vida. Una toma de conciencia te brinda la oportunidad de alinear tus decisiones con tus valores profundos. Es el momento de construir con claridad y entusiasmo.",
    "cards.tarot.LaPapesse.name": "La Sacerdotisa",
    "cards.tarot.LaPapesse.meaning": "Intuición, misterio, conocimiento oculto",
    "cards.tarot.LaPapesse.meaning.var1":
      "La Papisa te invita a detenerte y escuchar. Una transformación sutil pero profunda está en marcha. Te recuerda que las respuestas no están fuera, sino dentro de ti. Gracias a tu intuición, avanzas hacia un cambio justo y alineado. Es momento de observar, reflexionar y reconectar con lo que realmente sientes. La acción vendrá después — por ahora, deja que te guíe tu sabiduría interior.",
    "cards.tarot.LaPapesse.meaning.var2":
      "La Papisa aparece cuando estás listo para comprender verdades más profundas. Habla de madurez interior y de un camino que se revela en el silencio y la introspección. Tus decisiones no se tomarán a la ligera, nacerán de un lugar de claridad y coherencia. Esta carta también puede señalar el inicio de un vínculo de confianza o el fortalecimiento de una relación ya existente. Avanzas con serenidad, protegido por una fuerza suave y ancestral.",
    "cards.tarot.LaPapesse.meaning.var3":
      "La Papisa es la guardiana de los misterios y del conocimiento oculto. Te anima a confiar en lo que intuyes, incluso si desafía la lógica. Ahora no necesitas actuar, sino comprender, sentir y volver a tu centro. Tus decisiones futuras serán más poderosas si están arraigadas en tu verdad interior. La Papisa te invita a sumergirte en tus profundidades para renacer con claridad y sabiduría.",
    "cards.tarot.LImperatrice.name": "La Emperatriz",
    "cards.tarot.LImperatrice.meaning":
      "Fertilidad, abundancia, creatividad femenina",
    "cards.tarot.LImperatrice.meaning.var1":
      "La Emperatriz te invita a recuperar la confianza en tu capacidad para crear, comprender y guiar con inteligencia. Ella simboliza una feminidad activa, lúcida y generosa. Estás list{genderSuffix} para dar vida a algo concreto: una idea, un proyecto o una relación. Gracias a tu sentido analítico y a tu intuición aguda, puedes sentar las bases sólidas para un futuro floreciente. Es el momento ideal para actuar con equilibrio: con conciencia, sin prisa, pero con determinación.",
    "cards.tarot.LImperatrice.meaning.var2":
      "La Emperatriz te reconecta con tu poder creativo. Su energía te impulsa a estructurar tus ideas y transformarlas en realidad. Habla de lucidez, autonomía y belleza en la acción. No actúas con caos: construyes con inteligencia, apoyándote en tu experiencia. Lo que concibes ahora tiene el potencial de crecer y desarrollarse plenamente. Es una invitación a asumir tu autoridad natural, sin arrogancia, pero con seguridad.",
    "cards.tarot.LImperatrice.meaning.var3":
      "La Emperatriz vela con sabiduría por tu evolución. Te recuerda que la verdadera fuerza reside en la claridad mental y el dominio propio. Tu poder reside en tu capacidad para tomar decisiones acertadas, mostrar discernimiento y afirmarte sin dominar. Esta carta te anima a expresar tu inteligencia, nutrir tu creatividad y guiar a otros sin perderte. El futuro se escribe con consciencia. Tú tienes las llaves.",
    "cards.tarot.LEmpereur.name": "El Emperador",
    "cards.tarot.LEmpereur.meaning": "Autoridad, estructura, liderazgo",
    "cards.tarot.LEmpereur.meaning.var1":
      "El Emperador te aporta autoridad, estructura y liderazgo. Estás listo{genderSuffix} para tomar el control y construir una base estable. Esta carta te anima a actuar con confianza y responsabilidad. Tus decisiones tendrán un impacto duradero, así que lidera con sabiduría y fuerza.",
    "cards.tarot.LEmpereur.meaning.var2":
      "Con el Emperador, el orden y la disciplina guían tu camino. Tienes la capacidad de organizar tu entorno y afirmar tu poder con sabiduría. Da un paso adelante y asume tu papel de líder. La estructura y la claridad abrirán puertas a nuevas oportunidades.",
    "cards.tarot.LEmpereur.meaning.var3":
      "El Emperador simboliza una presencia sólida y fiable. Estás listo para ofrecer guía y apoyo a quienes te rodean. Usa tu experiencia y autoridad para crear estabilidad y crecimiento. Encuentra el equilibrio entre firmeza y justicia para obtener los mejores resultados.",
    "cards.tarot.LePape.name": "El Hierofante",
    "cards.tarot.LePape.meaning": "Sabiduría tradicional, guía espiritual",
    "cards.tarot.LePape.meaning.var1":
      "El Papa te invita a conectar con tu sabiduría interior y a buscar respuestas en la tradición y la experiencia. Estás listo para guiar o dejarte guiar con amabilidad. Esta carta habla de transmisión, consejos sabios y de un avance basado en valores profundos. Puede surgir una decisión importante: basa tu elección en lo que es correcto, no en la impulsividad.",
    "cards.tarot.LePape.meaning.var2":
      "El Papa representa un apoyo sólido en un momento en el que buscas estabilidad y verdad. Te anima a escuchar las enseñanzas del pasado para comprender mejor el presente. Estás listo para transmitir o recibir un conocimiento esencial. Esta carta también puede indicar la presencia de un mentor o figura espiritual que te ayuda a avanzar.",
    "cards.tarot.LePape.meaning.var3":
      "Símbolo de sabiduría y tradición, el Papa te invita a tomar distancia y reflexionar con claridad. Estás en una fase donde la intuición y la razón deben trabajar juntas. Estás listo para encarnar tus valores, mostrar paciencia y construir bases duraderas. Es momento de confiar en los procesos lentos pero poderosos del crecimiento.",
    "cards.tarot.LAmoureux.name": "Los Enamorados",
    "cards.tarot.LAmoureux.meaning": "Decisiones, relaciones, armonía",
    "cards.tarot.LAmoureux.meaning.var1":
      "Los Enamorados te invitan a tomar una decisión importante, a menudo relacionada con los sentimientos, las relaciones o tus valores más profundos. Estás listo para seguir lo que resuena contigo, incluso si el camino aún no está del todo claro. Esta carta te anima a escuchar tu corazón, equilibrar la pasión con la razón y comprometerte con conciencia. La armonía llegará cuando asumas tu elección plenamente.",
    "cards.tarot.LAmoureux.meaning.var2":
      "Los Enamorados simbolizan un momento de conexión profunda, contigo mismo(a) o con otra persona. Estás en una etapa donde las emociones ocupan espacio y necesitan ser aclaradas. Estás listo para abrir tu corazón y vivir una relación sincera, o hacer las paces con una parte de ti. Esta carta te invita a alinear tus deseos con tus acciones.",
    "cards.tarot.LAmoureux.meaning.var3":
      "Ante una decisión delicada, Los Enamorados te recuerdan que el amor, en todas sus formas, requiere valentía. Estás list{genderSuffix} para elegir en función de lo que realmente te nutre. No se trata de complacer a los demás, sino de ser fiel a lo que hace vibrar tu alma. El alineamiento personal es la clave de la verdadera armonía.",
    "cards.tarot.LeChariot.name": "El Carro",
    "cards.tarot.LeChariot.meaning":
      "Victoria, fuerza de voluntad, determinación",
    "cards.tarot.LeChariot.meaning.var1":
      "El Carro te anima a tomar las riendas de tu vida con determinación. Estás list{genderSuffix} para avanzar, superar obstáculos y afirmar tu voluntad. Esta carta simboliza la victoria mediante el dominio propio, la claridad de objetivos y el valor de seguir adelante. Nada puede detenerte si te mantienes concentrad{genderSuffix} en tu dirección.",
    "cards.tarot.LeChariot.meaning.var2":
      "El Carro anuncia un progreso rápido y controlado. Estás en una dinámica de movimiento, conquista y ambición sana. Estás list{genderSuffix} para dirigir con confianza sin perder tu equilibrio interior. Esta carta te invita a canalizar fuerzas opuestas, mantenerte centrad{genderSuffix}, y avanzar con confianza hacia lo que realmente deseas.",
    "cards.tarot.LeChariot.meaning.var3":
      "Con El Carro, entras en una fase de éxito activo. Estás list{genderSuffix} para actuar, asumir desafíos y salir victorios{genderSuffix} gracias a tu disciplina y espíritu de decisión. Es una carta de triunfo sobre dudas y vacilaciones. Avanza con fe en ti mism{genderSuffix}, el camino se abre ante ti.",
    "cards.tarot.LaJustice.name": "La Justicia",
    "cards.tarot.LaJustice.meaning": "Equilibrio, verdad, consecuencias",
    "cards.tarot.LaJustice.meaning.var1":
      "La Justicia te llama a actuar con discernimiento. Estás list{genderSuffix} para ver las cosas con claridad, afrontar las consecuencias de tus actos y tomar decisiones justas. Esta carta te impulsa a buscar equilibrio interior y actuar en coherencia con tus valores. La verdad es una aliada poderosa: al abrazarla, ganas claridad y fortaleza.",
    "cards.tarot.LaJustice.meaning.var2":
      "Con La Justicia, entras en un período de regulación, responsabilidad y reajuste. Estás list{genderSuffix} para tomar decisiones informadas, aunque requieran valor e imparcialidad. Esta carta indica que ha llegado el momento de poner orden, reparar lo que deba corregirse o tomar una decisión justa. Avanzas hacia una mayor madurez.",
    "cards.tarot.LaJustice.meaning.var3":
      "La Justicia te guía hacia la honestidad y la equidad. Te invita a observar tu situación sin ilusiones y confiar en tu juicio interior. Estás list{genderSuffix} para restablecer un equilibrio roto, decir lo que deba decirse y actuar como un(a) adult{genderSuffix} responsable. Esta carta te anima a distinguir lo que es justo para ti de lo que ya no lo es.",
    "cards.tarot.LHermite.name": "El Ermitaño",
    "cards.tarot.LHermite.meaning": "Introspección, sabiduría interior, guía",
    "cards.tarot.LHermite.meaning.var1":
      "El Ermitaño te invita a un profundo viaje interior. Estás list{genderSuffix} para retirarte del ruido exterior y buscar la verdad en tu interior. Esta soledad elegida te permite conectar con tu sabiduría y comprender mejor tu camino.",
    "cards.tarot.LHermite.meaning.var2":
      "Con El Ermitaño entras en una fase de reflexión y guía interior. Estás list{genderSuffix} para escuchar tu voz interior, incluso si te lleva por caminos menos transitados. Esta carta te anima a tener paciencia y discernimiento.",
    "cards.tarot.LHermite.meaning.var3":
      "El Ermitaño te guía hacia la introspección y la luz interior. Estás list{genderSuffix} para alejarte de las influencias externas y así escuchar mejor tu profunda sabiduría. Esta carta te insta a avanzar con cautela pero con una certeza interior fortalecida.",
    "cards.tarot.LaRouedeFortune.name": "La Rueda de la Fortuna",
    "cards.tarot.LaRouedeFortune.meaning": "Cambio, ciclos, destino",
    "cards.tarot.LaRouedeFortune.meaning.var1":
      "La Rueda de la Fortuna te invita a aceptar el cambio como una fuerza natural. Estás list{genderSuffix} para seguir los ciclos de la vida, incluso cuando te llevan hacia lo desconocido. Esta carta te recuerda que el destino está en movimiento y que adaptarte es clave para avanzar.",
    "cards.tarot.LaRouedeFortune.meaning.var2":
      "Con la Rueda de la Fortuna, comienza una nueva etapa. Estás preparad{genderSuffix} para pasar página, acoger los giros del destino y aprender de las experiencias pasadas. Esta carta simboliza la transformación y la evolución constante.",
    "cards.tarot.LaRouedeFortune.meaning.var3":
      "La Rueda de la Fortuna te guía a través de los altibajos de la vida con sabiduría. Estás list{genderSuffix} para comprender que todo ciclo tiene un fin y un comienzo. Esta carta te anima a mantenerte abiert{genderSuffix} al flujo de la vida, con confianza y armonía en tu camino.",
    "cards.tarot.LaForce.name": "La Fuerza",
    "cards.tarot.LaForce.meaning": "Valor, paciencia, dominio interior",
    "cards.tarot.LaForce.meaning.var1":
      "La Fuerza te recuerda que tu verdadero poder reside en la ternura y la paciencia. Estás list{genderSuffix} para canalizar tu energía, dominar impulsos y enfrentar desafíos con calma y determinación. Esta carta habla de dominio interior y valentía silenciosa. Prefiere la constancia antes que la prisa; te llevará más lejos que la fuerza bruta.",
    "cards.tarot.LaForce.meaning.var2":
      "Con La Fuerza estás invitad{genderSuffix} a extraer tu fortaleza moral para superar obstáculos. Estás list{genderSuffix} para enfrentar pruebas sin dejarte desbordar, confiando en ti y en tus capacidades. Esta carta fomenta la resiliencia y el equilibrio. Respira antes de actuar; la serenidad es tu mejor aliada.",
    "cards.tarot.LaForce.meaning.var3":
      "La Fuerza simboliza el coraje interior y la capacidad de mantenerte alinead{genderSuffix} ante la tensión. Estás list{genderSuffix} para mostrar temple, dominar tus miedos y convertir la adversidad en crecimiento personal. Esta carta te insta a confiar en tu estabilidad interior. Mantén la cabeza erguida y avanza sin temor; tu paz interior abrirá las puertas correctas.",
    "cards.tarot.LePendu.name": "El Colgado",
    "cards.tarot.LePendu.meaning": "Sacrificio, nueva perspectiva, soltar",
    "cards.tarot.LePendu.meaning.var1":
      "El Colgado te invita a cambiar tu perspectiva. Estás list{genderSuffix} para soltar viejos patrones y ver tu situación desde otro ángulo, incluso si eso implica un sacrificio temporal. Esta carta habla de aceptación y paciencia. A veces, soltar es la manera más directa de recuperar la libertad.",
    "cards.tarot.LePendu.meaning.var2":
      "Con El Colgado, entras en una fase de pausa necesaria. Estás list{genderSuffix} para detener la acción y comprender mejor lo que ocurre en lo profundo. Este momento de espera no es debilidad, sino una transición hacia más claridad. Recibe esta pausa como un espacio fértil para tu transformación.",
    "cards.tarot.LePendu.meaning.var3":
      "El Colgado simboliza un momento en el que soltar se vuelve esencial. Estás list{genderSuffix} para dejar atrás lo que ya no favorece tu crecimiento, aunque requiera coraje y humildad. Esta carta te guía hacia un despertar a través del desapego. Abandona la resistencia: el vacío puede abrir paso a algo nuevo.",
    "cards.tarot.LArcanesansnom.name": "La Muerte",
    "cards.tarot.LArcanesansnom.meaning":
      "Transformación, finales, renacimiento",
    "cards.tarot.LArcanesansnom.meaning.var1":
      "No te dejes engañar por su nombre: La Muerte simboliza transformación profunda, no un final trágico. Estás list{genderSuffix} para dejar atrás una fase antigua de tu vida y abrir paso a un renacer más alineado con quién has llegado a ser{genderSuffix}. Este Arcano sin nombre te libera de lo que te pesaba para que puedas avanzar más ligero en tu metamorfosis.",
    "cards.tarot.LArcanesansnom.meaning.var2":
      "La Muerte no es una carta negativa, sino una invitación al cambio radical. Estás list{genderSuffix} para pasar una página importante, cerrar un capítulo que ya no resuena con tu presente. Este tránsito puede sentirse incómodo, pero porta renacimiento y nuevas oportunidades. Acepta dejar ir lo que se aferra al pasado para recibir mejor lo que está por venir.",
    "cards.tarot.LArcanesansnom.meaning.var3":
      "Este Arcano sin nombre marca un final necesario para una transformación duradera. Lejos de lo que parece, esta carta habla más de vida que de muerte: evoca una limpieza interior. Estás list{genderSuffix} para desprenderte de lo que ya no sirve, hacer el duelo de ilusiones o hábitos obsoletos. Lo que liberas hoy prepara el crecimiento de mañana.",
    "cards.tarot.Temperance.name": "La Templanza",
    "cards.tarot.Temperance.meaning": "Moderación, equilibrio, sanación",
    "cards.tarot.Temperance.meaning.var1":
      "La Templanza te invita a la suavidad y la armonía. Estás list{genderSuffix} para calmar tus emociones, evitar los extremos y encontrar el punto medio. Esta carta habla de sanación interior, un tiempo de integración donde todo se alinea suavemente. Practica la paciencia: las cosas se asientan cuando respetas tu propio ritmo.",
    "cards.tarot.Temperance.meaning.var2":
      "Con La Templanza se abre ante ti una fase de paz. Estás list{genderSuffix} para permitir que los opuestos dialoguen, para escuchar tanto como expresarte, para construir un puente entre partes de ti que parecían en conflicto. Esta carta evoca la alquimia del corazón y de la mente. Date permiso para ralentizar y alinearte mejor.",
    "cards.tarot.Temperance.meaning.var3":
      "La Templanza simboliza un equilibrio recobrado, una paz interior que se instala con madurez. Estás list{genderSuffix} para dejar fluir lo que debe fluir, sin forzar ni retener. Es momento de reconectarte con tu centro, con esa estabilidad tranquila que te sostiene. Cuida ese equilibrio delicado, es tu fuerza.",
    "cards.tarot.LeDiable.name": "El Diablo",
    "cards.tarot.LeDiable.meaning": "Dependencias, ilusiones, materialismo",
    "cards.tarot.LeDiable.meaning.var1":
      "El Diablo te enfrenta a tus cadenas invisibles. Estás preparad{genderSuffix} para reconocer las dependencias que te limitan, ya sean materiales, emocionales o mentales. Esta carta te invita a romper las ilusiones que te impiden ver la verdad y a recuperar tu poder interior. Atrévete a liberarte de lo que te ata.",
    "cards.tarot.LeDiable.meaning.var2":
      "Con El Diablo, te enfrentas a tus tentaciones y miedos profundos. Esta carta te anima a mirar más allá de las apariencias y a entender las raíces de tus comportamientos compulsivos. Al tomar conciencia, podrás empezar a deshacer los nudos que te retienen. Recuerda que la luz siempre atraviesa la oscuridad.",
    "cards.tarot.LeDiable.meaning.var3":
      "El Diablo te impulsa a examinar tu relación con lo material y los placeres inmediatos. Estás preparad{genderSuffix} para cuestionar tus valores y ver si ciertas ilusiones controlan tus decisiones. Esta carta te recuerda que la verdadera libertad proviene de la conciencia y el dominio propio. Busca transformar tus cadenas en fuerzas.",
    "cards.tarot.LaMaisonDieu.name": "La Torre",
    "cards.tarot.LaMaisonDieu.meaning": "Revelación repentina, cambio radical",
    "cards.tarot.LaMaisonDieu.meaning.var1":
      "La Torre te sacude de repente, revelando verdades ocultas. Estás preparad{genderSuffix} para abrazar este cambio radical, aunque resulte desconcertante. Esta carta te invita a aceptar la transformación necesaria para reconstruir sobre bases más sólidas. A veces, hay que dejar atrás lo viejo para renacer más fuerte.",
    "cards.tarot.LaMaisonDieu.meaning.var2":
      "Con La Torre, una revelación repentina altera tu realidad. Estás preparad{genderSuffix} para enfrentar la destrucción de creencias que ya no te sirven. Este momento de caos anuncia una liberación poderosa, permitiéndote liberarte de lo que te retiene. Mantén la fe, después de la tormenta llega la claridad.",
    "cards.tarot.LaMaisonDieu.meaning.var3":
      "La Torre te invita a aceptar las rupturas necesarias para tu evolución. Estás preparad{genderSuffix} para abandonar construcciones frágiles y abrir el camino a una profunda renovación. Esta carta recuerda que las caídas dolorosas suelen preparar los renacimientos más hermosos.",
    "cards.tarot.LEtoile.name": "La Estrella",
    "cards.tarot.LEtoile.meaning": "Esperanza, inspiración, guía divina",
    "cards.tarot.LEtoile.meaning.var1":
      "La Estrella te trae un soplo de esperanza e inspiración. Estás preparad{genderSuffix} para creer en un futuro mejor y seguir la guía divina que ilumina tu camino. No dudes en conectar con tu luz interior para avanzar con confianza.",
    "cards.tarot.LEtoile.meaning.var2":
      "Con La Estrella, se abre para ti un período de renovación espiritual. Estás preparad{genderSuffix} para recibir mensajes del universo y dejarte guiar por tu intuición. Mantente abiert{genderSuffix} y cultiva la confianza en ti mismo y en la vida.",
    "cards.tarot.LEtoile.meaning.var3":
      "La Estrella te invita a mantener la fe, incluso en momentos de incertidumbre. Estás preparad{genderSuffix} para dejarte inspirar y perseguir tus sueños con paciencia y serenidad. Tómate el tiempo para reconectar con lo que te nutre profundamente.",
    "cards.tarot.LaLune.name": "La Luna",
    "cards.tarot.LaLune.meaning": "Ilusiones, subconsciente, intuición",
    "cards.tarot.LaLune.meaning.var1":
      "La Luna te invita a explorar tu subconsciente y escuchar tu intuición. Estás preparad{genderSuffix} para aceptar que no todo es siempre claro y que las ilusiones pueden engañarte. Mantente atento a las señales sutiles que te guían en la oscuridad.",
    "cards.tarot.LaLune.meaning.var2":
      "Con La Luna, misterios profundos y emociones salen a la superficie. Estás preparad{genderSuffix} para sumergirte en ti mismo, aunque esto pueda traer dudas o miedos. No rechaces tus sentimientos, te ayudan a entenderte mejor.",
    "cards.tarot.LaLune.meaning.var3":
      "La Luna te anima a confiar en tu intuición a pesar de las incertidumbres e ilusiones que te rodean. Estás preparad{genderSuffix} para avanzar aceptando lo desconocido y liberarte de los miedos que te detienen. Sé paciente contigo mismo en este camino.",
    "cards.tarot.LeSoleil.name": "El Sol",
    "cards.tarot.LeSoleil.meaning": "Alegría, éxito, vitalidad",
    "cards.tarot.LeSoleil.meaning.var1":
      "El Sol te trae luz y energía positiva. Estás preparad{genderSuffix} para recibir la alegría y celebrar tus éxitos. Aprovecha esta vitalidad para avanzar con confianza y entusiasmo.",
    "cards.tarot.LeSoleil.meaning.var2":
      "Con El Sol, se abre para ti un período de claridad y optimismo. Estás preparad{genderSuffix} para brillar, compartir tu buen humor y atraer buenas oportunidades. Mantén el corazón abierto y disfruta cada momento.",
    "cards.tarot.LeSoleil.meaning.var3":
      "El Sol te invita a recuperar tu fuerza interior y vitalidad. Estás preparad{genderSuffix} para superar los obstáculos con una actitud positiva e inspirar a quienes te rodean. No dudes de tu capacidad para triunfar.",
    "cards.tarot.LeJugement.name": "El Juicio",
    "cards.tarot.LeJugement.meaning":
      "Despertar espiritual, renacimiento, perdón",
    "cards.tarot.LeJugement.meaning.var1":
      "El Juicio te invita a un despertar interior profundo. Estás preparad{genderSuffix} para reconocer errores pasados y abrazar un renacimiento espiritual. Acoge esta transformación para avanzar con ligereza y claridad.",
    "cards.tarot.LeJugement.meaning.var2":
      "Con El Juicio, se abre para ti un período de perdón y liberación. Estás preparad{genderSuffix} para liberarte de las cargas del pasado y reconectar con tu verdad. Abre tu corazón y déjate guiar hacia una nueva vida.",
    "cards.tarot.LeJugement.meaning.var3":
      "El Juicio te impulsa a escuchar tu llamado interior y actuar con conciencia. Estás preparad{genderSuffix} para hacer las paces contigo mism{genderSuffix} y renacer más fuerte. No temas al cambio, trae esperanza.",
    "cards.tarot.LeMonde.name": "El Mundo",
    "cards.tarot.LeMonde.meaning": "Logro, éxito, culminación",
    "cards.tarot.LeMonde.meaning.var1":
      "El Mundo simboliza el logro y el éxito. Estás preparad{genderSuffix} para celebrar el fin de un ciclo importante. Disfruta este momento de plenitud para apreciar todo lo que has conseguido y prepararte para lo que viene con confianza.",
    "cards.tarot.LeMonde.meaning.var2":
      "Con El Mundo, un ciclo completo llega a su fin, abriendo la puerta a nuevas posibilidades. Estás preparad{genderSuffix} para integrar las lecciones aprendidas y avanzar con serenidad. Acoge esta etapa como una victoria personal.",
    "cards.tarot.LeMonde.meaning.var3":
      "El Mundo te invita a vivir plenamente la armonía y la plenitud. Estás preparad{genderSuffix} para reconocer tu valor y abrirte al mundo con gratitud. Déjate llevar por esta energía positiva para concretar tus proyectos.",

    // Card Names and Meanings - Angels
    "cards.angels.ArchangeMichel.name": "Arcángel Miguel",
    "cards.angels.ArchangeMichel.meaning": "Protección divina, coraje y fuerza",
    "cards.angels.ArchangeMichel.meaning.var1":
      "El Arcángel Miguel te rodea con su poderosa protección. Te da el valor para enfrentar situaciones difíciles y defenderte de las energías negativas. Esta carta te recuerda que nunca estás solo frente a las pruebas. Concretamente, si te sientes amenazado o inestable en tu vida, Miguel te aconseja establecer límites claros. Aprende a decir no a las personas o situaciones que drenan tu energía. Protege tu espacio personal, ya sea físico o emocional. Su espada de luz corta los lazos tóxicos y te libera de los miedos que te paralizan. No dudes en pedir ayuda si la necesitas; es una señal de fuerza, no de debilidad.",
    "cards.angels.ArchangeMichel.meaning.var2":
      "Esta carta anuncia la intervención de una fuerza protectora en tu vida. Miguel te pide que te levantes con coraje y retomes tu poder personal. Has atravesado momentos en los que te sentiste vulnerable, pero ahora es el momento de recuperar tu fuerza interior. En tu vida diaria, identifica lo que mina tu confianza en ti mismo. ¿Es una relación tóxica? ¿Un entorno profesional asfixiante? ¿Pensamientos negativos recurrentes? Miguel te anima a actuar con determinación para cambiar la situación. Su presencia te garantiza que estás respaldado en este proceso. Toma una decisión que has estado posponiendo por miedo, enfrenta a alguien que te falta al respeto o simplemente afirma tus necesidades claramente.",
    "cards.angels.ArchangeMichel.meaning.var3":
      "La energía de Miguel aporta una protección divina en este momento de tu vida. Te recuerda que posees una fuerza insospechada. Esta carta te invita a mantenerte firme frente a la adversidad, a defender tus valores y convicciones. En términos prácticos, examina dónde te comprometes por miedo al conflicto o al rechazo. Miguel te da el coraje de mantenerte auténtico, incluso si eso desagrada a algunos. Su fuerza te permite establecer límites saludables en tus relaciones. Si enfrentas una injusticia, es el momento de actuar. Su escudo te protege mientras tomas una posición. Recuerda que la verdadera fuerza no está en la agresividad, sino en la afirmación tranquila y firme de quién eres.",
    "cards.angels.ArchangeGabriel.name": "Arcángel Gabriel",
    "cards.angels.ArchangeGabriel.meaning":
      "Mensajes divinos, creatividad y comunicación",
    "cards.angels.ArchangeGabriel.meaning.var1":
      "El Arcángel Gabriel te trae un mensaje importante. Es el mensajero divino que abre los canales de comunicación en tu vida. Esta carta indica que una información crucial está por llegar a ti o que debes transmitir algo esencial. Gabriel también estimula tu creatividad y te anima a expresar lo que llevas dentro. Concretamente, estate atento a las señales, conversaciones y oportunidades que se presentan. Es el momento de escribir, hablar, crear. Si tienes un proyecto artístico en mente, lánzate. Si debes tener una conversación difícil, Gabriel te da las palabras adecuadas. Escucha tu intuición y no ignores los mensajes que te llegan, aunque sean sutiles.",
    "cards.angels.ArchangeGabriel.meaning.var2":
      "Gabriel anuncia un período de comunicación y expresión personal. Te pide liberar tu voz y compartir tus ideas con el mundo. Tal vez has guardado silencio demasiado tiempo sobre un tema que te importa. Esta carta te anima a hablar, escribir, crear sin temer al juicio. En tu vida diaria, identifica lo que debes comunicar. ¿Un sentimiento por expresar a un ser querido? ¿Un proyecto creativo por iniciar? ¿Una verdad por decir? Gabriel te respalda en este proceso. También favorece la recepción de noticias importantes, así que mantente abierto. Los mensajes divinos pueden llegar por medios inesperados.",
    "cards.angels.ArchangeGabriel.meaning.var3":
      "La energía de Gabriel despierta tu creatividad y aclara tu comunicación. Te recuerda que tienes algo único que ofrecer al mundo. Esta carta te invita a utilizar tus talentos artísticos o tu don de la palabra. En términos prácticos, involúcrate en una actividad creativa esta semana, aunque sea algo sencillo. Escribe en un diario, pinta, canta, decora tu espacio. Gabriel también desbloquea situaciones donde la comunicación era difícil. Si esperas noticias, pronto llegarán. Si debes aclarar un malentendido, es el momento adecuado. Exprésate con autenticidad y escucha verdaderamente lo que los demás te dicen.",
    "cards.angels.ArchangeRaphael.name": "Arcángel Rafael",
    "cards.angels.ArchangeRaphael.meaning": "Curación física y emocional",
    "cards.angels.ArchangeRaphael.meaning.var1":
      "El Arcángel Rafael te envuelve con su energía sanadora. Alivia tus heridas físicas y emocionales con suavidad y compasión. Esta carta indica que un proceso de sanación está en marcha en tu vida. Rafael te recuerda que cuidar de ti mismo no es egoísta, es esencial. Concretamente, date descanso si tu cuerpo lo pide. Consulta a un profesional de la salud si has descuidado síntomas. En el plano emocional, permítete sentir y liberar las emociones reprimidas. Rafael te guía hacia las personas y prácticas que favorecen tu sanación, ya sea la medicina, la terapia o simplemente tiempo para ti.",
    "cards.angels.ArchangeRaphael.meaning.var2":
      "Rafael anuncia un período de recuperación y regeneración. Te pide que desacelores y escuches las necesidades de tu cuerpo y corazón. Tal vez has ido demasiado lejos, ignorado señales de alarma o llevado solo cargas demasiado pesadas. Esta carta te anima a pedir ayuda y aceptar el apoyo que se te ofrece. En tu vida diaria, identifica lo que requiere atención especial. ¿Fatiga persistente? ¿Una herida emocional no resuelta? ¿Relaciones que te hieren? Rafael te da la fuerza para hacer los cambios necesarios para tu bienestar. Haz una cita con un médico, un terapeuta o simplemente date un día completo de descanso.",
    "cards.angels.ArchangeRaphael.meaning.var3":
      "La energía sanadora de Rafael trabaja en tu vida en este momento. Te ayuda a liberarte de los sufrimientos del pasado y restaurar tu equilibrio interior. Esta carta te invita a tratar con benevolencia tus heridas, ya sean visibles o invisibles. En términos prácticos, adopta hábitos que nutran tu cuerpo y mente. Come saludablemente, duerme lo suficiente, muévete suavemente. Para las heridas emocionales, considera hablar con alguien de confianza o escribir lo que sientes. Rafael te recuerda que la sanación lleva tiempo y que es normal. Sé paciente contigo mismo y celebra cada pequeño progreso en este camino.",
    "cards.angels.ArchangeUriel.name": "Arcángel Uriel",
    "cards.angels.ArchangeUriel.meaning": "Sabiduría divina e iluminación",
    "cards.angels.ArchangeUriel.meaning.var1":
      "El Arcángel Uriel ilumina tu camino con su sabiduría divina. Te ayuda a ver claramente situaciones complejas y entender el significado profundo de lo que vives. Esta carta indica que se prepara una toma de conciencia importante. Uriel ilumina lo que estaba en la sombra y te revela verdades esenciales. Concretamente, toma tiempo para la reflexión y la meditación. Las respuestas que buscas ya están dentro de ti, Uriel solo te ayuda a verlas. Si enfrentas una decisión difícil, observa la situación desde diferentes ángulos. Uriel te da el discernimiento necesario para hacer la elección correcta. Confía en las intuiciones repentinas y en los momentos de claridad que surgen.",
    "cards.angels.ArchangeUriel.meaning.var2":
      "Uriel anuncia un período de iluminación interior y comprensión profunda. Te pide buscar la sabiduría más allá de las apariencias y confiar en tu conocimiento interno. Posees más sabiduría de la que crees. Esta carta te anima a estudiar, aprender y profundizar en los temas que te interesan. En tu día a día, nota las sincronicidades y coincidencias que te guían. Uriel te muestra los patrones y lecciones ocultas en tus experiencias. Si algo te perturba, toma distancia y observa con desapego. La sabiduría a menudo llega cuando dejamos de buscar frenéticamente y dejamos que la comprensión emerja naturalmente. Lee, aprende, cuestiona.",
    "cards.angels.ArchangeUriel.meaning.var3":
      "La energía de Uriel aporta luz y claridad a tu vida. Disipa la confusión y te permite ver la verdad de las situaciones. Esta carta te invita a desarrollar tu sabiduría interior mediante la observación y contemplación. En lo práctico, crea momentos de silencio en tu día para reflexionar. Lleva un diario para anotar tus reflexiones e insights. Uriel favorece el aprendizaje, por lo que es un buen momento para formarte en un área que te interese. Si buscas respuestas, consulta libros de sabiduría o maestros inspiradores. Uriel te recuerda que el verdadero conocimiento transforma, no se queda en teoría. Aplica lo que aprendes en tu vida concreta.",
    "cards.angels.AngeGardien.name": "Ángel de la Guarda",
    "cards.angels.AngeGardien.meaning": "Protección personal y guía",
    "cards.angels.AngeGardien.meaning.var1":
      "Tu Ángel Guardián te hace saber que está constantemente a tu lado. Velan por ti con amor y te protege de peligros que ni siquiera ves. Esta carta te recuerda que nunca estás solo en tu camino de vida. Tu guía personal siempre está disponible, solo tienes que pedirla. Concretamente, si te sientes perdido o ansioso, toma un momento para conectarte interiormente. Pide a tu Ángel Guardián que te muestre señales de su presencia. Confía en las intuiciones que te alejan de una situación o te atraen hacia otra. Estas impulsiones son a menudo su forma de guiarte. Si atraviesas un momento difícil, sabe que estás protegido y apoyado, aunque aún no lo veas.",
    "cards.angels.AngeGardien.meaning.var2":
      "Esta carta anuncia una protección reforzada a tu alrededor en este momento. Tu Ángel Guardián te envía un mensaje claro de que guía tus pasos y aleja los obstáculos de tu camino. Te pide que confíes en él y sigas tu instinto. En tu día a día, observa los pequeños milagros y las coincidencias felices que suceden. Es tu ángel trabajando entre bastidores para tu bienestar. Si debes tomar una decisión importante, calma tu mente y escucha esa voz interior suave pero firme. Tu Ángel Guardián se comunica mediante sensaciones, sueños, señales repetidas. Sé atento y agradécele por su presencia constante en tu vida.",
    "cards.angels.AngeGardien.meaning.var3":
      "La energía de tu Ángel Guardián te envuelve con protección y amor incondicional. Conoce tu misión de vida y te ayuda a mantenerte en el camino correcto. Esta carta te invita a fortalecer tu conexión con él mediante la oración o la meditación. En lo práctico, crea un ritual diario para reconocer su presencia. Puede ser simplemente dar gracias por la mañana o pedir su guía antes de dormir. Tu Ángel Guardián te protege física, emocional y espiritualmente. Si te sientes vulnerable, visualiza sus alas que te rodean. Te recuerda que incluso en los momentos más oscuros, estás guiado hacia la luz. Escucha los mensajes que vienen de tu corazón, a menudo es él quien te habla.",
    "cards.angels.AngedelAmour.name": "Ángel del Amor",
    "cards.angels.AngedelAmour.meaning":
      "Relaciones armoniosas y amor incondicional",
    "cards.angels.AngedelAmour.meaning.var1":
      "El Ángel del Amor abre tu corazón a relaciones más auténticas y armoniosas. Te enseña que el amor comienza por ti mismo y luego irradia hacia los demás. Esta carta indica un período favorable para sanar tus heridas afectivas y atraer relaciones saludables. El amor incondicional significa aceptar sin juicio, primero a ti mismo y luego a los demás. Concretamente, observa cómo te hablas interiormente. ¿Eres tan duro contigo mismo como nunca lo serías con un amigo? Cambia ese diálogo interno. En tus relaciones, practica la escucha verdadera y la expresión honesta de tus sentimientos. Si estás en pareja, es momento de reavivar la conexión. Si estás soltero, trabaja en tu amor propio antes de buscar el amor afuera.",
    "cards.angels.AngedelAmour.meaning.var2":
      "Esta carta anuncia una energía de amor y armonía que entra en tu vida. El Ángel del Amor te recuerda que mereces ser amado por quien realmente eres. Te anima a bajar tus defensas y mostrarte vulnerable en tus relaciones. En tu día a día, identifica los muros que has construido por miedo a ser herido. Estas protecciones también te impiden recibir el amor que se te ofrece. Atrévete a mostrar tus emociones sinceras a quienes importan para ti. Perdona las viejas heridas, no por los demás, sino para liberarte a ti mismo. El Ángel del Amor también favorece encuentros significativos, así que mantente abierto a las nuevas personas que cruzan tu camino.",
    "cards.angels.AngedelAmour.meaning.var3":
      "La energía del Ángel del Amor te invita a crear más armonía en todas tus relaciones. Te guía hacia un amor maduro, que acepta las imperfecciones y elige la benevolencia. Esta carta te anima a reparar los lazos dañados si todavía es posible y sano para ti. En lo práctico, expresa tu gratitud a las personas que amas. Un mensaje sincero, un gesto atento puede transformar una relación. Si una relación te hace más daño que bien, el Ángel del Amor también te da el coraje de liberarla con compasión. El amor incondicional incluye a veces poner límites claros. Recuerda que enseñas a los demás cómo tratarte por lo que aceptas.",
    "cards.angels.AngedelaPaix.name": "Ángel de la Paz",
    "cards.angels.AngedelaPaix.meaning": "Serenidad interior y calma",
    "cards.angels.AngedelaPaix.meaning.var1":
      "El Ángel de la Paz te trae una energía de serenidad y calma profunda. Te ayuda a encontrar el silencio interior incluso en medio del caos exterior. Esta carta indica que es tiempo de ralentizar y cultivar tu tranquilidad mental. La verdadera paz no depende de las circunstancias, nace de tu estado interior. Concretamente, crea momentos de pausa en tu día. Cinco minutos de respiración consciente, una caminata en la naturaleza o simplemente sentarte en silencio. Si vives conflictos, el Ángel de la Paz te anima a elegir la calma en vez de tener la razón. A veces, la paz requiere soltar la necesidad de control. Aléjate de fuentes de estrés innecesarias como noticias ansiosas o conversaciones tóxicas.",
    "cards.angels.AngedelaPaix.meaning.var2":
      "Esta carta anuncia un período de reconciliación y armonía interior. El Ángel de la Paz te pide hacer las paces con tu pasado, tus errores y tus arrepentimientos. Te recuerda que no puedes cambiar lo que fue, pero sí puedes elegir cómo vives ahora. En tu día a día, identifica lo que perturba tu paz interior. ¿Pensamientos obsesivos? ¿Rencores persistentes? ¿Miedos constantes? Trabaja activamente en apaciguar estas turbulencias. La meditación, el perdón y la aceptación son tus herramientas. Si estás en conflicto con alguien, busca puntos de reconciliación en vez de alimentar la división. El Ángel de la Paz te guía hacia soluciones suaves y compromisos respetuosos.",
    "cards.angels.AngedelaPaix.meaning.var3":
      "La energía del Ángel de la Paz calma las tormentas de tu mente y corazón. Te invita a crear un santuario de serenidad en tu vida diaria. Esta carta te recuerda que la paz es una elección consciente que haces en cada momento. En lo práctico, acondiciona un espacio en tu casa dedicado a la calma y la relajación. Limita tu exposición a estímulos excesivos y ambientes estresantes. Si tu mente se acelera con inquietudes, vuelve suavemente al momento presente. Respira profundamente y recuerda que la mayoría de tus miedos son sobre un futuro que aún no existe. El Ángel de la Paz te enseña que la calma no es la ausencia de problemas, sino la capacidad de mantenerte centrado a pesar de ellos.",
    "cards.angels.AngedelaProsperite.name": "Ángel de la Prosperidad",
    "cards.angels.AngedelaProsperite.meaning": "Abundancia y éxito material",
    "cards.angels.AngedelaProsperite.meaning.var1":
      "El Ángel de la Prosperidad te invita a recibir la abundancia en tu vida. Te recuerda que el éxito material está al alcance de tu mano, siempre y cuando mantengas una actitud positiva y creas en tus capacidades. Esta carta te anima a actuar con confianza y aprovechar las oportunidades que se presenten. Concretamente, presta atención a las señales de suerte, a las ideas que puedan mejorar tu situación financiera, y no dudes en invertir en ti mismo.",
    "cards.angels.AngedelaProsperite.meaning.var2":
      "Esta carta anuncia un período favorable para el crecimiento y la estabilidad material. El Ángel de la Prosperidad te apoya en tus proyectos empresariales, de inversión o en tu evolución profesional. También te invita a cultivar la gratitud por lo que ya posees, porque esto atraerá aún más abundancia. En tu vida diaria, toma decisiones reflexivas y mantente abierto a los consejos sabios.",
    "cards.angels.AngedelaProsperite.meaning.var3":
      "La energía del Ángel de la Prosperidad actúa como un impulso para manifestar tus objetivos financieros. Te anima a superar los bloqueos relacionados con el miedo o la carencia. Esta carta te recuerda que prosperar no significa solo acumular bienes, sino también crear un equilibrio entre la riqueza material y el bienestar personal. De manera práctica, organízate, planifica tus finanzas y cultiva una visión clara de tus ambiciones.",
    "cards.angels.AngedelaGuerison.name": "Ángel de la Sanación",
    "cards.angels.AngedelaGuerison.meaning": "Recuperación y bienestar",
    "cards.angels.AngedelaGuerison.meaning.var1":
      "El Ángel de la Sanación te envuelve con su energía sanadora. Te invita a cuidar tu cuerpo y tu mente con suavidad y paciencia. Esta carta anuncia un proceso de recuperación, ya sea físico, emocional o espiritual. Concretamente, escucha las necesidades de tu cuerpo, descansa y acepta el apoyo de los demás.",
    "cards.angels.AngedelaGuerison.meaning.var2":
      "Esta carta simboliza un período favorable para la restauración de tu bienestar. El Ángel de la Sanación te anima a dejar ir las heridas pasadas y a recurrir a prácticas que nutran tu salud global. En tu vida diaria, adopta hábitos saludables, medita y permítete sanar a tu propio ritmo.",
    "cards.angels.AngedelaGuerison.meaning.var3":
      "La energía del Ángel de la Sanación actúa como un catalizador para tu transformación interior. Te apoya en la liberación de bloqueos y sufrimientos guardados. Esta carta te invita a cultivar la compasión hacia ti mismo y reconocer que la sanación es un camino progresivo. Tómate el tiempo para recibir cada etapa con confianza.",
    "cards.angels.AngedelaSagesse.name": "Ángel de la Sabiduría",
    "cards.angels.AngedelaSagesse.meaning":
      "Conocimiento espiritual y discernimiento",
    "cards.angels.AngedelaSagesse.meaning.var1":
      "El Ángel de la Sabiduría te invita a buscar el conocimiento más allá de las apariencias. Te ayuda a desarrollar tu discernimiento y a escuchar tu voz interior. Esta carta indica un momento propicio para la reflexión profunda y la toma de decisiones sabias. Concretamente, toma tiempo para meditar, leer o estudiar temas que eleven tu espíritu.",
    "cards.angels.AngedelaSagesse.meaning.var2":
      "Esta carta anuncia un período de despertar espiritual y claridad mental. El Ángel de la Sabiduría te guía para comprender las lecciones ocultas en tus experiencias. En tu vida diaria, presta atención a las señales y sincronicidades que te orientan. Cultiva la paciencia y la humildad en tu búsqueda de la verdad.",
    "cards.angels.AngedelaSagesse.meaning.var3":
      "La energía del Ángel de la Sabiduría te acompaña en tu camino interior. Te anima a ser calmado y discernir frente a los desafíos. Esta carta te recuerda que la verdadera sabiduría viene del equilibrio entre el conocimiento y la compasión. De manera práctica, toma tiempo para reflexionar y luego comparte tus descubrimientos con bondad.",
    "cards.angels.AngedelaJoie.name": "Ángel de la Alegría",
    "cards.angels.AngedelaJoie.meaning": "Felicidad y optimismo",
    "cards.angels.AngedelaJoie.meaning.var1":
      "El Ángel de la Alegría te invita a recibir la luz y la felicidad en tu vida. Te recuerda que la alegría es una elección, incluso en momentos difíciles. Esta carta fomenta el cultivo del optimismo y la celebración de las pequeñas victorias diarias. Concretamente, tómate el tiempo para reír, sonreír y compartir momentos positivos con tus seres queridos.",
    "cards.angels.AngedelaJoie.meaning.var2":
      "Esta carta anuncia un período donde la ligereza y el entusiasmo tomarán el control. El Ángel de la Alegría te impulsa a liberarte de los pesos emocionales que te retienen. En tu vida cotidiana, busca fuentes de placer simple, como un paseo, música o una actividad creativa. La alegría es contagiosa, compártela a tu alrededor.",
    "cards.angels.AngedelaJoie.meaning.var3":
      "La energía del Ángel de la Alegría brilla dentro de ti, invitándote a vivir plenamente y saborear cada instante. Te anima a cultivar la gratitud y ver lo positivo incluso en los desafíos. De manera práctica, crea rituales que aporten alegría, como escuchar tu canción favorita o practicar una actividad que te apasione. La alegría es un motor poderoso para tu bienestar.",
    "cards.angels.AngedelaFoi.name": "Ángel de la Fe",
    "cards.angels.AngedelaFoi.meaning": "Confianza en el universo y esperanza",
    "cards.angels.AngedelaFoi.meaning.var1":
      "El Ángel de la Fe te invita a confiar en el universo y a creer en un futuro mejor. Te anima a mantener la esperanza incluso frente a las incertidumbres. Esta carta te recuerda que la fe abre puertas invisibles y te guía en tu camino. Concretamente, suelta el control excesivo y acoge las sorpresas de la vida.",
    "cards.angels.AngedelaFoi.meaning.var2":
      "Esta carta anuncia un período donde tu confianza interior se ve reforzada. El Ángel de la Fe te ayuda a superar las dudas y a mantener el rumbo a pesar de los obstáculos. En tu vida diaria, practica la paciencia y la aceptación, y busca señales que confirmen que estás siendo apoyado. La fe es un ancla poderosa para avanzar.",
    "cards.angels.AngedelaFoi.meaning.var3":
      "La energía del Ángel de la Fe te anima a creer en ti mismo y en la benevolencia del universo. Te recuerda que, aunque el camino parezca oscuro, siempre hay una luz interior que brilla. De manera práctica, toma un momento cada día para reforzar tu confianza mediante la meditación o la oración. La fe nutre tu fuerza interior y tu coraje.",
    "cards.angels.AngedelaCreativite.name": "Ángel de la Creatividad",
    "cards.angels.AngedelaCreativite.meaning":
      "Inspiración artística e innovación",
    "cards.angels.AngedelaCreativite.meaning.var1":
      "El Ángel de la Creatividad estimula tu inspiración y te invita a expresar tus talentos artísticos. Te anima a salir de los caminos trillados y a innovar en tu vida. Esta carta recuerda que la creatividad es una forma de conectar con tu esencia más profunda. Concretamente, toma tiempo para crear, ya sea a través de la escritura, la pintura, la música o cualquier otra forma de expresión.",
    "cards.angels.AngedelaCreativite.meaning.var2":
      "Esta carta anuncia una fase en la que tu imaginación está despertando. El Ángel de la Creatividad te incita a explorar nuevas ideas y a experimentar sin miedo al juicio. En tu vida diaria, dedica tiempo para soñar y dejar que fluya tu inspiración. Tu creatividad también puede ser una solución para resolver problemas.",
    "cards.angels.AngedelaCreativite.meaning.var3":
      "La energía del Ángel de la Creatividad te invita a renovar tu visión e innovar. Te recuerda que cada acto creativo es una forma de transformación. De manera práctica, lánzate a un proyecto artístico o inventa una nueva forma de hacer las cosas. Atrévete a expresar tu originalidad y nutre tu pasión con entusiasmo.",
    "cards.angels.AngedelaPurification.name": "Ángel de la Purificación",
    "cards.angels.AngedelaPurification.meaning":
      "Limpieza energética y renovación",
    "cards.angels.AngedelaPurification.meaning.var1":
      "El Ángel de la Purificación te ayuda a liberar las energías negativas y a purificar tu mente y cuerpo. Te invita a hacer una limpieza interior para recuperar claridad y ligereza. Concretamente, tómate el tiempo para centrarte y eliminar lo que ya no te sirve, ya sean pensamientos, emociones o influencias externas.",
    "cards.angels.AngedelaPurification.meaning.var2":
      "Esta carta anuncia un período de renovación donde se te llama a deshacerte de bloqueos energéticos. El Ángel de la Purificación te anima a hacer espacio para lo nuevo. En tu vida diaria, practica rituales simples como la meditación o la sofrología para revitalizarte.",
    "cards.angels.AngedelaPurification.meaning.var3":
      "La energía del Ángel de la Purificación trabaja en limpiar tu espacio personal y tu mente. Te recuerda que la renovación pasa por un verdadero desapego. De manera práctica, organiza tu entorno para crear un lugar saludable y relajante. Cuídate con suavidad y ábrete a una nueva energía positiva.",
    "cards.angels.AngedelaCompassion.name": "Ángel de la Compasión",
    "cards.angels.AngedelaCompassion.meaning": "Empatía y bondad",
    "cards.angels.AngedelaCompassion.meaning.var1":
      "El Ángel de la Compasión te invita a abrir tu corazón con suavidad y empatía hacia ti mismo y hacia los demás. Te recuerda la importancia de la bondad en tus relaciones. Concretamente, muestra paciencia y comprensión, incluso frente a las dificultades o los errores.",
    "cards.angels.AngedelaCompassion.meaning.var2":
      "Esta carta anuncia un período donde tu capacidad de escucha y empatía se ve reforzada. El Ángel de la Compasión te anima a apoyar a aquellos que atraviesan pruebas. En tu vida diaria, ofrece tu ayuda sin juzgar y cultiva la ternura en tus interacciones.",
    "cards.angels.AngedelaCompassion.meaning.var3":
      "La energía del Ángel de la Compasión te acompaña para desarrollar un amor incondicional. Te recuerda que la verdadera fuerza reside en la suavidad. De manera práctica, realiza gestos de amor y apoyo, y aprende a perdonarte a ti mismo con indulgencia.",
    "cards.angels.AngedelaTransformation.name": "Ángel de la Transformación",
    "cards.angels.AngedelaTransformation.meaning":
      "Cambios positivos y evolución",
    "cards.angels.AngedelaTransformation.meaning.var1":
      "El Ángel de la Transformación te acompaña en un proceso de cambio profundo. Te invita a abrazar las evoluciones que se presentan, aunque puedan parecer inciertas. Concretamente, deja ir los viejos hábitos o creencias que ya no te sirven para hacer espacio a lo nuevo y positivo.",
    "cards.angels.AngedelaTransformation.meaning.var2":
      "Esta carta anuncia un período donde ocurren cambios importantes en tu vida. El Ángel de la Transformación te apoya para atravesar estas etapas con confianza y serenidad. En tu vida diaria, estate atento a los signos que indican el camino a seguir y no dudes en tomar decisiones audaces.",
    "cards.angels.AngedelaTransformation.meaning.var3":
      "La energía del Ángel de la Transformación te invita a evolucionar en armonía contigo mismo. Te recuerda que cada paso, incluso el difícil, es una oportunidad de crecimiento. De manera práctica, acoge los cambios con apertura y adáptate con flexibilidad para construir una vida más alineada con tus aspiraciones.",
    "cards.angels.AngedelAbondance.name": "Ángel de la Abundancia",
    "cards.angels.AngedelAbondance.meaning": "Riqueza espiritual y material",
    "cards.angels.AngedelAbondance.meaning.var1":
      "El Ángel de la Abundancia te invita a acoger la riqueza en todas sus formas, tanto material como espiritual. Te anima a reconocer y apreciar lo que ya posees. Concretamente, cultiva la gratitud para atraer más prosperidad a tu vida.",
    "cards.angels.AngedelAbondance.meaning.var2":
      "Esta carta anuncia un período donde los flujos de abundancia se fortalecen a tu alrededor. El Ángel de la Abundancia te recuerda que tu estado mental es clave: manténte abierto y confiado para recibir lo que te está destinado. En tu vida diaria, identifica las oportunidades y actúa con generosidad.",
    "cards.angels.AngedelAbondance.meaning.var3":
      "La energía del Ángel de la Abundancia te invita a equilibrar el dar y el recibir. Te recuerda que la verdadera riqueza radica en el compartir y la armonía interior. De manera práctica, da sin esperar nada a cambio y presta atención a lo que la vida te devuelve.",
    "cards.angels.AngedelaLiberation.name": "Ángel de la Liberación",
    "cards.angels.AngedelaLiberation.meaning":
      "Libertad de miedos y limitaciones",
    "cards.angels.AngedelaLiberation.meaning.var1":
      "El Ángel de la Liberación te ayuda a deshacerte de los miedos y bloqueos que frenan tu desarrollo. Te invita a soltar lo que te retiene para avanzar con mayor ligereza. Concretamente, identifica tus cadenas invisibles y decide romperlas.",
    "cards.angels.AngedelaLiberation.meaning.var2":
      "Esta carta anuncia una fase en la que puedes liberarte de las limitaciones internas y externas. El Ángel de la Liberación te apoya para atreverte a salir de tu zona de confort. En tu vida diaria, enfrenta tus miedos con valentía y acoge la novedad con confianza.",
    "cards.angels.AngedelaLiberation.meaning.var3":
      "La energía del Ángel de la Liberación te invita a vivir en libertad interior. Te recuerda que tienes el poder de elegir tus pensamientos y reacciones. De manera práctica, practica el perdón hacia ti mismo y hacia los demás para liberarte de los pesos emocionales.",
    "cards.angels.AngedelaGratitude.name": "Ángel de la Gratitud",
    "cards.angels.AngedelaGratitude.meaning": "Reconocimiento y apreciación",
    "cards.angels.AngedelaGratitude.meaning.var1":
      "El Ángel de la Gratitud te invita a cultivar un corazón agradecido. Al apreciar plenamente lo que tienes, abres la puerta a más bendiciones. Tómate el tiempo cada día para anotar lo que te hace feliz y recibe esos regalos con alegría.",
    "cards.angels.AngedelaGratitude.meaning.var2":
      "Esta carta señala un período favorable para reconocer las pequeñas y grandes cosas que enriquecen tu vida. El Ángel de la Gratitud te recuerda que esta actitud positiva atrae aún más abundancia y paz interior. En tu rutina, observa y celebra cada instante de felicidad.",
    "cards.angels.AngedelaGratitude.meaning.var3":
      "La energía del Ángel de la Gratitud te impulsa a transformar tu mirada sobre el mundo. Al elegir ser agradecido, modificas tu vibración y fomentas la armonía a tu alrededor. Trata de compartir esta gratitud con tus seres queridos, eso fortalece los lazos y eleva las energías.",
    "cards.angels.AngedelaManifestation.name": "Ángel de la Manifestación",
    "cards.angels.AngedelaManifestation.meaning":
      "Realización de sueños y proyectos",
    "cards.angels.AngedelaManifestation.meaning.var1":
      "El Ángel de la Manifestación te anima a concentrar tu energía en tus objetivos. Al visualizar claramente lo que deseas lograr, amplificas tu capacidad para atraer oportunidades. Actúa con confianza y perseverancia para concretar tus sueños.",
    "cards.angels.AngedelaManifestation.meaning.var2":
      "Esta carta anuncia un momento favorable para transformar tus ideas en realidad. El Ángel de la Manifestación te recuerda que tus pensamientos y acciones son herramientas poderosas. Mantente alineado con tus intenciones y abierto a las señales que te guían.",
    "cards.angels.AngedelaManifestation.meaning.var3":
      "La energía de este ángel te impulsa a creer en tu potencial creativo. Al tomar decisiones claras y pasar a la acción, avanzas hacia tus aspiraciones. Cultiva la paciencia y la determinación, porque cada paso te acerca al éxito.",
    "cards.angels.AngedelHarmonie.name": "Ángel de la Armonía",
    "cards.angels.AngedelHarmonie.meaning":
      "Equilibrio en todos los aspectos de la vida",
    "cards.angels.AngedelHarmonie.meaning.var1":
      "El Ángel de la Armonía te invita a encontrar un equilibrio duradero entre tus emociones, tus relaciones y tus compromisos. Al cultivar la paz interior y la tolerancia, creas un ambiente calmado que favorece el bienestar y la serenidad.",
    "cards.angels.AngedelHarmonie.meaning.var2":
      "Esta carta anuncia una fase en la que puedes restablecer el equilibrio en tu vida a pesar de las tensiones. El Ángel de la Armonía te aconseja escuchar tanto a ti mismo como a los demás, actuar con suavidad y privilegiar la comprensión mutua para superar los conflictos.",
    "cards.angels.AngedelHarmonie.meaning.var3":
      "La energía del Ángel de la Armonía te ayuda a apaciguar las discordias internas y externas. Al fomentar la moderación, la paciencia y el respeto, construyes relaciones sólidas y alcanzas una estabilidad duradera que te respalda en todos los aspectos de tu vida.",
    "cards.angels.AngedelaNouvelleVie.name": "Ángel de la Nueva Vida",
    "cards.angels.AngedelaNouvelleVie.meaning":
      "Nuevos comienzos y renacimiento",
    "cards.angels.AngedelaNouvelleVie.meaning.var1":
      "El Ángel de la Nueva Vida te invita a recibir un nuevo ciclo con apertura y confianza. Es el momento de dejar atrás el pasado y abrazar nuevas oportunidades y un profundo renacimiento en tu vida.",
    "cards.angels.AngedelaNouvelleVie.meaning.var2":
      "Esta carta anuncia un período de transformación donde puedes renacer plenamente. El Ángel te apoya en tus nuevos comienzos, te anima a sentar bases sólidas y avanzar con fe hacia un futuro prometedor.",
    "cards.angels.AngedelaNouvelleVie.meaning.var3":
      "La energía del Ángel de la Nueva Vida te acompaña para dar vuelta a una página importante. Te recuerda que cada final es un nuevo comienzo, y que tienes dentro de ti la fuerza necesaria para reinventarte y crecer con serenidad.",

    // Horoscope Data Translations - Descriptions
    "horoscope.data.descriptions.aries.0":
      "Tu energía desbordante te impulsa a actuar con audacia hoy. Aprovecha para iniciar nuevos proyectos.",
    "horoscope.data.descriptions.aries.1":
      "Un encuentro inesperado podría alterar tus emociones. Mantente atento, esta persona podría marcar tu día.",
    "horoscope.data.descriptions.aries.2":
      "Tu entusiasmo comunicativo atrae la atención de quienes te rodean. Ten paciencia para evitar malentendidos.",
    "horoscope.data.descriptions.aries.3":
      "En el trabajo, podría presentarse una oportunidad. Analízala cuidadosamente antes de decidir.",
    "horoscope.data.descriptions.aries.4":
      "Atento a las tensiones en tus relaciones cercanas. Mantén la calma y prioriza el diálogo para evitar conflictos.",
    "horoscope.data.descriptions.aries.6":
      "Tu espontaneidad es un activo, pero evita excesos o decisiones impulsivas que puedan causarte problemas.",
    "horoscope.data.descriptions.aries.7":
      "Una idea original podría traerte éxito y reconocimiento. No dudes en compartirla y concretarla.",
    "horoscope.data.descriptions.aries.8":
      "Una verdad oculta podría revelarse. Mantente atento y utiliza esta información sabiamente.",
    "horoscope.data.descriptions.aries.9":
      "Tus esfuerzos constantes comienzan a dar frutos. Es momento de cosechar los resultados de tu trabajo.",
    "horoscope.data.descriptions.aries.10":
      "Tu seguridad natural atrae la confianza de los demás. Aprovecha para consolidar tus relaciones personales y profesionales.",
    "horoscope.data.descriptions.aries.11":
      "Una agradable sorpresa podría iluminar tu día, ya sea un encuentro, un mensaje o un evento positivo.",
    "horoscope.data.descriptions.aries.12":
      "Tus lazos de amistad o familiares se fortalecen. Disfruta estos momentos para crear recuerdos valiosos.",
    "horoscope.data.descriptions.aries.13":
      "Tu intuición está especialmente aguda hoy. Sigue tus sentimientos para tomar buenas decisiones.",
    "horoscope.data.descriptions.aries.14":
      "Una energía positiva te acompaña todo el día. Úsala para avanzar con confianza y lograr tus objetivos.",
    "horoscope.data.descriptions.taurus.0":
      "La estabilidad que buscas finalmente se manifiesta en tu vida. Disfruta de este período de serenidad para saborear los placeres simples.",
    "horoscope.data.descriptions.taurus.1":
      "Un encuentro prometedor podría ocurrir hoy, trayendo una hermosa complicidad y emociones positivas para compartir.",
    "horoscope.data.descriptions.taurus.2":
      "Venus te trae dulzura y armonía en tus relaciones. Es un día perfecto para cultivar el amor y la amistad.",
    "horoscope.data.descriptions.taurus.3":
      "Tu paciencia y perseverancia están dando frutos. Los resultados de tus esfuerzos pasados se concretan hoy.",
    "horoscope.data.descriptions.taurus.4":
      "Las relaciones familiares son particularmente armoniosas. Aprovecha este momento para fortalecer los lazos con tus seres queridos.",
    "horoscope.data.descriptions.taurus.5":
      "No descuides tu bienestar físico; tómate tiempo para relajarte y hacer ejercicio.",
    "horoscope.data.descriptions.taurus.6":
      "Tus talentos artísticos se destacan hoy, y tendrás la oportunidad de expresarlos plenamente en tus proyectos personales o profesionales.",
    "horoscope.data.descriptions.taurus.7":
      "Es el momento ideal para concretar tus proyectos a largo plazo, estableciendo los pasos necesarios para alcanzar tus objetivos con éxito.",
    "horoscope.data.descriptions.taurus.8":
      "Tu sentido práctico y tu discernimiento te permiten evitar muchos errores y tomar decisiones sabias en tus asuntos diarios.",
    "horoscope.data.descriptions.taurus.9":
      "Se aproxima un período de prosperidad material, ofreciendo oportunidades de ganancias financieras y estabilidad económica si permaneces atento.",
    "horoscope.data.descriptions.taurus.10":
      "Tu fidelidad y lealtad en la amistad son reconocidas y apreciadas por quienes te rodean, creando vínculos aún más fuertes y armoniosos.",
    "horoscope.data.descriptions.taurus.11":
      "Los placeres simples de la vida te brindan gran satisfacción y contribuyen a tu bienestar emocional y mental hoy.",
    "horoscope.data.descriptions.taurus.12":
      "Tu estabilidad emocional tranquiliza a quienes te rodean, y eres percibido como un referente confiable y calmante para los demás.",
    "horoscope.data.descriptions.taurus.13":
      "Es un día ideal para actividades al aire libre, que te permitirán recargarte, tomar distancia y recuperar tu energía.",
    "horoscope.data.descriptions.taurus.14":
      "Tus esfuerzos pasados finalmente están siendo recompensados, y verás que tu perseverancia da frutos en tus proyectos y relaciones.",
    "horoscope.data.descriptions.gemini.0":
      "Tu curiosidad natural te lleva a maravillosos descubrimientos. Mantente abierto a nuevos encuentros e ideas innovadoras.",
    "horoscope.data.descriptions.gemini.1":
      "Se presentan oportunidades profesionales. Atrévete a proponer tus ideas innovadoras; serán bien recibidas.",
    "horoscope.data.descriptions.gemini.2":
      "Mercurio estimula tu inteligencia y creatividad. Es el día ideal para comunicar, escribir o aprender algo nuevo.",
    "horoscope.data.descriptions.gemini.3":
      "Tu capacidad de adaptarte es notable hoy, aprovecha para explorar nuevas oportunidades que se presenten.",
    "horoscope.data.descriptions.gemini.4":
      "Presta atención a tu entorno; algunas personas podrían tener información crucial para compartir contigo.",
    "horoscope.data.descriptions.gemini.5":
      "Hoy tu mente está aguda y curiosa, pero ten cuidado con malentendidos o pequeñas disputas que puedan surgir a tu alrededor.",
    "horoscope.data.descriptions.gemini.6":
      "Una sorpresa agradable podría iluminar tu día, ya sea un encuentro, un mensaje o una idea inspiradora.",
    "horoscope.data.descriptions.gemini.7":
      "Tu facilidad para comunicar atrae la atención hoy, pero ten cuidado de no revelar demasiada información o causar malentendidos.",
    "horoscope.data.descriptions.gemini.8":
      "Una conversación inesperada cambia tu punto de vista y abre nuevas perspectivas en tus relaciones o proyectos.",
    "horoscope.data.descriptions.gemini.9":
      "Tu versatilidad te permite manejar varios proyectos a la vez sin perder eficacia ni creatividad.",
    "horoscope.data.descriptions.gemini.10":
      "Las nuevas tecnologías te abren nuevos horizontes y facilitan tus intercambios o proyectos innovadores.",
    "horoscope.data.descriptions.gemini.11":
      "Tu ingenio y sentido del humor relajan el ambiente, atrayendo a los demás hacia ti con ligereza y carisma.",
    "horoscope.data.descriptions.gemini.12":
      "Es un momento perfecto para aprender algo nuevo y enriquecer tus conocimientos o habilidades.",
    "horoscope.data.descriptions.gemini.13":
      "Tus redes sociales y contactos te aportan hoy oportunidades inesperadas y provechosas.",
    "horoscope.data.descriptions.gemini.14":
      "Cuidado con las confidencias: una amistad podría ponerse a prueba por un malentendido o un secreto revelado.",
    "horoscope.data.descriptions.cancer.0":
      "Tu intuición está especialmente desarrollada hoy. Sigue tu corazón; te guiará hacia las decisiones correctas.",
    "horoscope.data.descriptions.cancer.1":
      "Este día podría marearte. No dejes que las pequeñas molestias te abrumen. Una energía interior te apoya positivamente, así que cuida tu sistema nervioso y date un respiro del día a día.",
    "horoscope.data.descriptions.cancer.2":
      "La familia y los amigos juegan un papel clave en tu bienestar hoy. Escucha y ofrece tu apoyo.",
    "horoscope.data.descriptions.cancer.3":
      "Un pequeño momento de relajación podría hacer maravillas para tu energía. Considera meditar o tomar un baño relajante.",
    "horoscope.data.descriptions.cancer.4":
      "La Luna ilumina tu sensibilidad y fortalece los lazos familiares. Es un momento especial para expresar tus sentimientos.",
    "horoscope.data.descriptions.cancer.5":
      "Tu bondad natural atrae confidencias y fortalece tus amistades. Eres un refugio para quienes te rodean.",
    "horoscope.data.descriptions.cancer.6":
      "Hoy es un día perfecto para expresar tus emociones y compartir tus sentimientos con sinceridad, fortaleciendo tus relaciones.",
    "horoscope.data.descriptions.cancer.7":
      "Tu empatía natural te permite comprender profundamente a los demás y brindarles un apoyo valioso.",
    "horoscope.data.descriptions.cancer.8":
      "Tus relaciones hoy se caracterizan por la amistad y la complicidad. Busca la atención y el apoyo de tu entorno, mientras permaneces atento a sus necesidades y a las tuyas, sin descuidar ninguna.",
    "horoscope.data.descriptions.cancer.9":
      "Tu hogar se convierte en un verdadero refugio de paz y felicidad, ideal para el descanso y la serenidad.",
    "horoscope.data.descriptions.cancer.10":
      "Una fuerte intuición te guía hacia la decisión correcta, incluso en situaciones complejas o inciertas.",
    "horoscope.data.descriptions.cancer.11":
      "Los recuerdos de tu infancia te inspiran positivamente y te recuerdan los valores esenciales que te motivan.",
    "horoscope.data.descriptions.cancer.12":
      "Se te pedirá que muestres diplomacia, y hay algo positivo que obtener de ello. A través de tus pasatiempos favoritos encontrarás formas de relajarte. Deja tus preocupaciones a un lado.",
    "horoscope.data.descriptions.cancer.13":
      "Tus vínculos con nuevos conocidos llenarán los vacíos y carencias que sientes. Tu gusto pronunciado por las cosas buenas podría llevarte a algunos excesos, así que ve con calma.",
    "horoscope.data.descriptions.cancer.14":
      "Una reconciliación familiar trae una profunda armonía e instala un clima de paz en tu entorno.",
    "horoscope.data.descriptions.leo.0":
      "Tu magnetismo atrae las miradas hoy, especialmente en el amor. Si estás en pareja, ten cuidado de no provocar celos. En el trabajo, tus ideas brillantes cautivan, pero tómate el tiempo para defenderlas bien. Un reconocimiento inesperado podría halagar tu ego.",
    "horoscope.data.descriptions.leo.1":
      "Se presenta una oportunidad profesional, pero requiere coraje y compromiso total. No dejes que tus miedos saboteen tu impulso. En lo personal, un cercano podría necesitar tu apoyo. Presta atención a las señales a tu alrededor.",
    "horoscope.data.descriptions.leo.2":
      "En tu familia, una conversación importante aclara una situación confusa. Aunque las palabras puedan ser duras, permitirán avanzar. En el amor, la sinceridad será tu mejor aliada. La verdad fortalecerá tus lazos.",
    "horoscope.data.descriptions.leo.3":
      "Un encuentro amistoso podría convertirse en una complicidad sólida. Necesitas rodearte de personas auténticas y bondadosas. En el trabajo, tu creatividad te ayuda a superar un obstáculo. Deja que tus intuiciones guíen tus decisiones.",
    "horoscope.data.descriptions.leo.4":
      "La suerte te sonríe hoy, pero solo si te atreves a provocarla. Una sorpresa agradable puede aparecer en tu vida amorosa. En finanzas, evita gastos impulsivos. Un pequeño gesto de generosidad podría traerte grandes beneficios más adelante.",
    "horoscope.data.descriptions.leo.5":
      "Estás lleno de energía y entusiasmo, pero tu cuerpo también necesita descanso. No descuides tu equilibrio interior. Un proyecto que te importa empieza a tomar forma. Permite que tus seres queridos compartan tu alegría.",
    "horoscope.data.descriptions.leo.6":
      "Los celos de alguien cercano podrían alterar tu tranquilidad. Mantente alerta sin caer en la desconfianza excesiva. En el amor, prioriza la ternura sobre la confrontación. Tu luz interior es tu mejor protección.",
    "horoscope.data.descriptions.leo.7":
      "Imprevistos financieros podrían desestabilizarte, pero nada insuperable. Tómate el tiempo de analizar antes de reaccionar. En tus relaciones, la sinceridad de un amigo te ayudará a mantener el rumbo. Un apoyo externo podría sorprenderte positivamente.",
    "horoscope.data.descriptions.leo.8":
      "Los solteros podrían conocer a alguien que despierte su corazón. Para las parejas, un momento de complicidad fortalece la unión. En el trabajo, tus esfuerzos constantes comienzan a dar frutos. El día trae esperanza y renovado impulso.",
    "horoscope.data.descriptions.leo.9":
      "Tu trabajo es reconocido y podría traerte una gran oportunidad, pero un rival celoso podría intentar frenarte. No dejes que las críticas afecten tu confianza. En lo personal, tómate tiempo para respirar y disfrutar tus pequeñas victorias.",
    "horoscope.data.descriptions.leo.10":
      "La calidez de un momento familiar o con tus seres queridos te renueva profundamente. Te das cuenta de que tu felicidad pasa por estos instantes simples. En el amor, una palabra tierna sana tensiones recientes. La serenidad vuelve poco a poco.",
    "horoscope.data.descriptions.leo.11":
      "El regreso de un viejo amigo o alguien del pasado despierta buenos recuerdos. Este vínculo puede transformarse en un proyecto constructivo o en un apoyo inesperado. En el amor, sentimientos enterrados resurgen. Día lleno de emociones.",
    "horoscope.data.descriptions.leo.12":
      "Un encuentro fortuito podría alterar tus hábitos y abrir una puerta inesperada. Deja que la sorpresa actúe sin intentar controlar todo. Profesionalmente, puede surgir una propuesta original. Mantente abierto a las sincronicidades.",
    "horoscope.data.descriptions.leo.13":
      "Tu deseo de reconocimiento es fuerte hoy, pero no pidas demasiado a tus seres queridos o colegas. En el amor, un gesto tierno vale más que mil palabras. Inspiras a otros, pero mantente auténtico.",
    "horoscope.data.descriptions.leo.14":
      "Se impone una decisión importante, y tu intuición te guiará por el camino correcto. No te dejes influir por opiniones contradictorias. En relaciones, la franqueza es clave. La claridad de hoy marcará un giro significativo.",
    "horoscope.data.descriptions.virgo.0":
      "Tu sentido del detalle está afinado hoy, lo que te ayuda a resolver un problema delicado. En el amor, evita ser demasiado crítico, tu exigencia puede herir. En finanzas, la gestión prudente ya da frutos.",
    "horoscope.data.descriptions.virgo.1":
      "Alguien cercano podría poner a prueba tu paciencia. Mantén la calma y evita caer en conflictos innecesarios. Tu sabiduría natural te permitirá salir ganador.",
    "horoscope.data.descriptions.virgo.2":
      "El amor toma un lugar importante hoy. Si estás soltero, un encuentro prometedor podría despertar tu curiosidad. En pareja, valora las pequeñas atenciones que consolidan los lazos diarios.",
    "horoscope.data.descriptions.virgo.3":
      "Tu organización y seriedad impresionan a los colegas. Puede que te confíen una nueva responsabilidad. Aunque requiera esfuerzo extra, este reconocimiento será beneficioso a largo plazo.",
    "horoscope.data.descriptions.virgo.4":
      "Tu sensibilidad está destacada hoy. Alguien cercano podría necesitar tu escucha. Muestra empatía, pero no cargues con todas las cargas ajenas. Cuida también tu propio equilibrio.",
    "horoscope.data.descriptions.virgo.5":
      "Se vislumbra una oportunidad financiera o material. Pero cuidado con decisiones precipitadas. Analiza cada detalle antes de comprometerte; tu prudencia habitual es tu mejor aliada.",
    "horoscope.data.descriptions.virgo.6":
      "Tu espíritu crítico es fuerte hoy, pero puede generar tensiones con los cercanos. Convierte esta energía en consejos constructivos en lugar de reproches. Tu claridad será vista como apoyo.",
    "horoscope.data.descriptions.virgo.7":
      "Una pequeña disputa podría alterar tu día, pero aclarará una situación confusa. Acepta este momento como paso necesario para avanzar hacia relaciones más sinceras.",
    "horoscope.data.descriptions.virgo.8":
      "Sientes necesidad de hacer limpieza, ya sea en tus cosas, relaciones o hábitos. Esta purificación te permitirá ver con claridad y empezar con mejores bases.",
    "horoscope.data.descriptions.virgo.9":
      "La suerte te acompaña hoy, pero solo si te atreves a salir de tu zona de confort. Un encuentro o idea podría abrir nuevas y positivas perspectivas. No dejes que las dudas frenen este impulso.",
    "horoscope.data.descriptions.virgo.10":
      "Tu sentido de lealtad es valorado por tus amigos. Pero cuida de no olvidarte a ti mismo al dar demasiado. Tus necesidades personales son tan importantes como las de los demás.",
    "horoscope.data.descriptions.virgo.11":
      "Un imprevisto en trabajo o casa te obliga a replantear tus planes. Aunque moleste, esta adaptación traerá una solución más eficaz. Confía en el proceso.",
    "horoscope.data.descriptions.virgo.12":
      "El amor podría sorprenderte donde menos lo esperas. Mantente atento a señales y gestos discretos. Para parejas, un momento tierno fortalece los lazos y reaviva la chispa.",
    "horoscope.data.descriptions.virgo.13":
      "Tu mente está en ebullición hoy, llena de ideas nuevas. Canaliza esta creatividad en proyectos concretos en lugar de demasiadas reflexiones. Paso a paso, tus esfuerzos darán frutos.",
    "horoscope.data.descriptions.virgo.14":
      "Una revelación o confidencia podría sacudir tus certezas. Aunque la verdad a veces duela, te liberará de un peso. Acepta el cambio con sabiduría y apertura.",
    "horoscope.data.descriptions.libra.0":
      "Tu encanto natural atrae miradas hoy. En el amor, un encuentro podría despertar tu corazón. En pareja, un momento romántico aporta equilibrio y complicidad.",
    "horoscope.data.descriptions.libra.1":
      "Puede surgir un desacuerdo en tu entorno. Sé diplomático y evita juicios apresurados. Tu capacidad de justicia será clave para restaurar la armonía.",
    "horoscope.data.descriptions.libra.2":
      "Tus habilidades sociales brillan hoy. Aprovecha para fortalecer lazos amistosos y profesionales. Una conversación sincera puede abrir una gran oportunidad.",
    "horoscope.data.descriptions.libra.3":
      "Se presenta una decisión importante. No dejes que la indecisión te bloquee. Escucha tu intuición y sopesa pros y contras con sabiduría; la respuesta vendrá naturalmente.",
    "horoscope.data.descriptions.libra.4":
      "Tu equilibrio interior se pone a prueba. Demasiadas responsabilidades podrían agotarte. Toma distancia, delega si puedes y date un momento solo para ti.",
    "horoscope.data.descriptions.libra.5":
      "Una sorpresa agradable puede iluminar tu día, ya sea un gesto de un ser querido o una oportunidad inesperada. Recíbela con gratitud y optimismo.",
    "horoscope.data.descriptions.libra.6":
      "Un secreto o verdad oculta podría revelarse hoy. Aunque te desestabilice, esta claridad te permitirá avanzar y reforzar futuras decisiones.",
    "horoscope.data.descriptions.libra.7":
      "Sientes la necesidad de fortalecer lazos familiares. Un momento compartido con los seres queridos aporta calor y consuelo. Día ideal para expresar afecto.",
    "horoscope.data.descriptions.libra.8":
      "En el trabajo, tu cooperación es apreciada. Pero cuidado de no eclipsarte ante otros. Haz oír tus ideas, merecen reconocimiento.",
    "horoscope.data.descriptions.libra.9":
      "Tu corazón puede ser puesto a prueba por dudas o vacilaciones. Tómate tiempo para clarificar sentimientos. La sinceridad, aunque delicada, es el camino a la paz interior.",
    "horoscope.data.descriptions.libra.10":
      "Un aumento de confianza te impulsa hacia adelante. Momento ideal para lanzar un proyecto personal o tomar iniciativa audaz. Atrévete, los astros te respaldan.",
    "horoscope.data.descriptions.libra.11":
      "Un encuentro inspirador puede transformar tu visión de una situación. Presta atención a consejos o señales sutiles, llevan respuestas valiosas.",
    "horoscope.data.descriptions.libra.12":
      "Tu búsqueda de armonía puede ser perturbada por alguien celoso o envidioso. No permitas que estas energías negativas te afecten. Mantente centrado en tus objetivos y luz.",
    "horoscope.data.descriptions.libra.13":
      "La suerte parece sonreírte hoy. Surge una oportunidad financiera o relacional. Mantente abierto y aprovecha, podría marcar un giro positivo en tu vida.",
    "horoscope.data.descriptions.libra.14":
      "Tu necesidad de equilibrio guía nuevas elecciones. Ya sea en amor, trabajo o amistades, encuentras el valor de establecer límites justos y necesarios.",
    "horoscope.data.descriptions.scorpio.0":
      "Tu intuición es particularmente fuerte hoy. Sigue tus presentimientos, te guiarán hacia decisiones acertadas, especialmente en amor y amistad.",
    "horoscope.data.descriptions.scorpio.1":
      "Puede surgir tensión en tu entorno. No permitas que los celos o rencores arruinen tus relaciones, apuesta por la franqueza para calmar los ánimos.",
    "horoscope.data.descriptions.scorpio.2":
      "Podrías encontrarte con alguien intrigante que despierte tu curiosidad y emociones. Este encuentro podría alterar tus certezas.",
    "horoscope.data.descriptions.scorpio.3":
      "Tu determinación impresiona. Día ideal para avanzar profesionalmente o aclarar una situación que lleva tiempo pendiente.",
    "horoscope.data.descriptions.scorpio.4":
      "Un secreto bien guardado podría revelarse. Aunque te sorprenda, esta revelación te ayudará a avanzar y comprender mejor a tu entorno.",
    "horoscope.data.descriptions.scorpio.5":
      "Tu intensidad atrae y a la vez desestabiliza. Usa esta energía para seducir o fortalecer vínculos afectivos, evitando excesos de posesividad.",
    "horoscope.data.descriptions.scorpio.6":
      "Podría presentarse una propuesta inesperada. Antes de aceptar, analiza los detalles: no todo es lo que parece.",
    "horoscope.data.descriptions.scorpio.7":
      "Sientes la necesidad de aislarte para reflexionar. Esta introspección te permitirá clarificar prioridades y recuperar tu equilibrio interior.",
    "horoscope.data.descriptions.scorpio.8":
      "Un proyecto o idea que llevas tiempo desarrollando encuentra un impulso favorable. Tu perseverancia empieza a dar frutos.",
    "horoscope.data.descriptions.scorpio.9":
      "Cuidado con malentendidos amorosos. Tus emociones intensas pueden nublar la comunicación. Mantente calmado y expresa tus sentimientos con suavidad.",
    "horoscope.data.descriptions.scorpio.10":
      "Tu magnetismo es poderoso hoy. Podrías captar la atención de alguien importante para tus proyectos futuros.",
    "horoscope.data.descriptions.scorpio.11":
      "Los celos o la competencia de alguien cercano podrían aparecer. Protege tu energía y evita conflictos innecesarios.",
    "horoscope.data.descriptions.scorpio.12":
      "Tu pasión es un motor increíble, pero evita agotarte. Tómate pausas para preservar tu equilibrio emocional y físico.",
    "horoscope.data.descriptions.scorpio.13":
      "Una buena noticia podría iluminar tu día, ya sea en lo profesional, afectivo o financiero. Recíbela con confianza.",
    "horoscope.data.descriptions.scorpio.14":
      "Tu poder de transformación está en su punto máximo. Aprovecha esta energía para cerrar un capítulo difícil y empezar uno nuevo más luminoso.",
    "horoscope.data.descriptions.sagittarius.0":
      "Tu optimismo natural ilumina tu día. Aprovecha para emprender algo nuevo y compartir tu alegría con los demás.",
    "horoscope.data.descriptions.sagittarius.1":
      "Un encuentro inesperado podría despertar tu curiosidad y emociones. Sé abierto a nuevas personas, podrían sorprenderte.",
    "horoscope.data.descriptions.sagittarius.2":
      "Tu espíritu aventurero te impulsa a explorar ideas o lugares nuevos. Evita dispersarte, enfócate en lo importante.",
    "horoscope.data.descriptions.sagittarius.3":
      "En el trabajo se presenta una oportunidad. Aprovecha, pero revisa los detalles para evitar malentendidos o decepciones.",
    "horoscope.data.descriptions.sagittarius.4":
      "Tus amigos cuentan con tu energía positiva. Puede surgir una disputa, pero tu diplomacia restaurará la armonía rápidamente.",
    "horoscope.data.descriptions.sagittarius.5":
      "El amor está favorecido hoy. Un gesto tierno o palabra sincera puede fortalecer lazos o provocar un encuentro memorable.",
    "horoscope.data.descriptions.sagittarius.6":
      "Podrías sentir tentación de excesos o gastos impulsivos. Mantén tu equilibrio y evita futuros arrepentimientos.",
    "horoscope.data.descriptions.sagittarius.7":
      "Tu creatividad e ideas originales están destacadas. Exprésalas plenamente, podrían inspirar a tu entorno y abrir nuevas puertas.",
    "horoscope.data.descriptions.sagittarius.8":
      "Puede revelarse una verdad oculta o confidencia. Mantente atento y evita malentendidos en tus relaciones.",
    "horoscope.data.descriptions.sagittarius.9":
      "Día propicio para viajes o aprendizaje. Amplía horizontes y descubre algo nuevo sobre ti mismo.",
    "horoscope.data.descriptions.sagittarius.10":
      "Tu humor y ligereza atraen a los demás. Comparte estos momentos, pero mantente sincero para evitar falsedades.",
    "horoscope.data.descriptions.sagittarius.11":
      "Puede surgir un desafío u obstáculo. Tu perseverancia y entusiasmo te permitirán superarlo exitosamente.",
    "horoscope.data.descriptions.sagittarius.12":
      "Atento a tensiones familiares. Escucha y comprende las necesidades de cada uno para evitar conflictos.",
    "horoscope.data.descriptions.sagittarius.13":
      "Tu intuición se refuerza hoy. Sigue tus sentimientos en decisiones, sobre todo en amor y amistad.",
    "horoscope.data.descriptions.sagittarius.14":
      "Una energía favorable te acompaña para realizar proyectos. Aprovecha este apoyo cósmico para avanzar en tus metas y felicidad.",
    "horoscope.data.descriptions.capricorn.0":
      "Tu seriedad y perseverancia atraen admiración hoy. Momento ideal para avanzar en un proyecto importante.",
    "horoscope.data.descriptions.capricorn.1":
      "Alguien cercano podría sorprenderte con sus reacciones. Mantente atento y no saques conclusiones rápidas.",
    "horoscope.data.descriptions.capricorn.2":
      "Tu sentido de organización te permite manejar responsabilidades con eficacia. No olvides relajarte de vez en cuando.",
    "horoscope.data.descriptions.capricorn.3":
      "Surge una oportunidad profesional o financiera. Analízala con cuidado antes de decidir.",
    "horoscope.data.descriptions.capricorn.4":
      "Tu lealtad y fidelidad son apreciadas, pero evita ser explotado. Establece límites claros si es necesario.",
    "horoscope.data.descriptions.capricorn.5":
      "Un momento agradable con un ser querido podría fortalecer lazos afectivos o familiares. Aprovecha esta complicidad.",
    "horoscope.data.descriptions.capricorn.6":
      "Podrías sentir tentación de excesos o gastos impulsivos. Mantente prudente para evitar arrepentimientos.",
    "horoscope.data.descriptions.capricorn.7":
      "Una idea creativa o proyecto dejado de lado encuentra impulso favorable. No dudes en concretarlo.",
    "horoscope.data.descriptions.capricorn.8":
      "Una verdad oculta o secreto podría revelarse. Tómate tiempo para comprender antes de reaccionar.",
    "horoscope.data.descriptions.capricorn.9":
      "Tus esfuerzos constantes dan frutos hoy. Momento de recoger resultados de tu trabajo y sacrificios.",
    "horoscope.data.descriptions.capricorn.10":
      "Tu seriedad inspira confianza y respeto. Aprovecha para mostrar habilidades y talentos.",
    "horoscope.data.descriptions.capricorn.11":
      "Atento a tensiones en el ámbito profesional o familiar. Mantén la calma y prioriza diálogo para desactivar conflictos.",
    "horoscope.data.descriptions.capricorn.12":
      "Tu intuición está particularmente fina. Sigue tus presentimientos para tomar decisiones acertadas, sobre todo en amor y amistad.",
    "horoscope.data.descriptions.capricorn.13":
      "Día propicio para contactos e intercambios enriquecedores. Un encuentro o conversación podría aportar nuevas perspectivas.",
    "horoscope.data.descriptions.capricorn.14":
      "Tu perseverancia y disciplina ayudan a superar obstáculos. Una energía favorable acompaña tus acciones, aprovéchala.",
    "horoscope.data.descriptions.aquarius.0":
      "Tu originalidad y creatividad destacan hoy. Comparte tus ideas, podrían inspirar a tu entorno.",
    "horoscope.data.descriptions.aquarius.1":
      "Un encuentro inesperado puede despertar curiosidad y emociones. Presta atención, esta persona podría marcar tu día.",
    "horoscope.data.descriptions.aquarius.2":
      "Tu espíritu innovador está en su apogeo. Aprovecha para experimentar nuevas metodologías en trabajo o proyectos personales.",
    "horoscope.data.descriptions.aquarius.3":
      "Cuidado con malentendidos con un cercano. Escucha antes de reaccionar; claridad y paciencia evitarán conflictos.",
    "horoscope.data.descriptions.aquarius.4":
      "Puede presentarse una oportunidad sorprendente. Analízala antes de comprometerte, no todo es lo que parece.",
    "horoscope.data.descriptions.aquarius.5":
      "Tu energía comunicativa atrae atención de otros. Momento ideal para fortalecer lazos amistosos o profesionales.",
    "horoscope.data.descriptions.aquarius.6":
      "Un momento de soledad te permitirá recargar energía y reflexionar sobre prioridades. Escucha tus necesidades interiores.",
    "horoscope.data.descriptions.aquarius.7":
      "Tus ideas originales podrían causar admiración… y algo de envidia. Mantente enfocado en objetivos e ignora distracciones.",
    "horoscope.data.descriptions.aquarius.8":
      "Una sorpresa agradable puede alegrar tu día, ya sea mensaje, gesto o proyecto que toma forma.",
    "horoscope.data.descriptions.aquarius.9":
      "Tu sentido de justicia y equilibrio es solicitado hoy. Ayuda a calmar tensiones, tu rol es importante.",
    "horoscope.data.descriptions.aquarius.10":
      "Cuidado con excesos o decisiones impulsivas. Reflexiona y sopesa pros y contras antes de actuar.",
    "horoscope.data.descriptions.aquarius.11":
      "Una verdad oculta o secreto podría revelarse. Mantén calma y usa información para mejorar relaciones o proyectos.",
    "horoscope.data.descriptions.aquarius.12":
      "Tus relaciones amorosas o amistosas están favorecidas. Gesto sincero o palabra tierna puede fortalecer vínculos y crear recuerdos.",
    "horoscope.data.descriptions.aquarius.13":
      "Una idea o proyecto antiguo podría renacer bajo nueva luz. Momento de darle vida y concretar aspiraciones.",
    "horoscope.data.descriptions.aquarius.14":
      "Tu energía e intuición te guían hacia elecciones positivas. Aprovecha el día para avanzar con confianza y audacia.",
    "horoscope.data.descriptions.pisces.0":
      "Tu sensibilidad es tu fuerza hoy. Escucha emociones, te guiarán en relaciones y decisiones.",
    "horoscope.data.descriptions.pisces.1":
      "Alguien cercano puede sorprenderte con franqueza. Mantente abierto y atento para evitar malentendidos.",
    "horoscope.data.descriptions.pisces.2":
      "Tu creatividad está en su apogeo. Exprésala en ideas artísticas u originales en tus proyectos.",
    "horoscope.data.descriptions.pisces.3":
      "Atento a decisiones impulsivas, especialmente financieras. Reflexiona antes de comprometerte.",
    "horoscope.data.descriptions.pisces.4":
      "Tus relaciones amistosas están favorecidas. Un gesto o palabra sincera puede fortalecer vínculos y traer alegría.",
    "horoscope.data.descriptions.pisces.5":
      "Día propicio para introspección. Tómate tiempo para reconectar con tus necesidades y deseos profundos.",
    "horoscope.data.descriptions.pisces.6":
      "Puede presentarse oportunidad inesperada. Evalúa con discernimiento antes de lanzarte.",
    "horoscope.data.descriptions.pisces.7":
      "Tu intuición está especialmente afinada hoy. Confía en ella para decisiones personales y profesionales.",
    "horoscope.data.descriptions.pisces.8":
      "Alguien cercano puede buscar tu apoyo. Escúchalo atentamente y ofrece empatía sin descuidarte.",
    "horoscope.data.descriptions.pisces.9":
      "Sorpresa romántica o afectiva puede alegrar tu día. Mantente abierto a señales y gestos de cariño.",
    "horoscope.data.descriptions.pisces.10":
      "Pueden surgir tensiones menores. Mantén calma y comunica para evitar conflictos.",
    "horoscope.data.descriptions.pisces.11":
      "Tu sentido de compasión atrae a otros hacia ti. Crea vínculos sinceros y duraderos.",
    "horoscope.data.descriptions.pisces.12":
      "Proyecto antiguo puede recibir nuevo impulso. Momento ideal para concretar ideas y ambiciones.",
    "horoscope.data.descriptions.pisces.13":
      "Emociones intensas y enriquecedoras hoy. Canalízalas para fortalecer relaciones e iniciativas.",
    "horoscope.data.descriptions.pisces.14":
      "Energía positiva te acompaña todo el día. Sigue intuiciones y deja que corazón guíe decisiones.",

    // Mensajes finales variados
    "horoscope.message.var1":
      "{genderText} {name}, como {zodiacSign}, tienes esta hermosa energía que atrae cosas buenas. ¡Confía en las estrellas y en tu intuición hoy!",
    "horoscope.message.var2":
      "{genderText} {name}, tu signo {zodiacSign} te trae energía positiva hoy. ¡Déjate guiar por las estrellas!",
    "horoscope.message.var3":
      "Querido/a {zodiacSign} {name}, las estrellas te sonríen hoy. ¡Disfruta de esta hermosa energía cósmica que te rodea!",
    "horoscope.message.var4":
      "{genderText} {name}, tu {zodiacSign} brilla hoy. ¡Que este día te traiga alegría y serenidad!",
    "horoscope.message.var5":
      "¡Las estrellas te bendicen hoy, {name}! Como {zodiacSign}, estás en perfecta armonía con el universo.",

    // Variaciones para la compatibilidad
    "horoscope.compatibility.var1":
      "Compatibilidad: Hoy te llevarás especialmente bien con los signos {compatibility}. ¡Es el momento ideal para fortalecer tus relaciones!",
    "horoscope.compatibility.var2":
      "Afinidades: Los signos {compatibility} vibran hoy en tu misma sintonía. ¡Aprovecha esta armonía!",
    "horoscope.compatibility.var3":
      "Conexiones especiales: {compatibility} serán tus aliados perfectos hoy. ¡Una hermosa complicidad te espera!",
    "horoscope.compatibility.var4":
      "Conexiones cósmicas: La energía de los signos {compatibility} armoniza maravillosamente con la tuya. ¡Déjate llevar por esta sinergia!",
    "horoscope.compatibility.var5":
      "Armonías astrales: {compatibility} comparten tus vibraciones hoy. ¡Estos encuentros pueden ser mágicos!",
    "horoscope.compatibility.var6":
      "Complicidad estelar: Los nativos de {compatibility} entienden intuitivamente tu estado de ánimo hoy. ¡Cultiva estos lazos preciosos!",
    "horoscope.compatibility.var7":
      "Sinergias planetarias: {compatibility} están en perfecta resonancia con tu energía hoy. ¡Se acerca una colaboración fructífera!",
    "horoscope.compatibility.var8":
      "Comprensión celestial: {compatibility} comparten tu visión hoy. ¡Es el momento perfecto para profundizar tus intercambios!",

    // Variaciones del estado de ánimo
    "horoscope.mood.var1":
      "Tu estado de ánimo hoy: {mood}\nEsta energía te acompañará durante todo el día. ¡Aprovéchala para hacer lo que te hace sentir bien!",
    "horoscope.mood.var2":
      "Estado de ánimo del día: {mood}\n¡Deja que esta vibración positiva guíe tus acciones y decisiones hoy!",
    "horoscope.mood.var3":
      "Energía dominante: {mood}\n¡Es el momento perfecto para canalizar esta fuerza interior hacia tus proyectos!",
    "horoscope.mood.var4":
      "Atmósfera cósmica: {mood}\n¡Irradias esta hermosa energía que atrae todas las cosas buenas hacia ti!",
    "horoscope.mood.var5":
      "Vibración astral: {mood}\n¡Este estado de ánimo especial llenará tu día de mil matices positivos!",
    "horoscope.mood.var6":
      "Influencia planetaria: {mood}\n¡Abraza esta energía única y deja que transforme tu día en algo extraordinario!",

    // Horoscope Data Translations - Moods (French server keys with Spanish values)
    "horoscope.data.moods.Énergique": "Enérgico",
    "horoscope.data.moods.Confiant": "Confiado",
    "horoscope.data.moods.Déterminé": "Determinado",
    "horoscope.data.moods.Passionné": "Apasionado",
    "horoscope.data.moods.Optimiste": "Optimista",
    "horoscope.data.moods.Dynamique": "Dinámico",
    "horoscope.data.moods.Paisible": "Pacífico",
    "horoscope.data.moods.Sensuel": "Sensual",
    "horoscope.data.moods.Stable": "Estable",
    "horoscope.data.moods.Généreux": "Generoso",
    "horoscope.data.moods.Patient": "Paciente",
    "horoscope.data.moods.Harmonieux": "Armonioso",
    "horoscope.data.moods.Curieux": "Curioso",
    "horoscope.data.moods.Communicatif": "Comunicativo",
    "horoscope.data.moods.Vif": "Vivo",
    "horoscope.data.moods.Sociable": "Sociable",
    "horoscope.data.moods.Adaptable": "Adaptable",
    "horoscope.data.moods.Créatif": "Creativo",
    "horoscope.data.moods.Émotionnel": "Emocional",
    "horoscope.data.moods.Protecteur": "Protector",
    "horoscope.data.moods.Intuitif": "Intuitivo",
    "horoscope.data.moods.Tendre": "Tierno",
    "horoscope.data.moods.Maternel": "Maternal",
    "horoscope.data.moods.Empathique": "Empático",
    "horoscope.data.moods.Rayonnant": "Radiante",
    "horoscope.data.moods.Majestueux": "Majestuoso",
    "horoscope.data.moods.Charismatique": "Carismático",
    "horoscope.data.moods.Théâtral": "Teatral",
    "horoscope.data.moods.Méthodique": "Metódico",
    "horoscope.data.moods.Serviable": "Servicial",
    "horoscope.data.moods.Précis": "Preciso",
    "horoscope.data.moods.Sage": "Sabio",
    "horoscope.data.moods.Analytique": "Analítico",
    "horoscope.data.moods.Perfectionniste": "Perfeccionista",
    "horoscope.data.moods.Raffiné": "Refinado",
    "horoscope.data.moods.Diplomatique": "Diplomático",
    "horoscope.data.moods.Équilibré": "Equilibrado",
    "horoscope.data.moods.Artistique": "Artístico",
    "horoscope.data.moods.Charmeur": "Encantador",
    "horoscope.data.moods.Intense": "Intenso",
    "horoscope.data.moods.Mystérieux": "Misterioso",
    "horoscope.data.moods.Transformateur": "Transformador",
    "horoscope.data.moods.Magnétique": "Magnético",
    "horoscope.data.moods.Profond": "Profundo",
    "horoscope.data.moods.Aventurier": "Aventurero",
    "horoscope.data.moods.Philosophe": "Filosófico",
    "horoscope.data.moods.Libre": "Libre",
    "horoscope.data.moods.Explorateur": "Explorador",
    "horoscope.data.moods.Enthousiaste": "Entusiasta",
    "horoscope.data.moods.Ambitieux": "Ambicioso",
    "horoscope.data.moods.Responsable": "Responsable",
    "horoscope.data.moods.Persévérant": "Perseverante",
    "horoscope.data.moods.Discipliné": "Disciplinado",
    "horoscope.data.moods.Pragmatique": "Pragmático",
    "horoscope.data.moods.Visionnaire": "Visionario",
    "horoscope.data.moods.Indépendant": "Independiente",
    "horoscope.data.moods.Humaniste": "Humanista",
    "horoscope.data.moods.Original": "Original",
    "horoscope.data.moods.Innovateur": "Innovador",
    "horoscope.data.moods.Altruiste": "Altruista",
    "horoscope.data.moods.Compassionnel": "Compasivo",
    "horoscope.data.moods.Spirituel": "Espiritual",
    "horoscope.data.moods.Rêveur": "Soñador",
    "horoscope.data.moods.Sensible": "Sensible",

    // Horoscope Data Translations - Colors (French server keys with Spanish values)
    "horoscope.data.colors.Rouge": "Rojo",
    "horoscope.data.colors.Orange vif": "Naranja brillante",
    "horoscope.data.colors.Bordeaux": "Burdeos",
    "horoscope.data.colors.Corail": "Coral",
    "horoscope.data.colors.Écarlate": "Escarlata",
    "horoscope.data.colors.Vermillon": "Bermellón",
    "horoscope.data.colors.Vert émeraude": "Verde esmeralda",
    "horoscope.data.colors.Rose tendre": "Rosa suave",
    "horoscope.data.colors.Beige doré": "Beige dorado",
    "horoscope.data.colors.Terre de Sienne": "Tierra de Siena",
    "horoscope.data.colors.Vert olive": "Verde oliva",
    "horoscope.data.colors.Rose poudré": "Rosa empolvado",
    "horoscope.data.colors.Jaune citron": "Amarillo limón",
    "horoscope.data.colors.Bleu ciel": "Azul cielo",
    "horoscope.data.colors.Argent": "Plata",
    "horoscope.data.colors.Lavande": "Lavanda",
    "horoscope.data.colors.Jaune d'or": "Amarillo dorado",
    "horoscope.data.colors.Bleu pervenche": "Azul pervinca",
    "horoscope.data.colors.Blanc nacré": "Blanco nacarado",
    "horoscope.data.colors.Bleu océan": "Azul océano",
    "horoscope.data.colors.Argent lunaire": "Plata lunar",
    "horoscope.data.colors.Rose pâle": "Rosa pálido",
    "horoscope.data.colors.Perle": "Perla",
    "horoscope.data.colors.Bleu laiteux": "Azul lechoso",
    "horoscope.data.colors.Or": "Oro",
    "horoscope.data.colors.Orange solaire": "Naranja solar",
    "horoscope.data.colors.Jaune impérial": "Amarillo imperial",
    "horoscope.data.colors.Rouge royal": "Rojo real",
    "horoscope.data.colors.Doré": "Dorado",
    "horoscope.data.colors.Ambre": "Ámbar",
    "horoscope.data.colors.Beige naturel": "Beige natural",
    "horoscope.data.colors.Gris perle": "Gris perla",
    "horoscope.data.colors.Bleu marine": "Azul marino",
    "horoscope.data.colors.Taupe": "Topo",
    "horoscope.data.colors.Kaki": "Caqui",
    "horoscope.data.colors.Rose pastel": "Rosa pastel",
    "horoscope.data.colors.Vert menthe": "Verde menta",
    "horoscope.data.colors.Ivoire": "Marfil",
    "horoscope.data.colors.Lilas": "Lila",
    "horoscope.data.colors.Bleu poudré": "Azul empolvado",
    "horoscope.data.colors.Rouge bordeaux": "Rojo burdeos",
    "horoscope.data.colors.Noir profond": "Negro profundo",
    "horoscope.data.colors.Pourpre": "Púrpura",
    "horoscope.data.colors.Grenat": "Granate",
    "horoscope.data.colors.Cramoisi": "Carmesí",
    "horoscope.data.colors.Brun acajou": "Marrón caoba",
    "horoscope.data.colors.Bleu turquoise": "Azul turquesa",
    "horoscope.data.colors.Violet royal": "Violeta real",
    "horoscope.data.colors.Orange mandarine": "Naranja mandarina",
    "horoscope.data.colors.Vert forêt": "Verde bosque",
    "horoscope.data.colors.Indigo": "Índigo",
    "horoscope.data.colors.Cobalt": "Cobalto",
    "horoscope.data.colors.Gris anthracite": "Gris antracita",
    "horoscope.data.colors.Marron chocolat": "Marrón chocolate",
    "horoscope.data.colors.Vert foncé": "Verde oscuro",
    "horoscope.data.colors.Bleu nuit": "Azul noche",
    "horoscope.data.colors.Sépia": "Sepia",
    "horoscope.data.colors.Vert sapin": "Verde abeto",
    "horoscope.data.colors.Bleu électrique": "Azul eléctrico",
    "horoscope.data.colors.Argent métallique": "Plata metálica",
    "horoscope.data.colors.Turquoise": "Turquesa",
    "horoscope.data.colors.Violet": "Violeta",
    "horoscope.data.colors.Néon": "Neón",
    "horoscope.data.colors.Cyan": "Cian",
    "horoscope.data.colors.Vert aqua": "Verde agua",
    "horoscope.data.colors.Violet mystique": "Violeta místico",
    "horoscope.data.colors.Blanc perle": "Blanco perla",
    "horoscope.data.colors.Bleu lagon": "Azul laguna",
    "horoscope.data.colors.Vert d'eau": "Verde agua clara",

    // Horoscope Data Translations - Compatibility (French server keys with Spanish values)
    "horoscope.data.compatibility.Lion, Sagittaire": "Leo, Sagitario",
    "horoscope.data.compatibility.Gémeaux, Verseau": "Géminis, Acuario",
    "horoscope.data.compatibility.Balance, Lion": "Libra, Leo",
    "horoscope.data.compatibility.Verseau, Gémeaux": "Acuario, Géminis",
    "horoscope.data.compatibility.Sagittaire, Balance": "Sagitario, Libra",
    "horoscope.data.compatibility.Lion, Verseau": "Leo, Acuario",
    "horoscope.data.compatibility.Vierge, Capricorne": "Virgo, Capricornio",
    "horoscope.data.compatibility.Cancer, Poissons": "Cáncer, Piscis",
    "horoscope.data.compatibility.Scorpion, Vierge": "Escorpio, Virgo",
    "horoscope.data.compatibility.Capricorne, Cancer": "Capricornio, Cáncer",
    "horoscope.data.compatibility.Poissons, Scorpion": "Piscis, Escorpio",
    "horoscope.data.compatibility.Vierge, Poissons": "Virgo, Piscis",
    "horoscope.data.compatibility.Balance, Verseau": "Libra, Acuario",
    "horoscope.data.compatibility.Bélier, Lion": "Aries, Leo",
    "horoscope.data.compatibility.Verseau, Bélier": "Acuario, Aries",
    "horoscope.data.compatibility.Sagittaire, Gémeaux": "Sagitario, Géminis",
    "horoscope.data.compatibility.Balance, Bélier": "Libra, Aries",
    "horoscope.data.compatibility.Scorpion, Poissons": "Escorpio, Piscis",
    "horoscope.data.compatibility.Taureau, Vierge": "Tauro, Virgo",
    "horoscope.data.compatibility.Capricorne, Scorpion":
      "Capricornio, Escorpio",
    "horoscope.data.compatibility.Poissons, Taureau": "Piscis, Tauro",
    "horoscope.data.compatibility.Bélier, Sagittaire": "Aries, Sagitario",
    "horoscope.data.compatibility.Gémeaux, Balance": "Géminis, Libra",
    "horoscope.data.compatibility.Bélier, Gémeaux": "Aries, Géminis",
    "horoscope.data.compatibility.Verseau, Lion": "Acuario, Leo",
    "horoscope.data.compatibility.Sagittaire, Bélier": "Sagitario, Aries",
    "horoscope.data.compatibility.Gémeaux, Lion": "Géminis, Leo",
    "horoscope.data.compatibility.Cancer, Scorpion": "Cáncer, Escorpio",
    "horoscope.data.compatibility.Vierge, Cancer": "Virgo, Cáncer",
    "horoscope.data.compatibility.Scorpion, Capricorne":
      "Escorpio, Capricornio",
    "horoscope.data.compatibility.Cancer, Vierge": "Cáncer, Virgo",
    "horoscope.data.compatibility.Cancer, Taureau": "Cáncer, Tauro",
    "horoscope.data.compatibility.Vierge, Scorpion": "Virgo, Escorpio",
    "horoscope.data.compatibility.Poissons, Cancer": "Piscis, Cáncer",
    "horoscope.data.compatibility.Taureau, Poissons": "Tauro, Piscis",
    "horoscope.data.compatibility.Cancer, Capricorne": "Cáncer, Capricornio",
    "horoscope.data.compatibility.Lion, Balance": "Leo, Libra",
    "horoscope.data.compatibility.Balance, Sagittaire": "Libra, Sagitario",
    "horoscope.data.compatibility.Gémeaux, Sagittaire": "Géminis, Sagitario",

    // ESPAÑOL - Todas las nuevas traducciones para las variaciones

    // ========== SALUDOS VARIADOS ==========

    // Tirada diaria - variantes
    "interpretation.daily.greeting.var1":
      "¡Hola {name}! Tengo un mensaje especial para ti hoy.",
    "interpretation.daily.greeting.var2":
      "¡Hola {name}! Tu guía diario te espera con impaciencia.",
    "interpretation.daily.greeting.var3":
      "¡Hello {name}! Una hermosa energía te acompaña hoy.",
    "interpretation.daily.greeting.var4":
      "¡Buenos días {name}! Las energías cósmicas han preparado algo para ti.",

    // Tarot - variantes
    "interpretation.tarot.greeting.var1":
      "¡Hola {name}! Tu lectura de Tarot revela aspectos fascinantes de tu vida.",
    "interpretation.tarot.greeting.var2":
      "¡Hello {name}! Las cartas del Tarot tienen mensajes poderosos para ti.",
    "interpretation.tarot.greeting.var3":
      "¡Buenos días {name}! Tu tirada de Tarot desvela verdades importantes.",
    "interpretation.tarot.greeting.var4":
      "¡Hola {name}! Los arcanos del Tarot hablan claramente de tu futuro.",

    // Ángeles - variantes
    "interpretation.angels.greeting.var1":
      "¡Hola {name}! El reino angélico desborda mensajes de amor para ti.",
    "interpretation.angels.greeting.var2":
      "¡Hola {name}! Tus guías celestiales iluminan tu camino hoy.",
    "interpretation.angels.greeting.var3":
      "¡Hello {name}! Los ángeles cantan melodías de guía especialmente para ti.",
    "interpretation.angels.greeting.var4":
      "¡Buenos días {name}! Una sinfonía angélica resuena en las esferas celestiales para ti.",

    // Runas - variantes
    "interpretation.runes.greeting.var1":
      "¡Heil {name}! Las runas de los antiguos hablan de tu herencia vikinga.",
    "interpretation.runes.greeting.var2":
      "¡Hola {name}! El eco de los dioses nórdicos resuena a través de estas runas sagradas.",
    "interpretation.runes.greeting.var3":
      "¡Buenos días {name}! Las runas milenarias revelan la fuerza que duerme en ti.",
    "interpretation.runes.greeting.var4":
      "¡Hello {name}! La sabiduría de los vikingos atraviesa los siglos para guiarte.",

    // ========== TRANSICIONES VARIADAS ==========

    // Transiciones para el pasado
    "interpretation.transition.past.var1":
      "Estas experiencias realmente te han hecho crecer y te han hecho más fuerte{genderSuffix}.",
    "interpretation.transition.past.var2":
      "Estos momentos han forjado tu carácter y tu resistencia.",
    "interpretation.transition.past.var3":
      "Todo esto ha contribuido a formar la persona en que te has convertido{genderSuffix}.",
    "interpretation.transition.past.var4":
      "Estas pruebas te han dado una sabiduría preciosa.",
    "interpretation.transition.past.var5":
      "Es gracias a estas experiencias que has desarrollado tu fuerza interior.",
    "interpretation.transition.past.var6":
      "Estos eventos te han enseñado lecciones importantes sobre la vida.",
    "interpretation.transition.past.var7":
      "Toda esta experiencia ha enriquecido tu alma y tu camino.",
    "interpretation.transition.past.var8":
      "Estos desafíos han revelado tu verdadera naturaleza y determinación.",

    // Transiciones para el presente
    "interpretation.transition.present.var1":
      "Estás en un período importante que anuncia cosas hermosas por venir.",
    "interpretation.transition.present.var2":
      "Esta fase de tu vida abre perspectivas prometedoras.",
    "interpretation.transition.present.var3":
      "Es un momento clave que prepara tu futuro radiante.",
    "interpretation.transition.present.var4":
      "Este período actual sienta las bases de tu éxito futuro.",
    "interpretation.transition.present.var5":
      "Vives una transición que transformará tu vida positivamente.",
    "interpretation.transition.present.var6":
      "Este momento presente porta grandes promesas.",
    "interpretation.transition.present.var7":
      "Esta etapa marca un punto de inflexión positivo en tu existencia.",
    "interpretation.transition.present.var8":
      "Atraviesas una fase que te traerá mucha satisfacción.",

    // Transiciones para el futuro
    "interpretation.transition.future.var1":
      "Esta energía transformará tu vida de manera positiva y duradera.",
    "interpretation.transition.future.var2":
      "Estas influencias traerán cambios maravillosos a tu vida.",
    "interpretation.transition.future.var3":
      "Esta fuerza creará oportunidades extraordinarias para ti.",
    "interpretation.transition.future.var4":
      "Estas vibraciones atraerán todo lo que necesitas.",
    "interpretation.transition.future.var5":
      "Esta energía manifestará tus sueños más queridos.",
    "interpretation.transition.future.var6":
      "Estas influencias divinas iluminarán tu camino.",
    "interpretation.transition.future.var7":
      "Este poder desbloqueará tu potencial oculto.",
    "interpretation.transition.future.var8":
      "Estas energías sincronizarán todos los aspectos de tu vida.",

    // ========== CONSEJOS VARIADOS ==========

    "interpretation.advice.var1":
      "confía en tu instinto. ¡Tienes todo lo que hace falta para triunfar!",
    "interpretation.advice.var2":
      "escucha tu sabiduría interior. ¡Nunca te traicionará!",
    "interpretation.advice.var3":
      "sigue tu corazón y tus intuiciones. ¡Te guían hacia la felicidad!",
    "interpretation.advice.var4":
      "mantente conectad{genderSuffix} a tus valores. ¡Son tu mejor guía!",
    "interpretation.advice.var5":
      "mantén fe en tus capacidades. ¡Eres más fuerte{genderSuffix} de lo que piensas!",
    "interpretation.advice.var6":
      "mantente abiert{genderSuffix} a las oportunidades. ¡El universo trabaja para ti!",
    "interpretation.advice.var7":
      "cultiva tu paciencia. ¡Todo llega en el momento perfecto!",
    "interpretation.advice.var8":
      "mantén tu determinación. ¡Tus esfuerzos serán recompensados!",
    "interpretation.advice.var9":
      "preserva tu optimismo. ¡Atrae las mejores energías!",
    "interpretation.advice.var10":
      "nutre tu confianza. ¡Es la clave de todos tus éxitos!",

    //Variaciones de clave de traducción
    "interpretation.tarot.template.advice.var1":
      "Mi consejo: {name}, con tu naturaleza de {zodiacSign},",
    "interpretation.tarot.template.advice.var2":
      "{genderText} {name}, como {zodiacSign},",
    "interpretation.tarot.template.advice.var3":
      "Escucha bien, {name}: como {zodiacSign},",
    "interpretation.tarot.template.advice.var4":
      "Recuerda esto, {name}, tu esencia de {zodiacSign} es poderosa.",
    "interpretation.tarot.template.advice.var5":
      "{name}, los astros hablan a través de tu naturaleza de {zodiacSign}.",
    "interpretation.tarot.template.advice.var6":
      "Recuerda, {name}: tu signo {zodiacSign} contiene una verdad esencial.",
    "interpretation.tarot.template.advice.var7":
      "{genderText} {name}, tu destino vibra con la energía del {zodiacSign}.",
    "interpretation.tarot.template.advice.var8":
      "Sabe esto, {name}, como {zodiacSign}, llevas una luz única.",

    // Plantillas para el mensaje final
    "interpretation.angels.template.message.var1":
      "Mensaje angelical: {genderText} {name}, con tu esencia de {zodiacSign}",
    "interpretation.angels.template.message.var2":
      "Los ángeles te transmiten, {name}: como {zodiacSign}",
    "interpretation.angels.template.message.var3":
      "Guía celestial, {name}: como un verdadero {zodiacSign}",
    "interpretation.angels.template.message.var4":
      "Bendición angelical, {name}, tu naturaleza de {zodiacSign} brilla",
    "interpretation.angels.template.message.var5":
      "{name}, los ángeles honran tu luz de {zodiacSign}.",
    "interpretation.angels.template.message.var6":
      "Escucha, {name}: tu alma de {zodiacSign} recibe un mensaje divino.",
    "interpretation.angels.template.message.var7":
      "Mensaje celestial para ti, {name} — como {zodiacSign}, estás guiado{genderSuffix}.",
    "interpretation.angels.template.message.var8":
      "Los reinos celestiales te susurran, {name}: tu esencia de {zodiacSign} está despertando.",

    // Crystal Ball Spanish
    "crystalBall.title": "Bola de Cristal Mística",
    "crystalBall.subtitle": "Haz tu pregunta y deja que la magia te guíe",
    "crystalBall.askPrompt": "¿Cuál es tu pregunta?",
    "crystalBall.questionPlaceholder": "Escribe tu pregunta aquí...",
    "crystalBall.submitQuestion": "Consultar la Bola",
    "crystalBall.thinking": "La bola está pensando...",
    "crystalBall.guidance":
    "Escucha tu intuición para interpretar este mensaje",
    "crystalBall.askAnother": "Haz otra pregunta",
    "crystalBall.newQuestion": "Hacer otra pregunta",
    "crystalBall.backHome": "🏠 Volver al inicio",
    "crystalBall.closedQuestionHint": "¿Qué quieres saber? Pregunta a la bola de cristal… pero cuidado: solo responde sí o no...",
    "crystalBall.example.good": "Ej.: ¿Encontraré el amor este año?",
    
    // Español
    "oracle.crystalBall.title": "Bola de Cristal",
    "oracle.crystalBall.description": "Haz tus preguntas a la bola mística",

    // Respuestas Crystal Ball Spanish
    "crystalBall.answers.yes": "Sí",
    "crystalBall.answers.no": "No",
    "crystalBall.answers.maybe": "Quizás",
    "crystalBall.answers.veryLikely": "Muy probable",
    "crystalBall.answers.unlikely": "Poco probable",
    "crystalBall.answers.certain": "Es seguro",
    "crystalBall.answers.noChance": "Ninguna posibilidad",
    "crystalBall.answers.askLater": "La respuesta llegará a su debido tiempo",
    "crystalBall.answers.dontCount": "No cuentes con ello",
    "crystalBall.answers.yesDefinitely": "Sí, absolutamente",
    "crystalBall.answers.signsYes": "Las señales apuntan a que sí",
    "crystalBall.answers.signsNo": "Las señales apuntan a que no",
    "crystalBall.answers.unclear": "Es demasiado pronto para saberlo",
    "crystalBall.answers.trustIntuition": "Confía en tu intuición",

    // Mensaje final Crystal Ball Spanish
    "interpretation.dailyComplete": "Tu lectura diaria ha terminado",
    "interpretation.timeUntilReset":
      "Próxima lectura disponible en {hours}h{minutes}min",
    "interpretation.consultCrystalBall": "Consultar la Bola de Cristal",
    "common.backHome": "Volver al inicio",
    "crystalBall.disclaimer":
      "Las respuestas de la bola de cristal son simbólicas y están destinadas al entretenimiento. Siempre escucha a tu corazón y a tus seres queridos para tomar decisiones en tu vida real.",

    // GRIMOIRE MYSTIQUE
    "grimoire.title": "Grimorio Místico",
    "grimoire.free.title": "Versión gratuita: 3 últimas lecturas guardadas",
    "grimoire.free.subtitle": "¡Pasa a Premium para historial ilimitado!",
    "grimoire.premium.active": "Acceso Premium - Historial Ilimitado",
    "grimoire.empty.title": "Ninguna lectura guardada",
    "grimoire.empty.subtitle": "Comienza tu primera consulta para llenar tu grimorio místico",
    "grimoire.cards.title": "Cartas sacadas:",
    "grimoire.interpretation.show": "Ver interpretación completa",
    "grimoire.interpretation.hide": "Ocultar interpretación",
    "grimoire.notes.title": "Notas personales",
    "grimoire.notes.placeholder": "Añade tus reflexiones...",
    "grimoire.favorite.add": "Añadir a favoritos",
    "grimoire.favorite.remove": "Quitar de favoritos",
    "grimoire.oracle.daily": "Tirada del Día",
    "grimoire.oracle.tarot": "Tarot",
    "grimoire.oracle.angels": "Oráculo de los Ángeles",
    "grimoire.oracle.runes": "Runas Vikingas",
    "grimoire.stats.total": "Total",
      "grimoire.stats.thisMonth": "Este mes",

      "grimoire.clearAll.button": "Borrar todo",
      "grimoire.clearAll.confirm.title": "¿Estás seguro?",
      "grimoire.clearAll.confirm.message": "Esta acción es irreversible. Todas tus lecturas serán eliminadas permanentemente.",
      "grimoire.clearAll.confirm.button": "Sí, borrar todo",

    // MENU LÉGAL
    "legal.menu.title": "Menú legal",
    "legal.mentions": "Aviso legal",
    "legal.privacy": "Política de privacidad",

    // MODAL PREMIUM
    "premium.button.label": "Hazte Premium",
    "premium.title": "¡Elimina los anuncios!",
    "premium.subtitle": "¡Haz tus lecturas sin publicidad!",
    "premium.plan.1month": "1 Mes",
    "premium.plan.1month.subtitle": "Sin compromiso",
    "premium.plan.3months": "3 Meses",
    "premium.plan.3months.subtitle": "Mejor oferta",
    "premium.plan.discount": "-25%",
    "premium.button.subscribe": "Suscríbete ahora",
    "premium.button.select": "Selecciona una oferta",
    "premium.button.processing": "Procesando...",
    "premium.benefits.ads": "Sin anuncios",
    "premium.benefits.grimoire": "Grimorio Místico ilimitado",
    "premium.benefits.notes": "Notas y favoritos",
    "premium.benefits.history": "Historial completo de tus lecturas",
    "premium.confirm.1month": "¿Confirmar el pago de 3,99 € por 1 mes?",
    "premium.confirm.3months": "¿Confirmar el pago de 8,98 € por 3 meses?",
    "premium.success": "¡Suscripción activada con éxito! Disfruta de tu experiencia sin anuncios y del Grimorio ilimitado.",
    "premium.error.activation": "Error al activar la suscripción",
    "premium.error.payment": "Error en el pago. Por favor, inténtalo de nuevo.",
    "premium.manage": "Gestionar mi suscripción (cancelar, facturas...)",
    "premium.expired": "Tu acceso Premium ha expirado",
    "premium.expiringSoon": "Tu acceso Premium expirará pronto",
    "premium.conditions.line1": "🔒 Pago seguro a través de Stripe",
    "premium.conditions.line2": "✓ Pago único, SIN renovación automática",
    "premium.conditions.line3": "No hay reembolso después del pago. El acceso Premium es válido por la duración seleccionada.",
    "premium.conditions.line4": "Se te notificará 3 días antes de que expire tu acceso.",
    "premium.securePaymentBy": "Pago seguro por",
    "premium.restoreSubscription": "Restaurar una suscripción",
    "premium.backToPurchases": "Volver a las compras",
    "premium.payment.googlePlay": "Pago de Google Play",
    "premium.payment.stripe": "Pago web con Stripe",
    "premium.restoreEmailLabel": "Tu correo electrónico",
    "premium.restore": "Restaurar",
    "premium.buy": "Comprar",
    "premium.error.invalidEmail": "El correo electrónico no es válido.",
    "premium.error.noActivePremium": "No se encontró ninguna suscripción activa",
      
    // PREMIUM RESTOR
    "premium.restore.title": "Restaurar mi suscripción",
    "premium.restore.subtitle": "¿Ya eres Premium? Recupera tu acceso",
    "premium.restore.description": "Introduce el correo electrónico utilizado al comprar Premium",
    "premium.restore.button": "Restaurar",
    "premium.restore.verifying": "Verificando...",
    "premium.restore.success": "¡Premium restaurado con éxito!",
    "premium.restore.redirecting": "Redirigiendo...",
    "premium.restore.notFound": "No se encontró una suscripción Premium para este correo electrónico. Verifica la dirección o suscríbete a un nuevo plan.",
    "premium.restore.error": "Ocurrió un error al restaurar. Inténtalo de nuevo.",
    "premium.restore.info": "Debes usar el mismo correo electrónico que cuando compraste Premium en Stripe.",
    "premium.restore.help": "¿Necesitas ayuda?",
    "premium.restore.contact": "Contáctanos",
    "premium.error.emailRequired": "Se requiere correo electrónico.",
    "premium.error.emailInvalid": "El correo electrónico no es válido.",
    "premium.emailLabel": "Tu correo electrónico",
    "premium.emailHelp": "Para recuperar tu suscripción",
    "premium.poweredBy": 'Powered by',
    "premium.backToPurchase": "Volver a las compras",
    "premium.button.loading": "Cargando...",
    "premium.loading.offers": "Cargando ofertas...",
    "premium.button.restoring": "Restaurando...",
    "premium.error.loadFailed": "No se pudieron cargar las ofertas",
    "premium.error.purchaseFailed": "Error durante la compra",
    "premium.error.unknown": "Error desconocido",

    // PAGE PAIEMENT SUCCESS CANCEL
    "payment.success.title": "¡Pago exitoso!",
    "payment.success.verified": "Tu cuenta Premium ha sido activada",
    "payment.success.activating": "Activación en curso...",
    "payment.success.benefits": "¡Disfruta de todas las funciones Premium!",
    "payment.success.noAds": "Sin publicidad",
    "payment.success.unlimitedGrimoire": "Grimorio ilimitado",
    "payment.success.fullHistory": "Historial completo",
    "payment.success.redirecting": "Redirección automática a los oráculos...",
    "payment.cancel.title": "Pago cancelado",
    "payment.cancel.message": "Has cancelado el pago",
    "payment.cancel.retry": "Puedes intentarlo de nuevo en cualquier momento desde el menú Premium",
    "payment.cancel.redirecting": "Volviendo a la selección de oráculos...",

    // Mystery Dice Oracle
    "oracle.bonusRoll.title": "Tirada Bonus",
      "oracle.bonusRoll.description": "Desbloquea tu revelación numerológica secreta",
      "oracle.bonusRoll.ready": "¿Listo para descubrir tu mensaje bonus?",
      "oracle.bonusRoll.rolling": "🎲 Lanzando los dados místicos...",
      "oracle.bonusRoll.loadingAd": "📢 Desbloqueando tu revelación...",
      "oracle.bonusRoll.result": "Resultado",
      "oracle.bonusRoll.cosmicMessage": "Tu mensaje bonus",
      "oracle.bonusRoll.rollButton": "🎲 Lanzar los dados",
      "oracle.bonusRoll.newRoll": "✨ Nueva Tirada Bonus",
      "oracle.bonusRoll.diceResult": "Dados",
    "oracle.bonusRoll.startButton": "🎁 Desbloquear la Tirada de Bonificación",
    "oracle.bonusRoll.exclusiveBadge": 'BONO EXCLUSIVO',
    "oracle.bonusRoll.adRequired": "Debes ver el anuncio completo para acceder a la Tirada Bonus.",
    "oracle.bonusRoll.badge": "BONO EXCLUSIVO",
    "oracle.bonusRoll.pleaseWait": "Un momento por favor",
          
    "oracle.bonusRoll.2.title.1": "🌅 Nuevo Comienzo",
    "oracle.bonusRoll.2.message.1": "Las estrellas se alinean para un nuevo inicio. ¡La Doble Suerte te acompaña hoy!",
    "oracle.bonusRoll.2.title.2": "✨ Renacimiento Cósmico",
    "oracle.bonusRoll.2.message.2": "Un nuevo ciclo comienza en tu vida. El universo te ofrece una segunda oportunidad extraordinaria.",
    "oracle.bonusRoll.2.title.3": "🦋 Transformación Suave",
    "oracle.bonusRoll.2.message.3": "La dualidad del 2 te invita al equilibrio. Se abre una nueva página frente a ti; gírala con confianza.",

    "oracle.bonusRoll.3.title.1": "🔮 Intuición Divina",
    "oracle.bonusRoll.3.message.1": "Tu sexto sentido está en su apogeo. Sigue tu intuición, no te fallará.",
    "oracle.bonusRoll.3.title.2": "👁️ Visión Mística",
    "oracle.bonusRoll.3.message.2": "Los velos se levantan sobre tu percepción. Tu clarividencia alcanza alturas sin igual.",
    "oracle.bonusRoll.3.title.3": "🌙 Sabiduría Interior",
    "oracle.bonusRoll.3.message.3": "El triángulo sagrado del 3 ilumina tu camino. Cuerpo, mente y alma se unen hoy.",

    "oracle.bonusRoll.4.title.1": "🏛️ Fundaciones Sólidas",
    "oracle.bonusRoll.4.message.1": "La estabilidad y la confianza son tus aliados. Tus bases son fuertes, construye con seguridad.",
    "oracle.bonusRoll.4.title.2": "⚓ Anclaje Poderoso",
    "oracle.bonusRoll.4.message.2": "Tu estabilidad es tu fuerza. Construye algo duradero ahora.",
    "oracle.bonusRoll.4.title.3": "🗿 Estructura Divina",
    "oracle.bonusRoll.4.message.3": "Los cuatro elementos te sostienen. Tu determinación es una verdadera fuerza.",

    "oracle.bonusRoll.5.title.1": "✨ Oportunidades Mágicas",
    "oracle.bonusRoll.5.message.1": "El cambio trae sorpresas inesperadas. Mantente abierto a nuevas posibilidades.",
    "oracle.bonusRoll.5.title.2": "🌪️ Viento del Cambio",
    "oracle.bonusRoll.5.message.2": "Se presenta una transformación ante ti. Acoge lo que viene con confianza y valentía.",
    "oracle.bonusRoll.5.title.3": "🎭 Libertad Creativa",
    "oracle.bonusRoll.5.message.3": "El número 5 trae gran liberación. Tu espíritu aventurero finalmente puede expresarse.",

    "oracle.bonusRoll.6.title.1": "⚖️ Armonía Perfecta",
    "oracle.bonusRoll.6.message.1": "El equilibrio reina en tu vida. Disfruta de este período de paz y armonía.",
    "oracle.bonusRoll.6.title.2": "🕊️ Serenidad Absoluta",
    "oracle.bonusRoll.6.message.2": "Tu alma se baña en tranquilidad. Disfruta de este momento de gracia cósmica.",
    "oracle.bonusRoll.6.title.3": "💝 Amor Universal",
    "oracle.bonusRoll.6.message.3": "El número del amor te rodea. Las relaciones y conexiones florecen bajo tu mirada cuidadosa.",

    "oracle.bonusRoll.7.title.1": "🍀 Suerte Mística",
    "oracle.bonusRoll.7.message.1": "¡El número de la suerte te sonríe! Espera sorpresas agradables.",
    "oracle.bonusRoll.7.title.2": "🎰 Fortuna Divina",
    "oracle.bonusRoll.7.message.2": "Los dados del destino caen a tu favor. La providencia te bendice hoy.",
    "oracle.bonusRoll.7.title.3": "🌠 Magia Celestial",
    "oracle.bonusRoll.7.message.3": "El 7 es un número sagrado. El universo conspira milagrosamente a tu favor.",

    "oracle.bonusRoll.8.title.1": "💎 Abundancia Cósmica",
    "oracle.bonusRoll.8.message.1": "El éxito y la prosperidad te rodean. El universo recompensa tus esfuerzos.",
    "oracle.bonusRoll.8.title.2": "👑 Prosperidad Infinita",
    "oracle.bonusRoll.8.message.2": "El flujo de abundancia llega a ti. Tu trabajo da frutos hermosos.",
    "oracle.bonusRoll.8.title.3": "💰 Riqueza Manifestada",
    "oracle.bonusRoll.8.message.3": "El 8 del infinito materializa tus deseos. El éxito material y espiritual van de la mano.",

    "oracle.bonusRoll.9.title.1": "🌱 Evolución Espiritual",
    "oracle.bonusRoll.9.message.1": "Tu crecimiento personal alcanza nuevas alturas. Continúa tu camino.",
    "oracle.bonusRoll.9.title.2": "🦋 Metamorfosis Sagrada",
    "oracle.bonusRoll.9.message.2": "Estás en plena transformación espiritual. Tu alma se eleva hacia la luz.",
    "oracle.bonusRoll.9.title.3": "🌌 Sabiduría Universal",
    "oracle.bonusRoll.9.message.3": "El número 9 marca el fin de un ciclo. ¡Has aprendido y crecido! Tu evolución se convierte en ejemplo para otros.",

    "oracle.bonusRoll.10.title.1": "🎯 Desafíos Estimulantes",
    "oracle.bonusRoll.10.message.1": "Nuevos desafíos te esperan, pero estás listo para enfrentarlos con éxito.",
    "oracle.bonusRoll.10.title.2": "⚔️ Pruebas Formativas",
    "oracle.bonusRoll.10.message.2": "Los obstáculos se convierten en peldaños. Tu determinación transforma todo en victoria.",
    "oracle.bonusRoll.10.title.3": "🔟 Nuevo Ciclo Maestro",
    "oracle.bonusRoll.10.message.3": "El número 10 marca el fin de un capítulo y el comienzo de otro. Renaces más fuerte y sabio.",

    "oracle.bonusRoll.11.title.1": "🔥 Perseverancia Victoriosa",
    "oracle.bonusRoll.11.message.1": "Tu determinación da frutos. El número maestro 11 te guía hacia el éxito.",
    "oracle.bonusRoll.11.title.2": "⚡ Maestro Iluminado",
    "oracle.bonusRoll.11.message.2": "El número sagrado 11 revela tu potencial ilimitado. Tu presencia guía a quienes te rodean.",
    "oracle.bonusRoll.11.title.3": "✨ Despertar Espiritual",
    "oracle.bonusRoll.11.message.3": "El número 11 anuncia una nueva oportunidad. Prepárate para aprovecharla ahora.",

    "oracle.bonusRoll.12.title.1": "👑 Plenitud Total",
    "oracle.bonusRoll.12.message.1": "Has alcanzado un nivel de plenitud donde todo parece estar en armonía y te sientes realizado.",
    "oracle.bonusRoll.12.title.2": "🌟 Perfección Cósmica",
    "oracle.bonusRoll.12.message.2": "Has completado un ciclo importante y te acercas a la excelencia. Todo parece alinearse con tu éxito.",
    "oracle.bonusRoll.12.title.3": "🏆 Triunfo Absoluto",
    "oracle.bonusRoll.12.message.3": "Tu camino alcanza un punto clave con el número 12. Todo encaja y te sientes perfectamente en tu lugar.",

    "oracle.backToOracles": "Volver a los oráculos",
    // Common
    "common.back": "Atrás",
    "common.home": "Inicio",
    "common.language": "Idioma",
  },

  de: {
    // Landing Page
    "landing.title": "CartoMystik",
    "landing.subtitle":
      "Entdecken Sie die Geheimnisse Ihres Schicksals durch Karten, Sterne und alte Weisheit",
    "landing.enter": "EINTRETEN",
    "landing.ads.support": "Werbung hilft uns, die App kostenlos zu halten",

    // 🆕 Disclaimer - HIER HINZUFÜGEN
    "disclaimer.title": "Wichtiger Haftungsausschluss",
      "disclaimer.text": "CartoMystik ist eine App für Unterhaltung und persönliche Entwicklung. Konsultieren Sie qualifizierte Experten für jede wichtige Entscheidung.",
      "disclaimer.note": "Durch die Fortsetzung stimmen Sie zu, diese App nur zu Unterhaltungszwecken zu nutzen.",
      "disclaimer.accept": "Verstanden",
      "disclaimer.legal": "Diese App entspricht der DSGVO.",

    // No-repeat system
    "system.antirepeat.loading": "Die Karten werden gemischt...",
    "system.antirepeat.active": "Anti-Wiederholungs-System aktiv",
    "system.cards.refreshed": "Neue Karten verfügbar",

    // Name Page
    "name.title": "Vorname",
    "name.subtitle":
      "Wie möchten Sie genannt werden? Geben Sie Ihren Namen oder Spitznamen ein",
    "name.placeholder": "Namen eingeben",
    "name.next": "WEITER",

    // Date Page
    "date.title": "Geburtsdatum",
    "date.subtitle":
      "Enthüllen Sie Ihr astrologisches Zeichen für eine personalisierte Wahrsagung",
    "date.day": "Tag",
    "date.month": "Monat",
    "date.year": "Jahr",
    "date.next": "WEITER",
    "date.months.1": "Januar",
    "date.months.2": "Februar",
    "date.months.3": "März",
    "date.months.4": "April",
    "date.months.5": "Mai",
    "date.months.6": "Juni",
    "date.months.7": "Juli",
    "date.months.8": "August",
    "date.months.9": "September",
    "date.months.10": "Oktober",
    "date.months.11": "November",
    "date.months.12": "Dezember",

    // Gender Page
    "gender.title": "Geschlecht",
    "gender.subtitle":
      "Gib dein Geschlecht an, um das Erlebnis zu personalisieren",
    "gender.male": "Männlich",
    "gender.female": "Weiblich",
    "gender.other": "Andere",
    "gender.next": "BEGINNEN",
    "gender.back": "ZURÜCK",

    //Barre de navigation DE
    "menu.open": "Menü öffnen",
      "profile.open": "Profil öffnen",
      "profile.birthdate": "Geburtsdatum",
      "profile.gender": "Geschlecht",
      "profile.zodiac": "Sternzeichen",
      "profile.edit": "Profil bearbeiten",
      "profile.edit.title": "Profil bearbeiten",
      "profile.edit.subtitle": "Aktualisiere deine persönlichen Daten",
      "profile.edit.error": "Bitte fülle alle Felder aus",
      "grimoire.subtitle": "Deine Lesungshistorie",
      "premium.active": "Aktiv",
      "locale": "de-DE",
      "common.cancel": "Abbrechen",
      "common.save": "Speichern",
      "name.label": "Name",
      
    // DE Benachrichtigungen  
    "notification.channel.name": "Tägliche Ziehung",
    "notification.channel.description": "Benachrichtigungen für deine tägliche mystische Kartenlesung",
    "notification.variants.1.title": "✨ Die Sterne rufen dich",
    "notification.variants.1.body": "Entdecke dein Horoskop und deine mystische Tagesziehung!",
    "notification.variants.2.title": "🔮 Dein Schicksal wartet auf dich",
    "notification.variants.2.body": "Sieh dir deine tägliche Ziehung und dein persönliches Horoskop an",
    "notification.variants.3.title": "🌙 Das Geheimnis wird offenbart",
    "notification.variants.3.body": "Deine heutige Ziehung und dein Horoskop sind bereit!",
    "notification.variants.4.title": "⭐ Eine Botschaft der Sterne",
    "notification.variants.4.body": "Entdecke, was die Karten und Sterne heute für dich bereithalten",
    "notification.variants.5.title": "✨ CartoMystik ruft dich",
    "notification.variants.5.body": "Deine tägliche Führung: Kartenlesung und Horoskop jetzt verfügbar",
    "notification.modal.title": "Tägliche Benachrichtigungen",
    "notification.modal.description": "Erhalte jeden Tag um 10 Uhr eine mystische Erinnerung, um deine persönliche Ziehung und dein Horoskop zu entdecken",
    "notification.modal.benefit1": "Tägliche Kartenziehung",
    "notification.modal.benefit2": "Persönliches Horoskop nach deinem Sternzeichen",
    "notification.modal.benefit3": "Verpasse niemals deine tägliche spirituelle Führung",
    "notification.modal.accept": "Benachrichtigungen aktivieren",
    "notification.modal.decline": "Nein, danke",
    "notification.modal.note": "Du kannst diese Einstellung später in den Optionen ändern",

    // Oracle Selection
    "oracle.welcome": "Willkommen {name}!",
    "oracle.subtitle": "Entdecken Sie die Geheimnisse Ihres Schicksals",
    "oracle.daily.title": "Tagesziehung",
    "oracle.daily.description":
      "Eine Karte, die Sie heute führt und inspiriert",
    "oracle.horoscope.title": "Horoskop",
    "oracle.horoscope.description":
      "Entdecken Sie, was Ihnen die Sterne heute nach Ihrem Zeichen bescheren",
    "oracle.tarot.title": "Tarot",
    "oracle.tarot.description":
      "Die 22 Großen Arkana enthüllen die Geheimnisse deines Schicksals",
    "oracle.angels.title": "Engel-Orakel",
    "oracle.angels.description":
      "Verbinden Sie sich mit Ihren Engelsführern, um ihre Botschaften der Liebe zu empfangen",
    "oracle.runes.title": "Nordische Runen",
    "oracle.runes.description":
      "Die alte Weisheit der Wikinger offenbart Ihren Weg des Krieges und des Sieges",
    "oracle.back": "ZURÜCK",
    "oracle.home": "Startseite",

    // Card Game
    "cardgame.back": "Zurück",
    "cardgame.daily.instruction": "Wählen Sie 1 Karte für Ihren Tagesrat",
    "cardgame.reading.instruction":
      "Wähle 3 Karten, um dein Schicksal zu erhellen",
    "cardgame.selected": "Ausgewählte Karten: {current}/{max}",
    "cardgame.reveal": "KARTEN ENTHÜLLEN",
    "cardgame.page": "Seite {current} von {total}",
    "cardgame.previous": "Zurück",
    "cardgame.next": "Weiter",
    "cardgame.daily.choose": "Wähle die Karte, die dich ruft",
    
    // CardGame - Modal de révélation
    "cardgame.cardRevealed": "Karte aufgedeckt",
    "cardgame.continue": "Weiter",
    "cardgame.seeInterpretation": "Interpretation anzeigen",

    // Revelation - Loading
    "revelation.loading.title": "Interpretation läuft...",
    "revelation.loading.daily": "Die Sterne enthüllen dein Tagesorakel, {name}",
    "revelation.loading.reading": "Die Karten offenbaren ihre mystischen Geheimnisse, {name}",
    "revelation.loading.mysticMessage": "Die Sterne richten sich für dich aus...",

    // Revelation Page
    "revelation.positions.daily": "Tagesrat",
    "revelation.positions.past": "Karte 1",
    "revelation.positions.present": "Karte 2",
    "revelation.positions.future": "Karte 3",
    "revelation.summary.title": "Was deine Karten offenbaren",
    "revelation.newConsultation": "Neue Beratung",
    "revelation.title.daily": "Ihr Tagesrat",
    "revelation.title.reading": "Ihre Lesung - {oracle}",
    "revelation.instruction.daily":
      "Klicken Sie auf Ihre Karte, um die Botschaft des Tages zu enthüllen",
    "revelation.instruction.reading":
      "Klicken Sie auf jede Karte, um Ihr Schicksal zu enthüllen",
    "revelation.flipCard.reveal": "Berühren zum Enthüllen",
    "revelation.summary.seeMore": "Mehr anzeigen ↓",
    "revelation.summary.seeLess": "Weniger anzeigen ↑",
    "revelation.revealButton": "Offenbarung",
    "revelation.backToSelection": "Zurück zur Auswahl",
    "interpretation.advice.title": "Dein persönlicher Rat",
    "revelation.subtitle.revealed": "Betrachte deine aufgedeckten Karten",
   
    // Interpretation Templates
    "interpretation.gender.femme": "Meine Liebe",
    "interpretation.gender.homme": "Mein Lieber",
    "interpretation.gender.autre": "Liebe Seele",
    "interpretation.daily.greeting":
      "Hallo {name}! Hier ist dein Rat für diesen schönen Tag.",
    "interpretation.daily.zodiac": "Als {zodiacSign} ",
    "interpretation.daily.cardMessage":
      'hat die Karte "{cardName}" heute eine besondere Energie für dich.',
    "interpretation.daily.wisdom":
      "Als {zodiacSign} hast du die nötige Weisheit, um diesen Rat gut zu nutzen. Vertraue auf deinen Instinkt und lass diese positive Energie deine heutigen Handlungen leiten.",
    "interpretation.daily.closing":
      "Schönen Tag {genderText} {name}, und mögen die Sterne deinen Weg erhellen!",
    "interpretation.tarot.greeting":
      "Hallo {name}! Also, deine Tarot-Lesung sagt mir interessante Dinge.",
    "interpretation.tarot.past":
      "{cardName} in deiner Vergangenheit zeigt, dass du Momente erlebt hast, die dich wirklich haben wachsen lassen. Es war nicht immer einfach, aber es hat dich stärker gemacht.",
    "interpretation.tarot.present":
      "Im Moment beeinflusst {cardName} dein Leben auf positive Weise. Du befindest dich in einer Zeit, in der sich die Dinge bewegen, und das ist ein gutes Zeichen für die Zukunft.",
    "interpretation.tarot.future":
      "Für deine Zukunft kündigt {cardName} schöne Dinge an! Du kannst glückliche Veränderungen erwarten, die dir Zufriedenheit bringen werden.",
    "interpretation.tarot.advice":
      "Mein Rat: {name}, mit deinem Charakter als {zodiacSign}, vertraue auf deinen Instinkt. Du hast alles, was du zum Erfolg brauchst!",
    "interpretation.angels.greeting":
      "Hallo {name}! Deine Schutzengel haben leuchtende Offenbarungen für dich.",
    "interpretation.angels.past":
      "Auf deinem vergangenen Weg hat {cardName} göttliche Samen gesät: {cardMeaning}. Diese Segnungen haben deine Seele genährt und dich darauf vorbereitet, die bedingungslose Liebe zu empfangen, die dich jetzt umgibt.",
    "interpretation.angels.present":
      "In diesem präzisen Moment erleuchtet {cardName} deine Gegenwart: {cardMeaning}. Dieses himmlische Licht führt jeden deiner Schritte und verwandelt deine Herausforderungen in Möglichkeiten für spirituelles Wachstum.",
    "interpretation.angels.future":
      "Zu deiner strahlenden Zukunft hin entfaltet {cardName} seine schützenden Flügel: {cardMeaning}. Die Tore des Himmels öffnen sich vor dir und enthüllen einen Weg, der mit Wundern und Synchronizitäten gepflastert ist.",
    "interpretation.angels.message":
      "Engelhafte Übertragung: {genderText} {name}, dein Wesen als {zodiacSign} schwingt in Harmonie mit diesen göttlichen Frequenzen. Lass dein Herz sich für diese Botschaften reiner Liebe öffnen und bleibe empfänglich{genderSuffix} für die Zeichen, die deine Führer dir senden!",
    "interpretation.runes.greeting":
      "Heil dir {name}! Die alten nordischen Runen enthüllen die Geheimnisse deines Kriegerschicksals.",
    "interpretation.runes.past":
      "Deine Vergangenheitsrune, {cardName}, offenbart: {cardMeaning}. Diese Urkräfte haben deinen Charakter durch Feuer und Eis geformt und dich mit alter Weisheit auf die heutigen Herausforderungen vorbereitet.",
    "interpretation.runes.present":
      "Gerade jetzt leitet {cardName} deine Schritte: {cardMeaning}. Diese runische Energie erleuchtet deinen aktuellen Pfad und verbindet dich mit den mystischen Kräften, die dein tägliches Leben regieren.",
    "interpretation.runes.future":
      "In die Zukunft hinein verkündet {cardName}: {cardMeaning}. Diese runische Prophezeiung zeichnet den Weg deiner künftigen Errungenschaften vor, wo du siegreich unter der Ägide der nordischen Götter erstrahlen wirst.",
    "interpretation.runes.advice":
      "Denke daran, {genderText} {name}: als {zodiacSign} trägst du das Wikinger-Erbe in deinem Blut. Die Runen haben gesprochen - folge ihrer Führung mit Mut und Entschlossenheit!",
    "interpretation.fallback.zodiac": "intuitive Person",
    "interpretation.fallback.angels": "leuchtendes Wesen",
    "interpretation.fallback.runes": "Kämpfer",
    "interpretation.title.daily": "Interpretation für {name}",
    "interpretation.title.reading": "Kartenlegung für {name}",
    "interpretation.subtitle": "Hier ist deine persönliche Offenbarung",
    "interpretation.backToCards": "Zurück zu den Karten",
    "interpretation.newConsultation": "Neue Beratung",

    // ========== VARIATIONEN FÜR DAS TAGESLOS ==========

    // Variationen für "die Karte hat eine besondere Energie"
    "interpretation.daily.cardMessage.var1":
      'Die Karte "{cardName}" hat heute eine besondere Energie für dich.',
    "interpretation.daily.cardMessage.var2":
      'Die Karte "{cardName}" bringt dir heute eine einzigartige Schwingung.',
    "interpretation.daily.cardMessage.var3":
      'Die Karte "{cardName}" stimmt besonders mit deiner Energie des Tages überein.',
    "interpretation.daily.cardMessage.var4":
      'Die Karte "{cardName}" trägt heute eine wichtige Botschaft für dich.',
    "interpretation.daily.cardMessage.var5":
      'Die Karte "{cardName}" schwingt im Einklang mit deinem Tag.',
    "interpretation.daily.cardMessage.var6":
      'Die Karte "{cardName}" erhellt heute deinen Weg mit besonderer Kraft.',
    "interpretation.daily.cardMessage.var7":
      'Die Karte "{cardName}" lädt dich ein, heute auf deine Intuition zu hören.',
    "interpretation.daily.cardMessage.var8":
      'Die Karte "{cardName}" übermittelt eine kraftvolle Energie, die dich führt.',
    "interpretation.daily.cardMessage.var9":
      'Die Karte "{cardName}" bietet dir heute eine außergewöhnliche Schwingung zum Fühlen.',
    "interpretation.daily.cardMessage.var10":
      'Die Karte "{cardName}" begleitet dich den ganzen Tag mit heller Energie.',

    //Variationen für "Wisdom"
    "interpretation.daily.wisdom.var1":
      "Als {zodiacSign} hast du die Weisheit, diesen Rat gut zu nutzen. Vertraue deinem Instinkt und lasse diese positive Energie heute deine Handlungen leiten.",
    "interpretation.daily.wisdom.var2":
      "Dein Sternzeichen schenkt dir eine schöne Intuition. Vertraue ihr und lass dich von der positiven Energie um dich herum führen.",
    "interpretation.daily.wisdom.var3":
      "Die Sterne begleiten dich heute. Lass diese schöne Energie dir helfen, gelassen voranzukommen.",
    "interpretation.daily.wisdom.var4":
      "Als {zodiacSign} hältst du die Schlüssel, um diese himmlische Botschaft zu deuten. Nutze sie gut im Laufe des Tages.",
    "interpretation.daily.wisdom.var5":
      "Dein {zodiacSign}-Charakter stimmt perfekt mit diesem Rat überein. Lass diese kosmische Harmonie deinen Weg heute erleuchten.",
    "interpretation.daily.wisdom.var6":
      "Der Himmel spricht durch dein Sternzeichen. Sei aufmerksam für die Zeichen und gehe selbstbewusst voran.",
    "interpretation.daily.wisdom.var7":
      "Als {zodiacSign} bist du heute mit einer feinen Energie ausgerichtet{genderSuffix}. Folge ihr, sie wird dich dorthin führen, wo du sein sollst.",
    "interpretation.daily.wisdom.var8":
      "Dein {zodiacSign} Zeichen führt dich mit Weisheit. Lass dein Herz offen und deinen Geist klar sein, um dir den Weg zu zeigen.",
    "interpretation.daily.wisdom.var9":
      "Du trägst ein einzigartiges Licht in dir. Möge dir diese Botschaft helfen, es voll und stolz erstrahlen zu lassen.",
    "interpretation.daily.wisdom.var10":
      "Deine {zodiacSign}-Energie schwingt mit den Vibrationen des Tages. Nimm diesen Rat als einen wohlwollenden und inspirierenden Führer an.",

    // Variationen für "Schönen Tag"
    "interpretation.daily.closing.var1":
      "Hab einen großartigen Tag {genderText} {name}, und mögen die Sterne deinen Weg erleuchten!",
    "interpretation.daily.closing.var2":
      "Schönen Tag {name}, möge diese Führung dich begleiten!",
    "interpretation.daily.closing.var3":
      "Genieße deinen Tag {name}, die Energien sind bei dir!",
    "interpretation.daily.closing.var4":
      "Hab einen wundervollen Tag {genderText} {name}!",
    "interpretation.daily.closing.var5":
      "Möge dein Tag sanft sein {name}, das Universum passt auf dich auf!",
    "interpretation.daily.closing.var6":
      "Hab einen strahlenden Tag, {genderText} {name}, voller wunderbarer Überraschungen!",
    "interpretation.daily.closing.var7":
      "Hab einen großartigen Tag, {name}, möge positive Energie dich jederzeit begleiten!",
    "interpretation.daily.closing.var8":
      "Möge dir dieser Tag Freude und Gelassenheit bringen, {genderText} {name}!",
    "interpretation.daily.closing.var9":
      "Lächle dem Leben heute zu, {name}, und es lächelt dir zurück!",
    "interpretation.daily.closing.var10":
      "Hab einen inspirierenden Tag, {genderText} {name}, unter dem Schutz der Sterne!",

    // Horoscope daily sections
    "horoscope.greeting": `Hallo {name}! Hier ist Ihr Tageshoroskop als {zodiacSign} {zodiacSymbol}`,
    "horoscope.predictions.title": "Vorhersagen für den Tag:",
    "horoscope.mood.today": "Ihre Stimmung heute: {mood}",
    "horoscope.mood.energy":
      "Diese Energie wird Sie den ganzen Tag begleiten. Nutzen Sie sie, um Dinge zu tun, die Ihnen gut tun!",
    "horoscope.assets.title": "Ihre Trümpfe des Tages:",
    "horoscope.assets.luckyNumber": "• Glückszahl: {luckyNumber}",
    "horoscope.assets.luckyColor": "• Glücksfarbe: {luckyColor}",
    "horoscope.compatibility":
      "Kompatibilität: Sie werden sich heute besonders gut mit {compatibility} Zeichen verstehen. Es ist der ideale Zeitpunkt, um Ihre Beziehungen zu stärken!",
    "horoscope.message": `{genderText} {name}, als {zodiacSign} haben Sie diese schöne Energie, die gute Dinge anzieht. Vertrauen Sie heute auf die Sterne und Ihre Intuition!`,
          "horoscope.compatibility.title": "Kompatibilität",
      "horoscope.advice.title": "Dein persönlicher Rat",
    "horoscope.mood.title": "Stimmung des Tages",

    // Zodiac signs names
    "zodiac.signs.aries": "Widder",
    "zodiac.signs.taurus": "Stier",
    "zodiac.signs.gemini": "Zwillinge",
    "zodiac.signs.cancer": "Krebs",
    "zodiac.signs.leo": "Löwe",
    "zodiac.signs.virgo": "Jungfrau",
    "zodiac.signs.libra": "Waage",
    "zodiac.signs.scorpio": "Skorpion",
    "zodiac.signs.sagittarius": "Schütze",
    "zodiac.signs.capricorn": "Steinbock",
    "zodiac.signs.aquarius": "Wassermann",
    "zodiac.signs.pisces": "Fische",

    // Zodiac Signs
    "zodiac.aries": "Widder",
    "zodiac.taurus": "Stier",
    "zodiac.gemini": "Zwillinge",
    "zodiac.cancer": "Krebs",
    "zodiac.leo": "Löwe",
    "zodiac.virgo": "Jungfrau",
    "zodiac.libra": "Waage",
    "zodiac.scorpio": "Skorpion",
    "zodiac.sagittarius": "Schütze",
    "zodiac.capricorn": "Steinbock",
    "zodiac.aquarius": "Wassermann",
    "zodiac.pisces": "Fische",

    // Card Names and Meanings - Runes
    "cards.runes.Fehu.name": "Fehu",
    "cards.runes.Fehu.meaning":
      "Reichtum, Wohlstand, neuer finanzieller Anfang",
    "cards.runes.Uruz.name": "Uruz",
    "cards.runes.Uruz.meaning": "Rohe Kraft, Gesundheit, Transformation",
    "cards.runes.Thurisaz.name": "Thurisaz",
    "cards.runes.Thurisaz.meaning":
      "Verteidigung, Schutz, zerstörerische Kraft",
    "cards.runes.Ansuz.name": "Ansuz",
    "cards.runes.Ansuz.meaning":
      "Göttliche Kommunikation, Inspiration, Weisheit",
    "cards.runes.Raidho.name": "Raidho",
    "cards.runes.Raidho.meaning": "Reise, Bewegung, Fortschritt",
    "cards.runes.Kenaz.name": "Kenaz",
    "cards.runes.Kenaz.meaning": "Wissen, Kreativität, Erleuchtung",
    "cards.runes.Gebo.name": "Gebo",
    "cards.runes.Gebo.meaning": "Geschenk, Austausch, Partnerschaft",
    "cards.runes.Wunjo.name": "Wunjo",
    "cards.runes.Wunjo.meaning": "Freude, Glück, Harmonie",
    "cards.runes.Hagalaz.name": "Hagalaz",
    "cards.runes.Hagalaz.meaning": "Störung, erzwungene Veränderung, Reinigung",
    "cards.runes.Nauthiz.name": "Nauthiz",
    "cards.runes.Nauthiz.meaning": "Notwendigkeit, Zwang, karmische Lektion",
    "cards.runes.Isa.name": "Isa",
    "cards.runes.Isa.meaning": "Eis, Stagnation, Geduld",
    "cards.runes.Jera.name": "Jera",
    "cards.runes.Jera.meaning": "Ernte, Zyklen, Belohnung",
    "cards.runes.Eihwaz.name": "Eihwaz",
    "cards.runes.Eihwaz.meaning": "Ausdauer, Schutz, spirituelle Verbindung",
    "cards.runes.Perthro.name": "Perthro",
    "cards.runes.Perthro.meaning": "Geheimnis, Schicksal, verborgene Kräfte",
    "cards.runes.Algiz.name": "Algiz",
    "cards.runes.Algiz.meaning": "Göttlicher Schutz, Verbindung zu Führern",
    "cards.runes.Sowilo.name": "Sowilo",
    "cards.runes.Sowilo.meaning": "Erfolg, Sieg, Sonnenenergie",
    "cards.runes.Tiwaz.name": "Tiwaz",
    "cards.runes.Tiwaz.meaning": "Sieg, Gerechtigkeit, ehrenvolles Opfer",
    "cards.runes.Berkano.name": "Berkano",
    "cards.runes.Berkano.meaning": "Wachstum, Fruchtbarkeit, neuer Zyklus",
    "cards.runes.Ehwaz.name": "Ehwaz",
    "cards.runes.Ehwaz.meaning": "Bewegung, Fortschritt, Partnerschaft",
    "cards.runes.Mannaz.name": "Mannaz",
    "cards.runes.Mannaz.meaning": "Menschlichkeit, Selbst, Intelligenz",
    "cards.runes.Laguz.name": "Laguz",
    "cards.runes.Laguz.meaning": "Wasser, Intuition, Emotionen",
    "cards.runes.Ingwaz.name": "Ingwaz",
    "cards.runes.Ingwaz.meaning": "Männliche Fruchtbarkeit, kreative Energie",
    "cards.runes.Dagaz.name": "Dagaz",
    "cards.runes.Dagaz.meaning": "Erwachen, Transformation, neuer Tag",
    "cards.runes.Othala.name": "Othala",
    "cards.runes.Othala.meaning": "Erbe, Eigentum, Familientradition",

    // Card Names and Meanings - Daily
    "cards.daily.NouveauDepart.name": "Neuanfang",
    "cards.daily.NouveauDepart.meaning":
      "Heute markiert das Ende eines wichtigen Zyklus und den Beginn einer ganz neuen Lebensphase. Es ist ein besonderer Moment, um die Hindernisse zu überwinden, die dich bisher zurückgehalten haben – sei es im persönlichen, beruflichen oder emotionalen Bereich. Das Universum sendet dir eine ermutigende Botschaft: Gehe mutig voran, vertraue deiner Intuition und sei offen für die Chancen, die sich dir bieten. Jeder kleine Schritt, den du heute machst, legt den Grundstein für eine reichere, ruhigere und erfüllendere Zukunft. Dieser Neubeginn lädt dich ein, die Vergangenheit loszulassen, dich zu erneuern und die Veränderungen anzunehmen, die dich zu deinem Wohlbefinden führen.",
    "cards.daily.Patience.name": "Geduld",
    "cards.daily.Patience.meaning":
      "Diese Karte erinnert dich daran, dass manche Dinge Zeit brauchen, um sich zu entfalten. Lass dich nicht entmutigen, wenn die Ergebnisse auf sich warten lassen: Geduld ist heute deine größte Stärke. Nimm dir Zeit zum Beobachten, tief Atmen und akzeptiere den natürlichen Rhythmus der Ereignisse. Die innere Ruhe, die du kultivierst, wird dir helfen, Herausforderungen gelassen zu begegnen und ist der Schlüssel, um Erfolg und günstige Gelegenheiten zum richtigen Zeitpunkt anzuziehen. Denk daran, alles kommt zur rechten Zeit und Ausdauer zahlt sich immer aus.",
    "cards.daily.Creativite.name": "Kreativität",
    "cards.daily.Creativite.meaning":
      "Dein Geist ist heute besonders fruchtbar. Lass deine Ideen frei sprudeln, auch die unerwarteten, denn sie könnten sich in brillante Lösungen oder zukunftsträchtige Projekte verwandeln. Kreativität ist nicht nur künstlerisch: Sie erhellt auch deine Entscheidungen, Beziehungen und Herausforderungen. Höre auf deine tiefen Inspirationen und setze sie mit Vertrauen um. Indem du diese kreative Energie freisetzt, öffnest du die Tür zu neuen Möglichkeiten, die dein persönliches und berufliches Wachstum fördern. Zögere nicht zu experimentieren und deiner Intuition zu folgen, denn deine Originalität ist heute deine größte Stärke.",
    "cards.daily.Amour.name": "Liebe",
    "cards.daily.Amour.meaning":
      "Die heutige Energie richtet sich auf das Herz. Zeige deine Zärtlichkeit und Dankbarkeit gegenüber deinen Lieben, denn eine einfache Geste kann große Wirkung haben. Bist du in einer Partnerschaft, dann vertiefe eure Verbindung mit aufrichtigen und liebevollen Gesten. Bist du Single, öffne dich für neue Begegnungen: Liebe könnte dort erscheinen, wo du sie nicht erwartest. Höre auf deine Gefühle und lass dein Herz deine Handlungen leiten. Dieser Tag fördert liebevolle Austausche und Momente der Verbundenheit, die für dein emotionales Gleichgewicht wichtig sind.",
    "cards.daily.Courage.name": "Mut",
    "cards.daily.Courage.meaning":
      "Heute können Herausforderungen auftreten, aber du hast die Kraft und Resilienz, sie zu meistern. Mut bedeutet nicht, keine Angst zu haben, sondern trotz der Angst zu handeln. Wenn du deine Hindernisse mit Entschlossenheit angehst, wirst du an Vertrauen und Reife gewinnen. Jeder mutige Schritt stärkt deinen Weg und bestätigt deinen Wert, was zu tiefem persönlichen Wachstum führt.",
    "cards.daily.Intuition.name": "Intuition",
    "cards.daily.Intuition.meaning":
      "Deine innere Stimme ist heute besonders stark. Vertraue deinen Eingebungen, auch wenn du sie nicht immer rational erklären kannst. Sie führen dich zu Entscheidungen, die besser zu deinen wahren Bedürfnissen und deinem Lebensweg passen. Nimm dir einen Moment der Stille, um deine Gefühle zu hören, denn deine Intuition hält die Antworten auf die Fragen bereit, die du dir gerade stellst, und wird dich bei wichtigen Entscheidungen unterstützen.",
    "cards.daily.Gratitude.name": "Dankbarkeit",
    "cards.daily.Gratitude.meaning":
      "Nimm dir Zeit, um das, was du hast, tief zu schätzen. Das Anerkennen deiner Segnungen, auch der kleinen, zieht noch mehr Positives in dein Leben und öffnet die Tür zu neuen Möglichkeiten. Dankbarkeit heute zu kultivieren, hilft dir, mehr innere Ruhe zu fühlen und deine Beziehungen zu stärken.",
    "cards.daily.Communication.name": "Kommunikation",
    "cards.daily.Communication.meaning":
      "Drücke dich heute klar und wohlwollend aus. Deine Worte haben die Kraft, Spannungen zu mildern, andere zu inspirieren und wichtige Beziehungen zu stärken. Ehrliche und respektvolle Kommunikation öffnet den Weg zu besserem gegenseitigem Verständnis und tief bereicherndem Austausch.",
    "cards.daily.Equilibre.name": "Gleichgewicht",
    "cards.daily.Equilibre.meaning":
      "Finde heute das Gleichgewicht zwischen dem, was du anderen gibst, und dem, was du für dich selbst brauchst. Es ist wichtig, dich nicht im Namen der Verantwortung zu vergessen. Für dich selbst zu sorgen heißt auch, deine Energie und dein inneres Wohlbefinden zu schützen. Indem du diese Harmonie pflegst, wirst du auf deinem Weg ausgeglichener und ruhiger voranschreiten.",
    "cards.daily.Confiance.name": "Vertrauen",
    "cards.daily.Confiance.meaning":
      "Glaube heute voll und ganz an deine Fähigkeiten und gehe mit sicherer Energie voran. Selbstvertrauen ist eine wertvolle innere Kraft, die dich stärker, klarer in deinen Entscheidungen und mehr in Einklang mit deiner Wahrheit macht. Auch wenn Zweifel aufkommen, erinnere dich daran, dass jeder Schritt im Glauben dich deinen wahren Erfolgen näherbringt.",
    "cards.daily.Lacher-prise.name": "Loslassen",
    "cards.daily.Lacher-prise.meaning":
      "Befreie dich heute von der Last der Vergangenheit und von Sorgen, die keinen Platz mehr verdienen. Was du nicht kontrollieren kannst, sollte nicht deine Energie rauben. Indem du loslässt, öffnest du den Weg zu mehr innerem Frieden und Klarheit. Du wirst dich leichter, zentrierter und bereit fühlen, das, was kommt, mit Vertrauen zu empfangen.",
    "cards.daily.Joie.name": "Freude",
    "cards.daily.Joie.meaning":
      "Öffne heute dein Herz für die einfache Freude an kleinen Momenten: ein Lächeln, eine aufrichtige Geste, ein heller Gedanke. Selbst mitten in Verpflichtungen kann diese positive Energie deine Stimmung verändern. Indem du Freude kultivierst, wirst du strahlender, präsenter und ziehst automatisch Erfahrungen an, die dein Wohlbefinden nähren.",
    "cards.daily.Sagesse.name": "Weisheit",
    "cards.daily.Sagesse.meaning":
      "Heute verlangsame dein Tempo und nimm dir einen Moment der Distanz, bevor du handelst. Deine innere Weisheit ist eine wertvolle Verbündete: Sie führt dich, schützt dich und erleuchtet deine Entscheidungen. Wenn du dich mit dieser ruhigen und klaren Stimme verbindest, wirst du geerdeter, klarer in deinen Entscheidungen und in der Lage sein, hinter die Oberfläche zu blicken.",
    "cards.daily.Transformation.name": "Transformation",
    "cards.daily.Transformation.meaning":
      "Empfange heute die Veränderungen, die auf dich zukommen, auch wenn sie zunächst beunruhigend erscheinen. Diese Wandlungen sind kein Zufall: Sie treiben dich an, zu wachsen, dich weiterzuentwickeln und der besten Version deiner selbst näherzukommen. Indem du diesen Prozess annimmst, wirst du mehr im Einklang, selbstbewusster und bereit für einen neuen Schritt.",
    "cards.daily.Abondance.name": "Fülle",
    "cards.daily.Abondance.meaning":
      "Erinnere dich daran, dass du bereits alle notwendigen Ressourcen besitzt, um erfolgreich zu sein. Wahre Fülle manifestiert sich, wenn du voll und ganz an dein Potenzial glaubst und offen bist für die Chancen, die sich bieten. Vertraue auf deine Fähigkeiten, denn in dir liegt die Kraft, alles anzuziehen, was du brauchst, um heute und morgen zu gedeihen.",
    "cards.daily.Paix.name": "Frieden",
    "cards.daily.Paix.meaning":
      "Kultiviere inneren Frieden, indem du Spannungen und Konflikte um dich herum loslässt. Die Gelassenheit, die du findest, bringt dir Klarheit und die nötige Harmonie, um heute ruhig voranzuschreiten.",
    "cards.daily.Force.name": "Kraft",
    "cards.daily.Force.meaning":
      "Ziehe Kraft aus deinem Inneren, sie ist viel größer, als du denkst. Sie unterstützt dich bei Herausforderungen, schenkt dir Mut und Widerstandskraft und hilft dir, trotz Hindernissen mit Vertrauen voranzukommen.",
    "cards.daily.Pardon.name": "Vergebung",
    "cards.daily.Pardon.meaning":
      "Schenke Vergebung – dir selbst und anderen. Diese kraftvolle Geste befreit dein Herz von der Last der Vergangenheit und ebnet den Weg für echte innere Heilung, sodass du leichter und friedvoller voranschreiten kannst.",
    "cards.daily.Espoir.name": "Hoffnung",
    "cards.daily.Espoir.meaning":
      "Behalte die Hoffnung, auch in schwierigen Momenten. Das Licht kehrt immer zurück, so wie die Sonne nach der dunkelsten Nacht. Diese Botschaft lädt dich ein, Geduld und Vertrauen in eine bessere Zukunft zu pflegen, denn jede Prüfung bereitet eine vielversprechende Erneuerung vor, die zu gegebener Zeit wachsen und erblühen wird.",
    "cards.daily.Action.name": "Handeln",
    "cards.daily.Action.meaning":
      "Jetzt ist der Moment zu handeln. Lass deine Pläne nicht länger warten, heute schreiten die Dinge voran. Wage den Schritt mit Vertrauen, denn jede Initiative bringt dich deinen Zielen näher und öffnet neue Türen in deinem Leben.",
    "cards.daily.Compassion.name": "Mitgefühl",
    "cards.daily.Compassion.meaning":
      "Zeige Mitgefühl dir selbst und anderen gegenüber. Wohlwollen mildert Herzen und stärkt Verbindungen. Indem du diese Sanftheit kultivierst, erschaffst du einen Raum der Heilung und des Verstehens, der für dich und dein Umfeld wichtig ist. Diese Karte lädt dich ein, heute dein Herz weit zu öffnen, zuzuhören ohne zu urteilen und Unterstützung mit Empathie zu geben. So trägst du zu einer harmonischen Atmosphäre bei und lässt deinen eigenen inneren Frieden wachsen.",
    "cards.daily.Inspiration.name": "Inspiration",
    "cards.daily.Inspiration.meaning":
      "Öffne weit deine Augen und deinen Geist für alles, was dich umgibt. Inspiration verbirgt sich in den Details des Alltags und wartet darauf, deine Kreativität zu nähren und neue Ideen zu wecken. Diese Botschaft ermutigt dich, neugierig und offen zu bleiben, Zeichen und Funken zu empfangen, die deinen Weg erhellen können. Nimm dir Zeit, auf diese Impulse zu hören – sie werden dich zu innovativen Lösungen und erneuten Momenten der Freude führen.",
    "cards.daily.Determination.name": "Entschlossenheit",
    "cards.daily.Determination.meaning":
      "Deine Ausdauer und dein Wille sind heute deine besten Verbündeten. Auch wenn Hindernisse auf deinem Weg auftauchen, gehe mit Vertrauen und Entschlossenheit weiter. Deine Beharrlichkeit wird dir helfen, Schwierigkeiten zu überwinden und den Weg zu nachhaltigem Erfolg zu öffnen. Diese Botschaft lädt dich ein, nicht aufzugeben, denn jeder Einsatz zählt und bringt dich deinen wichtigsten Zielen näher.",
    "cards.daily.Aventure.name": "Abenteuer",
    "cards.daily.Aventure.meaning":
      "Verlasse heute deine Routine und wage neue Erfahrungen. Ob groß oder klein, dieses Abenteuer wird deinen Geist nähren und dein Herz erwärmen. Nimm dir Zeit, zu erkunden, dich zu wundern und dich überraschen zu lassen. Diese Botschaft ermutigt dich, deinen Horizont zu erweitern und Veränderungen mit Begeisterung zu begrüßen.",
    "cards.daily.Reconciliation.name": "Versöhnung",
    "cards.daily.Reconciliation.meaning":
      "Es ist Zeit, deine inneren Wunden zu heilen und Frieden mit deiner Vergangenheit zu schließen. Versöhnung schenkt dir Freiheit und Leichtigkeit, sodass du gelassener deinen Weg gehen kannst. Nimm diesen Prozess mit Wohlwollen an und lass dich von dieser inneren Heilung verwandeln.",
    "cards.daily.Innovation.name": "Innovation",
    "cards.daily.Innovation.meaning":
      "Lass heute deine originellen Ideen lebendig werden. Deine Fähigkeit, anders zu denken, ist ein echter Schatz, der deine Projekte verändern und dein Umfeld inspirieren kann. Zögere nicht, neue Wege zu gehen und deine einzigartige Kreativität mutig auszudrücken, um neue Möglichkeiten zu eröffnen.",
    "cards.daily.Connexion.name": "Verbindung",
    "cards.daily.Connexion.meaning":
      "Stärke deine Bindungen zu anderen, aber auch zu dir selbst. Authentische Verbindungen nähren deine Seele, bringen Unterstützung und Trost und erinnern dich daran, dass du nie allein bist. Nimm dir Zeit, aufrichtig zuzuhören und zu teilen – das bringt dir Ausgleich und Erfüllung.",
    "cards.daily.Prosperite.name": "Wohlstand",
    "cards.daily.Prosperite.meaning":
      "Wohlstand zeigt sich in deinem Leben auf verschiedene Weise: materiell, emotional oder spirituell. Empfange diese Fülle mit Dankbarkeit und Vertrauen. Sei offen dafür, zu empfangen und zu teilen, was dir das Leben heute schenkt, um deinen inneren und äußeren Reichtum zu stärken.",
    "cards.daily.Authenticite.name": "Authentizität",
    "cards.daily.Authenticite.meaning":
      "Bleibe deinen Werten und deinem wahren Selbst treu. Deine Authentizität zieht die richtigen Menschen an und führt dich zu Entscheidungen im Einklang mit deinem Herzen. Hab keine Angst, zu zeigen, wer du wirklich bist – in dieser Ehrlichkeit findest du deine Kraft und deinen inneren Frieden.",
    "cards.daily.Revelation.name": "Offenbarung",
    "cards.daily.Revelation.meaning":
      "Eine verborgene Wahrheit oder eine wichtige Erkenntnis wird sich bald zeigen. Bleibe aufmerksam und halte deinen Geist offen, um diese Offenbarung zu empfangen. Sei bereit, dieses neue Licht aufzunehmen, denn es kann deine Sichtweise verändern und dir helfen, klarer voranzukommen.",
    "cards.daily.Protection.name": "Schutz",
    "cards.daily.Protection.meaning":
      "Du bist von Fürsorge und schützenden Kräften umgeben, die über dich wachen. Vertraue auf diesen Schutz, er begleitet dich bei deinen Entscheidungen und Schritten. Fürchte dich heute vor nichts und lass diese beruhigende Energie dich stärken und führen.",
    "cards.daily.Renaissance.name": "Wiedergeburt",
    "cards.daily.Renaissance.meaning":
      "Ein neuer Zyklus öffnet sich vor dir und lädt dich ein, alles loszulassen, was der Vergangenheit angehört. Nimm diese Wiedergeburt als wertvolle Gelegenheit an, dich neu zu erfinden, zu wachsen und dich zu erneuern. Wage es, eine neue Seite aufzuschlagen und diesen Neubeginn voll anzunehmen.",
    "cards.daily.Clarte.name": "Klarheit",
    "cards.daily.Clarte.meaning":
      "Die Antworten, die du suchst, werden sich bald zeigen. Nimm Abstand, beobachte die Zeichen um dich herum genau und lass den Nebel allmählich verschwinden. Diese neue Klarheit wird dir helfen, fundierte und im Einklang mit deiner inneren Wahrheit stehende Entscheidungen zu treffen. Tipp: Nimm dir heute einen ruhigen Moment, um in Ruhe nachzudenken, bevor du handelst – das wird dir eine klarere Sicht auf die Situation ermöglichen.",
    "cards.daily.Passion.name": "Leidenschaft",
    "cards.daily.Passion.meaning":
      "Folge dem, was dich wirklich begeistert, denn deine Begeisterung ist eine kraftvolle Energie, die dein Leben verändern kann. Pflege dieses innere Feuer, gib ihm Raum zu wachsen und lass es deine Entscheidungen zu dem führen, was dich lebendig macht. Tipp: Widme heute Zeit dem, was dein Herz entflammt, selbst in kleinen Handlungen – das wird deine Motivation und Lebensfreude stärken.",
    "cards.daily.Equite.name": "Gerechtigkeit",
    "cards.daily.Equite.meaning":
      "Gerechtigkeit und Gleichgewicht werden sich bald in deinen Angelegenheiten wiederherstellen. Bleibe integer und geduldig: Deine gerechten Handlungen werden Früchte tragen und Harmonie um dich herum zurückbringen. Tipp: Bewahre einen kühlen Kopf bei Herausforderungen und handle weiterhin ehrlich und respektvoll, auch wenn die Ergebnisse auf sich warten lassen.",
    "cards.daily.Harmonie.name": "Harmonie",
    "cards.daily.Harmonie.meaning":
      "Heute neigen sich alle Aspekte deines Lebens zur Ausrichtung. Nutze diese Zeit, um das zu festigen, was gut funktioniert, und um Routinen zu etablieren, die dein körperliches, mentales und emotionales Wohlbefinden fördern. Tipp: Nimm dir Zeit, auf dich selbst zu hören und deine Lebensbereiche auszubalancieren, um diese schöne Harmonie langfristig zu erhalten.",
    "cards.daily.Eveil.name": "Erwachen",
    "cards.daily.Eveil.meaning":
      "Dein Bewusstsein weitet sich heute und öffnet die Tür zu neuen Perspektiven und einem besseren Verständnis von dir selbst und der Welt um dich herum. Begrüße diese Erkenntnisse mit Offenheit und Neugier: Sie können deinen Blick auf das Leben verändern und deine nächsten Schritte auf einem authentischeren Weg führen. Tipp: Nimm dir Zeit, darüber nachzudenken, was diese neuen Einsichten für dich bedeuten, und wage es, entsprechend dieser neuen Klarheit zu handeln.",
    "cards.daily.Generosite.name": "Großzügigkeit",
    "cards.daily.Generosite.meaning":
      "Gib heute ohne zu zählen, nicht aus Pflicht, sondern von Herzen. Diese aufrichtige und selbstlose Geste wird einen Kreis der Gegenseitigkeit um dich schaffen und wohltuende Erfahrungen anziehen, die dein Leben bereichern. Tipp: Sei aufmerksam gegenüber den Bedürfnissen anderer, achte dabei jedoch darauf, dich selbst in diesem großzügigen Impuls nicht zu vergessen.",
    "cards.daily.Perseverance.name": "Durchhaltevermögen",
    "cards.daily.Perseverance.meaning":
      "Gib jetzt nicht auf: Deine Entschlossenheit steht kurz davor, Früchte zu tragen. Setze deine Konstanz und Disziplin fort, der Sieg ist näher, als du denkst. Tipp: Bleibe auf Kurs, auch wenn der Weg lang erscheint, jeder Einsatz bringt dich deinem Ziel näher.",
    "cards.daily.Simplicite.name": "Einfachheit",
    "cards.daily.Simplicite.meaning":
      "Die Lösung ist oft einfacher als man denkt. Konzentriere dich auf das Wesentliche, beseitige das Überflüssige, und du findest klare und wirkungsvolle Antworten. Tipp: Vereinfache heute dein Leben, um dich besser auf das wirklich Wichtige zu fokussieren.",
    "cards.daily.Legerete.name": "Leichtigkeit",
    "cards.daily.Legerete.meaning":
      "Nimm heute eine leichte Haltung ein: Lache, spiele und befreie dich von unnötigen Lasten. Diese Leichtigkeit öffnet dich für Freude und Kreativität. Tipp: Erlaube dir zu spielen und Abstand zu gewinnen, um besser voranzukommen.",
    "cards.daily.Ancrage.name": "Verankerung",
    "cards.daily.Ancrage.meaning":
      "Kehre zu deinen Wurzeln zurück, um Stabilität und Kraft zu finden. Einfache Praktiken wie Atmen, Gehen oder regelmäßige Routinen helfen dir, dich zu zentrieren und gelassener voranzukommen. Tipp: Nimm dir Zeit, dich mit dir selbst und dem gegenwärtigen Moment zu verbinden.",
    "cards.daily.Mystere.name": "Geheimnis",
    "cards.daily.Mystere.meaning":
      "Akzeptiere, was du noch nicht verstehen kannst. Das Geheimnis ist Teil der Magie des Lebens: Indem du dem Unbekannten Raum gibst, öffnest du die Tür zu Offenbarungen, die sich zum richtigen Zeitpunkt zeigen werden. Tipp: Vertraue der Zeit und bleibe offen für die Überraschungen, die das Universum dir schickt.",
    "cards.daily.Celebration.name": "Feier",
    "cards.daily.Celebration.meaning":
      "Es ist Zeit, deine Erfolge zu feiern, auch die kleinsten. Deine Errungenschaften anzuerkennen stärkt dein Selbstvertrauen und zieht noch mehr Gründe zur Freude an. Tipp: Nimm dir Zeit, dich zu loben und teile deine Freude mit den Menschen um dich herum.",
    "cards.daily.Guidance.name": "Führung",
    "cards.daily.Guidance.meaning":
      "Heute kann unerwartete Hilfe oder ein dezentes Zeichen auf deinem Weg erscheinen. Sei aufmerksam für kleine Synchronizitäten, die deinen Weg kreuzen, denn sie tragen eine wichtige Botschaft. Diese Zeichen werden dich zu klügeren und vorteilhaften Entscheidungen führen. Begrüße diese Hinweise mit Vertrauen, sie öffnen eine Tür zu einer neuen und günstigen Richtung.",
    "cards.daily.Purification.name": "Reinigung",
    "cards.daily.Purification.meaning":
      "Jetzt ist der ideale Moment, um rund um dich und in dir selbst aufzuräumen. Indem du deinen Raum und Geist vom Überflüssigen befreist, lädst du einen Hauch von Erneuerung ein. Diese Reinigung schafft eine Umgebung, die positive Transformationen begünstigt und deine Energie freisetzt, um neue Möglichkeiten mit Klarheit und Leichtigkeit zu empfangen.",
    "cards.daily.Vision.name": "Vision",
    "cards.daily.Vision.meaning":
      "Deine Zukunftsvision wird heute klarer. Identifiziere die Richtung, die dich anzieht, und gehe mit Vertrauen diesem neu offenbarten Horizont entgegen. Bewahre einen offenen Geist für die Möglichkeiten, die sich dir bieten, und lass dich von dieser inneren Klarheit zu deinen authentischsten Zielen führen.",

    // Card Names and Meanings - Tarot
    "cards.tarot.LeFou.name": "Der Narr",
    "cards.tarot.LeFou.meaning": "Neuanfang, Spontaneität, Freiheit",
    "cards.tarot.LeFou.meaning.var1":
      "Der Narr steht für einen Neuanfang in deinem Leben. Es ist an der Zeit, deinem Instinkt zu vertrauen und dich ins Unbekannte zu stürzen, auch wenn du nicht alle Antworten hast. Diese Karte lädt dich ein, deine Komfortzone zu verlassen. Ganz konkret kann das bedeuten, dich auf eine Stelle zu bewerben, die dir ein wenig Angst macht, ein wichtiges Gespräch zu führen, das du immer wieder aufschiebst, oder ein Projekt zu starten, das du seit Monaten planst. Der Narr sagt dir: Warte nicht darauf, völlig bereit zu sein – dieser Moment wird nie kommen. Fang jetzt an. Achte jedoch darauf, Spontaneität nicht mit Leichtsinn zu verwechseln. Informiere dich ein wenig, aber lass dich nicht von Angst lähmen.",
    "cards.tarot.LeFou.meaning.var2":
      "Diese Karte bringt frischen Wind und Neues in dein Leben. Du stehst an einem Wendepunkt, an dem Unschuld und Neugierde deine besten Verbündeten sein können. Der Narr ermutigt dich, deine Situation mit neuen Augen zu betrachten – so, als würdest du sie zum ersten Mal sehen. Frag dich im Alltag, wo du dich durch Gewohnheiten oder Ängste blockiert fühlst. Genau dort kann die Energie des Narren wirken. Vielleicht solltest du in Beziehungen neue Wege wagen, eine andere Methode bei der Arbeit ausprobieren oder einfach akzeptieren, dass du nicht alles kontrollieren kannst. Mach den ersten Schritt mit Leichtigkeit. Die Gefahr liegt darin, dich ohne jegliche Vorbereitung zu stürzen – sei spontan, aber nicht naiv.",
    "cards.tarot.LeFou.meaning.var3":
      "Der Narr bringt dir eine Botschaft von Freiheit und Erneuerung. Es ist der Beginn eines Zyklus, in dem du dich neu erfinden kannst. Diese Karte fordert dich auf, den Mut der Unschuld zu haben – die Fähigkeit, zu glauben, dass Dinge möglich sind, trotz scheinbarer Hindernisse. Praktisch gesehen: Erkenne, was dich momentan zurückhält. Ist es die Angst vor Bewertung? Die Angst zu scheitern? Der Narr rät dir, trotz dieser Zweifel weiterzugehen. Fang klein an, wenn nötig: ein Telefonat, eine Anmeldung, ein Gespräch. Wichtig ist, in Bewegung zu kommen. Bleib jedoch wachsam: Der Optimismus des Narren sollte dich nicht blind für echte Warnsignale machen. Höre auch auf deine Vorsicht.",
    "cards.tarot.LeBateleur.name": "Der Magier",
    "cards.tarot.LeBateleur.meaning":
      "Kreativität, Kommunikation, neues Projekt",
    "cards.tarot.LeBateleur.meaning.var1":
      "Der Magier bringt dir einen Hauch von Neuheit und Begeisterung. Du stehst am Anfang eines neuen Abschnitts, voller Versprechen und kreativer Impulse. Alle Ressourcen sind bereits in dir: Vertrauen, Ideen, Energie. Diese Karte lädt dich ein, mutig zu handeln, auch wenn der Weg noch nicht ganz klar ist. Jetzt ist der ideale Moment, ein Projekt zu starten, eine Idee auszudrücken oder einfach an deine Fähigkeit zu glauben, Potenzial in Realität zu verwandeln. In der Liebe oder im Beruf kann dieser Impuls alles verändern.",
    "cards.tarot.LeBateleur.meaning.var2":
      "Der Magier markiert den Beginn eines persönlichen oder beruflichen Abenteuers. Du wirst dir deiner Handlungskraft und Entscheidungsfreiheit bewusst. Diese Karte symbolisiert jugendlichen Geist, Kreativität und den Wunsch, auf solider Basis aufzubauen. Wenn du gerade zögerst, erinnert dich der Magier daran, dass der erste Schritt oft der wichtigste ist. Eine inspirierende Begegnung, eine unerwartete Chance oder eine plötzliche Idee könnten dir den Weg zeigen. Bleib offen und neugierig.",
    "cards.tarot.LeBateleur.meaning.var3":
      "Der Magier steht für einen mutigen Neuanfang. Er ermutigt dich, dich mit deiner Lebenskraft zu verbinden und mit Selbstvertrauen zu handeln. Was du jetzt beginnst, hat das Potenzial, dauerhaft zu bestehen – vorausgesetzt, du bringst Herz und Willen ein. Diese Karte erscheint oft, wenn du bereit bist, die Kontrolle über dein Leben zurückzuerlangen. Eine neue Erkenntnis gibt dir die Chance, deine Entscheidungen mit deinen tiefsten Werten in Einklang zu bringen. Jetzt ist die Zeit, mit Klarheit und Begeisterung zu handeln.",
    "cards.tarot.LaPapesse.name": "Die Hohepriesterin",
    "cards.tarot.LaPapesse.meaning": "Intuition, Geheimnis, verborgenes Wissen",
    "cards.tarot.LaPapesse.meaning.var1":
      "Die Hohepriesterin lädt dich ein, langsamer zu werden und zuzuhören. Eine leise, aber tiefgreifende Veränderung ist im Gange. Sie erinnert dich daran, dass die Antworten nicht im Außen, sondern in deinem Inneren liegen. Durch deine Intuition bewegst du dich auf eine gerechte und stimmige Veränderung zu. Jetzt ist die Zeit zum Beobachten, Nachdenken und dich wieder mit deinen wahren Gefühlen zu verbinden. Handeln kommt später – lass dich jetzt von deiner inneren Weisheit leiten.",
    "cards.tarot.LaPapesse.meaning.var2":
      "Die Hohepriesterin erscheint, wenn du bereit bist, tiefere Wahrheiten zu erkennen. Sie steht für innere Reife und einen Weg, der sich im Stillen und durch Selbstreflexion zeigt. Deine Entscheidungen werden nicht leichtfertig getroffen – sie entspringen einem Ort der Klarheit und Ausrichtung. Diese Karte kann auch den Beginn einer vertrauensvollen Beziehung oder die Stärkung einer bestehenden Verbindung anzeigen. Du gehst mit Anmut voran, beschützt von einer sanften, uralten Kraft.",
    "cards.tarot.LaPapesse.meaning.var3":
      "Die Hohepriesterin ist die Hüterin von Geheimnissen und verborgenem Wissen. Sie ermutigt dich, deinem Gespür zu vertrauen – selbst wenn es der Logik widerspricht. Jetzt ist nicht die Zeit zum Handeln, sondern zum Verstehen, Fühlen und dich selbst zu zentrieren. Deine zukünftigen Entscheidungen werden stärker sein, wenn sie aus deiner inneren Wahrheit entstehen. Die Hohepriesterin lädt dich ein, in deine Tiefe zu tauchen, um mit Klarheit und Weisheit neu aufzutauchen.",
    "cards.tarot.LImperatrice.name": "Die Herrscherin",
    "cards.tarot.LImperatrice.meaning":
      "Fruchtbarkeit, Fülle, weibliche Kreativität",
    "cards.tarot.LImperatrice.meaning.var1":
      "Die Kaiserin lädt dich ein, dein Vertrauen in deine Fähigkeit wiederzugewinnen, mit Intelligenz zu schaffen, zu verstehen und zu führen. Sie symbolisiert eine aktive, klare und großzügige Weiblichkeit. Du bist bereit{genderSuffix}, etwas Konkretes zu erschaffen: eine Idee, ein Projekt oder eine Beziehung. Dank deiner analytischen Denkweise und scharfen Intuition kannst du solide Grundlagen für eine blühende Zukunft legen. Jetzt ist der ideale Zeitpunkt, mit Balance zu handeln: bewusst, ohne Hast, aber mit Entschlossenheit.",
    "cards.tarot.LImperatrice.meaning.var2":
      "Die Kaiserin verbindet dich wieder mit deiner schöpferischen Kraft. Ihre Energie treibt dich an, deine Ideen zu strukturieren und in die Realität umzusetzen. Sie spricht von Klarheit, Autonomie und Schönheit im Handeln. Du handelst nicht chaotisch: Du baust mit Verstand und stützt dich auf deine Erfahrung. Was du jetzt erschaffst, hat das Potenzial zu wachsen und sich vollständig zu entfalten. Es ist eine Einladung, deine natürliche Autorität anzunehmen, ohne Arroganz, aber mit Selbstsicherheit.",
    "cards.tarot.LImperatrice.meaning.var3":
      "Die Kaiserin wacht mit Weisheit über deine Entwicklung. Sie erinnert dich daran, dass wahre Stärke in Klarheit des Geistes und Selbstkontrolle liegt. Deine Kraft liegt in deiner Fähigkeit, kluge Entscheidungen zu treffen, Urteilsvermögen zu zeigen und dich durchzusetzen, ohne zu dominieren. Diese Karte ermutigt dich, deine Intelligenz auszudrücken, deine Kreativität zu pflegen und andere zu führen, ohne dich selbst zu verlieren. Die Zukunft wird bewusst geschrieben. Du hältst die Schlüssel in der Hand.",
    "cards.tarot.LEmpereur.name": "Der Herrscher",
    "cards.tarot.LEmpereur.meaning": "Autorität, Struktur, Führung",
    "cards.tarot.LEmpereur.meaning.var1":
      "Der Kaiser bringt dir Autorität, Struktur und Führung. Du bist bereit{genderSuffix}, die Kontrolle zu übernehmen und eine stabile Grundlage zu schaffen. Diese Karte ermutigt dich, mit Vertrauen und Verantwortung zu handeln. Deine Entscheidungen werden nachhaltige Auswirkungen haben, also führe mit Weisheit und Stärke.",
    "cards.tarot.LEmpereur.meaning.var2":
      "Mit dem Kaiser führen Ordnung und Disziplin deinen Weg. Du hast die Fähigkeit, deine Umgebung zu organisieren und deine Macht weise zu behaupten. Mach einen Schritt nach vorn und übernimm deine Rolle als Führungsperson. Struktur und Klarheit werden Türen zu neuen Möglichkeiten öffnen.",
    "cards.tarot.LEmpereur.meaning.var3":
      "Der Kaiser symbolisiert eine solide und verlässliche Präsenz. Du bist bereit{genderSuffix}, Führung und Unterstützung für deine Umgebung zu bieten. Nutze deine Erfahrung und Autorität, um Stabilität und Wachstum zu schaffen. Finde das Gleichgewicht zwischen Festigkeit und Gerechtigkeit, um die besten Ergebnisse zu erzielen.",
    "cards.tarot.LePape.name": "Der Hierophant",
    "cards.tarot.LePape.meaning": "Traditionelle Weisheit, spirituelle Führung",
    "cards.tarot.LePape.meaning.var1":
      "Der Papst lädt dich ein, dich mit deiner inneren Weisheit zu verbinden und Antworten in der Tradition und Erfahrung zu suchen. Du bist bereit{genderSuffix}, zu führen oder dich mit Wohlwollen führen zu lassen. Diese Karte spricht von Weitergabe, klugen Ratschlägen und einem Fortschritt, der auf tiefen Werten basiert. Eine wichtige Entscheidung könnte anstehen: Triff deine Wahl auf Grundlage dessen, was richtig ist, nicht impulsiv.",
    "cards.tarot.LePape.meaning.var2":
      "Der Papst steht für eine starke Unterstützung in einer Zeit, in der du nach Stabilität und Wahrheit suchst. Er ermutigt dich, den Lehren der Vergangenheit zu lauschen, um die Gegenwart besser zu verstehen. Du bist bereit{genderSuffix}, essenzielles Wissen weiterzugeben oder zu empfangen. Diese Karte kann auch auf einen Mentor oder eine spirituelle Figur hinweisen, die dich begleitet.",
    "cards.tarot.LePape.meaning.var3":
      "Als Symbol für Weisheit und Tradition lädt dich der Papst ein, Abstand zu nehmen und mit Klarheit zu reflektieren. Du befindest dich in einer Phase, in der Intuition und Vernunft zusammenarbeiten müssen. Du bist bereit{genderSuffix}, deine Werte zu verkörpern, Geduld zu zeigen und stabile Grundlagen zu schaffen. Jetzt ist der Moment gekommen, dem langsamen, aber kraftvollen Prozess des Wachstums zu vertrauen.",
    "cards.tarot.LAmoureux.name": "Die Liebenden",
    "cards.tarot.LAmoureux.meaning": "Entscheidungen, Beziehungen, Harmonie",
    "cards.tarot.LAmoureux.meaning.var1":
      "Die Liebenden fordern dich auf, eine wichtige Entscheidung zu treffen – oft in Bezug auf Gefühle, Beziehungen oder deine tiefsten Werte. Du bist bereit{genderSuffix}, dem zu folgen, was in dir Resonanz findet, auch wenn der Weg noch nicht ganz klar ist. Diese Karte ermutigt dich, auf dein Herz zu hören, Leidenschaft mit Vernunft zu vereinen und dich bewusst zu engagieren. Harmonie entsteht, wenn du deine Entscheidung voll und ganz annimmst.",
    "cards.tarot.LAmoureux.meaning.var2":
      "Die Liebenden stehen für eine Phase tiefer Verbundenheit – mit dir selbst oder einer anderen Person. Du befindest dich in einem Moment, in dem Gefühle Raum einnehmen und geklärt werden wollen. Du bist bereit{genderSuffix}, dein Herz zu öffnen und eine ehrliche Beziehung zu leben oder mit einem Teil von dir selbst Frieden zu schließen. Diese Karte lädt dich ein, deine Wünsche mit deinen Handlungen in Einklang zu bringen.",
    "cards.tarot.LAmoureux.meaning.var3":
      "Angesichts einer schwierigen Entscheidung erinnern dich die Liebenden daran, dass Liebe – in all ihren Formen – Mut erfordert. Du bist bereit{genderSuffix}, dich für das zu entscheiden, was dich wirklich nährt. Es geht nicht darum, anderen zu gefallen, sondern dir selbst treu zu bleiben. Persönliche Ausrichtung ist der Schlüssel zu echter Harmonie.",
    "cards.tarot.LeChariot.name": "Der Wagen",
    "cards.tarot.LeChariot.meaning": "Sieg, Willenskraft, Entschlossenheit",
    "cards.tarot.LeChariot.meaning.var1":
      "Der Wagen ermutigt dich, die Zügel deines Lebens mit Entschlossenheit in die Hand zu nehmen. Du bist bereit{genderSuffix}, vorwärtszugehen, Hindernisse zu überwinden und deinen Willen durchzusetzen. Diese Karte symbolisiert Sieg durch Selbstbeherrschung, Zielklarheit und den Mut, weiterzumachen. Nichts kann dich aufhalten, wenn du dich fokussiert{genderSuffix} deiner Richtung hingibst.",
    "cards.tarot.LeChariot.meaning.var2":
      "Der Wagen kündigt schnellen und kontrollierten Fortschritt an. Du befindest dich in einer Dynamik von Bewegung, Eroberung und gesunder Ambition. Du bist bereit{genderSuffix}, mit Selbstvertrauen zu führen, ohne dein inneres Gleichgewicht zu verlieren. Diese Karte lädt dich ein, gegensätzliche Kräfte zu kanalisieren, zentriert{genderSuffix} zu bleiben und mit Vertrauen auf das zuzugehen, was du wirklich willst.",
    "cards.tarot.LeChariot.meaning.var3":
      "Mit dem Wagen trittst du in eine Phase aktiven Erfolgs ein. Du bist bereit{genderSuffix}, zu handeln, Herausforderungen anzunehmen und siegreich{genderSuffix} hervorzugehen dank deiner Disziplin und Entscheidungsfreude. Es ist eine Karte des Sieges über Zweifel und Zögern. Gehe voran mit Vertrauen in dich selbst, der Weg öffnet sich vor dir.",
    "cards.tarot.LaJustice.name": "Die Gerechtigkeit",
    "cards.tarot.LaJustice.meaning": "Gleichgewicht, Wahrheit, Konsequenzen",
    "cards.tarot.LaJustice.meaning.var1":
      "Die Gerechtigkeit fordert dich auf, mit Urteilsvermögen zu handeln. Du bist bereit{genderSuffix}, die Dinge klar zu sehen, die Konsequenzen deiner Handlungen zu tragen und gerechte Entscheidungen zu treffen. Diese Karte drängt dich, inneres Gleichgewicht zu suchen und im Einklang mit deinen Werten zu handeln. Die Wahrheit ist eine starke Verbündete – durch sie gewinnst du an Klarheit und Stärke.",
    "cards.tarot.LaJustice.meaning.var2":
      "Mit der Gerechtigkeit trittst du in eine Phase der Ordnung, Verantwortung und des Ausgleichs ein. Du bist bereit{genderSuffix}, fundierte Entscheidungen zu treffen – auch wenn sie Mut und Unparteilichkeit erfordern. Diese Karte zeigt an, dass es an der Zeit ist, Ordnung zu schaffen, etwas zu reparieren oder eine faire Entscheidung zu treffen. Du bewegst dich auf mehr Reife zu.",
    "cards.tarot.LaJustice.meaning.var3":
      "Die Gerechtigkeit führt dich zur Ehrlichkeit und Fairness. Sie lädt dich ein, deine Situation ohne Illusion zu betrachten und deinem inneren Urteil zu vertrauen. Du bist bereit{genderSuffix}, ein gestörtes Gleichgewicht wiederherzustellen, auszusprechen, was gesagt werden muss, und verantwortungsvoll zu handeln. Diese Karte ermutigt dich, zu unterscheiden, was für dich gerecht ist und was nicht mehr.",
    "cards.tarot.LHermite.name": "Der Eremit",
    "cards.tarot.LHermite.meaning": "Introspektion, innere Weisheit, Führung",
    "cards.tarot.LHermite.meaning.var1":
      "Der Eremit lädt dich zu einer tiefen inneren Reise ein. Du bist bereit{genderSuffix}, dich vom äußeren Lärm zurückzuziehen, um die Wahrheit in dir zu suchen. Diese gewählte Einsamkeit erlaubt dir, auf deine Weisheit zuzugreifen und deinen Weg besser zu verstehen.",
    "cards.tarot.LHermite.meaning.var2":
      "Mit dem Eremiten beginnst du eine Phase der Reflexion und inneren Führung. Du bist bereit{genderSuffix}, deiner inneren Stimme zuzuhören, auch wenn sie dich auf weniger begangene Pfade führt. Diese Karte ermutigt zu Geduld und Unterscheidungsvermögen.",
    "cards.tarot.LHermite.meaning.var3":
      "Der Eremit führt dich zur Introspektion und inneren Licht. Du bist bereit{genderSuffix}, dich von äußeren Einflüssen zu lösen, um deine tiefe Weisheit besser zu hören. Diese Karte fordert dich auf, vorsichtig voranzuschreiten, aber mit gestärkter innerer Gewissheit.",
    "cards.tarot.LaRouedeFortune.name": "Das Rad des Schicksals",
    "cards.tarot.LaRouedeFortune.meaning": "Veränderung, Zyklen, Schicksal",
    "cards.tarot.LaRouedeFortune.meaning.var1":
      "Das Rad des Schicksals fordert dich auf, den Wandel als natürliche Kraft zu akzeptieren. Du bist bereit{genderSuffix}, den Zyklen des Lebens zu folgen – auch wenn sie dich ins Unbekannte führen. Diese Karte erinnert dich daran, dass das Schicksal in Bewegung ist und Anpassungsfähigkeit der Schlüssel zum Vorankommen ist.",
    "cards.tarot.LaRouedeFortune.meaning.var2":
      "Mit dem Rad des Schicksals beginnt eine neue Phase. Du bist bereit{genderSuffix}, ein neues Kapitel aufzuschlagen, Wendungen des Lebens zu akzeptieren und aus vergangenen Erfahrungen zu lernen. Diese Karte steht für Transformation und ständige Weiterentwicklung.",
    "cards.tarot.LaRouedeFortune.meaning.var3":
      "Das Rad des Schicksals hilft dir, mit Weisheit durch Höhen und Tiefen zu gehen. Du bist bereit{genderSuffix}, zu erkennen, dass jeder Zyklus ein Ende und einen Anfang hat. Diese Karte ermutigt dich, offen{genderSuffix} für den Fluss des Lebens zu bleiben – im Vertrauen und in Harmonie mit deinem Weg.",
    "cards.tarot.LaForce.name": "Die Stärke",
    "cards.tarot.LaForce.meaning": "Mut, Geduld, innere Meisterschaft",
    "cards.tarot.LaForce.meaning.var1":
      "Die Kraft erinnert dich daran, dass deine wahre Stärke in Sanftheit und Geduld liegt. Du bist bereit{genderSuffix}, deine Energie zu kanalisieren, Impulse zu zügeln und Herausforderungen mit ruhiger Entschlossenheit zu begegnen. Diese Karte spricht von innerer Beherrschung und stillem Mut. Setze mehr auf Beständigkeit statt Eile; das wird dich weiter bringen als rohe Kraft.",
    "cards.tarot.LaForce.meaning.var2":
      "Mit der Kraft bist du eingeladen{genderSuffix}, deine moralische Stärke zu nutzen, um Hindernisse zu überwinden. Du bist bereit{genderSuffix}, Prüfungen zu bestehen ohne überwältigt zu werden, mit Vertrauen in dich und deine Fähigkeiten. Diese Karte fördert Resilienz und innere Balance. Atme bevor du handelst – Gelassenheit ist dein bester Verbündeter.",
    "cards.tarot.LaForce.meaning.var3":
      "Die Kraft symbolisiert inneren Mut und die Fähigkeit, in Spannungen geerdet{genderSuffix} zu bleiben. Du bist bereit{genderSuffix}, Gelassenheit zu zeigen, deine Ängste zu meistern und Widrigkeiten in persönliches Wachstum zu verwandeln. Diese Karte fordert dich auf, deiner inneren Stabilität zu vertrauen. Hebe dein Haupt und schreite furchtlos voran – dein innerer Frieden öffnet die richtigen Türen.",
    "cards.tarot.LePendu.name": "Der Gehängte",
    "cards.tarot.LePendu.meaning": "Opfer, neue Perspektive, Loslassen",
    "cards.tarot.LePendu.meaning.var1":
      "Der Gehängte lädt dich ein, deine Perspektive zu ändern. Du bist bereit{genderSuffix}, alte Muster loszulassen und deine Situation aus einem neuen Blickwinkel zu sehen, auch wenn es ein vorübergehendes Opfer erfordert. Diese Karte steht für Akzeptanz und Geduld. Manchmal ist das Loslassen der Schlüssel zur inneren Freiheit.",
    "cards.tarot.LePendu.meaning.var2":
      "Mit dem Gehängten begibst du dich in eine Phase der notwendigen Pause. Du bist bereit{genderSuffix}, innezuhalten, um tiefer zu verstehen, was in dir vorgeht. Dieser Moment der Ruhe ist keine Schwäche, sondern ein Übergang zu mehr Klarheit. Nimm diese Stille als fruchtbaren Boden für deine Entwicklung an.",
    "cards.tarot.LePendu.meaning.var3":
      "Der Gehängte symbolisiert eine Zeit, in der Loslassen essenziell wird. Du bist bereit{genderSuffix}, das hinter dir zu lassen, was deinem Wachstum nicht mehr dient – auch wenn es Mut und Demut verlangt. Diese Karte führt dich durch Reduktion zur Erkenntnis. Gib den Widerstand auf – in der Leere liegt der Neuanfang.",
    "cards.tarot.LArcanesansnom.name": "Der Tod",
    "cards.tarot.LArcanesansnom.meaning": "Transformation, Ende, Neubeginn",
    "cards.tarot.LArcanesansnom.meaning.var1":
      "Lass dich nicht vom Namen täuschen: Der Tod symbolisiert tiefe Transformation, nicht ein tragisches Ende. Du bist bereit{genderSuffix}, eine alte Lebensphase hinter dir zu lassen und den Weg zu einem Neubeginn zu öffnen, der besser mit deinem Selbst im Einklang ist{genderSuffix}. Dieses namenlose Arkana befreit dich von dem, was dich belastete – damit du leichter in deine Metamorphose gehst.",
    "cards.tarot.LArcanesansnom.meaning.var2":
      "Der Tod ist keine negative Karte, sondern eine Einladung zu radikalem Wandel. Du bist bereit{genderSuffix}, eine bedeutende Seite umzuschlagen, ein Kapitel zu schließen, das nicht mehr mit deinem Jetzt in Resonanz ist. Dieser Übergang mag unbequem sein, doch er bringt Wiedergeburt und neue Chancen. Lass los, was an der Vergangenheit haftet, um besser zu empfangen, was kommt.",
    "cards.tarot.LArcanesansnom.meaning.var3":
      "Dieses namenlose Arkana kennzeichnet ein notwendiges Ende für eine nachhaltige Transformation. Im Gegensatz zum Anschein spricht diese Karte eher von Leben als von Tod: sie ruft eine innere Reinigung hervor. Du bist bereit{genderSuffix}, loszulassen, was dir nicht mehr dient, Illusionen oder veraltete Gewohnheiten zu verabschieden. Was du heute loslässt, bereitet das Wachstum von morgen vor.",
    "cards.tarot.Temperance.name": "Die Mäßigkeit",
    "cards.tarot.Temperance.meaning": "Ausgleich, Heilung, Harmonie",
    "cards.tarot.Temperance.meaning.var1":
      "Die Mäßigkeit lädt dich ein zu Sanftheit und Harmonie. Du bist bereit{genderSuffix}, deine Emotionen zu beruhigen, Extreme zu vermeiden und den Mittelweg zu finden. Diese Karte spricht von innerer Heilung, einer Zeit der Integration, in der alles sanft ins Gleichgewicht kommt. Übe Geduld: Dinge fügen sich, wenn du dein eigenes Tempo respektierst.",
    "cards.tarot.Temperance.meaning.var2":
      "Mit der Mäßigkeit beginnt eine Phase der Ruhe. Du bist bereit{genderSuffix}, Gegensätze in Dialog treten zu lassen, ebenso zu lauschen wie dich auszudrücken, eine Brücke zwischen scheinbar widersprüchlichen Teilen zu bauen. Diese Karte erinnert an die Alchemie von Herz und Verstand. Erlaube dir, langsamer zu werden, um klarer in Einklang zu kommen.",
    "cards.tarot.Temperance.meaning.var3":
      "Die Mäßigkeit symbolisiert wiedergewonnenes Gleichgewicht, inneren Frieden, der mit Reife eintritt. Du bist bereit{genderSuffix}, fließen zu lassen, was fließen will, ohne zu erzwingen oder festzuhalten. Es ist Zeit, dich mit deinem Zentrum zu verbinden, mit jener ruhigen Stabilität, die dich trägt. Pflege dieses fragile Gleichgewicht, es ist deine Stärke.",
    "cards.tarot.LeDiable.name": "Der Teufel",
    "cards.tarot.LeDiable.meaning": "Abhängigkeiten, Illusionen, Materialismus",
    "cards.tarot.LeDiable.meaning.var1":
      "Der Teufel stellt dich deinen unsichtbaren Ketten gegenüber. Du bist bereit{genderSuffix}, die Abhängigkeiten zu erkennen, die dich einschränken, seien sie materiell, emotional oder geistig. Diese Karte lädt dich ein, die Illusionen zu durchbrechen, die dich daran hindern, die Wahrheit zu sehen, und deine innere Kraft zurückzuerobern. Wage es, dich von dem zu befreien, was dich bindet.",
    "cards.tarot.LeDiable.meaning.var2":
      "Mit dem Teufel stellst du dich deinen Versuchungen und tiefen Ängsten. Diese Karte ermutigt dich, über das Äußere hinauszuschauen und die Wurzeln deiner zwanghaften Verhaltensweisen zu verstehen. Indem du dir dessen bewusst wirst, kannst du beginnen, die Knoten zu lösen, die dich zurückhalten. Denk daran, Licht durchdringt immer die Dunkelheit.",
    "cards.tarot.LeDiable.meaning.var3":
      "Der Teufel fordert dich auf, deine Beziehung zum Materiellen und zu unmittelbaren Vergnügungen zu prüfen. Du bist bereit{genderSuffix}, deine Werte zu hinterfragen und zu sehen, ob bestimmte Illusionen deine Entscheidungen kontrollieren. Diese Karte erinnert dich daran, dass wahre Freiheit aus Bewusstsein und Selbstbeherrschung entsteht. Versuche, deine Ketten in Stärke zu verwandeln.",
    "cards.tarot.LaMaisonDieu.name": "Der Turm",
    "cards.tarot.LaMaisonDieu.meaning":
      "Plötzliche Offenbarung, radikale Veränderung",
    "cards.tarot.LaMaisonDieu.meaning.var1":
      "Der Turm erschüttert dich plötzlich und offenbart verborgene Wahrheiten. Du bist bereit{genderSuffix}, diesen radikalen Wandel anzunehmen, auch wenn er beunruhigend ist. Diese Karte lädt dich ein, die notwendige Transformation zu akzeptieren, um auf stärkeren Fundamenten neu aufzubauen. Manchmal muss man das Alte loslassen, um stärker wiedergeboren zu werden.",
    "cards.tarot.LaMaisonDieu.meaning.var2":
      "Mit dem Turm wird deine Realität durch eine plötzliche Offenbarung erschüttert. Du bist bereit{genderSuffix}, dich der Zerstörung von Überzeugungen zu stellen, die dir nicht mehr dienen. Dieser Moment des Chaos kündigt eine kraftvolle Befreiung an, die es dir ermöglicht, dich von dem zu lösen, was dich zurückhält. Behalte deinen Glauben, nach dem Sturm kommt Klarheit.",
    "cards.tarot.LaMaisonDieu.meaning.var3":
      "Der Turm lädt dich ein, die notwendigen Brüche für deine Entwicklung zu akzeptieren. Du bist bereit{genderSuffix}, fragile Konstruktionen aufzugeben und den Weg für eine tiefgreifende Erneuerung zu öffnen. Diese Karte erinnert daran, dass schmerzhafte Stürze oft die schönsten Wiedergeburten vorbereiten.",
    "cards.tarot.LEtoile.name": "Der Stern",
    "cards.tarot.LEtoile.meaning": "Hoffnung, Inspiration, göttliche Führung",
    "cards.tarot.LEtoile.meaning.var1":
      "Der Stern bringt dir einen Hauch von Hoffnung und Inspiration. Du bist bereit{genderSuffix}, an eine bessere Zukunft zu glauben und der göttlichen Führung zu folgen, die deinen Weg erleuchtet. Zögere nicht, dich mit deinem inneren Licht zu verbinden, um selbstbewusst voranzuschreiten.",
    "cards.tarot.LEtoile.meaning.var2":
      "Mit dem Stern öffnet sich für dich eine Zeit der spirituellen Erneuerung. Du bist bereit{genderSuffix}, Botschaften des Universums zu empfangen und dich von deiner Intuition leiten zu lassen. Bleibe offen{genderSuffix} und pflege Vertrauen in dich selbst und das Leben.",
    "cards.tarot.LEtoile.meaning.var3":
      "Der Stern lädt dich ein, auch in unsicheren Zeiten den Glauben zu bewahren. Du bist bereit{genderSuffix}, dich inspirieren zu lassen und deine Träume mit Geduld und Gelassenheit zu verfolgen. Nimm dir Zeit, dich mit dem zu verbinden, was dich tief nährt.",
    "cards.tarot.LaLune.name": "Der Mond",
    "cards.tarot.LaLune.meaning": "Illusionen, Unterbewusstsein, Intuition",
    "cards.tarot.LaLune.meaning.var1":
      "Der Mond lädt dich ein, dein Unterbewusstsein zu erforschen und auf deine Intuition zu hören. Du bist bereit{genderSuffix} zu akzeptieren, dass nicht alles immer klar ist und Illusionen dich täuschen können. Bleibe aufmerksam für die subtilen Zeichen, die dich durch die Schatten führen.",
    "cards.tarot.LaLune.meaning.var2":
      "Mit dem Mond kommen tiefe Geheimnisse und Emotionen an die Oberfläche. Du bist bereit{genderSuffix}, in dich selbst einzutauchen, auch wenn das Zweifel oder Ängste weckt. Lehne deine Gefühle nicht ab, sie helfen dir, dich besser zu verstehen.",
    "cards.tarot.LaLune.meaning.var3":
      "Der Mond ermutigt dich, deiner Intuition trotz der Unsicherheiten und Illusionen um dich herum zu vertrauen. Du bist bereit{genderSuffix}, das Unbekannte anzunehmen und dich von Ängsten zu befreien, die dich zurückhalten. Sei geduldig mit dir selbst auf diesem Weg.",
    "cards.tarot.LeSoleil.name": "Die Sonne",
    "cards.tarot.LeSoleil.meaning": "Freude, Erfolg, Vitalität",
    "cards.tarot.LeSoleil.meaning.var1":
      "Die Sonne bringt dir Licht und positive Energie. Du bist bereit{genderSuffix}, Freude zu empfangen und deine Erfolge zu feiern. Nutze diese Vitalität, um mit Zuversicht und Begeisterung voranzukommen.",
    "cards.tarot.LeSoleil.meaning.var2":
      "Mit der Sonne öffnet sich eine Zeit der Klarheit und des Optimismus für dich. Du bist bereit{genderSuffix}, zu strahlen, deine gute Laune zu teilen und gute Chancen anzuziehen. Halte dein Herz offen und genieße jeden Moment.",
    "cards.tarot.LeSoleil.meaning.var3":
      "Die Sonne lädt dich ein, deine innere Stärke und Vitalität zurückzugewinnen. Du bist bereit{genderSuffix}, Hindernisse mit einer positiven Einstellung zu überwinden und diejenigen um dich herum zu inspirieren. Zweifel nicht an deiner Fähigkeit, Erfolg zu haben.",
    "cards.tarot.LeJugement.name": "Das Gericht",
    "cards.tarot.LeJugement.meaning":
      "Spirituelles Erwachen, Wiedergeburt, Vergebung",
    "cards.tarot.LeJugement.meaning.var1":
      "Das Gericht lädt dich zu einem tiefen inneren Erwachen ein. Du bist bereit{genderSuffix}, vergangene Fehler anzuerkennen und spirituelle Wiedergeburt zu umarmen. Begrüße diese Transformation, um mit Leichtigkeit und Klarheit voranzukommen.",
    "cards.tarot.LeJugement.meaning.var2":
      "Mit dem Gericht öffnet sich eine Zeit der Vergebung und Befreiung für dich. Du bist bereit{genderSuffix}, dich von den Lasten der Vergangenheit zu befreien und dich mit deiner Wahrheit zu verbinden. Öffne dein Herz und lass dich zu einem neuen Leben führen.",
    "cards.tarot.LeJugement.meaning.var3":
      "Das Gericht fordert dich auf, deinem inneren Ruf zu lauschen und bewusst zu handeln. Du bist bereit{genderSuffix}, Frieden mit dir selbst zu schließen und stärker wiedergeboren zu werden. Fürchte dich nicht vor Veränderung, sie bringt Hoffnung.",
    "cards.tarot.LeMonde.name": "Die Welt",
    "cards.tarot.LeMonde.meaning": "Vollendung, Erfolg, Erfüllung",
    "cards.tarot.LeMonde.meaning.var1":
      "Die Welt symbolisiert Vollendung und Erfolg. Du bist bereit{genderSuffix}, das Ende eines wichtigen Zyklus zu feiern. Genieße diesen Moment der Erfüllung, um alles zu schätzen, was du erreicht hast, und bereite dich mit Zuversicht auf das Kommende vor.",
    "cards.tarot.LeMonde.meaning.var2":
      "Mit der Welt endet ein kompletter Zyklus und öffnet die Tür zu neuen Möglichkeiten. Du bist bereit{genderSuffix}, die gelernten Lektionen zu integrieren und mit Gelassenheit voranzuschreiten. Begrüße diese Phase als persönlichen Sieg.",
    "cards.tarot.LeMonde.meaning.var3":
      "Die Welt lädt dich ein, Harmonie und Ganzheit voll zu erleben. Du bist bereit{genderSuffix}, deinen Wert anzuerkennen und dich mit Dankbarkeit der Welt zu öffnen. Lass dich von dieser positiven Energie tragen, um deine Projekte zu verwirklichen.",

    // Card Names and Meanings - Angels
    "cards.angels.ArchangeMichel.name": "Erzengel Michael",
    "cards.angels.ArchangeMichel.meaning": "Göttlicher Schutz, Mut und Stärke",
    "cards.angels.ArchangeMichel.meaning.var1":
      "Erzengel Michael umgibt dich mit seinem mächtigen Schutz. Er gibt dir den Mut, schwierige Situationen zu meistern und dich gegen negative Energien zu verteidigen. Diese Karte erinnert dich daran, dass du in Prüfungen nie allein bist. Konkret, wenn du dich bedroht oder instabil fühlst, rät Michael dir, klare Grenzen zu setzen. Lerne, Nein zu sagen zu Menschen oder Situationen, die dir Energie rauben. Schütze deinen persönlichen Raum, sei er physisch oder emotional. Sein Lichtschwert durchtrennt toxische Verbindungen und befreit dich von lähmenden Ängsten. Zögere nicht, um Hilfe zu bitten, wenn du sie brauchst – das ist ein Zeichen von Stärke, nicht von Schwäche.",
    "cards.angels.ArchangeMichel.meaning.var2":
      "Diese Karte kündigt das Eingreifen einer schützenden Kraft in deinem Leben an. Michael bittet dich, mutig aufzustehen und deine persönliche Kraft zurückzuerobern. Du hast Momente der Verletzlichkeit durchlebt, doch jetzt ist es Zeit, deine innere Stärke zurückzugewinnen. Im Alltag identifiziere, was dein Selbstvertrauen schwächt. Ist es eine toxische Beziehung? Ein erdrückendes berufliches Umfeld? Wiederkehrende negative Gedanken? Michael ermutigt dich, entschlossen zu handeln, um die Situation zu ändern. Seine Anwesenheit garantiert dir Rückhalt in diesem Prozess. Triff eine Entscheidung, die du aus Angst aufgeschoben hast, stelle dich jemandem, der dich respektlos behandelt, oder äußere klar deine Bedürfnisse.",
    "cards.angels.ArchangeMichel.meaning.var3":
      "Die Energie Michaels bringt göttlichen Schutz in diesen Moment deines Lebens. Er erinnert dich daran, dass du ungeahnte Kraft besitzt. Diese Karte lädt dich ein, standhaft in der Widrigkeit zu bleiben und deine Werte und Überzeugungen zu verteidigen. Praktisch gesehen, überprüfe, wo du dich aus Angst vor Konflikten oder Ablehnung anpasst. Michael gibt dir den Mut, authentisch zu bleiben, selbst wenn das einigen missfällt. Seine Kraft erlaubt es dir, gesunde Grenzen in deinen Beziehungen zu setzen. Wenn du Ungerechtigkeit erlebst, ist jetzt der Moment zu handeln. Sein Schild schützt dich, während du Stellung beziehst. Denke daran, wahre Stärke liegt nicht in Aggression, sondern in ruhiger und fester Selbstbehauptung.",
    "cards.angels.ArchangeGabriel.name": "Erzengel Gabriel",
    "cards.angels.ArchangeGabriel.meaning":
      "Göttliche Botschaften, Kreativität und Kommunikation",
    "cards.angels.ArchangeGabriel.meaning.var1":
      "Erzengel Gabriel bringt dir eine wichtige Botschaft. Er ist der göttliche Bote, der die Kommunikationskanäle in deinem Leben öffnet. Diese Karte zeigt an, dass eine entscheidende Information zu dir kommt oder dass du etwas Wesentliches übermitteln sollst. Gabriel fördert auch deine Kreativität und ermutigt dich, das auszudrücken, was in dir ist. Konkret, achte auf Zeichen, Gespräche und Gelegenheiten, die sich zeigen. Es ist Zeit zu schreiben, zu sprechen, zu erschaffen. Wenn du ein künstlerisches Projekt im Kopf hast, leg los. Wenn du ein schwieriges Gespräch führen musst, gibt dir Gabriel die richtigen Worte. Vertraue deiner Intuition und ignoriere keine subtilen Botschaften.",
    "cards.angels.ArchangeGabriel.meaning.var2":
      "Gabriel kündigt eine Phase der Kommunikation und persönlichen Ausdruckskraft an. Er fordert dich auf, deine Stimme zu befreien und deine Ideen mit der Welt zu teilen. Vielleicht hast du zu lange zu einem Thema geschwiegen, das dir wichtig ist. Diese Karte ermutigt dich, ohne Angst vor Urteil zu sprechen, zu schreiben und zu erschaffen. Im Alltag erkenne, was du mitteilen musst. Ein Gefühl, das du einem geliebten Menschen sagen willst? Ein kreatives Projekt, das gestartet werden will? Eine Wahrheit, die ausgesprochen werden muss? Gabriel steht dir in diesem Prozess bei. Er fördert auch den Empfang wichtiger Nachrichten, bleibe offen. Göttliche Botschaften können auf unerwarteten Wegen zu dir kommen.",
    "cards.angels.ArchangeGabriel.meaning.var3":
      "Die Energie Gabriels weckt deine Kreativität und klärt deine Kommunikation. Er erinnert dich daran, dass du etwas Einzigartiges zu bieten hast. Diese Karte lädt dich ein, deine künstlerischen Talente oder dein Redetalent zu nutzen. Praktisch gesehen, widme dich diese Woche einer kreativen Tätigkeit, auch wenn sie einfach ist. Schreibe in ein Tagebuch, male, singe, dekoriere deinen Raum. Gabriel löst auch Situationen, in denen Kommunikation schwierig war. Wenn du auf Nachrichten wartest, werden sie bald kommen. Wenn du ein Missverständnis klären musst, ist jetzt der richtige Zeitpunkt. Drücke dich authentisch aus und höre wirklich zu, was andere dir sagen.",
    "cards.angels.ArchangeRaphael.name": "Erzengel Raphael",
    "cards.angels.ArchangeRaphael.meaning":
      "Körperliche und emotionale Heilung",
    "cards.angels.ArchangeRaphael.meaning.var1":
      "Erzengel Raphael umhüllt dich mit seiner heilenden Energie. Er lindert deine physischen und emotionalen Wunden sanft und mit Mitgefühl. Diese Karte zeigt an, dass ein Heilungsprozess in deinem Leben im Gange ist. Raphael erinnert dich daran, dass Selbstfürsorge kein Egoismus, sondern notwendig ist. Konkret, gönn dir Ruhe, wenn dein Körper es verlangt. Suche bei Vernachlässigung von Symptomen ärztlichen Rat. Auf emotionaler Ebene erlaube dir, Gefühle zu spüren und loszulassen. Raphael führt dich zu Menschen und Praktiken, die deine Heilung unterstützen, sei es Medizin, Therapie oder einfach Zeit für dich.",
    "cards.angels.ArchangeRaphael.meaning.var2":
      "Raphael kündigt eine Phase der Erholung und Regeneration an. Er bittet dich, langsamer zu machen und auf die Bedürfnisse deines Körpers und Herzens zu hören. Vielleicht bist du zu weit gegangen, hast Warnsignale ignoriert oder zu schwere Lasten alleine getragen. Diese Karte ermutigt dich, Hilfe zu bitten und angebotene Unterstützung anzunehmen. Im Alltag erkenne, was besondere Aufmerksamkeit braucht. Anhaltende Müdigkeit? Eine ungeheilte emotionale Wunde? Beziehungen, die dir schaden? Raphael gibt dir die Kraft, notwendige Veränderungen für dein Wohlbefinden vorzunehmen. Vereinbare einen Termin beim Arzt, Therapeuten oder gönn dir einen kompletten Ruhetag.",
    "cards.angels.ArchangeRaphael.meaning.var3":
      "Die heilende Energie Raphaels wirkt gerade in deinem Leben. Er hilft dir, vergangenes Leid loszulassen und dein inneres Gleichgewicht wiederherzustellen. Diese Karte lädt dich ein, deine Wunden mit Güte zu behandeln, sichtbar oder unsichtbar. Praktisch gesehen, pflege Gewohnheiten, die Körper und Geist nähren. Iss gesund, schlafe ausreichend, bewege dich sanft. Für emotionale Wunden erwäge, mit vertrauten Personen zu sprechen oder deine Gefühle aufzuschreiben. Raphael erinnert dich, dass Heilung Zeit braucht und normal ist. Sei geduldig mit dir selbst und feiere jeden kleinen Fortschritt auf diesem Weg.",
    "cards.angels.ArchangeUriel.name": "Erzengel Uriel",
    "cards.angels.ArchangeUriel.meaning": "Göttliche Weisheit und Erleuchtung",
    "cards.angels.ArchangeUriel.meaning.var1":
      "Erzengel Uriel erleuchtet deinen Weg mit göttlicher Weisheit. Er hilft dir, komplexe Situationen klar zu sehen und die tiefere Bedeutung deines Erlebens zu verstehen. Diese Karte zeigt an, dass eine wichtige Bewusstwerdung bevorsteht. Uriel bringt ans Licht, was im Schatten lag, und offenbart dir wesentliche Wahrheiten. Konkret, nimm dir Zeit für Reflexion und Meditation. Die Antworten, die du suchst, sind bereits in dir, Uriel hilft dir nur, sie zu erkennen. Wenn du vor einer schweren Entscheidung stehst, betrachte die Situation aus verschiedenen Blickwinkeln. Uriel gibt dir die nötige Urteilsfähigkeit, um die richtige Wahl zu treffen. Vertraue plötzlichen Eingebungen und Momenten der Klarheit.",
    "cards.angels.ArchangeUriel.meaning.var2":
      "Uriel kündigt eine Phase der inneren Erleuchtung und tiefen Einsicht an. Er fordert dich auf, Weisheit jenseits der Oberfläche zu suchen und deinem inneren Wissen zu vertrauen. Du besitzt mehr Weisheit, als du denkst. Diese Karte ermutigt dich zu lernen, zu studieren und dich mit Themen zu beschäftigen, die dich interessieren. Im Alltag achte auf Synchronizitäten und Zufälle, die dich leiten. Uriel zeigt dir Muster und Lektionen in deinen Erfahrungen. Wenn dich etwas belastet, halte Abstand und beobachte losgelöst. Weisheit kommt oft, wenn wir aufhören hektisch zu suchen und sie natürlich aufsteigen lassen. Lies, lerne, hinterfrage.",
    "cards.angels.ArchangeUriel.meaning.var3":
      "Die Energie Uriels bringt Licht und Klarheit in dein Leben. Sie vertreibt Verwirrung und ermöglicht dir, die Wahrheit in Situationen zu sehen. Diese Karte lädt dich ein, deine innere Weisheit durch Beobachtung und Kontemplation zu vertiefen. Praktisch gesehen, schaffe Momente der Stille in deinem Alltag zur Reflexion. Führe ein Tagebuch, um deine Gedanken und Erkenntnisse festzuhalten. Uriel fördert Lernen, deshalb ist jetzt eine gute Zeit, dich in einem interessierenden Bereich weiterzubilden. Wenn du Antworten suchst, konsultiere Bücher der Weisheit oder inspirierende Lehrer. Uriel erinnert dich daran, dass wahres Wissen verändert und nicht nur Theorie bleibt. Setze das Gelernte im Alltag um.",
    "cards.angels.AngeGardien.name": "Schutzengel",
    "cards.angels.AngeGardien.meaning": "Persönlicher Schutz und Führung",
    "cards.angels.AngeGardien.meaning.var1":
      "Dein Schutzengel lässt dich wissen, dass er ständig an deiner Seite ist. Er wacht liebevoll über dich und schützt dich vor Gefahren, die du nicht einmal siehst. Diese Karte erinnert dich daran, dass du auf deinem Lebensweg niemals allein bist. Deine persönliche Führung ist immer verfügbar, du musst nur darum bitten. Konkret, wenn du dich verloren oder ängstlich fühlst, nimm dir einen Moment, um dich innerlich zu verbinden. Bitte deinen Schutzengel, dir Zeichen seiner Anwesenheit zu zeigen. Vertraue auf Intuitionen, die dich von einer Situation weg oder zu einer anderen hinlenken. Diese Impulse sind oft seine Art, dich zu führen. Wenn du eine schwierige Phase durchmachst, weiß, dass du geschützt und unterstützt bist, auch wenn du es noch nicht sehen kannst.",
    "cards.angels.AngeGardien.meaning.var2":
      "Diese Karte kündigt einen verstärkten Schutz um dich herum an. Dein Schutzengel sendet dir eine klare Botschaft, dass er deine Schritte lenkt und Hindernisse von deinem Weg fernhält. Er bittet dich, ihm zu vertrauen und deinem Instinkt zu folgen. Im Alltag achte auf kleine Wunder und glückliche Zufälle, die geschehen. Es ist dein Engel, der hinter den Kulissen für dein Wohl sorgt. Wenn du eine wichtige Entscheidung treffen musst, beruhige deinen Geist und höre auf diese sanfte, aber bestimmte innere Stimme. Dein Schutzengel kommuniziert durch Empfindungen, Träume und wiederholte Zeichen. Sei aufmerksam und danke ihm für seine ständige Präsenz in deinem Leben.",
    "cards.angels.AngeGardien.meaning.var3":
      "Die Energie deines Schutzengels umgibt dich mit Schutz und bedingungsloser Liebe. Er kennt deine Lebensaufgabe und hilft dir, auf dem richtigen Weg zu bleiben. Diese Karte lädt dich ein, deine Verbindung zu ihm durch Gebet oder Meditation zu stärken. Praktisch gesehen, entwickle ein tägliches Ritual, um seine Anwesenheit anzuerkennen. Das kann einfach ein Danke am Morgen oder eine Bitte um Führung vor dem Schlafengehen sein. Dein Schutzengel schützt dich nicht nur körperlich, sondern auch emotional und spirituell. Wenn du dich verletzlich fühlst, stelle dir seine Flügel vor, die dich umgeben. Er erinnert dich, dass du selbst in den dunkelsten Momenten zum Licht geführt wirst. Höre auf die Botschaften, die aus deinem Herzen kommen – oft spricht er durch sie.",
    "cards.angels.AngedelAmour.name": "Engel der Liebe",
    "cards.angels.AngedelAmour.meaning":
      "Harmonische Beziehungen und bedingungslose Liebe",
    "cards.angels.AngedelAmour.meaning.var1":
      "Der Engel der Liebe öffnet dein Herz für authentischere und harmonischere Beziehungen. Er lehrt dich, dass Liebe bei dir selbst beginnt und dann auf andere ausstrahlt. Diese Karte zeigt eine günstige Zeit an, um deine emotionalen Wunden zu heilen und gesunde Beziehungen anzuziehen. Bedingungslose Liebe bedeutet, ohne Urteil zu akzeptieren, zuerst dich selbst und dann andere. Konkret beobachte, wie du mit dir selbst sprichst. Bist du so hart zu dir selbst, wie du es nie mit einem Freund wärst? Ändere diesen inneren Dialog. In deinen Beziehungen übe echtes Zuhören und ehrlichen Ausdruck deiner Gefühle. Wenn du in einer Partnerschaft bist, ist es Zeit, die Verbindung neu zu entfachen. Wenn du Single bist, arbeite zuerst an deiner Selbstliebe, bevor du Liebe woanders suchst.",
    "cards.angels.AngedelAmour.meaning.var2":
      "Diese Karte kündigt eine Energie von Liebe und Harmonie an, die in dein Leben eintritt. Der Engel der Liebe erinnert dich daran, dass du es verdienst, für das geliebt zu werden, was du wirklich bist. Er ermutigt dich, deine Abwehr herunterzunehmen und dich in deinen Beziehungen verletzlich zu zeigen. Im Alltag erkenne die Mauern, die du aus Angst gebaut hast, verletzt zu werden. Diese Schutzmechanismen verhindern auch, dass du die dir angebotene Liebe empfängst. Wage es, deine echten Emotionen denen zu zeigen, die dir wichtig sind. Vergib alte Wunden, nicht für andere, sondern um dich selbst zu befreien. Der Engel der Liebe fördert auch bedeutsame Begegnungen, bleibe offen für neue Menschen, die deinen Weg kreuzen.",
    "cards.angels.AngedelAmour.meaning.var3":
      "Die Energie des Engels der Liebe lädt dich ein, mehr Harmonie in all deine Beziehungen zu bringen. Er führt dich zu einer reifen Liebe, die Unvollkommenheiten akzeptiert und Güte wählt. Diese Karte ermutigt dich, beschädigte Beziehungen zu reparieren, wenn es noch möglich und gesund für dich ist. Praktisch gesehen, drücke deine Dankbarkeit gegenüber den Menschen aus, die du liebst. Eine aufrichtige Nachricht oder eine liebevolle Geste kann eine Beziehung verwandeln. Wenn dich eine Beziehung mehr verletzt als gut tut, gibt dir der Engel der Liebe auch den Mut, sie mit Mitgefühl loszulassen. Bedingungslose Liebe bedeutet manchmal auch, klare Grenzen zu setzen. Denke daran, dass du anderen beibringst, wie sie dich behandeln sollen, durch das, was du akzeptierst.",
    "cards.angels.AngedelaPaix.name": "Engel des Friedens",
    "cards.angels.AngedelaPaix.meaning": "Innere Gelassenheit und Ruhe",
    "cards.angels.AngedelaPaix.meaning.var1":
      "Der Engel des Friedens bringt dir eine Energie der Gelassenheit und tiefen Ruhe. Er hilft dir, inneren Frieden zu finden, selbst mitten im äußeren Chaos. Diese Karte zeigt an, dass es Zeit ist, langsamer zu werden und deine geistige Ruhe zu pflegen. Wahrer Frieden hängt nicht von den Umständen ab, sondern entsteht aus deinem inneren Zustand. Konkret schaffe Momente der Pause in deinem Tag. Fünf Minuten bewusste Atmung, ein Spaziergang in der Natur oder einfach stilles Sitzen. Wenn du Konflikte erlebst, ermutigt dich der Engel des Friedens, Beruhigung statt Recht haben zu wählen. Manchmal erfordert Frieden das Loslassen des Kontrollbedürfnisses. Entferne dich von unnötigen Stressquellen wie angsteinflößenden Nachrichten oder toxischen Gesprächen.",
    "cards.angels.AngedelaPaix.meaning.var2":
      "Diese Karte kündigt eine Phase der Versöhnung und inneren Harmonie an. Der Engel des Friedens bittet dich, Frieden mit deiner Vergangenheit, deinen Fehlern und deinem Bedauern zu schließen. Er erinnert dich daran, dass du nicht ändern kannst, was geschehen ist, aber du kannst wählen, wie du jetzt lebst. Im Alltag erkenne, was deinen inneren Frieden stört. Obsessive Gedanken? Hartnäckiger Groll? Ständige Ängste? Arbeite aktiv daran, diese Turbulenzen zu beruhigen. Meditation, Vergebung und Akzeptanz sind deine Werkzeuge. Wenn du im Konflikt mit jemandem bist, suche Versöhnungspunkte statt die Spaltung zu nähren. Der Engel des Friedens führt dich zu sanften Lösungen und respektvollen Kompromissen.",
    "cards.angels.AngedelaPaix.meaning.var3":
      "Die Energie des Engels des Friedens beruhigt die Stürme deines Geistes und Herzens. Er lädt dich ein, einen Ort der Ruhe in deinem Alltag zu schaffen. Diese Karte erinnert dich daran, dass Frieden eine bewusste Wahl ist, die du jeden Moment triffst. Praktisch gesehen richte dir einen Raum in deinem Zuhause ein, der der Ruhe und Entspannung gewidmet ist. Begrenze deine Exposition gegenüber übermäßigen Reizen und stressigen Umgebungen. Wenn dein Geist sich mit Sorgen überschlägt, kehre sanft in den gegenwärtigen Moment zurück. Atme tief ein und erinnere dich, dass die meisten deiner Ängste sich um eine Zukunft drehen, die noch nicht existiert. Der Engel des Friedens lehrt dich, dass Ruhe nicht die Abwesenheit von Problemen ist, sondern die Fähigkeit, trotz ihnen zentriert zu bleiben.",
    "cards.angels.AngedelaProsperite.name": "Engel des Wohlstands",
    "cards.angels.AngedelaProsperite.meaning": "Fülle und materieller Erfolg",
    "cards.angels.AngedelaProsperite.meaning.var1":
      "Der Engel des Wohlstands lädt dich ein, den Wohlstand in deinem Leben zu begrüßen. Er erinnert dich daran, dass materieller Erfolg zum Greifen nah ist, solange du eine positive Haltung bewahrst und an deine Fähigkeiten glaubst. Diese Karte ermutigt dich, mit Vertrauen zu handeln und die sich bietenden Chancen zu ergreifen. Konkrete Hinweise: Achte auf Glückssymbole, Ideen, die deine finanzielle Situation verbessern können, und zögere nicht, in dich selbst zu investieren.",
    "cards.angels.AngedelaProsperite.meaning.var2":
      "Diese Karte kündigt eine Phase des Wachstums und der materiellen Stabilität an. Der Engel des Wohlstands unterstützt dich bei deinen Geschäfts-, Investitions- oder beruflichen Entwicklungen. Er lädt dich auch ein, Dankbarkeit für das zu kultivieren, was du bereits hast, denn das zieht noch mehr Wohlstand an. Im Alltag, triff überlegte Entscheidungen und bleibe offen für kluge Ratschläge.",
    "cards.angels.AngedelaProsperite.meaning.var3":
      "Die Energie des Engels des Wohlstands wirkt als Hebel, um deine finanziellen Ziele zu manifestieren. Er ermutigt dich, Blockaden durch Angst oder Mangel zu überwinden. Diese Karte erinnert dich daran, dass Wohlstand nicht nur das Ansammeln von Besitz bedeutet, sondern auch ein Gleichgewicht zwischen materiellen Reichtum und persönlichem Wohlbefinden zu schaffen. Praktisch: Organisiere dich, plane deine Finanzen und entwickle eine klare Vision für deine Ambitionen.",
    "cards.angels.AngedelaGuerison.name": "Engel der Heilung",
    "cards.angels.AngedelaGuerison.meaning": "Genesung und Wohlbefinden",
    "cards.angels.AngedelaGuerison.meaning.var1":
      "Der Engel der Heilung umhüllt dich mit seiner heilenden Energie. Er lädt dich ein, dich sanft und geduldig um deinen Körper und deinen Geist zu kümmern. Diese Karte kündigt einen Heilungsprozess an, sei es körperlich, emotional oder spirituell. Praktisch: Höre auf die Bedürfnisse deines Körpers, ruhe dich aus und nehme die Unterstützung anderer an.",
    "cards.angels.AngedelaGuerison.meaning.var2":
      "Diese Karte symbolisiert eine Zeit der Wiederherstellung deines Wohlbefindens. Der Engel der Heilung ermutigt dich, die vergangenen Schmerzen loszulassen und dich Praktiken zuzuwenden, die deine ganzheitliche Gesundheit fördern. Im Alltag, pflege gesunde Gewohnheiten, meditiere und erlaube dir, in deinem eigenen Tempo zu heilen.",
    "cards.angels.AngedelaGuerison.meaning.var3":
      "Die Energie des Engels der Heilung wirkt als Katalysator für deine innere Transformation. Er unterstützt dich bei der Befreiung von Blockaden und tief verwurzelten Schmerzen. Diese Karte lädt dich ein, Mitgefühl mit dir selbst zu kultivieren und zu erkennen, dass Heilung ein fortschreitender Weg ist. Nimm dir Zeit, jede Etappe mit Vertrauen zu begrüßen.",
    "cards.angels.AngedelaSagesse.name": "Engel der Weisheit",
    "cards.angels.AngedelaSagesse.meaning":
      "Spirituelles Wissen und Unterscheidungsvermögen",
    "cards.angels.AngedelaSagesse.meaning.var1":
      "Der Engel der Weisheit lädt dich ein, Wissen jenseits der äußeren Erscheinungen zu suchen. Er hilft dir, dein Unterscheidungsvermögen zu entwickeln und auf deine innere Stimme zu hören. Diese Karte zeigt eine günstige Zeit für tiefgehende Reflexion und weise Entscheidungen. Konkret: Nimm dir Zeit zum Meditieren, Lesen oder Studium von Themen, die deinen Geist erheben.",
    "cards.angels.AngedelaSagesse.meaning.var2":
      "Diese Karte kündigt eine Zeit des spirituellen Erwachens und geistiger Klarheit an. Der Engel der Weisheit führt dich, um die verborgenen Lektionen in deinen Erfahrungen zu verstehen. Sei in deinem Alltag aufmerksam auf Zeichen und Synchronizitäten, die dir den Weg weisen. Pflege Geduld und Demut in deiner Suche nach Wahrheit.",
    "cards.angels.AngedelaSagesse.meaning.var3":
      "Die Energie des Engels der Weisheit begleitet dich auf deinem inneren Weg. Ermutigt dich, ruhig zu bleiben und Unterscheidungsvermögen angesichts von Herausforderungen zu zeigen. Diese Karte erinnert dich daran, dass wahre Weisheit aus dem Gleichgewicht zwischen Wissen und Mitgefühl kommt. Praktisch: Nimm dir Zeit zum Innehalten und Nachdenken und teile deine Entdeckungen mit Wohlwollen.",
    "cards.angels.AngedelaJoie.name": "Engel der Freude",
    "cards.angels.AngedelaJoie.meaning": "Glück und Optimismus",
    "cards.angels.AngedelaJoie.meaning.var1":
      "Der Engel der Freude lädt dich ein, Licht und Glück in deinem Leben zu begrüßen. Er erinnert dich daran, dass Freude eine Wahl ist, selbst in schwierigen Zeiten. Diese Karte ermutigt dich, Optimismus zu pflegen und die kleinen täglichen Siege zu feiern. Konkret: Nimm dir Zeit zum Lachen, Lächeln und teile positive Momente mit denen, die du liebst.",
    "cards.angels.AngedelaJoie.meaning.var2":
      "Diese Karte kündigt eine Zeit an, in der Leichtigkeit und Enthusiasmus die Oberhand gewinnen. Der Engel der Freude ermutigt dich, dich von emotionalen Lasten zu befreien, die dich zurückhalten. In deinem Alltag suche nach einfachen Quellen der Freude, wie einem Spaziergang, Musik oder einer kreativen Aktivität. Freude ist ansteckend, teile sie mit anderen.",
    "cards.angels.AngedelaJoie.meaning.var3":
      "Die Energie des Engels der Freude leuchtet in dir und lädt dich ein, voll zu leben und jeden Moment zu genießen. Er ermutigt dich, deine Dankbarkeit zu nähren und das Positive selbst in Herausforderungen zu sehen. Praktisch: Schaffe Rituale, die Freude bringen, wie das Hören deines Lieblingsliedes oder das Ausüben einer Aktivität, die dich begeistert. Freude ist ein starker Motor für dein Wohlbefinden.",
    "cards.angels.AngedelaFoi.name": "Engel des Glaubens",
    "cards.angels.AngedelaFoi.meaning": "Vertrauen ins Universum und Hoffnung",
    "cards.angels.AngedelaFoi.meaning.var1":
      "Der Engel des Glaubens lädt dich ein, dem Universum zu vertrauen und an eine bessere Zukunft zu glauben. Er ermutigt dich, die Hoffnung zu bewahren, auch angesichts von Unsicherheiten. Diese Karte erinnert dich daran, dass der Glaube unsichtbare Türen öffnet und dich auf deinem Weg führt. Konkret: Lass die übermäßige Kontrolle los und empfange die Überraschungen des Lebens.",
    "cards.angels.AngedelaFoi.meaning.var2":
      "Diese Karte kündigt eine Zeit an, in der dein inneres Vertrauen gestärkt wird. Der Engel des Glaubens hilft dir, Zweifel zu überwinden und den Kurs trotz Hindernissen zu halten. In deinem Alltag übe Geduld und Akzeptanz und achte auf Zeichen, die dir bestätigen, dass du unterstützt wirst. Glaube ist ein starker Anker, um voranzukommen.",
    "cards.angels.AngedelaFoi.meaning.var3":
      "Die Energie des Engels des Glaubens ermutigt dich, an dich selbst und an die Güte des Universums zu glauben. Sie erinnert dich daran, dass auch wenn der Weg dunkel erscheint, immer ein inneres Licht leuchtet. Praktisch: Nimm dir jeden Tag einen Moment, um dein Vertrauen durch Meditation oder Gebet zu stärken. Der Glaube nährt deine innere Stärke und deinen Mut.",
    "cards.angels.AngedelaCreativite.name": "Engel der Kreativität",
    "cards.angels.AngedelaCreativite.meaning":
      "Künstlerische Inspiration und Innovation",
    "cards.angels.AngedelaCreativite.meaning.var1":
      "Der Engel der Kreativität fördert deine Inspiration und lädt dich ein, deine künstlerischen Talente auszudrücken. Er ermutigt dich, neue Wege zu gehen und in deinem Leben innovativ zu sein. Diese Karte erinnert daran, dass Kreativität ein Weg ist, sich mit deinem innersten Selbst zu verbinden. Konkret: Nimm dir Zeit zu kreieren, sei es durch Schreiben, Malen, Musik oder eine andere Ausdrucksform.",
    "cards.angels.AngedelaCreativite.meaning.var2":
      "Diese Karte kündigt eine Phase an, in der deine Vorstellungskraft erwacht. Der Engel der Kreativität lädt dich ein, neue Ideen zu erforschen und ohne Angst vor Beurteilung zu experimentieren. In deinem Alltag gewähre dir Momente, um zu träumen und deiner Inspiration freien Lauf zu lassen. Deine Kreativität kann auch eine Lösung für Probleme sein.",
    "cards.angels.AngedelaCreativite.meaning.var3":
      "Die Energie des Engels der Kreativität lädt dich ein, deine Vision zu erneuern und zu innovieren. Sie erinnert dich daran, dass jeder kreative Akt eine Form der Transformation ist. Praktisch: Starte ein künstlerisches Projekt oder erfinde eine neue Art, Dinge zu tun. Wage es, deine Originalität auszudrücken und nähre deine Leidenschaft mit Begeisterung.",
    "cards.angels.AngedelaPurification.name": "Engel der Reinigung",
    "cards.angels.AngedelaPurification.meaning":
      "Energie-Reinigung und Erneuerung",
    "cards.angels.AngedelaPurification.meaning.var1":
      "Der Engel der Reinigung hilft dir, negative Energien zu befreien und deinen Geist und Körper zu reinigen. Er lädt dich ein, eine innere Reinigung vorzunehmen, um Klarheit und Leichtigkeit zu finden. Konkret: Nimm dir Zeit, dich neu zu zentrieren und das loszulassen, was dir nicht mehr dient, sei es Gedanken, Emotionen oder äußere Einflüsse.",
    "cards.angels.AngedelaPurification.meaning.var2":
      "Diese Karte kündigt eine Zeit der Erneuerung an, in der du aufgerufen bist, energetische Blockaden zu lösen. Der Engel der Reinigung ermutigt dich, Platz zu schaffen, um Neues zu empfangen. In deinem Alltag praktiziere einfache Rituale wie Meditation oder Entspannungsübungen, um dich zu revitalisieren.",
    "cards.angels.AngedelaPurification.meaning.var3":
      "Die Energie des Engels der Reinigung arbeitet daran, deinen persönlichen Raum und deinen Geist zu reinigen. Sie erinnert dich daran, dass Erneuerung durch echtes Loslassen kommt. Praktisch: Organisiere deine Umgebung, um einen gesunden und beruhigenden Ort zu schaffen. Kümmere dich sanft um dich selbst und öffne dich für neue positive Energien.",
    "cards.angels.AngedelaCompassion.name": "Engel des Mitgefühls",
    "cards.angels.AngedelaCompassion.meaning": "Empathie und Wohlwollen",
    "cards.angels.AngedelaCompassion.meaning.var1":
      "Der Engel des Mitgefühls lädt dich ein, dein Herz mit Sanftmut und Empathie für dich selbst und andere zu öffnen. Er erinnert dich an die Bedeutung von Wohlwollen in deinen Beziehungen. Konkret: Übe Geduld und Verständnis, selbst in schwierigen Situationen oder bei Fehlern.",
    "cards.angels.AngedelaCompassion.meaning.var2":
      "Diese Karte kündigt eine Zeit an, in der deine Fähigkeit zuzuhören und Empathie zu zeigen gestärkt wird. Der Engel des Mitgefühls ermutigt dich, diejenigen zu unterstützen, die Prüfungen durchmachen. In deinem Alltag biete deine Hilfe ohne Urteil an und kultiviere Zärtlichkeit in deinen Interaktionen.",
    "cards.angels.AngedelaCompassion.meaning.var3":
      "Die Energie des Engels des Mitgefühls begleitet dich dabei, bedingungslose Liebe zu entwickeln. Sie erinnert dich daran, dass wahre Stärke in der Sanftmut liegt. Praktisch: Übe liebevolle Gesten und Unterstützung und lerne, dir selbst mit Nachsicht zu vergeben.",
    "cards.angels.AngedelaTransformation.name": "Engel der Transformation",
    "cards.angels.AngedelaTransformation.meaning":
      "Positive Veränderungen und Entwicklung",
    "cards.angels.AngedelaTransformation.meaning.var1":
      "Der Engel der Transformation begleitet dich auf deinem Weg der tiefgreifenden Veränderung. Er lädt dich ein, die sich bietenden Entwicklungen anzunehmen, auch wenn sie unsicher erscheinen mögen. Konkret: Lass alte Gewohnheiten oder Glaubenssätze los, die dir nicht mehr dienen, um Platz für positives Neues zu schaffen.",
    "cards.angels.AngedelaTransformation.meaning.var2":
      "Diese Karte kündigt eine Zeit an, in der bedeutende Veränderungen in deinem Leben stattfinden. Der Engel der Transformation unterstützt dich, diese Schritte mit Vertrauen und Gelassenheit zu gehen. Achte auf die Zeichen, die dir den Weg weisen, und zögere nicht, mutige Entscheidungen zu treffen.",
    "cards.angels.AngedelaTransformation.meaning.var3":
      "Die Energie des Engels der Transformation lädt dich ein, in Harmonie mit dir selbst zu wachsen. Er erinnert dich daran, dass jeder Schritt, selbst der schwierige, eine Gelegenheit zum Wachsen ist. Praktisch: Nimm die Veränderungen mit Offenheit an und passe dich flexibel an, um ein Leben zu schaffen, das mehr mit deinen Wünschen in Einklang steht.",
    "cards.angels.AngedelAbondance.name": "Engel des Überflusses",
    "cards.angels.AngedelAbondance.meaning":
      "Spiritueller und materieller Reichtum",
    "cards.angels.AngedelAbondance.meaning.var1":
      "Der Engel des Überflusses lädt dich ein, Reichtum in all seinen Formen zu empfangen, sowohl materiell als auch spirituell. Er ermutigt dich, das, was du bereits besitzt, zu erkennen und zu schätzen. Konkret: Kultiviere Dankbarkeit, um noch mehr Wohlstand in dein Leben zu ziehen.",
    "cards.angels.AngedelAbondance.meaning.var2":
      "Diese Karte kündigt eine Zeit an, in der die Ströme des Überflusses um dich herum stärker werden. Der Engel des Überflusses erinnert dich daran, dass deine Einstellung entscheidend ist: Bleibe offen und zuversichtlich, um das zu empfangen, was dir bestimmt ist. In deinem Alltag erkenne die Chancen und handle großzügig.",
    "cards.angels.AngedelAbondance.meaning.var3":
      "Die Energie des Engels des Überflusses lädt dich ein, Geben und Empfangen ins Gleichgewicht zu bringen. Er erinnert dich daran, dass wahrer Reichtum im Teilen und in innerer Harmonie liegt. Praktisch: Gib, ohne eine Gegenleistung zu erwarten, und achte darauf, was dir das Leben zurückgibt.",
    "cards.angels.AngedelaLiberation.name": "Engel der Befreiung",
    "cards.angels.AngedelaLiberation.meaning":
      "Freiheit von Ängsten und Begrenzungen",
    "cards.angels.AngedelaLiberation.meaning.var1":
      "Der Engel der Befreiung hilft dir, dich von Ängsten und Blockaden zu befreien, die dein Wachstum hemmen. Er lädt dich ein, loszulassen, was dich zurückhält, um mit mehr Leichtigkeit voranzukommen. Konkret: Identifiziere deine unsichtbaren Ketten und entscheide dich, sie zu sprengen.",
    "cards.angels.AngedelaLiberation.meaning.var2":
      "Diese Karte kündigt eine Phase an, in der du dich von inneren und äußeren Begrenzungen befreien kannst. Der Engel der Befreiung unterstützt dich dabei, den Mut zu haben, deine Komfortzone zu verlassen. In deinem Alltag stelle dich deinen Ängsten mit Mut und empfange das Neue mit Vertrauen.",
    "cards.angels.AngedelaLiberation.meaning.var3":
      "Die Energie des Engels der Befreiung lädt dich ein, in innerer Freiheit zu leben. Er erinnert dich daran, dass du die Macht hast, deine Gedanken und Reaktionen zu wählen. Praktisch: Übe Vergebung gegenüber dir selbst und anderen, um dich von emotionalen Lasten zu befreien.",
    "cards.angels.AngedelaGratitude.name": "Engel der Dankbarkeit",
    "cards.angels.AngedelaGratitude.meaning": "Anerkennung und Wertschätzung",
    "cards.angels.AngedelaGratitude.meaning.var1":
      "Der Engel der Dankbarkeit lädt dich ein, ein dankbares Herz zu kultivieren. Indem du das, was du hast, voll schätzt, öffnest du die Tür für noch mehr Segnungen. Nimm dir jeden Tag Zeit, um aufzuschreiben, was dich glücklich macht, und empfange diese Geschenke mit Freude.",
    "cards.angels.AngedelaGratitude.meaning.var2":
      "Diese Karte signalisiert eine günstige Zeit, um die kleinen und großen Dinge zu erkennen, die dein Leben bereichern. Der Engel der Dankbarkeit erinnert dich daran, dass diese positive Haltung noch mehr Fülle und inneren Frieden anzieht. In deinem Alltag, beobachte und feiere jeden Moment des Glücks.",
    "cards.angels.AngedelaGratitude.meaning.var3":
      "Die Energie des Engels der Dankbarkeit drängt dich dazu, deinen Blick auf die Welt zu verändern. Indem du dich für Dankbarkeit entscheidest, veränderst du deine Schwingung und förderst Harmonie um dich herum. Versuche, diese Dankbarkeit mit denen zu teilen, die du liebst – das stärkt die Bindungen und hebt die Energien.",
    "cards.angels.AngedelaManifestation.name": "Engel der Manifestation",
    "cards.angels.AngedelaManifestation.meaning":
      "Verwirklichung von Träumen und Projekten",
    "cards.angels.AngedelaManifestation.meaning.var1":
      "Der Engel der Manifestation ermutigt dich, deine Energie auf deine Ziele zu konzentrieren. Indem du dir klar vorstellst, was du erreichen möchtest, verstärkst du deine Fähigkeit, Möglichkeiten anzuziehen. Handle mit Vertrauen und Ausdauer, um deine Träume zu verwirklichen.",
    "cards.angels.AngedelaManifestation.meaning.var2":
      "Diese Karte kündigt eine günstige Zeit an, um deine Ideen in die Realität umzusetzen. Der Engel der Manifestation erinnert dich daran, dass deine Gedanken und Handlungen mächtige Werkzeuge sind. Bleibe mit deinen Absichten im Einklang und sei offen für die Zeichen, die dir den Weg weisen.",
    "cards.angels.AngedelaManifestation.meaning.var3":
      "Die Energie dieses Engels drängt dich, an dein kreatives Potenzial zu glauben. Indem du klare Entscheidungen triffst und ins Handeln kommst, gehst du auf deine Ziele zu. Pflege Geduld und Entschlossenheit, denn jeder Schritt bringt dich näher zum Erfolg.",
    "cards.angels.AngedelHarmonie.name": "Engel der Harmonie",
    "cards.angels.AngedelHarmonie.meaning":
      "Gleichgewicht in allen Lebensbereichen",
    "cards.angels.AngedelHarmonie.meaning.var1":
      "Der Engel der Harmonie lädt dich ein, ein nachhaltiges Gleichgewicht zwischen deinen Emotionen, Beziehungen und Verpflichtungen zu finden. Indem du inneren Frieden und Toleranz kultivierst, schaffst du eine beruhigende Umgebung, die Wohlbefinden und Gelassenheit fördert.",
    "cards.angels.AngedelHarmonie.meaning.var2":
      "Diese Karte kündigt eine Phase an, in der du das Gleichgewicht in deinem Leben trotz Spannungen wiederherstellen kannst. Der Engel der Harmonie rät dir, auf dich selbst und andere zu hören, mit Sanftheit zu handeln und auf gegenseitiges Verständnis zu setzen, um Konflikte zu überwinden.",
    "cards.angels.AngedelHarmonie.meaning.var3":
      "Die Energie des Engels der Harmonie hilft dir, innere und äußere Konflikte zu beruhigen. Indem du Mäßigung, Geduld und Respekt förderst, baust du stabile Beziehungen auf und erreichst eine dauerhafte Stabilität, die dich in allen Bereichen deines Lebens unterstützt.",
    "cards.angels.AngedelaNouvelleVie.name": "Engel des Neuen Lebens",
    "cards.angels.AngedelaNouvelleVie.meaning": "Neue Anfänge und Wiedergeburt",
    "cards.angels.AngedelaNouvelleVie.meaning.var1":
      "Der Engel des Neuen Lebens lädt dich ein, einen neuen Zyklus mit Offenheit und Vertrauen zu begrüßen. Es ist Zeit, die Vergangenheit hinter dir zu lassen und frische Chancen sowie eine tiefgreifende Erneuerung in deinem Leben zu umarmen.",
    "cards.angels.AngedelaNouvelleVie.meaning.var2":
      "Diese Karte kündigt eine transformative Phase an, in der du vollständig neu geboren werden kannst. Der Engel unterstützt dich bei deinen Neuanfängen, ermutigt dich, solide Grundlagen zu legen und mit Vertrauen auf eine vielversprechende Zukunft zuzugehen.",
    "cards.angels.AngedelaNouvelleVie.meaning.var3":
      "Die Energie des Engels des Neuen Lebens begleitet dich dabei, ein wichtiges Kapitel umzublättern. Sie erinnert dich daran, dass jedes Ende ein neuer Anfang ist und dass du die nötige Kraft in dir trägst, dich neu zu erfinden und mit Gelassenheit zu wachsen.",

    // Horoscope Data Translations - Descriptions
    "horoscope.data.descriptions.aries.0":
      "Deine überschäumende Energie treibt dich heute zu mutigem Handeln. Nutze die Gelegenheit, neue Projekte zu starten.",
    "horoscope.data.descriptions.aries.1":
      "Eine unerwartete Begegnung könnte deine Gefühle aufwühlen. Sei aufmerksam, diese Person könnte deinen Tag prägen.",
    "horoscope.data.descriptions.aries.2":
      "Dein kommunikativer Enthusiasmus zieht Aufmerksamkeit auf sich. Sei geduldig, um Missverständnisse zu vermeiden.",
    "horoscope.data.descriptions.aries.3":
      "Bei der Arbeit könnte sich eine Gelegenheit ergeben. Analysiere sie sorgfältig, bevor du entscheidest.",
    "horoscope.data.descriptions.aries.4":
      "Achte auf Spannungen in engen Beziehungen. Bleib ruhig und setze auf Dialog, um Konflikte zu vermeiden.",
    "horoscope.data.descriptions.aries.6":
      "Deine Spontaneität ist ein Vorteil, aber vermeide Übermaß oder impulsive Entscheidungen, die Probleme verursachen könnten.",
    "horoscope.data.descriptions.aries.7":
      "Eine originelle Idee könnte Erfolg und Anerkennung bringen. Zögere nicht, sie zu teilen und umzusetzen.",
    "horoscope.data.descriptions.aries.8":
      "Eine verborgene Wahrheit könnte ans Licht kommen. Sei aufmerksam und nutze die Information weise.",
    "horoscope.data.descriptions.aries.9":
      "Deine ständigen Bemühungen beginnen sich auszuzahlen. Es ist Zeit, die Früchte deiner Arbeit zu ernten.",
    "horoscope.data.descriptions.aries.10":
      "Dein natürliches Selbstvertrauen zieht das Vertrauen anderer an. Nutze es, um persönliche und berufliche Beziehungen zu stärken.",
    "horoscope.data.descriptions.aries.11":
      "Eine angenehme Überraschung könnte deinen Tag erhellen, sei es ein Treffen, eine Nachricht oder ein positives Ereignis.",
    "horoscope.data.descriptions.aries.12":
      "Deine Freundschaften oder familiären Bindungen werden gestärkt. Genieße diese Momente, um wertvolle Erinnerungen zu schaffen.",
    "horoscope.data.descriptions.aries.13":
      "Deine Intuition ist heute besonders scharf. Folge deinen Gefühlen, um gute Entscheidungen zu treffen.",
    "horoscope.data.descriptions.aries.14":
      "Positive Energie begleitet dich den ganzen Tag. Nutze sie, um mit Zuversicht voranzukommen und deine Ziele zu erreichen.",
    "horoscope.data.descriptions.taurus.0":
      "Die Stabilität, die du suchst, zeigt sich endlich in deinem Leben. Genieße diese Phase der Gelassenheit und die einfachen Freuden.",
    "horoscope.data.descriptions.taurus.1":
      "Eine vielversprechende Begegnung könnte heute stattfinden und eine schöne Verbindung sowie positive Emotionen zum Teilen bringen.",
    "horoscope.data.descriptions.taurus.2":
      "Venus bringt dir Sanftheit und Harmonie in deinen Beziehungen. Ein perfekter Tag, um Liebe und Freundschaft zu pflegen.",
    "horoscope.data.descriptions.taurus.3":
      "Deine Geduld und Ausdauer tragen Früchte. Die Ergebnisse deiner vergangenen Anstrengungen manifestieren sich heute.",
    "horoscope.data.descriptions.taurus.4":
      "Familienbeziehungen sind besonders harmonisch. Nutze diesen Moment, um die Bindungen zu deinen Lieben zu stärken.",
    "horoscope.data.descriptions.taurus.5":
      "Vernachlässige dein körperliches Wohlbefinden nicht; nimm dir Zeit zum Entspannen und Sporttreiben.",
    "horoscope.data.descriptions.taurus.6":
      "Ihre künstlerischen Talente stehen heute im Vordergrund, und Sie haben die Möglichkeit, sie in persönlichen oder beruflichen Projekten vollständig auszudrücken.",
    "horoscope.data.descriptions.taurus.7":
      "Jetzt ist der perfekte Zeitpunkt, Ihre langfristigen Projekte umzusetzen, indem Sie die notwendigen Schritte unternehmen, um Ihre Ziele erfolgreich zu erreichen.",
    "horoscope.data.descriptions.taurus.8":
      "Ihr praktischer Sinn und Ihr Urteilsvermögen helfen Ihnen, viele Fallstricke zu vermeiden und kluge Entscheidungen in Ihrem Alltag zu treffen.",
    "horoscope.data.descriptions.taurus.9":
      "Eine Phase des materiellen Wohlstands steht bevor und bietet Chancen auf finanzielle Gewinne und wirtschaftliche Stabilität, wenn Sie aufmerksam bleiben.",
    "horoscope.data.descriptions.taurus.10":
      "Deine Treue und Loyalität in der Freundschaft werden von deinem Umfeld anerkannt und geschätzt, wodurch noch stärkere und harmonischere Bindungen entstehen.",
    "horoscope.data.descriptions.taurus.11":
      "Einfache Freuden des Lebens bringen Ihnen heute große Zufriedenheit und tragen zu Ihrem emotionalen und mentalen Wohlbefinden bei.",
    "horoscope.data.descriptions.taurus.12":
      "Ihre emotionale Stabilität beruhigt Ihr Umfeld, und Sie werden als verlässlicher und beruhigender Bezugspunkt für andere wahrgenommen.",
    "horoscope.data.descriptions.taurus.13":
      "Dies ist ein idealer Tag für Aktivitäten im Freien, die Ihnen ermöglichen, neue Energie zu tanken, Abstand zu gewinnen und sich zu erholen.",
    "horoscope.data.descriptions.taurus.14":
      "Ihre bisherigen Anstrengungen werden endlich belohnt, und Sie werden sehen, dass sich Ihre Ausdauer in Projekten und Beziehungen auszahlt.",
    "horoscope.data.descriptions.gemini.0":
      "Deine natürliche Neugier führt dich zu wunderbaren Entdeckungen. Bleibe offen für neue Begegnungen und innovative Ideen.",
    "horoscope.data.descriptions.gemini.1":
      "Berufliche Chancen ergeben sich. Trau dich, deine innovativen Ideen vorzuschlagen, sie werden gut aufgenommen.",
    "horoscope.data.descriptions.gemini.2":
      "Merkur fördert deinen Verstand und deine Kreativität. Ein idealer Tag zum Kommunizieren, Schreiben oder Lernen.",
    "horoscope.data.descriptions.gemini.3":
      "Deine Anpassungsfähigkeit ist heute bemerkenswert, nutze sie, um neue Möglichkeiten zu erkunden, die sich dir bieten.",
    "horoscope.data.descriptions.gemini.4":
      "Achte auf dein Umfeld, manche Menschen könnten wichtige Informationen mit dir teilen.",
    "horoscope.data.descriptions.gemini.5":
      "Heute ist dein Geist wach und neugierig, aber achte auf Missverständnisse oder kleine Streitigkeiten, die um dich herum entstehen könnten.",
    "horoscope.data.descriptions.gemini.6":
      "Eine angenehme Überraschung könnte deinen Tag erhellen, sei es ein Treffen, eine Nachricht oder eine inspirierende Idee.",
    "horoscope.data.descriptions.gemini.7":
      "Deine Kommunikationsfähigkeit zieht heute Aufmerksamkeit auf sich, aber achte darauf, nicht zu viele Informationen preiszugeben oder Missverständnisse zu verursachen.",
    "horoscope.data.descriptions.gemini.8":
      "Ein unerwartetes Gespräch verändert Ihre Sichtweise und eröffnet neue Perspektiven in Beziehungen oder Projekten.",
    "horoscope.data.descriptions.gemini.9":
      "Ihre Vielseitigkeit ermöglicht es Ihnen, mehrere Projekte gleichzeitig zu bewältigen, ohne an Effizienz oder Kreativität zu verlieren.",
    "horoscope.data.descriptions.gemini.10":
      "Neue Technologien eröffnen Ihnen neue Horizonte und erleichtern Ihre Kommunikation oder innovativen Projekte.",
    "horoscope.data.descriptions.gemini.11":
      "Ihr Witz und Ihr Humor lockern die Atmosphäre auf und ziehen andere mit Leichtigkeit und Charisma an.",
    "horoscope.data.descriptions.gemini.12":
      "Dies ist ein perfekter Moment, um etwas Neues zu lernen und Ihr Wissen oder Ihre Fähigkeiten zu erweitern.",
    "horoscope.data.descriptions.gemini.13":
      "Ihre sozialen Netzwerke und Kontakte bringen Ihnen heute unerwartete und vorteilhafte Chancen.",
    "horoscope.data.descriptions.gemini.14":
      "Achte auf vertrauliche Gespräche: eine Freundschaft könnte durch ein Missverständnis oder ein enthülltes Geheimnis auf die Probe gestellt werden.",
    "horoscope.data.descriptions.cancer.0":
      "Deine Intuition ist heute besonders stark. Folge deinem Herzen, es führt dich zu den richtigen Entscheidungen.",
    "horoscope.data.descriptions.cancer.1":
      "Dieser Tag könnte dich schwindelig machen. Lass dich nicht von kleinen Ärgernissen überwältigen. Eine innere Energie unterstützt dich positiv, also schone dein Nervensystem und gönn dir eine Pause vom Alltag!",
    "horoscope.data.descriptions.cancer.2":
      "Familie und Freunde spielen heute eine Schlüsselrolle für dein Wohlbefinden. Sei aufmerksam und unterstütze sie.",
    "horoscope.data.descriptions.cancer.3":
      "Eine kleine Entspannungspause kann deiner Energie guttun. Denke an Meditation oder ein beruhigendes Bad.",
    "horoscope.data.descriptions.cancer.4":
      "Der Mond erhellt deine Sensibilität und stärkt familiäre Bindungen. Ein besonderer Moment, um deine Gefühle auszudrücken.",
    "horoscope.data.descriptions.cancer.5":
      "Deine natürliche Güte zieht Vertrauen an und stärkt deine Freundschaften. Du bist ein Rückzugsort für deine Mitmenschen.",
    "horoscope.data.descriptions.cancer.6":
      "Heute ist ein perfekter Tag, um Ihre Emotionen auszudrücken und Ihre Gefühle aufrichtig zu teilen, was Ihre Beziehungen stärkt.",
    "horoscope.data.descriptions.cancer.7":
      "Ihre natürliche Empathie ermöglicht es Ihnen, andere tief zu verstehen und ihnen wertvolle Unterstützung zu bieten.",
    "horoscope.data.descriptions.cancer.8":
      "Deine Beziehungen stehen heute unter dem Zeichen von Freundschaft und Verbundenheit. Suche die Aufmerksamkeit und Unterstützung deiner Mitmenschen, während du sowohl auf ihre als auch auf deine eigenen Bedürfnisse achtest, ohne etwas zu vernachlässigen.",
    "horoscope.data.descriptions.cancer.9":
      "Ihr Zuhause verwandelt sich in eine wahre Oase des Friedens und des Glücks, ideal für Ruhe und Gelassenheit.",
    "horoscope.data.descriptions.cancer.10":
      "Eine starke Intuition führt Sie zur richtigen Entscheidung, selbst in komplexen oder unsicheren Situationen.",
    "horoscope.data.descriptions.cancer.11":
      "Ihre Kindheitserinnerungen inspirieren Sie positiv und erinnern Sie an die wesentlichen Werte, die Sie antreiben.",
    "horoscope.data.descriptions.cancer.12":
      "Du wirst gebeten, Diplomatie zu zeigen, und es gibt etwas Positives, das du daraus ziehen kannst. Durch deine liebsten Hobbys findest du Möglichkeiten, dich zu entspannen. Leg deine Sorgen beiseite.",
    "horoscope.data.descriptions.cancer.13":
      "Deine Verbindungen zu neuen Bekanntschaften werden die Lücken und Mängel füllen, die du empfindest. Dein ausgeprägter Geschmack für die schönen Dinge könnte zu ein paar Übertreibungen führen, also sei vorsichtig.",
    "horoscope.data.descriptions.cancer.14":
      "Eine familiäre Versöhnung bringt tiefe Harmonie und schafft eine friedliche Atmosphäre in Ihrem Umfeld.",
    "horoscope.data.descriptions.leo.0":
      "Deine Energie ist heute stark. Nutze sie, um wichtige Aufgaben zu erledigen und positiv auf andere einzuwirken.",
    "horoscope.data.descriptions.leo.1":
      "Eine Begegnung könnte deine Gefühle wecken. Sei offen, aber achte auf deine Grenzen.",
    "horoscope.data.descriptions.leo.2":
      "Dein Charisma zieht Aufmerksamkeit an. Nutze es, um Beziehungen zu stärken oder Projekte voranzutreiben.",
    "horoscope.data.descriptions.leo.3":
      "Achte auf Eifersucht oder Konkurrenz in deinem Umfeld. Bleib ruhig und konzentriert.",
    "horoscope.data.descriptions.leo.4":
      "Ein kreativer Einfall könnte dein Projekt bereichern. Setze ihn um, solange die Energie günstig ist.",
    "horoscope.data.descriptions.leo.5":
      "Liebe und Freundschaft werden begünstigt. Zeige deine Zuneigung offen und ehrlich.",
    "horoscope.data.descriptions.leo.6":
      "Deine Entschlossenheit wird getestet. Bleib standhaft, um Hindernisse erfolgreich zu meistern.",
    "horoscope.data.descriptions.leo.7":
      "Ein altes Problem könnte sich klären. Nutze die Gelegenheit, um Harmonie herzustellen.",
    "horoscope.data.descriptions.leo.8":
      "Achte auf Überarbeitung. Pausen helfen, deine Energie aufzuladen und produktiv zu bleiben.",
    "horoscope.data.descriptions.leo.9":
      "Dein Humor bringt Freude. Teile ihn, um Spannungen zu lösen und Beziehungen zu vertiefen.",
    "horoscope.data.descriptions.leo.10":
      "Ein beruflicher Impuls kann sich ergeben. Prüfe Details sorgfältig, bevor du entscheidest.",
    "horoscope.data.descriptions.leo.11":
      "Eine Überraschung könnte deinen Tag bereichern. Bleib offen für Neues.",
    "horoscope.data.descriptions.leo.12":
      "Deine Kreativität inspiriert andere. Nutze sie, um Projekte oder persönliche Ziele voranzubringen.",
    "horoscope.data.descriptions.leo.13":
      "Deine Leidenschaft ist spürbar. Sie motiviert dich und andere, Positives zu erreichen.",
    "horoscope.data.descriptions.leo.14":
      "Positive Energie begleitet dich. Nutze sie, um Beziehungen und Projekte zu fördern.",
    "horoscope.data.descriptions.virgo.0":
      "Deine Aufmerksamkeit für Details zahlt sich aus. Nutze sie, um Aufgaben effizient abzuschließen.",
    "horoscope.data.descriptions.virgo.1":
      "Achte auf deine Gesundheit. Kleine Anpassungen können große Wirkung zeigen.",
    "horoscope.data.descriptions.virgo.2":
      "Ein organisatorisches Talent hilft dir, Projekte und Termine optimal zu managen.",
    "horoscope.data.descriptions.virgo.3":
      "Jemand könnte deine Hilfe benötigen. Zeige Unterstützung, achte aber auf deine Grenzen.",
    "horoscope.data.descriptions.virgo.4":
      "Deine analytische Fähigkeit löst ein Problem, das dich lange beschäftigt hat.",
    "horoscope.data.descriptions.virgo.5":
      "Ein Moment der Ruhe stärkt dein emotionales Gleichgewicht.",
    "horoscope.data.descriptions.virgo.6":
      "Liebe und Freundschaft werden gefördert. Ehrliche Gesten schaffen Vertrauen.",
    "horoscope.data.descriptions.virgo.7":
      "Berufliche Chancen können auftauchen. Prüfe sie genau, bevor du Entscheidungen triffst.",
    "horoscope.data.descriptions.virgo.8":
      "Kleine Spannungen könnten auftreten. Bleib gelassen und kommuniziere klar.",
    "horoscope.data.descriptions.virgo.9":
      "Deine Genauigkeit beeindruckt andere. Nutze sie, um Projekte erfolgreich abzuschließen.",
    "horoscope.data.descriptions.virgo.10":
      "Eine Gelegenheit zur Verbesserung deines Alltags kann sich ergeben. Sei aufmerksam.",
    "horoscope.data.descriptions.virgo.11":
      "Deine Fürsorge wird geschätzt. Ein nettes Wort oder eine Geste kann viel bewirken.",
    "horoscope.data.descriptions.virgo.12":
      "Ein altes Projekt könnte wiederbelebt werden. Nutze deine Energie, um Fortschritt zu erzielen.",
    "horoscope.data.descriptions.virgo.13":
      "Achte auf Details in zwischenmenschlichen Beziehungen. Kleine Gesten können Harmonie schaffen.",
    "horoscope.data.descriptions.virgo.14":
      "Positive Energie begleitet dich. Folge deiner Intuition und handle bedacht.",
    "horoscope.data.descriptions.libra.0":
      "Dein Sinn für Harmonie ist heute stark. Nutze ihn, um Konflikte zu lösen und Frieden zu fördern.",
    "horoscope.data.descriptions.libra.1":
      "Eine Begegnung könnte neue Perspektiven eröffnen. Sei offen und neugierig.",
    "horoscope.data.descriptions.libra.2":
      "Deine Diplomatie beeindruckt andere. Nutze sie, um Missverständnisse zu vermeiden.",
    "horoscope.data.descriptions.libra.3":
      "Liebe und Freundschaft werden begünstigt. Zeige deine Gefühle ehrlich und offen.",
    "horoscope.data.descriptions.libra.4":
      "Ein kreativer Impuls hilft, Projekte oder Aufgaben voranzutreiben.",
    "horoscope.data.descriptions.libra.5":
      "Achte auf Gleichgewicht zwischen Arbeit und Privatleben. Kleine Pausen helfen, Energie zu bewahren.",
    "horoscope.data.descriptions.libra.6":
      "Eine Chance zur Versöhnung oder Klärung kann sich ergeben. Nutze sie sinnvoll.",
    "horoscope.data.descriptions.libra.7":
      "Deine Charme zieht Aufmerksamkeit an. Bleib authentisch, um echte Verbindungen zu fördern.",
    "horoscope.data.descriptions.libra.8":
      "Deine Kreativität inspiriert andere. Setze Ideen um, um Projekte oder Beziehungen zu stärken.",
    "horoscope.data.descriptions.libra.9":
      "Kleine Missverständnisse könnten auftreten. Bleib ruhig und kommuniziere klar.",
    "horoscope.data.descriptions.libra.10":
      "Ein beruflicher Impuls oder eine neue Gelegenheit kann sich bieten. Prüfe die Details sorgfältig.",
    "horoscope.data.descriptions.libra.11":
      "Deine Geduld wird belohnt. Ein liebevolles Wort oder eine Geste kann Harmonie schaffen.",
    "horoscope.data.descriptions.libra.12":
      "Eine überraschende Chance könnte deinen Tag bereichern. Bleib offen für Neues.",
    "horoscope.data.descriptions.libra.13":
      "Deine Intuition ist stark. Folge ihr bei wichtigen Entscheidungen.",
    "horoscope.data.descriptions.libra.14":
      "Positive Energie begleitet dich. Nutze sie, um Beziehungen, Projekte und persönliche Ziele zu fördern.",
    "horoscope.data.descriptions.scorpio.0":
      "Deine Intuition ist heute besonders stark. Folge deinen Eingebungen, sie führen dich zu guten Entscheidungen, besonders in Liebe und Freundschaft.",
    "horoscope.data.descriptions.scorpio.1":
      "Spannungen könnten in deinem Umfeld auftreten. Lass Eifersucht oder Groll deine Beziehungen nicht stören; setze auf Offenheit.",
    "horoscope.data.descriptions.scorpio.2":
      "Du könntest jemand Interessantes treffen, der deine Neugier und Gefühle weckt. Diese Begegnung könnte deine Gewissheiten erschüttern.",
    "horoscope.data.descriptions.scorpio.3":
      "Deine Entschlossenheit beeindruckt. Ideal, um beruflich voranzukommen oder eine langjährige Angelegenheit zu klären.",
    "horoscope.data.descriptions.scorpio.4":
      "Ein gut gehütetes Geheimnis könnte ans Licht kommen. Obwohl es überrascht, wird es dir helfen, dein Umfeld besser zu verstehen.",
    "horoscope.data.descriptions.scorpio.5":
      "Deine Intensität zieht an und kann destabilisieren. Nutze diese Energie, um Beziehungen zu stärken, aber vermeide Besitzgier.",
    "horoscope.data.descriptions.scorpio.6":
      "Eine unerwartete Gelegenheit könnte sich ergeben. Prüfe die Details, bevor du zusagst: nicht alles ist, wie es scheint.",
    "horoscope.data.descriptions.scorpio.7":
      "Du fühlst das Bedürfnis, dich zurückzuziehen, um nachzudenken. Diese Reflexion hilft dir, Prioritäten zu klären und dein inneres Gleichgewicht wiederzufinden.",
    "horoscope.data.descriptions.scorpio.8":
      "Ein Projekt oder eine Idee, die du schon lange verfolgst, erhält Auftrieb. Deine Ausdauer beginnt Früchte zu tragen.",
    "horoscope.data.descriptions.scorpio.9":
      "Achte auf Missverständnisse in der Liebe. Deine starken Gefühle können die Kommunikation trüben. Bleib ruhig und drücke deine Gefühle sanft aus.",
    "horoscope.data.descriptions.scorpio.10":
      "Dein Charisma ist heute stark. Du könntest die Aufmerksamkeit einer wichtigen Person für zukünftige Projekte auf dich ziehen.",
    "horoscope.data.descriptions.scorpio.11":
      "Eifersucht oder Konkurrenz aus deinem Umfeld könnte auftauchen. Schütze deine Energie und vermeide unnötige Konflikte.",
    "horoscope.data.descriptions.scorpio.12":
      "Deine Leidenschaft ist ein unglaublicher Motor, aber überanstrenge dich nicht. Mach Pausen, um emotionales und körperliches Gleichgewicht zu bewahren.",
    "horoscope.data.descriptions.scorpio.13":
      "Eine gute Nachricht könnte deinen Tag erhellen – beruflich, emotional oder finanziell. Nimm sie mit Vertrauen an.",
    "horoscope.data.descriptions.scorpio.14":
      "Deine Fähigkeit zur Transformation ist auf ihrem Höhepunkt. Nutze diese Energie, um ein schwieriges Kapitel zu schließen und ein neues zu beginnen.",
    "horoscope.data.descriptions.sagittarius.0":
      "Dein Optimismus erhellt heute deinen Tag. Nutze ihn, um Neues zu beginnen und Freude zu teilen.",
    "horoscope.data.descriptions.sagittarius.1":
      "Eine unerwartete Begegnung könnte deine Neugier und Gefühle wecken. Sei offen für neue Menschen, sie könnten dich überraschen.",
    "horoscope.data.descriptions.sagittarius.2":
      "Dein abenteuerlicher Geist treibt dich an, neue Ideen oder Orte zu erkunden. Vermeide Zerstreuung, fokussiere dich auf Wichtiges.",
    "horoscope.data.descriptions.sagittarius.3":
      "Im Job tut sich eine Gelegenheit auf. Nutze sie, prüfe aber die Details, um Missverständnisse zu vermeiden.",
    "horoscope.data.descriptions.sagittarius.4":
      "Deine Freunde schätzen deine positive Energie. Ein Streit kann auftreten, aber deine Diplomatie stellt schnell Harmonie her.",
    "horoscope.data.descriptions.sagittarius.5":
      "Die Liebe ist heute begünstigt. Eine liebevolle Geste oder ein ehrliches Wort kann Beziehungen stärken oder ein besonderes Treffen auslösen.",
    "horoscope.data.descriptions.sagittarius.6":
      "Du könntest Versuchungen zu Übermaß oder impulsiven Ausgaben verspüren. Halte dein Gleichgewicht, um spätere Reue zu vermeiden.",
    "horoscope.data.descriptions.sagittarius.7":
      "Deine Kreativität und originellen Ideen stehen im Vordergrund. Drücke sie aus, sie könnten dein Umfeld inspirieren und neue Türen öffnen.",
    "horoscope.data.descriptions.sagittarius.8":
      "Eine verborgene Wahrheit oder ein Geheimnis könnte aufgedeckt werden. Bleib aufmerksam, um Missverständnisse zu vermeiden.",
    "horoscope.data.descriptions.sagittarius.9":
      "Ein günstiger Tag für Reisen oder Lernen. Erweitere deinen Horizont und entdecke etwas Neues über dich selbst.",
    "horoscope.data.descriptions.sagittarius.10":
      "Dein Humor und deine Leichtigkeit ziehen andere an. Teile diese Momente, bleib aber ehrlich, um Täuschungen zu vermeiden.",
    "horoscope.data.descriptions.sagittarius.11":
      "Eine Herausforderung oder ein Hindernis kann auftauchen. Deine Ausdauer und Begeisterung helfen, es erfolgreich zu überwinden.",
    "horoscope.data.descriptions.sagittarius.12":
      "Achte auf familiäre Spannungen. Höre zu und verstehe die Bedürfnisse aller, um Konflikte zu vermeiden.",
    "horoscope.data.descriptions.sagittarius.13":
      "Deine Intuition ist gestärkt. Folge deinen Gefühlen bei Entscheidungen, vor allem in Liebe und Freundschaft.",
    "horoscope.data.descriptions.sagittarius.14":
      "Eine günstige Energie begleitet dich, um Projekte zu realisieren. Nutze diese kosmische Unterstützung, um deine Ziele und dein Glück voranzubringen.",
    "horoscope.data.descriptions.capricorn.0":
      "Deine Ernsthaftigkeit und Ausdauer ziehen heute Bewunderung auf sich. Ideale Zeit, um ein wichtiges Projekt voranzutreiben.",
    "horoscope.data.descriptions.capricorn.1":
      "Jemand aus deinem Umfeld könnte dich mit seinen Reaktionen überraschen. Sei aufmerksam und ziehe keine voreiligen Schlüsse.",
    "horoscope.data.descriptions.capricorn.2":
      "Dein Organisationssinn ermöglicht es dir, Verantwortung effektiv zu managen. Vergiss nicht, dich zwischendurch zu entspannen.",
    "horoscope.data.descriptions.capricorn.3":
      "Eine berufliche oder finanzielle Gelegenheit taucht auf. Prüfe sie sorgfältig, bevor du entscheidest.",
    "horoscope.data.descriptions.capricorn.4":
      "Deine Loyalität wird geschätzt, aber lass dich nicht ausnutzen. Setze klare Grenzen, wenn nötig.",
    "horoscope.data.descriptions.capricorn.5":
      "Ein schöner Moment mit einem geliebten Menschen könnte die Bindung stärken. Genieße diese Nähe.",
    "horoscope.data.descriptions.capricorn.6":
      "Du könntest zu Übermaß oder impulsiven Ausgaben neigen. Sei vorsichtig, um späteren Ärger zu vermeiden.",
    "horoscope.data.descriptions.capricorn.7":
      "Eine kreative Idee oder ein zurückgestelltes Projekt erhält Auftrieb. Zögere nicht, es umzusetzen.",
    "horoscope.data.descriptions.capricorn.8":
      "Ein verborgenes Geheimnis könnte ans Licht kommen. Nimm dir Zeit, bevor du reagierst.",
    "horoscope.data.descriptions.capricorn.9":
      "Deine konstanten Bemühungen zeigen heute Ergebnisse. Zeit, die Früchte deiner Arbeit zu ernten.",
    "horoscope.data.descriptions.capricorn.10":
      "Deine Ernsthaftigkeit inspiriert Vertrauen und Respekt. Zeige deine Fähigkeiten und Talente.",
    "horoscope.data.descriptions.capricorn.11":
      "Achte auf Spannungen im Berufs- oder Familienumfeld. Ruhe bewahren und den Dialog priorisieren.",
    "horoscope.data.descriptions.capricorn.12":
      "Deine Intuition ist besonders fein. Folge deinen Eingebungen, besonders in Liebe und Freundschaft.",
    "horoscope.data.descriptions.capricorn.13":
      "Ein Tag für bereichernde Kontakte und Gespräche. Begegnungen könnten neue Perspektiven eröffnen.",
    "horoscope.data.descriptions.capricorn.14":
      "Deine Ausdauer und Disziplin helfen, Hindernisse zu überwinden. Eine günstige Energie begleitet dich, nutze sie.",
    "horoscope.data.descriptions.aquarius.0":
      "Deine Originalität und Kreativität stehen heute im Vordergrund. Teile deine Ideen, sie könnten inspirieren.",
    "horoscope.data.descriptions.aquarius.1":
      "Eine unerwartete Begegnung kann Neugier und Gefühle wecken. Achte darauf, diese Person könnte den Tag prägen.",
    "horoscope.data.descriptions.aquarius.2":
      "Dein innovativer Geist ist stark. Nutze neue Methoden in Arbeit oder Projekten.",
    "horoscope.data.descriptions.aquarius.3":
      "Achte auf Missverständnisse mit Nahestehenden. Höre zu, um Konflikte zu vermeiden.",
    "horoscope.data.descriptions.aquarius.4":
      "Eine überraschende Gelegenheit kann auftauchen. Prüfe sie, bevor du dich verpflichtest.",
    "horoscope.data.descriptions.aquarius.5":
      "Deine kommunikative Energie zieht Aufmerksamkeit an. Ideal, um freundschaftliche oder berufliche Beziehungen zu stärken.",
    "horoscope.data.descriptions.aquarius.6":
      "Ein Moment der Einsamkeit hilft, Energie aufzuladen und über Prioritäten nachzudenken.",
    "horoscope.data.descriptions.aquarius.7":
      "Deine originellen Ideen könnten Bewunderung und etwas Neid hervorrufen. Bleib fokussiert.",
    "horoscope.data.descriptions.aquarius.8":
      "Eine angenehme Überraschung kann deinen Tag bereichern.",
    "horoscope.data.descriptions.aquarius.9":
      "Dein Sinn für Gerechtigkeit ist gefragt. Hilf, Spannungen zu entschärfen.",
    "horoscope.data.descriptions.aquarius.10":
      "Achte auf impulsive Entscheidungen. Überlege gut, bevor du handelst.",
    "horoscope.data.descriptions.aquarius.11":
      "Ein verborgenes Geheimnis könnte ans Licht kommen. Nutze die Informationen, um Beziehungen oder Projekte zu verbessern.",
    "horoscope.data.descriptions.aquarius.12":
      "Liebe und Freundschaften werden begünstigt. Ehrliche Gesten stärken Bindungen.",
    "horoscope.data.descriptions.aquarius.13":
      "Ein altes Projekt könnte neue Impulse bekommen. Ideal, um Ideen umzusetzen.",
    "horoscope.data.descriptions.aquarius.14":
      "Positive Energie begleitet dich. Folge deiner Intuition und handle mutig.",
    "horoscope.data.descriptions.pisces.0":
      "Deine Sensibilität ist heute deine Stärke. Höre auf deine Gefühle in Beziehungen und Entscheidungen.",
    "horoscope.data.descriptions.pisces.1":
      "Jemand Nahestehendes könnte dich überraschen. Bleib aufmerksam, um Missverständnisse zu vermeiden.",
    "horoscope.data.descriptions.pisces.2":
      "Deine Kreativität ist stark. Setze sie künstlerisch oder in Projekten ein.",
    "horoscope.data.descriptions.pisces.3":
      "Achte auf impulsive Entscheidungen, besonders finanziell. Überlege sorgfältig.",
    "horoscope.data.descriptions.pisces.4":
      "Freundschaften werden gestärkt. Ein ehrliches Wort kann Beziehungen vertiefen.",
    "horoscope.data.descriptions.pisces.5":
      "Zeit für Selbstreflexion. Verbinde dich mit deinen Bedürfnissen und Wünschen.",
    "horoscope.data.descriptions.pisces.6":
      "Eine unerwartete Chance kann sich bieten. Prüfe sie gut.",
    "horoscope.data.descriptions.pisces.7":
      "Deine Intuition ist besonders fein. Vertraue ihr bei persönlichen und beruflichen Entscheidungen.",
    "horoscope.data.descriptions.pisces.8":
      "Nahestehende könnten deine Unterstützung suchen. Zeige Empathie, achte aber auf dich.",
    "horoscope.data.descriptions.pisces.9":
      "Eine romantische oder emotionale Überraschung kann den Tag verschönern.",
    "horoscope.data.descriptions.pisces.10":
      "Kleine Spannungen können auftreten. Bleib ruhig und kommuniziere klar.",
    "horoscope.data.descriptions.pisces.11":
      "Dein Mitgefühl zieht andere an. Schaffe echte und dauerhafte Bindungen.",
    "horoscope.data.descriptions.pisces.12":
      "Ein altes Projekt könnte neuen Schwung bekommen. Ideal, um Ideen umzusetzen.",
    "horoscope.data.descriptions.pisces.13":
      "Intensive und bereichernde Emotionen heute. Nutze sie für Beziehungen und Initiativen.",
    "horoscope.data.descriptions.pisces.14":
      "Positive Energie begleitet dich. Folge deiner Intuition und lasse dein Herz Entscheidungen führen.",

    // Verschiedene Endnachrichten
    "horoscope.message.var1":
      "{genderText} {name}, als {zodiacSign} hast du diese schöne Energie, die gute Dinge anzieht. Vertraue heute den Sternen und deiner Intuition!",
    "horoscope.message.var2":
      "{genderText} {name}, dein {zodiacSign}-Sternzeichen bringt dir heute positive Energie. Lass dich von den Sternen führen!",
    "horoscope.message.var3":
      "Lieber {zodiacSign} {name}, die Sterne lächeln heute über dich. Genieße diese schöne kosmische Energie, die dich umgibt!",
    "horoscope.message.var4":
      "{genderText} {name}, dein {zodiacSign} strahlt heute. Möge dieser Tag dir Freude und Gelassenheit bringen!",
    "horoscope.message.var5":
      "Die Sterne segnen dich heute, {name}. Als {zodiacSign} bist du in perfekter Harmonie mit dem Universum!",

    // Variationen für die Kompatibilität
    "horoscope.compatibility.var1":
      "Kompatibilität: Heute wirst du dich besonders gut mit den {compatibility}-Zeichen verstehen. Es ist die ideale Zeit, deine Beziehungen zu stärken!",
    "horoscope.compatibility.var2":
      "Affinitäten: {compatibility}-Zeichen schwingen heute auf derselben Wellenlänge wie du. Nutze diese Harmonie!",
    "horoscope.compatibility.var3":
      "Besondere Verbindungen: {compatibility} werden heute deine perfekten Verbündeten sein. Eine schöne Verbundenheit erwartet dich!",
    "horoscope.compatibility.var4":
      "Kosmische Verbindungen: Die Energie der {compatibility}-Zeichen harmoniert wunderbar mit deiner. Lass dich von dieser Synergie tragen!",
    "horoscope.compatibility.var5":
      "Astrale Harmonien: {compatibility} teilen heute deine Schwingungen. Diese Begegnungen könnten magisch sein!",
    "horoscope.compatibility.var6":
      "Stellare Verbundenheit: Eingeborene von {compatibility} verstehen heute intuitiv deine Stimmung. Pflege diese wertvollen Bindungen!",
    "horoscope.compatibility.var7":
      "Planetarische Synergien: {compatibility} sind heute in perfekter Resonanz mit deiner Energie. Eine fruchtbare Zusammenarbeit steht bevor!",
    "horoscope.compatibility.var8":
      "Himmlisches Verständnis: {compatibility} teilen heute deine Sichtweise. Es ist der perfekte Moment, deine Austausche zu vertiefen!",

    // Stimmungsvariationen
    "horoscope.mood.var1":
      "Deine Stimmung heute: {mood}\nDiese Energie wird dich den ganzen Tag begleiten. Nutze sie, um Dinge zu tun, die dir guttun!",
    "horoscope.mood.var2":
      "Geisteszustand des Tages: {mood}\nLass diese positive Schwingung heute deine Handlungen und Entscheidungen leiten!",
    "horoscope.mood.var3":
      "Dominante Energie: {mood}\nDies ist der perfekte Moment, um diese innere Kraft in deine Projekte zu lenken!",
    "horoscope.mood.var4":
      "Kosmische Atmosphäre: {mood}\nDu strahlst diese schöne Energie aus, die alle guten Dinge zu dir zieht!",
    "horoscope.mood.var5":
      "Astrale Schwingung: {mood}\nDiese besondere Stimmung wird deinen Tag mit tausend positiven Nuancen färben!",
    "horoscope.mood.var6":
      "Planetarischer Einfluss: {mood}\nUmarme diese einzigartige Energie und lass sie deinen Tag in etwas Außergewöhnliches verwandeln!",

    // Horoscope Data Translations - Moods (French server keys with German values)
    "horoscope.data.moods.Énergique": "Energiegeladen",
    "horoscope.data.moods.Confiant": "Selbstbewusst",
    "horoscope.data.moods.Déterminé": "Entschlossen",
    "horoscope.data.moods.Passionné": "Leidenschaftlich",
    "horoscope.data.moods.Optimiste": "Optimistisch",
    "horoscope.data.moods.Dynamique": "Dynamisch",
    "horoscope.data.moods.Paisible": "Friedlich",
    "horoscope.data.moods.Sensuel": "Sinnlich",
    "horoscope.data.moods.Stable": "Stabil",
    "horoscope.data.moods.Généreux": "Großzügig",
    "horoscope.data.moods.Patient": "Geduldig",
    "horoscope.data.moods.Harmonieux": "Harmonisch",
    "horoscope.data.moods.Curieux": "Neugierig",
    "horoscope.data.moods.Communicatif": "Kommunikativ",
    "horoscope.data.moods.Vif": "Lebhaft",
    "horoscope.data.moods.Sociable": "Gesellig",
    "horoscope.data.moods.Adaptable": "Anpassungsfähig",
    "horoscope.data.moods.Créatif": "Kreativ",
    "horoscope.data.moods.Émotionnel": "Emotional",
    "horoscope.data.moods.Protecteur": "Beschützend",
    "horoscope.data.moods.Intuitif": "Intuitiv",
    "horoscope.data.moods.Tendre": "Zärtlich",
    "horoscope.data.moods.Maternel": "Mütterlich",
    "horoscope.data.moods.Empathique": "Einfühlsam",
    "horoscope.data.moods.Rayonnant": "Strahlend",
    "horoscope.data.moods.Majestueux": "Majestätisch",
    "horoscope.data.moods.Charismatique": "Charismatisch",
    "horoscope.data.moods.Théâtral": "Theatralisch",
    "horoscope.data.moods.Méthodique": "Methodisch",
    "horoscope.data.moods.Serviable": "Hilfsbereit",
    "horoscope.data.moods.Précis": "Präzise",
    "horoscope.data.moods.Sage": "Weise",
    "horoscope.data.moods.Analytique": "Analytisch",
    "horoscope.data.moods.Perfectionniste": "Perfektionistisch",
    "horoscope.data.moods.Raffiné": "Raffiniert",
    "horoscope.data.moods.Diplomatique": "Diplomatisch",
    "horoscope.data.moods.Équilibré": "Ausgeglichen",
    "horoscope.data.moods.Artistique": "Künstlerisch",
    "horoscope.data.moods.Charmeur": "Charmant",
    "horoscope.data.moods.Intense": "Intensiv",
    "horoscope.data.moods.Mystérieux": "Geheimnisvoll",
    "horoscope.data.moods.Transformateur": "Verändernd",
    "horoscope.data.moods.Magnétique": "Anziehend",
    "horoscope.data.moods.Profond": "Tiefgründig",
    "horoscope.data.moods.Aventurier": "Abenteuerlustig",
    "horoscope.data.moods.Philosophe": "Philosophisch",
    "horoscope.data.moods.Libre": "Frei",
    "horoscope.data.moods.Explorateur": "Entdeckend",
    "horoscope.data.moods.Enthousiaste": "Begeistert",
    "horoscope.data.moods.Ambitieux": "Ehrgeizig",
    "horoscope.data.moods.Responsable": "Verantwortungsbewusst",
    "horoscope.data.moods.Persévérant": "Ausdauernd",
    "horoscope.data.moods.Discipliné": "Diszipliniert",
    "horoscope.data.moods.Pragmatique": "Pragmatisch",
    "horoscope.data.moods.Visionnaire": "Visionär",
    "horoscope.data.moods.Indépendant": "Unabhängig",
    "horoscope.data.moods.Humaniste": "Humanitär",
    "horoscope.data.moods.Original": "Originell",
    "horoscope.data.moods.Innovateur": "Innovativ",
    "horoscope.data.moods.Altruiste": "Selbstlos",
    "horoscope.data.moods.Compassionnel": "Mitfühlend",
    "horoscope.data.moods.Spirituel": "Spirituell",
    "horoscope.data.moods.Rêveur": "Träumerisch",
    "horoscope.data.moods.Sensible": "Sensibel",

    // Horoscope Data Translations - Colors (French server keys with German values)
    "horoscope.data.colors.Rouge": "Rot",
    "horoscope.data.colors.Orange vif": "Helles Orange",
    "horoscope.data.colors.Bordeaux": "Bordeaux",
    "horoscope.data.colors.Corail": "Koralle",
    "horoscope.data.colors.Écarlate": "Scharlachrot",
    "horoscope.data.colors.Vermillon": "Zinnoberrot",
    "horoscope.data.colors.Vert émeraude": "Smaragdgrün",
    "horoscope.data.colors.Rose tendre": "Zartrosa",
    "horoscope.data.colors.Beige doré": "Goldbeige",
    "horoscope.data.colors.Terre de Sienne": "Siena",
    "horoscope.data.colors.Vert olive": "Olivgrün",
    "horoscope.data.colors.Rose poudré": "Puderrosa",
    "horoscope.data.colors.Jaune citron": "Zitronengelb",
    "horoscope.data.colors.Bleu ciel": "Himmelblau",
    "horoscope.data.colors.Argent": "Silber",
    "horoscope.data.colors.Lavande": "Lavendel",
    "horoscope.data.colors.Jaune d'or": "Goldgelb",
    "horoscope.data.colors.Bleu pervenche": "Immergrünblau",
    "horoscope.data.colors.Blanc nacré": "Perlweiß",
    "horoscope.data.colors.Bleu océan": "Ozeanblau",
    "horoscope.data.colors.Argent lunaire": "Mondsilber",
    "horoscope.data.colors.Rose pâle": "Blassrosa",
    "horoscope.data.colors.Perle": "Perle",
    "horoscope.data.colors.Bleu laiteux": "Milchblau",
    "horoscope.data.colors.Or": "Gold",
    "horoscope.data.colors.Orange solaire": "Sonnenorange",
    "horoscope.data.colors.Jaune impérial": "Kaiserlichgelb",
    "horoscope.data.colors.Rouge royal": "Königsrot",
    "horoscope.data.colors.Doré": "Goldfarben",
    "horoscope.data.colors.Ambre": "Bernstein",
    "horoscope.data.colors.Beige naturel": "Naturbeige",
    "horoscope.data.colors.Gris perle": "Perlgrau",
    "horoscope.data.colors.Bleu marine": "Marineblau",
    "horoscope.data.colors.Taupe": "Taupe",
    "horoscope.data.colors.Kaki": "Khaki",
    "horoscope.data.colors.Rose pastel": "Pastellrosa",
    "horoscope.data.colors.Vert menthe": "Mintgrün",
    "horoscope.data.colors.Ivoire": "Elfenbein",
    "horoscope.data.colors.Lilas": "Flieder",
    "horoscope.data.colors.Bleu poudré": "Puderblau",
    "horoscope.data.colors.Rouge bordeaux": "Bordeauxrot",
    "horoscope.data.colors.Noir profond": "Tiefschwarz",
    "horoscope.data.colors.Pourpre": "Purpur",
    "horoscope.data.colors.Grenat": "Granatrot",
    "horoscope.data.colors.Cramoisi": "Karmesinrot",
    "horoscope.data.colors.Brun acajou": "Mahagonibraun",
    "horoscope.data.colors.Bleu turquoise": "Türkisblau",
    "horoscope.data.colors.Violet royal": "Königliches Violett",
    "horoscope.data.colors.Orange mandarine": "Mandarinenorange",
    "horoscope.data.colors.Vert forêt": "Waldgrün",
    "horoscope.data.colors.Indigo": "Indigo",
    "horoscope.data.colors.Cobalt": "Kobaltblau",
    "horoscope.data.colors.Gris anthracite": "Anthrazitgrau",
    "horoscope.data.colors.Marron chocolat": "Schokoladenbraun",
    "horoscope.data.colors.Vert foncé": "Dunkelgrün",
    "horoscope.data.colors.Bleu nuit": "Nachtblau",
    "horoscope.data.colors.Sépia": "Sepia",
    "horoscope.data.colors.Vert sapin": "Tannengrün",
    "horoscope.data.colors.Bleu électrique": "Elektrischblau",
    "horoscope.data.colors.Argent métallique": "Metallsilber",
    "horoscope.data.colors.Turquoise": "Türkis",
    "horoscope.data.colors.Violet": "Violett",
    "horoscope.data.colors.Néon": "Neon",
    "horoscope.data.colors.Cyan": "Cyan",
    "horoscope.data.colors.Vert aqua": "Aquagrün",
    "horoscope.data.colors.Violet mystique": "Mystisches Violett",
    "horoscope.data.colors.Blanc perle": "Perlweiß",
    "horoscope.data.colors.Bleu lagon": "Lagunenblau",
    "horoscope.data.colors.Vert d'eau": "Wassergrün",

    // Horoscope Data Translations - Compatibility (French server keys with German values)
    "horoscope.data.compatibility.Lion, Sagittaire": "Löwe, Schütze",
    "horoscope.data.compatibility.Gémeaux, Verseau": "Zwillinge, Wassermann",
    "horoscope.data.compatibility.Balance, Lion": "Waage, Löwe",
    "horoscope.data.compatibility.Verseau, Gémeaux": "Wassermann, Zwillinge",
    "horoscope.data.compatibility.Sagittaire, Balance": "Schütze, Waage",
    "horoscope.data.compatibility.Lion, Verseau": "Löwe, Wassermann",
    "horoscope.data.compatibility.Vierge, Capricorne": "Jungfrau, Steinbock",
    "horoscope.data.compatibility.Cancer, Poissons": "Krebs, Fische",
    "horoscope.data.compatibility.Scorpion, Vierge": "Skorpion, Jungfrau",
    "horoscope.data.compatibility.Capricorne, Cancer": "Steinbock, Krebs",
    "horoscope.data.compatibility.Poissons, Scorpion": "Fische, Skorpion",
    "horoscope.data.compatibility.Vierge, Poissons": "Jungfrau, Fische",
    "horoscope.data.compatibility.Balance, Verseau": "Waage, Wassermann",
    "horoscope.data.compatibility.Bélier, Lion": "Widder, Löwe",
    "horoscope.data.compatibility.Verseau, Bélier": "Wassermann, Widder",
    "horoscope.data.compatibility.Sagittaire, Gémeaux": "Schütze, Zwillinge",
    "horoscope.data.compatibility.Balance, Bélier": "Waage, Widder",
    "horoscope.data.compatibility.Scorpion, Poissons": "Skorpion, Fische",
    "horoscope.data.compatibility.Taureau, Vierge": "Stier, Jungfrau",
    "horoscope.data.compatibility.Capricorne, Scorpion": "Steinbock, Skorpion",
    "horoscope.data.compatibility.Poissons, Taureau": "Fische, Stier",
    "horoscope.data.compatibility.Bélier, Sagittaire": "Widder, Schütze",
    "horoscope.data.compatibility.Gémeaux, Balance": "Zwillinge, Waage",
    "horoscope.data.compatibility.Bélier, Gémeaux": "Widder, Zwillinge",
    "horoscope.data.compatibility.Verseau, Lion": "Wassermann, Löwe",
    "horoscope.data.compatibility.Sagittaire, Bélier": "Schütze, Widder",
    "horoscope.data.compatibility.Gémeaux, Lion": "Zwillinge, Löwe",
    "horoscope.data.compatibility.Cancer, Scorpion": "Krebs, Skorpion",
    "horoscope.data.compatibility.Vierge, Cancer": "Jungfrau, Krebs",
    "horoscope.data.compatibility.Scorpion, Capricorne": "Skorpion, Steinbock",
    "horoscope.data.compatibility.Cancer, Vierge": "Krebs, Jungfrau",
    "horoscope.data.compatibility.Cancer, Taureau": "Krebs, Stier",
    "horoscope.data.compatibility.Vierge, Scorpion": "Jungfrau, Skorpion",
    "horoscope.data.compatibility.Poissons, Cancer": "Fische, Krebs",
    "horoscope.data.compatibility.Taureau, Poissons": "Stier, Fische",
    "horoscope.data.compatibility.Cancer, Capricorne": "Krebs, Steinbock",
    "horoscope.data.compatibility.Lion, Balance": "Löwe, Waage",
    "horoscope.data.compatibility.Balance, Sagittaire": "Waage, Schütze",
    "horoscope.data.compatibility.Gémeaux, Sagittaire": "Zwillinge, Schütze",

    // Horoscope
    "horoscope.title": "Tageshoroskop",
    "horoscope.predictions": "Ihre Astralvorhersagen",
    "horoscope.retry": "Erneut versuchen",
    "horoscope.home": "Startseite",
    "horoscope.newConsultation": "Neue Beratung",
    "horoscope.error":
      "Entschuldigung, Ihr Tageshoroskop konnte nicht abgerufen werden.",
    "horoscope.loading": "Die Sterne enthüllen Ihre Vorhersagen...",
    "horoscope.noSign":
      "Entschuldigung, wir brauchen Ihr astrologisches Zeichen, um Ihr Horoskop anzuzeigen.",

    // DEUTSCH - Alle neuen Übersetzungen für die Variationen

    // ========== VERSCHIEDENE BEGRÜSSUNGEN ==========

    // Tägliche Legung - Varianten
    "interpretation.daily.greeting.var1":
      "Hallo {name}! Ich habe heute eine besondere Botschaft für dich.",
    "interpretation.daily.greeting.var2":
      "Hi {name}! Dein täglicher Führer wartet ungeduldig auf dich.",
    "interpretation.daily.greeting.var3":
      "Hello {name}! Eine wunderschöne Energie begleitet dich heute.",
    "interpretation.daily.greeting.var4":
      "Guten Tag {name}! Kosmische Energien haben etwas für dich vorbereitet.",

    // Tarot - Varianten
    "interpretation.tarot.greeting.var1":
      "Hi {name}! Deine Tarot-Legung enthüllt faszinierende Aspekte deines Lebens.",
    "interpretation.tarot.greeting.var2":
      "Hello {name}! Die Tarot-Karten haben kraftvolle Botschaften für dich.",
    "interpretation.tarot.greeting.var3":
      "Guten Tag {name}! Deine Tarot-Legung offenbart wichtige Wahrheiten.",
    "interpretation.tarot.greeting.var4":
      "Hallo {name}! Die Tarot-Arkanen sprechen klar über deine Zukunft.",

    // Engel - Varianten
    "interpretation.angels.greeting.var1":
      "Hallo {name}! Das Engelreich strömt über vor Liebesbotschaften für dich.",
    "interpretation.angels.greeting.var2":
      "Hi {name}! Deine himmlischen Führer erleuchten heute deinen Weg.",
    "interpretation.angels.greeting.var3":
      "Hello {name}! Engel singen Melodien der Führung speziell für dich.",
    "interpretation.angels.greeting.var4":
      "Guten Tag {name}! Eine engelhafte Symphonie erklingt in den himmlischen Sphären für dich.",

    // Runen - Varianten
    "interpretation.runes.greeting.var1":
      "Heil {name}! Die Runen der Alten sprechen von deinem Wikinger-Erbe.",
    "interpretation.runes.greeting.var2":
      "Hallo {name}! Das Echo der nordischen Götter hallt durch diese heiligen Runen.",
    "interpretation.runes.greeting.var3":
      "Guten Tag {name}! Die jahrtausendealten Runen enthüllen die Kraft, die in dir schlummert.",
    "interpretation.runes.greeting.var4":
      "Hello {name}! Die Weisheit der Wikinger überdauert die Zeitalter, um dich zu führen.",

    // ========== VERSCHIEDENE ÜBERGÄNGE ==========

    // Vergangenheits-Übergänge
    "interpretation.transition.past.var1":
      "Diese Erfahrungen haben dich wirklich wachsen lassen und stärker{genderSuffix} gemacht.",
    "interpretation.transition.past.var2":
      "Diese Momente haben deinen Charakter und deine Widerstandsfähigkeit geformt.",
    "interpretation.transition.past.var3":
      "All das hat dazu beigetragen, die Person zu formen, die du geworden{genderSuffix} bist.",
    "interpretation.transition.past.var4":
      "Diese Prüfungen haben dir kostbare Weisheit gegeben.",
    "interpretation.transition.past.var5":
      "Dank dieser Erfahrungen hast du deine innere Stärke entwickelt.",
    "interpretation.transition.past.var6":
      "Diese Ereignisse haben dir wichtige Lebenslektionen gelehrt.",
    "interpretation.transition.past.var7":
      "All diese Erfahrung hat deine Seele und deinen Weg bereichert.",
    "interpretation.transition.past.var8":
      "Diese Herausforderungen haben deine wahre Natur und Entschlossenheit offenbart.",

    // Gegenwarts-Übergänge
    "interpretation.transition.present.var1":
      "Du befindest dich in einer wichtigen Periode, die schöne Dinge ankündigt.",
    "interpretation.transition.present.var2":
      "Diese Lebensphase eröffnet vielversprechende Perspektiven.",
    "interpretation.transition.present.var3":
      "Es ist ein Schlüsselmoment, der deine strahlende Zukunft vorbereitet.",
    "interpretation.transition.present.var4":
      "Diese aktuelle Periode legt die Grundlage für deinen zukünftigen Erfolg.",
    "interpretation.transition.present.var5":
      "Du durchlebst einen Übergang, der dein Leben positiv transformieren wird.",
    "interpretation.transition.present.var6":
      "Dieser gegenwärtige Moment trägt große Versprechen in sich.",
    "interpretation.transition.present.var7":
      "Diese Etappe markiert eine positive Wende in deiner Existenz.",
    "interpretation.transition.present.var8":
      "Du durchläufst eine Phase, die dir viel Zufriedenheit bringen wird.",

    // Zukunfts-Übergänge
    "interpretation.transition.future.var1":
      "Diese Energie wird dein Leben auf positive und dauerhafte Weise transformieren.",
    "interpretation.transition.future.var2":
      "Diese Einflüsse werden wunderbare Veränderungen in dein Leben bringen.",
    "interpretation.transition.future.var3":
      "Diese Kraft wird außergewöhnliche Gelegenheiten für dich schaffen.",
    "interpretation.transition.future.var4":
      "Diese Schwingungen werden alles anziehen, was du brauchst.",
    "interpretation.transition.future.var5":
      "Diese Energie wird deine liebsten Träume manifestieren.",
    "interpretation.transition.future.var6":
      "Diese göttlichen Einflüsse werden deinen Weg erleuchten.",
    "interpretation.transition.future.var7":
      "Diese Macht wird dein verborgenes Potenzial freischalten.",
    "interpretation.transition.future.var8":
      "Diese Energien werden alle Aspekte deines Lebens synchronisieren.",

    // ========== VERSCHIEDENE RATSCHLÄGE ==========

    "interpretation.advice.var1":
      "vertraue deinem Instinkt. Du hast alles, was zum Erfolg nötig ist!",
    "interpretation.advice.var2":
      "höre auf deine innere Weisheit. Sie wird dich niemals verraten!",
    "interpretation.advice.var3":
      "folge deinem Herzen und deinen Intuitionen. Sie führen dich zum Glück!",
    "interpretation.advice.var4":
      "bleibe mit deinen Werten verbunden{genderSuffix}. Sie sind dein bester Führer!",
    "interpretation.advice.var5":
      "glaube an deine Fähigkeiten. Du bist stärker{genderSuffix} als du denkst!",
    "interpretation.advice.var6":
      "bleibe offen{genderSuffix} für Gelegenheiten. Das Universum arbeitet für dich!",
    "interpretation.advice.var7":
      "kultiviere deine Geduld. Alles kommt zur perfekten Zeit!",
    "interpretation.advice.var8":
      "bewahre deine Entschlossenheit. Deine Anstrengungen werden belohnt werden!",
    "interpretation.advice.var9":
      "bewahre deinen Optimismus. Er zieht die besten Energien an!",
    "interpretation.advice.var10":
      "nähre dein Vertrauen. Es ist der Schlüssel zu all deinen Erfolgen!",

    //Übersetzungsschlüssel-Variationen
    "interpretation.tarot.template.advice.var1":
      "Mein Rat: {name}, mit deinem {zodiacSign}-Wesen,",
    "interpretation.tarot.template.advice.var2":
      "{genderText} {name}, als {zodiacSign},",
    "interpretation.tarot.template.advice.var3":
      "Hör gut zu, {name}: als {zodiacSign},",
    "interpretation.tarot.template.advice.var4":
      "Merke dir, {name}, dein {zodiacSign}-Wesen ist deine Stärke.",
    "interpretation.tarot.template.advice.var5":
      "{name}, die Sterne sprechen durch dein {zodiacSign}-Wesen.",
    "interpretation.tarot.template.advice.var6":
      "Denk daran, {name}: dein Sternzeichen {zodiacSign} birgt eine wichtige Wahrheit.",
    "interpretation.tarot.template.advice.var7":
      "{genderText} {name}, dein Schicksal schwingt mit der Energie des {zodiacSign}.",
    "interpretation.tarot.template.advice.var8":
      "Wisse dies, {name}, als {zodiacSign} trägst du ein einzigartiges Licht in dir.",

    // Vorlagen für die abschließende Botschaft
    "interpretation.angels.template.message.var1":
      "Engelbotschaft: {genderText} {name}, mit deiner {zodiacSign}-Essenz",
    "interpretation.angels.template.message.var2":
      "Die Engel übermitteln dir, {name}: als {zodiacSign}",
    "interpretation.angels.template.message.var3":
      "Himmlische Führung, {name}: wie ein echter {zodiacSign}",
    "interpretation.angels.template.message.var4":
      "Engelssegen, {name}, deine {zodiacSign}-Natur leuchtet hell",
    "interpretation.angels.template.message.var5":
      "{name}, die Engel ehren dein {zodiacSign}-Licht.",
    "interpretation.angels.template.message.var6":
      "Höre hin, {name}: deine {zodiacSign}-Seele empfängt eine göttliche Botschaft.",
    "interpretation.angels.template.message.var7":
      "Himmlische Botschaft für dich, {name} — als {zodiacSign} wirst du geführt{genderSuffix}.",
    "interpretation.angels.template.message.var8":
      "Die himmlischen Sphären flüstern dir zu, {name}: deine {zodiacSign}-Essenz erwacht.",

    // Crystal Ball German
    "crystalBall.title": "Mystische Kristallkugel",
    "crystalBall.subtitle": "Stelle deine Frage und lass die Magie dich führen",
    "crystalBall.askPrompt": "Was ist deine Frage?",
    "crystalBall.questionPlaceholder": "Schreibe deine Frage hier...",
    "crystalBall.submitQuestion": "Die Kugel befragen",
    "crystalBall.thinking": "Die Kugel überlegt...",
    "crystalBall.guidance":
      "Höre auf deine Intuition, um diese Botschaft zu deuten",
    "crystalBall.askAnother": "Eine weitere Frage stellen",
    "crystalBall.newQuestion": "Eine weitere Frage stellen",
      "crystalBall.backHome": "🏠 Zurück zur Startseite",
    "crystalBall.closedQuestionHint": "Was möchtest du wissen? Frag die Kristallkugel… aber Vorsicht: Sie antwortet nur mit Ja oder Nein...",
    "crystalBall.example.good": "Z. B.: Werde ich dieses Jahr die Liebe finden?",
          
    // Deutsch
    "oracle.crystalBall.title": "Kristallkugel",
    "oracle.crystalBall.description":
      "Stelle deine Fragen an die mystische Kugel",

    // Antworten Crystal Ball German
    "crystalBall.answers.yes": "Ja",
    "crystalBall.answers.no": "Nein",
    "crystalBall.answers.maybe": "Vielleicht",
    "crystalBall.answers.veryLikely": "Sehr wahrscheinlich",
    "crystalBall.answers.unlikely": "Unwahrscheinlich",
    "crystalBall.answers.certain": "Es ist sicher",
    "crystalBall.answers.noChance": "Keine Chance",
    "crystalBall.answers.askLater": "Die Antwort wird zur rechten Zeit kommen",
    "crystalBall.answers.dontCount": "Verlass dich nicht darauf",
    "crystalBall.answers.yesDefinitely": "Ja, auf jeden Fall",
    "crystalBall.answers.signsYes": "Die Zeichen deuten auf Ja",
    "crystalBall.answers.signsNo": "Die Zeichen deuten auf Nein",
    "crystalBall.answers.unclear": "Es ist noch zu früh, um es zu sagen",
    "crystalBall.answers.trustIntuition": "Vertraue deiner Intuition",

    // Crystal Ball End Message German
    "interpretation.dailyComplete": "Deine tägliche Lesung ist abgeschlossen",
    "interpretation.timeUntilReset":
      "Nächste Lesung verfügbar in {hours}h{minutes}min",
    "interpretation.consultCrystalBall": "Die Kristallkugel befragen",
    "common.backHome": "Zurück zur Startseite",
    "crystalBall.disclaimer":
      "Die Antworten der Kristallkugel sind symbolisch und dienen der Unterhaltung. Höre immer auf dein Herz und deine Liebsten, wenn es um Entscheidungen in deinem wirklichen Leben geht.",

    // GRIMOIRE MYSTIQUE
    "grimoire.title": "Mystisches Grimoire",
    "grimoire.free.title": "Kostenlose Version: Die letzten 3 Ziehungen gespeichert",
    "grimoire.free.subtitle": "Werde Premium für unbegrenzte Historie!",
    "grimoire.premium.active": "Premium-Zugang aktiviert - Unbegrenzte Historie",
    "grimoire.empty.title": "Keine gespeicherte Ziehung",
    "grimoire.empty.subtitle": "Beginne deine erste Konsultation, um dein mystisches Grimoire zu füllen",
    "grimoire.cards.title": "Gezogene Karten:",
    "grimoire.interpretation.show": "Komplette Deutung anzeigen",
    "grimoire.interpretation.hide": "Komplette Deutung verbergen",
    "grimoire.notes.title": "Persönliche Notizen",
    "grimoire.notes.placeholder": "Füge deine Gedanken hinzu...",
    "grimoire.favorite.add": "Zu Favoriten hinzufügen",
    "grimoire.favorite.remove": "Aus Favoriten entfernen",
    "grimoire.oracle.daily": "Tagesziehung",
    "grimoire.oracle.tarot": "Tarot",
    "grimoire.oracle.angels": "Engelorakel",
    "grimoire.oracle.runes": "Wikinger-Runen",
    "grimoire.stats.total": "Gesamt",
      "grimoire.stats.thisMonth": "Diesen Monat",

      "grimoire.clearAll.button": "Alles löschen",
      "grimoire.clearAll.confirm.title": "Sind Sie sicher?",
      "grimoire.clearAll.confirm.message": "Diese Aktion ist unwiderruflich. Alle Ihre Lesungen werden dauerhaft gelöscht.",
      "grimoire.clearAll.confirm.button": "Ja, alles löschen",

    // MENU LÉGAL
    "legal.menu.title": "Rechtliches Menü",
    "legal.mentions": "Impressum",
    "legal.privacy": "Datenschutzrichtlinie",

    // PREMIUM-MODAL
    "premium.button.label": "Premium werden",
    "premium.title": "Werbung entfernen!",
    "premium.subtitle": "Mach deine Ziehungen ohne Werbung!",
    "premium.plan.1month": "1 Monat",
    "premium.plan.1month.subtitle": "Ohne Verpflichtung",
    "premium.plan.3months": "3 Monate",
    "premium.plan.3months.subtitle": "Bestes Angebot",
    "premium.plan.discount": "-25%",
    "premium.button.subscribe": "Jetzt abonnieren",
    "premium.button.select": "Angebot auswählen",
    "premium.button.processing": "Wird verarbeitet...",
    "premium.benefits.ads": "Keine Werbung",
    "premium.benefits.grimoire": "Unbegrenztes Mystisches Grimoire",
    "premium.benefits.notes": "Notizen und Favoriten",
    "premium.benefits.history": "Vollständige Historie deiner Ziehungen",
    "premium.confirm.1month": "Zahlung von 3,99 € für 1 Monat bestätigen?",
    "premium.confirm.3months": "Zahlung von 8,98 € für 3 Monate bestätigen?",
    "premium.success": "Abonnement erfolgreich aktiviert! Genieße dein werbefreies Erlebnis und das unbegrenzte Grimoire.",
    "premium.error.activation": "Fehler bei der Aktivierung des Abonnements",
    "premium.error.payment": "Fehler bei der Zahlung. Bitte versuche es erneut.",
    "premium.manage": "Mein Abonnement verwalten (kündigen, Rechnungen...)",
    "premium.expired": "Ihr Premium-Zugang ist abgelaufen",
    "premium.expiringSoon": "Ihr Premium-Zugang läuft bald ab",
    "premium.conditions.line1": "🔒 Sichere Zahlung über Stripe",
    "premium.conditions.line2": "✓ Einmalzahlung, KEINE automatische Verlängerung",
    "premium.conditions.line3": "Keine Rückerstattung nach Zahlung. Premium-Zugang gilt für die gewählte Dauer.",
    "premium.conditions.line4": "Sie werden 3 Tage vor Ablauf Ihres Zugangs benachrichtigt.",
    "premium.securePaymentBy": "Sichere Zahlung über",
    "premium.restoreSubscription": "Abonnement wiederherstellen",
    "premium.backToPurchases": "Zurück zu den Käufen",
    "premium.payment.googlePlay": "Google Play-Zahlung",
    "premium.payment.stripe": "Stripe-Webzahlung",
    "premium.restoreEmailLabel": "Deine E-Mail",
    "premium.restore": "Wiederherstellen",
    "premium.buy": "Kaufen",
    "premium.error.invalidEmail": "Die E-Mail-Adresse ist ungültig.",
    "premium.error.noActivePremium": "Kein aktives Abonnement gefunden",
      
    // PREMIUM RESTOR
    "premium.restore.title": "Mein Abonnement wiederherstellen",
    "premium.restore.subtitle": "Schon Premium? Stelle deinen Zugriff wieder her",
    "premium.restore.description": "Gib die E-Mail-Adresse ein, die du beim Kauf von Premium verwendet hast",
    "premium.restore.button": "Wiederherstellen",
    "premium.restore.verifying": "Überprüfung...",
    "premium.restore.success": "Premium erfolgreich wiederhergestellt!",
    "premium.restore.redirecting": "Weiterleitung...",
    "premium.restore.notFound": "Für diese E-Mail wurde kein Premium-Abonnement gefunden. Überprüfe die Adresse oder abonniere einen neuen Plan.",
    "premium.restore.error": "Beim Wiederherstellen ist ein Fehler aufgetreten. Bitte versuche es erneut.",
    "premium.restore.info": "Du musst dieselbe E-Mail verwenden wie beim Kauf von Premium über Stripe.",
    "premium.restore.help": "Brauchen Sie Hilfe?",
    "premium.restore.contact": "Kontaktiere uns",
    "premium.error.emailRequired": "E-Mail ist erforderlich.",
    "premium.error.emailInvalid": "E-Mail ist ungültig.",
    "premium.emailLabel": "Deine E-Mail",
    "premium.emailHelp": "Um Ihr Abonnement wiederherzustellen",
    "premium.poweredBy": 'Powered by',
    "premium.backToPurchase": "Zurück zu den Käufen",
    "premium.button.loading": "Wird geladen...",
    "premium.loading.offers": "Angebote werden geladen...",
    "premium.button.restoring": "Wird wiederhergestellt...",
    "premium.error.loadFailed": "Angebote konnten nicht geladen werden",
    "premium.error.purchaseFailed": "Fehler beim Kauf",
    "premium.error.unknown": "Unbekannter Fehler",

    // PAGE PAIEMENT SUCCESS CANCEL
    "payment.success.title": "Zahlung erfolgreich!",
    "payment.success.verified": "Ihr Premium-Konto wurde aktiviert",
    "payment.success.activating": "Aktivierung läuft...",
    "payment.success.benefits": "Genießen Sie alle Premium-Funktionen!",
    "payment.success.noAds": "Werbefrei",
    "payment.success.unlimitedGrimoire": "Unbegrenztes Grimoire",
    "payment.success.fullHistory": "Vollständiger Verlauf",
    "payment.success.redirecting": "Automatische Weiterleitung zu den Orakeln...",
    "payment.cancel.title": "Zahlung abgebrochen",
    "payment.cancel.message": "Sie haben die Zahlung abgebrochen",
    "payment.cancel.retry": "Sie können es jederzeit über das Premium-Menü erneut versuchen",
    "payment.cancel.redirecting": "Zurück zur Orakelauswahl...",

    // Mystery Dice Oracle
    "oracle.bonusRoll.title": "Bonus Wurf",
      "oracle.bonusRoll.description": "Entsperren Sie Ihre geheime numerologische Offenbarung",
      "oracle.bonusRoll.ready": "Bereit, Ihre Bonus-Nachricht zu entdecken?",
      "oracle.bonusRoll.rolling": "🎲 Die mystischen Würfel werden geworfen...",
      "oracle.bonusRoll.loadingAd": "📢 Entsperren Ihrer Offenbarung...",
      "oracle.bonusRoll.result": "Ergebnis",
      "oracle.bonusRoll.cosmicMessage": "Ihre Bonus-Nachricht",
      "oracle.bonusRoll.rollButton": "🎲 Würfle die Würfel",
      "oracle.bonusRoll.newRoll": "✨ Neuer Bonus Wurf",
      "oracle.bonusRoll.diceResult": "Würfel",
    "oracle.bonusRoll.startButton": "🎁 Bonuswurf freischalten",
    "oracle.bonusRoll.exclusiveBadge": 'EXKLUSIVER BONUS',
    "oracle.bonusRoll.adRequired": "Sie müssen die vollständige Werbung ansehen, um Zugriff auf den Bonus-Wurf zu erhalten.",
    "oracle.bonusRoll.badge": "EXKLUSIVER BONUS",
    "oracle.bonusRoll.pleaseWait": "Einen Moment bitte",
        
    "oracle.bonusRoll.2.title.1": "🌅 Neuer Anfang",
    "oracle.bonusRoll.2.message.1": "Die Sterne stehen für einen Neuanfang günstig. Das doppelte Glück begleitet dich heute!",
    "oracle.bonusRoll.2.title.2": "✨ Kosmische Wiedergeburt",
    "oracle.bonusRoll.2.message.2": "Ein neuer Zyklus beginnt in deinem Leben. Das Universum schenkt dir eine außergewöhnliche zweite Chance.",
    "oracle.bonusRoll.2.title.3": "🦋 Sanfte Transformation",
    "oracle.bonusRoll.2.message.3": "Die Dualität der 2 lädt dich zur Balance ein. Eine neue Seite öffnet sich vor dir – wende sie mit Vertrauen.",

    "oracle.bonusRoll.3.title.1": "🔮 Göttliche Intuition",
    "oracle.bonusRoll.3.message.1": "Dein sechster Sinn ist auf dem Höhepunkt. Folge deiner Intuition, sie wird dich nicht täuschen.",
    "oracle.bonusRoll.3.title.2": "👁️ Mystische Vision",
    "oracle.bonusRoll.3.message.2": "Die Schleier lüften sich für deine Wahrnehmung. Deine Hellseherei erreicht beispiellose Höhen.",
    "oracle.bonusRoll.3.title.3": "🌙 Innere Weisheit",
    "oracle.bonusRoll.3.message.3": "Das heilige Dreieck der 3 erleuchtet deinen Weg. Körper, Geist und Seele sind heute eins.",

    "oracle.bonusRoll.4.title.1": "🏛️ Stabile Grundlagen",
    "oracle.bonusRoll.4.message.1": "Stabilität und Vertrauen sind deine Verbündeten. Deine Basis ist stark – baue mit Sicherheit.",
    "oracle.bonusRoll.4.title.2": "⚓ Starke Verankerung",
    "oracle.bonusRoll.4.message.2": "Deine Stabilität ist deine Stärke. Baue jetzt etwas Dauerhaftes.",
    "oracle.bonusRoll.4.title.3": "🗿 Göttliche Struktur",
    "oracle.bonusRoll.4.message.3": "Die vier Elemente stützen dich. Dein Durchhaltevermögen ist eine echte Kraft.",

    "oracle.bonusRoll.5.title.1": "✨ Magische Chancen",
    "oracle.bonusRoll.5.message.1": "Veränderungen bringen unerwartete Überraschungen. Bleibe offen für neue Möglichkeiten.",
    "oracle.bonusRoll.5.title.2": "🌪️ Wind der Veränderung",
    "oracle.bonusRoll.5.message.2": "Eine Transformation steht bevor. Begrüße, was kommt, mit Vertrauen und Mut.",
    "oracle.bonusRoll.5.title.3": "🎭 Kreative Freiheit",
    "oracle.bonusRoll.5.message.3": "Die Zahl 5 bringt große Befreiung. Dein abenteuerlicher Geist kann sich endlich ausdrücken.",

    "oracle.bonusRoll.6.title.1": "⚖️ Perfekte Harmonie",
    "oracle.bonusRoll.6.message.1": "Gleichgewicht herrscht in deinem Leben. Genieße diese Zeit des Friedens und der Harmonie.",
    "oracle.bonusRoll.6.title.2": "🕊️ Absolute Gelassenheit",
    "oracle.bonusRoll.6.message.2": "Deine Seele badet in Ruhe. Genieße diesen Moment kosmischer Gnade.",
    "oracle.bonusRoll.6.title.3": "💝 Universelle Liebe",
    "oracle.bonusRoll.6.message.3": "Die Zahl der Liebe umhüllt dich. Beziehungen und Verbindungen blühen unter deinem wohlwollenden Blick.",

    "oracle.bonusRoll.7.title.1": "🍀 Mystisches Glück",
    "oracle.bonusRoll.7.message.1": "Die Glückszahl lächelt dir zu! Erwarten dich angenehme Überraschungen.",
    "oracle.bonusRoll.7.title.2": "🎰 Göttliches Vermögen",
    "oracle.bonusRoll.7.message.2": "Die Würfel des Schicksals fallen zu deinen Gunsten. Die Vorsehung segnet dich heute.",
    "oracle.bonusRoll.7.title.3": "🌠 Himmlische Magie",
    "oracle.bonusRoll.7.message.3": "Die 7 ist eine heilige Zahl. Das Universum arbeitet auf wunderbare Weise zu deinem Vorteil.",

    "oracle.bonusRoll.8.title.1": "💎 Kosmischer Überfluss",
    "oracle.bonusRoll.8.message.1": "Erfolg und Wohlstand umgeben dich. Das Universum belohnt deine Bemühungen.",
    "oracle.bonusRoll.8.title.2": "👑 Unendlicher Wohlstand",
    "oracle.bonusRoll.8.message.2": "Der Fluss des Überflusses strömt zu dir. Deine Arbeit trägt wunderschöne Früchte.",
    "oracle.bonusRoll.8.title.3": "💰 Manifestierter Reichtum",
    "oracle.bonusRoll.8.message.3": "Die 8 der Unendlichkeit verwirklicht deine Wünsche. Materieller und spiritueller Erfolg gehen Hand in Hand.",

    "oracle.bonusRoll.9.title.1": "🌱 Spirituelle Entwicklung",
    "oracle.bonusRoll.9.message.1": "Dein persönliches Wachstum erreicht neue Höhen. Gehe deinen Weg weiter.",
    "oracle.bonusRoll.9.title.2": "🦋 Heilige Metamorphose",
    "oracle.bonusRoll.9.message.2": "Du befindest dich in voller spiritueller Transformation. Deine Seele steigt ins Licht.",
    "oracle.bonusRoll.9.title.3": "🌌 Universelle Weisheit",
    "oracle.bonusRoll.9.message.3": "Die Zahl 9 markiert das Ende eines Zyklus. Du hast gelernt und bist gewachsen! Deine Entwicklung wird zum Vorbild für andere.",

    "oracle.bonusRoll.10.title.1": "🎯 Herausfordernde Aufgaben",
    "oracle.bonusRoll.10.message.1": "Neue Herausforderungen warten auf dich, doch du bist bereit, sie erfolgreich zu meistern.",
    "oracle.bonusRoll.10.title.2": "⚔️ Lehrreiche Prüfungen",
    "oracle.bonusRoll.10.message.2": "Hindernisse werden zu Sprungbrettern. Dein Durchhaltevermögen verwandelt alles in Sieg.",
    "oracle.bonusRoll.10.title.3": "🔟 Neuer Meisterzyklus",
    "oracle.bonusRoll.10.message.3": "Die Zahl 10 markiert das Ende eines Kapitels und den Beginn eines neuen. Du wirst stärker und weiser wiedergeboren.",

    "oracle.bonusRoll.11.title.1": "🔥 Sieg durch Ausdauer",
    "oracle.bonusRoll.11.message.1": "Dein Durchhaltevermögen trägt Früchte. Die Meisterzahl 11 führt dich zum Erfolg.",
    "oracle.bonusRoll.11.title.2": "⚡ Erleuchteter Meister",
    "oracle.bonusRoll.11.message.2": "Die heilige Zahl 11 zeigt dein grenzenloses Potenzial. Deine Präsenz leitet die Menschen um dich herum.",
    "oracle.bonusRoll.11.title.3": "✨ Spirituelles Erwachen",
    "oracle.bonusRoll.11.message.3": "Die Zahl 11 kündigt eine neue Gelegenheit an. Sei bereit, sie jetzt zu ergreifen.",

    "oracle.bonusRoll.12.title.1": "👑 Vollkommene Erfüllung",
    "oracle.bonusRoll.12.message.1": "Du hast ein Stadium der Vollkommenheit erreicht, in dem alles harmonisch erscheint und du dich erfüllt fühlst.",
    "oracle.bonusRoll.12.title.2": "🌟 Kosmische Perfektion",
    "oracle.bonusRoll.12.message.2": "Du hast einen wichtigen Zyklus abgeschlossen und näherst dich der Exzellenz. Alles scheint sich um deinen Erfolg zu ordnen.",
    "oracle.bonusRoll.12.title.3": "🏆 Absoluter Triumph",
    "oracle.bonusRoll.12.message.3": "Dein Weg erreicht mit der Zahl 12 einen entscheidenden Punkt. Alles fügt sich zusammen und du fühlst dich perfekt an deinem Platz.",

    "oracle.backToOracles": "Zurück zu den Orakeln",

    // Common
    "common.back": "Zurück",
    "common.home": "Startseite",
    "common.language": "Sprache",
  },

  it: {
    // Landing Page
    "landing.title": "CartoMystik",
    "landing.subtitle":
      "Scopri i misteri del tuo destino attraverso le carte, le stelle e la saggezza antica",
    "landing.enter": "ENTRARE",
    "landing.ads.support": "Gli annunci ci aiutano a mantenere l'app gratuita",

    // 🆕 Disclaimer - AGGIUNGI QUI
    "disclaimer.title": "Avviso Importante",
      "disclaimer.text": "CartoMystik è un'applicazione di intrattenimento e sviluppo personale. Consulta esperti qualificati per qualsiasi decisione importante.",
      "disclaimer.note": "Continuando, accetti di utilizzare questa app solo per scopi di intrattenimento.",
      "disclaimer.accept": "Ho capito",
      "disclaimer.legal": "Questa app è conforme al GDPR.",

    // No-repeat system
    "system.antirepeat.loading": "Le carte si stanno mescolando...",
    "system.antirepeat.active": "Sistema anti-ripetizione attivo",
    "system.cards.refreshed": "Nuove carte disponibili",

    // Name Page
    "name.title": "Nome",
    "name.subtitle":
      "Come vorresti essere chiamato? Inserisci il tuo nome o soprannome",
    "name.placeholder": "Inserisci il tuo nome",
    "name.next": "AVANTI",

    // Date Page
    "date.title": "Data di Nascita",
    "date.subtitle":
      "Rivela il tuo segno astrologico per una divinazione personalizzata",
    "date.day": "Giorno",
    "date.month": "Mese",
    "date.year": "Anno",
    "date.next": "AVANTI",
    "date.months.1": "Gennaio",
    "date.months.2": "Febbraio",
    "date.months.3": "Marzo",
    "date.months.4": "Aprile",
    "date.months.5": "Maggio",
    "date.months.6": "Giugno",
    "date.months.7": "Luglio",
    "date.months.8": "Agosto",
    "date.months.9": "Settembre",
    "date.months.10": "Ottobre",
    "date.months.11": "Novembre",
    "date.months.12": "Dicembre",

    // Gender Page
    "gender.title": "Genere",
    "gender.subtitle": "Inserisci il tuo genere per fornire contesto all'IA",
    "gender.male": "Maschile",
    "gender.female": "Femminile",
    "gender.other": "Altro",
    "gender.next": "INIZIARE",
    "gender.back": "INDIETRO",

    //Barre de navigation IT
    "menu.open": "Apri menu",
      "profile.open": "Apri profilo",
      "profile.birthdate": "Data di nascita",
      "profile.gender": "Genere",
      "profile.zodiac": "Segno zodiacale",
      "profile.edit": "Modifica il mio profilo",
      "profile.edit.title": "Modifica il mio profilo",
      "profile.edit.subtitle": "Aggiorna le tue informazioni personali",
      "profile.edit.error": "Per favore, compila tutti i campi",
      "grimoire.subtitle": "La tua cronologia delle letture",
      "premium.active": "Attivo",
      "locale": "it-IT",
      "common.cancel": "Annulla",
      "common.save": "Salva",
      "name.label": "Nome",
      
    // IT Notifiche  
    "notification.channel.name": "Estratto quotidiano",
    "notification.channel.description": "Notifiche per la tua lettura mistica quotidiana delle carte",
    "notification.variants.1.title": "✨ Le stelle ti chiamano",
    "notification.variants.1.body": "Scopri il tuo oroscopo e la tua lettura mistica del giorno!",
    "notification.variants.2.title": "🔮 Il tuo destino ti attende",
    "notification.variants.2.body": "Guarda la tua estrazione quotidiana e il tuo oroscopo personale",
    "notification.variants.3.title": "🌙 Il mistero si rivela",
    "notification.variants.3.body": "La tua estrazione di oggi e il tuo oroscopo sono pronti!",
    "notification.variants.4.title": "⭐ Un messaggio dalle stelle",
    "notification.variants.4.body": "Scopri cosa le carte e le stelle hanno in serbo per te oggi",
    "notification.variants.5.title": "✨ CartoMystik ti chiama",
    "notification.variants.5.body": "La tua guida quotidiana: lettura delle carte e oroscopo disponibili ora",
    "notification.modal.title": "Notifiche quotidiane",
    "notification.modal.description": "Ricevi ogni giorno alle 10 una notifica mistica per scoprire la tua estrazione personale e il tuo oroscopo",
    "notification.modal.benefit1": "Estrazione quotidiana delle carte",
    "notification.modal.benefit2": "Oroscopo personale in base al tuo segno zodiacale",
    "notification.modal.benefit3": "Non perdere mai la tua guida spirituale quotidiana",
    "notification.modal.accept": "Attiva notifiche",
    "notification.modal.decline": "No, grazie",
    "notification.modal.note": "Puoi modificare questa impostazione più tardi nelle opzioni",

    // Oracle Selection
    "oracle.welcome": "Benvenuto {name}!",
    "oracle.subtitle": "Scopri i segreti del tuo destino",
    "oracle.daily.title": "Carta del Giorno",
    "oracle.daily.description": "Una carta per guidarti e ispirarti oggi",
    "oracle.horoscope.title": "Oroscopo",
    "oracle.horoscope.description":
      "Scopri cosa ti riservano le stelle oggi secondo il tuo segno",
    "oracle.tarot.title": "Tarocchi",
    "oracle.tarot.description":
      "I 22 Arcani Maggiori rivelano i misteri del tuo destino",
    "oracle.angels.title": "Oracolo degli Angeli",
    "oracle.angels.description":
      "Connettiti con le tue guide angeliche per ricevere i loro messaggi d'amore",
    "oracle.runes.title": "Rune Nordiche",
    "oracle.runes.description":
      "L'antica saggezza dei Vichinghi rivela il tuo cammino di guerra e vittoria",
    "oracle.back": "INDIETRO",
    "oracle.home": "Home",

    // Card Game
    "cardgame.back": "Indietro",
    "cardgame.daily.instruction":
      "Scegli 1 carta per il tuo consiglio del giorno",
    "cardgame.reading.instruction":
      "Scegli 3 carte per illuminare il tuo destino",
    "cardgame.selected": "Carte selezionate: {current}/{max}",
    "cardgame.reveal": "RIVELA LE CARTE",
    "cardgame.page": "Pagina {current} di {total}",
    "cardgame.previous": "Precedente",
    "cardgame.next": "Successivo",
    "cardgame.daily.choose": "Scegli la carta che ti chiama",

    // CardGame - Modal de révélation
    "cardgame.cardRevealed": "Carta rivelata",
    "cardgame.continue": "Continua",
    "cardgame.seeInterpretation": "Vedi l'interpretazione",

    // Revelation - Loading
    "revelation.loading.title": "Interpretazione in corso...",
    "revelation.loading.daily": "Gli astri rivelano il tuo oracolo del giorno, {name}",
    "revelation.loading.reading": "Le carte rivelano i loro segreti mistici, {name}",
    "revelation.loading.mysticMessage": "Le stelle si stanno allineando per te...",

    // Revelation Page
    "revelation.positions.daily": "Consiglio del Giorno",
    "revelation.positions.past": "Carta 1",
    "revelation.positions.present": "Carta 2",
    "revelation.positions.future": "Carta 3",
    "revelation.summary.title": "Ciò che rivelano le tue carte",
    "revelation.newConsultation": "Nuova consultazione",
    "revelation.title.daily": "Il Tuo Consiglio del Giorno",
    "revelation.title.reading": "La Tua Lettura - {oracle}",
    "revelation.instruction.daily":
      "Clicca sulla tua carta per rivelare il messaggio del giorno",
    "revelation.instruction.reading":
      "Clicca su ogni carta per rivelare il tuo destino",
    "revelation.flipCard.reveal": "Tocca per rivelare",
    "revelation.summary.seeMore": "Vedi di più ↓",
    "revelation.summary.seeLess": "Vedi di meno ↑",
    "revelation.revealButton": "Rivelazione",
    "revelation.backToSelection": "Torna alla selezione",
    "interpretation.advice.title": "Il tuo consiglio personale",
    "revelation.subtitle.revealed": "Contempla le tue carte rivelate",
    
    // Interpretation Templates
    "interpretation.gender.femme": "Mia cara",
    "interpretation.gender.homme": "Mio caro",
    "interpretation.gender.autre": "Cara anima",
    "interpretation.daily.greeting":
      "Ciao {name}! Ecco il tuo consiglio per questa bella giornata.",
    "interpretation.daily.zodiac": "Come {zodiacSign}, ",
    "interpretation.daily.cardMessage":
      'la carta "{cardName}" ha un\'energia speciale per te oggi.',
    "interpretation.daily.wisdom":
      "Come {zodiacSign}, hai la saggezza necessaria per usare bene questo consiglio. Fidati del tuo istinto e lascia che questa energia positiva guidi le tue azioni di oggi.",
    "interpretation.daily.closing":
      "Buona giornata {genderText} {name}, e che le stelle illuminino il tuo cammino!",
    "interpretation.tarot.greeting":
      "Ciao {name}! Allora, la tua lettura di Tarot mi dice cose interessanti.",
    "interpretation.tarot.past":
      "{cardName} nel tuo passato mostra che hai vissuto momenti che ti hanno davvero fatto crescere. Non è sempre stato facile, ma ti ha reso più forte.",
    "interpretation.tarot.present":
      "In questo momento, {cardName} influenza la tua vita in modo positivo. Sei in un periodo in cui le cose si muovono, ed è un buon segno per il futuro.",
    "interpretation.tarot.future":
      "Per il tuo futuro, {cardName} annuncia cose belle! Puoi aspettarti cambiamenti felici che ti porteranno soddisfazione.",
    "interpretation.tarot.advice":
      "Il mio consiglio: {name}, con il tuo carattere da {zodiacSign}, fidati del tuo istinto. Hai tutto quello che serve per riuscire!",
    "interpretation.angels.greeting":
      "Ciao {name}! I tuoi angeli custodi hanno rivelazioni luminose da condividere con te.",
    "interpretation.angels.past":
      "Durante il tuo cammino passato, {cardName} ha seminato semi divini: {cardMeaning}. Queste benedizioni hanno nutrito la tua anima e ti hanno preparato{genderSuffix} a ricevere l'amore incondizionato che ora ti circonda.",
    "interpretation.angels.present":
      "In questo momento preciso, {cardName} illumina il tuo presente: {cardMeaning}. Questa luce celeste guida ognuno dei tuoi passi e trasforma le tue sfide in opportunità di crescita spirituale.",
    "interpretation.angels.future":
      "Verso il tuo futuro radioso, {cardName} spiega le sue ali protettrici: {cardMeaning}. Le porte del paradiso si aprono davanti a te, rivelando un sentiero lastricato di miracoli e sincronie.",
    "interpretation.angels.message":
      "Trasmissione angelica: {genderText} {name}, la tua essenza da {zodiacSign} vibra in armonia con queste frequenze divine. Lascia che il tuo cuore si apra a questi messaggi di amore puro e rimani ricettiv{genderSuffix} ai segni che le tue guide ti inviano!",
    "interpretation.runes.greeting":
      "Salve {name}! Le antiche rune nordiche rivelano i segreti del tuo destino di guerrier{genderSuffix}.",
    "interpretation.runes.past":
      "La tua runa del passato, {cardName}, rivela: {cardMeaning}. Queste forze primordiali hanno scolpito il tuo carattere attraverso fuoco e ghiaccio, preparandoti alle sfide di oggi con saggezza ancestrale.",
    "interpretation.runes.present":
      "In questo momento, {cardName} guida i tuoi passi: {cardMeaning}. Questa energia runica illumina il tuo sentiero attuale, connettendoti alle forze mistiche che governano la tua vita quotidiana.",
    "interpretation.runes.future":
      "Verso il futuro, {cardName} annuncia: {cardMeaning}. Questa profezia runica traccia il percorso dei tuoi futuri successi, dove brillerai vittrios{genderSuffix} sotto l'egida degli dei nordici.",
    "interpretation.runes.advice":
      "Ricorda, {genderText} {name}: come {zodiacSign}, porti l'eredità vichinga nel tuo sangue. Le rune hanno parlato - segui la loro guida con coraggio e determinazione{genderSuffix}!",
    "interpretation.fallback.zodiac": "persona intuitiva",
    "interpretation.fallback.angels": "essere luminoso",
    "interpretation.fallback.runes": "combattente",
    "interpretation.title.daily": "Interpretazione per {name}",
    "interpretation.title.reading": "Lettura delle carte per {name}",
    "interpretation.subtitle": "Ecco la tua rivelazione personalizzata",
    "interpretation.backToCards": "Torna alle carte",
    "interpretation.newConsultation": "Nuova consultazione",

    // ========== VARIAZIONI PER IL TIRAGGIO DEL GIORNO ==========

    // Variazioni per "la carta ha un'energia speciale"
    "interpretation.daily.cardMessage.var1":
      'La carta "{cardName}" ha un’energia speciale per te oggi.',
    "interpretation.daily.cardMessage.var2":
      'La carta "{cardName}" ti porta una vibrazione unica oggi.',
    "interpretation.daily.cardMessage.var3":
      'La carta "{cardName}" risuona particolarmente con la tua energia del giorno.',
    "interpretation.daily.cardMessage.var4":
      'La carta "{cardName}" porta un messaggio importante per te oggi.',
    "interpretation.daily.cardMessage.var5":
      'La carta "{cardName}" vibra in armonia con la tua giornata.',
    "interpretation.daily.cardMessage.var6":
      'La carta "{cardName}" illumina il tuo cammino con una forza speciale oggi.',
    "interpretation.daily.cardMessage.var7":
      'La carta "{cardName}" ti invita ad ascoltare la tua intuizione oggi.',
    "interpretation.daily.cardMessage.var8":
      'La carta "{cardName}" trasmette un’energia potente che ti guida.',
    "interpretation.daily.cardMessage.var9":
      'La carta "{cardName}" ti offre una vibrazione eccezionale da sentire oggi.',
    "interpretation.daily.cardMessage.var10":
      'La carta "{cardName}" ti accompagna con un’energia luminosa per tutta la giornata.',

    //Variazioni per "Wisdom"
    "interpretation.daily.wisdom.var1":
      "Come {zodiacSign}, hai la saggezza necessaria per usare bene questo consiglio. Fidati del tuo istinto e lascia che questa energia positiva guidi le tue azioni oggi.",
    "interpretation.daily.wisdom.var2":
      "Il tuo segno zodiacale ti dona una bella intuizione. Fidati e lasciati guidare dall’energia positiva che ti circonda.",
    "interpretation.daily.wisdom.var3":
      "Gli astri ti accompagnano oggi. Lascia che questa bella energia ti aiuti ad andare avanti serenamente.",
    "interpretation.daily.wisdom.var4":
      "Come {zodiacSign}, possiedi le chiavi per interpretare questo messaggio celeste. Usale bene durante la giornata.",
    "interpretation.daily.wisdom.var5":
      "Il tuo carattere da {zodiacSign} risuona perfettamente con questo consiglio. Lascia che questa armonia cosmica illumini il tuo cammino oggi.",
    "interpretation.daily.wisdom.var6":
      "Il cielo parla attraverso il tuo segno zodiacale. Sii attento ai segni e avanza con fiducia.",
    "interpretation.daily.wisdom.var7":
      "Come {zodiacSign}, sei allineato{genderSuffix} con un’energia sottile oggi. Seguila, ti porterà dove devi essere.",
    "interpretation.daily.wisdom.var8":
      "Il tuo segno {zodiacSign} ti guida con saggezza. Lascia il cuore aperto e la mente chiara per mostrarti la strada.",
    "interpretation.daily.wisdom.var9":
      "Porti dentro di te una luce unica. Che questo messaggio ti aiuti a farla brillare pienamente e con orgoglio.",
    "interpretation.daily.wisdom.var10":
      "La tua energia da {zodiacSign} è in risonanza con le vibrazioni del giorno. Accogli questo consiglio come una guida gentile e ispiratrice.",

    // Variazioni per "Buona giornata"
    "interpretation.daily.closing.var1":
      "Buona giornata {genderText} {name}, e che le stelle illuminino il tuo cammino!",
    "interpretation.daily.closing.var2":
      "Bella giornata a te {name}, che questa guida ti accompagni!",
    "interpretation.daily.closing.var3":
      "Goditi la giornata {name}, le energie sono con te!",
    "interpretation.daily.closing.var4":
      "Passa una meravigliosa giornata {genderText} {name}!",
    "interpretation.daily.closing.var5":
      "Che questa giornata ti sia dolce {name}, l’universo veglia su di te!",
    "interpretation.daily.closing.var6":
      "Che tu abbia una giornata luminosa, {genderText} {name}, piena di meravigliose sorprese!",
    "interpretation.daily.closing.var7":
      "Buona giornata, {name}, che l’energia positiva ti accompagni in ogni momento!",
    "interpretation.daily.closing.var8":
      "Che questo giorno ti porti gioia e serenità, {genderText} {name}!",
    "interpretation.daily.closing.var9":
      "Sorridi alla vita oggi, {name}, e ti sorriderà indietro!",
    "interpretation.daily.closing.var10":
      "Passa una giornata ispiratrice, {genderText} {name}, sotto la protezione delle stelle!",

    // Horoscope daily sections
    "horoscope.greeting": `Ciao {name}! Ecco il tuo oroscopo giornaliero come {zodiacSign} {zodiacSymbol}`,
    "horoscope.predictions.title": "Previsioni del giorno:",
    "horoscope.mood.today": "Il tuo umore oggi: {mood}",
    "horoscope.mood.energy":
      "Questa energia ti accompagnerà per tutta la giornata. Approfittane per fare le cose che ti fanno stare bene!",
    "horoscope.assets.title": "I tuoi punti di forza del giorno:",
    "horoscope.assets.luckyNumber": "• Numero fortunato: {luckyNumber}",
    "horoscope.assets.luckyColor": "• Colore fortunato: {luckyColor}",
    "horoscope.compatibility":
      "Compatibilità: Ti troverai particolarmente bene con i segni {compatibility} oggi. È il momento ideale per rafforzare le tue relazioni!",
    "horoscope.message": `{genderText} {name}, come {zodiacSign}, hai questa bella energia che attira le cose positive. Abbi fiducia negli astri e nella tua intuizione oggi!`,
      "horoscope.mood.title": "Umore del giorno",
      "horoscope.compatibility.title": "Compatibilità",
      "horoscope.advice.title": "Il tuo consiglio personale",

    // Zodiac signs names
    "zodiac.signs.aries": "Ariete",
    "zodiac.signs.taurus": "Toro",
    "zodiac.signs.gemini": "Gemelli",
    "zodiac.signs.cancer": "Cancro",
    "zodiac.signs.leo": "Leone",
    "zodiac.signs.virgo": "Vergine",
    "zodiac.signs.libra": "Bilancia",
    "zodiac.signs.scorpio": "Scorpione",
    "zodiac.signs.sagittarius": "Sagittario",
    "zodiac.signs.capricorn": "Capricorno",
    "zodiac.signs.aquarius": "Acquario",
    "zodiac.signs.pisces": "Pesci",

    // Zodiac Signs
    "zodiac.aries": "Ariete",
    "zodiac.taurus": "Toro",
    "zodiac.gemini": "Gemelli",
    "zodiac.cancer": "Cancro",
    "zodiac.leo": "Leone",
    "zodiac.virgo": "Vergine",
    "zodiac.libra": "Bilancia",
    "zodiac.scorpio": "Scorpione",
    "zodiac.sagittarius": "Sagittario",
    "zodiac.capricorn": "Capricorno",
    "zodiac.aquarius": "Acquario",
    "zodiac.pisces": "Pesci",

    // Horoscope
    "horoscope.title": "Oroscopo del Giorno",
    "horoscope.predictions": "Le Tue Previsioni Astrali",
    "horoscope.retry": "Riprova",
    "horoscope.home": "Home",
    "horoscope.newConsultation": "Nuova consultazione",
    "horoscope.error":
      "Spiacente, impossibile recuperare il tuo oroscopo del giorno.",
    "horoscope.loading": "Le stelle rivelano le tue previsioni...",
    "horoscope.noSign":
      "Spiacente, abbiamo bisogno del tuo segno astrologico per mostrare il tuo oroscopo.",

    // Common
    "common.back": "Indietro",
    "common.home": "Casa",
    "common.language": "Lingua",

    // Card Names and Meanings - Runes
    "cards.runes.Fehu.name": "Fehu",
    "cards.runes.Fehu.meaning":
      "Ricchezza, prosperità, nuovo inizio finanziario",
    "cards.runes.Uruz.name": "Uruz",
    "cards.runes.Uruz.meaning": "Forza bruta, salute, trasformazione",
    "cards.runes.Thurisaz.name": "Thurisaz",
    "cards.runes.Thurisaz.meaning": "Difesa, protezione, forza distruttiva",
    "cards.runes.Ansuz.name": "Ansuz",
    "cards.runes.Ansuz.meaning": "Comunicazione divina, ispirazione, saggezza",
    "cards.runes.Raidho.name": "Raidho",
    "cards.runes.Raidho.meaning": "Viaggio, movimento, progressione",
    "cards.runes.Kenaz.name": "Kenaz",
    "cards.runes.Kenaz.meaning": "Conoscenza, creatività, illuminazione",
    "cards.runes.Gebo.name": "Gebo",
    "cards.runes.Gebo.meaning": "Dono, scambio, partenariato",
    "cards.runes.Wunjo.name": "Wunjo",
    "cards.runes.Wunjo.meaning": "Gioia, felicità, armonia",
    "cards.runes.Hagalaz.name": "Hagalaz",
    "cards.runes.Hagalaz.meaning":
      "Interruzione, cambiamento forzato, purificazione",
    "cards.runes.Nauthiz.name": "Nauthiz",
    "cards.runes.Nauthiz.meaning": "Necessità, costrizione, lezione karmica",
    "cards.runes.Isa.name": "Isa",
    "cards.runes.Isa.meaning": "Ghiaccio, stagnazione, pazienza",
    "cards.runes.Jera.name": "Jera",
    "cards.runes.Jera.meaning": "Raccolto, cicli, ricompensa",
    "cards.runes.Eihwaz.name": "Eihwaz",
    "cards.runes.Eihwaz.meaning":
      "Resistenza, protezione, connessione spirituale",
    "cards.runes.Perthro.name": "Perthro",
    "cards.runes.Perthro.meaning": "Mistero, destino, forze nascoste",
    "cards.runes.Algiz.name": "Algiz",
    "cards.runes.Algiz.meaning": "Protezione divina, connessione con le guide",
    "cards.runes.Sowilo.name": "Sowilo",
    "cards.runes.Sowilo.meaning": "Successo, vittoria, energia solare",
    "cards.runes.Tiwaz.name": "Tiwaz",
    "cards.runes.Tiwaz.meaning": "Vittoria, giustizia, sacrificio onorevole",
    "cards.runes.Berkano.name": "Berkano",
    "cards.runes.Berkano.meaning": "Crescita, fertilità, nuovo ciclo",
    "cards.runes.Ehwaz.name": "Ehwaz",
    "cards.runes.Ehwaz.meaning": "Movimento, progresso, partenariato",
    "cards.runes.Mannaz.name": "Mannaz",
    "cards.runes.Mannaz.meaning": "Umanità, sé, intelligenza",
    "cards.runes.Laguz.name": "Laguz",
    "cards.runes.Laguz.meaning": "Acqua, intuizione, emozioni",
    "cards.runes.Ingwaz.name": "Ingwaz",
    "cards.runes.Ingwaz.meaning": "Fertilità maschile, energia creativa",
    "cards.runes.Dagaz.name": "Dagaz",
    "cards.runes.Dagaz.meaning": "Risveglio, trasformazione, nuovo giorno",
    "cards.runes.Othala.name": "Othala",
    "cards.runes.Othala.meaning": "Eredità, proprietà, tradizione familiare",

    // Card Names and Meanings - Daily
    "cards.daily.NouveauDepart.name": "Nuovo Inizio",
    "cards.daily.NouveauDepart.meaning":
      "Oggi segna la fine di un ciclo importante e l’apertura di una pagina completamente nuova nella tua vita. È un momento privilegiato per osare superare le barriere che ti trattenevano finora, sia nel campo personale, professionale o sentimentale. L’universo ti invia un messaggio di incoraggiamento: avanza senza paura, fidati della tua intuizione e sii ricettivo alle opportunità che si presentano. Ogni piccolo passo che compi oggi, anche se sembra modesto, costruisce le fondamenta per un futuro più ricco, sereno e profondamente appagante. Questa rinascita ti invita a lasciare il passato, a rinnovarti e ad abbracciare pienamente i cambiamenti che ti condurranno al tuo benessere.",
    "cards.daily.Patience.name": "Pazienza",
    "cards.daily.Patience.meaning":
      "Questo tiro ricorda che alcune cose impiegano tempo per manifestarsi. Non scoraggiarti se i risultati tardano ad arrivare: la pazienza è il tuo più grande alleato oggi. Prenditi il tempo per osservare, respirare profondamente e accettare il ritmo naturale degli eventi. La tranquillità interiore che coltiverai ti permetterà di restare sereno di fronte alle sfide e sarà la chiave per attrarre successo e opportunità al momento giusto. Ricorda che tutto arriva al momento giusto, e che la perseveranza paga sempre.",
    "cards.daily.Creativite.name": "Creatività",
    "cards.daily.Creativite.meaning":
      "La tua mente è particolarmente fertile oggi. Lascia che le tue idee sgorghino liberamente, anche le più inaspettate, perché potrebbero trasformarsi in soluzioni brillanti o progetti promettenti. La creatività non è solo artistica: illumina anche le tue scelte, relazioni e sfide. Ascolta le tue ispirazioni profonde e osa concretizzarle con fiducia. Liberando questa energia creativa, apri la porta a opportunità inedite che nutriranno il tuo sviluppo personale e professionale. Non esitare a sperimentare e a seguire la tua intuizione: la tua originalità è oggi la tua forza più grande.",
    "cards.daily.Amour.name": "Amore",
    "cards.daily.Amour.meaning":
      "L’energia di oggi è rivolta al cuore. Esprimi la tua tenerezza e gratitudine verso i tuoi cari, perché un semplice gesto può avere un grande impatto. Se sei in coppia, rafforza i tuoi legami con attenzioni sincere e autentiche che nutrono la relazione. Se sei single, apriti alla possibilità di nuovi incontri: l’amore potrebbe manifestarsi dove meno te lo aspetti. Ascolta le tue emozioni e lascia che il tuo cuore guidi le tue azioni. Questa giornata favorisce scambi affettuosi e momenti di complicità, essenziali per il tuo equilibrio emotivo.",
    "cards.daily.Courage.name": "Coraggio",
    "cards.daily.Courage.meaning":
      "Oggi potrebbero presentarsi delle sfide, ma possiedi la forza e la resilienza per superarle. Il coraggio non significa assenza di paura, ma la capacità di agire nonostante essa. Affrontando i tuoi ostacoli con determinazione, guadagnerai fiducia e maturità. Ogni passo coraggioso che farai rafforzerà il tuo cammino e affermerà il tuo valore, portando a una crescita personale profonda.",
    "cards.daily.Intuition.name": "Intuizione",
    "cards.daily.Intuition.meaning":
      "La tua voce interiore è particolarmente forte oggi. Fai fiducia ai tuoi presentimenti, anche se non puoi sempre spiegarli razionalmente. Ti guideranno verso scelte maggiormente allineate con i tuoi bisogni veri e il percorso che stai seguendo. Prenditi un momento di silenzio per ascoltare le tue sensazioni, perché la tua intuizione custodisce le risposte alle domande che ti poni in questo momento e ti sosterrà nelle decisioni importanti.",
    "cards.daily.Gratitude.name": "Gratitudine",
    "cards.daily.Gratitude.meaning":
      "Prenditi un momento per apprezzare profondamente ciò che hai già. Riconoscere le tue benedizioni, anche le più piccole, attrae ulteriore positività nella tua vita e apre la porta a nuove opportunità. Coltivare la gratitudine oggi ti aiuterà a nutrire la pace interiore e a rafforzare i legami con gli altri.",
    "cards.daily.Communication.name": "Comunicazione",
    "cards.daily.Communication.meaning":
      "Esprimiti con chiarezza e benevolenza oggi. Le tue parole hanno il potere di placare tensioni, ispirare chi ti circonda e rafforzare legami importanti nella tua vita. Una comunicazione sincera e rispettosa apre la strada a una migliore comprensione reciproca e scambi profondamente arricchenti.",
    "cards.daily.Equilibre.name": "Equilibrio",
    "cards.daily.Equilibre.meaning":
      "Oggi cerca equilibrio tra ciò che offri agli altri e ciò di cui hai bisogno per te stesso. È importante non dimenticarti in nome delle responsabilità. Prendersi cura di sé significa anche custodire la tua energia e il tuo benessere interiore. Coltivando questa armonia, avanzerai più allineato e sereno nel tuo cammino.",
    "cards.daily.Confiance.name": "Fiducia",
    "cards.daily.Confiance.meaning":
      "Oggi, credi pienamente nelle tue capacità e avanza con un’energia sicura. La fiducia in te stessə è una forza interiore preziosa che ti rende più forte, più chiaro nelle scelte e più allineato con la tua verità. Anche se il dubbio si presenta, ricorda che ogni passo fatto con fede ti avvicina ai tuoi veri successi.",
    "cards.daily.Lacher-prise.name": "Lasciare Andare",
    "cards.daily.Lacher-prise.meaning":
      "Oggi, liberati dei pesi del passato e delle preoccupazioni che non ti appartengono più. Ciò che non puoi controllare non merita di prosciugare la tua energia. Accettando di lasciar andare, apri la strada a una maggiore pace interiore e chiarezza. Ti sentirai più leggerə, più centrato e prontə ad accogliere ciò che arriva con fiducia.",
    "cards.daily.Joie.name": "Gioia",
    "cards.daily.Joie.meaning":
      "Oggi, apri il cuore alla gioia semplice dei piccoli momenti: un sorriso, un gesto sincero, un pensiero luminoso. Anche in mezzo agli impegni, questa energia positiva può trasformare il tuo stato d’animo. Coltivando la gioia, diventi più radioso, più presente e attiri naturalmente esperienze che nutrono il tuo benessere.",
    "cards.daily.Sagesse.name": "Saggezza",
    "cards.daily.Sagesse.meaning":
      "Oggi, rallenta e concediti un momento di riflessione prima di agire. La tua saggezza interiore è un’alleata preziosa: ti guida, ti protegge e illumina le tue scelte. Connettendoti a questa voce calma e lucida, diventerai più radicato, più chiaro nelle decisioni e capace di vedere oltre le apparenze.",
    "cards.daily.Transformation.name": "Trasformazione",
    "cards.daily.Transformation.meaning":
      "Oggi, accogli i cambiamenti che si presentano, anche se all’inizio possono sembrare destabilizzanti. Queste trasformazioni non arrivano per caso: ti spingono a crescere, evolvere e avvicinarti alla migliore versione di te stessə. Abbracciando questo movimento, diventerai più allineato, più fiducioso e prontə a compiere un nuovo passo.",
    "cards.daily.Abondance.name": "Abbondanza",
    "cards.daily.Abondance.meaning":
      "Ricorda che possiedi già tutte le risorse necessarie per avere successo. L’abbondanza si manifesta davvero quando credi pienamente nel tuo potenziale e ti apri alle opportunità che la vita ti offre. Abbi fiducia nelle tue capacità, perché dentro di te c’è la forza per attrarre tutto ciò di cui hai bisogno per prosperare oggi e domani.",
    "cards.daily.Paix.name": "Pace",
    "cards.daily.Paix.meaning":
      "Coltiva la pace interiore liberandoti dalle tensioni e dai conflitti che ti circondano. La serenità che troverai ti porterà chiarezza mentale e armonia, essenziali per proseguire con calma oggi.",
    "cards.daily.Force.name": "Forza",
    "cards.daily.Force.meaning":
      "Attingi alla tua forza interiore: è molto più grande di quanto immagini. Ti sostiene nelle sfide, ti dona coraggio e resilienza, e ti aiuta ad avanzare con fiducia, nonostante gli ostacoli.",
    "cards.daily.Pardon.name": "Perdono",
    "cards.daily.Pardon.meaning":
      "Offri il perdono, a te stessə e agli altri. Questo gesto potente libera il tuo cuore dai pesi del passato e apre la strada a una vera guarigione interiore, permettendoti di andare avanti più leggerə e in pace.",
    "cards.daily.Espoir.name": "Speranza",
    "cards.daily.Espoir.meaning":
      "Mantieni la speranza, anche nei momenti difficili. La luce torna sempre, proprio come il sole dopo la notte più buia. Questo messaggio ti invita a coltivare la pazienza e la fiducia in un futuro migliore, perché ogni prova prepara un rinnovamento promettente che fiorirà al momento giusto.",
    "cards.daily.Compassion.name": "Compassione",
    "cards.daily.Compassion.meaning":
      "Abbi compassione per te stessə e per gli altri. La gentilezza addolcisce i cuori e rafforza i legami. Coltivando questa dolcezza, crei uno spazio di guarigione e comprensione, essenziale tanto per te quanto per chi ti circonda. Questo messaggio ti invita ad aprire pienamente il cuore oggi, ad ascoltare senza giudicare e a offrire il tuo sostegno con empatia. Agendo così, contribuisci a un clima armonioso e fai crescere la tua pace interiore.",
    "cards.daily.Inspiration.name": "Ispirazione",
    "cards.daily.Inspiration.meaning":
      "Apri bene gli occhi e la mente a tutto ciò che ti circonda. L’ispirazione si nasconde nei dettagli del quotidiano, pronta a nutrire la tua creatività e ad accendere nuove idee. Questo messaggio ti incoraggia a rimanere curiosə e ricettivə, ad accogliere i segni e le scintille che possono illuminare il tuo cammino. Prenditi il tempo per ascoltare questi impulsi: ti guideranno verso soluzioni innovative e momenti di gioia rinnovata.",
    "cards.daily.Determination.name": "Determinazione",
    "cards.daily.Determination.meaning":
      "La tua perseveranza e la tua volontà sono i tuoi migliori alleati oggi. Anche se incontrerai ostacoli, continua ad avanzare con fiducia e determinazione. La tua tenacia ti permetterà di superare le difficoltà e ti aprirà la strada verso un successo duraturo. Questo messaggio ti invita a non arrenderti: ogni sforzo conta e ti avvicina ai tuoi obiettivi più cari.",
    "cards.daily.Aventure.name": "Avventura",
    "cards.daily.Aventure.meaning":
      "Esci dalla tua routine e osa vivere nuove esperienze oggi. Che siano grandi o piccole, queste avventure nutriranno il tuo spirito e scalderanno il tuo cuore. Concediti del tempo per esplorare, meravigliarti e lasciarti sorprendere. Questo messaggio ti invita ad ampliare i tuoi orizzonti e ad accogliere il cambiamento con entusiasmo.",
    "cards.daily.Reconciliation.name": "Riconciliazione",
    "cards.daily.Reconciliation.meaning":
      "È tempo di guarire le tue ferite interiori e fare pace con il passato. La riconciliazione ti porta libertà e leggerezza, permettendoti di avanzare con maggiore serenità. Accogli questo processo con gentilezza e lasciati trasformare da questa guarigione profonda.",
    "cards.daily.Innovation.name": "Innovazione",
    "cards.daily.Innovation.meaning":
      "Oggi, lascia fluire le tue idee originali. La tua capacità di pensare in modo diverso è una vera ricchezza che può trasformare i tuoi progetti e ispirare chi ti sta attorno. Non esitare a uscire dai sentieri battuti ed esprimere la tua creatività unica per aprire nuove strade.",
    "cards.daily.Connexion.name": "Connessione",
    "cards.daily.Connexion.meaning":
      "Rafforza i tuoi legami con gli altri, ma anche con te stessə. Le connessioni autentiche nutrono l’anima, portano sostegno e conforto, e ti ricordano che non sei mai solə. Prenditi il tempo per ascoltare e condividere con sincerità: questo ti porterà equilibrio e realizzazione.",
    "cards.daily.Prosperite.name": "Prosperità",
    "cards.daily.Prosperite.meaning":
      "La prosperità arriva nella tua vita in molte forme: materiali, emotive o spirituali. Accogli questa abbondanza con gratitudine e fiducia. Sii apertə a ricevere e condividere ciò che la vita ti offre oggi, per rafforzare la tua ricchezza interiore ed esteriore.",
    "cards.daily.Authenticite.name": "Autenticità",
    "cards.daily.Authenticite.meaning":
      "Rimani fedelə ai tuoi valori e alla tua vera essenza. La tua autenticità attira le persone giuste e ti guida verso scelte in armonia con il tuo cuore. Non aver paura di mostrare chi sei davvero: è nella sincerità che troverai forza e pace interiore.",
    "cards.daily.Revelation.name": "Rivelazione",
    "cards.daily.Revelation.meaning":
      "Una verità nascosta o una presa di coscienza importante sta per emergere. Rimani attentə e mantieni la mente aperta per accogliere questa rivelazione. Sii prontə a ricevere questa nuova luce: potrà trasformare la tua visione e aiutarti ad avanzare con maggiore chiarezza.",
    "cards.daily.Protection.name": "Protezione",
    "cards.daily.Protection.meaning":
      "Sei circondatə da benevolenza e da forze protettrici che vegliano su di te. Fidati di questa protezione: ti accompagna nelle scelte e nei passi che compi. Non c’è nulla da temere oggi: lascia che questa energia rassicurante ti calmi e ti guidi.",
    "cards.daily.Renaissance.name": "Rinascita",
    "cards.daily.Renaissance.meaning":
      "Un nuovo ciclo si apre davanti a te, invitandoti a lasciar andare tutto ciò che appartiene al passato. Accogli questa rinascita come un’opportunità preziosa per reinventarti, crescere e rinnovarti. Osa voltare pagina per abbracciare pienamente questo nuovo inizio.",
    "cards.daily.Clarte.name": "Chiarezza",
    "cards.daily.Clarte.meaning":
      "Le risposte che cerchi presto si riveleranno. Prenditi del tempo, osserva con attenzione i segnali che ti circondano e lascia che la nebbia si dissolva gradualmente. Questa nuova chiarezza ti aiuterà a prendere decisioni consapevoli e allineate con la tua verità interiore. Suggerimento: trova un momento di calma oggi per riflettere con serenità prima di agire, così potrai vedere la situazione da un’angolazione più limpida.",
    "cards.daily.Passion.name": "Passione",
    "cards.daily.Passion.meaning":
      "Segui ciò che ti appassiona veramente, perché il tuo entusiasmo è un’energia potente che può trasformare la tua vita. Nutri questa fiamma interiore, concedile spazio per crescere e lascia che guidi le tue scelte verso ciò che ti fa sentire vivo. Suggerimento: dedica del tempo oggi a ciò che accende il tuo cuore, anche nelle piccole azioni, questo rafforzerà la tua motivazione e la gioia di vivere.",
    "cards.daily.Equite.name": "Equità",
    "cards.daily.Equite.meaning":
      "Giustizia ed equilibrio stanno per ristabilirsi nelle tue questioni. Rimani integro e paziente: le tue azioni giuste daranno frutti e riporteranno armonia intorno a te. Suggerimento: mantieni la calma davanti alle sfide e continua ad agire con onestà e rispetto, anche se i risultati tardano ad arrivare.",
    "cards.daily.Harmonie.name": "Armonia",
    "cards.daily.Harmonie.meaning":
      "Tutti gli elementi della tua vita tendono ad allinearsi oggi. Approfitta di questo periodo per consolidare ciò che funziona bene e per instaurare routine che nutrano il tuo benessere fisico, mentale ed emotivo. Suggerimento: prenditi il tempo per ascoltarti e bilanciare le tue diverse aree di vita per mantenere questa bella armonia nel tempo.",
    "cards.daily.Eveil.name": "Risveglio",
    "cards.daily.Eveil.meaning":
      "La tua coscienza si espande oggi, aprendo la porta a nuove prospettive e a una migliore comprensione di te stesso e del mondo che ti circonda. Accogli queste consapevolezze con apertura e curiosità: esse possono trasformare il tuo sguardo sulla vita e guidarti verso passi più autentici. Suggerimento: prenditi il tempo di riflettere su ciò che queste nuove rivelazioni significano per te e osa agire in accordo con questa nuova chiarezza.",
    "cards.daily.Generosite.name": "Generosità",
    "cards.daily.Generosite.meaning":
      "Dona oggi senza misura, non per dovere, ma col cuore. Questo gesto sincero e disinteressato creerà un cerchio di reciprocità intorno a te e attrarrà esperienze benefiche che arricchiranno la tua vita. Suggerimento: sii attento ai bisogni degli altri, senza però dimenticarti di te stesso in questo slancio generoso.",
    "cards.daily.Perseverance.name": "Perseveranza",
    "cards.daily.Perseverance.meaning":
      "Non mollare adesso: la tua determinazione è vicina a dare frutti. Continua con costanza e disciplina, la vittoria è più vicina di quanto pensi. Suggerimento: continua a percorrere la via anche se il cammino sembra lungo; ogni sforzo ti avvicina al tuo obiettivo.",
    "cards.daily.Simplicite.name": "Semplicità",
    "cards.daily.Simplicite.meaning":
      "La soluzione è spesso più semplice di quanto si immagini. Vai all’essenziale, elimina il superfluo e troverai risposte chiare ed efficaci. Suggerimento: semplifica la tua vita oggi per concentrarti meglio su ciò che conta davvero.",
    "cards.daily.Legerete.name": "Leggerezza",
    "cards.daily.Legerete.meaning":
      "Adotta oggi un atteggiamento leggero: ridi, gioca e liberati dai pesi inutili. Questa leggerezza ti aprirà al piacere e alla creatività. Suggerimento: permettiti di divertirti e di prender distanza per avanzare con più leggerezza.",
    "cards.daily.Ancrage.name": "Radicamento",
    "cards.daily.Ancrage.meaning":
      "Ritorna alle tue radici per trovare stabilità e forza. Pratiche semplici come la respirazione, camminare o routine regolari ti aiuteranno a ricentrarti e ad avanzare con serenità. Suggerimento: prenditi il tempo per connetterti con te stesso e con il momento presente.",
    "cards.daily.Mystere.name": "Mistero",
    "cards.daily.Mystere.meaning":
      "Accetta ciò che non puoi ancora comprendere. Il mistero fa parte della magia della vita: lasciando spazio all’ignoto, apri una porta a rivelazioni che si sveleranno al momento giusto. Suggerimento: confida nel tempo e mantieniti aperto alle sorprese che l’universo ti invia.",
    "cards.daily.Celebration.name": "Celebrazione",
    "cards.daily.Celebration.meaning":
      "È il momento di celebrare i tuoi successi, anche i più piccoli. Riconoscere le tue conquiste nutre la fiducia in te stesso e attira ancora più motivi di gioia. Suggerimento: prenditi il tempo di congratularti e condividi la tua gioia con chi ti circonda.",
    "cards.daily.Guidance.name": "Guida",
    "cards.daily.Guidance.meaning":
      "Oggi potrebbe manifestarsi un aiuto inatteso o un segno discreto. Rimani attento alle piccole sincronicità che incrociano il tuo cammino, poiché portano messaggi importanti. Questi segnali ti guideranno verso scelte più illuminate e benefiche. Accogli queste indicazioni con fiducia: aprono una porta verso una nuova e favorevole direzione.",
    "cards.daily.Purification.name": "Purificazione",
    "cards.daily.Purification.meaning":
      "È il momento ideale per fare chiarezza intorno a te e dentro di te. Liberando il tuo spazio e la tua mente dal superfluo, inviti un soffio di rinnovamento. Questa purificazione crea un ambiente favorevole alle trasformazioni positive, liberando energia per accogliere nuove opportunità con chiarezza e leggerezza.",
    "cards.daily.Vision.name": "Visione",
    "cards.daily.Vision.meaning":
      "La tua visione del futuro si chiarisce oggi. Identifica la direzione che ti attrae e avanza con fiducia verso questo orizzonte appena rivelato. Mantieni la mente aperta alle possibilità che ti si presentano e lasciati guidare da questa chiarezza interiore verso i tuoi obiettivi più autentici.",

    // Card Names and Meanings - Tarot
    "cards.tarot.LeFou.name": "Il Matto",
    "cards.tarot.LeFou.meaning": "Nuovi inizi, spontaneità, libertà",
    "cards.tarot.LeFou.meaning.var1":
      "Il Matto rappresenta un nuovo inizio nella tua vita. È il momento di fidarti del tuo istinto e lanciarti nell’ignoto, anche senza avere tutte le risposte. Questa carta ti invita a uscire dalla tua zona di comfort. Concretamente, può voler dire candidarti per un lavoro che ti spaventa un po’, iniziare una conversazione importante che continui a rimandare, o dare il via a quel progetto che stai pianificando da mesi. Il Matto ti dice: non aspettare di essere completamente pronto, perché quel momento non arriverà mai. Agisci adesso. Tuttavia, fai attenzione a non confondere spontaneità con imprudenza. Informati almeno un minimo, ma non lasciare che la paura ti blocchi.",
    "cards.tarot.LeFou.meaning.var2":
      "Questa carta annuncia una ventata di freschezza e novità nella tua vita. Sei a una svolta, dove innocenza e curiosità possono essere i tuoi migliori alleati. Il Matto ti incoraggia a guardare la tua situazione con occhi nuovi, come se la vedessi per la prima volta. Nella tua quotidianità, chiediti dove ti senti bloccato da abitudini o paure. È lì che può agire l’energia del Matto. Forse devi osare un approccio diverso nelle relazioni, provare un nuovo metodo al lavoro o semplicemente accettare di non poter controllare tutto. Fai quel primo passo con leggerezza. Il rischio è buttarti senza alcuna preparazione: sii spontaneo, ma non ingenuo.",
    "cards.tarot.LeFou.meaning.var3":
      "Il Matto ti porta un messaggio di libertà e rinnovamento. È l’inizio di un ciclo in cui puoi reinventarti. Questa carta ti chiede di avere il coraggio dell’innocenza, quella capacità di credere che le cose siano possibili nonostante gli ostacoli apparenti. A livello pratico, identifica cosa ti sta trattenendo in questo momento. È la paura del giudizio? Il timore di fallire? Il Matto ti consiglia di andare avanti nonostante questi dubbi. Inizia in piccolo, se necessario: una telefonata, un’iscrizione, una conversazione. L’importante è muoversi. Tuttavia, resta vigile: l’ottimismo del Matto non deve farti ignorare i veri segnali d’allarme. Ascolta anche la tua prudenza.",
    "cards.tarot.LeBateleur.name": "Il Mago",
    "cards.tarot.LeBateleur.meaning":
      "Creatività, comunicazione, nuovo progetto",
    "cards.tarot.LeBateleur.meaning.var1":
      "Il Bagatto ti porta una ventata di novità ed entusiasmo. Sei all’alba di un nuovo inizio, pieno di promesse e slancio creativo. Tutte le risorse sono già dentro di te: fiducia, idee, energia. Questa carta ti invita ad agire con coraggio, anche se il cammino non è ancora del tutto chiaro. È il momento perfetto per avviare un progetto, esprimere un’idea o semplicemente credere nella tua capacità di trasformare il potenziale in realtà. In amore o nel lavoro, questo slancio può cambiare tutto.",
    "cards.tarot.LeBateleur.meaning.var2":
      "Il Bagatto segna l’inizio di un’avventura personale o professionale. Stai prendendo coscienza del tuo potere di agire e scegliere. Questa carta simboleggia lo spirito giovane, la creatività e il desiderio di costruire su basi solide. Se stai vivendo un momento di incertezza, il Bagatto ti ricorda che il primo passo è spesso il più importante. Un incontro ispirante, un’opportunità inaspettata o un’idea brillante potrebbero indicarti la strada. Rimani aperto e curioso.",
    "cards.tarot.LeBateleur.meaning.var3":
      "Il Bagatto è simbolo di un audace rinnovamento. Ti incoraggia a connetterti con la tua energia vitale e ad agire con fiducia. Ciò che inizi ora ha il potenziale per durare, a patto di investirci volontà e cuore. Questa carta compare spesso quando sei pronto a riprendere il controllo della tua vita. Una presa di coscienza ti offre l’opportunità di riallineare le tue scelte con i tuoi valori più profondi. È il momento di costruire con chiarezza ed entusiasmo.",
    "cards.tarot.LaPapesse.name": "La Papessa",
    "cards.tarot.LaPapesse.meaning": "Intuizione, mistero, conoscenza nascosta",
    "cards.tarot.LaPapesse.meaning.var1":
      "La Papessa ti invita a rallentare e ad ascoltare. Una trasformazione sottile ma profonda è in atto. Ti ricorda che le risposte non sono all’esterno, ma dentro di te. Grazie alla tua intuizione, stai andando verso un cambiamento giusto e in armonia con te stesso. È il momento di osservare, riflettere e riconnetterti con ciò che senti davvero. L’azione verrà più avanti — ora lascia che sia la saggezza interiore a guidarti.",
    "cards.tarot.LaPapesse.meaning.var2":
      "La Papessa appare quando sei pronto a comprendere verità più profonde. Parla di maturità interiore e di un cammino che si rivela nel silenzio e nell’introspezione. Le tue decisioni non saranno prese alla leggera — nasceranno da un luogo di chiarezza e coerenza. Questa carta può anche annunciare la nascita di un legame di fiducia o il rafforzamento di una relazione già presente. Avanzi con grazia, protetto da una forza antica e dolce.",
    "cards.tarot.LaPapesse.meaning.var3":
      "La Papessa è la custode dei misteri e della conoscenza nascosta. Ti incoraggia a fidarti di ciò che intuisci, anche se sfida la logica. In questo momento non è necessario agire, ma comprendere, sentire, centrarti. Le tue scelte future saranno tanto più forti quanto più radicate nella tua verità interiore. La Papessa ti invita a scendere dentro di te per rinascere con chiarezza e saggezza.",
    "cards.tarot.LImperatrice.name": "L’Imperatrice",
    "cards.tarot.LImperatrice.meaning":
      "Fertilità, abbondanza, creatività femminile",
    "cards.tarot.LImperatrice.meaning.var1":
      "L’Imperatrice ti invita a ritrovare fiducia nella tua capacità di creare, comprendere e guidare con intelligenza. Simboleggia una femminilità attiva, lucida e generosa. Sei pront{genderSuffix} a far nascere qualcosa di concreto: un’idea, un progetto o una relazione. Grazie al tuo senso analitico e alla tua intuizione acuta, puoi gettare solide basi per un futuro fiorente. È il momento ideale per agire con equilibrio: consapevolmente, senza fretta, ma con determinazione.",
    "cards.tarot.LImperatrice.meaning.var2":
      "L’Imperatrice ti riconnette al tuo potere creativo. La sua energia ti spinge a strutturare le tue idee e a trasformarle in realtà. Parla di lucidità, autonomia e bellezza nell’azione. Non agisci nel caos: costruisci con intelligenza, facendo affidamento sulla tua esperienza. Ciò che concepisci ora ha il potenziale per crescere e fiorire pienamente. È un invito ad assumere la tua autorità naturale, senza arroganza, ma con sicurezza.",
    "cards.tarot.LImperatrice.meaning.var3":
      "L’Imperatrice veglia con saggezza sulla tua evoluzione. Ti ricorda che la vera forza risiede nella chiarezza mentale e nel controllo di sé. Il tuo potere risiede nella tua capacità di prendere decisioni illuminate, dimostrare discernimento e affermarti senza dominare. Questo arcano ti incoraggia a esprimere la tua intelligenza, nutrire la tua creatività e guidare gli altri senza perderti. Il futuro si scrive con consapevolezza. Hai le chiavi in mano.",
    "cards.tarot.LEmpereur.name": "L’Imperatore",
    "cards.tarot.LEmpereur.meaning": "Autorità, struttura, leadership",
    "cards.tarot.LEmpereur.meaning.var1":
      "L’Imperatore ti porta autorità, struttura e leadership. Sei pronto{genderSuffix} a prendere il controllo e costruire una base stabile. Questa carta ti incoraggia ad agire con fiducia e responsabilità. Le tue decisioni avranno un impatto duraturo, quindi guida con saggezza e forza.",
    "cards.tarot.LEmpereur.meaning.var2":
      "Con l’Imperatore, ordine e disciplina guidano il tuo cammino. Hai la capacità di organizzare il tuo ambiente e affermare il tuo potere con saggezza. Fai un passo avanti e assumi il tuo ruolo di leader. Struttura e chiarezza apriranno porte a nuove opportunità.",
    "cards.tarot.LEmpereur.meaning.var3":
      "L’Imperatore simboleggia una presenza solida e affidabile. Sei pronto{genderSuffix} a offrire guida e supporto a chi ti circonda. Usa la tua esperienza e autorità per creare stabilità e crescita. Trova l’equilibrio tra fermezza e giustizia per ottenere i migliori risultati.",
    "cards.tarot.LePape.name": "Il Papa",
    "cards.tarot.LePape.meaning": "Saggezza tradizionale, guida spirituale",
    "cards.tarot.LePape.meaning.var1":
      "Il Papa ti invita a connetterti con la tua saggezza interiore e a cercare risposte nella tradizione e nell’esperienza. Sei pront{genderSuffix} a guidare o a lasciarti guidare con benevolenza. Questa carta parla di trasmissione, di consigli saggi e di un progresso radicato in valori profondi. Potrebbe presentarsi una decisione importante: basa la tua scelta su ciò che è giusto, non sull’impulso.",
    "cards.tarot.LePape.meaning.var2":
      "Il Papa rappresenta un sostegno solido in un momento in cui cerchi stabilità e verità. Ti incoraggia ad ascoltare gli insegnamenti del passato per comprendere meglio il presente. Sei pront{genderSuffix} a trasmettere o ricevere una conoscenza essenziale. Questa carta può anche indicare la presenza di un mentore o di una guida spirituale che ti aiuta ad andare avanti.",
    "cards.tarot.LePape.meaning.var3":
      "Simbolo di saggezza e tradizione, il Papa ti invita a prendere le distanze e riflettere con chiarezza. Sei in una fase in cui intuizione e ragione devono collaborare. Sei pront{genderSuffix} a incarnare i tuoi valori, mostrare pazienza e costruire basi durature. È il momento di fidarti dei processi lenti ma potenti della maturazione.",
    "cards.tarot.LAmoureux.name": "Gli Amanti",
    "cards.tarot.LAmoureux.meaning": "Scelte, relazioni, armonia",
    "cards.tarot.LAmoureux.meaning.var1":
      "Gli Amanti ti invitano a prendere una decisione importante, spesso legata ai sentimenti, alle relazioni o ai tuoi valori profondi. Sei pront{genderSuffix} a seguire ciò che risuona dentro di te, anche se il cammino non è ancora del tutto chiaro. Questa carta ti incoraggia ad ascoltare il cuore, a bilanciare passione e ragione, e a impegnarti con consapevolezza. L’armonia arriverà quando assumerai pienamente la tua scelta.",
    "cards.tarot.LAmoureux.meaning.var2":
      "Gli Amanti simboleggiano un momento di connessione profonda, con te stess{genderSuffix} o con un’altra persona. Sei in una fase in cui le emozioni chiedono spazio e chiarezza. Sei pront{genderSuffix} ad aprire il cuore, a vivere una relazione sincera o a fare pace con una parte di te. Questa carta ti invita ad allineare i tuoi desideri con le tue azioni.",
    "cards.tarot.LAmoureux.meaning.var3":
      "Di fronte a una decisione delicata, Gli Amanti ti ricordano che l’amore, in tutte le sue forme, richiede coraggio. Sei pront{genderSuffix} a scegliere ciò che ti nutre veramente. Non si tratta di compiacere gli altri, ma di rimanere fedel{genderSuffix} a ciò che fa vibrare la tua anima. L’allineamento personale è la chiave per una vera armonia.",
    "cards.tarot.LeChariot.name": "Il Carro",
    "cards.tarot.LeChariot.meaning":
      "Vittoria, forza di volontà, determinazione",
    "cards.tarot.LeChariot.meaning.var1":
      "Il Carro ti incoraggia a prendere le redini della tua vita con determinazione. Sei pront{genderSuffix} a procedere, superare ostacoli e affermare la tua volontà. Questa carta simboleggia la vittoria attraverso l’autocontrollo, la chiarezza degli obiettivi e il coraggio di andare avanti. Nulla può fermarti se resti focalizzat{genderSuffix} sulla tua direzione.",
    "cards.tarot.LeChariot.meaning.var2":
      "Il Carro annuncia un progresso rapido e controllato. Sei in una dinamica di movimento, conquista e ambizione sana. Sei pront{genderSuffix} a guidare con fiducia senza perdere il tuo equilibrio interiore. Questa carta ti invita a canalizzare forze opposte, rimanere centrato{genderSuffix} e avanzare con fiducia verso ciò che desideri davvero.",
    "cards.tarot.LeChariot.meaning.var3":
      "Con Il Carro entri in una fase di successo attivo. Sei pront{genderSuffix} ad agire, affrontare sfide e uscirne vittorios{genderSuffix} grazie alla tua disciplina e al tuo spirito decisionale. È una carta di trionfo sui dubbi e le esitazioni. Avanza con fiducia in te stesso, il cammino si apre davanti a te.",
    "cards.tarot.LaJustice.name": "La Giustizia",
    "cards.tarot.LaJustice.meaning": "Equilibrio, verità, conseguenze",
    "cards.tarot.LaJustice.meaning.var1":
      "La Giustizia ti invita a usare il discernimento. Sei pront{genderSuffix} a vedere le cose con chiarezza, affrontare le conseguenze delle tue azioni e prendere decisioni giuste. Questa carta ti spinge a cercare equilibrio interiore e ad agire in coerenza con i tuoi valori. La verità è una potente alleata: accogliendola, ottieni chiarezza e forza.",
    "cards.tarot.LaJustice.meaning.var2":
      "Con La Giustizia, entri in un periodo di regolazione, responsabilità e riequilibrio. Sei pront{genderSuffix} a prendere decisioni consapevoli, anche se richiedono coraggio e imparzialità. Questa carta indica che è il momento di mettere ordine, sistemare ciò che va corretto, o prendere una decisione equa. Stai avanzando verso una maggiore maturità.",
    "cards.tarot.LaJustice.meaning.var3":
      "La Giustizia ti guida verso onestà ed equità. Ti invita a osservare la tua situazione senza illusioni e a fidarti del tuo giudizio interiore. Sei pront{genderSuffix} a ristabilire un equilibrio interrotto, dire ciò che va detto e agire da adult{genderSuffix} responsabile. Questa carta ti incoraggia a distinguere ciò che è giusto per te da ciò che non lo è più.",
    "cards.tarot.LHermite.name": "L’Eremita",
    "cards.tarot.LHermite.meaning": "Introspezione, saggezza interiore, guida",
    "cards.tarot.LHermite.meaning.var1":
      "L’Eremita ti invita a un profondo viaggio interiore. Sei pront{genderSuffix} a ritirarti dal rumore esterno per cercare la verità dentro di te. Questa solitudine scelta ti permette di attingere alla tua saggezza e comprendere meglio il tuo cammino.",
    "cards.tarot.LHermite.meaning.var2":
      "Con L’Eremita entri in una fase di riflessione e guida interiore. Sei pront{genderSuffix} ad ascoltare la tua voce interiore, anche se ti conduce su strade meno battute. Questa carta ti incoraggia a mostrare pazienza e discernimento.",
    "cards.tarot.LHermite.meaning.var3":
      "L’Eremita ti guida verso l’introspezione e la luce interiore. Sei pront{genderSuffix} a distaccarti dalle influenze esterne per ascoltare meglio la tua saggezza profonda. Questa carta ti spinge ad andare avanti con cautela, ma con una certezza interiore rafforzata.",
    "cards.tarot.LaRouedeFortune.name": "La Ruota della Fortuna",
    "cards.tarot.LaRouedeFortune.meaning": "Cambiamento, cicli, destino",
    "cards.tarot.LaRouedeFortune.meaning.var1":
      "La Ruota della Fortuna ti invita ad accettare il cambiamento come una forza naturale. Sei pront{genderSuffix} a seguire i cicli della vita, anche quando ti conducono verso l’ignoto. Questa carta ti ricorda che il destino è in movimento e che l’adattabilità è la chiave per progredire.",
    "cards.tarot.LaRouedeFortune.meaning.var2":
      "Con la Ruota della Fortuna inizia una nuova fase. Sei pront{genderSuffix} a voltare pagina, ad accogliere i colpi di scena e a imparare dalle esperienze passate. Questa carta simboleggia la trasformazione e l’evoluzione continua.",
    "cards.tarot.LaRouedeFortune.meaning.var3":
      "La Ruota della Fortuna ti guida attraverso gli alti e bassi della vita con saggezza. Sei pront{genderSuffix} a comprendere che ogni ciclo ha una fine e un inizio. Questa carta ti incoraggia a rimanere apert{genderSuffix} al flusso della vita, con fiducia e armonia lungo il tuo cammino.",
    "cards.tarot.LaForce.name": "La Forza",
    "cards.tarot.LaForce.meaning": "Coraggio, pazienza, padronanza interiore",
    "cards.tarot.LaForce.meaning.var1":
      "La Forza ti ricorda che il tuo vero potere risiede nella delicatezza e nella pazienza. Sei pront{genderSuffix} a incanalare la tua energia, domare gli impulsi e affrontare le sfide con calma e determinazione. Questa carta parla di padronanza interiore e coraggio silenzioso. Prediligi la costanza alla fretta; ti porterà più lontano della forza bruta.",
    "cards.tarot.LaForce.meaning.var2":
      "Con La Forza sei invitad{genderSuffix} a attingere alla tua forza morale per superare gli ostacoli. Sei pront{genderSuffix} ad affrontare prove senza lasciarti sopraffare, con fiducia in te stesso e nelle tue capacità. Questa carta favorisce la resilienza e l’equilibrio. Respira prima di agire; la serenità è la tua miglior alleata.",
    "cards.tarot.LaForce.meaning.var3":
      "La Forza simboleggia coraggio interiore e la capacità di restare allineat{genderSuffix} di fronte alle tensioni. Sei pront{genderSuffix} a mostrare compostezza, padroneggiare le paure e trasformare l’avversità in crescita personale. Questa carta ti spinge a fidarti della tua stabilità interiore. Tieni la testa alta e avanza senza paura — la tua pace interiore aprirà le porte giuste.",
    "cards.tarot.LePendu.name": "L’Appeso",
    "cards.tarot.LePendu.meaning":
      "Sacrificio, nuova prospettiva, lasciar andare",
    "cards.tarot.LePendu.meaning.var1":
      "L’Appeso ti invita a cambiare prospettiva. Sei pront{genderSuffix} a lasciare andare vecchi schemi e osservare la tua situazione da un nuovo punto di vista, anche se ciò comporta un sacrificio temporaneo. Questa carta parla di accettazione e pazienza. A volte è proprio nel lasciar andare che si ritrova la vera libertà.",
    "cards.tarot.LePendu.meaning.var2":
      "Con l’Appeso entri in una fase di pausa necessaria. Sei pront{genderSuffix} a sospendere l’azione per comprendere meglio ciò che accade dentro di te. Questo momento di attesa non è debolezza, ma un passaggio verso maggiore chiarezza. Accogli questo silenzio come terreno fertile per la trasformazione.",
    "cards.tarot.LePendu.meaning.var3":
      "L’Appeso simboleggia un periodo in cui il lasciar andare diventa essenziale. Sei pront{genderSuffix} a rinunciare a ciò che non serve più alla tua crescita, anche se richiede coraggio e umiltà. Questa carta ti guida verso un risveglio nella semplicità. Abbandona la resistenza: il vuoto apre la strada al rinnovamento.",
    "cards.tarot.LArcanesansnom.name": "La Morte",
    "cards.tarot.LArcanesansnom.meaning": "Trasformazione, fine, rinascita",
    "cards.tarot.LArcanesansnom.meaning.var1":
      "Non lasciarti ingannare dal suo nome: La Morte simboleggia trasformazione profonda, non una fine tragica. Sei pront{genderSuffix} a lasciare alle spalle una fase passata della tua vita per aprire la strada a una rinascita più in linea con chi sei diventat{genderSuffix}. Questo Arcano senza nome ti libera da ciò che ti gravava, affinché tu possa avanzare più leggero nella tua metamorfosi.",
    "cards.tarot.LArcanesansnom.meaning.var2":
      "La Morte non è una carta negativa, bensì un invito al cambiamento radicale. Sei pront{genderSuffix} a voltare pagina, chiudere un capitolo che non risuona più con il tuo presente. Questo passaggio può apparire scomodo, ma porta rinascita e nuove opportunità. Accogli il lasciare andare ciò che ti lega al passato per accogliere meglio ciò che sta arrivando.",
    "cards.tarot.LArcanesansnom.meaning.var3":
      "Questo Arcano senza nome segna una fine necessaria per una trasformazione duratura. Contrariamente alle apparenze, questa carta parla più di vita che di morte: evoca una purificazione interiore. Sei pront{genderSuffix} a liberarti da ciò che non serve più, a fare il lutto delle illusioni o delle abitudini obsolete. Ciò che lasci andare oggi prepara la crescita di domani.",
    "cards.tarot.Temperance.name": "La Temperanza",
    "cards.tarot.Temperance.meaning": "Moderazione, armonia, guarigione",
    "cards.tarot.Temperance.meaning.var1":
      "La Temperanza ti invita alla dolcezza e all’armonia. Sei pront{genderSuffix} a placare le tue emozioni, evitare gli estremi e trovare il giusto mezzo. Questa carta parla di guarigione interiore, un tempo di integrazione in cui tutto si riallinea con delicatezza. Abbraccia la pazienza: le cose si consolidano quando rispetti il tuo ritmo.",
    "cards.tarot.Temperance.meaning.var2":
      "Con La Temperanza si apre una fase di pace davanti a te. Sei pront{genderSuffix} a far dialogare i contrari, a ascoltare tanto quanto esprimerti, a costruire un ponte tra le parti di te che sembravano in conflitto. Questa carta evoca l’alchimia del cuore e della mente. Concediti di rallentare per riallinearti meglio.",
    "cards.tarot.Temperance.meaning.var3":
      "La Temperanza simboleggia un equilibrio ritrovato, una pace interiore che si instaura con maturità. Sei pront{genderSuffix} a lasciare fluire ciò che deve fluire, senza forzare né trattenere. È tempo di riconnetterti al tuo centro, a quella stabilità tranquilla che ti sostiene. Cura questo equilibrio delicato, è la tua forza.",
    "cards.tarot.LeDiable.name": "Il Diavolo",
    "cards.tarot.LeDiable.meaning": "Dipendenze, illusioni, materialismo",
    "cards.tarot.LeDiable.meaning.var1":
      "Il Diavolo ti mette di fronte alle tue catene invisibili. Sei pront{genderSuffix} a riconoscere le dipendenze che ti limitano, siano materiali, emotive o mentali. Questa carta ti invita a rompere le illusioni che ti impediscono di vedere la verità e a riconquistare il tuo potere interiore. Osa liberarti da ciò che ti lega.",
    "cards.tarot.LeDiable.meaning.var2":
      "Con Il Diavolo affronti le tue tentazioni e le paure profonde. Questa carta ti incoraggia a guardare oltre le apparenze e a comprendere le radici dei tuoi comportamenti compulsivi. Diventando consapevole, potrai iniziare a sciogliere i nodi che ti trattengono. Ricorda che la luce attraversa sempre l’oscurità.",
    "cards.tarot.LeDiable.meaning.var3":
      "Il Diavolo ti spinge a esaminare il tuo rapporto con il materiale e i piaceri immediati. Sei pront{genderSuffix} a mettere in discussione i tuoi valori e a vedere se alcune illusioni controllano le tue scelte. Questa carta ti ricorda che la vera libertà deriva dalla consapevolezza e dal dominio di sé. Cerca di trasformare le tue catene in forza.",
    "cards.tarot.LaMaisonDieu.name": "La Torre",
    "cards.tarot.LaMaisonDieu.meaning":
      "Rivelazione improvvisa, cambiamento radicale",
    "cards.tarot.LaMaisonDieu.meaning.var1":
      "La Torre ti scuote improvvisamente, rivelando verità nascoste. Sei pront{genderSuffix} ad abbracciare questo cambiamento radicale, anche se ti destabilizza. Questa carta ti invita ad accettare la trasformazione necessaria per ricostruire su basi più solide. A volte bisogna lasciare andare il vecchio per rinascere più forti.",
    "cards.tarot.LaMaisonDieu.meaning.var2":
      "Con La Torre, una rivelazione improvvisa sconvolge la tua realtà. Sei pront{genderSuffix} ad affrontare la distruzione di convinzioni che non ti servono più. Questo momento di caos annuncia una potente liberazione, permettendoti di liberarti da ciò che ti trattiene. Mantieni la fiducia, dopo la tempesta arriva la chiarezza.",
    "cards.tarot.LaMaisonDieu.meaning.var3":
      "La Torre ti invita ad accettare le rotture necessarie alla tua evoluzione. Sei pront{genderSuffix} ad abbandonare costruzioni fragili per aprire la strada a un profondo rinnovamento. Questa carta ricorda che le cadute dolorose spesso preparano le rinascite più belle.",
    "cards.tarot.LEtoile.name": "La Stella",
    "cards.tarot.LEtoile.meaning": "Speranza, ispirazione, guida divina",
    "cards.tarot.LEtoile.meaning.var1":
      "La Stella ti porta un soffio di speranza e ispirazione. Sei pront{genderSuffix} a credere in un futuro migliore e a seguire la guida divina che illumina il tuo cammino. Non esitare a connetterti con la tua luce interiore per avanzare con fiducia.",
    "cards.tarot.LEtoile.meaning.var2":
      "Con La Stella si apre per te un periodo di rinnovamento spirituale. Sei pront{genderSuffix} a ricevere messaggi dall’universo e a lasciarti guidare dalla tua intuizione. Rimani apert{genderSuffix} e coltiva la fiducia in te stesso e nella vita.",
    "cards.tarot.LEtoile.meaning.var3":
      "La Stella ti invita a mantenere la fede anche nei momenti di incertezza. Sei pront{genderSuffix} a lasciarti ispirare e a perseguire i tuoi sogni con pazienza e serenità. Prenditi il tempo per riconnetterti con ciò che ti nutre profondamente.",
    "cards.tarot.LaLune.name": "La Luna",
    "cards.tarot.LaLune.meaning": "Illusioni, subconscio, intuizione",
    "cards.tarot.LaLune.meaning.var1":
      "La Luna ti invita a esplorare il tuo subconscio e ad ascoltare la tua intuizione. Sei pront{genderSuffix} ad accettare che non tutto è sempre chiaro e che le illusioni possono ingannarti. Rimani attento ai segnali sottili che ti guidano nell’ombra.",
    "cards.tarot.LaLune.meaning.var2":
      "Con La Luna, misteri profondi ed emozioni emergono in superficie. Sei pront{genderSuffix} a immergerti in te stesso, anche se questo può suscitare dubbi o paure. Non rifiutare i tuoi sentimenti, ti aiutano a comprenderti meglio.",
    "cards.tarot.LaLune.meaning.var3":
      "La Luna ti incoraggia a fidarti della tua intuizione nonostante le incertezze e le illusioni che ti circondano. Sei pront{genderSuffix} ad andare avanti accettando l’ignoto e a liberarti dalle paure che ti trattengono. Sii paziente con te stesso in questo cammino.",
    "cards.tarot.LeSoleil.name": "Il Sole",
    "cards.tarot.LeSoleil.meaning": "Gioia, successo, vitalità",
    "cards.tarot.LeSoleil.meaning.var1":
      "Il Sole ti porta luce ed energia positiva. Sei pront{genderSuffix} ad accogliere la gioia e a celebrare i tuoi successi. Usa questa vitalità per andare avanti con fiducia ed entusiasmo.",
    "cards.tarot.LeSoleil.meaning.var2":
      "Con Il Sole si apre un periodo di chiarezza e ottimismo per te. Sei pront{genderSuffix} a brillare, condividere il tuo buon umore e attrarre buone opportunità. Tieni il cuore aperto e assapora ogni momento.",
    "cards.tarot.LeSoleil.meaning.var3":
      "Il Sole ti invita a ritrovare la tua forza interiore e vitalità. Sei pront{genderSuffix} a superare gli ostacoli con un atteggiamento positivo e a ispirare chi ti circonda. Non dubitare della tua capacità di riuscire.",
    "cards.tarot.LeJugement.name": "Il Giudizio",
    "cards.tarot.LeJugement.meaning":
      "Risveglio spirituale, rinascita, perdono",
    "cards.tarot.LeJugement.meaning.var1":
      "Il Giudizio ti invita a un profondo risveglio interiore. Sei pront{genderSuffix} a riconoscere gli errori passati e ad abbracciare una rinascita spirituale. Accogli questa trasformazione per andare avanti con leggerezza e chiarezza.",
    "cards.tarot.LeJugement.meaning.var2":
      "Con Il Giudizio si apre un periodo di perdono e liberazione. Sei pront{genderSuffix} a liberarti dai pesi del passato e a riconnetterti con la tua verità. Apri il cuore e lasciati guidare verso una nuova vita.",
    "cards.tarot.LeJugement.meaning.var3":
      "Il Giudizio ti spinge ad ascoltare il tuo richiamo interiore e ad agire con consapevolezza. Sei pront{genderSuffix} a fare pace con te stesso e a rinascere più forte. Non temere il cambiamento, porta speranza.",
    "cards.tarot.LeMonde.name": "Il Mondo",
    "cards.tarot.LeMonde.meaning": "Realizzazione, successo, compimento",
    "cards.tarot.LeMonde.meaning.var1":
      "Il Mondo simboleggia il compimento e il successo. Sei pront{genderSuffix} a celebrare la fine di un ciclo importante. Goditi questo momento di realizzazione per apprezzare tutto ciò che hai raggiunto e prepararti a ciò che verrà con fiducia.",
    "cards.tarot.LeMonde.meaning.var2":
      "Con Il Mondo, un ciclo completo si conclude, aprendo la porta a nuove possibilità. Sei pront{genderSuffix} a integrare le lezioni apprese e ad andare avanti con serenità. Accogli questa fase come una vittoria personale.",
    "cards.tarot.LeMonde.meaning.var3":
      "Il Mondo ti invita a vivere pienamente armonia e completezza. Sei pront{genderSuffix} a riconoscere il tuo valore e ad aprirti al mondo con gratitudine. Lasciati trasportare da questa energia positiva per realizzare i tuoi progetti.",

    // Card Names and Meanings - Angels
    "cards.angels.ArchangeMichel.name": "Arcangelo Michele",
    "cards.angels.ArchangeMichel.meaning":
      "Protezione divina, coraggio e forza",
    "cards.angels.ArchangeMichel.meaning.var1":
      "L'Arcangelo Michele ti avvolge con la sua potente protezione. Ti dona il coraggio di affrontare situazioni difficili e di difenderti dalle energie negative. Questa carta ti ricorda che nelle prove non sei mai solo. In pratica, quando ti senti minacciato o instabile, Michele ti consiglia di stabilire confini chiari. Impara a dire no a persone o situazioni che ti prosciugano l’energia. Proteggi il tuo spazio personale, sia fisico che emotivo. La sua spada di luce taglia i legami tossici e ti libera dalle paure paralizzanti. Non esitare a chiedere aiuto quando ne hai bisogno: è segno di forza, non di debolezza.",
    "cards.angels.ArchangeMichel.meaning.var2":
      "Questa carta annuncia l'intervento di una forza protettiva nella tua vita. Michele ti invita a rialzarti con coraggio e a riconquistare la tua forza personale. Hai attraversato momenti di vulnerabilità, ma ora è il momento di riappropriarti della tua energia interiore. Nella vita quotidiana, individua ciò che indebolisce la tua fiducia in te stesso. È una relazione tossica? Un ambiente lavorativo soffocante? Pensieri negativi ricorrenti? Michele ti incoraggia ad agire con determinazione per cambiare la situazione. La sua presenza ti sostiene in questo percorso. Prendi una decisione che hai rimandato per paura, affronta chi ti tratta con mancanza di rispetto o esprimi chiaramente i tuoi bisogni.",
    "cards.angels.ArchangeMichel.meaning.var3":
      "L’energia di Michele porta protezione divina in questo momento della tua vita. Ti ricorda che possiedi una forza nascosta. Questa carta ti invita a rimanere saldo nelle difficoltà e a difendere i tuoi valori e convinzioni. In pratica, osserva dove ti adatti per paura di conflitti o rifiuti. Michele ti dà il coraggio di essere autentico, anche se ciò dispiace ad alcuni. La sua forza ti permette di stabilire confini sani nelle tue relazioni. Se vivi un’ingiustizia, ora è il momento di agire. Il suo scudo ti protegge mentre prendi posizione. Ricorda che la vera forza non sta nell’aggressività, ma in un’affermazione calma e ferma di te stesso.",
    "cards.angels.ArchangeGabriel.name": "Arcangelo Gabriele",
    "cards.angels.ArchangeGabriel.meaning":
      "Messaggi divini, creatività e comunicazione",
    "cards.angels.ArchangeGabriel.meaning.var1":
      "L’Arcangelo Gabriele ti porta un messaggio importante. È il messaggero divino che apre i canali di comunicazione nella tua vita. Questa carta indica che riceverai informazioni decisive o che devi trasmettere qualcosa di essenziale. Gabriele stimola la tua creatività e ti incoraggia a esprimere ciò che hai dentro. In pratica, presta attenzione a segni, conversazioni e opportunità che si presentano. È tempo di scrivere, parlare, creare. Se hai un progetto artistico in mente, inizia. Se devi affrontare una conversazione difficile, Gabriele ti darà le parole giuste. Fidati della tua intuizione e non ignorare i messaggi sottili.",
    "cards.angels.ArchangeGabriel.meaning.var2":
      "Gabriele annuncia una fase di comunicazione e espressione personale. Ti invita a liberare la tua voce e a condividere le tue idee con il mondo. Forse hai taciuto troppo a lungo su un argomento importante. Questa carta ti incoraggia a parlare, scrivere e creare senza paura del giudizio. Nella vita quotidiana, riconosci ciò che devi comunicare. Un sentimento che vuoi dire a una persona cara? Un progetto creativo da avviare? Una verità da esprimere? Gabriele ti sostiene in questo processo. Favorisce anche la ricezione di messaggi importanti, resta aperto. I messaggi divini possono arrivare da vie inaspettate.",
    "cards.angels.ArchangeGabriel.meaning.var3":
      "L’energia di Gabriele risveglia la tua creatività e chiarisce la tua comunicazione. Ti ricorda che hai qualcosa di unico da offrire. Questa carta ti invita a utilizzare i tuoi talenti artistici o la tua capacità di parlare. Praticamente, dedica questa settimana a un’attività creativa, anche semplice. Scrivi un diario, dipingi, canta, decora il tuo spazio. Gabriele risolve anche situazioni di comunicazione difficile. Se aspetti notizie, arriveranno presto. Se devi chiarire un malinteso, è il momento giusto. Esprimiti con autenticità e ascolta davvero gli altri.",
    "cards.angels.ArchangeRaphael.name": "Arcangelo Raffaele",
    "cards.angels.ArchangeRaphael.meaning": "Guarigione fisica ed emotiva",
    "cards.angels.ArchangeRaphael.meaning.var1":
      "L’Arcangelo Raffaele ti avvolge con la sua energia di guarigione. Allevia dolcemente le tue ferite fisiche ed emotive con compassione. Questa carta indica che un processo di guarigione è in corso nella tua vita. Raffaele ti ricorda che prenderti cura di te non è egoismo, ma necessario. In pratica, concediti riposo quando il corpo ne ha bisogno. Se trascuri sintomi, consulta un medico. A livello emotivo, permettiti di sentire e lasciare andare i sentimenti. Raffaele ti guida verso persone e pratiche che sostengono la tua guarigione, che sia medicina, terapia o semplicemente tempo per te.",
    "cards.angels.ArchangeRaphael.meaning.var2":
      "Raffaele annuncia una fase di recupero e rigenerazione. Ti chiede di rallentare e ascoltare i bisogni del tuo corpo e cuore. Forse hai oltrepassato i limiti, ignorando segnali di allarme o portando fardelli troppo pesanti da solo. Questa carta ti incoraggia a chiedere aiuto e ad accettare il sostegno offerto. Nella vita quotidiana, riconosci cosa necessita di attenzione speciale. Stanchezza persistente? Una ferita emotiva non guarita? Relazioni che ti danneggiano? Raffaele ti dà la forza per fare cambiamenti necessari al tuo benessere. Prendi un appuntamento dal medico, dal terapeuta o concediti un giorno di completo riposo.",
    "cards.angels.ArchangeRaphael.meaning.var3":
      "L’energia di guarigione di Raffaele agisce nella tua vita. Ti aiuta a lasciar andare il dolore passato e a ristabilire il tuo equilibrio interiore. Questa carta ti invita a trattare le tue ferite con gentilezza, visibili o invisibili. In pratica, coltiva abitudini che nutrono corpo e mente. Mangia sano, dormi a sufficienza, muoviti dolcemente. Per le ferite emotive, considera di parlare con persone di fiducia o di scrivere i tuoi sentimenti. Raffaele ti ricorda che guarire richiede tempo ed è normale. Sii paziente con te stesso e celebra ogni piccolo progresso.",
    "cards.angels.ArchangeUriel.name": "Arcangelo Uriele",
    "cards.angels.ArchangeUriel.meaning": "Saggezza divina e illuminazione",
    "cards.angels.ArchangeUriel.meaning.var1":
      "L’Arcangelo Uriel illumina il tuo cammino con saggezza divina. Ti aiuta a vedere chiaramente situazioni complesse e a comprendere il significato profondo delle tue esperienze. Questa carta indica che una consapevolezza importante sta per arrivare. Uriel porta alla luce ciò che era nascosto all’ombra e ti rivela verità essenziali. In pratica, prenditi del tempo per riflettere e meditare. Le risposte che cerchi sono già dentro di te, Uriel ti aiuta solo a riconoscerle. Se devi prendere una decisione difficile, guarda la situazione da diversi punti di vista. Uriel ti dona la capacità di giudizio per fare la scelta giusta. Fidati di intuizioni improvvise e momenti di chiarezza.",
    "cards.angels.ArchangeUriel.meaning.var2":
      "Uriel annuncia una fase di illuminazione interiore e profonda comprensione. Ti invita a cercare saggezza oltre la superficie e a fidarti della tua conoscenza interiore. Hai più saggezza di quanto pensi. Questa carta ti incoraggia a studiare, imparare e interessarti a temi che ti attraggono. Nella vita quotidiana, fai attenzione a sincronicità e coincidenze che ti guidano. Uriel ti mostra schemi e lezioni nelle tue esperienze. Se qualcosa ti pesa, prenditi distanza e osserva senza attaccamento. La saggezza spesso arriva quando smetti di cercarla freneticamente e la lasci emergere naturalmente. Leggi, impara, metti in discussione.",
    "cards.angels.ArchangeUriel.meaning.var3":
      "L’energia di Uriel porta luce e chiarezza nella tua vita. Dissolve la confusione e ti permette di vedere la verità nelle situazioni. Questa carta ti invita a approfondire la tua saggezza interiore attraverso osservazione e contemplazione. In pratica, crea momenti di silenzio nella tua routine per riflettere. Tieni un diario per annotare pensieri e intuizioni. Uriel favorisce l’apprendimento, quindi è un buon momento per approfondire un argomento di interesse. Se cerchi risposte, consulta libri di saggezza o insegnanti ispiratori. Uriel ti ricorda che la vera conoscenza trasforma e non rimane solo teoria. Applica ciò che impari nella vita quotidiana.",
    "cards.angels.AngeGardien.name": "Angelo Custode",
    "cards.angels.AngeGardien.meaning": "Protezione personale e guida",
    "cards.angels.AngeGardien.meaning.var1":
      "Il tuo angelo custode ti fa sapere che è sempre al tuo fianco. Ti protegge amorevolmente e ti salva da pericoli invisibili. Questa carta ti ricorda che non sei mai solo nel tuo cammino di vita. La tua guida personale è sempre disponibile, devi solo chiederle aiuto. In pratica, quando ti senti perso o spaventato, prenditi un momento per connetterti interiormente. Chiedi al tuo angelo custode di mostrarti segni della sua presenza. Fidati delle intuizioni che ti allontanano da una situazione o ti avvicinano a un’altra. Questi impulsi spesso sono il suo modo di guidarti. Se stai attraversando un momento difficile, sappi che sei protetto e sostenuto, anche se non lo vedi ancora.",
    "cards.angels.AngeGardien.meaning.var2":
      "Questa carta annuncia una protezione rafforzata intorno a te. Il tuo angelo custode ti manda un messaggio chiaro: dirige i tuoi passi e tiene lontani gli ostacoli dal tuo cammino. Ti chiede di fidarti di lui e di seguire il tuo istinto. Nella vita quotidiana, fai attenzione ai piccoli miracoli e alle coincidenze fortunate che accadono. È il tuo angelo che agisce dietro le quinte per il tuo bene. Quando devi prendere una decisione importante, calma la mente e ascolta quella voce interiore dolce ma ferma. Il tuo angelo custode comunica attraverso sensazioni, sogni e segnali ripetuti. Sii attento e ringrazialo per la sua costante presenza nella tua vita.",
    "cards.angels.AngeGardien.meaning.var3":
      "L’energia del tuo angelo custode ti avvolge con protezione e amore incondizionato. Conosce la tua missione di vita e ti aiuta a rimanere sulla strada giusta. Questa carta ti invita a rafforzare la tua connessione con lui tramite preghiera o meditazione. In pratica, crea un rituale quotidiano per riconoscere la sua presenza. Può essere un semplice ringraziamento al mattino o una richiesta di guida prima di dormire. Il tuo angelo custode ti protegge non solo fisicamente, ma anche emotivamente e spiritualmente. Quando ti senti vulnerabile, immagina le sue ali che ti avvolgono. Ti ricorda che anche nei momenti più bui sei guidato verso la luce. Ascolta i messaggi che arrivano dal cuore – spesso è lui che parla attraverso di essi.",
    "cards.angels.AngedelAmour.name": "Angelo dell'Amore",
    "cards.angels.AngedelAmour.meaning":
      "Relazioni armoniose e amore incondizionato",
    "cards.angels.AngedelAmour.meaning.var1":
      "L’Angelo dell’Amore apre il tuo cuore a relazioni più autentiche e armoniose. Ti insegna che l’amore inizia da te stesso e poi si irradia verso gli altri. Questa carta indica un periodo favorevole per guarire le tue ferite affettive e attrarre relazioni sane. L’amore incondizionato significa accettare senza giudizio, prima te stesso e poi gli altri. Concretamente, osserva come parli a te stesso interiormente. Sei duro con te come non lo saresti mai con un amico? Cambia questo dialogo interno. Nelle tue relazioni, pratica l’ascolto vero e l’espressione onesta dei tuoi sentimenti. Se sei in coppia, è il momento di ravvivare la connessione. Se sei single, lavora sull’amor proprio prima di cercare l’amore altrove.",
    "cards.angels.AngedelAmour.meaning.var2":
      "Questa carta annuncia un’energia di amore e armonia che entra nella tua vita. L’Angelo dell’Amore ti ricorda che meriti di essere amato per chi sei veramente. Ti incoraggia ad abbassare le difese e a mostrarti vulnerabile nelle relazioni. Nella quotidianità, identifica i muri che hai costruito per paura di essere ferito. Queste protezioni ti impediscono anche di ricevere l’amore che ti viene offerto. Osa mostrare le tue emozioni sincere a chi ti sta a cuore. Perdona le vecchie ferite, non per gli altri, ma per liberare te stesso. L’Angelo dell’Amore favorisce anche incontri significativi, quindi rimani aperto alle nuove persone che incrociano il tuo cammino.",
    "cards.angels.AngedelAmour.meaning.var3":
      "L’energia dell’Angelo dell’Amore ti invita a creare più armonia in tutte le tue relazioni. Ti guida verso un amore maturo, che accetta le imperfezioni e sceglie la gentilezza. Questa carta ti incoraggia a riparare i legami danneggiati se ancora possibile e sano per te. Sul piano pratico, esprimi la tua gratitudine alle persone che ami. Un messaggio sincero o un gesto premuroso possono trasformare una relazione. Se una relazione ti fa più male che bene, l’Angelo dell’Amore ti dà anche il coraggio di lasciarla andare con compassione. L’amore incondizionato include talvolta mettere limiti chiari. Ricorda che insegni agli altri come trattarti da ciò che accetti.",
    "cards.angels.AngedelaPaix.name": "Angelo della Pace",
    "cards.angels.AngedelaPaix.meaning": "Serenità interiore e calma",
    "cards.angels.AngedelaPaix.meaning.var1":
      "L’Angelo della Pace ti porta un’energia di serenità e calma profonda. Ti aiuta a trovare il silenzio interiore anche nel caos esterno. Questa carta indica che è tempo di rallentare e coltivare la tua tranquillità mentale. La vera pace non dipende dalle circostanze, nasce dal tuo stato interiore. Concretamente, crea momenti di pausa nella tua giornata. Cinque minuti di respirazione consapevole, una passeggiata nella natura o semplicemente sederti in silenzio. Se vivi conflitti, l’Angelo della Pace ti incoraggia a scegliere l’appianamento invece di avere ragione. A volte, la pace richiede di lasciare andare il bisogno di controllo. Allontanati da fonti di stress inutili come notizie ansiogene o conversazioni tossiche.",
    "cards.angels.AngedelaPaix.meaning.var2":
      "Questa carta annuncia un periodo di riconciliazione e armonia interiore. L’Angelo della Pace ti chiede di fare pace con il tuo passato, i tuoi errori e i tuoi rimpianti. Ti ricorda che non puoi cambiare ciò che è stato, ma puoi scegliere come vivere ora. Nella quotidianità, identifica ciò che turba la tua pace interiore. Pensieri ossessivi? Rancori tenaci? Paure costanti? Lavora attivamente per calmare queste turbolenze. La meditazione, il perdono e l’accettazione sono i tuoi strumenti. Se sei in conflitto con qualcuno, cerca punti di riconciliazione invece di alimentare la divisione. L’Angelo della Pace ti guida verso soluzioni dolci e compromessi rispettosi.",
    "cards.angels.AngedelaPaix.meaning.var3":
      "L’energia dell’Angelo della Pace calma le tempeste della tua mente e del tuo cuore. Ti invita a creare un santuario di serenità nella tua vita quotidiana. Questa carta ti ricorda che la pace è una scelta consapevole che fai in ogni momento. Sul piano pratico, crea uno spazio a casa dedicato alla calma e al rilassamento. Limita la tua esposizione a stimoli e ambienti stressanti. Se la tua mente si agita con preoccupazioni, ritorna dolcemente al momento presente. Respira profondamente e ricorda che la maggior parte delle tue paure riguarda un futuro che ancora non esiste. L’Angelo della Pace ti insegna che la calma non è assenza di problemi, ma la capacità di rimanere centrato nonostante essi.",
    "cards.angels.AngedelaProsperite.name": "Angelo della Prosperità",
    "cards.angels.AngedelaProsperite.meaning":
      "Abbondanza e successo materiale",
    "cards.angels.AngedelaProsperite.meaning.var1":
      "L'Angelo della Prosperità ti invita ad accogliere l'abbondanza nella tua vita. Ti ricorda che il successo materiale è a portata di mano, purché tu mantenga un atteggiamento positivo e creda nelle tue capacità. Questa carta ti incoraggia ad agire con fiducia e ad afferrare le opportunità che si presentano. Concretamente, fai attenzione ai segni di fortuna, alle idee che potrebbero migliorare la tua situazione finanziaria e non esitare a investire su te stesso.",
    "cards.angels.AngedelaProsperite.meaning.var2":
      "Questa carta annuncia un periodo favorevole alla crescita e alla stabilità materiale. L'Angelo della Prosperità ti sostiene nei tuoi progetti aziendali, negli investimenti o nello sviluppo professionale. Ti invita anche a coltivare la gratitudine per ciò che già possiedi, poiché questo attira ancora più abbondanza. Nella tua quotidianità, prendi decisioni ponderate e rimani aperto a consigli saggi.",
    "cards.angels.AngedelaProsperite.meaning.var3":
      "L'energia dell'Angelo della Prosperità agisce come una leva per manifestare i tuoi obiettivi finanziari. Ti incoraggia a superare i blocchi legati alla paura o alla scarsità. Questa carta ti ricorda che prosperare non significa solo accumulare beni, ma anche creare un equilibrio tra ricchezza materiale e benessere personale. A livello pratico, organizzati, pianifica le tue finanze e coltiva una visione chiara delle tue ambizioni.",
    "cards.angels.AngedelaGuerison.name": "Angelo della Guarigione",
    "cards.angels.AngedelaGuerison.meaning": "Rimessa in salute e benessere",
    "cards.angels.AngedelaGuerison.meaning.var1":
      "L'Angelo della Guarigione ti avvolge con la sua energia benefica. Ti invita a prenderti cura del tuo corpo e della tua mente con dolcezza e pazienza. Questa carta annuncia un processo di guarigione, sia fisico, emotivo o spirituale. Concretamente, ascolta i bisogni del tuo corpo, riposati e accetta il supporto degli altri.",
    "cards.angels.AngedelaGuerison.meaning.var2":
      "Questa carta simboleggia un periodo favorevole al recupero del tuo benessere. L'Angelo della Guarigione ti incoraggia a lasciar andare i dolori del passato e ad avvicinarti a pratiche che nutrono la tua salute complessiva. Nella tua quotidianità, adotta abitudini sane, medita e permettiti di guarire al tuo ritmo.",
    "cards.angels.AngedelaGuerison.meaning.var3":
      "L'energia dell'Angelo della Guarigione agisce come un catalizzatore per la tua trasformazione interiore. Ti supporta nel liberarti da blocchi e sofferenze profonde. Questa carta ti invita a coltivare la compassione verso te stesso e a riconoscere che la guarigione è un percorso progressivo. Prenditi il tempo di accogliere ogni fase con fiducia.",
    "cards.angels.AngedelaSagesse.name": "Angelo della Saggezza",
    "cards.angels.AngedelaSagesse.meaning":
      "Conoscenza spirituale e discernimento",
    "cards.angels.AngedelaSagesse.meaning.var1":
      "L'Angelo della Saggezza ti invita a cercare la conoscenza oltre le apparenze. Ti aiuta a sviluppare il tuo discernimento e ad ascoltare la tua voce interiore. Questa carta indica un momento favorevole alla riflessione profonda e alla presa di decisioni consapevoli. Concretamente, prendi del tempo per meditare, leggere o studiare argomenti che elevano il tuo spirito.",
    "cards.angels.AngedelaSagesse.meaning.var2":
      "Questa carta annuncia un periodo di risveglio spirituale e chiarezza mentale. L'Angelo della Saggezza ti guida per comprendere le lezioni nascoste nelle tue esperienze. Nella tua vita quotidiana, sii attento ai segni e alle sincronicità che ti orientano. Coltiva la pazienza e l'umiltà nella tua ricerca della verità.",
    "cards.angels.AngedelaSagesse.meaning.var3":
      "L'energia dell'Angelo della Saggezza ti accompagna nel tuo cammino interiore. Ti incoraggia a essere calmo e a esercitare discernimento di fronte alle sfide. Questa carta ti ricorda che la vera saggezza proviene dall'equilibrio tra conoscenza e compassione. A livello pratico, prendi del tempo per fermarti a riflettere, poi condividi le tue scoperte con benevolenza.",
    "cards.angels.AngedelaJoie.name": "Angelo della Gioia",
    "cards.angels.AngedelaJoie.meaning": "Felicità e ottimismo",
    "cards.angels.AngedelaJoie.meaning.var1":
      "L'Angelo della Gioia ti invita ad accogliere la luce e la felicità nella tua vita. Ti ricorda che la gioia è una scelta, anche nei momenti difficili. Questa carta incoraggia a coltivare l'ottimismo e a celebrare le piccole vittorie quotidiane. Concretamente, prendi il tempo di ridere, sorridere e condividere momenti positivi con chi ami.",
    "cards.angels.AngedelaJoie.meaning.var2":
      "Questa carta annuncia un periodo in cui la leggerezza e l'entusiasmo prevalgono. L'Angelo della Gioia ti spinge a liberarti dei pesi emotivi che ti trattengono. Nella tua vita quotidiana, cerca fonti di piacere semplice, come una passeggiata, della musica o un'attività creativa. La gioia è contagiosa, condividila con gli altri.",
    "cards.angels.AngedelaJoie.meaning.var3":
      "L'energia dell'Angelo della Gioia risplende dentro di te, invitandoti a vivere pienamente e a goderti ogni istante. Ti incoraggia a nutrire la tua gratitudine e a vedere il lato positivo anche nelle difficoltà. A livello pratico, crea rituali che portano allegria, come ascoltare la tua canzone preferita o praticare un'attività che ti appassiona. La gioia è un motore potente per il tuo benessere.",
    "cards.angels.AngedelaFoi.name": "Angelo della Fede",
    "cards.angels.AngedelaFoi.meaning": "Fiducia nell'universo e speranza",
    "cards.angels.AngedelaFoi.meaning.var1":
      "L'Angelo della Fede ti invita a fidarti dell'universo e a credere in un futuro migliore. Ti incoraggia a mantenere la speranza anche di fronte alle incertezze. Questa carta ti ricorda che la fede apre porte invisibili e ti guida nel tuo cammino. Concretamente: lascia andare il controllo e accogli le sorprese della vita.",
    "cards.angels.AngedelaFoi.meaning.var2":
      "Questa carta annuncia un periodo in cui la tua fiducia interiore viene rafforzata. L'Angelo della Fede ti aiuta a superare i dubbi e a mantenere la rotta nonostante gli ostacoli. Nella tua quotidianità, pratica la pazienza e l'accettazione, cercando segni che confermino che sei sostenuto. La fede è un ancora potente per andare avanti.",
    "cards.angels.AngedelaFoi.meaning.var3":
      "L'energia dell'Angelo della Fede ti incoraggia a credere in te stesso e nella benevolenza dell'universo. Ti ricorda che anche quando il cammino sembra oscuro, una luce interiore brilla sempre. Concretamente, prendi un momento ogni giorno per rafforzare la tua fiducia con meditazione o preghiera. La fede nutre la tua forza interiore e il tuo coraggio.",
    "cards.angels.AngedelaCreativite.name": "Angelo della Creatività",
    "cards.angels.AngedelaCreativite.meaning":
      "Ispirazione artistica e innovazione",
    "cards.angels.AngedelaCreativite.meaning.var1":
      "L'Angelo della Creatività stimola la tua ispirazione e ti invita a esprimere i tuoi talenti artistici. Ti incoraggia a uscire dagli schemi e a innovare nella tua vita. Questa carta ricorda che la creatività è un mezzo per connetterti con il tuo io più profondo. Concretamente, prenditi il tempo di creare, che sia scrivendo, dipingendo, facendo musica o qualsiasi altra forma di espressione.",
    "cards.angels.AngedelaCreativite.meaning.var2":
      "Questa carta annuncia una fase in cui la tua immaginazione è in pieno risveglio. L'Angelo della Creatività ti incita a esplorare nuove idee e a sperimentare senza paura del giudizio. Nella tua vita quotidiana, concediti dei momenti per sognare e lasciare libero corso alla tua ispirazione. La tua creatività può anche essere una soluzione per risolvere problemi.",
    "cards.angels.AngedelaCreativite.meaning.var3":
      "L'energia dell'Angelo della Creatività ti invita a rinnovare la tua visione e a innovare. Ti ricorda che ogni atto creativo è una forma di trasformazione. Concretamente, inizia un progetto artistico o inventa un nuovo modo di fare le cose. Osa esprimere la tua originalità e nutri la tua passione con entusiasmo.",
    "cards.angels.AngedelaPurification.name": "Angelo della Purificazione",
    "cards.angels.AngedelaPurification.meaning":
      "Pulizia energetica e rinnovamento",
    "cards.angels.AngedelaPurification.meaning.var1":
      "L'Angelo della Purificazione ti aiuta a liberarti dalle energie negative e a purificare corpo e mente. Ti invita a fare una pulizia interiore per ritrovare chiarezza e leggerezza. Concretamente, prenditi il tempo per riorientarti ed eliminare ciò che non ti serve più, che siano pensieri, emozioni o influenze esterne.",
    "cards.angels.AngedelaPurification.meaning.var2":
      "Questa carta annuncia un periodo di rinnovamento in cui sei chiamato a liberarti dai blocchi energetici. L'Angelo della Purificazione ti incoraggia a fare spazio per accogliere il nuovo. Nella tua vita quotidiana, pratica rituali semplici come la meditazione o la rilassamento per rivitalizzarti.",
    "cards.angels.AngedelaPurification.meaning.var3":
      "L'energia dell'Angelo della Purificazione lavora per pulire il tuo spazio personale e la tua mente. Ti ricorda che il rinnovamento passa attraverso un autentico lasciar andare. Concretamente, organizza il tuo ambiente per creare un luogo sano e sereno. Prenditi cura di te stesso con dolcezza e apriti a una nuova energia positiva.",
    "cards.angels.AngedelaCompassion.name": "Angelo della Compassione",
    "cards.angels.AngedelaCompassion.meaning": "Empatia e benevolenza",
    "cards.angels.AngedelaCompassion.meaning.var1":
      "L'Angelo della Compassione ti invita ad aprire il tuo cuore con dolcezza ed empatia verso te stesso e gli altri. Ti ricorda l'importanza della benevolenza nelle tue relazioni. Concretamente, mostra pazienza e comprensione, anche di fronte alle difficoltà o agli errori.",
    "cards.angels.AngedelaCompassion.meaning.var2":
      "Questa carta annuncia un periodo in cui la tua capacità di ascoltare e di provare empatia si rafforza. L'Angelo della Compassione ti incoraggia a supportare chi sta attraversando prove difficili. Nella tua vita quotidiana, offri il tuo aiuto senza giudizio e coltiva tenerezza nelle tue interazioni.",
    "cards.angels.AngedelaCompassion.meaning.var3":
      "L'energia dell'Angelo della Compassione ti accompagna nello sviluppo di un amore incondizionato. Ti ricorda che la vera forza risiede nella dolcezza. Concretamente, pratica gesti d'amore e sostegno e impara a perdonarti con indulgente.",
    "cards.angels.AngedelaTransformation.name": "Angelo della Trasformazione",
    "cards.angels.AngedelaTransformation.meaning":
      "Cambiamenti positivi ed evoluzione",
    "cards.angels.AngedelaTransformation.meaning.var1":
      "L'Angelo della Trasformazione ti accompagna in un processo di cambiamento profondo. Ti invita ad abbracciare le evoluzioni che si presentano, anche se possono sembrare incertezze. Concretamente: lascia andare le vecchie abitudini o credenze che non ti servono più per fare spazio a un rinnovamento positivo.",
    "cards.angels.AngedelaTransformation.meaning.var2":
      "Questa carta annuncia un periodo in cui cambiamenti importanti si verificano nella tua vita. L'Angelo della Trasformazione ti sostiene nell'affrontare queste fasi con fiducia e serenità. Nella tua vita quotidiana, presta attenzione ai segni che ti indicano il percorso da seguire e non temere di prendere decisioni audaci.",
    "cards.angels.AngedelaTransformation.meaning.var3":
      "L'energia dell'Angelo della Trasformazione ti invita ad evolvere in armonia con te stesso. Ti ricorda che ogni passo, anche difficile, è un’opportunità di crescita. Concretamente, accogli i cambiamenti con apertura e adattati con flessibilità per costruire una vita che sia più in sintonia con i tuoi sogni.",
    "cards.angels.AngedelAbondance.name": "Angelo dell'Abbondanza",
    "cards.angels.AngedelAbondance.meaning": "Ricchezza spirituale e materiale",
    "cards.angels.AngedelAbondance.meaning.var1":
      "L'Angelo dell'Abbondanza ti invita a ricevere la ricchezza in tutte le sue forme, sia materiale che spirituale. Ti incoraggia a riconoscere e apprezzare ciò che hai già. Concretamente: coltiva la gratitudine per attrarre ancora più prosperità nella tua vita.",
    "cards.angels.AngedelAbondance.meaning.var2":
      "Questa carta annuncia un periodo in cui i flussi di abbondanza si rafforzano intorno a te. L'Angelo dell'Abbondanza ti ricorda che la tua mentalità è la chiave: resta aperto e fiducioso per ricevere ciò che ti è destinato. Nella tua vita quotidiana, individua le opportunità e agisci con generosità.",
    "cards.angels.AngedelAbondance.meaning.var3":
      "L'energia dell'Angelo dell'Abbondanza ti invita a bilanciare il dare e il ricevere. Ti ricorda che la vera ricchezza risiede nella condivisione e nell'armonia interiore. Concretamente: dai senza aspettarti nulla in cambio e osserva cosa ti restituisce la vita.",
    "cards.angels.AngedelaLiberation.name": "Angelo della Liberazione",
    "cards.angels.AngedelaLiberation.meaning": "Libertà da paure e limitazioni",
    "cards.angels.AngedelaLiberation.meaning.var1":
      "L'Angelo della Liberazione ti aiuta a liberarti dalle paure e dai blocchi che ostacolano la tua crescita. Ti invita a lasciare andare ciò che ti trattiene per andare avanti con più leggerezza. Concretamente: identifica le tue catene invisibili e decidi di romperle.",
    "cards.angels.AngedelaLiberation.meaning.var2":
      "Questa carta annuncia una fase in cui puoi liberarti da limitazioni interiori ed esteriori. L'Angelo della Liberazione ti sostiene nell'avere il coraggio di uscire dalla tua zona di comfort. Nella tua vita quotidiana, affronta le tue paure con coraggio e accogli la novità con fiducia.",
    "cards.angels.AngedelaLiberation.meaning.var3":
      "L'energia dell'Angelo della Liberazione ti invita a vivere nella libertà interiore. Ti ricorda che hai il potere di scegliere i tuoi pensieri e le tue reazioni. Concretamente: pratica il perdono verso te stesso e gli altri per liberarti dai pesi emotivi.",
    "cards.angels.AngedelaGratitude.name": "Angelo della Gratitudine",
    "cards.angels.AngedelaGratitude.meaning": "Riconoscenza e apprezzamento",
    "cards.angels.AngedelaGratitude.meaning.var1":
      "L'Angelo della Gratitudine ti invita a coltivare un cuore riconoscente. Apprezzando pienamente ciò che hai, apri la porta a benedizioni ancora più grandi. Prenditi del tempo ogni giorno per annotare ciò che ti rende felice e ricevi questi doni con gioia.",
    "cards.angels.AngedelaGratitude.meaning.var2":
      "Questa carta segnala un periodo favorevole per riconoscere le piccole e grandi cose che arricchiscono la tua vita. L'Angelo della Gratitudine ti ricorda che questa attitudine positiva attira ancora più abbondanza e pace interiore. Nella tua routine, osserva e celebra ogni momento di felicità.",
    "cards.angels.AngedelaGratitude.meaning.var3":
      "L'energia dell'Angelo della Gratitudine ti spinge a trasformare il tuo sguardo sul mondo. Scegliendo di essere grato, cambi la tua vibrazione e favorisci l'armonia intorno a te. Prova a condividere questa gratitudine con le persone che ami, ciò rafforza i legami e eleva le energie.",
    "cards.angels.AngedelaManifestation.name": "Angelo della Manifestazione",
    "cards.angels.AngedelaManifestation.meaning":
      "Realizzazione di sogni e progetti",
    "cards.angels.AngedelaManifestation.meaning.var1":
      "L'Angelo della Manifestazione ti incoraggia a concentrare la tua energia sui tuoi obiettivi. Visualizzando chiaramente ciò che desideri realizzare, amplifichi la tua capacità di attrarre opportunità. Agisci con fiducia e perseveranza per concretizzare i tuoi sogni.",
    "cards.angels.AngedelaManifestation.meaning.var2":
      "Questa carta annuncia un momento favorevole per trasformare le tue idee in realtà. L'Angelo della Manifestazione ti ricorda che i tuoi pensieri e le tue azioni sono strumenti potenti. Resta allineato con le tue intenzioni e aperto ai segni che ti guidano.",
    "cards.angels.AngedelaManifestation.meaning.var3":
      "L'energia di questo angelo ti spinge a credere nel tuo potenziale creativo. Prendendo decisioni chiare e agendo, ti avvicini alle tue aspirazioni. Coltiva la pazienza e la determinazione, perché ogni passo ti avvicina al successo.",
    "cards.angels.AngedelHarmonie.name": "Angelo dell'Armonia",
    "cards.angels.AngedelHarmonie.meaning":
      "Equilibrio in tutti gli aspetti della vita",
    "cards.angels.AngedelHarmonie.meaning.var1":
      "L'Angelo dell'Armonia ti invita a trovare un equilibrio duraturo tra le tue emozioni, relazioni e impegni. Coltivando la pace interiore e la tolleranza, crei un ambiente sereno che favorisce il benessere e la tranquillità.",
    "cards.angels.AngedelHarmonie.meaning.var2":
      "Questa carta annuncia una fase in cui puoi ristabilire l'equilibrio nella tua vita nonostante le tensioni. L'Angelo dell'Armonia ti consiglia di ascoltare te stesso e gli altri, di agire con gentilezza e di privilegiare la comprensione reciproca per superare i conflitti.",
    "cards.angels.AngedelHarmonie.meaning.var3":
      "L'energia dell'Angelo dell'Armonia ti aiuta a placare le discordie interne ed esterne. Favorendo la moderazione, la pazienza e il rispetto, costruisci relazioni solide e raggiungi una stabilità duratura che ti sostiene in tutti gli aspetti della tua vita.",
    "cards.angels.AngedelaNouvelleVie.name": "Angelo della Nuova Vita",
    "cards.angels.AngedelaNouvelleVie.meaning": "Nuovi inizi e rinascita",
    "cards.angels.AngedelaNouvelleVie.meaning.var1":
      "L'Angelo della Nuova Vita ti invita ad accogliere un nuovo ciclo con apertura e fiducia. È il momento di lasciarti alle spalle il passato per abbracciare opportunità fresche e un profondo rinnovamento nella tua vita.",
    "cards.angels.AngedelaNouvelleVie.meaning.var2":
      "Questa carta annuncia un periodo di trasformazione in cui puoi rinascere completamente. L'Angelo ti sostiene nei tuoi nuovi inizi, ti incoraggia a posare solide fondamenta e a procedere con fede verso un futuro promettente.",
    "cards.angels.AngedelaNouvelleVie.meaning.var3":
      "L'energia dell'Angelo della Nuova Vita ti accompagna nel voltare una pagina importante. Ti ricorda che ogni fine è un nuovo inizio e che dentro di te hai la forza di reinventarti e crescere con serenità.",

    // Horoscope Data Translations - Descriptions
    "horoscope.data.descriptions.aries.0":
      "La tua energia traboccante ti spinge ad agire con audacia oggi. Approfitta per iniziare nuovi progetti.",
    "horoscope.data.descriptions.aries.1":
      "Un incontro inaspettato potrebbe scuotere le tue emozioni. Rimani attento, questa persona potrebbe segnare la tua giornata.",
    "horoscope.data.descriptions.aries.2":
      "Il tuo entusiasmo comunicativo attira l’attenzione. Sii paziente per evitare malintesi.",
    "horoscope.data.descriptions.aries.3":
      "Al lavoro, potrebbe presentarsi un’opportunità. Analizzala attentamente prima di decidere.",
    "horoscope.data.descriptions.aries.4":
      "Attenzione alle tensioni nelle relazioni vicine. Mantieni la calma e favorisci il dialogo per evitare conflitti.",
    "horoscope.data.descriptions.aries.6":
      "La tua spontaneità è un punto di forza, ma evita eccessi o decisioni impulsive che potrebbero causarti problemi.",
    "horoscope.data.descriptions.aries.7":
      "Un’idea originale potrebbe portarti successo e riconoscimento. Non esitare a condividerla e realizzarla.",
    "horoscope.data.descriptions.aries.8":
      "Una verità nascosta potrebbe emergere. Rimani attento e usa queste informazioni saggiamente.",
    "horoscope.data.descriptions.aries.9":
      "I tuoi sforzi costanti cominciano a dare frutti. È il momento di raccogliere i risultati del tuo lavoro.",
    "horoscope.data.descriptions.aries.10":
      "La tua sicurezza naturale attira la fiducia degli altri. Usala per consolidare le relazioni personali e professionali.",
    "horoscope.data.descriptions.aries.11":
      "Una piacevole sorpresa potrebbe illuminare la tua giornata, che sia un incontro, un messaggio o un evento positivo.",
    "horoscope.data.descriptions.aries.12":
      "I tuoi legami di amicizia o familiari si rafforzano. Goditi questi momenti per creare ricordi preziosi.",
    "horoscope.data.descriptions.aries.13":
      "La tua intuizione è particolarmente acuta oggi. Segui i tuoi sentimenti per prendere buone decisioni.",
    "horoscope.data.descriptions.aries.14":
      "Un’energia positiva ti accompagna per tutta la giornata. Usala per avanzare con fiducia e realizzare le tue ambizioni.",
    "horoscope.data.descriptions.taurus.0":
      "La stabilità che cerchi si manifesta finalmente nella tua vita. Goditi questa fase di serenità e le gioie semplici.",
    "horoscope.data.descriptions.taurus.1":
      "Un incontro promettente potrebbe avvenire oggi, portando una bella complicità e emozioni positive da condividere.",
    "horoscope.data.descriptions.taurus.2":
      "Venere ti porta dolcezza e armonia nelle relazioni. Una giornata perfetta per coltivare amore e amicizia.",
    "horoscope.data.descriptions.taurus.3":
      "La tua pazienza e perseveranza portano frutti. I risultati dei tuoi sforzi passati si manifestano oggi.",
    "horoscope.data.descriptions.taurus.4":
      "Le relazioni familiari sono particolarmente armoniose. Approfitta di questo momento per rafforzare i legami con i tuoi cari.",
    "horoscope.data.descriptions.taurus.5":
      "Non trascurare il tuo benessere fisico; prenditi del tempo per rilassarti e fare attività sportiva.",
    "horoscope.data.descriptions.taurus.6":
      "I tuoi talenti artistici sono messi in luce oggi e avrai l'opportunità di esprimerli appieno nei tuoi progetti personali o professionali.",
    "horoscope.data.descriptions.taurus.7":
      "È il momento ideale per concretizzare i tuoi progetti a lungo termine, seguendo i passaggi necessari per raggiungere i tuoi obiettivi con successo.",
    "horoscope.data.descriptions.taurus.8":
      "Il tuo senso pratico e discernimento ti aiutano a evitare molti errori e a prendere decisioni sagge nelle questioni quotidiane.",
    "horoscope.data.descriptions.taurus.9":
      "Si prospetta un periodo di prosperità materiale, offrendo opportunità di guadagni finanziari e stabilità economica se rimani attento.",
    "horoscope.data.descriptions.taurus.10":
      "La tua fedeltà e lealtà nell'amicizia sono riconosciute e apprezzate da chi ti circonda, creando legami ancora più forti e armoniosi.",
    "horoscope.data.descriptions.taurus.11":
      "I piaceri semplici della vita ti portano grande soddisfazione e contribuiscono al tuo benessere emotivo e mentale oggi.",
    "horoscope.data.descriptions.taurus.12":
      "La tua stabilità emotiva rassicura chi ti circonda, e sei visto come un punto di riferimento affidabile e calmante per gli altri.",
    "horoscope.data.descriptions.taurus.13":
      "È una giornata ideale per attività all'aperto, che ti permetteranno di ricaricarti, prendere distanza e ritrovare energia.",
    "horoscope.data.descriptions.taurus.14":
      "I tuoi sforzi passati vengono finalmente premiati e vedrai che la tua perseveranza dà frutti nei tuoi progetti e nelle tue relazioni.",
    "horoscope.data.descriptions.gemini.0":
      "La tua curiosità naturale ti conduce a meravigliose scoperte. Rimani aperto a nuovi incontri e idee innovative.",
    "horoscope.data.descriptions.gemini.1":
      "Si presentano opportunità professionali. Abbi il coraggio di proporre le tue idee innovative, saranno ben accolte.",
    "horoscope.data.descriptions.gemini.2":
      "Mercurio favorisce la tua mente e creatività. Un giorno ideale per comunicare, scrivere o imparare.",
    "horoscope.data.descriptions.gemini.3":
      "La tua capacità di adattarti è straordinaria oggi, approfittane per esplorare nuove opportunità che si presentano.",
    "horoscope.data.descriptions.gemini.4":
      "Fai attenzione all’ambiente che ti circonda, alcune persone potrebbero condividere informazioni importanti con te.",
    "horoscope.data.descriptions.gemini.5":
      "Oggi la tua mente è vivace e curiosa, ma attenzione a malintesi o piccole discussioni che potrebbero sorgere intorno a te.",
    "horoscope.data.descriptions.gemini.6":
      "Una piacevole sorpresa potrebbe illuminare la tua giornata, che si tratti di un incontro, un messaggio o un'idea ispiratrice.",
    "horoscope.data.descriptions.gemini.7":
      "La tua facilità di comunicare attira l'attenzione oggi, ma fai attenzione a non rivelare troppe informazioni o a creare malintesi.",
    "horoscope.data.descriptions.gemini.8":
      "Una conversazione inaspettata cambia il tuo punto di vista e apre nuove prospettive nelle tue relazioni o nei tuoi progetti.",
    "horoscope.data.descriptions.gemini.9":
      "La tua versatilità ti permette di gestire più progetti contemporaneamente senza perdere efficienza o creatività.",
    "horoscope.data.descriptions.gemini.10":
      "Le nuove tecnologie ti aprono nuovi orizzonti e facilitano i tuoi scambi o progetti innovativi.",
    "horoscope.data.descriptions.gemini.11":
      "Il tuo spirito vivace e il tuo senso dell'umorismo alleggeriscono l'atmosfera, attirando gli altri verso di te con carisma e naturalezza.",
    "horoscope.data.descriptions.gemini.12":
      "È un momento perfetto per imparare qualcosa di nuovo ed arricchire le tue conoscenze o competenze.",
    "horoscope.data.descriptions.gemini.13":
      "I tuoi social network e i tuoi contatti ti portano oggi opportunità inaspettate e vantaggiose.",
    "horoscope.data.descriptions.gemini.14":
      "Fai attenzione alle confidenze: un'amicizia potrebbe essere messa alla prova da un malinteso o da un segreto rivelato.",
    "horoscope.data.descriptions.cancer.0":
      "La tua intuizione è particolarmente forte oggi. Segui il tuo cuore, ti guiderà alle decisioni giuste.",
    "horoscope.data.descriptions.cancer.1":
      "Questa giornata potrebbe farti girare la testa. Non lasciarti sopraffare dai piccoli fastidi. Un'energia interiore ti sostiene positivamente, quindi risparmia il tuo sistema nervoso e concediti una pausa dalla routine quotidiana!",
    "horoscope.data.descriptions.cancer.2":
      "Famiglia e amici giocano oggi un ruolo chiave per il tuo benessere. Sii attento e sostienili.",
    "horoscope.data.descriptions.cancer.3":
      "Una piccola pausa di relax può fare bene alla tua energia. Pensa a meditazione o a un bagno rilassante.",
    "horoscope.data.descriptions.cancer.4":
      "La luna illumina la tua sensibilità e rafforza i legami familiari. Un momento speciale per esprimere i tuoi sentimenti.",
    "horoscope.data.descriptions.cancer.5":
      "La tua bontà naturale attira fiducia e rafforza le amicizie. Sei un rifugio per chi ti sta intorno.",
    "horoscope.data.descriptions.cancer.6":
      "Oggi è un giorno perfetto per esprimere le tue emozioni e condividere i tuoi sentimenti con sincerità, rafforzando le tue relazioni.",
    "horoscope.data.descriptions.cancer.7":
      "La tua naturale empatia ti permette di comprendere profondamente gli altri e di offrire loro un supporto prezioso.",
    "horoscope.data.descriptions.cancer.8":
      "Le tue relazioni oggi sono caratterizzate da amicizia e complicità. Cerca l'ascolto e il sostegno di chi ti circonda, restando attento ai loro bisogni così come ai tuoi, senza trascurarne nessuno.",
    "horoscope.data.descriptions.cancer.9":
      "La tua casa diventa un vero rifugio di pace e felicità, ideale per il riposo e la serenità.",
    "horoscope.data.descriptions.cancer.10":
      "Una forte intuizione ti guida verso la decisione giusta, anche in situazioni complesse o incerte.",
    "horoscope.data.descriptions.cancer.11":
      "I ricordi della tua infanzia ti ispirano positivamente e ti ricordano i valori essenziali che ti motivano.",
    "horoscope.data.descriptions.cancer.12":
      "Ti verrà chiesto di mostrare diplomazia, e c'è del positivo da trarne. Attraverso i tuoi hobby preferiti troverai modi per rilassarti. Lascia i tuoi pensieri da parte.",
    "horoscope.data.descriptions.cancer.13":
      "I tuoi legami con nuove conoscenze colmeranno i vuoti e le mancanze che senti. Il tuo gusto marcato per le cose belle potrebbe portarti a qualche eccesso, quindi vai con calma.",
    "horoscope.data.descriptions.cancer.14":
      "Una riconciliazione familiare porta una profonda armonia e crea un clima di pace intorno a te.",
    "horoscope.data.descriptions.leo.0":
      "La tua energia oggi è potente. Usala per completare compiti importanti e influenzare positivamente chi ti circonda.",
    "horoscope.data.descriptions.leo.1":
      "Un incontro potrebbe risvegliare emozioni. Sii aperto ma attento ai tuoi limiti.",
    "horoscope.data.descriptions.leo.2":
      "Il tuo carisma attira l’attenzione. Usalo per rafforzare relazioni o portare avanti progetti.",
    "horoscope.data.descriptions.leo.3":
      "Fai attenzione alla gelosia o alla competizione intorno a te. Mantieni la calma e resta concentrato.",
    "horoscope.data.descriptions.leo.4":
      "Un’idea creativa potrebbe arricchire un progetto. Approfitta dell’energia favorevole per realizzarla.",
    "horoscope.data.descriptions.leo.5":
      "Amore e amicizia sono favoriti. Mostra affetto in modo sincero e aperto.",
    "horoscope.data.descriptions.leo.6":
      "La tua determinazione verrà messa alla prova. Rimani saldo per superare gli ostacoli con successo.",
    "horoscope.data.descriptions.leo.7":
      "Un vecchio problema potrebbe chiarirsi. Sfrutta l’opportunità per ristabilire armonia.",
    "horoscope.data.descriptions.leo.8":
      "Attenzione al sovraccarico. Fare pause ti aiuterà a ricaricare energia e mantenere produttività.",
    "horoscope.data.descriptions.leo.9":
      "Il tuo senso dell’umorismo porta gioia. Condividilo per risolvere tensioni e approfondire relazioni.",
    "horoscope.data.descriptions.leo.10":
      "Potrebbe presentarsi un impulso professionale. Controlla i dettagli prima di prendere decisioni.",
    "horoscope.data.descriptions.leo.11":
      "Una sorpresa potrebbe rendere la giornata più piacevole. Sii aperto alle novità.",
    "horoscope.data.descriptions.leo.12":
      "La tua creatività ispira gli altri. Usala per far progredire progetti o obiettivi personali.",
    "horoscope.data.descriptions.leo.13":
      "La tua passione è percepibile. Motiva te stesso e gli altri a raggiungere risultati positivi.",
    "horoscope.data.descriptions.leo.14":
      "Energia positiva ti accompagna. Usala per rafforzare relazioni e portare avanti progetti.",
    "horoscope.data.descriptions.virgo.0":
      "La tua attenzione ai dettagli oggi dà frutti. Usala per completare compiti in modo efficiente.",
    "horoscope.data.descriptions.virgo.1":
      "Fai attenzione alla salute. Piccoli accorgimenti possono avere grandi effetti.",
    "horoscope.data.descriptions.virgo.2":
      "Il tuo talento organizzativo ti aiuta a gestire progetti e scadenze in modo ottimale.",
    "horoscope.data.descriptions.virgo.3":
      "Qualcuno potrebbe aver bisogno del tuo aiuto. Mostra supporto senza trascurare i tuoi limiti.",
    "horoscope.data.descriptions.virgo.4":
      "La tua capacità analitica risolve un problema che ti preoccupava da tempo.",
    "horoscope.data.descriptions.virgo.5":
      "Un momento di calma rafforza il tuo equilibrio emotivo.",
    "horoscope.data.descriptions.virgo.6":
      "Amore e amicizia sono favoriti. Gestures sincere creano fiducia.",
    "horoscope.data.descriptions.virgo.7":
      "Opportunità professionali possono emergere. Valutale attentamente prima di decidere.",
    "horoscope.data.descriptions.virgo.8":
      "Piccole tensioni potrebbero verificarsi. Mantieni la calma e comunica chiaramente.",
    "horoscope.data.descriptions.virgo.9":
      "La tua precisione impressiona gli altri. Usala per portare a termine progetti con successo.",
    "horoscope.data.descriptions.virgo.10":
      "Si presenta un’occasione per migliorare la tua routine. Sii attento ai dettagli.",
    "horoscope.data.descriptions.virgo.11":
      "La tua premura è apprezzata. Una parola gentile o un gesto fa la differenza.",
    "horoscope.data.descriptions.virgo.12":
      "Un progetto passato potrebbe rinascere. Usa energia e determinazione per fare progressi.",
    "horoscope.data.descriptions.virgo.13":
      "Presta attenzione ai dettagli nelle relazioni. Piccoli gesti creano armonia.",
    "horoscope.data.descriptions.virgo.14":
      "Energia positiva ti accompagna. Segui l’intuizione e agisci con attenzione.",
    "horoscope.data.descriptions.libra.0":
      "Il tuo senso dell’armonia è forte oggi. Usalo per risolvere conflitti e favorire la pace.",
    "horoscope.data.descriptions.libra.1":
      "Un incontro può aprire nuove prospettive. Sii aperto e curioso.",
    "horoscope.data.descriptions.libra.2":
      "La tua diplomazia impressiona gli altri. Usala per evitare malintesi.",
    "horoscope.data.descriptions.libra.3":
      "Amore e amicizia sono favoriti. Mostra sentimenti in modo sincero.",
    "horoscope.data.descriptions.libra.4":
      "Un impulso creativo aiuta a far avanzare progetti o compiti.",
    "horoscope.data.descriptions.libra.5":
      "Attenzione all’equilibrio tra lavoro e vita privata. Brevi pause aiutano a mantenere energia.",
    "horoscope.data.descriptions.libra.6":
      "Si presenta un’occasione di riconciliazione o chiarimento. Usala saggiamente.",
    "horoscope.data.descriptions.libra.7":
      "Il tuo fascino attira attenzione. Rimani autentico per creare legami veri.",
    "horoscope.data.descriptions.libra.8":
      "La tua creatività ispira altri. Metti in pratica le idee per rafforzare progetti o relazioni.",
    "horoscope.data.descriptions.libra.9":
      "Piccoli malintesi possono sorgere. Mantieni calma e comunica chiaramente.",
    "horoscope.data.descriptions.libra.10":
      "Si può presentare un impulso professionale o una nuova opportunità. Controlla i dettagli.",
    "horoscope.data.descriptions.libra.11":
      "La tua pazienza è ricompensata. Un gesto affettuoso può creare armonia.",
    "horoscope.data.descriptions.libra.12":
      "Un’opportunità inaspettata può arricchire la giornata. Rimani aperto al nuovo.",
    "horoscope.data.descriptions.libra.13":
      "Intuizione forte oggi. Seguila nelle decisioni importanti.",
    "horoscope.data.descriptions.libra.14":
      "Energia positiva ti accompagna. Usala per progetti, relazioni e obiettivi personali.",
    "horoscope.data.descriptions.scorpio.0":
      "L’intuizione è particolarmente forte oggi. Segui i tuoi presentimenti in amore e amicizia.",
    "horoscope.data.descriptions.scorpio.1":
      "Una tensione può esplodere nell’ambiente. La franchezza aiuta a calmare gli animi.",
    "horoscope.data.descriptions.scorpio.2":
      "Potresti incontrare qualcuno di intrigante che suscita curiosità ed emozioni.",
    "horoscope.data.descriptions.scorpio.3":
      "La tua determinazione impressiona. Giornata ideale per avanzamenti professionali o chiarimenti.",
    "horoscope.data.descriptions.scorpio.4":
      "Un segreto potrebbe emergere. Anche se sorprendente, aiuta a comprendere meglio gli altri.",
    "horoscope.data.descriptions.scorpio.5":
      "La tua intensità attrae e destabilizza. Usala per rafforzare legami senza eccessi di possessività.",
    "horoscope.data.descriptions.scorpio.6":
      "Può presentarsi una proposta inaspettata. Valutala attentamente prima di accettare.",
    "horoscope.data.descriptions.scorpio.7":
      "Hai bisogno di isolamento per riflettere. Questa introspezione chiarisce priorità ed equilibrio interiore.",
    "horoscope.data.descriptions.scorpio.8":
      "Un progetto o un’idea di lunga data riceve slancio favorevole. La perseveranza porta frutti.",
    "horoscope.data.descriptions.scorpio.9":
      "Attenzione a malintesi amorosi. Esprimi sentimenti con calma e dolcezza.",
    "horoscope.data.descriptions.scorpio.10":
      "Il tuo magnetismo è potente. Potresti attrarre qualcuno importante per i tuoi progetti.",
    "horoscope.data.descriptions.scorpio.11":
      "Gelosia o competizione possono emergere. Proteggi la tua energia evitando conflitti inutili.",
    "horoscope.data.descriptions.scorpio.12":
      "La passione è un motore potente. Non esaurirti: concediti pause per equilibrio emotivo e fisico.",
    "horoscope.data.descriptions.scorpio.13":
      "Una buona notizia può illuminare la giornata: professionale, affettiva o finanziaria.",
    "horoscope.data.descriptions.scorpio.14":
      "Il tuo potere di trasformazione è al massimo. Usa questa energia per chiudere capitoli difficili e aprire nuove strade.",
    "horoscope.data.descriptions.sagittarius.0":
      "Il tuo ottimismo illumina la giornata. Approfittane per nuove iniziative e condividere gioia.",
    "horoscope.data.descriptions.sagittarius.1":
      "Un incontro inaspettato può portare divertimento e nuove prospettive.",
    "horoscope.data.descriptions.sagittarius.2":
      "La tua curiosità ti porta a scoprire nuove opportunità lavorative o personali.",
    "horoscope.data.descriptions.sagittarius.3":
      "Una comunicazione chiara evita malintesi. Esprimi idee e sentimenti apertamente.",
    "horoscope.data.descriptions.sagittarius.4":
      "Avventure e progetti all’aria aperta portano energia e soddisfazione.",
    "horoscope.data.descriptions.sagittarius.5":
      "Attenzione a spese impulsive. Pianifica per mantenere equilibrio finanziario.",
    "horoscope.data.descriptions.sagittarius.6":
      "La tua allegria contagia gli altri. Usa questa energia per rafforzare relazioni.",
    "horoscope.data.descriptions.sagittarius.7":
      "Un viaggio, reale o mentale, porta chiarezza e nuove opportunità.",
    "horoscope.data.descriptions.sagittarius.8":
      "La fortuna ti accompagna in attività creative o professionali. Sfruttala.",
    "horoscope.data.descriptions.sagittarius.9":
      "Relazioni con amici o partner sono favorite. Mostra apertura e sincerità.",
    "horoscope.data.descriptions.sagittarius.10":
      "Un’idea innovativa può emergere. Valutala attentamente e agisci con convinzione.",
    "horoscope.data.descriptions.sagittarius.11":
      "Il tuo spirito libero attira attenzioni positive. Condividi entusiasmo senza forzare situazioni.",
    "horoscope.data.descriptions.sagittarius.12":
      "Una lezione importante può arrivare da un’esperienza insolita. Ascolta con attenzione.",
    "horoscope.data.descriptions.sagittarius.13":
      "La tua energia fisica e mentale è alta. Usa questo slancio per avanzare progetti.",
    "horoscope.data.descriptions.sagittarius.14":
      "Giornata favorevole a esprimere sentimenti e creatività. Approfittane appieno.",
    "horoscope.data.descriptions.capricorn.0":
      "Determinazione e disciplina portano risultati. Mantieni costanza nei tuoi obiettivi.",
    "horoscope.data.descriptions.capricorn.1":
      "Un progetto lavorativo richiede attenzione ai dettagli. La precisione paga.",
    "horoscope.data.descriptions.capricorn.2":
      "Fai attenzione all’equilibrio tra vita privata e lavoro. Pausa necessaria per energia.",
    "horoscope.data.descriptions.capricorn.3":
      "Una responsabilità potrebbe pesare. Affrontala con pragmatismo e serenità.",
    "horoscope.data.descriptions.capricorn.4":
      "Le relazioni beneficiano di gesti concreti e sinceri. Mostra affidabilità e ascolto.",
    "horoscope.data.descriptions.capricorn.5":
      "Un passo avanti in carriera o progetti è possibile. Pianifica bene i dettagli.",
    "horoscope.data.descriptions.capricorn.6":
      "Amicizie e collaborazioni offrono supporto. Accetta consigli senza ostilità.",
    "horoscope.data.descriptions.capricorn.7":
      "Un’occasione di risolvere questioni pratiche si presenta. Approfitta della chiarezza mentale.",
    "horoscope.data.descriptions.capricorn.8":
      "Attenzione a stress e tensioni fisiche. Pause e organizzazione mantengono equilibrio.",
    "horoscope.data.descriptions.capricorn.9":
      "Lavoro e responsabilità richiedono impegno. La tua perseveranza porterà risultati concreti.",
    "horoscope.data.descriptions.capricorn.10":
      "Una decisione importante va ponderata. Non affrettare scelte cruciali.",
    "horoscope.data.descriptions.capricorn.11":
      "Momento favorevole per consolidare rapporti e progetti a lungo termine.",
    "horoscope.data.descriptions.capricorn.12":
      "Piccole soddisfazioni personali rafforzano motivazione e determinazione.",
    "horoscope.data.descriptions.capricorn.13":
      "Fiducia in te stesso e costanza creano opportunità di successo.",
    "horoscope.data.descriptions.capricorn.14":
      "Energia stabile oggi. Approfitta per pianificare e realizzare progetti importanti.",
    "horoscope.data.descriptions.aquarius.0":
      "Creatività e innovazione sono in primo piano. Esplora nuove idee e soluzioni.",
    "horoscope.data.descriptions.aquarius.1":
      "Incontri sociali portano ispirazione. Sii aperto a nuove prospettive.",
    "horoscope.data.descriptions.aquarius.2":
      "Un progetto innovativo può ricevere impulso favorevole. Sfrutta l’energia.",
    "horoscope.data.descriptions.aquarius.3":
      "La tua originalità colpisce gli altri. Condividi intuizioni senza timore.",
    "horoscope.data.descriptions.aquarius.4":
      "Comunicazione chiara evita malintesi. Usa diplomazia e spirito creativo.",
    "horoscope.data.descriptions.aquarius.5":
      "Amicizia e affetto sono stimolati. Mostra disponibilità senza invadenza.",
    "horoscope.data.descriptions.aquarius.6":
      "Una soluzione insolita porta vantaggio. Sii flessibile e aperto a cambiamenti.",
    "horoscope.data.descriptions.aquarius.7":
      "Attività mentali o tecnologiche favoriscono successo. Concentrati su dettagli importanti.",
    "horoscope.data.descriptions.aquarius.8":
      "Momento ideale per apprendere o condividere conoscenze. Sfrutta opportunità.",
    "horoscope.data.descriptions.aquarius.9":
      "Incontri o conversazioni possono aprire nuove porte. Mantieni mente aperta.",
    "horoscope.data.descriptions.aquarius.10":
      "Una decisione sociale o professionale richiede equilibrio tra razionalità e intuizione.",
    "horoscope.data.descriptions.aquarius.11":
      "La tua energia unica ispira chi ti circonda. Usa influenza in modo positivo.",
    "horoscope.data.descriptions.aquarius.12":
      "Idee originali possono cambiare la prospettiva su progetti o relazioni.",
    "horoscope.data.descriptions.aquarius.13":
      "Giornata favorevole a collaborazioni e networking creativo.",
    "horoscope.data.descriptions.aquarius.14":
      "Energia positiva per innovazione e relazioni. Sfrutta opportunità senza esitazioni.",
    "horoscope.data.descriptions.pisces.0":
      "Intuizione e sensibilità sono al massimo. Segui il tuo istinto per decisioni importanti.",
    "horoscope.data.descriptions.pisces.1":
      "Attenzione ai sentimenti altrui. Empatia favorisce armonia e comprensione.",
    "horoscope.data.descriptions.pisces.2":
      "Creatività e immaginazione portano soluzioni sorprendenti. Sfrutta talento artistico o creativo.",
    "horoscope.data.descriptions.pisces.3":
      "Momento favorevole per relazioni profonde e sincerità emotiva.",
    "horoscope.data.descriptions.pisces.4":
      "Rifletti prima di agire in situazioni complesse. Intuizione e calma guidano scelte corrette.",
    "horoscope.data.descriptions.pisces.5":
      "Piccoli gesti di gentilezza rafforzano legami e amicizie.",
    "horoscope.data.descriptions.pisces.6":
      "Un’occasione spirituale o emotiva porta crescita e chiarezza interiore.",
    "horoscope.data.descriptions.pisces.7":
      "Attenzione a illusioni o aspettative irrealistiche. Mantieni equilibrio tra cuore e ragione.",
    "horoscope.data.descriptions.pisces.8":
      "Momento favorevole a creatività, introspezione e sviluppo personale.",
    "horoscope.data.descriptions.pisces.9":
      "La tua empatia è potente. Aiuta chi ha bisogno senza trascurare te stesso.",
    "horoscope.data.descriptions.pisces.10":
      "Una proposta o opportunità può emergere. Valutala con sensibilità e razionalità.",
    "horoscope.data.descriptions.pisces.11":
      "Giornata favorevole a meditazione, riflessione e intuizione personale.",
    "horoscope.data.descriptions.pisces.12":
      "Creatività e immaginazione portano a risultati sorprendenti in progetti o relazioni.",
    "horoscope.data.descriptions.pisces.13":
      "Un momento di dolcezza emotiva rinforza legami e fiducia reciproca.",
    "horoscope.data.descriptions.pisces.14":
      "Energia positiva accompagna intuizione e sentimenti. Approfitta per crescere e creare armonia.",

    // Messaggi finali vari
    "horoscope.message.var1":
      "{genderText} {name}, come {zodiacSign}, hai questa bellissima energia che attira cose positive. Fidati delle stelle e della tua intuizione oggi!",
    "horoscope.message.var2":
      "{genderText} {name}, il tuo segno {zodiacSign} ti porta energia positiva oggi. Lasciati guidare dalle stelle!",
    "horoscope.message.var3":
      "Caro/a {zodiacSign} {name}, le stelle ti sorridono oggi. Goditi questa splendida energia cosmica che ti circonda!",
    "horoscope.message.var4":
      "{genderText} {name}, il tuo {zodiacSign} brilla oggi. Che questa giornata ti porti gioia e serenità!",
    "horoscope.message.var5":
      "Le stelle ti benedicono oggi, {name}. Come {zodiacSign}, sei in perfetta armonia con l’universo!",

    // Variazioni per la compatibilità
    "horoscope.compatibility.var1":
      "Compatibilità: Oggi andrai particolarmente d’accordo con i segni {compatibility}. È il momento ideale per rafforzare le tue relazioni!",
    "horoscope.compatibility.var2":
      "Affinità: I segni {compatibility} oggi vibrano sulla tua stessa lunghezza d’onda. Approfitta di questa armonia!",
    "horoscope.compatibility.var3":
      "Connessioni speciali: {compatibility} saranno i tuoi alleati perfetti oggi. Ti aspetta una bellissima complicità!",
    "horoscope.compatibility.var4":
      "Connessioni cosmiche: L’energia dei segni {compatibility} si armonizza meravigliosamente con la tua. Lasciati trasportare da questa sinergia!",
    "horoscope.compatibility.var5":
      "Armonie astrali: {compatibility} condividono oggi le tue vibrazioni. Questi incontri potrebbero essere magici!",
    "horoscope.compatibility.var6":
      "Complicità stellare: I nativi di {compatibility} comprendono intuitivamente il tuo stato d’animo oggi. Coltiva questi legami preziosi!",
    "horoscope.compatibility.var7":
      "Sinergie planetarie: {compatibility} sono oggi in perfetta risonanza con la tua energia. Sta arrivando una collaborazione fruttuosa!",
    "horoscope.compatibility.var8":
      "Comprensione celeste: {compatibility} condividono oggi la tua visione. È il momento perfetto per approfondire i tuoi scambi!",

    // Variazioni dell'umore
    "horoscope.mood.var1":
      "Il tuo umore oggi: {mood}\nQuesta energia ti accompagnerà per tutta la giornata. Approfittane per fare ciò che ti fa stare bene!",
    "horoscope.mood.var2":
      "Stato d’animo del giorno: {mood}\nLascia che questa vibrazione positiva guidi le tue azioni e decisioni oggi!",
    "horoscope.mood.var3":
      "Energia dominante: {mood}\nÈ il momento perfetto per canalizzare questa forza interiore nei tuoi progetti!",
    "horoscope.mood.var4":
      "Atmosfera cosmica: {mood}\nIrradi questa bella energia che attrae tutte le cose positive verso di te!",
    "horoscope.mood.var5":
      "Vibrazione astrale: {mood}\nQuesto umore speciale colorerà la tua giornata con mille sfumature positive!",
    "horoscope.mood.var6":
      "Influenza planetaria: {mood}\nAbbraccia questa energia unica e lascia che trasformi la tua giornata in qualcosa di straordinario!",

    // Horoscope Data Translations - Moods (French server keys with Italian values)
    "horoscope.data.moods.Énergique": "Energico",
    "horoscope.data.moods.Confiant": "Fiducioso",
    "horoscope.data.moods.Déterminé": "Determinato",
    "horoscope.data.moods.Passionné": "Appassionato",
    "horoscope.data.moods.Optimiste": "Ottimista",
    "horoscope.data.moods.Dynamique": "Dinamico",
    "horoscope.data.moods.Paisible": "Pacifico",
    "horoscope.data.moods.Sensuel": "Sensuale",
    "horoscope.data.moods.Stable": "Stabile",
    "horoscope.data.moods.Généreux": "Generoso",
    "horoscope.data.moods.Patient": "Paziente",
    "horoscope.data.moods.Harmonieux": "Armonioso",
    "horoscope.data.moods.Curieux": "Curioso",
    "horoscope.data.moods.Communicatif": "Comunicativo",
    "horoscope.data.moods.Vif": "Vivace",
    "horoscope.data.moods.Sociable": "Socievole",
    "horoscope.data.moods.Adaptable": "Adattabile",
    "horoscope.data.moods.Créatif": "Creativo",
    "horoscope.data.moods.Émotionnel": "Emotivo",
    "horoscope.data.moods.Protecteur": "Protettivo",
    "horoscope.data.moods.Intuitif": "Intuitivo",
    "horoscope.data.moods.Tendre": "Tenero",
    "horoscope.data.moods.Maternel": "Materno",
    "horoscope.data.moods.Empathique": "Empatico",
    "horoscope.data.moods.Rayonnant": "Raggiante",
    "horoscope.data.moods.Majestueux": "Maestoso",
    "horoscope.data.moods.Charismatique": "Carismatico",
    "horoscope.data.moods.Théâtral": "Teatrale",
    "horoscope.data.moods.Méthodique": "Metodico",
    "horoscope.data.moods.Serviable": "Disponibile",
    "horoscope.data.moods.Précis": "Preciso",
    "horoscope.data.moods.Sage": "Saggio",
    "horoscope.data.moods.Analytique": "Analitico",
    "horoscope.data.moods.Perfectionniste": "Perfezionista",
    "horoscope.data.moods.Raffiné": "Raffinato",
    "horoscope.data.moods.Diplomatique": "Diplomatico",
    "horoscope.data.moods.Équilibré": "Equilibrato",
    "horoscope.data.moods.Artistique": "Artistico",
    "horoscope.data.moods.Charmeur": "Affascinante",
    "horoscope.data.moods.Intense": "Intenso",
    "horoscope.data.moods.Mystérieux": "Misterioso",
    "horoscope.data.moods.Transformateur": "Trasformativo",
    "horoscope.data.moods.Magnétique": "Magnetico",
    "horoscope.data.moods.Profond": "Profondo",
    "horoscope.data.moods.Aventurier": "Avventuroso",
    "horoscope.data.moods.Philosophe": "Filosofico",
    "horoscope.data.moods.Libre": "Libero",
    "horoscope.data.moods.Explorateur": "Esploratore",
    "horoscope.data.moods.Enthousiaste": "Entusiasta",
    "horoscope.data.moods.Ambitieux": "Ambizioso",
    "horoscope.data.moods.Responsable": "Responsabile",
    "horoscope.data.moods.Persévérant": "Perseverante",
    "horoscope.data.moods.Discipliné": "Disciplinato",
    "horoscope.data.moods.Pragmatique": "Pragmatico",
    "horoscope.data.moods.Visionnaire": "Visionario",
    "horoscope.data.moods.Indépendant": "Indipendente",
    "horoscope.data.moods.Humaniste": "Umanitario",
    "horoscope.data.moods.Original": "Originale",
    "horoscope.data.moods.Innovateur": "Innovativo",
    "horoscope.data.moods.Altruiste": "Altruista",
    "horoscope.data.moods.Compassionnel": "Compassionevole",
    "horoscope.data.moods.Spirituel": "Spirituale",
    "horoscope.data.moods.Rêveur": "Sognatore",
    "horoscope.data.moods.Sensible": "Sensibile",

    // Horoscope Data Translations - Colors (French server keys with Italian values)
    "horoscope.data.colors.Rouge": "Rosso",
    "horoscope.data.colors.Orange vif": "Arancione vivace",
    "horoscope.data.colors.Bordeaux": "Bordeaux",
    "horoscope.data.colors.Corail": "Corallo",
    "horoscope.data.colors.Écarlate": "Scarlatto",
    "horoscope.data.colors.Vermillon": "Vermiglione",
    "horoscope.data.colors.Vert émeraude": "Verde smeraldo",
    "horoscope.data.colors.Rose tendre": "Rosa tenue",
    "horoscope.data.colors.Beige doré": "Beige dorato",
    "horoscope.data.colors.Terre de Sienne": "Terra di Siena",
    "horoscope.data.colors.Vert olive": "Verde oliva",
    "horoscope.data.colors.Rose poudré": "Rosa cipria",
    "horoscope.data.colors.Jaune citron": "Giallo limone",
    "horoscope.data.colors.Bleu ciel": "Azzurro cielo",
    "horoscope.data.colors.Argent": "Argento",
    "horoscope.data.colors.Lavande": "Lavanda",
    "horoscope.data.colors.Jaune d'or": "Giallo dorato",
    "horoscope.data.colors.Bleu pervenche": "Azzurro pervinca",
    "horoscope.data.colors.Blanc nacré": "Bianco perlato",
    "horoscope.data.colors.Bleu océan": "Blu oceano",
    "horoscope.data.colors.Argent lunaire": "Argento lunare",
    "horoscope.data.colors.Rose pâle": "Rosa pallido",
    "horoscope.data.colors.Perle": "Perla",
    "horoscope.data.colors.Bleu laiteux": "Blu latte",
    "horoscope.data.colors.Or": "Oro",
    "horoscope.data.colors.Orange solaire": "Arancione solare",
    "horoscope.data.colors.Jaune impérial": "Giallo imperiale",
    "horoscope.data.colors.Rouge royal": "Rosso reale",
    "horoscope.data.colors.Doré": "Dorato",
    "horoscope.data.colors.Ambre": "Ambra",
    "horoscope.data.colors.Beige naturel": "Beige naturale",
    "horoscope.data.colors.Gris perle": "Grigio perla",
    "horoscope.data.colors.Bleu marine": "Blu marino",
    "horoscope.data.colors.Taupe": "Taupe",
    "horoscope.data.colors.Kaki": "Kaki",
    "horoscope.data.colors.Rose pastel": "Rosa pastello",
    "horoscope.data.colors.Vert menthe": "Verde menta",
    "horoscope.data.colors.Ivoire": "Avorio",
    "horoscope.data.colors.Lilas": "Lilac",
    "horoscope.data.colors.Bleu poudré": "Blu polvere",
    "horoscope.data.colors.Rouge bordeaux": "Rosso bordeaux",
    "horoscope.data.colors.Noir profond": "Nero profondo",
    "horoscope.data.colors.Pourpre": "Porpora",
    "horoscope.data.colors.Grenat": "Granato",
    "horoscope.data.colors.Cramoisi": "Cremisi",
    "horoscope.data.colors.Brun acajou": "Mogano marrone",
    "horoscope.data.colors.Bleu turquoise": "Turchese blu",
    "horoscope.data.colors.Violet royal": "Viola reale",
    "horoscope.data.colors.Orange mandarine": "Arancione mandarino",
    "horoscope.data.colors.Vert forêt": "Verde foresta",
    "horoscope.data.colors.Indigo": "Indaco",
    "horoscope.data.colors.Cobalt": "Cobalto",
    "horoscope.data.colors.Gris anthracite": "Grigio antracite",
    "horoscope.data.colors.Marron chocolat": "Marrone cioccolato",
    "horoscope.data.colors.Vert foncé": "Verde scuro",
    "horoscope.data.colors.Bleu nuit": "Blu notte",
    "horoscope.data.colors.Sépia": "Seppia",
    "horoscope.data.colors.Vert sapin": "Verde abete",
    "horoscope.data.colors.Bleu électrique": "Blu elettrico",
    "horoscope.data.colors.Argent métallique": "Argento metallico",
    "horoscope.data.colors.Turquoise": "Turchese",
    "horoscope.data.colors.Violet": "Viola",
    "horoscope.data.colors.Néon": "Neon",
    "horoscope.data.colors.Cyan": "Ciano",
    "horoscope.data.colors.Vert aqua": "Verde acqua",
    "horoscope.data.colors.Violet mystique": "Viola mistico",
    "horoscope.data.colors.Blanc perle": "Bianco perla",
    "horoscope.data.colors.Bleu lagon": "Blu laguna",
    "horoscope.data.colors.Vert d'eau": "Verde acquatico",

    // Horoscope Data Translations - Compatibility (French server keys with Italian values)
    "horoscope.data.compatibility.Lion, Sagittaire": "Leone, Sagittario",
    "horoscope.data.compatibility.Gémeaux, Verseau": "Gemelli, Acquario",
    "horoscope.data.compatibility.Balance, Lion": "Bilancia, Leone",
    "horoscope.data.compatibility.Verseau, Gémeaux": "Acquario, Gemelli",
    "horoscope.data.compatibility.Sagittaire, Balance": "Sagittario, Bilancia",
    "horoscope.data.compatibility.Lion, Verseau": "Leone, Acquario",
    "horoscope.data.compatibility.Vierge, Capricorne": "Vergine, Capricorno",
    "horoscope.data.compatibility.Cancer, Poissons": "Cancro, Pesci",
    "horoscope.data.compatibility.Scorpion, Vierge": "Scorpione, Vergine",
    "horoscope.data.compatibility.Capricorne, Cancer": "Capricorno, Cancro",
    "horoscope.data.compatibility.Poissons, Scorpion": "Pesci, Scorpione",
    "horoscope.data.compatibility.Vierge, Poissons": "Vergine, Pesci",
    "horoscope.data.compatibility.Balance, Verseau": "Bilancia, Acquario",
    "horoscope.data.compatibility.Bélier, Lion": "Ariete, Leone",
    "horoscope.data.compatibility.Verseau, Bélier": "Acquario, Ariete",
    "horoscope.data.compatibility.Sagittaire, Gémeaux": "Sagittario, Gemelli",
    "horoscope.data.compatibility.Balance, Bélier": "Bilancia, Ariete",
    "horoscope.data.compatibility.Scorpion, Poissons": "Scorpione, Pesci",
    "horoscope.data.compatibility.Taureau, Vierge": "Toro, Vergine",
    "horoscope.data.compatibility.Capricorne, Scorpion":
      "Capricorno, Scorpione",
    "horoscope.data.compatibility.Poissons, Taureau": "Pesci, Toro",
    "horoscope.data.compatibility.Bélier, Sagittaire": "Ariete, Sagittario",
    "horoscope.data.compatibility.Gémeaux, Balance": "Gemelli, Bilancia",
    "horoscope.data.compatibility.Bélier, Gémeaux": "Ariete, Gemelli",
    "horoscope.data.compatibility.Verseau, Lion": "Acquario, Leone",
    "horoscope.data.compatibility.Sagittaire, Bélier": "Sagittario, Ariete",
    "horoscope.data.compatibility.Gémeaux, Lion": "Gemelli, Leone",
    "horoscope.data.compatibility.Cancer, Scorpion": "Cancro, Scorpione",
    "horoscope.data.compatibility.Vierge, Cancer": "Vergine, Cancro",
    "horoscope.data.compatibility.Scorpion, Capricorne":
      "Scorpione, Capricorno",
    "horoscope.data.compatibility.Cancer, Vierge": "Cancro, Vergine",
    "horoscope.data.compatibility.Cancer, Taureau": "Cancro, Toro",
    "horoscope.data.compatibility.Vierge, Scorpion": "Vergine, Scorpione",
    "horoscope.data.compatibility.Poissons, Cancer": "Pesci, Cancro",
    "horoscope.data.compatibility.Taureau, Poissons": "Toro, Pesci",
    "horoscope.data.compatibility.Cancer, Capricorne": "Cancro, Capricorno",
    "horoscope.data.compatibility.Lion, Balance": "Leone, Bilancia",
    "horoscope.data.compatibility.Balance, Sagittaire": "Bilancia, Sagittario",
    "horoscope.data.compatibility.Gémeaux, Sagittaire": "Gemelli, Sagittario",

    // ITALIANO - Tutte le nuove traduzioni per le variazioni

    // ========== SALUTI VARIATI ==========

    // Lettura giornaliera - varianti
    "interpretation.daily.greeting.var1":
      "Ciao {name}! Ho un messaggio speciale per te oggi.",
    "interpretation.daily.greeting.var2":
      "Ehi {name}! La tua guida quotidiana ti aspetta con impazienza.",
    "interpretation.daily.greeting.var3":
      "Hello {name}! Una bella energia ti accompagna oggi.",
    "interpretation.daily.greeting.var4":
      "Buongiorno {name}! Le energie cosmiche hanno preparato qualcosa per te.",

    // Tarocchi - varianti
    "interpretation.tarot.greeting.var1":
      "Ehi {name}! La tua lettura dei Tarocchi rivela aspetti affascinanti della tua vita.",
    "interpretation.tarot.greeting.var2":
      "Hello {name}! Le carte dei Tarocchi hanno messaggi potenti per te.",
    "interpretation.tarot.greeting.var3":
      "Buongiorno {name}! La tua lettura dei Tarocchi svela verità importanti.",
    "interpretation.tarot.greeting.var4":
      "Ciao {name}! Gli arcani dei Tarocchi parlano chiaramente del tuo futuro.",

    // Angeli - varianti
    "interpretation.angels.greeting.var1":
      "Ciao {name}! Il regno angelico trabocca di messaggi d'amore per te.",
    "interpretation.angels.greeting.var2":
      "Ehi {name}! Le tue guide celesti illuminano il tuo cammino oggi.",
    "interpretation.angels.greeting.var3":
      "Hello {name}! Gli angeli cantano melodie di guida specialmente per te.",
    "interpretation.angels.greeting.var4":
      "Buongiorno {name}! Una sinfonia angelica risuona nelle sfere celesti per te.",

    // Rune - varianti
    "interpretation.runes.greeting.var1":
      "Heil {name}! Le rune degli antichi parlano della tua eredità vichinga.",
    "interpretation.runes.greeting.var2":
      "Ciao {name}! L'eco degli dei nordici risuona attraverso queste rune sacre.",
    "interpretation.runes.greeting.var3":
      "Buongiorno {name}! Le rune millenarie rivelano la forza che dorme in te.",
    "interpretation.runes.greeting.var4":
      "Hello {name}! La saggezza dei Vichinghi attraversa i secoli per guidarti.",

    // ========== TRANSIZIONI VARIATE ==========

    // Transizioni per il passato
    "interpretation.transition.past.var1":
      "Queste esperienze ti hanno davvero fatto crescere e ti hanno reso più forte{genderSuffix}.",
    "interpretation.transition.past.var2":
      "Questi momenti hanno forgiato il tuo carattere e la tua resilienza.",
    "interpretation.transition.past.var3":
      "Tutto ciò ha contribuito a plasmare la persona che sei diventat{genderSuffix}.",
    "interpretation.transition.past.var4":
      "Queste prove ti hanno dato una saggezza preziosa.",
    "interpretation.transition.past.var5":
      "È grazie a queste esperienze che hai sviluppato la tua forza interiore.",
    "interpretation.transition.past.var6":
      "Questi eventi ti hanno insegnato lezioni importanti sulla vita.",
    "interpretation.transition.past.var7":
      "Tutto questo vissuto ha arricchito la tua anima e la tua esperienza.",
    "interpretation.transition.past.var8":
      "Queste sfide hanno rivelato la tua vera natura e determinazione.",

    // Transizioni per il presente
    "interpretation.transition.present.var1":
      "Sei in un periodo importante che annuncia belle cose per il futuro.",
    "interpretation.transition.present.var2":
      "Questa fase della tua vita apre prospettive promettenti.",
    "interpretation.transition.present.var3":
      "È un momento chiave che prepara il tuo futuro radioso.",
    "interpretation.transition.present.var4":
      "Questo periodo attuale pone le basi del tuo successo futuro.",
    "interpretation.transition.present.var5":
      "Vivi una transizione che trasformerà positivamente la tua vita.",
    "interpretation.transition.present.var6":
      "Questo momento presente è portatore di grandi promesse.",
    "interpretation.transition.present.var7":
      "Questa tappa segna una svolta positiva nella tua esistenza.",
    "interpretation.transition.present.var8":
      "Attraversi una fase che ti porterà molta soddisfazione.",

    // Transizioni per il futuro
    "interpretation.transition.future.var1":
      "Questa energia trasformerà la tua vita in modo positivo e duraturo.",
    "interpretation.transition.future.var2":
      "Queste influenze porteranno cambiamenti meravigliosi nella tua vita.",
    "interpretation.transition.future.var3":
      "Questa forza creerà opportunità straordinarie per te.",
    "interpretation.transition.future.var4":
      "Queste vibrazioni attireranno tutto ciò di cui hai bisogno.",
    "interpretation.transition.future.var5":
      "Questa energia manifesterà i tuoi sogni più cari.",
    "interpretation.transition.future.var6":
      "Queste influenze divine illumineranno il tuo cammino.",
    "interpretation.transition.future.var7":
      "Questo potere sbloccherà il tuo potenziale nascosto.",
    "interpretation.transition.future.var8":
      "Queste energie sincronizzeranno tutti gli aspetti della tua vita.",

    // ========== CONSIGLI VARIATI ==========

    "interpretation.advice.var1":
      "fidati del tuo istinto. Hai tutto quello che serve per riuscire!",
    "interpretation.advice.var2":
      "ascolta la tua saggezza interiore. Non ti tradirà mai!",
    "interpretation.advice.var3":
      "segui il tuo cuore e le tue intuizioni. Ti guidano verso la felicità!",
    "interpretation.advice.var4":
      "rimani conness{genderSuffix} ai tuoi valori. Sono la tua migliore guida!",
    "interpretation.advice.var5":
      "mantieni fede nelle tue capacità. Sei più forte{genderSuffix} di quanto pensi!",
    "interpretation.advice.var6":
      "rimani apert{genderSuffix} alle opportunità. L'universo lavora per te!",
    "interpretation.advice.var7":
      "coltiva la tua pazienza. Tutto arriva al momento perfetto!",
    "interpretation.advice.var8":
      "mantieni la tua determinazione. I tuoi sforzi saranno ricompensati!",
    "interpretation.advice.var9":
      "preserva il tuo ottimismo. Attira le migliori energie!",
    "interpretation.advice.var10":
      "nutri la tua fiducia. È la chiave di tutti i tuoi successi!",

    //Chiave delle variazioni di traduzione
    "interpretation.tarot.template.advice.var1":
      "Il mio consiglio: {name}, con la tua natura da {zodiacSign},",
    "interpretation.tarot.template.advice.var2":
      "{genderText} {name}, in quanto {zodiacSign},",
    "interpretation.tarot.template.advice.var3":
      "Ascolta bene, {name}: come {zodiacSign},",
    "interpretation.tarot.template.advice.var4":
      "Ricorda questo, {name}, la tua essenza da {zodiacSign} è potente.",
    "interpretation.tarot.template.advice.var5":
      "{name}, le stelle parlano attraverso la tua natura da {zodiacSign}.",
    "interpretation.tarot.template.advice.var6":
      "Ricorda, {name}: il tuo segno {zodiacSign} contiene una verità essenziale.",
    "interpretation.tarot.template.advice.var7":
      "{genderText} {name}, il tuo destino vibra con l’energia del {zodiacSign}.",
    "interpretation.tarot.template.advice.var8":
      "Sappi questo, {name}, in quanto {zodiacSign}, porti con te una luce unica.",

    // Template per il messaggio finale
    "interpretation.angels.template.message.var1":
      "Messaggio angelico: {genderText} {name}, con la tua essenza da {zodiacSign}",
    "interpretation.angels.template.message.var2":
      "Gli angeli ti parlano, {name}: in quanto {zodiacSign}",
    "interpretation.angels.template.message.var3":
      "Guida celeste, {name}: come un vero {zodiacSign}",
    "interpretation.angels.template.message.var4":
      "Benedizione angelica, {name}, la tua natura da {zodiacSign} risplende",
    "interpretation.angels.template.message.var5":
      "{name}, gli angeli onorano la tua luce da {zodiacSign}.",
    "interpretation.angels.template.message.var6":
      "Ascolta, {name}: la tua anima da {zodiacSign} riceve un messaggio divino.",
    "interpretation.angels.template.message.var7":
      "Messaggio celeste per te, {name} — come {zodiacSign}, sei guidat{genderSuffix}.",
    "interpretation.angels.template.message.var8":
      "I regni celesti ti sussurrano, {name}: la tua essenza da {zodiacSign} è in risveglio.",

    // Crystal Ball Italian
    "crystalBall.title": "Sfera di Cristallo Mistica",
    "crystalBall.subtitle": "Fai la tua domanda e lascia che la magia ti guidi",
    "crystalBall.askPrompt": "Qual è la tua domanda?",
    "crystalBall.questionPlaceholder": "Scrivi qui la tua domanda...",
    "crystalBall.submitQuestion": "Consulta la Sfera",
    "crystalBall.thinking": "La sfera sta riflettendo...",
    "crystalBall.guidance":
      "Ascolta la tua intuizione per interpretare questo messaggio",
    "crystalBall.askAnother": "Fai un'altra domanda",
    "crystalBall.newQuestion": "Fai un'altra domanda",
      "crystalBall.backHome": "🏠 Torna alla home",
    "crystalBall.closedQuestionHint": "Cosa vuoi sapere? Chiedi alla sfera di cristallo… ma attenzione: risponde solo sì o no...",
    "crystalBall.example.good": "Es.: Troverò l'amore quest'anno?",
    
    // Italiano
    "oracle.crystalBall.title": "Sfera di Cristallo",
    "oracle.crystalBall.description": "Fai le tue domande alla sfera mistica",

    // Risposte Crystal Ball Italian
    "crystalBall.answers.yes": "Sì",
    "crystalBall.answers.no": "No",
    "crystalBall.answers.maybe": "Forse",
    "crystalBall.answers.veryLikely": "Molto probabile",
    "crystalBall.answers.unlikely": "Poco probabile",
    "crystalBall.answers.certain": "È certo",
    "crystalBall.answers.noChance": "Nessuna possibilità",
    "crystalBall.answers.askLater": "La risposta arriverà a tempo debito",
    "crystalBall.answers.dontCount": "Non farci affidamento",
    "crystalBall.answers.yesDefinitely": "Sì, assolutamente",
    "crystalBall.answers.signsYes": "I segni indicano di sì",
    "crystalBall.answers.signsNo": "I segni indicano di no",
    "crystalBall.answers.unclear": "È troppo presto per dirlo",
    "crystalBall.answers.trustIntuition": "Fidati della tua intuizione",

    // Messaggio finale Crystal Ball Italian
    "interpretation.dailyComplete": "La tua lettura quotidiana è terminata",
    "interpretation.timeUntilReset":
      "Prossima lettura disponibile tra {hours}h{minutes}min",
    "interpretation.consultCrystalBall": "Consulta la Sfera di Cristallo",
    "common.backHome": "Torna alla home",
    "crystalBall.disclaimer":
      "Le risposte della sfera di cristallo sono simboliche e destinate all'intrattenimento. Ascolta sempre il tuo cuore e i tuoi cari per le scelte della tua vita reale.",

    // GRIMOIRE MYSTIQUE
    "grimoire.title": "Grimorio Mistico",
    "grimoire.free.title": "Versione gratuita: Ultimi 3 consulti salvati",
    "grimoire.free.subtitle": "Passa a Premium per una cronologia illimitata!",
    "grimoire.premium.active": "Accesso Premium attivato - Cronologia illimitata",
    "grimoire.empty.title": "Nessun consulto salvato",
    "grimoire.empty.subtitle": "Inizia la tua prima consultazione per riempire il tuo grimorio mistico",
    "grimoire.cards.title": "Carte estratte:",
    "grimoire.interpretation.show": "Mostra l'interpretazione completa",
    "grimoire.interpretation.hide": "Nascondi l'interpretazione completa",
    "grimoire.notes.title": "Note personali",
    "grimoire.notes.placeholder": "Aggiungi i tuoi pensieri...",
    "grimoire.favorite.add": "Aggiungi ai preferiti",
    "grimoire.favorite.remove": "Rimuovi dai preferiti",
    "grimoire.oracle.daily": "Tiro giornaliero",
    "grimoire.oracle.tarot": "Tarocchi",
    "grimoire.oracle.angels": "Oracolo degli Angeli",
    "grimoire.oracle.runes": "Rune Vichinghe",
    "grimoire.stats.total": "Totale",
      "grimoire.stats.thisMonth": "Questo mese",
      "grimoire.clearAll.button": "Cancella tutto",
      "grimoire.clearAll.confirm.title": "Sei sicuro?",
      "grimoire.clearAll.confirm.message": "Questa azione è irreversibile. Tutte le tue letture saranno eliminate definitivamente.",
      "grimoire.clearAll.confirm.button": "Sì, cancella tutto",

    // MENU LÉGAL
    "legal.menu.title": "Menu legale",
    "legal.mentions": "Note legali",
    "legal.privacy": "Informativa sulla privacy",

    // MODALE PREMIUM
    "premium.button.label": "Diventa Premium",
    "premium.title": "Rimuovi le pubblicità!",
    "premium.subtitle": "Fai le tue letture senza pubblicità!",
    "premium.plan.1month": "1 Mese",
    "premium.plan.1month.subtitle": "Senza impegno",
    "premium.plan.3months": "3 Mesi",
    "premium.plan.3months.subtitle": "Migliore offerta",
    "premium.plan.discount": "-25%",
    "premium.button.subscribe": "Abbonati ora",
    "premium.button.select": "Seleziona un'offerta",
    "premium.button.processing": "Elaborazione...",
    "premium.benefits.ads": "Nessuna pubblicità",
    "premium.benefits.grimoire": "Grimorio Mistico illimitato",
    "premium.benefits.notes": "Note e preferiti",
    "premium.benefits.history": "Cronologia completa delle tue letture",
    "premium.confirm.1month": "Confermare il pagamento di 3,99 € per 1 mese?",
    "premium.confirm.3months": "Confermare il pagamento di 8,98 € per 3 mesi?",
    "premium.success": "Abbonamento attivato con successo! Goditi un’esperienza senza pubblicità e il Grimorio illimitato.",
    "premium.error.activation": "Errore durante l’attivazione dell’abbonamento",
    "premium.error.payment": "Errore durante il pagamento. Riprova.",
    "premium.manage": "Gestisci il mio abbonamento (annulla, fatture...)",
    "premium.expired": "Il tuo accesso Premium è scaduto",
    "premium.expiringSoon": "Il tuo accesso Premium sta per scadere",
    "premium.conditions.line1": "🔒 Pagamento sicuro tramite Stripe",
    "premium.conditions.line2": "✓ Pagamento una tantum, SENZA rinnovo automatico",
    "premium.conditions.line3": "Nessun rimborso dopo il pagamento. L'accesso Premium è valido per la durata scelta.",
    "premium.conditions.line4": "Riceverai una notifica 3 giorni prima della scadenza del tuo accesso.",
    "premium.securePaymentBy": "Pagamento sicuro tramite",
    "premium.restoreSubscription": "Ripristina un abbonamento",
    "premium.backToPurchases": "Torna agli acquisti",
    "premium.payment.googlePlay": "Pagamento Google Play",
    "premium.payment.stripe": "Pagamento web Stripe",
    "premium.restoreEmailLabel": "La tua email",
    "premium.restore": "Ripristina",
    "premium.buy": "Acquista",
    "premium.error.invalidEmail": "L'indirizzo email non è valido.",
    "premium.error.noActivePremium": "Nessun abbonamento attivo trovato",

    // PREMIUM RESTOR
    "premium.restore.title": "Ripristina il mio abbonamento",
    "premium.restore.subtitle": "Già Premium? Recupera il tuo accesso",
    "premium.restore.description": "Inserisci l'email utilizzata al momento dell'acquisto di Premium",
    "premium.restore.button": "Ripristina",
    "premium.restore.verifying": "Verifica in corso...",
    "premium.restore.success": "Premium ripristinato con successo!",
    "premium.restore.redirecting": "Reindirizzamento in corso...",
    "premium.restore.notFound": "Nessun abbonamento Premium trovato per questa email. Controlla l'indirizzo o sottoscrivi un nuovo abbonamento.",
    "premium.restore.error": "Si è verificato un errore durante il ripristino. Riprova.",
    "premium.restore.info": "Devi utilizzare la stessa email usata per acquistare Premium su Stripe.",
    "premium.restore.help": "Hai bisogno di aiuto?",
    "premium.restore.contact": "Contattaci",
    "premium.error.emailRequired": "L'email è richiesta.",
    "premium.error.emailInvalid": "L'email non è valida.",
    "premium.emailLabel": "La tua email",
    "premium.emailHelp": "Per recuperare il tuo abbonamento",
    "premium.poweredBy": 'Powered by',
    "premium.backToPurchase": "Torna agli acquisti",
    "premium.button.loading": "Caricamento...",
    "premium.loading.offers": "Caricamento delle offerte...",
    "premium.button.restoring": "Ripristino...",
    "premium.error.loadFailed": "Impossibile caricare le offerte",
    "premium.error.purchaseFailed": "Errore durante l'acquisto",
    "premium.error.unknown": "Errore sconosciuto",

    // PAGE PAIEMENT SUCESS CANCEL
    "payment.success.title": "Pagamento riuscito!",
    "payment.success.verified": "Il tuo account Premium è stato attivato",
    "payment.success.activating": "Attivazione in corso...",
    "payment.success.benefits": "Goditi tutte le funzionalità Premium!",
    "payment.success.noAds": "Senza pubblicità",
    "payment.success.unlimitedGrimoire": "Grimorio illimitato",
    "payment.success.fullHistory": "Cronologia completa",
    "payment.success.redirecting": "Reindirizzamento automatico agli oracoli...",
    "payment.cancel.title": "Pagamento annullato",
    "payment.cancel.message": "Hai annullato il pagamento",
    "payment.cancel.retry": "Puoi riprovare in qualsiasi momento dal menu Premium",
    "payment.cancel.redirecting": "Ritorno alla selezione degli oracoli...",

    // Mystery Dice Oracle
    "oracle.bonusRoll.title": "Lancio Bonus",
      "oracle.bonusRoll.description": "Sblocca la tua rivelazione numerologica segreta",
      "oracle.bonusRoll.ready": "Pronto a scoprire il tuo messaggio bonus?",
      "oracle.bonusRoll.rolling": "🎲 Lancio dei dadi mistici...",
      "oracle.bonusRoll.loadingAd": "📢 Sblocco della tua rivelazione...",
      "oracle.bonusRoll.result": "Risultato",
      "oracle.bonusRoll.cosmicMessage": "Il tuo messaggio bonus",
      "oracle.bonusRoll.rollButton": "🎲 Lancia i dadi",
      "oracle.bonusRoll.newRoll": "✨ Nuovo Lancio Bonus",
      "oracle.bonusRoll.diceResult": "Dadi",
    "oracle.bonusRoll.startButton": "🎁 Sblocca il Tiro Bonus",
    "oracle.bonusRoll.exclusiveBadge": 'BONUS ESCLUSIVO',
    "oracle.bonusRoll.adRequired": "Devi guardare la pubblicità completa per accedere al Tiro Bonus.",
    "oracle.bonusRoll.badge": "BONUS ESCLUSIVO",
    "oracle.bonusRoll.pleaseWait": "Un momento per favore",
   
    "oracle.bonusRoll.2.title.1": "🌅 Nuovo Inizio",
    "oracle.bonusRoll.2.message.1": "Le stelle si allineano per un nuovo inizio. La doppia fortuna ti accompagna oggi!",
    "oracle.bonusRoll.2.title.2": "✨ Rinascita Cosmica",
    "oracle.bonusRoll.2.message.2": "Un nuovo ciclo inizia nella tua vita. L'universo ti offre una seconda occasione straordinaria.",
    "oracle.bonusRoll.2.title.3": "🦋 Trasformazione Dolce",
    "oracle.bonusRoll.2.message.3": "La dualità del 2 ti invita all'equilibrio. Una nuova pagina si apre davanti a te: girala con fiducia.",

    "oracle.bonusRoll.3.title.1": "🔮 Intuizione Divina",
    "oracle.bonusRoll.3.message.1": "Il tuo sesto senso è al massimo. Segui la tua intuizione, non ti ingannerà.",
    "oracle.bonusRoll.3.title.2": "👁️ Visione Mistica",
    "oracle.bonusRoll.3.message.2": "I veli si sollevano sulla tua percezione. La tua chiaroveggenza raggiunge vette senza pari.",
    "oracle.bonusRoll.3.title.3": "🌙 Saggezza Interiore",
    "oracle.bonusRoll.3.message.3": "Il triangolo sacro del 3 illumina il tuo cammino. Corpo, mente e anima sono oggi uno.",

    "oracle.bonusRoll.4.title.1": "🏛️ Fondamenta Solide",
    "oracle.bonusRoll.4.message.1": "Stabilità e fiducia sono i tuoi alleati. Le tue basi sono solide: costruisci con sicurezza.",
    "oracle.bonusRoll.4.title.2": "⚓ Ancoraggio Potente",
    "oracle.bonusRoll.4.message.2": "La tua stabilità è la tua forza. Costruisci ora qualcosa di duraturo.",
    "oracle.bonusRoll.4.title.3": "🗿 Struttura Divina",
    "oracle.bonusRoll.4.message.3": "I quattro elementi ti sostengono. La tua determinazione è una vera forza.",

    "oracle.bonusRoll.5.title.1": "✨ Opportunità Magiche",
    "oracle.bonusRoll.5.message.1": "Il cambiamento porta sorprese inattese. Rimani aperto a nuove possibilità.",
    "oracle.bonusRoll.5.title.2": "🌪️ Vento di Cambiamento",
    "oracle.bonusRoll.5.message.2": "Una trasformazione ti attende. Accogli ciò che arriva con fiducia e coraggio.",
    "oracle.bonusRoll.5.title.3": "🎭 Libertà Creativa",
    "oracle.bonusRoll.5.message.3": "Il numero 5 porta grande liberazione. Il tuo spirito avventuroso può finalmente esprimersi.",

    "oracle.bonusRoll.6.title.1": "⚖️ Armonia Perfetta",
    "oracle.bonusRoll.6.message.1": "L'equilibrio regna nella tua vita. Goditi questo periodo di pace e armonia.",
    "oracle.bonusRoll.6.title.2": "🕊️ Serenità Assoluta",
    "oracle.bonusRoll.6.message.2": "La tua anima è immersa nella tranquillità. Goditi questo momento di grazia cosmica.",
    "oracle.bonusRoll.6.title.3": "💝 Amore Universale",
    "oracle.bonusRoll.6.message.3": "Il numero dell'amore ti avvolge. Relazioni e connessioni fioriscono sotto il tuo sguardo benevolo.",

    "oracle.bonusRoll.7.title.1": "🍀 Fortuna Mistica",
    "oracle.bonusRoll.7.message.1": "Il numero fortunato ti sorride! Aspettati piacevoli sorprese.",
    "oracle.bonusRoll.7.title.2": "🎰 Fortuna Divina",
    "oracle.bonusRoll.7.message.2": "I dadi del destino cadono a tuo favore. La provvidenza ti benedice oggi.",
    "oracle.bonusRoll.7.title.3": "🌠 Magia Celeste",
    "oracle.bonusRoll.7.message.3": "Il 7 è un numero sacro. L'universo lavora miracolosamente a tuo favore.",

    "oracle.bonusRoll.8.title.1": "💎 Abbondanza Cosmica",
    "oracle.bonusRoll.8.message.1": "Successo e prosperità ti circondano. L'universo premia i tuoi sforzi.",
    "oracle.bonusRoll.8.title.2": "👑 Prosperità Infinita",
    "oracle.bonusRoll.8.message.2": "Il flusso dell'abbondanza scorre verso di te. Il tuo lavoro porta frutti magnifici.",
    "oracle.bonusRoll.8.title.3": "💰 Ricchezza Manifestata",
    "oracle.bonusRoll.8.message.3": "L'8 dell'infinito realizza i tuoi desideri. Successo materiale e spirituale vanno di pari passo.",

    "oracle.bonusRoll.9.title.1": "🌱 Evoluzione Spirituale",
    "oracle.bonusRoll.9.message.1": "La tua crescita personale raggiunge nuove vette. Continua il tuo cammino.",
    "oracle.bonusRoll.9.title.2": "🦋 Metamorfosi Sacra",
    "oracle.bonusRoll.9.message.2": "Sei in piena trasformazione spirituale. La tua anima si eleva verso la luce.",
    "oracle.bonusRoll.9.title.3": "🌌 Saggezza Universale",
    "oracle.bonusRoll.9.message.3": "Il numero 9 segna la fine di un ciclo. Hai imparato e sei cresciuto! La tua evoluzione diventa un esempio per gli altri.",

    "oracle.bonusRoll.10.title.1": "🎯 Sfide Stimolanti",
    "oracle.bonusRoll.10.message.1": "Nuove sfide ti aspettano, ma sei pronto a affrontarle con successo.",
    "oracle.bonusRoll.10.title.2": "⚔️ Prove Formative",
    "oracle.bonusRoll.10.message.2": "Gli ostacoli diventano trampolini. La tua determinazione trasforma tutto in vittoria.",
    "oracle.bonusRoll.10.title.3": "🔟 Nuovo Ciclo Maestro",
    "oracle.bonusRoll.10.message.3": "Il numero 10 segna la fine di un capitolo e l'inizio di un altro. Rinascrai più forte e saggio.",

    "oracle.bonusRoll.11.title.1": "🔥 Perseveranza Vincente",
    "oracle.bonusRoll.11.message.1": "La tua determinazione dà i suoi frutti. Il numero maestro 11 ti guida al successo.",
    "oracle.bonusRoll.11.title.2": "⚡ Maestro Illuminato",
    "oracle.bonusRoll.11.message.2": "Il numero sacro 11 rivela il tuo potenziale illimitato. La tua presenza guida chi ti sta intorno.",
    "oracle.bonusRoll.11.title.3": "✨ Risveglio Spirituale",
    "oracle.bonusRoll.11.message.3": "Il numero 11 annuncia una nuova opportunità. Sii pronto a coglierla subito.",

    "oracle.bonusRoll.12.title.1": "👑 Realizzazione Totale",
    "oracle.bonusRoll.12.message.1": "Hai raggiunto uno stato di completezza in cui tutto appare in armonia e ti senti realizzato.",
    "oracle.bonusRoll.12.title.2": "🌟 Perfezione Cosmica",
    "oracle.bonusRoll.12.message.2": "Hai completato un ciclo importante e ti avvicini all'eccellenza. Tutto sembra armonizzarsi intorno al tuo successo.",
    "oracle.bonusRoll.12.title.3": "🏆 Trionfo Assoluto",
    "oracle.bonusRoll.12.message.3": "Il tuo cammino raggiunge un punto importante con il numero 12. Tutto si mette in ordine e ti senti perfettamente al tuo posto.",

    "oracle.backToOracles": "Torna agli oracoli",
  },
};

export { translations };
