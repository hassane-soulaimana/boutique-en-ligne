// Page Collections harmonisée avec images anime
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Collections() {
  const univers = [
    {
      id: 'naruto',
      nom: 'Naruto',
      description: 'Collection exclusive Naruto avec designs authentiques',
      couleur: '#FF6B35',
      image: 'https://i.imgur.com/oxQYxkU.jpeg'
    },
    {
      id: 'ghibli',
      nom: 'Studio Ghibli',
      description: 'Les plus beaux films du studio Ghibli',
      couleur: '#6B5B95',
      image: 'https://i.imgur.com/U4dKJpM.jpeg'
    },
    {
      id: 'demonslayer',
      nom: 'Demon Slayer',
      description: 'Les samouraïs et démons de Demon Slayer',
      couleur: '#D92E3D',
      image: 'https://i.imgur.com/2EBIW3O.jpeg'
    },
    {
      id: 'onepiece',
      nom: 'One Piece',
      description: "L'univers pirate de One Piece",
      couleur: '#001F3F',
      image: 'https://i.imgur.com/yx7M7xL.jpeg'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1 className="text-5xl font-semibold text-stone-900 mb-4 tracking-tight">
            Collections par Univers
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl">
            Explorez nos {univers.length} univers manga et découvrez leurs produits exclusifs.
          </p>
          <div className="w-16 h-1 bg-amber-600 mt-6"></div>
        </motion.div>

        {/* GRID COLLECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {univers.map((univ, index) => (
            <motion.div
              key={univ.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white border border-stone-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/collections/${univ.id}`}>

                {/* IMAGE HEADER */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={univ.image}
                    alt={univ.nom}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-stone-900 group-hover:text-amber-700 transition-colors duration-300">
                    {univ.nom}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {univ.description}
                  </p>

                  <div className="pt-4 border-t border-stone-200">
                    <span className="text-amber-700 font-medium text-sm group-hover:text-amber-800 transition-colors">
                      Voir la collection →
                    </span>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
