import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.jsx';
import Login from '../../../pages/Login';

const renderWithAuth = (ui, { authValue = {} } = {}) => {
  const defaultAuthValue = {
    login: jest.fn(),
    loading: false,
    error: null,
    ...authValue
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={defaultAuthValue}>
        {ui}
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe('Login Page', () => {
  it('renders login form correctly', () => {
    renderWithAuth(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithAuth(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithAuth(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });

  it('validates password length', async () => {
    renderWithAuth(<Login />);
    
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: '12345' }
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });
  });

  it('calls login function with form data', async () => {
    const login = jest.fn();
    renderWithAuth(<Login />, { 
      authValue: { login } 
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows loading state', () => {
    renderWithAuth(<Login />, { 
      authValue: { loading: true } 
    });
    
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeDisabled();
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    renderWithAuth(<Login />, { 
      authValue: { error: 'Credenciales inválidas' } 
    });
    
    expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
  });
});