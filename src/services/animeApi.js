
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

      if (data.success && data.data) {
        return transformProduct(data.data);
      }
      return null;
    } catch (error) {
      console.error("Erreur API:", error);
      return null;
    }
  },

  // Récupérer les produits par collection/univers (nom de collection)
  async getProductsByCollection(collection) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?collection=${encodeURIComponent(collection)}`,
        { signal: AbortSignal.timeout(10000) }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success && data.data) {
        return data.data.map(transformProduct);
      }
      return [];
    } catch (error) {
      console.error("Erreur getProductsByCollection:", error);
      return [];
    }
  },

  // Récupérer les produits par univers (ID ou nom)
  async getProductsByUniverse(universeId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?universe=${encodeURIComponent(universeId)}`,
        { signal: AbortSignal.timeout(10000) }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success && data.data) {
        return data.data.map(transformProduct);
      }
      return [];
    } catch (error) {
      console.error("Erreur getProductsByUniverse:", error);
      return [];
    }
  },

  // Récupérer les produits par catégorie (Echiquier, Piece d'echecs, Accessoires)
  async getProductsByCategory(category) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`,
        { signal: AbortSignal.timeout(10000) }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success && data.data) {
        return data.data.map(transformProduct);
      }
      return [];
    } catch (error) {
      console.error("Erreur getProductsByCategory:", error);
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

  // Récupérer les commandes de l'utilisateur
  async getOrders() {
    let apiOrders = [];
    
    try {
      const token = localStorage.getItem("token");

      if (token) {
        console.log("🔄 getOrders: Appel API /orders...");
        const response = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📥 getOrders: Status", response.status);
        const data = await response.json();
        console.log("📥 getOrders: Réponse brute", data);

        // Gérer différents formats de réponse
        if (data.success && data.data) {
          apiOrders = data.data;
        } else if (Array.isArray(data)) {
          apiOrders = data;
        } else if (data.orders) {
          apiOrders = data.orders;
        }
      }
    } catch (error) {
      console.error("❌ Erreur API getOrders:", error);
    }

    // Récupérer les commandes locales (backup)
    const localOrders = JSON.parse(localStorage.getItem("localOrders") || "[]");
    console.log("💾 Commandes locales:", localOrders.length);

    // Combiner API + local (éviter les doublons par orderNumber)
    const apiOrderNumbers = new Set(apiOrders.map(o => o.orderNumber || o._id));
    const uniqueLocalOrders = localOrders.filter(o => !apiOrderNumbers.has(o.orderNumber));
    
    const allOrders = [...apiOrders, ...uniqueLocalOrders];
    
    // Trier par date décroissante
    allOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0);
      const dateB = new Date(b.createdAt || b.date || 0);
      return dateB - dateA;
    });

    console.log("✅ getOrders: Total commandes", allOrders.length);
    return { data: allOrders };
  },

  // Récupérer les favoris de l'utilisateur
  async getFavorites() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Non authentifié");
      }

      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Transformer les favoris pour avoir le bon format
        const favorites = data.data.map(fav => ({
          id: fav.product?._id || fav._id,
          nom: fav.product?.name || fav.name,
          prix: fav.product?.price || fav.price,
          image: normalizeImageUrl(fav.product?.image || fav.image),
        }));
        return { data: favorites };
      }
      
      return { data: [] };
    } catch (error) {
      console.error("Erreur getFavorites:", error);
      return { data: [] };
    }
  },

  // Supprimer un favori
  async removeFavorite(productId) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Non authentifié");
      }

      const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur removeFavorite:", error);
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
