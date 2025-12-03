/**
 * HERO - BANNER PRINCIPAL
 * 
 * Banner hero del home con llamada a la acción.
 */

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <Container>
        <div className="hero-content">
          <h1 className="hero-title">
            Del Campo a tu Mesa
          </h1>
          <p className="hero-subtitle">
            Productos frescos y orgánicos, cultivados con amor por agricultores locales
          </p>
          <div className="hero-actions">
            <Button 
              variant="success"
              size="lg"
              onClick={() => navigate('/productos')}
              className="hero-btn-primary"
            >
              Ver Productos
            </Button>
            <Button 
              variant="outline-light"
              size="lg"
              onClick={() => navigate('/nosotros')}
              className="hero-btn-secondary"
            >
              Conoce Más
            </Button>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="hero-feature-icon">🌱</span>
              <span className="hero-feature-text">100% Orgánico</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">🚚</span>
              <span className="hero-feature-text">Envío Gratis</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">💚</span>
              <span className="hero-feature-text">Comercio Justo</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;