// Page Pièces d'échecs - Version refactorisée
import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { animeApi } from '../services/animeApi';
import useProductFilter from '../hooks/useProductFilter';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Pieces() {
  const { addItem, toggleFavorite, isFavorite } = useContext(ShopContext);
  
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les pièces depuis l'API
  useEffect(() => {
    loadPieces();
  }, []);

  const loadPieces = async () => {
    try {
      setLoading(true);
      const allProducts = await animeApi.getProducts();
      
      // Filtrer les pièces côté client
      const piecesData = allProducts.filter(p => 
        p.category && (
          p.category.toLowerCase().includes('piece') ||
          p.category.toLowerCase().includes('pièce')
        )
      );
      
      // Mapper les données API au format local
      const mapped = piecesData.map(p => ({
        id: p._id || p.id,
        nom: p.name || p.nom,
        prix: parseFloat(p.price || p.prix || 0),
        image: p.image,
        collection: p.universe || 'Non classé',
      }));
      
      setPieces(mapped);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les pièces');
    } finally {
      setLoading(false);
    }
  };

  // Hook de filtrage
  const filter = useProductFilter(pieces);

  // Handlers
  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      nom: product.nom,
      prix: product.prix,
      image: product.image,
    });
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite({
      id: product.id,
      nom: product.nom,
      prix: product.prix,
      image: product.image,
    });
  };

  // États de chargement et erreur
  if (loading) return <LoadingSpinner message="Chargement des pièces..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadPieces} />;

  return (
    <ProductGrid
      products={pieces}
      filter={filter}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={isFavorite}
      title="Pièces d'échecs"
      subtitle="Découvrez notre collection de pièces d'échecs inspirées de vos univers préférés"
    />
  );
}
