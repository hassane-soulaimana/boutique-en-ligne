// Page Accessoires - Version refactorisée
import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { animeApi } from '../services/animeApi';
import useProductFilter from '../hooks/useProductFilter';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Accessoires() {
  const { addItem, toggleFavorite, isFavorite } = useContext(ShopContext);
  
  const [accessoires, setAccessoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les accessoires depuis l'API
  useEffect(() => {
    loadAccessoires();
  }, []);

  const loadAccessoires = async () => {
    try {
      setLoading(true);
      const allProducts = await animeApi.getProducts();
      
      // Filtrer les accessoires côté client
      const accessoiresData = allProducts.filter(p => 
        p.category && p.category.toLowerCase().includes('accessoire')
      );
      
      // Mapper les données API au format local
      const mapped = accessoiresData.map(p => ({
        id: p._id || p.id,
        nom: p.name || p.nom,
        prix: parseFloat(p.price || p.prix || 0),
        image: p.image,
        collection: p.universe || 'Non classé',
      }));
      
      setAccessoires(mapped);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les accessoires');
    } finally {
      setLoading(false);
    }
  };

  // Hook de filtrage
  const filter = useProductFilter(accessoires);

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
  if (loading) return <LoadingSpinner message="Chargement des accessoires..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadAccessoires} />;

  return (
    <ProductGrid
      products={accessoires}
      filter={filter}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={isFavorite}
      title="Accessoires"
      subtitle="Complétez votre équipement avec nos accessoires d'échecs de qualité"
    />
  );
}
