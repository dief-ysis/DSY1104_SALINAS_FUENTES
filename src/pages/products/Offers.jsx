import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useProducts } from '../../hooks/useProducts';
import { useScrollToTop } from '../../hooks/useScrollToTop.js';
import { ProductCard } from '../../components/products/ProductCard';

const Offers = () => {
  useScrollToTop();

  const { products, loading, error } = useProducts();
  
  if (loading) {
    return (
      <div data-testid="loading-spinner" className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }
  
  // Filtrar productos que tienen descuento
  const offerProducts = products.filter(product => product.price < 2000);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Ofertas Especiales</h1>
      <Row>
        {offerProducts.length > 0 ? (
          offerProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} lg={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h3>No hay ofertas disponibles en este momento</h3>
                <p>¡Vuelve pronto para ver nuevas ofertas!</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Offers;