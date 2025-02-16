import React from 'react';
import './mis_movimientos.css';
import MovimientosTable from './movimientos_table';

// Íconos (ajusta rutas según tu carpeta assets)
import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/adifonos.png';
import iconCampana from '../assets/campana.png';

const MisMovimientos: React.FC = () => {
  return (
    <div className="mis-movimientos-wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">FluxBank</div>
        </div>

        <div className="header-right">
          {/* 4 íconos (transacciones, tarjeta, movimientos, seguridad) */}
          <img src={iconTransacciones} alt="Transacciones" />
          <img src={iconTarjeta} alt="Tarjeta" />
          <img src={iconMovimientos} alt="Movimientos" />
          <img src={iconSeguridad} alt="Seguridad" />

          {/* Burbuja de ayuda */}
          <div className="help-bubble">
            <img src={iconAudifonos} alt="Audífonos" className="help-icon" />
            <span>¿Necesitas ayuda?</span>
          </div>

          {/* Botón de notificaciones (campana) */}
          <button className="notification-btn">
            <img src={iconCampana} alt="Notificaciones" />
          </button>

          {/* Texto de bienvenida y círculo de usuario */}
          <span className="welcome-text">Bienvenidx, Andrea Sosa</span>
          <div className="user-initials">AS</div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="body-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          {/* 3 puntos al final */}
          <div className="sidebar-dots">⋮</div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <section className="movimientos-section">
            <h2>Mis movimientos</h2>
            <div className="filter-container">
              <label htmlFor="producto-select">Producto:</label>
              <select id="producto-select">
                <option value="1234">Cuenta de Ahorros *1234</option>
                <option value="5678">Cuenta de Ahorros *5678</option>
              </select>
              <button className="consultar-btn">Consultar</button>
            </div>

            <MovimientosTable />

            <button className="load-more-btn">Cargar más movimientos</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MisMovimientos;
