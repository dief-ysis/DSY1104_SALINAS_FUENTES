import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsCart3, BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
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
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>HUERTO HOGAR</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => (
              <LinkContainer key={page.path} to={page.path}>
                <Nav.Link>{page.name}</Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
          
          <Nav>
            <LinkContainer to="/carrito">
              <Nav.Link className="position-relative">
                <BsCart3 size={20} />
                {cartItemsCount > 0 && (
                  <Badge bg="danger" className="cart-badge">
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