import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '../components/products/ProductCard';
import { CartContext } from '../context/CartContext';

const mockProduct = {
  id: 1,
  name: 'Producto de prueba',
  price: 1000,
  image: '/assets/products/test.jpg',
  description: 'Descripción de prueba'
};

describe('ProductCard Component', () => {
  let mockAddItem;
  let cartContextValue;

  beforeEach(() => {
    mockAddItem = jest.fn();
    cartContextValue = {
      addItem: mockAddItem,
      cartItems: [],
      removeItem: jest.fn(),
      clearCart: jest.fn(),
    };
  });

  it('renderiza la información del producto', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard product={mockProduct} />
      </CartContext.Provider>
    );
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  it('muestra botón de agregar al carrito', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard product={mockProduct} />
      </CartContext.Provider>
    );
    
    const addButton = screen.getByRole('button', { name: /agregar al carrito/i });
    expect(addButton).toBeInTheDocument();
  });

  it('maneja el clic en agregar al carrito', () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <ProductCard product={mockProduct} />
      </CartContext.Provider>
    );
    
    const addButton = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(addButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });
});