import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../../../css/components/FeaturedProducts.css';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="featured-products py-5">
      <Container>
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <Row>
          {products.map(product => (
            <Col key={product.id} xs={12} md={6} lg={4}>
              <LinkContainer to={`/products/${product.id}`}>
                <Card className="product-card h-100">
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-primary">${product.price}</Card.Text>
                    <Card.Text>{product.category}</Card.Text>
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

export default FeaturedProducts;