import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './pages/Root';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorPage from './components/common/ErrorPage';
import { productsLoader } from './loaders/products';
import { productLoader } from './loaders/productLoader';

// Lazy loading de componentes
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Checkout = lazy(() => import('./pages/Checkout'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
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
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        ),
        loader: productsLoader
      },
      {
        path: 'productos/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetail />
          </Suspense>
        ),
        loader: productLoader
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Blog />
          </Suspense>
        )
      },
      {
        path: 'contacto',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        )
      },
      {
        path: 'carrito',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Checkout />
          </Suspense>
        )
      },
      {
        path: 'nosotros',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        )
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        )
      }
    ]
  }
]);