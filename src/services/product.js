import { products } from '../database/products';
import { CATEGORIES } from '../database/categories';

class ProductService {
  async getAllProducts() {
    await this.delay(500);
    return products.map(this.normalizeProduct);
  }

  async getProductById(id) {
    await this.delay(300);
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    return this.normalizeProduct(product);
  }

  async getProductsByCategory(categoryId) {
    await this.delay(400);
    return products
      .filter(p => p.category === categoryId)
      .map(this.normalizeProduct);
  }

  async getFeaturedProducts(limit = 4) {
    await this.delay(200);
    return products
      .slice(0, limit)
      .map(this.normalizeProduct);
  }

  async searchProducts({ 
    query = '', 
    category = '', 
    sortBy = 'nombre', 
    sortOrder = 'asc', 
    page = 1, 
    limit = 10 
  } = {}) {
    await this.delay(300);

    let filtered = [...products];

    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
      );
    }

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const normalized = filtered.map(this.normalizeProduct);

    return {
      products: normalized.slice(start, end),
      page,
      totalPages: Math.ceil(normalized.length / limit)
    };
  }

  async validateStock(productId, quantity) {
    await this.delay(200);
    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }

    return {
      isAvailable: product.stock >= quantity,
      currentStock: product.stock
    };
  }

  async getStats() {
    await this.delay(300);
    return {
      years: 10,
      locations: 3,
      products: products.length,
      categories: new Set(products.map(p => p.category)).size,
      totalStock: products.reduce((sum, p) => sum + p.stock, 0)
    };
  }

  async getAllCategories() {
    await this.delay(200);
    return CATEGORIES.map(category => ({
      id: category.id,
      nombre: category.name,
      imagen: category.image,
      // Propiedades en inglés para compatibilidad
      name: category.name,
      image: category.image
    }));
  }

  normalizeProduct(product) {
    return {
      id: product.id,
      nombre: product.name,
      precioCLP: product.price,
      descripcion: product.description,
      categoriaId: product.category,
      stock: product.stock,
      unidad: product.unit,
      origen: product.origin,
      imagen: product.image,
      onSale: product.onSale || false,
      discountPercentage: product.discountPercentage || 0,
      // Propiedades en inglés para compatibilidad
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      unit: product.unit,
      image: product.image
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const productService = new ProductService();