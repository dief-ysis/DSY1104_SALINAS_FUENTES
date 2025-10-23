import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail = () => {
  const { product } = useLoaderData();
  const navigation = useNavigation();
  const { addToCart } = useCart();

  if (navigation.state === 'loading') {
    return (
      <Container className="text-center mt-5">
        <LoadingSpinner />
      </Container>
    );
  }

  if (!product) {
    return <p className="text-center">Producto no encontrado</p>;
  }

  return (
    <Container className="mt-4">
      <Row className="g-4">
        <Col xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid w-100"
          />
        </Col>
        <Col xs={12} md={6}>
          <h1 className="h2 mb-3">{product.name}</h1>
          <h2 className="h4 text-primary mb-3">${product.price}</h2>
          <p className="mb-4">{product.description}</p>
          <Button 
            variant="primary"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;