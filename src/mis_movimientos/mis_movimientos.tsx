import React, { useState, useEffect } from 'react';
import './mis_movimientos.css';
import MovimientosTable, { Movimiento } from './tabla_movimientos/movimientos_table';

import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/audifonos.png';
import iconCampana from '../assets/campana.png';
import { useNavigate } from 'react-router-dom';

const MisMovimientos: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('1234');
  const [movimientosData, setMovimientosData] = useState<Movimiento[]>([]);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
  };

  // Función para simular la carga de movimientos dependiendo del producto
  const fetchMovimientos = (producto: string) => {
    const movimientos: Movimiento[] = producto === '1234'
      ? [
          {
            fecha: '12/02/2025',
            hora: '8:00am',
            valor: '$10,000',
            descripcion: 'Transferencia a Nequi',
            estado: 'En proceso',
            noAprobacion: '6758435-1',
            canal: 'Info. no disponible',
          },
          {
            fecha: '11/02/2025',
            hora: '9:15am',
            valor: '$10,000',
            descripcion: 'Transferencia a Nequi',
            estado: 'Aprobado',
            noAprobacion: '6758435-2',
            canal: 'Info. no disponible',
          },
        ]
      : [
          {
            fecha: '08/02/2025',
            hora: '10:00am',
            valor: '$5,000',
            descripcion: 'Pago de tarjeta',
            estado: 'Rechazado',
            noAprobacion: '6758435-3',
            canal: 'Info. no disponible',
          },
          {
            fecha: '07/02/2025',
            hora: '3:30pm',
            valor: '$20,000',
            descripcion: 'Pago de tarjeta',
            estado: 'Aprobado',
            noAprobacion: '6758435-4',
            canal: 'Info. no disponible',
          },
        ];
    setMovimientosData(movimientos);
  };

  useEffect(() => {
    fetchMovimientos(selectedProduct);
  }, [selectedProduct]);

  const handleDetallesRedirect = (mov: Movimiento) => {
    navigate(`/detalles/${mov.noAprobacion}`, { state: { movimiento: mov } });
  };

  const handleTransaccionesRedirect = () => {
    navigate('/transacciones');
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
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
          <div className="profile-menu">
            <div
              className="user-initials"
              onClick={() => setProfileMenuVisible(!profileMenuVisible)}
            >
              AS
            </div>
            {profileMenuVisible && (
              <div className="profile-dropdown">
                <button onClick={handleLogOut}>Cerrar sesión</button>
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
            <li onClick={handleTransaccionesRedirect}>
              <img src={iconTransacciones} alt="Transacciones" className="sidebar-icon" />
            </li>
            <li>
              <img src={iconTarjeta} alt="Tarjeta" className="sidebar-icon" />
            </li>
            <li onClick={() => navigate('/movimientos')}>
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
            <MovimientosTable data={movimientosData} onDetallesClick={handleDetallesRedirect} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MisMovimientos;
