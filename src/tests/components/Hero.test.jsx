import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from '../../components/home/Hero';

describe('Hero Component', () => {
  it('renders hero title and subtitle', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    expect(screen.getByText('Del huerto a tu hogar')).toBeInTheDocument();
    expect(
      screen.getByText(/Frutas, verduras y productos naturales/i)
    ).toBeInTheDocument();
  });

  it('renders CTA button with correct link', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const ctaLink = screen.getByRole('link', { name: /ver catálogo/i });
    expect(ctaLink).toHaveAttribute('href', '/productos');
  });

  it('renders background image', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const image = screen.getByAltText('Selección de productos orgánicos frescos');
    expect(image).toBeInTheDocument();
  });
});