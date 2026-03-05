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

    await LocalNotifications.createChannel({
      id: 'daily-tirage',
      name: t('notification.channel.name'),
      importance: 5,
      description: t('notification.channel.description'),
      sound: 'default',
      vibration: true,
      visibility: 1,
    });

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

    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: randomVariant.title,
          body: randomVariant.body,
          schedule: {
            on: { hour: 10, minute: 0 },
            repeats: true,
            allowWhileIdle: true,
          },
          sound: 'default',
          smallIcon: 'ic_notification',
          largeIcon: 'ic_launcher',
          largeBody: randomVariant.body,
          summaryText: 'CartoMystik',
          actionTypeId: 'OPEN_APP',
          extra: { action: 'daily_reading' },
          ongoing: false,
          autoCancel: true,
          channelId: 'daily-tirage',
        },
      ],
    });

    console.log('✅ Notification quotidienne programmée');
    localStorage.setItem('notificationLanguage', t('common.language') || 'fr');
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .np-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(4,0,16,0.88);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          font-family: 'Jost', sans-serif;
          transition: opacity 0.3s ease;
        }
        .np-overlay.hidden { opacity: 0; pointer-events: none; }
        .np-overlay.visible { opacity: 1; }

        .np-card {
          width: 100%; max-width: 360px;
          background: linear-gradient(160deg, #120224 0%, #07040f 60%, #0b0318 100%);
          border: 1px solid rgba(201,168,76,0.22);
          border-radius: 4px;
          padding: 36px 28px 28px;
          position: relative; text-align: center;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
        }
        .np-overlay.hidden .np-card { transform: scale(0.94); opacity: 0; }
        .np-overlay.visible .np-card { transform: scale(1); opacity: 1; }

        /* Coins dorés */
        .np-c { position:absolute; width:8px; height:8px; border-color:rgba(201,168,76,0.35); border-style:solid; }
        .np-tl{top:0;left:0;border-width:1px 0 0 1px}
        .np-tr{top:0;right:0;border-width:1px 1px 0 0}
        .np-bl{bottom:0;left:0;border-width:0 0 1px 1px}
        .np-br{bottom:0;right:0;border-width:0 1px 1px 0}

        /* Icône cloche */
        .np-icon-wrap {
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 20px;
        }
        .np-bell {
          font-size: 44px; line-height: 1; margin-bottom: 10px;
          filter: drop-shadow(0 0 16px rgba(201,168,76,0.5));
          animation: np-bell-pulse 3s ease-in-out infinite;
        }
        @keyframes np-bell-pulse {
          0%,100% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(201,168,76,0.4)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 0 24px rgba(201,168,76,0.7)); }
        }
        .np-dots {
          display: flex; gap: 8px; align-items: center;
        }
        .np-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(201,168,76,0.5);
          animation: np-dot-pulse 2s ease-in-out infinite;
        }
        .np-dot:nth-child(2) { animation-delay: 0.3s; }
        .np-dot:nth-child(3) { animation-delay: 0.6s; }
        @keyframes np-dot-pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

        /* Titre */
        .np-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 300; font-style: italic;
          color: #E8D080; margin-bottom: 10px; letter-spacing: 0.3px;
        }

        /* Description */
        .np-desc {
          font-size: 13px; font-weight: 300;
          color: rgba(247,242,234,0.72);
          line-height: 1.7; margin-bottom: 22px;
        }

        /* Avantages */
        .np-benefits {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 14px 16px;
          margin-bottom: 24px; text-align: left;
          display: flex; flex-direction: column; gap: 10px;
        }
        .np-benefit {
          display: flex; align-items: flex-start; gap: 12px;
        }
        .np-benefit-icon {
          width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
        }
        .np-benefit-text {
          font-size: 13px; font-weight: 300;
          color: rgba(247,242,234,0.82);
          line-height: 1.5; padding-top: 5px;
        }

        /* Séparateur */
        .np-sep {
          height: 1px; margin: 0 0 22px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent);
        }

        /* Bouton principal */
        .np-accept-btn {
          width: 100%; padding: 15px 20px; margin-bottom: 14px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.38);
          border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 300;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: rgba(201,168,76,0.92);
          cursor: pointer; transition: all 0.25s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .np-accept-btn:hover {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.65);
          color: #C9A84C;
          box-shadow: 0 0 24px rgba(201,168,76,0.12);
        }
        .np-accept-btn:active { transform: scale(0.98); }

        /* Refuser */
        .np-decline-btn {
          display: block; width: 100%; padding: 10px;
          background: none; border: none;
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 300; letter-spacing: 0.5px;
          color: rgba(247,242,234,0.45);
          cursor: pointer; transition: color 0.2s; margin-bottom: 16px;
        }
        .np-decline-btn:hover { color: rgba(247,242,234,0.72); }

        /* Note bas */
        .np-note {
          font-family: 'Playfair Display', serif;
          font-size: 11px; font-style: italic; font-weight: 300;
          color: rgba(247,242,234,0.3); line-height: 1.6;
        }
      `}</style>

      <div className={`np-overlay ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="np-card">
          {/* Coins déco */}
          <div className="np-c np-tl"/><div className="np-c np-tr"/>
          <div className="np-c np-bl"/><div className="np-c np-br"/>

          {/* Icône */}
          <div className="np-icon-wrap">
            <div className="np-bell">🔔</div>
            <div className="np-dots">
              <div className="np-dot"/><div className="np-dot"/><div className="np-dot"/>
            </div>
          </div>

          {/* Titre */}
          <div className="np-title">{t('notification.modal.title')}</div>

          {/* Description */}
          <p className="np-desc">{t('notification.modal.description')}</p>

          {/* Avantages */}
          <div className="np-benefits">
            <div className="np-benefit">
              <div className="np-benefit-icon">🔮</div>
              <div className="np-benefit-text">{t('notification.modal.benefit1')}</div>
            </div>
            <div className="np-benefit">
              <div className="np-benefit-icon">☽</div>
              <div className="np-benefit-text">{t('notification.modal.benefit2')}</div>
            </div>
            <div className="np-benefit">
              <div className="np-benefit-icon">✦</div>
              <div className="np-benefit-text">{t('notification.modal.benefit3')}</div>
            </div>
          </div>

          <div className="np-sep"/>

          {/* Bouton accepter */}
          <button className="np-accept-btn" onClick={handleAccept}>
            <span>🔔</span>
            <span>{t('notification.modal.accept')}</span>
          </button>

          {/* Refuser */}
          <button className="np-decline-btn" onClick={handleDecline}>
            {t('notification.modal.decline')}
          </button>

          {/* Note */}
          <p className="np-note">{t('notification.modal.note')}</p>
        </div>
      </div>
    </>
  );
}