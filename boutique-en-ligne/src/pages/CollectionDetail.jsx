// Page qui affiche les produits d'un univers spécifique
// useParams permet de récupérer les paramètres de l'URL
// Exemple : si l'URL est /collections/naruto, useParams() retourne { univers: 'naruto' }
import { useParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';
import products from '../data/products';
import univers from '../data/univers';

function CollectionDetail() {
  // On récupère le paramètre 'univers' depuis l'URL
  const { univers: universId } = useParams();

  // On trouve l'univers correspondant
  const currentUnivers = univers.find(u => u.id === universId);

  // On filtre les produits pour garder seulement ceux de cet univers
  const produitsUnivers = products.filter(product => product.univers === universId);

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        {/* Titre avec le nom de l'univers */}
        <div style={{ 
          padding: '2rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          backgroundColor: currentUnivers?.couleur || '#FF6B35',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
            Collection {currentUnivers?.nom || universId}
          </h1>
          <p style={{ margin: 0 }}>
            {currentUnivers?.description || `Produits de l'univers ${universId}`}
          </p>
        </div>

        {/* Nombre de produits */}
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {produitsUnivers.length} produit{produitsUnivers.length > 1 ? 's' : ''} disponible{produitsUnivers.length > 1 ? 's' : ''}
        </p>

        {/* Grille de produits */}
        <ProductGrid products={produitsUnivers} />
      </div>
    </Container>
  );
}

export default CollectionDetail;
