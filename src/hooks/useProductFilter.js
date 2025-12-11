import { useState, useMemo } from 'react';

/**
 * Hook personnalisé pour la gestion des filtres, tri et pagination des produits
 * @param {Array} products - Liste des produits à filtrer
 * @param {Object} options - Options de configuration
 */
export default function useProductFilter(products, options = {}) {
  const { itemsPerPage = 9 } = options;

  // États des filtres
  const [filtreCollection, setFiltreCollection] = useState("Toutes");
  const [filtrePrix, setFiltrePrix] = useState("Tous");
  const [tri, setTri] = useState("populaire");
  const [currentPage, setCurrentPage] = useState(1);

  // Fourchettes de prix
  const fourchettes = [
    { label: "Tous les prix", value: "Tous" },
    { label: "Moins de 100€", value: "0-100" },
    { label: "100€ - 200€", value: "100-200" },
    { label: "200€ - 500€", value: "200-500" },
    { label: "Plus de 500€", value: "500+" },
  ];

  // Extraire les collections uniques
  const collections = useMemo(() => {
    const unique = [...new Set(products.map(p => p.collection))].filter(Boolean);
    return ["Toutes", ...unique];
  }, [products]);

  // Filtrer par prix
  const filterByPrice = (product) => {
    const prix = product.prix;
    switch (filtrePrix) {
      case "0-100": return prix < 100;
      case "100-200": return prix >= 100 && prix < 200;
      case "200-500": return prix >= 200 && prix < 500;
      case "500+": return prix >= 500;
      default: return true;
    }
  };

  // Produits filtrés et triés
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtre par collection
    if (filtreCollection !== "Toutes") {
      result = result.filter(p => p.collection === filtreCollection);
    }

    // Filtre par prix
    result = result.filter(filterByPrice);

    // Tri
    switch (tri) {
      case "prix-asc":
        result.sort((a, b) => a.prix - b.prix);
        break;
      case "prix-desc":
        result.sort((a, b) => b.prix - a.prix);
        break;
      case "nom":
        result.sort((a, b) => (a.nom || "").localeCompare(b.nom || ""));
        break;
      default:
        // populaire - pas de tri spécifique
        break;
    }

    return result;
  }, [products, filtreCollection, filtrePrix, tri]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset page quand les filtres changent
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  return {
    // Produits
    filteredProducts,
    paginatedProducts,
    totalProducts: filteredProducts.length,

    // Filtres
    filtreCollection,
    setFiltreCollection: handleFilterChange(setFiltreCollection),
    filtrePrix,
    setFiltrePrix: handleFilterChange(setFiltrePrix),
    tri,
    setTri: handleFilterChange(setTri),

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,

    // Options
    collections,
    fourchettes,
  };
}
