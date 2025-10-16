import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FeaturedCategories from '../../components/home/FeaturedCategories';

describe('FeaturedCategories Component', () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <FeaturedCategories />
      </BrowserRouter>
    );
  };

  it('renderiza el título de categorías', () => {
    setup();
    expect(screen.getByText(/Categorías Destacadas/i)).toBeInTheDocument();
  });

  it('muestra las categorías principales', () => {
    setup();
    expect(screen.getByText(/Frutas/i)).toBeInTheDocument();
    expect(screen.getByText(/Verduras/i)).toBeInTheDocument();
    expect(screen.getByText(/Lácteos/i)).toBeInTheDocument();
  });

  it('incluye enlaces a las categorías', () => {
    setup();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});