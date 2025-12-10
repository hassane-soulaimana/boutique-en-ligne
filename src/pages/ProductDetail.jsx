import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { animeApi } from '../services/animeApi';
import { getImageUrl, handleImageError } from '../services/imageLoader';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, toggleFavorite, isFavorite } = useContext(ThemeContext);
  const [quantity, setQuantity] = useState(1);

  // State pour produit, chargement et erreur
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger le produit depuis l'API
  useEffect(() => {
    async function fetchProduit() {
      try {
        setLoading(true);
        console.log(`🔄 Chargement du produit avec ID: ${id}`);
        const data = await animeApi.getProductById(id);
        console.log('📦 Produit reçu:', data);
        
        if (!data) {
          setError('Produit non trouvé');
          setProduit(null);
        } else {
          setProduit(data);
          setError(null);
        }
      } catch (err) {
        console.error("❌ Erreur API produit:", err);
        setError('Erreur lors du chargement du produit');
        setProduit(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduit();
  }, [id]);

  const handleAddToCart = () => {
    addItem({
      id: produit.id || produit._id,
      nom: produit.nom || produit.name,
      prix: produit.prix || produit.price,
      image: produit.image,
      collection: produit.collection || produit.universe?.name,
      quantity: quantity,
    });
    alert(`${quantity} x ${produit.nom || produit.name} ajouté au panier !`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: produit.id || produit._id,
      nom: produit.nom || produit.name,
      prix: produit.prix || produit.price,
      image: produit.image,
      collection: produit.collection || produit.universe?.name,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-amber-700 hover:text-amber-800 font-medium"
        >
          ← Retour
        </button>

        {/* État de chargement */}
        {loading && (
          <div className="min-h-screen flex flex-col items-center justify-center text-stone-600">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-lg">Chargement du produit...</p>
          </div>
        )}

        {/* État d'erreur */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-8 text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => navigate('/echiquiers')}
              className="px-6 py-2 bg-amber-600 text-white rounded-sm hover:bg-amber-700"
            >
              Retour aux produits
            </button>
          </div>
        )}

        {/* Contenu du produit */}
        {produit && !loading && !error && (
        <div className="bg-white border border-stone-200 rounded-sm shadow-sm p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

            {/* IMAGE PRODUIT */}
            <div>
              <div className="overflow-hidden rounded-sm border border-stone-200 shadow-sm">
                <img
                  src={getImageUrl(produit.image)}
                  alt={produit.nom}
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  onError={handleImageError}
                />
              </div>

              <p className="text-center text-stone-500 text-sm mt-3">
                {produit.stock || 'Stock disponible'}
              </p>
            </div>

            {/* DÉTAILS PRODUIT */}
            <div>
              <div className="mb-8">
                <p className="text-amber-700 uppercase text-xs tracking-wide font-medium mb-2">
                  {produit.collection || produit.universe?.name || 'Collection'}
                </p>

                <h1 className="text-4xl font-semibold text-stone-900 mb-4 leading-tight">
                  {produit.nom || produit.name}
                </h1>

                <p className="text-stone-600 leading-relaxed text-lg">
                  {produit.description || 'Produit de qualité premium'}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-10 pb-8 border-b border-stone-200">
                <p className="text-4xl font-normal text-amber-700">
                  {(produit.prix || produit.price || 0).toFixed(2)} €
                </p>
              </div>

              {/* Quantité */}
              <div className="mb-10">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-stone-300 rounded-sm hover:bg-stone-100"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 px-3 py-2 border border-stone-300 rounded-sm text-center"
                  />

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-stone-300 rounded-sm hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-stone-900 hover:bg-amber-700 text-white font-medium py-4 rounded-sm transition"
                >
                  Ajouter au panier
                </button>

                <button 
                  onClick={handleToggleFavorite}
                  className={`px-6 py-4 border font-medium rounded-sm transition ${
                    isFavorite(produit.id || produit._id)
                      ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                      : 'border-amber-600 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  {isFavorite(produit.id || produit._id) ? '❤️ Favori' : '♥ Favoris'}
                </button>
              </div>

              {/* Caractéristiques */}
              <div className="mt-12 pt-8 border-t border-stone-200">
                <h3 className="font-medium text-lg text-stone-900 mb-4">
                  Caractéristiques
                </h3>
                <ul className="space-y-3 text-stone-600 text-sm">
                  <li className="flex justify-between">
                    <span>Design :</span>
                    <span className="font-medium">Exclusif Manga</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Matériel :</span>
                    <span className="font-medium">Bois premium</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dimensions :</span>
                    <span className="font-medium">40×40 cm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Livraison :</span>
                    <span className="font-medium">Gratuite dès 50€</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
