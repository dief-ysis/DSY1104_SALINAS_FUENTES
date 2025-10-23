import React from 'react';
import '../../../css/components/Footer.css';

const Footer = () => {
  return (
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
          </ul>
        </div>
        <div className="newsletter">
          <h5>Newsletter</h5>
          <p>Suscríbete para recibir noticias y ofertas especiales</p>
          <form>
            <input type="email" placeholder="Tu email" />
            <button type="submit" className="btn btn-primary">Suscribirse</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;