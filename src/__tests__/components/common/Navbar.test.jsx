import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../../../components/common/Navbar';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';

const renderWithProviders = (ui, { cartItems = [], user = null } = {}) => {
  const cartContextValue = {
    cart: cartItems,
    getItemCount: () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addItem: jest.fn(),
    removeItem: jest.fn(),
    clearCart: jest.fn()
  };

  const authContextValue = {
    user,
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: !!user
  };

  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authContextValue}>
        <CartContext.Provider value={cartContextValue}>
          {ui}
        </CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
    expect(screen.getByText(/contacto/i)).toBeInTheDocument();
  });

  it('shows login button when user is not authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });

  it('shows user menu when authenticated', () => {
    const user = { name: 'Test User', email: 'test@example.com' };
    renderWithProviders(<Navbar />, { user });
    expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
  });

  it('displays correct cart count', () => {
    const cartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 }
    ];
    renderWithProviders(<Navbar />, { cartItems });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles menu toggle on mobile', () => {
    renderWithProviders(<Navbar />);
    const menuButton = screen.getByLabelText(/menú/i);
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toHaveClass('active');
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).not.toHaveClass('active');
  });
});