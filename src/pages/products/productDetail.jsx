/**
 * PRODUCT DETAIL PAGE - DETALLE DE PRODUCTO
 * 
 * Muestra información completa de un producto individual.
 * Usa React Router params para obtener el ID del producto.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import productService from '../../services/productService';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // Cargar producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || quantity <= 0) return;

    setAdding(true);
    try {
      await addItem(product, quantity);
      setQuantity(1);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    const maxStock = product?.stock || 0;

    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner fullScreen text="Cargando producto..." />;
  }

  // Error state
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar el producto</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/productos')}>
            Volver a Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  // Not found
  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Producto no encontrado</Alert.Heading>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <Button variant="outline-warning" onClick={() => navigate('/productos')}>
            Volver a Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Container className="product-detail-page">
      {/* BREADCRUMB */}
      <nav className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a onClick={() => navigate('/')}>Inicio</a>
          </li>
          <li className="breadcrumb-item">
            <a onClick={() => navigate('/productos')}>Productos</a>
          </li>
          <li className="breadcrumb-item active">
            {product.nombre || product.name}
          </li>
        </ol>
      </nav>

      <Row className="product-detail-content">
        {/* IMAGEN */}
        <Col lg={6}>
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
            <img
              src={getProductImage(product.imagen || product.image, product.categoria || product.category)}
              alt={product.nombre || product.name}
              className="product-image"
            />
          </div>
        </Col>

        {/* INFO */}
        <Col lg={6}>
          <div className="product-info">
            {/* CATEGORÍA */}
            {(product.categoria || product.category) && (
              <Badge bg="success" className="category-badge mb-3">
                {product.categoria || product.category}
              </Badge>
            )}

            {/* NOMBRE */}
            <h1 className="product-name">
              {product.nombre || product.name}
            </h1>

            {/* PRECIO */}
            <div className="product-price-section">
              <span className="product-price">
                {formatearPrecio(product.precio || product.price)}
              </span>
              {product.unidad && (
                <span className="product-unit">
                  / {product.unidad}
                </span>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            {(product.descripcion || product.description) && (
              <div className="product-description">
                <h5>Descripción</h5>
                <p>{product.descripcion || product.description}</p>
              </div>
            )}

            {/* ORIGEN */}
            {product.origen && (
              <div className="product-detail-item">
                <strong>Origen:</strong> {product.origen}
              </div>
            )}

            {/* STOCK */}
            <div className="product-stock-section">
              {isOutOfStock ? (
                <Alert variant="danger" className="mb-3">
                  <strong>Sin stock disponible</strong>
                </Alert>
              ) : isLowStock ? (
                <Alert variant="warning" className="mb-3">
                  <strong>¡Solo quedan {product.stock} unidades!</strong>
                </Alert>
              ) : (
                <div className="stock-available">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <strong>{product.stock} unidades disponibles</strong>
                </div>
              )}
            </div>

            {/* CANTIDAD Y AGREGAR */}
            <div className="product-actions">
              <div className="quantity-selector">
                <label>Cantidad:</label>
                <div className="quantity-controls">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                variant={isOutOfStock ? 'secondary' : 'success'}
                size="lg"
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={isOutOfStock || adding}
              >
                {adding ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Agregando...
                  </>
                ) : isOutOfStock ? (
                  'Sin Stock'
                ) : (
                  <>
                    <i className="bi bi-cart-plus me-2"></i>
                    Agregar al Carrito
                  </>
                )}
              </Button>
            </div>

            {/* BOTÓN VOLVER */}
            <Button
              variant="outline-secondary"
              className="mt-3"
              onClick={() => navigate('/productos')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Volver a Productos
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;