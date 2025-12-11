import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext.jsx';
import { getImageUrl, handleImageError } from '../services/imageLoader';

export default function Favoris() {
  const { favorites, removeFavorite, addItem } = useContext(ShopContext);

  const handleAddToCart = (produit) => {
    addItem({
      id: produit.id,
      nom: produit.nom || 'Produit sans nom',
      prix: produit.prix || 0,
      image: produit.image || '📦',
      collection: produit.collection || 'Sans collection',
    });
    alert(`${produit.nom || 'Produit'} ajouté au panier !`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Mes Favoris</h1>
          <p className="text-stone-600">
            {favorites.length} produit{favorites.length > 1 ? 's' : ''} dans vos favoris
          </p>
        </motion.div>

        {/* Liste des favoris */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-semibold text-stone-700 mb-4">
              Aucun favori pour le moment
            </h2>
            <p className="text-stone-500 mb-8">
              Ajoutez des produits à vos favoris pour les retrouver facilement
            </p>
            <Link
              to="/pieces"
              className="inline-block px-6 py-3 bg-amber-600 text-white font-medium rounded-sm hover:bg-amber-700 transition"
            >
              Découvrir nos produits
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((produit, index) => (
              <motion.div
                key={produit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white border border-stone-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/produit/${produit.id}`}>
                  <div className="h-56 bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center text-6xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/5 transition-colors duration-300"></div>
                    {/* Afficher l'image ou l'emoji */}
                    {produit.image && typeof produit.image === 'string' ? (
                      <img src={getImageUrl(produit.image)} alt={produit.nom} className="w-full h-full object-cover" onError={handleImageError} />
                    ) : (
                      produit.image || '📦'
                    )}
                  </div>
                </Link>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-amber-600 text-xs uppercase tracking-widest font-semibold">
                      {produit.collection || 'Sans catégorie'}
                    </span>
                    <Link to={`/produit/${produit.id}`}>
                      <h3 className="font-semibold text-base text-stone-900 mt-1 group-hover:text-amber-700 transition-colors duration-300">
                        {produit.nom || 'Produit sans nom'}
                      </h3>
                    </Link>
                  </div>

                  <p className="text-lg font-normal text-amber-700">
                    {produit.prix ? `${parseFloat(produit.prix).toFixed(2)} €` : 'Prix non disponible'}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(produit)}
                      className="flex-1 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-sm hover:bg-amber-700 transition-colors duration-300"
                    >
                      Ajouter au panier
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFavorite(produit.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 text-sm font-medium rounded-sm hover:bg-red-50 transition-colors duration-300"
                    >
                      ❌
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
