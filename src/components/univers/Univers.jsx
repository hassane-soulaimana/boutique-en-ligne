import { Link } from "react-router-dom";

import NarutoImg from "../../assets/naruto.png";
import LuffyImg from "../../assets/onePiece.png";
import GokuImg from "../../assets/dragonBall.png";

export default function Univers() {
  return (
    <section className="w-full mt-20">

      {/* TITRE CENTRÉ */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <h2 className="text-5xl font-semibold text-gray-900">
          Nos univers
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Explorez les mondes qui inspirent nos collections.
        </p>
      </div>

      {/* ------------------------ NARUTO ------------------------ */}
      <div className="w-full bg-[#D7E8FF] py-10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8">

          {/* Texte */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Naruto
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Plongez dans l’univers de Konoha avec une collection exclusive façonnée pour les vrais fans.
            </p>

            <Link
              to="/collections/naruto"
              className="mt-5 inline-block bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Voir la collection →
            </Link>
          </div>

          {/* Image carrée compacte */}
          <div className="w-full aspect-square max-w-xs mx-auto bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src={NarutoImg}
              alt="Naruto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ------------------------ ONE PIECE ------------------------ */}
      <div className="w-full bg-[#FFF1C8] py-10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8">

          {/* Image */}
          <div className="w-full aspect-square max-w-xs mx-auto bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src={LuffyImg}
              alt="One Piece"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texte */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              One Piece
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Embarquez sur Grand Line avec des pièces d’échecs inédites et iconiques.
            </p>

            <Link
              to="/collections/onepiece"
              className="mt-5 inline-block bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Voir la collection →
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------ DRAGON BALL ------------------------ */}
      <div className="w-full bg-[#E4FFD1] py-10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8">

          {/* Texte */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Dragon Ball
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Une collection puissante inspirée de Goku, Vegeta et des guerriers Z.
            </p>

            <Link
              to="/collections/dragonball"
              className="mt-5 inline-block bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Voir la collection →
            </Link>
          </div>

          {/* Image */}
          <div className="w-full aspect-square max-w-xs mx-auto bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src={GokuImg}
              alt="Dragon Ball"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
