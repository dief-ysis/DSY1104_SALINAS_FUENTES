import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartTotal,
  selectCartItemCount
} from '../../redux/slices/cartSlice';
import { formatearPrecio } from '../../utils/formatters';

describe('cartSlice', () => {
  const mockProduct = {
    id: 'P1',
    nombre: 'Producto Test',
    precioCLP: 1000,
    stock: 10
  };

  let initialState;

  beforeEach(() => {
    localStorage.clear();
    initialState = {
      items: []
    };
  });

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: []
    });
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      const actual = cartReducer(initialState, addToCart({
        product: mockProduct,
        quantity: 1
      }));
      
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toMatchObject({
        id: 'P1',
        name: 'Producto Test',
        price: 1000,
        quantity: 1
      });
    });

    it('should increase quantity for existing item', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct,
        quantity: 1
      }));

      state = cartReducer(state, addToCart({
        product: mockProduct,
        quantity: 1
      }));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });

    it('should throw error when exceeding stock', () => {
      const productWithLowStock = { ...mockProduct, stock: 1 };
      
      expect(() => {
        cartReducer(initialState, addToCart({
          product: productWithLowStock,
          quantity: 2
        }));
      }).toThrow('Stock insuficiente');
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct
      }));

      state = cartReducer(state, removeFromCart(mockProduct.id));
      expect(state.items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct
      }));

      state = cartReducer(state, updateQuantity({
        productId: mockProduct.id,
        quantity: 3
      }));

      expect(state.items[0].quantity).toBe(3);
    });

    it('should remove item when quantity is 0', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct
      }));

      state = cartReducer(state, updateQuantity({
        productId: mockProduct.id,
        quantity: 0
      }));

      expect(state.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct
      }));

      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    it('should calculate total correctly', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct,
        quantity: 2
      }));

      const total = selectCartTotal({ cart: state });
      expect(total).toBe(formatearPrecio(2000));
    });

    it('should calculate item count correctly', () => {
      let state = cartReducer(initialState, addToCart({
        product: mockProduct,
        quantity: 2
      }));

      const count = selectCartItemCount({ cart: state });
      expect(count).toBe(2);
    });
  });
});