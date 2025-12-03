/**
 * FEATURED OFFERS - OFERTAS DESTACADAS
 * 
 * Banner de ofertas y promociones especiales.
 */

import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FeaturedOffers.css';

const FeaturedOffers = () => {
  const navigate = useNavigate();

  const offers = [
    {
      id: 1,
      title: 'Envío Gratis',
      subtitle: 'En compras sobre $20.000',
      icon: '🚚',
      color: '#51cf66',
      action: () => navigate('/productos')
    },
    {
      id: 2,
      title: '20% Descuento',
      subtitle: 'En frutas de temporada',
      icon: '🍓',
      color: '#ff6b6b',
      badge: 'HOY',
      action: () => navigate('/productos?categoria=FRUTAS')
    },
    {
      id: 3,
      title: 'Pack Saludable',
      subtitle: '5 verduras por $15.000',
      icon: '🥗',
      color: '#94d82d',
      badge: 'NUEVO',
      action: () => navigate('/productos?categoria=VERDURAS')
    }
  ];

  return (
    <div className="featured-offers">
      <div className="text-center mb-4">
        <h2 className="section-title">Ofertas Especiales</h2>
        <p className="section-subtitle">
          Aprovecha nuestras promociones limitadas
        </p>
      </div>

      <Row xs={1} md={3} className="g-4">
        {offers.map((offer) => (
          <Col key={offer.id}>
            <Card 
              className="offer-card"
              onClick={offer.action}
              style={{ '--offer-color': offer.color }}
            >
              <Card.Body className="text-center">
                {offer.badge && (
                  <Badge 
                    bg="danger" 
                    className="offer-badge"
                  >
                    {offer.badge}
                  </Badge>
                )}
                <div className="offer-icon">{offer.icon}</div>
                <h4 className="offer-title">{offer.title}</h4>
                <p className="offer-subtitle">{offer.subtitle}</p>
                <button className="btn-offer">
                  Ver Más →
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedOffers;