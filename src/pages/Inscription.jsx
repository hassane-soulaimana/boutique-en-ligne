import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!formData.nom) newErrors.nom = 'Le nom est requis';
    if (!formData.email) newErrors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.telephone) newErrors.telephone = 'Le téléphone est requis';
    if (!formData.adresse) newErrors.adresse = 'L\'adresse est requise';
    if (!formData.ville) newErrors.ville = 'La ville est requise';
    if (!formData.codePostal) newErrors.codePostal = 'Le code postal est requis';

    if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Simuler un délai API
    setTimeout(() => {
      console.log('Inscription avec:', formData);
      navigate('/profil');
      setLoading(false);
    }, 1000);
  };

  const inputClass = (fieldName) => `
    w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Créer un compte
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Rejoignez-nous et explorez nos collections
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom et Prénom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                placeholder="Naruto"
                className={inputClass('prenom')}
              />
              {errors.prenom && (
                <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                placeholder="Uzumaki"
                className={inputClass('nom')}
              />
              {errors.nom && (
                <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="naruto@manga-chess.com"
              className={inputClass('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleChange('telephone', e.target.value)}
              placeholder="06 12 34 56 78"
              className={inputClass('telephone')}
            />
            {errors.telephone && (
              <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
            )}
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse *
            </label>
            <input
              type="text"
              value={formData.adresse}
              onChange={(e) => handleChange('adresse', e.target.value)}
              placeholder="12 rue de Konoha"
              className={inputClass('adresse')}
            />
            {errors.adresse && (
              <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>
            )}
          </div>

          {/* Ville et Code postal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville *
              </label>
              <input
                type="text"
                value={formData.ville}
                onChange={(e) => handleChange('ville', e.target.value)}
                placeholder="Paris"
                className={inputClass('ville')}
              />
              {errors.ville && (
                <p className="text-red-500 text-sm mt-1">{errors.ville}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code postal *
              </label>
              <input
                type="text"
                value={formData.codePostal}
                onChange={(e) => handleChange('codePostal', e.target.value)}
                placeholder="75001"
                className={inputClass('codePostal')}
              />
              {errors.codePostal && (
                <p className="text-red-500 text-sm mt-1">{errors.codePostal}</p>
              )}
            </div>
          </div>

          {/* Mot de passe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••••"
                className={inputClass('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className={inputClass('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-8"
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        {/* Lien vers connexion */}
        <p className="text-center text-gray-600">
          Déjà un compte ?{' '}
          <Link
            to="/connexion"
            className="text-orange-600 hover:text-orange-700 font-bold"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
