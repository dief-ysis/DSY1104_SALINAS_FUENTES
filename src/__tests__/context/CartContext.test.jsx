import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartContext, CartProvider } from '../../context/CartContext';

describe('CartContext', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  beforeEach(() => {
    localStorage.clear();
  });

  const mockProduct = {
    id: 'P1',
    nombre: 'Producto Test',
    precioCLP: 1000,
    stock: 10
  };

  it('provides initial cart state', () => {
    const TestComponent = () => {
      const { cart } = React.useContext(CartContext);
      return <span>Items: {cart.length}</span>;
    };

    render(<TestComponent />, { wrapper });
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('adds items to cart', () => {
    const TestComponent = () => {
      const { addItem, cart } = React.useContext(CartContext);
      return (
        <div>
          <button onClick={() => addItem(mockProduct)}>Add Item</button>
          <span>Items: {cart.length}</span>
          <span>Quantity: {cart[0]?.quantity || 0}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
  });

  it('removes items from cart', () => {
    const TestComponent = () => {
      const { addItem, removeItem, cart } = React.useContext(CartContext);
      return (
        <div>
          <button onClick={() => addItem(mockProduct)}>Add Item</button>
          <button onClick={() => removeItem(mockProduct.id)}>Remove Item</button>
          <span>Items: {cart.length}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Remove Item'));
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('updates quantity for existing items', () => {
    const TestComponent = () => {
      const { addItem, cart } = React.useContext(CartContext);
      return (
        <div>
          <button onClick={() => addItem(mockProduct)}>Add Item</button>
          <span>Quantity: {cart[0]?.quantity || 0}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('calculates total correctly', () => {
    const TestComponent = () => {
      const { addItem, getTotal } = React.useContext(CartContext);
      return (
        <div>
          <button onClick={() => addItem(mockProduct)}>Add Item</button>
          <span>Total: ${getTotal()}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Total: $2.000')).toBeInTheDocument();
  });

  it('clears cart', () => {
    const TestComponent = () => {
      const { addItem, clearCart, cart } = React.useContext(CartContext);
      return (
        <div>
          <button onClick={() => addItem(mockProduct)}>Add Item</button>
          <button onClick={clearCart}>Clear Cart</button>
          <span>Items: {cart.length}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('persists cart state in localStorage', () => {
    const TestComponent = () => {
      const { addItem, cart } = React.useContext(CartContext);
      return (
        <div>
          <button onClick={() => addItem(mockProduct)}>Add Item</button>
          <span>Items: {cart.length}</span>
        </div>
      );
    };

    const { unmount } = render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Add Item'));
    
    // Check localStorage
    const storedCart = JSON.parse(localStorage.getItem('huertohogar-cart'));
    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].id).toBe(mockProduct.id);

    // Remount component to test persistence
    unmount();
    render(<TestComponent />, { wrapper });
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
  });

  it('validates stock when adding items', () => {
    const TestComponent = () => {
      const { addItem, cart } = React.useContext(CartContext);
      const [error, setError] = React.useState('');
      
      const handleAdd = () => {
        try {
          addItem({ ...mockProduct, stock: 1 });
        } catch (err) {
          setError(err.message);
        }
      };

      return (
        <div>
          <button onClick={handleAdd}>Add Item</button>
          <span>Quantity: {cart[0]?.quantity || 0}</span>
          <span>Error: {error}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    // Add first item (should work)
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();

    // Try to add more than stock
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText(/Error: Stock insuficiente/)).toBeInTheDocument();
  });
});