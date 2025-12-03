/**
 * ERROR PAGE - PÁGINA DE ERROR GENERAL
 * 
 * Componente que maneja errores de la aplicación.
 * Se usa como errorElement en React Router.
 */

import React from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useRouteError, useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error('Error de aplicación:', error);

  // Determinar mensaje de error
  const getErrorMessage = () => {
    if (error?.status === 404) {
      return 'Página no encontrada';
    }
    if (error?.statusText) {
      return error.statusText;
    }
    if (error?.message) {
      return error.message;
    }
    return 'Ha ocurrido un error inesperado';
  };

  const getErrorDetails = () => {
    if (error?.data) {
      return error.data;
    }
    if (error?.error?.message) {
      return error.error.message;
    }
    return '';
  };

  return (
    <Container className="error-page">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">¡Oops!</h1>
        <h2 className="error-subtitle">{getErrorMessage()}</h2>
        
        {getErrorDetails() && (
          <Alert variant="danger" className="error-details">
            <Alert.Heading>Detalles del error:</Alert.Heading>
            <p className="mb-0">{getErrorDetails()}</p>
          </Alert>
        )}

        <p className="error-text">
          Lo sentimos, algo salió mal. Por favor, intenta nuevamente o vuelve al inicio.
        </p>

        <div className="error-actions">
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
            onClick={() => window.location.reload()}
          >
            Recargar Página
          </Button>
        </div>

        {/* Información técnica (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <details className="error-stack mt-4">
            <summary>Stack trace (desarrollo)</summary>
            <pre className="mt-2">{error.stack}</pre>
          </details>
        )}
      </div>
    </Container>
  );
};

export default ErrorPage;