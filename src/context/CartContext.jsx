import { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('huertohogar-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('huertohogar-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
=======
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
>>>>>>> Prueba2-Entrega
}