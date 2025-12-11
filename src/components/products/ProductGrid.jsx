import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { getImageUrl, handleImageError } from '../../services/imageLoader';

/**
 * Composant de grille de produits réutilisable
 */
export default function ProductGrid({
  products,
  filter,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  title,
  subtitle,
}) {
  const {
    paginatedProducts,
    totalProducts,
    filtreCollection,
    setFiltreCollection,
    filtrePrix,
    setFiltrePrix,
    tri,
    setTri,
    currentPage,
    setCurrentPage,
    totalPages,
    collections,
    fourchettes,
  } = filter;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Filtre Collection */}
          <select
            value={filtreCollection}
            onChange={(e) => setFiltreCollection(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            {collections.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>

          {/* Filtre Prix */}
          <select
            value={filtrePrix}
            onChange={(e) => setFiltrePrix(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            {fourchettes.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>

          {/* Tri */}
          <select
            value={tri}
            onChange={(e) => setTri(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <option value="populaire">Populaire</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="nom">Nom A-Z</option>
          </select>
        </div>

        {/* Compteur */}
        <p className="text-center text-stone-500 mb-8">
          {totalProducts} produit{totalProducts > 1 ? 's' : ''} trouvé{totalProducts > 1 ? 's' : ''}
        </p>

        {/* Grille de produits */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 text-lg">Aucun produit ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <Link to={`/produit/${product.id}`} className="block relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.nom}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge collection */}
                  {product.collection && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-stone-700">
                      {product.collection}
                    </span>
                  )}
                </Link>

                {/* Infos */}
                <div className="p-5">
                  <Link to={`/produit/${product.id}`}>
                    <h3 className="font-medium text-stone-900 text-lg mb-2 group-hover:text-stone-600 transition">
                      {product.nom}
                    </h3>
                  </Link>
                  <p className="text-stone-800 font-semibold text-xl mb-4">
                    {product.prix?.toFixed(2)}€
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white py-2.5 rounded-full hover:bg-stone-700 transition text-sm font-medium"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Ajouter
                    </button>
                    <button
                      onClick={() => onToggleFavorite(product)}
                      className="p-2.5 border border-stone-200 rounded-full hover:border-red-300 hover:bg-red-50 transition"
                    >
                      {isFavorite(product.id) ? (
                        <HeartSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-stone-400" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-stone-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100 transition"
            >
              ←
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full transition ${
                  currentPage === page
                    ? 'bg-stone-900 text-white'
                    : 'border border-stone-300 hover:bg-stone-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-stone-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100 transition"
            >
              →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
