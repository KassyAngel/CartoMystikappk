import SummaryCard from '@/components/SummaryCard';
import MysticalButton from '@/components/MysticalButton';
import { OracleData, OracleCard, UserSession, OracleType } from '@shared/schema';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSecureRandomInt } from '@/lib/utils';
import { getTimeUntilMidnight } from '@/lib/dailyLimit';
import { Share } from 'lucide-react'; // Import Share icon

interface CardSection {
  icon: string;
  title: string;
  content: string;
}

interface InterpretationPageProps {
  user: UserSession;
  oracle: OracleData;
  oracleType: OracleType;
  selectedCardIndices: number[];
  selectedCards: OracleCard[];
  onBack: () => void;
  onHome: () => void;
  onCrystalBall?: () => void;
  onSaveReading?: (reading: any) => Promise<void>;
  onNavigate: (path: string) => void; // Added for navigation
  interpretation: string; // Added for sharing
}

export default function InterpretationPage({
  user,
  oracle,
  oracleType,
  selectedCardIndices,
  selectedCards,
  onBack,
  onHome,
  onSaveReading, // ⚠️ Gardé dans les props mais non utilisé (sauvegarde déjà faite dans CardGame)
  onCrystalBall,
  onNavigate, // Added for navigation
  interpretation // Added for sharing
}: InterpretationPageProps) {
  const { t } = useLanguage();

  const normalizeCardName = (cardName: string): string => {
    return cardName
      .replace(/\s+/g, '')
      .replace(/'/g, '')
      .replace(/'/g, '')
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[ÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÑÇà]/g, (match) => {
        const accents = 'ÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÑÇà';
        const normal = 'AAAAAAEEEEIIIIOOOOOUUUUNCa';
        return normal[accents.indexOf(match)] || match;
      });
  };

  const isDailyReading = oracleType === 'daily';

  const generateInterpretationSections = () => {
    const genderText = t(`interpretation.gender.${user.gender || 'autre'}`);
    const genderSuffix = user.gender === 'femme' ? 'e' : '';

    const getTranslatedZodiacName = (): string => {
      if (!user.zodiacSign?.name) return '';
      const signMapping: Record<string, string> = {
        'Bélier': 'aries', 'Taureau': 'taurus', 'Gémeaux': 'gemini',
        'Cancer': 'cancer', 'Lion': 'leo', 'Vierge': 'virgo',
        'Balance': 'libra', 'Scorpion': 'scorpio', 'Sagittaire': 'sagittarius',
        'Capricorne': 'capricorn', 'Verseau': 'aquarius', 'Poissons': 'pisces'
      };
      const englishKey = signMapping[user.zodiacSign.name];
      return englishKey ? t(`zodiac.signs.${englishKey}`) : user.zodiacSign.name;
    };

    const zodiacName = getTranslatedZodiacName();

    const getRandomCardMeaning = (cardName: string, oracleType: 'tarot' | 'angels' | 'runes' | 'daily'): string => {
      const normalizedName = normalizeCardName(cardName);
      const baseMeaningKey = `cards.${oracleType}.${normalizedName}.meaning`;
      const var1 = t(`${baseMeaningKey}.var1`, { genderSuffix });
      const var2 = t(`${baseMeaningKey}.var2`, { genderSuffix });
      const var3 = t(`${baseMeaningKey}.var3`, { genderSuffix });
      const variations = [var1, var2, var3].filter(v => !v.includes(`cards.${oracleType}`));
      if (variations.length > 0) {
        return variations[getSecureRandomInt(0, variations.length - 1)];
      }
      return t(baseMeaningKey, { genderSuffix });
    };

    const getRandomGreeting = (oracleType: string): string => {
      const variations = {
        daily: [
          t('interpretation.daily.greeting', { name: user.name }),
          t('interpretation.daily.greeting.var1', { name: user.name }),
          t('interpretation.daily.greeting.var2', { name: user.name }),
          t('interpretation.daily.greeting.var3', { name: user.name }),
          t('interpretation.daily.greeting.var4', { name: user.name })
        ],
        tarot: [
          t('interpretation.tarot.greeting', { name: user.name }),
          t('interpretation.tarot.greeting.var1', { name: user.name }),
          t('interpretation.tarot.greeting.var2', { name: user.name }),
          t('interpretation.tarot.greeting.var3', { name: user.name }),
          t('interpretation.tarot.greeting.var4', { name: user.name })
        ],
        angels: [
          t('interpretation.angels.greeting', { name: user.name }),
          t('interpretation.angels.greeting.var1', { name: user.name }),
          t('interpretation.angels.greeting.var2', { name: user.name }),
          t('interpretation.angels.greeting.var3', { name: user.name }),
          t('interpretation.angels.greeting.var4', { name: user.name })
        ],
        runes: [
          t('interpretation.runes.greeting', { name: user.name, genderSuffix }),
          t('interpretation.runes.greeting.var1', { name: user.name }),
          t('interpretation.runes.greeting.var2', { name: user.name }),
          t('interpretation.runes.greeting.var3', { name: user.name }),
          t('interpretation.runes.greeting.var4', { name: user.name })
        ]
      };
      const oracleVariations = variations[oracleType as keyof typeof variations] || variations.tarot;
      return oracleVariations[getSecureRandomInt(0, oracleVariations.length - 1)];
    };

    const getRandomAdvice = (): string => {
      const adviceVariations = [
        t('interpretation.advice.var1', { genderSuffix }),
        t('interpretation.advice.var2'),
        t('interpretation.advice.var3'),
        t('interpretation.advice.var4', { genderSuffix }),
        t('interpretation.advice.var5', { genderSuffix }),
        t('interpretation.advice.var6', { genderSuffix }),
        t('interpretation.advice.var7'),
        t('interpretation.advice.var8'),
        t('interpretation.advice.var9'),
        t('interpretation.advice.var10')
      ];
      const selectedAdvice = adviceVariations[getSecureRandomInt(0, adviceVariations.length - 1)];
      return selectedAdvice.replace('{genderSuffix}', genderSuffix);
    };

    const createTarotAdviceSentence = (name: string, zodiacSign: string): string => {
      const templates = [
        t('interpretation.tarot.template.advice.var1', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var2', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var3', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var4', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var5', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var6', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var7', { name, zodiacSign, genderText }),
        t('interpretation.tarot.template.advice.var8', { name, zodiacSign, genderText })
      ];
      const selectedTemplate = templates[getSecureRandomInt(0, templates.length - 1)];
      return `${selectedTemplate} ${getRandomAdvice()}`;
    };

    const createAngelsMessageSentence = (name: string, zodiacSign: string): string => {
      const templates = [
        t('interpretation.angels.template.message.var1', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var2', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var3', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var4', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var5', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var6', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var7', { name, zodiacSign, genderText }),
        t('interpretation.angels.template.message.var8', { name, zodiacSign, genderText })
      ];
      const selectedTemplate = templates[getSecureRandomInt(0, templates.length - 1)];
      return `${selectedTemplate.replace('{genderSuffix}', genderSuffix)} ${getRandomAdvice()}`;
    };

    const sections: CardSection[] = [];
    let finalMessage = '';
    let greeting = '';

    if (isDailyReading) {
      const dailyCard = selectedCards[0];
      const fallbackZodiac = zodiacName || t('interpretation.fallback.zodiac');
      const dailyCardName = t(`cards.daily.${normalizeCardName(dailyCard.name)}.name`) || dailyCard.name;
      const dailyCardMeaning = getRandomCardMeaning(dailyCard.name, 'daily');

      sections.push({
        icon: '☀️',
        title: dailyCardName,
        content: dailyCardMeaning
      });

      const getRandomWisdom = (zodiacSign: string): string => {
        const variations = [
          'interpretation.daily.wisdom',
          'interpretation.daily.wisdom.var1',
          'interpretation.daily.wisdom.var2',
          'interpretation.daily.wisdom.var3',
          'interpretation.daily.wisdom.var4',
          'interpretation.daily.wisdom.var5'
        ];
        const randomKey = variations[getSecureRandomInt(0, variations.length - 1)];
        const translated = t(randomKey, { zodiacSign });
        return translated.includes('interpretation.daily')
          ? t('interpretation.daily.wisdom', { zodiacSign })
          : translated;
      };

      finalMessage = getRandomWisdom(fallbackZodiac);
      greeting = getRandomGreeting('daily');

    } else if (oracle.title === 'Tarot de Marseille') {
      const fallbackZodiac = zodiacName || t('interpretation.fallback.zodiac');
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];

      const card1Name = t(`cards.tarot.${normalizeCardName(card1.name)}.name`) || card1.name;
      const card2Name = t(`cards.tarot.${normalizeCardName(card2.name)}.name`) || card2.name;
      const card3Name = t(`cards.tarot.${normalizeCardName(card3.name)}.name`) || card3.name;

      sections.push(
        {
          icon: '✨',
          title: `${card1Name}`,
          content: getRandomCardMeaning(card1.name, 'tarot')
        },
        {
          icon: '🌙',
          title: `${card2Name}`,
          content: getRandomCardMeaning(card2.name, 'tarot')
        },
        {
          icon: '⭐',
          title: `${card3Name}`,
          content: getRandomCardMeaning(card3.name, 'tarot')
        }
      );

      finalMessage = createTarotAdviceSentence(user.name, fallbackZodiac);
      greeting = getRandomGreeting('tarot');

    } else if (oracle.title === 'Oracle des Anges') {
      const fallbackZodiac = zodiacName || t('interpretation.fallback.angels');
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];

      const card1Name = t(`cards.angels.${normalizeCardName(card1.name)}.name`) || card1.name;
      const card2Name = t(`cards.angels.${normalizeCardName(card2.name)}.name`) || card2.name;
      const card3Name = t(`cards.angels.${normalizeCardName(card3.name)}.name`) || card3.name;

      sections.push(
        {
          icon: '👼',
          title: card1Name,
          content: getRandomCardMeaning(card1.name, 'angels')
        },
        {
          icon: '✨',
          title: card2Name,
          content: getRandomCardMeaning(card2.name, 'angels')
        },
        {
          icon: '🌟',
          title: card3Name,
          content: getRandomCardMeaning(card3.name, 'angels')
        }
      );

      finalMessage = createAngelsMessageSentence(user.name, fallbackZodiac);
      greeting = getRandomGreeting('angels');

    } else {
      // Runes
      const fallbackZodiac = zodiacName || t('interpretation.fallback.runes');
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];

      const card1Name = t(`cards.runes.${normalizeCardName(card1.name)}.name`) || card1.name;
      const card2Name = t(`cards.runes.${normalizeCardName(card2.name)}.name`) || card2.name;
      const card3Name = t(`cards.runes.${normalizeCardName(card3.name)}.name`) || card3.name;

      sections.push(
        {
          icon: 'ᚱ',
          title: card1Name,
          content: getRandomCardMeaning(card1.name, 'runes')
        },
        {
          icon: 'ᚢ',
          title: card2Name,
          content: getRandomCardMeaning(card2.name, 'runes')
        },
        {
          icon: 'ᚦ',
          title: card3Name,
          content: getRandomCardMeaning(card3.name, 'runes')
        }
      );

      finalMessage = t('interpretation.runes.advice', { genderText, name: user.name, zodiacSign: fallbackZodiac }).replace('{genderSuffix}', genderSuffix) + ' ' + getRandomAdvice();
      greeting = getRandomGreeting('runes');
    }

    return { sections, finalMessage, greeting };
  };

  const { sections, finalMessage, greeting } = generateInterpretationSections();

  const handleNewConsultation = () => {
    onNavigate('oracle');
  };

  // 📱 Fonction de partage social
  const handleShare = async () => {
    const shareText = `✨ ${t('oracle.' + oracleType + '.title')} - CartoMystik\n\n${interpretation}\n\n🔮 Découvrez votre destinée sur CartoMystik !`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'CartoMystik - Mon Tirage',
          text: shareText,
        });
        console.log('✅ Partage réussi');
      } else {
        // Fallback : copier dans le presse-papier
        await navigator.clipboard.writeText(shareText);
        alert(t('share.copied') || '✅ Copié dans le presse-papier !');
      }
    } catch (error) {
      console.log('❌ Partage annulé ou erreur:', error);
    }
  };

  return (
    <div className="interpretation-page min-h-screen flex flex-col justify-between p-2 sm:p-3">
      <div className="interpretation-header text-center pt-20 sm:pt-24">
        <h1 className="mystical-title text-lg sm:text-xl md:text-2xl font-bold font-serif mb-1 sm:mb-2 leading-tight">
          {isDailyReading
            ? t('interpretation.title.daily', { name: user.name })
            : t('interpretation.title.reading', { name: user.name })
          }
        </h1>
        <p className="text-[#b19cd9] text-xs sm:text-sm italic">
          {greeting}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center py-2">
        <SummaryCard
          title={t('revelation.summary.title')}
          sections={sections}
          finalMessage={finalMessage}
          isVisible={true}
        />
      </div>

      <div className="interpretation-controls flex flex-col gap-2 sm:gap-3 text-center pb-1">
        {isDailyReading ? (
          <>
            <div className="bg-purple-900/30 rounded-xl p-4 backdrop-blur-sm border border-purple-500/30 mb-2">
              <p className="text-[#ffd700] text-sm font-semibold mb-1">
                {t('interpretation.dailyComplete')}
              </p>
              <p className="text-[#b19cd9] text-xs">
                {t('interpretation.timeUntilReset', {
                  hours: getTimeUntilMidnight().hours,
                  minutes: getTimeUntilMidnight().minutes
                })}
              </p>
            </div>

            <MysticalButton
              variant="primary"
              onClick={onCrystalBall}
              className="min-h-[44px]"
            >
              🔮 {t('interpretation.consultCrystalBall')}
            </MysticalButton>

            <MysticalButton
              variant="secondary"
              onClick={onHome}
              className="min-h-[44px]"
            >
              {t('common.backHome')}
            </MysticalButton>
          </>
        ) : (
          <div className="flex gap-3 w-full max-w-md">
            <MysticalButton
              onClick={handleShare}
              className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Share size={18} />
              {t('share.button') || '📤 Partager'}
            </MysticalButton>

            <MysticalButton
              onClick={handleNewConsultation}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              data-testid="button-new-consultation"
            >
              {t('interpretation.newConsultation')}
            </MysticalButton>
          </div>
        )}
      </div>
    </div>
  );
}