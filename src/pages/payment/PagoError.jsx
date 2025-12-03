import React from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './PagoError.css';

const PagoError = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error, responseCode } = location.state || {};

  return (
    <Container className="pago-error-page">
      <Card className="error-card">
        <Card.Body className="text-center">
          <div className="error-icon">
            <i className="bi bi-x-circle-fill text-danger"></i>
          </div>
          
          <h2 className="error-title">Pago No Completado</h2>
          <p className="error-subtitle">No se pudo procesar tu pago</p>

          {error && (
            <Alert variant="danger">
              {error}
              {responseCode && <div className="mt-2"><small>Código: {responseCode}</small></div>}
            </Alert>
          )}

          <div className="error-info">
            <p>Posibles razones:</p>
            <ul>
              <li>Fondos insuficientes</li>
              <li>Pago cancelado por el usuario</li>
              <li>Datos de tarjeta incorrectos</li>
              <li>Problemas de conexión</li>
            </ul>
          </div>

          <div className="error-actions">
            <Button variant="success" size="lg" onClick={() => navigate('/carrito')}>
              Volver al Carrito
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/')}>
              Ir al Inicio
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagoError;