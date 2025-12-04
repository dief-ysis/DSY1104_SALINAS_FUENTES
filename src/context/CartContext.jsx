import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  getCart,
  addToCart as addToCartAPI,
  updateCartItem as updateCartItemAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
  syncCart as syncCartAPI
} from '../services/cartService';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe ser usado dentro de un CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // --- TRADUCTOR UNIVERSAL (Corrige precios $0 y IDs) ---
  // Convierte cualquier estructura (Backend anidado o LocalStorage viejo) a un formato estándar
  const normalizeItems = (rawItems) => {
    if (!Array.isArray(rawItems)) return [];
    
    return rawItems.map(item => {
      // Detectar dónde está la info del producto (anidado o plano)
      const product = item.producto || item.product || item;
      
      return {
        // ID ÚNICO: Preferimos el ID del item del carrito, sino el del producto + timestamp
        cartItemId: item.id || item.cartItemId || `temp-${Date.now()}-${Math.random()}`,
        productId: product.id || item.productoId || item.productId,
        nombre: product.nombre || item.nombre || 'Producto sin nombre',
        precio: product.precio || item.precio || 0, // Arregla el $0
        imagen: product.imagen || item.imagen,
        categoria: product.categoria || item.categoria,
        stock: product.stock || item.stock || 99,
        cantidad: item.cantidad || item.quantity || 1
      };
    });
  };

  // Cargar carrito
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      if (isAuthenticated) {
        const result = await getCart();
        if (result.success) {
          // NORMALIZAMOS LOS DATOS APENAS LLEGAN
          setItems(normalizeItems(result.data.items));
        }
      } else {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setItems(normalizeItems(parsed));
            } catch (e) {
                console.error("Error leyendo localStorage", e);
                localStorage.removeItem('cart');
            }
        }
      }
    } catch (err) {
      console.error("Error cargando carrito", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Guardar en localStorage si no está logueado
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  // --- FUNCIONES DEL CARRITO ---

  const addItem = useCallback(async (product, quantity = 1) => {
    try {
      setLoading(true);
      if (isAuthenticated) {
        const result = await addToCartAPI({ productoId: product.id, cantidad: quantity });
        if (result.success) setItems(normalizeItems(result.data.items));
      } else {
        setItems(prev => {
          const existingIndex = prev.findIndex(i => i.productId === product.id);
          if (existingIndex >= 0) {
            const newItems = [...prev];
            newItems[existingIndex].cantidad += quantity;
            return newItems;
          }
          // Crear nuevo item formato normalizado
          return [...prev, {
            cartItemId: `local-${Date.now()}`,
            productId: product.id,
            nombre: product.nombre,
            precio: product.precio,
            imagen: product.imagen,
            categoria: product.categoria,
            stock: product.stock,
            cantidad: quantity
          }];
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Agregado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo agregar', 'error');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const updateQuantity = useCallback(async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Buscamos por cartItemId (prioridad) o productId
    const targetItem = items.find(i => i.cartItemId === id || i.productId === id);
    if (!targetItem) {
        console.error("Item no encontrado para actualizar:", id);
        return; // Salir silenciosamente para no romper la UI
    }

    try {
      setLoading(true);
      if (isAuthenticated) {
        // Usamos el ID real de la base de datos (cartItemId)
        const result = await updateCartItemAPI(targetItem.cartItemId, newQuantity);
        if (result.success) setItems(normalizeItems(result.data.items));
      } else {
        setItems(prev => prev.map(i => 
            (i.cartItemId === id || i.productId === id) ? { ...i, cantidad: newQuantity } : i
        ));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, items]);

  const removeItem = useCallback(async (id) => {
    const targetItem = items.find(i => i.cartItemId === id || i.productId === id);
    if (!targetItem) return;

    try {
      setLoading(true);
      if (isAuthenticated) {
        const result = await removeFromCartAPI(targetItem.cartItemId);
        if (result.success && result.data && result.data.items) {
            setItems(normalizeItems(result.data.items));
        } else {
            // Fallback si el backend no devuelve la lista
            setItems(prev => prev.filter(i => i.cartItemId !== targetItem.cartItemId));
            loadCart(); // Recargar para asegurar sincronía
        }
      } else {
        setItems(prev => prev.filter(i => i.cartItemId !== id && i.productId !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, items, loadCart]);

  const clearItems = useCallback(async () => {
    if (isAuthenticated) await clearCartAPI();
    setItems([]);
  }, [isAuthenticated]);

  // Cálculos
  const subtotal = items.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
  const total = subtotal;
  const itemCount = items.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <CartContext.Provider value={{
      items, loading, addItem, updateQuantity, removeItem, clearItems,
      subtotal, total, itemCount, isEmpty: items.length === 0
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;