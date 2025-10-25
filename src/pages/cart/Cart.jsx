import React from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import '../../styles/pages/cart-pages.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <h2 className="text-center">Tu carrito está vacío</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Carrito de Compras</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Cantidad</th>
            <th className="text-center">Subtotal</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="cart-image"
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="text-center">${item.price}</td>
              <td className="text-center">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    −
                  </Button>
                  <span>{item.quantity}</span>
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className="text-center">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-4 justify-content-end">
        <Col xs="auto">
          <div className="mb-3">
            <h4>Total: ${total.toFixed(2)}</h4>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              // Implementar checkout
              alert('¡Gracias por tu compra!');
            }}
          >
            Proceder al pago
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;