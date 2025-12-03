/**
 * OFFERS PAGE - PÁGINA DE OFERTAS
 * 
 * Muestra productos en oferta con descuentos especiales.
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCart } from '../../context/CartContext';
import './Offers.css';

const Offers = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        
        // TODO: Cuando backend esté listo, usar endpoint específico de ofertas
        // const response = await productService.getOffers();
        
        // Por ahora, obtener productos y filtrar los que tienen descuento
        const response = await productService.getProducts({ page: 0, size: 50 });
        const allProducts = response.content || response || [];
        
        // Filtrar productos con descuento > 0
        const productsWithOffers = allProducts.filter(product => 
          (product.descuento || product.discount || 0) > 0
        );
        
        setOffers(productsWithOffers);
      } catch (err) {
        console.error('Error al cargar ofertas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const handleAddToCart = async (product) => {
    await addItem(product, 1);
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Cargando ofertas..." />;
  }

  return (
    <Container className="offers-page">
      <div className="offers-header">
        <h1>🔥 Ofertas Especiales</h1>
        <p className="lead">Aprovecha nuestras mejores ofertas en productos orgánicos</p>
      </div>

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Error al cargar ofertas</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {!error && offers.length === 0 && (
        <Alert variant="info" className="text-center">
          <h4>No hay ofertas disponibles en este momento</h4>
          <p>Vuelve pronto para ver nuestras próximas ofertas especiales</p>
        </Alert>
      )}

      <Row className="g-4">
        {offers.map((product) => {
          const price = product.precio || product.price || 0;
          const discount = product.descuento || product.discount || 0;
          const discountedPrice = calculateDiscountedPrice(price, discount);
          const savings = price - discountedPrice;

          return (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="offer-card h-100">
                <div className="offer-badge-container">
                  <Badge bg="danger" className="offer-badge">
                    -{discount}%
                  </Badge>
                </div>

                <div 
                  className="offer-image-container"
                  onClick={() => navigate(`/producto/${product.id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={getProductImage(
                      product.imagen || product.image,
                      product.categoria || product.category
                    )}
                    alt={product.nombre || product.name}
                    className="offer-image"
                  />
                </div>

                <Card.Body>
                  <Card.Title 
                    className="offer-title"
                    onClick={() => navigate(`/producto/${product.id}`)}
                  >
                    {product.nombre || product.name}
                  </Card.Title>

                  {(product.categoria || product.category) && (
                    <Badge bg="success" className="mb-2">
                      {product.categoria || product.category}
                    </Badge>
                  )}

                  <div className="offer-pricing">
                    <div className="offer-original-price">
                      Antes: <del>{formatearPrecio(price)}</del>
                    </div>
                    <div className="offer-discounted-price">
                      Ahora: <strong>{formatearPrecio(discountedPrice)}</strong>
                    </div>
                    <div className="offer-savings">
                      Ahorras: {formatearPrecio(savings)}
                    </div>
                  </div>

                  <div className="offer-actions">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.stock || product.stock <= 0}
                    >
                      {product.stock > 0 ? (
                        <>
                          <i className="bi bi-cart-plus me-2"></i>
                          Agregar al Carrito
                        </>
                      ) : (
                        'Sin Stock'
                      )}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {offers.length > 0 && (
        <div className="offers-cta text-center mt-5">
          <h3>¿Buscas más productos?</h3>
          <p>Explora nuestro catálogo completo</p>
          <button
            className="btn btn-outline-success btn-lg"
            onClick={() => navigate('/productos')}
          >
            Ver Todos los Productos
          </button>
        </div>
      )}
    </Container>
  );
};

export default Offers;