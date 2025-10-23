import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../../css/components/FeaturedProducts.css';

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
    <section className="featured-products" aria-labelledby="featured-products-title">
      <Container>
        <header className="featured-header">
          <h2 id="featured-products-title">Productos Destacados</h2>
          <p>Descubre nuestra selección especial de productos orgánicos</p>
        </header>

        <div className="products-grid">
          {featuredProducts.map(product => (
            <Link 
              key={product.id}
              to={`/productos/${product.id}`}
              className="product-card"
              aria-labelledby={`product-title-${product.id}`}
            >
              <div className="product-image">
                <img 
                  src={product.image} 
                  alt=""
                  loading="lazy"
                />
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
              </div>
              <div className="product-content">
                <div className="product-category">{product.category}</div>
                <h3 id={`product-title-${product.id}`} className="product-title">
                  {product.name}
                </h3>
                <div className="product-meta">
                  <span className="product-price">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    type="button"
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                    aria-label={`Añadir ${product.name} al carrito`}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;