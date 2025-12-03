/**
 * FOOTER - PIE DE PÁGINA
 * 
 * Footer completo con:
 * - Información de la empresa
 * - Links de navegación
 * - Redes sociales
 * - Newsletter
 * - Información legal
 */

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrar con backend
    alert('¡Gracias por suscribirte!');
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          {/* COLUMNA 1: SOBRE NOSOTROS */}
          <Col md={6} lg={3} className="mb-4">
            <h5 className="footer-title">
              <span className="footer-icon">🌱</span>
              HuertoHogar
            </h5>
            <p className="footer-description">
              Productos frescos y orgánicos, directo del campo a tu hogar.
              Apoyamos a agricultores locales y promovemos una alimentación saludable.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                📘
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                📸
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                🐦
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                🎥
              </a>
            </div>
          </Col>

          {/* COLUMNA 2: LINKS RÁPIDOS */}
          <Col md={6} lg={2} className="mb-4">
            <h6 className="footer-subtitle">Enlaces Rápidos</h6>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>

          {/* COLUMNA 3: CATEGORÍAS */}
          <Col md={6} lg={2} className="mb-4">
            <h6 className="footer-subtitle">Categorías</h6>
            <ul className="footer-links">
              <li><Link to="/productos?categoria=FRUTAS">Frutas</Link></li>
              <li><Link to="/productos?categoria=VERDURAS">Verduras</Link></li>
              <li><Link to="/productos?categoria=HIERBAS">Hierbas</Link></li>
              <li><Link to="/productos?categoria=ORGANICOS">Orgánicos</Link></li>
              <li><Link to="/productos?categoria=GRANOS">Granos</Link></li>
              <li><Link to="/productos?categoria=LACTEOS">Lácteos</Link></li>
            </ul>
          </Col>

          {/* COLUMNA 4: NEWSLETTER */}
          <Col md={6} lg={5} className="mb-4">
            <h6 className="footer-subtitle">Newsletter</h6>
            <p className="footer-newsletter-text">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </p>
            <Form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <Form.Group className="d-flex gap-2">
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="newsletter-input"
                />
                <Button type="submit" variant="success" className="newsletter-button">
                  Suscribir
                </Button>
              </Form.Group>
            </Form>

            {/* CONTACTO */}
            <div className="footer-contact mt-4">
              <h6 className="footer-subtitle">Contacto</h6>
              <p className="mb-1">📧 contacto@huertohogar.cl</p>
              <p className="mb-1">📞 +56 9 1234 5678</p>
              <p className="mb-0">📍 Santiago, Chile</p>
            </div>
          </Col>
        </Row>

        {/* BOTTOM BAR */}
        <Row className="footer-bottom py-3">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0 footer-copyright">
              © {new Date().getFullYear()} HuertoHogar. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="footer-legal-links">
              <Link to="/terminos">Términos y Condiciones</Link>
              <span className="separator">|</span>
              <Link to="/privacidad">Política de Privacidad</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;