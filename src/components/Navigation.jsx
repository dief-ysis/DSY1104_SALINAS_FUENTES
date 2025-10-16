import React from 'react';
import { Navbar, Nav, Container, Badge, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { BsCart3, BsPerson } from 'react-icons/bs';

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          HUERTO HOGAR
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {pages.map((page) => (
              <Nav.Link 
                key={page.path} 
                as={Link} 
                to={page.path}
              >
                {page.name}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito" className="position-relative me-2">
              <BsCart3 size={20} />
              {cartItemsCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>
            {user ? (
              <>
                <Image
                  src={user.avatar || '/static/images/avatar/default.jpg'}
                  alt={user.name}
                  roundedCircle
                  width={32}
                  height={32}
                  className="me-2"
                />
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button 
                variant="outline-light" 
                onClick={() => navigate('/login')}
              >
                <BsPerson className="me-1" />
                Iniciar sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;