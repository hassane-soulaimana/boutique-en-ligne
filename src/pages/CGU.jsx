import React from "react";
import { motion } from "framer-motion";

const CGU = () => {
  const sections = [
    {
      title: "1. Objet et acceptation",
      content: [
        "Les présentes Conditions Générales d’Utilisation (ci-après « CGU ») ont pour objet de définir les règles d’accès et d’utilisation du site internet Shahine (ci-après « le Site »), ainsi que les droits et obligations des utilisateurs. Toute connexion, navigation ou utilisation du Site implique l’acceptation sans réserve des présentes CGU. L'utilisateur reconnaît avoir pris connaissance de ces conditions et s'engage à les respecter."
      ]
    },
    {
      title: "2. Éditeur du site et contacts",
      content: [
        "Le Site est édité par :",
        "Dénomination sociale : Shahine SARL",
        "Forme juridique : SARL",
        "Capital social : 10 000€",
        "Siège social : 12 Rue des Cerisiers, 75008 Paris",
        "Numéro d'immatriculation : RCS Paris 123 456 789",
        "Adresse e-mail : contact@shahine.com",
        "Téléphone : 01 23 45 67 89",
        "Directeur de la publication : Soulaimana Hassane",
        "Le Site est hébergé par :",
        "OVHcloud SAS",
        "2 Rue Kellermann, 59100 Roubaix",
        "Téléphone : +33 9 72 10 10 07"
      ]
    },
    {
      title: "3. Accès au site",
      content: [
        "L’éditeur s’efforce de maintenir le Site accessible 24 heures sur 24 et 7 jours sur 7, sauf en cas de force majeure, de pannes ou d’opérations de maintenance nécessaires à son bon fonctionnement. L’éditeur ne saurait être tenu responsable des dommages de toute nature résultant d’une indisponibilité du Site."
      ]
    },
    {
      title: "4. Utilisation du site",
      content: [
        "L'utilisateur s'engage à utiliser le Site :",
        "- De manière loyale et conformément aux lois en vigueur.",
        "- Sans perturber, interrompre ou altérer son fonctionnement, son intégrité ou sa sécurité.",
        "- Sans tenter d’accéder de manière frauduleuse à des zones restreintes, à des données personnelles ou à des systèmes informatiques liés au Site.",
        "Toute utilisation contraire à ces principes peut entraîner la suspension immédiate de l'accès et des poursuites judiciaires."
      ]
    },
    {
      title: "5. Propriété intellectuelle",
      content: [
        "La structure, le design, et l'ensemble des contenus du Site (textes, graphismes, images, photographies, logos, designs, vidéos, interfaces, code source, bases de données, etc.) ainsi que les marques et le nom commercial Shahine sont la propriété exclusive de l'éditeur ou de ses partenaires et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, adaptation ou extraction, partielle ou totale, sans l'autorisation préalable et écrite de l'éditeur, est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle."
      ]
    },
    {
      title: "6. Comptes clients",
      content: [
        "L'accès à certains services, notamment le processus de commande, nécessite la création d'un compte personnel. L'utilisateur est responsable de la confidentialité de ses identifiants de connexion. Toute action ou transaction effectuée depuis son compte est réputée avoir été faite par lui-même. L'éditeur se réserve le droit de suspendre ou de supprimer un compte en cas de manquement aux présentes CGU ou d'activité suspecte, sans préjudice des autres recours possibles."
      ]
    },
    {
      title: "7. Données personnelles",
      content: [
        "La collecte et le traitement des données personnelles des utilisateurs sont régis par notre Politique de Confidentialité, accessible via un lien dans le pied de page du Site, et conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi 'Informatique et Libertés'."
      ]
    },
    {
      title: "8. Liens hypertextes",
      content: [
        "Le Site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur politique de confidentialité ou leurs pratiques. L'accès à ces sites se fait aux risques et périls de l'utilisateur."
      ]
    },
    {
      title: "9. Limitation de responsabilité",
      content: [
        "L'éditeur met tout en œuvre pour assurer l'exactitude des informations présentes sur le Site. Toutefois, il ne peut garantir que le Site soit exempt d'erreurs, de virus ou d'interruptions. Les informations fournies (notamment les descriptions et prix des produits) sont données à titre indicatif et peuvent être modifiées à tout moment. L'utilisateur est seul responsable de l'utilisation qu'il fait du Site et de son interprétation des informations. La responsabilité de l'éditeur ne saurait être engagée pour des dommages indirects résultant de l'utilisation du Site."
      ]
    },
    {
      title: "10. Modification des CGU",
      content: [
        "L'éditeur se réserve le droit de modifier à tout moment les présentes CGU pour s'adapter aux évolutions techniques, juridiques ou commerciales. Les utilisateurs seront informés de ces modifications et la version mise à jour sera mise en ligne sur le Site. Il est de la responsabilité de l'utilisateur de consulter régulièrement les CGU. Toute utilisation du Site après une modification vaut acceptation des nouvelles CGU."
      ]
    },
    {
      title: "11. Droit applicable et litiges",
      content: [
        "Les présentes CGU sont régies par le droit français. En cas de litige, et après une tentative de résolution amiable, compétence est attribuée aux tribunaux compétents du ressort du siège social de l'éditeur, nonobstant pluralité des défendeurs ou appel en garantie. Conformément aux articles L.611-1 et suivants du Code de la consommation, le consommateur a la possibilité de recourir gratuitement à un médiateur de la consommation en présentant sa réclamation par écrit aux coordonnées de l'éditeur. En dernier recours, il peut utiliser la plateforme de résolution en ligne des litiges (RLL) de la Commission européenne : https://webgate.ec.europa.eu/odr/."
      ]
    }
  ];

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
            Conditions Générales d’Utilisation
          </h1>
          <p className="text-gray-600 text-lg">Shahine - Dernière mise à jour</p>
        </motion.div>
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
      </div>
    </div>
  );
};

export default CGU;
