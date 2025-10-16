import { Link } from 'react-router-dom';
import './Hero.css';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="hero-content">
        <span className="stamp">Fresco · Local · Responsable</span>
        <h1 id="home-title" className="hero-title">Del huerto a tu hogar</h1>
        <p className="hero-subtitle">
          Frutas, verduras y productos naturales seleccionados de productores locales. 
          Compra con confianza y apoya el consumo responsable.
        </p>
        <Link to="/productos" className="cta-button" role="button">
          Ver catálogo
        </Link>
      </div>
      <div className="hero-images" aria-hidden="true">
        <img 
          src="/assets/images/VerdurasOrganicas.jpg" 
          alt="Selección de productos orgánicos frescos"
          loading="eager"
        />
      </div>
    </section>
  );
}