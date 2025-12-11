
// Service pour l'API Anime
import API_URL from "./api";
const API_BASE_URL = `${API_URL}/api`;

const getStoredToken = () => localStorage.getItem('token');

const buildHeaders = ({ auth = false, isJson = true, extra = {} } = {}) => {
  const headers = { ...extra };

  if (isJson && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getStoredToken();
    if (!token) {
      throw new Error('Non authentifié');
    }
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async (path, { method = 'GET', body, auth = false, isFormData = false, headers = {} } = {}) => {
  const config = {
    method,
    headers: buildHeaders({ auth, isJson: !isFormData, extra: headers })
  };

  if (body !== undefined && body !== null) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config);
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === 'string' ? data : data.message || data.error || `Erreur ${response.status}`;
    throw new Error(message);
  }

  return data;
};

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

const unwrapData = (response) => {
  if (!response) return response;
  if (response.data !== undefined) return response.data;
  if (response.result !== undefined) return response.result;
  return response;
};


export const animeApi = {
  // Récupérer tous les univers
  async getUniverses() {
    try {
      const payload = await request('/universes');
      const universes = unwrapData(payload);
      console.log("API Universes Response:", universes);
      return Array.isArray(universes) ? universes : [];
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
      const data = await request('/auth/register', {
        method: 'POST',
        body: userData
      });

      const responseData = unwrapData(data) || data;
      const token = responseData?.token || data?.data?.token;
      const user = responseData?.user || data?.data?.user;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
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
      const data = await request('/auth/login', {
        method: 'POST',
        body: credentials
      });

      const responseData = unwrapData(data) || data;
      const token = responseData?.token || data?.data?.token;
      const user = responseData?.user || data?.data?.user;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
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
      const data = await request('/auth/profile', { auth: true });
      const profile = unwrapData(data);
      if (profile) {
        localStorage.setItem('user', JSON.stringify(profile));
      }
      return profile;
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

  // Mettre à jour le profil utilisateur
  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Non authentifié");
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la mise à jour du profil"
        );
      }

      // Mettre à jour le localStorage avec les nouvelles données
      const updatedUser = data.data || data.user || data;
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Erreur updateProfile:", error);
      throw error;
    }
  },

  // Déconnexion
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // ============ ADMIN API ============

  // Récupérer tous les utilisateurs (admin)
  async getAllUsers() {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📥 getAllUsers:", data);

      if (data.success && data.data) {
        return data.data;
      } else if (Array.isArray(data)) {
        return data;
      }
      return [];
    } catch (error) {
      console.error("Erreur getAllUsers:", error);
      return [];
    }
  },

  // Récupérer toutes les commandes (admin)
  async getAllOrders() {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📥 getAllOrders:", data);

      if (data.success && data.data) {
        return data.data;
      } else if (Array.isArray(data)) {
        return data;
      } else if (data.orders) {
        return data.orders;
      }
      
      // Fallback: essayer l'endpoint /orders classique
      const response2 = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data2 = await response2.json();
      if (data2.success && data2.data) return data2.data;
      if (Array.isArray(data2)) return data2;
      
      return [];
    } catch (error) {
      console.error("Erreur getAllOrders:", error);
      return [];
    }
  },

  // Mettre à jour le statut d'une commande (admin)
  async updateOrderStatus(orderId, status) {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur updateOrderStatus:", error);
      throw error;
    }
  },

  // Supprimer un utilisateur (admin)
  async deleteUser(userId) {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur deleteUser:", error);
      throw error;
    }
  },

  // Récupérer les statistiques (admin)
  async getStats() {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      
      const response = await fetch(`${API_BASE_URL}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }
      return data;
    } catch (error) {
      console.error("Erreur getStats:", error);
      return null;
    }
  },

  // Récupérer les collections/univers
  async getCollections() {
    try {
      const response = await fetch(`${API_BASE_URL}/collections`);
      const data = await response.json();
      
      if (data.success && data.data) {
        return data.data;
      } else if (Array.isArray(data)) {
        return data;
      }
      return [];
    } catch (error) {
      console.error("Erreur getCollections:", error);
      return [];
    }
  },
};

export default animeApi;
