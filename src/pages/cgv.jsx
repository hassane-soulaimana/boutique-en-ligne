import React from "react";
import { motion } from "framer-motion";

const CGV = () => {

const sections = [
  {
    title: "ARTICLE 1 - CHAMP D'APPLICATION",
    content: [
      "Les présentes Conditions Générales de Vente (CGV) s'appliquent, sans restriction ni réserve, à toutes les ventes conclues sur le site internet Shahine (ci-après « le Site ») entre la société Shahine SARL, au capital de 10 000€, immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège social est situé 12 Rue des Cerisiers, 75008 Paris, ci-après dénommée « le Vendeur », et tout acheteur, consommateur ou professionnel, ci-après dénommé « le Client ».",
      "En passant commande, le Client déclare avoir pris connaissance et accepter sans réserve l'ensemble des présentes CGV. Elles prévalent sur tout autre document.",
      "Les CGV sont modifiables à tout moment. Les conditions applicables seront celles en vigueur au moment de la validation de la commande."
    ]
  },

  {
    title: "ARTICLE 2 - INFORMATIONS PRÉCONTRACTUELLES",
    content: [
      "Conformément aux articles L.111‑1 et L.221‑5 du Code de la consommation, le Client reconnaît avoir eu communication, préalablement à la commande, des caractéristiques essentielles des produits, du prix, des taxes applicables (TVA de 20%), ainsi que des informations sur le droit de rétractation et les modalités de livraison.",
      "Le Client reconnaît également avoir lu les mentions légales, la Politique de Confidentialité et les présentes CGV avant tout achat."
    ]
  },

  {
    title: "ARTICLE 3 - PRIX",
    content: [
      "Les prix des produits sont indiqués en euros (€), toutes taxes comprises (TTC), TVA de 20%, hors frais de livraison.",
      "Les frais de livraison sont affichés avant la validation de la commande.",
      "La société se réserve le droit de modifier ses prix à tout moment.",
      "Une facture est automatiquement générée et envoyée par e-mail lors de la commande."
    ]
  },

  {
    title: "ARTICLE 4 - PROCESSUS DE COMMANDE",
    content: [
      "Le processus de commande comprend les étapes suivantes:",
      "• Sélection des produits\n• Vérification du panier\n• Création ou connexion à un compte\n• Adresse de livraison et facturation\n• Choix du transporteur et du paiement\n• Acceptation des CGV\n• Validation finale\n• Paiement\n• Confirmation par e-mail",
      "Le Vendeur peut refuser une commande en cas de fraude, litige antérieur ou erreur manifeste (prix anormal, rupture de stock, etc.)."
    ]
  },

  {
    title: "ARTICLE 5 - DROIT DE RÉTRACTATION",
    content: [
      "Le Client consommateur dispose d’un délai légal de 14 jours pour exercer son droit de rétractation sans justification.",
      "MODALITÉS:\n• via le formulaire en ligne\n• par e-mail: support@shahine.com\n• ou par courrier recommandé à: Shahine SARL, Service Rétractation, 12 Rue des Cerisiers, 75008 Paris",
      "Les produits doivent être retournés complets, en parfait état, dans leur emballage d’origine, sous 14 jours après déclaration.",
      "Certains produits sont EXCLUS du droit de rétractation:\n• Produits personnalisés\n• Produits numériques téléchargés immédiatement\n• Articles ouverts ne pouvant être renvoyés pour raisons d’hygiène",
      "Le remboursement intervient sous 14 jours par le même moyen de paiement."
    ]
  },

  {
    title: "ARTICLE 6 - MODALITÉS DE PAIEMENT",
    content: [
      "Paiement comptant à la commande par:",
      "• Carte bancaire (Stripe)\n• PayPal\n• Apple Pay / Google Pay\n• Virement bancaire — traitement dès réception",
      "En cas de refus de paiement, la commande est automatiquement annulée.",
      "Les transactions sont sécurisées (SSL 256 bits)."
    ]
  },

  {
    title: "ARTICLE 7 - LIVRAISON",
    content: [
      "DÉLAIS:\n• Livraison standard: 3 à 7 jours ouvrés\n• Livraison express: 1 à 2 jours ouvrés\n• Ces délais sont indicatifs.",
      "ZONES:\n• France métropolitaine\n• Livraison internationale possible",
      "RÉCEPTION:\n• Vérification obligatoire du colis\n• En cas de dommage: réserves + notification sous 48h",
      "TRANSFERT DES RISQUES:\n• Dès remise physique du colis au Client"
    ]
  },

  {
    title: "ARTICLE 8 - GARANTIES",
    content: [
      "GARANTIE LÉGALE DE CONFORMITÉ: 2 ans.",
      "GARANTIE CONTRE LES VICES CACHÉS: 2 ans.",
      "EXCLUSIONS:\n• Mauvaise utilisation\n• Usure normale\n• Produit modifié par le Client\n• Dommages accidentels"
    ]
  },

  {
    title: "ARTICLE 9 - RÉSERVE DE PROPRIÉTÉ",
    content: [
      "Les produits restent la propriété du Vendeur jusqu'au paiement intégral."
    ]
  },

  {
    title: "ARTICLE 10 - RESPONSABILITÉ",
    content: [
      "La responsabilité du Vendeur ne peut excéder la valeur de la commande.",
      "Aucune responsabilité en cas:\n• d'utilisation inappropriée\n• de problème informatique\n• d'interruption du site\n• de force majeure"
    ]
  },

  {
    title: "ARTICLE 11 - DONNÉES PERSONNELLES",
    content: [
      "Les données sont collectées pour:\n• le traitement des commandes\n• le service client\n• les statistiques internes",
      "Le Client peut exercer ses droits auprès de: dpo@shahine.com",
      "Le site est conforme au RGPD.",
      "Aucune donnée n'est revendue."
    ]
  },

  {
    title: "ARTICLE 12 - COMPTE CLIENT",
    content: [
      "Le Client peut créer un compte permettant:\n• d’accéder à l’historique de commandes\n• de gérer ses adresses\n• d’obtenir des factures",
      "Le Client s’engage à fournir des informations exactes.",
      "Le Vendeur peut supprimer un compte en cas de fraude ou d’abus."
    ]
  },

  {
    title: "ARTICLE 13 - PROPRIÉTÉ INTELLECTUELLE",
    content: [
      "Tous les éléments du Site sont protégés: textes, images, logos, maquettes, scripts, bases de données.",
      "Toute reproduction ou utilisation non autorisée est interdite."
    ]
  },

  {
    title: "ARTICLE 14 - LIENS HYPERTEXTES",
    content: [
      "Le Site peut contenir des liens externes dont le Vendeur n'est pas responsable.",
      "Tout lien vers le Site doit être autorisé par écrit."
    ]
  },

  {
    title: "ARTICLE 15 - MÉDIATION",
    content: [
      "En cas de litige non résolu, le Client peut contacter gratuitement un médiateur:",
      "• Médiateur de la consommation\n• Adresse: 45 Avenue du Calme, 75010 Paris\n• Site web: www.mediation-consommateur.fr",
      "Le Client peut également utiliser la plateforme européenne de règlement des litiges: https://ec.europa.eu/consumers/odr/"
    ]
  },

  {
    title: "ARTICLE 16 - FORCE MAJEURE",
    content: [
      "Aucune partie n'est responsable en cas d'événement imprévisible et irrésistible: grève, panne générale, pandémie, catastrophe naturelle, etc."
    ]
  },

  {
    title: "ARTICLE 17 - LOI APPLICABLE",
    content: [
      "Les présentes CGV sont régies par la loi française.",
      "En cas de litige, compétence attribuée aux tribunaux français."
    ]
  },

  {
    title: "ARTICLE 18 - CONTACT",
    content: [
      "Shahine SARL\n12 Rue des Cerisiers, 75008 Paris",
      "E-mail: contact@shahine.com\nTéléphone: 01 23 45 67 89\nSupport: support@shahine.com",
      "HÉBERGEUR:\n• OVHcloud SAS\n• 2 Rue Kellermann, 59100 Roubaix\n• Téléphone: +33 9 72 10 10 07\n• Site: https://www.ovhcloud.com",
      "Numéro TVA intracommunautaire: FR12 123456789"
    ]
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-gray-600 text-lg">Shahine - Dernière mise à jour</p>
        </motion.div>

        {/* Sections */}
        <article className="prose prose-lg dark:prose-invert text-gray-800">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4) }}
              viewport={{ once: true }}
              className={`py-6 border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="flex items-start">
                <div className="w-1 mr-4 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">{section.title}</h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </article>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 rounded p-8 text-center"
        >
          <p className="text-gray-700 mb-4">
            En continuant vos achats, vous acceptez nos Conditions Générales de Vente.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Pour toute question, contactez-nous à : <span className="font-semibold">support@shahine.com</span>
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:scale-105 transform transition"
            >
              Nous contacter
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CGV;
