
import { createContext, useState, useEffect } from "react";
import { animeApi } from "../services/animeApi";

// eslint-disable-next-line react-refresh/only-export-components -- Context et Provider volontairement dans le même fichier
export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Récupère le token (si l'utilisateur est connecté)
  const getToken = () => localStorage.getItem("token");

//  Favoris
  const fetchFavorites = async () => {
    const { data } = await animeApi.getFavorites();
    setFavorites(data);
  };

  const addFavorite = async (product) => {
    setFavorites((prev) => (prev.some((f) => f.id === product.id) ? prev : [...prev, product]));

    if (!getToken()) return;

    try {
      await animeApi.addFavorite(product.id);
      await fetchFavorites();
    } catch (err) {
      console.error("Erreur ajout favoris:", err);
    }
  };

  const removeFavorite = async (id) => {
    // Mise à jour locale immédiate
    setFavorites((prev) => prev.filter((f) => f.id !== id));

    if (!getToken()) return;

    try {
      await animeApi.removeFavorite(id);
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
    const data = await animeApi.getCart();
    setLoading(false);

    const items = (data.items || []).map((it) => ({
      id: it.product._id,
      nom: it.product.name,
      prix: it.product.price,
      stock: it.product.stock,
      image: it.product.image,
      quantity: it.quantity,
    }));

    setCart(items);
  };

  // Auto load
  useEffect(() => {
    if (getToken()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- chargement volontaire au montage
      fetchCart();
      fetchFavorites();
    }
  }, []);

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

    await animeApi.addToCart(product.id, product.quantity || 1);
    fetchCart();
  };

  const removeItem = async (id) => {
    if (!getToken()) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }

    await animeApi.removeFromCart(id);
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

    await animeApi.updateCartItem(id, quantity);
    fetchCart();
  };

  const clearCart = async () => {
    if (!getToken()) return setCart([]);

    await animeApi.clearCart();
    setCart([]);
  };

// Calcul panier
  const getTotalItems = () =>
    cart.reduce((sum, i) => sum + i.quantity, 0);

  const getSubtotal = () =>
    cart.reduce((sum, i) => sum + i.prix * i.quantity, 0);

  return (
    <ShopContext.Provider
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
    </ShopContext.Provider>
  );
};
