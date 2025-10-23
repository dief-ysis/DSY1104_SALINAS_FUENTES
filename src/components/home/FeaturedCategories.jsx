import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

const FEATURED_CATEGORIES = [
  {
    id: 'frutas',
    name: 'Frutas Frescas',
    description: 'Deliciosas frutas de temporada',
    image: '/assets/images/categories/frutas.jpg',
  },
  {
    id: 'verduras',
    name: 'Verduras Orgánicas',
    description: 'Cultivadas sin pesticidas',
    image: '/assets/images/categories/verduras.jpg',
  },
  {
    id: 'organicos',
    name: 'Productos Orgánicos',
    description: 'Alimentos naturales y saludables',
    image: '/assets/images/categories/organicos.jpg',
  },
  {
    id: 'lacteos',
    name: 'Lácteos',
    description: 'Productos lácteos frescos',
    image: '/assets/images/categories/lacteos.jpg',
  }
];

export function FeaturedCategories() {
  return (
    <section className="featured-categories" aria-labelledby="featured-categories-title">
      <div className="container">
        <h2 id="featured-categories-title">Categorías Destacadas</h2>
        
        <ul className="categories-grid">
          {FEATURED_CATEGORIES.map(category => (
            <li key={category.id} className="category-tile">
              <img
                src={category.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <div className="category-content">
                <h3 className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
              <Link
                to={`/productos?cat=${category.id}`}
                className="category-link"
                aria-label={`Ver productos de ${category.name}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeaturedCategories;