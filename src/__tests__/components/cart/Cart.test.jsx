import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import Cart from '../../../components/cart/Cart';

const mockCartItems = [
  {
    id: 'P1',
    name: 'Producto 1',
    price: 1000,
    quantity: 2,
    image: '/test1.jpg',
    unit: 'kg'
  },
  {
    id: 'P2',
    name: 'Producto 2',
    price: 2000,
    quantity: 1,
    image: '/test2.jpg',
    unit: 'kg'
  }
];

const renderWithCartContext = (ui, { cartItems = [], ...contextValues } = {}) => {
  const cartContextValue = {
    cart: cartItems,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    getTotal: () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    ...contextValues
  };

  return render(
    <MemoryRouter>
      <CartContext.Provider value={cartContextValue}>
        {ui}
      </CartContext.Provider>
    </MemoryRouter>
  );
};

describe('Cart', () => {
  it('renders empty cart message when cart is empty', () => {
    renderWithCartContext(<Cart />);
    expect(screen.getByText(/carrito está vacío/i)).toBeInTheDocument();
  });

  it('renders cart items correctly', () => {
    renderWithCartContext(<Cart />, { cartItems: mockCartItems });
    
    mockCartItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price} CLP/${item.unit}`)).toBeInTheDocument();
    });
  });

  it('calculates and displays total correctly', () => {
    renderWithCartContext(<Cart />, { cartItems: mockCartItems });
    const total = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    expect(screen.getByText(`$${total} CLP`)).toBeInTheDocument();
  });

  it('calls removeItem when remove button is clicked', () => {
    const removeItem = jest.fn();
    renderWithCartContext(<Cart />, { 
      cartItems: mockCartItems,
      removeItem 
    });

    const removeButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(removeButtons[0]);
    
    expect(removeItem).toHaveBeenCalledWith(mockCartItems[0].id);
  });

  it('calls clearCart when clear cart button is clicked', () => {
    const clearCart = jest.fn();
    renderWithCartContext(<Cart />, { 
      cartItems: mockCartItems,
      clearCart 
    });

    fireEvent.click(screen.getByText(/vaciar carrito/i));
    expect(clearCart).toHaveBeenCalled();
  });

  it('updates quantity when quantity controls are used', () => {
    const updateQuantity = jest.fn();
    
    renderWithCartContext(<Cart />, { 
      cartItems: mockCartItems,
      updateQuantity
    });

    const incrementButtons = screen.getAllByRole('button', { name: /Incrementar cantidad/i });
    const decrementButtons = screen.getAllByRole('button', { name: /Decrementar cantidad/i });

    fireEvent.click(incrementButtons[0]);
    expect(updateQuantity).toHaveBeenCalledWith(mockCartItems[0].id, mockCartItems[0].quantity + 1);

    fireEvent.click(decrementButtons[0]);
    expect(updateQuantity).toHaveBeenCalledWith(mockCartItems[0].id, mockCartItems[0].quantity - 1);
  });
});