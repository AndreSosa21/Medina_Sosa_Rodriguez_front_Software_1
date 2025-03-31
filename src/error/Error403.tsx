// src/Error403.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error403.css'; // Estilos del componente

const Error403: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="error-403-container">
      <div className="error-content">
        <h2 className="error-title">¡Acceso No Autorizado!</h2>
        <p className="error-message">
          Lo sentimos, no tienes permisos para acceder a esta página.
        </p>
        <button onClick={handleBackToLogin} className="back-btn">
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default Error403;
