import React from 'react';
import '../../../css/components/common/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner" aria-label="Cargando contenido">
      <div className="loading-spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;