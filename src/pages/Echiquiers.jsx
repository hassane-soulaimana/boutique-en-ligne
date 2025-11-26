// Page qui affiche les échiquiers
import { Link } from 'react-router-dom';

export default function Echiquiers() {
  const echiquiers = [
    { id: 1, nom: 'Échiquier Naruto Premium', prix: 149.99, image: '🎮', collection: 'naruto' },
    { id: 2, nom: 'Échiquier Studio Ghibli', prix: 179.99, image: '🌸', collection: 'ghibli' },
    { id: 3, nom: 'Échiquier Hunter x Hunter', prix: 159.99, image: '⚔️', collection: 'hxh' },
    { id: 4, nom: 'Échiquier Demon Slayer', prix: 169.99, image: '🔥', collection: 'demonslayer' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ♟️ Échiquiers
          </h1>
          <p className="text-gray-600 text-lg">
            {echiquiers.length} échiquier{echiquiers.length > 1 ? 's' : ''} disponible{echiquiers.length > 1 ? 's' : ''} avec des designs exclusifs manga
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {echiquiers.map(produit => (
            <Link
              key={produit.id}
              to={`/produit/${produit.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
            >
              <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-6xl">
                {produit.image}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition">
                  {produit.nom}
                </h3>
                <p className="text-sm text-gray-500 mt-2">Collection {produit.collection}</p>
                <p className="text-2xl font-bold text-orange-600 mt-4">
                  {produit.prix.toFixed(2)} €
                </p>
                <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition">
                  Voir le détail
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
