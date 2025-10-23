export const productService = {
  getAllProducts: async () => {
    // Mock implementation for testing
    const mockProducts = [
      {
        id: 'P1',
        nombre: 'Producto 1',
        name: 'Producto 1',
        precioCLP: 1000,
        price: 1000,
        descripcion: 'Descripción del producto 1',
        description: 'Descripción del producto 1',
        categoriaId: 'C1',
        category: 'Categoria 1',
        stock: 10,
        image: '/test1.jpg'
      },
      {
        id: 'P2',
        nombre: 'Producto 2',
        name: 'Producto 2',
        precioCLP: 2000,
        price: 2000,
        descripcion: 'Descripción del producto 2',
        description: 'Descripción del producto 2',
        categoriaId: 'C2',
        category: 'Categoria 2',
        stock: 5,
        image: '/test2.jpg'
      }
    ];
    return mockProducts;
  },

  getProductById: async (id) => {
    // Mock implementation for testing
    if (id === 'P1') {
      return {
        id: 'P1',
        nombre: 'Producto 1',
        precioCLP: 1000,
        descripcion: 'Descripción del producto 1',
        categoriaId: 'C1',
        stock: 10
      };
    }
    throw new Error(`Producto con ID ${id} no encontrado`);
  },

  getAllCategories: async () => {
    // Mock implementation for testing
    return [
      { id: 'C1', nombre: 'Categoría 1' },
      { id: 'C2', nombre: 'Categoría 2' }
    ];
  },

  getProductsByCategory: async (categoryId) => {
    // Mock implementation for testing
    return [
      {
        id: 'P1',
        nombre: 'Producto 1',
        precioCLP: 1000,
        descripcion: 'Descripción del producto 1',
        categoriaId: categoryId,
        stock: 10
      }
    ];
  },

  getFeaturedProducts: async (limit = 4) => {
    const products = await productService.getAllProducts();
    return products.slice(0, limit);
  },

  searchProducts: async ({ query = '', category = '', sortBy = 'nombre', sortOrder = 'asc', page = 1, limit = 10 }) => {
    const allProducts = await productService.getAllProducts();
    const filtered = allProducts.filter(p => {
      const matchesQuery = query === '' || 
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === '' || p.categoriaId === category;
      return matchesQuery && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = sorted.slice(startIndex, endIndex);

    return { 
      products,
      totalItems: filtered.length,
      currentPage: page,
      totalPages: Math.ceil(filtered.length / limit)
    };
  },

  validateStock: async (productId, quantity) => {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return {
      isAvailable: product.stock >= quantity,
      currentStock: product.stock
    };
  },

  getStats: async () => {
    const products = await productService.getAllProducts();
    const categories = await productService.getAllCategories();
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    return {
      years: 10,
      categories: categories.length,
      totalStock: totalStock,
      locations: ['Santiago', 'Concepción', 'Valparaíso'],
      products: 100
    };
  }
};