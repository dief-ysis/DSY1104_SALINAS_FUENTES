import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
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
])
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
      }
    ]
  }
])