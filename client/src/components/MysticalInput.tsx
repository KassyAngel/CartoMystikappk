import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MysticalInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;  // Ajouté ici
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // si tu veux aussi gérer ça
  className?: string;
  maxLength?: number;
  type?: 'text' | 'email' | 'password';
  'data-testid'?: string;
}

export default function MysticalInput({ 
  placeholder, 
  value, 
  onChange, 
  onKeyDown,
  onKeyPress,
  className,
  maxLength,
  type = 'text',
  'data-testid': testId,
  ...props 
}: MysticalInputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={onKeyDown}      // passé ici
      onKeyPress={onKeyPress}    // passé ici (optionnel)
      maxLength={maxLength}
      className={cn(
        'mystical-input',
        'rounded-full py-4 px-6 text-lg text-center font-serif',
        'bg-white/10 border-2 border-[#6d4c41] text-white placeholder:text-white/80',
        'focus:border-[#ffd700] focus:ring-0 focus:outline-none',
        'max-w-md mx-auto',
        'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
        className
      )}
      data-testid={testId}
      {...props}
    />
  );
}
