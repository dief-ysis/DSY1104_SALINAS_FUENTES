import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../../components/home/Hero';

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

    const ctaLink = screen.getByRole('link', { name: /ver productos/i });
    expect(ctaLink).toHaveAttribute('href', '/productos');
  });

  it('renders hero with proper structure', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const heroSection = screen.getByRole('region', { hidden: true });
    expect(heroSection).toBeInTheDocument();
  });
});