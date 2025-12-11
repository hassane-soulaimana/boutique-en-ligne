import { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { ShopContext } from "../../context/ShopContext.jsx";
import { animeApi } from "../../services/animeApi";
import { getImageUrl, handleImageError } from "../../services/imageLoader";

export default function NewProducts() {
  const sliderRef = useRef(null);
  const { addItem } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les produits depuis l'API au démarrage
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Charger les produits depuis l'API
      const data = await animeApi.getProducts();
      
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (distance) => {
    sliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handleAddToCart = (product) => {
    try {
      addItem({
        id: product._id || product.id,
        nom: product.nom || product.name,
        prix: product.prix || product.price,
        image: product.image,
      });
      // Notification améliorée au lieu d'alert
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

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-xl text-gray-600">Chargement des produits...</p>
        </div>
      </section>
    );
  }

  // Afficher une erreur si le chargement a échoué
  if (error) {
    return (
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-800 font-semibold mb-2">❌ Erreur</p>
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Si aucun produit n'est disponible
  if (products.length === 0) {
    return (
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-yellow-800 font-semibold mb-2">⚠️ Aucun produit</p>
            <p className="text-yellow-600">Aucun produit n'est disponible pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900">Nouveautés</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Découvrez nos dernières créations exclusives
          </p>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative flex items-center gap-4">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll(-300)}
            className="hidden md:flex p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition z-10"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar w-full"
          >
            {products.map((p) => (
              <div
                key={p._id || p.id}
                className="
                  min-w-[260px] max-w-[260px]
                  bg-white rounded-2xl shadow-md hover:shadow-xl
                  transition
                "
              >
                {/* IMAGE */}
                <div className="w-full aspect-square bg-gray-200 rounded-t-2xl overflow-hidden">
                  <img 
                    src={getImageUrl(p.image)}
                    alt={p.nom || p.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-lg mb-1">
                    {p.nom || p.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{(p.prix || p.price)?.toFixed(2)}€</p>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="
                      mt-4 w-full py-2 rounded-xl border border-gray-300
                      flex items-center justify-center gap-2
                      text-gray-700 font-medium
                      hover:bg-black hover:text-white hover:border-black
                      transition
                    "
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(300)}
            className="hidden md:flex p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition z-10"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

        </div>

        {/* SEE MORE BUTTON */}
        <div className="text-center mt-12">
          <Link
            to="/collections"
            className="
              inline-block bg-black text-white px-8 py-3 rounded-full 
              font-semibold hover:bg-neutral-800 transition
            "
          >
            Découvrez toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}