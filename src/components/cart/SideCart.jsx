/**
 * SIDE CART - CARRITO LATERAL
 * 
 * Componente drawer que muestra el carrito de compras.
 * Se abre desde el ícono en el Navbar.
 * 
 * CARACTERÍSTICAS:
 * - Integración completa con CartContext
 * - Animaciones smooth con CSS transitions
 * - Actualización en tiempo real
 * - Cálculos automáticos de totales
 * - Navegación directa a checkout
 */

import React from 'react';
import { Offcanvas, Button, ListGroup, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import './SideCart.css';

const SideCart = ({ show, onHide }) => {
  // ============================================================
  // HOOKS
  // ============================================================
  
  const navigate = useNavigate();
  const { 
    items, 
    loading, 
    isEmpty, 
    updateQuantity, 
    removeItem, 
    total, 
    itemCount 
  } = useCart();

  // ============================================================
  // HANDLERS
  // ============================================================

  /**
   * Navega al checkout y cierra el drawer
   */
  const handleCheckout = () => {
    onHide();
    navigate('/checkout');
  };

  /**
   * Navega al carrito completo
   */
  const handleViewCart = () => {
    onHide();
    navigate('/carrito');
  };

  /**
   * Incrementa cantidad de un producto
   */
  const handleIncrement = async (item) => {
    if (item.cantidad < item.stock) {
      await updateQuantity(item.id, item.cantidad + 1);
    }
  };

  /**
   * Decrementa cantidad de un producto
   */
  const handleDecrement = async (item) => {
    if (item.cantidad > 1) {
      await updateQuantity(item.id, item.cantidad - 1);
    }
  };

  /**
   * Elimina un producto
   */
  const handleRemove = async (itemId) => {
    await removeItem(itemId);
  };

  // ============================================================
  // RENDERIZADO
  // ============================================================

  return (
    <Offcanvas 
      show={show} 
      onHide={onHide} 
      placement="end"
      className="side-cart"
    >
      {/* HEADER */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          🛒 Carrito de Compras
          {itemCount > 0 && (
            <Badge bg="success" className="ms-2">
              {itemCount}
            </Badge>
          )}
        </Offcanvas.Title>
      </Offcanvas.Header>

      {/* BODY */}
      <Offcanvas.Body>
        {/* LOADING */}
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        {/* CARRITO VACÍO */}
        {!loading && isEmpty && (
          <div className="empty-cart text-center py-5">
            <div className="empty-cart-icon mb-3">🛒</div>
            <h5>Tu carrito está vacío</h5>
            <p className="text-muted">
              Agrega productos para comenzar tu compra
            </p>
            <Button 
              variant="success"
              onClick={() => {
                onHide();
                navigate('/productos');
              }}
            >
              Ver Productos
            </Button>
          </div>
        )}

        {/* ITEMS DEL CARRITO */}
        {!loading && !isEmpty && (
          <>
            <ListGroup variant="flush" className="cart-items">
              {items.map((item) => {
                const precioFinal = item.precioOferta || item.precio;
                const subtotal = precioFinal * item.cantidad;

                return (
                  <ListGroup.Item 
                    key={item.id || item.productoId}
                    className="cart-item"
                  >
                    <div className="d-flex gap-3">
                      {/* IMAGEN */}
                      <div className="cart-item-image">
                        <img
                          src={getProductImage(item.imagen, item.categoria)}
                          alt={item.nombre}
                          className="img-fluid rounded"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-grow-1">
                        {/* NOMBRE */}
                        <h6 className="mb-1 cart-item-name">
                          {item.nombre}
                        </h6>

                        {/* PRECIO */}
                        <div className="cart-item-price mb-2">
                          {item.precioOferta && item.precioOferta < item.precio ? (
                            <>
                              <span className="text-decoration-line-through text-muted me-2">
                                {formatPrice(item.precio)}
                              </span>
                              <span className="text-success fw-bold">
                                {formatPrice(item.precioOferta)}
                              </span>
                            </>
                          ) : (
                            <span className="fw-bold">
                              {formatPrice(item.precio)}
                            </span>
                          )}
                        </div>

                        {/* CONTROLES DE CANTIDAD */}
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => handleDecrement(item)}
                              disabled={item.cantidad <= 1 || loading}
                            >
                              −
                            </button>
                            <span className="quantity-value">
                              {item.cantidad}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() => handleIncrement(item)}
                              disabled={item.cantidad >= item.stock || loading}
                            >
                              +
                            </button>
                          </div>

                          {/* SUBTOTAL */}
                          <div className="cart-item-subtotal">
                            {formatPrice(subtotal)}
                          </div>
                        </div>

                        {/* STOCK WARNING */}
                        {item.stock < 5 && (
                          <small className="text-warning d-block mt-1">
                            ⚠️ Solo quedan {item.stock} unidades
                          </small>
                        )}
                      </div>

                      {/* BOTÓN ELIMINAR */}
                      <div>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(item.id || item.productoId)}
                          disabled={loading}
                          title="Eliminar producto"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>

            {/* RESUMEN */}
            <div className="cart-summary mt-auto">
              <div className="cart-total">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-value">
                  {formatPrice(total)}
                </span>
              </div>

              {/* BOTONES */}
              <div className="cart-actions">
                <Button
                  variant="success"
                  size="lg"
                  className="w-100 mb-2"
                  onClick={handleCheckout}
                  disabled={loading || isEmpty}
                >
                  Proceder al Pago
                </Button>
                <Button
                  variant="outline-success"
                  size="lg"
                  className="w-100"
                  onClick={handleViewCart}
                  disabled={loading}
                >
                  Ver Carrito Completo
                </Button>
              </div>

              {/* ENVÍO GRATIS */}
              {total >= 20000 ? (
                <Alert variant="success" className="mt-3 mb-0 text-center">
                  🚚 ¡Envío gratis!
                </Alert>
              ) : (
                <Alert variant="info" className="mt-3 mb-0 text-center">
                  Faltan {formatPrice(20000 - total)} para envío gratis
                </Alert>
              )}
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideCart;