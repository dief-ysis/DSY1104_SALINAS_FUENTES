/**
 * PRODUCT FILTERS - FILTROS DE PRODUCTOS
 * 
 * Panel de filtros para búsqueda, categoría, precio y ordenamiento.
 * 
 * RESPONDE A PREGUNTA 67: Usa useDebounce para minimizar llamadas al backend
 * al escribir en el campo de búsqueda.
 */

import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Accordion } from 'react-bootstrap';
import { useDebounce } from '../../hooks/useDebounce';
import './ProductFilters.css';

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  
  // PREGUNTA 67: useDebounce minimiza llamadas al servidor
  // Solo busca 500ms después de que el usuario deja de escribir
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Cuando cambia el término debounced, notifica al padre
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ ...filters, search: debouncedSearch, page: 0 });
    }
  }, [debouncedSearch]);

  const categories = [
    { id: '', label: 'Todas las categorías' },
    { id: 'FRUTAS', label: 'Frutas' },
    { id: 'VERDURAS', label: 'Verduras' },
    { id: 'HIERBAS', label: 'Hierbas Aromáticas' },
    { id: 'ORGANICOS', label: 'Productos Orgánicos' },
    { id: 'GRANOS', label: 'Granos y Cereales' },
    { id: 'LACTEOS', label: 'Lácteos' }
  ];

  const sortOptions = [
    { value: '', label: 'Ordenar por...' },
    { value: 'nombre,asc', label: 'Nombre: A-Z' },
    { value: 'nombre,desc', label: 'Nombre: Z-A' },
    { value: 'precio,asc', label: 'Precio: Menor a Mayor' },
    { value: 'precio,desc', label: 'Precio: Mayor a Menor' },
    { value: 'stock,desc', label: 'Mayor Disponibilidad' }
  ];

  const handleCategoryChange = (categoria) => {
    onFilterChange({ ...filters, categoria, page: 0 });
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    onFilterChange({ ...filters, sort, page: 0 });
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ 
      ...filters, 
      [name]: value ? parseFloat(value) : undefined,
      page: 0 
    });
  };

  const handleClear = () => {
    setSearchTerm('');
    onClearFilters();
  };

  const hasActiveFilters = filters.search || filters.categoria || 
                          filters.minPrecio || filters.maxPrecio || filters.sort;

  return (
    <Card className="product-filters">
      <Card.Body>
        <div className="filters-header">
          <h5 className="filters-title">Filtros</h5>
          {hasActiveFilters && (
            <Button 
              variant="link" 
              size="sm"
              onClick={handleClear}
              className="btn-clear-filters"
            >
              Limpiar filtros
            </Button>
          )}
        </div>

        <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
          {/* BÚSQUEDA */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Búsqueda</Accordion.Header>
            <Accordion.Body>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <Form.Text className="text-muted">
                  <small>
                    <i className="bi bi-info-circle me-1"></i>
                    La búsqueda se realiza automáticamente
                  </small>
                </Form.Text>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          {/* CATEGORÍAS */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Categorías</Accordion.Header>
            <Accordion.Body>
              <div className="category-filters">
                {categories.map((cat) => (
                  <Form.Check
                    key={cat.id}
                    type="radio"
                    id={`category-${cat.id || 'all'}`}
                    name="categoria"
                    label={cat.label}
                    checked={filters.categoria === cat.id}
                    onChange={() => handleCategoryChange(cat.id)}
                    className="category-option"
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* RANGO DE PRECIO */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Rango de Precio</Accordion.Header>
            <Accordion.Body>
              <div className="price-range">
                <Form.Group className="mb-2">
                  <Form.Label>Precio Mínimo</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrecio"
                    placeholder="$0"
                    min="0"
                    step="1000"
                    value={filters.minPrecio || ''}
                    onChange={handlePriceRangeChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Precio Máximo</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrecio"
                    placeholder="Sin límite"
                    min="0"
                    step="1000"
                    value={filters.maxPrecio || ''}
                    onChange={handlePriceRangeChange}
                  />
                </Form.Group>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* ORDENAMIENTO */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>Ordenar por</Accordion.Header>
            <Accordion.Body>
              <Form.Select
                value={filters.sort || ''}
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default ProductFilters;