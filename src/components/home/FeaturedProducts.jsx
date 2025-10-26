import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProductImage } from '../../utils/imageUtils';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
};

const FeaturedProducts = ({ products = [] }) => {
  const { addToCart } = useCart();
  
  const featuredProducts = useMemo(() => {
    return products
      .filter(product => product.destacado || product.rating >= 4)
      .slice(0, 6);
  }, [products]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-5 bg-light" aria-labelledby="featured-products-title">
      <Container>
        <div className="text-center mb-5">
          <h2 id="featured-products-title" className="mb-2">Productos Destacados</h2>
          <p className="text-muted">Descubre nuestra selección especial de productos orgánicos</p>
        </div>

        <Row className="g-4">
          {featuredProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Link 
                to={`/productos/${product.id}`}
                className="text-decoration-none"
                aria-labelledby={`product-title-${product.id}`}
              >
                <div className="card h-100 featured-card">
                  <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                    <img 
                      src={getProductImage(product.image, product.category)} 
                      alt=""
                      loading="lazy"
                      className="card-img-top h-100 w-100"
                      style={{ objectFit: 'contain', objectPosition: 'center', padding: '8px' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getProductImage('', product.category);
                      }}
                    />
                    {product.badge && (
                      <span className="position-absolute top-0 start-0 badge bg-danger m-2">{product.badge}</span>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <small className="text-muted">{product.category}</small>
                    <h5 id={`product-title-${product.id}`} className="card-title mt-2">
                      {product.name}
                    </h5>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                      <span className="fw-bold text-success">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={(e) => handleAddToCart(product, e)}
                        aria-label={`Añadir ${product.name} al carrito`}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProducts;