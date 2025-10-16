import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Offers from '../pages/Offers';
import { useProducts } from '../hooks/useProducts';
import { CartProvider } from '../context/CartContext';

// Mock del hook useProducts
jest.mock('../hooks/useProducts');

// Mock de formatearPrecio
jest.mock('../utils/formatters', () => ({
  formatearPrecio: (price) => `$${price.toLocaleString('es-CL')}`
}));

describe('Offers Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 1500,
      description: 'Test description 1',
      image: 'image1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 2500,
      description: 'Test description 2',
      image: 'image2.jpg'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 1800,
      description: 'Test description 3',
      image: 'image3.jpg'
    }
  ];

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        <CartProvider>
          {component}
        </CartProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null
    });
  });

  test('renders offers page title', () => {
    renderWithRouter(<Offers />);
    expect(screen.getByText('Ofertas Especiales')).toBeInTheDocument();
  });

  test('filters and displays only products with offers', () => {
    renderWithRouter(<Offers />);
    const productNames = screen.getAllByText(/Product (1|3)/);
    expect(productNames).toHaveLength(2); // Solo los productos con precio < 2000
  });

  test('shows message when no offers are available', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null
    });
    
    renderWithRouter(<Offers />);
    expect(screen.getByText('No hay ofertas disponibles en este momento')).toBeInTheDocument();
    expect(screen.getByText('¡Vuelve pronto para ver nuevas ofertas!')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null
    });
    
    renderWithRouter(<Offers />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('displays error message when error occurs', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Error al cargar las ofertas'
    });
    
    renderWithRouter(<Offers />);
    expect(screen.getByText('Error al cargar las ofertas')).toBeInTheDocument();
  });
});