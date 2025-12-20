package com.cartomystik.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;
import android.util.Log;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "UMP_CONSENT";
    private ConsentInformation consentInformation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // ✅ Seulement le consentement UMP
        requestConsent();
    }

    private void requestConsent() {
        Log.d(TAG, "📋 Demande de consentement UMP...");

        ConsentRequestParameters params = new ConsentRequestParameters.Builder()
                .setTagForUnderAgeOfConsent(false)
                .build();

        consentInformation = UserMessagingPlatform.getConsentInformation(this);

        consentInformation.requestConsentInfoUpdate(
            this,
            params,
            () -> {
                Log.d(TAG, "✅ Infos de consentement chargées");
                if (consentInformation.isConsentFormAvailable()) {
                    loadConsentForm();
                } else {
                    Log.d(TAG, "⏭️ Pas de formulaire à afficher");
                }
            },
            error -> {
                Log.e(TAG, "❌ Erreur: " + error.getMessage());
            }
        );
    }

    private void loadConsentForm() {
        UserMessagingPlatform.loadConsentForm(
            this,
            consentForm -> {
                Log.d(TAG, "📄 Formulaire chargé");
                if (consentInformation.getConsentStatus() == ConsentInformation.ConsentStatus.REQUIRED) {
                    consentForm.show(
                        MainActivity.this,
                        formError -> {
                            if (formError != null) {
                                Log.e(TAG, "❌ Erreur: " + formError.getMessage());
                            } else {
                                Log.d(TAG, "✅ Formulaire fermé");
                            }
                            Log.d(TAG, "🎯 Statut: " + consentInformation.getConsentStatus());
                        }
                    );
                } else {
                    Log.d(TAG, "⏭️ Consentement déjà donné");
                }
            },
            error -> {
                Log.e(TAG, "❌ Erreur chargement: " + error.getMessage());
            }
        );
    }
}