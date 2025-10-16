import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, name, price, image, description } = product;

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <Card className="h-100 shadow-sm" role="article">
      <Link to={`/productos/${id}`} className="text-decoration-none">
        <Card.Img 
          variant="top" 
          src={image} 
          alt={name}
          className="img-fluid"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/productos/${id}`} className="text-decoration-none">
          <Card.Title className="text-dark">{name}</Card.Title>
        </Link>
        <Card.Text className="text-muted mb-2">
          {description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description}
        </Card.Text>
        <div className="mt-auto">
          <Card.Text className="fs-5 fw-bold mb-2">
            {formatearPrecio(price)}
          </Card.Text>
          <Button 
            variant="success" 
            onClick={handleAddToCart}
            className="w-100"
          >
            Agregar al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}