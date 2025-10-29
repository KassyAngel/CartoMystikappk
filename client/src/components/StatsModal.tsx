
import React, { useMemo } from 'react';
import { Reading } from '@/App';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatsModalProps {
  readings: Reading[];
  onClose: () => void;
}

const StatsModal = ({ readings, onClose }: StatsModalProps) => {
  const { t } = useLanguage();

  // 📊 Calcul des statistiques
  const stats = useMemo(() => {
    const total = readings.length;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonth = readings.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    const thisWeek = readings.filter(r => {
      const d = new Date(r.date);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return d >= weekAgo;
    }).length;

    // 📈 Oracle préféré
    const oracleCount: Record<string, number> = {};
    readings.forEach(r => {
      oracleCount[r.type] = (oracleCount[r.type] || 0) + 1;
    });
    const favoriteOracle = Object.entries(oracleCount).sort((a, b) => b[1] - a[1])[0];

    // ⭐ Cartes favorites (les plus tirées)
    const cardCount: Record<string, number> = {};
    readings.forEach(r => {
      r.cards?.forEach(card => {
        cardCount[card] = (cardCount[card] || 0) + 1;
      });
    });
    const topCards = Object.entries(cardCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      total,
      thisMonth,
      thisWeek,
      favoriteOracle: favoriteOracle ? {
        type: favoriteOracle[0],
        count: favoriteOracle[1]
      } : null,
      topCards
    };
  }, [readings]);

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-purple-500/30">
        
        {/* Bouton fermer */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/40 text-white text-xl transition-colors z-10"
          aria-label={t("common.close") || "Fermer"}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-yellow-300 pr-8">
          📊 {t('stats.title') || 'Mes Statistiques'}
        </h2>

        {/* Statistiques générales */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-800/40 border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-300">{stats.total}</div>
            <div className="text-sm text-purple-300">{t('stats.total') || 'Total'}</div>
          </div>
          <div className="bg-blue-800/40 border border-blue-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-300">{stats.thisMonth}</div>
            <div className="text-sm text-blue-300">{t('stats.thisMonth') || 'Ce mois'}</div>
          </div>
          <div className="bg-indigo-800/40 border border-indigo-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-pink-300">{stats.thisWeek}</div>
            <div className="text-sm text-indigo-300">{t('stats.thisWeek') || 'Cette semaine'}</div>
          </div>
        </div>

        {/* Oracle préféré */}
        {stats.favoriteOracle && (
          <div className="bg-purple-900/40 border border-purple-500/30 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">
              🏆 {t('stats.favoriteOracle') || 'Oracle préféré'}
            </h3>
            <div className="text-white">
              {t(`oracle.${stats.favoriteOracle.type}.title`) || stats.favoriteOracle.type}
              <span className="text-purple-300 ml-2">({stats.favoriteOracle.count} tirages)</span>
            </div>
          </div>
        )}

        {/* Top 3 cartes */}
        {stats.topCards.length > 0 && (
          <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-300 mb-3">
              ⭐ {t('stats.topCards') || 'Cartes les plus tirées'}
            </h3>
            <div className="space-y-2">
              {stats.topCards.map(([card, count], idx) => (
                <div key={card} className="flex items-center justify-between bg-purple-800/30 rounded px-3 py-2">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-xl">{['🥇', '🥈', '🥉'][idx]}</span>
                    {card}
                  </span>
                  <span className="text-purple-300">{count}x</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {readings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-purple-300 text-lg">
              {t('stats.empty') || '🌙 Aucun tirage pour le moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsModal;
