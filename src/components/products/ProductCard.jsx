import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, nombre, precioCLP, imagen, stock = 0, descripcion, name, price, description, image } = product;
  const productName = nombre || name || '';
  const desc = descripcion || description || '';
  const productImage = imagen || image || '';
  const parsedPrice = typeof precioCLP === 'string' ? parseFloat(precioCLP) : (precioCLP || price || 0);
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    if (stock > 0) {
      addItem(product);
    }
  };

  return (
    <Card className="h-100 shadow-sm" role="article">
      <Link to={`/productos/${id}`} className="text-decoration-none">
          <img 
          variant="top" 
          src={productImage}
          alt={productName}
          loading="lazy"
          className="img-fluid"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/productos/${id}`} className="text-decoration-none">
            <Card.Title className="text-dark">{productName}</Card.Title>
        </Link>
        <Card.Text className="text-muted mb-2">
          {desc && desc.length > 100 
            ? `${desc.substring(0, 100)}...` 
            : desc}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="h5 text-brown mb-0">
              {formatearPrecio(parsedPrice)}
            </span>
            <Badge bg={stock > 0 ? 'warning' : 'danger'}>
              {stock > 0 ? `Stock: ${stock}` : 'Agotado'}
            </Badge>
          </div>
          <small className="text-muted d-block mb-2">
            Origen: {product.origen || 'No especificado'}
          </small>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-emerald"
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
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;