import React from 'react';
import { render, renderHook, act } from '@testing-library/react';
import { CartContext, CartProvider, useCart } from '../context/CartContext';

// Mock de useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('CartContext', () => {
  const mockCart = [
    { id: 1, name: 'Product 1', price: 1000, quantity: 2 },
    { id: 2, name: 'Product 2', price: 2000, quantity: 1 }
  ];

  const wrapper = ({ children }) => (
    <CartProvider>
      {children}
    </CartProvider>
  );

  test('useCart hook provides cart functionality', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    expect(result.current.cart).toEqual([]);
    expect(typeof result.current.addItem).toBe('function');
    expect(typeof result.current.removeItem).toBe('function');
    expect(result.current.getTotal()).toBe(0);
  });

  test('addItem adds items to cart correctly', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = { code: '1', nombre: 'Test Product', precioCLP: 1000 };
    await act(async () => {
      result.current.addItem(product);
    });
    
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({
      code: '1',
      name: 'Test Product',
      price: 1000,
      qty: 1,
      subtotal: 1000
    });
  });

  test('removeItem removes items from cart', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = { code: '1', nombre: 'Test Product', precioCLP: 1000 };
    await act(async () => {
      result.current.addItem(product);
      result.current.removeItem('1');
    });
    
    expect(result.current.cart).toHaveLength(0);
  });

  test('cart total is calculated correctly', async () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product1 = { code: '1', nombre: 'Product 1', precioCLP: 1000 };
    const product2 = { code: '2', nombre: 'Product 2', precioCLP: 2000 };
    
    await act(async () => {
      result.current.addItem(product1);
      result.current.addItem(product1); // Add twice
      result.current.addItem(product2);
    });
    
    expect(result.current.getTotal()).toBe(4000); // (2 * 1000) + (1 * 2000)
  });
});