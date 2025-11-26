// Page de connexion
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { login } from '../utils/auth';

function Connexion() {
  const navigate = useNavigate();
  
  // États pour les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError('');

    // On appelle la fonction de connexion
    const result = await login(email, password);

    if (result.success) {
      // Si connexion réussie, on redirige vers le profil
      navigate('/profil');
    } else {
      // Sinon on affiche l'erreur
      setError(result.message);
    }
  };

  const formContainerStyle = {
    maxWidth: '400px',
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

  const infoBoxStyle = {
    backgroundColor: '#FFF3E0',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    color: '#666'
  };

  return (
    <Container>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Connexion</h1>

        {/* Info pour tester */}
        <div style={infoBoxStyle}>
          <strong>Pour tester :</strong><br />
          Email : test@manga-chess.com<br />
          Mot de passe : password
        </div>

        {/* Message d'erreur */}
        {error && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#FFE5E5', 
            color: '#E63946',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
            Se connecter
          </Button>
        </form>

        {/* Lien vers inscription */}
        <p style={linkStyle}>
          Pas encore de compte ?{' '}
          <Link to="/inscription" style={linkTextStyle}>
            S'inscrire
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default Connexion;
