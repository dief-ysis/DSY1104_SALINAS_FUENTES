import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setShowSuccess(true);
    setEmail('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <footer style={{ backgroundColor: '#2E8B57', color: 'white', marginTop: '60px' }}>
      <Container className="py-5">
        <Row className="mb-5">
          {/* Columna 1: Información de la empresa */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <div className="mb-3">
              <h5 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.2rem' }}>
                🌱 HuertoHogar
              </h5>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Fresco, local y responsable. Llevamos productos orgánicos de calidad directamente desde el campo a tu mesa.
              </p>
            </div>
            
            {/* Redes Sociales */}
            <div>
              <h6 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Síguenos</h6>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  📷
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  👍
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  🐦
                </a>
              </div>
            </div>
          </Col>

          {/* Columna 2: Contacto e Información */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1rem' }}>
              📞 Contáctanos
            </h5>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>📍 Dirección:</strong><br/>
                Av. Vicuña Mackenna 4917, San Joaquín
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong>� Teléfono:</strong><br/>
                +56 9 1234 5678
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong>📧 Email:</strong><br/>
                contacto@huertohogar.cl
              </p>
              <p style={{ marginBottom: '0' }}>
                <strong>🕒 Horario:</strong><br/>
                Lunes-Viernes: 9:00-18:00 hrs<br/>
                Sábado: 9:00-14:00 hrs
              </p>
            </div>
          </Col>

          {/* Columna 3: Newsletter */}
          <Col xs={12} md={4}>
            <h5 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1rem' }}>
              📧 Newsletter
            </h5>
            <p style={{ fontSize: '0.95rem', marginBottom: '12px' }}>
              Suscríbete para recibir ofertas especiales y consejos de agricultura orgánica
            </p>
            
            {showSuccess && (
              <Alert variant="success" style={{ padding: '8px 12px', marginBottom: '12px', fontSize: '0.9rem' }}>
                ✓ Suscripción exitosa
              </Alert>
            )}
            {showError && (
              <Alert variant="danger" style={{ padding: '8px 12px', marginBottom: '12px', fontSize: '0.9rem' }}>
                ✗ Email inválido
              </Alert>
            )}
            
            <Form onSubmit={handleNewsletterSubmit}>
              <Form.Group style={{ marginBottom: '10px' }}>
                <Form.Control
                  type="email"
                  placeholder="Tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: '4px',
                    padding: '8px 12px',
                    border: 'none',
                    backgroundColor: 'white',
                    color: '#333'
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#FFD700',
                  color: '#2E8B57',
                  border: 'none',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  padding: '8px 12px'
                }}
              >
                Suscribirse
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Separador */}
        <Row>
          <Col xs={12}>
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.3)', margin: '30px 0' }} />
          </Col>
        </Row>

        {/* Links útiles */}
        <Row className="mb-4">
          <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
            <h6 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '0.95rem' }}>
              Compra
            </h6>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p style={{ margin: 0 }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  Inicio
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="/productos" style={{ color: 'white', textDecoration: 'none' }}>
                  Productos
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="/ofertas" style={{ color: 'white', textDecoration: 'none' }}>
                  Ofertas
                </Link>
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
            <h6 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '0.95rem' }}>
              Información
            </h6>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p style={{ margin: 0 }}>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
                  Nosotros
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>
                  Blog
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="/contacto" style={{ color: 'white', textDecoration: 'none' }}>
                  Contacto
                </Link>
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
            <h6 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '0.95rem' }}>
              Mi Cuenta
            </h6>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p style={{ margin: 0 }}>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                  Iniciar Sesión
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="/registro" style={{ color: 'white', textDecoration: 'none' }}>
                  Registrarse
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="/carrito" style={{ color: 'white', textDecoration: 'none' }}>
                  Mi Carrito
                </Link>
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <h6 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '0.95rem' }}>
              Legal
            </h6>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p style={{ margin: 0 }}>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>
                  Privacidad
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>
                  Términos
                </Link>
              </p>
              <p style={{ margin: 0 }}>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>
                  Devoluciones
                </Link>
              </p>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col xs={12} className="text-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.3)', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0', opacity: 0.9 }}>
              © 2025 HuertoHogar. Todos los derechos reservados. 🌱
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;