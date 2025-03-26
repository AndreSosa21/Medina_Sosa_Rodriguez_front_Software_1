import React, { useState } from 'react';
import './Detalles.css';
import { useLocation, useNavigate } from 'react-router-dom';

import iconTransacciones from '../assets/transacciones.png';
import iconTarjeta from '../assets/targeta.png';
import iconMovimientos from '../assets/movimientos.png';
import iconSeguridad from '../assets/seguridad.png';
import iconAudifonos from '../assets/audifonos.png';
import iconCampana from '../assets/campana.png';

interface DetallesProps {
  onBack?: () => void;
  onMovimientosClick?: () => void;
  onTransaccionesClick?: () => void;
}

const Detalles: React.FC<DetallesProps> = ({
  onBack,
  onMovimientosClick,
  onTransaccionesClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const movimiento = location.state?.movimiento; 

  const handleBack = () => {
    navigate('/movimientos');
  };

  const handleLogOut = () => {
    // Aquí puedes eliminar el token de sesión si es necesario
    localStorage.removeItem('token');
    navigate('/'); // Redirigir al Login
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'En proceso':
        return 'estado-en-proceso';
      case 'Aprobado':
        return 'estado-aprobado';
      case 'Rechazado':
        return 'estado-rechazado';
      default:
        return '';
    }
  };

  if (!movimiento) {
    return (
      <div className="detalles-wrapper">
        <p>No hay datos del movimiento</p>
        <button onClick={handleBack}>Volver</button>
      </div>
    );
  }

  return (
    <div className="detalles-wrapper">
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
        <div className="title-container">
          <div className="back-circle" onClick={handleBack}>
            ←
          </div>
          <h2 className="detalles-title">Detalles del movimiento</h2>
        </div>
        <hr className="separator" />
        <div className="details-grid">
          <div className="col">
            <div className="detail-item">
              <div className="detail-label">Valor</div>
              <div className="detail-value">{movimiento.valor}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Canal</div>
              <div className="detail-value">{movimiento.canal}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Estado</div>
              <div className="detail-value">
                <span className={`status-pill ${getStatusClass(movimiento.estado)}`}>
                  {movimiento.estado}
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="detail-item">
              <div className="detail-label">Nº de aprobación</div>
              <div className="detail-value">{movimiento.noAprobacion}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Fecha y hora</div>
              <div className="detail-value">
                {movimiento.fecha} {movimiento.hora}
              </div>
            </div>
            <div className="detail-item">
              <button className="descargar-btn">Descargar comprobante</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detalles;
