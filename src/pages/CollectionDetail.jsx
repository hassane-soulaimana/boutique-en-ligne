import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { animeApi } from '../services/animeApi';
import { getImageUrl, handleImageError } from '../services/imageLoader';

export default function CollectionDetail() {
  const { univers: universId } = useParams();
  const navigate = useNavigate();

  // Données de fallback pour les collections
  const defaultCollections = {
    'dragon-ball': { nom: 'Dragon Ball', description: 'Collection exclusive Dragon Ball', couleur: '#F7A800' },
    'naruto': { nom: 'Naruto', description: 'Collection exclusive Naruto avec designs authentiques', couleur: '#FF6B35' },
    'demon-slayer': { nom: 'Demon Slayer', description: 'Les samouraïs et démons de Demon Slayer', couleur: '#D92E3D' },
    'one-piece': { nom: 'One Piece', description: "L'univers pirate de One Piece", couleur: '#001F3F' },
  };
  
  // Fonction pour obtenir le nom d'univers à partir du slug
  const getUniversName = (slug) => {
    const mapping = {
      'dragon-ball': 'Dragon Ball',
      'naruto': 'Naruto',
      'demon-slayer': 'Demon Slayer',
      'one-piece': 'One Piece',
    };
    return mapping[slug] || slug;
  };

  const [currentUnivers, setCurrentUnivers] = useState(
    defaultCollections[universId] || { nom: getUniversName(universId), description: '', couleur: '#D4A574' }
  );
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les informations de l'univers et ses produits depuis l'API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log(`🔄 Chargement de l'univers et des produits pour: ${universId}`);
        
        // Charger les univers pour obtenir les détails
        const universes = await animeApi.getUniverses();
        const foundUnivers = universes.find(u => 
          (u._id === universId) || 
          (u.id === universId) || 
          (u.slug === universId) ||
          (u.nom && u.nom.toLowerCase() === universId.toLowerCase()) ||
          (u.name && u.name.toLowerCase() === universId.toLowerCase())
        );
        
        if (foundUnivers) {
          setCurrentUnivers({
            nom: foundUnivers.nom || foundUnivers.name || universId,
            description: foundUnivers.description || `Collection ${foundUnivers.nom || foundUnivers.name}`,
            couleur: foundUnivers.couleur || foundUnivers.color || '#D4A574'
          });
        } else if (defaultCollections[universId]) {
          setCurrentUnivers(defaultCollections[universId]);
        }
        
        // Charger tous les produits et filtrer par univers
        const universName = getUniversName(universId);
        console.log('🔄 Chargement des produits pour univers:', universId, '-> Nom:', universName);
        const allProducts = await animeApi.getProducts();
        
        // Filtrer les produits de cet univers (en utilisant le nom ou le slug)
        const universeProducts = allProducts.filter(p => {
          if (!p.universe) return false;
          const pUniverse = p.universe.toLowerCase();
          const searchSlug = universId.toLowerCase().replace(/-/g, ' ');
          const searchName = universName.toLowerCase();
          return pUniverse.includes(searchSlug) || pUniverse.includes(searchName) || pUniverse === searchSlug;
        });
        console.log('📦 Produits de l\'univers:', universeProducts);
        
        // Mapper les données API au format local
        const mapped = universeProducts.map(p => ({
          id: p._id || p.id,
          type: (p.category && p.category.toLowerCase()) || 'produit',
          nom: p.name || p.nom,
          prix: parseFloat(p.price || p.prix || 0),
          image: p.image,
        }));
        
        console.log('✅ Produits mappés:', mapped);
        setProduits(mapped);
        setError(null);
      } catch (err) {
        console.error('❌ Erreur chargement produits:', err);
        setError('Impossible de charger les produits');
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [universId]);

  const [typeFiltre, setTypeFiltre] = useState('');
  const [prixRange, setPrixRange] = useState('');
  const [tri, setTri] = useState('');
  const [page, setPage] = useState(1);

  const produitsParPage = 6;

  let produitsFiltres = produits.filter((p) => {
    const okType = typeFiltre ? p.type.includes(typeFiltre) : true;

    let okPrix = true;
    switch (prixRange) {
      case "0-50": okPrix = p.prix <= 50; break;
      case "50-100": okPrix = p.prix >= 50 && p.prix <= 100; break;
      case "100-200": okPrix = p.prix >= 100 && p.prix <= 200; break;
      case "0-500": okPrix = p.prix <= 500; break;
      default: okPrix = true;
    }

    return okType && okPrix;
  });

  if (tri === 'asc') produitsFiltres.sort((a, b) => a.prix - b.prix);
  if (tri === 'desc') produitsFiltres.sort((a, b) => b.prix - a.prix);

  const indexDebut = (page - 1) * produitsParPage;
  const produitsAffiches = produitsFiltres.slice(indexDebut, indexDebut + produitsParPage);
  const totalPages = Math.ceil(produitsFiltres.length / produitsParPage);

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12">

      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* Bouton retour */}
        <button
          onClick={() => navigate('/collections')}
          className="mb-8 text-amber-700 hover:text-amber-800 font-medium"
        >
          ← Retour aux collections
        </button>

        {/* État de chargement */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-xl text-stone-600">Chargement des produits...</p>
          </div>
        )}

        {/* État d'erreur */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-amber-600 text-white rounded-sm hover:bg-amber-700"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Contenu si pas de chargement/erreur */}
        {!loading && !error && (

        <div className="flex flex-col lg:flex-row gap-10">

          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-72 bg-white border border-stone-200 rounded-sm p-6 h-fit lg:sticky lg:top-24 shadow-sm"
          >
            <div className="space-y-2 mb-6">
              <h2 className="text-xl font-semibold text-stone-900">Filtres</h2>
              <div className="w-12 h-1 bg-amber-600"></div>
            </div>

            {/* Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 uppercase tracking-wide mb-2">
                Type de produit
              </label>
              <select
                onChange={(e) => { setTypeFiltre(e.target.value); setPage(1); }}
                className="w-full border border-stone-300 rounded-sm p-3 text-stone-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              >
                <option value="">Tous</option>
                <option value="échiquier">Échiquiers</option>
                <option value="pièces d'échec">Pièces d'échecs</option>
                <option value="accessoires">Accessoires</option>
              </select>
            </div>

            {/* Prix */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-stone-700 uppercase tracking-wide mb-2">
                Prix
              </label>
              <select
                onChange={(e) => { setPrixRange(e.target.value); setPage(1); }}
                className="w-full border border-stone-300 rounded-sm p-3 text-stone-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              >
                <option value="">Tous les prix</option>
                <option value="0-50">0 à 50 €</option>
                <option value="50-100">50 à 100 €</option>
                <option value="100-200">100 à 200 €</option>
                <option value="0-500">Jusqu'à 500 €</option>
              </select>
            </div>

            {/* Tri */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-stone-700 uppercase tracking-wide mb-2">
                Trier par
              </label>
              <select
                onChange={(e) => setTri(e.target.value)}
                className="w-full border border-stone-300 rounded-sm p-3 text-stone-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              >
                <option value="">Par défaut</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setTypeFiltre('');
                setPrixRange('');
                setTri('');
                setPage(1);
              }}
              className="w-full bg-stone-900 text-white font-medium py-3 rounded-sm hover:bg-amber-700 transition-colors duration-300"
            >
              Réinitialiser
            </button>
          </motion.aside>

          {/* CONTENU */}
          <div className="flex-1">

            {/* Header Collection */}
            <div className="mb-10 pb-6 border-b-4" style={{ borderColor: currentUnivers.couleur }}>
              <h1 className="text-4xl font-semibold text-stone-900 mb-3">
                Collection {currentUnivers.nom}
              </h1>
              <p className="text-stone-600 text-lg">{currentUnivers.description}</p>
            </div>

            {/* GRID PRODUITS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {produitsAffiches.map((produit, index) => (
                <motion.div
                  key={produit.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white border border-stone-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/produit/${produit.id}`)}
                >
                  <div
                    className="h-64 flex items-center justify-center bg-stone-50 overflow-hidden"
                    style={{ backgroundColor: currentUnivers.couleur + "15" }}
                  >
                    <img
                      src={getImageUrl(produit.image)}
                      alt={produit.nom}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-amber-600 text-xs uppercase tracking-widest font-semibold">
                        {produit.type}
                      </span>
                      <h3 className="font-semibold text-lg text-stone-900 mt-1 group-hover:text-amber-700 transition-colors duration-300">
                        {produit.nom}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <p className="text-base font-normal text-amber-700">
                        {produit.prix.toFixed(2)} €
                      </p>

                      <button className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-amber-700 transition-colors duration-300">
                        Voir
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-stone-200">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-6 py-3 border border-stone-300 rounded-sm font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Précédent
                </button>

                <span className="font-medium text-stone-700">
                  Page <span className="text-amber-700">{page}</span> / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-3 border border-stone-300 rounded-sm font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant →
                </button>
              </div>
            )}

          </div>
        </div>
        )}
      </div>
    </main>
  );
}
