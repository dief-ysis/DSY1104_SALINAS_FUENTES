/**
 * FEATURED PRODUCTS - PRODUCTOS DESTACADOS
 * 
 * Muestra los productos más populares o destacados del home.
 * 
 * CORRECCIÓN CRÍTICA: NO asume endpoint /api/products/featured inexistente.
 * Usa filtrado local de productos hasta que backend esté implementado.
 * 
 * TODO BACKEND: Crear endpoint GET /api/products/featured que retorne
 * productos con campo destacado=true o los más vendidos.
 */

import React, { useMemo } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ProductCard from '../products/ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  // Fetch todos los productos (endpoint real: GET /api/products?page=0&size=20)
  // Luego filtramos localmente hasta que backend implemente /featured
  const { data, loading, error } = useFetch('/api/products?page=0&size=20');

  // Filtrar productos destacados localmente
  const featuredProducts = useMemo(() => {
    if (!data) return [];
    
    const products = data.content || data || [];
    
    // Filtrar por destacado=true o rating>=4, limitar a 8
    return products
      .filter(p => p.destacado === true || p.rating >= 4)
      .slice(0, 8);
  }, [data]);

  if (loading) {
    return <LoadingSpinner size="lg" text="Cargando productos destacados..." />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error al cargar productos destacados: {error}
      </Alert>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <Alert variant="info">
        No hay productos destacados disponibles en este momento.
      </Alert>
    );
  }

  return (
    <div className="featured-products">
      <div className="featured-products-header">
        <div>
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle">
            Los favoritos de nuestros clientes
          </p>
        </div>
        <button 
          className="btn btn-outline-success"
          onClick={() => navigate('/productos')}
        >
          Ver Todos
        </button>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {featuredProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedProducts;