import { useLoaderData, useNavigation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatearPrecio } from '../../utils/formatters';

export default function Products() {
  const { products, categories } = useLoaderData();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  
  const isLoading = navigation.state === 'loading';

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`¡${product.name} agregado al carrito!`);
  };

  if (isLoading) {
    return <LoadingSpinner data-testid="loading-spinner" />;
  }
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-brown">Nuestros Productos</h1>
            <LinkContainer to="/products/nuevo">
              <Button variant="emerald">+ Agregar Producto</Button>
            </LinkContainer>
          </div>
        </Col>
      </Row>

      {/* Categories */}
      <Row className="mb-4">
        <Col>
          <h4 className="text-secondary mb-3">Categorías</h4>
          <div className="d-flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge key={category.id} bg="light" text="dark" className="p-2">
                {category.name}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row>
        {products.map(product => (
          <Col key={product.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 product-card shadow-sm">
              <Card.Img 
                variant="top" 
                src={product.image} 
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-emerald">{product.name}</Card.Title>
                <Card.Text className="text-secondary flex-grow-1">
                  {(product.description || '').substring(0, 100)}{product.description ? '...' : ''}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="h5 text-brown mb-0">{`$${product.price ?? product.precioCLP ?? 0}`}{product.unit ? ` CLP/${product.unit}` : ''}</span>
                    <Badge bg={product.stock > 50 ? "success" : "warning"}>
                      Stock: {product.stock}
                    </Badge>
                  </div>
                  <small className="text-muted d-block mb-2">
                    Origen: {product.origin}
                  </small>
                  <div className="d-flex gap-2">
                    <LinkContainer to={`/products/${product.id}`}>
                      <Button variant="outline-emerald" size="sm" className="flex-grow-1">
                        Ver Detalle
                      </Button>
                    </LinkContainer>
                    <Button 
                      variant="emerald" 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      🛒 Agregar al Carrito
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}