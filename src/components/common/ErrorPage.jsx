import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

function ErrorPage() {
  const error = useRouteError();

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Alert variant="danger" className="text-center py-5">
            <h1 className="display-4 fw-bold text-danger mb-3">
              ¡Oops!
            </h1>
            <h2 className="h3 text-secondary mb-3">
              Ha ocurrido un error
            </h2>
            <p className="lead mb-4 text-dark">
              {error?.statusText || error?.message || 
               'Lo sentimos, ha ocurrido un error al cargar la página.'}
            </p>
            <Link to="/">
              <Button variant="primary" size="lg">
                Volver al inicio
              </Button>
            </Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;