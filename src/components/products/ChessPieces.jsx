import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../context/CartContext";

export default function ChessPieces() {
  const sliderRef = useRef(null);
  const { addItem } = useCart();

  const scroll = (distance) => {
    sliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const pieces = [
    { id: 101, nom: "Roi – Naruto", prix: 29.99, collection: "Naruto", desc: "Version bois premium", image: "♔" },
    { id: 102, nom: "Reine – Totoro", prix: 34.99, collection: "Studio Ghibli", desc: "Pièce collector", image: "♕" },
    { id: 103, nom: "Tour – Vegeta", prix: 24.99, collection: "Dragon Ball", desc: "Sculpture détaillée", image: "♖" },
    { id: 104, nom: "Fou – Goku", prix: 27.99, collection: "Dragon Ball", desc: "Édition spéciale", image: "♗" },
  ];

  const handleAddToCart = (piece) => {
    addItem(piece);
    alert(`${piece.nom} ajouté au panier !`);
  };

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900">
            Nos pièces d’échecs
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Sculptées avec précision, pensées pour les fans
          </p>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative flex items-center gap-4">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll(-350)}
            className="
              hidden md:flex p-3 rounded-full bg-white shadow-md border 
              hover:bg-gray-100 transition z-10
            "
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar w-full"
          >
            {pieces.map((p) => (
              <div
                key={p.id}
                className="
                  min-w-[400px] max-w-[400px]
                  bg-white rounded-2xl shadow-md hover:shadow-xl transition
                  flex flex-col md:flex-row overflow-hidden
                "
              >
                {/* IMAGE RECTANGLE */}
                <div className="w-full md:w-1/2 h-[180px] bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {p.image}
                  </div>
                </div>

                {/* TEXT */}
                <div className="p-5 flex flex-col justify-center md:w-1/2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.nom}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
                  <p className="text-black font-bold mt-2">{p.prix.toFixed(2)}€</p>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="
                      mt-4 inline-block px-4 py-2 rounded-full 
                      bg-black text-white text-sm font-medium
                      hover:bg-neutral-800 transition
                      w-fit
                    "
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(350)}
            className="
              hidden md:flex p-3 rounded-full bg-white shadow-md border 
              hover:bg-gray-100 transition z-10
            "
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

        </div>

        {/* CTA TEXT */}
        <p className="text-center mt-12 text-gray-600 text-sm">
          Plus de 50 pièces sculptées à découvrir
        </p>

        {/* CTA BUTTON */}
        <div className="text-center mt-4">
          <Link
            to="/collections"
            className="
              inline-block bg-black text-white px-8 py-3 rounded-full 
              font-semibold hover:bg-neutral-800 transition
            "
          >
            Explorer toutes nos pièces d’échecs
          </Link>
        </div>

      </div>
    </section>
  );
}
