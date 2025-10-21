// src/lib/dailyLimit.ts

interface DailyReadingData {
  lastDate: string;
  cardIndices: number[];
  hasUsedToday: boolean;
}

const STORAGE_KEY = 'dailyReading';

// Obtenir la date actuelle au format YYYY-MM-DD (fuseau local)
export function getCurrentDate(): string {
  const now = new Date();
  return now.toLocaleDateString('en-CA'); // Format ISO: YYYY-MM-DD
}

// Vérifier si le tirage du jour a déjà été fait
export function hasUsedDailyReading(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    const data: DailyReadingData = JSON.parse(stored);
    const today = getCurrentDate();

    // Si la date stockée est différente d'aujourd'hui, c'est un nouveau jour
    return data.lastDate === today && data.hasUsedToday;
  } catch (error) {
    console.error('Erreur lors de la vérification du tirage quotidien:', error);
    return false;
  }
}

// Sauvegarder le tirage du jour
export function saveDailyReading(cardIndices: number[]): void {
  try {
    const data: DailyReadingData = {
      lastDate: getCurrentDate(),
      cardIndices,
      hasUsedToday: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du tirage quotidien:', error);
  }
}

// Récupérer le tirage du jour existant
export function getTodayReading(): number[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: DailyReadingData = JSON.parse(stored);
    const today = getCurrentDate();

    // Retourner les cartes seulement si c'est le même jour
    if (data.lastDate === today) {
      return data.cardIndices;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du tirage quotidien:', error);
    return null;
  }
}

// Reset manuel (pour debug/admin)
export function resetDailyReading(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Calculer le temps restant jusqu'à minuit
export function getTimeUntilMidnight(): { hours: number; minutes: number } {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}