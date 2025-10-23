const LOCALE = 'es-CL';

/**
 * Formatea un precio en peso chileno (CLP)
 * @param {number} cantidad - Cantidad a formatear
 * @param {boolean} [conSimbolo=true] - Si debe incluir el símbolo de la moneda
 * @returns {string} Precio formateado
 * @throws {Error} Si la cantidad no es un número válido
 */
export function formatearPrecio(cantidad, conSimbolo = true) {
  if (typeof cantidad !== 'number' || isNaN(cantidad)) {
    throw new Error('La cantidad debe ser un número válido');
  }
  
  return cantidad.toLocaleString(LOCALE, { 
    style: conSimbolo ? 'currency' : 'decimal',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

/**
 * Valida si un campo está vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean} true si está vacío, false si no
 */
export function campoVacio(valor) {
  return !valor || String(valor).trim() === '';
}