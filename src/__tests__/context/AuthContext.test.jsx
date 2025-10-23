import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../../context/AuthContext';

describe('AuthContext', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('provides initial auth state', () => {
    const TestComponent = () => {
      const { user, isAuthenticated } = React.useContext(AuthContext);
      return (
        <div>
          <span>User: {JSON.stringify(user)}</span>
          <span>Is Authenticated: {String(isAuthenticated)}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    expect(screen.getByText('User: null')).toBeInTheDocument();
    expect(screen.getByText('Is Authenticated: false')).toBeInTheDocument();
  });

  it('handles login successfully', async () => {
    const TestComponent = () => {
      const { login, user, loading, error } = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={() => login('test@example.com', 'password123')}>
            Login
          </button>
          <span>User: {user?.email}</span>
          <span>Loading: {String(loading)}</span>
          <span>Error: {error || 'none'}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText('Loading: true')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('User: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Loading: false')).toBeInTheDocument();
    expect(screen.getByText('Error: none')).toBeInTheDocument();
  });

  it('handles login validation errors', async () => {
    const TestComponent = () => {
      const { login, error } = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={() => login('invalid-email', 'short')}>
            Login
          </button>
          <span>Error: {error || 'none'}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByText(/Error: Email inválido/)).toBeInTheDocument();
  });

  it('handles logout', async () => {
    const TestComponent = () => {
      const { login, logout, isAuthenticated } = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={() => login('test@example.com', 'password123')}>
            Login
          </button>
          <button onClick={logout}>Logout</button>
          <span>Is Authenticated: {String(isAuthenticated)}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    // Login first
    fireEvent.click(screen.getByText('Login'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Then logout
    fireEvent.click(screen.getByText('Logout'));
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText('Is Authenticated: false')).toBeInTheDocument();
  });

  it('persists user state in localStorage', async () => {
    const TestComponent = () => {
      const { login, user } = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={() => login('test@example.com', 'password123')}>
            Login
          </button>
          <span>User: {user?.email}</span>
        </div>
      );
    };

    render(<TestComponent />, { wrapper });

    fireEvent.click(screen.getByText('Login'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Check localStorage
    const storedUser = JSON.parse(localStorage.getItem('huertohogar-auth'));
    expect(storedUser.email).toBe('test@example.com');

    // Remount component to test persistence
    const { unmount } = render(<TestComponent />, { wrapper });
    unmount();
    render(<TestComponent />, { wrapper });

    expect(screen.getByText('User: test@example.com')).toBeInTheDocument();
  });
});