import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container" aria-label="Cargando contenido">
      <div className="loading-spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;