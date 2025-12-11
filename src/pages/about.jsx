import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section Premium */}
      <section className="relative bg-gradient-to-b from-stone-900 to-stone-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="inline-block">
                <span className="text-amber-300 text-sm uppercase tracking-[0.3em] font-semibold">Premium Chess Collection</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-tight text-white">
                L'Art de l'Échiquier
                <span className="block text-amber-100 mt-2">
                  Inspiré des Animés
                </span>
              </h1>
              <p className="text-xl lg:text-2xl font-light text-stone-100 max-w-3xl mx-auto leading-relaxed">
                Découvrez notre collection exclusive d'échiquiers artisanaux fusionnant l'élégance du jeu d'échecs avec l'univers vibrant des animés japonais.
              </p>
              
              <div className="flex justify-center gap-6 pt-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/Collections"
                  className="px-8 py-4 bg-amber-600 text-white font-medium rounded-sm hover:bg-amber-700 transition-colors duration-300"
                >
                  Explorer les Collections
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="px-8 py-4 bg-transparent text-white font-medium rounded-sm border border-amber-400 hover:bg-amber-600/20 transition-colors duration-300"
                >
                  Nous Contacter
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Accent décoratif */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500"></div>
      </section>

      {/* Section Mission avec Image Premium */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-amber-600 text-sm uppercase tracking-widest font-semibold">Notre Mission</span>
                <h2 className="text-4xl lg:text-5xl font-semibold text-stone-900 leading-tight">
                  Créations Uniques, Passion Infinie
                </h2>
                <div className="w-20 h-1 bg-amber-600"></div>
              </div>
              
              <div className="space-y-6 text-lg text-stone-700 font-normal leading-relaxed">
                <p>
                  Chaque échiquier que nous créons est une <strong className="text-stone-900 font-semibold">œuvre d'art unique</strong>, méticuleusement conçue pour capturer l'essence des univers animés les plus emblématiques. De Naruto à One Piece, en passant par Dragon Ball, nos créations transcendent le simple jeu.
                </p>
                <p>
                  Notre atelier fusionne <strong className="text-stone-900 font-semibold">artisanat traditionnel</strong> et design contemporain pour offrir des pièces de collection exceptionnelles. Chaque détail est pensé, chaque pièce sculptée avec précision.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center p-4 bg-stone-100 rounded-sm border border-amber-200">
                  <div className="text-3xl font-semibold text-amber-700">500+</div>
                  <div className="text-sm text-stone-600 mt-1 font-medium">Créations</div>
                </div>
                <div className="text-center p-4 bg-stone-100 rounded-sm border border-amber-200">
                  <div className="text-3xl font-semibold text-amber-700">98%</div>
                  <div className="text-sm text-stone-600 mt-1 font-medium">Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-stone-100 rounded-sm border border-amber-200">
                  <div className="text-3xl font-semibold text-amber-700">12</div>
                  <div className="text-sm text-stone-600 mt-1 font-medium">Univers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-amber-500 rounded-2xl blur-2xl opacity-15 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden shadow-2xl rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=600&fit=crop"
                  alt="Échiquier Premium"
                  className="w-full h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white text-lg font-semibold">Collection Naruto - Édition Limitée</p>
                  <p className="text-amber-100 text-sm mt-2 font-normal">Bois d'érable massif avec incrustations dorées</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Caractéristiques Premium */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <span className="text-amber-600 text-sm uppercase tracking-widest font-semibold">Excellence</span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-stone-900">Pourquoi Nous Choisir</h2>
              <div className="w-20 h-1 bg-amber-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PremiumFeatureCard
                icon="♔"
                title="Qualité Premium"
                text="Matériaux nobles sélectionnés avec soin : bois massifs, incrustations précieuses et finitions artisanales pour une durabilité exceptionnelle."
              />
              <PremiumFeatureCard
                icon="✨"
                title="Design Exclusif"
                text="Chaque échiquier est une création unique inspirée des univers animés, avec possibilité de personnalisation complète selon vos envies."
              />
              <PremiumFeatureCard
                icon="🎯"
                title="Passion Animés"
                text="Notre équipe partage votre passion et capture fidèlement l'essence de chaque personnage dans nos sculptures détaillées."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Showcase Produits */}
      <section className="py-24 bg-gradient-to-b from-stone-100 to-stone-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="text-amber-600 text-sm uppercase tracking-widest font-semibold">Collections</span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-stone-900">Nos Créations Phares</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductShowcaseCard
                image="https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=500"
                title="Échiquier Naruto"
                universe="Collection Konoha"
                price="299.99"
              />
              <ProductShowcaseCard
                image="https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=500"
                title="Échiquier One Piece"
                universe="Collection Grand Line"
                price="329.99"
              />
              <ProductShowcaseCard
                image="https://images.unsplash.com/photo-1611891487726-a379c4c39b46?w=500"
                title="Échiquier Dragon Ball"
                universe="Collection Saiyans"
                price="349.99"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe Premium */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <span className="text-amber-600 text-sm uppercase tracking-widest font-semibold">Notre Équipe</span>
              <h2 className="text-4xl lg:text-5xl font-semibold text-stone-900">Artisans Passionnés</h2>
              <p className="text-xl text-stone-600 font-light max-w-3xl mx-auto">
                Une équipe dédiée à l'excellence, alliant expertise artisanale et passion pour les univers animés.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <PremiumArtisanCard
                name="Nicole"
                role="Designer Principal"
                desc="Crée les designs exclusifs et veille à la cohérence artistique entre échecs et animés."
              />
              <PremiumArtisanCard
                name="Hanababa"
                role="Maître Artisan"
                desc="Expert en ébénisterie, responsable de la qualité exceptionnelle de chaque pièce."
              />
              <PremiumArtisanCard
                name="Hassane"
                role="Directeur Artistique"
                desc="Imagine et supervise l’identité visuelle des collections, garantissant l’harmonie entre l’univers des animés et l’élégance du jeu d’échecs."
              />
              <PremiumArtisanCard
                name="Nordine"
                role="Chef de Production"
                desc="Coordonne la fabrication et garantit le respect des délais de livraison."
              />
            </div>
            
            <div className="flex justify-center">
              <div className="w-full sm:w-1/2">
                <PremiumArtisanCard
                  name="Sadio"
                  role="Expert Échiquiers"
                  desc="Spécialiste de la conception et de l’assemblage des échiquiers, il veille à la qualité et à l’originalité de chaque plateau."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Premium */}
      <section className="py-24 bg-gradient-to-b from-stone-900 to-stone-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
                Prêt à Posséder Votre
                <span className="block text-amber-100">
                  Échiquier de Rêve ?
                </span>
              </h2>
              <p className="text-xl text-stone-100 font-normal">
                Conseil personnalisé, garantie satisfaction et livraison premium pour chaque commande.
              </p>

              <div className="flex justify-center gap-6 flex-wrap pt-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/Collections"
                  className="px-10 py-4 bg-amber-600 text-white font-medium rounded-sm hover:bg-amber-700 transition-colors duration-300"
                >
                  Découvrir les Collections
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="px-10 py-4 bg-transparent text-white font-medium rounded-sm border border-amber-400 hover:bg-amber-600/20 transition-colors duration-300"
                >
                  Obtenir un Devis
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PremiumFeatureCard({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-2 border-amber-600"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h4 className="text-2xl font-semibold text-stone-900 mb-3">{title}</h4>
      <p className="text-stone-700 font-normal leading-relaxed">{text}</p>
    </motion.div>
  );
}

function ProductShowcaseCard({ image, title, universe, price }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <span className="text-xl">♥</span>
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-6 space-y-3">
        <div className="text-sm text-amber-700 font-semibold uppercase tracking-wide">{universe}</div>
        <h3 className="text-2xl font-semibold text-stone-900">{title}</h3>
        <div className="flex items-center justify-between pt-2">
          <span className="text-3xl font-semibold text-amber-700">{price}€</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
          >
            Voir Détails
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function PremiumArtisanCard({ name, role, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-2 border-amber-600"
    >
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 bg-amber-700 text-white flex items-center justify-center text-3xl font-semibold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {name.charAt(0)}
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-2xl font-semibold text-stone-900">{name}</h4>
            <p className="text-amber-700 font-semibold text-sm uppercase tracking-wide mt-1">{role}</p>
          </div>
          <p className="text-stone-700 font-normal leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
