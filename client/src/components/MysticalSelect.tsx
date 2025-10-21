import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface MysticalSelectProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
  'data-testid'?: string;
}

export default function MysticalSelect({ 
  placeholder, 
  value, 
  onChange, 
  options,
  className,
  'data-testid': testId,
  ...props 
}: MysticalSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger 
        className={cn(
          'mystical-input',
          'rounded-xl sm:rounded-2xl py-2.5 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-center font-serif min-w-[70px] sm:min-w-[90px]',
          'bg-white/10 border-2 border-[#6d4c41] text-[#ffd700]',
          'focus:border-[#ffd700] focus:ring-0',
          'data-[placeholder]:text-white/60',
          'transition-all duration-200',
          'hover:bg-white/15 hover:border-[#8b6347]',
          className
        )}
        data-testid={testId}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#2d1b69] border-[#6d4c41] text-[#ffd700] max-h-[240px]">
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="focus:bg-[#4a2c85] focus:text-[#ffd700] cursor-pointer text-sm sm:text-base"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}