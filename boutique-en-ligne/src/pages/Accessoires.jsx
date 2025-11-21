// Page qui affiche uniquement les accessoires d'échecs
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';
import products from '../data/products';

function Accessoires() {
  // On filtre pour garder seulement les produits de catégorie "accessoire"
  const accessoires = products.filter(product => product.categorie === 'accessoire');

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎒 Accessoires</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {accessoires.length} accessoire{accessoires.length > 1 ? 's' : ''} disponible{accessoires.length > 1 ? 's' : ''}
        </p>
        <ProductGrid products={accessoires} />
      </div>
    </Container>
  );
}

export default Accessoires;
