import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import Checkout from '../../../pages/Checkout';

describe('Checkout Page', () => {
  const mockCart = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 }
  ];

  const mockCartValue = {
    cart: mockCart,
    getTotal: () => 200,
    clearCart: jest.fn(),
    addToCart: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    getItemCount: jest.fn()
  };

  const renderWithContext = () => {
    return render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartValue}>
          <Checkout />
        </CartContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders checkout form when cart has items', () => {
    renderWithContext();
    
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Información de Envío')).toBeInTheDocument();
    expect(screen.getByText('Información de Pago')).toBeInTheDocument();
  });

  it('displays order summary with correct total', () => {
    renderWithContext();
    
    expect(screen.getByText('Resumen del Pedido')).toBeInTheDocument();
    expect(screen.getByText('Product 1 x 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $200')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithContext();
    
    const submitButton = screen.getByText('Confirmar Pedido');
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Nombre es requerido')).toBeInTheDocument();
    expect(await screen.findByText('Email requerido')).toBeInTheDocument();
    expect(await screen.findByText('Dirección requerida')).toBeInTheDocument();
  });

  it('shows empty cart message when cart is empty', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ ...mockCartValue, cart: [] }}>
          <Checkout />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  });

  it('shows success message after successful order submission', async () => {
    renderWithContext();
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/dirección/i), { target: { value: 'Test St 123' } });
    fireEvent.change(screen.getByLabelText(/ciudad/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/código postal/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/número de tarjeta/i), { target: { value: '4242424242424242' } });
    
    // Submit form
    fireEvent.click(screen.getByText('Confirmar Pedido'));
    
    // Check for success message
    expect(await screen.findByText('¡Pedido Confirmado!')).toBeInTheDocument();
  });
});