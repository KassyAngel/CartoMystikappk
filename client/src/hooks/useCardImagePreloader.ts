import { useEffect, useState } from 'react';

type OracleTypeForPreload = 'daily' | 'tarot' | 'angels' | 'runes' | 'oracle' | 'horoscope';

/**
 * Hook pour précharger les images des cartes avec un état de progression
 */
export function useCardImagePreloader(oracleType: OracleTypeForPreload) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imagesToPreload: string[] = [
      '/Image/Dos-carte.jpg', // Image principale du dos
    ];

    // Pour les autres tirages, ajouter l'image alternative
    if (oracleType !== 'daily') {
      imagesToPreload.push('/image/Tarot/verso-cartes.jpg');
    }

    console.log(`🖼️ Préchargement de ${imagesToPreload.length} images pour ${oracleType}...`);

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    const promises = imagesToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();

        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          console.log(`✅ Image chargée: ${src} (${loadedCount}/${totalImages})`);
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          console.warn(`⚠️ Erreur: ${src} (${loadedCount}/${totalImages})`);
          resolve(); // Continue même en cas d'erreur
        };

        img.src = src;
      });
    });

    Promise.all(promises).then(() => {
      console.log('✅ Toutes les images du dos sont préchargées');
      setIsLoaded(true);
    });
  }, [oracleType]);

  return { isLoaded, progress };
}

/**
 * Hook pour précharger les images des cartes daily en fonction de la langue
 */
export function useDailyCardImagesPreloader(cardNames: string[], language: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!cardNames || cardNames.length === 0) {
      setIsLoaded(true);
      return;
    }

    // Import dynamique du mapping
    import('@/lib/cardNameMapping').then(({ getFrenchKeyFromTranslatedName, dailyCardImages }) => {
      const imagesToPreload: string[] = [];

      cardNames.forEach(cardName => {
        const frenchKey = getFrenchKeyFromTranslatedName(cardName, language);
        const imageName = dailyCardImages[frenchKey];

        if (imageName) {
          imagesToPreload.push(`/Image/daily/${imageName}`);
        }
      });

      if (imagesToPreload.length === 0) {
        setIsLoaded(true);
        return;
      }

      console.log(`🖼️ Préchargement de ${imagesToPreload.length} images daily...`);

      const promises = imagesToPreload.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        });
      });

      Promise.all(promises).then(() => {
        console.log('✅ Toutes les images daily sont préchargées');
        setIsLoaded(true);
      });
    });
  }, [cardNames, language]);

  return isLoaded;
}