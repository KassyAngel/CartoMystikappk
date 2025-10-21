import { cn } from '@/lib/utils';

interface GenderOption {
  value: string;
  label: string;
  icon: string;
}

interface GenderSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  options: GenderOption[];
  className?: string;
}

export default function GenderSelector({ value, onChange, options, className }: GenderSelectorProps) {
  return (
    <div className={cn('flex flex-col gap-3 max-w-md mx-auto', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            'mystical-card rounded-xl p-4 cursor-pointer w-full',
            'transition-all duration-300 hover:scale-102 hover:shadow-lg',
            'flex items-center gap-4',
            'min-h-[60px]',
            value === option.value 
              ? 'selected border-2 border-[#ffd700] bg-gradient-to-r from-[#4a2c85] to-[#6d4c41] shadow-yellow-400/50' 
              : 'border-2 border-transparent hover:border-purple-400/50'
          )}
          onClick={() => onChange?.(option.value)}
          data-testid={`gender-${option.value}`}
        >
          {/* Icône discrète à gauche */}
          <div className={cn(
            'text-2xl w-10 h-10 flex items-center justify-center rounded-full',
            'bg-purple-900/50',
            value === option.value && 'bg-yellow-400/20 text-yellow-300'
          )}>
            {option.icon}
          </div>

          {/* Label */}
          <div className={cn(
            'text-lg font-semibold flex-1 text-left',
            value === option.value ? 'text-[#ffd700]' : 'text-purple-200'
          )}>
            {option.label}
          </div>

          {/* Indicateur de sélection */}
          {value === option.value && (
            <div className="text-yellow-400 text-xl animate-pulse">
              ✓
            </div>
          )}
        </button>
      ))}
    </div>
  );
}