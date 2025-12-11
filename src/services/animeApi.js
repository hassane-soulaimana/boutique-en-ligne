// Service pour l'API Anime Chess
import API_URL from "./api";
const API_BASE_URL = `${API_URL}/api`;

// ============ HELPERS ============

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

  // ============ AUTH ============
  // POST /api/auth/register
  async register(userData) {
    try {
      const data = await request('/auth/register', {
        method: 'POST',
        body: userData
      });

      const responseData = unwrapData(data) || data;
      const token = responseData?.token || data?.token;
      const user = responseData?.user || data?.user;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { success: true, data: responseData };
    } catch (error) {
      console.error("Erreur inscription:", error);
      return { success: false, message: error.message };
    }
  },

  // POST /api/auth/login
  async login(credentials) {
    try {
      const data = await request('/auth/login', {
        method: 'POST',
        body: credentials
      });

      const responseData = unwrapData(data) || data;
      const token = responseData?.token || data?.token;
      const user = responseData?.user || data?.user;

      if (token) {
        localStorage.setItem('token', token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return { success: true, data: responseData, user, token };
    } catch (error) {
      console.error("Erreur connexion:", error);
      throw error;
    }
  },

  // GET /api/auth/profile (auth)
  async getMe() {
    try {
      const data = await request('/auth/profile', { auth: true });
      const profile = unwrapData(data) || data;
      if (profile) {
        localStorage.setItem('user', JSON.stringify(profile));
      }
      return profile;
    } catch (error) {
      console.error("Erreur getMe:", error);
      throw error;
    }
  },

  // PUT /api/auth/profile (auth)
  async updateProfile(profileData) {
    try {
      const data = await request('/auth/profile', {
        method: 'PUT',
        body: profileData,
        auth: true
      });
      const updatedUser = unwrapData(data) || data;
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error("Erreur updateProfile:", error);
      throw error;
    }
  },

  // PUT /api/auth/password (auth)
  async updatePassword(passwordData) {
    try {
      const data = await request('/auth/password', {
        method: 'PUT',
        body: passwordData,
        auth: true
      });
      return { success: true, data: unwrapData(data) };
    } catch (error) {
      console.error("Erreur updatePassword:", error);
      throw error;
    }
  },

  // Déconnexion (local)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // ============ PRODUITS ============
  // GET /api/products — liste avec filtres/tri/pagination
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

  // GET /api/products/featured — produits mis en avant
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

  // GET /api/products/:id
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

  // Raccourcis pour filtres
  async getProductsByCategory(category) {
    return this.getProducts({ category });
  },

  async getProductsByUniverse(universe) {
    return this.getProducts({ universe });
  },

  async getProductsByCollection(collection) {
    return this.getProducts({ collection });
  },

  // ============ CATÉGORIES ============
  // GET /api/categories
  async getCategories() {
    try {
      const data = await request('/categories');
      return unwrapData(data) || [];
    } catch (error) {
      console.error("Erreur getCategories:", error);
      return [];
    }
  },

  // GET /api/categories/:id
  async getCategoryById(id) {
    try {
      const data = await request(`/categories/${id}`);
      return unwrapData(data);
    } catch (error) {
      console.error("Erreur getCategoryById:", error);
      return null;
    }
  },

  // GET /api/categories/:id/products
  async getCategoryProducts(categoryId) {
    try {
      const data = await request(`/categories/${categoryId}/products`);
      const products = unwrapData(data) || [];
      return Array.isArray(products) ? products.map(transformProduct) : [];
    } catch (error) {
      console.error("Erreur getCategoryProducts:", error);
      return [];
    }
  },

  // POST /api/categories (admin)
  async createCategory(categoryData) {
    const data = await request('/categories', {
      method: 'POST',
      body: categoryData,
      auth: true
    });
    return unwrapData(data);
  },

  // PUT /api/categories/:id (admin)
  async updateCategory(id, categoryData) {
    const data = await request(`/categories/${id}`, {
      method: 'PUT',
      body: categoryData,
      auth: true
    });
    return unwrapData(data);
  },

  // DELETE /api/categories/:id (admin)
  async deleteCategory(id) {
    const data = await request(`/categories/${id}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // ============ UNIVERS ============
  // GET /api/universes
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

  // GET /api/universes/:id
  async getUniverseById(id) {
    try {
      const data = await request(`/universes/${id}`);
      return unwrapData(data);
    } catch (error) {
      console.error("Erreur getUniverseById:", error);
      return null;
    }
  },

  // GET /api/universes/:id/products
  async getUniverseProducts(universeId) {
    try {
      const data = await request(`/universes/${universeId}/products`);
      const products = unwrapData(data) || [];
      return Array.isArray(products) ? products.map(transformProduct) : [];
    } catch (error) {
      console.error("Erreur getUniverseProducts:", error);
      return [];
    }
  },

  // POST /api/universes (admin)
  async createUniverse(universeData) {
    const data = await request('/universes', {
      method: 'POST',
      body: universeData,
      auth: true
    });
    return unwrapData(data);
  },

  // PUT /api/universes/:id (admin)
  async updateUniverse(id, universeData) {
    const data = await request(`/universes/${id}`, {
      method: 'PUT',
      body: universeData,
      auth: true
    });
    return unwrapData(data);
  },

  // DELETE /api/universes/:id (admin)
  async deleteUniverse(id) {
    const data = await request(`/universes/${id}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // Alias pour compatibilité
  async getCollections() {
    return this.getUniverses();
  },

  // ============ PANIER (AUTH) ============
  // GET /api/cart (auth)
  async getCart() {
    try {
      const data = await request('/cart', { auth: true });
      return unwrapData(data) || { items: [], total: 0 };
    } catch (error) {
      console.error("Erreur getCart:", error);
      return { items: [], total: 0 };
    }
  },

  // POST /api/cart/:productId (auth) — ajouter
  async addToCart(productId, quantity = 1) {
    const data = await request(`/cart/${productId}`, {
      method: 'POST',
      body: { quantity },
      auth: true
    });
    return unwrapData(data);
  },

  // PUT /api/cart/:productId (auth) — mettre à jour quantité
  async updateCartItem(productId, quantity) {
    const data = await request(`/cart/${productId}`, {
      method: 'PUT',
      body: { quantity },
      auth: true
    });
    return unwrapData(data);
  },

  // DELETE /api/cart/:productId (auth) — retirer un item
  async removeFromCart(productId) {
    const data = await request(`/cart/${productId}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // DELETE /api/cart (auth) — vider le panier
  async clearCart() {
    const data = await request('/cart', {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // ============ COMMANDES ============
  // POST /api/orders (auth) — créer la commande depuis le panier
  async createOrder(orderData = {}) {
    const data = await request('/orders', {
      method: 'POST',
      body: orderData,
      auth: true
    });
    return unwrapData(data);
  },

  // GET /api/orders (auth) — mes commandes
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

  // GET /api/orders/:id (auth) — détail
  async getOrderById(id) {
    try {
      const data = await request(`/orders/${id}`, { auth: true });
      return unwrapData(data);
    } catch (error) {
      console.error("Erreur getOrderById:", error);
      return null;
    }
  },

  // GET /api/orders/admin/all (admin)
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

  // GET /api/orders/admin/stats (admin)
  async getOrderStats() {
    try {
      const data = await request('/orders/admin/stats', { auth: true });
      return unwrapData(data);
    } catch (error) {
      console.error("Erreur getOrderStats:", error);
      return null;
    }
  },

  // PATCH /api/orders/admin/:id/status (admin) — changer statut + tracking
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

  // ============ FAVORIS (AUTH) ============
  // GET /api/favorites (auth)
  async getFavorites() {
    try {
      const data = await request('/favorites', { auth: true });
      const favorites = unwrapData(data) || [];
      const formattedFavorites = favorites.map(fav => ({
        id: fav.product?._id || fav._id || fav.id,
        nom: fav.product?.name || fav.name || fav.nom,
        prix: fav.product?.price || fav.price || fav.prix,
        image: normalizeImageUrl(fav.product?.image || fav.image),
        ...fav
      }));
      return { data: formattedFavorites };
    } catch (error) {
      console.error("Erreur getFavorites:", error);
      return { data: [] };
    }
  },

  // POST /api/favorites/:productId (auth)
  async addFavorite(productId) {
    const data = await request(`/favorites/${productId}`, {
      method: 'POST',
      auth: true
    });
    return unwrapData(data);
  },

  // DELETE /api/favorites/:productId (auth)
  async removeFavorite(productId) {
    const data = await request(`/favorites/${productId}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // GET /api/favorites/check/:productId (auth)
  async checkFavorite(productId) {
    try {
      const data = await request(`/favorites/check/${productId}`, { auth: true });
      return unwrapData(data);
    } catch (error) {
      console.error("Erreur checkFavorite:", error);
      return { isFavorite: false };
    }
  },

  // PUT /api/favorites/toggle/:productId (auth)
  async toggleFavorite(productId) {
    const data = await request(`/favorites/toggle/${productId}`, {
      method: 'PUT',
      auth: true
    });
    return unwrapData(data);
  },

  // ============ UPLOAD (ADMIN) ============
  // POST /api/upload (admin) — upload d'une image
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
    // Normaliser l'URL de l'image retournée
    if (result.url) {
      result.url = normalizeImageUrl(result.url);
    }
    return result;
  },

  // ============ ADMIN - UTILISATEURS ============
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

  async deleteUser(userId) {
    const data = await request(`/users/${userId}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // ============ ADMIN - PRODUITS (si activés) ============
  async createProduct(productData) {
    const data = await request('/products', {
      method: 'POST',
      body: productData,
      auth: true
    });
    return unwrapData(data);
  },

  async updateProduct(id, productData) {
    const data = await request(`/products/${id}`, {
      method: 'PUT',
      body: productData,
      auth: true
    });
    return unwrapData(data);
  },

  async deleteProduct(id) {
    const data = await request(`/products/${id}`, {
      method: 'DELETE',
      auth: true
    });
    return unwrapData(data);
  },

  // ============ STATS (ADMIN) ============
  async getStats() {
    try {
      return await this.getOrderStats();
    } catch (error) {
      console.error("Erreur getStats:", error);
      return null;
    }
  }
};

export default animeApi;