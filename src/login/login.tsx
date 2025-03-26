import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

// Importar las imágenes
import iconPersona from '../assets/persona.png';
import iconCandado from '../assets/candado.png';
import iconBanco from '../assets/banco.png';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Controla si se muestra el formulario de login o registro
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(e.target.value);
  };

  const handleContraseñaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContraseña(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para iniciar sesión o registrarse
    if (isLogin) {
      // Redirigir a la página principal si el login es exitoso
      navigate('/transacciones');
    } else {
      // Redirigir a la página de registro o similar
      navigate('/registro');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <img src={iconBanco} alt="FluxBank Logo" />
          <h1>FluxBank</h1>
          <p>Movemos tu presente y protegemos tu futuro</p>
        </div>
      </div>

      <div className="right-section">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>

          <div className="input-container">
            <div className="input-with-icon">
              <img src={iconPersona} alt="Usuario" className="input-icon" />
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={handleUsuarioChange}
                required
                placeholder="Usuario"
              />
            </div>
          </div>

          <div className="input-container">
            <div className="input-with-icon">
              <img src={iconCandado} alt="Contraseña" className="input-icon" />
              <input
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={handleContraseñaChange}
                required
                placeholder="Contraseña"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>

          <div className="switch-form">
            <span
              className="switch-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Registrarse' : 'Iniciar sesión'}
            </span>
          </div>

          <div className="help-text">
            <span>Problemas Para Iniciar Sesión?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
