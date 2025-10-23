import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from '../components/home/Hero';

describe('Hero Component', () => {
  it('renderiza el título principal', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Del huerto a tu hogar/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renderiza la descripción', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText(/Frutas, verduras y productos naturales/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renderiza el botón de acción', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const linkElement = screen.getByRole('link', { name: /Ver catálogo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/productos');
  });
});