import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const produit = {
    id: id,
    nom: 'Échiquier Premium Naruto',
    prix: 149.99,
    image: '🎮',
    description: 'Un magnifique échiquier avec le design de Naruto, parfait pour les fans et les joueurs d\'échecs.',
    stock: 15,
    collection: 'Naruto',
    couleur: '#FF6B35'
  };

  const handleAddToCart = () => {
    addItem({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image,
      collection: produit.collection,
      quantity: quantity
    });
    alert(`${quantity} x ${produit.nom} ajouté au panier !`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-orange-600 hover:text-orange-700 font-semibold"
        >
          ← Retour
        </button>

        {/* Produit */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div>
              <div
                className="h-96 rounded-lg flex items-center justify-center text-9xl mb-6"
                style={{ backgroundColor: produit.couleur + '20' }}
              >
                {produit.image}
              </div>
              <p className="text-center text-gray-600">
                {produit.stock} en stock
              </p>
            </div>

            {/* Détails */}
            <div>
              <div className="mb-6">
                <p className="text-orange-600 font-semibold mb-2">
                  Collection {produit.collection}
                </p>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {produit.nom}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {produit.description}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-8 pb-8 border-b">
                <p className="text-5xl font-bold text-orange-600">
                  {produit.prix.toFixed(2)} €
                </p>
              </div>

              {/* Quantité */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-3 py-2 border border-gray-300 rounded text-center"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition text-lg"
                >
                  Ajouter au panier
                </button>
                <button className="px-6 py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold rounded-lg transition">
                  ♥ Favoris
                </button>
              </div>

              {/* Caractéristiques */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Caractéristiques</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex justify-between">
                    <span>Design:</span>
                    <span className="font-semibold">Exclusif Manga</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Matériel:</span>
                    <span className="font-semibold">Bois premium</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dimensions:</span>
                    <span className="font-semibold">40x40 cm</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Livraison:</span>
                    <span className="font-semibold">Gratuite ( 50€)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
