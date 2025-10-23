import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Hero.css';

export function Hero() {
  return (
    <div className="hero">
      <Container>
        <div className="hero-content">
          <h1>Del huerto a tu hogar</h1>
          <p>Frutas, verduras y productos naturales</p>
          <Link to="/productos" className="hero-button">Ver catálogo</Link>
        </div>
      </Container>
      <img 
        src="/assets/images/hero-bg.jpg"
        alt="Selección de productos orgánicos frescos"
        className="hero-bg"
      />
    </div>
  );
};

