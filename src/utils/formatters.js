/**
 * Formatea un precio en peso chileno (CLP)
 * @param {number} cantidad
 * @returns {string}
 */
export function formatearPrecio(cantidad) {
  return cantidad.toLocaleString('es-CL', { 
    style: 'currency', 
    currency: 'CLP', 
    minimumFractionDigits: 0 
  });
}

/**
 * Valida si un campo está vacío
 * @param {string} valor
 * @returns {boolean}
 */
export function campoVacio(valor) {
  return !valor || valor.trim() === '';
}

/**
 * Formatea una fecha a español
 * @param {Date} fecha
 * @returns {string}
 */
export function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Genera un slug desde un string
 * @param {string} texto
 * @returns {string}
 */
export function generarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}