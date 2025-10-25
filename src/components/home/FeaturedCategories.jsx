import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/sections/featured-categories.css';

// HH-012: Categorías destacadas con navegación
const FEATURED_CATEGORIES = [
  {
    id: 'frutas',
    name: 'Frutas Frescas',
    description: 'Selección de frutas orgánicas de temporada',
    image: '/assets/images/categories/frutas-frescas.jpg',
    icon: '🍎',
  },
  {
    id: 'verduras',
    name: 'Vegetales Verdes',
    description: 'Verduras cultivadas sin pesticidas',
    image: '/assets/images/categories/vegetales-verdes.png',
    icon: '🥬',
  },
  {
    id: 'organicos',
    name: 'Productos Orgánicos',
    description: 'Productos naturales certificados',
    image: '/assets/images/categories/organicos.webp',
    icon: '🌱',
  },
];

export function FeaturedCategories({ categories = FEATURED_CATEGORIES }) {
  // Validar que categories sea un array
  const categoryList = Array.isArray(categories) ? categories : FEATURED_CATEGORIES;

  return (
    <section className="py-5 bg-light" aria-labelledby="featured-categories-title">
      <Container>
        <div className="text-center mb-5">
          <h2 id="featured-categories-title" className="mb-2">Categorías Destacadas</h2>
          <p className="text-muted">Encuentra los mejores productos organizados para ti</p>
        </div>
        
        <Row className="g-4">
          {categoryList.map(category => (
            <Col key={category.id} xs={12} md={6} lg={4}>
              <Link
                to={`/products?category=${category.name}`}
                className="text-decoration-none"
                aria-labelledby={`category-title-${category.id}`}
              >
                <div className="card h-100 category-card overflow-hidden">
                  <div className="position-relative" style={{ height: '200px' }}>
                    <img
                      src={category.image}
                      alt=""
                      loading="lazy"
                      className="card-img-top h-100 w-100"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="category-overlay"></div>
                  </div>
                  <div className="card-body text-center">
                    <div className="fs-3 mb-2">{category.icon}</div>
                    <h3 id={`category-title-${category.id}`} className="card-title">{category.name}</h3>
                    <p className="card-text text-muted small">{category.description}</p>
                    <span className="text-primary">Explorar →</span>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedCategories;