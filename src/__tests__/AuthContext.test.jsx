import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthContext, AuthProvider, useAuth } from '../context/AuthContext';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('AuthContext', () => {
  const wrapper = ({ children }) => (
    <AuthProvider>
      {children}
    </AuthProvider>
  );

  test('useAuth hook provides initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  test('login updates auth state correctly', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    expect(result.current.user).toEqual({
      id: 1,
      email: 'test@example.com',
      name: 'Usuario Demo'
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('logout clears auth state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });
    
    // Then logout
    await act(async () => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});