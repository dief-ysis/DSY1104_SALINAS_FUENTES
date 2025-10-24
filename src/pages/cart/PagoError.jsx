import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

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
        <Col xs={12} className="text-center">
          <img 
            src="/assets/images/payment-error.svg" 
            alt="Pago con error" 
            style={{ maxWidth: '300px', width: '100%', marginBottom: '20px' }}
          />
          <h1 style={{ color: '#dc3545', marginBottom: '10px' }}>
            {errorInfo.title}
          </h1>
          <p className="text-muted mb-4">
            {errorInfo.message}
          </p>
        </Col>
      </Row>

      {/* Información del error */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <Card className="border-danger mb-4">
            <Card.Body style={{ padding: '30px' }}>
              <Row className="mb-3">
                <Col xs={12} md={6}>
                  <p className="text-muted mb-1">Código de Error</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#dc3545' }}>
                    {errorInfo.emoji} {errorReason || 'UNKNOWN_ERROR'}
                  </p>
                </Col>
                <Col xs={12} md={6}>
                  <p className="text-muted mb-1">ID de Transacción</p>
                  <p style={{ fontSize: '14px', fontFamily: 'monospace' }}>
                    {orderId}
                  </p>
                </Col>
              </Row>

              <div 
                style={{
                  backgroundColor: '#ffe8e8',
                  borderLeft: '4px solid #dc3545',
                  padding: '12px',
                  borderRadius: '4px'
                }}
              >
                <p className="mb-0">
                  <strong>Razón del error:</strong> {errorMessage}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recomendaciones */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mx-auto">
          <h5 style={{ color: '#dc3545', marginBottom: '15px' }}>🔧 Recomendaciones</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ 
              padding: '12px 15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              borderLeft: '4px solid #dc3545'
            }}>
              <p className="mb-1"><strong>✓ Verifica tus datos</strong></p>
              <p className="text-muted small mb-0">Asegúrate de que todos los datos de tu tarjeta sean correctos</p>
            </div>

            <div style={{ 
              padding: '12px 15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              borderLeft: '4px solid #dc3545'
            }}>
              <p className="mb-1"><strong>✓ Intenta con otro medio de pago</strong></p>
              <p className="text-muted small mb-0">Usa una tarjeta diferente o un método de pago alternativo</p>
            </div>

            <div style={{ 
              padding: '12px 15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              borderLeft: '4px solid #dc3545'
            }}>
              <p className="mb-1"><strong>✓ Contacta con tu banco</strong></p>
              <p className="text-muted small mb-0">Verifica con tu entidad financiera si hay restricciones en tu cuenta</p>
            </div>

            <div style={{ 
              padding: '12px 15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              borderLeft: '4px solid #dc3545'
            }}>
              <p className="mb-1"><strong>✓ Contáctanos</strong></p>
              <p className="text-muted small mb-0">Si el problema persiste, nuestro equipo de soporte está disponible para ayudarte</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Información de soporte */}
      <Row className="mb-5">
        <Col xs={12} md={8} className="mx-auto">
          <Card style={{ backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
            <Card.Body>
              <h6 style={{ color: '#856404', marginBottom: '8px' }}>📞 ¿Necesitas ayuda?</h6>
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
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'column' }}>
            <Button
              variant="danger"
              size="lg"
              onClick={() => navigate('/checkout')}
              style={{ width: '100%' }}
            >
              🔄 Reintentar Pago
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate('/carrito')}
              style={{ width: '100%' }}
            >
              Volver al Carrito
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => navigate('/contacto')}
              style={{ width: '100%' }}
            >
              Contactar Soporte
            </Button>
            <Button
              variant="light"
              size="lg"
              onClick={() => navigate('/')}
              style={{ width: '100%' }}
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
