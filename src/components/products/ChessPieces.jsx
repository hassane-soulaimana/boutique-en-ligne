import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ChessPieces() {
  const sliderRef = useRef(null);

  const scroll = (distance) => {
    sliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const pieces = [
    { id: 1, title: "Roi – Naruto", desc: "Version bois premium", img: null },
    { id: 2, title: "Reine – Totoro", desc: "Pièce collector", img: null },
    { id: 3, title: "Tour – Vegeta", desc: "Sculpture détaillée", img: null },
    { id: 4, title: "Fou – Goku", desc: "Édition spéciale", img: null },
  ];

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
            <FiChevronLeft size={22} />
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
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    Image à venir
                  </div>
                </div>

                {/* TEXT */}
                <div className="p-5 flex flex-col justify-center md:w-1/2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{p.desc}</p>

                  <Link
                    to="/collections"
                    className="
                      mt-4 inline-block px-4 py-2 rounded-full 
                      bg-black text-white text-sm font-medium
                      hover:bg-neutral-800 transition
                      w-fit
                    "
                  >
                    Voir la pièce
                  </Link>
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
            <FiChevronRight size={22} />
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
