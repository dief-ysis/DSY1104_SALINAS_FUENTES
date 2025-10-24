import React, { useCallback } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Pagination } from '../../components/products/Pagination';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import '../../styles/pages/products-page.css';

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
    <div className="products-page">
      <div className="container">
        <div className="products-filters">
          <div className="filter-tags">
            {['Frutas', 'Verduras', 'Orgánicos', 'Lácteos'].map(cat => (
              <button
                key={cat}
                className={`filter-tag ${filters.category === cat ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
                aria-pressed={filters.category === cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            className="clear-filters"
            onClick={handleClearFilters}
            disabled={!filters.category && !filters.filter}
          >
            Quitar filtros
          </button>
        </div>

        <div className="search-sort-container">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Buscar por nombre o código..."
              className="search-input"
              value={filters.filter}
              onChange={(e) => filters.setFilter(e.target.value)}
            />
          </div>
          <div className="sort-buttons">
            <button 
              className={`sort-button ${filters.sortBy === 'precio' ? 'active' : ''}`}
              onClick={() => handleSort('price')}
            >
              Precio {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <div className="loading-state">
              Cargando productos...
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              No se encontraron productos que coincidan con tu búsqueda.
            </div>
          ) : (
            products.map(product => (
              <article key={product.id} className="product-card">
                <span className="category-badge">{product.category}</span>
                <div className="product-image">
                  <img 
                    src={product.imagen} 
                    alt={product.nombre}
                    loading="lazy"
                  />
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.nombre}</h3>
                  <p className="product-description">{product.descripcion}</p>
                  <div className="product-footer">
                    <div className="price-container">
                      <span className="price">${formatearPrecio(product.precioCLP)}</span>
                      <span className="unit">/ kg</span>
                    </div>
                    <button
                      className="add-button"
                      onClick={() => addItem(product)}
                      disabled={product.stock === 0}
                      aria-label="Agregar al carrito"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
        />
      </div>
    </div>
  );
}