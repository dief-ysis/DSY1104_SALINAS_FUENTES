import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilters } from '../../components/products/ProductFilters';

describe('ProductFilters Component', () => {
  const mockFilters = {
    filter: '',
    setFilter: jest.fn(),
    category: '',
    setCategory: jest.fn(),
    sortBy: 'nombre',
    setSortBy: jest.fn(),
    sortOrder: 'asc',
    setSortOrder: jest.fn()
  };

  const mockCategories = [
    { id: 'FR', name: 'Frutas' },
    { id: 'VR', name: 'Verduras' }
  ];

  const setup = () => {
    render(
      <ProductFilters
        filters={mockFilters}
        categories={mockCategories}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el campo de búsqueda', () => {
    setup();
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument();
  });

  it('actualiza el filtro al escribir en el campo de búsqueda', () => {
    setup();
    const searchInput = screen.getByPlaceholderText(/buscar/i);
    fireEvent.change(searchInput, { target: { value: 'manzana' } });
    expect(mockFilters.setFilter).toHaveBeenCalledWith('manzana');
  });

  it('muestra el selector de categorías', () => {
    setup();
    expect(screen.getByLabelText(/categoría/i)).toBeInTheDocument();
  });

  it('actualiza la categoría al seleccionar una opción', () => {
    setup();
    const categorySelect = screen.getByLabelText(/categoría/i);
    fireEvent.change(categorySelect, { target: { value: 'FR' } });
    expect(mockFilters.setCategory).toHaveBeenCalledWith('FR');
  });

  it('muestra el selector de ordenamiento', () => {
    setup();
    expect(screen.getByLabelText(/ordenar productos/i)).toBeInTheDocument();
  });

  it('actualiza el ordenamiento al seleccionar una opción', () => {
    setup();
    const sortSelect = screen.getByLabelText(/ordenar productos/i);
    fireEvent.change(sortSelect, { target: { value: 'precio-asc' } });
    expect(mockFilters.setSortBy).toHaveBeenCalledWith('precio');
    expect(mockFilters.setSortOrder).toHaveBeenCalledWith('asc');
  });
});