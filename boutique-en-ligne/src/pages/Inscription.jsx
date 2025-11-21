// Page d'inscription
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { register } from '../utils/auth';

function Inscription() {
  const navigate = useNavigate();
  
  // États pour tous les champs du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: ''
  });
  
  const [errors, setErrors] = useState({});

  // Fonction pour mettre à jour un champ
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Efface l'erreur du champ quand on commence à taper
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // On retire confirmPassword avant d'envoyer
    const { confirmPassword, ...userData } = formData;
    
    const result = await register(userData);

    if (result.success) {
      // Inscription réussie, on redirige vers le profil
      navigate('/profil');
    }
  };

  const formContainerStyle = {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666'
  };

  const linkTextStyle = {
    color: '#FF6B35',
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <Container>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Créer un compte</h1>

        <form onSubmit={handleSubmit}>
          {/* Nom et Prénom sur la même ligne */}
          <div style={gridStyle}>
            <Input
              label="Prénom"
              value={formData.prenom}
              onChange={(e) => handleChange('prenom', e.target.value)}
              placeholder="Naruto"
              required
            />

            <Input
              label="Nom"
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              placeholder="Uzumaki"
              required
            />
          </div>

          {/* Email */}
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="naruto@manga-chess.com"
            required
          />

          {/* Téléphone */}
          <Input
            label="Téléphone"
            type="tel"
            value={formData.telephone}
            onChange={(e) => handleChange('telephone', e.target.value)}
            placeholder="06 12 34 56 78"
            required
          />

          {/* Adresse */}
          <Input
            label="Adresse"
            value={formData.adresse}
            onChange={(e) => handleChange('adresse', e.target.value)}
            placeholder="12 rue de Konoha"
            required
          />

          {/* Ville et Code postal */}
          <div style={gridStyle}>
            <Input
              label="Ville"
              value={formData.ville}
              onChange={(e) => handleChange('ville', e.target.value)}
              placeholder="Paris"
              required
            />

            <Input
              label="Code postal"
              value={formData.codePostal}
              onChange={(e) => handleChange('codePostal', e.target.value)}
              placeholder="75001"
              required
            />
          </div>

          {/* Mot de passe */}
          <Input
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="••••••••"
            required
            error={errors.password}
          />

          {/* Confirmation mot de passe */}
          <Input
            label="Confirmer le mot de passe"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="••••••••"
            required
            error={errors.confirmPassword}
          />

          <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
            S'inscrire
          </Button>
        </form>

        {/* Lien vers connexion */}
        <p style={linkStyle}>
          Déjà un compte ?{' '}
          <Link to="/connexion" style={linkTextStyle}>
            Se connecter
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default Inscription;
