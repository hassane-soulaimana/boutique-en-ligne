// Carte produit - affiche un produit avec son image, nom, prix, etc.
// Utilisée dans les listes de produits (échiquiers, pièces, accessoires)

import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

function ProductCard({ product }) {
  // Style de la carte
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    backgroundColor: 'white'
  };

  const imageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    backgroundColor: '#f5f5f5'
  };

  const contentStyle = {
    padding: '1rem'
  };

  const titleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0.5rem 0',
    color: '#333'
  };

  const priceStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#FF6B35',
    margin: '0.5rem 0'
  };

  const badgeContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  return (
    <Link 
      to={`/produit/${product.id}`} 
      style={{ textDecoration: 'none' }}
    >
      <div style={cardStyle}>
        {/* Image du produit */}
        <img 
          src={product.images[0]} 
          alt={product.imageAlt} 
          style={imageStyle}
          onError={(e) => {
            // Si l'image ne charge pas, on met une image placeholder
            e.target.src = 'https://via.placeholder.com/300x250?text=Image+produit';
          }}
        />
        
        {/* Contenu de la carte */}
        <div style={contentStyle}>
          {/* Badges */}
          <div style={badgeContainerStyle}>
            <Badge>{product.univers}</Badge>
            {product.nouveaute && <Badge color="#2A9D8F">Nouveau</Badge>}
            {product.promotion && <Badge color="#E63946">-{product.promotion}%</Badge>}
          </div>
          
          {/* Nom du produit */}
          <h3 style={titleStyle}>{product.nom}</h3>
          
          {/* Prix */}
          <p style={priceStyle}>{product.prix.toFixed(2)} €</p>
          
          {/* Stock */}
          <p style={{ fontSize: '0.875rem', color: product.enStock ? '#2A9D8F' : '#E63946' }}>
            {product.enStock ? '✓ En stock' : '✗ Rupture de stock'}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
