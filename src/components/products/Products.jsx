import { useLoaderData, useNavigation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { ProductCard } from './ProductCard';
import '../../styles/products/products.css';

export default function Products() {
  const { products } = useLoaderData() || { products: [] };
  const navigation = useNavigation();
  
  const isLoading = navigation.state === 'loading';

  if (isLoading) {
    return <LoadingSpinner data-testid="loading-spinner" />;
  }

  if (!products || products.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>No hay productos disponibles</h2>
        <p className="text-muted">Por favor, intenta más tarde</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <header className="products-header mb-5">
        <h1 className="products-title">Nuestros Productos</h1>
        <p className="products-subtitle">Descubre nuestra selección de productos orgánicos frescos</p>
      </header>

      {/* Products Grid */}
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}