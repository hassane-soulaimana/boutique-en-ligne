// Page qui affiche uniquement les pièces d'échecs
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';
import products from '../data/products';

function Pieces() {
  // On filtre pour garder seulement les produits de catégorie "piece"
  const pieces = products.filter(product => product.categorie === 'piece');

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>👑 Pièces d'Échecs</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {pieces.length} set{pieces.length > 1 ? 's' : ''} de pièces disponible{pieces.length > 1 ? 's' : ''}
        </p>
        <ProductGrid products={pieces} />
      </div>
    </Container>
  );
}

export default Pieces;
