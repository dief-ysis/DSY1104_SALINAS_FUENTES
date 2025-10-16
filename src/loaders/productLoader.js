import { productService } from '../services/product';

export const productLoader = async ({ params }) => {
  const product = await productService.getProductById(params.id);
  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }
  return { product };
};