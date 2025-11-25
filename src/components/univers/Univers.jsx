import { Link } from "react-router-dom";

export default function Univers() {
  return (
    <section className="w-full pt-12 pb-12"> 

    
<div className="w-full my-10 flex flex-col items-center text-center"> 
  

  <div className="h-px w-24 bg-gray-300 mb-4"></div>

  <span className="italic text-2xl text-gray-700 tracking-tight">
    « Citation de Nordine »
  </span>

  <div className="h-px w-24 bg-gray-300 mt-4"></div>
</div>


      {/* WRAPPER DES BLOCS */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">

        {/* ====== UNIVERS 1 — Naruto (texte → image) ====== */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-neutral-100 rounded-2xl p-10 shadow-sm">

          {/* TEXTE */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-900">Naruto</h3>
            <p className="text-gray-600 mt-3">
              Plongez dans l’univers de Konoha avec notre collection exclusive Naruto.
              Chaque pièce représente vos ninjas préférés.
            </p>

            <Link
              to="/collections/naruto"
              className="inline-flex items-center gap-2 mt-6 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
            >
              Voir la collection →
            </Link>
          </div>

          {/* IMAGE */}
          <div className="w-full h-56 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
            {/* Backend injectera l'image Naruto */}
            Image Naruto
          </div>
        </div>

        {/* ====== UNIVERS 2 — One Piece (image → texte) ====== */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-neutral-100 rounded-2xl p-10 shadow-sm">

          {/* IMAGE */}
          <div className="w-full h-56 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
            Image One Piece
          </div>

          {/* TEXTE */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-900">One Piece</h3>
            <p className="text-gray-600 mt-3">
              Naviguez sur Grand Line avec nos sets d’échecs One Piece :
              Pirates contre Marines dans une bataille stratégique épique.
            </p>

            <Link
              to="/collections/onepiece"
              className="inline-flex items-center gap-2 mt-6 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
            >
              Voir la collection →
            </Link>
          </div>
        </div>

        {/* ====== UNIVERS 3 — Dragon Ball (texte → image) ====== */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-neutral-100 rounded-2xl p-10 shadow-sm">

          {/* TEXTE */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-900">Dragon Ball</h3>
            <p className="text-gray-600 mt-3">
              Des pièces légendaires pour des affrontements épiques.
              Goku, Vegeta et les guerriers Z prêts pour la stratégie.
            </p>

            <Link
              to="/collections/dragonball"
              className="inline-flex items-center gap-2 mt-6 bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
            >
              Voir la collection →
            </Link>
          </div>

          {/* IMAGE */}
          <div className="w-full h-56 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
            Image Dragon Ball
          </div>
        </div>

      </div>
    </section>
  );
}
