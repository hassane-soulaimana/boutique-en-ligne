// Page Echiquiers - Version refactorisée
import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { animeApi } from '../services/animeApi';
import useProductFilter from '../hooks/useProductFilter';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Echiquiers() {
  const { addItem, toggleFavorite, isFavorite } = useContext(ShopContext);
  
  const [echiquiers, setEchiquiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les échiquiers depuis l'API
  useEffect(() => {
    loadEchiquiers();
  }, []);

  const loadEchiquiers = async () => {
    try {
      setLoading(true);
      const allProducts = await animeApi.getProducts();
      
      // Filtrer les échiquiers côté client
      const echiquiersData = allProducts.filter(p => 
        p.category && (
          p.category.toLowerCase().includes('echiquier') ||
          p.category.toLowerCase().includes('échiquier')
        )
      );
      
      // Mapper les données API au format local
      const mapped = echiquiersData.map(p => ({
        id: p._id || p.id,
        nom: p.name || p.nom,
        prix: parseFloat(p.price || p.prix || 0),
        image: p.image,
        collection: p.universe || 'Non classé',
      }));
      
      setEchiquiers(mapped);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les échiquiers');
    } finally {
      setLoading(false);
    }
  };

  // Hook de filtrage
  const filter = useProductFilter(echiquiers);

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
  if (loading) return <LoadingSpinner message="Chargement des échiquiers..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadEchiquiers} />;

  return (
    <ProductGrid
      products={echiquiers}
      filter={filter}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={isFavorite}
      title="Échiquiers"
      subtitle="Découvrez notre collection d'échiquiers inspirés de vos univers préférés"
    />
  );
}
