import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cart.length === 0 && !orderPlaced) {
    return (
      <Container className="checkout-empty">
        <Alert variant="info">
          Tu carrito está vacío. <a href="/productos">Volver al catálogo</a>
        </Alert>
      </Container>
    );
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Nombre es requerido'),
    lastName: Yup.string().required('Apellido es requerido'),
    email: Yup.string().email('Email inválido').required('Email requerido'),
    phone: Yup.string().required('Teléfono requerido'),
    address: Yup.string().required('Dirección requerida'),
    city: Yup.string().required('Ciudad requerida'),
    zipCode: Yup.string().required('Código postal requerido'),
    cardNumber: Yup.string().required('Número de tarjeta requerido'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCVC: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Pedido enviado:', values);
        setOrderPlaced(true);
        clearCart();
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  if (orderPlaced) {
    return (
      <Container className="checkout-success">
        <div className="success-message">
          <h2>✅ ¡Pedido Confirmado!</h2>
          <p>Tu pedido ha sido procesado exitosamente</p>
          <p className="order-id">Número de pedido: #12345</p>
          <Button onClick={() => navigate('/')}>Volver a Inicio</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="checkout-page">
      <h1 className="mb-4">Checkout</h1>
      
      <Row>
        {/* Formulario de Envío */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Información de Envío</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre *</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido *</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono *</Form.Label>
                      <Form.Control
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.phone && !!formik.errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Dirección *</Form.Label>
                  <Form.Control
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.address && !!formik.errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ciudad *</Form.Label>
                      <Form.Control
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.city && !!formik.errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Código Postal *</Form.Label>
                      <Form.Control
                        name="zipCode"
                        value={formik.values.zipCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.zipCode && !!formik.errors.zipCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.zipCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* Información de Pago */}
          <Card>
            <Card.Header>
              <h5>Información de Pago</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Número de Tarjeta *</Form.Label>
                  <Form.Control
                    placeholder="1234 5678 9012 3456"
                    name="cardNumber"
                    value={formik.values.cardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.cardNumber && !!formik.errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.cardNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre en Tarjeta *</Form.Label>
                  <Form.Control
                    name="cardName"
                    value={formik.values.cardName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.cardName && !!formik.errors.cardName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.cardName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Vencimiento (MM/YY) *</Form.Label>
                      <Form.Control
                        placeholder="12/25"
                        name="cardExpiry"
                        value={formik.values.cardExpiry}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.cardExpiry && !!formik.errors.cardExpiry}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.cardExpiry}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVC *</Form.Label>
                      <Form.Control
                        placeholder="123"
                        name="cardCVC"
                        value={formik.values.cardCVC}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.cardCVC && !!formik.errors.cardCVC}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.cardCVC}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={formik.handleSubmit}
                  className="w-100 mt-4"
                >
                  Confirmar Pedido
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Resumen del Pedido */}
        <Col md={4}>
          <Card className="sticky-top">
            <Card.Header>
              <h5>Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              {cart.map(item => (
                <div key={item.id} className="order-item mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="float-end">${item.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="order-total">
                <strong>Total: ${getTotal()}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;