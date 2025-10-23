import { productService } from '../services/product';

export const homeLoader = async () => {
  try {
    const [featuredProducts, stats] = await Promise.all([
      productService.getFeaturedProducts(),
      productService.getStats()
    ]);

    return {
      featuredProducts,
      stats
    };
  } catch (error) {
    throw new Response(error.message, { status: 500 });
  }
};