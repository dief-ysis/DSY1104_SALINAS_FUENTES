import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../../css/components/FeaturedCategories.css';

export const FeaturedCategories = ({ categories = [] }) => {
  return (
    <section className="featured-categories py-5">
      <Container>
        <h2 className="text-center mb-4">Categorías Destacadas</h2>
        <Row>
          {categories.map(category => (
            <Col key={category.id} xs={12} md={4}>
              <LinkContainer to={{ pathname: '/products', search: `?category=${encodeURIComponent(category.name)}` }}>
                <Card as="a" href={`/products?category=${encodeURIComponent(category.name)}`} className="category-card h-100">
                  <Card.Img variant="top" src={category.image} alt={category.name} />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                  </Card.Body>
                </Card>
              </LinkContainer>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedCategories;