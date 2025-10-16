// js/utils.js
// Funciones utilitarias comunes para el proyecto Huerto Hogar

/**
 * Formatea un precio en moneda local
 * @param {number} precio
 * @returns {string}
 */
/**
 * Formatea un precio en peso chileno (CLP)
 * @param {number} cantidad
 * @returns {string}
 */
export function formatearPrecio(cantidad) {
    return cantidad.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
}

/**
 * Valida si un campo está vacío
 * @param {string} valor
 * @returns {boolean}
 */
export function campoVacio(valor) {
    return !valor || valor.trim() === '';
}

// Agrega aquí más funciones reutilizables según crezca el proyecto
