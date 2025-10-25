import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import '../../styles/pages/cart-pages.css';

const PagoExitoso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Obtener datos de la orden desde location state o localStorage
    const state = location.state;
    if (state?.orderData) {
      setOrderData(state.orderData);
      localStorage.setItem('lastOrder', JSON.stringify(state.orderData));
    } else {
      // Intentar recuperar del localStorage
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder));
      }
    }
  }, [location]);

  // Generar número de orden único
  const generateOrderNumber = () => {
    return `HH-${Date.now().toString().slice(-8)}`;
  };

  const orderNumber = orderData?.orderNumber || generateOrderNumber();
  const totalAmount = orderData?.totalAmount || 0;
  const itemCount = orderData?.itemCount || 0;
  const customerEmail = orderData?.email || 'contacto@huerthogar.cl';
  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Container className="mt-5 mb-5">
      {/* Animación de éxito */}
      <Row className="mb-4">
        <Col xs={12} className="text-center pago-header-success">
          <img 
            src="/assets/images/payment-success.svg" 
            alt="Pago exitoso" 
          />
          <h1>¡Compra Exitosa!</h1>
          <p className="text-muted">Tu pedido ha sido confirmado correctamente</p>
        </Col>
      </Row>

      {/* Número de orden prominente */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Card className="order-number-box">
            <p className="text-muted">Número de Orden</p>
            <h2>{orderNumber}</h2>
          </Card>
        </Col>
      </Row>

      {/* Información de la compra */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Card>
            <Card.Header className="pago-success-card-header">
              <h5 className="mb-0">📋 Resumen de tu Compra</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xs={6}>
                  <p className="text-muted mb-1">Cantidad de productos</p>
                  <p className="value">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
                </Col>
                <Col xs={6}>
                  <p className="text-muted mb-1">Total a pagar</p>
                  <p className="value" style={{ color: '#28a745' }}>
                    ${totalAmount?.toLocaleString('es-CL')} CLP
                  </p>
                </Col>
              </Row>
              
              <hr />

              <Row>
                <Col xs={12} md={6}>
                  <p className="text-muted mb-1">Correo electrónico</p>
                  <p>{customerEmail}</p>
                </Col>
                <Col xs={12} md={6}>
                  <p className="text-muted mb-1">Fecha estimada de entrega</p>
                  <p>{deliveryDate}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Información de confirmación */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Card className="confirmation-box">
            <Card.Body>
              <h5>✉️ Confirmación Enviada</h5>
              <p className="mb-0">
                Hemos enviado un correo de confirmación a <strong>{customerEmail}</strong> con los detalles de tu compra y seguimiento del pedido.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Siguientes pasos */}
      <Row className="mb-5">
        <Col xs={12} md={8} className="mx-auto">
          <div className="next-steps">
            <h5>📦 Siguientes Pasos</h5>
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <p><strong>Confirmar datos</strong></p>
                <p className="text-muted small mb-0">Revisa tu correo para confirmar los datos de entrega</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <p><strong>Preparación del pedido</strong></p>
                <p className="text-muted small mb-0">Nuestro equipo preparará tu pedido en las próximas 24 horas</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <p><strong>Entrega</strong></p>
                <p className="text-muted small mb-0">Recibirás tu pedido en la fecha estimada</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Botones de acción */}
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <div className="action-buttons">
            <Button
              variant="success"
              size="lg"
              onClick={() => navigate('/')}
            >
              Volver a Home
            </Button>
            <Button
              variant="outline-success"
              size="lg"
              onClick={() => navigate('/productos')}
            >
              Seguir comprando
            </Button>
          </div>
        </Col>
      </Row>

      {/* CSS para animación */}
      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Container>
  );
};

export default PagoExitoso;
