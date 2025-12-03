/**
 * FORMATTERS - UTILIDADES DE FORMATO
 * 
 * Funciones para formatear datos de la aplicación.
 */

/**
 * Formatea un número como precio en pesos chilenos
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado (ej: "$1.200")
 */
export const formatearPrecio = (price) => {
  // Validar entrada
  if (price === null || price === undefined) {
    return '$0';
  }

  const numPrice = Number(price);
  
  if (isNaN(numPrice)) {
    return '$0';
  }

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
};

// Alias para compatibilidad
export const formatPrice = formatearPrecio;

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
};

export default { formatearPrecio, formatPrice, formatearFecha };