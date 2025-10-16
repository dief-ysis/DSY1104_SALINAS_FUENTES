import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from '../pages/checkout/Checkout';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Mock the context hook
jest.mock('../context/CartContext');

// Mock the router hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Checkout Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useCart.mockReturnValue({
      cart: [
        { id: 1, name: 'Product 1', price: 1000, quantity: 2 },
        { id: 2, name: 'Product 2', price: 2000, quantity: 1 }
      ],
      total: 4000
    });
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders checkout form with required fields', () => {
    render(<Checkout />);
    
    expect(screen.getByRole('heading', { name: 'Finalizar Compra' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Dirección')).toBeInTheDocument();
  });

  test('displays cart summary correctly', () => {
    render(<Checkout />);
    
    expect(screen.getByText('2x Product 1')).toBeInTheDocument();
    expect(screen.getByText('1x Product 2')).toBeInTheDocument();
    expect(screen.getByText('$4.000')).toBeInTheDocument(); // Total
  });

  test('shows validation errors when form is submitted empty', async () => {
    render(<Checkout />);
    
    const submitButton = screen.getByRole('button', { name: 'Finalizar Compra' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Por favor ingrese su nombre.')).toBeInTheDocument();
      expect(screen.getByText('Por favor ingrese su apellido.')).toBeInTheDocument();
      expect(screen.getByText('Por favor ingrese un email válido.')).toBeInTheDocument();
    });
  });

  test('navigates to summary page on successful form submission', async () => {
    render(<Checkout />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Nombre'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Apellido'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Dirección'), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText('Ciudad'), {
      target: { value: 'Anytown' },
    });
    fireEvent.change(screen.getByLabelText('Código Postal'), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Número de Tarjeta'), {
      target: { value: '4111111111111111' },
    });
    fireEvent.change(screen.getByLabelText('Fecha de Vencimiento'), {
      target: { value: '12/25' },
    });
    fireEvent.change(screen.getByLabelText('CVV'), {
      target: { value: '123' },
    });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Finalizar Compra' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/checkout/summary');
    });
  });
});