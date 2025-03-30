// AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../login/login.css'; // Reutiliza el mismo CSS para mantener el estilo
import bancoImg from '../assets/banco.png'; // Asegúrate de que la ruta sea correcta
const AuthLayout: React.FC = () => {
  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <img src={bancoImg} alt="FluxBank Logo" />
          <h1>FluxBank</h1>
          <p>Movemos tu presente y protegemos tu futuro</p>
        </div>
      </div>
      <div className="right-section">
        {/* Aquí se renderizará el formulario (Login o Register) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
