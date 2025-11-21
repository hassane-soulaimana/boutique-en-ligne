// On importe les composants et données nécessaires
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import products from '../data/products';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // On prend seulement les 6 premiers produits pour l'affichage sur l'accueil
  const featuredProducts = products.slice(0, 6);

  const heroStyle = {
    textAlign: 'center',
    padding: '3rem 2rem',
    background: 'linear-gradient(135deg, #FF6B35 0%, #E63946 100%)',
    color: 'white'
  };

  const sectionStyle = {
    padding: '2rem 0'
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333'
  };

  return (
    <div>
      {/* Section hero (bannière d'accueil) */}
      <div style={heroStyle}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>
          🎮 Bienvenue dans la Boutique Échecs Manga
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Découvrez notre collection d'échiquiers, pièces et accessoires inspirés de vos mangas préférés !
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Button onClick={() => navigate('/collections')}>
            Découvrir les collections
          </Button>
        </div>
      </div>

      {/* Section produits vedettes */}
      <Container>
        <div style={sectionStyle}>
          <h2 style={titleStyle}>Produits en vedette</h2>
          <ProductGrid products={featuredProducts} />
        </div>

        {/* Section catégories */}
        <div style={sectionStyle}>
          <h2 style={titleStyle}>Nos catégories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/echiquiers')}>
              <div style={{ fontSize: '3rem' }}>♟️</div>
              <h3>Échiquiers</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/pieces')}>
              <div style={{ fontSize: '3rem' }}>👑</div>
              <h3>Pièces</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/accessoires')}>
              <div style={{ fontSize: '3rem' }}>🎒</div>
              <h3>Accessoires</h3>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
