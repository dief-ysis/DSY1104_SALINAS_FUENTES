import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/product';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (quantity < 1) {
      alert('La cantidad debe ser al menos 1');
      return;
    }
    if (quantity > product.stock) {
      alert('No hay suficiente stock disponible');
      return;
    }
    addToCart(product, quantity);
    alert(`¡${quantity} ${product.unit || 'unidades'} de ${product.name} agregado(s) al carrito!`);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <div className="alert alert-danger mt-5">Producto no encontrado</div>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img 
              variant="top" 
              src={product.image} 
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+No+Disponible';
              }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Badge bg="light" text="dark" className="mb-2">
                {product.category}
              </Badge>
              <Card.Title className="text-emerald h2">{product.name}</Card.Title>
              <Card.Text className="text-secondary lead">
                {product.description}
              </Card.Text>
              
              <div className="product-info mb-4">
                <p><strong>Precio:</strong> <span className="h4 text-brown">${product.price || product.precioCLP} CLP/{product.unit || 'kg'}</span></p>
                <p><strong>Stock disponible:</strong> {product.stock} {product.unit || 'unidades'}</p>
                <p><strong>Origen:</strong> {product.origin || 'No especificado'}</p>
              </div>

              {product.stock > 0 ? (
                <div className="d-flex gap-2 align-items-center">
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad:</Form.Label>
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      min="1"
                      max={product.stock}
                      style={{ width: '100px' }}
                    />
                  </Form.Group>
                  <Button variant="emerald" size="lg" onClick={handleAddToCart}>
                    Agregar al Carrito
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="lg" disabled>
                  Producto Agotado
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}