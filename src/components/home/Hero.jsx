import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" aria-label="Mensaje principal">
      <div className="hero-content">
        <h1>Frescura y naturalidad en tu mesa</h1>
        <p>Descubre nuestra selección de productos orgánicos cultivados con amor y cuidado por el medio ambiente</p>
        <Link 
          to="/productos" 
          className="hero-button"
          role="button"
          aria-label="Ver catálogo de productos"
        >
          Ver catálogo
        </Link>
      </div>
      <img 
        src="/assets/images/hero-bg.jpg"
        alt=""
        className="hero-bg"
        aria-hidden="true"
        loading="eager"
        fetchpriority="high"
      />
    </section>
  );
}

