import { Link } from "react-router-dom";
import heroImage from "../../assets/background-hero.png";

export default function Hero() {
  return (
    <section
  className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center bottom -25px",
  }}
>
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="relative max-w-4xl mx-auto px- text-white text-left">

    <h1 className="text-6xl md:text-8xl font-semibold leading-tight drop-shadow-xl md:text-left">
      De héros... <br /> à pièces maîtresses
    </h1>

    <p className="max-w-2xl mt-6 text-lg md:text-1xl font-light italic drop-shadow-lg text-left">


      Nos échiquiers ne se contentent pas d’être joués, ils racontent des histoires.
      Celles de vos héros, réinventés pièces par pièces, sculptés pour transformer
      chaque ouverture en scène iconique.
    </p>

    <div className="flex items-center justify-center gap-4 mt-8">
      <Link
        to="/collections"
        className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        Nos échiquiers
      </Link>

      <Link
        to="/about" // check avec hanababa pour le lien exact//
        className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-neutral-800 transition"

      >
        Notre vision
      </Link>
    </div>
  </div>
</section>

  );
}
