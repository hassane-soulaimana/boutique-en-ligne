// Grille de produits - affiche plusieurs ProductCard en grille responsive
// Prend une liste de produits en entrée et les affiche de manière organisée

import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  // Style de la grille - s'adapte à la taille de l'écran
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    padding: '2rem 0'
  };

  // Message si aucun produit
  const emptyStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
    fontSize: '1.1rem'
  };

  // Si la liste est vide, on affiche un message
  if (!products || products.length === 0) {
    return (
      <div style={emptyStyle}>
        <p>Aucun produit disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div style={gridStyle}>
      {/* On boucle sur tous les produits et on crée une carte pour chacun */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
