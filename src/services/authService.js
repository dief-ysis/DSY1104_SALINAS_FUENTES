/**
 * AUTH SERVICE - SERVICIO DE AUTENTICACIÓN
 * 
 * Maneja autenticación JWT, roles y persistencia de sesión.
 * 
 * RESPONDE A PREGUNTAS:
 * - P30-32: Implementación de roles
 * - P33-35: Estado autenticado y persistencia
 * - P36-38: Gestión de tokens JWT
 */

import api from './api';

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

/**
 * Inicia sesión de usuario
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, refreshToken, user } = response.data;

    // Guardar en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user, token };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al iniciar sesión'
    };
  }
};

/**
 * Registra nuevo usuario
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al registrar',
      errors: error.response?.data?.errors
    };
  }
};

/**
 * Cierra sesión
 */
export const logout = async (isAutoLogout = false) => {
  try {
    if (!isAutoLogout) {
      await api.post('/auth/logout');
    }
  } catch (error) {
    console.error('Error en logout:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

/**
 * Obtiene el usuario actual
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Obtiene el rol del usuario
 */
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.rol || user?.role || null;
};

/**
 * Verifica si el usuario tiene un rol específico
 */
export const hasRole = (requiredRoles) => {
  const userRole = getUserRole();
  if (!userRole) return false;

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }
  
  return userRole === requiredRoles;
};

/**
 * Verifica si es admin
 */
export const isAdmin = () => {
  return hasRole(ROLES.ADMIN);
};

/**
 * Obtiene tiempo restante del token (en segundos)
 */
export const getTokenExpirationTime = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const timeRemaining = (expirationTime - Date.now()) / 1000;
    return timeRemaining > 0 ? timeRemaining : 0;
  } catch {
    return null;
  }
};

export default {
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
  getUserRole,
  hasRole,
  isAdmin,
  getTokenExpirationTime,
  ROLES
};