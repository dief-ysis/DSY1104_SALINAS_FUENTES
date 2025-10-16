import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../database/categories';
import './FeaturedCategories.css';

export function FeaturedCategories() {
  return (
    <section className="featured-categories">
      <div className="container">
        <h2>Categorías destacadas</h2>
        <div className="categories-grid">
          {CATEGORIES.map(category => (
            <Link 
              key={category.id}
              to={`/productos?cat=${category.id.toLowerCase()}`} 
              className="category-card"
            >
              <img src={category.image} alt={`${category.name} - ${category.description}`} />
              <div className="category-overlay">
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
              <span className="category-badge">{category.badge}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}