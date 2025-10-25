import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/sections/hero.css';

function Hero() {
  return (
    <section 
      className="hero-section"
      aria-label="Sección principal de la página"
    >
      <div className="hero-overlay"></div>
      <Container className="position-relative hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="badge bg-success text-white mb-4 d-inline-block">
            Fresco · Local · Responsable
          </div>
        </motion.div>

        <Row className="align-items-center">
          <Col lg={6} className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="display-4 fw-bold mb-3">
                Del huerto a tu hogar
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <p className="lead mb-4">
                Frutas, verduras y productos naturales seleccionados de productores locales. 
                Compra con confianza y apoya el consumo responsable.
              </p>
            </motion.div>

            <motion.div
              className="d-flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <Link 
                to="/productos" 
                className="btn btn-success btn-lg"
                role="link"
                aria-label="Ver productos"
              >
                Ver productos
              </Link>
              <Link 
                to="/productos" 
                className="btn btn-outline-light btn-lg"
                role="link"
                aria-label="Explorar categorías"
              >
                Explorar categorías
              </Link>
            </motion.div>
          </Col>

          <Col lg={6} className="d-none d-lg-block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <img 
                src="/assets/images/hero.jpg"
                alt="Frutas y verduras frescas"
                loading="eager"
                fetchpriority="high"
                className="w-100"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;