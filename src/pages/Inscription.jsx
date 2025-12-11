import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import inscriptionImg from "../assets/inscription.png";
import { animeApi } from "../services/animeApi";


const register = async (nom, prenom, email, password, confirmPassword) => {
  try {
    const payload = await animeApi.register({ nom, prenom, email, password, confirmPassword });
    return payload;
  } catch (error) {
    throw error;
  }
};

export default function Inscription() {
  const navigate = useNavigate();

  // Redirection si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profil");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  /* -----------------------------------------------------------
     Vérification simple du mot de passe
  ----------------------------------------------------------- */
  const passwordStrengthCheck = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    setServerError("");
  };

  /* -----------------------------------------------------------
     VALIDATION FRONTEND
  ----------------------------------------------------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
    if (!formData.nom) newErrors.nom = "Le nom est requis";

    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email invalide";

    if (!passwordStrengthCheck(formData.password))
      newErrors.password = "6 caractères min, avec majuscule, minuscule et chiffre";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

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

  /* -----------------------------------------------------------
     APPEL BACKEND + AUTO‑CONNEXION
  ----------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = await register(
        formData.nom,
        formData.prenom,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      if (data.success || data.message) {
        // Inscription réussie
        setTimeout(() => {
          navigate("/profil");
        }, 800);
      } else {
        // Erreur du serveur
        setErrors({ general: data.error || "Erreur lors de l'inscription" });
      }
    } catch (error) {
      console.error("❌ Erreur inscription:", error);
      setErrors({ general: error.message || "Erreur lors de l'inscription" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      <div className="relative h-64 w-full">
        <img
          src={inscriptionImg}
          alt="Inscription"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-white drop-shadow-lg">
            Créer votre compte
          </h1>
        </div>
      </div>

      <section className="container mx-auto px-6 lg:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-10 bg-white border border-stone-200 shadow-sm rounded-md"
          >

            {serverError && (
              <p className="text-red-600 text-center font-semibold">
                {serverError}
              </p>
            )}

            <Field label="Prénom *" type="text"
              value={formData.prenom}
              onChange={(v) => handleChange("prenom", v)}
              error={errors.prenom}
              inputClass={inputClass("prenom")}
            />

            <Field label="Nom *" type="text"
              value={formData.nom}
              onChange={(v) => handleChange("nom", v)}
              error={errors.nom}
              inputClass={inputClass("nom")}
            />

            <Field label="Email *" type="email"
              value={formData.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
              inputClass={inputClass("email")}
            />

            <Field label="Mot de passe *" type="password"
              value={formData.password}
              onChange={(v) => handleChange("password", v)}
              error={errors.password}
              inputClass={inputClass("password")}
            />

            <Field label="Confirmer le mot de passe *" type="password"
              value={formData.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
              error={errors.confirmPassword}
              inputClass={inputClass("confirmPassword")}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-900 text-white font-semibold rounded-sm hover:bg-amber-700 transition disabled:bg-stone-400"
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          <Divider />

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

function Field({ label, type, value, onChange, error, inputClass }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-stone-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function Divider() {
  return (
    <div className="relative my-10">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-stone-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-[#faf7f2] text-stone-500">ou</span>
      </div>
    </div>
  );
}
