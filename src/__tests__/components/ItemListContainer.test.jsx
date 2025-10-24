import { render, screen } from '@testing-library/react';
import { ItemListContainer } from '../../components/products/ItemListContainer';

// Mock de react-router-dom: exponer useNavigation y useLoaderData
const mockUseNavigation = jest.fn();
const mockUseLoaderData = jest.fn(() => ({ products: [{ id: '1', name: 'Test Product', price: 1000 }] }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: () => mockUseNavigation(),
  useLoaderData: () => mockUseLoaderData(),
}));

describe('ItemListContainer - Loading State', () => {
  it('shows spinner when loading', () => {
  // Mock del estado loading
  mockUseNavigation.mockReturnValue({ state: 'loading' });

    render(<ItemListContainer />);
    
    // Verificamos que el spinner está presente
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    // Verificamos que la lista de productos no está visible
    expect(screen.queryByTestId('product-list')).not.toBeInTheDocument();
  });

  it('shows products when idle', () => {
  // Mock del estado idle
  mockUseNavigation.mockReturnValue({ state: 'idle' });

    render(<ItemListContainer />);
    
    // Verificamos que el spinner no está presente
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    // Verificamos que la lista de productos está visible
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    // Verificamos que se muestra al menos un producto
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('handles empty product list', () => {
    // Mock del estado idle con lista vacía
    mockUseNavigation.mockReturnValue({ state: 'idle' });
    mockUseLoaderData.mockReturnValue({ products: [] });

    render(<ItemListContainer />);
    
    // Verificamos que se muestra el mensaje de no productos
    expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument();
  });

  it('transitions correctly from loading to idle', () => {
  // Primero renderizamos en estado loading
  mockUseNavigation.mockReturnValue({ state: 'loading' });
    const { rerender } = render(<ItemListContainer />);
    
    // Verificamos el estado loading
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
  // Cambiamos a estado idle
  mockUseNavigation.mockReturnValue({ state: 'idle' });
    rerender(<ItemListContainer />);
    
    // Verificamos que el spinner desapareció y los productos aparecieron
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});