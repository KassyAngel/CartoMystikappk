package com.cartomystik.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        // Libérer la mémoire WebView quand mémoire faible
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().freeMemory();
            this.bridge.getWebView().clearCache(true);
        }
    }
}