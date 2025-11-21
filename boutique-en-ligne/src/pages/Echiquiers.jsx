// Page qui affiche uniquement les échiquiers
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';
import products from '../data/products';

function Echiquiers() {
  // On filtre pour garder seulement les produits de catégorie "echiquier"
  const echiquiers = products.filter(product => product.categorie === 'echiquier');

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>♟️ Échiquiers</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {echiquiers.length} échiquier{echiquiers.length > 1 ? 's' : ''} disponible{echiquiers.length > 1 ? 's' : ''}
        </p>
        <ProductGrid products={echiquiers} />
      </div>
    </Container>
  );
}

export default Echiquiers;
