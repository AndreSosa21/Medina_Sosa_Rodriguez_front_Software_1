import React, { useState } from 'react';
import './register.css';
import bancoImg from '../assets/banco.png';
import personaImg from '../assets/persona.png';
import candadoImg from '../assets/candado.png';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      alert('Usuario registrado correctamente');
      navigate('/login');
    } else {
      alert('Por favor, ingrese todos los campos.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <img src={bancoImg} alt="Logo Banco" className="register-logo" />
        <h2 className="register-title">FluxBank</h2>
        <p className="register-slogan">Movemos tu presente y protegemos tu futuro</p>
      </div>
      <div className="right-section">
        <form onSubmit={handleRegister} className="form-container">
          <h2 className="form-title">Registrarse</h2>
          <div className="input-group">
            <img src={personaImg} alt="Usuario" className="input-icon" />
            <input
              type="email"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <img src={candadoImg} alt="Contraseña" className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">Registrarse</button>
          <button type="button" onClick={handleLoginRedirect} className="login-btn">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
