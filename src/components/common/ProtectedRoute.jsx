/**
 * PROTECTED ROUTE - RUTAS PROTEGIDAS
 * 
 * Componentes para proteger rutas que requieren autenticación o roles específicos.
 * 
 * CUMPLE CON PREGUNTAS:
 * - 40: ¿Cómo implementaron rutas protegidas en React Router?
 * - 42: ¿Qué pasaría si un usuario intenta acceder manualmente a una ruta protegida?
 * - 44: Muestra un ejemplo de un componente o vista restringida
 * 
 * USO:
 * - ProtectedRoute: Requiere solo autenticación
 * - AdminRoute: Requiere rol ROLE_ADMIN
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { Alert, Container } from 'react-bootstrap';

/**
 * RUTA PROTEGIDA - Requiere autenticación
 * 
 * Pregunta 40: "¿Cómo implementaron rutas protegidas?"
 * Respuesta: Usando un wrapper component que verifica isAuthenticated
 * del AuthContext antes de renderizar las rutas hijas.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // LOADING: Mientras verifica autenticación
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-3 text-muted">Verificando autenticación...</p>
        </div>
      </Container>
    );
  }

  // NO AUTENTICADO: Redirigir a login
  // Pregunta 42: "¿Qué pasa si un usuario intenta acceder manualmente a una ruta protegida?"
  // Respuesta: Es redirigido automáticamente a /login con la ubicación original guardada
  // en state.from para poder volver después de autenticarse
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // AUTENTICADO: Renderizar children
  return children;
};

/**
 * RUTA DE ADMINISTRADOR - Requiere rol ROLE_ADMIN
 * 
 * Pregunta 32: "¿Cómo protegerías un endpoint en Spring Security para que solo roles específicos accedan?"
 * Pregunta 44: "Muestra un ejemplo de un componente o vista restringida"
 * Respuesta: Similar al backend, el frontend también valida roles antes de mostrar vistas.
 */
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  // LOADING: Mientras verifica autenticación y rol
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-3 text-muted">Verificando permisos...</p>
        </div>
      </Container>
    );
  }

  // NO AUTENTICADO: Redirigir a login
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // AUTENTICADO PERO NO ES ADMIN: Mostrar error de permisos
  // Pregunta 73: "¿Cómo evitar escalamiento de privilegios?"
  // Respuesta: Verificando el rol tanto en frontend (UX) como en backend (seguridad real)
  if (!isAdmin()) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>⛔ Acceso Denegado</Alert.Heading>
          <p>
            No tienes permisos para acceder a esta sección.
            Esta área es exclusiva para administradores.
          </p>
          <hr />
          <p className="mb-0">
            Usuario actual: <strong>{user?.email}</strong> (Rol: USER)
          </p>
          <div className="mt-3">
            <a href="/" className="btn btn-primary">
              Volver al Inicio
            </a>
          </div>
        </Alert>
      </Container>
    );
  }

  // ES ADMIN: Renderizar children
  return children;
};

/**
 * RUTA PÚBLICA CON REDIRECCIÓN SI ESTÁ AUTENTICADO
 * Útil para páginas como Login/Registro que no deben verse si ya estás logueado
 */
export const PublicOnlyRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <LoadingSpinner />
      </Container>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;