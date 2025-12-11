import React from "react";
import { motion } from "framer-motion";

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-gray-600 text-lg">Shahine - Dernière mise à jour</p>
        </motion.div>
        <article className="prose prose-lg dark:prose-invert text-gray-800">
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">1. Responsable du traitement</h2>
            <p>
              Shahine SARL, 12 Rue des Cerisiers, 75008 Paris, RCS Paris 123 456 789, est responsable du traitement des données personnelles collectées sur le site.
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">2. Données collectées</h2>
            <p>
              Les données collectées sont celles que vous fournissez lors de la création de compte, commande, contact ou navigation (nom, prénom, adresse, email, téléphone, historique d’achats, cookies, etc.).
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">3. Finalités</h2>
            <p>
              Les données sont utilisées pour la gestion des commandes, le service client, l’envoi d’informations commerciales (si consentement), l’amélioration du site et le respect des obligations légales.
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">4. Destinataires</h2>
            <p>
              Les données sont destinées à Shahine SARL et à ses prestataires techniques (hébergeur, paiement, livraison). Elles ne sont jamais revendues à des tiers.
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">5. Durée de conservation</h2>
            <p>
              Les données sont conservées pendant la durée nécessaire à la gestion de la relation commerciale et conformément aux obligations légales (10 ans pour les factures, 3 ans pour les prospects, etc.).
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">6. Sécurité</h2>
            <p>
              Shahine SARL met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données (chiffrement, accès restreint, sauvegardes, etc.).
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition, d’effacement, de limitation et de portabilité de vos données. Pour exercer vos droits, contactez : <a href="mailto:dpo@shahine.com">dpo@shahine.com</a>.
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">8. Cookies</h2>
            <p>
              Le site utilise des cookies pour le fonctionnement, la mesure d’audience et, le cas échéant, la personnalisation. Vous pouvez gérer vos préférences via votre navigateur.
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">9. Réclamations</h2>
            <p>
              En cas de difficulté, vous pouvez contacter notre DPO à <a href="mailto:dpo@shahine.com">dpo@shahine.com</a> ou la CNIL (www.cnil.fr).
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Confidentialite;
