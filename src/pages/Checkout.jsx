// Checkout.jsx — PAGE À ACTIVER LORSQUE TU CLIQUES SUR "PROCÉDER AU PAIEMENT"
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, getSubtotal } = useCart();

  // (À remplacer plus tard par les données API)
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    email: ""
  });

  const subtotal = getSubtotal();
  const total = subtotal; // plus tard + livraison, TVA, etc.

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        
        {/* -------------------------------------------------- */}
        {/* TITRE */}
        {/* -------------------------------------------------- */}
        <h1 className="text-3xl font-semibold text-stone-900 mb-8">
          Finaliser votre commande
        </h1>

        {/* -------------------------------------------------- */}
        {/* FORMULAIRE */}
        {/* -------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Informations client */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className="w-full border border-gray-300 rounded p-3"
              />
              <input
                type="text"
                placeholder="Prénom"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                className="w-full border border-gray-300 rounded p-3"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded p-3"
              />
              <textarea
                placeholder="Adresse complète"
                value={form.adresse}
                onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                className="w-full border border-gray-300 rounded p-3"
              />
            </div>
          </div>

          {/* Récap commande */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.nom} × {item.quantity}</span>
                  <span>{(item.prix * item.quantity).toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-lg font-medium border-t pt-4">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* BOUTON PAYER (plus tard connecté API) */}
        {/* -------------------------------------------------- */}
        <button
          className="mt-10 w-full bg-stone-900 text-white py-4 rounded-lg text-lg font-medium hover:bg-amber-700 transition"
        >
          Payer la commande
        </button>

        {/* ⚠️ NOTE IMPORTANTE */}
        {/* Cette section sera remplacée quand tu brancheras l'API paiement */}
      </div>
    </div>
  );
}
