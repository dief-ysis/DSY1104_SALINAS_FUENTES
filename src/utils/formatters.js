const LOCALE = 'es-CL';

/**
 * Formatea un precio en peso chileno (CLP)
 * @param {number} cantidad - Cantidad a formatear
 * @param {boolean} [conSimbolo=true] - Si debe incluir el símbolo de la moneda
 * @returns {string} Precio formateado
 * @throws {Error} Si la cantidad no es un número válido
 */
export function formatearPrecio(cantidad, conSimbolo = true) {
  if (cantidad === undefined || cantidad === null || typeof cantidad === 'object') {
    throw new Error('La cantidad debe ser un número válido');
  }

  // Convertir a número si es string
  if (typeof cantidad === 'string') {
    const parsed = parseFloat(cantidad.replace(/[^0-9\-\.]/g, ''));
    if (isNaN(parsed)) {
      throw new Error('La cantidad debe ser un número válido');
    }
    cantidad = parsed;
  }

  // Verificar si es un número válido
  if (isNaN(cantidad)) {
    throw new Error('La cantidad debe ser un número válido');
  }

  // Si es un número pero es infinito o -infinito, lanzar error
  if (!Number.isFinite(cantidad)) {
    throw new Error('La cantidad debe ser un número finito');
  }

  // Redondear a 2 decimales
  const rounded = Math.round(cantidad);
  const abs = Math.abs(rounded);
  const formatted = abs.toLocaleString(LOCALE, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  if (conSimbolo) {
    return (rounded < 0 ? '-' : '') + '$' + formatted;
  }
  return (rounded < 0 ? '-' : '') + formatted;
}

/**
 * Valida si un campo está vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean} true si está vacío, false si no
 */
export function campoVacio(valor) {
  // Considerar que 0 y false no son campos vacíos
  if (valor === 0 || valor === false) return false;
  if (valor === null || valor === undefined) return true;
  if (Array.isArray(valor)) return valor.length === 0;
  if (typeof valor === 'object') return Object.keys(valor).length === 0;
  return String(valor).trim() === '';
}