import { productService } from '../services/product';

export const productsLoader = async () => {
  try {
    const [products, categories] = await Promise.all([
      productService.getAllProducts(),
      productService.getAllCategories()
    ]);
    
    if (!products || !categories) {
      throw new Error('No se pudieron cargar los productos o categorías');
    }

    return { products, categories };
  } catch (error) {
    throw {
      message: 'Error al cargar los productos',
      statusText: error.message || 'Hubo un problema al obtener los datos',
      status: 500
    };
  }
};