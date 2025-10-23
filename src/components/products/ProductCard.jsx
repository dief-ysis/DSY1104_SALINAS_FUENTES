import { useCart } from '../../context/CartContext';

export function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-button"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}