/**
 * PRODUCT SERVICE - SERVICIO DE PRODUCTOS
 * 
 * Consume endpoints de API REST del backend para operaciones CRUD de productos.
 * Usa api.js (Axios configurado) para todas las llamadas HTTP.
 * 
 * ENDPOINTS BACKEND ESPERADOS:
 * GET    /api/products              - Lista productos con paginación
 * GET    /api/products/{id}         - Producto por ID
 * GET    /api/products/category/{categoria} - Productos por categoría
 * POST   /api/products              - Crear producto (ADMIN)
 * PUT    /api/products/{id}         - Actualizar producto (ADMIN)
 * DELETE /api/products/{id}         - Eliminar producto (ADMIN)
 * 
 * RESPONDE A PREGUNTAS:
 * - P19: Usa Axios como librería HTTP
 * - P20: Estructura en carpeta services/
 * - P22: Manejo de errores del backend
 * - P83: Centraliza headers/errores en api.js
 */

import api from './api';

class ProductService {
  /**
   * Obtiene productos con paginación y filtros
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.page - Página actual (0-indexed)
   * @param {number} params.size - Tamaño de página
   * @param {string} params.search - Término de búsqueda
   * @param {string} params.categoria - Filtro por categoría
   * @param {number} params.minPrecio - Precio mínimo
   * @param {number} params.maxPrecio - Precio máximo
   * @param {string} params.sort - Campo de ordenamiento
   * @param {string} params.order - Dirección (asc/desc)
   * @returns {Promise<Object>} Respuesta paginada con content, totalPages, totalElements
   */
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene un producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise<Object>} Producto
   */
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene productos por categoría
   * @param {string} categoria - Nombre de la categoría
   * @param {Object} params - Parámetros adicionales (page, size)
   * @returns {Promise<Object>} Respuesta paginada
   */
  async getProductsByCategory(categoria, params = {}) {
    try {
      const response = await api.get(`/products/category/${categoria}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener productos de ${categoria}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Busca productos
   * @param {string} query - Término de búsqueda
   * @param {Object} params - Parámetros adicionales
   * @returns {Promise<Object>} Respuesta paginada
   */
  async searchProducts(query, params = {}) {
    try {
      const response = await api.get('/products/search', {
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Crea un nuevo producto (ADMIN)
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado
   */
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza un producto (ADMIN)
   * @param {string} id - ID del producto
   * @param {Object} productData - Datos actualizados
   * @returns {Promise<Object>} Producto actualizado
   */
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Elimina un producto (ADMIN)
   * @param {string} id - ID del producto
   * @returns {Promise<void>}
   */
  async deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Valida stock de un producto
   * @param {string} productId - ID del producto
   * @param {number} quantity - Cantidad deseada
   * @returns {Promise<Object>} { available: boolean, stock: number }
   */
  async validateStock(productId, quantity) {
    try {
      const response = await api.get(`/products/${productId}/stock`, {
        params: { quantity }
      });
      return response.data;
    } catch (error) {
      console.error(`Error al validar stock de ${productId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todas las categorías
   * @returns {Promise<Array>} Lista de categorías
   */
  async getCategories() {
    try {
      const response = await api.get('/products/categorias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de API de forma consistente
   * @private
   */
  handleError(error) {
    if (error.response) {
      // Error de respuesta del servidor (4xx, 5xx)
      const message = error.response.data?.message || 
                     error.response.data?.error ||
                     'Error en el servidor';
      return new Error(message);
    } else if (error.request) {
      // Error de red (no hubo respuesta)
      return new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Otro tipo de error
      return error;
    }
  }
}

// Exportar instancia única (singleton)
export default new ProductService();