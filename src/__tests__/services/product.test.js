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

  describe('getAllProducts', () => {
    it('returns normalized products', async () => {
      const products = await productService.getAllProducts();
      expect(Array.isArray(products)).toBe(true);
      
      const product = products[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('nombre');
      expect(product).toHaveProperty('precioCLP');
      expect(product).toHaveProperty('descripcion');
      expect(product).toHaveProperty('categoriaId');
    });
  });

  describe('getProductById', () => {
    it('returns a specific product', async () => {
      const productId = 'P1';
      const product = await productService.getProductById(productId);
      expect(product.id).toBe(productId);
    });

    it('throws error for non-existent product', async () => {
      await expect(productService.getProductById('invalid-id'))
        .rejects.toThrow('Producto con ID invalid-id no encontrado');
    });
  });

  describe('getProductsByCategory', () => {
    it('returns products filtered by category', async () => {
      const categoryId = 'C1';
      const products = await productService.getProductsByCategory(categoryId);
      expect(products.every(p => p.categoriaId === categoryId)).toBe(true);
    });
  });

  describe('getFeaturedProducts', () => {
    it('returns correct number of featured products', async () => {
      const limit = 2;
      const featured = await productService.getFeaturedProducts(limit);
      expect(featured).toHaveLength(limit);
    });

    it('returns products with correct structure', async () => {
      const featured = await productService.getFeaturedProducts();
      featured.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('category');
      });
    });
  });

  describe('searchProducts', () => {
    it('filters products by search query', async () => {
      const result = await productService.searchProducts({ query: 'Producto 1' });
      expect(result.products.length).toBeGreaterThan(0);
      expect(result.products[0].nombre).toContain('Producto 1');
    });

    it('filters products by category', async () => {
      const result = await productService.searchProducts({ category: 'C1' });
      expect(result.products.every(p => p.categoriaId === 'C1')).toBe(true);
    });

    it('sorts products correctly', async () => {
      const result = await productService.searchProducts({ 
        sortBy: 'precio', 
        sortOrder: 'desc' 
      });
      const prices = result.products.map(p => p.precioCLP);
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });

    it('paginates results correctly', async () => {
      const result = await productService.searchProducts({ 
        page: 1, 
        limit: 5 
      });
      expect(result.products.length).toBeLessThanOrEqual(5);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBeGreaterThan(0);
    });
  });

  describe('validateStock', () => {
    it('validates available stock correctly', async () => {
      const result = await productService.validateStock('P1', 5);
      expect(result.isAvailable).toBe(true);
      expect(result.currentStock).toBeGreaterThanOrEqual(5);
    });

    it('handles insufficient stock', async () => {
      const result = await productService.validateStock('P1', 100);
      expect(result.isAvailable).toBe(false);
    });

    it('throws error for invalid product', async () => {
      await expect(productService.validateStock('invalid-id', 1))
        .rejects.toThrow();
    });
  });

  describe('getStats', () => {
    it('returns correct statistics', async () => {
      const stats = await productService.getStats();
      expect(stats).toHaveProperty('years');
      expect(stats).toHaveProperty('locations');
      expect(stats).toHaveProperty('products');
      expect(stats).toHaveProperty('categories');
      expect(stats).toHaveProperty('totalStock');
    });
  });
});