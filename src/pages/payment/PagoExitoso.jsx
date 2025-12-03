import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formatters';
import './PagoExitoso.css';

const PagoExitoso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transaction, order } = location.state || {};

  return (
    <Container className="pago-exitoso-page">
      <Card className="success-card">
        <Card.Body className="text-center">
          <div className="success-icon">
            <i className="bi bi-check-circle-fill text-success"></i>
          </div>
          
          <h2 className="success-title">¡Pago Exitoso!</h2>
          <p className="success-subtitle">Tu pedido ha sido confirmado</p>

          {transaction && (
            <div className="transaction-details">
              <div className="detail-row">
                <span>Número de Orden:</span>
                <strong>{transaction.buyOrder || order?.buyOrder}</strong>
              </div>
              <div className="detail-row">
                <span>Monto Total:</span>
                <strong>{formatearPrecio(transaction.amount || order?.orderData?.total)}</strong>
              </div>
              <div className="detail-row">
                <span>Fecha:</span>
                <strong>{new Date(transaction.transactionDate || Date.now()).toLocaleString()}</strong>
              </div>
              {transaction.authorizationCode && (
                <div className="detail-row">
                  <span>Código de Autorización:</span>
                  <strong>{transaction.authorizationCode}</strong>
                </div>
              )}
            </div>
          )}

          <div className="success-actions">
            <Button variant="success" size="lg" onClick={() => navigate('/')}>
              Volver al Inicio
            </Button>
            <Button variant="outline-success" onClick={() => navigate('/productos')}>
              Seguir Comprando
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagoExitoso;