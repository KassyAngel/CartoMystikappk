import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Fonction existante pour Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ==================== NOUVELLES FONCTIONS D'ALÉATOIRE ====================

/**
 * Mélange Fisher-Yates - Vrai aléatoire uniforme
 * Remplace le .sort(() => Math.random() - 0.5) défaillant
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Génère un nombre aléatoire sécurisé entre min et max (inclus)
 */
export const getSecureRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Système de gestion de l'historique des tirages
 */
interface TirageHistory {
  date: string;
  oracleType: string;
  cardIndices: number[];
}

const STORAGE_KEY_HISTORY = 'cartomystik_tirage_history';
const MAX_HISTORY_DAYS = 7; // Éviter répétition sur 7 jours

/**
 * Vérifie si localStorage est disponible
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  } catch {
    return false;
  }
};

/**
 * Sauvegarde un tirage dans l'historique local
 */
export const saveTirageToHistory = (
  oracleType: string, 
  cardIndices: number[]
): void => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage non disponible, historique désactivé');
    return;
  }

  try {
    const history = getTirageHistory();
    const today = new Date().toISOString().split('T')[0];

    const newTirage: TirageHistory = {
      date: today,
      oracleType,
      cardIndices
    };

    // Ajouter le nouveau tirage
    history.push(newTirage);

    // Nettoyer l'historique (garder seulement les 7 derniers jours)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    const cleanedHistory = history.filter(tirage => tirage.date >= cutoffString);

    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(cleanedHistory));
  } catch (error) {
    console.warn('Impossible de sauvegarder l\'historique:', error);
  }
};

/**
 * Récupère l'historique des tirages
 */
export const getTirageHistory = (): TirageHistory[] => {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Impossible de lire l\'historique:', error);
    return [];
  }
};

/**
 * Obtient les cartes récemment tirées pour un oracle spécifique
 */
export const getRecentCards = (oracleType: string): number[] => {
  const history = getTirageHistory();
  const recentCards = new Set<number>();

  // Récupérer toutes les cartes tirées récemment pour ce type d'oracle
  history
    .filter(tirage => tirage.oracleType === oracleType)
    .forEach(tirage => {
      tirage.cardIndices.forEach(index => recentCards.add(index));
    });

  return Array.from(recentCards);
};

/**
 * Sélectionne des cartes en évitant les répétitions récentes
 */
export const selectRandomCardsWithoutRepeat = (
  totalCards: number,
  requestedCount: number,
  oracleType: string
): number[] => {
  const recentCards = getRecentCards(oracleType);

  // Cartes disponibles (non tirées récemment)
  const availableCards = Array.from({ length: totalCards }, (_, i) => i)
    .filter(cardIndex => !recentCards.includes(cardIndex));

  console.log(`🎴 Oracle: ${oracleType} | Total: ${totalCards} | Demandé: ${requestedCount} | Récentes: ${recentCards.length} | Dispos: ${availableCards.length}`);

  // ✅ AMÉLIORATION : Si moins de 50% de cartes dispo, réinitialiser l'historique
  if (availableCards.length < totalCards * 0.5) {
    console.log('⚠️ Moins de 50% de cartes disponibles → Réinitialisation partielle');

    // Garder seulement les cartes des 2 derniers tirages
    const history = getTirageHistory();
    const recentHistory = history
      .filter(t => t.oracleType === oracleType)
      .slice(-2); // 2 derniers tirages seulement

    const veryRecentCards = new Set<number>();
    recentHistory.forEach(tirage => {
      tirage.cardIndices.forEach(index => veryRecentCards.add(index));
    });

    // Cartes vraiment récentes (2 derniers tirages)
    const freshAvailableCards = Array.from({ length: totalCards }, (_, i) => i)
      .filter(cardIndex => !veryRecentCards.has(cardIndex));

    console.log(`   ✅ Nouvelle pool: ${freshAvailableCards.length} cartes disponibles`);

    const cardsToUse = freshAvailableCards.length >= requestedCount
      ? freshAvailableCards
      : Array.from({ length: totalCards }, (_, i) => i); // Dernier recours

    const shuffled = shuffleArray(cardsToUse);
    return shuffled.slice(0, requestedCount);
  }

  // Cas normal : assez de cartes disponibles
  const shuffled = shuffleArray(availableCards);
  return shuffled.slice(0, requestedCount);
};

/**
 * Génère un tirage d'horoscope varié
 */
export const generateHoroscopePrediction = (zodiacSign: string) => {
  const predictions = [
    'Énergique', 'Confiant', 'Déterminé', 'Passionné', 'Optimiste', 
    'Dynamique', 'Paisible', 'Sensuel', 'Stable', 'Généreux',
    'Patient', 'Harmonieux', 'Curieux', 'Communicatif', 'Vif',
    'Sociable', 'Adaptable', 'Créatif', 'Émotionnel', 'Protecteur'
  ];

  const colors = [
    'Rouge', 'Orange vif', 'Bordeaux', 'Corail', 'Vert émeraude',
    'Rose tendre', 'Beige doré', 'Bleu ciel', 'Argent', 'Lavande'
  ];

  const compatibilities = [
    'Lion, Sagittaire', 'Gémeaux, Verseau', 'Balance, Lion',
    'Verseau, Gémeaux', 'Vierge, Capricorne', 'Cancer, Poissons'
  ];

  return {
    mood: predictions[getSecureRandomInt(0, predictions.length - 1)],
    luckyNumber: getSecureRandomInt(1, 99),
    luckyColor: colors[getSecureRandomInt(0, colors.length - 1)],
    compatibility: compatibilities[getSecureRandomInt(0, compatibilities.length - 1)]
  };
};

/**
 * Utilitaire pour déboguer l'aléatoire
 */
export const testRandomDistribution = (samples: number = 10000): void => {
  console.log('Test de distribution aléatoire:');

  // Test du mélange
  const testArray = [1, 2, 3, 4, 5];
  const distributions = new Map();

  for (let i = 0; i < samples; i++) {
    const shuffled = shuffleArray(testArray);
    const key = shuffled.join(',');
    distributions.set(key, (distributions.get(key) || 0) + 1);
  }

  console.log('Nombre de combinaisons uniques:', distributions.size);
  console.log('Distribution théorique attendue: ~', samples / 120); // 5! = 120 permutations
};