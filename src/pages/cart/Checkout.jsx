/**
 * CHECKOUT PAGE - PÁGINA DE PAGO
 * 
 * Proceso de checkout con:
 * - Formulario de datos de envío (Formik + Yup)
 * - Resumen del pedido
 * - Integración con Webpay Plus
 * 
 * RESPONDE A PREGUNTAS:
 * - P102-138: Integración completa con Webpay Plus
 * - P87: Sincronización de formularios complejos con BD
 */

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatearPrecio } from '../../utils/formatters';
import webpayService from '../../services/webpayService';
import orderService from '../../services/orderService';
import Swal from 'sweetalert2';
import './Checkout.css';

// Esquema de validación con Yup
const checkoutSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  telefono: Yup.string().required('El teléfono es requerido'),
  direccion: Yup.string().required('La dirección es requerida'),
  comuna: Yup.string().required('La comuna es requerida'),
  region: Yup.string().required('La región es requerida'),
  notas: Yup.string()
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, isEmpty, total } = useCart();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  if (isEmpty) {
    navigate('/carrito');
    return null;
  }

  const shippingCost = total >= 20000 ? 0 : 2500;
  const finalTotal = total + shippingCost; // Referencial para visualización

  const initialValues = {
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    comuna: user?.comuna || '',
    region: user?.region || '',
    notas: ''
  };

  const handleSubmit = async (values) => {
    try {
      setProcessing(true);

      // PASO 1: Crear el pedido en el Backend (Persistencia)
      // Enviamos solo datos de envío, el backend toma los items del carrito DB
      const orderPayload = {
        direccionEnvio: values.direccion,
        comunaEnvio: values.comuna,
        regionEnvio: values.region,
        notasEnvio: values.notas,
        costoEnvio: shippingCost
      };

      const orderResponse = await orderService.createOrder(orderPayload);
      
      if (!orderResponse.success) {
        throw new Error("No se pudo crear el pedido en el sistema");
      }

      const pedidoCreado = orderResponse.data;
      console.log("Pedido creado:", pedidoCreado);

      let buyOrderToUse = pedidoCreado.numeroPedido;

      // Fallback de seguridad: Si el backend devolvió un ID muy largo o nulo
      if (!buyOrderToUse || buyOrderToUse.length > 26) {
          buyOrderToUse = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`;
      }

      // PASO 2: Iniciar Webpay
      const webpayResponse = await webpayService.initTransaction({
        buyOrder: buyOrderToUse,
        sessionId: user?.id?.toString() || `guest-${Date.now()}`,
        amount: pedidoCreado.total,
        returnUrl: `${window.location.origin}/payment-result`
      });

      if (webpayResponse.success) {
        window.location.href = webpayResponse.url + '?token_ws=' + webpayResponse.token;
      } else {
        throw new Error(webpayResponse.message || 'Error al iniciar pago con Webpay');
      }

    } catch (error) {
      console.error('[CHECKOUT] Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al procesar tu solicitud',
        confirmButtonColor: '#2d5016'
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p className="text-muted">Completa tu información para finalizar la compra</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* FORMULARIO */}
              <Col lg={8}>
                <Card className="checkout-form-card">
                  <Card.Header>
                    <h5>Información de Envío</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre Completo *</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.nombre && errors.nombre}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Teléfono *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="telefono"
                            value={values.telefono}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="912345678"
                            isInvalid={touched.telefono && errors.telefono}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.telefono}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Dirección *</Form.Label>
                          <Form.Control
                            type="text"
                            name="direccion"
                            value={values.direccion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Calle, número, depto/casa"
                            isInvalid={touched.direccion && errors.direccion}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.direccion}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Comuna *</Form.Label>
                          <Form.Control
                            type="text"
                            name="comuna"
                            value={values.comuna}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.comuna && errors.comuna}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.comuna}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Región *</Form.Label>
                          <Form.Select
                            name="region"
                            value={values.region}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.region && errors.region}
                          >
                            <option value="">Selecciona una región</option>
                            <option value="RM">Región Metropolitana</option>
                            <option value="V">Valparaíso</option>
                            <option value="VIII">Biobío</option>
                            {/* Agregar más regiones según necesidad */}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.region}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Notas de Entrega (Opcional)</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="notas"
                            value={values.notas}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Instrucciones especiales de entrega..."
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              {/* RESUMEN */}
              <Col lg={4}>
                <Card className="checkout-summary-card sticky-top">
                  <Card.Header>
                    <h5>Resumen del Pedido</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="order-items">
                      {items.map((item, index) => {
                      // Usamos cartItemId si existe, sino productId + index para garantizar unicidad
                      const uniqueKey = item.cartItemId 
                          ? `cart-${item.cartItemId}` 
                          : `prod-${item.productId || 'unknown'}-${index}`;

                      return (
                        <div key={uniqueKey} className="d-flex justify-content-between mb-2 small">
                          <span>{item.cantidad || item.quantity} x {item.nombre || item.name}</span>
                          <span>
                            {formatearPrecio((item.precio || item.price) * (item.cantidad || item.quantity))}
                          </span>
                        </div>
                      );
                    })}
                    </div>

                    <hr />

                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>{formatearPrecio(total)}</span>
                    </div>

                    <div className="summary-row">
                      <span>Envío:</span>
                      <span className={shippingCost === 0 ? 'text-success' : ''}>
                        {shippingCost === 0 ? 'GRATIS' : formatearPrecio(shippingCost)}
                      </span>
                    </div>

                    <hr />

                    <div className="summary-row summary-total">
                      <strong>Total:</strong>
                      <strong>{formatearPrecio(finalTotal)}</strong>
                    </div>

                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      className="btn-pay"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-credit-card me-2"></i>
                          Pagar con Webpay
                        </>
                      )}
                    </Button>

                    <div className="payment-info mt-3">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        Pago seguro con Webpay Plus
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Checkout;