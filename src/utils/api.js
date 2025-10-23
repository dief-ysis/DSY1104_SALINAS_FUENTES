import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 5000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Redirigir al login o renovar token
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('No tienes permisos para realizar esta acción');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error del servidor');
          break;
        default:
          console.error('Ocurrió un error en la petición');
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
    } else {
      console.error('Error al configurar la petición');
    }
    return Promise.reject(error);
  }
);

export default api;