import { productService } from '../services/product';

// productLoader: Carga un producto individual por ID desde ruta /productos/:id
// Compatible con React Router v6 params
export const productLoader = async ({ params }) => {
  if (!params || !params.id) {
    throw new Response('Product ID is required', { status: 400 });
  }

  const product = await productService.getProductById(params.id);
  if (!product) {
    throw new Response('Producto no encontrado', { status: 404 });
  }

  return { product };
};