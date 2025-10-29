import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from '@/components/MysticalButton';
import { LocalNotifications } from '@capacitor/local-notifications';

interface NotificationPermissionModalProps {
  onClose: () => void;
}

export default function NotificationPermissionModal({ onClose }: NotificationPermissionModalProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAccept = async () => {
    try {
      const permission = await LocalNotifications.requestPermissions();

      if (permission.display === 'granted') {
        // ✅ Créer le canal de notification
        await LocalNotifications.createChannel({
          id: 'daily-tirage',
          name: t('notification.channel.name'),
          importance: 5,
          description: t('notification.channel.description'),
          sound: 'default',
          vibration: true,
        });

        // ✅ Programmer la notification à 10h LOCALE (respecte le fuseau horaire)
        const now = new Date();
        const triggerTime = new Date();

        // Définir l'heure à 10h00 dans le fuseau horaire LOCAL de l'utilisateur
        triggerTime.setHours(10, 0, 0, 0);

        // Si 10h est déjà passé aujourd'hui, planifier pour demain
        if (triggerTime <= now) {
          triggerTime.setDate(triggerTime.getDate() + 1);
        }

        console.log('🕐 Notification programmée pour:', triggerTime.toLocaleString());
        console.log('🌍 Fuseau horaire:', Intl.DateTimeFormat().resolvedOptions().timeZone);

        // 🎲 Choisir une phrase aléatoire parmi 5 variations
        const notificationVariants = [
          {
            title: t('notification.variants.1.title'),
            body: t('notification.variants.1.body')
          },
          {
            title: t('notification.variants.2.title'),
            body: t('notification.variants.2.body')
          },
          {
            title: t('notification.variants.3.title'),
            body: t('notification.variants.3.body')
          },
          {
            title: t('notification.variants.4.title'),
            body: t('notification.variants.4.body')
          },
          {
            title: t('notification.variants.5.title'),
            body: t('notification.variants.5.body')
          }
        ];

        const randomVariant = notificationVariants[Math.floor(Math.random() * notificationVariants.length)];

        await LocalNotifications.schedule({
          notifications: [
            {
              id: 1,
              title: randomVariant.title,
              body: randomVariant.body,
              schedule: {
                at: triggerTime, // ✅ Date locale respectée
                repeats: true,
                every: 'day',
                allowWhileIdle: true, // ✅ Fonctionne même en mode veille
              },
              sound: 'default',
              actionTypeId: 'OPEN_APP',
              extra: {
                action: 'daily_reading'
              }
            },
          ],
        });

        // ✅ Sauvegarder le choix avec timestamp
        localStorage.setItem('notificationPermission', 'granted');
        localStorage.setItem('notificationTime', '10:00');
        localStorage.setItem('notificationTimezone',Intl.DateTimeFormat().resolvedOptions().timeZone);

        console.log('✅ Notifications quotidiennes activées');
        console.log('⏰ Heure: 10h00 locale');
        console.log('🌍 Fuseau:', Intl.DateTimeFormat().resolvedOptions().timeZone);
      } else {
        localStorage.setItem('notificationPermission', 'denied');
        console.log('❌ Permission refusée');
      }
    } catch (err) {
      console.error('❌ Erreur configuration notifications:', err);
      localStorage.setItem('notificationPermission', 'error');
    }

    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleDecline = () => {
    localStorage.setItem('notificationPermission', 'denied');
    console.log('🔕 Utilisateur a refusé les notifications');
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-6 max-w-md w-full border-2 border-yellow-400/50 shadow-2xl transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-90'}`}>

        {/* Icône mystique */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-2 animate-pulse">🔔</div>
          <div className="text-yellow-300 text-xs">✨ ✦ ✨</div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-yellow-300 text-center mb-3 font-serif">
          {t('notification.modal.title')}
        </h2>

        {/* Description */}
        <p className="text-purple-200 text-center mb-6 leading-relaxed text-sm">
          {t('notification.modal.description')}
        </p>

        {/* Avantages */}
        <div className="bg-black/30 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex items-start gap-2 text-purple-100 text-sm">
            <span className="text-yellow-400 mt-0.5">🔮</span>
            <span>{t('notification.modal.benefit1')}</span>
          </div>
          <div className="flex items-start gap-2 text-purple-100 text-sm">
            <span className="text-yellow-400 mt-0.5">⭐</span>
            <span>{t('notification.modal.benefit2')}</span>
          </div>
          <div className="flex items-start gap-2 text-purple-100 text-sm">
            <span className="text-yellow-400 mt-0.5">✨</span>
            <span>{t('notification.modal.benefit3')}</span>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex flex-col gap-3">
          <MysticalButton
            variant="primary"
            onClick={handleAccept}
            className="w-full"
          >
            🔔 {t('notification.modal.accept')}
          </MysticalButton>

          <button
            onClick={handleDecline}
            className="text-purple-300 hover:text-purple-100 text-sm transition-colors"
          >
            {t('notification.modal.decline')}
          </button>
        </div>

        {/* Note */}
        <p className="text-purple-400 text-xs text-center mt-4 italic">
          {t('notification.modal.note')}
        </p>
      </div>
    </div>
  );
}