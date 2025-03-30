// src/cuenta/Cuenta.tsx
import React, { useState } from 'react';
import './Cuenta.css';
import { useNavigate } from 'react-router-dom';
import iconTarjeta from '../assets/targeta.png';
import iconTransacciones from '../assets/transacciones.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import { API_URL } from '../api';

const Cuenta: React.FC = () => {
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!accountType || (accountType !== 'corriente' && accountType !== 'ahorros')) {
      setError('Tipo de cuenta inválido. Debe ser "corriente" o "ahorros".');
      return;
    }
    if (isNaN(Number(balance)) || Number(balance) < 0) {
      setError('El saldo inicial debe ser un número mayor o igual a 0.');
      return;
    }

    // Enviar datos al backend
    try {
    const response = await fetch(`${API_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        accountType,
        initialBalance: Number(balance),
      }),
    });

      if (!response.ok) {
        throw new Error('Error al crear la cuenta.');
      }

      navigate('/transacciones');
    } catch (err) {
      setError('Hubo un problema al crear la cuenta. Intenta nuevamente.');
    }
  };

  return (
    <div className="cuenta-container">
      <header className="header">
        <div className="header-left">
          <div className="logo">FluxBank</div>
        </div>
        <div className="header-right">
          <span className="welcome-text">Bienvenidx, Andrea Sosa</span>
        </div>
      </header>

      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/transacciones')}>
              <img src={iconTransacciones} alt="Transacciones" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconTarjeta} alt="Tarjeta" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconMovimientos} alt="Movimientos" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconSeguridad} alt="Seguridad" className="sidebar-icon" />
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h2 className="cuenta-title">Crear Cuenta</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="cuenta-form">
          <div className="form-group">
            <label htmlFor="accountType">Tipo de Cuenta</label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="corriente">Corriente</option>
              <option value="ahorros">Ahorros</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="balance">Saldo Inicial</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              min="0"
            />
          </div>
          <button type="submit" className="submit-btn">Crear Cuenta</button>
        </form>
      </main>
    </div>
  );
};

export default Cuenta;
