import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function NewProducts() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TITRE SECTION */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-gray-900">
            Nouveautés
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Découvrez nos dernières créations exclusives
          </p>
        </div>

        {/* GRID PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {[1, 2, 3, 4].map((n) => (
            <Link
              to="/collections"
              key={n}
              className="
                group block bg-white rounded-2xl shadow-md hover:shadow-xl 
                transition overflow-hidden
              "
            >

              {/* IMAGE PRODUIT */}
              <div className="w-full aspect-square bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  Image à venir
                </div>
              </div>

              {/* CONTENU TEXTE */}
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-lg mb-1">
                  {
                    n === 1 ? "Plateau One Piece" :
                    n === 2 ? "Plateau Naruto" :
                    n === 3 ? "Plateau Dragon Ball" :
                    "Plateau Jujutsu Kaisen"
                  }
                </h3>

                <p className="text-gray-500 text-sm">18.99€</p>

                {/* Icone panier */}
                <button
                  className="
                    mt-4 w-full py-2 rounded-xl border border-gray-300 
                    flex items-center justify-center gap-2
                    text-gray-700 font-medium
                    hover:bg-black hover:text-white hover:border-black
                    transition
                  "
                >
                  <FiShoppingCart size={18} />
                  Ajouter au panier
                </button>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
