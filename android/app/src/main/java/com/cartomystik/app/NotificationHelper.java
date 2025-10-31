
package com.cartomystik.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

public class NotificationHelper {
    
    private static final String CHANNEL_ID = "default_channel_id";
    private static final String CHANNEL_NAME = "CartoMystik Notifications";
    private static final String CHANNEL_DESCRIPTION = "Notifications pour vos tirages quotidiens";

    public static void createNotificationChannel(Context context) {
        // Les canaux de notification sont requis pour Android 8.0 (API 26) et supérieur
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = 
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

            // Vérifier si le canal existe déjà
            NotificationChannel existingChannel = notificationManager.getNotificationChannel(CHANNEL_ID);
            
            if (existingChannel == null) {
                // Créer le canal avec une importance élevée
                NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_HIGH
                );
                
                channel.setDescription(CHANNEL_DESCRIPTION);
                channel.enableLights(true);
                channel.enableVibration(true);
                channel.setShowBadge(true);
                
                // Enregistrer le canal
                notificationManager.createNotificationChannel(channel);
            }
        }
    }
}
