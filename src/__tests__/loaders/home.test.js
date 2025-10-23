import { homeLoader } from '../../loaders/home';
import { productService } from '../../services/product';

jest.mock('../../services/product');

describe('homeLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads featured products and stats', async () => {
    const mockFeaturedProducts = [
      { id: 'P1', name: 'Product 1' },
      { id: 'P2', name: 'Product 2' }
    ];

    const mockStats = {
      years: 5,
      locations: 3,
      products: 100,
      categories: 10
    };

    productService.getFeaturedProducts.mockResolvedValue(mockFeaturedProducts);
    productService.getStats.mockResolvedValue(mockStats);

    const result = await homeLoader();

    expect(result).toEqual({
      featuredProducts: mockFeaturedProducts,
      stats: mockStats
    });

    expect(productService.getFeaturedProducts).toHaveBeenCalled();
    expect(productService.getStats).toHaveBeenCalled();
  });

  it('handles errors correctly', async () => {
    const error = new Error('Failed to load');
    productService.getFeaturedProducts.mockRejectedValue(error);

    await expect(homeLoader()).rejects.toThrow();
  });
});