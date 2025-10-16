import { describe, it, expect } from 'vitest';
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

    const ctaButton = screen.getByRole('button', { name: /ver catálogo/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/productos');
  });

  it('renders hero image with correct alt text', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const image = screen.getByAltText(/Selección de productos orgánicos frescos/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/images/VerdurasOrganicas.jpg');
  });
});