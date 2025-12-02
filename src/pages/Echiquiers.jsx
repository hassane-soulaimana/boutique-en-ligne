// Page Echiquiers avec filtres par fourchettes + pagination
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Echiquiers() {
  const echiquiers = [
    { id: 1, nom: 'Échiquier Naruto Premium', prix: 149.99, image: '🎮', collection: 'naruto' },
    { id: 2, nom: 'Échiquier Studio Ghibli', prix: 179.99, image: '🌸', collection: 'ghibli' },
    { id: 3, nom: 'Échiquier Hunter x Hunter', prix: 159.99, image: '⚔️', collection: 'hxh' },
    { id: 4, nom: 'Échiquier Demon Slayer', prix: 169.99, image: '🔥', collection: 'demonslayer' },
    { id: 5, nom: 'Échiquier Naruto Classic', prix: 129.99, image: '🍥', collection: 'naruto' },
    { id: 6, nom: 'Échiquier Ghibli Totoro', prix: 199.99, image: '🌿', collection: 'ghibli' },
    { id: 7, nom: 'Échiquier HXH Kuroro', prix: 149.99, image: '🖤', collection: 'hxh' },
    { id: 8, nom: 'Échiquier Demon Slayer Zenitsu', prix: 159.99, image: '⚡', collection: 'demonslayer' },
  ];

  // ------------------------
  // STATE FILTRES
  // ------------------------
  const [collectionFiltre, setCollectionFiltre] = useState('');
  const [prixRange, setPrixRange] = useState('');
  const [tri, setTri] = useState('');

  // ------------------------
  // STATE PAGINATION
  // ------------------------
  const [page, setPage] = useState(1);
  const produitsParPage = 6;

  // ------------------------
  // FILTRAGE
  // ------------------------
  let produitsFiltres = echiquiers.filter((p) => {
    const okCollection = collectionFiltre ? p.collection === collectionFiltre : true;

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

    return okCollection && okPrix;
  });

  // ------------------------
  // TRI
  // ------------------------
  if (tri === 'asc') produitsFiltres = produitsFiltres.sort((a, b) => a.prix - b.prix);
  if (tri === 'desc') produitsFiltres = produitsFiltres.sort((a, b) => b.prix - a.prix);

  // ------------------------
  // PAGINATION
  // ------------------------
  const indexDebut = (page - 1) * produitsParPage;
  const produitsAffiches = produitsFiltres.slice(indexDebut, indexDebut + produitsParPage);
  const totalPages = Math.ceil(produitsFiltres.length / produitsParPage);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto flex gap-10">

        {/* ------------------------------ */}
        {/*   SIDEBAR FILTRES */}
        {/* ------------------------------ */}
        <aside className="w-64 bg-white shadow rounded-lg p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-4">Filtres</h2>

          {/* Collection */}
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Collection</label>
            <select
              onChange={(e) => setCollectionFiltre(e.target.value)}
              className="mt-2 w-full border rounded p-2"
            >
              <option value="">Toutes</option>
              <option value="naruto">Naruto</option>
              <option value="ghibli">Studio Ghibli</option>
              <option value="hxh">Hunter x Hunter</option>
              <option value="demonslayer">Demon Slayer</option>
            </select>
          </div>

          {/* Fourchette de prix */}
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
              setCollectionFiltre('');
              setPrixRange('');
              setTri('');
              setPage(1);
            }}
            className="w-full bg-gray-800 text-white font-bold py-2 rounded mt-2 hover:bg-gray-900"
          >
            Réinitialiser
          </button>
        </aside>

        {/* ------------------------------ */}
        {/*   CONTENU — CARDS */}
        {/* ------------------------------ */}
        <div className="flex-1">

          {/* Titre */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Échiquiers</h1>
            <p className="text-gray-600 text-lg">
              {produitsFiltres.length} résultat{produitsFiltres.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produitsAffiches.map((produit) => (
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

          {/* ------------------------------ */}
          {/* PAGINATION */}
          {/* ------------------------------ */}
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
  );
}
