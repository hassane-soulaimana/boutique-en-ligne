import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

export default function Panier() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingCost = shippingMethod === 'express' ? 10 : 0;
  const subtotal = getSubtotal();
  const total = subtotal + shippingCost;

  const formatPrice = (price) => {
    return `${price.toFixed(2)}€`;
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-black mb-12">Mon Panier</h1>

        {items.length === 0 ? (
          // PANIER VIDE
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-gray-600 mb-6">Votre panier est vide</p>
            <Link
              to="/collections"
              className="inline-block bg-black text-white font-semibold px-8 py-3 rounded hover:bg-gray-900 transition"
            >
              Continuer les achats
            </Link>
          </div>
        ) : (
          // CONTENU DU PANIER
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SECTION PRODUITS (2/3) */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                  >
                    {/* IMAGE */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                        {item.image}
                      </div>
                    </div>

                    {/* INFOS */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black mb-1">
                        {item.nom}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{item.collection}</p>
                      <p className="text-sm font-medium text-gray-700">
                        Prix unitaire: {formatPrice(item.prix)}
                      </p>
                    </div>

                    {/* QUANTITÉ ET ACTION */}
                    <div className="flex flex-col items-end justify-between">
                      {/* CONTRÔLES QUANTITÉ */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-black transition"
                          aria-label="Diminuer quantité"
                        >
                          <MinusIcon className="w-5 h-5" />
                        </button>
                        <span className="px-4 py-1 text-center min-w-12 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 hover:text-black transition"
                          aria-label="Augmenter quantité"
                        >
                          <PlusIcon className="w-5 h-5" />
                        </button>
                      </div>

                      {/* PRIX TOTAL + SUPPRIMER */}
                      <div className="flex flex-col items-end gap-3 mt-4">
                        <p className="text-lg font-bold text-black">
                          {formatPrice(item.prix * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          aria-label="Supprimer du panier"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION RÉSUMÉ (1/3) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-black mb-6">Résumé</h2>

                {/* SOUS-TOTAL */}
                <div className="flex justify-between mb-4 pb-4 border-b border-gray-300">
                  <span className="text-gray-700">Sous-total</span>
                  <span className="font-semibold text-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* LIVRAISON */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-black mb-3">
                    Livraison
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-white transition">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">
                        Standard (Gratuit)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-white transition">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">
                        Express (+{formatPrice(10)})
                      </span>
                    </label>
                  </div>
                </div>

                {/* FRAIS */}
                <div className="flex justify-between mb-6 pb-6 border-b border-gray-300">
                  <span className="text-gray-700">Frais de livraison</span>
                  <span className="font-semibold text-black">
                    {formatPrice(shippingCost)}
                  </span>
                </div>

                {/* TOTAL */}
                <div className="flex justify-between mb-8 pb-6 border-b border-gray-300">
                  <span className="text-lg font-bold text-black">Total TTC</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* BOUTONS */}
                <div className="space-y-3">
                  <button
                    disabled={items.length === 0}
                    className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Procéder au paiement
                  </button>
                  <Link
                    to="/collections"
                    className="block w-full text-center bg-gray-200 text-black font-semibold py-3 rounded hover:bg-gray-300 transition"
                  >
                    Continuer les achats
                  </Link>
                </div>

                {/* INFOS */}
                <p className="text-xs text-gray-600 text-center mt-4">
                  Livraison gratuite à partir de 100€
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
