import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: Language) => {
    console.log('👤 Utilisateur change de langue:', language, '→', value);
    setLanguage(value); // ✅ Sauvegarde automatique via LanguageContext
  };

  return (
    <div className="flex items-center gap-2 text-white/80">
      <Globe className="w-3 h-3 text-amber-300/80 drop-shadow-md" />
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger 
          className="w-25 bg-white/10 border-white/20 text-white/90 focus:border-[#ffd700]"
          data-testid="select-language"
        >
          <SelectValue>
            {language.toUpperCase()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-purple-900 border-purple-700">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="text-white hover:bg-purple-800 focus:bg-purple-800 cursor-pointer"
              data-testid={`option-${lang.code}`}
            >
              <span className="flex items-center gap-2">
                {lang.flag} {lang.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}