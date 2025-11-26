import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-6">😕</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-2">Page non trouvée</p>
        <p className="text-gray-600 text-lg mb-12">Désolé, la page que vous recherchez n'existe pas ou a été supprimée.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/')} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition">Accueil</button>
          <button onClick={() => navigate(-1)} className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-lg transition">Retour</button>
        </div>
        <div className="mt-16 pt-12 border-t border-gray-300">
          <p className="text-gray-600 mb-6">Explorez plutôt :</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/collections')} className="text-orange-600 hover:text-orange-700 font-semibold">Collections</button>
            <span className="text-gray-400">•</span>
            <button onClick={() => navigate('/echiquiers')} className="text-orange-600 hover:text-orange-700 font-semibold">Échiquiers</button>
            <span className="text-gray-400">•</span>
            <button onClick={() => navigate('/pieces')} className="text-orange-600 hover:text-orange-700 font-semibold">Pièces</button>
            <span className="text-gray-400">•</span>
            <button onClick={() => navigate('/accessoires')} className="text-orange-600 hover:text-orange-700 font-semibold">Accessoires</button>
          </div>
        </div>
      </div>
    </div>
  );
}
