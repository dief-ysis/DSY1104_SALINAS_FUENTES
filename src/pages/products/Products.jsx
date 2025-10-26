import React, { useCallback } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Pagination } from '../../components/products/Pagination';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import { getProductImage } from '../../utils/imageUtils';
import './products.css';

export default function Products() {
  const { products, categories, pagination, filters, loading } = useProducts();
  const { addItem } = useCart();

  const handleCategoryClick = useCallback((category) => {
    filters.setCategory(category === filters.category ? '' : category);
  }, [filters]);

  const handleClearFilters = useCallback(() => {
    filters.setCategory('');
    filters.setFilter('');
    filters.setSortBy('nombre');
    filters.setSortOrder('asc');
  }, [filters]);

  const handleSort = useCallback((type) => {
    if (type === 'price') {
      filters.setSortBy('precio');
      filters.setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc');
    }
  }, [filters]);

  return (
    <div className="py-5 bg-light">
      <div className="container">
        {/* Filtros */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div className="d-flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`btn btn-outline-primary rounded-pill ${filters.category === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
                aria-pressed={filters.category === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button 
            className="btn btn-warning"
            onClick={handleClearFilters}
            disabled={!filters.category && !filters.filter}
          >
            Quitar filtros
          </button>
        </div>

        {/* Búsqueda y Ordenamiento */}
        <div className="row mb-4 gap-2">
          <div className="col-md">
            <input 
              type="text" 
              placeholder="Buscar por nombre o código..."
              className="form-control"
              value={filters.filter}
              onChange={(e) => filters.setFilter(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button 
              className={`btn btn-outline-secondary ${filters.sortBy === 'precio' ? 'btn-outline-primary' : ''}`}
              onClick={() => handleSort('price')}
            >
              Precio {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className="alert alert-info text-center">
            Cargando productos...
          </div>
        ) : products.length === 0 ? (
          <div className="alert alert-warning text-center">
            No se encontraron productos que coincidan con tu búsqueda.
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {products.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <article className="card h-100 product-card">
                  <div className="position-relative product-image-container">
                    <span className="position-absolute top-0 start-0 badge bg-warning text-dark m-2">{product.category}</span>
                    <img 
                      src={getProductImage(product.image, product.category)} 
                      alt={product.name}
                      loading="lazy"
                      className="card-img-top product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getProductImage('', product.category);
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text small text-muted flex-grow-1">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        <span className="fw-bold text-success">${formatearPrecio(product.price)}</span>
                        <span className="text-muted ms-1">/ {product.unit}</span>
                      </div>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => addItem(product)}
                        disabled={product.stock === 0}
                        aria-label="Agregar al carrito"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
        />
      </div>
    </div>
  );
}