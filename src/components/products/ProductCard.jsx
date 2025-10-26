import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import '../../styles/products/product-card.css';

// Helper function to calculate discounted price
function calculateDiscountedPrice(price, discountPercentage) {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
}

export function ProductCard({ product }) {
  const { addItem } = useCart();
  // Usar propiedades normalizadas que devuelve productService.normalizeProduct
  const {
    id,
    name,
    price,
    image,
    stock = 0,
    description,
    origin,
    practices,
    category,
    onSale,
    discountPercentage
  } = product;

  const productName = name || '';
  const desc = description || '';
  const productImage = image || '';
  const parsedPrice = Number(price || 0);
  const isOutOfStock = stock <= 0;
  
  // Verificar si es orgánico
  const isOrganic = practices?.toLowerCase().includes('orgánico') || practices?.toLowerCase().includes('organico');

  const handleAddToCart = () => {
    if (stock > 0) {
      addItem(product);
    }
  };

  return (
    <Card 
      className={`h-100 shadow-sm product-card ${isOrganic ? 'organic' : ''}`}
      role="article"
    >
      {/* Badge de Orgánico */}
      {isOrganic && (
        <Badge 
          bg="success" 
          className="product-card-badge"
        >
          🌿 Orgánico
        </Badge>
      )}

      <Link to={`/productos/${id}`} className="text-decoration-none">
        <div className="product-image-container">
          <img 
            src={getProductImage(productImage, category)}
            alt={productName}
            loading="lazy"
            className="card-img-top product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getProductImage('', category);
            }}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column p-3">
        <Link to={`/productos/${id}`} className="text-decoration-none">
          <Card.Title className="text-dark mb-2 product-card-title">
            {productName}
          </Card.Title>
        </Link>

        {/* Origen */}
        {origin && (
          <small className="text-muted d-block mb-2">
            <strong>📍</strong> {origin}
          </small>
        )}

        {/* Prácticas */}
        {practices && (
          <small className="text-muted d-block mb-2 product-card-practices">
            <strong>🌱</strong> {practices.substring(0, 50)}{practices.length > 50 ? '...' : ''}
          </small>
        )}

        <Card.Text className="text-muted mb-3 product-card-description">
          {desc && desc.length > 60 
            ? `${desc.substring(0, 60)}...` 
            : desc}
        </Card.Text>

        {/* Barra de stock visual */}
        {stock > 0 && (
          <div className="mb-3">
            <small className="text-muted d-block mb-1">
              Stock: {stock}
            </small>
            <div className="stock-bar-container">
              <div 
                className={`stock-bar-fill ${stock > 20 ? 'stock-high' : stock > 5 ? 'stock-medium' : 'stock-low'}`}
                style={{ width: `${Math.min((stock / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              {onSale ? (
                <>
                  <span className="h5 text-success mb-0 product-card-price">
                    {formatearPrecio(calculateDiscountedPrice(parsedPrice, discountPercentage))}
                  </span>
                  <br/>
                  <small className="text-decoration-line-through text-muted">
                    {formatearPrecio(parsedPrice)}
                  </small>
                  <Badge bg="danger" className="ms-2">
                    -{discountPercentage}%
                  </Badge>
                </>
              ) : (
                <span className="h5 text-success mb-0 product-card-price">
                  {formatearPrecio(parsedPrice)}
                </span>
              )}
            </div>
            <Badge bg={stock > 0 ? 'warning' : 'danger'}>
              {stock > 0 ? `${stock} disp.` : 'Agotado'}
            </Badge>
          </div>

          <div className="d-flex gap-2">
            <Button 
              variant="outline-success"
              className="flex-grow-1 btn-sm"
              as={Link}
              to={`/productos/${id}`}
              data-testid="detail-button"
            >
              Ver Detalle
            </Button>
            <Button 
              variant="success"
              onClick={handleAddToCart}
              className="btn-sm"
              disabled={isOutOfStock}
              data-testid="add-cart-button"
            >
              {isOutOfStock ? 'Agotado' : 'Agregar'}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;