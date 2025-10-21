          import { cn } from '@/lib/utils';
          import { useState } from 'react';

          interface OracleCardProps {
            title: string;
            description: string;
            icon: string;
            isSelected?: boolean;
            onClick?: () => void;
            className?: string;
          }

          export default function OracleCard({ 
            title, 
            description, 
            icon, 
            isSelected, 
            onClick, 
            className 
          }: OracleCardProps) {
            const [isHovered, setIsHovered] = useState(false);

            // Thèmes uniques pour chaque type d'oracle
            const getOracleTheme = () => {
              if (title.includes('Jour') || icon === '☀️') {
                return {
                  gradient: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20',
                  border: 'border-amber-400/50',
                  glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]',
                  hoverGlow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]',
                  iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
                  accent: 'text-amber-300'
                };
              }
              if (title.includes('Tarot') || icon === '🌟') {
                return {
                  gradient: 'from-purple-600/20 via-violet-600/20 to-fuchsia-600/20',
                  border: 'border-purple-400/50',
                  glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
                  hoverGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]',
                  iconBg: 'bg-gradient-to-br from-purple-600 to-fuchsia-600',
                  accent: 'text-purple-300'
                };
              }
              if (title.includes('Anges') || icon === '👼') {
                return {
                  gradient: 'from-blue-500/20 via-cyan-500/20 to-sky-500/20',
                  border: 'border-blue-400/50',
                  glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
                  hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]',
                  iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
                  accent: 'text-blue-300'
                };
              }
              if (title.includes('Horoscope') || icon === '♈') {
                return {
                  gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
                  border: 'border-indigo-400/50',
                  glow: 'shadow-[0_0_30px_rgba(99,102,241,0.3)]',
                  hoverGlow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]',
                  iconBg: 'bg-gradient-to-br from-indigo-600 to-pink-600',
                  accent: 'text-indigo-300'
                };
              }
              // Boule de Cristal
              return {
                gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
                border: 'border-emerald-400/50',
                glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
                hoverGlow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]',
                iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-600',
                accent: 'text-emerald-300'
              };
            };

            const theme = getOracleTheme();

            return (
              <div
                className={cn(
                  'group relative overflow-hidden rounded-2xl cursor-pointer w-full',
                  'backdrop-blur-md bg-black/40',
                  'border-2 transition-all duration-500',
                  theme.border,
                  theme.glow,
                  theme.hoverGlow,
                  'hover:scale-[1.02] hover:-translate-y-1',
                  'active:scale-[0.98]',
                  isSelected && 'scale-[1.05] border-[#ffd700] shadow-[0_0_50px_rgba(255,215,0,0.6)]',
                  className
                )}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-testid={`oracle-${title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Gradient de fond animé */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
                  theme.gradient,
                  isHovered ? 'opacity-100' : 'opacity-60'
                )} />

                {/* Effet de brillance au hover */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent',
                  'translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'
                )} />

                {/* Particules scintillantes */}
                {isHovered && (
                  <>
                    <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping" />
                    <div 
                      className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-ping" 
                      style={{ animationDelay: '0.2s' }} 
                    />
                    <div 
                      className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full animate-ping" 
                      style={{ animationDelay: '0.4s' }} 
                    />
                  </>
                )}

                {/* Contenu de la carte */}
                <div className="relative p-5 sm:p-6 text-center min-h-[160px] sm:min-h-[180px] flex flex-col justify-between">
                  {/* Icône avec cercle de fond */}
                  <div className="flex justify-center mb-3">
                    <div className={cn(
                      'w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center',
                      'transform transition-transform duration-300',
                      theme.iconBg,
                      'shadow-lg',
                      isHovered && 'scale-110 rotate-12'
                    )}>
                      <span className="text-3xl sm:text-4xl filter drop-shadow-lg">
                        {icon}
                      </span>
                    </div>
                  </div>

                  {/* Titre */}
                  <h3 className={cn(
                    'text-[#ffd700] text-base sm:text-lg font-bold mb-2 font-serif leading-tight',
                    'transition-all duration-300'
                  )}>
                    {title}
                  </h3>

                  {/* Description */}
                  <p className={cn(
                    'text-[#c9a9dd] text-xs sm:text-sm leading-relaxed',
                    'transition-colors duration-300',
                    isHovered && theme.accent
                  )}>
                    {description}
                  </p>

                  {/* Indicateur de sélection */}
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-purple-900 text-xs font-bold">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }