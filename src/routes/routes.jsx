import { lazy } from 'react';
import { LazyComponent } from '../components/common/LazyComponent';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Contact = lazy(() => import('../pages/Contact'));
const About = lazy(() => import('../pages/About'));
const Blog = lazy(() => import('../pages/Blog'));

export const routes = [
  {
    path: '/',
    element: (
      <LazyComponent>
        <Home />
      </LazyComponent>
    )
  },
  {
    path: '/productos',
    element: (
      <LazyComponent>
        <Products />
      </LazyComponent>
    )
  },
  {
    path: '/productos/:id',
    element: (
      <LazyComponent>
        <ProductDetail />
      </LazyComponent>
    )
  },
  {
    path: '/carrito',
    element: (
      <LazyComponent>
        <Cart />
      </LazyComponent>
    )
  },
  {
    path: '/checkout',
    element: (
      <LazyComponent>
        <Checkout />
      </LazyComponent>
    )
  },
  {
    path: '/contacto',
    element: (
      <LazyComponent>
        <Contact />
      </LazyComponent>
    )
  },
  {
    path: '/nosotros',
    element: (
      <LazyComponent>
        <About />
      </LazyComponent>
    )
  },
  {
    path: '/blog',
    element: (
      <LazyComponent>
        <Blog />
      </LazyComponent>
    )
  }
];