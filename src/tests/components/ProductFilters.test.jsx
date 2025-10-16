import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFilters } from '../../components/products/ProductFilters';

describe('ProductFilters Component', () => {
  const mockFilters = {
    filter: '',
    setFilter: vi.fn(),
    category: '',
    setCategory: vi.fn(),
    sortBy: 'nombre',
    setSortBy: vi.fn(),
    sortOrder: 'asc',
    setSortOrder: vi.fn()
  };

  const mockCategories = [
    { id: 'FR', name: 'Frutas' },
    { id: 'VR', name: 'Verduras' }
  ];

  it('renders all filter inputs', () => {
    render(
      <ProductFilters 
        filters={mockFilters}
        categories={mockCategories}
      />
    );

    expect(screen.getByPlaceholderText(/buscar productos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filtrar por categoría/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ordenar productos/i)).toBeInTheDocument();
  });

  it('calls setFilter when search input changes', () => {
    render(
      <ProductFilters 
        filters={mockFilters}
        categories={mockCategories}
      />
    );

    const searchInput = screen.getByPlaceholderText(/buscar productos/i);
    fireEvent.change(searchInput, { target: { value: 'manzana' } });

    expect(mockFilters.setFilter).toHaveBeenCalledWith('manzana');
  });

  it('calls setCategory when category select changes', () => {
    render(
      <ProductFilters 
        filters={mockFilters}
        categories={mockCategories}
      />
    );

    const categorySelect = screen.getByLabelText(/filtrar por categoría/i);
    fireEvent.change(categorySelect, { target: { value: 'FR' } });

    expect(mockFilters.setCategory).toHaveBeenCalledWith('FR');
  });

  it('renders all category options', () => {
    render(
      <ProductFilters 
        filters={mockFilters}
        categories={mockCategories}
      />
    );

    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });
});