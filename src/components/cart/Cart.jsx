import { useCart } from '../../context/CartContext';
import { Container, Row, Col, Card, Button, Form, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <Alert variant="info">
              <h4>Tu carrito está vacío</h4>
              <p>¡Descubre nuestros productos frescos y saludables!</p>
              <Link to="/products">
                <Button variant="emerald">Ver Productos</Button>
              </Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-brown mb-4">Carrito de Compras</h1>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="me-3 rounded"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50x50?text=Imagen';
                            }}
                          />
                          <div>
                            <h6 className="mb-0">{item.name}</h6>
                            <small className="text-muted">{item.category}</small>
                          </div>
                        </div>
                      </td>
                      <td>${item.price} CLP/{item.unit}</td>
                      <td>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          style={{ width: '80px' }}
                          min="1"
                        />
                      </td>
                      <td>${item.price * item.quantity} CLP</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-brown">Resumen del Pedido</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Productos:</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span><strong>Total:</strong></span>
                <strong className="h5 text-brown">${getTotalPrice()} CLP</strong>
              </div>
              <Button variant="emerald" className="w-100 mb-2" size="lg">
                Proceder al Pago
              </Button>
              <Button variant="outline-secondary" className="w-100" onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Link to="/products" className="d-block text-center mt-3">
                <Button variant="link" className="text-emerald">
                  Seguir Comprando
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}