import { Link } from "react-router-dom";
import heroImage from "../../assets/Fond.png";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-stretch overflow-hidden bg-gray-200">
      {/* Layout en deux colonnes */}
      <div className="w-full flex flex-col md:flex-row">

        {/* Colonne gauche - Texte */}
        <div className="w-full md:w-5/12 text-black text-left py-12 md:py-0 flex items-center px-6 md:px-12 lg:px-20 bg-gray-200">
          <div>
            {/* Badge "Nouvelle Collection" */}
            <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 block font-sans">
              Nouvelle Collection
            </span>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight font-display uppercase tracking-wider">
              De héros... <br /> à pièces maîtresses.
            </h1>

            {/* Description */}
            <p className="max-w-md mt-6 text-base md:text-lg font-normal text-gray-600 font-sans">
              Découvrez nos échiquiers exclusifs inspirés de vos mangas et animes préférés.
            </p>

            {/* Boutons */}
            <div className="flex items-center gap-4 mt-8">
              <Link
                to="/collections"
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
              >
                Découvrir
              </Link>

              <Link
                to="/about"
                className="border border-black text-black px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white transition"
              >
                Notre vision
              </Link>
            </div>
          </div>
        </div>

        {/* Colonne droite - Image pleine hauteur/largeur */}
        <div className="relative w-full md:w-7/12 min-h-[50vh] md:min-h-full">
          {/* Dégradé fondu entre les colonnes */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-200/60 to-transparent z-10 hidden md:block"></div>
          <img 
            src={heroImage} 
            alt="Pièces d'échecs" 
            className="w-full h-full object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}
