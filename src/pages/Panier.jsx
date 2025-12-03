import { useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

export default function Panier() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState("standard");

  const shippingCost = shippingMethod === "express" ? 10 : 0;
  const subtotal = getSubtotal();
  const total = subtotal + shippingCost;

  const formatPrice = (price) => `${price.toFixed(2)}€`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ----------------------------- */}
        {/* HEADER */}
        {/* ----------------------------- */}
        <h1 className="text-4xl font-semibold text-stone-900 mb-12">
          Mon Panier
        </h1>

        {items.length === 0 ? (
          // -----------------------------
          // PANIER VIDE
          // -----------------------------
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-stone-600 mb-6">
              Votre panier est vide pour l’instant.
            </p>

            <Link
              to="/collections"
              className="bg-stone-900 text-white px-10 py-3 rounded-sm font-medium tracking-wide hover:bg-amber-700 transition"
            >
              Continuer les achats
            </Link>
          </div>
        ) : (
          // -----------------------------
          // PANIER AVEC PRODUITS
          // -----------------------------
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ----------------------------- */}
            {/* LISTE PRODUITS */}
            {/* ----------------------------- */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 bg-white border border-stone-200 rounded-sm shadow-sm hover:shadow-md transition"
                >
                  {/* IMAGE PRODUIT */}
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-sm border border-stone-200 bg-stone-100 flex items-center justify-center overflow-hidden">
                      {typeof item.image === "string" && item.image.startsWith("http") ? (
                        <img
                          src={item.image}
                          alt={item.nom}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">{item.image}</span>
                      )}
                    </div>
                  </div>

                  {/* INFOS */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg font-medium text-stone-900">
                        {item.nom}
                      </h3>

                      <p className="text-xs uppercase tracking-wide text-amber-700 mt-1">
                        {item.collection}
                      </p>

                      <p className="text-sm text-stone-600 mt-3">
                        Prix unitaire :{" "}
                        <span className="font-medium text-stone-800">
                          {formatPrice(item.prix)}
                        </span>
                      </p>
                    </div>

                    {/* QUANTITÉ + SUPPRESSION */}
                    <div className="flex items-center justify-between mt-4">

                      {/* QUANTITÉ */}
                      <div className="flex items-center border border-stone-300 rounded-sm overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>

                        <span className="px-4 bg-white text-stone-900 text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* TOTAL + SUPPRIMER */}
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-medium text-amber-700">
                          {formatPrice(item.prix * item.quantity)}
                        </p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ----------------------------- */}
            {/* RÉSUMÉ */}
            {/* ----------------------------- */}
            <div className="bg-white border border-stone-200 rounded-sm shadow-sm p-8 h-fit sticky top-24">

              <h2 className="text-xl font-semibold text-stone-900 mb-6">
                Résumé de la commande
              </h2>

              {/* Sous-total */}
              <div className="flex justify-between text-stone-700 mb-4 pb-4 border-b border-stone-300">
                <span>Sous-total</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              {/* Livraison */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-800 mb-3">
                  Mode de livraison
                </label>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-stone-300 rounded-sm cursor-pointer hover:bg-stone-50 transition">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <span className="text-sm text-stone-700">
                      Standard — Gratuit
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-stone-300 rounded-sm cursor-pointer hover:bg-stone-50 transition">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <span className="text-sm text-stone-700">
                      Express — {formatPrice(10)}
                    </span>
                  </label>
                </div>
              </div>

              {/* Frais */}
              <div className="flex justify-between text-stone-700 mb-6 pb-6 border-b border-stone-300">
                <span>Frais de livraison</span>
                <span className="font-medium">{formatPrice(shippingCost)}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-8">
                <span className="text-lg font-semibold text-stone-900">
                  Total TTC
                </span>
                <span className="text-2xl font-semibold text-amber-700">
                  {formatPrice(total)}
                </span>
              </div>

              {/* BOUTONS */}
              <Link
  to="/checkout"
  className="block w-full text-center bg-stone-900 text-white font-medium py-3 rounded-sm hover:bg-amber-700 transition"
>
  Procéder au paiement
</Link>


              <Link
                to="/collections"
                className="block w-full text-center mt-4 py-3 bg-stone-100 text-stone-900 rounded-sm hover:bg-stone-200 transition font-medium"
              >
                Continuer les achats
              </Link>

              <p className="text-xs text-stone-500 text-center mt-4">
                Livraison gratuite à partir de 100€ d'achat.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
