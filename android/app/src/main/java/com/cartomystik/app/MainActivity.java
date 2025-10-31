
package com.cartomystik.app;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Créer le canal de notification au démarrage de l'application
        NotificationHelper.createNotificationChannel(this);
        
        // 🔧 Optimisations WebView pour réduire OOM
        WebView.setWebContentsDebuggingEnabled(false); // Désactiver le débogage en production
        
        // Activer le cache DOM pour réduire la mémoire
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().getSettings().setDomStorageEnabled(true);
            this.bridge.getWebView().getSettings().setDatabaseEnabled(true);
            this.bridge.getWebView().getSettings().setCacheMode(android.webkit.WebSettings.LOAD_DEFAULT);
        }
    }
    
    @Override
    public void onLowMemory() {
        super.onLowMemory();
        // 🔧 Libérer la mémoire WebView quand mémoire faible
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().freeMemory();
            this.bridge.getWebView().clearCache(true);
        }
    }
}
