import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const renderWithContext = (component) => {
  const mockCartContext = {
    getItemCount: () => 0,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    cartItems: [],
  };

  const mockAuthContext = {
    user: null,
    isAuthenticated: false,
    login: jest.fn(),
    logout: jest.fn(),
  };

  return render(
    <BrowserRouter>
      <CartContext.Provider value={mockCartContext}>
        <AuthContext.Provider value={mockAuthContext}>
          {component}
        </AuthContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderWithContext(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('has correct logo', () => {
    renderWithContext(<Navbar />);
    const logo = screen.getByAltText(/Logo de Huerto Hogar/i);
    expect(logo).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderWithContext(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /Menú/i });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows cart icon with item count', () => {
    renderWithContext(<Navbar />);
    expect(screen.getByText('🛒')).toBeInTheDocument();
  });
});