// src/admin/detalles_admin/detalles_admin.tsx
import React from 'react';
import './detalles_admin.css';
import { useLocation } from 'react-router-dom';

const DetallesAdmin: React.FC = () => {
  const location = useLocation();
  const movimiento = location.state?.movimiento;

  if (!movimiento) {
    return <div>No hay detalles disponibles.</div>;
  }

  return (
    <div className="detalles-admin-wrapper">
      <h2>Detalles del Movimiento</h2>
      <div>
        <strong>Valor:</strong> {movimiento.valor}
      </div>
      <div>
        <strong>Estado:</strong> {movimiento.estado}
      </div>
      <div>
        <strong>Usuario:</strong> {movimiento.usuario}
      </div>
      <div>
        <strong>Descripción:</strong> {movimiento.descripcion}
      </div>
      <div>
        <strong>Fecha:</strong> {movimiento.fecha}
      </div>
      <div>
        <strong>Hora:</strong> {movimiento.hora}
      </div>
    </div>
  );
};

export default DetallesAdmin;
