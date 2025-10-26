import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './pages/Root';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorPage from './components/common/ErrorPage';
import { productsLoader } from './loaders/products';
import { productLoader } from './loaders/productLoader';
import { homeLoader } from './loaders/home';

// Lazy loading de componentes - Home
const Home = lazy(() => import('./pages/home/Home'));

// Lazy loading de componentes - Products
const Products = lazy(() => import('./pages/products/Products'));
const ProductDetail = lazy(() => import('./pages/products/ProductDetail'));
const Offers = lazy(() => import('./pages/products/Offers'));

// Lazy loading de componentes - Cart
const Cart = lazy(() => import('./pages/cart/Cart'));
const Checkout = lazy(() => import('./pages/cart/Checkout'));
const PagoExitoso = lazy(() => import('./pages/cart/PagoExitoso'));
const PagoError = lazy(() => import('./pages/cart/PagoError'));

// Lazy loading de componentes - Auth
const Login = lazy(() => import('./pages/auth/Login'));
const Registro = lazy(() => import('./pages/auth/Registro'));

// Lazy loading de componentes - Info
const About = lazy(() => import('./pages/info/About'));
const Blog = lazy(() => import('./pages/info/Blog'));
const DetalleBlog = lazy(() => import('./pages/info/DetalleBlog'));
const Contact = lazy(() => import('./pages/info/Contact'));

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
            <Login />
          </Suspense>
        )
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
        loader: homeLoader
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
        path: 'blog/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DetalleBlog />
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
        path: 'registro',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Registro />
          </Suspense>
        )
      },
      {
        path: 'pago-exitoso',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PagoExitoso />
          </Suspense>
        )
      },
      {
        path: 'pago-error',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PagoError />
          </Suspense>
        )
      },
      {
        path: 'ofertas',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Offers />
          </Suspense>
        ),
        loader: productsLoader
      }
    ]
  }
]);