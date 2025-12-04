import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { animeApi } from "../services/animeApi";

const API_URL = "https://apianime.alwaysdata.net";

const getOrders = async (token) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur chargement commandes");
  return res.json();
};

const getFavorites = async (token) => {
  const res = await fetch(`${API_URL}/api/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur chargement favoris");
  return res.json();
};

const removeFavorite = async (token, productId) => {
  const res = await fetch(`${API_URL}/api/favorites/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur suppression favori");
  return res.json();
};

export default function Profil() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("infos");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const loadUserProfile = async (authToken) => {
    try {
      const userData = await animeApi.getMe();
      setUser(userData);

      // Charger les commandes
      try {
        const ordersData = await getOrders(authToken);
        setOrders(ordersData.data || []);
      } catch (err) {
        console.error("❌ Erreur commandes:", err);
      }

      // Charger les favoris
      try {
        const favData = await getFavorites(authToken);
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
    setToken(authToken);
    loadUserProfile(authToken);
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
      await removeFavorite(token, productId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
    } catch (error) {
      console.error("❌ Erreur suppression favori:", error);
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

            <button className="mt-10 px-8 py-3 font-semibold bg-stone-900 text-white rounded-sm hover:bg-amber-700 transition">
              Modifier mes informations
            </button>
          </motion.div>
        )}

        {/* COMMANDES */}
        {activeTab === "commandes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-10 py-10 rounded-sm shadow-sm space-y-6"
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-6 text-center">
              Historique des commandes
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-10">
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
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-stone-200 rounded-sm p-6 hover:shadow-md transition"
                >
                  {/* HEADER COMMANDE */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center w-full">
                      <h3 className="font-semibold text-lg text-stone-900">
                        Commande {order.id}
                      </h3>
                      <p className="text-stone-600 text-sm">
                        {new Date(order.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>

                    <span
                      className={`
                        px-5 py-1 rounded-full text-white text-sm font-medium whitespace-nowrap
                        ${
                          order.statut === "Livré"
                            ? "bg-green-600"
                            : "bg-amber-600"
                        }
                      `}
                    >
                      {order.statut}
                    </span>
                  </div>

                  {/* PRODUITS CENTRÉS */}
                  <div className="border-t border-b py-4 space-y-3">
                    {order.produits?.map((p, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 text-stone-700 text-center"
                      >
                        <span>
                          {p.nom} x{p.quantite}
                        </span>
                        <span className="font-semibold">
                          {p.prix.toFixed(2)} €
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL CENTRÉ */}
                  <div className="text-center mt-6 text-lg font-semibold">
                    Total :{" "}
                    <span className="text-amber-700">
                      {order.total.toFixed(2)} €
                    </span>
                  </div>
                </div>
              ))
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
                        src={fav.image}
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
