import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as NavbarBS, Container, Nav, Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/layout/navbar.css';

export function Navbar() {
  const { getItemCount } = useCart();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const { logout, isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    setCartCount(getItemCount());
  }, [getItemCount]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si está en la parte superior, siempre mostrar
      if (currentScrollY < 10) {
        setIsVisible(true);
        setPrevScrollY(currentScrollY);
        return;
      }

      // Si está scrolleando hacia abajo, ocultar
      if (currentScrollY > prevScrollY) {
        setIsVisible(false);
      } else {
        // Si está scrolleando hacia arriba, mostrar
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <NavbarBS 
      expand="lg" 
      bg="light" 
      sticky="top" 
      className={`navbar-custom ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
    >
      <Container fluid className="px-md-5">
        {/* Logo */}
        <NavbarBS.Brand as={Link} to="/" className="navbar-logo" aria-label="Ir a inicio">
          <img 
            src="/assets/images/logo.png" 
            alt="Logo de Huerto Hogar" 
            width="40" 
            height="40"
            className="d-inline-block align-text-top"
          />
        </NavbarBS.Brand>

        {/* Toggle button for mobile */}
        <NavbarBS.Toggle aria-controls="navbar-nav" />

        {/* Collapsible menu */}
        <NavbarBS.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/home" 
              className={`nav-link ${isActive('/home')}`}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/productos" 
              className={`nav-link ${isActive('/productos')}`}
            >
              Productos
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/blog" 
              className={`nav-link ${isActive('/blog')}`}
            >
              Blog
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/contacto" 
              className={`nav-link ${isActive('/contacto')}`}
            >
              Contacto
            </Nav.Link>
          </Nav>

          {/* Actions - Cart and Auth */}
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link 
              as={Link} 
              to="/carrito" 
              className="position-relative"
              aria-label={`Ver carrito - ${cartCount} productos`}
            >
              <span className="fs-5">🛒</span>
              {cartCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  aria-hidden="true"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {!isAuthenticated ? (
              <Nav.Link as={Link} to="/" className="btn btn-sm btn-outline-primary">
                Iniciar sesión
              </Nav.Link>
            ) : (
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={logout}
                aria-label="Cerrar sesión"
              >
                Cerrar sesión
              </button>
            )}
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}