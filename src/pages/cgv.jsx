import React from "react";
import { motion } from "framer-motion";

const CGV = () => {
  const sections = [
    {
      title: "ARTICLE 1 - CHAMP D'APPLICATION",
      content: [
        "Les présentes Conditions Générales de Vente (CGV) s'appliquent, sans restriction ni réserve, à toutes les ventes conclues sur le site internet Boutique-en-ligne (ci-après « le Site ») entre la société Boutique-en-ligne, ci-après dénommée « le Vendeur », et tout acheteur, consommateur ou professionnel, ci-après dénommé « le Client ».",
        "En passant commande, le Client déclare avoir pris connaissance et accepter sans réserve l'ensemble des présentes CGV. Elles prévalent sur tout autre document.",
        "Les CGV sont modifiables à tout moment. Les conditions applicables seront celles en vigueur au moment de la validation de la commande."
      ]
    },
    {
      title: "ARTICLE 2 - INFORMATIONS PRÉCONTRACTUELLES",
      content: [
        "Conformément aux articles L.111-1 et L.221-5 du Code de la consommation, le Client reconnaît avoir eu communication, préalablement à sa commande, des caractéristiques essentielles des produits et de leur prix.",
        "Le Client dispose de tous les éléments nécessaires pour prendre une décision d'achat éclairée avant de valider sa commande."
      ]
    },
    {
      title: "ARTICLE 3 - PRIX",
      content: [
        "Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison.",
        "Les frais de livraison sont calculés en fonction de la destination et du mode de livraison choisi par le Client, et sont affichés avant la validation finale de la commande.",
        "Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de l'enregistrement de la commande.",
        "Une facture est établie lors de chaque achat et transmise au Client par voie électronique."
      ]
    },
    {
      title: "ARTICLE 4 - PROCESSUS DE COMMANDE",
      content: [
        "Le processus de commande comprend les étapes suivantes:",
        "• Sélection des produits et ajout au panier\n• Vérification du détail du panier et des quantités\n• Identification ou création d'un compte client\n• Saisie des coordonnées de livraison et de facturation\n• Choix du mode de livraison et de paiement\n• Acceptation expresse des CGV\n• Validation finale de la commande\n• Paiement de la commande\n• Envoi d'un e-mail de confirmation de commande",
        "Le Client est tenu de vérifier l'exactitude de sa commande et de signaler toute erreur immédiatement. Toute commande vaut acceptation des prix, de la description et des quantités des produits proposés à la vente.",
        "Le Vendeur se réserve le droit de refuser une commande ou d'annuler une commande précédemment acceptée, notamment en cas de fraude, d'erreur évidente de prix ou d'indisponibilité du produit."
      ]
    },
    {
      title: "ARTICLE 5 - DROIT DE RÉTRACTATION",
      content: [
        "Conformément aux articles L.221-18 et suivants du Code de la consommation, le Client consommateur dispose d'un délai de quatorze (14) jours calendaires pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité.",
        "Ce délai court à compter de la réception des produits par le Client ou son représentant.",
        "MODALITÉS D'EXERCICE DU DROIT DE RÉTRACTATION:\n• Remplir le formulaire de rétractation disponible sur le Site\n• Envoyer le formulaire par e-mail à: contact@boutique-en-ligne.com\n• Ou notifier par lettre recommandée avec accusé de réception à: Boutique-en-ligne, Service Client, 8 Terrasse Bellini, 92800 Puteaux",
        "RETOUR DES PRODUITS:\n• Les produits doivent être retournés dans leur état d'origine\n• Ils doivent être complets et dans leur emballage d'origine\n• Tous les accessoires doivent être inclus\n• Le délai maximum de retour est de 14 jours suivant la notification de rétractation\n• Les frais de retour sont à la charge du Client (sauf en cas d'erreur du Vendeur)",
        "REMBOURSEMENT:\n• Le remboursement sera effectué dans un délai de 14 jours à compter de la réception des produits retournés\n• Le remboursement sera effectué via le même moyen de paiement que celui utilisé pour la commande initiale\n• Les frais de port aller ne seront remboursés que si le retour est dû à une erreur du Vendeur"
      ]
    },
    {
      title: "ARTICLE 6 - MODALITÉS DE PAIEMENT",
      content: [
        "Le prix est payable comptant à la commande, selon l'une des méthodes suivantes:",
        "• Carte bancaire (Paiement sécurisé via Stripe - CB, Visa, Mastercard)\n• Apple Pay & Google Pay\n• PayPal\n• Virement bancaire (la commande ne sera traitée qu'à réception effective du virement)",
        "Les informations bancaires sont traitées de manière sécurisée. Le Vendeur n'a pas accès à ces informations qui sont gérées par les prestataires de paiement sécurisés.",
        "En cas de défaut de paiement, le Vendeur se réserve le droit de suspendre ou d'annuler la commande et la livraison."
      ]
    },
    {
      title: "ARTICLE 7 - LIVRAISON",
      content: [
        "DÉLAIS DE LIVRAISON:\n• Les délais de livraison sont indiqués au moment du choix du mode de livraison\n• Ils sont donnés à titre indicatif et n'engagent pas la responsabilité du Vendeur en cas de retard imputable au transporteur ou à un cas de force majeure\n• Le Vendeur s'engage à faire ses meilleurs efforts pour livrer dans les délais indiqués",
        "ZONES DE LIVRAISON:\n• Livraison en France métropolitaine\n• Possibilité d'envoi international selon les modalités précisées lors de la commande",
        "VÉRIFICATION À LA RÉCEPTION:\n• Le Client doit vérifier l'état de son colis et des produits à la réception\n• En cas de dommage, de colis ouvert ou de produit manquant, le Client doit:\n  - Formuler des réserves précises et motivées auprès du transporteur lors de la livraison\n  - Informer immédiatement le Vendeur par e-mail: contact@boutique-en-ligne.com\n  - Conserver le colis et son emballage à titre de preuve",
        "TRANSFERT DU RISQUE:\n• Le risque de perte ou d'endommagement des produits est transféré au Client au moment où ce dernier (ou un tiers désigné par lui) en prend physiquement possession\n• Le Client est responsable des produits à partir de ce moment"
      ]
    },
    {
      title: "ARTICLE 8 - GARANTIES",
      content: [
        "GARANTIE LÉGALE DE CONFORMITÉ (Articles L.217-4 et suivants du Code de la consommation):\n• Le Vendeur est tenu de livrer un produit conforme au contrat\n• Le Vendeur est responsable des défauts de conformité existants lors de la délivrance\n• Le Client dispose d'un délai de deux ans à compter de la délivrance du produit pour agir\n• La garantie couvre les défauts de fabrication, les produits cassés, endommagés ou non conformes à la description",
        "GARANTIE DES VICES CACHÉS (Articles 1641 et suivants du Code civil):\n• Le Vendeur est tenu de garantir les vices cachés du produit\n• Le produit ne doit pas être impropre à l'usage auquel on le destine\n• Cette garantie ne dépend pas de la connaissance du Vendeur",
        "EXCLUSIONS DE GARANTIE:\n• Les dommages causés par une mauvaise utilisation ou un manque d'entretien\n• Les dommages causés par le Client ou un tiers\n• L'usure normale des produits\n• Les produits personnalisés ou sur commande spéciale (sauf non-conformité)"
      ]
    },
    {
      title: "ARTICLE 9 - CLAUSE DE RÉSERVE DE PROPRIÉTÉ",
      content: [
        "Les produits demeurent la propriété du Vendeur jusqu'au complet paiement de leur prix, en principal et accessoires.",
        "Le Client n'acquiert la propriété des produits que lors du paiement intégral de la commande."
      ]
    },
    {
      title: "ARTICLE 10 - RESPONSABILITÉ",
      content: [
        "Le Vendeur décline toute responsabilité pour:\n• Les dommages indirects ou immatériels\n• Les pertes de données ou de revenus\n• Les interruptions d'activité\n• Tout dommage consécutif à l'utilisation du Site ou des produits",
        "La responsabilité du Vendeur ne peut en aucun cas excéder le prix de la commande en question.",
        "Le Vendeur ne peut être tenu responsable des défauts ou des dommages qui n'auraient pas été signalés immédiatement lors de la réception des produits."
      ]
    },
    {
      title: "ARTICLE 11 - DONNÉES PERSONNELLES",
      content: [
        "COLLECTE DE DONNÉES:\n• Les données personnelles collectées sont nécessaires au traitement de la commande et à la facturation\n• Elles incluent: le nom, l'adresse e-mail, l'adresse de livraison, le numéro de téléphone et les informations de paiement",
        "TRAITEMENT DES DONNÉES:\n• Les données sont traitées conformément à notre Politique de Confidentialité\n• Elles sont protégées par les mesures de sécurité appropriées\n• Elles ne sont pas communiquées à des tiers, sauf si cela est nécessaire pour traiter la commande ou respecter la loi",
        "DROITS DU CLIENT:\n• Le Client dispose d'un droit d'accès à ses données personnelles\n• Le Client peut demander la rectification de ses données inexactes\n• Le Client peut s'opposer au traitement de ses données\n• Le Client peut demander la suppression de ses données (droit à l'oubli)\n• Le Client peut demander une portabilité de ses données",
        "Pour exercer ces droits, le Client doit contacter: contact@boutique-en-ligne.com"
      ]
    },
    {
      title: "ARTICLE 12 - LIMITATION DE RESPONSABILITÉ DU SITE",
      content: [
        "Le Vendeur s'efforce de mettre à disposition des informations exactes et à jour sur le Site.",
        "Cependant, le Vendeur décline toute responsabilité en cas d'erreur, d'omission ou d'indisponibilité temporaire du Site.",
        "Le Client reconnaît que l'utilisation du Site se fait à ses propres risques et sous sa responsabilité.",
        "Le Vendeur ne peut être tenu responsable des interruptions de service, des erreurs de transmission ou des défaillances informatiques."
      ]
    },
    {
      title: "ARTICLE 13 - PROPRIÉTÉ INTELLECTUELLE",
      content: [
        "Tous les contenus du Site (textes, images, logos, marques, dessins et modèles, etc.) sont la propriété du Vendeur ou de ses partenaires et sont protégés par le droit d'auteur et les droits de propriété intellectuelle.",
        "Toute reproduction, adaptation ou utilisation de ces contenus sans autorisation préalable est strictement interdite.",
        "Le Client ne peut utiliser les contenus que pour un usage personnel et non commercial."
      ]
    },
    {
      title: "ARTICLE 14 - LIEN HYPERTEXTE",
      content: [
        "Le Site peut contenir des liens hypertextes vers d'autres sites. Le Vendeur décline toute responsabilité quant au contenu de ces sites externes.",
        "Le Vendeur se réserve le droit de refuser ou de retirer tout lien hypertexte pointant vers le Site.",
        "L'utilisateur accepte que l'accès aux sites externes se fait à ses propres risques."
      ]
    },
    {
      title: "ARTICLE 15 - SIGNALEMENTS D'ABUS ET MODÉRATION",
      content: [
        "Le Client s'engage à utiliser le Site de manière licite et conformément aux lois en vigueur.",
        "Le Client s'engage à ne pas:",
        "• Poster du contenu offensant, dénigrant, insultant ou contraire à l'ordre public\n• Utiliser le Site à des fins commerciales ou de spam\n• Utiliser des bots ou des outils d'automatisation sans autorisation\n• Intrusion ou tentative d'accès non autorisé aux systèmes du Site\n• Collecte non autorisée de données personnelles d'autres utilisateurs",
        "Le Vendeur se réserve le droit de supprimer tout contenu jugé non conforme et de suspendre ou de fermer le compte de l'utilisateur en cas de violation."
      ]
    },
    {
      title: "ARTICLE 16 - LOI APPLICABLE ET JURIDICTION",
      content: [
        "Les présentes CGV sont régies par la loi française.",
        "En cas de litige, le Client peut:",
        "• Contacter le Vendeur pour résoudre le différend à l'amiable\n• Saisir la juridiction compétente de son lieu de résidence\n• Recourir à la médiation ou à l'arbitrage si disponible",
        "Pour les consommateurs de l'Union Européenne, les litiges peuvent également être portés sur la plateforme de résolution des litiges en ligne (https://ec.europa.eu/consumers/odr/) mise en place par la Commission Européenne."
      ]
    },
    {
      title: "ARTICLE 17 - CONTACT ET SERVICE CLIENT",
      content: [
        "Pour toute question concernant les CGV, les produits ou votre commande:",
        "EMAIL: contact@boutique-en-ligne.com\nADRESSE: Boutique-en-ligne, Service Client, 8 Terrasse Bellini, 92800 Puteaux\nTÉLÉPHONE: À préciser\nHORAIRES: Lundi à Vendredi, 9h00-18h00",
        "Le Client s'engage à contacter le Service Client avant d'engager toute action en justice."
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-stone-900 mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-stone-600 text-lg">
            Boutique-en-ligne - CGV en vigueur
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
        </motion.div>

        {/* LAST UPDATE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-sm p-4 mb-8 text-center text-stone-700"
        >
          <p className="text-sm">
            <strong>Dernière mise à jour:</strong> Décembre 2025 | 
            <strong> Statut:</strong> En vigueur
          </p>
        </motion.div>

        {/* TABLE OF CONTENTS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-stone-200 rounded-sm p-6 mb-10 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Table des matières</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index}`}
                className="text-amber-700 hover:text-amber-800 hover:underline transition"
              >
                {index + 1}. {section.title.replace("ARTICLE ", "")}
              </a>
            ))}
          </div>
        </motion.div>

        {/* SECTIONS */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-stone-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4 pb-3 border-b-2 border-amber-600">
                {section.title}
              </h2>
              
              <div className="space-y-4 text-stone-700 leading-relaxed">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-stone-300 text-center text-stone-600"
        >
          <p className="mb-4">
            <strong>Questions ou remarques?</strong>
          </p>
          <p className="mb-2">
            Contactez-nous à: <strong>contact@boutique-en-ligne.com</strong>
          </p>
          <p className="text-sm">
            Ces conditions générales de vente sont fournies à titre informatif et peuvent être modifiées à tout moment par le Vendeur.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default CGV;
