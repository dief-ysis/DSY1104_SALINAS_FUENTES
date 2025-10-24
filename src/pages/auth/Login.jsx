import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { login, loading, error } = auth || {};
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [emailRegistro, setEmailRegistro] = useState('');

  useEffect(() => {
    if (location.state?.registroExitoso) {
      setRegistroExitoso(true);
      setEmailRegistro(location.state?.email);
    }
  }, [location]);

  const [errors, setErrors] = useState([]);

  // Función única de validación
  const validateCredentials = (email, password) => {
    const errs = [];
    if (!email) errs.push('Email es requerido');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Email inválido');
    if (!password) errs.push('Contraseña es requerida');
    else if (password.length < 6) errs.push('La contraseña debe tener al menos 6 caracteres');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email?.value || '';
    const passwordValue = form.password?.value || '';

    const validationErrors = validateCredentials(emailValue, passwordValue);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(emailValue, passwordValue);
      navigate('/');
    } catch (err) {
      setErrors([err.message || 'Error al iniciar sesión']);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1 style={{ color: '#2E8B57', marginBottom: '30px', fontSize: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
                🌱 Iniciar Sesión
              </h1>

              {registroExitoso && (
                <Alert variant="success" className="mb-3">
                  ✓ ¡Registro exitoso! Ya puedes iniciar sesión con tu email: <strong>{emailRegistro}</strong>
                </Alert>
              )}

              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
              {errors.map((err, i) => (
                <Alert key={i} variant="danger" className="mb-2">{err}</Alert>
              ))}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57', fontWeight: 'bold' }}>Correo Electrónico</Form.Label>
                  <Form.Control 
                    name="email" 
                    type="email" 
                    aria-label="email"
                    placeholder="tu@email.com"
                    style={{
                      borderRadius: '6px',
                      padding: '10px 12px'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#2E8B57', fontWeight: 'bold' }}>Contraseña</Form.Label>
                  <Form.Control 
                    name="password" 
                    type="password" 
                    aria-label="contraseña"
                    placeholder="Tu contraseña"
                    style={{
                      borderRadius: '6px',
                      padding: '10px 12px'
                    }}
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="w-100 mb-3"
                  style={{
                    backgroundColor: '#2E8B57',
                    borderColor: '#2E8B57',
                    padding: '10px 12px',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
              </Form>

              <hr />

              <div className="text-center">
                <p className="text-muted mb-3">
                  ¿No tienes cuenta?
                </p>
                <Link to="/registro" className="btn btn-outline-success w-100">
                  Crear cuenta aquí
                </Link>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  <Link to="#" style={{ color: '#2E8B57' }}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>

          <div style={{ 
            backgroundColor: '#f0f8f0',
            padding: '15px',
            borderRadius: '6px',
            borderLeft: '4px solid #2E8B57',
            marginTop: '20px'
          }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>
              <strong>💡 Cuenta de Prueba</strong><br/>
              Email: demo@huerthogar.cl<br/>
              Contraseña: Demo1234
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}