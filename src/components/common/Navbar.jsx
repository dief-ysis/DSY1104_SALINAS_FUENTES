import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export function Navbar() {
  const { getItemCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Actualizar contador del carrito
    setCartCount(getItemCount());
  }, [getItemCount]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="Ir a inicio">
          <img src="/assets/images/logo.png" alt="Logo de Huerto Hogar" width="40" height="40" />
        </Link>

        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-controls="navbar-menu"
          aria-label="Menú de navegación"
          aria-expanded={isMenuOpen}>
          <span className="navbar-toggle-icon"></span>
        </button>

        <div 
          id="navbar-menu" 
          className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}
        >
          <nav className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`} 
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className={`nav-link ${isActive('/productos')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              to="/blogs" 
              className={`nav-link ${isActive('/blogs')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link 
              to="/contacto" 
              className={`nav-link ${isActive('/contacto')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>

        <Link to="/carrito" className="cart-link" aria-label={`Ver carrito - ${cartCount} productos`}>
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && (
            <span className="cart-badge" aria-hidden="true">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
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