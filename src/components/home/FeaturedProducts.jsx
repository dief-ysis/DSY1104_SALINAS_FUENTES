import { useCart } from '../../context/CartContext';
import { getFeaturedProducts } from '../../database/products';
import { formatearPrecio } from '../../utils/formatters';
import './FeaturedProducts.css';

export function FeaturedProducts() {
  const { addItem } = useCart();
  const productos = getFeaturedProducts();

  return (
    <section className="featured-products container">
      <div className="section-header">
        <h2 className="section-title">Productos destacados</h2>
        <p className="section-subtitle">
          Descubre nuestra selección de productos frescos y orgánicos
        </p>
      </div>
      <div className="product-grid">
        {productos.map(producto => (
          <div key={producto.code} className="product-card" tabIndex="0">
            <div className="product-image">
              <img src={producto.imagen} alt={`Imagen de producto: ${producto.nombre}`} />
              {producto.oferta && <span className="product-badge">Oferta</span>}
            </div>
            <div className="product-content">
              <h3 className="product-title">{producto.nombre}</h3>
              <div className="product-price">{formatearPrecio(producto.precioCLP)}</div>
              <p className="product-description">
                {producto.descripcion || 'Producto fresco y natural de nuestra selección.'}
              </p>
            </div>
            <div className="product-footer">
              <button 
                className="add-to-cart"
                onClick={() => addItem(producto)}
                aria-label={`Añadir ${producto.nombre} al carrito`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                  <path d="M20 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}