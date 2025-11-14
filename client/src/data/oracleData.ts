import { OracleData, ZodiacSign } from '@shared/schema';

export const oracleData: Record<string, OracleData> = {
  daily: {
    title: 'Tirage du Jour',
    description: 'Une carte pour vous guider et vous inspirer aujourd\'hui',
    cards: [
      // Cartes existantes (22)
      { name: 'Nouveau Depart', meaning: 'Aujourd’hui marque la fin d’un cycle et l’ouverture d’une nouvelle page de votre vie. C’est un moment idéal pour oser entreprendre ce que vous repoussiez depuis longtemps, que ce soit un projet personnel, professionnel ou sentimental. L’univers vous invite à avancer sans crainte et à accueillir les opportunités qui s’offrent à vous. Chaque pas que vous ferez aujourd’hui posera les bases d’un avenir plus épanouissant.'},
      { name: 'Patience', meaning: 'Ce tirage vous rappelle que certaines choses prennent du temps pour se manifester. Ne vous découragez pas si les résultats tardent à venir : la patience est votre plus grand atout aujourd’hui. Observez, respirez et acceptez le rythme naturel des événements. La tranquillité intérieure que vous cultiverez sera la clé pour attirer la réussite au moment juste.' },
      { name: 'Creativite', meaning: 'Ce tirage vous rappelle que certaines choses prennent du temps pour se manifester. Ne vous découragez pas si les résultats tardent à venir : la patience est votre plus grand atout aujourd’hui. Observez, respirez et acceptez le rythme naturel des événements. La tranquillité intérieure que vous cultiverez sera la clé pour attirer la réussite au moment juste.' },
      { name: 'Amour', meaning: 'L’énergie d’aujourd’hui est tournée vers le cœur. Exprimez votre tendresse et votre gratitude envers vos proches, car un simple geste peut avoir un grand impact. Si vous êtes en couple, renforcez vos liens par des attentions sincères. Si vous êtes célibataire, ouvrez-vous à la possibilité de nouvelles rencontres : l’amour pourrait se manifester là où vous ne l’attendiez pas.' },
      { name: 'Courage', meaning: 'Des défis peuvent se présenter aujourd’hui, mais vous possédez la force et la résilience nécessaires pour les surmonter. Le courage ne signifie pas l’absence de peur, mais la capacité à agir malgré elle. En affrontant vos obstacles avec détermination, vous gagnerez en confiance et en maturité. Chaque pas courageux que vous ferez renforcera votre chemin.' },
      { name: 'Intuition', meaning: 'Votre voix intérieure est particulièrement forte aujourd’hui. Faites confiance à vos pressentiments, même si vous ne pouvez pas les expliquer rationnellement. Ils vous guideront vers des choix plus alignés avec vos véritables besoins. Prenez un moment de silence pour écouter vos ressentis, car votre intuition détient la réponse aux questions que vous vous posez en ce moment.' },
      { name: 'Gratitude', meaning: 'Prenez un moment pour apprécier profondément ce que vous avez déjà. Reconnaître vos bénédictions attire encore plus de positif dans votre vie.' },
      { name: 'Communication', meaning: 'Exprimez-vous avec clarté et bienveillance aujourd’hui. Vos paroles peuvent apaiser, inspirer et créer des liens plus solides.' },
      { name: 'Équilibre', meaning: 'Cherchez l’harmonie entre vos responsabilités et vos besoins personnels. Prendre soin de vous est essentiel pour maintenir une stabilité intérieure.'},
      { name: 'Confiance', meaning: 'Croyez en vos capacités et avancez avec assurance. La confiance en vous ouvre la voie vers vos véritables réussites.'},
      { name: 'Lacher-prise', meaning: 'Libérez-vous des poids du passé et des inquiétudes inutiles. Acceptez de laisser aller ce que vous ne pouvez contrôler.' },
      { name: 'Joie', meaning: 'Accueillez la joie dans les petits instants du quotidien. Elle illumine votre cœur et transforme vos énergies.' },
      { name: 'Sagesse', meaning: 'Prenez le temps de réfléchir avant de poser vos actions. Votre sagesse intérieure vous guidera et vous protégera des mauvaises décisions.' },
      { name: 'Transformation', meaning: 'Accueillez les changements qui se présentent. Même s’ils paraissent déstabilisants, ils vous conduisent vers une version améliorée de vous-même.' },
      { name: 'Abondance', meaning: 'Rappelez-vous que vous possédez déjà les ressources nécessaires pour réussir. L’abondance se manifeste lorsque vous croyez pleinement en votre potentiel.'},
      { name: 'Paix', meaning: 'Cultivez la paix intérieure en libérant les tensions et les conflits. La sérénité vous apportera la clarté et l’harmonie dont vous avez besoin.' },
      { name: 'Force', meaning: 'Puisez dans votre force intérieure, elle est plus vaste que ce que vous imaginez. Elle vous soutient dans les défis et vous rend plus résilient.'},
      { name: 'Pardon', meaning: 'Offrez le pardon, à vous-même comme aux autres. Ce geste libère le cœur et ouvre la voie à une véritable guérison intérieure.' },
      { name: 'Espoir', meaning: 'Gardez espoir, même dans l’adversité. La lumière finit toujours par revenir, comme le soleil après la nuit.' },
      { name: 'Action', meaning: 'Le moment est venu de passer à l’action. Ne laissez plus vos projets en attente, c’est aujourd’hui que les choses avancent.' },
      { name: 'Compassion', meaning: 'Faites preuve de compassion envers vous-même et envers les autres. La bienveillance adoucit les cœurs et renforce les liens.' },
      { name: 'Inspiration', meaning: 'Ouvrez vos yeux et votre esprit à ce qui vous entoure. L’inspiration est partout, prête à nourrir votre créativité et vos idées.'},

      // NOUVELLES CARTES (25 cartes ajoutées = 47 total)
      { name: 'Determination', meaning: 'Votre persévérance et votre volonté sont vos meilleurs alliés aujourd’hui. Même face aux obstacles, continuez d’avancer avec confiance, car votre ténacité vous ouvrira la voie vers le succès.' },
      { name: 'Aventure', meaning: 'Sortez de votre routine et osez découvrir de nouvelles expériences. Une aventure, qu’elle soit grande ou petite, vous attend et enrichira votre esprit comme votre cœur.' },
      { name: 'Reconciliation', meaning: 'Il est temps de guérir vos blessures intérieures et de faire la paix avec votre passé. La réconciliation apporte la liberté et vous permet d’avancer plus léger.' },
      { name: 'Innovation', meaning: 'Aujourd’hui, laissez vos idées originales prendre vie. Votre capacité à penser différemment est une richesse qui peut transformer vos projets et inspirer ceux qui vous entourent.' },
      { name: 'Connexion', meaning: 'Renforcez vos liens avec les autres, mais aussi avec vous-même. Les connexions authentiques nourrissent l’âme et vous rappellent que vous n’êtes jamais seul.' },
      { name: 'Prosperite', meaning: 'La prospérité entre dans votre vie sous diverses formes : matérielles, émotionnelles ou spirituelles. Accueillez cette abondance avec gratitude et confiance.' },
      { name: 'Authenticite', meaning: 'Restez fidèle à vos valeurs et à votre véritable nature. Votre authenticité attire les bonnes personnes et vous guide vers des choix alignés avec votre cœur.' },
      { name: 'Revelation', meaning: 'Une vérité cachée ou une prise de conscience importante va bientôt se manifester. Restez attentif et gardez l’esprit ouvert pour accueillir cette révélation.' },
      { name: 'Protection', meaning: 'Vous êtes entouré de bienveillance. Faites confiance à cette protection et sachez que vous n’avez rien à craindre.' },
      { name: 'Renaissance', meaning: 'Un nouveau cycle s’ouvre devant vous. Libérez-vous de ce qui appartient au passé et accueillez cette renaissance comme une chance de vous réinventer.' },
      { name: 'Clarte', meaning: 'Les réponses que vous cherchez vont bientôt se révéler. Prenez du recul, observez les signes et laissez le brouillard se dissiper : la clarté arrive progressivement et vous permettra de prendre des décisions éclairées.' },
      { name: 'Passion', meaning: 'Suivez ce qui vous passionne vraiment. Votre enthousiasme est une boussole puissante : nourrissez-le, donnez-lui de l\'espace et laissez-le orienter vos choix vers ce qui vous rend vivant.' },
      { name: 'Equite', meaning: 'La justice et l\'équilibre vont se rétablir dans vos affaires. Restez intègre et patient : vos actions justes finiront par porter leurs fruits et rétablir l\'harmonie autour de vous.' },
      { name: 'Harmonie', meaning: 'Tous les éléments de votre vie tendent à s\'aligner aujourd\'hui. Profitez de cette période pour consolider ce qui fonctionne et créer des routines qui renforcent votre bien-être global.' },
      { name: 'Eveil', meaning: 'Votre conscience s\'élargit et de nouvelles perspectives s\'ouvrent à vous. Accueillez ces prises de conscience : elles peuvent transformer votre regard et orienter vos prochains pas.' },
      { name: 'Generosite', meaning: 'Donnez sans compter aujourd\'hui, non par devoir mais par cœur. Cet élan généreux créera des cercles de réciprocité et attirera des expériences bienfaisantes en retour.' },
      { name: 'Perseverance', meaning: 'N\'abandonnez pas maintenant : votre détermination est sur le point de porter ses fruits. Continuez avec constance et discipline, la victoire est plus proche que vous ne le pensez.' },
      { name: 'Simplicite', meaning: 'La solution est souvent plus simple que ce que l\'on imagine. Allez à l\'essentiel, éliminez le superflu et vous trouverez des réponses claires et efficaces.' },
      { name: 'Legerete', meaning: 'Adoptez une attitude légère aujourd\'hui : riez, jouez, délestez-vous des poids inutiles. Cette légèreté vous ouvrira au plaisir et à la créativité.' },
      { name: 'Ancrage', meaning: 'Revenez à vos racines pour trouver stabilité et force. Les pratiques simples (respiration, marche, routines) vous aideront à vous recentrer et à avancer plus sereinement.' },
      { name: 'Mystere', meaning: 'Acceptez ce que vous ne pouvez pas encore comprendre. Le mystère a sa beauté : en laissant de l\'espace à l\'inconnu, vous permettez aux révélations de se déployer à leur rythme.' },
      { name: 'Celebration', meaning: 'C\'est le moment de célébrer vos succès, même les plus discrets. Reconnaître vos accomplissements nourrit la confiance et attire davantage de raisons de se réjouir.' },
      { name: 'Guidance', meaning: 'Une aide ou un signe inattendu va se présenter. Restez attentif aux synchronicités et aux conseils discrets : ils vous orienteront vers une voie bénéfique.' },
      { name: 'Purification', meaning: 'Nettoyez votre espace et votre esprit : désencombrez, respirez, recentrez-vous. Faire place au nouveau crée l\'espace nécessaire aux changements positifs.' },
      { name: 'Vision', meaning: 'Votre vision du futur se clarifie aujourd\'hui. Identifiez la direction qui vous attire et avancez avec confiance vers cet horizon nouvellement révélé.' },
    ]
  },
  horoscope: {
    title: 'Horoscope du Jour',
    description: 'Découvrez ce que les astres vous réservent aujourd\'hui selon votre signe',
    cards: [] // L'horoscope n'utilise pas de cartes
  },
  tarot: {
    title: 'Tarot de Marseille',
    description: '"Les 22 arcanes majeurs dévoilent les mystères de votre destinée"',
    cards: [
      { name: 'Le Fou', meaning: 'Nouveaux départs, spontanéité, liberté' },
      { name: 'Le Bateleur', meaning: 'Créativité, communication, nouveau projet' },
      { name: 'La Papesse', meaning: 'Intuition, mystère, connaissance cachée' },
      { name: 'L\'Imperatrice', meaning: 'Fertilité, abondance, créativité féminine' },
      { name: 'L\'Empereur', meaning: 'Autorité, structure, leadership' },
      { name: 'Le Pape', meaning: 'Sagesse traditionnelle, guidance spirituelle' },
      { name: 'L\'Amoureux', meaning: 'Choix, relations, harmonie' },
      { name: 'Le Chariot', meaning: 'Victoire, maîtrise de soi, progression' },
      { name: 'La Justice', meaning: 'Équilibre, vérité, conséquences' },
      { name: 'L\'Hermite', meaning: 'Introspection, sagesse intérieure, guidance' },
      { name: 'La Roue de Fortune', meaning: 'Changement, cycles, destinée' },
      { name: 'La Force', meaning: 'Courage, patience, maîtrise intérieure' },
      { name: 'Le Pendu', meaning: 'Sacrifice, nouvelle perspective, lâcher-prise' },
      { name: 'L\'Arcane sans nom', meaning: 'Transformation profonde, fin de cycle' },
      { name: 'Temperance', meaning: 'Modération, guérison, équilibre' },
      { name: 'Le Diable', meaning: 'Dépendances, illusions, matérialisme' },
      { name: 'La Maison Dieu', meaning: 'Révélation soudaine, changement radical' },
      { name: 'L\'Etoile', meaning: 'Espoir, inspiration, guidance divine' },
      { name: 'La Lune', meaning: 'Illusions, subconscient, intuition' },
      { name: 'Le Soleil', meaning: 'Joie, succès, vitalité' },
      { name: 'Le Jugement', meaning: 'Éveil spirituel, renaissance, pardon' },
      { name: 'Le Monde', meaning: 'Accomplissement, réussite, cycle complet' }
    ]
  },
  angels: {
    title: 'Oracle des Anges',
    description: 'Connectez-vous avec vos guides angéliques pour recevoir leurs messages d\'amour',
    cards: [
      { name: 'Archange Michel', meaning: 'Protection divine, courage et force' },
      { name: 'Archange Gabriel', meaning: 'Messages divins, créativité et communication' },
      { name: 'Archange Raphael', meaning: 'Guérison physique et émotionnelle' },
      { name: 'Archange Uriel', meaning: 'Sagesse divine et illumination' },
      { name: 'Ange Gardien', meaning: 'Protection personnelle et guidance' },
      { name: 'Ange de l\'Amour', meaning: 'Relations harmonieuses et amour inconditionnel' },
      { name: 'Ange de la Paix', meaning: 'Sérénité intérieure et calme' },
      { name: 'Ange de la Prosperite', meaning: 'Abondance et réussite matérielle' },
      { name: 'Ange de la Guerison', meaning: 'Rétablissement et bien-être' },
      { name: 'Ange de la Sagesse', meaning: 'Connaissance spirituelle et discernement' },
      { name: 'Ange de la Joie', meaning: 'Bonheur et optimisme' },
      { name: 'Ange de la Foi', meaning: 'Confiance en l\'univers et espoir' },
      { name: 'Ange de la Creativite', meaning: 'Inspiration artistique et innovation' },
      { name: 'Ange de la Purification', meaning: 'Nettoyage énergétique et renouveau' },
      { name: 'Ange de la Compassion', meaning: 'Empathie et bienveillance' },
      { name: 'Ange de la Transformation', meaning: 'Changements positifs et évolution' },
      { name: 'Ange de l\'Abondance', meaning: 'Richesse spirituelle et matérielle' },
      { name: 'Ange de la Liberation', meaning: 'Liberté des peurs et limitations' },
      { name: 'Ange de la Gratitude', meaning: 'Reconnaissance et appréciation' },
      { name: 'Ange de la Manifestation', meaning: 'Réalisation des rêves et projets' },
      { name: 'Ange de l\'Harmonie', meaning: 'Équilibre dans tous les aspects de la vie' },
      { name: 'Ange de la Nouvelle Vie', meaning: 'Nouveaux commencements et renaissance' }
    ]
  },
  runes: {
    title: 'Runes Nordiques',
    description: 'L\'ancienne sagesse des Vikings vous révèle votre chemin de guerre et de victoire',
    cards: [
      { name: 'Fehu', meaning: 'Richesse, prospérité, nouveau départ financier' },
      { name: 'Uruz', meaning: 'Force brute, santé, transformation' },
      { name: 'Thurisaz', meaning: 'Défense, protection, force destructrice' },
      { name: 'Ansuz', meaning: 'Communication divine, inspiration, sagesse' },
      { name: 'Raidho', meaning: 'Voyage, mouvement, progression' },
      { name: 'Kenaz', meaning: 'Connaissance, créativité, illumination' },
      { name: 'Gebo', meaning: 'Don, échange, partenariat' },
      { name: 'Wunjo', meaning: 'Joie, bonheur, harmonie' },
      { name: 'Hagalaz', meaning: 'Disruption, changement forcé, purification' },
      { name: 'Nauthiz', meaning: 'Nécessité, contrainte, leçon karmique' },
      { name: 'Isa', meaning: 'Glace, stagnation, patience' },
      { name: 'Jera', meaning: 'Récolte, cycles, récompense' },
      { name: 'Eihwaz', meaning: 'Endurance, protection, connexion spirituelle' },
      { name: 'Perthro', meaning: 'Mystère, destin, forces cachées' },
      { name: 'Algiz', meaning: 'Protection divine, connexion aux guides' },
      { name: 'Sowilo', meaning: 'Succès, victoire, énergie solaire' },
      { name: 'Tiwaz', meaning: 'Victoire, justice, sacrifice honorable' },
      { name: 'Berkano', meaning: 'Croissance, fertilité, nouveau cycle' },
      { name: 'Ehwaz', meaning: 'Mouvement, progrès, partenariat' },
      { name: 'Mannaz', meaning: 'Humanité, soi, intelligence' },
      { name: 'Laguz', meaning: 'Eau, intuition, émotions' },
      { name: 'Ingwaz', meaning: 'Fertilité masculine, énergie créatrice' },
      { name: 'Dagaz', meaning: 'Éveil, transformation, nouveau jour' },
      { name: 'Othala', meaning: 'Héritage, propriété, tradition familiale' }
    ]
  }
};

export const zodiacSigns: ZodiacSign[] = [
  { name: 'Bélier', symbol: '♈', startDate: { month: 3, day: 21 }, endDate: { month: 4, day: 19 } },
  { name: 'Taureau', symbol: '♉', startDate: { month: 4, day: 20 }, endDate: { month: 5, day: 20 } },
  { name: 'Gémeaux', symbol: '♊', startDate: { month: 5, day: 21 }, endDate: { month: 6, day: 20 } },
  { name: 'Cancer', symbol: '♋', startDate: { month: 6, day: 21 }, endDate: { month: 7, day: 22 } },
  { name: 'Lion', symbol: '♌', startDate: { month: 7, day: 23 }, endDate: { month: 8, day: 22 } },
  { name: 'Vierge', symbol: '♍', startDate: { month: 8, day: 23 }, endDate: { month: 9, day: 22 } },
  { name: 'Balance', symbol: '♎', startDate: { month: 9, day: 23 }, endDate: { month: 10, day: 22 } },
  { name: 'Scorpion', symbol: '♏', startDate: { month: 10, day: 23 }, endDate: { month: 11, day: 21 } },
  { name: 'Sagittaire', symbol: '♐', startDate: { month: 11, day: 22 }, endDate: { month: 12, day: 21 } },
  { name: 'Capricorne', symbol: '♑', startDate: { month: 12, day: 22 }, endDate: { month: 1, day: 19 } },
  { name: 'Verseau', symbol: '♒', startDate: { month: 1, day: 20 }, endDate: { month: 2, day: 18 } },
  { name: 'Poissons', symbol: '♓', startDate: { month: 2, day: 19 }, endDate: { month: 3, day: 20 } }
];

export function getZodiacSign(month: number, day: number): ZodiacSign | undefined {
  return zodiacSigns.find(sign => {
    if (sign.startDate.month === sign.endDate.month) {
      return month === sign.startDate.month && day >= sign.startDate.day && day <= sign.endDate.day;
    } else {
      return (month === sign.startDate.month && day >= sign.startDate.day) ||
             (month === sign.endDate.month && day <= sign.endDate.day);
    }
  });
}