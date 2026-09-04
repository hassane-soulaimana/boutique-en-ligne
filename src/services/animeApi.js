import API_URL from "./api";
const API_BASE_URL = `${API_URL}/api`;

const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

// Stockage Local
// Accès à localStorage protégés
const safeGetItem = (key) => {
  if (!isBrowser) return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
};

const safeSetItem = (key, value) => {
  if (!isBrowser) return;
  try { window.localStorage.setItem(key, value); } catch { /* ignore */ }
};

const safeRemoveItem = (key) => {
  if (!isBrowser) return;
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
};

// Helpers

// Token JWT stocké après connexion
const getStoredToken = () => safeGetItem('token');

// Construit les headers : JSON par défaut + Authorization si la route est protégée
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

// Fetch centralisé : URL de base, timeout, parsing JSON et gestion d'erreur
const request = async (path, { method = 'GET', body, auth = false, isFormData = false, headers = {}, timeout = 15000 } = {}) => {
  const config = {
    method,
    headers: buildHeaders({ auth, isJson: !isFormData, extra: headers })
  };

  if (body !== undefined && body !== null) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  // Coupe la requête si elle dépasse le délai
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  config.signal = controller.signal;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, config);
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('Requête annulée (timeout)');
    }
    throw err;
  }

  clearTimeout(timer);

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text().catch(() => null);

  if (!response.ok) {
    const message = typeof data === 'string' ? data : (data && (data.message || data.error)) || `Erreur ${response.status}`;
    throw new Error(message);
  }

  return data;
};

// Complète les URLs d'images relatives avec le domaine de l'API
const normalizeImageUrl = (image) => {
  if (!image) return null;
  return image.startsWith('http') ? image : `${API_URL}${image}`;
};

// Ramène category/universe (objets peuplés par le backend) à un simple nom
const transformProduct = (product) => ({
  ...product,
  image: normalizeImageUrl(product.image),
  category: product.category?.name || product.category,
  universe: product.universe?.name || product.universe,
});

// Déballe la réponse backend : { data } ou { result }, sinon la réponse telle quelle
const unwrapData = (response) => {
  if (!response) return response;
  if (response.data !== undefined) return response.data;
  if (response.result !== undefined) return response.result;
  return response;
};



export const animeApi = {

  // AUTHENTIFICATION

  // Inscription
  async register(userData) {
    try {
      const data = await request('/auth/register', {
        method: 'POST',
        body: userData
      });

      // Le backend renvoie { token, data: user }
      const responseData = unwrapData(data) || data;
      const token = data?.token || responseData?.token;
      const user = responseData?.user || responseData;

      if (token) {
        safeSetItem('token', token);
      }
      if (user) {
        safeSetItem('user', JSON.stringify(user));
      }

      return { success: true, data: user };
    } catch (error) {
      console.error("Erreur inscription:", error);
      return { success: false, message: error.message };
    }
  },

  // Connexion : stocke token + user
  async login(credentials) {
    try {
      const data = await request('/auth/login', {
        method: 'POST',
        body: credentials
      });

      // Le backend renvoie { token, data: user }
      const responseData = unwrapData(data) || data;
      const token = data?.token || responseData?.token;
      const user = responseData?.user || responseData;

      if (token) {
        safeSetItem('token', token);
      }
      if (user) {
        safeSetItem('user', JSON.stringify(user));
      }

      return { success: true, data: user, user, token };
    } catch (error) {
      console.error("Erreur connexion:", error);
      throw error;
    }
  },

  // Profil de l'utilisateur connecté
  async getMe() {
    try {
      const data = await request('/auth/profile', { auth: true });
      const profile = unwrapData(data) || data;
      if (profile) {
        safeSetItem('user', JSON.stringify(profile));
      }
      return profile;
    } catch (error) {
      console.error("Erreur getMe:", error);
      throw error;
    }
  },

  // Met à jour le profil
  async updateProfile(profileData) {
    try {
      const data = await request('/auth/profile', {
        method: 'PUT',
        body: profileData,
        auth: true
      });
      const updatedUser = unwrapData(data) || data;
      if (updatedUser) {
        safeSetItem('user', JSON.stringify(updatedUser));
      }
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Erreur updateProfile:", error);
      throw error;
    }
  },

  // Change le rôle d'un utilisateur (Admin)
  async updateUserRole(userId, role) {
    try {
      const data = await request(`/auth/role/${userId}`, {
        method: 'PUT',
        body: { role },
        auth: true
      });
      return { success: true, data: unwrapData(data) };
    } catch (error) {
      console.error("Erreur updateUserRole:", error);
      return { success: false, message: error.message };
    }
  },

  // Déconnexion
  logout() {
    safeRemoveItem('token');
    safeRemoveItem('user');
  },

  // PRODUITS

  // Liste des produits (filtres, tri et pagination via params)
  async getProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const path = queryString ? `/products?${queryString}` : '/products';
      const data = await request(path);
      const products = unwrapData(data) || [];
      return Array.isArray(products) ? products.map(transformProduct) : [];
    } catch (error) {
      console.error("Erreur getProducts:", error);
      return [];
    }
  },

  // Produits mis en avant (page d'accueil)
  async getFeaturedProducts() {
    try {
      const data = await request('/products/featured');
      const products = unwrapData(data) || [];
      return Array.isArray(products) ? products.map(transformProduct) : [];
    } catch (error) {
      console.error("Erreur getFeaturedProducts:", error);
      return [];
    }
  },

  // Un produit par son id
  async getProductById(id) {
    try {
      const data = await request(`/products/${id}`);
      const product = unwrapData(data);
      return product ? transformProduct(product) : null;
    } catch (error) {
      console.error("Erreur getProductById:", error);
      return null;
    }
  },

  // CATEGORIES & UNIVERS

  // Liste des catégories
  async getCategories() {
    try {
      const data = await request('/categories');
      return unwrapData(data) || [];
    } catch (error) {
      console.error("Erreur getCategories:", error);
      return [];
    }
  },


  // Liste des univers
  async getUniverses() {
    try {
      const data = await request('/universes');
      const universes = unwrapData(data);
      return Array.isArray(universes) ? universes : [];
    } catch (error) {
      console.error("Erreur getUniverses:", error);
      return [];
    }
  },

  // Alias de getUniverses
  async getCollections() {
    return this.getUniverses();
  },

  // PANIER (AUTH)

  // Récupère le panier
  async getCart() {
    try {
      const data = await request('/cart', { auth: true });
      return unwrapData(data) || { items: [], total: 0 };
    } catch (error) {
      console.error("Erreur getCart:", error);
      return { items: [], total: 0 };
    }
  },

  // Ajoute un produit au panier
  async addToCart(productId, quantity = 1) {
    const data = await request(`/cart/${productId}`, {
      method: 'POST',
      body: { quantity },
      auth: true
    });
    return unwrapData(data);
  },

  // Modifie la quantité d'un produit du panier
  async updateCartItem(productId, quantity) {
    const data = await request(`/cart/${productId}`, {
      method: 'PUT',
      body: { quantity },
      auth: true
    });
    return unwrapData(data);
  },

  // Retire un produit du panier
  async removeFromCart(productId) {
    const data = await request(`/cart/${productId}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // Vide le panier
  async clearCart() {
    const data = await request('/cart', {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // COMMANDE

  // Crée une commande à partir du panier
  async createOrder(orderData = {}) {
    const data = await request('/orders', {
      method: 'POST',
      body: orderData,
      auth: true
    });
    return unwrapData(data);
  },

  // Mes commandes
  async getOrders() {
    try {
      const data = await request('/orders', { auth: true });
      const orders = unwrapData(data) || [];
      return { data: Array.isArray(orders) ? orders : [] };
    } catch (error) {
      console.error("Erreur getOrders:", error);
      return { data: [] };
    }
  },

  // Toutes les commandes
  async getAllOrders() {
    try {
      const data = await request('/orders/admin/all', { auth: true });
      const orders = unwrapData(data) || [];
      return Array.isArray(orders) ? orders : [];
    } catch (error) {
      console.error("Erreur getAllOrders:", error);
      return [];
    }
  },

  // Change le statut et le n° de suivi d'une commande
  async updateOrderStatus(orderId, status, trackingNumber = null) {
    const body = { status };
    if (trackingNumber) body.trackingNumber = trackingNumber;

    const data = await request(`/orders/admin/${orderId}/status`, {
      method: 'PATCH',
      body,
      auth: true
    });
    return unwrapData(data);
  },

  // FAVORIS 

  async getFavorites() {
    try {
      const data = await request('/favorites', { auth: true });
      const favorites = unwrapData(data) || [];
      const formattedFavorites = favorites.map(fav => ({
        id: fav.product?._id || fav._id || fav.id,
        nom: fav.product?.name || fav.name || fav.nom,
        prix: fav.product?.price || fav.price || fav.prix,
        image: normalizeImageUrl(fav.product?.image || fav.image),
        collection: fav.product?.universe?.name || fav.collection,
        ...fav
      }));
      return { data: formattedFavorites };
    } catch (error) {
      console.error("Erreur getFavorites:", error);
      return { data: [] };
    }
  },

  // Ajoute un produit aux favoris
  async addFavorite(productId) {
    const data = await request(`/favorites/${productId}`, {
      method: 'POST',
      auth: true
    });
    return unwrapData(data);
  },

  // Retire un produit des favoris
  async removeFavorite(productId) {
    const data = await request(`/favorites/${productId}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // ADMIN - UPLOAD 

  // Envoie une image au serveur et renvoie son URL
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const data = await request('/upload', {
      method: 'POST',
      body: formData,
      isFormData: true,
      auth: true
    });

    const result = unwrapData(data) || data;
    // URL absolue pour l'image renvoyée
    if (result.url) {
      result.url = normalizeImageUrl(result.url);
    }
    return result;
  },

  // ADMIN - Utilisateurs 

  //Liste des utilisateurs
  async getAllUsers() {
    try {
      const data = await request('/users', { auth: true });
      const users = unwrapData(data) || [];
      return Array.isArray(users) ? users : [];
    } catch (error) {
      console.error("Erreur getAllUsers:", error);
      return [];
    }
  },

  // Supprime un utilisateur
  async deleteUser(userId) {
    const data = await request(`/users/${userId}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // ADMIN PRODUITS

  // Crée un produit
  async createProduct(productData) {
    const data = await request('/products', {
      method: 'POST',
      body: productData,
      auth: true
    });
    return unwrapData(data);
  },

  // Modifie un produit
  async updateProduct(id, productData) {
    const data = await request(`/products/${id}`, {
      method: 'PUT',
      body: productData,
      auth: true
    });
    return unwrapData(data);
  },

  // Supprime un produit
  async deleteProduct(id) {
    const data = await request(`/products/${id}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  }
};

export default animeApi;
