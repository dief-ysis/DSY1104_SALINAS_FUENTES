import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const { id, nombre, precioCLP, imagen, stock = 0, descripcion, name, price, description, image, origin, practices } = product;
  const productName = nombre || name || '';
  const desc = descripcion || description || '';
  const productImage = imagen || image || '';
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
      className="h-100 shadow-sm" 
      role="article"
      style={{ 
        transition: 'transform 0.2s, box-shadow 0.2s',
        borderTop: isOrganic ? '3px solid #28a745' : 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      {/* Badge de Orgánico */}
      {isOrganic && (
        <Badge 
          bg="success" 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            padding: '6px 10px',
            fontSize: '0.8rem'
          }}
        >
          🌿 Orgánico
        </Badge>
      )}

      <Link to={`/productos/${id}`} className="text-decoration-none">
        <img 
          variant="top" 
          src={productImage}
          alt={productName}
          loading="lazy"
          className="img-fluid"
          style={{ height: '200px', objectFit: 'cover', display: 'block', width: '100%' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column p-3">
        <Link to={`/productos/${id}`} className="text-decoration-none">
          <Card.Title className="text-dark mb-2" style={{ fontSize: '1rem', minHeight: '2.2em' }}>
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
          <small className="text-muted d-block mb-2" style={{ fontSize: '0.8rem' }}>
            <strong>🌱</strong> {practices.substring(0, 50)}{practices.length > 50 ? '...' : ''}
          </small>
        )}

        <Card.Text className="text-muted mb-3" style={{ fontSize: '0.9rem', minHeight: '2.1em' }}>
          {desc && desc.length > 60 
            ? `${desc.substring(0, 60)}...` 
            : desc}
        </Card.Text>

        {/* Barra de stock visual */}
        {stock > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <small className="text-muted d-block mb-1">
              Stock: {stock}
            </small>
            <div 
              style={{
                backgroundColor: '#e9ecef',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  backgroundColor: stock > 20 ? '#28a745' : stock > 5 ? '#ffc107' : '#dc3545',
                  height: '100%',
                  width: `${Math.min((stock / 100) * 100, 100)}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 text-success mb-0" style={{ fontSize: '1.2rem' }}>
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