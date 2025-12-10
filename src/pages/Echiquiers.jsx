// Page Echiquiers avec filtres par fourchettes + pagination
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { animeApi } from '../services/animeApi';
import { getImageUrl, handleImageError } from '../services/imageLoader';

export default function Echiquiers() {
  const { addItem, toggleFavorite, isFavorite } = useContext(ThemeContext);
  
  const [echiquiers, setEchiquiers] = useState([]);
  const [collectionsDisponibles, setCollectionsDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les échiquiers depuis l'API
  useEffect(() => {
    async function loadEchiquiers() {
      try {
        setLoading(true);
        
        // DEBUG: D'abord charger tous les produits pour voir les catégories
        console.log('🔍 TEST: Chargement de TOUS les produits...');
        const allProducts = await animeApi.getProducts();
        console.log('📦 TOUS les produits:', allProducts);
        console.log('📋 Catégories disponibles:', [...new Set(allProducts.map(p => p.category))]);
        console.log('📋 Exemple de produit:', allProducts[0]);
        
        // Filtrer les échiquiers côté client pour le test
        const echiquiersData = allProducts.filter(p => 
          p.category && (
            p.category.toLowerCase().includes('echiquier') ||
            p.category.toLowerCase().includes('échiquier')
          )
        );
        console.log('🎯 Échiquiers filtrés:', echiquiersData);
        
        // Mapper les données API au format local
        const mapped = echiquiersData.map(p => ({
          id: p._id || p.id,
          nom: p.name || p.nom,
          prix: parseFloat(p.price || p.prix || 0),
          image: p.image,
          collection: p.universe || 'Non classé',
        }));
        
        console.log('✅ Échiquiers mappés:', mapped);
        console.log('🔍 Premier échiquier pour debug:', mapped[0]);
        
        // Extraire les collections uniques
        const collectionsUniques = [...new Set(mapped.map(p => p.collection))].filter(c => c !== 'Non classé');
        console.log('📚 Collections disponibles:', collectionsUniques);
        
        setCollectionsDisponibles(collectionsUniques);
        setEchiquiers(mapped);
        setError(null);
      } catch (err) {
        console.error('❌ Erreur chargement échiquiers:', err);
        setError('Impossible de charger les échiquiers');
      } finally {
        setLoading(false);
      }
    }
    
    loadEchiquiers();
  }, []);

  // ------------------------
  // STATE FILTRES
  // ------------------------
  const [collectionFiltre, setCollectionFiltre] = useState('');
  const [prixRange, setPrixRange] = useState('');
  const [tri, setTri] = useState('');

  // ------------------------
  // STATE PAGINATION
  // ------------------------
  const [page, setPage] = useState(1);
  const produitsParPage = 6;

  // ------------------------
  // FILTRAGE
  // ------------------------
  let produitsFiltres = echiquiers.filter((p) => {
    const okCollection = collectionFiltre 
      ? p.collection?.toLowerCase().includes(collectionFiltre.toLowerCase())
      : true;

    let okPrix = true;

    switch (prixRange) {
      case "0-50":
        okPrix = p.prix >= 0 && p.prix <= 50;
        break;
      case "50-100":
        okPrix = p.prix >= 50 && p.prix <= 100;
        break;
      case "100-200":
        okPrix = p.prix >= 100 && p.prix <= 200;
        break;
      case "0-500":
        okPrix = p.prix <= 500;
        break;
      default:
        okPrix = true;
    }

    return okCollection && okPrix;
  });

  // ------------------------
  // TRI
  // ------------------------
  if (tri === 'asc') produitsFiltres = produitsFiltres.sort((a, b) => a.prix - b.prix);
  if (tri === 'desc') produitsFiltres = produitsFiltres.sort((a, b) => b.prix - a.prix);

  // ------------------------
  // PAGINATION
  // ------------------------
  const indexDebut = (page - 1) * produitsParPage;
  const produitsAffiches = produitsFiltres.slice(indexDebut, indexDebut + produitsParPage);
  const totalPages = Math.ceil(produitsFiltres.length / produitsParPage);

  // Fonction ajout panier
  const handleAddToCart = (produit) => {
    addItem({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image,
      collection: produit.collection,
    });
    alert(`${produit.nom} ajouté au panier !`);
  };

  // États de chargement et erreur
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-xl text-stone-600">Chargement des échiquiers...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-600 text-white rounded-sm hover:bg-amber-700"
          >
            Réessayer
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      
      {/* Hero Section Premium avec image de fond */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1920&q=80')"
          }}
        ></div>
        
        {/* Filtre opaque sombre */}
        <div className="absolute inset-0 bg-stone-900/80"></div>
        
        {/* Pattern décoratif subtil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <span className="text-amber-300 text-sm uppercase tracking-[0.3em] font-semibold">
              Collection Premium
            </span>
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-tight text-white drop-shadow-lg">
              Nos Échiquiers
              <span className="block text-amber-100 mt-2">d'Exception</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light text-stone-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Découvrez notre sélection d'échiquiers artisanaux inspirés des plus grands univers animés.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

            {/* ------------------------------ */}
            {/*   SIDEBAR FILTRES */}
            {/* ------------------------------ */}
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

              {/* Collection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-stone-700 uppercase tracking-wide mb-2">
                  Collection
                </label>
                <select
                  value={collectionFiltre}
                  onChange={(e) => { setCollectionFiltre(e.target.value); setPage(1); }}
                  className="w-full border border-stone-300 rounded-sm p-3 text-stone-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition"
                >
                  <option value="">Toutes les collections</option>
                  {collectionsDisponibles.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              {/* Fourchette de prix */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-stone-700 uppercase tracking-wide mb-2">
                  Prix
                </label>
                <select
                  value={prixRange}
                  onChange={(e) => { setPrixRange(e.target.value); setPage(1); }}
                  className="w-full border border-stone-300 rounded-sm p-3 text-stone-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition"
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
                  value={tri}
                  onChange={(e) => setTri(e.target.value)}
                  className="w-full border border-stone-300 rounded-sm p-3 text-stone-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition"
                >
                  <option value="">Par défaut</option>
                  <option value="asc">Prix croissant</option>
                  <option value="desc">Prix décroissant</option>
                </select>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setCollectionFiltre('');
                  setPrixRange('');
                  setTri('');
                  setPage(1);
                }}
                className="w-full bg-stone-900 text-white font-medium py-3 rounded-sm hover:bg-stone-800 transition-colors duration-300"
              >
                Réinitialiser
              </button>
            </motion.aside>

            {/* ------------------------------ */}
            {/*   CONTENU — CARDS */}
            {/* ------------------------------ */}
            <div className="flex-1">

              {/* En-tête résultats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p className="text-stone-600 text-lg">
                    <span className="font-semibold text-stone-900">{produitsFiltres.length}</span> échiquier{produitsFiltres.length > 1 ? 's' : ''} trouvé{produitsFiltres.length > 1 ? 's' : ''}
                  </p>
                </div>
              </motion.div>

              {/* Grille */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {produitsAffiches.map((produit, index) => (
                  <motion.div
                    key={produit.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white border border-stone-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={`/produit/${produit.id}`}>
                      <div className="h-64 bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/5 transition-colors duration-300"></div>
                        <img
                          src={getImageUrl(produit.image)}
                          alt={produit.nom}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-amber-600 text-xs uppercase tracking-widest font-semibold">
                          {produit.collection}
                        </span>
                        <Link to={`/produit/${produit.id}`}>
                          <h3 className="font-semibold text-lg text-stone-900 mt-1 group-hover:text-amber-700 transition-colors duration-300">
                            {produit.nom}
                          </h3>
                        </Link>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                        <p className="text-base font-normal text-amber-700">
                          {produit.prix ? produit.prix.toFixed(2) : '0.00'} €
                        </p>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite({
                              id: produit.id,
                              nom: produit.nom,
                              prix: produit.prix,
                              image: produit.image,
                              collection: produit.collection,
                            })}
                            className={`px-3 py-2 text-lg rounded-sm transition-colors duration-300 ${
                              isFavorite(produit.id)
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-stone-400 hover:text-red-500'
                            }`}
                          >
                            {isFavorite(produit.id) ? '❤️' : '♡'}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(produit)}
                            className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-amber-700 transition-colors duration-300"
                          >
                            Ajouter
                          </motion.button>
                        </div>
                </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message si aucun résultat */}
              {produitsAffiches.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-stone-500 text-lg">Aucun échiquier ne correspond à vos critères.</p>
                  <button
                    onClick={() => {
                      setCollectionFiltre('');
                      setPrixRange('');
                      setTri('');
                      setPage(1);
                    }}
                    className="mt-4 text-amber-600 font-medium hover:text-amber-700 transition"
                  >
                    Réinitialiser les filtres
                  </button>
                </motion.div>
              )}

              {/* ------------------------------ */}
              {/* PAGINATION */}
              {/* ------------------------------ */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-stone-200"
                >
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-6 py-3 border border-stone-300 rounded-sm font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    ← Précédent
                  </button>

                  <span className="font-semibold text-stone-700">
                    Page <span className="text-amber-700">{page}</span> / {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-3 border border-stone-300 rounded-sm font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    Suivant →
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}