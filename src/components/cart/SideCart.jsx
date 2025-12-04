import React from 'react';
import { Offcanvas, Button, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import './SideCart.css';

const SideCart = ({ show, onHide }) => {
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

  const handleCheckout = () => {
    onHide();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    onHide();
    navigate('/carrito');
  };

  // Usamos los identificadores normalizados del contexto
  const handleIncrement = async (item) => {
    if (item.cantidad < item.stock) {
      await updateQuantity(item.cartItemId, item.cantidad + 1);
    }
  };

  const handleDecrement = async (item) => {
    if (item.cantidad > 1) {
      await updateQuantity(item.cartItemId, item.cantidad - 1);
    }
  };

  const handleRemove = async (item) => {
    await removeItem(item.cartItemId);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="side-cart">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          🛒 Carrito {itemCount > 0 && <Badge bg="success" className="ms-2">{itemCount}</Badge>}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {loading && items.length === 0 && (
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status"></div>
          </div>
        )}

        {!loading && isEmpty && (
          <div className="text-center py-5">
            <h5>Tu carrito está vacío</h5>
            <Button variant="success" className="mt-3" onClick={() => { onHide(); navigate('/productos'); }}>
              Ver Productos
            </Button>
          </div>
        )}

        {!isEmpty && (
          <>
            <ListGroup variant="flush" className="cart-items flex-grow-1 overflow-auto">
              {items.map((item) => (
                <ListGroup.Item key={item.cartItemId || item.productId} className="cart-item">
                  <div className="d-flex gap-3 align-items-center">
                    <img 
                      src={getProductImage(item.imagen, item.categoria)} 
                      alt={item.nombre} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 text-truncate" style={{ maxWidth: '150px' }}>{item.nombre}</h6>
                      <small className="text-muted">{formatearPrecio(item.precio)} x {item.cantidad}</small>
                      <div className="text-success fw-bold">{formatearPrecio(item.precio * item.cantidad)}</div>
                    </div>
                    <div className="d-flex flex-column gap-1">
                        <div className="btn-group btn-group-sm">
                            <Button variant="outline-secondary" size="sm" onClick={() => handleDecrement(item)} disabled={item.cantidad <= 1}>-</Button>
                            <Button variant="outline-secondary" size="sm" disabled>{item.cantidad}</Button>
                            <Button variant="outline-secondary" size="sm" onClick={() => handleIncrement(item)} disabled={item.cantidad >= item.stock}>+</Button>
                        </div>
                        <Button variant="link" className="text-danger p-0 text-decoration-none" size="sm" onClick={() => handleRemove(item)}>
                            Eliminar
                        </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between mb-3 fs-5 fw-bold">
                <span>Total:</span>
                <span>{formatearPrecio(total)}</span>
              </div>
              <div className="d-grid gap-2">
                <Button variant="success" onClick={handleCheckout}>Proceder al Pago</Button>
                <Button variant="outline-success" onClick={handleViewCart}>Ver Carrito Completo</Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideCart;