import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Fonction existante pour Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ==================== FONCTIONS D'ALÉATOIRE OPTIMISÉES ====================

/**
 * Mélange Fisher-Yates avec crypto.getRandomValues (plus sécurisé)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * ✅ AMÉLIORATION : Utilise crypto.getRandomValues pour un vrai aléatoire
 */
export const getSecureRandomInt = (min: number, max: number): number => {
  const range = max - min + 1;

  // Utiliser crypto.getRandomValues si disponible (meilleur aléatoire)
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    return min + (randomBuffer[0] % range);
  }

  // Fallback sur Math.random
  return Math.floor(Math.random() * range) + min;
};

/**
 * Système de gestion de l'historique des tirages
 */
interface TirageHistory {
  date: string;
  oracleType: string;
  cardIndices: number[];
  timestamp: number; // ✅ AJOUT : timestamp précis
}

const STORAGE_KEY_HISTORY = 'cartomystik_tirage_history';
const MAX_HISTORY_DAYS = 7; // Éviter répétition sur 7 jours
const MAX_HISTORY_ENTRIES = 50; // ✅ AJOUT : Limiter la taille

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
      cardIndices,
      timestamp: Date.now() // ✅ AJOUT
    };

    // Ajouter le nouveau tirage
    history.push(newTirage);

    // Nettoyer l'historique (garder seulement les 7 derniers jours)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_HISTORY_DAYS);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    let cleanedHistory = history.filter(tirage => tirage.date >= cutoffString);

    // ✅ AMÉLIORATION : Limiter le nombre total d'entrées
    if (cleanedHistory.length > MAX_HISTORY_ENTRIES) {
      cleanedHistory = cleanedHistory.slice(-MAX_HISTORY_ENTRIES);
    }

    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(cleanedHistory));

    console.log(`💾 Historique sauvegardé: ${oracleType}, cartes [${cardIndices.join(', ')}]`);
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
 * ✅ AMÉLIORATION : Obtient les cartes récemment tirées avec pondération temporelle
 * Les cartes des derniers tirages ont plus de poids
 */
export const getRecentCards = (oracleType: string, daysBack: number = MAX_HISTORY_DAYS): number[] => {
  const history = getTirageHistory();
  const now = Date.now();
  const cutoff = now - (daysBack * 24 * 60 * 60 * 1000);

  // Filtrer par type d'oracle et date
  const relevantHistory = history
    .filter(tirage => 
      tirage.oracleType === oracleType && 
      (tirage.timestamp || 0) > cutoff
    )
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); // Plus récent en premier

  const recentCards = new Set<number>();

  // ✅ PONDÉRATION : Les 3 derniers tirages comptent plus
  const veryRecentTirages = relevantHistory.slice(0, 3);
  veryRecentTirages.forEach(tirage => {
    tirage.cardIndices.forEach(index => recentCards.add(index));
  });

  console.log(`📜 Historique ${oracleType}: ${relevantHistory.length} tirages, ${recentCards.size} cartes à éviter`);

  return Array.from(recentCards);
};

/**
 * ✅ AMÉLIORATION MAJEURE : Sélectionne des cartes avec anti-répétition intelligente
 */
export const selectRandomCardsWithoutRepeat = (
  totalCards: number,
  requestedCount: number,
  oracleType: string
): number[] => {
  console.log(`\n🎴 === TIRAGE ${oracleType.toUpperCase()} ===`);
  console.log(`   Total cartes: ${totalCards} | Demandées: ${requestedCount}`);

  const recentCards = getRecentCards(oracleType);

  // Cartes disponibles (non tirées récemment)
  let availableCards = Array.from({ length: totalCards }, (_, i) => i)
    .filter(cardIndex => !recentCards.includes(cardIndex));

  console.log(`   Cartes récentes à éviter: ${recentCards.length}`);
  console.log(`   Cartes disponibles: ${availableCards.length}`);

  // ✅ AMÉLIORATION : Seuil adaptatif selon le nombre de cartes demandées
  const minimumThreshold = Math.max(requestedCount * 2, totalCards * 0.3);

  // Si trop peu de cartes disponibles, réduire l'historique considéré
  if (availableCards.length < minimumThreshold) {
    console.log(`   ⚠️ Peu de cartes dispos (${availableCards.length} < ${minimumThreshold})`);
    console.log(`   → Réduction de l'historique aux 2 derniers tirages`);

    const history = getTirageHistory();
    const recentHistory = history
      .filter(t => t.oracleType === oracleType)
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 2); // ✅ Seulement les 2 derniers tirages

    const veryRecentCards = new Set<number>();
    recentHistory.forEach(tirage => {
      tirage.cardIndices.forEach(index => veryRecentCards.add(index));
    });

    availableCards = Array.from({ length: totalCards }, (_, i) => i)
      .filter(cardIndex => !veryRecentCards.has(cardIndex));

    console.log(`   ✅ Nouvelle pool: ${availableCards.length} cartes`);
  }

  // ✅ Dernier recours : si vraiment pas assez de cartes
  if (availableCards.length < requestedCount) {
    console.log(`   🔄 Dernier recours: utilisation de toutes les cartes`);
    availableCards = Array.from({ length: totalCards }, (_, i) => i);
  }

  // ✅ AMÉLIORATION : Mélange multiple pour meilleure distribution
  const shuffled = shuffleArray(shuffleArray(availableCards)); // Double mélange
  const selected = shuffled.slice(0, requestedCount);

  console.log(`   🎯 Cartes sélectionnées: [${selected.join(', ')}]`);
  console.log(`   ===========================\n`);

  return selected;
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
 * ✅ AJOUT : Réinitialiser l'historique (pour debug)
 */
export const resetTirageHistory = (): void => {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(STORAGE_KEY_HISTORY);
  console.log('🗑️ Historique des tirages réinitialisé');
};

/**
 * ✅ AJOUT : Statistiques de l'historique (pour debug)
 */
export const getHistoryStats = (oracleType?: string): void => {
  const history = getTirageHistory();

  if (oracleType) {
    const filtered = history.filter(h => h.oracleType === oracleType);
    console.log(`📊 Statistiques ${oracleType}:`);
    console.log(`   Nombre de tirages: ${filtered.length}`);

    const cardCounts = new Map<number, number>();
    filtered.forEach(tirage => {
      tirage.cardIndices.forEach(cardIndex => {
        cardCounts.set(cardIndex, (cardCounts.get(cardIndex) || 0) + 1);
      });
    });

    const sortedCards = Array.from(cardCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    console.log(`   Top 10 cartes les plus tirées:`);
    sortedCards.forEach(([card, count]) => {
      console.log(`      Carte ${card}: ${count} fois`);
    });
  } else {
    console.log(`📊 Statistiques globales:`);
    console.log(`   Total tirages: ${history.length}`);

    const byOracle = history.reduce((acc, h) => {
      acc[h.oracleType] = (acc[h.oracleType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(byOracle).forEach(([oracle, count]) => {
      console.log(`   ${oracle}: ${count} tirages`);
    });
  }
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