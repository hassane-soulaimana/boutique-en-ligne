import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";

// Configuration du token Mapbox via variable d'environnement
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Contact() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      try {
        // Utiliser Mapbox avec le style light
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [2.3522, 48.8566],
          zoom: 13,
        });

        // Ajouter un marqueur
        new mapboxgl.Marker({ color: "#D97706" })
          .setLngLat([2.3522, 48.8566])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              "<strong>Atelier Boutique en ligne</strong><br />12 rue des Artisans, 75000 Paris"
            )
          )
          .addTo(map.current);
      } catch (err) {
        console.log("Mapbox not available, using fallback map");
        // Fallback vers OpenStreetMap si Mapbox n'est pas disponible
        initFallbackMap();
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const initFallbackMap = () => {
    import("leaflet").then((L) => {
      map.current = L.map(mapContainer.current).setView([48.8566, 2.3522], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map.current);

      L.marker([48.8566, 2.3522])
        .addTo(map.current)
        .bindPopup("Atelier Boutique en ligne<br />12 rue des Artisans, Paris");
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Minimaliste avec typographie claire */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-32">
        <div className="container mx-auto px-6 lg:px-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl lg:text-7xl font-light tracking-tight leading-tight">
              Contactez-nous
            </h1>
            <p className="text-xl lg:text-2xl font-light text-gray-300 max-w-2xl mx-auto">
              Une question sur nos échiquiers animés ? Notre équipe est à votre écoute.
            </p>
            
            {/* CTA subtil */}
            <div className="pt-4">
              <a
                href="#formulaire"
                className="inline-block px-8 py-4 bg-white text-gray-900 font-medium rounded-sm hover:bg-gray-100 transition-colors duration-300"
              >
                Nous écrire
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Accent visuel minimaliste */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-yellow-500"></div>
      </section>

      {/* Section principale - Espace blanc ample */}
      <section id="formulaire" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Formulaire - Design épuré */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-light text-gray-900">Envoyer un message</h2>
                <p className="text-gray-600 text-lg font-light">
                  Partagez votre projet ou posez vos questions sur nos collections d'échiquiers inspirées des univers animés.
                </p>
              </div>

              <form
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    message: e.target.message.value,
                  };

                  try {
                    await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(formData),
                    });
                    alert("Message envoyé avec succès !");
                    e.target.reset();
                  } catch (err) {
                    alert("Erreur lors de l'envoi du message");
                  }
                }}
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    required
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Votre message..."
                    rows="5"
                    required
                    className="w-full border-b-2 border-gray-300 bg-transparent py-3 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium py-4 hover:bg-gray-800 transition-colors duration-300"
                >
                  Envoyer le message
                </button>
              </form>
            </motion.div>

            {/* Informations - Layout professionnel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-12"
            >
              <div className="space-y-8">
                <h3 className="text-3xl font-light text-gray-900">Informations</h3>
                
                <div className="space-y-6 text-gray-700">
                  <div className="border-l-2 border-gray-900 pl-6 py-2">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-light">contact@boutique-en-ligne.com</p>
                  </div>
                  
                  <div className="border-l-2 border-gray-900 pl-6 py-2">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Téléphone</p>
                    <p className="text-lg font-light">+33 6 00 00 00 00</p>
                  </div>
                  
                  <div className="border-l-2 border-gray-900 pl-6 py-2">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Adresse</p>
                    <p className="text-lg font-light">12 rue des Artisans<br />75000 Paris, France</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-light text-gray-900">Horaires d'ouverture</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-light">Lundi – Vendredi</span>
                    <span className="font-medium">9h00 – 18h00</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-light">Samedi</span>
                    <span className="font-medium">10h00 – 16h00</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-light">Dimanche</span>
                    <span className="font-medium text-gray-400">Fermé</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-light text-gray-900">Suivez-nous</h3>
                <div className="flex gap-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <span className="text-sm uppercase tracking-wide">Instagram</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <span className="text-sm uppercase tracking-wide">Facebook</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    <span className="text-sm uppercase tracking-wide">TikTok</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carte - Section showcase */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900">Notre atelier</h2>
              <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                Venez découvrir nos créations d'échiquiers animés dans notre showroom parisien
              </p>
            </div>
            
            <div
              ref={mapContainer}
              className="w-full h-[500px] shadow-2xl overflow-hidden"
            ></div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
