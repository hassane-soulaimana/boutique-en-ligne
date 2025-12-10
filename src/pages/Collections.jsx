// Page Collections harmonisée avec images anime
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { animeApi } from '../services/animeApi';

export default function Collections() {
  const [univers, setUnivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données de fallback en cas d'échec de l'API
  const defaultUnivers = [
    {
      id: 'dragon-ball',
      nom: 'Dragon Ball',
      description: 'Collection exclusive Dragon Ball avec designs authentiques',
      couleur: '#F7A800',
      image: 'https://i.imgur.com/oxQYxkU.jpeg'
    },
    {
      id: 'naruto',
      nom: 'Naruto',
      description: 'Collection exclusive Naruto avec designs authentiques',
      couleur: '#FF6B35',
      image: 'https://i.imgur.com/oxQYxkU.jpeg'
    },
    {
      id: 'demon-slayer',
      nom: 'Demon Slayer',
      description: 'Les samouraïs et démons de Demon Slayer',
      couleur: '#D92E3D',
      image: 'https://i.imgur.com/2EBIW3O.jpeg'
    },
    {
      id: 'one-piece',
      nom: 'One Piece',
      description: "L'univers pirate de One Piece",
      couleur: '#001F3F',
      image: 'https://i.imgur.com/yx7M7xL.jpeg'
    }
  ];

  // Charger les univers depuis l'API
  useEffect(() => {
    async function loadUnivers() {
      try {
        setLoading(true);
        console.log('🔄 Chargement des univers/collections...');
        
        // Récupérer tous les produits pour extraire les univers uniques
        const allProducts = await animeApi.getProducts();
        console.log('📦 Produits récupérés:', allProducts.length);
        
        // Extraire les univers uniques
        const universUniques = [...new Set(allProducts.map(p => p.universe).filter(Boolean))];
        console.log('🌍 Univers disponibles:', universUniques);
        
        if (universUniques.length > 0) {
          // Créer les collections à partir des univers
          const mapped = universUniques.map(universName => {
            // Trouver un produit de cet univers pour avoir une image
            const produitUnivers = allProducts.find(p => p.universe === universName);
            const slug = universName.toLowerCase().replace(/\s+/g, '-');
            
            return {
              id: slug,
              nom: universName,
              description: `Collection ${universName} - Découvrez tous nos produits`,
              couleur: getUniversColor(universName),
              image: produitUnivers?.image || 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80'
            };
          });
          console.log('✅ Univers mappés:', mapped);
          setUnivers(mapped);
        } else {
          console.log('⚠️ Aucun univers trouvé, utilisation des données par défaut');
          setUnivers(defaultUnivers);
        }
        setError(null);
      } catch (err) {
        console.error('❌ Erreur chargement univers:', err);
        setError('Impossible de charger les collections');
        setUnivers(defaultUnivers);
      } finally {
        setLoading(false);
      }
    }
    
    loadUnivers();
  }, []);
  
  // Fonction pour attribuer une couleur selon l'univers
  function getUniversColor(name) {
    const colors = {
      'naruto': '#FF6B35',
      'dragon ball': '#F7A800',
      'one piece': '#001F3F',
      'demon slayer': '#D92E3D',
      'ghibli': '#6B5B95',
      'studio ghibli': '#6B5B95',
    };
    return colors[name.toLowerCase()] || '#D4A574';
  }

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

        {/* État de chargement */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-xl text-stone-600">Chargement des collections...</p>
          </div>
        )}

        {/* Message d'erreur (informatif, car on utilise les données par défaut) */}
        {error && !loading && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-sm">
            <p className="text-amber-700 text-sm">
              ⚠️ Utilisation des collections par défaut. {error}
            </p>
          </div>
        )}

        {/* GRID COLLECTIONS */}
        {!loading && (
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
        )}
      </div>
    </main>
  );
}
