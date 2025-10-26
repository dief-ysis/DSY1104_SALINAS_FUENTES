/**
 * Root.jsx
 * Componente raíz de la aplicación
 * Modificaciones realizadas:
 * 1. Agregado componente SideCart para mostrar el carrito lateral
 * 2. Separada la lógica en RootContent para poder usar el hook useCart
 * 3. El carrito lateral está disponible en toda la aplicación
 */

import { Outlet } from 'react-router-dom';
import { CartProvider, useCart } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SideCart from '../components/cart/SideCart';
import ScrollToTop from '../components/common/ScrollToTop';

function RootContent() {
  const { showSideCart, setShowSideCart } = useCart();
  
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <SideCart show={showSideCart} handleClose={() => setShowSideCart(false)} />
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootContent />
      </CartProvider>
    </AuthProvider>
  );
}