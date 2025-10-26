/**
 * SideCart.jsx
 * Componente que implementa un carrito lateral usando Offcanvas de Bootstrap
 * Se muestra automáticamente cuando se agregan productos al carrito
 * Permite:
 * - Ver productos en el carrito
 * - Modificar cantidades
 * - Eliminar productos
 * - Ver total
 * - Navegar al carrito completo o checkout
 */

import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/getProductImage';

export function SideCart({ show, handleClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={getProductImage(item.image, item.category)}
                      alt={item.name}
                      className="cart-item-image me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getProductImage('', item.category);
                      }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{item.name}</h6>
                      <p className="mb-0 text-success">{formatearPrecio(item.price)}</p>
                      <div className="d-flex align-items-center mt-1">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Total:</h5>
                <h5 className="text-success">{getTotalPrice()}</h5>
              </div>
              <div className="d-grid gap-2">
                <Button
                  as={Link}
                  to="/carrito"
                  variant="success"
                  onClick={handleClose}
                >
                  Ver Carrito
                </Button>
                <Button
                  as={Link}
                  to="/checkout"
                  variant="outline-success"
                  onClick={handleClose}
                >
                  Ir a Pagar
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideCart;