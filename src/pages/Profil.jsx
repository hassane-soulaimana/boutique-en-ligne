// Page de profil utilisateur avec onglets
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('infos');
  const [user, setUser] = useState({
    prenom: 'Naruto',
    nom: 'Uzumaki',
    email: 'naruto@example.com',
    telephone: '06 12 34 56 78',
    adresse: '12 rue de Konoha',
    ville: 'Paris',
    codePostal: '75001'
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/connexion');
  };

  const orders = [
    {
      id: 'CMD001',
      date: '2025-11-20',
      statut: 'Livré',
      total: 250.00,
      produits: [
        { nom: 'Échiquier Naruto', quantite: 1, prix: 150.00 },
        { nom: 'Pièces d\'échecs Studio Ghibli', quantite: 1, prix: 100.00 }
      ]
    },
    {
      id: 'CMD002',
      date: '2025-11-25',
      statut: 'En cours',
      total: 75.50,
      produits: [
        { nom: 'Accessoires échecs manga', quantite: 2, prix: 37.75 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Bonjour {user.prenom} ! 👋
            </h1>
            <p className="text-gray-600 mt-2">Gérez votre profil et vos commandes</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Se déconnecter
          </button>
        </div>

        {/* Onglets */}
        <div className="flex border-b-2 border-gray-300 mb-8 gap-4">
          <button
            onClick={() => setActiveTab('infos')}
            className={`pb-4 px-6 font-semibold transition ${
              activeTab === 'infos'
                ? 'text-orange-600 border-b-4 border-orange-600 -mb-2'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Mes informations
          </button>
          <button
            onClick={() => setActiveTab('commandes')}
            className={`pb-4 px-6 font-semibold transition ${
              activeTab === 'commandes'
                ? 'text-orange-600 border-b-4 border-orange-600 -mb-2'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Mes commandes
          </button>
          <button
            onClick={() => setActiveTab('favoris')}
            className={`pb-4 px-6 font-semibold transition ${
              activeTab === 'favoris'
                ? 'text-orange-600 border-b-4 border-orange-600 -mb-2'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Mes favoris
          </button>
        </div>

        {/* ONGLET INFOS */}
        {activeTab === 'infos' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations personnelles</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <strong className="text-gray-700">Nom :</strong>
                <span className="text-gray-600">{user.nom}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <strong className="text-gray-700">Prénom :</strong>
                <span className="text-gray-600">{user.prenom}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <strong className="text-gray-700">Email :</strong>
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <strong className="text-gray-700">Téléphone :</strong>
                <span className="text-gray-600">{user.telephone}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <strong className="text-gray-700">Adresse :</strong>
                <span className="text-gray-600">{user.adresse}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <strong className="text-gray-700">Ville :</strong>
                <span className="text-gray-600">{user.ville}</span>
              </div>
              <div className="flex justify-between pb-3">
                <strong className="text-gray-700">Code postal :</strong>
                <span className="text-gray-600">{user.codePostal}</span>
              </div>
            </div>

            <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition">
              Modifier mes informations
            </button>
          </div>
        )}

        {/* ONGLET COMMANDES */}
        {activeTab === 'commandes' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Historique des commandes</h2>
            
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Commande {order.id}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-semibold text-white text-sm ${
                      order.statut === 'Livré' ? 'bg-green-600' : 'bg-orange-600'
                    }`}>
                      {order.statut}
                    </span>
                  </div>

                  <div className="mb-4 border-t border-b py-3 space-y-2">
                    {order.produits.map((produit, index) => (
                      <div key={index} className="flex justify-between text-gray-700">
                        <span>{produit.nom} x{produit.quantite}</span>
                        <span className="font-semibold">{produit.prix.toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end text-lg font-bold">
                    Total : <span className="text-orange-600 ml-2">{order.total.toFixed(2)} €</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ONGLET FAVORIS */}
        {activeTab === 'favoris' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes produits favoris</h2>
            
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Vous n'avez pas encore de favoris. 
              </p>
              <p className="text-gray-500 mt-2">
                Explorez nos collections et ajoutez vos produits préférés !
              </p>
              <button
                onClick={() => navigate('/collections')}
                className="mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Voir les collections
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
