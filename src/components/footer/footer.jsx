import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-gray-700">

        {/* === COLLECTIONS === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Collections</h4>
          <ul className="space-y-2">
            <li><Link to="/collections/naruto" className="hover:text-orange-600 transition">Naruto</Link></li>
            <li><Link to="/collections/ghibli" className="hover:text-orange-600 transition">Studio Ghibli</Link></li>
            <li><Link to="/collections/hxh" className="hover:text-orange-600 transition">Hunter x Hunter</Link></li>
            <li><Link to="/collections/demonslayer" className="hover:text-orange-600 transition">Demon Slayer</Link></li>
            <li><Link to="/collections/onepiece" className="hover:text-orange-600 transition">One Piece</Link></li>
          </ul>
        </div>

        {/* === BOUTIQUE === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Boutique</h4>
          <ul className="space-y-2">
            <li><Link to="/echiquiers" className="hover:text-orange-600 transition">Échiquiers</Link></li>
            <li><Link to="/pieces" className="hover:text-orange-600 transition">Pièces d'échecs</Link></li>
            <li><Link to="/accessoires" className="hover:text-orange-600 transition">Accessoires</Link></li>
          </ul>
        </div>

        {/* === SUPPORT === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-orange-600 transition">Contact</Link></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition">Livraison</span></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition">Retours</span></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition">FAQ</span></li>
          </ul>
        </div>

        {/* === À PROPOS === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">À propos</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-orange-600 transition">Notre histoire</Link></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition">Licences</span></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition">Artistes</span></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition">Carrières</span></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t py-6 text-center text-sm text-gray-500">
        © 2025 Saniha. Tous droits réservés.
      </div>
    </footer>
  );
}
