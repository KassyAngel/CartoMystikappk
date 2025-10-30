import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'legal' | 'privacy';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const isLegal = type === 'legal';
  const isFrench = language === 'fr';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 z-[60]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-10 bg-white rounded-lg z-[70] flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b bg-gradient-to-r from-purple-900 to-indigo-900">
          <h2 className="text-yellow-300 font-bold text-xl md:text-2xl">
            {isLegal 
              ? (isFrench ? 'Mentions légales' : 'Legal Notice')
              : (isFrench ? 'Politique de confidentialité' : 'Privacy Policy')
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-purple-700/50 transition-colors"
          >
            <X className="w-6 h-6 text-purple-200" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {isLegal ? (
            // Mentions légales
            isFrench ? (
              <LegalContentFR />
            ) : (
              <LegalContentEN />
            )
          ) : (
            // Politique de confidentialité
            isFrench ? (
              <PrivacyContentFR />
            ) : (
              <PrivacyContentEN />
            )
          )}
        </div>
      </div>
    </>
  );
}

// ============= Mentions légales FR =============
function LegalContentFR() {
  return (
    <div className="prose prose-sm md:prose max-w-none">
      <h3 className="text-purple-900 font-bold text-lg mb-4">Éditeur de l'application</h3>
      <p className="mb-4">
        <strong>Nom :</strong> [Votre nom/entreprise]<br />
        <strong>Adresse :</strong> [Votre adresse]<br />
        <strong>Email :</strong> [Votre email]<br />
        <strong>Téléphone :</strong> [Votre téléphone]
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Hébergement</h3>
      <p className="mb-4">
        L'application est hébergée par :<br />
        [Nom de l'hébergeur]<br />
        [Adresse de l'hébergeur]
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Propriété intellectuelle</h3>
      <p className="mb-4">
        L'ensemble du contenu de cette application (textes, images, vidéos) est protégé par le droit d'auteur. 
        Toute reproduction, même partielle, est interdite sans autorisation préalable.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Responsabilité</h3>
      <p className="mb-4">
        Cette application de divination est fournie à titre de divertissement uniquement. 
        Les informations fournies ne constituent pas des conseils professionnels et ne doivent pas être 
        utilisées comme base pour prendre des décisions importantes.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Contact</h3>
      <p className="mb-4">
        Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :<br />
        <strong>Email :</strong> [Votre email de contact]
      </p>
    </div>
  );
}

// ============= Mentions légales EN =============
function LegalContentEN() {
  return (
    <div className="prose prose-sm md:prose max-w-none">
      <h3 className="text-purple-900 font-bold text-lg mb-4">Publisher</h3>
      <p className="mb-4">
        <strong>Name:</strong> [Your name/company]<br />
        <strong>Address:</strong> [Your address]<br />
        <strong>Email:</strong> [Your email]<br />
        <strong>Phone:</strong> [Your phone]
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Hosting</h3>
      <p className="mb-4">
        The application is hosted by:<br />
        [Host name]<br />
        [Host address]
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Intellectual Property</h3>
      <p className="mb-4">
        All content in this application (texts, images, videos) is protected by copyright. 
        Any reproduction, even partial, is prohibited without prior authorization.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Liability</h3>
      <p className="mb-4">
        This divination application is provided for entertainment purposes only. 
        The information provided does not constitute professional advice and should not be 
        used as a basis for making important decisions.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Contact</h3>
      <p className="mb-4">
        For any questions regarding these legal notices, you can contact us at:<br />
        <strong>Email:</strong> [Your contact email]
      </p>
    </div>
  );
}

// ============= Politique de confidentialité FR =============
function PrivacyContentFR() {
  return (
    <div className="prose prose-sm md:prose max-w-none">
      <h3 className="text-purple-900 font-bold text-lg mb-4">Introduction</h3>
      <p className="mb-4">
        Cette politique de confidentialité explique comment CartoMystik collecte, utilise et protège 
        vos données personnelles.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Collecte des données</h3>
      <p className="mb-4">Cette application peut collecter les données suivantes :</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Informations de profil utilisateur (si vous créez un compte)</li>
        <li>Historique de vos tirages de cartes</li>
        <li>Données d'utilisation de l'application</li>
        <li>Informations techniques (modèle d'appareil, version OS)</li>
      </ul>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Utilisation des données</h3>
      <p className="mb-4">Les données collectées sont utilisées pour :</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Fournir et améliorer nos services</li>
        <li>Personnaliser votre expérience utilisateur</li>
        <li>Sauvegarder votre historique de tirages</li>
        <li>Analyser l'utilisation de l'application</li>
      </ul>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Protection des données</h3>
      <p className="mb-4">
        Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles 
        contre tout accès, modification, divulgation ou destruction non autorisés.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Vos droits (RGPD)</h3>
      <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Droit d'accès :</strong> Vous pouvez demander l'accès à vos données personnelles</li>
        <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de vos données</li>
        <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
        <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré</li>
      </ul>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Cookies et technologies similaires</h3>
      <p className="mb-4">
        Cette application peut utiliser des cookies et technologies similaires pour améliorer votre expérience. 
        Vous pouvez gérer vos préférences dans les paramètres de votre appareil.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Contact</h3>
      <p className="mb-4">
        Pour exercer vos droits ou pour toute question concernant cette politique :<br />
        <strong>Email :</strong> [Votre email de contact]
      </p>

      <p className="text-sm text-gray-600 mt-6">
        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
      </p>
    </div>
  );
}

// ============= Politique de confidentialité EN =============
function PrivacyContentEN() {
  return (
    <div className="prose prose-sm md:prose max-w-none">
      <h3 className="text-purple-900 font-bold text-lg mb-4">Introduction</h3>
      <p className="mb-4">
        This privacy policy explains how CartoMystik collects, uses, and protects your personal data.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Data Collection</h3>
      <p className="mb-4">This application may collect the following data:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>User profile information (if you create an account)</li>
        <li>History of your card readings</li>
        <li>App usage data</li>
        <li>Technical information (device model, OS version)</li>
      </ul>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Data Usage</h3>
      <p className="mb-4">The collected data is used to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Provide and improve our services</li>
        <li>Personalize your user experience</li>
        <li>Save your reading history</li>
        <li>Analyze application usage</li>
      </ul>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Data Protection</h3>
      <p className="mb-4">
        We implement appropriate security measures to protect your personal data against unauthorized 
        access, modification, disclosure, or destruction.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Your Rights (GDPR)</h3>
      <p className="mb-4">In accordance with GDPR, you have the following rights:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Right of access:</strong> You can request access to your personal data</li>
        <li><strong>Right to rectification:</strong> You can request correction of your data</li>
        <li><strong>Right to erasure:</strong> You can request deletion of your data</li>
        <li><strong>Right to portability:</strong> You can retrieve your data in a structured format</li>
      </ul>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Cookies and Similar Technologies</h3>
      <p className="mb-4">
        This application may use cookies and similar technologies to improve your experience. 
        You can manage your preferences in your device settings.
      </p>

      <h3 className="text-purple-900 font-bold text-lg mb-4 mt-6">Contact</h3>
      <p className="mb-4">
        To exercise your rights or for any questions regarding this policy:<br />
        <strong>Email:</strong> [Your contact email]
      </p>

      <p className="text-sm text-gray-600 mt-6">
        Last updated: {new Date().toLocaleDateString('en-US')}
      </p>
    </div>
  );
}