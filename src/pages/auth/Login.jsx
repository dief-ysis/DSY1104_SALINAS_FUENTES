import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import '../../styles/pages/auth-pages.css';

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
              <h1 className="auth-title">
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
                  <Form.Label className="auth-label">Correo Electrónico</Form.Label>
                  <Form.Control 
                    name="email" 
                    type="email" 
                    aria-label="email"
                    placeholder="tu@email.com"
                    className="auth-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="auth-label">Contraseña</Form.Label>
                  <Form.Control 
                    name="password" 
                    type="password" 
                    aria-label="contraseña"
                    placeholder="Tu contraseña"
                    className="auth-input"
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="w-100 mb-3 auth-btn-submit"
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
                  <Link to="#" className="auth-link">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>

          <div className="demo-account-box">
            <p>
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