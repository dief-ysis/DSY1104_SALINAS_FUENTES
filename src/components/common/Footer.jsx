import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/layout/footer.css';

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
    <footer className="footer bg-success text-white mt-5">
      <Container className="py-5">
        <Row className="mb-5">
          {/* Columna 1: Información de la empresa */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <div className="mb-3">
              <h5 className="footer-title">🌱 HuertoHogar</h5>
              <p className="footer-text">
                Fresco, local y responsable. Llevamos productos orgánicos de calidad directamente desde el campo a tu mesa.
              </p>
            </div>
            
            {/* Redes Sociales */}
            <div>
              <h6 className="footer-subtitle">Síguenos</h6>
              <div className="footer-social">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="footer-social-link"
                >
                  📷
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="footer-social-link"
                >
                  👍
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="footer-social-link"
                >
                  🐦
                </a>
              </div>
            </div>
          </Col>

          {/* Columna 2: Contacto e Información */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="footer-title">📞 Contáctanos</h5>
            <div className="footer-contact">
              <p>
                <strong>📍 Dirección:</strong><br/>
                Av. Vicuña Mackenna 4917, San Joaquín
              </p>
              <p>
                <strong>☎️ Teléfono:</strong><br/>
                +56 9 1234 5678
              </p>
              <p>
                <strong>📧 Email:</strong><br/>
                contacto@huertohogar.cl
              </p>
              <p>
                <strong>🕒 Horario:</strong><br/>
                Lunes-Viernes: 9:00-18:00 hrs<br/>
                Sábado: 9:00-14:00 hrs
              </p>
            </div>
          </Col>

          {/* Columna 3: Newsletter */}
          <Col xs={12} md={4}>
            <h5 className="footer-title">📧 Newsletter</h5>
            <p className="footer-text small mb-3">
              Suscríbete para recibir ofertas especiales y consejos de agricultura orgánica
            </p>
            
            {showSuccess && (
              <Alert variant="success" className="footer-alert">
                ✓ Suscripción exitosa
              </Alert>
            )}
            {showError && (
              <Alert variant="danger" className="footer-alert">
                ✗ Email inválido
              </Alert>
            )}
            
            <Form onSubmit={handleNewsletterSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-input"
                />
              </Form.Group>
              <Button
                type="submit"
                className="footer-btn-subscribe w-100"
              >
                Suscribirse
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Separador */}
        <Row>
          <Col xs={12}>
            <hr className="footer-divider" />
          </Col>
        </Row>

        {/* Links útiles */}
        <Row className="mb-4">
          <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
            <h6 className="footer-subtitle">Compra</h6>
            <div className="footer-links">
              <p className="m-0">
                <Link to="/" className="footer-link">
                  Inicio
                </Link>
              </p>
              <p className="m-0">
                <Link to="/productos" className="footer-link">
                  Productos
                </Link>
              </p>
              <p className="m-0">
                <Link to="/ofertas" className="footer-link">
                  Ofertas
                </Link>
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
            <h6 className="footer-subtitle">Información</h6>
            <div className="footer-links">
              <p className="m-0">
                <Link to="/blog" className="footer-link">
                  Blog
                </Link>
              </p>
              <p className="m-0">
                <Link to="/contacto" className="footer-link">
                  Contacto
                </Link>
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
            <h6 className="footer-subtitle">Mi Cuenta</h6>
            <div className="footer-links">
              <p className="m-0">
                <Link to="/" className="footer-link">
                  Iniciar Sesión
                </Link>
              </p>
              <p className="m-0">
                <Link to="/registro" className="footer-link">
                  Registrarse
                </Link>
              </p>
              <p className="m-0">
                <Link to="/carrito" className="footer-link">
                  Mi Carrito
                </Link>
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <h6 className="footer-subtitle">Legal</h6>
            <div className="footer-links">
              <p className="m-0">
                <Link to="#" className="footer-link">
                  Privacidad
                </Link>
              </p>
              <p className="m-0">
                <Link to="#" className="footer-link">
                  Términos
                </Link>
              </p>
              <p className="m-0">
                <Link to="#" className="footer-link">
                  Devoluciones
                </Link>
              </p>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col xs={12} className="text-center footer-copyright">
            <p className="mb-0">
              © 2025 HuertoHogar. Todos los derechos reservados. 🌱
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;