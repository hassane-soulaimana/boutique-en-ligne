import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../context/CartContext";

export default function NewProducts() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const scroll = (distance) => {
    sliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const products = [
    { id: 1, nom: "Plateau One Piece", prix: 18.99, image: "♟️", collection: "One Piece" },
    { id: 2, nom: "Plateau Naruto", prix: 18.99, image: "♜", collection: "Naruto" },
    { id: 3, nom: "Plateau Dragon Ball", prix: 18.99, image: "♚", collection: "Dragon Ball" },
    { id: 4, nom: "Plateau Jujutsu Kaisen", prix: 18.99, image: "♛", collection: "Jujutsu Kaisen" },
    { id: 5, nom: "Plateau One Piece", prix: 18.99, image: "♝", collection: "One Piece" },
    { id: 6, nom: "Plateau Naruto", prix: 18.99, image: "♞", collection: "Naruto" },
    { id: 7, nom: "Plateau Dragon Ball", prix: 18.99, image: "♔", collection: "Dragon Ball" },
    { id: 8, nom: "Plateau Jujutsu Kaisen", prix: 18.99, image: "♕", collection: "Jujutsu Kaisen" },
  ];

  const handleAddToCart = (product) => {
    addItem(product);
    alert(`${product.nom} ajouté au panier !`);
  };

  return (
    <section className="w-full py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900">Nouveautés</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Découvrez nos dernières créations exclusives
          </p>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative flex items-center gap-4">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll(-300)}
            className="hidden md:flex p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition z-10"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar w-full"
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="
                  min-w-[260px] max-w-[260px]
                  bg-white rounded-2xl shadow-md hover:shadow-xl
                  transition
                "
              >
                {/* IMAGE */}
                <div className="w-full aspect-square bg-gray-200 rounded-t-2xl relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    {p.image}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-lg mb-1">
                    {p.nom}
                  </h3>
                  <p className="text-gray-500 text-sm">{p.prix.toFixed(2)}€</p>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="
                      mt-4 w-full py-2 rounded-xl border border-gray-300
                      flex items-center justify-center gap-2
                      text-gray-700 font-medium
                      hover:bg-black hover:text-white hover:border-black
                      transition
                    "
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(300)}
            className="hidden md:flex p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition z-10"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

        </div>

        {/* SEE MORE BUTTON */}
        <div className="text-center mt-12">
          <Link
            to="/collections"
            className="
              inline-block bg-black text-white px-8 py-3 rounded-full 
              font-semibold hover:bg-neutral-800 transition
            "
          >
            Découvrez toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
