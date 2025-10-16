import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/products/ProductCard';
import { CartProvider } from '../context/CartContext';

const mockProduct = {
  id: 1,
  name: 'Producto de prueba',
  price: 1000,
  image: '/assets/products/test.jpg',
  description: 'Descripción de prueba'
};

describe('ProductCard Component', () => {
  it('renderiza la información del producto', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  it('muestra botón de agregar al carrito', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    
    const addButton = screen.getByRole('button', { name: /agregar al carrito/i });
    expect(addButton).toBeInTheDocument();
  });

  it('maneja el clic en agregar al carrito', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    
    const addButton = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(addButton);
    
    // Aquí podrías verificar que el producto se agregó al carrito
    // Por ejemplo, verificando que aparece un mensaje de confirmación
    expect(screen.getByText(/agregado al carrito/i)).toBeInTheDocument();
  });
});