import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";

export default function NewProducts() {
  const sliderRef = useRef(null);

  const scroll = (distance) => {
    sliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const products = [
    { id: 1, title: "Plateau One Piece", price: "18.99€" },
    { id: 2, title: "Plateau Naruto", price: "18.99€" },
    { id: 3, title: "Plateau Dragon Ball", price: "18.99€" },
    { id: 4, title: "Plateau Jujutsu Kaisen", price: "18.99€" },
    { id: 5, title: "Plateau One Piece", price: "18.99€" },
    { id: 6, title: "Plateau Naruto", price: "18.99€" },
    { id: 7, title: "Plateau Dragon Ball", price: "18.99€" },
    { id: 8, title: "Plateau Jujutsu Kaisen", price: "18.99€" },
  ];

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
            <FiChevronLeft size={22} />
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar w-full"
          >
            {products.map((p) => (
              <Link
                key={p.id}
                to="/collections"
                className="
                  min-w-[260px] max-w-[260px]
                  bg-white rounded-2xl shadow-md hover:shadow-xl
                  transition
                "
              >
                {/* IMAGE */}
                <div className="w-full aspect-square bg-gray-200 rounded-t-2xl relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    Image à venir
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-lg mb-1">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{p.price}</p>

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

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(300)}
            className="hidden md:flex p-3 rounded-full bg-white shadow-md border hover:bg-gray-100 transition z-10"
          >
            <FiChevronRight size={22} />
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
