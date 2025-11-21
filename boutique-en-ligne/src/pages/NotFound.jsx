// Link est comme un <a> mais pour la navigation interne (sans recharger la page)
import { Link } from 'react-router-dom';

// Page 404 - affichée quand l'URL n'existe pas
function NotFound() {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
      <h2>Page non trouvée</h2>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <Link 
        to="/" 
        style={{ 
          marginTop: '2rem', 
          padding: '0.75rem 1.5rem',
          background: '#FF6B35',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
