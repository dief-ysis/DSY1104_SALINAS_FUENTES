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
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="mb-2">🎉 Ofertas Especiales</h2>
          <p className="text-muted">
            Aprovecha nuestras mejores ofertas en productos frescos de HuertoHogar
          </p>
        </div>

        <Row className="g-4 mb-5">
          {displayOffers.map((offer) => (
            <Col key={offer.id} xs={12} sm={6} md={4} lg={3}>
              <div className="position-relative offer-card-wrapper">
                {/* Badge de descuento */}
                {offer.discount && (
                  <div className="position-absolute top-0 start-0 badge bg-danger rounded-circle discount-badge">
                    -{offer.discount}%
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
            >
              Ver Todas las Ofertas →
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}