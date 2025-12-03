/**
 * NAVBAR - BARRA DE NAVEGACIÓN PRINCIPAL
 * 
 * CARACTERÍSTICAS:
 * - Responsive con hamburger menu
 * - Integración con AuthContext y CartContext
 * - Indicador de items en carrito
 * - Menú de usuario con dropdown
 * - SideCart integrado
 * - Links activos con React Router
 */

import React, { useState } from 'react';
import { Navbar as BSNavbar, Nav, Container, Badge, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import SideCart from '../cart/SideCart';
import './Navbar.css';

const Navbar = () => {
  // ============================================================
  // HOOKS
  // ============================================================
  
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  
  const [showCart, setShowCart] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // ============================================================
  // HANDLERS
  // ============================================================

  /**
   * Maneja el logout
   */
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  /**
   * Cierra el menú móvil al hacer click en un link
   */
  const handleNavClick = () => {
    setExpanded(false);
  };

  /**
   * Abre el carrito lateral
   */
  const handleCartClick = () => {
    setShowCart(true);
  };

  // ============================================================
  // RENDERIZADO
  // ============================================================

  return (
    <>
      <BSNavbar 
        expand="lg" 
        className="navbar-custom shadow-sm"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          {/* LOGO */}
          <BSNavbar.Brand as={Link} to="/" className="navbar-brand-custom">
            <span className="brand-icon">🌱</span>
            <span className="brand-text">HuertoHogar</span>
          </BSNavbar.Brand>

          {/* MOBILE CART ICON */}
          <div className="d-lg-none">
            <button 
              className="cart-button-mobile"
              onClick={handleCartClick}
            >
              🛒
              {itemCount > 0 && (
                <Badge bg="success" className="cart-badge">
                  {itemCount}
                </Badge>
              )}
            </button>
          </div>

          {/* TOGGLE BUTTON */}
          <BSNavbar.Toggle aria-controls="navbar-nav" />

          {/* NAV ITEMS */}
          <BSNavbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-lg-center">
              {/* INICIO */}
              <Nav.Link 
                as={NavLink} 
                to="/" 
                onClick={handleNavClick}
                className="nav-link-custom"
              >
                Inicio
              </Nav.Link>

              {/* PRODUCTOS */}
              <Nav.Link 
                as={NavLink} 
                to="/productos" 
                onClick={handleNavClick}
                className="nav-link-custom"
              >
                Productos
              </Nav.Link>

              {/* OFERTAS */}
              <Nav.Link 
                as={NavLink} 
                to="/ofertas" 
                onClick={handleNavClick}
                className="nav-link-custom"
              >
                Ofertas
              </Nav.Link>

              {/* NOSOTROS */}
              <Nav.Link 
                as={NavLink} 
                to="/nosotros" 
                onClick={handleNavClick}
                className="nav-link-custom"
              >
                Nosotros
              </Nav.Link>

              {/* BLOG */}
              <Nav.Link 
                as={NavLink} 
                to="/blog" 
                onClick={handleNavClick}
                className="nav-link-custom"
              >
                Blog
              </Nav.Link>

              {/* CONTACTO */}
              <Nav.Link 
                as={NavLink} 
                to="/contacto" 
                onClick={handleNavClick}
                className="nav-link-custom"
              >
                Contacto
              </Nav.Link>

              {/* SEPARADOR */}
              <div className="navbar-divider d-none d-lg-block"></div>

              {/* CARRITO (DESKTOP) */}
              <Nav.Link 
                className="cart-button d-none d-lg-block"
                onClick={handleCartClick}
              >
                🛒
                {itemCount > 0 && (
                  <Badge bg="success" className="cart-badge">
                    {itemCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* USUARIO AUTENTICADO */}
              {isAuthenticated ? (
                <NavDropdown 
                  title={
                    <span className="user-menu">
                      <span className="user-icon">👤</span>
                      <span className="user-name">{user?.nombre || 'Usuario'}</span>
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/perfil" onClick={handleNavClick}>
                    📋 Mi Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/mis-pedidos" onClick={handleNavClick}>
                    📦 Mis Pedidos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/direcciones" onClick={handleNavClick}>
                    📍 Mis Direcciones
                  </NavDropdown.Item>
                  
                  {/* ADMIN PANEL */}
                  {user?.rol === 'ROLE_ADMIN' && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/admin" onClick={handleNavClick}>
                        ⚙️ Panel Admin
                      </NavDropdown.Item>
                    </>
                  )}
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    🚪 Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                /* USUARIO NO AUTENTICADO */
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    onClick={handleNavClick}
                    className="btn-login"
                  >
                    Iniciar Sesión
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/registro" 
                    onClick={handleNavClick}
                    className="btn-register"
                  >
                    Registrarse
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>

      {/* SIDE CART */}
      <SideCart 
        show={showCart} 
        onHide={() => setShowCart(false)} 
      />
    </>
  );
};

export default Navbar;