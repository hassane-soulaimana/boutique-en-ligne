import { Link } from 'react-router-dom';

export default function Pieces() {
  const pieces = [
    { id: 1, nom: 'Pièces Naruto Premium', prix: 45.99, image: '♟️' },
    { id: 2, nom: 'Pièces Studio Ghibli', prix: 55.99, image: '✨' },
    { id: 3, nom: 'Pièces Hunter x Hunter', prix: 49.99, image: '⚔️' },
    { id: 4, nom: 'Pièces Demon Slayer', prix: 59.99, image: '🔥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">👑 Pièces d'Échecs</h1>
          <p className="text-gray-600 text-lg">
            {pieces.length} set{pieces.length > 1 ? 's' : ''} de pièces disponible{pieces.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pieces.map(produit => (
            <Link key={produit.id} to={`/produit/${produit.id}`} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-5xl">{produit.image}</div>
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
