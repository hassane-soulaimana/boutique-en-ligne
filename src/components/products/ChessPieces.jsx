import { useState, useEffect, useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { animeApi } from "../../services/animeApi";

export default function ChessPieces() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem } = useContext(ThemeContext);

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

  // 📌 Ajout au panier simplifié
  const handleAddToCart = (product) => {
    addItem({
      id: product._id || product.id,
      nom: product.nom || product.name,
      prix: product.prix || product.price,
      image: product.image || product.imageUrl,
    });

    // Petite notification simple
    const notif = document.createElement("div");
    notif.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg";
    notif.textContent = `${product.nom || product.name} ajouté au panier !`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
  };

  // ────────────────────────────────────────────────
  //    GESTION DES ÉTATS (chargement / erreur / vide)
  // ────────────────────────────────────────────────

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

  // ────────────────────────────────────────────────
  //                    RENDU DU CAROUSEL
  // ────────────────────────────────────────────────

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Nos Produits</h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product._id} className="min-w-full p-8 bg-white">
                  <img
                    src={
                      product.image ||
                      product.imageUrl ||
                      "https://via.placeholder.com/400"
                    }
                    alt={product.nom || product.name}
                    className="w-full h-96 object-cover rounded-lg mb-6"
                  />

                  <h3 className="text-2xl font-bold mb-2">
                    {product.nom || product.name}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {product.description || "Aucune description"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-amber-600">
                      {product.prix || product.price} €
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Points */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? "bg-amber-600 w-8" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
