import './ProductFilters.css';

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
    <div className="product-filters">
      <div className="filter-group">
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar productos..."
          className="search-input"
          aria-label="Buscar productos"
        />
      </div>

      <div className="filter-group">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-input"
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split('-');
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
          className="select-input"
          aria-label="Ordenar productos"
        >
          <option value="nombre-asc">Nombre (A-Z)</option>
          <option value="nombre-desc">Nombre (Z-A)</option>
          <option value="precio-asc">Precio (menor a mayor)</option>
          <option value="precio-desc">Precio (mayor a menor)</option>
        </select>
      </div>
    </div>
  );
}