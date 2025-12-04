import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
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
    total
  } = useCart();

  // --- HELPER PARA NORMALIZAR ---
  // Esto soluciona los errores de lectura (undefined) y precios $0
  const getItemData = (item) => {
    // Si viene del backend, el producto está anidado en 'item.producto'
    // Si es local, las propiedades están en la raíz 'item'
    const product = item.producto || item; 
    
    return {
      // ID para funciones del carrito (priorizamos ID de la línea del carrito)
      identifier: item.id || item.cartItemId || product.id || item.productoId,
      // ID del producto (para keys y navegación)
      productId: product.id || item.productoId,
      name: product.nombre || item.nombre || item.name || 'Producto',
      price: product.precio || item.precio || item.price || 0,
      image: product.imagen || item.imagen || item.image,
      category: product.categoria || item.categoria || item.category,
      quantity: item.cantidad || item.quantity || 1,
      stock: product.stock || item.stock || 0
    };
  };

  const handleQuantityChange = async (itemData, newQuantity) => {
    await updateQuantity(itemData.identifier, newQuantity);
  };

  const handleRemoveItem = async (itemData) => {
    await removeItem(itemData.identifier);
  };

  if (loading && isEmpty) {
    return <LoadingSpinner fullScreen text="Cargando carrito..." />;
  }

  return (
    <Container className="cart-page">
      <div className="cart-header">
        <h1>Mi Carrito</h1>
        <p className="text-muted">
          {isEmpty ? 'Tu carrito está vacío' : `${items.length} productos`}
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
          <Col lg={8}>
            <Card className="cart-items-card">
              <Card.Header className="cart-items-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Productos</h5>
                <Button variant="outline-danger" size="sm" onClick={clearItems}>
                  Vaciar Carrito
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="cart-items-list">
                  {items.map((rawItem) => {
                    const item = getItemData(rawItem);
                    
                    return (
                      <div key={item.productId || Math.random()} className="cart-item d-flex gap-3 mb-3 border-bottom pb-3">
                        {/* IMAGEN */}
                        <div className="cart-item-image" style={{ width: '100px', minWidth: '100px' }}>
                          <img
                            src={getProductImage(item.image, item.category)}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ objectFit: 'cover', height: '100px', width: '100%' }}
                          />
                        </div>

                        {/* INFO */}
                        <div className="cart-item-info flex-grow-1">
                          <h6 className="cart-item-name mb-1">{item.name}</h6>
                          {item.category && (
                            <span className="text-muted small d-block mb-1">{item.category}</span>
                          )}
                          <p className="cart-item-price fw-bold text-success mb-0">
                            {formatearPrecio(item.price)}
                          </p>
                        </div>

                        {/* CONTROLES */}
                        <div className="cart-item-controls d-flex flex-column align-items-end justify-content-between">
                          <div className="quantity-controls d-flex align-items-center gap-2">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              disabled={item.quantity <= 1 || loading}
                              style={{ width: '30px', padding: '0' }}
                            >-</Button>
                            
                            <span className="fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              disabled={item.quantity >= item.stock || loading}
                              style={{ width: '30px', padding: '0' }}
                            >+</Button>
                          </div>

                          <div className="text-end mt-2">
                            <span className="d-block fw-bold mb-1">
                                {formatearPrecio(item.price * item.quantity)}
                            </span>
                            <Button 
                                variant="link" 
                                className="text-danger p-0 text-decoration-none small"
                                onClick={() => handleRemoveItem(item)}
                                disabled={loading}
                            >
                                Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RESUMEN DE PAGO */}
          <Col lg={4}>
            <Card className="cart-summary-card sticky-top">
              <Card.Header>
                <h5 className="mb-0">Resumen</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatearPrecio(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Envío:</span>
                  <span className={total >= 20000 ? 'text-success' : ''}>
                    {total >= 20000 ? 'GRATIS' : '$2.500'}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                  <span>Total:</span>
                  <span>{formatearPrecio(total >= 20000 ? total : total + 2500)}</span>
                </div>
                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={() => navigate('/checkout')}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Proceder al Pago'}
                </Button>
                {total < 20000 && (
                    <Alert variant="info" className="mt-3 py-2 text-center small mb-0">
                        Faltan {formatearPrecio(20000 - total)} para envío gratis
                    </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;