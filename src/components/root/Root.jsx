import { Outlet } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { Navbar } from '../common/Navbar';
import Footer from '../common/Footer';
import '../../../css/components/Root.css';

export default function Root() {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}