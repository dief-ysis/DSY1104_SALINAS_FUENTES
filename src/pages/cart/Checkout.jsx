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
import Swal from 'sweetalert2';
import './Checkout.css';

// Esquema de validación con Yup
const checkoutSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  telefono: Yup.string()
    .matches(/^[0-9]{9}$/, 'El teléfono debe tener 9 dígitos')
    .required('El teléfono es requerido'),
  direccion: Yup.string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .required('La dirección es requerida'),
  comuna: Yup.string()
    .required('La comuna es requerida'),
  region: Yup.string()
    .required('La región es requerida'),
  notas: Yup.string()
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, isEmpty, total, clearItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [processing, setProcessing] = useState(false);

  // Redirigir si el carrito está vacío
  if (isEmpty) {
    navigate('/carrito');
    return null;
  }

  const shippingCost = total >= 20000 ? 0 : 2500;
  const finalTotal = total + shippingCost;

  // Valores iniciales del formulario
  const initialValues = {
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: '',
    comuna: '',
    region: '',
    notas: ''
  };

  const handleSubmit = async (values) => {
    try {
      setProcessing(true);

      // Validar stock antes de proceder
      // TODO: Implementar validación de stock con backend

      // Preparar datos del pedido
      const orderData = {
        items: items.map(item => ({
          productoId: item.id || item.productoId,
          cantidad: item.cantidad || item.quantity,
          precio: item.precio || item.price
        })),
        total: finalTotal,
        envio: {
          ...values,
          costoEnvio: shippingCost
        }
      };

      // Generar buyOrder único (timestamp + random)
      const buyOrder = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Iniciar transacción con Webpay Plus
      const webpayResponse = await webpayService.initTransaction({
        buyOrder,
        sessionId: user?.id || `session-${Date.now()}`,
        amount: finalTotal,
        returnUrl: `${window.location.origin}/payment-result`
      });

      if (webpayResponse.success) {
        // Guardar datos del pedido en localStorage para recuperar después
        localStorage.setItem('pendingOrder', JSON.stringify({
          buyOrder,
          orderData,
          timestamp: Date.now()
        }));

        // Redirigir a Webpay
        window.location.href = webpayResponse.url;
      } else {
        throw new Error(webpayResponse.message || 'Error al iniciar pago');
      }

    } catch (error) {
      console.error('[CHECKOUT] Error al procesar pago:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Error al Procesar Pago',
        text: error.message || 'No se pudo iniciar el proceso de pago',
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
                      {items.map(item => (
                        <div key={item.id || item.productoId} className="order-item">
                          <span className="item-name">
                            {item.nombre || item.name} × {item.cantidad || item.quantity}
                          </span>
                          <span className="item-price">
                            {formatearPrecio((item.precio || item.price) * (item.cantidad || item.quantity))}
                          </span>
                        </div>
                      ))}
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