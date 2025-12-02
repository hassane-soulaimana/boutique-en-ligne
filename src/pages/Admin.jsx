import { useState } from 'react';
import { animeApi } from '../services/animeApi';

export default function Admin() {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    image: '',
    collection: '',
    categorie: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const productData = {
        ...formData,
        prix: parseFloat(formData.prix)
      };

      await animeApi.createProduct(productData);
      setMessage({ type: 'success', text: '✅ Produit ajouté avec succès !' });
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        prix: '',
        image: '',
        collection: '',
        categorie: '',
        description: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: `❌ Erreur: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const addSampleProducts = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    const sampleProducts = [
      {
        nom: "Plateau One Piece",
        prix: 18.99,
        image: "🌊",
        collection: "One Piece",
        categorie: "echiquiers",
        description: "Magnifique plateau d'échecs One Piece avec des pièces personnalisées"
      },
      {
        nom: "Plateau Naruto",
        prix: 18.99,
        image: "🍜",
        collection: "Naruto",
        categorie: "echiquiers",
        description: "Plateau d'échecs Naruto avec les personnages emblématiques"
      },
      {
        nom: "Plateau Dragon Ball",
        prix: 18.99,
        image: "⭐",
        collection: "Dragon Ball",
        categorie: "echiquiers",
        description: "Plateau Dragon Ball avec Goku, Vegeta et les héros"
      },
      {
        nom: "Plateau Jujutsu Kaisen",
        prix: 18.99,
        image: "🔮",
        collection: "Jujutsu Kaisen",
        categorie: "echiquiers",
        description: "Collection Jujutsu Kaisen pour les fans d'anime"
      },
      {
        nom: "Roi – Naruto",
        prix: 29.99,
        image: "♔",
        collection: "Naruto",
        categorie: "pieces",
        description: "Pièce Roi Naruto - Version bois premium"
      },
      {
        nom: "Reine – Totoro",
        prix: 34.99,
        image: "♕",
        collection: "Studio Ghibli",
        categorie: "pieces",
        description: "Pièce Reine Totoro - Édition collector"
      },
      {
        nom: "Tour – Vegeta",
        prix: 24.99,
        image: "♖",
        collection: "Dragon Ball",
        categorie: "pieces",
        description: "Pièce Tour Vegeta - Sculpture détaillée"
      },
      {
        nom: "Fou – Goku",
        prix: 27.99,
        image: "♗",
        collection: "Dragon Ball",
        categorie: "pieces",
        description: "Pièce Fou Goku - Édition spéciale"
      }
    ];

    let count = 0;
    let errors = 0;
    for (const product of sampleProducts) {
      try {
        await animeApi.createProduct(product);
        count++;
        console.log(`✅ Produit "${product.nom}" ajouté avec succès`);
      } catch (error) {
        errors++;
        console.error(`❌ Erreur pour "${product.nom}":`, error.message);
      }
    }
    
    if (errors > 0) {
      setMessage({ 
        type: 'warning', 
        text: `⚠️ ${count} produit(s) ajouté(s), ${errors} erreur(s) rencontrée(s). Vérifiez la console pour plus de détails.` 
      });
    } else {
      setMessage({ type: 'success', text: `✅ ${count} produits ajoutés avec succès !` });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Administration des Produits
        </h1>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : message.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-xl">
                {message.type === 'success' ? '✅' : message.type === 'warning' ? '⚠️' : '❌'}
              </span>
              <p className="flex-1">{message.text}</p>
              <button 
                onClick={() => setMessage({ type: '', text: '' })}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Ajouter un produit</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom du produit</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: Plateau One Piece"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Prix (€)</label>
              <input
                type="number"
                step="0.01"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: 18.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image (URL ou emoji)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="https://... ou 🌊"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Collection</label>
              <input
                type="text"
                name="collection"
                value={formData.collection}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="One Piece, Naruto, Dragon Ball..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="echiquiers">Échiquiers</option>
                <option value="pieces">Pièces</option>
                <option value="accessoires">Accessoires</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Description détaillée du produit..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter le produit'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Actions rapides</h2>
          <p className="text-gray-600 mb-4">
            Ajouter 8 produits d'exemple pour tester le site rapidement
          </p>
          <button
            onClick={addSampleProducts}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Ajout en cours...' : 'Ajouter 8 produits d\'exemple'}
          </button>
        </div>
      </div>
    </div>
  );
}
