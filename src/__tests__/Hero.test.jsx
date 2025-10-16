import { render, screen } from '@testing-library/react';
import Hero from '../components/home/Hero';

describe('Hero Component', () => {
  it('renderiza el título principal', () => {
    render(<Hero />);
    const titleElement = screen.getByText(/Huerto Hogar/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renderiza la descripción', () => {
    render(<Hero />);
    const descriptionElement = screen.getByText(/productos orgánicos/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renderiza el botón de acción', () => {
    render(<Hero />);
    const buttonElement = screen.getByRole('button', { name: /comprar/i });
    expect(buttonElement).toBeInTheDocument();
  });
});