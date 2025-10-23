import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

// HH-012: Categorías destacadas con navegación
const FEATURED_CATEGORIES = [
  {
    id: 'frutas',
    name: 'Frutas Frescas',
    description: 'Selección de frutas orgánicas de temporada',
    image: '/assets/images/categories/frutas.jpg',
    icon: '🍎',
  },
  {
    id: 'verduras',
    name: 'Verduras Orgánicas',
    description: 'Verduras cultivadas sin pesticidas',
    image: '/assets/images/categories/verduras.jpg',
    icon: '🥬',
  },
  {
    id: 'organicos',
    name: 'Productos Orgánicos',
    description: 'Productos naturales certificados',
    image: '/assets/images/categories/organicos.jpg',
    icon: '🌱',
  },
  {
    id: 'lacteos',
    name: 'Lácteos',
    description: 'Productos lácteos de granja',
    image: '/assets/images/categories/lacteos.jpg',
    icon: '🥛',
  }
];

export function FeaturedCategories({ categories = FEATURED_CATEGORIES }) {
  return (
    <section className="featured-categories" aria-labelledby="featured-categories-title">
      <div className="container">
        <header className="featured-header">
          <h2 id="featured-categories-title">Categorías Destacadas</h2>
          <p>Encuentra los mejores productos organizados para ti</p>
        </header>
        
        <div className="categories-grid">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="category-tile"
              aria-labelledby={`category-title-${category.id}`}
            >
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  className="category-image"
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <span className="category-icon" aria-hidden="true">{category.icon}</span>
                <h3 id={`category-title-${category.id}`} className="category-title">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <span className="category-cta" aria-hidden="true">
                  Explorar →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;