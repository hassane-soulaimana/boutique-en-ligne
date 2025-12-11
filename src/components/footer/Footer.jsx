            <li><Link to="/confidentialite" className="hover:text-orange-600 transition">Confidentialité</Link></li>
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-gray-700">

        {/* === COLLECTIONS === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Collections</h4>
          <ul className="space-y-2">
            <li><Link to="/collections/naruto" className="hover:text-orange-600 transition">Naruto</Link></li>
            <li><Link to="/collections/ghibli" className="hover:text-orange-600 transition">Studio Ghibli</Link></li>
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

        {/* === SERVICE CLIENT === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Service client</h4>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-orange-600 transition">Contact</Link></li>
            <li><Link to="/livraison" className="hover:text-orange-600 transition">Livraison</Link></li>
            <li><Link to="/retours" className="hover:text-orange-600 transition">Retours</Link></li>
          </ul>
        </div>

        {/* === À PROPOS === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">À propos</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-orange-600 transition">Notre histoire</Link></li>
            <li><Link to="/cgv" className="hover:text-orange-600 transition">CGV</Link></li>
            <li><Link to="/cgu" className="hover:text-orange-600 transition">CGU</Link></li>
            <li><Link to="/confidentialite" className="hover:text-orange-600 transition">Confidentialité</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-orange-600 transition">Mentions légales</Link></li>
            {/* Liens supprimés car non présents */}
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
