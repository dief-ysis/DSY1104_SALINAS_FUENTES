import { productService } from '../services/product';

// productLoader: soporta dos modos usados en tests:
// - llamado con { params } => devuelve { product }
// - llamado con { request } => devuelve { products } y filtra por query ?category=
export const productLoader = async (ctx = {}) => {
  // Si se proporciona params (ruta /productos/:id)
  if (ctx.params && ctx.params.id) {
    const product = await productService.getProductById(ctx.params.id);
    if (!product) {
      throw new Response('Product Not Found', { status: 404 });
    }
    return { product };
  }

  // Si se proporciona request (listado)
  if (ctx.request && ctx.request.url) {
    const url = new URL(ctx.request.url);
    const category = url.searchParams.get('category');
    if (category) {
      const products = await productService.getProductsByCategory(category);
      return { products: products || [] };
    }

    const products = await productService.getAllProducts();
    return { products: products || [] };
  }

  // Fallback: intentar obtener params por seguridad
  if (ctx.params) {
    const product = await productService.getProductById(ctx.params.id);
    if (!product) throw new Response('Product Not Found', { status: 404 });
    return { product };
  }

  // Default: no hay datos
  return { products: [] };
};