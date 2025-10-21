import { useRef, useCallback } from 'react';

export function useSound(soundFile: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`/sounds/${soundFile}`);
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log('Audio play failed:', e));
  }, [soundFile]);

  return play;
}