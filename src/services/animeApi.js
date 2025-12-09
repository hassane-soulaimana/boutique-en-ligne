
// Service pour l'API Anime
import API_URL from "./api";
const API_BASE_URL = `${API_URL}/api`;

// Fonction utilitaire pour transformer les URLs d'images
const normalizeImageUrl = (image) => {
  if (!image) return null;
  return image.startsWith('http') ? image : `${API_URL}${image}`;
};

// Fonction pour transformer un produit
const transformProduct = (product) => ({
  ...product,
  image: normalizeImageUrl(product.image)
});

export const animeApi = {
  // Récupérer tous les univers
  async getUniverses() {
    try {
      const response = await fetch(`${API_BASE_URL}/universes`);
      const data = await response.json();

      console.log("API Universes Response:", data);

      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error("Erreur getUniverses:", error);
      return [];
    }
  },

  // Récupérer tous les produits
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        signal: AbortSignal.timeout(10000) // Timeout de 10 secondes
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data); // Pour debug

      if (data.success && data.data) {
        // Transformer les images en URLs absolues
        return data.data.map(transformProduct);
      }
      
      console.warn("API Response success false or no data:", data);
      return []; // Retourne un tableau vide si pas de succès
    } catch (error) {
      console.error("Erreur getProducts:", error);
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
      console.error("Erreur API:", error);
      return null;
    }
  },

  // Récupérer les produits par collection/univers
  async getProductsByCollection(collection) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?collection=${collection}`
      );
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error("Erreur API:", error);
      return [];
    }
  },

  // Récupérer les produits par univers (ID)
  async getProductsByUniverse(universeId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?universe=${universeId}`
      );
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error("Erreur API:", error);
      return [];
    }
  },

  // Récupérer les produits par catégorie
  async getProductsByCategory(category) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?categorie=${category}`
      );
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error("Erreur API:", error);
      return [];
    }
  },

  // Créer un nouveau produit
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      console.log("Create Product Response:", data); // Pour debug

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la création du produit"
        );
      }

      return data;
    } catch (error) {
      console.error("Erreur API:", error);
      throw error;
    }
  },

  // Mettre à jour un produit
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      throw new Error(
        data.message || "Erreur lors de la mise à jour du produit"
      );
    } catch (error) {
      console.error("Erreur API:", error);
      throw error;
    }
  },

  // Supprimer un produit
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      throw new Error(
        data.message || "Erreur lors de la suppression du produit"
      );
    } catch (error) {
      console.error("Erreur API:", error);
      throw error;
    }
  },

  // === AUTHENTIFICATION ===

  // Inscription
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Retourner l'erreur au lieu de la lancer
        return {
          success: false,
          message: data.message || "Erreur lors de l'inscription",
          data: data,
        };
      }

      // Sauvegarder le token en cas de succès
      if (data.data && data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error("Erreur inscription:", error);
      return {
        success: false,
        message: error.message || "Erreur de connexion au serveur",
      };
    }
  },

  // Connexion
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      // Sauvegarder le token
      if (data.data && data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      return data;
    } catch (error) {
      console.error("Erreur connexion:", error);
      throw error;
    }
  },

  // Récupérer le profil de l'utilisateur connecté
  async getMe() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Non authentifié");
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la récupération du profil"
        );
      }

      return data.data;
    } catch (error) {
      console.error("Erreur getMe:", error);
      throw error;
    }
  },

  // Déconnexion
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default animeApi;
