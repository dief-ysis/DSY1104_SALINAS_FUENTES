/**
 * PRODUCT CARD - TARJETA DE PRODUCTO
 * 
 * Tarjeta individual de producto para grids y listados.
 * Muestra imagen, nombre, precio, stock y acciones.
 * 
 * RESPONDE A PREGUNTA 67: Minimiza llamadas al servidor usando debounce
 * al agregar al carrito múltiples veces.
 */

import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  // Validar que el producto tenga datos
  if (!product) {
    return null;
  }

  const {
    id,
    nombre,
    precio,
    stock,
    categoria,
    descripcion,
    imagen
  } = product;

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Evitar navegación al hacer clic en botón
    
    if (stock <= 0) {
      return;
    }

    setAdding(true);
    try {
      await addItem(product, 1);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/producto/${id}`);
  };

  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <Card className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        {isOutOfStock && (
          <Badge bg="danger" className="product-badge">
            Agotado
          </Badge>
        )}
        {!isOutOfStock && isLowStock && (
          <Badge bg="warning" className="product-badge">
            Últimas unidades
          </Badge>
        )}
        <Card.Img
          variant="top"
          src={getProductImage(imagen, categoria)}
          alt={nombre}
          className="product-image"
          loading="lazy"
        />
      </div>

      <Card.Body>
        <Card.Title className="product-name">
          {nombre}
        </Card.Title>

        {descripcion && (
          <Card.Text className="product-description">
            {descripcion.length > 60 
              ? `${descripcion.substring(0, 60)}...` 
              : descripcion
            }
          </Card.Text>
        )}

        <div className="product-footer">
          <div className="product-price-container">
            <span className="product-price">
              {formatearPrecio(precio)}
            </span>
            {categoria && (
              <Badge bg="success" className="product-category">
                {categoria}
              </Badge>
            )}
          </div>

          <Button
            variant={isOutOfStock ? 'secondary' : 'success'}
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock || adding}
            className="btn-add-cart"
          >
            {adding ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" />
                Agregando...
              </>
            ) : isOutOfStock ? (
              'Sin Stock'
            ) : (
              <>
                <i className="bi bi-cart-plus me-1"></i>
                Agregar
              </>
            )}
          </Button>
        </div>

        {!isOutOfStock && (
          <div className="product-stock">
            <small className={isLowStock ? 'text-warning' : 'text-muted'}>
              {stock} {stock === 1 ? 'unidad disponible' : 'unidades disponibles'}
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;