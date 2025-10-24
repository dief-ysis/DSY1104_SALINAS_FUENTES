import { render, screen } from '@testing-library/react';
import Products from '../../components/products/Products';

const mockUseNavigation = jest.fn();
const mockUseLoaderData = jest.fn();
const mockUseCart = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: () => mockUseNavigation(),
  useLoaderData: () => mockUseLoaderData(),
}));

jest.mock('../../context/CartContext', () => ({
  useCart: () => mockUseCart(),
}));

// Mock LinkContainer from react-router-bootstrap to render children directly
jest.mock('react-router-bootstrap', () => ({
  LinkContainer: ({ children }) => children
}));

describe('Products', () => {
  beforeEach(() => {
    mockUseNavigation.mockReturnValue({ state: 'idle' });
    mockUseLoaderData.mockReturnValue({
      products: [
        {
          id: 1,
          name: 'Test Product',
          price: 100,
          category: 'Test Category',
          description: 'Test description',
          unit: 'kg',
          stock: 10
        }
      ],
      categories: [{ id: 'c1', name: 'Test Category' }]
    });
    mockUseCart.mockReturnValue({ addToCart: jest.fn() });
  });

  it('should show loading spinner when navigation state is loading', () => {
  mockUseNavigation.mockReturnValue({ state: 'loading' });
    render(<Products />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render products when loaded', () => {
    render(<Products />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });
});