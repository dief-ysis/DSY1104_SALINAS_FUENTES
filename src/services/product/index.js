import { products, categories } from '../../../database/products';

// Simular delay de API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAllProducts() {
    await delay(800);
    return products;
  },

  async getProductById(id) {
    await delay(500);
    return products.find(product => product.id === id);
  },

  async getProductsByCategory(category) {
    await delay(600);
    return products.filter(product => product.category === category);
  },

  async getAllCategories() {
    await delay(300);
    return categories;
  },

  async createProduct(productData) {
    await delay(1000);
    const newProduct = {
      id: `PROD${Date.now()}`,
      ...productData
    };
    products.push(newProduct);
    return newProduct;
  }
};