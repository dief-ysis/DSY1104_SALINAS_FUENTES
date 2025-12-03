/**
 * FEATURED CATEGORIES - CATEGORÍAS DESTACADAS
 * 
 * Muestra las categorías principales de productos.
 */

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FeaturedCategories.css';

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'FRUTAS',
      name: 'Frutas Frescas',
      icon: '🍎',
      description: 'Las frutas más frescas y dulces',
      color: '#ff6b6b'
    },
    {
      id: 'VERDURAS',
      name: 'Verduras Orgánicas',
      icon: '🥬',
      description: 'Verduras cultivadas sin químicos',
      color: '#51cf66'
    },
    {
      id: 'HIERBAS',
      name: 'Hierbas Aromáticas',
      icon: '🌿',
      description: 'Hierbas frescas para tu cocina',
      color: '#69db7c'
    },
    {
      id: 'ORGANICOS',
      name: 'Productos Orgánicos',
      icon: '🌱',
      description: '100% naturales y certificados',
      color: '#94d82d'
    },
    {
      id: 'GRANOS',
      name: 'Granos y Cereales',
      icon: '🌾',
      description: 'Granos integrales y saludables',
      color: '#fab005'
    },
    {
      id: 'LACTEOS',
      name: 'Lácteos Artesanales',
      icon: '🧀',
      description: 'Productos lácteos de calidad',
      color: '#ffd43b'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/productos?categoria=${categoryId}`);
  };

  return (
    <div className="featured-categories">
      <div className="text-center mb-4">
        <h2 className="section-title">Explora por Categorías</h2>
        <p className="section-subtitle">
          Encuentra exactamente lo que necesitas
        </p>
      </div>

      <Row xs={2} md={3} lg={6} className="g-3">
        {categories.map((category) => (
          <Col key={category.id}>
            <Card 
              className="category-card"
              onClick={() => handleCategoryClick(category.id)}
              style={{ '--category-color': category.color }}
            >
              <Card.Body className="text-center">
                <div className="category-icon">{category.icon}</div>
                <h5 className="category-name">{category.name}</h5>
                <p className="category-description">{category.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedCategories;