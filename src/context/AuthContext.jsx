import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
const STORAGE_KEY = 'huertohogar-auth';

// Validaciones
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) throw new Error('El email es requerido');
  if (!re.test(email)) throw new Error('Email inválido');
};

const validatePassword = (password) => {
  if (!password) throw new Error('La contraseña es requerida');
  if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validaciones
      validateEmail(email);
      validatePassword(password);

      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock de autenticación
      // En una implementación real, aquí iría la llamada al backend
      const mockUser = {
        id: 1,
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      };

      setUser(mockUser);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Simulación de delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      return { success: true };
    } catch (error) {
      setError('Error al cerrar sesión');
      return { success: false, error: 'Error al cerrar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};