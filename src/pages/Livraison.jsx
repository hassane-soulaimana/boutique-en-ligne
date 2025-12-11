import React from "react";
import { motion } from "framer-motion";

const Livraison = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          Livraison
        </h1>
        <p className="text-gray-600 text-lg">Informations sur la livraison de vos commandes.</p>
      </motion.div>
      <article className="prose prose-lg dark:prose-invert text-gray-800">
        <section className="py-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Délais de livraison</h2>
          <p>Livraison standard : 3 à 7 jours ouvrés.<br />Livraison express : 1 à 2 jours ouvrés.<br />Les délais sont donnés à titre indicatif.</p>
        </section>
        <section className="py-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Zones desservies</h2>
          <p>France métropolitaine et livraison internationale possible.</p>
        </section>
        <section className="py-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Suivi et réception</h2>
          <p>Un numéro de suivi est envoyé par e-mail dès l’expédition. Vérifiez l’état du colis à la réception et signalez tout dommage sous 48h.</p>
        </section>
      </article>
    </div>
  </div>
);

export default Livraison;
