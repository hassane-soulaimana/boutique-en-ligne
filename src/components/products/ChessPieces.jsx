import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";
import { animeApi } from "../../services/animeApi";

export default function ChessPieces() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await animeApi.getProducts();
      console.log('✅ Produits chargés (ChessPieces):', data);
      setProducts(data);
    } catch (err) {
      console.error('❌ Erreur chargement produits:', err);
      setError('Impossible de charger les produits. Veuillez réessayer.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleAddToCart = (product) => {
    try {
      addItem({
        id: product._id || product.id,
        nom: product.nom || product.name,
        prix: product.prix || product.price,
        image: product.image || product.imageUrl,
        collection: product.collection || 'Anime'
      });
      
      // Notification améliorée
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      notification.innerHTML = `<strong>✓</strong> ${product.nom || product.name} ajouté au panier !`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout au panier:', error);
      alert('Erreur lors de l\'ajout au panier. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
        <p className="text-xl text-gray-600">Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 font-semibold mb-2">❌ Erreur</p>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Aucun produit</p>
            <p className="text-yellow-600">Aucun produit n'est disponible pour le moment.</p>
          </div>
        </div>
      </div>
    );
  }
else {return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Nos Produits Anime
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product._id || product.id} className="min-w-full">
                  <div className="bg-white p-8">
                    <img
                      src={product.image || product.imageUrl || "https://via.placeholder.com/400"}
                      alt={product.nom || product.name}
                      className="w-full h-96 object-cover rounded-lg mb-6"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x400?text=Image+non+disponible';
                      }}
                    />
                    <h3 className="text-2xl font-bold mb-2">
                      {product.nom || product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description || "Description non disponible"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-amber-600">
                        {product.prix || product.price} €
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <ShoppingCartIcon className="h-5 w-5" />
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-amber-600 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );}
}