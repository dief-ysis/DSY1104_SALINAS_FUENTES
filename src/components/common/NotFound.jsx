/**
 * NOT FOUND - PÁGINA 404
 * 
 * Página que se muestra cuando el usuario intenta acceder a una ruta que no existe.
 */

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página no encontrada</h2>
        <p className="not-found-text">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="not-found-actions">
          <Button 
            variant="success"
            size="lg"
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </Button>
          <Button 
            variant="outline-success"
            size="lg"
            onClick={() => navigate('/productos')}
          >
            Ver Productos
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;