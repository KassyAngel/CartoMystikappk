interface ProgressBarProps {
  progress: number; // 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <>
      <div className="w-full px-4 sm:px-6 py-2">
        <div className="max-w-2xl mx-auto">
          {/* Barre de fond */}
          <div className="relative h-2 sm:h-2.5 bg-purple-900/40 backdrop-blur-sm rounded-full overflow-hidden border border-purple-500/30 shadow-inner">

            {/* Barre de progression avec dégradé doré */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out
                         bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
                         shadow-[0_0_20px_rgba(251,191,36,0.5)]"
              style={{ 
                width: `${progress}%`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite'
              }}
            >
              {/* Reflet lumineux */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full"></div>

              {/* Point lumineux à la fin */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3
                              bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]
                              animate-pulse">
              </div>
            </div>

            {/* Lueur au bout */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full 
                         bg-amber-400/30 blur-xl transition-all duration-700"
              style={{ left: `calc(${progress}% - 12px)` }}
            ></div>
          </div>

          {/* Texte de progression */}
          <div className="mt-1.5 text-center">
            <span className="text-[10px] sm:text-xs text-purple-200/60 font-medium">
              {progress === 33 && '✦ Étape 1/3'}
              {progress === 66 && '✦ Étape 2/3'}
              {progress === 100 && '✦ Étape 3/3'}
            </span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}} />
    </>
  );
}interface ProgressBarProps {
  progress: number; // 0-100
}

