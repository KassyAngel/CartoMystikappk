import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

export default function BannerDebugHelper() {
  const [show, setShow] = useState(false);
  const isNative = Capacitor.isNativePlatform();

  // ALT + B pour afficher/cacher le helper
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'b') {
        setShow(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!isNative || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-[999]">
      {/* Zone rouge = bannière AdMob (60px) */}
      <div className="h-[60px] bg-red-500/30 border-t-2 border-red-500 flex items-center justify-center">
        <span className="text-red-100 text-xs font-bold">
          ⚠️ ZONE BANNIÈRE ADMOB (60px) - Ne RIEN mettre ici !
        </span>
      </div>

      {/* Zone verte = zone sécurisée (50px) */}
      <div className="h-[50px] bg-green-500/20 border-t-2 border-green-500 flex items-center justify-center">
        <span className="text-green-100 text-xs">
          ✅ Zone sécurisée (50px)
        </span>
      </div>
    </div>
  );
}
