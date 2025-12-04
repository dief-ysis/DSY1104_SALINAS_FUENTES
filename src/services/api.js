/**
 * API - CONFIGURACIÓN BASE DE AXIOS
 * 
 * Configuración centralizada de Axios con interceptores para:
 * - Autenticación automática (JWT)
 * - Manejo de errores global
 * - Refresh token automático
 * 
 * RESPONDE A PREGUNTAS:
 * - P19: Librería HTTP seleccionada
 * - P22: Manejo de errores del backend
 * - P83: Centralización de headers y errores
 * - P85: Manejo global de errores HTTP
 */

import axios from 'axios';
import Swal from 'sweetalert2';

// URL base del backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// Crear instancia de Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================================
// INTERCEPTOR DE REQUEST
// ============================================================

api.interceptors.request.use(
  (config) => {
    // Agregar token JWT si existe
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Error en request:', error);
    return Promise.reject(error);
  }
);

// ============================================================
// INTERCEPTOR DE RESPONSE
// ============================================================

api.interceptors.response.use(
  (response) => {
    // Respuesta exitosa
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Error de red
    if (error.code === 'ERR_CANCELED' || axios.isCancel(error)) {
      return Promise.reject(error); // Rechaza silenciosamente sin mostrar alerta
    }
    // ---------------------------

    // Error de red REAL (Servidor caído o sin internet)
    if (!error.response) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Conexión',
        text: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        confirmButtonColor: '#2d5016'
      });
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // ============================================================
    // MANEJO DE ERRORES POR CÓDIGO HTTP
    // ============================================================

    switch (status) {
      case 401: // No autorizado
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          // Intentar refresh token
          const refreshToken = localStorage.getItem('refreshToken');
          
          if (refreshToken) {
            try {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              });

              const { token: newToken } = response.data;
              localStorage.setItem('token', newToken);

              // Reintentar request original con nuevo token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            } catch (refreshError) {
              // Refresh token expirado - logout
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              
              window.location.href = '/login';
              return Promise.reject(refreshError);
            }
          } else {
            // No hay refresh token - logout
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            Swal.fire({
              icon: 'warning',
              title: 'Sesión Expirada',
              text: 'Por favor, inicia sesión nuevamente',
              confirmButtonColor: '#2d5016'
            }).then(() => {
              window.location.href = '/login';
            });
          }
        }
        break;

      case 403: // Prohibido
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: 'No tienes permisos para realizar esta acción',
          confirmButtonColor: '#2d5016'
        });
        break;

      case 404: // No encontrado
        console.warn('[API] Recurso no encontrado:', originalRequest.url);
        break;

      case 422: // Validación
        // Los errores de validación se manejan en los componentes
        break;

      case 500: // Error del servidor
        Swal.fire({
          icon: 'error',
          title: 'Error del Servidor',
          text: data?.message || 'Ocurrió un error en el servidor. Intenta nuevamente.',
          confirmButtonColor: '#2d5016'
        });
        break;

      default:
        console.error('[API] Error no manejado:', status, data);
    }

    return Promise.reject(error);
  }
);

export default api;