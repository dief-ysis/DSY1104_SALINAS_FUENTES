/**
 * ScrollToTop.jsx
 * Componente utilitario añadido para mejorar la experiencia de navegación
 * 
 * Funcionalidad:
 * - Detecta cambios en la ruta actual usando useLocation
 * - Hace scroll al inicio de la página automáticamente al cambiar de ruta
 * - Usa scrollTo con behavior: 'instant' para una transición inmediata
 * 
 * Implementación:
 * 1. Creado este componente como utility
 * 2. Añadido al Root.jsx dentro del div principal
 * 3. Se activa en cada cambio de ruta (pathname)
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente que se encarga de hacer scroll al top cuando cambiamos de ruta
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar la ruta, hacemos scroll al inicio de la página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Usamos 'instant' en lugar de 'smooth' para que sea inmediato
    });
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta (pathname)

  return null; // Este componente no renderiza nada
}

export default ScrollToTop;