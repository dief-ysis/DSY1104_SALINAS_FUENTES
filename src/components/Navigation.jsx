import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsCart3, BsPerson, BsHouseFill } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../../css/components/Navigation.css';

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/productos' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contacto', path: '/contacto' }
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      sticky="top" 
      expanded={isExpanded}
      onToggle={(expanded) => setIsExpanded(expanded)}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <BsHouseFill size={24} className="me-2" aria-hidden="true" />
            <span>HUERTO HOGAR</span>
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => (
              <LinkContainer 
                key={page.path} 
                to={page.path} 
                onClick={() => setIsExpanded(false)}
              >
                <Nav.Link className={isActive(page.path) ? 'active' : ''}>
                  {page.name}
                </Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
          
          <Nav>
            <LinkContainer to="/carrito" onClick={() => setIsExpanded(false)}>
              <Nav.Link className="position-relative cart-link" aria-label={`Carrito de compras con ${cartItemsCount} items`}>
                <BsCart3 size={24} aria-hidden="true" />
                {cartItemsCount > 0 && (
                  <Badge pill bg="danger" className="cart-badge position-absolute">
                    {cartItemsCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {user ? (
              <NavDropdown 
                title={
                  <div className="d-inline">
                    <img
                      src="/static/images/avatar/2.jpg"
                      alt={user.name}
                      className="user-avatar"
                    />
                  </div>
                }
                id="user-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <BsPerson size={20} className="me-1" />
                  Iniciar sesión
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;