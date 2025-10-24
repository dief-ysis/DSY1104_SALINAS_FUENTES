import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { CartContext } from '../context/CartContext';

const mockProduct = {
  id: 1,
  name: 'Producto de prueba',
  price: 1000,
  image: '/assets/products/test.jpg',
  description: 'Descripción de prueba',
  stock: 10
};

const renderProductCard = (cartContextValue) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={cartContextValue}>
        <ProductCard product={mockProduct} />
      </CartContext.Provider>
    </BrowserRouter>
  );
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
    renderProductCard(cartContextValue);
    
    // Verificar el título y precio
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toLocaleString('es-CL')}`)).toBeInTheDocument();
    
    // Verificar la imagen
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
    
    // Verificar la descripción
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('muestra el botón de agregar al carrito con el estilo de Bootstrap', () => {
    renderProductCard(cartContextValue);
    
    const addButton = screen.getByRole('button', { name: /agregar/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveClass('btn', 'btn-success');
  });

  it('maneja el clic en agregar al carrito y muestra retroalimentación visual', () => {
    renderProductCard(cartContextValue);
    
    const addButton = screen.getByTestId('add-cart-button');
    fireEvent.click(addButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });
});