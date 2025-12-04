/**
 * ORDER SERVICE - SERVICIO DE PEDIDOS
 * 
 * Consume endpoints de pedidos del backend.
 * Maneja creación, consulta e historial de pedidos.
 * 
 * ENDPOINTS BACKEND:
 * POST   /api/v1/orders              - Crear pedido desde carrito
 * GET    /api/v1/orders/{id}         - Obtener pedido por ID
 * GET    /api/v1/orders/mis-pedidos  - Historial de pedidos del usuario
 * PATCH  /api/v1/orders/{id}/estado  - Actualizar estado (ADMIN)
 * 
 * RESPONDE A PREGUNTAS:
 * - P19: Usa Axios como librería HTTP
 * - P22: Manejo de errores del backend
 * - P95-101: Gestión de pedidos y estados
 */

import api from './api';

class OrderService {
  /**
   * Crea un nuevo pedido desde el carrito actual
   * 
   * @param {Object} orderData - Datos del pedido
   * @param {string} orderData.direccionEnvio - Dirección de envío
   * @param {string} orderData.comunaEnvio - Comuna
   * @param {string} orderData.regionEnvio - Región
   * @param {string} orderData.metodoPago - Método de pago (WEBPAY, TRANSFERENCIA, EFECTIVO)
   * @param {string} orderData.notasEnvio - Notas adicionales (opcional)
   * @returns {Promise<Object>} Pedido creado con número de pedido
   */
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al crear pedido:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene un pedido por su ID
   * 
   * @param {string|number} orderId - ID del pedido
   * @returns {Promise<Object>} Datos del pedido
   */
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error al obtener pedido ${orderId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene el historial de pedidos del usuario autenticado
   * 
   * @param {Object} params - Parámetros de consulta opcionales
   * @param {number} params.page - Página (default: 0)
   * @param {number} params.size - Tamaño de página (default: 10)
   * @param {string} params.estado - Filtrar por estado
   * @returns {Promise<Object>} Lista paginada de pedidos
   */
  async getMyOrders(params = {}) {
    try {
      const response = await api.get('/orders/mis-pedidos', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al obtener mis pedidos:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todos los pedidos (ADMIN)
   * 
   * @param {Object} params - Parámetros de consulta
   * @returns {Promise<Object>} Lista paginada de todos los pedidos
   */
  async getAllOrders(params = {}) {
    try {
      const response = await api.get('/orders/admin/all', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza el estado de un pedido (ADMIN)
   * 
   * @param {string|number} orderId - ID del pedido
   * @param {string} nuevoEstado - Nuevo estado (PENDIENTE, PAGADO, PROCESANDO, ENVIADO, ENTREGADO, CANCELADO, RECHAZADO)
   * @returns {Promise<Object>} Pedido actualizado
   */
  async updateOrderStatus(orderId, nuevoEstado) {
    try {
      const response = await api.patch(`/orders/${orderId}/estado`, {
        estado: nuevoEstado
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error al actualizar estado del pedido ${orderId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Cancela un pedido (usuario puede cancelar si está en PENDIENTE o PAGADO)
   * 
   * @param {string|number} orderId - ID del pedido
   * @param {string} motivo - Motivo de cancelación
   * @returns {Promise<Object>} Pedido cancelado
   */
  async cancelOrder(orderId, motivo) {
    try {
      const response = await api.post(`/orders/${orderId}/cancelar`, {
        motivo
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error al cancelar pedido ${orderId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene el detalle de un pedido con sus items
   * 
   * @param {string|number} orderId - ID del pedido
   * @returns {Promise<Object>} Pedido con items detallados
   */
  async getOrderDetails(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}/details`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error al obtener detalles del pedido ${orderId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene el resumen de pedidos del usuario (para dashboard)
   * 
   * @returns {Promise<Object>} Resumen con totales por estado
   */
  async getOrdersSummary() {
    try {
      const response = await api.get('/orders/summary');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al obtener resumen de pedidos:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Verifica si un pedido puede ser cancelado
   * 
   * @param {Object} order - Objeto del pedido
   * @returns {boolean} true si puede cancelarse
   */
  canCancelOrder(order) {
    const cancelableStates = ['PENDIENTE', 'PAGADO'];
    return cancelableStates.includes(order.estado);
  }

  /**
   * Obtiene el color para el badge de estado
   * 
   * @param {string} estado - Estado del pedido
   * @returns {string} Color del badge
   */
  getStatusColor(estado) {
    const colors = {
      PENDIENTE: 'warning',
      PAGADO: 'info',
      PROCESANDO: 'primary',
      ENVIADO: 'info',
      ENTREGADO: 'success',
      CANCELADO: 'secondary',
      RECHAZADO: 'danger'
    };
    return colors[estado] || 'secondary';
  }

  /**
   * Obtiene el texto amigable del estado
   * 
   * @param {string} estado - Estado del pedido
   * @returns {string} Texto en español
   */
  getStatusText(estado) {
    const texts = {
      PENDIENTE: 'Pendiente',
      PAGADO: 'Pagado',
      PROCESANDO: 'En Procesamiento',
      ENVIADO: 'Enviado',
      ENTREGADO: 'Entregado',
      CANCELADO: 'Cancelado',
      RECHAZADO: 'Rechazado'
    };
    return texts[estado] || estado;
  }

  /**
   * Formatea el número de pedido para mostrar
   * 
   * @param {string} numeroPedido - Número de pedido
   * @returns {string} Número formateado
   */
  formatOrderNumber(numeroPedido) {
    return `#${numeroPedido}`;
  }

  /**
   * Calcula el total de un pedido desde sus items
   * 
   * @param {Object} order - Objeto del pedido
   * @returns {number} Total calculado
   */
  calculateOrderTotal(order) {
    if (order.total) return order.total;
    
    const subtotal = order.subtotal || 0;
    const costoEnvio = order.costoEnvio || 0;
    const descuentos = order.descuentos || 0;
    
    return subtotal + costoEnvio - descuentos;
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
      const details = error.response.data?.details || null;
      
      return new Error(details ? `${message}: ${details}` : message);
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
export default new OrderService();