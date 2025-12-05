import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();


const API_URL = "/api";

export const ThemeProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Récupère le token (si l'utilisateur est connecté)
  const getToken = () => localStorage.getItem("token");

  // Helper simple pour appeler l'API.
  const api = async (url, method = "GET", body) => {
    const headers = { "Content-Type": "application/json" };
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;

    const res = await fetch(`${API_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return res.json();
  };

// Auto load
  useEffect(() => {
    const t = getToken();
    if (t) {
      fetchCart();
      fetchFavorites();
    }
  }, []);

//  Favoris 
  const fetchFavorites = async () => {
    const data = await api("/favorites");
    if (!data?.success) return;

    const favs = data.data.map((p) => ({
      id: p.product._id,
      nom: p.product.name,
      prix: p.product.price,
      image: `${API_URL}${p.product.image}`,
      collection: p.product.collection,
    }));

    setFavorites(favs);
  };

  const addFavorite = async (product) => {
    setFavorites((prev) => (prev.some((f) => f.id === product.id) ? prev : [...prev, product]));

    const t = getToken();
    if (!t) return;

    try {
      await api(`/favorites/${product.id}`, "POST");
      await fetchFavorites();
    } catch (err) {
      console.error("Erreur ajout favoris:", err);
    }
  };

  const removeFavorite = async (id) => {
    // Mise à jour locale immédiate
    setFavorites((prev) => prev.filter((f) => f.id !== id));

    const t = getToken();
    if (!t) return;

    try {
      await api(`/favorites/${id}`, "DELETE");
      await fetchFavorites();
    } catch (err) {
      console.error("Erreur suppression favoris:", err);
    }
  };

  const toggleFavorite = async (product) => {
    if (isFavorite(product.id)) {
      await removeFavorite(product.id);
    } else {
      await addFavorite(product);
    }
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  // Sauvegarde locale
  useEffect(() => {
    if (!getToken()) localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

// Panier

  const fetchCart = async () => {
    setLoading(true);

    const data = await api("/cart");
    setLoading(false);

    if (!data?.success || !data?.data?.items) return;

    const items = data.data.items.map((it) => ({
      id: it.product._id,
      nom: it.product.name,
      prix: it.product.price,
      stock: it.product.stock,
      image: `${API_URL}${it.product.image}`,
      quantity: it.quantity,
    }));

    setCart(items);
  };

  const addItem = async (product) => {
    if (!getToken()) {
      // mode hors connexion
      setCart((prev) => {
        const found = prev.find((i) => i.id === product.id);
        if (found)
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + (product.quantity || 1) }
              : i
          );
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      });
      return;
    }

    await api(`/cart/${product.id}`, "POST", {
      quantity: product.quantity || 1,
    });
    fetchCart();
  };

  const removeItem = async (id) => {
    if (!getToken()) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }

    await api(`/cart/${id}`, "DELETE");
    fetchCart();
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) return removeItem(id);

    if (!getToken()) {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
      return;
    }

      await api(`/cart/${id}`, "PUT", { quantity });
    fetchCart();
  };

  const clearCart = async () => {
    if (!getToken()) return setCart([]);

      await api("/cart", "DELETE");
    setCart([]);
  };

// Calcul panier
  const getTotalItems = () =>
    cart.reduce((sum, i) => sum + i.quantity, 0);

  const getSubtotal = () =>
    cart.reduce((sum, i) => sum + i.prix * i.quantity, 0);

  return (
    <ThemeContext.Provider
      value={{
        cart,
        favorites,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
