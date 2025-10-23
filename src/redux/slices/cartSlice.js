import { createSlice } from '@reduxjs/toolkit';
import { formatearPrecio } from '../../utils/formatters';

const STORAGE_KEY = 'huertohogar-cart';

// Recuperar estado inicial del localStorage
const loadInitialState = () => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadInitialState(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      
      // Normalizar producto
      const normalized = {
        id: product.id ?? product.code ?? product.codigo ?? null,
        name: product.name ?? product.nombre ?? product.titulo ?? '',
        price: Number(product.price ?? product.precioCLP ?? product.precio ?? 0),
        image: product.image ?? product.imagen ?? product.img ?? undefined,
        stock: Number(product.stock) ?? 10,
      };

      const existingItem = state.items.find(item => item.id === normalized.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > normalized.stock) {
          throw new Error('Stock insuficiente');
        }
        existingItem.quantity = newQuantity;
        existingItem.qty = newQuantity;
        existingItem.subtotal = newQuantity * normalized.price;
      } else {
        if (quantity > normalized.stock) {
          throw new Error('Stock insuficiente');
        }
        state.items.push({
          id: normalized.id,
          code: normalized.id,
          name: normalized.name,
          price: normalized.price,
          image: normalized.image,
          description: product.description ?? product.descripcion ?? '',
          quantity,
          qty: quantity,
          subtotal: quantity * normalized.price
        });
      }

      // Persistir en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId);
      } else {
        const item = state.items.find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
          item.qty = quantity;
          item.subtotal = quantity * item.price;
        }
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
  },
});

// Acciones
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectores
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => {
  const total = state.cart.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
  return formatearPrecio(total);
};

export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Reducer
export default cartSlice.reducer;