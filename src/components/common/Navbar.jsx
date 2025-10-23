import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/assets/images/logo.png" alt="Logo de Huerto Hogar, tienda de productos orgánicos" />
        </Link>
        
        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger"></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/productos" 
            className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Productos
          </Link>
          <Link 
            to="/nosotros" 
            className={`nav-link ${location.pathname === '/nosotros' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Nosotros
          </Link>
          <Link 
            to="/blog" 
            className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Blog
          </Link>
          <Link 
            to="/contacto" 
            className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contacto
          </Link>
          
          <div className="cart-container">
            <Link 
              to="/carrito" 
              className="cart-button"
              aria-label="Ver carrito de compras"
              onClick={closeMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-badge" role="status" aria-live="polite">
                {getItemCount()}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}