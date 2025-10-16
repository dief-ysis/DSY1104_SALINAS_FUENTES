import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../../context/CartContext';

export function NavBarRoot() {
  const { getTotalItems } = useCart();

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="brand-text">
          🌿 HuertoHogar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                🛒 Carrito
                {getTotalItems() > 0 && (
                  <Badge bg="emerald" className="ms-1">
                    {getTotalItems()}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}