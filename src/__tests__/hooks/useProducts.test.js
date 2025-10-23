import { renderHook, act } from '@testing-library/react';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/product';

// Mock del servicio de productos
jest.mock('../../services/product', () => ({
  productService: {
    getAllProducts: jest.fn(),
    getAllCategories: jest.fn()
  }
}));

describe('useProducts', () => {
  const mockProducts = [
    { id: 'P1', nombre: 'Producto 1', precioCLP: 1000, categoriaId: 'C1' },
    { id: 'P2', nombre: 'Producto 2', precioCLP: 2000, categoriaId: 'C2' }
  ];

  const mockCategories = [
    { id: 'C1', name: 'Categoría 1' },
    { id: 'C2', name: 'Categoría 2' }
  ];

  beforeEach(() => {
    productService.getAllProducts.mockResolvedValue(mockProducts);
    productService.getAllCategories.mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads products and categories on mount', async () => {
    const { result } = renderHook(() => useProducts());

    // Inicialmente debería estar cargando
    expect(result.current.loading).toBe(true);

    // Esperar a que se resuelvan las promesas
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.categories).toHaveLength(mockCategories.length);
  });

  it('handles filter changes', async () => {
    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current.filters.setFilter('Producto 1');
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].nombre).toBe('Producto 1');
  });

  it('handles category filter', async () => {
    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current.filters.setCategory('C1');
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].categoriaId).toBe('C1');
  });

  it('handles sorting', async () => {
    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await Promise.resolve();
    });

    // Ordenar por precio descendente
    act(() => {
      result.current.filters.setSortBy('precio');
      result.current.filters.setSortOrder('desc');
    });

    expect(result.current.products[0].precioCLP).toBe(2000);
    expect(result.current.products[1].precioCLP).toBe(1000);
  });

  it('handles pagination', async () => {
    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.pagination.currentPage).toBe(1);
    
    act(() => {
      result.current.pagination.setPage(2);
    });

    expect(result.current.pagination.currentPage).toBe(2);
  });

  it('handles errors', async () => {
    const error = new Error('Failed to fetch');
    productService.getAllProducts.mockRejectedValue(error);

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe(error.message);
    expect(result.current.loading).toBe(false);
  });
});