import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>¡Oops!</h1>
        <h2>Ha ocurrido un error</h2>
        <p>
          {error.statusText || error.message || 
           'Lo sentimos, ha ocurrido un error al cargar la página.'}
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;