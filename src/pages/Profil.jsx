import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { animeApi } from "../services/animeApi";

export default function Profil() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("infos");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await animeApi.getMe();
      setUser(userData);
    } catch (error) {
      console.error("❌ Erreur chargement profil:", error);
      // Si non connecté, rediriger vers connexion
      navigate("/connexion");
    } finally {
      setLoading(false);
    }
  };

  const orders = [
    {
      id: "CMD001",
      date: "2025-11-20",
      statut: "Livré",
      total: 250.0,
      produits: [
        { nom: "Échiquier Naruto", quantite: 1, prix: 150.0 },
        { nom: "Pièces Studio Ghibli", quantite: 1, prix: 100.0 },
      ],
    },
    {
      id: "CMD002",
      date: "2025-11-25",
      statut: "En cours",
      total: 75.5,
      produits: [{ nom: "Accessoires échecs manga", quantite: 2, prix: 37.75 }],
    },
  ];

  const handleLogout = () => {
    animeApi.logout();
    navigate("/connexion");
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

        {/* COMMANDES — VERSION CENTRÉE + OPTIMISÉE */}
        {activeTab === "commandes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-10 py-10 rounded-sm shadow-sm space-y-6"
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-6 text-center">
              Historique des commandes
            </h2>

            {orders.map((order) => (
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
                  {order.produits.map((p, i) => (
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
            ))}
          </motion.div>
        )}

        {/* FAVORIS */}
        {activeTab === "favoris" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white px-10 py-10 rounded-sm shadow-sm text-center"
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">
              Mes favoris
            </h2>

            <p className="text-stone-600 text-lg">
              Vous n’avez pas encore de favoris.
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
          </motion.div>
        )}
      </div>
    </main>
  );
}
