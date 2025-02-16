import React, { useState } from 'react';
import './mis_movimientos.css';
import MovimientosTable, { Movimiento } from './tabla_movimientos/movimientos_table';

import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/audifonos.png';
import iconCampana from '../assets/campana.png';

interface MisMovimientosProps {
  onDetallesClick?: (mov: Movimiento) => void;
  onMovimientosClick?: () => void;
  onTransaccionesClick?: () => void;
}

const MisMovimientos: React.FC<MisMovimientosProps> = ({
  onDetallesClick,
  onMovimientosClick,
  onTransaccionesClick
}) => {
  const [selectedProduct, setSelectedProduct] = useState('1234');

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
    // La lista de movimientos se mantiene sin cambiar al variar el producto
  };

  return (
    <div className="mis-movimientos-wrapper">
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
            {/* Ícono 1: Transacciones → Navega a Movimientos */}
            <li onClick={onMovimientosClick}>
              <img src={iconTransacciones} alt="Transacciones" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconTarjeta} alt="Tarjeta" className="sidebar-icon" />
            </li>
            {/* Ícono 3: Movimientos → Navega a Transacciones */}
            <li onClick={onTransaccionesClick}>
              <img src={iconMovimientos} alt="Movimientos" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconSeguridad} alt="Seguridad" className="sidebar-icon" />
            </li>
          </ul>
        </nav>
        {/* Se han eliminado los tres puntos */}
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <section className="movimientos-section">
          <h2>Mis movimientos</h2>
          <div className="filter-container">
            <label htmlFor="producto-select">Producto:</label>
            <select
              id="producto-select"
              value={selectedProduct}
              onChange={handleProductChange}
            >
              <option value="1234">Cuenta de Ahorros *1234</option>
              <option value="5678">Cuenta de Ahorros *5678</option>
            </select>
          </div>
          <div className="table-container">
            <MovimientosTable onDetallesClick={onDetallesClick} />
          </div>
          <button className="load-more-btn">Cargar más movimientos</button>
        </section>
      </main>
    </div>
  );
};

export default MisMovimientos;
