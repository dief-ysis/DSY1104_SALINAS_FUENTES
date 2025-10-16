import { lazy } from 'react';
import { LazyComponent } from '../components/common/LazyComponent';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/checkout/Checkout'));
const CheckoutSuccess = lazy(() => import('../pages/checkout/CheckoutSuccess'));
const CheckoutFailure = lazy(() => import('../pages/checkout/CheckoutFailure'));
const Offers = lazy(() => import('../pages/Offers'));
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
    path: '/checkout/success',
    element: (
      <LazyComponent>
        <CheckoutSuccess />
      </LazyComponent>
    )
  },
  {
    path: '/checkout/failure',
    element: (
      <LazyComponent>
        <CheckoutFailure />
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
  },
  {
    path: '/ofertas',
    element: (
      <LazyComponent>
        <Offers />
      </LazyComponent>
    )
  }
];