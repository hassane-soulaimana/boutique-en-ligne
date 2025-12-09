import { useState, useEffect, useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { animeApi } from "../../services/animeApi";
import API_URL from "../../services/api";
import { getImageUrl, handleImageError } from "../../services/imageLoader";

export default function ChessPieces() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem, toggleFavorite, isFavorite } = useContext(ThemeContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Chargement des produits...');
      const data = await animeApi.getProducts();
      console.log('✅ Produits récupérés:', data);
      console.log('📊 Nombre de produits:', data.length);
      setProducts(data);
    } catch (err) {
      console.error('❌ Erreur:', err);
      setError("Impossible de charger les produits.");
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  // Ajout au panier
  const handleAddToCart = (product) => {
    addItem({
      id: product._id || product.id,
      nom: product.nom || product.name,
      prix: product.prix || product.price,
      image: product.image || product.imageUrl,
    });

    // Petite notification 
    const notif = document.createElement("div");
    notif.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg";
    notif.textContent = `${product.nom || product.name} ajouté au panier !`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
  };

  // Chargement // Erreurs

  if (loading)
    return (
      <div className="py-20 text-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-amber-600 rounded-full mx-auto"></div>
        <p className="text-xl text-gray-600 mt-4">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-6 py-2 bg-red-600 text-white rounded-lg"
        >
          Réessayer
        </button>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="py-20 text-center">
        <p className="text-yellow-600">Aucun produit disponible.</p>
      </div>
    );

// Carrousel avec cartes plus petites
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Nos Produits</h2>

        <div className="relative w-full">
          {/* Conteneur du carrousel avec marges */}
          <div className="mx-auto px-12 py-4">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              >
                {products.map((product) => (
                  <div 
                    key={product._id} 
                    className="min-w-[calc(33.333%-1rem)] bg-white border border-stone-200 rounded-lg shadow-md hover:shadow-xl transition-shadow p-4"
                  >
                    {/* Image */}
                    <div className="relative h-40 bg-gradient-to-br from-stone-100 to-stone-50 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.nom || product.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>

                    {/* Contenu */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-stone-900 line-clamp-2">
                        {product.nom || product.name}
                      </h3>

                      <p className="text-amber-600 font-bold text-xl">
                        {product.prix || product.price} €
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => toggleFavorite({
                            id: product._id || product.id,
                            nom: product.nom || product.name,
                            prix: product.prix || product.price,
                            image: product.image || product.imageUrl,
                          })}
                          className={`p-2 rounded-lg transition-colors ${
                            isFavorite(product._id || product.id)
                              ? 'text-red-500 hover:text-red-600'
                              : 'text-stone-400 hover:text-red-500'
                          }`}
                        >
                          {isFavorite(product._id || product.id) ? '❤️' : '♡'}
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 flex items-center justify-center gap-1 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition"
                        >
                          <ShoppingCartIcon className="h-4 w-4" />
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Boutons navigation */}
          {products.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/3 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-stone-100 transition z-10"
              >
                <ChevronLeftIcon className="h-6 w-6 text-stone-900" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/3 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-stone-100 transition z-10"
              >
                <ChevronRightIcon className="h-6 w-6 text-stone-900" />
              </button>
            </>
          )}

          {/* Points indicateurs */}
          {products.length > 3 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === Math.floor(currentIndex / 3) 
                      ? "bg-amber-600 w-8" 
                      : "bg-stone-300 w-2 hover:bg-stone-400"
                  }`}
                  onClick={() => setCurrentIndex(index * 3)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
