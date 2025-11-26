import { useParams, useNavigate } from 'react-router-dom';

export default function CollectionDetail() {
  const { univers: universId } = useParams();
  const navigate = useNavigate();
  const collections = {
    naruto: { nom: 'Naruto', description: 'Collection exclusive Naruto', couleur: '#FF6B35' },
    ghibli: { nom: 'Studio Ghibli', description: 'Films Studio Ghibli', couleur: '#6B5B95' },
    hxh: { nom: 'Hunter x Hunter', description: 'Collection Hunter x Hunter', couleur: '#F8B500' },
    demonslayer: { nom: 'Demon Slayer', description: 'Collection Demon Slayer', couleur: '#D92E3D' },
    onepiece: { nom: 'One Piece', description: 'Collection One Piece', couleur: '#001F3F' },
  };
  const currentUnivers = collections[universId] || { nom: 'Inconnu', description: '', couleur: '#999' };
  const produits = [
    { id: 1, nom: `Échiquier ${currentUnivers.nom}`, prix: 149.99, image: '♟️' },
    { id: 2, nom: `Pièces ${currentUnivers.nom}`, prix: 79.99, image: '🎯' },
    { id: 3, nom: `Accessoires ${currentUnivers.nom}`, prix: 39.99, image: '🎁' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate('/collections')} className="mb-6 text-orange-600 hover:text-orange-700 font-semibold">← Retour aux collections</button>
        <div className="mb-12 pb-8 border-b-4" style={{ borderColor: currentUnivers.couleur }}>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Collection {currentUnivers.nom}</h1>
          <p className="text-gray-600 text-lg">{currentUnivers.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map(produit => (
            <div key={produit.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group cursor-pointer" onClick={() => navigate(`/produit/${produit.id}`)}>
              <div className="h-64 flex items-center justify-center text-6xl" style={{ backgroundColor: currentUnivers.couleur + '20' }}>{produit.image}</div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition">{produit.nom}</h3>
                <p className="text-2xl font-bold text-orange-600 mt-4">{produit.prix.toFixed(2)} €</p>
                <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition">Ajouter au panier</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
