import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

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
    <Container className="mt-4 mb-5">
      <Row className="g-4 mb-5">
        <Col xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid w-100"
            style={{ borderRadius: '8px', objectFit: 'cover', maxHeight: '500px' }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h1 className="h2 mb-3">{product.name}</h1>
          <h2 className="h4 text-primary mb-3">${product.price} CLP</h2>
          
          {/* Stock disponible */}
          <div className="mb-3">
            <p className="mb-1">
              <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </p>
            <div 
              style={{
                backgroundColor: '#e9ecef',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  backgroundColor: product.stock > 20 ? '#28a745' : product.stock > 5 ? '#ffc107' : '#dc3545',
                  height: '100%',
                  width: `${Math.min((product.stock / 100) * 100, 100)}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
          </div>

          <p className="mb-4">{product.description}</p>
          
          {/* Origen */}
          {product.origin && (
            <div className="mb-3 p-3" style={{ backgroundColor: '#f0f8f0', borderRadius: '6px', borderLeft: '4px solid #2E8B57' }}>
              <h5 style={{ color: '#2E8B57', marginBottom: '8px' }}>📍 Origen</h5>
              <p style={{ margin: 0 }}>{product.origin}</p>
            </div>
          )}

          {/* Prácticas de cultivo */}
          {product.practices && (
            <div className="mb-3 p-3" style={{ backgroundColor: '#f5fff5', borderRadius: '6px', borderLeft: '4px solid #28a745' }}>
              <h5 style={{ color: '#28a745', marginBottom: '8px' }}>🌱 Prácticas de Cultivo</h5>
              <p style={{ margin: 0 }}>{product.practices}</p>
            </div>
          )}

          <Button 
            variant="success"
            size="lg"
            onClick={() => addToCart(product)}
            className="mt-3"
          >
            ✓ Agregar al carrito
          </Button>
        </Col>
      </Row>

      {/* Recetas */}
      {product.recipes && product.recipes.length > 0 && (
        <Row className="mb-5">
          <Col xs={12}>
            <h3 style={{ color: '#2E8B57', marginBottom: '20px', borderBottom: '2px solid #FFD700', paddingBottom: '10px' }}>
              🍳 Recetas con {product.name}
            </h3>
            <Row className="g-3">
              {product.recipes.map((recipe, idx) => (
                <Col xs={12} sm={6} md={6} lg={3} key={idx}>
                  <div 
                    className="p-3"
                    style={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      minHeight: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <h6 style={{ color: '#2E8B57', marginBottom: '8px' }}>
                        Receta {idx + 1}
                      </h6>
                      <p style={{ fontSize: '0.9rem', margin: 0 }}>{recipe}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* Información adicional */}
      <Row>
        <Col xs={12}>
          <div className="p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <Row>
              <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>Categoría:</strong><br />
                  {product.category}
                </p>
              </Col>
              <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>Unidad:</strong><br />
                  {product.unit}
                </p>
              </Col>
              <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>Código:</strong><br />
                  {product.id}
                </p>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  <strong>Stock:</strong><br />
                  {product.stock} unidades
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;