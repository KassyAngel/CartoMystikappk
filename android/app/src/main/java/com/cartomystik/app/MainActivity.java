
package com.cartomystik.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Créer le canal de notification au démarrage de l'application
        NotificationHelper.createNotificationChannel(this);
    }
}
