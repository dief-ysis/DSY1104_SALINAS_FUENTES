import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedCategories } from '../../components/home/FeaturedCategories';

const mockCategories = [
  {
    id: 'frutas',
    name: 'Frutas Frescas',
    description: 'Selección de frutas orgánicas de temporada',
    image: '/assets/images/categories/frutas-frescas.svg',
    icon: '🍎',
  },
  {
    id: 'verduras',
    name: 'Vegetales Verdes',
    description: 'Verduras cultivadas sin pesticidas',
    image: '/assets/images/categories/vegetales-verdes.svg',
    icon: '🥬',
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
    expect(links.length).toBeGreaterThanOrEqual(mockCategories.length);
    mockCategories.forEach(category => {
      const link = screen.getByRole('link', { name: new RegExp(category.name, 'i') });
      expect(link).toHaveAttribute('href', `/productos?category=${category.id}`);
    });
  });
});