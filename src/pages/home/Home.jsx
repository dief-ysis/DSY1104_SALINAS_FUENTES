/**
 * HOME PAGE - PÁGINA PRINCIPAL
 * 
 * Integra todos los componentes del home:
 * - Hero banner
 * - Categorías destacadas
 * - Productos destacados
 * - Ofertas especiales
 */

import React from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../../components/home/Hero';
import FeaturedCategories from '../../components/home/FeaturedCategories';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import FeaturedOffers from '../../components/home/FeaturedOffers';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* HERO BANNER */}
      <Hero />

      {/* CATEGORÍAS DESTACADAS */}
      <section className="featured-section">
        <Container>
          <FeaturedCategories />
        </Container>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="featured-section bg-light">
        <Container>
          <FeaturedProducts />
        </Container>
      </section>

      {/* OFERTAS ESPECIALES */}
      <section className="featured-section">
        <Container>
          <FeaturedOffers />
        </Container>
      </section>
    </div>
  );
};

export default Home;