/**
 * WEBPAY SERVICE - INTEGRACIÓN WEBPAY PLUS
 * 
 * RESPONDE A PREGUNTAS P102-138 sobre Webpay Plus
 */

import api from './api';

export const initTransaction = async (transactionData) => {
  try {
    const response = await api.post('/payment/webpay/init', transactionData);
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al iniciar transacción'
    };
  }
};

export const commitTransaction = async (token) => {
  try {
    const response = await api.post('/payment/webpay/commit', { token });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al confirmar transacción',
      data: error.response?.data
    };
  }
};

export const refundTransaction = async (token, amount) => {
  try {
    const response = await api.post('/payment/webpay/refund', { token, amount });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al reembolsar'
    };
  }
};

export const getTransactionStatus = async (token) => {
  try {
    const response = await api.get(`/payment/webpay/status/${token}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al obtener estado'
    };
  }
};

export default {
  initTransaction,
  commitTransaction,
  refundTransaction,
  getTransactionStatus
};