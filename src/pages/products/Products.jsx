import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ProductFilters from '../../components/products/ProductFilters';
import ProductCard from '../../components/products/ProductCard';
import Pagination from '../../components/products/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useProducts from '../../hooks/useProducts'; // Importamos el hook nuevo
import './Products.css';

const Products = () => {
  // Usamos TODA la lógica del hook
  const { 
    products, 
    loading, 
    error, 
    totalPages, 
    totalElements, 
    currentPage,
    filters, // El hook nos devuelve los filtros actuales
    onFilterChange, // Función unificada para actualizar filtros
    resetFilters,
    setPage
  } = useProducts();

  const handlePageChange = (newPage) => {
    // El componente Pagination suele usar base 0 o base 1.
    // Nuestro hook usa base 1. Ajustamos si viene base 0.
    setPage(newPage + 1); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container className="products-page">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        <p className="text-muted">Encuentra productos frescos y orgánicos</p>
      </div>

      <Row>
        {/* SIDEBAR FILTROS */}
        <Col lg={3} className="mb-4">
          <ProductFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={resetFilters}
          />
        </Col>

        {/* GRID PRODUCTOS */}
        <Col lg={9}>
          {!loading && !error && (
            <div className="results-info">
              <p className="text-muted">
                Mostrando {products.length} de {totalElements} productos
              </p>
            </div>
          )}

          {loading && <LoadingSpinner size="lg" text="Cargando productos..." />}

          {error && (
            <Alert variant="danger">Error: {error}</Alert>
          )}

          {!loading && !error && products.length === 0 && (
            <Alert variant="info">
              No se encontraron productos con esos filtros.
              <Alert.Link onClick={resetFilters} className="ms-2">Limpiar filtros</Alert.Link>
            </Alert>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <Row xs={1} sm={2} lg={3} className="g-4">
                {products.map((product) => (
                  <Col key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              <Pagination
                currentPage={currentPage - 1} // Pagination component expects 0-index usually
                totalPages={totalPages}
                totalElements={totalElements}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;