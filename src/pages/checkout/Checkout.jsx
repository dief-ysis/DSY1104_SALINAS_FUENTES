import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formatters';

const Checkout = () => {
  const { cart, total } = useCart();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Simular procesamiento de pago
    navigate('/checkout/summary');
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Finalizar Compra</h1>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Información de Envío</h4>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="nombre">Nombre</Form.Label>
                      <Form.Control
                        id="nombre"
                        required
                        type="text"
                        placeholder="Ingrese su nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su nombre.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="apellido">Apellido</Form.Label>
                      <Form.Control
                        id="apellido"
                        required
                        type="text"
                        placeholder="Ingrese su apellido"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su apellido.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    id="email"
                    required
                    type="email"
                    placeholder="nombre@ejemplo.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese un email válido.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="direccion">Dirección</Form.Label>
                  <Form.Control
                    id="direccion"
                    required
                    type="text"
                    placeholder="Ingrese su dirección"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su dirección.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="ciudad">Ciudad</Form.Label>
                      <Form.Control
                        id="ciudad"
                        required
                        type="text"
                        placeholder="Ingrese su ciudad"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su ciudad.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="codigoPostal">Código Postal</Form.Label>
                      <Form.Control
                        id="codigoPostal"
                        required
                        type="text"
                        placeholder="Ingrese su código postal"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su código postal.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <h4 className="mb-4 mt-5">Información de Pago</h4>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="numeroTarjeta">Número de Tarjeta</Form.Label>
                  <Form.Control
                    id="numeroTarjeta"
                    required
                    type="text"
                    placeholder="1234 5678 9012 3456"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese el número de tarjeta.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Form.Label>
                      <Form.Control
                        id="fechaVencimiento"
                        required
                        type="text"
                        placeholder="MM/YY"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese la fecha de vencimiento.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="cvv">CVV</Form.Label>
                      <Form.Control
                        id="cvv"
                        required
                        type="text"
                        placeholder="123"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese el CVV.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" size="lg" className="w-100 mt-4">
                  Finalizar Compra
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Resumen del Pedido</h4>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{formatearPrecio(item.price * item.quantity)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatearPrecio(total)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span>{formatearPrecio(3000)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>{formatearPrecio(total + 3000)}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;