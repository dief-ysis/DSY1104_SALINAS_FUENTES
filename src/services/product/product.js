import { products, categories } from '../../../database/products';

// Simulación de delay para emular una llamada API real
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProductService {
  async getAllProducts() {
    try {
      // Simulamos latencia de red
      await delay(500);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(id) {
    try {
      await delay(300);
      const product = products.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async getCategories() {
    try {
      await delay(300);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  async getProductsByCategory(categoryId) {
    try {
      await delay(400);
      const normalizedCategoryId = categoryId.toLowerCase().replace(/\s+/g, '-');
      return products.filter(product => 
        product.category.toLowerCase().replace(/\s+/g, '-') === normalizedCategoryId
      );
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      await delay(400);
      const searchLower = query.toLowerCase();
      return products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByPriceRange(minPrice, maxPrice) {
    try {
      await delay(300);
      return products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
      );
    } catch (error) {
      console.error('Error filtering products by price:', error);
      throw error;
    }
  }

  async getProductsByStock(minStock) {
    try {
      await delay(300);
      return products.filter(product => product.stock >= minStock);
    } catch (error) {
      console.error('Error filtering products by stock:', error);
      throw error;
    }
  }

  async getFeaturedProducts(limit = 4) {
    try {
      await delay(300);
      // Simulamos productos destacados tomando los primeros 'limit' productos
      return products.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  async getProductsByOrigin(origin) {
    try {
      await delay(300);
      const normalizedOrigin = origin.toLowerCase();
      return products.filter(product => 
        product.origin.toLowerCase().includes(normalizedOrigin)
      );
    } catch (error) {
      console.error(`Error fetching products from origin ${origin}:`, error);
      throw error;
    }
  }
}

// Exportamos una única instancia del servicio
export const productService = new ProductService();