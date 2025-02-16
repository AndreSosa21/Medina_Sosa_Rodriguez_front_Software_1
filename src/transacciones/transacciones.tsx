import React, { useState } from 'react';
import './Transacciones.css';

import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/audifonos.png';
import iconCampana from '../assets/campana.png';

interface TransaccionesProps {
  onMovimientosClick?: () => void;
  onTransaccionesClick?: () => void;
}

const Transacciones: React.FC<TransaccionesProps> = ({
  onMovimientosClick,
  onTransaccionesClick
}) => {
  // Estados para los campos del formulario
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [monto, setMonto] = useState('');

  // Lista de cuentas del usuario (ejemplo)
  const userAccounts = [
    '1234-5678-9012-3456',
    '9876-5432-1098-7654'
  ];

  // Función para formatear la cuenta destino: elimina todo lo que no sea dígito y agrega guiones cada 4 dígitos
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí se podría enviar la información al backend.
    alert(`Transferencia enviada:
Cuenta origen: ${cuentaOrigen}
Cuenta destino: ${cuentaDestino}
Tipo de cuenta: ${tipoCuenta}
Monto: ${monto}`);
  };

  return (
    <div className="transacciones-wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">FluxBank</div>
        </div>
        <div className="header-right">
          <span className="welcome-text">Bienvenidx, Andrea Sosa</span>
          <div className="help-bubble">
            <img src={iconAudifonos} alt="Audífonos" className="header-icon" />
            <span>¿Necesitas ayuda?</span>
          </div>
          <button className="notification-btn">
            <img src={iconCampana} alt="Notificaciones" className="header-icon" />
          </button>
          <div className="user-initials">AS</div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li onClick={onMovimientosClick}>
              <img src={iconTransacciones} alt="Transacciones" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconTarjeta} alt="Tarjeta" className="sidebar-icon" />
            </li>
            <li onClick={onTransaccionesClick}>
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
                    {account}
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
