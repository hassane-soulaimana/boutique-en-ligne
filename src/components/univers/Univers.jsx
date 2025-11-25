import { Link } from "react-router-dom";

import NarutoImg from "../../assets/naruto.png";
import LuffyImg from "../../assets/onepiece.png";
import GokuImg from "../../assets/dragonball.png";

export default function Univers() {
  return (
    <section className="w-full mt-20">

      {/* TITRE */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-5xl font-semibold text-gray-900">Nos univers</h2>
        <p className="text-gray-600 mt-2 text-base">
          Plongez dans les mondes légendaires qui inspirent nos collections d’échecs.
        </p>
      </div>

      {/* ------------------------ NARUTO ------------------------ */}
      <div className="w-full bg-gradient-to-br from-[#FFE3C8] to-[#FFB77A] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">

          {/* TEXTE */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Naruto</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              L’univers ninja prend vie dans une collection façonnée pour les passionnés.
              Chaque pièce rend hommage aux symboles iconiques du monde de Konoha,
              sculptée avec précision pour capturer la force et l’énergie des héros.
            </p>

            <Link
              to="/collections/naruto"
              className="mt-6 inline-block bg-orange-500 text-white text-sm px-6 py-2 rounded-full hover:bg-orange-600 transition shadow"
            >
              Voir la collection →
            </Link>
          </div>

          {/* IMAGE */}
          <div className="w-full aspect-square max-w-xs mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <img src={NarutoImg} alt="Naruto" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>

      {/* ------------------------ ONE PIECE ------------------------ */}
      <div className="w-full bg-gradient-to-br from-[#E0F5FF] to-[#C0D6FF] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">

          {/* IMAGE */}
          <div className="w-full aspect-square max-w-xs mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <img src={LuffyImg} alt="One Piece" className="w-full h-full object-cover" />
          </div>

          {/* TEXTE */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">One Piece</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Embarquez pour Grand Line à travers une collection inspirée du voyage de Luffy.
              Des pièces pleines de caractère, une esthétique marine et un vrai hommage
              à l’esprit pirate.
            </p>

            <Link
              to="/collections/onepiece"
              className="mt-6 inline-block bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition shadow"
            >
              Voir la collection →
            </Link>
          </div>

        </div>
      </div>

      {/* ------------------------ DRAGON BALL ------------------------ */}
      <div className="w-full bg-gradient-to-br from-[#FFE4B8] to-[#FFD699] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">

          {/* TEXTE */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">Dragon Ball</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Une collection explosive inspirée de l’univers des guerriers Z.
              Couleurs énergiques, design puissant et sculptures iconiques qui capturent
              toute la puissance de Dragon Ball.
            </p>

            <Link
              to="/collections/dragonball"
              className="mt-6 inline-block bg-yellow-500 text-white text-sm px-6 py-2 rounded-full hover:bg-yellow-600 transition shadow"
            >
              Voir la collection →
            </Link>
          </div>

          {/* IMAGE */}
          <div className="w-full aspect-square max-w-xs mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <img src={GokuImg} alt="Dragon Ball" className="w-full h-full object-cover" />
          </div>

        </div>
      </div>

    </section>
  );
}
