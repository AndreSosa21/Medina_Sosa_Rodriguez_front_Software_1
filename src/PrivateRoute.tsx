// src/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import Error403 from './error/Error403'; // Importamos el componente de error

const getToken = () => {
  return localStorage.getItem('token');
};

// PrivateRoute para proteger rutas
const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const isAuthenticated = getToken();  // Verifica si el token existe

  // Si no está autenticado, redirige a la página de error 403
  if (!isAuthenticated) {
    return <Error403 />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
