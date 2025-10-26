import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import '../../styles/products/product-card.css';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, nombre, precioCLP, imagen, stock = 0, descripcion, name, price, description, image, origin, practices } = product;
  const productName = nombre || name || '';
  const desc = descripcion || description || '';
  const productImage = image || imagen || '';
  const parsedPrice = typeof precioCLP === 'string' ? parseFloat(precioCLP) : (precioCLP || price || 0);
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
      <Link to={`/productos/${id}`} className="text-decoration-none">
        <div className="product-image-container">
          {/* Badge positioned absolutely over the image */}
          {isOrganic && (
            <Badge 
              bg="warning" 
              className="position-absolute top-0 start-0 product-card-badge"
              text="dark"
            >
              🌿 Orgánico
            </Badge>
          )}
          
          <img 
            src={productImage}
            alt={productName}
            loading="lazy"
            className="img-fluid product-card-image"
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
            <span className="h5 text-success mb-0 product-card-price">
              {formatearPrecio(parsedPrice)}
            </span>
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