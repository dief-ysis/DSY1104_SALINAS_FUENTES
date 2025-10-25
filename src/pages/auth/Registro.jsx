import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import '../../styles/pages/auth-pages.css';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula y número';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simular registro (en producción se enviaría al servidor)
      console.log('Registro exitoso:', {
        nombre: formData.nombre,
        email: formData.email
      });
      
      setShowSuccess(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/', { state: { registroExitoso: true, email: formData.email } });
      }, 2000);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1 className="auth-title">
                🌱 Crear Cuenta
              </h1>

              <p className="text-muted text-center mb-4">
                Únete a HuertoHogar y comienza a disfrutar de productos frescos y orgánicos
              </p>

              {showSuccess && (
                <Alert variant="success" className="mb-3">
                  ✓ ¡Registro exitoso! Redirigiendo al login...
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Nombre */}
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">
                    Nombre Completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    isInvalid={!!errors.nombre}
                    className="auth-input"
                  />
                  {errors.nombre && (
                    <Form.Control.Feedback type="invalid" className="form-feedback-block">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">
                    Correo Electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    isInvalid={!!errors.email}
                    className="auth-input"
                  />
                  {errors.email && (
                    <Form.Control.Feedback type="invalid" className="form-feedback-block">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Contraseña */}
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">
                    Contraseña
                  </Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Mínimo 8 caracteres"
                      isInvalid={!!errors.password}
                      className="auth-input"
                      style={{ paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle-btn"
                    >
                      {showPassword ? '👁️‍🗨️' : '👁️'}
                    </button>
                  </div>
                  {errors.password && (
                    <Form.Control.Feedback type="invalid" className="form-feedback-block">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                  <small className="text-muted d-block mt-2">
                    La contraseña debe contener mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
                  </small>
                </Form.Group>

                {/* Confirmar Contraseña */}
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">
                    Confirmar Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    isInvalid={!!errors.confirmPassword}
                    className="auth-input"
                  />
                  {errors.confirmPassword && (
                    <Form.Control.Feedback type="invalid" className="form-feedback-block">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Términos y condiciones */}
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    name="aceptaTerminos"
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    label={
                      <span>
                        Acepto los{' '}
                        <Link to="#" className="auth-link">
                          términos y condiciones
                        </Link>
                        {' '}y la{' '}
                        <Link to="#" className="auth-link">
                          política de privacidad
                        </Link>
                      </span>
                    }
                    isInvalid={!!errors.aceptaTerminos}
                  />
                  {errors.aceptaTerminos && (
                    <div className="form-feedback-block">
                      {errors.aceptaTerminos}
                    </div>
                  )}
                </Form.Group>

                {/* Botón de envío */}
                <Button
                  type="submit"
                  className="w-100 mb-3 auth-btn-submit"
                >
                  Crear Cuenta
                </Button>
              </Form>

              {/* Link a login */}
              <div className="text-center">
                <p className="text-muted mb-0">
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/" className="auth-link" style={{ fontWeight: 'bold' }}>
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <hr className="my-4" />

              {/* Información adicional */}
              <div className="privacy-box">
                <p>
                  <strong>🔒 Tu privacidad es importante</strong><br/>
                  Tus datos serán protegidos con encriptación de máximo nivel. No compartiremos tu información con terceros.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
