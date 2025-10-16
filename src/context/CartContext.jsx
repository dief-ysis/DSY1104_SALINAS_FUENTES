import { createContext, useContext, useState, useEffect } from 'react';
import { formatearPrecio } from '../utils/formatters';

export const CartContext = createContext();

const STORAGE_KEY = 'carrito';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, qty = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.code === item.code);
      if (existingItem) {
        return prevCart.map(i => 
          i.code === item.code 
            ? { ...i, qty: i.qty + qty, subtotal: (i.qty + qty) * i.price }
            : i
        );
      }
      return [...prevCart, {
        code: item.code,
        name: item.nombre,
        price: item.precioCLP,
        qty,
        subtotal: qty * item.precioCLP
      }];
    });
  };

  const removeItem = (code) => {
    setCart(prevCart => prevCart.filter(i => i.code !== code));
  };

  const updateItem = (code, qty) => {
    setCart(prevCart => {
      if (qty <= 0) return prevCart.filter(i => i.code !== code);
      return prevCart.map(i => 
        i.code === code 
          ? { ...i, qty, subtotal: qty * i.price }
          : i
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  };

  const formatTotal = () => {
    return formatearPrecio(getTotal());
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateItem,
      clearCart,
      getTotal,
      getItemCount,
      formatTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}