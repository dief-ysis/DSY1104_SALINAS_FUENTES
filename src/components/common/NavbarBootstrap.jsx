import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const NavbarBootstrap = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cartItemsCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Huerto Hogar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              Carrito
              {cartItemsCount > 0 && (
                <Badge bg="secondary" className="ms-1">
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>
            {isAuthenticated ? (
              <Button 
                variant="outline-light" 
                onClick={handleLogout}
                className="ms-2"
              >
                Cerrar Sesión
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBootstrap;