import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './pages/Root';

// Lazy loading de componentes
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

import LoadingSpinner from './components/common/LoadingSpinner';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'productos',
        element: <Products />
      },
      {
        path: 'producto/:id',
        element: <ProductDetail />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'contacto',
        element: <Contact />
      },
      {
        path: 'carrito',
        element: <Cart />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
]);