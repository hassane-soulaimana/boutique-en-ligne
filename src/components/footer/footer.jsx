export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-gray-700">

        {/* === COLLECTIONS === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Collections</h4>
          <ul className="space-y-2">
            <li>Naruto</li>
            <li>Studio Ghibli</li>
            <li>Hunter x Hunter</li>
            <li>Demon Slayer</li>
            <li>One Piece</li>
          </ul>
        </div>

        {/* === BOUTIQUE === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Boutique</h4>
          <ul className="space-y-2">
            <li>Échiquiers</li>
            <li>Pièces d'échecs</li>
            <li>Accessoires</li>
          </ul>
        </div>

        {/* === SUPPORT === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-2">
            <li>Contact</li>
            <li>Livraison</li>
            <li>Retours</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* === A PROPOS === */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">À propos</h4>
          <ul className="space-y-2">
            <li>Notre histoire</li>
            <li>Licences</li>
            <li>Artistes</li>
            <li>Carrières</li>
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
