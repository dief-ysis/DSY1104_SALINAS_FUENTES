/**
 * CART PAGE - PÁGINA DEL CARRITO
 * 
 * Muestra el carrito completo con opciones de modificar cantidades,
 * eliminar productos y proceder al checkout.
 */

import React from 'react';
import { Container, Row, Col, Card, Button, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    loading,
    isEmpty,
    updateQuantity,
    removeItem,
    clearItems,
    subtotal,
    descuentos,
    total
  } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeItem(productId);
  };

  const handleClearCart = async () => {
    await clearItems();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Cargando carrito..." />;
  }

  return (
    <Container className="cart-page">
      <div className="cart-header">
        <h1>Mi Carrito</h1>
        <p className="text-muted">
          {isEmpty ? 'Tu carrito está vacío' : `${items.length} ${items.length === 1 ? 'producto' : 'productos'}`}
        </p>
      </div>

      {isEmpty ? (
        <Alert variant="info" className="empty-cart-alert">
          <h4>Tu carrito está vacío</h4>
          <p>¡Agrega productos para comenzar tu compra!</p>
          <Button variant="success" onClick={() => navigate('/productos')}>
            Explorar Productos
          </Button>
        </Alert>
      ) : (
        <Row>
          {/* LISTA DE PRODUCTOS */}
          <Col lg={8}>
            <Card className="cart-items-card">
              <Card.Header className="cart-items-header">
                <h5>Productos</h5>
                <Button variant="outline-danger" size="sm" onClick={handleClearCart}>
                  Vaciar Carrito
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="cart-items-list">
                  {items.map((item) => {
                    const productId = item.id || item.productoId;
                    const productName = item.nombre || item.name || 'Producto';
                    const productPrice = item.precio || item.price || 0;
                    const productImage = item.imagen || item.image;
                    const productCategory = item.categoria || item.category;
                    const quantity = item.cantidad || item.quantity || 1;
                    const stock = item.stock || 99;

                    return (
                      <div key={productId} className="cart-item">
                        <div className="cart-item-image">
                          <img
                            src={getProductImage(productImage, productCategory)}
                            alt={productName}
                          />
                        </div>

                        <div className="cart-item-info">
                          <h6 className="cart-item-name">{productName}</h6>
                          {productCategory && (
                            <span className="cart-item-category">{productCategory}</span>
                          )}
                          <p className="cart-item-price">
                            {formatearPrecio(productPrice)}
                          </p>
                        </div>

                        <div className="cart-item-quantity">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(productId, quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-value">{quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(productId, quantity + 1)}
                            disabled={quantity >= stock}
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-item-subtotal">
                          <p className="subtotal-label">Subtotal</p>
                          <p className="subtotal-value">
                            {formatearPrecio(productPrice * quantity)}
                          </p>
                        </div>

                        <div className="cart-item-remove">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveItem(productId)}
                            title="Eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RESUMEN */}
          <Col lg={4}>
            <Card className="cart-summary-card sticky-top">
              <Card.Header>
                <h5>Resumen del Pedido</h5>
              </Card.Header>
              <Card.Body>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatearPrecio(subtotal)}</span>
                </div>

                {descuentos > 0 && (
                  <div className="summary-row text-success">
                    <span>Descuentos:</span>
                    <span>-{formatearPrecio(descuentos)}</span>
                  </div>
                )}

                <div className="summary-row summary-shipping">
                  <span>Envío:</span>
                  <span className="text-success">
                    {total >= 20000 ? 'GRATIS' : formatearPrecio(2500)}
                  </span>
                </div>

                {total < 20000 && (
                  <Alert variant="info" className="shipping-alert">
                    <small>
                      ¡Agrega {formatearPrecio(20000 - total)} más para envío gratis!
                    </small>
                  </Alert>
                )}

                <hr />

                <div className="summary-row summary-total">
                  <strong>Total:</strong>
                  <strong>
                    {formatearPrecio(total >= 20000 ? total : total + 2500)}
                  </strong>
                </div>

                <Button
                  variant="success"
                  size="lg"
                  className="btn-checkout"
                  onClick={handleCheckout}
                >
                  Proceder al Pago
                </Button>

                <Button
                  variant="outline-secondary"
                  className="mt-2"
                  onClick={() => navigate('/productos')}
                >
                  Seguir Comprando
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;