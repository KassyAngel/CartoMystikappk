import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MysticalButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
}

export default function MysticalButton({ 
  children, 
  className, 
  variant = 'primary',
  disabled,
  ...props 
}: MysticalButtonProps) {
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
      data-testid={`button-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      {...props}
    >
      {children}
    </Button>
  );
}