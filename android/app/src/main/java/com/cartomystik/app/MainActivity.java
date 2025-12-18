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

        // ✅ Demander le consentement UMP au démarrage de l'app
        requestConsent();
    }

    private void requestConsent() {
        Log.d(TAG, "📋 Demande de consentement UMP...");

        // Configuration pour la production (pas de debug)
        ConsentRequestParameters params = new ConsentRequestParameters.Builder()
                .setTagForUnderAgeOfConsent(false)
                .build();

        consentInformation = UserMessagingPlatform.getConsentInformation(this);

        // Demander les infos de consentement
        consentInformation.requestConsentInfoUpdate(
            this,
            params,
            () -> {
                Log.d(TAG, "✅ Infos de consentement chargées");

                // Si un formulaire est disponible, le charger
                if (consentInformation.isConsentFormAvailable()) {
                    loadConsentForm();
                } else {
                    Log.d(TAG, "⏭️ Pas de formulaire à afficher (déjà accepté ou région hors EEE)");
                }
            },
            error -> {
                Log.e(TAG, "❌ Erreur lors de la demande de consentement: " + error.getMessage());
            }
        );
    }

    private void loadConsentForm() {
        UserMessagingPlatform.loadConsentForm(
            this,
            consentForm -> {
                Log.d(TAG, "📄 Formulaire de consentement chargé");

                // Afficher le formulaire si le consentement est requis
                if (consentInformation.getConsentStatus() == ConsentInformation.ConsentStatus.REQUIRED) {
                    consentForm.show(
                        MainActivity.this,
                        formError -> {
                            if (formError != null) {
                                Log.e(TAG, "❌ Erreur lors de l'affichage du formulaire: " + formError.getMessage());
                            } else {
                                Log.d(TAG, "✅ Formulaire fermé par l'utilisateur");
                            }

                            // Après le formulaire, afficher le statut
                            Log.d(TAG, "🎯 Statut de consentement: " + consentInformation.getConsentStatus());
                        }
                    );
                } else {
                    Log.d(TAG, "⏭️ Consentement déjà donné, pas besoin d'afficher le formulaire");
                }
            },
            error -> {
                Log.e(TAG, "❌ Erreur lors du chargement du formulaire: " + error.getMessage());
            }
        );
    }
}