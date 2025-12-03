/**
 * LOADING SPINNER - INDICADOR DE CARGA
 * 
 * Spinner reutilizable para estados de carga.
 * Soporta diferentes tamaños y variantes.
 */

import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'success',
  text = '',
  fullScreen = false 
}) => {
  // Determinar tamaño del spinner
  const getSpinnerSize = () => {
    switch (size) {
      case 'sm':
        return { width: '1.5rem', height: '1.5rem' };
      case 'lg':
        return { width: '3rem', height: '3rem' };
      case 'xl':
        return { width: '4rem', height: '4rem' };
      default: // md
        return { width: '2rem', height: '2rem' };
    }
  };

  const spinnerElement = (
    <div className={`loading-spinner ${fullScreen ? 'fullscreen' : ''}`}>
      <Spinner 
        animation="border" 
        variant={variant}
        style={getSpinnerSize()}
      />
      {text && <p className="loading-text mt-3">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

export default LoadingSpinner;