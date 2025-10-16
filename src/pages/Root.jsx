import { Outlet } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/common/Navbar';
import './Root.css';

export default function Root() {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Outlet />
        </main>
        <footer className="footer">
          <div className="container foot">
            <div>
              <div className="brand">
                <img src="/assets/images/logo.png" alt="Logo Huerto Hogar" className="logo-img footer-logo" />
                <span className="title">Huerto Hogar</span>
              </div>
              <p>Fresco, local y responsable. Juntos impulsamos una alimentación consciente.</p>
            </div>
            <div>
              <h5>Contáctanos</h5>
              <ul>
                <li>📍 Av. Vicuña Mackenna 4917, San Joaquín</li>
                <li>📞 +56 2 2826 7000</li>
                <li>✉️ contacto@huertohogar.cl</li>
                <li>⏰ Lunes a Viernes: 9:00 - 18:00</li>
                <li>🌱 Síguenos en redes sociales</li>
              </ul>
            </div>
            <div>
              <h5>Newsletter</h5>
              <form className="newsletter" onSubmit={(e) => e.preventDefault()} aria-label="Suscripción al boletín">
                <input type="email" placeholder="tu@correo.cl" required />
                <button type="submit">Suscribirme</button>
                <small>
                  Sigamos en redes:{' '}
                  <a href="#" aria-label="Instagram">📸</a>{' '}
                  <a href="#" aria-label="Facebook">📘</a>{' '}
                  <a href="#" aria-label="X / Twitter">✖️</a>
                </small>
              </form>
            </div>
          </div>
          <div className="container bottom">
            © {new Date().getFullYear()} Huerto Hogar · Hecho con ❤ en Chile
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}