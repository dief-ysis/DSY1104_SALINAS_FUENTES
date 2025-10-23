import { productService } from '../../services/product';
import { productLoader } from '../../loaders/productLoader';

// Mock del service
jest.mock('../../services/product', () => ({
  productService: {
    getAllProducts: jest.fn(),
    getProductsByCategory: jest.fn()
  }
}));

describe('Product Loader', () => {
  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();
  });

  it('calls ProductService.getAllProducts when no category is provided', async () => {
    // Mock del request sin parámetros
    const request = {
      url: new URL('http://localhost/productos')
    };

    // Configuramos el mock para retornar datos de ejemplo
    productService.getAllProducts.mockResolvedValue([
      { id: '1', name: 'Test Product' }
    ]);

    // Ejecutamos el loader
    const result = await productLoader({ request });

    // Verificamos que se llamó al método correcto
    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(productService.getProductsByCategory).not.toHaveBeenCalled();

    // Verificamos el formato de retorno
    expect(result).toHaveProperty('products');
    expect(Array.isArray(result.products)).toBe(true);
  });

  it('calls ProductService.getProductsByCategory when category is provided', async () => {
    // Mock del request con categoría
    const request = {
      url: new URL('http://localhost/productos?category=FrutasFrescas')
    };

    // Configuramos el mock para retornar datos de ejemplo
    productService.getProductsByCategory.mockResolvedValue([
      { id: '1', name: 'Test Product', category: 'FrutasFrescas' }
    ]);

    // Ejecutamos el loader
    const result = await productLoader({ request });

    // Verificamos que se llamó al método correcto
    expect(productService.getProductsByCategory).toHaveBeenCalledWith('FrutasFrescas');
    expect(productService.getAllProducts).not.toHaveBeenCalled();

    // Verificamos el formato de retorno
    expect(result).toHaveProperty('products');
    expect(Array.isArray(result.products)).toBe(true);
    expect(result.products[0].category).toBe('FrutasFrescas');
  });

  it('returns empty array when no products are found', async () => {
    // Mock del request
    const request = {
      url: new URL('http://localhost/productos')
    };

    // Configuramos el mock para retornar array vacío
    productService.getAllProducts.mockResolvedValue([]);

    // Ejecutamos el loader
    const result = await productLoader({ request });

    // Verificamos el formato de retorno
    expect(result).toHaveProperty('products');
    expect(result.products).toHaveLength(0);
  });

  it('handles errors correctly', async () => {
    // Mock del request
    const request = {
      url: new URL('http://localhost/productos')
    };

    // Configuramos el mock para lanzar error
    productService.getAllProducts.mockRejectedValue(new Error('Service error'));

    // Verificamos que el loader maneja el error
    await expect(productLoader({ request })).rejects.toThrow('Service error');
  });
});