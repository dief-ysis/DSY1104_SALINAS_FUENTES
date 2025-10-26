import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import '../../styles/pages/cart-pages.css';

const PagoError = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);

  const errorData = location.state || {};
  const errorReason = errorData.reason || 'Tarjeta rechazada';
  const errorMessage = errorData.message || 'Ocurrió un problema procesando tu pago';
  const orderId = errorData.orderId || 'N/A';

  const errorReasons = {
    'card_declined': {
      title: 'Tarjeta Rechazada',
      message: 'Tu tarjeta ha sido rechazada. Verifica los datos e intenta nuevamente.',
      emoji: '💳'
    },
    'insufficient_funds': {
      title: 'Fondos Insuficientes',
      message: 'No hay suficientes fondos en tu cuenta. Verifica tu saldo.',
      emoji: '💸'
    },
    'invalid_card': {
      title: 'Tarjeta Inválida',
      message: 'Los datos de la tarjeta no son válidos. Verifica la información.',
      emoji: '❌'
    },
    'expired_card': {
      title: 'Tarjeta Expirada',
      message: 'Tu tarjeta ha expirado. Usa una tarjeta vigente.',
      emoji: '⏰'
    },
    'network_error': {
      title: 'Error de Conexión',
      message: 'No pudimos conectar con el servicio de pago. Intenta nuevamente.',
      emoji: '🌐'
    },
    'timeout': {
      title: 'Tiempo Agotado',
      message: 'La transacción tomó demasiado tiempo. Intenta de nuevo.',
      emoji: '⏳'
    },
    'default': {
      title: 'Error en la Transacción',
      message: 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
      emoji: '⚠️'
    }
  };

  const errorInfo = errorReasons[errorReason] || errorReasons.default;

  return (
    <Container className="mt-5 mb-5">
      {/* Imagen de error */}
      <Row className="mb-4">
        <Col xs={12} className="pago-header-error">
          <img 
            src="/assets/images/payment-error.svg" 
            alt="Pago con error" 
          />
          <h1>{errorInfo.title}</h1>
          <p className="text-muted">{errorInfo.message}</p>
        </Col>
      </Row>

      {/* Información del error */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Card className="error-box">
            <Card.Body>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <p className="text-muted mb-1">Código de Error</p>
                  <p className="error-code">
                    <span className="error-code-emoji">{errorInfo.emoji}</span>
                    {errorReason || 'UNKNOWN_ERROR'}
                  </p>
                </Col>
                <Col xs={12} md={6}>
                  <p className="text-muted mb-1">ID de Transacción</p>
                  <p className="error-transaction-id">{orderId}</p>
                </Col>
              </Row>

              <div className="error-reason-box">
                <p><strong>Razón del error:</strong> {errorMessage}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recomendaciones */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <div className="recommendations">
            <h5>🔧 Recomendaciones</h5>
            <div className="recommendation-item">
              <p><strong>✓ Verifica tus datos</strong></p>
              <p className="text-muted small mb-0">Asegúrate de que todos los datos de tu tarjeta sean correctos</p>
            </div>

            <div className="recommendation-item">
              <p><strong>✓ Intenta con otro medio de pago</strong></p>
              <p className="text-muted small mb-0">Usa una tarjeta diferente o un método de pago alternativo</p>
            </div>

            <div className="recommendation-item">
              <p><strong>✓ Contacta con tu banco</strong></p>
              <p className="text-muted small mb-0">Verifica con tu entidad financiera si hay restricciones en tu cuenta</p>
            </div>

            <div className="recommendation-item">
              <p><strong>✓ Contáctanos</strong></p>
              <p className="text-muted small mb-0">Si el problema persiste, nuestro equipo de soporte está disponible para ayudarte</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Información de soporte */}
      <Row className="mb-5">
        <Col xs={12} md={8} className="mx-auto">
          <Card className="support-box">
            <Card.Body>
              <h6 className="support-title">📞 ¿Necesitas ayuda?</h6>
              <p className="mb-2">Puedes contactarnos directamente:</p>
              <ul className="mb-0" style={{ fontSize: '0.95rem' }}>
                <li>📧 Email: <strong>soporte@huerthogar.cl</strong></li>
                <li>📞 Teléfono: <strong>+56 9 1234 5678</strong></li>
                <li>🕒 Horario: Lunes-Viernes 9:00-18:00 hrs</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Botones de acción */}
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <div className="action-buttons">
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate('/checkout')}
            >
              🔄 Reintentar Pago
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate('/carrito')}
            >
              Volver al Carrito
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => navigate('/contacto')}
            >
              Contactar Soporte
            </Button>
            <Button
              variant="light"
              size="lg"
              onClick={() => navigate('/')}
            >
              Volver a Home
            </Button>
          </div>
        </Col>
      </Row>

      {/* CSS para animaciones */}
      <style>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </Container>
  );
};

export default PagoError;
