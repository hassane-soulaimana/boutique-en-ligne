import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  // -------------------------------------------------------------
  // 🔌 PRODUCT STATE (TOUJOURS UTILISÉ)
  // -------------------------------------------------------------
  const [produit, setProduit] = useState(null);

  // -------------------------------------------------------------
  // 🟠 MOCK TEMPORAIRE (À SUPPRIMER LORSQUE L'API ARRIVE)
  // -------------------------------------------------------------
  useEffect(() => {
    // ❗ À EFFACER plus tard lorsque l'API est connectée
    setProduit({
      id: id,
      nom: 'Échiquier Premium Naruto',
      prix: 149.99,
      image: 'https://placehold.co/600x600?text=Image+Produit',
      description:
        "Un magnifique échiquier inspiré de l'univers Naruto, réalisé avec un bois premium.",
      stock: 12,
      collection: 'Naruto',
      couleur: '#FF6B35',
    });
  }, [id]);

  // -------------------------------------------------------------
  // 🔌 VERSION API (À ACTIVER PLUS TARD)
  // -------------------------------------------------------------
  /*
  useEffect(() => {
    async function fetchProduit() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}` // <-- URL API
        );
        const data = await response.json();
        setProduit(data);
      } catch (err) {
        console.error("Erreur API produit :", err);
      }
    }

    fetchProduit();
  }, [id]);
  */

  // -------------------------------------------------------------
  // LOADER TEMPORAIRE
  // -------------------------------------------------------------
  if (!produit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500">
        Chargement du produit...
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      ...produit,
      quantity: quantity,
    });
    alert(`${quantity} x ${produit.nom} ajouté au panier !`);
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

        <div className="bg-white border border-stone-200 rounded-sm shadow-sm p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

            {/* IMAGE PRODUIT */}
            <div>
              <div className="overflow-hidden rounded-sm border border-stone-200 shadow-sm">
                <img
                  src={produit.image}
                  alt={produit.nom}
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <p className="text-center text-stone-500 text-sm mt-3">
                {produit.stock} en stock
              </p>
            </div>

            {/* DÉTAILS PRODUIT */}
            <div>
              <div className="mb-8">
                <p className="text-amber-700 uppercase text-xs tracking-wide font-medium mb-2">
                  Collection {produit.collection}
                </p>

                <h1 className="text-4xl font-semibold text-stone-900 mb-4 leading-tight">
                  {produit.nom}
                </h1>

                <p className="text-stone-600 leading-relaxed text-lg">
                  {produit.description}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-10 pb-8 border-b border-stone-200">
                <p className="text-4xl font-normal text-amber-700">
                  {produit.prix.toFixed(2)} €
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

                <button className="px-6 py-4 border border-amber-600 text-amber-700 hover:bg-amber-50 font-medium rounded-sm transition">
                  ♥ Favoris
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
      </div>
    </main>
  );
}
