// Login.tsx
import React, { useState } from 'react';
import '../login/login.css'; // Reutilizamos el mismo CSS
import { useNavigate } from 'react-router-dom';
import iconPersona from '../assets/persona.png';
import iconCandado from '../assets/candado.png';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para autenticar al usuario (aquí puedes agregar la validación)
    navigate('/transacciones');
  };

  const goToRegister = () => {
    // Navega a la ruta de registro sin cambiar el layout general
    navigate('/register');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>
      <div className="input-container">
        <div className="input-with-icon">
          <img src={iconPersona} alt="Usuario" className="input-icon" />
          <input
            type="text"
            placeholder="Usuario"
            required
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
        </div>
      </div>
      <div className="input-container">
        <div className="input-with-icon">
          <img src={iconCandado} alt="Contraseña" className="input-icon" />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">Ingresar</button>
      <div className="switch-form">
        <span className="switch-link" onClick={goToRegister}>
          Registrarse
        </span>
      </div>
      <div className="help-text">
        <span>Problemas Para Iniciar Sesión?</span>
      </div>
    </form>
  );
};

export default Login;
