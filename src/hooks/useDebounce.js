/**
 * USEDEBOUNCE HOOK - DEBOUNCING DE VALORES
 * 
 * Custom hook para debouncing de valores (típicamente inputs de búsqueda).
 * Retrasa la actualización del valor hasta que el usuario deja de escribir.
 * 
 * RESPONDE A PREGUNTAS:
 * - P67: "¿Cómo minimizar llamadas innecesarias desde React?"
 * - P94: "¿Qué ventajas tienen los custom hooks?"
 * 
 * CASO DE USO:
 * En lugar de hacer una petición HTTP por cada letra que el usuario escribe,
 * esperamos a que termine de escribir (delay de 500ms) para hacer la petición.
 * 
 * EJEMPLO:
 * ```javascript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // Esta petición solo se ejecuta 500ms después de que el usuario
 *   // deja de escribir
 *   if (debouncedSearch) {
 *     fetchProducts(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 * ```
 */

import { useState, useEffect } from 'react';

/**
 * Hook de debouncing para retrasar la actualización de un valor
 * 
 * @param {any} value - Valor a debouncer
 * @param {number} delay - Tiempo de espera en milisegundos (default: 500ms)
 * @returns {any} Valor debounced
 */
export const useDebounce = (value, delay = 500) => {
  // ============================================================
  // ESTADO DEL VALOR DEBOUNCED
  // ============================================================
  
  const [debouncedValue, setDebouncedValue] = useState(value);

  // ============================================================
  // EFECTO CON CLEANUP
  // ============================================================

  useEffect(() => {
    // ✅ PRINCIPIO: Timeout para retrasar la actualización
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // ============================================================
    // CLEANUP: Cancelar timeout anterior si value cambia antes del delay
    // ============================================================
    // PREGUNTA 67: Esto es CLAVE para minimizar llamadas al servidor
    // Si el usuario escribe "react", tenemos:
    // - "r" -> inicia timer de 500ms
    // - "re" -> CANCELA timer anterior, inicia nuevo timer
    // - "rea" -> CANCELA timer anterior, inicia nuevo timer
    // - "reac" -> CANCELA timer anterior, inicia nuevo timer
    // - "react" -> CANCELA timer anterior, inicia nuevo timer
    // - (usuario para de escribir)
    // - Después de 500ms -> SE EJECUTA UNA SOLA PETICIÓN con "react"
    //
    // Sin debounce: 5 peticiones HTTP (una por cada letra)
    // Con debounce: 1 petición HTTP (solo cuando el usuario termina)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // ✅ DEPENDENCIAS: Ejecutar cuando value o delay cambian

  // ============================================================
  // RETORNO
  // ============================================================

  return debouncedValue;
};

export default useDebounce;