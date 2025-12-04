import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import inscriptionImg from "../assets/inscription.png";
import { animeApi } from "../services/animeApi";

export default function Inscription() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
    if (!formData.nom) newErrors.nom = "Le nom est requis";

    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email invalide";

    if (!formData.password || formData.password.length < 6)
      newErrors.password = "6 caractères minimum";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputClass = (field) => `
    w-full px-4 py-3 border rounded-sm bg-white
    placeholder:text-stone-400 text-stone-800
    focus:border-amber-600 focus:ring-1 focus:ring-amber-600
    transition
    ${errors[field] ? "border-red-500" : "border-stone-300"}
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Appel API avec confirmPassword
      const result = await animeApi.register({
        ...formData,
        confirmPassword: formData.password // Le backend vérifie que les 2 mots de passe correspondent
      });
      
      console.log('✅ Inscription réussie:', result);
      
      // Redirection vers le profil
      navigate("/profil");
    } catch (error) {
      console.error('❌ Erreur inscription:', error);
      setErrors({ general: error.message || 'Erreur lors de l\'inscription' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f2]">

      {/* HERO IMAGE */}
      <div className="relative h-64 w-full">
        <img
          src={inscriptionImg}
          alt="Inscription"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-white drop-shadow-lg">
            Créer votre compte
          </h1>
        </div>
      </div>

      {/* FORMULAIRE */}
      <section className="container mx-auto px-6 lg:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto space-y-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ERREUR GÉNÉRALE */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            {/* PRÉNOM */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => handleChange("prenom", e.target.value)}
                className={inputClass("prenom")}
                placeholder="Prénom"
              />
              {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
            </div>

            {/* NOM */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700">
                Nom *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => handleChange("nom", e.target.value)}
                className={inputClass("nom")}
                placeholder="Nom"
              />
              {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClass("email")}
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* MOT DE PASSE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-stone-700">
                Mot de passe *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={inputClass("password")}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* BOUTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 bg-stone-900 text-white font-semibold rounded-sm
                hover:bg-amber-700 transition duration-300
                disabled:bg-stone-400
              "
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#faf7f2] text-stone-500">ou</span>
            </div>
          </div>

          {/* REDIRECTION */}
          <p className="text-center text-stone-700">
            Déjà un compte ?{" "}
            <Link
              to="/connexion"
              className="text-amber-600 font-semibold hover:text-amber-700"
            >
              Se connecter
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
