/**
 * CART SERVICE - SERVICIO DE CARRITO
 */

import api from './api';

export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error al cargar carrito' };
  }
};

export const addToCart = async (item) => {
  try {
    const response = await api.post('/cart/items', item);
    return { success: true, data: response.data };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al agregar al carrito');
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/items/${itemId}`, { quantity });
    return { success: true, data: response.data };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar');
  }
};

export const removeFromCart = async (itemId) => {
  try {
    await api.delete(`/cart/items/${itemId}`);
    return { success: true };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar');
  }
};

export const clearCart = async () => {
  try {
    await api.delete('/cart');
    return { success: true };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al vaciar carrito');
  }
};

export const syncCart = async (localItems) => {
  try {
    const response = await api.post('/cart/sync', { items: localItems });
    return { success: true, data: response.data };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al sincronizar');
  }
};

export const calculateSubtotal = (items) => {
  // BLINDAJE: Si items es null o undefined, retorna 0
  if (!items || !Array.isArray(items)) return 0;

  return items.reduce((sum, item) => {
    const price = item.precio || item.price || 0;
    const quantity = item.cantidad || item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
};

export const calculateDiscounts = (items) => {
  if (!items || !Array.isArray(items)) return 0;

  return items.reduce((sum, item) => {
    const discount = item.descuento || item.discount || 0;
    return sum + discount;
  }, 0);
};

export const calculateTotal = (items) => {
  // calculateSubtotal ya maneja el null check, pero por seguridad:
  if (!items || !Array.isArray(items)) return 0;
  return calculateSubtotal(items) - calculateDiscounts(items);
};

export const getCartItemCount = (items) => {
  if (!items || !Array.isArray(items)) return 0;
  
  return items.reduce((sum, item) => sum + (item.cantidad || item.quantity || 1), 0);
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  syncCart,
  calculateSubtotal,
  calculateDiscounts,
  calculateTotal,
  getCartItemCount
};