import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { animeApi } from "../services/animeApi";
import { ShoppingBagIcon, ClockIcon, TruckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Profil() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("infos");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ prenom: "", nom: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadUserProfile = async () => {
    try {
      const userData = await animeApi.getMe();
      setUser(userData);
      setEditForm({
        prenom: userData.prenom || "",
        nom: userData.nom || "",
        email: userData.email || "",
      });

      // Charger les commandes
      try {
        const ordersData = await animeApi.getOrders();
        console.log("📦 Commandes récupérées:", ordersData);
        setOrders(ordersData.data || []);
      } catch (err) {
        console.error("❌ Erreur commandes:", err);
      }

      // Charger les favoris
      try {
        const favData = await animeApi.getFavorites();
        console.log("❤️ Favoris récupérés:", favData);
        setFavorites(favData.data || []);
      } catch (err) {
        console.error("❌ Erreur favoris:", err);
      }
    } catch (error) {
      console.error("❌ Erreur chargement profil:", error);
      navigate("/connexion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token") || localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/connexion");
      return;
    }
    loadUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    animeApi.logout();
    navigate("/connexion");
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await animeApi.removeFavorite(productId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
    } catch (error) {
      console.error("❌ Erreur suppression favori:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      prenom: user.prenom || "",
      nom: user.nom || "",
      email: user.email || "",
    });
    setMessage({ type: "", text: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await animeApi.updateProfile(editForm);
      if (response.success || response.data) {
        const updatedUser = response.data || { ...user, ...editForm };
        setUser(updatedUser);
        setIsEditing(false);
        setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
        
        // Faire disparaître le message après 3 secondes
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("❌ Erreur mise à jour profil:", error);
      setMessage({ type: "error", text: error.message || "Erreur lors de la mise à jour" });
    } finally {
      setSaving(false);
    }
  };

  // Fonction pour obtenir l'icône du statut
  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("livré") || statusLower.includes("delivered")) {
      return <CheckCircleIcon className="w-5 h-5" />;
    } else if (statusLower.includes("expédié") || statusLower.includes("shipped")) {
      return <TruckIcon className="w-5 h-5" />;
    } else if (statusLower.includes("traitement") || statusLower.includes("processing")) {
      return <ClockIcon className="w-5 h-5" />;
    }
    return <ShoppingBagIcon className="w-5 h-5" />;
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("livré") || statusLower.includes("delivered")) {
      return "bg-green-600";
    } else if (statusLower.includes("expédié") || statusLower.includes("shipped")) {
      return "bg-blue-600";
    } else if (statusLower.includes("annulé") || statusLower.includes("cancelled")) {
      return "bg-red-600";
    }
    return "bg-amber-600";
  };

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-xl text-gray-600">Chargement du profil...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] py-16 px-6 lg:px-20">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-12 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-semibold text-stone-900">
            Bonjour {user.prenom}
          </h1>
          <p className="text-stone-600 mt-2">
            Gérez votre profil, vos achats et vos favoris.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-3 font-semibold rounded-sm bg-stone-900 text-white hover:bg-amber-700 transition"
        >
          Se déconnecter
        </button>
      </motion.div>

      {/* ONGLET BAR */}
      <div className="max-w-5xl mx-auto flex border-b border-stone-300 mb-12 gap-8">
        {["infos", "commandes", "favoris"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              pb-4 font-medium transition
              ${
                activeTab === tab
                  ? "text-amber-700 border-b-[3px] border-amber-700"
                  : "text-stone-600 hover:text-stone-800"
              }
            `}
          >
            {tab === "infos" && "Mes informations"}
            {tab === "commandes" && "Mes commandes"}
            {tab === "favoris" && "Mes favoris"}
          </button>
        ))}
      </div>

      {/* CONTENU DES TABS */}
      <div className="max-w-5xl mx-auto">
        {/* INFOS */}
        {activeTab === "infos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-10 py-10 rounded-sm shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-8">
              Informations personnelles
            </h2>

            {/* Message de succès/erreur */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {isEditing ? (
              /* MODE ÉDITION */
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <label className="block font-medium text-stone-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={editForm.prenom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={editForm.nom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-2">
                    Rôle
                  </label>
                  <p className="px-4 py-3 bg-stone-100 rounded-sm text-stone-600">
                    {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 font-semibold bg-amber-600 text-white rounded-sm hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-8 py-3 font-semibold bg-stone-200 text-stone-700 rounded-sm hover:bg-stone-300 transition"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              /* MODE AFFICHAGE */
              <>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-stone-200 pb-3">
                    <span className="font-medium text-stone-700">Prénom</span>
                    <span className="text-stone-600">{user.prenom}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-3">
                    <span className="font-medium text-stone-700">Nom</span>
                    <span className="text-stone-600">{user.nom}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-3">
                    <span className="font-medium text-stone-700">Email</span>
                    <span className="text-stone-600">{user.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-3">
                    <span className="font-medium text-stone-700">Rôle</span>
                    <span className="text-stone-600">
                      {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleEditClick}
                  className="mt-10 px-8 py-3 font-semibold bg-stone-900 text-white rounded-sm hover:bg-amber-700 transition"
                >
                  Modifier mes informations
                </button>
              </>
            )}
          </motion.div>
        )}

        {/* COMMANDES */}
        {activeTab === "commandes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-10 py-10 rounded-sm shadow-sm space-y-6"
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">
              Historique des commandes
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingBagIcon className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-600 text-lg">
                  Vous n'avez pas encore passé de commande.
                </p>
                <button
                  onClick={() => navigate("/collections")}
                  className="mt-8 px-8 py-3 font-semibold bg-stone-900 text-white rounded-sm hover:bg-amber-700 transition"
                >
                  Découvrir les collections
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order._id || order.id}
                    className="border border-stone-200 rounded-sm overflow-hidden hover:shadow-md transition"
                  >
                    {/* HEADER COMMANDE */}
                    <div className="bg-stone-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-sm text-stone-500">Commande</p>
                        <p className="font-semibold text-stone-900">
                          #{order.orderNumber || order._id?.slice(-8) || order.id}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-stone-500">Date</p>
                        <p className="font-medium text-stone-700">
                          {formatDate(order.createdAt || order.date)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-stone-500">Total</p>
                        <p className="font-semibold text-amber-700 text-lg">
                          {(order.total || 0).toFixed(2)} €
                        </p>
                      </div>

                      <span
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium
                          ${getStatusColor(order.status || order.statut)}
                        `}
                      >
                        {getStatusIcon(order.status || order.statut)}
                        {order.status || order.statut || "En cours"}
                      </span>
                    </div>

                    {/* PRODUITS */}
                    <div className="px-6 py-4">
                      <p className="text-sm font-medium text-stone-500 mb-3">Articles</p>
                      <div className="space-y-3">
                        {(order.items || order.produits || []).map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0"
                          >
                            <div className="flex items-center gap-4">
                              {(item.image || item.product?.image) && (
                                <img
                                  src={item.image || item.product?.image}
                                  alt={item.name || item.nom}
                                  className="w-12 h-12 object-cover rounded-sm bg-stone-100"
                                />
                              )}
                              <div>
                                <p className="font-medium text-stone-900">
                                  {item.name || item.nom || item.product?.name}
                                </p>
                                <p className="text-sm text-stone-500">
                                  Quantité: {item.quantity || item.quantite || 1}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-stone-700">
                              {((item.price || item.prix || 0) * (item.quantity || item.quantite || 1)).toFixed(2)} €
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ADRESSE LIVRAISON */}
                    {order.shippingAddress && (
                      <div className="px-6 py-4 bg-stone-50 border-t border-stone-200">
                        <p className="text-sm font-medium text-stone-500 mb-1">Adresse de livraison</p>
                        <p className="text-stone-700">
                          {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* FAVORIS */}
        {activeTab === "favoris" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-10 py-10 rounded-sm shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">
              Mes favoris
            </h2>

            {favorites.length === 0 ? (
              <div className="text-center">
                <p className="text-stone-600 text-lg">
                  Vous n'avez pas encore de favoris.
                </p>
                <p className="text-stone-500 mt-2">
                  Explorez nos collections et ajoutez vos articles préférés.
                </p>

                <button
                  onClick={() => navigate("/collections")}
                  className="mt-8 px-8 py-3 font-semibold bg-stone-900 text-white rounded-sm hover:bg-amber-700 transition"
                >
                  Voir les collections
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="border border-stone-200 rounded-sm p-4 hover:shadow-md transition"
                  >
                    {fav.image && (
                      <img
                        src={fav.image.startsWith("http") ? fav.image : `https://apianime.alwaysdata.net${fav.image}`}
                        alt={fav.nom}
                        className="w-full h-40 object-cover rounded-sm mb-4"
                      />
                    )}
                    <h3 className="font-semibold text-stone-900">{fav.nom}</h3>
                    <p className="text-amber-700 font-bold mt-2">
                      {fav.prix?.toFixed(2)} €
                    </p>
                    <button
                      onClick={() => handleRemoveFavorite(fav.id)}
                      className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
