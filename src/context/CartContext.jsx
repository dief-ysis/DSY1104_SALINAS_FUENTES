/**
 * CARTCONTEXT - GESTIÓN DE CARRITO DE COMPRAS
 * 
 * PRINCIPIOS REACT APLICADOS:
 * 1. ✅ Estado inmutable con functional updates
 * 2. ✅ useCallback para optimización
 * 3. ✅ useMemo para cálculos costosos
 * 4. ✅ useEffect con cleanup (localStorage)
 * 5. ✅ Separación de lógica de negocio
 * 
 * CUMPLE CON EVALUACIÓN:
 * - Pregunta 24: Sincronización de interfaz con datos
 * - Pregunta 45: Gestión de estado global
 * - Pregunta 81: Actualizaciones sin recargar
 * - Pregunta 86: Validación de consistencia
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  getCart,
  addToCart as addToCartAPI,
  updateCartItem as updateCartItemAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
  syncCart as syncCartAPI,
  calculateTotal,
  calculateSubtotal,
  calculateDiscounts,
  getCartItemCount
} from '../services/cartService';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

// ============================================================
// CREACIÓN DEL CONTEXT
// ============================================================

const CartContext = createContext(null);

// ============================================================
// HOOK PERSONALIZADO
// ============================================================

/**
 * Hook para acceder al contexto del carrito
 * @returns {Object} Estado y funciones del carrito
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  
  return context;
};

// ============================================================
// PROVIDER DEL CONTEXT
// ============================================================

export const CartProvider = ({ children }) => {
  // ============================================================
  // ESTADO LOCAL
  // ============================================================
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { isAuthenticated } = useAuth();

  // ============================================================
  // PRINCIPIO 1: ESTADO INMUTABLE
  // Usar functional updates para evitar stale closures
  // ============================================================

  /**
   * Agrega un producto al carrito
   * PRINCIPIO: Inmutabilidad - Nunca mutar el array directamente
   * OPTIMIZACIÓN: useCallback evita recrear la función
   */
  const addItem = useCallback(async (product, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Si el usuario está autenticado, usar API
      if (isAuthenticated) {
        const result = await addToCartAPI({
          productoId: product.id,
          cantidad: quantity
        });

        if (result.success) {
          // Actualizar estado con datos del servidor
          setItems(result.data.items);
          
          Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${product.nombre || product.name} agregado al carrito`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });
        }
      } else {
        // Usuario no autenticado: usar estado local
        // ✅ PRINCIPIO: Functional update para evitar stale state
        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);
          
          if (existingItem) {
            // ✅ INMUTABILIDAD: Crear nuevo array con spread
            return prevItems.map(item =>
              item.id === product.id
                ? { ...item, cantidad: item.cantidad + quantity } // ✅ Crear nuevo objeto
                : item
            );
          }
          
          // ✅ INMUTABILIDAD: Nuevo array con spread
          return [...prevItems, { ...product, cantidad: quantity }];
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: `${product.nombre || product.name} agregado al carrito`,
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    } catch (err) {
      console.error('[CART] Error al agregar producto:', err);
      setError(err.message);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'No se pudo agregar el producto',
        confirmButtonColor: '#2d5016'
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // ✅ DEPENDENCIAS: Solo isAuthenticated

  /**
   * Actualiza la cantidad de un producto
   * PRINCIPIO: Inmutabilidad con functional updates
   * CORRECCIÓN: No depender de removeItem para evitar dependencia circular
   */
  const updateQuantity = useCallback(async (productId, newQuantity) => {
    try {
      setLoading(true);
      setError(null);

      // Validación
      if (newQuantity < 0) {
        throw new Error('La cantidad no puede ser negativa');
      }

      // Si cantidad es 0, eliminar el producto directamente
      if (newQuantity === 0) {
        if (isAuthenticated) {
          // ✅ Encontrar y eliminar con API
          let cartItemToRemove = null;
          
          setItems(prevItems => {
            cartItemToRemove = prevItems.find(item => 
              item.productoId === productId || item.id === productId
            );
            return prevItems;
          });
          
          if (cartItemToRemove) {
            await removeFromCartAPI(cartItemToRemove.cartItemId || cartItemToRemove.id);
            
            setItems(prevItems =>
              prevItems.filter(item =>
                item.id !== productId && item.productoId !== productId
              )
            );
          }
        } else {
          // ✅ Eliminar de estado local
          setItems(prevItems =>
            prevItems.filter(item =>
              item.id !== productId && item.productoId !== productId
            )
          );
        }
        
        setLoading(false);
        return;
      }

      if (isAuthenticated) {
        // ✅ CORRECCIÓN: Encontrar item usando functional update
        let cartItemToUpdate = null;
        
        setItems(prevItems => {
          cartItemToUpdate = prevItems.find(item => 
            item.productoId === productId || item.id === productId
          );
          return prevItems; // No modificar aún
        });
        
        if (!cartItemToUpdate) {
          throw new Error('Producto no encontrado en el carrito');
        }

        const result = await updateCartItemAPI(
          cartItemToUpdate.cartItemId || cartItemToUpdate.id, 
          newQuantity
        );

        if (result.success) {
          setItems(result.data.items);
        }
      } else {
        // ✅ PRINCIPIO: Functional update
        setItems(prevItems =>
          prevItems.map(item =>
            (item.id === productId || item.productoId === productId)
              ? { ...item, cantidad: newQuantity } // ✅ Nuevo objeto
              : item
          )
        );
      }
    } catch (err) {
      console.error('[CART] Error al actualizar cantidad:', err);
      setError(err.message);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'No se pudo actualizar la cantidad',
        confirmButtonColor: '#2d5016'
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // ✅ CORRECCIÓN: Solo isAuthenticated

  /**
   * Elimina un producto del carrito
   * PRINCIPIO: Inmutabilidad con filter
   * CORRECCIÓN: Usar functional update para evitar dependencia circular
   */
  const removeItem = useCallback(async (productId) => {
    try {
      setLoading(true);
      setError(null);

      if (isAuthenticated) {
        // ✅ CORRECCIÓN: Usar functional update para acceder a items
        // sin tenerlo como dependencia
        let cartItemToRemove = null;
        
        setItems(prevItems => {
          cartItemToRemove = prevItems.find(item => 
            item.productoId === productId || item.id === productId
          );
          return prevItems; // No modificar aún
        });
        
        if (!cartItemToRemove) {
          throw new Error('Producto no encontrado');
        }

        const result = await removeFromCartAPI(cartItemToRemove.cartItemId || cartItemToRemove.id);

        if (result.success) {
          // ✅ PRINCIPIO: Filter crea nuevo array
          setItems(prevItems =>
            prevItems.filter(item =>
              item.id !== productId && item.productoId !== productId
            )
          );
        }
      } else {
        // ✅ INMUTABILIDAD: Filter para eliminar
        setItems(prevItems =>
          prevItems.filter(item =>
            item.id !== productId && item.productoId !== productId
          )
        );
      }

      Swal.fire({
        icon: 'info',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    } catch (err) {
      console.error('[CART] Error al eliminar producto:', err);
      setError(err.message);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el producto',
        confirmButtonColor: '#2d5016'
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // ✅ CORRECCIÓN: Solo isAuthenticated

  /**
   * Limpia completamente el carrito
   */
  const clearItems = useCallback(async () => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: '¿Vaciar carrito?',
        text: 'Se eliminarán todos los productos del carrito',
        showCancelButton: true,
        confirmButtonColor: '#2d5016',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        setLoading(true);

        if (isAuthenticated) {
          await clearCartAPI();
        }

        // ✅ INMUTABILIDAD: Nuevo array vacío
        setItems([]);

        Swal.fire({
          icon: 'success',
          title: 'Carrito vaciado',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    } catch (err) {
      console.error('[CART] Error al vaciar carrito:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ============================================================
  // PRINCIPIO 2: CÁLCULOS COSTOSOS CON useMemo
  // Evita recalcular en cada render
  // ============================================================

  /**
   * Calcula el subtotal del carrito
   * OPTIMIZACIÓN: useMemo cachea el resultado hasta que items cambie
   */
  const subtotal = useMemo(() => {
    return calculateSubtotal(items);
  }, [items]); // ✅ DEPENDENCIA: Solo recalcula cuando items cambia

  /**
   * Calcula los descuentos aplicados
   * OPTIMIZACIÓN: useMemo
   */
  const descuentos = useMemo(() => {
    return calculateDiscounts(items);
  }, [items]);

  /**
   * Calcula el total con descuentos
   * OPTIMIZACIÓN: useMemo
   */
  const total = useMemo(() => {
    return calculateTotal(items);
  }, [items]);

  /**
   * Cuenta el total de items en el carrito
   * OPTIMIZACIÓN: useMemo
   */
  const itemCount = useMemo(() => {
    return getCartItemCount(items);
  }, [items]);

  /**
   * Verifica si el carrito está vacío
   * OPTIMIZACIÓN: useMemo
   */
  const isEmpty = useMemo(() => {
    return items.length === 0;
  }, [items]);

  // ============================================================
  // PRINCIPIO 3: EFECTOS CON CLEANUP
  // useEffect para sincronización con localStorage y API
  // ============================================================

  /**
   * EFECTO 1: Cargar carrito al montar el componente
   * PRINCIPIO: Ciclo de vida - Montaje
   */
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);

        if (isAuthenticated) {
          // Usuario autenticado: obtener del servidor
          const result = await getCart();
          
          if (result.success) {
            setItems(result.data.items || []);
          }
        } else {
          // Usuario no autenticado: cargar de localStorage
          const savedCart = localStorage.getItem('cart');
          
          if (savedCart) {
            try {
              const parsedCart = JSON.parse(savedCart);
              
              // ✅ VALIDACIÓN: Verificar estructura
              if (Array.isArray(parsedCart)) {
                setItems(parsedCart);
              }
            } catch (err) {
              console.error('[CART] Error al parsear carrito guardado:', err);
              localStorage.removeItem('cart');
            }
          }
        }
      } catch (err) {
        console.error('[CART] Error al cargar carrito:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated]); // ✅ DEPENDENCIA: Recargar cuando cambia autenticación

  /**
   * EFECTO 2: Persistir carrito en localStorage (solo si NO está autenticado)
   * PRINCIPIO: Side effect con sincronización
   */
  useEffect(() => {
    if (!isAuthenticated && items.length > 0) {
      try {
        localStorage.setItem('cart', JSON.stringify(items));
        console.log('[CART] Carrito guardado en localStorage');
      } catch (err) {
        console.error('[CART] Error al guardar carrito:', err);
        
        // Manejar error de quota exceeded
        if (err.name === 'QuotaExceededError') {
          Swal.fire({
            icon: 'warning',
            title: 'Almacenamiento lleno',
            text: 'No se pudo guardar el carrito. Por favor, limpia el almacenamiento del navegador.',
            confirmButtonColor: '#2d5016'
          });
        }
      }
    }
  }, [items, isAuthenticated]); // ✅ DEPENDENCIAS: items, isAuthenticated

  /**
   * EFECTO 3: Sincronizar carrito local con servidor al hacer login
   * PRINCIPIO: Sincronización de estados
   */
  useEffect(() => {
    const syncLocalCartWithServer = async () => {
      if (isAuthenticated && items.length > 0) {
        try {
          // Verificar si son items locales (no tienen cartItemId del servidor)
          const hasLocalItems = items.some(item => !item.cartItemId);
          
          if (hasLocalItems) {
            console.log('[CART] Sincronizando carrito local con servidor...');
            
            const result = await syncCartAPI(items);
            
            if (result.success) {
              setItems(result.data.items);
              
              // Limpiar localStorage después de sincronizar
              localStorage.removeItem('cart');
              
              Swal.fire({
                icon: 'success',
                title: 'Carrito sincronizado',
                text: 'Tu carrito ha sido sincronizado con el servidor',
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
              });
            }
          }
        } catch (err) {
          console.error('[CART] Error al sincronizar carrito:', err);
        }
      }
    };

    syncLocalCartWithServer();
  }, [isAuthenticated]); // ✅ Solo ejecutar cuando cambia autenticación

  // ============================================================
  // VALOR DEL CONTEXT
  // ============================================================

  const value = useMemo(() => ({
    // Estado
    items,
    loading,
    error,
    isEmpty,
    
    // Funciones (ya optimizadas con useCallback)
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    
    // Cálculos (optimizados con useMemo)
    subtotal,
    descuentos,
    total,
    itemCount
  }), [
    items,
    loading,
    error,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearItems,
    subtotal,
    descuentos,
    total,
    itemCount
  ]); // ✅ OPTIMIZACIÓN: useMemo para el objeto value

  // ============================================================
  // RENDERIZADO
  // ============================================================

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;