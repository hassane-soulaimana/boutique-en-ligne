import { Link } from "react-router-dom";
import heroImage from "../../assets/background-hero.png";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Layout en deux colonnes */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        
        {/* Colonne gauche - Texte */}
        <div className="w-full md:w-1/2 text-white text-left py-12 md:py-0">
          
          {/* Badge "Nouvelle Collection" */}
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Nouvelle Collection
          </span>

          {/* Titre principal en italique */}
          <h1 className="text-5xl md:text-7xl font-normal leading-tight font-display italic">
            De héros... <br /> à pièces maîtresses.
          </h1>

          {/* Description */}
          <p className="max-w-md mt-6 text-base md:text-lg font-light text-gray-300">
            Découvrez nos échiquiers exclusifs inspirés de vos mangas et animes préférés.
          </p>

          {/* Boutons */}
          <div className="flex items-center gap-4 mt-8">
            <Link
              to="/collections"
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Découvrir
            </Link>

            <Link
              to="/about"
              className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Notre vision
            </Link>
          </div>
        </div>

        {/* Colonne droite - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img 
            src={heroImage} 
            alt="Pièces d'échecs" 
            className="max-h-[70vh] object-contain"
          />
        </div>

      </div>
    </section>
  );
}
