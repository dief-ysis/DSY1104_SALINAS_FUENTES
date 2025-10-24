import { productService } from '../../services/product';

describe('ProductService', () => {
  const mockProducts = [
    {
      id: 'P1',
      name: 'Producto 1',
      price: 1000,
      description: 'Descripción 1',
      category: 'C1',
      stock: 10,
      unit: 'unidad',
      origin: 'Local'
    },
    {
      id: 'P2',
      name: 'Producto 2',
      price: 2000,
      description: 'Descripción 2',
      category: 'C2',
      stock: 5,
      unit: 'kg',
      origin: 'Importado'
    }
  ];

  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getAllProducts', () => {
    it('simulates delay on getAllProducts', async () => {
      const promise = productService.getAllProducts();
      
      // No se ha ejecutado nada por los timers falsos
      expect(promise).toBeDefined();
      
      // Avanzamos el tiempo simulado
      jest.runAllTimers();
      
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      
      const product = result[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('nombre');
      expect(product).toHaveProperty('precioCLP');
      expect(product).toHaveProperty('descripcion');
      expect(product).toHaveProperty('categoriaId');
    });

    it('simulates correct delay duration (500ms)', async () => {
      const startTime = Date.now();
      const promise = productService.getAllProducts();
      
      // Avanzamos menos del tiempo requerido
      jest.advanceTimersByTime(400);
      expect(promise).not.toBe(undefined);
      
      // Avanzamos el resto del tiempo
      jest.advanceTimersByTime(100);
      
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(Date.now() - startTime).toBeLessThan(100); // fakeTimers funcionando
    });
  });

  describe('getProductById', () => {
    it('simulates delay on getProductById', async () => {
      const promise = productService.getProductById('P1');
      
      // No se ha ejecutado nada por los timers falsos
      expect(promise).toBeDefined();
      
      // Avanzamos el tiempo simulado
      jest.runAllTimers();
      
      const result = await promise;
      expect(result).toBeDefined();
      expect(result.id).toBe('P1');
    });

    it('simulates correct delay duration (300ms)', async () => {
      const startTime = Date.now();
      const promise = productService.getProductById('P1');
      
      // Avanzamos menos del tiempo requerido
      jest.advanceTimersByTime(200);
      expect(promise).not.toBe(undefined);
      
      // Avanzamos el resto del tiempo
      jest.advanceTimersByTime(100);
      
      const result = await promise;
      expect(result).toBeDefined();
      expect(result.id).toBe('P1');
      expect(Date.now() - startTime).toBeLessThan(100); // fakeTimers funcionando
    });

    it('throws error for non-existent product', async () => {
      const promise = productService.getProductById('invalid-id');
      jest.runAllTimers();
      await expect(promise).rejects.toThrow('Producto con ID invalid-id no encontrado');
    });
  });

  describe('getProductsByCategory', () => {
    it('simulates delay on getProductsByCategory', async () => {
      const promise = productService.getProductsByCategory('C1');
      
      // No se ha ejecutado nada por los timers falsos
      expect(promise).toBeDefined();
      
      // Avanzamos el tiempo simulado
      jest.runAllTimers();
      
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.every(p => p.categoriaId === 'C1')).toBe(true);
    });

    it('simulates correct delay duration (400ms)', async () => {
      const startTime = Date.now();
      const promise = productService.getProductsByCategory('C1');
      
      // Avanzamos menos del tiempo requerido
      jest.advanceTimersByTime(300);
      expect(promise).not.toBe(undefined);
      
      // Avanzamos el resto del tiempo
      jest.advanceTimersByTime(100);
      
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.every(p => p.categoriaId === 'C1')).toBe(true);
      expect(Date.now() - startTime).toBeLessThan(100); // fakeTimers funcionando
    });
  });

  describe('getFeaturedProducts', () => {
    it('returns correct number of featured products', async () => {
      const limit = 2;
      jest.useFakeTimers();
      const promise = productService.getFeaturedProducts(limit);
      jest.runAllTimers();
      const featured = await promise;
      expect(featured).toHaveLength(limit);
      jest.useRealTimers();
    }, 10000);

    it('returns products with correct structure', async () => {
      jest.useFakeTimers();
      const promise = productService.getFeaturedProducts();
      jest.runAllTimers();
      const featured = await promise;
      featured.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('category');
      });
      jest.useRealTimers();
    }, 10000);
  });

  describe('searchProducts', () => {
    it('filters products by search query', async () => {
      jest.useFakeTimers();
      const promise = productService.searchProducts({ query: 'Producto 1' });
      jest.runAllTimers();
      const result = await promise;
      expect(result.products.length).toBeGreaterThan(0);
      expect(result.products[0].nombre).toContain('Producto 1');
      jest.useRealTimers();
    }, 10000);

    it('filters products by category', async () => {
      jest.useFakeTimers();
      const promise = productService.searchProducts({ category: 'C1' });
      jest.runAllTimers();
      const result = await promise;
      expect(result.products.every(p => p.categoriaId === 'C1')).toBe(true);
      jest.useRealTimers();
    }, 10000);

    it('sorts products correctly', async () => {
      jest.useFakeTimers();
      const promise = productService.searchProducts({ 
        sortBy: 'precio', 
        sortOrder: 'desc' 
      });
      jest.runAllTimers();
      const result = await promise;
      const prices = result.products.map(p => p.precioCLP);
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
      jest.useRealTimers();
    }, 10000);

    it('paginates results correctly', async () => {
      jest.useFakeTimers();
      const promise = productService.searchProducts({ 
        page: 1, 
        limit: 5 
      });
      jest.runAllTimers();
      const result = await promise;
      expect(result.products.length).toBeLessThanOrEqual(5);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBeGreaterThan(0);
      jest.useRealTimers();
    }, 10000);
  });

  describe('validateStock', () => {
    it('validates available stock correctly', async () => {
      jest.useFakeTimers();
      const promise = productService.validateStock('P1', 5);
      jest.runAllTimers();
      const result = await promise;
      expect(result.isAvailable).toBe(true);
      expect(result.currentStock).toBeGreaterThanOrEqual(5);
      jest.useRealTimers();
    }, 10000);

    it('handles insufficient stock', async () => {
      jest.useFakeTimers();
      const promise = productService.validateStock('P1', 100);
      jest.runAllTimers();
      const result = await promise;
      expect(result.isAvailable).toBe(false);
      jest.useRealTimers();
    }, 10000);

    it('throws error for invalid product', async () => {
      jest.useFakeTimers();
      const promise = productService.validateStock('invalid-id', 1);
      jest.runAllTimers();
      await expect(promise).rejects.toThrow();
      jest.useRealTimers();
    }, 10000);
  });

  describe('getStats', () => {
    it('returns correct statistics', async () => {
      jest.useFakeTimers();
      const promise = productService.getStats();
      jest.runAllTimers();
      const stats = await promise;
      expect(stats).toHaveProperty('years');
      expect(stats).toHaveProperty('locations');
      expect(stats).toHaveProperty('products');
      expect(stats).toHaveProperty('categories');
      expect(stats).toHaveProperty('totalStock');
      jest.useRealTimers();
    }, 10000);
  });
});