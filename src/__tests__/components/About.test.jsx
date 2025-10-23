import { render, screen } from '@testing-library/react';
import About from '../../../pages/About';

describe('About Page', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('renders about page title', () => {
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
  });

  it('displays company history', () => {
    expect(screen.getByText(/Huerto Hogar nació/i)).toBeInTheDocument();
  });

  it('displays values section', () => {
    expect(screen.getByText('Nuestros Valores')).toBeInTheDocument();
    expect(screen.getByText('Sostenibilidad')).toBeInTheDocument();
    expect(screen.getByText('Calidad')).toBeInTheDocument();
    expect(screen.getByText('Comunidad')).toBeInTheDocument();
  });

  it('displays statistics', () => {
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('10k+')).toBeInTheDocument();
  });

  it('shows the company image', () => {
    const image = screen.getByAlt('Huerto Hogar - Productos Orgánicos');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/images/ProductosOrganicos.webp');
  });
});