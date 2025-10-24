import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';

const CheckoutFailure = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5 text-center">
      <Card className="p-5">
        <Card.Body>
          <BiErrorCircle className="text-danger" size={80} />
          <h1 className="mt-4">Error en la Compra</h1>
          <p className="lead mb-4">
            Lo sentimos, ha ocurrido un error al procesar tu compra. Por favor, intenta nuevamente.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/checkout')}
            >
              Reintentar
            </Button>
            <Button 
              variant="outline-secondary" 
              size="lg"
              onClick={() => navigate('/cart')}
            >
              Volver al Carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckoutFailure;