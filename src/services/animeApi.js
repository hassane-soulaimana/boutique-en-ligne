// Service pour l'API Anime
const API_BASE_URL = '/api';


export const animeApi = {
  // Récupérer tous les univers
  async getUniverses() {
    try {
      const response = await fetch(`${API_BASE_URL}/universes`);
      const data = await response.json();
      
      console.log('API Universes Response:', data);
      
      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('Erreur getUniverses:', error);
      return [];
    }
  },

  // Récupérer tous les produits
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      
      console.log('API Response:', data); // Pour debug
      
      if (data.success) {
        return data.data; // Retourne le tableau de produits
      }
      return []; // Retourne un tableau vide si pas de succès
    } catch (error) {
      console.error('Erreur getProducts:', error);
      return [];
    }
  },

  // Récupérer un produit par ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Erreur API:', error);
      return null;
    }
  },

  // Récupérer les produits par collection/univers
  async getProductsByCollection(collection) {
    try {
      const response = await fetch(`${API_BASE_URL}/products?collection=${collection}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('Erreur API:', error);
      return [];
    }
  },

  // Récupérer les produits par univers (ID)
  async getProductsByUniverse(universeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products?universe=${universeId}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('Erreur API:', error);
      return [];
    }
  },

  // Récupérer les produits par catégorie
  async getProductsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/products?categorie=${category}`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('Erreur API:', error);
      return [];
    }
  },

  // Créer un nouveau produit
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      console.log('Create Product Response:', data); // Pour debug
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création du produit');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Mettre à jour un produit
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.message || 'Erreur lors de la mise à jour du produit');
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  // Supprimer un produit
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.message || 'Erreur lors de la suppression du produit');
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }
};

export default animeApi;
