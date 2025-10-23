import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedCategories } from '../../components/home/FeaturedCategories';

const mockCategories = [
  {
    id: 1,
    name: 'Frutas',
    description: 'Frutas frescas de temporada',
    image: '/images/fruits.jpg'
  },
  {
    id: 2,
    name: 'Verduras',
    description: 'Verduras orgánicas',
    image: '/images/vegetables.jpg'
  }
];

describe('FeaturedCategories Component', () => {
  const setup = (categories = mockCategories) => {
    render(
      <BrowserRouter>
        <FeaturedCategories categories={categories} />
      </BrowserRouter>
    );
  };

  it('renderiza el título de categorías', () => {
    setup();
    expect(screen.getByText(/Categorías Destacadas/i)).toBeInTheDocument();
  });

  it('muestra las categorías principales', () => {
    setup();
    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('incluye enlaces a las categorías', () => {
    setup();
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(mockCategories.length);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/products?category=${mockCategories[index].name}`);
    });
  });
});