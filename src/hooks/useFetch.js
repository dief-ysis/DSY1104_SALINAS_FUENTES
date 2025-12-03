/**
 * USEFETCH HOOK - FETCH DE DATOS CON MANEJO DE ESTADOS
 * 
 * Custom hook para realizar llamadas HTTP con manejo de loading, error y data.
 * 
 * PRINCIPIOS REACT APLICADOS:
 * 1. ✅ useEffect con cleanup (AbortController)
 * 2. ✅ Estados separados (loading, error, data)
 * 3. ✅ Cancelación de peticiones al desmontar
 * 
 * RESPONDE A PREGUNTAS:
 * - P19: Usa Axios como librería HTTP
 * - P89: Manejo de dependencias en useEffect
 * - P94: Ventajas de custom hooks
 */

import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Hook personalizado para fetch de datos
 * 
 * @param {string} url - URL del endpoint a llamar
 * @param {Object} options - Opciones de configuración
 * @param {Object} options.params - Parámetros de query
 * @param {boolean} options.skip - Si es true, no hace el fetch automáticamente
 * @param {Array} options.dependencies - Dependencias adicionales para refetch
 * @returns {Object} { data, loading, error, refetch }
 */
const useFetch = (url, options = {}) => {
  const { params = {}, skip = false, dependencies = [] } = options;

  // ============================================================
  // ESTADOS
  // ============================================================
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  // ============================================================
  // FETCH CON ABORT CONTROLLER
  // ============================================================

  useEffect(() => {
    // Si skip es true, no hacer fetch
    if (skip) {
      return;
    }

    // ✅ PRINCIPIO: AbortController para cancelar peticiones
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Realizar petición con Axios
        const response = await api.get(url, {
          params,
          signal: abortController.signal
        });

        // ✅ SEGURIDAD: Solo actualizar estado si el componente sigue montado
        if (isMounted) {
          // Validar estructura de respuesta
          if (response.data) {
            setData(response.data);
          } else {
            throw new Error('Respuesta vacía del servidor');
          }
        }
      } catch (err) {
        // No actualizar estado si la petición fue cancelada
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          console.log('[useFetch] Petición cancelada:', url);
          return;
        }

        // ✅ SEGURIDAD: Solo actualizar estado si el componente sigue montado
        if (isMounted) {
          console.error('[useFetch] Error en fetch:', err);
          
          const errorMessage = err.response?.data?.message || 
                              err.message || 
                              'Error al cargar datos';
          
          setError(errorMessage);
          setData(null);
        }
      } finally {
        // ✅ SEGURIDAD: Solo actualizar estado si el componente sigue montado
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // ============================================================
    // CLEANUP: Cancelar petición al desmontar
    // ============================================================
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url, skip, ...dependencies, JSON.stringify(params)]); // ✅ DEPENDENCIAS

  // ============================================================
  // FUNCIÓN REFETCH MANUAL
  // ============================================================

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(url, { params });

      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      console.error('[useFetch] Error en refetch:', err);
      
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Error al recargar datos';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // RETORNO
  // ============================================================

  return { 
    data, 
    loading, 
    error, 
    refetch 
  };
};

export default useFetch;