import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { CartProvider } from '../context/CartContext';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    renderWithRouter(<Navbar />);
  });

  it('renders all navigation links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('has correct logo alt text', () => {
    const logo = screen.getByAltText(/logo de huerto hogar/i);
    expect(logo).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    const menuButton = screen.getByLabelText('Menú');
    const mobileMenu = screen.getByRole('navigation').querySelector('.navbar-menu');
    
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass('active');
    
    fireEvent.click(menuButton);
    expect(mobileMenu).not.toHaveClass('active');
  });

  it('shows cart with correct initial count', () => {
    const cartBadge = screen.getByText('0');
    expect(cartBadge).toBeInTheDocument();
  });
});