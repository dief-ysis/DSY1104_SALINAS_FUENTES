import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCard } from '../products/ProductCard';
import '../../styles/sections/featured-offers.css';

export default function FeaturedOffers({ offers }) {
  if (!offers || offers.length === 0) {
    return null;
  }

  // Mostrar solo los primeros 4 productos en oferta
  const displayOffers = offers.slice(0, 4);

  return (
    <section className="featured-offers">
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
            <div className="featured-offers-header">
              <h2 className="featured-offers-title">
                🎉 Ofertas Especiales
              </h2>
              <p className="featured-offers-subtitle">
                Aprovecha nuestras mejores ofertas en productos frescos de HuertoHogar
              </p>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          {displayOffers.map((offer) => (
            <Col key={offer.id} xs={12} sm={6} md={4} lg={3}>
              <div className="offer-card-wrapper">
                {/* Badge de descuento */}
                {offer.discount && (
                  <div className="discount-badge">
                    <div className="discount-value">-{offer.discount}%</div>
                  </div>
                )}
                <ProductCard product={offer} />
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Col xs={12} className="text-center">
            <Button 
              as={Link}
              to="/ofertas"
              variant="success"
              size="lg"
              className="view-all-offers-btn"
            >
              Ver Todas las Ofertas →
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
