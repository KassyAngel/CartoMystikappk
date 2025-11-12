import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MysticalButton from '@/components/MysticalButton';
import { LocalNotifications } from '@capacitor/local-notifications';

interface NotificationPermissionModalProps {
  onClose: () => void;
}

// ✅ Fonction utilitaire pour créer/recréer les notifications avec la langue actuelle
export async function scheduleNotificationWithLanguage(t: (key: string) => string) {
  try {
    console.log('🔔 [NOTIF] Planification avec langue:', t('common.language'));

    // ✅ Créer le canal avec les traductions actuelles
    await LocalNotifications.createChannel({
      id: 'daily-tirage',
      name: t('notification.channel.name'),
      importance: 5,
      description: t('notification.channel.description'),
      sound: 'default',
      vibration: true,
      visibility: 1,
    });

    // Phrases mystiques traduites
    const notificationVariants = [
      { title: t('notification.variants.1.title'), body: t('notification.variants.1.body') },
      { title: t('notification.variants.2.title'), body: t('notification.variants.2.body') },
      { title: t('notification.variants.3.title'), body: t('notification.variants.3.body') },
      { title: t('notification.variants.4.title'), body: t('notification.variants.4.body') },
      { title: t('notification.variants.5.title'), body: t('notification.variants.5.body') },
    ];

    const randomVariant = notificationVariants[Math.floor(Math.random() * notificationVariants.length)];

    console.log('⏰ [NOTIF] Planification pour: 10h00 locale');
    console.log('📝 Message:', randomVariant.title);

    // ✅ Annuler les anciennes notifications avant d'en créer de nouvelles
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: randomVariant.title,
          body: randomVariant.body,
          schedule: {
            on: {
              hour: 10,
              minute: 0,
            },
            repeats: true,
            allowWhileIdle: true,
          },
          sound: 'default',
          smallIcon: 'ic_notification',
          largeIcon: 'ic_launcher',
          largeBody: randomVariant.body,
          summaryText: 'CartoMystik',
          actionTypeId: 'OPEN_APP',
          extra: {
            action: 'daily_reading'
          },
          ongoing: false,
          autoCancel: true,
          channelId: 'daily-tirage',
        },
      ],
    });

    console.log('✅ Notification quotidienne programmée');
    localStorage.setItem('notificationLanguage', t('common.language') || 'fr'); // ✅ Sauvegarder la langue
    return true;
  } catch (err) {
    console.error('❌ Erreur planification notification:', err);
    return false;
  }
}

export default function NotificationPermissionModal({ onClose }: NotificationPermissionModalProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAccept = async () => {
    try {
      console.log('🔔 [NOTIF] Début de la demande de permission...');
      const permission = await LocalNotifications.requestPermissions();
      console.log('🔔 [NOTIF] Permission reçue:', JSON.stringify(permission));

      if (permission.display === 'granted') {
        console.log('✅ [NOTIF] Permission accordée');

        // ✅ Utiliser la fonction utilitaire
        const success = await scheduleNotificationWithLanguage(t);

        if (success) {
          localStorage.setItem('notificationPermission', 'granted');
          localStorage.setItem('notificationTime', '10:00');
          localStorage.setItem('notificationTimezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
        }
      } else {
        localStorage.setItem('notificationPermission', 'denied');
        console.log('❌ Permission refusée');
      }
    } catch (err) {
      console.error('❌ Erreur notifications:', err);
      localStorage.setItem('notificationPermission', 'error');
    }

    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleDecline = () => {
    localStorage.setItem('notificationPermission', 'denied');
    console.log('🔕 Notifications refusées');
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
          <MysticalButton variant="primary" onClick={handleAccept} className="w-full">
            🔔 {t('notification.modal.accept')}
          </MysticalButton>

          <button onClick={handleDecline} className="text-purple-300 hover:text-purple-100 text-sm transition-colors">
            {t('notification.modal.decline')}
          </button>
        </div>

        <p className="text-purple-400 text-xs text-center mt-4 italic">
          {t('notification.modal.note')}
        </p>
      </div>
    </div>
  );
}