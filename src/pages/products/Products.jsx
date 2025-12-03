/**
 * PRODUCTS PAGE - PÁGINA DE PRODUCTOS
 * 
 * Lista completa de productos con filtros, búsqueda, ordenamiento y paginación.
 * Integra ProductFilters, ProductCard y Pagination.
 * 
 * RESPONDE A PREGUNTAS:
 * - P67: Minimiza llamadas con useDebounce en filtros
 * - P88: Combina datos de múltiples endpoints si es necesario
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../../components/products/ProductFilters';
import ProductCard from '../../components/products/ProductCard';
import Pagination from '../../components/products/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import productService from '../../services/productService';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estado de productos y paginación
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Estado de filtros (sincronizado con URL params)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    categoria: searchParams.get('categoria') || '',
    minPrecio: searchParams.get('minPrecio') || undefined,
    maxPrecio: searchParams.get('maxPrecio') || undefined,
    sort: searchParams.get('sort') || '',
    page: parseInt(searchParams.get('page') || '0'),
    size: 12
  });

  // Fetch productos cuando cambian los filtros
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Construir parámetros de consulta
        const params = {
          page: filters.page,
          size: filters.size,
        };

        if (filters.search) params.search = filters.search;
        if (filters.categoria) params.categoria = filters.categoria;
        if (filters.minPrecio) params.minPrecio = filters.minPrecio;
        if (filters.maxPrecio) params.maxPrecio = filters.maxPrecio;
        if (filters.sort) {
          const [sortField, sortOrder] = filters.sort.split(',');
          params.sort = sortField;
          params.order = sortOrder;
        }

        // Llamar al servicio (que internamente usa Axios con api.js)
        const response = await productService.getProducts(params);

        // Validar respuesta
        if (response && response.content) {
          setProducts(response.content);
          setTotalPages(response.totalPages || 0);
          setTotalElements(response.totalElements || 0);
        } else if (Array.isArray(response)) {
          // Si backend retorna array directo
          setProducts(response);
          setTotalPages(1);
          setTotalElements(response.length);
        } else {
          setProducts([]);
          setTotalPages(0);
          setTotalElements(0);
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(err.message || 'Error al cargar productos');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Actualizar URL params cuando cambian los filtros
  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.categoria) params.categoria = filters.categoria;
    if (filters.minPrecio) params.minPrecio = filters.minPrecio;
    if (filters.maxPrecio) params.maxPrecio = filters.maxPrecio;
    if (filters.sort) params.sort = filters.sort;
    if (filters.page > 0) params.page = filters.page;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      categoria: '',
      minPrecio: undefined,
      maxPrecio: undefined,
      sort: '',
      page: 0,
      size: 12
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container className="products-page">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        <p className="text-muted">
          Encuentra productos frescos y orgánicos cultivados con amor
        </p>
      </div>

      <Row>
        {/* SIDEBAR FILTROS */}
        <Col lg={3} className="mb-4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </Col>

        {/* GRID PRODUCTOS */}
        <Col lg={9}>
          {/* RESULTADOS INFO */}
          {!loading && !error && (
            <div className="results-info">
              <p className="text-muted">
                {totalElements === 0 ? (
                  'No se encontraron productos'
                ) : (
                  <>
                    Mostrando {products.length} de {totalElements} productos
                    {filters.categoria && (
                      <span className="ms-2">
                        en <strong>{filters.categoria}</strong>
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <LoadingSpinner 
              size="lg" 
              text="Cargando productos..." 
            />
          )}

          {/* ERROR STATE */}
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Error al cargar productos</Alert.Heading>
              <p>{error}</p>
              <button 
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </Alert>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && products.length === 0 && (
            <Alert variant="info">
              <Alert.Heading>No hay productos</Alert.Heading>
              <p>
                No se encontraron productos que coincidan con tus criterios de búsqueda.
                Intenta ajustar los filtros o{' '}
                <Alert.Link onClick={handleClearFilters} style={{ cursor: 'pointer' }}>
                  limpiar todos los filtros
                </Alert.Link>
                .
              </p>
            </Alert>
          )}

          {/* PRODUCTS GRID */}
          {!loading && !error && products.length > 0 && (
            <>
              <Row xs={1} sm={2} lg={3} className="g-4">
                {products.map((product) => (
                  <Col key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {/* PAGINATION */}
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={filters.size}
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