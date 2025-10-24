import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

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

const renderNavbar = (cartCtx = mockCartContext, authCtx = mockAuthContext) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={cartCtx}>
        <AuthContext.Provider value={authCtx}>
          <Navbar />
        </AuthContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('Navbar Navigation', () => {
  it('renders navigation element', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderNavbar();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders home link', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders products link', () => {
    renderNavbar();
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  it('renders cart icon', () => {
    renderNavbar({ ...mockCartContext, getItemCount: () => 3 });
    expect(screen.getByText('🛒')).toBeInTheDocument();
  });

  it('renders login link when not authenticated', () => {
    renderNavbar(mockCartContext, { ...mockAuthContext, isAuthenticated: false });
    const loginLink = screen.queryByRole('link', { name: /iniciar/i }) || screen.queryByText(/iniciar/i);
    expect(loginLink).toBeTruthy();
  });

  it('renders logout button when authenticated', () => {
    renderNavbar(mockCartContext, { 
      ...mockAuthContext, 
      isAuthenticated: true,
      user: { name: 'Juan' }
    });
    const logoutButton = screen.queryByRole('button', { name: /cerrar/i }) || screen.queryByText(/cerrar/i);
    expect(logoutButton).toBeTruthy();
  });

  it('renders blog navigation link', () => {
    renderNavbar();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders contact navigation link', () => {
    renderNavbar();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });
});
