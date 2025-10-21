import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

interface MysticalButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
}

export default function MysticalButton({ 
  children, 
  className, 
  variant = 'primary',
  disabled,
  onClick,
  ...props 
}: MysticalButtonProps) {
  const playRevealSound = useSound('Bouton-reveal.wav');
  

  // ✅ Détecte si c'est un bouton de révélation
  const isRevealButton = () => {
    const text = children?.toString().toLowerCase() || '';
    return text.includes('révél') || text.includes('reveal');
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = children?.toString().toLowerCase() || '';
    console.log('Texte du bouton:', text);
    console.log('Est un bouton révélation?', isRevealButton());

    // Joue le son spécial pour les boutons de révélation
    if (isRevealButton()) {
      console.log('Son révélation joué');
      playRevealSound();
    }

    // Appelle le onClick original s'il existe
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      className={cn(
        'mystical-btn',
        'rounded-full px-6 sm:px-8 lg:px-10 py-3 text-base sm:text-lg font-serif min-w-[120px] sm:min-w-[150px] min-h-12',
        variant === 'primary' && 'mystical-btn',
        variant === 'secondary' && 'bg-white/10 border-2 border-white/30 hover:bg-white/20 hover:border-white/50',
        disabled && 'opacity-50 cursor-not-allowed transform-none',
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      data-testid={`button-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      {...props}
    >
      {children}
    </Button>
  );
}