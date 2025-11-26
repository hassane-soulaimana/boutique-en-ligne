import { Link } from 'react-router-dom';

export default function Accessoires() {
  const accessoires = [
    { id: 1, nom: 'Étui de rangement Naruto', prix: 29.99, image: '📦' },
    { id: 2, nom: 'Tapis de jeu Ghibli', prix: 39.99, image: '🖼️' },
    { id: 3, nom: 'Horloge d\'échecs', prix: 49.99, image: '⏰' },
    { id: 4, nom: 'Bloc-notes manga', prix: 19.99, image: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎒 Accessoires</h1>
          <p className="text-gray-600 text-lg">{accessoires.length} accessoire{accessoires.length > 1 ? 's' : ''} disponible{accessoires.length > 1 ? 's' : ''}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessoires.map(produit => (
            <Link key={produit.id} to={`/produit/${produit.id}`} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center text-5xl">{produit.image}</div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition">{produit.nom}</h3>
                <p className="text-2xl font-bold text-orange-600 mt-4">{produit.prix.toFixed(2)} €</p>
                <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition">Voir</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
