import React from 'react';
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
        <div className="form-grid">
          <div className="col">
            <label className="label-input">
              Cuenta origen
              <input type="text" className="input-field" placeholder="Ej: 1234-5678-..." />
            </label>
            <label className="label-input">
              Cuenta destino
              <input type="text" className="input-field" placeholder="Ej: 8765-4321-..." />
            </label>
          </div>
          <div className="col">
            <label className="label-input">
              Tipo de cuenta
              <input type="text" className="input-field" placeholder="Ej: Ahorros" />
            </label>
            <label className="label-input">
              Monto
              <input type="text" className="input-field" placeholder="Ej: $10,000" />
            </label>
          </div>
        </div>
        <button className="enviar-btn">Enviar transferencia</button>
      </main>
    </div>
  );
};

export default Transacciones;
