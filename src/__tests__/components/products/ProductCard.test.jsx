import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../../components/products/ProductCard';
import { CartContext } from '../../../context/CartContext';

const mockProduct = {
  id: 'TEST001',
  nombre: 'Producto Test',
  precioCLP: 1500,
  descripcion: 'Descripción de prueba',
  imagen: '/test.jpg',
  stock: 10
};

const renderWithCart = (ui, cartContextValue = {}) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={{
        addItem: jest.fn(),
        removeItem: jest.fn(),
        getItemCount: jest.fn(),
        ...cartContextValue
      }}>
        {ui}
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.nombre)).toBeInTheDocument();
    expect(screen.getByText('$1.500')).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.nombre)).toBeInTheDocument();
  });

  it('calls addItem when add to cart button is clicked', () => {
    const addItem = jest.fn();
    renderWithCart(<ProductCard product={mockProduct} />, { addItem });
    
    fireEvent.click(screen.getByText(/agregar al carrito/i));
    expect(addItem).toHaveBeenCalledWith(mockProduct);
  });

  it('shows out of stock message when stock is 0', () => {
    const noStockProduct = { ...mockProduct, stock: 0 };
    renderWithCart(<ProductCard product={noStockProduct} />);
    
    expect(screen.getByText(/agotado/i)).toBeInTheDocument();
    expect(screen.getByTestId('add-cart-button')).toBeDisabled();
  });

  it('displays product link correctly', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    
    expect(screen.getByTestId('detail-button')).toHaveAttribute('href', `/productos/${mockProduct.id}`);
  });

  it('renders product image with lazy loading', () => {
    renderWithCart(<ProductCard product={mockProduct} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('src', mockProduct.imagen);
  });
});