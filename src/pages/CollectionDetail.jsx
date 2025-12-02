import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CollectionDetail() {
  const { univers: universId } = useParams();
  const navigate = useNavigate();

  // ------------------------
  // COLLECTIONS
  // ------------------------
  const collections = {
    naruto: { nom: 'Naruto', description: 'Collection exclusive Naruto', couleur: '#FF6B35' },
    ghibli: { nom: 'Studio Ghibli', description: 'Films Studio Ghibli', couleur: '#6B5B95' },
    hxh: { nom: 'Hunter x Hunter', description: 'Collection Hunter x Hunter', couleur: '#F8B500' },
    demonslayer: { nom: 'Demon Slayer', description: 'Collection Demon Slayer', couleur: '#D92E3D' },
    onepiece: { nom: 'One Piece', description: 'Collection One Piece', couleur: '#001F3F' },
  };

  const currentUnivers = collections[universId] || { nom: 'Inconnu', description: '', couleur: '#999' };

  // ------------------------
  // PRODUITS ASSOCIÉS (mock)
  // ------------------------
  const produits = [
    { id: 1, type: "echiquier", nom: `Échiquier ${currentUnivers.nom}`, prix: 149.99, image: '♟️' },
    { id: 2, type: "pieces", nom: `Pièces ${currentUnivers.nom}`, prix: 79.99, image: '🎯' },
    { id: 3, type: "accessoires", nom: `Accessoires ${currentUnivers.nom}`, prix: 39.99, image: '🎁' },
    { id: 4, type: "echiquier", nom: `Échiquier Deluxe ${currentUnivers.nom}`, prix: 199.99, image: '🏆' },
    { id: 5, type: "pieces", nom: `Pièces Collector ${currentUnivers.nom}`, prix: 99.99, image: '💠' },
    { id: 6, type: "accessoires", nom: `Set d'entretien ${currentUnivers.nom}`, prix: 29.99, image: '🧽' },
  ];

  // ------------------------
  // STATES FILTRES
  // ------------------------
  const [typeFiltre, setTypeFiltre] = useState('');
  const [prixRange, setPrixRange] = useState('');
  const [tri, setTri] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const produitsParPage = 6;

  // ------------------------
  // FILTRAGE
  // ------------------------
  let produitsFiltres = produits.filter((p) => {
    const okType = typeFiltre ? p.type === typeFiltre : true;

    let okPrix = true;
    switch (prixRange) {
      case "0-50":
        okPrix = p.prix >= 0 && p.prix <= 50;
        break;
      case "50-100":
        okPrix = p.prix >= 50 && p.prix <= 100;
        break;
      case "100-200":
        okPrix = p.prix >= 100 && p.prix <= 200;
        break;
      case "0-500":
        okPrix = p.prix <= 500;
        break;
      default:
        okPrix = true;
    }

    return okType && okPrix;
  });

  // ------------------------
  // TRI
  // ------------------------
  if (tri === 'asc') produitsFiltres.sort((a, b) => a.prix - b.prix);
  if (tri === 'desc') produitsFiltres.sort((a, b) => b.prix - a.prix);

  // ------------------------
  // PAGINATION
  // ------------------------
  const indexDebut = (page - 1) * produitsParPage;
  const produitsAffiches = produitsFiltres.slice(indexDebut, indexDebut + produitsParPage);
  const totalPages = Math.ceil(produitsFiltres.length / produitsParPage);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 BOUTON RETOUR — AU-DESSUS, HORS SIDEBAR */}
        <button
          onClick={() => navigate('/collections')}
          className="mb-6 text-orange-600 hover:text-orange-700 font-semibold"
        >
          ← Retour aux collections
        </button>

        <div className="flex gap-10">

          {/* ------------------------------ */}
          {/*   SIDEBAR FILTRES */}
          {/* ------------------------------ */}
          <aside className="w-64 bg-white shadow rounded-lg p-6 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4">Filtres</h2>

            {/* Type */}
            <div className="mb-4">
              <label className="font-semibold text-gray-700">Type de produit</label>
              <select
                onChange={(e) => setTypeFiltre(e.target.value)}
                className="mt-2 w-full border rounded p-2"
              >
                <option value="">Tous</option>
                <option value="echiquier">Échiquiers</option>
                <option value="pieces">Pièces</option>
                <option value="accessoires">Accessoires</option>
              </select>
            </div>

            {/* Prix */}
            <div className="mb-4">
              <label className="font-semibold text-gray-700">Prix</label>
              <select
                onChange={(e) => setPrixRange(e.target.value)}
                className="mt-2 w-full border rounded p-2"
              >
                <option value="">Tous les prix</option>
                <option value="0-50">0 à 50 €</option>
                <option value="50-100">50 à 100 €</option>
                <option value="100-200">100 à 200 €</option>
                <option value="0-500">Jusqu'à 500 €</option>
              </select>
            </div>

            {/* Tri */}
            <div className="mb-6">
              <label className="font-semibold text-gray-700">Trier par</label>
              <select
                onChange={(e) => setTri(e.target.value)}
                className="mt-2 w-full border rounded p-2"
              >
                <option value="">Aucun</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setTypeFiltre('');
                setPrixRange('');
                setTri('');
                setPage(1);
              }}
              className="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-900"
            >
              Réinitialiser
            </button>
          </aside>

          {/* ------------------------------ */}
          {/*   CONTENU PRINCIPAL */}
          {/* ------------------------------ */}
          <div className="flex-1">

            {/* HEADER DE LA COLLECTION */}
            <div
              className="mb-12 pb-8 border-b-4"
              style={{ borderColor: currentUnivers.couleur }}
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Collection {currentUnivers.nom}
              </h1>
              <p className="text-gray-600 text-lg">{currentUnivers.description}</p>
            </div>

            {/* GRID PRODUITS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produitsAffiches.map((produit) => (
                <div
                  key={produit.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/produit/${produit.id}`)}
                >
                  <div
                    className="h-64 flex items-center justify-center text-6xl"
                    style={{ backgroundColor: currentUnivers.couleur + '20' }}
                  >
                    {produit.image}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition">
                      {produit.nom}
                    </h3>
                    <p className="text-2xl font-bold text-orange-600 mt-4">
                      {produit.prix.toFixed(2)} €
                    </p>
                    <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded transition">
                      Voir le détail
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Précédent
              </button>

              <span className="font-semibold">
                Page {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Suivant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
