import { useProducts } from '../../hooks/useProducts';
import { ProductFilters } from '../../components/products/ProductFilters';
import { Pagination } from '../../components/products/Pagination';
import { useCart } from '../../context/CartContext';
import { formatearPrecio } from '../../utils/formatters';
import './Products.css';

export default function Products() {
  const { products, categories, pagination, filters } = useProducts();
  const { addItem } = useCart();

  return (
    <div className="products-page">
      <div className="container">
        <header className="products-header">
          <h1>Nuestros Productos</h1>
          <p>Descubre nuestra selección de productos orgánicos y frescos</p>
        </header>

        <ProductFilters 
          filters={filters}
          categories={categories}
        />

        <div className="products-grid">
          {products.length === 0 ? (
            <div className="no-products">
              No se encontraron productos que coincidan con tu búsqueda.
            </div>
          ) : (
            products.map(product => (
              <article key={product.code} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.imagen} 
                    alt={`${product.nombre} - ${product.descripcion}`}
                    loading="lazy"
                  />
                  {product.oferta && (
                    <span className="product-badge">Oferta</span>
                  )}
                </div>
                <div className="product-content">
                  <h2 className="product-title">{product.nombre}</h2>
                  <div className="product-meta">
                    <span className="product-origin">{product.origen}</span>
                    <span className="product-price">
                      {formatearPrecio(product.precioCLP)}
                    </span>
                  </div>
                  <p className="product-description">{product.descripcion}</p>
                  <div className="product-details">
                    <span className="product-stock">
                      Stock: {product.stock} {product.unidad}
                    </span>
                    {product.practicas.length > 0 && (
                      <div className="product-practices">
                        {product.practicas.map(practica => (
                          <span key={practica} className="practice-tag">
                            {practica}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="product-footer">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addItem(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Sin stock' : 'Añadir al carrito'}
                  </button>
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