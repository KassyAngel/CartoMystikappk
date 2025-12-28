import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
}

/**
 * Composant pour précharger les images en arrière-plan
 * Utilise des Promises pour garantir que toutes les images sont chargées
 */
export default function ImagePreloader({ images, onComplete }: ImagePreloaderProps) {
  useEffect(() => {
    if (!images || images.length === 0) {
      onComplete?.();
      return;
    }

    console.log(`🖼️ Préchargement de ${images.length} images...`);

    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          console.log(`✅ Image chargée: ${src}`);
          resolve();
        };

        img.onerror = () => {
          console.warn(`⚠️ Erreur de chargement: ${src}`);
          resolve(); // On continue même si une image échoue
        };

        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      console.log('✅ Toutes les images sont préchargées');
      onComplete?.();
    });
  }, [images, onComplete]);

  return null; // Ce composant n'affiche rien
}

/**
 * Hook personnalisé pour précharger des images
 */
export function useImagePreloader(images: string[]) {
  useEffect(() => {
    if (!images || images.length === 0) return;

    console.log(`🖼️ Préchargement de ${images.length} images...`);

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
}

/**
 * Fonction utilitaire pour précharger une liste d'images
 */
export function preloadImages(images: string[]): Promise<void[]> {
  const promises = images.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Continue même en cas d'erreur
      img.src = src;
    });
  });

  return Promise.all(promises);
}