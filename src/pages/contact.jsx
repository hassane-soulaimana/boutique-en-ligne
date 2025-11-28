import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";

// Configuration du token Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiaHNuZTIwIiwiYSI6ImNtaWhkM29mZTBkbXozZHIxNDNnZHZwc28ifQ.KaY1UNrpNjNwscYCNsUNJw";

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
    <main className="min-h-screen bg-white text-slate-800">
      <section className="bg-gradient-to-br from-amber-50 to-amber-100 py-20">
        <div className="container mx-auto px-6 lg:px-20 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold"
          >
            Nous contacter
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-700"
          >
            Une question, un projet spécial ou une demande concernant nos collections ? Notre équipe vous répond.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow border border-amber-100"
          >
            <h2 className="text-2xl font-semibold mb-4">Envoyer un message</h2>

            <form
              className="space-y-5"
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
              <div>
                <label className="block text-sm font-medium">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  required
                  className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  required
                  className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  placeholder="Votre message..."
                  rows="5"
                  required
                  className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white font-medium py-3 rounded-xl hover:bg-amber-700 transition"
              >
                Envoyer
              </button>
            </form>
          </motion.div>

          {/* Coordonnées */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow border border-amber-100">
              <h2 className="text-2xl font-semibold mb-4">Nous contacter directement</h2>

              <ul className="space-y-4 text-slate-700">
                <li>
                  <strong>Email :</strong> contact@boutique-en-ligne.com
                </li>
                <li>
                  <strong>Téléphone :</strong> +33 6 00 00 00 00
                </li>
                <li>
                  <strong>Adresse atelier :</strong>
                  <br /> 12 rue des Artisans, 75000 Paris, France
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow border border-amber-100">
              <h3 className="text-xl font-semibold mb-2">Horaires</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Lundi – Vendredi : 9h00 – 18h00<br />
                Samedi : 10h00 – 16h00<br />
                Dimanche : fermé
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow border border-amber-100">
              <h3 className="text-xl font-semibold mb-2">Réseaux sociaux</h3>
              <ul className="text-slate-700 space-y-1 text-sm">
                <li>Instagram : @boutique-en-ligne</li>
                <li>Facebook : Boutique en ligne</li>
                <li>TikTok : @boutique.crea</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carte interactive */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Nous trouver</h2>
            <div
              ref={mapContainer}
              className="w-full h-96 rounded-2xl shadow border border-amber-100 overflow-hidden"
            ></div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t bg-white py-8 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Boutique en ligne — Tous droits réservés
      </footer>
    </main>
  );
}
