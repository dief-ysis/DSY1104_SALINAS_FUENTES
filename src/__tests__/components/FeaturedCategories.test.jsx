import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedCategories } from '../../components/home/FeaturedCategories';
import { CATEGORIES } from '../../database/categories';

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
    expect(screen.getByText(/Categorías destacadas/i)).toBeInTheDocument();
  });

  it('muestra las categorías principales', () => {
    setup();
    CATEGORIES.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('incluye enlaces a las categorías', () => {
    setup();
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(CATEGORIES.length);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/productos?cat=${CATEGORIES[index].id.toLowerCase()}`);
    });
  });
});