import React, { useState } from 'react';
import '../login/login.css'; // Reutilizamos el mismo CSS del login
import { useNavigate } from 'react-router-dom';
// Importa los mismos íconos que usas en Login
import iconPersona from '../assets/persona.png';
import iconCandado from '../assets/candado.png';

const API_URL = 'https://fluxbank-delta.vercel.app';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        // Llamada al endpoint de registro
        const registerResponse = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, password }),
        });

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          alert(`Error en registro: ${errorData.message}`);
          return;
        }

        // Solicitar token con formato x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', email);
        params.append('password', password);
        params.append('client_id', 'application');
        params.append('client_secret', 'secret');

        const tokenResponse = await fetch(`${API_URL}/oauth/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });

        if (!tokenResponse.ok) {
          alert('Error al obtener token');
          return;
        }

        const tokenData = await tokenResponse.json();
        const token =  tokenData.accessToken;
        localStorage.setItem('token', token);
        console.log('Token guardado:', token);
        alert('Usuario registrado y token guardado correctamente');
        // Redirige a la pantalla de transacciones
        navigate('/transacciones', { replace: true });
      } catch (error) {
        console.error(error);
        alert('Error en el registro');
      }
    } else {
      alert('Por favor, ingrese todos los campos.');
    }
  };

  const goToLogin = () => {
    // Regresa al formulario de login
    navigate('/');
  };

  return (
    <form onSubmit={handleRegister} className="login-form">
      <h2>Registrarse</h2>

      {/* Campo de usuario con ícono */}
      <div className="input-container">
        <div className="input-with-icon">
          <img src={iconPersona} alt="Usuario" className="input-icon" />
          <input
            type="email"
            placeholder="Usuario"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Campo de contraseña con ícono */}
      <div className="input-container">
        <div className="input-with-icon">
          <img src={iconCandado} alt="Contraseña" className="input-icon" />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Botón para registrarse */}
      <button type="submit" className="submit-btn">Registrarse</button>

      {/* Enlace para volver al login */}
      <div className="switch-form">
        <span className="switch-link" onClick={goToLogin}>
          Iniciar sesión
        </span>
      </div>
    </form>
  );
};

export default Register;
