import React, { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import Hero from '../../components/home/Hero';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import FeaturedCategories from '../../components/home/FeaturedCategories';
import FeaturedOffers from '../../components/home/FeaturedOffers';
import '../../styles/pages/home-page.css';

export default function Home() {
  const loaderData = useLoaderData() || {};
  const { featuredProducts = [], stats = {} } = loaderData;

  // Fallback si el loader no trae datos
  const defaultFeaturedProducts = useMemo(() => {
    if (!featuredProducts || featuredProducts.length === 0) {
      return [
        {
          id: 'FR001',
          name: 'Manzanas Fuji',
          price: 1200,
          image: '/assets/products/manzana.jpg',
          category: 'Frutas Frescas'
        },
        {
          id: 'VR001',
          name: 'Zanahorias Orgánicas',
          price: 900,
          image: '/assets/products/zanahoria.jpg',
          category: 'Verduras Orgánicas'
        }
      ];
    }
    return featuredProducts;
  }, [featuredProducts]);

  const defaultCategories = useMemo(() => {
    if (!stats || !stats.categories || !Array.isArray(stats.categories)) {
      return [
        {
          id: 'cat1',
          name: 'Frutas Frescas',
          image: '/assets/images/categories/frutas-frescas.jpg',
          description: 'Frutas frescas de temporada'
        },
        {
          id: 'cat2',
          name: 'Verduras Orgánicas',
          image: '/assets/images/categories/vegetales-verdes.png',
          description: 'Verduras cultivadas sin pesticidas'
        },
        {
          id: 'cat3',
          name: 'Productos Orgánicos',
          image: '/assets/images/categories/organicos.webp',
          description: 'Todos nuestros productos certificados'
        }
      ];
    }
    return Array.isArray(stats.categories) ? stats.categories : [];
  }, [stats]);

  return (
    <div className="home">
      <Hero />
      <FeaturedCategories categories={defaultCategories} />
      <FeaturedOffers offers={defaultFeaturedProducts} />
      <FeaturedProducts products={defaultFeaturedProducts} />
    </div>
  );
}