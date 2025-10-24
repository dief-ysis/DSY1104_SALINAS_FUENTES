import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section" aria-label="Sección principal de la página">
      <div className="hero-badge">Fresco · Local · Responsable</div>
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Del huerto a tu hogar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            Frutas, verduras y productos naturales seleccionados de productores locales. 
            Compra con confianza y apoya el consumo responsable.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Link 
              to="/productos" 
              className="btn btn-primary"
              role="link"
              aria-label="Ver productos"
            >
              Ver productos
            </Link>
            <Link 
              to="/categorias" 
              className="btn btn-outline-primary"
              role="link"
              aria-label="Explorar categorías"
            >
              Explorar categorías
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <img 
            src="/assets/images/hero-bowl.jpg"
            alt="Bowl de ensalada fresca y saludable"
            loading="eager"
            fetchpriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
