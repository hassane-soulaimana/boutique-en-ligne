import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="bg-gradient-to-br from-white via-amber-50 to-amber-100 py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-extrabold leading-tight"
            >
              Notre histoire — l'échiquier comme pièce de collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-slate-700"
            >
              Chez nous, nous créons des échiquiers et des accessoires uniques. Chaque
              pièce que nous concevons raconte une histoire et rassemble passion, artisanat
              et émotion.
            </motion.p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Notre mission</h2>
              <p className="text-slate-700 leading-relaxed">
                Notre aventure a commencé avec une simple idée : créer des échiquiers
                qui transcendent le jeu. Nous croyons que chaque pièce doit être unique,
                soigneusement pensée et durable. Notre approche combine l'artisanat
                traditionnel avec l'innovation pour offrir des produits de qualité
                exceptionnelle.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Aujourd'hui, chaque échiquier et accessoire que nous créons est le fruit
                d'un travail minutieux alliant ébénisterie, design et expertise. Nous
                travaillons avec des artisans qualifiés, et toutes nos créations peuvent
                être personnalisées selon vos envies — gravures, essences de bois,
                finitions et motifs.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/Collections"
                  className="inline-block rounded-2xl px-6 py-3 bg-amber-600 text-white font-medium shadow hover:bg-amber-700"
                >
                  Découvrir nos collections
                </a>
                <a
                  href="/Connexion"
                  className="inline-block rounded-2xl px-6 py-3 border border-amber-600 text-amber-600 font-medium hover:bg-amber-50"
                >
                  Nous contacter
                </a>
              </div>
            </motion.div>

            <motion.figure
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              <img
                src="https://images.unsplash.com/photo-1570481660723-6ca0a2b0cc0a?w=600&h=400&fit=crop"
                alt="Échiquier artisanal"
                className="w-full h-72 object-cover"
              />
              <figcaption className="p-4 text-sm text-slate-600">
                Nos créations artisanales alliant qualité et esthétique
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Qualité premium"
              text="Nous sélectionnons les meilleurs matériaux et utilisons des techniques
              éprouvées pour garantir durabilité et élégance à chaque création."
            />

            <FeatureCard
              title="Design personnalisé"
              text="Chaque commande est unique. Nous écoutons vos idées et les transformons
              en réalité pour créer votre pièce parfaite."
            />

            <FeatureCard
              title="Service client"
              text="Notre équipe dédiée est toujours disponible pour vous conseiller et vous
              accompagner dans votre parcours d'achat."
            />
          </div>

          <div className="mt-12 bg-amber-50 rounded-2xl p-8 shadow">
            <h3 className="text-xl font-semibold">Nos valeurs</h3>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Pour nous, un échiquier n'est pas qu'un plateau de jeu : c'est un objet
              d'art, un héritage possible et un lieu de rencontre. Nous privilégions
              l'excellence, la transparence et une relation directe avec nos clients.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <li className="border border-amber-200 p-4 rounded-lg bg-white">
                <strong className="block text-amber-700">Craftsmanship</strong>
                <span className="text-sm text-slate-600">Expertise et savoir-faire</span>
              </li>
              <li className="border border-amber-200 p-4 rounded-lg bg-white">
                <strong className="block text-amber-700">Personnalisation</strong>
                <span className="text-sm text-slate-600">Chaque pièce est unique</span>
              </li>
              <li className="border border-amber-200 p-4 rounded-lg bg-white">
                <strong className="block text-amber-700">Durabilité</strong>
                <span className="text-sm text-slate-600">Création pour l'éternité</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold">Notre équipe</h3>
            <p className="mt-4 text-slate-700">
              Une équipe passionnée et expérimentée qui travaille chaque jour pour créer
              les plus beaux échiquiers et accessoires.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ArtisanCard
                name="Nicole"
                role="Designer"
                desc="Crée les designs uniques et veille à la cohérence artistique."
              />
              <ArtisanCard
                name="Hanababa"
                role="Artisan principal"
                desc="Maître du craft, responsable de la qualité de chaque pièce."
              />
              <ArtisanCard
                name="Hassane"
                role="Créateur"
                desc="Superviseur général et visionnaire du projet."
              />
              <ArtisanCard
                name="Nordine"
                role="Production"
                desc="Coordonne la production et l'expédition de nos créations."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold">Notre engagement envers vous</h3>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Chaque commande est accompagnée d'un conseil personnalisé et d'une garantie
              de satisfaction. Nous nous engageons à offrir un service d'excellence et
              une qualité inégalée pour chaque création.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <a
                href="/Connexion"
                className="inline-block rounded-2xl px-6 py-3 bg-slate-800 text-white font-medium shadow hover:opacity-95"
              >
                Nous contacter
              </a>
              <a
                href="/Collections"
                className="inline-block rounded-2xl px-6 py-3 border border-slate-200 text-slate-800 font-medium hover:bg-slate-50"
              >
                Voir nos collections
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-amber-100">
      <h4 className="font-semibold text-amber-700">{title}</h4>
      <p className="mt-3 text-slate-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function ArtisanCard({ name, role, desc }) {
  return (
    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow border border-amber-100">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700 flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="text-left">
        <div className="font-semibold">
          {name} <span className="text-sm text-slate-500"> — {role}</span>
        </div>
        <div className="text-sm text-slate-600 mt-1">{desc}</div>
      </div>
    </div>
  );
}
