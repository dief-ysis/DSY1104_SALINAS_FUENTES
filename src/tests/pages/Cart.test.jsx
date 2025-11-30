import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../../pages/cart/Cart';
import { CartContext } from '../../context/CartContext';

const renderCart = (contextValue = {}) => {
  const defaultContext = {
    cart: [],
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    addItem: jest.fn(),
    clearCart: jest.fn(),
    ...contextValue
  };

  return render(
    <BrowserRouter>
      <CartContext.Provider value={defaultContext}>
        <Cart />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Cart Page', () => {
  it('renders cart page', () => {
    renderCart();
    // Just check that something renders without errors
    const container = document.querySelector('.container');
    expect(container).toBeTruthy();
  });

  it('shows empty cart message when no items', () => {
    renderCart({ cart: [] });
    // Cart shows h2 when empty
    const emptyMessage = screen.getByText('Tu carrito está vacío');
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders cart items when present', () => {
    const mockCart = [
      {
        id: 1,
        name: 'Tomate',
        price: 2000,
        quantity: 2,
        image: 'tomate.jpg'
      }
    ];
    
    renderCart({ cart: mockCart });
    expect(screen.getByText('Tomate')).toBeInTheDocument();
  });
});
