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
}