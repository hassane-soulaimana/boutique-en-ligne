import { Link } from "react-router-dom";

export default function Why() {
  return (
    <section className="w-full bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl font-semibold mb-16">Pourquoi Chess Anime ?</h2>

        {/* 3 Colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ---- 1 : Qualité Premium ---- */}
          <div className="flex flex-col items-center text-center">
            
            {/* Icône Pion */}
            <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full mb-6">
              <svg 
                width="34" 
                height="34" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="1.5"
              >
                <circle cx="12" cy="7" r="3" />
                <path d="M5 21h14l-4-8H9l-4 8z" />
              </svg>
            </div>

            <h3 className="text-xl font-medium">Qualité premium</h3>
            <p className="text-gray-300 mt-3 leading-relaxed text-sm max-w-xs">
              Chaque pièce est fabriquée avec des matériaux de haute qualité
              pour une durabilité exceptionnelle.
            </p>
          </div>

          {/* ---- 2 : Design unique ---- */}
          <div className="flex flex-col items-center text-center">

            {/* Icône Cavalier */}
            <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full mb-6">
              <svg 
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M19 21H5l1-7L5 9l8-6 4 6-3 4 4 2z" />
              </svg>
            </div>

            <h3 className="text-xl font-medium">Design unique</h3>
            <p className="text-gray-300 mt-3 leading-relaxed text-sm max-w-xs">
              Des designs exclusifs créés en collaboration avec des artistes
              passionnés d’anime et de manga.
            </p>
          </div>

          {/* ---- 3 : Éditions limitées ---- */}
          <div className="flex flex-col items-center text-center">

            {/* Icône Roi */}
            <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-full mb-6">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M12 3v5" />
                <path d="M10 5h4" />
                <path d="M7 21h10l-1-7H8l-1 7z" />
                <path d="M9 9h6l2 5H7l2-5z" />
              </svg>
            </div>

            <h3 className="text-xl font-medium">Éditions limitées</h3>
            <p className="text-gray-300 mt-3 leading-relaxed text-sm max-w-xs">
              Des collections en édition limitée pour les vrais collectionneurs et fans.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
