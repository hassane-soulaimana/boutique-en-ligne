import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowLeftIcon,
  TagIcon
} from "@heroicons/react/24/outline";

export default function Checkout() {
  const { items, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const [shipping, setShipping] = useState("standard"); // standard / express

  const shippingCost = shipping === "express" ? 10 : 0;
  const total = subtotal + shippingCost;

  const [form, setForm] = useState({
    email: "",
    nom: "",
    prenom: "",
    adresse: "",
    ville: "",
    codePostal: "",
    pays: "France",
    telephone: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // --------------------------------------------
  // NOTE BACKEND
  // Cette fonction sera remplacée par ton futur appel API
  // pour créer une commande + lancer Stripe Checkout
  // --------------------------------------------
  const handlePayment = () => {
    alert("Paiement non connecté (Stripe API à venir).");
  };

  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 px-6">

        {/* =========================== */}
        {/*      COLONNE FORMULAIRE     */}
        {/* =========================== */}
        <div className="lg:col-span-2 space-y-10">

          {/* Retour panier */}
          <Link
            to="/panier"
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour au panier
          </Link>

          {/* ------------ Contact ------------- */}
          <section className="bg-white p-8 rounded-sm border border-stone-200 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900 mb-6">Contact</h2>

            <input
              type="email"
              placeholder="Adresse e-mail"
              className="w-full border border-stone-300 rounded-sm p-3 focus:ring-amber-600 focus:border-amber-600"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <label className="flex items-center gap-3 mt-4 text-sm text-stone-700 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Recevoir des nouveautés et offres exclusives
            </label>
          </section>

          {/* ------------ Livraison ------------- */}
          <section className="bg-white p-8 rounded-sm border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-stone-900">Livraison</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Prénom"
                className="border border-stone-300 rounded-sm p-3"
                value={form.prenom}
                onChange={(e) => handleChange("prenom", e.target.value)}
              />
              <input
                type="text"
                placeholder="Nom"
                className="border border-stone-300 rounded-sm p-3"
                value={form.nom}
                onChange={(e) => handleChange("nom", e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Adresse"
              className="w-full border border-stone-300 rounded-sm p-3"
              value={form.adresse}
              onChange={(e) => handleChange("adresse", e.target.value)}
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Ville"
                className="border border-stone-300 rounded-sm p-3"
                value={form.ville}
                onChange={(e) => handleChange("ville", e.target.value)}
              />
              <input
                type="text"
                placeholder="Code postal"
                className="border border-stone-300 rounded-sm p-3"
                value={form.codePostal}
                onChange={(e) => handleChange("codePostal", e.target.value)}
              />
              <select
                className="border border-stone-300 rounded-sm p-3"
                value={form.pays}
                onChange={(e) => handleChange("pays", e.target.value)}
              >
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Canada</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Téléphone (optionnel)"
              className="w-full border border-stone-300 rounded-sm p-3"
              value={form.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
            />

            {/* Méthode livraison */}
            <div className="space-y-2 pt-6 border-t border-stone-200">
              <label className="flex items-center justify-between p-4 border rounded-sm cursor-pointer hover:border-amber-600 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ship"
                    value="standard"
                    checked={shipping === "standard"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <span>Livraison Standard (Gratuite)</span>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 border rounded-sm cursor-pointer hover:border-amber-600 transition">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ship"
                    value="express"
                    checked={shipping === "express"}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                  <span>Livraison Express</span>
                </div>
                <span className="font-medium text-stone-700">+10€</span>
              </label>
            </div>
          </section>
        </div>

        {/* =========================== */}
        {/*    COLONNE RÉCAP (DROITE)   */}
        {/* =========================== */}
        <aside className="bg-white border border-stone-200 rounded-sm shadow-sm p-6 h-fit sticky top-20">

          <h2 className="text-xl font-semibold text-stone-900 mb-6">Résumé</h2>

          {/* Produits */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                  {/* ===== IMAGE FIXÉE ===== */}
                  <div className="w-14 h-14 bg-stone-100 rounded-sm overflow-hidden flex items-center justify-center">
                    {String(item.image).startsWith("http") ? (
                      <img
                        src={item.image}
                        alt={item.nom}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">{item.image}</span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-stone-900 font-medium">{item.nom}</p>
                    <p className="text-xs text-stone-500">× {item.quantity}</p>
                  </div>
                </div>

                <p className="text-sm font-medium text-stone-900">
                  {(item.prix * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          {/* Code promo */}
          <div className="flex items-center gap-2 mb-6">
            <TagIcon className="w-5 h-5 text-stone-600" />
            <input
              type="text"
              placeholder="Code promo"
              className="flex-1 border border-stone-300 rounded-sm p-2"
            />
            <button className="px-4 py-2 bg-stone-900 text-white rounded-sm hover:bg-amber-700 transition">
              Valider
            </button>
          </div>

          {/* Totaux */}
          <div className="space-y-3 border-t pt-4">

            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Sous-total</span>
              <span className="font-medium">{subtotal.toFixed(2)} €</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Livraison</span>
              <span className="font-medium">{shippingCost.toFixed(2)} €</span>
            </div>

            <div className="flex justify-between text-lg font-semibold pt-3 border-t">
              <span>Total TTC</span>
              <span className="text-amber-700">{total.toFixed(2)} €</span>
            </div>
          </div>

          {/* Bouton payer */}
          <button
            onClick={handlePayment}
            className="mt-8 w-full bg-stone-900 text-white rounded-sm py-3 font-medium hover:bg-amber-700 transition"
          >
            Procéder au paiement
          </button>
        </aside>
      </div>
    </main>
  );
}
