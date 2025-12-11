import React from "react";
import { motion } from "framer-motion";

const MentionsLegales = () => {
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
            Mentions légales
          </h1>
          <p className="text-gray-600 text-lg">Shahine - Dernière mise à jour</p>
        </motion.div>
        <article className="prose prose-lg dark:prose-invert text-gray-800">
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Éditeur du site</h2>
            <p>
              Dénomination sociale : Shahine SARL<br />
              Forme juridique : SARL<br />
              Capital social : 10 000€<br />
              Siège social : 12 Rue des Cerisiers, 75008 Paris<br />
              Numéro d'immatriculation : RCS Paris 123 456 789<br />
              Directeur de la publication : Soulaimana Hassane<br />
              Email : contact@shahine.com<br />
              Téléphone : 01 23 45 67 89
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Hébergeur</h2>
            <p>
              OVHcloud SAS<br />
              2 Rue Kellermann, 59100 Roubaix<br />
              Téléphone : +33 9 72 10 10 07<br />
              Site : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">www.ovhcloud.com</a>
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Propriété intellectuelle</h2>
            <p>
              L’ensemble du contenu du site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Shahine SARL ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de Shahine SARL.
            </p>
          </section>
          <section className="py-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Contact</h2>
            <p>
              Pour toute question, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:contact@shahine.com">contact@shahine.com</a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default MentionsLegales;
