// src/login/login.tsx
import React, { useState } from 'react';
import '../login/login.css'; // Reutilizamos el mismo CSS
import { useNavigate } from 'react-router-dom';
import iconPersona from '../assets/persona.png';
import iconCandado from '../assets/candado.png';
import { API_URL } from '../api'; // Asegúrate de que esta ruta sea correcta
const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!usuario || !contraseña) {
      setError('Por favor ingrese usuario y contraseña');
      return;
    }

    try {
      // Solicitar token al servidor OAuth
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', usuario);  // O 'email', depende del nombre de tu campo
      params.append('password', contraseña);
      params.append('client_id', 'application');  // Asegúrate de que estos valores sean correctos
      params.append('client_secret', 'secret');  // Asegúrate de que estos valores sean correctos

      const tokenResponse = await fetch(`${API_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (!tokenResponse.ok) {
        setError('Error al obtener el token');
        return;
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.accessToken;  // Cambia según cómo se devuelva el token

      // Guardar el token en localStorage
      localStorage.setItem('token', token);
      console.log('Token guardado login:', token);
      // Hacer petición al endpoint protegido para obtener datos del usuario
    const profileResponse = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!profileResponse.ok) {
      setError('Error al obtener datos del usuario');
      return;
    }

    const profileData = await profileResponse.json();
    const userRole = profileData.user.role; // Asegúrate de que el endpoint /profile retorne el rol

    console.log('Rol del usuario:', userRole);

      // Redirigir dependiendo del rol del usuario
      // Aquí podrías agregar lógica para obtener el rol o cualquier otra validación
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/transacciones');
      }
      console.log('rol', tokenData.role);

    } catch (error) {
      setError('Error al intentar iniciar sesión');
      console.error(error);
    }
  };

  const goToRegister = () => {
    // Navega a la ruta de registro sin cambiar el layout general
    navigate('/register');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>
      {error && <div className="error-message">{error}</div>}
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
