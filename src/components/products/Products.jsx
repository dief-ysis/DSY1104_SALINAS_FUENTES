/**
 * PRODUCTS COMPONENT - COMPONENTE DE PRODUCTOS (Reutilizable)
 * 
 * Versión simplificada del componente de productos para usar en diferentes contextos.
 * La versión de PAGES (Products.jsx) es la página completa con URL params.
 * Esta versión de COMPONENTS es para usar dentro de otras páginas/secciones.
 * 
 * Diferencias clave:
 * - PAGES: Maneja URL params, filtros completos, paginación con router
 * - COMPONENTS: Recibe props, más flexible, para embeber en otras vistas
 */

import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

const Products = ({ 
  products = [], 
  loading = false, 
  error = null,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  emptyMessage = 'No hay productos disponibles'
}) => {
  // Loading state
  if (loading) {
    return <LoadingSpinner size="lg" text="Cargando productos..." />;
  }

  // Error state
  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error al cargar productos</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <Alert variant="info">
        {emptyMessage}
      </Alert>
    );
  }

  // Products grid
  return (
    <Row {...columns} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default Products;