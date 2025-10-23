import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" aria-label="Sección principal de la página">
      <div className="hero-content">
        <span className="hero-badge">🌱 Productos Orgánicos</span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Frescura y naturalidad en tu mesa
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Descubre nuestra selección de productos orgánicos cultivados con amor y cuidado por el medio ambiente. Llevamos lo mejor de la naturaleza directamente a tu hogar.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <Link 
            to="/productos" 
            className="hero-button"
            role="button"
            aria-label="Ver catálogo completo de productos"
          >
            Ver catálogo →
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="hero-image-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img 
          src="/assets/images/hero-bg.jpg"
          alt="Frutas y verduras frescas orgánicas"
          className="hero-bg"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero-overlay"></div>
      </motion.div>
    </section>
  );
}

