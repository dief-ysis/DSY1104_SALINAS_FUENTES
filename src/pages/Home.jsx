import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeaturedCategories from '../components/home/FeaturedCategories';
import './Home.css';

export default function Home() {
  const featuredProducts = [
    {
      id: 'FR001',
      name: 'Manzanas Fuji',
      price: 1200,
      image: '/assets/products/manzanas.jpg',
      category: 'Frutas Frescas'
    },
    {
      id: 'VR001',
      name: 'Zanahorias Orgánicas',
      price: 900,
      image: '/assets/products/zanahorias.jpg',
      category: 'Verduras Orgánicas'
    },
    {
      id: 'HR001',
      name: 'Kit Huerto Urbano',
      price: 15000,
      image: '/assets/products/kit-huerto.jpg',
      category: 'Huertos'
    }
  ];

  const categories = [
    {
      id: 'cat1',
      name: 'Frutas Frescas',
      image: '/assets/images/categories/frutas.jpg',
      description: 'Frutas frescas de temporada'
    },
    {
      id: 'cat2',
      name: 'Verduras Orgánicas',
      image: '/assets/images/categories/verduras.jpg',
      description: 'Verduras cultivadas sin pesticidas'
    },
    {
      id: 'cat3',
      name: 'Huertos',
      image: '/assets/images/categories/huertos.jpg',
      description: 'Todo para tu huerto urbano'
    }
  ];

  return (
    <div className="home">
      <Hero />
      <FeaturedCategories categories={categories} />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}