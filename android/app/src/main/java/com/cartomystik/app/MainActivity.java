package com.cartomystik.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;



public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        // ✅ Libère la mémoire WebView quand le système est en pression mémoire
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().freeMemory();
            this.bridge.getWebView().clearCache(true);
        }
    }
}
