import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export function ProductFilters({ filters, categories }) {
  const {
    filter,
    setFilter,
    category,
    setCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
  } = filters;

  return (
    <Form className="mb-4">
      <Row className="g-3">
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Control
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filtrar por categoría"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              aria-label="Ordenar productos"
            >
              <option value="nombre-asc">Nombre (A-Z)</option>
              <option value="nombre-desc">Nombre (Z-A)</option>
              <option value="precio-asc">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}