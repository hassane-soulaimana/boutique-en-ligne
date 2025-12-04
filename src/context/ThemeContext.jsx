import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (product) => {
    setCart((cart) => {
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        return cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }

      return [...cart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart((cart) => cart.filter((item) => item.id !== id));
    } else {
      setCart((cart) =>
        cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getSubtotal = () =>
    cart.reduce((total, item) => total + item.prix * item.quantity, 0);

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
