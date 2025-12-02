// Page qui affiche tous les univers manga disponibles
import { Link } from 'react-router-dom';

export default function Collections() {
  const univers = [
    { id: 'naruto', nom: 'Naruto', description: 'Collection exclusive Naruto avec designs authentiques', couleur: '#FF6B35' },
    { id: 'ghibli', nom: 'Studio Ghibli', description: 'Les plus beaux films du studio Ghibli', couleur: '#6B5B95' },
    { id: 'hxh', nom: 'Hunter x Hunter', description: 'L\'aventure et l\'action avec Hunter x Hunter', couleur: '#F8B500' },
    { id: 'demonslayer', nom: 'Demon Slayer', description: 'Les samouraïs et démons de Demon Slayer', couleur: '#D92E3D' },
    { id: 'onepiece', nom: 'One Piece', description: 'L\'univers pirate de One Piece', couleur: '#001F3F' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Collections par Univers
          </h1>
          <p className="text-gray-600 text-lg">
            Explorez nos {univers.length} univers manga et découvrez leurs produits exclusifs
          </p>
        </div>

        {/* Grille de collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* On boucle sur tous les univers */}
          {univers.map((univ) => (
            <Link 
              key={univ.id} 
              to={`/collections/${univ.id}`}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden group cursor-pointer"
            >
              {/* Image de l'univers */}
              <div 
                className="h-48 flex items-center justify-center text-6xl font-bold text-white transition group-hover:scale-105"
                style={{ backgroundColor: univ.couleur }}
              >
                {univ.nom.charAt(0)}
              </div>
              
              {/* Informations de l'univers */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-orange-600 transition">
                  {univ.nom}
                </h3>
                <p className="text-gray-600 text-sm">
                  {univ.description}
                </p>
                <div className="mt-4 pt-4 border-t">
                  <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    Voir la collection →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
