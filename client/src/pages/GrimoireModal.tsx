import React, { useState, useMemo } from "react";
import { Reading } from "@/App";
import { useLanguage } from "@/contexts/LanguageContext";

interface GrimoireModalProps {
  isPremium: boolean;
  readings: Reading[];
  onSaveNote: (readingId: string, note: string) => Promise<void>;
  onToggleFavorite: (readingId: string) => Promise<void>;
  onClose: () => void;
}

const GrimoireModal = ({
  isPremium,
  readings,
  onSaveNote,
  onToggleFavorite,
  onClose,
}: GrimoireModalProps) => {
  const [expandedReadings, setExpandedReadings] = useState<Set<string>>(new Set());
  const { t, language } = useLanguage();

  // 🔧 Dédupliquer les lectures (par date et type)
  const uniqueReadings = useMemo(() => {
    console.log('📚 Total readings:', readings.length);
    console.log('📖 All readings:', readings);

    const seen = new Map<string, Reading>();

    readings.forEach(reading => {
      // Créer une clé unique basée sur plusieurs critères
      const dateKey = new Date(reading.date).toISOString().split('T')[0]; // YYYY-MM-DD
      const cardsKey = reading.cards ? reading.cards.sort().join(',') : '';
      const key = `${dateKey}-${reading.type}-${cardsKey}`;

      console.log('🔑 Reading key:', key, reading);

      // Garder seulement la première occurrence
      if (!seen.has(key)) {
        seen.set(key, reading);
      } else {
        console.log('⚠️ Duplicate found:', key);
      }
    });

    const unique = Array.from(seen.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    console.log('✅ Unique readings:', unique.length);
    return unique;
  }, [readings]);

  const toggleExpand = (readingId: string) => {
    setExpandedReadings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(readingId)) {
        newSet.delete(readingId);
      } else {
        newSet.add(readingId);
      }
      return newSet;
    });
  };

  const displayedReadings = isPremium ? uniqueReadings : uniqueReadings.slice(0, 3);

  // 🎨 Fonction pour obtenir le badge coloré selon le type d'oracle
  const getOracleBadge = (type: string) => {
    const badges = {
      tarot: { emoji: '🔮', label: t("grimoire.oracle.tarot"), color: 'bg-purple-600' },
      angels: { emoji: '👼', label: t("grimoire.oracle.angels"), color: 'bg-blue-500' },
      runes: { emoji: 'ᚱ', label: t("grimoire.oracle.runes"), color: 'bg-amber-600' },
      oracle: { emoji: '☀️', label: t("grimoire.oracle.daily"), color: 'bg-yellow-500' },
      crystalBall: { emoji: '🔮', label: t("grimoire.oracle.crystalBall"), color: 'bg-indigo-600' },
      horoscope: { emoji: '♈', label: t("grimoire.oracle.horoscope"), color: 'bg-pink-600' },
      daily: { emoji: '☀️', label: t("grimoire.oracle.daily"), color: 'bg-yellow-500' },
    };
    return badges[type as keyof typeof badges] || badges.oracle;
  };

  // 🌍 Normaliser le nom de carte pour obtenir la clé de traduction
  const normalizeCardName = (cardName: string): string => {
    if (!cardName) return '';

    // Pour les clés de traduction, on garde le nom EXACT mais on retire juste les espaces
    // Exemple: "Le Fou" → "LeFou", "L'Amoureux" → "LAmoureux"
    return cardName
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Enlève les accents (compatible ES5)
    .replace(/\s+/g, '')
    .replace(/'/g, '');
    // PAS de toLowerCase() car les clés utilisent la casse originale !
  };

  // 🃏 Traduire le nom d'une carte selon le type d'oracle
  const translateCardName = (cardName: string, readingType: string): string => {
    if (!cardName) return '';

    console.log('🔍 Translating card:', { cardName, readingType, language });

    // Déterminer le type d'oracle pour les clés de traduction
    let oracleKey = 'daily';
    if (readingType === 'tarot') oracleKey = 'tarot';
    else if (readingType === 'angels') oracleKey = 'angels';
    else if (readingType === 'runes') oracleKey = 'runes';
    else if (readingType === 'crystalBall') oracleKey = 'daily';
    else if (readingType === 'horoscope') oracleKey = 'horoscope';
    else if (readingType === 'daily') oracleKey = 'daily';

    const normalizedName = normalizeCardName(cardName);
    console.log('📝 Normalized name:', normalizedName);

    // ✅ STRUCTURE CORRECTE : cards.oracleType.CardName.name
    // Exemple: "Le Fou" → "cards.tarot.LeFou.name"
    const possibleKeys = [
      `cards.${oracleKey}.${normalizedName}.name`,
      `cards.${oracleKey}.${normalizedName}`,
      `${oracleKey}.cards.${normalizedName}.name`,
      `${oracleKey}.cards.${normalizedName}`,
    ];

    console.log('🔑 Trying keys:', possibleKeys);

    for (const key of possibleKeys) {
      const translated = t(key);
      console.log(`  ${key} →`, translated);

      // Si la traduction existe et est différente de la clé
      if (translated && translated !== key && translated !== cardName) {
        console.log('✅ Found translation:', translated);
        return translated;
      }
    }

    console.log('❌ No translation found, returning original:', cardName);
    // Si aucune traduction trouvée, retourner le nom original
    return cardName;
  };

  // 📅 Fonction pour formater la date avec l'heure (multilingue)
  const formatDateTime = (date: Date) => {
    const d = new Date(date);

    // Adapter la locale selon la langue
    const localeMap: Record<string, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT'
    };
    const locale = localeMap[language] || 'en-US';

    const dateStr = d.toLocaleDateString(locale, { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
    const timeStr = d.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return { date: dateStr, time: timeStr };
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-purple-500/30">
        {/* Bouton fermer */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/40 text-white text-xl transition-colors z-10"
          aria-label={t("common.close")}
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-yellow-300 pr-8">
          📜 {t("grimoire.title")}
        </h2>

        {!isPremium && (
          <div className="bg-yellow-600/20 border border-yellow-600 rounded-lg p-2.5 mb-3 text-sm">
            <p className="text-yellow-200 font-semibold">
              ⭐ {t("grimoire.free.title")}
            </p>
            <p className="text-yellow-100 text-xs mt-0.5">
              {t("grimoire.free.subtitle")}
            </p>
          </div>
        )}

        {isPremium && (
          <div className="bg-green-600/20 border border-green-500 rounded-lg p-2.5 mb-3">
            <p className="text-green-300 text-sm">✨ {t("grimoire.premium.active")}</p>
          </div>
        )}

        {displayedReadings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-purple-300 text-lg mb-2">🌙 {t("grimoire.empty.title")}</p>
            <p className="text-purple-400 text-sm">{t("grimoire.empty.subtitle")}</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {displayedReadings.map((reading) => {
              const badge = getOracleBadge(reading.type);
              const { date, time } = formatDateTime(reading.date);
              const isExpanded = expandedReadings.has(reading.id);

              return (
                <li 
                  key={reading.id} 
                  className="bg-black/40 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all"
                >
                  {/* En-tête avec badge et date */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5`}>
                        <span>{badge.emoji}</span>
                        <span>{badge.label}</span>
                      </span>
                      {reading.isFavorite && (
                        <span className="text-yellow-400 text-lg" title={t("grimoire.favorite.remove")}>★</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-purple-300 text-sm">📅 {date}</div>
                      <div className="text-purple-400 text-xs">🕐 {time}</div>
                    </div>
                  </div>

                  {/* Cartes tirées - TRADUITES */}
                  {reading.cards && reading.cards.length > 0 && (
                    <div className="mb-3 bg-purple-900/30 rounded-lg p-3 border border-purple-500/20">
                      <div className="text-purple-300 text-sm font-semibold mb-2">
                        🎴 {t("grimoire.cards.title")}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {reading.cards.map((card, idx) => {
                          // 🌍 TRADUCTION DES CARTES
                          const translatedCard = translateCardName(card, reading.type);

                          return (
                            <span 
                              key={idx}
                              className="bg-purple-700/50 text-purple-100 px-2.5 py-1 rounded text-xs border border-purple-500/30"
                            >
                              • {translatedCard}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Bouton pour déplier l'interprétation */}
                  {reading.answer && (
                    <button
                      onClick={() => toggleExpand(reading.id)}
                      className="w-full bg-purple-600/50 hover:bg-purple-600/70 text-white px-4 py-2 rounded-lg transition-all mb-3 flex items-center justify-center gap-2 border border-purple-500/30"
                    >
                      <span>📖 {isExpanded ? t("grimoire.interpretation.hide") : t("grimoire.interpretation.show")}</span>
                      <span className="text-sm">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                  )}

                  {/* Interprétation complète (dépliable) */}
                  {isExpanded && reading.answer && (
                    <div className="bg-indigo-900/40 rounded-lg p-4 mb-3 border border-indigo-500/30">
                      <div className="text-purple-200 text-sm whitespace-pre-wrap leading-relaxed">
                        {reading.answer}
                      </div>
                    </div>
                  )}

                  {/* Notes personnelles */}
                  <div className="mt-3">
                    <label className="text-purple-300 text-sm font-semibold block mb-2 flex items-center gap-1.5">
                      📝 {t("grimoire.notes.title")}
                    </label>
                    <input
                      type="text"
                      defaultValue={reading.notes}
                      onBlur={(e) => onSaveNote(reading.id, e.target.value)}
                      placeholder={t("grimoire.notes.placeholder")}
                      className="bg-gray-900/80 border border-purple-500/50 focus:border-purple-400 px-3 py-2 rounded-lg text-white w-full transition-colors text-sm"
                    />
                  </div>

                  {/* Bouton favori */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => onToggleFavorite(reading.id)}
                      className={`text-sm px-4 py-2 rounded-lg transition-all font-semibold ${
                        reading.isFavorite 
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                          : 'bg-purple-600/50 hover:bg-purple-600 text-purple-100 border border-purple-500/30'
                      }`}
                    >
                      {reading.isFavorite ? `★ ${t("grimoire.favorite.remove")}` : `☆ ${t("grimoire.favorite.add")}`}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GrimoireModal;