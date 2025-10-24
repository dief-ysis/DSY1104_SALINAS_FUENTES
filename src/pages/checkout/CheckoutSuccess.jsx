import React, { useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiCheckCircle } from 'react-icons/bi';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Aquí podrías limpiar el carrito después de una compra exitosa
  }, []);

  return (
    <Container className="py-5 text-center">
      <Card className="p-5">
        <Card.Body>
          <BiCheckCircle className="text-success" size={80} />
          <h1 className="mt-4">¡Compra Exitosa!</h1>
          <p className="lead mb-4">
            Gracias por tu compra. Hemos enviado un correo electrónico con los detalles de tu pedido.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckoutSuccess;