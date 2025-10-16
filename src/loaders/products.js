import { productService } from '../services/product';

export const productsLoader = async () => {
  try {
    const products = await productService.getAllProducts();
    const categories = await productService.getAllCategories();
    return { products, categories };
  } catch (error) {
    throw new Error('Error loading products');
  }
};