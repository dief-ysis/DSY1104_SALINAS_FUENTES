// js/utils.js
// Funciones utilitarias comunes para el proyecto Huerto Hogar

/**
 * Formatea un precio en moneda local
 * @param {number} precio
 * @returns {string}
 */
export function formatearPrecio(precio) {
    return precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
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
