import React from 'react';
import '../../../css/components/common/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner d-flex flex-column align-items-center justify-content-center" data-testid="loading-spinner">
      <div className="spinner-border" role="status" aria-label="loading-spinner" />
      <p className="mt-3 visually-hidden">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;