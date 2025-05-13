import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Error403 from './error/Error403';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  if (!isAuthenticated) {
    // Si no está autenticado, mostramos la página de error
    return <Error403 />;
    // o bien podrías redirigir:
    // return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Si está autenticado, renderizamos directamente el elemento protegido
  return element;
};

export default PrivateRoute;
