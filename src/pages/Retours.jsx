import React from "react";
import { motion } from "framer-motion";

const Retours = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          Retours
        </h1>
        <p className="text-gray-600 text-lg">Modalités de retour et de remboursement.</p>
      </motion.div>
      <article className="prose prose-lg dark:prose-invert text-gray-800">
        <section className="py-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Droit de rétractation</h2>
          <p>Vous disposez de 14 jours pour changer d’avis et retourner votre commande sans justification.</p>
        </section>
        <section className="py-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Procédure de retour</h2>
          <p>Contactez notre service client via la page Contact pour obtenir un bon de retour. Les produits doivent être renvoyés complets, en parfait état, dans leur emballage d’origine.</p>
        </section>
        <section className="py-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Remboursement</h2>
          <p>Le remboursement est effectué sous 14 jours après réception et vérification des produits retournés, par le même moyen de paiement utilisé lors de la commande.</p>
        </section>
      </article>
    </div>
  </div>
);

export default Retours;
