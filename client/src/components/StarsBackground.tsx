import { useEffect, useState } from 'react';

export default function StarsBackground() {
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; delay: string }>>([]);

  useEffect(() => {
    const starElements = [];
    for (let i = 0; i < 100; i++) {
      starElements.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`
      });
    }
    setStars(starElements);
  }, []);

  return (
    <div className="stars fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
      {stars.map(star => (
        <div
          key={star.id}
          className="star absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
}