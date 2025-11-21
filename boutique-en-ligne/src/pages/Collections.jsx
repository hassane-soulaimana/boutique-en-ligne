// Page qui affiche tous les univers manga disponibles
import Container from '../components/ui/Container';
import { Link } from 'react-router-dom';
import univers from '../data/univers';

function Collections() {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '2rem 0'
  };

  const cardStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const contentStyle = {
    padding: '1rem',
    backgroundColor: 'white'
  };

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌟 Collections par Univers</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Explorez nos {univers.length} univers manga et découvrez leurs produits
        </p>

        <div style={gridStyle}>
          {/* On boucle sur tous les univers */}
          {univers.map((univ) => (
            <Link 
              key={univ.id} 
              to={`/collections/${univ.id}`}
              style={cardStyle}
            >
              <div>
                {/* Image de l'univers */}
                <div 
                  style={{
                    ...imageStyle,
                    backgroundColor: univ.couleur,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'white'
                  }}
                >
                  {univ.nom.charAt(0)}
                </div>
                
                {/* Informations de l'univers */}
                <div style={contentStyle}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{univ.nom}</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                    {univ.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Collections;
