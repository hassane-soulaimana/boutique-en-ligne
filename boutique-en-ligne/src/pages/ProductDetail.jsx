// Page de détail d'un produit
// useParams permet de récupérer les paramètres de l'URL
// Exemple : si l'URL est /produit/ech-001, useParams() retourne { id: 'ech-001' }
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import products from '../data/products';

function ProductDetail() {
  // On récupère le paramètre 'id' depuis l'URL
  const { id } = useParams();
  const navigate = useNavigate();

  // On trouve le produit correspondant à l'id
  const product = products.find(p => p.id === id);

  // Si le produit n'existe pas, on affiche un message
  if (!product) {
    return (
      <Container>
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h1>Produit non trouvé</h1>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Le produit que vous recherchez n'existe pas.
          </p>
          <Button onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
            Retour à l'accueil
          </Button>
        </div>
      </Container>
    );
  }

  const imageStyle = {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    padding: '2rem 0'
  };

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        {/* Bouton retour */}
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Retour
        </Button>

        {/* Grille produit : image à gauche, détails à droite */}
        <div style={gridStyle}>
          {/* Image du produit */}
          <div>
            <img 
              src={product.images[0]} 
              alt={product.imageAlt}
              style={imageStyle}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=Image+produit';
              }}
            />
          </div>

          {/* Détails du produit */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <Badge>{product.univers}</Badge>
              <Badge color="#666">{product.categorie}</Badge>
              {product.nouveaute && <Badge color="#2A9D8F">Nouveau</Badge>}
              {product.promotion && <Badge color="#E63946">-{product.promotion}%</Badge>}
            </div>

            {/* Nom */}
            <h1 style={{ fontSize: '2rem', margin: '1rem 0' }}>{product.nom}</h1>

            {/* Prix */}
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF6B35', margin: '1rem 0' }}>
              {product.prix.toFixed(2)} €
            </p>

            {/* Stock */}
            <p style={{ 
              fontSize: '1rem', 
              fontWeight: '500',
              color: product.enStock ? '#2A9D8F' : '#E63946',
              margin: '1rem 0'
            }}>
              {product.enStock ? '✓ En stock' : '✗ Rupture de stock'}
            </p>

            {/* Description */}
            <div style={{ margin: '2rem 0' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{product.description}</p>
            </div>

            {/* Caractéristiques */}
            <div style={{ margin: '2rem 0' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Caractéristiques</h3>
              <ul style={{ color: '#666', lineHeight: '1.8' }}>
                {Object.entries(product.caracteristiques).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong> {value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bouton d'achat */}
            <Button 
              onClick={() => alert('Fonctionnalité panier à venir !')}
              style={{ width: '100%', marginTop: '2rem' }}
              disabled={!product.enStock}
            >
              {product.enStock ? 'Ajouter au panier' : 'Produit indisponible'}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
