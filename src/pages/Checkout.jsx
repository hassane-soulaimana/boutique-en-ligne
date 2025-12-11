import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext.jsx";
import API_URL from "../services/api";
import {
  ArrowLeftIcon,
  TagIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Checkout() {
  const { cart: items, getSubtotal, clearCart } = useContext(ThemeContext);
  const subtotal = getSubtotal();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!(token && user));
  }, []);

  // Rediriger si non connecté ou afficher message
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-12 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-200">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LockClosedIcon className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-4">
              Connexion requise
            </h1>
            <p className="text-stone-600 mb-6">
              Vous devez être connecté pour passer une commande. Connectez-vous ou créez un compte pour continuer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/connexion"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all"
              >
                Se connecter
              </Link>
              <Link
                to="/inscription"
                className="px-6 py-3 border-2 border-stone-300 text-stone-700 font-semibold rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-all"
              >
                Créer un compte
              </Link>
            </div>
            <Link
              to="/panier"
              className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 mt-6 text-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Retour au panier
            </Link>
          </div>
        </div>
      </main>
    );
  }

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

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = "L'adresse e-mail est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide";
    }
    
    if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!form.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!form.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (!form.ville.trim()) newErrors.ville = "La ville est requise";
    if (!form.codePostal.trim()) {
      newErrors.codePostal = "Le code postal est requis";
    } else if (!/^\d{5}$/.test(form.codePostal.trim())) {
      newErrors.codePostal = "Le code postal doit contenir 5 chiffres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enregistrement de la commande et paiement
  const handlePayment = async () => {
    console.log("🔄 handlePayment appelé");
    console.log("📦 Items dans le panier:", items);
    console.log("📝 Formulaire:", form);
    
    // Valider le formulaire
    if (!validateForm()) {
      console.log("❌ Validation échouée:", errors);
      return;
    }
    
    // Vérifier que le panier n'est pas vide
    if (!items || items.length === 0) {
      console.log("❌ Panier vide");
      alert("Votre panier est vide");
      return;
    }
    
    console.log("✅ Validation OK, envoi de la commande...");
    setIsSubmitting(true);
    
    // Générer un numéro de commande unique
    const orderNumber = `CMD-${Date.now()}`;
    
    // Préparer les données de la commande
    const orderData = {
      orderNumber: orderNumber,
      customer: {
        email: form.email,
        firstName: form.prenom,
        lastName: form.nom,
        phone: form.telephone || null,
      },
      shippingAddress: {
        address: form.adresse,
        city: form.ville,
        postalCode: form.codePostal,
        country: form.pays,
      },
      items: items.map(item => ({
        productId: item.id,
        name: item.nom,
        price: item.prix,
        quantity: item.quantity,
        image: item.image,
      })),
      shipping: {
        method: shipping,
        cost: shippingCost,
      },
      subtotal: subtotal,
      total: total,
      status: "En cours de traitement",
      createdAt: new Date().toISOString(),
    };
    
    console.log("📤 Envoi des données:", orderData);
    
    try {
      // Envoyer la commande au backend
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(orderData),
      });
      
      console.log("📥 Réponse:", response.status);
      const data = await response.json();
      console.log("📥 Data:", data);
      
      // Mettre à jour le numéro de commande si retourné par l'API
      if (data.data?.orderNumber) {
        orderData.orderNumber = data.data.orderNumber;
      }
      if (data.data?._id) {
        orderData._id = data.data._id;
      }
    } catch (error) {
      console.error("❌ Erreur envoi API:", error);
    }
    
    // Sauvegarder la commande en local (backup)
    const localOrders = JSON.parse(localStorage.getItem("localOrders") || "[]");
    localOrders.unshift(orderData);
    localStorage.setItem("localOrders", JSON.stringify(localOrders));
    console.log("💾 Commande sauvegardée localement");
    
    // Vider le panier
    clearCart();
    
    // Stocker les infos de commande pour la page de confirmation
    sessionStorage.setItem("lastOrder", JSON.stringify({
      orderNumber: orderData.orderNumber,
      total: total,
      email: form.email,
    }));
    
    console.log("✅ Commande créée, redirection...");
    setIsSubmitting(false);
    // Rediriger vers la confirmation
    navigate("/confirmation-commande");
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
              placeholder="Adresse e-mail *"
              className={`w-full border rounded-sm p-3 focus:ring-amber-600 focus:border-amber-600 ${errors.email ? 'border-red-500' : 'border-stone-300'}`}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <ExclamationCircleIcon className="w-4 h-4" />
                {errors.email}
              </p>
            )}

            <label className="flex items-center gap-3 mt-4 text-sm text-stone-700 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Recevoir des nouveautés et offres exclusives
            </label>
          </section>

          {/* ------------ Livraison ------------- */}
          <section className="bg-white p-8 rounded-sm border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-stone-900">Livraison</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Prénom *"
                  className={`w-full border rounded-sm p-3 ${errors.prenom ? 'border-red-500' : 'border-stone-300'}`}
                  value={form.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                />
                {errors.prenom && (
                  <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nom *"
                  className={`w-full border rounded-sm p-3 ${errors.nom ? 'border-red-500' : 'border-stone-300'}`}
                  value={form.nom}
                  onChange={(e) => handleChange("nom", e.target.value)}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Adresse *"
                className={`w-full border rounded-sm p-3 ${errors.adresse ? 'border-red-500' : 'border-stone-300'}`}
                value={form.adresse}
                onChange={(e) => handleChange("adresse", e.target.value)}
              />
              {errors.adresse && (
                <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Ville *"
                  className={`w-full border rounded-sm p-3 ${errors.ville ? 'border-red-500' : 'border-stone-300'}`}
                  value={form.ville}
                  onChange={(e) => handleChange("ville", e.target.value)}
                />
                {errors.ville && (
                  <p className="text-red-500 text-sm mt-1">{errors.ville}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Code postal *"
                  className={`w-full border rounded-sm p-3 ${errors.codePostal ? 'border-red-500' : 'border-stone-300'}`}
                  value={form.codePostal}
                  onChange={(e) => handleChange("codePostal", e.target.value)}
                />
                {errors.codePostal && (
                  <p className="text-red-500 text-sm mt-1">{errors.codePostal}</p>
                )}
              </div>
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

                  {/* IMAGE */}
                  <div className="w-14 h-14 bg-stone-100 rounded-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.nom}
                      className="w-full h-full object-cover"
                    />
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
            disabled={isSubmitting || items.length === 0}
            className={`mt-8 w-full rounded-sm py-3 font-medium transition ${isSubmitting || items.length === 0 ? 'bg-stone-400 text-stone-200 cursor-not-allowed' : 'bg-stone-900 text-white hover:bg-amber-700'}`}
          >
            {isSubmitting ? "Traitement en cours..." : "Confirmer la commande"}
          </button>
          
          {Object.keys(errors).length > 0 && (
            <p className="text-red-500 text-sm text-center mt-3">
              Veuillez corriger les erreurs ci-dessus
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
