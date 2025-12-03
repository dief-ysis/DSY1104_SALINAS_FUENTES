/**
 * CONTEXT DE AUTENTICACIÓN
 * 
 * Maneja el estado global de autenticación en toda la aplicación.
 * 
 * CUMPLE CON:
 * - Pregunta 33: "¿Cómo manejan en el frontend el estado autenticado del usuario?"
 * - Pregunta 35: "¿Cómo persiste la sesión después de recargar la página?"
 * - Pregunta 37: "¿Cómo verifican el estado de la sesión al cargar una vista protegida?"
 * - Pregunta 38: "¿Cómo manejarían el cierre automático de sesión al expirar un token?"
 * - Pregunta 45: "¿Cómo gestionaron el estado global?"
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  login as loginService,
  register as registerService,
  logout as logoutService,
  isAuthenticated as checkAuth,
  getCurrentUser,
  getUserRole,
  hasRole,
  isAdmin,
  getTokenExpirationTime,
  ROLES
} from '../services/authService';
import Swal from 'sweetalert2';

// ============================================================
// CREACIÓN DEL CONTEXT
// ============================================================

const AuthContext = createContext(null);

// ============================================================
// HOOK PERSONALIZADO PARA USAR EL CONTEXT
// ============================================================

/**
 * Hook para acceder al contexto de autenticación
 * @returns {Object} Estado y funciones de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

// ============================================================
// PROVIDER DEL CONTEXT
// ============================================================

/**
 * Provider que envuelve la aplicación y provee el estado de autenticación
 * Pregunta 45: "¿Cómo gestionaron el estado global? ¿Usaron contextos, reducers o estados locales?"
 */
export const AuthProvider = ({ children }) => {
  // ============================================================
  // ESTADO LOCAL
  // ============================================================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  
  // ============================================================
  // INICIALIZACIÓN AL MONTAR EL COMPONENTE
  // ============================================================

  /**
   * Verifica si hay una sesión activa al cargar la aplicación
   * Pregunta 35: "¿Cómo persiste la sesión después de recargar la página?"
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);

        // Verificar si hay token válido
        const authenticated = checkAuth();

        if (authenticated) {
          // Obtener datos del usuario
          const userData = getCurrentUser();
          
          if (userData) {
            setUser(userData);
            setIsAuthenticatedState(true);
            console.log('[AUTH CONTEXT] Sesión restaurada para:', userData.email);
          } else {
            // Token válido pero sin datos de usuario
            setIsAuthenticatedState(false);
            console.warn('[AUTH CONTEXT] Token válido pero sin datos de usuario');
          }
        } else {
          setUser(null);
          setIsAuthenticatedState(false);
        }

      } catch (error) {
        console.error('[AUTH CONTEXT] Error al inicializar autenticación:', error);
        setUser(null);
        setIsAuthenticatedState(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ============================================================
  // MONITOREO DE EXPIRACIÓN DEL TOKEN
  // ============================================================

  /**
   * Monitorea la expiración del token y cierra sesión automáticamente
   * Pregunta 38: "¿Cómo manejarían el cierre automático de sesión al expirar un token?"
   */
  useEffect(() => {
    if (!isAuthenticatedState) return;

    const checkTokenExpiration = () => {
      const timeRemaining = getTokenExpirationTime();

      if (timeRemaining === null) {
        // Token inválido o no existe
        handleLogout(true);
        return;
      }

      // Si quedan menos de 5 minutos, mostrar advertencia
      if (timeRemaining < 300 && timeRemaining > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Sesión por expirar',
          text: `Tu sesión expirará en ${Math.floor(timeRemaining / 60)} minutos`,
          confirmButtonColor: '#2d5016',
          timer: 5000
        });
      }

      // Si el token expiró, cerrar sesión
      if (timeRemaining <= 0) {
        handleLogout(true);
      }
    };

    // Verificar cada minuto
    const interval = setInterval(checkTokenExpiration, 60000);

    // Verificar inmediatamente
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, [isAuthenticatedState]);

  // ============================================================
  // FUNCIONES DE AUTENTICACIÓN
  // ============================================================

  /**
   * Inicia sesión de un usuario
   * 
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} Resultado del login
   */
  const handleLogin = useCallback(async (credentials) => {
    try {
      setLoading(true);

      const result = await loginService(credentials);

      if (result.success) {
        setUser(result.user);
        setIsAuthenticatedState(true);

        console.log('[AUTH CONTEXT] Login exitoso:', result.user.email);

        return {
          success: true,
          message: 'Sesión iniciada exitosamente',
          user: result.user
        };
      }

      return result;

    } catch (error) {
      console.error('[AUTH CONTEXT] Error en login:', error);
      
      setUser(null);
      setIsAuthenticatedState(false);

      return {
        success: false,
        message: error.message || 'Error al iniciar sesión'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Registra un nuevo usuario
   * 
   * @param {Object} userData - Datos del usuario a registrar
   * @returns {Promise<Object>} Resultado del registro
   */
  const handleRegister = useCallback(async (userData) => {
    try {
      setLoading(true);

      const result = await registerService(userData);

      console.log('[AUTH CONTEXT] Registro exitoso');

      return result;

    } catch (error) {
      console.error('[AUTH CONTEXT] Error en registro:', error);

      return {
        success: false,
        message: error.message || 'Error al registrar usuario',
        errors: error.errors
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cierra la sesión del usuario
   * Pregunta 38: Cierre automático vs manual
   * 
   * @param {boolean} isAutoLogout - true si es logout automático por expiración
   */
  const handleLogout = useCallback(async (isAutoLogout = false) => {
    try {
      setLoading(true);

      await logoutService(isAutoLogout);

      setUser(null);
      setIsAuthenticatedState(false);

      console.log('[AUTH CONTEXT] Logout exitoso', isAutoLogout ? '(automático)' : '(manual)');

      // Mostrar mensaje apropiado
      if (isAutoLogout) {
        Swal.fire({
          icon: 'warning',
          title: 'Sesión Expirada',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          confirmButtonColor: '#2d5016',
          confirmButtonText: 'Iniciar Sesión'
        }).then(() => {
          window.location.href = '/login';
        });
      }

      return {
        success: true,
        message: isAutoLogout ? 'Sesión expirada' : 'Sesión cerrada correctamente'
      };

    } catch (error) {
      console.error('[AUTH CONTEXT] Error en logout:', error);
      
      // Limpiar estado local aunque falle
      setUser(null);
      setIsAuthenticatedState(false);

      return {
        success: true // Siempre "exitoso" para limpiar el frontend
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza los datos del usuario en el contexto
   * 
   * @param {Object} updatedData - Datos actualizados del usuario
   */
  const updateUser = useCallback((updatedData) => {
    if (!user) return;

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    // Actualizar en localStorage también
    localStorage.setItem('user', JSON.stringify(updatedUser));

    console.log('[AUTH CONTEXT] Usuario actualizado');
  }, [user]);

  // ============================================================
  // FUNCIONES DE VERIFICACIÓN DE ROLES
  // ============================================================

  /**
   * Verifica si el usuario tiene un rol específico
   * Pregunta 30: "¿Cómo implementaron los roles de usuario?"
   * Pregunta 32: "¿Cómo protegerías un endpoint para que solo roles específicos accedan?"
   * Pregunta 43: "¿Cómo comprobaron desde React qué rol tiene el usuario?"
   * 
   * @param {string|string[]} requiredRoles - Rol(es) requerido(s)
   * @returns {boolean}
   */
  const checkRole = useCallback((requiredRoles) => {
    if (!isAuthenticatedState) return false;
    return hasRole(requiredRoles);
  }, [isAuthenticatedState]);

  /**
   * Verifica si el usuario es administrador
   * @returns {boolean}
   */
  const checkIsAdmin = useCallback(() => {
    if (!isAuthenticatedState) return false;
    return isAdmin();
  }, [isAuthenticatedState]);

  /**
   * Obtiene el rol del usuario actual
   * @returns {string|null}
   */
  const getRole = useCallback(() => {
    if (!isAuthenticatedState) return null;
    return getUserRole();
  }, [isAuthenticatedState]);

  // ============================================================
  // VALOR DEL CONTEXT
  // ============================================================

  const value = {
    // Estado
    user,
    loading,
    isAuthenticated: isAuthenticatedState,
    
    // Funciones de autenticación
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser,
    
    // Funciones de verificación
    checkRole,
    isAdmin: checkIsAdmin,
    getRole,
    
    // Constantes
    ROLES
  };

  // ============================================================
  // RENDERIZADO
  // ============================================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;