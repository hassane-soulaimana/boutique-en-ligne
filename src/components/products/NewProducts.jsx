import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function NewProducts() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Titre */}
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
          Nouveautés
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Découvrez nos dernières créations
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12">

          {/* Placeholder produits (4 produits fictifs pour la maquette) */}
          {/* Les vraies images arriveront du backend */}
          {[1, 2, 3, 4].map((n) => (
            <Link 
              to="/collections" 
              key={n}
              className="group flex flex-col text-left cursor-pointer"
            >
              {/* IMAGE */}
              <div className="w-full h-48 bg-gray-200 rounded-xl shadow-sm overflow-hidden relative group-hover:shadow-md transition">
                {/* Ici le backend insérera l'image réelle */}
                {/* <img src={product.image} alt={product.title} ... /> */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  Image à venir
                </div>
              </div>

              {/* INFO PRODUIT */}
              <h3 className="text-gray-900 font-medium mt-3 group-hover:text-black transition">
                Plateau {n === 1 ? "One Piece" : n === 2 ? "Naruto" : n === 3 ? "Dragon Ball" : "Jujutsu Kaisen"}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                18.99€
              </p>

              {/* Icone panier */}
              <button 
                className="
                  mt-3 w-10 h-10 flex items-center justify-center 
                  rounded-full border border-gray-300 
                  text-gray-700 hover:bg-black hover:text-white hover:border-black 
                  transition
                "
              >
                <FiShoppingCart size={18} />
              </button>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
