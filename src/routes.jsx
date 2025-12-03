/**
 * ROUTES - CONFIGURACIÓN DE RUTAS
 * 
 * React Router v6 con rutas protegidas y públicas.
 * 
 * RESPONDE A PREGUNTAS:
 * - P40: Implementación de rutas protegidas
 * - P42: Redirección cuando acceso manual a ruta protegida
 * - P90: Loaders y actions de React Router
 */

import { createBrowserRouter } from 'react-router-dom';

// Layout
import App from './App';

// Pages - Home
import Home from './pages/home/Home';

// Pages - Products
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';

// Pages - Cart
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';

// Pages - Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Pages - Payment
import PaymentResult from './pages/payment/PaymentResult';
import PagoExitoso from './pages/payment/PagoExitoso';
import PagoError from './pages/payment/PagoError';

// Pages - Info
import About from './pages/info/About';
import Contact from './pages/info/Contact';

// Pages - Offers
import Offers from './pages/offers/Offers';

// Pages - Blog
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';

// Components - Common
import ErrorPage from './components/common/ErrorPage';
import NotFound from './components/common/NotFound';
import ProtectedRoute, { AdminRoute, PublicOnlyRoute } from './components/common/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // HOME
      {
        index: true,
        element: <Home />
      },

      // PRODUCTS
      {
        path: 'productos',
        element: <Products />
      },
      {
        path: 'producto/:id',
        element: <ProductDetail />
      },

      // CART (Protected)
      {
        path: 'carrito',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },

      // AUTH (Public Only)
      {
        path: 'login',
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        )
      },
      {
        path: 'registro',
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        )
      },

      // PAYMENT
      {
        path: 'payment-result',
        element: <PaymentResult />
      },
      {
        path: 'pago-exitoso',
        element: <PagoExitoso />
      },
      {
        path: 'pago-error',
        element: <PagoError />
      },

      // INFO
      {
        path: 'nosotros',
        element: <About />
      },
      {
        path: 'contacto',
        element: <Contact />
      },

      // OFFERS
      {
        path: 'ofertas',
        element: <Offers />
      },

      // BLOG
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'blog/:id',
        element: <BlogPost />
      },

      // 404
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;