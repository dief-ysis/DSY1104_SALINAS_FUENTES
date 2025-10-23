import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartWithRedux from '../../components/CartWithRedux';
import cartReducer, { addToCart } from '../../redux/slices/cartSlice';

describe('CartWithRedux', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer
      }
    });
  });

  const renderWithRedux = (component) => {
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  it('displays empty cart message when cart is empty', () => {
    renderWithRedux(<CartWithRedux />);
    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
  });

  it('displays cart items and total', () => {
    store.dispatch(addToCart({
      product: {
        id: '1',
        name: 'Producto Test',
        price: 1000,
        stock: 10
      },
      quantity: 2
    }));

    renderWithRedux(<CartWithRedux />);
    
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$2.000')).toBeInTheDocument();
  });

  it('allows updating quantity', () => {
    store.dispatch(addToCart({
      product: {
        id: '1',
        name: 'Producto Test',
        price: 1000,
        stock: 10
      },
      quantity: 1
    }));

    renderWithRedux(<CartWithRedux />);
    
    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('allows removing items', () => {
    store.dispatch(addToCart({
      product: {
        id: '1',
        name: 'Producto Test',
        price: 1000,
        stock: 10
      },
      quantity: 1
    }));

    renderWithRedux(<CartWithRedux />);
    
    const removeButton = screen.getByText('Eliminar');
    fireEvent.click(removeButton);
    
    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
  });
});