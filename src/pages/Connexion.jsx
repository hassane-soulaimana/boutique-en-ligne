import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import connexionImg from "../assets/connexion.png";

export default function Connexion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email invalide";

    if (!formData.password) newErrors.password = "Mot de passe requis";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 caractères";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      navigate("/profil");
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#faf7f2]">

      {/* LAYOUT 2 COLONNES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* COLONNE GAUCHE – IMAGE */}
        <div className="relative hidden lg:block">
          <img
            src={connexionImg}
            alt="Connexion Anime Chess"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-stone-850/60 to-stone-900/30"></div>

          <div className="absolute bottom-10 left-10 text-white space-y-3 drop-shadow-lg">
        
          </div>
        </div>

        {/* COLONNE DROITE – FORMULAIRE SANS ENCADREMENT */}
        <div className="flex items-center justify-center py-20 px-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* TITRE */}
            <h1 className="text-4xl font-semibold text-stone-900 text-center mb-2">
              Connexion
            </h1>

            <p className="text-center text-stone-600 mb-12">
              Heureux de vous revoir.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-8">

             {/* Email */}
<div className="space-y-2">
  <label className="block text-sm font-semibold text-stone-700">
    Email
  </label>
  <input
    type="email"
    value={formData.email}
    onChange={(e) => handleChange("email", e.target.value)}
    placeholder="vous@example.com"
    className={`
      w-full px-4 py-3 border rounded-sm bg-white 
      focus:border-amber-600 focus:ring-1 focus:ring-amber-600 
      placeholder:text-stone-400
      transition text-stone-800
      ${errors.email ? "border-red-500" : "border-stone-300"}
    `}
  />
  {errors.email && (
    <p className="text-red-500 text-sm">{errors.email}</p>
  )}
</div>

{/* Password */}
<div className="space-y-2">
  <label className="block text-sm font-semibold text-stone-700">
    Mot de passe
  </label>
  <input
    type="password"
    value={formData.password}
    onChange={(e) => handleChange("password", e.target.value)}
    placeholder="••••••••"
    className={`
      w-full px-4 py-3 border rounded-sm bg-white 
      focus:border-amber-600 focus:ring-1 focus:ring-amber-600 
      placeholder:text-stone-400
      transition text-stone-800
      ${errors.password ? "border-red-500" : "border-stone-300"}
    `}
  />
  {errors.password && (
    <p className="text-red-500 text-sm">{errors.password}</p>
  )}
</div>


              {/* Mot de passe oublié */}
              <div className="flex justify-end">
                <Link
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-3 bg-stone-900 text-white font-semibold rounded-sm
                  hover:bg-amber-700 transition duration-300
                  disabled:bg-stone-400
                "
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#faf7f2] text-stone-500">ou</span>
              </div>
            </div>

            {/* Inscription */}
            <p className="text-center text-stone-700">
              Pas encore de compte ?{" "}
              <Link
                to="/inscription"
                className="text-amber-600 font-semibold hover:text-amber-700"
              >
                S'inscrire
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
