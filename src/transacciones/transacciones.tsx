import React, { useState, useEffect } from 'react';
import './transacciones.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/audifonos.png';
import iconCampana from '../assets/campana.png';

const Transacciones: React.FC = () => {
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [monto, setMonto] = useState('');
  const [userAccounts, setUserAccounts] = useState<string[]>([]); // Guardar las cuentas
  const [balance, setBalance] = useState(0); // Guardar el saldo de la cuenta de origen
  const [profileMenuVisible, setProfileMenuVisible] = useState(false); // Estado para el menú desplegable
  const navigate = useNavigate();

  // Función para obtener las cuentas del usuario desde el backend
  const fetchUserAccounts = async () => {
    try {
      const response = await fetch(`${API_URL}/userProfile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las cuentas del usuario.');
      }

      const data = await response.json();
      const userAccounts = data.user.accounts.map((account: any) =>
        account.accountNumber.slice(-4) // Obtener solo los últimos 4 dígitos del número de cuenta
      );
      setUserAccounts(userAccounts);
      setCuentaOrigen(userAccounts[0]); // Selecciona la primera cuenta por defecto
      setBalance(data.user.accounts[0].balance); // Establecer el saldo de la primera cuenta
    } catch (err) {
      console.error('Error fetching user accounts:', err);
    }
  };

  // Función para obtener todos los usuarios registrados
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los usuarios.');
      }

      const data = await response.json();
      return data.map((user: any) => user.accounts.map((account: any) => account.accountNumber));
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    }
  };

  // Función para verificar si la cuenta de destino es válida
  const validateCuentaDestino = async () => {
    const usersAccounts = await fetchUsers(); // Obtener todas las cuentas de los usuarios

    // Buscar si la cuenta destino ingresada existe entre todas las cuentas registradas
    const isCuentaDestinoValid = usersAccounts.some((accounts: string[]) =>
      accounts.includes(cuentaDestino.replace(/\D/g, '')) // Eliminar caracteres no numéricos y comparar
    );

    if (!isCuentaDestinoValid) {
      alert('Cuenta de destino no encontrada');
      return false;
    }
    return true;
  };

  // Función para formatear la cuenta destino
  const formatCuentaDestino = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const truncated = digits.slice(0, 16);
    const groups = truncated.match(/.{1,4}/g);
    return groups ? groups.join('-') : '';
  };

  const handleCuentaDestinoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCuentaDestino(e.target.value);
    setCuentaDestino(formatted);
  };

  // Función para manejar el envío de la transacción
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de saldo insuficiente
    if (parseFloat(monto) > balance) {
      alert('Saldo insuficiente');
      return;
    }

    // Verificar si la cuenta de destino es válida
    const isCuentaDestinoValid = await validateCuentaDestino();
    if (!isCuentaDestinoValid) {
      return;
    }

    // Si pasa todas las validaciones, proceder con la transacción
    alert('Transacción enviada');
    // Aquí iría la lógica para hacer la solicitud POST para enviar la transferencia
  };

  // Función para redirigir a la página de Mis Movimientos
  const handleMisMovimientosClick = () => {
    navigate('/movimientos');
  };

  // Función para manejar el cierre de sesión
  const handleLogOut = () => {
    localStorage.removeItem('token'); // Elimina el token si es necesario
    navigate('/'); // Redirige al Login
  };

  useEffect(() => {
    fetchUserAccounts(); // Llamamos a la función para obtener las cuentas al cargar el componente
  }, []);

  return (
    <div className="transacciones-wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">FluxBank</div>
        </div>
        <div className="header-right">
          <span className="welcome-text">Bienvenidx, Andrea Sosa</span>
          <div className="profile-menu">
            <div
              className="user-initials"
              onClick={() => setProfileMenuVisible(!profileMenuVisible)} // Toggle de visibilidad del menú
            >
              AS
            </div>
            {profileMenuVisible && (
              <div className="profile-dropdown">
                <button onClick={handleLogOut}>Cerrar sesión</button> {/* Opción para cerrar sesión */}
              </div>
            )}
          </div>
          <div className="help-bubble">
            <img src={iconAudifonos} alt="Audífonos" className="header-icon" />
            <span>¿Necesitas ayuda?</span>
          </div>
          <button className="notification-btn">
            <img src={iconCampana} alt="Notificaciones" className="header-icon" />
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/transacciones')}>
              <img src={iconTransacciones} alt="Transacciones" className="sidebar-icon" />
            </li>
            <li onClick={() => navigate('/cuenta')}>
              <img src={iconTarjeta} alt="Tarjeta" className="sidebar-icon" />
            </li>
            <li onClick={handleMisMovimientosClick}>
              <img src={iconMovimientos} alt="Movimientos" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconSeguridad} alt="Seguridad" className="sidebar-icon" />
            </li>
          </ul>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <h2 className="transacciones-title">Información de la transferencia</h2>
        <hr className="separator" />
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="col">
            <label className="label-input">
              Cuenta origen
              <select
                className="input-field"
                value={cuentaOrigen}
                onChange={(e) => setCuentaOrigen(e.target.value)}
                required
              >
                <option value="">Seleccione una cuenta</option>
                {userAccounts.map((account, idx) => (
                  <option key={idx} value={account}>
                    *{account}
                  </option>
                ))}
              </select>
            </label>
            <label className="label-input">
              Cuenta destino
              <input
                type="text"
                className="input-field"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                value={cuentaDestino}
                onChange={handleCuentaDestinoChange}
                required
              />
            </label>
          </div>
          <div className="col">
            <label className="label-input">
              Tipo de cuenta
              <select
                className="input-field"
                value={tipoCuenta}
                onChange={(e) => setTipoCuenta(e.target.value)}
                required
              >
                <option value="">Seleccione tipo</option>
                <option value="ahorro">Ahorros</option>
                <option value="corriente">Corriente</option>
              </select>
            </label>
            <label className="label-input">
              Monto
              <input
                type="number"
                className="input-field"
                placeholder="Ingrese el monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                min="0"
                step="any"
                required
              />
            </label>
          </div>
          <button type="submit" className="enviar-btn">Enviar transferencia</button>
        </form>
      </main>
    </div>
  );
};

export default Transacciones;
